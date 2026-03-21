import { prisma } from '../prisma';
import { Platform } from '@/lib/db-types';
import { KalshiAuth } from './kalshi-auth';

interface KalshiMarket {
  ticker: string;
  event_ticker: string;
  title: string;
  subtitle?: string;
  yes_sub_title?: string;
  category: string;
  status: string;
  yes_bid?: number;
  yes_ask?: number;
  no_bid?: number;
  no_ask?: number;
  last_price?: number;
  volume?: number;
  volume_24h?: number;
  liquidity?: number;
  open_interest?: number;
  close_time?: string;
  expiration_time?: string;
  created_time?: string;
}

interface KalshiEvent {
  event_ticker: string;
  event_slug?: string;
  series_ticker?: string;
  title?: string;
  sub_title?: string;
  category?: string;
  markets?: KalshiMarket[];
}

interface KalshiMarketsResponse {
  markets: KalshiMarket[];
  cursor?: string;
}

interface KalshiEventsResponse {
  events: KalshiEvent[];
  cursor?: string;
}

/**
 * Construye la question única y descriptiva para un market de Kalshi.
 * event.title: título del evento padre
 * market.title: título genérico del market
 * market.subtitle: descripción del strike/threshold (ej: "$74,500 or above")
 * market.yes_sub_title: descripción del outcome YES (ej: "Shai Gilgeous-Alexander")
 */
export function buildKalshiQuestion(
  market: { title?: string; subtitle?: string; ticker?: string; yes_sub_title?: string },
  event?: { title?: string }
): string {
  const eventTitle = event?.title?.trim() || '';
  const yesSubTitle = market.yes_sub_title?.trim() || '';
  const subtitle = market.subtitle?.trim() || '';
  const marketTitle = market.title?.trim() || '';

  // Caso 1: market.title es específico y diferente del event.title
  if (marketTitle && marketTitle !== eventTitle && marketTitle.length > 15) {
    const suffix = yesSubTitle || subtitle;
    return suffix ? `${marketTitle} — ${suffix}` : marketTitle;
  }

  // Caso 2: event.title + yes_sub_title (Sports, Mentions, la mayoría)
  if (eventTitle && yesSubTitle) {
    return `${eventTitle} — ${yesSubTitle}`;
  }

  // Caso 3: event.title + subtitle (Crypto pricing con threshold)
  if (eventTitle && subtitle) {
    return `${eventTitle} — ${subtitle}`;
  }

  // Caso 4: solo event.title
  if (eventTitle) return eventTitle;

  return marketTitle || market.ticker || 'Unknown market';
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
   * Obtiene precios live para un market (para compare/arbitrage)
   */
  async getLiveMarket(market: { externalId: string; platform: string }): Promise<{
    yesPrice: number;
    noPrice: number;
    effectiveYesPrice: number;
    lastUpdated: string;
  } | null> {
    if (market.platform !== Platform.KALSHI) return null;
    try {
      const path = `/trade-api/v2/markets/${market.externalId}`;
      const url = `${this.baseUrl}/markets/${market.externalId}`;
      const headers = this.auth.getHeaders('GET', path);

      const response = await fetch(url, {
        headers,
        next: { revalidate: 0 }
      });

      if (!response.ok) {
        console.error(`[Kalshi] Failed to fetch ${market.externalId}:`, response.status);
        return null;
      }

      const { market: kalshiMarket } = (await response.json()) as { market: KalshiMarket };

      // Kalshi usa yes_bid/yes_ask en centavos (0-100)
      const yesBid = (kalshiMarket.yes_bid ?? 50) / 100;
      const yesAsk = (kalshiMarket.yes_ask ?? 50) / 100;
      const yesPrice = (yesBid + yesAsk) / 2;
      const noPrice = 1 - yesPrice;

      // Kalshi fee: 7% del profit
      const effectiveYesPrice = yesPrice + 0.07 * (1 - yesPrice);

      console.log(`[Kalshi] ${market.externalId}: yes=${yesPrice.toFixed(3)}, no=${noPrice.toFixed(3)}`);

      return {
        yesPrice,
        noPrice,
        effectiveYesPrice,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error(`[Kalshi] getLiveMarket failed for ${market.externalId}:`, error);
      return null;
    }
  }

  /**
   * Obtiene un market por ticker (para precios live - legacy)
   */
  async getMarket(ticker: string): Promise<KalshiMarket | null> {
    const path = `/trade-api/v2/markets/${ticker}`;
    const url = `${this.baseUrl}/markets/${ticker}`;
    try {
      const headers = this.auth.getHeaders('GET', path);
      const response = await fetch(url, { headers });
      if (!response.ok) return null;
      const data = (await response.json()) as { market?: KalshiMarket };
      return data.market ?? null;
    } catch {
      return null;
    }
  }

  /**
   * Construye la pregunta correcta combinando event.title, market.yes_sub_title, market.subtitle
   * Basado en la estructura real de la API de Kalshi.
   */
  private buildKalshiQuestion(market: KalshiMarket, event?: KalshiEvent): string {
    return buildKalshiQuestion(market, event);
  }

  /**
   * Normaliza un market de Kalshi a nuestro formato (sin event)
   */
  normalizeMarket(raw: KalshiMarket, event?: KalshiEvent) {
    const question = event ? this.buildKalshiQuestion(raw, event) : raw.subtitle || raw.title;
    return {
      platform: Platform.KALSHI,
      externalId: raw.ticker,
      question,
      slug: raw.ticker.toLowerCase(),
      description: raw.subtitle || null,
      category: raw.category || null,
      tags: [],

      makerFee: 0.07,
      takerFee: 0.07,
      feeStructure: 'payout_based',

      volume24h: raw.volume_24h ?? 0,
      volumeTotal: raw.volume ?? 0,
      liquidity: raw.liquidity ?? 0,
      openInterest: raw.open_interest ?? 0,

      active: raw.status === 'open' || raw.status === 'active',
      endDate: raw.close_time ? new Date(raw.close_time) : null,

      imageUrl: null,
      url: `https://kalshi.com/markets/${raw.ticker.toLowerCase()}`,

      eventId: event?.event_ticker || raw.event_ticker || null,
      eventSlug: (event?.event_slug ?? event?.event_ticker ?? raw.event_ticker) || null,
      eventTitle: event?.title || null,
      seriesId: event?.series_ticker || null,

      lastSyncedAt: new Date()
    };
  }

  /**
   * Normaliza un market de Kalshi con event (para full sync desde /events)
   * Usa buildKalshiQuestion para construir la pregunta correcta por outcome
   */
  normalizeMarketFromEvent(market: KalshiMarket, event: KalshiEvent) {
    const base = this.normalizeMarket(market, event);
    return {
      ...base,
      eventId: event.event_ticker || market.event_ticker || null,
      eventSlug: (event.event_slug ?? event.event_ticker ?? market.event_ticker) || null,
      eventTitle: event.title || null,
      seriesId: event.series_ticker || null
    };
  }

  /**
   * Sync completo desde /events con nested markets
   */
  async syncFullEventsToDB(maxMarkets = 50000): Promise<number> {
    console.log(`\n🔄 FULL SYNC: Kalshi Events (max: ${maxMarkets})...`);

    const startTime = Date.now();
    const MAX_DURATION = 480000; // 8 minutos (margen para evitar timeout Vercel)
    const allMarkets: Array<{ market: KalshiMarket; event: KalshiEvent }> = [];
    let cursor: string | undefined;

    const path = '/trade-api/v2/events';

    do {
      if (Date.now() - startTime > MAX_DURATION) {
        console.log(`  ⏰ Time limit (8 min) reached, stopping at ${allMarkets.length} markets`);
        break;
      }

      const params = new URLSearchParams({
        with_nested_markets: 'true',
        limit: '200'
      });
      if (cursor) params.set('cursor', cursor);

      const url = `${this.baseUrl}/events?${params}`;
      const headers = this.auth.getHeaders('GET', path);

      console.log(`  📡 Fetching events (cursor: ${cursor || 'initial'})...`);

      const response = await fetch(url, { headers });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`  ❌ API error: ${response.status} - ${errorText}`);
        break;
      }

      const data = (await response.json()) as KalshiEventsResponse;

      for (const event of data.events || []) {
        if (event.markets && event.markets.length > 0) {
          for (const market of event.markets) {
            allMarkets.push({ market, event });
            if (allMarkets.length >= maxMarkets) break;
          }
        }
        if (allMarkets.length >= maxMarkets) break;
      }

      cursor = data.cursor;

      console.log(`  📦 Total accumulated: ${allMarkets.length}`);

      await new Promise((resolve) => setTimeout(resolve, 100));
    } while (cursor && allMarkets.length < maxMarkets);

    console.log(`\n💾 Saving ${allMarkets.length} markets to DB...`);

    let synced = 0;
    let errors = 0;
    const BATCH_SIZE = 50;

    const updateFields = (normalized: ReturnType<typeof this.normalizeMarketFromEvent>) => ({
      question: normalized.question,
      slug: normalized.slug,
      description: normalized.description,
      category: normalized.category,
      tags: normalized.tags,
      eventId: normalized.eventId,
      eventSlug: normalized.eventSlug,
      eventTitle: normalized.eventTitle,
      seriesId: normalized.seriesId,
      volume24h: normalized.volume24h,
      volumeTotal: normalized.volumeTotal,
      liquidity: normalized.liquidity,
      active: normalized.active,
      endDate: normalized.endDate,
      url: normalized.url,
      lastSyncedAt: new Date(),
      updatedAt: new Date()
    });

    for (let i = 0; i < allMarkets.length; i += BATCH_SIZE) {
      if (Date.now() - startTime > MAX_DURATION) {
        console.log(`  ⏰ Time limit reached during save, saved ${synced} so far`);
        break;
      }

      const batch = allMarkets.slice(i, i + BATCH_SIZE);

      try {
        const operations = batch.map(({ market, event }) => {
          const normalized = this.normalizeMarketFromEvent(market, event);
          return prisma.market.upsert({
            where: {
              platform_externalId: {
                platform: Platform.KALSHI,
                externalId: market.ticker
              }
            },
            update: updateFields(normalized),
            create: normalized
          });
        });

        await prisma.$transaction(operations);
        synced += batch.length;

        if (synced % 500 === 0 || i + BATCH_SIZE >= allMarkets.length) {
          console.log(`  ⏳ Saved ${synced}/${allMarkets.length}...`);
        }
      } catch (error) {
        errors += batch.length;
        console.error(`  ❌ Batch error at ${i}:`, error instanceof Error ? error.message : error);

        for (const { market, event } of batch) {
          try {
            const normalized = this.normalizeMarketFromEvent(market, event);
            await prisma.market.upsert({
              where: {
                platform_externalId: {
                  platform: Platform.KALSHI,
                  externalId: market.ticker
                }
              },
              update: updateFields(normalized),
              create: normalized
            });
            synced++;
            errors--;
          } catch (singleError) {
            console.error(`    ❌ Individual error: ${market.ticker}`);
          }
        }
      }
    }

    const duration = Math.round((Date.now() - startTime) / 1000);

    console.log(`\n✅ FULL SYNC COMPLETE:`);
    console.log(`   - Synced: ${synced}`);
    console.log(`   - Errors: ${errors}`);
    console.log(`   - Duration: ${duration}s`);

    await prisma.syncLog.create({
      data: {
        platform: Platform.KALSHI,
        lastSyncedAt: new Date(),
        marketsCount: synced,
        duration,
        errors
      }
    });

    return synced;
  }

  /**
   * Sync incremental con min_created_ts
   */
  async syncIncrementalToDB(): Promise<number> {
    console.log(`\n🔄 INCREMENTAL SYNC: Kalshi...`);

    const lastSync = await prisma.syncLog.findFirst({
      where: { platform: Platform.KALSHI },
      orderBy: { lastSyncedAt: 'desc' }
    });

    if (!lastSync) {
      console.log(`  ⚠️ No previous sync found, running full sync...`);
      return this.syncFullEventsToDB();
    }

    const sinceTs = Math.floor(lastSync.lastSyncedAt.getTime() / 1000);

    const path = '/trade-api/v2/markets';
    const params = new URLSearchParams({
      status: 'open',
      min_created_ts: String(sinceTs),
      limit: '1000'
    });

    const url = `${this.baseUrl}/markets?${params}`;
    const headers = this.auth.getHeaders('GET', path);

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`Kalshi API error: ${response.status}`);
    }

    const data = (await response.json()) as KalshiMarketsResponse;
    const markets = data.markets || [];

    console.log(`  📦 Found ${markets.length} new markets`);

    let synced = 0;
    const startTime = Date.now();

    for (const market of markets) {
      try {
        const normalized = this.normalizeMarket(market);

        await prisma.market.upsert({
          where: {
            platform_externalId: {
              platform: Platform.KALSHI,
              externalId: market.ticker
            }
          },
          update: {
            question: normalized.question,
            slug: normalized.slug,
            description: normalized.description,
            category: normalized.category,
            eventId: normalized.eventId,
            eventSlug: normalized.eventSlug,
            volume24h: normalized.volume24h,
            volumeTotal: normalized.volumeTotal,
            liquidity: normalized.liquidity,
            active: normalized.active,
            endDate: normalized.endDate,
            url: normalized.url,
            lastSyncedAt: new Date(),
            updatedAt: new Date()
          },
          create: normalized
        });

        synced++;
      } catch (error) {
        console.error(`Error syncing ${market.ticker}:`, error);
      }
    }

    const duration = Math.round((Date.now() - startTime) / 1000);

    console.log(`  ✅ Synced ${synced} new markets`);

    await prisma.syncLog.create({
      data: {
        platform: Platform.KALSHI,
        lastSyncedAt: new Date(),
        marketsCount: synced,
        duration,
        errors: 0
      }
    });

    return synced;
  }

  /**
   * Sincroniza markets a la base de datos (legacy - usa /markets)
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
            slug: normalized.slug,
            description: normalized.description,
            category: normalized.category,
            tags: normalized.tags,
            eventId: normalized.eventId,
            eventSlug: normalized.eventSlug,
            eventTitle: normalized.eventTitle,
            seriesId: normalized.seriesId,
            volume24h: normalized.volume24h,
            volumeTotal: normalized.volumeTotal,
            liquidity: normalized.liquidity,
            openInterest: normalized.openInterest,
            active: normalized.active,
            endDate: normalized.endDate,
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
