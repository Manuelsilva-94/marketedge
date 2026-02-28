import { prisma } from '../prisma';
import { Platform } from '@prisma/client';

interface PolymarketMarket {
  id: string;
  question: string;
  slug: string;
  description?: string;
  outcomePrices: string; // JSON string: ["0.48", "0.52"]
  volume24hr: string;
  volume: string;
  liquidity: string;
  active: boolean;
  closed: boolean;
  groupItemTitle?: string;
  tags?: string[];
  image?: string;
  endDate?: string;
  conditionId: string;
}

export class PolymarketService {
  private gammaUrl = 'https://gamma-api.polymarket.com';

  /**
   * Obtiene markets de Polymarket
   */
  async getMarkets(options: {
    active?: boolean;
    limit?: number;
    offset?: number;
  } = {}): Promise<PolymarketMarket[]> {
    const { active = true, limit = 100, offset = 0 } = options;

    const params = new URLSearchParams({
      active: String(active),
      closed: String(!active),
      limit: String(limit),
      offset: String(offset)
    });

    console.log(`📡 Fetching Polymarket markets: ${this.gammaUrl}/markets?${params}`);

    const response = await fetch(`${this.gammaUrl}/markets?${params}`, {
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Polymarket API error: ${response.status}`);
    }

    const markets = await response.json();
    console.log(`✅ Fetched ${markets.length} markets from Polymarket`);

    return markets;
  }

  /**
   * Normaliza un market de Polymarket a nuestro formato
   */
  normalizeMarket(raw: PolymarketMarket) {
    // Parse prices (viene como JSON string)
    const prices = JSON.parse(raw.outcomePrices);
    const yesPrice = parseFloat(prices[0] || '0.5');
    const noPrice = parseFloat(prices[1] || '0.5');

    return {
      platform: Platform.POLYMARKET,
      externalId: raw.id,
      question: raw.question,
      slug: raw.slug,
      description: raw.description || null,
      category: raw.groupItemTitle || null,
      tags: raw.tags || [],

      // Prices (ya normalizados 0-1)
      yesPrice,
      noPrice,
      midPrice: (yesPrice + noPrice) / 2,

      // Polymarket no usa bid/ask
      yesBid: null,
      yesAsk: null,
      noBid: null,
      noAsk: null,

      // Fees (aproximados, pueden variar)
      makerFee: 0.02,
      takerFee: 0.02,
      feeStructure: 'flat',

      // Volume (convertir strings a números)
      volume24h: parseFloat(raw.volume24hr || '0'),
      volumeTotal: parseFloat(raw.volume || '0'),
      liquidity: parseFloat(raw.liquidity || '0'),

      // Status
      active: raw.active && !raw.closed,
      endDate: raw.endDate ? new Date(raw.endDate) : null,

      // URLs
      imageUrl: raw.image || null,
      url: `https://polymarket.com/event/${raw.slug}`,

      // Timestamps
      lastSyncedAt: new Date()
    };
  }

  /**
   * Sincroniza markets a la base de datos
   */
  async syncToDB(limit = 100): Promise<number> {
    console.log(`\n🔄 Starting Polymarket sync (limit: ${limit})...`);

    const markets = await this.getMarkets({ active: true, limit });

    let synced = 0;
    let errors = 0;

    for (const raw of markets) {
      try {
        const normalized = this.normalizeMarket(raw);

        await prisma.market.upsert({
          where: {
            platform_externalId: {
              platform: Platform.POLYMARKET,
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
            category: normalized.category,
            tags: normalized.tags,
            imageUrl: normalized.imageUrl,
            url: normalized.url,
            lastSyncedAt: normalized.lastSyncedAt,
            updatedAt: new Date()
          },
          create: normalized
        });

        synced++;

        if (synced % 10 === 0) {
          console.log(`  ⏳ Synced ${synced}/${markets.length}...`);
        }
      } catch (error) {
        errors++;
        console.error(`  ❌ Error syncing market ${raw.id}:`, error instanceof Error ? error.message : error);
      }
    }

    console.log(`\n✅ Polymarket sync complete:`);
    console.log(`   - Synced: ${synced}`);
    console.log(`   - Errors: ${errors}`);
    console.log(`   - Total: ${markets.length}`);

    return synced;
  }
}
