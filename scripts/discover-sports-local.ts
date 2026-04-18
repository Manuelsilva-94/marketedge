/**
 * Sports-only discovery + keyword auto-match (no HTTP timeout).
 * Set DISCOVER_SPORTS_MAX_POLY_TAGS=999 for exhaustive Polymarket tag sweep.
 */
import 'dotenv/config';
import { Platform } from '@/lib/db-types';
import { writeSyncLogIfNeeded } from '@/lib/discover-markets-shared';
import {
  runDiscoverSportsKalshi,
  runDiscoverSportsPolymarket,
  runSportsKeywordAutoMatch
} from '@/lib/discover-sports-shared';
import { prisma } from '@/lib/prisma';

async function main() {
  const budgetMs = Number(process.env.DISCOVER_SPORTS_BUDGET_MS ?? '120000') || 120_000;
  const end = Date.now() + budgetMs;

  console.log('[discover-sports-local] Kalshi sports series...');
  const kalshi = await runDiscoverSportsKalshi(end);
  await writeSyncLogIfNeeded(Platform.KALSHI, kalshi.newInDB, kalshi.durationMs, kalshi.error ? 1 : 0);

  const polyEnd = Date.now() + Math.max(30_000, end - Date.now());
  console.log('[discover-sports-local] Polymarket sports tags...');
  const polymarket = await runDiscoverSportsPolymarket(polyEnd);
  await writeSyncLogIfNeeded(
    Platform.POLYMARKET,
    polymarket.newInDB,
    polymarket.durationMs,
    polymarket.error ? 1 : 0
  );

  console.log('[discover-sports-local] Keyword auto-match...');
  const auto = await runSportsKeywordAutoMatch(Date.now() + 60_000);

  console.log(JSON.stringify({ kalshi, polymarket, keywordAutoMatch: auto }, null, 2));
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
