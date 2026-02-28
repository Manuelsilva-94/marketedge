import { prisma } from '../prisma';
import { Platform } from '@prisma/client';
import { KalshiAuth } from './kalshi-auth';

interface KalshiMarket {
  ticker: string;
  event_ticker: string;
  title: string;
  subtitle?: string;
  category: string;
  status: string;
  yes_bid: number;
  yes_ask: number;
  no_bid: number;
  no_ask: number;
  last_price: number;
  volume: number;
  volume_24h: number;
  liquidity: number;
  open_interest: number;
  close_time: string;
  expiration_time?: string;
}

interface KalshiMarketsResponse {
  markets: KalshiMarket[];
  cursor?: string;
}

export class KalshiService {
  private baseUrl = 'https://api.elections.kalshi.com/trade-api/v2';
  private auth: KalshiAuth;

  constructor() {
    this.auth = new KalshiAuth();
  }

  /**
   * Obtiene markets de Kalshi con paginación cursor-based
   */
  async getMarkets(options: {
    status?: string;
    limit?: number;
    cursor?: string;
  } = {}): Promise<KalshiMarketsResponse> {
    const { status = 'open', limit = 200, cursor } = options;

    // Path completo para firma (según docs Kalshi)
    const path = '/trade-api/v2/markets';

    const params = new URLSearchParams({
      status,
      limit: String(limit),
      ...(cursor && { cursor })
    });

    const url = `${this.baseUrl}${path.replace('/trade-api/v2', '')}?${params}`;

    console.log(`📡 Fetching Kalshi markets: ${url}`);

    const headers = this.auth.getHeaders('GET', path);

    const response = await fetch(url, { headers });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Kalshi API error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log(`✅ Fetched ${data.markets?.length || 0} markets from Kalshi`);

    return data;
  }

  /**
   * Normaliza un market de Kalshi a nuestro formato
   */
  normalizeMarket(raw: KalshiMarket) {
    // Kalshi usa escala 0-100 (cents)
    // Convertir a 0-1 para normalizar con Polymarket
    const yesBid = raw.yes_bid / 100;
    const yesAsk = raw.yes_ask / 100;
    const noBid = raw.no_bid / 100;
    const noAsk = raw.no_ask / 100;

    const yesPrice = (yesBid + yesAsk) / 2;
    const noPrice = (noBid + noAsk) / 2;

    return {
      platform: Platform.KALSHI,
      externalId: raw.ticker,
      question: raw.title,
      slug: raw.ticker.toLowerCase(),
      description: raw.subtitle || null,
      category: raw.category || null,
      tags: [],

      yesPrice,
      noPrice,
      midPrice: (yesPrice + noPrice) / 2,

      yesBid,
      yesAsk,
      noBid,
      noAsk,

      makerFee: 0.07,
      takerFee: 0.07,
      feeStructure: 'payout_based',

      volume24h: raw.volume_24h || 0,
      volumeTotal: raw.volume || 0,
      liquidity: raw.liquidity || 0,
      openInterest: raw.open_interest || 0,

      active: raw.status === 'open' || raw.status === 'active',
      endDate: raw.close_time ? new Date(raw.close_time) : null,

      imageUrl: null,
      url: `https://kalshi.com/markets/${raw.ticker}`,

      lastSyncedAt: new Date()
    };
  }

  /**
   * Sincroniza markets a la base de datos
   */
  async syncToDB(limit = 200): Promise<number> {
    console.log(`\n🔄 Starting Kalshi sync (limit: ${limit})...`);

    let allMarkets: KalshiMarket[] = [];
    let cursor: string | undefined;

    do {
      const response = await this.getMarkets({
        status: 'open',
        limit: 200,
        cursor
      });

      allMarkets = [...allMarkets, ...response.markets];
      cursor = response.cursor;

      console.log(`  📦 Accumulated ${allMarkets.length} markets...`);

      if (allMarkets.length >= limit) break;

      await new Promise((resolve) => setTimeout(resolve, 100));
    } while (cursor);

    const marketsToSync = allMarkets.slice(0, limit);

    let synced = 0;
    let errors = 0;

    for (const raw of marketsToSync) {
      try {
        const normalized = this.normalizeMarket(raw);

        await prisma.market.upsert({
          where: {
            platform_externalId: {
              platform: Platform.KALSHI,
              externalId: raw.ticker
            }
          },
          update: {
            question: normalized.question,
            yesPrice: normalized.yesPrice,
            noPrice: normalized.noPrice,
            midPrice: normalized.midPrice,
            yesBid: normalized.yesBid,
            yesAsk: normalized.yesAsk,
            noBid: normalized.noBid,
            noAsk: normalized.noAsk,
            volume24h: normalized.volume24h,
            volumeTotal: normalized.volumeTotal,
            liquidity: normalized.liquidity,
            openInterest: normalized.openInterest,
            active: normalized.active,
            category: normalized.category,
            url: normalized.url,
            lastSyncedAt: normalized.lastSyncedAt,
            updatedAt: new Date()
          },
          create: normalized
        });

        synced++;

        if (synced % 10 === 0) {
          console.log(`  ⏳ Synced ${synced}/${marketsToSync.length}...`);
        }
      } catch (error) {
        errors++;
        console.error(
          `  ❌ Error syncing market ${raw.ticker}:`,
          error instanceof Error ? error.message : error
        );
      }
    }

    console.log(`\n✅ Kalshi sync complete:`);
    console.log(`   - Synced: ${synced}`);
    console.log(`   - Errors: ${errors}`);
    console.log(`   - Total: ${marketsToSync.length}`);

    return synced;
  }
}
