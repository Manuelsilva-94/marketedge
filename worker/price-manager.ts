import { prisma } from '@/lib/prisma';
import type { Platform } from '@/lib/db-types';
import { ComparisonService } from '@/lib/services/comparison.service';
import type { MatchPair } from './market-loader';
import { notifyHighRoiIfNeeded } from './notifications';

const MIN_ROI_FRACTION = 0.005;
const BATCH_MS = 2500;

type SidePrices = { yes: number; no: number };

type MatchState = {
  poly?: SidePrices;
  kalshi?: SidePrices;
};

export class PriceManager {
  private comparison = new ComparisonService();
  private byMatch = new Map<string, MatchState>();
  private polyTakerByMatch = new Map<string, number | null>();
  private dirtyCache = new Set<string>();
  private flushTimer: ReturnType<typeof setInterval> | null = null;
  private pairs: MatchPair[] = [];

  constructor(pairList: MatchPair[]) {
    this.setPairs(pairList);
  }

  setPairs(pairs: MatchPair[]): void {
    this.pairs = pairs;
    this.polyTakerByMatch.clear();
    for (const p of pairs) {
      this.polyTakerByMatch.set(p.matchId, p.polyTakerFee);
    }
  }

  async hydrateFromDb(): Promise<void> {
    const ids = this.pairs.map((p) => p.matchId);
    if (ids.length === 0) return;
    const rows = await prisma.priceCache.findMany({
      where: { matchId: { in: ids } }
    });
    for (const r of rows) {
      const st: MatchState = {};
      st.poly = { yes: r.polyYesPrice, no: r.polyNoPrice };
      st.kalshi = { yes: r.kalshiYesPrice, no: r.kalshiNoPrice };
      this.byMatch.set(r.matchId, st);
    }
    console.log(`[price-manager] Hydrated ${rows.length} rows from PriceCache`);
  }

  startFlushLoop(): void {
    if (this.flushTimer) return;
    this.flushTimer = setInterval(() => {
      void this.flushPriceCache();
    }, BATCH_MS);
  }

  stopFlushLoop(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = null;
    }
  }

  updatePolymarket(matchId: string, partial: Partial<SidePrices>): void {
    const st = this.byMatch.get(matchId) ?? {};
    const prev = st.poly ?? { yes: 0.5, no: 0.5 };
    st.poly = {
      yes: partial.yes ?? prev.yes,
      no: partial.no ?? prev.no
    };
    this.byMatch.set(matchId, st);
    this.dirtyCache.add(matchId);
    void this.onStateChange(matchId);
  }

  updateKalshi(matchId: string, partial: Partial<SidePrices>): void {
    const st = this.byMatch.get(matchId) ?? {};
    const prev = st.kalshi ?? { yes: 0.5, no: 0.5 };
    st.kalshi = {
      yes: partial.yes ?? prev.yes,
      no: partial.no ?? prev.no
    };
    this.byMatch.set(matchId, st);
    this.dirtyCache.add(matchId);
    void this.onStateChange(matchId);
  }

  private async onStateChange(matchId: string): Promise<void> {
    const st = this.byMatch.get(matchId);
    if (!st?.poly || !st.kalshi) return;

    const poly = st.poly;
    const kal = st.kalshi;

    const polyFee = this.polyTakerByMatch.get(matchId) ?? null;
    const result = this.comparison.detectArbitrage({
      sourceMarket: {
        yesPrice: poly.yes,
        noPrice: poly.no,
        platform: 'POLYMARKET',
        polymarketTakerFee: polyFee
      },
      matches: [
        {
          yesPrice: kal.yes,
          noPrice: kal.no,
          platform: 'KALSHI'
        }
      ]
    });

    const existing = await prisma.arbitrageOpportunity.findFirst({
      where: { matchId, active: true },
      orderBy: { detectedAt: 'desc' }
    });

    if (
      result.detected &&
      result.roi != null &&
      result.buyYesOn &&
      result.buyNoOn &&
      result.roi / 100 >= MIN_ROI_FRACTION
    ) {
      const buyYes = result.buyYesOn as Platform;
      const buyNo = result.buyNoOn as Platform;
      const polyPrice = poly.yes;
      const kalshiPrice = kal.yes;
      const roi = result.roi;

      if (existing) {
        await prisma.arbitrageOpportunity.update({
          where: { id: existing.id },
          data: {
            roiPercent: roi,
            buyYesOn: buyYes,
            buyNoOn: buyNo,
            polyPrice,
            kalshiPrice
          }
        });
        if (roi >= 1.0 && !existing.notifiedAt) {
          await notifyHighRoiIfNeeded({
            opportunityId: existing.id,
            matchId,
            roiPercent: roi,
            buyYesOn: buyYes,
            buyNoOn: buyNo,
            polyPrice,
            kalshiPrice
          });
        }
      } else {
        const created = await prisma.arbitrageOpportunity.create({
          data: {
            matchId,
            roiPercent: roi,
            buyYesOn: buyYes,
            buyNoOn: buyNo,
            polyPrice,
            kalshiPrice,
            active: true
          }
        });
        if (roi >= 1.0) {
          await notifyHighRoiIfNeeded({
            opportunityId: created.id,
            matchId,
            roiPercent: roi,
            buyYesOn: buyYes,
            buyNoOn: buyNo,
            polyPrice,
            kalshiPrice
          });
        }
      }
    } else if (existing) {
      await prisma.arbitrageOpportunity.update({
        where: { id: existing.id },
        data: { active: false, closedAt: new Date() }
      });
    }
  }

  private async flushPriceCache(): Promise<void> {
    if (this.dirtyCache.size === 0) return;
    const ids = [...this.dirtyCache];
    this.dirtyCache.clear();

    const list = ids
      .map((matchId) => {
        const st = this.byMatch.get(matchId);
        if (!st?.poly || !st.kalshi) return null;
        return { matchId, st };
      })
      .filter((x): x is { matchId: string; st: MatchState & { poly: SidePrices; kalshi: SidePrices } } => x !== null);

    if (list.length === 0) return;

    await prisma.$transaction(
      list.map(({ matchId, st }) =>
        prisma.priceCache.upsert({
          where: { matchId },
          create: {
            matchId,
            polyYesPrice: st.poly.yes,
            polyNoPrice: st.poly.no,
            kalshiYesPrice: st.kalshi.yes,
            kalshiNoPrice: st.kalshi.no
          },
          update: {
            polyYesPrice: st.poly.yes,
            polyNoPrice: st.poly.no,
            kalshiYesPrice: st.kalshi.yes,
            kalshiNoPrice: st.kalshi.no
          }
        })
      )
    );
  }

  async shutdown(): Promise<void> {
    this.stopFlushLoop();
    await this.flushPriceCache();
  }
}
