/**
 * Full market discovery (Kalshi + Polymarket) without HTTP timeout.
 * Uses DATABASE_URL (prefer Supabase session pooler for long runs).
 */
import 'dotenv/config';
import { Platform } from '@/lib/db-types';
import {
  DEADLINE_MS,
  runDiscoverKalshi,
  runDiscoverPolymarket,
  writeSyncLogIfNeeded
} from '@/lib/discover-markets-shared';
import { prisma } from '@/lib/prisma';

async function main() {
  const extraMs = Number(process.env.DISCOVER_DEADLINE_EXTRA_MS ?? '0') || 0;
  const deadline = Date.now() + DEADLINE_MS + extraMs;

  console.log('[discover-local] Kalshi...');
  const kalshi = await runDiscoverKalshi(deadline);
  await writeSyncLogIfNeeded(Platform.KALSHI, kalshi.newInDB, kalshi.durationMs, kalshi.error ? 1 : 0);

  console.log('[discover-local] Polymarket...');
  const polyDeadline = Date.now() + DEADLINE_MS + extraMs;
  const polymarket = await runDiscoverPolymarket(polyDeadline);
  await writeSyncLogIfNeeded(
    Platform.POLYMARKET,
    polymarket.newInDB,
    polymarket.durationMs,
    polymarket.error ? 1 : 0
  );

  console.log(JSON.stringify({ kalshi, polymarket }, null, 2));
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
