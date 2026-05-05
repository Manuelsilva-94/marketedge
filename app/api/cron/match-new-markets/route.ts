import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { MatcherService } from '@/lib/services/matcher.service';
import { SemanticMatcherService } from '@/lib/services/semantic-matcher.service';
import { KalshiService } from '@/lib/services/kalshi.service';
import { requireCronAuth } from '@/lib/cron-auth';
import { extractSearchKeywords, searchPolymarketCandidates } from '@/lib/polymarket-search';

export const dynamic = 'force-dynamic';
export const maxDuration = 55;

const MIN_KEYWORD_SCORE = 0.6;
const MAX_LIVE_KALSHI_TO_FETCH = 50; // Cantidad de mercados Kalshi nuevos a buscar desde API
const MAX_MARKETS_TO_PROCESS = 22;
const MAX_CANDIDATES_PER_MARKET = 2;
const GROQ_DELAY_MS = 1100;

type CandidateMarket = {
  id: string;
  platform: 'POLYMARKET';
  externalId: string;
  question: string;
  slug: string;
  description: string | null;
  category: string | null;
  tags: string[];
  makerFee: number | null;
  takerFee: number | null;
  feeStructure: string | null;
  volume24h: number;
  volumeTotal: number;
  liquidity: number;
  openInterest: number | null;
  normalizedQuestion: string | null;
  active: boolean;
  endDate: Date | null;
  resolvedAt: Date | null;
  outcome: string | null;
  imageUrl: string | null;
  url: string | null;
  createdAt: Date;
  updatedAt: Date;
  lastSyncedAt: Date;
  eventId: string | null;
  eventSlug: string | null;
  eventTitle: string | null;
  seriesId: string | null;
  polyTokenIds: string | null;
};

function toCandidateMarket(item: {
  externalId: string;
  question: string;
  slug: string;
  volume24h: number;
  endDate: Date | null;
}): CandidateMarket {
  const now = new Date();
  return {
    id: `temp_poly_${item.externalId}`,
    platform: 'POLYMARKET',
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
    createdAt: now,
    updatedAt: now,
    lastSyncedAt: now,
    eventId: null,
    eventSlug: null,
    eventTitle: null,
    seriesId: null,
    polyTokenIds: null
  };
}

/**
 * Carga candidatos Kalshi frescos desde la API (no solo los que están en DB sin match)
 */
async function loadLiveKalshiCandidates(deadline: number, maxCandidates: number): Promise<Array<{
  externalId: string;
  question: string;
  slug: string;
  category: string | null;
  volume24h: number;
  endDate: Date | null;
  seriesId: string | null;
  eventId: string | null;
}>> {
  const kalshiService = new KalshiService();
  const out: Array<{
    externalId: string;
    question: string;
    slug: string;
    category: string | null;
    volume24h: number;
    endDate: Date | null;
    seriesId: string | null;
    eventId: string | null;
  }> = [];
  const seen = new Set<string>();

  try {
    // Fetch recent markets from Kalshi API (status=open, sorted by volume)
    const response = await kalshiService.getMarkets({
      status: 'open',
      limit: maxCandidates * 2 // Fetch more than needed in case some are duplicates or already matched
    });

    for (const rawMarket of response.markets || []) {
      if (Date.now() >= deadline || out.length >= maxCandidates) break;

      const normalized = kalshiService.normalizeMarket(rawMarket);
      if (!normalized.externalId || seen.has(normalized.externalId)) continue;
      
      // Skip if already matched in DB
      const existingMatch = await prisma.market.findFirst({
        where: {
          platform: 'KALSHI',
          externalId: normalized.externalId,
          OR: [
            { matchesAsA: { some: {} } },
            { matchesAsB: { some: {} } }
          ]
        },
        select: { id: true }
      });
      
      if (existingMatch) continue;
      
      seen.add(normalized.externalId);
      out.push({
        externalId: normalized.externalId,
        question: normalized.question,
        slug: normalized.slug,
        category: normalized.category ?? null,
        volume24h: normalized.volume24h ?? 0,
        endDate: normalized.endDate ?? null,
        seriesId: normalized.seriesId ?? null,
        eventId: normalized.eventId ?? null
      });
    }

    console.log(`[match-new] Loaded ${out.length} live Kalshi candidates from API`);
    return out;
  } catch (error) {
    console.error('[match-new] Error loading live Kalshi candidates:', error);
    return out;
  }
}

export async function GET(req: NextRequest) {
  const authError = requireCronAuth(req);
  if (authError) return authError;

  const startTime = Date.now();
  const MAX_DURATION_MS = 50_000;
  const deadline = Date.now() + MAX_DURATION_MS;

  // Load fresh Kalshi markets from API instead of DB backlog
  const liveKalshiCandidates = await loadLiveKalshiCandidates(deadline, MAX_LIVE_KALSHI_TO_FETCH);

  // Also check DB for any stragglers (markets we have but haven't matched yet)
  const dbBacklog = await prisma.market.findMany({
    where: {
      platform: 'KALSHI',
      active: true,
      AND: [{ matchesAsA: { none: {} } }, { matchesAsB: { none: {} } }]
    },
    orderBy: { volume24h: 'desc' },
    take: 10,
    select: {
      externalId: true,
      question: true,
      slug: true,
      category: true,
      volume24h: true,
      endDate: true,
      seriesId: true,
      eventId: true
    }
  });

  // Combine live + DB candidates, prioritizing live (fresher data)
  const seen = new Set<string>();
  const allCandidates = [...liveKalshiCandidates, ...dbBacklog]
    .filter((m) => {
      if (seen.has(m.externalId)) return false;
      seen.add(m.externalId);
      return true;
    })
    .slice(0, MAX_MARKETS_TO_PROCESS);

  console.log(
    `[match-new] ${allCandidates.length} Kalshi candidates to process (${liveKalshiCandidates.length} live + ${dbBacklog.length} DB backlog)`
  );

  if (allCandidates.length === 0) {
    return NextResponse.json({
      processed: 0,
      pairsEvaluated: 0,
      newMatches: 0,
      durationMs: Date.now() - startTime,
      message: 'No new Kalshi markets to match'
    });
  }

  const matcher = new MatcherService();
  const semanticMatcher = new SemanticMatcherService();

  let processed = 0;
  let pairsEvaluated = 0;
  let newMatches = 0;

  for (const kalshiCandidate of allCandidates) {
    if (Date.now() - startTime > MAX_DURATION_MS) {
      console.log(`[match-new] Time limit reached, stopping at ${processed}/${allCandidates.length}`);
      break;
    }

    // Check/create Kalshi market in DB
    let kalshiMarket = await prisma.market.findUnique({
      where: {
        platform_externalId: {
          platform: 'KALSHI',
          externalId: kalshiCandidate.externalId
        }
      }
    });

    if (!kalshiMarket) {
      kalshiMarket = await prisma.market.create({
        data: {
          platform: 'KALSHI',
          externalId: kalshiCandidate.externalId,
          question: kalshiCandidate.question,
          slug: kalshiCandidate.slug,
          category: kalshiCandidate.category,
          tags: [],
          volume24h: kalshiCandidate.volume24h,
          volumeTotal: 0,
          liquidity: 0,
          active: true,
          endDate: kalshiCandidate.endDate,
          seriesId: kalshiCandidate.seriesId,
          eventId: kalshiCandidate.eventId,
          lastSyncedAt: new Date()
        }
      });
    }

    const query = extractSearchKeywords(kalshiMarket.question);
    const apiCandidates = await searchPolymarketCandidates(query, 24);
    const polyCandidates = apiCandidates.map(toCandidateMarket);
    const candidates = matcher.findMatchesFromCandidates(kalshiMarket, polyCandidates, MIN_KEYWORD_SCORE);

    if (candidates.length === 0) {
      processed++;
      continue;
    }

    const topCandidates = candidates.slice(0, MAX_CANDIDATES_PER_MARKET);
    console.log(`[match-new] ${kalshiMarket.question.slice(0, 50)} → ${topCandidates.length} candidates`);

    for (const candidate of topCandidates) {
      if (Date.now() - startTime > MAX_DURATION_MS) break;

      const existingPoly = await prisma.market.findUnique({
        where: {
          platform_externalId: {
            platform: 'POLYMARKET',
            externalId: candidate.market.externalId
          }
        }
      });

      const polyMarketRecord =
        existingPoly ??
        (await prisma.market.create({
          data: {
            platform: 'POLYMARKET',
            externalId: candidate.market.externalId,
            question: candidate.market.question,
            slug: candidate.market.slug,
            category: candidate.market.category,
            tags: candidate.market.tags,
            volume24h: candidate.market.volume24h,
            volumeTotal: 0,
            liquidity: 0,
            active: true,
            endDate: candidate.market.endDate,
            lastSyncedAt: new Date()
          }
        }));

      const result = await semanticMatcher.evaluatePair(kalshiMarket, polyMarketRecord);
      pairsEvaluated++;

      if (result.isEquivalent) {
        newMatches++;
        console.log(
          `[match-new] ✅ MATCH: ${kalshiMarket.question.slice(0, 40)} ↔ ${candidate.market.question.slice(0, 40)}`
        );
      }

      await new Promise((r) => setTimeout(r, GROQ_DELAY_MS));
    }

    processed++;
  }

  const durationMs = Date.now() - startTime;
  console.log(`[match-new] Done: ${processed} processed, ${pairsEvaluated} pairs, ${newMatches} matches in ${durationMs}ms`);

  return NextResponse.json({
    processed,
    pairsEvaluated,
    newMatches,
    liveFromAPI: liveKalshiCandidates.length,
    dbBacklog: dbBacklog.length,
    durationMs,
    message: `${newMatches} new matches found from ${processed} Kalshi markets (${liveKalshiCandidates.length} live + ${dbBacklog.length} DB backlog)`
  });
}
