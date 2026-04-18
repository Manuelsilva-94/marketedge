import { prisma } from '@/lib/prisma';
import { Platform } from '@/lib/db-types';
import { KalshiService } from '@/lib/services/kalshi.service';
import { PolymarketService } from '@/lib/services/polymarket.service';

export const DEADLINE_MS = 115_000;
export const POLY_PAGE = 100;
export const KALSHI_EVENTS_LIMIT = 200;
export const INSERT_CHUNK = 400;
export const ID_CHUNK = 800;

export async function createManyChunked<T extends Record<string, unknown>>(
  rows: T[],
  chunk = INSERT_CHUNK
): Promise<void> {
  for (let i = 0; i < rows.length; i += chunk) {
    const slice = rows.slice(i, i + chunk) as T[];
    await prisma.market.createMany({ data: slice as never[], skipDuplicates: true });
  }
}

export type KalshiDiscoverResult = {
  fetched: number;
  newInDB: number;
  pages: number;
  durationMs: number;
  error?: string;
};

export type PolymarketDiscoverResult = {
  fetched: number;
  newInDB: number;
  pages: number;
  durationMs: number;
  error?: string;
};

/**
 * Kalshi: /events con nested markets hasta cursor nulo o `deadline`.
 */
export async function runDiscoverKalshi(deadline: number): Promise<KalshiDiscoverResult> {
  const start = Date.now();
  const out: KalshiDiscoverResult = { fetched: 0, newInDB: 0, pages: 0, durationMs: 0 };

  try {
    const kalshiService = new KalshiService();
    type KalshiMarketArg = Parameters<typeof kalshiService.normalizeMarketFromEvent>[0];
    type KalshiEventArg = Parameters<typeof kalshiService.normalizeMarketFromEvent>[1];

    let cursor: string | undefined;
    const allMarkets: Array<{ market: KalshiMarketArg; event: KalshiEventArg }> = [];

    while (Date.now() < deadline) {
      const params = new URLSearchParams({
        with_nested_markets: 'true',
        limit: String(KALSHI_EVENTS_LIMIT)
      });
      if (cursor) params.set('cursor', cursor);

      const baseUrl = 'https://api.elections.kalshi.com/trade-api/v2';
      const path = '/trade-api/v2/events';
      // @ts-expect-error accessing private auth
      const headers = kalshiService.auth.getHeaders('GET', path);

      const response = await fetch(`${baseUrl}/events?${params}`, { headers });
      if (!response.ok) {
        console.error(`[discover-kalshi] Kalshi events API error: ${response.status}`);
        break;
      }

      const data = await response.json() as {
        events: Array<{
          event_ticker: string;
          event_slug?: string;
          series_ticker?: string;
          title?: string;
          markets?: Array<Record<string, unknown>>;
        }>;
        cursor?: string;
      };

      for (const event of data.events ?? []) {
        if (!event.markets?.length) continue;
        for (const market of event.markets) {
          allMarkets.push({
            market: market as unknown as KalshiMarketArg,
            event: event as unknown as KalshiEventArg
          });
        }
      }

      out.pages += 1;
      cursor = data.cursor;
      if (!cursor) break;
      await new Promise((r) => setTimeout(r, 120));
    }

    out.fetched = allMarkets.length;
    console.log(`[discover-kalshi] Fetched ${allMarkets.length} markets (${out.pages} event pages)`);

    if (allMarkets.length > 0) {
      const tickers = allMarkets
        .map(({ market }) => (market as { ticker: string }).ticker)
        .filter(Boolean);
      const existingSet = new Set<string>();
      for (let i = 0; i < tickers.length; i += ID_CHUNK) {
        const slice = tickers.slice(i, i + ID_CHUNK);
        const existing = await prisma.market.findMany({
          where: { platform: 'KALSHI', externalId: { in: slice } },
          select: { externalId: true }
        });
        for (const m of existing) existingSet.add(m.externalId);
      }

      const newMarkets = allMarkets.filter(({ market }) => {
        const ticker = (market as { ticker: string }).ticker;
        return ticker && !existingSet.has(ticker);
      });

      if (newMarkets.length > 0) {
        console.log(`[discover-kalshi] ${newMarkets.length} new markets to insert`);
        const normalized = newMarkets.map(({ market, event }) =>
          kalshiService.normalizeMarketFromEvent(
            market as KalshiMarketArg,
            event as KalshiEventArg
          )
        );
        await createManyChunked(normalized);
        out.newInDB = newMarkets.length;
      }
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[discover-kalshi] error:', err);
    out.error = msg;
  }

  out.durationMs = Date.now() - start;
  return out;
}

/**
 * Polymarket: paginar Gamma /events hasta vacío o `deadline`.
 */
export async function runDiscoverPolymarket(deadline: number): Promise<PolymarketDiscoverResult> {
  const start = Date.now();
  const out: PolymarketDiscoverResult = { fetched: 0, newInDB: 0, pages: 0, durationMs: 0 };

  try {
    const polyService = new PolymarketService();
    let offset = 0;
    let totalNew = 0;
    let totalFetched = 0;

    while (Date.now() < deadline) {
      const response = await fetch(
        `https://gamma-api.polymarket.com/events?active=true&closed=false&limit=${POLY_PAGE}&offset=${offset}`,
        { headers: { Accept: 'application/json' } }
      );

      if (!response.ok) {
        console.error(`[discover-polymarket] API error: ${response.status}`);
        break;
      }

      const events = (await response.json()) as Array<{
        id: string;
        slug?: string;
        title?: string;
        markets?: Array<Record<string, unknown>>;
      }>;

      if (!events?.length) break;

      out.pages += 1;

      const pageMarkets: Array<{
        raw: Record<string, unknown>;
        eventInfo: { id: string; slug?: string; title?: string };
      }> = [];

      for (const event of events) {
        const eventInfo = { id: event.id, slug: event.slug, title: event.title };
        const eventMarkets = event.markets;
        const markets: Array<Record<string, unknown>> =
          eventMarkets != null && eventMarkets.length > 0
            ? eventMarkets
            : [event as unknown as Record<string, unknown>];
        for (const m of markets) {
          const raw =
            typeof m === 'object' && m && 'id' in m ? (m as Record<string, unknown>) : { id: event.id, ...m };
          pageMarkets.push({ raw, eventInfo });
        }
      }

      totalFetched += pageMarkets.length;

      if (pageMarkets.length > 0) {
        const externalIds = pageMarkets
          .map(({ raw }) => String(raw.id ?? raw.conditionId ?? raw.slug ?? ''))
          .filter(Boolean);

        const existingSet = new Set<string>();
        for (let i = 0; i < externalIds.length; i += ID_CHUNK) {
          const slice = externalIds.slice(i, i + ID_CHUNK);
          const existing = await prisma.market.findMany({
            where: { platform: 'POLYMARKET', externalId: { in: slice } },
            select: { externalId: true }
          });
          for (const m of existing) existingSet.add(m.externalId);
        }

        const newMarkets = pageMarkets.filter(({ raw }) => {
          const id = String(raw.id ?? raw.conditionId ?? raw.slug ?? '');
          return id && !existingSet.has(id);
        });

        if (newMarkets.length > 0) {
          const normalized = newMarkets.map(({ raw, eventInfo }) =>
            polyService.normalizeMarket(raw, eventInfo)
          );
          await createManyChunked(normalized);
          totalNew += newMarkets.length;
          console.log(
            `[discover-polymarket] offset=${offset}: +${newMarkets.length} new (page markets=${pageMarkets.length})`
          );
        }
      }

      offset += POLY_PAGE;
      if (events.length < POLY_PAGE) break;
      await new Promise((r) => setTimeout(r, 80));
    }

    out.fetched = totalFetched;
    out.newInDB = totalNew;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[discover-polymarket] error:', err);
    out.error = msg;
  }

  out.durationMs = Date.now() - start;
  return out;
}

export async function writeSyncLogIfNeeded(
  platform: Platform,
  newCount: number,
  durationMs: number,
  errors: number
): Promise<void> {
  if (newCount <= 0) return;
  await prisma.syncLog.create({
    data: {
      platform,
      lastSyncedAt: new Date(),
      marketsCount: newCount,
      duration: Math.round(durationMs / 1000),
      errors
    }
  });
}
