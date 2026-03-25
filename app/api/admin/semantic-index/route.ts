import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SemanticMatcherService } from '@/lib/services/semantic-matcher.service';
import { MatcherService } from '@/lib/services/matcher.service';
import { requireAdminApiAuth } from '@/lib/cron-auth';

// Clave para trackear progreso en memoria (persiste mientras el servidor esté vivo)
let indexingProgress: {
  running: boolean;
  startedAt: string | null;
  processed: number;
  totalToProcess: number;
  evaluated: number;
  equivalent: number;
  notEquivalent: number;
  errors: number;
  lastProcessed: string | null;
  finishedAt: string | null;
} = {
  running: false,
  startedAt: null,
  processed: 0,
  totalToProcess: 0,
  evaluated: 0,
  equivalent: 0,
  notEquivalent: 0,
  errors: 0,
  lastProcessed: null,
  finishedAt: null,
};

async function runIndexing() {
  const semanticMatcher = new SemanticMatcherService();
  const matcher = new MatcherService();

  // Obtener todos los markets de Kalshi activos
  const kalshiMarkets = await prisma.market.findMany({
    where: { platform: 'KALSHI', active: true },
    orderBy: { volumeTotal: 'desc' }
  });

  indexingProgress.totalToProcess = kalshiMarkets.length;
  console.log(
    `[SemanticIndex] Starting full seed: ${kalshiMarkets.length} Kalshi markets`
  );

  for (const kalshiMarket of kalshiMarkets) {
    if (!indexingProgress.running) break; // permite cancelación

    indexingProgress.processed++;
    indexingProgress.lastProcessed = kalshiMarket.question.slice(0, 60);

    // Buscar candidatos en Polymarket
    let matches: Awaited<ReturnType<typeof matcher.findMatches>>;
    try {
      matches = await matcher.findMatches(kalshiMarket, 0.6);
      matches = matches
        .filter((m) => m.market.platform === 'POLYMARKET')
        .slice(0, 3);
    } catch {
      continue;
    }

    for (const match of matches) {
      const polyMarket = await prisma.market.findUnique({
        where: { id: match.market.id }
      });
      if (!polyMarket) continue;

      // Skip si ya tiene evaluación real
      const existing = await prisma.marketMatch.findFirst({
        where: {
          OR: [
            { marketAId: kalshiMarket.id, marketBId: polyMarket.id },
            { marketAId: polyMarket.id, marketBId: kalshiMarket.id }
          ],
          confidence: { gt: 0 }
        }
      });
      if (existing) continue;

      try {
        const result = await semanticMatcher.evaluatePair(kalshiMarket, polyMarket);
        indexingProgress.evaluated++;
        if (result.isEquivalent) indexingProgress.equivalent++;
        else indexingProgress.notEquivalent++;
        console.log(
          `[SemanticIndex] ${result.isEquivalent ? '✅' : '❌'} ` +
            `[${indexingProgress.processed}/${indexingProgress.totalToProcess}] ` +
            `${kalshiMarket.question.slice(0, 35)} ↔ ${polyMarket.question.slice(0, 35)}`
        );
        await new Promise((r) => setTimeout(r, 1000)); // rate limit Groq
      } catch {
        indexingProgress.errors++;
      }
    }
  }

  indexingProgress.running = false;
  indexingProgress.finishedAt = new Date().toISOString();
  console.log(
    `[SemanticIndex] ✅ Finished. Evaluated: ${indexingProgress.evaluated}, ` +
      `Equivalent: ${indexingProgress.equivalent}, Not: ${indexingProgress.notEquivalent}`
  );
}

// POST /api/admin/semantic-index — iniciar o cancelar
export async function POST(request: Request) {
  const { action = 'start' } = await request.json().catch(() => ({}));

  if (action === 'cancel') {
    indexingProgress.running = false;
    return NextResponse.json({
      message: 'Cancellation requested',
      ...indexingProgress
    });
  }

  if (indexingProgress.running) {
    return NextResponse.json({ message: 'Already running', ...indexingProgress });
  }

  // Reset progress
  indexingProgress = {
    running: true,
    startedAt: new Date().toISOString(),
    processed: 0,
    totalToProcess: 0,
    evaluated: 0,
    equivalent: 0,
    notEquivalent: 0,
    errors: 0,
    lastProcessed: null,
    finishedAt: null
  };

  // Correr en background — NO await
  runIndexing().catch((err) => {
    console.error('[SemanticIndex] Fatal error:', err);
    indexingProgress.running = false;
  });

  return NextResponse.json({
    message: 'Indexing started in background',
    ...indexingProgress
  });
}

// GET /api/admin/semantic-index — ver progreso
export async function GET(request: Request) {
  const authError = requireAdminApiAuth(request);
  if (authError) return authError;

  const dbStats = await prisma.marketMatch.groupBy({
    by: ['isEquivalent'],
    _count: true,
    where: { confidence: { gt: 0 } }
  });

  const total = await prisma.marketMatch.count({ where: { confidence: { gt: 0 } } });

  return NextResponse.json({
    progress: indexingProgress,
    db: { total, stats: dbStats }
  });
}
