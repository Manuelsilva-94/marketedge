import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { Market } from '@/lib/db-types';
import { MatcherService } from '@/lib/services/matcher.service';
import { SemanticMatcherService } from '@/lib/services/semantic-matcher.service';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const MIN_KEYWORD_SCORE = 0.6;
const GROQ_RATE_LIMIT_DELAY_MS = 1100;

// GET → stats del backlog actual
export async function GET() {
  const totalKalshiActive = await prisma.market.count({
    where: { platform: 'KALSHI', active: true }
  });

  const withMatch = await prisma.market.count({
    where: {
      platform: 'KALSHI',
      active: true,
      OR: [
        { matchesAsA: { some: {} } },
        { matchesAsB: { some: {} } }
      ]
    }
  });

  const withoutMatch = totalKalshiActive - withMatch;

  const byCategory = await prisma.$queryRaw<{ category: string | null; count: bigint }[]>`
    SELECT m.category, COUNT(*)::bigint as count
    FROM "Market" m
    WHERE m.platform = 'KALSHI'
      AND m.active = true
      AND NOT EXISTS (SELECT 1 FROM "MarketMatch" mm WHERE mm."marketAId" = m.id OR mm."marketBId" = m.id)
    GROUP BY m.category
    ORDER BY count DESC
  `;

  return NextResponse.json({
    totalKalshiActive,
    withMatch,
    withoutMatch,
    byCategory: byCategory.map((r: { category: string | null; count: bigint }) => ({
      category: r.category ?? 'null',
      count: Number(r.count)
    }))
  });
}

// POST → procesa un batch del backlog
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const offset = Number(body.offset ?? 0);
  const batchSize = Math.min(Number(body.batchSize ?? 20), 50);
  const dryRun = Boolean(body.dryRun ?? false);

  const matcher = new MatcherService();
  const semanticMatcher = new SemanticMatcherService();

  // Markets de Kalshi activos sin ningún MarketMatch evaluado
  const kalshiMarkets = await prisma.market.findMany({
    where: {
      platform: 'KALSHI',
      active: true,
      AND: [
        { matchesAsA: { none: {} } },
        { matchesAsB: { none: {} } }
      ]
    },
    orderBy: [
      { volume24h: 'desc' },
      { createdAt: 'desc' }
    ],
    skip: offset,
    take: batchSize
  });

  if (kalshiMarkets.length === 0) {
    return NextResponse.json({
      processed: 0,
      pairsEvaluated: 0,
      newMatches: 0,
      offset_next: offset,
      done: true,
      message: 'Backlog completamente procesado'
    });
  }

  if (dryRun) {
    return NextResponse.json({
      dryRun: true,
      wouldProcess: kalshiMarkets.length,
      offset_next: offset + kalshiMarkets.length,
      sample: (kalshiMarkets as Market[]).slice(0, 5).map((m: Market) => ({
        question: m.question,
        category: m.category,
        volume24h: m.volume24h
      }))
    });
  }

  // Cargar Polymarket activos en memoria una sola vez (top 15k por volumen)
  const polyMarkets = await prisma.market.findMany({
    where: { platform: 'POLYMARKET', active: true },
    orderBy: { volume24h: 'desc' },
    take: 15000
  });

  console.log(`[match-backlog] Loaded ${polyMarkets.length} Polymarket markets in memory`);
  console.log(`[match-backlog] Processing ${kalshiMarkets.length} Kalshi markets (offset: ${offset})`);

  let processed = 0;
  let pairsEvaluated = 0;
  let newMatches = 0;

  for (const kalshiMarket of kalshiMarkets) {
    try {
      // Keyword matching en memoria — sin llamadas a DB
      const candidates = matcher.findMatchesFromCandidates(
        kalshiMarket,
        polyMarkets,
        MIN_KEYWORD_SCORE
      );

      if (candidates.length === 0) {
        console.log(`[match-backlog] No candidates for: ${kalshiMarket.question.slice(0, 60)}`);
        processed++;
        continue;
      }

      // Top 3 candidatos para evaluar con Groq
      const topCandidates = candidates.slice(0, 3);
      console.log(`[match-backlog] ${kalshiMarket.question.slice(0, 50)} → ${topCandidates.length} candidates`);

      for (const candidate of topCandidates) {
        // evaluatePair ya chequea cache en DB y guarda el resultado internamente
        const result = await semanticMatcher.evaluatePair(kalshiMarket, candidate.market);
        pairsEvaluated++;

        if (result.isEquivalent) {
          newMatches++;
          console.log(`[match-backlog] ✅ MATCH: ${kalshiMarket.question.slice(0, 40)} ↔ ${candidate.market.question.slice(0, 40)}`);
        }

        // Rate limit de Groq: 30 RPM = 1 call cada 1.1s
        await new Promise(r => setTimeout(r, GROQ_RATE_LIMIT_DELAY_MS));
      }

      processed++;
    } catch (err) {
      console.error(`[match-backlog] Error processing ${kalshiMarket.externalId}:`, err);
      processed++;
    }
  }

  // Calcular cuántos quedan
  const remaining = await prisma.market.count({
    where: {
      platform: 'KALSHI',
      active: true,
      AND: [
        { matchesAsA: { none: {} } },
        { matchesAsB: { none: {} } }
      ]
    }
  });

  return NextResponse.json({
    processed,
    pairsEvaluated,
    newMatches,
    offset_next: offset + kalshiMarkets.length,
    done: kalshiMarkets.length < batchSize,
    remaining,
    message: `Procesados ${processed} markets de Kalshi, ${newMatches} nuevos matches encontrados`
  });
}
