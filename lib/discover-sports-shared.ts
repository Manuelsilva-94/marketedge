/**
 * Sports-only discovery: smaller API surface than full discover-markets-shared.
 * Kalshi: /events?series_ticker=&status=open. Polymarket: /sports + /events?tag_id=.
 * Inserts use skipDuplicates (no pre-read) via createManyChunked from discover-markets-shared.
 */

import { prisma } from '@/lib/prisma';
import { KalshiService } from '@/lib/services/kalshi.service';
import { PolymarketService } from '@/lib/services/polymarket.service';
import { MatcherService } from '@/lib/services/matcher.service';
import { SemanticMatcherService } from '@/lib/services/semantic-matcher.service';
import { createManyChunked } from '@/lib/discover-markets-shared';
import type { Market } from '@/lib/db-types';
import { extractSearchKeywords, searchPolymarketCandidates } from '@/lib/polymarket-search';

const GAMMA = 'https://gamma-api.polymarket.com';
const KALSHI_BASE = 'https://api.elections.kalshi.com/trade-api/v2';

/** High-value sports series on Kalshi (subset of sports category; tune as needed). */
export const SPORTS_SERIES_TICKERS: string[] = [
  'KXUCL',
  'KXUCLGAME',
  'KXUCL16',
  'KXEPLGAME',
  'KXEPL',
  'KXEPLTOTAL',
  'KXEPLSPREAD',
  'KXNFLGAME',
  'KXNFLSBMVP',
  'KXNBAGAME',
  'KXNBASPREAD',
  'KXMLBGAME',
  'KXMLBSPREAD',
  'KXNHLGAME',
  'KXNHLSPREAD',
  'KXF1RACE',
  'KXF1',
  'KXUFC',
  'KXUFCFIGHT',
  'KXFIFAGAME',
  'KXUELGAME',
  'KXUECLGAME',
  'KXLALIGAGAME',
  'KXLALIGA',
  'KXSERIEAGAME',
  'KXSERIEA',
  'KXBUNDESLIGAGAME',
  'KXBUNDESLIGA',
  'KXNCAAFGAME',
  'KXNCAABGAME',
  'KXWNBA',
  'KXWNBGAME',
  'KXATPMATCH',
  'KXWTAGAME',
  'KXPGATOUR',
  'KXUFCMIDDLEWEIGHTTITLE',
  'KXUFCFEATHERWEIGHTTITLE'
];

const POLY_PAGE = 80;
/** Umbral de keywords para ser candidato (antes de LLM) */
const KEYWORD_AUTO_MATCH_MIN = 0.85; // Bajado de 0.92 para capturar más candidatos
/** Umbral de confianza LLM para crear el par */
const SEMANTIC_CONFIDENCE_MIN = 0.82;
const MAX_AUTO_MATCH_KALSHI = 12;
const GROQ_DELAY_MS = 1100; // Delay entre llamadas LLM

export type SportsDiscoverKalshiResult = {
  fetched: number;
  newInDB: number;
  seriesPages: number;
  durationMs: number;
  error?: string;
};

export type SportsDiscoverPolymarketResult = {
  fetched: number;
  newInDB: number;
  tagPages: number;
  durationMs: number;
  error?: string;
};

export type SportsKeywordAutoMatchResult = {
  pairsCreated: number;
  candidatesChecked: number;
  llmEvaluated: number;
  llmRejected: number;
  durationMs: number;
};

type SportsKalshiCandidate = {
  id: string;
  externalId: string;
  question: string;
  slug: string;
  seriesId: string | null;
  endDate: Date | null;
  volume24h: number;
};

async function loadLiveKalshiSportsCandidates(
  deadline: number,
  maxCandidates: number
): Promise<SportsKalshiCandidate[]> {
  const kalshiService = new KalshiService();
  const out: SportsKalshiCandidate[] = [];
  const seen = new Set<string>();

  for (const seriesTicker of SPORTS_SERIES_TICKERS) {
    if (Date.now() >= deadline || out.length >= maxCandidates) break;
    const { markets } = await fetchKalshiSportsEventsPage(kalshiService, seriesTicker);
    for (const item of markets) {
      if (Date.now() >= deadline || out.length >= maxCandidates) break;
      const normalized = kalshiService.normalizeMarketFromEvent(item.market, item.event);
      if (!normalized.externalId || seen.has(normalized.externalId)) continue;
      seen.add(normalized.externalId);
      out.push({
        id: `temp_kalshi_${normalized.externalId}`,
        externalId: normalized.externalId,
        question: normalized.question,
        slug: normalized.slug,
        seriesId: normalized.seriesId ?? null,
        endDate: normalized.endDate ?? null,
        volume24h: normalized.volume24h ?? 0
      });
    }
  }
  return out;
}

async function fetchKalshiSportsEventsPage(
  kalshiService: KalshiService,
  seriesTicker: string,
  cursor?: string
): Promise<{
  markets: Array<{ market: Parameters<KalshiService['normalizeMarketFromEvent']>[0]; event: Parameters<KalshiService['normalizeMarketFromEvent']>[1] }>;
  cursor?: string;
}> {
  const params = new URLSearchParams({
    series_ticker: seriesTicker,
    status: 'open',
    with_nested_markets: 'true',
    limit: '200'
  });
  if (cursor) params.set('cursor', cursor);

  const path = '/trade-api/v2/events';
  // @ts-expect-error private auth
  const headers = kalshiService.auth.getHeaders('GET', path);
  const res = await fetch(`${KALSHI_BASE}/events?${params}`, { headers });
  if (!res.ok) {
    console.warn(`[discover-sports-kalshi] ${seriesTicker} HTTP ${res.status}`);
    return { markets: [] };
  }
  const data = (await res.json()) as {
    events?: Array<{
      event_ticker: string;
      event_slug?: string;
      series_ticker?: string;
      title?: string;
      markets?: Array<Record<string, unknown>>;
    }>;
    cursor?: string;
  };

  const markets: Array<{
    market: Parameters<KalshiService['normalizeMarketFromEvent']>[0];
    event: Parameters<KalshiService['normalizeMarketFromEvent']>[1];
  }> = [];

    for (const event of data.events ?? []) {
    if (!event.markets?.length) continue;
    for (const market of event.markets) {
      markets.push({
        market: market as unknown as Parameters<KalshiService['normalizeMarketFromEvent']>[0],
        event: event as unknown as Parameters<KalshiService['normalizeMarketFromEvent']>[1]
      });
    }
  }

  return { markets, cursor: data.cursor };
}

/**
 * Paginate open events for curated sports series until `deadline`.
 */
export async function runDiscoverSportsKalshi(deadline: number): Promise<SportsDiscoverKalshiResult> {
  const start = Date.now();
  const out: SportsDiscoverKalshiResult = {
    fetched: 0,
    newInDB: 0,
    seriesPages: 0,
    durationMs: 0
  };

  try {
    const kalshiService = new KalshiService();
    type M = Parameters<KalshiService['normalizeMarketFromEvent']>[0];
    type E = Parameters<KalshiService['normalizeMarketFromEvent']>[1];
    const allMarkets: Array<{ market: M; event: E }> = [];

    for (const seriesTicker of SPORTS_SERIES_TICKERS) {
      if (Date.now() >= deadline) break;
      let cursor: string | undefined;
      let pagesForSeries = 0;
      do {
        if (Date.now() >= deadline) break;
        const { markets, cursor: next } = await fetchKalshiSportsEventsPage(
          kalshiService,
          seriesTicker,
          cursor
        );
        pagesForSeries += 1;
        out.seriesPages += 1;
        allMarkets.push(...markets);
        cursor = next;
        if (!cursor || markets.length === 0) break;
        await new Promise((r) => setTimeout(r, 80));
      } while (cursor && pagesForSeries < 25);
    }

    out.fetched = allMarkets.length;

    if (allMarkets.length > 0) {
      const normalized = allMarkets
        .filter(({ market }) => Boolean((market as { ticker?: string }).ticker))
        .map(({ market, event }) => kalshiService.normalizeMarketFromEvent(market, event));
      out.newInDB = await createManyChunked(normalized as Record<string, unknown>[]);
      console.log(
        `[discover-sports-kalshi] fetched=${out.fetched} inserted=${out.newInDB} (${out.seriesPages} API pages)`
      );
    }
  } catch (err) {
    out.error = err instanceof Error ? err.message : String(err);
    console.error('[discover-sports-kalshi]', err);
  }

  out.durationMs = Date.now() - start;
  return out;
}

type GammaSportTag = { id?: number; tag_id?: number; sport?: string };

/**
 * Polymarket Gamma: /sports then /events?tag_id= per tag (paginated) until deadline.
 */
export async function runDiscoverSportsPolymarket(deadline: number): Promise<SportsDiscoverPolymarketResult> {
  const start = Date.now();
  const out: SportsDiscoverPolymarketResult = {
    fetched: 0,
    newInDB: 0,
    tagPages: 0,
    durationMs: 0
  };

  try {
    const polyService = new PolymarketService();

    const sportsRes = await fetch(`${GAMMA}/sports`, { headers: { Accept: 'application/json' } });
    if (!sportsRes.ok) {
      out.error = `Gamma /sports HTTP ${sportsRes.status}`;
      return out;
    }

    const sportsJson = (await sportsRes.json()) as unknown;
    const tags: GammaSportTag[] = Array.isArray(sportsJson)
      ? (sportsJson as GammaSportTag[])
      : ((sportsJson as { sports?: GammaSportTag[] })?.sports ?? []);

    const tagIds: number[] = [];
    for (const t of tags) {
      const id = t.id ?? t.tag_id;
      if (typeof id === 'number' && Number.isFinite(id)) tagIds.push(id);
    }

    /** Cap tags per run so cron stays under ~55s; local script can pass a higher limit via env. */
    const maxTags = Math.min(
      Number(process.env.DISCOVER_SPORTS_MAX_POLY_TAGS ?? '25') || 25,
      tagIds.length
    );
    const sliceTags = tagIds.slice(0, maxTags);

    let totalFetched = 0;
    let totalNew = 0;

    for (const tagId of sliceTags) {
      if (Date.now() >= deadline) break;
      let offset = 0;
      let tagIterations = 0;
      while (Date.now() < deadline && tagIterations < 40) {
        tagIterations += 1;
        const url = `${GAMMA}/events?tag_id=${tagId}&active=true&closed=false&limit=${POLY_PAGE}&offset=${offset}`;
        const res = await fetch(url, { headers: { Accept: 'application/json' } });
        if (!res.ok) break;
        const events = (await res.json()) as Array<{
          id: string;
          slug?: string;
          title?: string;
          markets?: Array<Record<string, unknown>>;
        }>;
        if (!events?.length) break;

        out.tagPages += 1;

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
              typeof m === 'object' && m && 'id' in m
                ? (m as Record<string, unknown>)
                : { id: event.id, ...m };
            pageMarkets.push({ raw, eventInfo });
          }
        }

        totalFetched += pageMarkets.length;
        const normalized = pageMarkets
          .filter(({ raw }) => Boolean(String(raw.id ?? raw.conditionId ?? raw.slug ?? '').trim()))
          .map(({ raw, eventInfo }) => polyService.normalizeMarket(raw, eventInfo));
        const inserted = await createManyChunked(normalized as Record<string, unknown>[]);
        totalNew += inserted;

        offset += POLY_PAGE;
        if (events.length < POLY_PAGE) break;
        await new Promise((r) => setTimeout(r, 60));
      }
    }

    out.fetched = totalFetched;
    out.newInDB = totalNew;
    console.log(`[discover-sports-poly] fetched=${totalFetched} inserted=${totalNew} tagPages=${out.tagPages}`);
  } catch (err) {
    out.error = err instanceof Error ? err.message : String(err);
    console.error('[discover-sports-poly]', err);
  }

  out.durationMs = Date.now() - start;
  return out;
}

/**
 * Sports auto-match with LLM validation (Groq) for accuracy.
 * Keywords filter candidates (>= 0.85), then LLM validates (>= 0.82) before creating MarketMatch.
 */
export async function runSportsKeywordAutoMatch(deadline: number): Promise<SportsKeywordAutoMatchResult> {
  const start = Date.now();
  let pairsCreated = 0;
  let candidatesChecked = 0;
  let llmEvaluated = 0;
  let llmRejected = 0;

  const matcher = new MatcherService();
  const semanticMatcher = new SemanticMatcherService();

  // Pull candidates live from Kalshi API so sports discovery does not depend on DB backlog.
  const kalshiSports = await loadLiveKalshiSportsCandidates(deadline, MAX_AUTO_MATCH_KALSHI);

  for (const kalshi of kalshiSports) {
    if (Date.now() >= deadline) break;
    candidatesChecked++;

    const query = extractSearchKeywords(kalshi.question);
    const polySearch = await searchPolymarketCandidates(query, 24);
    const polyPool = polySearch.map((item) => ({
      id: `temp_poly_${item.externalId}`,
      platform: 'POLYMARKET' as const,
      externalId: item.externalId,
      question: item.question,
      slug: item.slug,
      description: null,
      category: null,
      tags: [],
      makerFee: null,
      takerFee: null,
      feeStructure: null,
      volume24h: item.volume24h,
      volumeTotal: 0,
      liquidity: 0,
      openInterest: null,
      normalizedQuestion: null,
      active: true,
      endDate: item.endDate,
      resolvedAt: null,
      outcome: null,
      imageUrl: null,
      url: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSyncedAt: new Date(),
      eventId: null,
      eventSlug: null,
      eventTitle: null,
      seriesId: null,
      polyTokenIds: null
    }));

    const candidates = matcher.findMatchesFromCandidates(
      kalshi as Market,
      polyPool as Market[],
      KEYWORD_AUTO_MATCH_MIN
    );
    const best = candidates[0];
    if (!best || best.score < KEYWORD_AUTO_MATCH_MIN) continue;

    // Persist both markets to DB for LLM validation
    const existingKalshi = await prisma.market.findUnique({
      where: {
        platform_externalId: {
          platform: 'KALSHI',
          externalId: kalshi.externalId
        }
      }
    });
    const kalshiDb =
      existingKalshi ??
      (await prisma.market.create({
        data: {
          platform: 'KALSHI',
          externalId: kalshi.externalId,
          question: kalshi.question,
          slug: kalshi.slug,
          category: 'Sports',
          tags: [],
          volume24h: kalshi.volume24h ?? 0,
          volumeTotal: 0,
          liquidity: 0,
          active: true,
          endDate: kalshi.endDate,
          seriesId: kalshi.seriesId,
          lastSyncedAt: new Date()
        }
      }));

    const existingPoly = await prisma.market.findUnique({
      where: {
        platform_externalId: {
          platform: 'POLYMARKET',
          externalId: best.market.externalId
        }
      }
    });
    const poly =
      existingPoly ??
      (await prisma.market.create({
        data: {
          platform: 'POLYMARKET',
          externalId: best.market.externalId,
          question: best.market.question,
          slug: best.market.slug,
          category: best.market.category,
          tags: best.market.tags ?? [],
          volume24h: best.market.volume24h ?? 0,
          volumeTotal: best.market.volumeTotal ?? 0,
          liquidity: best.market.liquidity ?? 0,
          active: true,
          endDate: best.market.endDate ?? null,
          lastSyncedAt: new Date()
        }
      }));

    // LLM validation before creating pair
    llmEvaluated++;
    const result = await semanticMatcher.evaluatePair(kalshiDb, poly);
    
    if (!result.isEquivalent || result.confidence < SEMANTIC_CONFIDENCE_MIN) {
      llmRejected++;
      console.log(
        `[sports-match] LLM rejected: ${kalshi.question.slice(0, 40)} vs ${best.market.question.slice(0, 40)} (confidence: ${result.confidence})`
      );
      await new Promise((r) => setTimeout(r, GROQ_DELAY_MS));
      continue;
    }

    console.log(
      `[sports-match] LLM approved: ${kalshi.question.slice(0, 40)} vs ${best.market.question.slice(0, 40)} (confidence: ${result.confidence})`
    );
    const dup = await prisma.marketMatch.findFirst({
      where: {
        OR: [
          { marketAId: kalshiDb.id, marketBId: poly.id },
          { marketAId: poly.id, marketBId: kalshiDb.id }
        ]
      }
    });
    if (dup) continue;

    await prisma.marketMatch.create({
      data: {
        marketAId: kalshiDb.id,
        marketBId: poly.id,
        isEquivalent: true,
        confidence: result.confidence,
        reasoning: result.reasoning ?? `Sports auto-match (keyword ${(best.score * 100).toFixed(1)}% + LLM ${(result.confidence * 100).toFixed(1)}%)`
      }
    });
    pairsCreated += 1;

    // Delay between LLM calls
    await new Promise((r) => setTimeout(r, GROQ_DELAY_MS));
  }

  return { pairsCreated, candidatesChecked, llmEvaluated, llmRejected, durationMs: Date.now() - start };
}
