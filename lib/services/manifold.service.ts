import { prisma } from '../prisma';
import { Platform } from '@prisma/client';

interface ManifoldMarket {
  id: string;
  creatorId: string;
  creatorUsername: string;
  question: string;
  slug: string;
  url: string;
  outcomeType: string;
  mechanism: string;
  probability: number;
  volume: number;
  volume24Hours: number;
  isResolved: boolean;
  resolution?: string;
  closeTime: number;
  createdTime: number;
  lastUpdatedTime: number;
  pool?: {
    YES: number;
    NO: number;
  };
}

export class ManifoldService {
  private baseUrl = 'https://api.manifold.markets/v0';

  /**
   * Obtiene markets de Manifold
   * Solo filtramos BINARY markets (YES/NO)
   */
  async getMarkets(options: {
    limit?: number;
    before?: string;
  } = {}): Promise<ManifoldMarket[]> {
    const { limit = 1000, before } = options;

    const params = new URLSearchParams({
      limit: String(limit),
      ...(before && { before })
    });

    console.log(`📡 Fetching Manifold markets: ${this.baseUrl}/markets?${params}`);

    const response = await fetch(`${this.baseUrl}/markets?${params}`, {
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Manifold API error: ${response.status}`);
    }

    const markets = await response.json();

    // Filtrar solo BINARY markets
    const binaryMarkets = markets.filter(
      (m: ManifoldMarket) => m.outcomeType === 'BINARY' && !m.isResolved
    );

    console.log(
      `✅ Fetched ${markets.length} markets, ${binaryMarkets.length} are binary`
    );

    return binaryMarkets;
  }

  /**
   * Normaliza un market de Manifold a nuestro formato
   */
  normalizeMarket(raw: ManifoldMarket) {
    const yesPrice = raw.probability;
    const noPrice = 1 - raw.probability;

    return {
      platform: Platform.MANIFOLD,
      externalId: raw.id,
      question: raw.question,
      slug: raw.slug,
      description: null,
      category: null,
      tags: [],

      yesPrice,
      noPrice,
      midPrice: (yesPrice + noPrice) / 2,

      yesBid: null,
      yesAsk: null,
      noBid: null,
      noAsk: null,

      makerFee: 0,
      takerFee: 0,
      feeStructure: 'free',

      volume24h: raw.volume24Hours || 0,
      volumeTotal: raw.volume || 0,
      liquidity: raw.pool ? raw.pool.YES + raw.pool.NO : 0,

      active: !raw.isResolved,
      endDate: raw.closeTime ? new Date(raw.closeTime) : null,
      resolvedAt: raw.isResolved ? new Date(raw.lastUpdatedTime) : null,
      outcome: raw.resolution || null,

      imageUrl: null,
      url: raw.url,

      lastSyncedAt: new Date()
    };
  }

  /**
   * Sincroniza markets a la base de datos
   */
  async syncToDB(limit = 500): Promise<number> {
    console.log(`\n🔄 Starting Manifold sync (limit: ${limit})...`);

    const markets = await this.getMarkets({ limit });
    const marketsToSync = markets.slice(0, limit);

    let synced = 0;
    let errors = 0;

    for (const raw of marketsToSync) {
      try {
        const normalized = this.normalizeMarket(raw);

        await prisma.market.upsert({
          where: {
            platform_externalId: {
              platform: Platform.MANIFOLD,
              externalId: raw.id
            }
          },
          update: {
            question: normalized.question,
            yesPrice: normalized.yesPrice,
            noPrice: normalized.noPrice,
            midPrice: normalized.midPrice,
            volume24h: normalized.volume24h,
            volumeTotal: normalized.volumeTotal,
            liquidity: normalized.liquidity,
            active: normalized.active,
            url: normalized.url,
            lastSyncedAt: normalized.lastSyncedAt,
            updatedAt: new Date()
          },
          create: normalized
        });

        synced++;

        if (synced % 25 === 0) {
          console.log(`  ⏳ Synced ${synced}/${marketsToSync.length}...`);
        }
      } catch (error) {
        errors++;
        console.error(
          `  ❌ Error syncing market ${raw.id}:`,
          error instanceof Error ? error.message : error
        );
      }
    }

    console.log(`\n✅ Manifold sync complete:`);
    console.log(`   - Synced: ${synced}`);
    console.log(`   - Errors: ${errors}`);
    console.log(`   - Total: ${marketsToSync.length}`);

    return synced;
  }
}
