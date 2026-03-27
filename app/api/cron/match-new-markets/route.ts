import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { MatcherService } from '@/lib/services/matcher.service';
import { SemanticMatcherService } from '@/lib/services/semantic-matcher.service';
import { requireCronAuth } from '@/lib/cron-auth';

export const dynamic = 'force-dynamic';
export const maxDuration = 55;

const MIN_KEYWORD_SCORE = 0.6;
const MAX_MARKETS_TO_PROCESS = 15;
const MAX_CANDIDATES_PER_MARKET = 2;
const GROQ_DELAY_MS = 1100;

export async function GET(req: NextRequest) {
  const authError = requireCronAuth(req);
  if (authError) return authError;

  const startTime = Date.now();
  const MAX_DURATION_MS = 50_000;

  // Markets de Kalshi insertados en las últimas 12h sin ningún MarketMatch
  const since = new Date(Date.now() - 12 * 60 * 60 * 1000);

  const newKalshiMarkets = await prisma.market.findMany({
    where: {
      platform: 'KALSHI',
      active: true,
      createdAt: { gte: since },
      AND: [
        { matchesAsA: { none: {} } },
        { matchesAsB: { none: {} } }
      ]
    },
    orderBy: { volume24h: 'desc' },
    take: MAX_MARKETS_TO_PROCESS
  });

  console.log(`[match-new] Found ${newKalshiMarkets.length} new Kalshi markets without match (last 12h)`);

  if (newKalshiMarkets.length === 0) {
    return NextResponse.json({
      processed: 0,
      pairsEvaluated: 0,
      newMatches: 0,
      durationMs: Date.now() - startTime,
      message: 'No new markets to match'
    });
  }

  // Cargar pool de Polymarket activos en memoria
  const polyPool = await prisma.market.findMany({
    where: { platform: 'POLYMARKET', active: true },
    orderBy: { volume24h: 'desc' },
    take: 15000
  });

  console.log(`[match-new] Polymarket pool: ${polyPool.length} markets`);

  const matcher = new MatcherService();
  const semanticMatcher = new SemanticMatcherService();

  let processed = 0;
  let pairsEvaluated = 0;
  let newMatches = 0;

  for (const kalshiMarket of newKalshiMarkets) {
    if (Date.now() - startTime > MAX_DURATION_MS) {
      console.log(`[match-new] Time limit reached, stopping at ${processed}/${newKalshiMarkets.length}`);
      break;
    }

    const candidates = matcher.findMatchesFromCandidates(
      kalshiMarket,
      polyPool,
      MIN_KEYWORD_SCORE
    );

    if (candidates.length === 0) {
      processed++;
      continue;
    }

    const topCandidates = candidates.slice(0, MAX_CANDIDATES_PER_MARKET);
    console.log(`[match-new] ${kalshiMarket.question.slice(0, 50)} → ${topCandidates.length} candidates`);

    for (const candidate of topCandidates) {
      if (Date.now() - startTime > MAX_DURATION_MS) break;

      // evaluatePair ya chequea cache y guarda en DB internamente
      const result = await semanticMatcher.evaluatePair(kalshiMarket, candidate.market);
      pairsEvaluated++;

      if (result.isEquivalent) {
        newMatches++;
        console.log(`[match-new] ✅ MATCH: ${kalshiMarket.question.slice(0, 40)} ↔ ${candidate.market.question.slice(0, 40)}`);
      }

      await new Promise(r => setTimeout(r, GROQ_DELAY_MS));
    }

    processed++;
  }

  const durationMs = Date.now() - startTime;
  console.log(`[match-new] Done: ${processed} processed, ${pairsEvaluated} pairs, ${newMatches} matches in ${durationMs}ms`);

  return NextResponse.json({
    processed,
    pairsEvaluated,
    newMatches,
    durationMs,
    windowHours: 12,
    message: `${newMatches} new matches found from ${processed} new Kalshi markets`
  });
}
