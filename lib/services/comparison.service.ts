import { prisma } from '../prisma';
import type { Market, Platform } from '@/lib/db-types';
import { MatcherService } from './matcher.service';
import { PolymarketService } from './polymarket.service';
import { KalshiService } from './kalshi.service';

export interface ArbitrageResult {
  detected: boolean;
  roi: number | null;
  buyYesOn: Platform | null;
  sellYesOn: Platform | null;
  buyNoOn: Platform | null;
  explanation: string | null;
}

interface ComparisonResult {
  sourceMarket: {
    id: string;
    platform: Platform;
    question: string;
    yesPrice: number;
    noPrice: number;
    effectiveYes: number;
    effectiveNo: number;
    fees: number;
    liquidity: number;
    volume24h: number;
    volumeTotal: number;
    endDate?: string;
    category?: string;
    lastSyncedAt: string;
    url: string;
  };

  matches: Array<{
    id: string;
    platform: Platform;
    question: string;
    yesPrice: number;
    noPrice: number;
    effectiveYes: number;
    effectiveNo: number;
    fees: number;
    liquidity: number;
    volume24h: number;
    volumeTotal?: number;
    endDate?: string;
    category?: string;
    lastSyncedAt?: string;
    url: string;
    matchScore: number;
    matchType: string;
  }>;

  bestDeal: {
    yes: {
      platform: Platform;
      price: number;
      effectivePrice: number;
      savingsVsWorst: number;
    };
    no: {
      platform: Platform;
      price: number;
      effectivePrice: number;
      savingsVsWorst: number;
    };
  };

  arbitrage?: ArbitrageResult;
}

export class ComparisonService {
  private matcher: MatcherService;

  constructor() {
    this.matcher = new MatcherService();
  }

  /**
   * Calcula el precio efectivo después de fees.
   *
   * POLYMARKET: feesEnabled=false para la mayoría → sin fees por ahora.
   * KALSHI: fee = 7% × P × (1 - P) por contrato.
   */
  calculateEffectivePrice(price: number, platform: Platform): number {
    if (platform === 'POLYMARKET') {
      return price;
    }

    if (platform === 'KALSHI') {
      const fee = 0.07 * price * (1 - price);
      return price + fee;
    }

    return price;
  }

  /**
   * Detecta arbitraje YES+NO entre dos markets.
   * Opción A: YES en base + NO en match. Opción B: YES en match + NO en base.
   */
  private detectArbitragePair(
    baseMarket: { yesPrice: number; noPrice: number; platform: Platform },
    matchMarket: { yesPrice: number; noPrice: number; platform: Platform }
  ): ArbitrageResult {
    if (
      baseMarket.yesPrice == null ||
      baseMarket.noPrice == null ||
      matchMarket.yesPrice == null ||
      matchMarket.noPrice == null
    ) {
      return {
        detected: false,
        roi: null,
        buyYesOn: null,
        sellYesOn: null,
        buyNoOn: null,
        explanation: null
      };
    }

    // Filtrar precios extremos (mercado resuelto o sin liquidez)
    if (
      baseMarket.yesPrice <= 0.001 ||
      baseMarket.yesPrice >= 0.999 ||
      matchMarket.yesPrice <= 0.001 ||
      matchMarket.yesPrice >= 0.999
    ) {
      console.log(
        '[Arbitrage] ⚠️ Extreme price detected - market likely resolved, skipping'
      );
      return {
        detected: false,
        roi: null,
        buyYesOn: null,
        sellYesOn: null,
        buyNoOn: null,
        explanation: null
      };
    }

    const baseYes = baseMarket.yesPrice;
    const baseNo = baseMarket.noPrice;
    const matchYes = matchMarket.yesPrice;
    const matchNo = matchMarket.noPrice;

    const baseEffYes = this.calculateEffectivePrice(baseYes, baseMarket.platform);
    const baseEffNo = this.calculateEffectivePrice(baseNo, baseMarket.platform);
    const matchEffYes = this.calculateEffectivePrice(
      matchYes,
      matchMarket.platform
    );
    const matchEffNo = this.calculateEffectivePrice(
      matchNo,
      matchMarket.platform
    );

    const totalA = baseEffYes + matchEffNo;
    const roiA = totalA < 1 ? (1 - totalA) / totalA : 0;

    const totalB = matchEffYes + baseEffNo;
    const roiB = totalB < 1 ? (1 - totalB) / totalB : 0;

    const bestRoi = Math.max(roiA, roiB);
    const useOptionA = roiA >= roiB;

    // Sanity check: ROI > 20% indica match incorrecto (mercados eficientes: 0.5% - 5%)
    if (bestRoi > 0.2) {
      console.log(
        `[Arbitrage] ⚠️ ROI ${(bestRoi * 100).toFixed(1)}% too high - likely bad match, skipping`
      );
      return {
        detected: false,
        roi: null,
        buyYesOn: null,
        sellYesOn: null,
        buyNoOn: null,
        explanation: null
      };
    }

    console.log(
      `[Arbitrage] ${baseMarket.platform} YES: ${baseYes} → eff: ${baseEffYes}`
    );
    console.log(
      `[Arbitrage] ${matchMarket.platform} NO: ${matchNo} → eff: ${matchEffNo}`
    );
    console.log(
      `[Arbitrage] Option A total: ${totalA} → ROI: ${(roiA * 100).toFixed(2)}%`
    );
    console.log(
      `[Arbitrage] Option B total: ${totalB} → ROI: ${(roiB * 100).toFixed(2)}%`
    );

    if (bestRoi > 0.005) {
      const buyYesOn = useOptionA ? baseMarket.platform : matchMarket.platform;
      const buyNoOn = useOptionA ? matchMarket.platform : baseMarket.platform;
      const cheapYes = useOptionA ? baseEffYes : matchEffYes;
      const cheapNo = useOptionA ? matchEffNo : baseEffNo;
      const totalCost = cheapYes + cheapNo;

      return {
        detected: true,
        roi: parseFloat((bestRoi * 100).toFixed(2)),
        buyYesOn,
        sellYesOn: buyNoOn,
        buyNoOn,
        explanation:
          `Buy YES on ${buyYesOn} at ${(cheapYes * 100).toFixed(1)}¢ + ` +
          `Buy NO on ${buyNoOn} at ${(cheapNo * 100).toFixed(1)}¢. ` +
          `Total cost: ${(totalCost * 100).toFixed(1)}¢. ` +
          `Guaranteed profit: ${(bestRoi * 100).toFixed(2)}% ROI.`
      };
    }

    return {
      detected: false,
      roi: null,
      buyYesOn: null,
      sellYesOn: null,
      buyNoOn: null,
      explanation: null
    };
  }

  /**
   * Detecta la mejor oportunidad de arbitraje entre base y sus matches.
   */
  detectArbitrage(comparison: {
    sourceMarket: {
      yesPrice?: number;
      noPrice?: number;
      platform: Platform;
    };
    matches: Array<{
      yesPrice?: number;
      noPrice?: number;
      platform: Platform;
    }>;
  }): ArbitrageResult {
    const { sourceMarket, matches } = comparison;

    if (
      sourceMarket.yesPrice == null ||
      sourceMarket.noPrice == null ||
      matches.length === 0
    ) {
      return {
        detected: false,
        roi: null,
        buyYesOn: null,
        sellYesOn: null,
        buyNoOn: null,
        explanation: null
      };
    }

    const base = {
      yesPrice: sourceMarket.yesPrice,
      noPrice: sourceMarket.noPrice,
      platform: sourceMarket.platform
    };

    let best: ArbitrageResult = {
      detected: false,
      roi: null,
      buyYesOn: null,
      sellYesOn: null,
      buyNoOn: null,
      explanation: null
    };

    for (const m of matches) {
      if (m.yesPrice == null || m.noPrice == null) continue;
      const match = {
        yesPrice: m.yesPrice,
        noPrice: m.noPrice,
        platform: m.platform
      };
      const result = this.detectArbitragePair(base, match);
      if (
        result.detected &&
        result.roi != null &&
        (best.roi == null || result.roi > best.roi)
      ) {
        best = result;
      }
    }

    return best;
  }

  /**
   * Obtiene precios live para un market
   */
  private async fetchLivePrices(market: Market): Promise<{ yesPrice: number; noPrice: number }> {
    const fallback = { yesPrice: 0.5, noPrice: 0.5 };
    try {
      if (market.platform === 'POLYMARKET') {
        const poly = new PolymarketService();
        const result = await poly.getLiveMarket({
          externalId: market.externalId,
          platform: 'POLYMARKET',
          slug: market.slug
        });
        return result ? { yesPrice: result.yesPrice, noPrice: result.noPrice } : fallback;
      }
      if (market.platform === 'KALSHI') {
        const kalshi = new KalshiService();
        const result = await kalshi.getLiveMarket({
          externalId: market.externalId,
          platform: 'KALSHI'
        });
        return result ? { yesPrice: result.yesPrice, noPrice: result.noPrice } : fallback;
      }
    } catch {
      // Kalshi auth puede fallar si no está configurado
    }
    return fallback;
  }

  /**
   * Compara un market con sus equivalentes
   */
  async compareMarket(marketId: string): Promise<ComparisonResult> {
    const sourceMarket = await prisma.market.findUnique({
      where: { id: marketId }
    });

    if (!sourceMarket) {
      throw new Error('Market not found');
    }

    console.log(`\n📊 Comparing market: "${sourceMarket.question}"`);
    console.log(`   Platform: ${sourceMarket.platform}`);

    const matchResults = await this.matcher.findMatches(sourceMarket, 0.7);

    console.log(`   Found ${matchResults.length} matches`);

    // Fetch live prices for source and matches
    const [sourcePrices, ...matchPricesList] = await Promise.all([
      this.fetchLivePrices(sourceMarket),
      ...matchResults.map((m) => this.fetchLivePrices(m.market))
    ]);

    const sourceWithPrices = { ...sourceMarket, ...sourcePrices };
    const matchesWithPrices = matchResults.map((m, i) => ({
      ...m,
      market: { ...m.market, ...matchPricesList[i] }
    }));

    const sourceData = {
      id: sourceMarket.id,
      platform: sourceMarket.platform,
      question: sourceMarket.question,
      yesPrice: sourceWithPrices.yesPrice,
      noPrice: sourceWithPrices.noPrice,
      effectiveYes: this.calculateEffectivePrice(
        sourceWithPrices.yesPrice ?? 0.5,
        sourceMarket.platform
      ),
      effectiveNo: this.calculateEffectivePrice(
        sourceWithPrices.noPrice ?? 1 - (sourceWithPrices.yesPrice ?? 0.5),
        sourceMarket.platform
      ),
      fees: sourceMarket.takerFee ?? 0,
      liquidity: sourceMarket.liquidity,
      volume24h: sourceMarket.volume24h,
      volumeTotal: sourceMarket.volumeTotal,
      endDate: sourceMarket.endDate?.toISOString(),
      category: sourceMarket.category ?? undefined,
      lastSyncedAt: sourceMarket.lastSyncedAt.toISOString(),
      url: sourceMarket.url ?? ''
    };

    const matchesData = matchesWithPrices.map((m) => ({
      id: m.market.id,
      platform: m.market.platform,
      question: m.market.question,
      yesPrice: m.market.yesPrice ?? 0.5,
      noPrice: m.market.noPrice ?? 0.5,
      effectiveYes: this.calculateEffectivePrice(
        m.market.yesPrice ?? 0.5,
        m.market.platform
      ),
      effectiveNo: this.calculateEffectivePrice(
        m.market.noPrice ?? 1 - (m.market.yesPrice ?? 0.5),
        m.market.platform
      ),
      fees: m.market.takerFee ?? 0,
      liquidity: m.market.liquidity,
      volume24h: m.market.volume24h,
      volumeTotal: m.market.volumeTotal,
      endDate: m.market.endDate?.toISOString(),
      category: m.market.category ?? undefined,
      lastSyncedAt: m.market.lastSyncedAt.toISOString(),
      url: m.market.url ?? '',
      matchScore: m.score,
      matchType: m.matchType
    }));

    const allMarkets = [sourceWithPrices, ...matchesWithPrices.map((m) => m.market)];
    const allData = [sourceData, ...matchesData];

    const bestYes = allData.reduce((min, curr) =>
      curr.effectiveYes < min.effectiveYes ? curr : min
    );

    const bestNo = allData.reduce((min, curr) =>
      curr.effectiveNo < min.effectiveNo ? curr : min
    );

    const worstYes = allData.reduce((max, curr) =>
      curr.effectiveYes > max.effectiveYes ? curr : max
    );

    const worstNo = allData.reduce((max, curr) =>
      curr.effectiveNo > max.effectiveNo ? curr : max
    );

    const arbitrage = this.detectArbitrage({
      sourceMarket: sourceData,
      matches: matchesData
    });

    console.log(`   Best YES: ${bestYes.platform} at $${bestYes.effectiveYes.toFixed(3)}`);
    console.log(`   Best NO: ${bestNo.platform} at $${bestNo.effectiveNo.toFixed(3)}`);
    if (arbitrage.detected && arbitrage.roi != null) {
      console.log(`   🎯 ARBITRAGE: ${arbitrage.roi.toFixed(2)}% ROI`);
    }

    return {
      sourceMarket: sourceData,
      matches: matchesData,
      bestDeal: {
        yes: {
          platform: bestYes.platform,
          price: bestYes.yesPrice,
          effectivePrice: bestYes.effectiveYes,
          savingsVsWorst: worstYes.effectiveYes - bestYes.effectiveYes
        },
        no: {
          platform: bestNo.platform,
          price: bestNo.noPrice,
          effectivePrice: bestNo.effectiveNo,
          savingsVsWorst: worstNo.effectiveNo - bestNo.effectiveNo
        }
      },
      arbitrage: arbitrage ?? undefined
    };
  }
}
