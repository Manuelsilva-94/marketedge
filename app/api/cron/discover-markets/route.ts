import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Platform } from '@/lib/db-types';
import { KalshiService } from '@/lib/services/kalshi.service';
import { PolymarketService } from '@/lib/services/polymarket.service';
import { requireCronAuth } from '@/lib/cron-auth';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;
export const preferredRegion = 'iad1';

export async function GET(req: NextRequest) {
  const authError = requireCronAuth(req);
  if (authError) return authError;

  const startTime = Date.now();
  const results = {
    kalshi: { fetched: 0, newInDB: 0 },
    polymarket: { fetched: 0, newInDB: 0 },
    durationMs: 0
  };

  // ── KALSHI: usar /events con nested markets (evita parlays) ──────────
  // El endpoint /markets devuelve primero miles de parlays KXMVE*.
  // El endpoint /events devuelve eventos reales con sus markets anidados.
  try {
    const kalshiService = new KalshiService();
    type KalshiMarketArg = Parameters<typeof kalshiService.normalizeMarketFromEvent>[0];
    type KalshiEventArg = Parameters<typeof kalshiService.normalizeMarketFromEvent>[1];

    // Fetch las primeras 3 páginas de eventos (600 events = ~1000-2000 markets)
    const MAX_EVENT_PAGES = 3;
    let cursor: string | undefined;
    const allMarkets: Array<{ market: KalshiMarketArg; event: KalshiEventArg }> = [];

    for (let page = 0; page < MAX_EVENT_PAGES; page++) {
      const params = new URLSearchParams({ with_nested_markets: 'true', limit: '200' });
      if (cursor) params.set('cursor', cursor);

      const baseUrl = 'https://api.elections.kalshi.com/trade-api/v2';
      const path = '/trade-api/v2/events';
      // @ts-expect-error accessing private auth
      const headers = kalshiService.auth.getHeaders('GET', path);

      const response = await fetch(`${baseUrl}/events?${params}`, { headers });
      if (!response.ok) {
        console.error(`[discover] Kalshi events API error: ${response.status}`);
        break;
      }

      const data = await response.json() as { events: Array<{ event_ticker: string; event_slug?: string; series_ticker?: string; title?: string; markets?: Array<Record<string, unknown>> }>; cursor?: string };

      for (const event of data.events ?? []) {
        if (!event.markets?.length) continue;
        for (const market of event.markets) {
          allMarkets.push({
            market: market as unknown as KalshiMarketArg,
            event: event as unknown as KalshiEventArg
          });
        }
      }

      cursor = data.cursor;
      if (!cursor) break;
      await new Promise(r => setTimeout(r, 150));
    }

    results.kalshi.fetched = allMarkets.length;
    console.log(`[discover] Kalshi: fetched ${allMarkets.length} markets from events`);

    if (allMarkets.length > 0) {
      // Verificar cuáles ya existen en DB en batch
      const tickers = allMarkets.map(({ market }) => (market as { ticker: string }).ticker).filter(Boolean);
      const existing = await prisma.market.findMany({
        where: { platform: 'KALSHI', externalId: { in: tickers } },
        select: { externalId: true }
      });
      const existingSet = new Set(existing.map((m: { externalId: string }) => m.externalId));

      const newMarkets = allMarkets.filter(({ market }) => {
        const ticker = (market as { ticker: string }).ticker;
        return ticker && !existingSet.has(ticker);
      });

      if (newMarkets.length > 0) {
        console.log(`[discover] Kalshi: ${newMarkets.length} new markets to insert`);
        const normalized = newMarkets.map(({ market, event }) =>
          kalshiService.normalizeMarketFromEvent(
            market as KalshiMarketArg,
            event as KalshiEventArg
          )
        );
        await prisma.market.createMany({ data: normalized, skipDuplicates: true });
        results.kalshi.newInDB = newMarkets.length;
      }
    }
  } catch (err) {
    console.error('[discover] Kalshi error:', err);
  }

  // ── POLYMARKET: últimos 100 eventos ──────────────────────────────────
  try {
    const polyService = new PolymarketService();

    const response = await fetch(
      'https://gamma-api.polymarket.com/events?active=true&closed=false&limit=100&offset=0',
      { headers: { Accept: 'application/json' } }
    );

    if (!response.ok) {
      console.error(`[discover] Polymarket API error: ${response.status}`);
    } else {
      const events = await response.json() as Array<{
        id: string; slug?: string; title?: string;
        markets?: Array<Record<string, unknown>>;
      }>;

      const allMarkets: Array<{ raw: Record<string, unknown>; eventInfo: { id: string; slug?: string; title?: string } }> = [];

      for (const event of events ?? []) {
        const eventInfo = { id: event.id, slug: event.slug, title: event.title };
        const eventMarkets = event.markets;
        const markets: Array<Record<string, unknown>> =
          eventMarkets != null && eventMarkets.length > 0
            ? eventMarkets
            : [event as unknown as Record<string, unknown>];
        for (const m of markets) {
          const raw = typeof m === 'object' && m && 'id' in m ? m as Record<string, unknown> : { id: event.id, ...m };
          allMarkets.push({ raw, eventInfo });
        }
      }

      results.polymarket.fetched = allMarkets.length;

      if (allMarkets.length > 0) {
        const externalIds = allMarkets
          .map(({ raw }) => String(raw.id ?? raw.conditionId ?? raw.slug ?? ''))
          .filter(Boolean);

        const existing = await prisma.market.findMany({
          where: { platform: 'POLYMARKET', externalId: { in: externalIds } },
          select: { externalId: true }
        });
        const existingSet = new Set(existing.map((m: { externalId: string }) => m.externalId));

        const newMarkets = allMarkets.filter(({ raw }) => {
          const id = String(raw.id ?? raw.conditionId ?? raw.slug ?? '');
          return id && !existingSet.has(id);
        });

        if (newMarkets.length > 0) {
          const normalized = newMarkets.map(({ raw, eventInfo }) =>
            polyService.normalizeMarket(raw, eventInfo)
          );
          await prisma.market.createMany({ data: normalized, skipDuplicates: true });
          results.polymarket.newInDB = newMarkets.length;
          console.log(`[discover] Polymarket: ${newMarkets.length} new markets inserted`);
        }
      }
    }
  } catch (err) {
    console.error('[discover] Polymarket error:', err);
  }

  results.durationMs = Date.now() - startTime;
  console.log(`[discover-markets] Done in ${results.durationMs}ms`, results);

  if (results.kalshi.newInDB > 0 || results.polymarket.newInDB > 0) {
    await prisma.syncLog.create({
      data: {
        platform: Platform.KALSHI,
        lastSyncedAt: new Date(),
        marketsCount: results.kalshi.newInDB + results.polymarket.newInDB,
        duration: Math.round(results.durationMs / 1000),
        errors: 0
      }
    });
  }

  return NextResponse.json(results);
}