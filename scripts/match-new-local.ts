import 'dotenv/config';
import { prisma } from '../lib/prisma';
import { MatcherService } from '../lib/services/matcher.service';
import { SemanticMatcherService } from '../lib/services/semantic-matcher.service';
import type { Prisma } from '@prisma/client';

const MIN_KEYWORD_SCORE = 0.6;
const GROQ_DELAY_MS = 1100;
const MAX_TO_PROCESS = process.argv[2] ? parseInt(process.argv[2]) : 200;
/** Tope de filas Polymarket en el pool de candidatos (tras el mismo filtro de fecha que Kalshi). */
const POLY_POOL_MAX = Math.max(1, Number(process.env.MATCH_POLY_POOL_MAX ?? '15000') || 15000);

/** Default: solo mercados creados desde el inicio del día de ayer (hora local). Desactivar: MATCH_CREATED_SINCE=all */
function matchCreatedAtFilter(): {
  where: Prisma.MarketWhereInput | undefined;
  label: string;
} {
  const raw = (process.env.MATCH_CREATED_SINCE ?? 'yesterday').trim().toLowerCase();
  if (raw === '' || raw === 'all') {
    return { where: undefined, label: 'sin filtro de fecha (MATCH_CREATED_SINCE=all)' };
  }

  if (raw === 'yesterday') {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    d.setHours(0, 0, 0, 0);
    return {
      where: { createdAt: { gte: d } },
      label: `createdAt ≥ ${d.toISOString()} (desde ayer, hora local)`
    };
  }

  const parsed = Date.parse(raw);
  if (!Number.isNaN(parsed)) {
    const d = new Date(parsed);
    return {
      where: { createdAt: { gte: d } },
      label: `createdAt ≥ ${d.toISOString()} (MATCH_CREATED_SINCE)`
    };
  }

  console.warn(
    `⚠️  MATCH_CREATED_SINCE="${process.env.MATCH_CREATED_SINCE}" no reconocido; uso "yesterday".`
  );
  const d = new Date();
  d.setDate(d.getDate() - 1);
  d.setHours(0, 0, 0, 0);
  return {
    where: { createdAt: { gte: d } },
    label: `createdAt ≥ ${d.toISOString()} (fallback ayer)`
  };
}

async function matchNewMarkets() {
  const { where: createdWhere, label: createdLabel } = matchCreatedAtFilter();

  console.log(
    `\n🤖 LOCAL MATCH: Kalshi (hasta ${MAX_TO_PROCESS}) + Polymarket pool (hasta ${POLY_POOL_MAX}) — ${createdLabel}\n`
  );
  const startTime = Date.now();

  // Markets de Kalshi sin ningún match (por defecto: creados desde ayer)
  const newKalshiMarkets = await prisma.market.findMany({
    where: {
      platform: 'KALSHI',
      active: true,
      ...createdWhere,
      AND: [
        { matchesAsA: { none: {} } },
        { matchesAsB: { none: {} } }
      ]
    },
    orderBy: { volume24h: 'desc' },
    take: MAX_TO_PROCESS
  });

  console.log(`📊 Found ${newKalshiMarkets.length} unmatched Kalshi markets`);

  if (newKalshiMarkets.length === 0) {
    console.log('✅ Nothing to match');
    return;
  }

  // Polymarket: mismo criterio de fecha que Kalshi (nuevos vs nuevos); con MATCH_CREATED_SINCE=all, todos los activos acotados por volumen
  const polyPool = await prisma.market.findMany({
    where: {
      platform: 'POLYMARKET',
      active: true,
      ...createdWhere
    },
    orderBy: { volume24h: 'desc' },
    take: POLY_POOL_MAX
  });

  console.log(`📦 Polymarket pool: ${polyPool.length} markets (mismo filtro de fecha que Kalshi)\n`);

  const matcher = new MatcherService();
  const semanticMatcher = new SemanticMatcherService();

  let processed = 0;
  let pairsEvaluated = 0;
  let newMatches = 0;

  for (const kalshiMarket of newKalshiMarkets) {
    const candidates = matcher.findMatchesFromCandidates(
      kalshiMarket,
      polyPool,
      MIN_KEYWORD_SCORE
    );

    if (candidates.length === 0) {
      processed++;
      if (processed % 50 === 0) {
        console.log(`  ⏳ Processed ${processed}/${newKalshiMarkets.length} (${newMatches} matches so far)`);
      }
      continue;
    }

    const top = candidates.slice(0, 3);
    console.log(`\n[${processed + 1}/${newKalshiMarkets.length}] ${kalshiMarket.question.slice(0, 60)}`);
    console.log(`  → ${top.length} candidates`);

    for (const candidate of top) {
      const result = await semanticMatcher.evaluatePair(kalshiMarket, candidate.market);
      pairsEvaluated++;

      if (result.isEquivalent) {
        newMatches++;
        console.log(`  ✅ MATCH (${(result.confidence * 100).toFixed(0)}%): ${candidate.market.question.slice(0, 50)}`);
      }

      await new Promise(r => setTimeout(r, GROQ_DELAY_MS));
    }

    processed++;
  }

  const duration = Math.round((Date.now() - startTime) / 1000);
  console.log(`\n✅ MATCH COMPLETE:`);
  console.log(`   - Processed: ${processed} markets`);
  console.log(`   - Pairs evaluated: ${pairsEvaluated}`);
  console.log(`   - New matches: ${newMatches}`);
  console.log(`   - Duration: ${Math.floor(duration / 60)}m ${duration % 60}s`);

  await prisma.$disconnect();
}

matchNewMarkets().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});