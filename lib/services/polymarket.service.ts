import { prisma } from '../prisma';
import { Platform } from '@/lib/db-types';

interface PolymarketMarket {
  id: string;
  question?: string;
  slug?: string;
  title?: string;
  description?: string;
  outcomePrices?: string;
  volume24hr?: string;
  volume?: string;
  liquidity?: string;
  active?: boolean;
  closed?: boolean;
  groupItemTitle?: string;
  category?: string;
  tags?: string[];
  image?: string;
  endDate?: string;
  conditionId?: string;
  eventId?: string;
  eventSlug?: string;
  eventTitle?: string;
}

interface PolymarketEvent {
  id: string;
  slug?: string;
  title?: string;
  markets?: PolymarketMarket[];
}

interface EventInfo {
  id: string;
  slug?: string;
  title?: string;
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
   * Obtiene precios live para un market (para compare/arbitrage)
   * Intenta por externalId (conditionId) primero, luego por slug si falla
   */
  async getLiveMarket(market: {
    externalId: string;
    platform: string;
    slug?: string | null;
  }): Promise<{
    yesPrice: number;
    noPrice: number;
    effectiveYesPrice: number;
    lastUpdated: string;
  } | null> {
    if (market.platform !== 'POLYMARKET') return null;
    try {
      console.log('[Polymarket] Fetching live price for:', market.externalId, market.slug ?? '(no slug)');

      // Intento 1: por conditionId
      let response = await fetch(
        `https://gamma-api.polymarket.com/markets/${encodeURIComponent(market.externalId)}`,
        { headers: { Accept: 'application/json' }, next: { revalidate: 0 } }
      );

      let data = response.ok ? ((await response.json()) as Record<string, unknown>) : null;

      // Intento 2: por slug si falló
      if (!data && market.slug) {
        response = await fetch(
          `https://gamma-api.polymarket.com/markets?slug=${encodeURIComponent(market.slug)}&limit=1`,
          { headers: { Accept: 'application/json' } }
        );
        const arr = response.ok ? (await response.json()) as Record<string, unknown>[] : [];
        data = Array.isArray(arr) && arr.length > 0 ? (arr[0] as Record<string, unknown>) : null;
      }

      if (!data) return null;

      console.log('[Polymarket] Raw outcomePrices:', data.outcomePrices);

      // outcomePrices viene como string JSON: "[\"0.15\",\"0.85\"]" o como array
      let prices: number[] = [];
      const op = data.outcomePrices;
      if (op != null) {
        const raw = typeof op === 'string' ? JSON.parse(op) : op;
        prices = (Array.isArray(raw) ? raw : []).map((p: string | number) => parseFloat(String(p)));
      }

      const yesPrice = prices[0] ?? 0.5;
      const noPrice = prices[1] ?? 1 - yesPrice;
      const effectiveYesPrice = yesPrice * 1.02;

      return {
        yesPrice,
        noPrice,
        effectiveYesPrice,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error(`[Polymarket] getLiveMarket failed for ${market.externalId}:`, error);
      return null;
    }
  }

  /**
   * Obtiene un market por id/conditionId (para precios live - legacy)
   */
  async getMarket(id: string): Promise<{ yesPrice: number; noPrice: number } | null> {
    const result = await this.getLiveMarket({
      externalId: id,
      platform: 'POLYMARKET',
      slug: null
    });
    return result ? { yesPrice: result.yesPrice, noPrice: result.noPrice } : null;
  }

  /**
   * Normaliza un market de Polymarket a nuestro formato.
   * Incluye eventId, eventSlug, eventTitle cuando se provee eventInfo.
   */
  normalizeMarket(raw: PolymarketMarket | Record<string, unknown>, eventInfo?: EventInfo) {
    const r = raw as Record<string, unknown>;
    const question = String(r.question ?? r.title ?? '');
    const slug = String(r.slug ?? r.id ?? '');
    const description = r.description != null ? String(r.description) : null;
    const category = r.groupItemTitle != null ? String(r.groupItemTitle) : r.category != null ? String(r.category) : null;
    const tags = Array.isArray(r.tags) ? (r.tags as string[]) : [];

    return {
      platform: Platform.POLYMARKET,
      externalId: String(r.id ?? r.conditionId ?? r.slug ?? ''),
      question,
      slug,
      description,
      category,
      tags,

      makerFee: 0.02,
      takerFee: 0.02,
      feeStructure: 'flat',

      volume24h: parseFloat(String(r.volume24hr ?? r.volume24h ?? '0')) || 0,
      volumeTotal: parseFloat(String(r.volume ?? r.volumeTotal ?? '0')) || 0,
      liquidity: parseFloat(String(r.liquidity ?? '0')) || 0,

      active: Boolean(r.active !== false && r.closed !== true),
      endDate: r.endDate ? new Date(String(r.endDate)) : null,

      imageUrl:
        typeof r.image === 'string'
          ? r.image
          : typeof r.imageUrl === 'string'
            ? r.imageUrl
            : null,
      url: (() => {
        const s =
          eventInfo?.slug ??
          (typeof r.eventSlug === 'string' ? r.eventSlug : null) ??
          (typeof r.slug === 'string' ? r.slug : null) ??
          slug;
        return s ? `https://polymarket.com/event/${s}` : null;
      })(),

      eventId:
        eventInfo?.id ??
        (typeof r.eventId === 'string' ? r.eventId : null),
      eventSlug:
        eventInfo?.slug ??
        (typeof r.eventSlug === 'string'
          ? r.eventSlug
          : typeof r.slug === 'string'
            ? r.slug
            : null),
      eventTitle:
        eventInfo?.title ??
        (typeof r.eventTitle === 'string'
          ? r.eventTitle
          : typeof r.title === 'string'
            ? r.title
            : null),

      lastSyncedAt: new Date()
    };
  }

  /**
   * Sync completo: Trae TODOS los markets activos ordenados por volumen
   */
  async syncFullToDB(maxMarkets = 50000, startOffset = 0): Promise<number> {
    console.log(`\n🔄 FULL SYNC: Polymarket (max: ${maxMarkets}, startOffset: ${startOffset})...`);

    const startTime = Date.now();
    const MAX_DURATION = 480000; // 8 minutos (margen para evitar timeout Vercel)
    const items: { raw: Record<string, unknown>; event?: EventInfo }[] = [];
    let offset = startOffset;
    const pageSize = 100;

    while (items.length < maxMarkets) {
      if (Date.now() - startTime > MAX_DURATION) {
        console.log(`  ⏰ Time limit (8 min) reached, stopping at ${items.length} markets`);
        break;
      }

      const params = new URLSearchParams({
        active: 'true',
        closed: 'false',
        limit: String(pageSize),
        offset: String(offset)
      });
      // Nota: Removemos order y ascending (causaban 422)
      // Polymarket ya ordena por volume por defecto

      console.log(`  📡 Fetching offset ${offset}...`);

      const response = await fetch(
        `${this.gammaUrl}/events?${params}`,
        { headers: { 'Accept': 'application/json' } }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`  ❌ API error at offset ${offset}: ${response.status}`);
        console.error(`  ❌ Response body: ${errorText}`);
        console.error(`  ❌ URL was: ${this.gammaUrl}/events?${params}`);
        break;
      }

      const events = await response.json() as PolymarketEvent[];

      if (!events || events.length === 0) {
        console.log(`  ✅ No more events, stopping at ${items.length}`);
        break;
      }

      const eventInfo = (e: PolymarketEvent): EventInfo => ({
        id: e.id,
        slug: e.slug,
        title: e.title
      });

      for (const event of events) {
        const markets = event.markets && event.markets.length > 0 ? event.markets : [event as unknown as Record<string, unknown>];
        for (const m of markets) {
          const raw = typeof m === 'object' && m && 'id' in m ? m as Record<string, unknown> : { id: event.id, ...m };
          items.push({ raw, event: eventInfo(event) });
        }
      }

      offset += pageSize;
      console.log(`  📦 Total accumulated: ${items.length}`);

      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`\n💾 Saving ${items.length} markets to DB...`);

    let synced = 0;
    let errors = 0;

    // Guardar UNO POR UNO (sin transacciones - más rápido en Supabase free tier)
    for (let i = 0; i < items.length; i++) {
      if (Date.now() - startTime > MAX_DURATION) {
        console.log(`  ⏰ Time limit reached, saved ${synced} markets`);
        break;
      }

      const { raw, event } = items[i];

      try {
        const normalized = this.normalizeMarket(raw, event);
        const externalId = String(raw.id ?? raw.conditionId ?? raw.slug ?? '');

        await prisma.market.upsert({
          where: {
            platform_externalId: {
              platform: Platform.POLYMARKET,
              externalId
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
            volume24h: normalized.volume24h,
            volumeTotal: normalized.volumeTotal,
            liquidity: normalized.liquidity,
            active: normalized.active,
            endDate: normalized.endDate,
            url: normalized.url,
            imageUrl: normalized.imageUrl,
            lastSyncedAt: new Date(),
            updatedAt: new Date()
          },
          create: normalized
        });

        synced++;

        if (synced % 500 === 0) {
          console.log(`  ⏳ Saved ${synced}/${items.length}...`);
        }
      } catch (error) {
        errors++;
        if (errors <= 10) {
          console.error(`  ❌ Error at ${i}: ${error instanceof Error ? error.message : error}`);
        }
      }
    }

    const duration = Math.round((Date.now() - startTime) / 1000);

    console.log(`\n✅ FULL SYNC COMPLETE:`);
    console.log(`   - Markets synced: ${synced}`);
    console.log(`   - Errors: ${errors}`);
    console.log(`   - Duration: ${duration}s`);
    if (items.length > 0) {
      console.log(`   - Success rate: ${((synced / items.length) * 100).toFixed(1)}%`);
    }

    await prisma.syncLog.create({
      data: {
        platform: Platform.POLYMARKET,
        lastSyncedAt: new Date(),
        marketsCount: synced,
        duration,
        errors
      }
    });

    return synced;
  }

  /**
   * Sync incremental: Solo markets nuevos desde última sync
   */
  async syncIncrementalToDB(): Promise<number> {
    console.log(`\n🔄 INCREMENTAL SYNC: Polymarket...`);

    const lastSync = await prisma.syncLog.findFirst({
      where: { platform: Platform.POLYMARKET },
      orderBy: { lastSyncedAt: 'desc' }
    });

    if (!lastSync) {
      console.log(`  ⚠️ No previous sync found, running full sync...`);
      return this.syncFullToDB();
    }

    const sinceDate = lastSync.lastSyncedAt.toISOString();
    console.log(`  📅 Syncing markets created after: ${sinceDate}`);

    const params = new URLSearchParams({
      active: 'true',
      closed: 'false',
      start_date_min: sinceDate,
      order: 'start_date',
      ascending: 'false',
      limit: '100'
    });

    const response = await fetch(
      `${this.gammaUrl}/events?${params}`,
      { headers: { 'Accept': 'application/json' } }
    );

    if (!response.ok) {
      throw new Error(`Polymarket API error: ${response.status}`);
    }

    const events = await response.json() as PolymarketEvent[];

    const items: { raw: Record<string, unknown>; event?: EventInfo }[] = [];
    const eventInfo = (e: PolymarketEvent): EventInfo => ({
      id: e.id,
      slug: e.slug,
      title: e.title
    });

    for (const event of events ?? []) {
      const markets = event.markets && event.markets.length > 0 ? event.markets : [event as unknown as Record<string, unknown>];
      for (const m of markets) {
        const raw = typeof m === 'object' && m && 'id' in m ? m as Record<string, unknown> : { id: event.id, ...m };
        items.push({ raw, event: eventInfo(event) });
      }
    }

    console.log(`  📦 Found ${items.length} new markets`);

    let synced = 0;
    const startTime = Date.now();

    for (const { raw, event } of items) {
      try {
        const normalized = this.normalizeMarket(raw, event);

        await prisma.market.upsert({
          where: {
            platform_externalId: {
              platform: Platform.POLYMARKET,
              externalId: String(raw.id ?? raw.conditionId ?? raw.slug ?? '')
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
            volume24h: normalized.volume24h,
            volumeTotal: normalized.volumeTotal,
            liquidity: normalized.liquidity,
            active: normalized.active,
            endDate: normalized.endDate,
            url: normalized.url,
            imageUrl: normalized.imageUrl,
            lastSyncedAt: new Date(),
            updatedAt: new Date()
          },
          create: normalized
        });

        synced++;
      } catch (error) {
        console.error(`Error syncing ${raw.id}:`, error);
      }
    }

    const duration = Math.round((Date.now() - startTime) / 1000);

    console.log(`  ✅ Synced ${synced} new markets`);

    await prisma.syncLog.create({
      data: {
        platform: Platform.POLYMARKET,
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
   * Usa paginación (500 por request) para obtener más de 500 markets
   */
  async syncToDB(limit = 100): Promise<number> {
    console.log(`\n🔄 Starting Polymarket sync (limit: ${limit})...`);

    const BATCH_SIZE = 500;
    let markets: PolymarketMarket[] = [];
    let offset = 0;

    while (markets.length < limit) {
      const batch = await this.getMarkets({
        active: true,
        limit: Math.min(BATCH_SIZE, limit - markets.length),
        offset
      });
      if (batch.length === 0) break;
      markets = [...markets, ...batch];
      offset += batch.length;
      if (batch.length < BATCH_SIZE) break;
      await new Promise((r) => setTimeout(r, 300));
    }

    const marketsToSync = markets.slice(0, limit);

    let synced = 0;
    let errors = 0;

    for (const raw of marketsToSync) {
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
            slug: normalized.slug,
            description: normalized.description,
            category: normalized.category,
            tags: normalized.tags,
            eventId: normalized.eventId,
            eventSlug: normalized.eventSlug,
            eventTitle: normalized.eventTitle,
            volume24h: normalized.volume24h,
            volumeTotal: normalized.volumeTotal,
            liquidity: normalized.liquidity,
            active: normalized.active,
            imageUrl: normalized.imageUrl,
            url: normalized.url,
            lastSyncedAt: normalized.lastSyncedAt,
            updatedAt: new Date()
          },
          create: normalized
        });

        synced++;

        if (synced % 50 === 0) {
          console.log(`  ⏳ Synced ${synced}/${marketsToSync.length}...`);
        }
      } catch (error) {
        errors++;
        console.error(`  ❌ Error syncing market ${raw.id}:`, error instanceof Error ? error.message : error);
      }
    }

    console.log(`\n✅ Polymarket sync complete:`);
    console.log(`   - Synced: ${synced}`);
    console.log(`   - Errors: ${errors}`);
    console.log(`   - Total: ${marketsToSync.length}`);

    return synced;
  }
}
