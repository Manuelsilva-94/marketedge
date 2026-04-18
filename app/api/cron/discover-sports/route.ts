import { NextRequest, NextResponse } from 'next/server';
import { Platform } from '@/lib/db-types';
import { writeSyncLogIfNeeded } from '@/lib/discover-markets-shared';
import {
  runDiscoverSportsKalshi,
  runDiscoverSportsPolymarket,
  runSportsKeywordAutoMatch
} from '@/lib/discover-sports-shared';
import { requireCronAuth } from '@/lib/cron-auth';

export const dynamic = 'force-dynamic';
/** Hobby / cron-job.org: keep at 55s. */
export const maxDuration = 55;
export const preferredRegion = 'iad1';

/**
 * Sports-only ingestion (Kalshi series + Polymarket tag_id) + keyword auto-match.
 * Safe for Vercel Hobby when scheduled 2–4h via cron-job.org.
 */
export async function GET(req: NextRequest) {
  const authError = requireCronAuth(req);
  if (authError) return authError;

  const start = Date.now();
  const kalshi = await runDiscoverSportsKalshi(Date.now() + 23_000);
  await writeSyncLogIfNeeded(
    Platform.KALSHI,
    kalshi.newInDB,
    kalshi.durationMs,
    kalshi.error ? 1 : 0
  );

  const polymarket = await runDiscoverSportsPolymarket(Date.now() + 23_000);
  await writeSyncLogIfNeeded(
    Platform.POLYMARKET,
    polymarket.newInDB,
    polymarket.durationMs,
    polymarket.error ? 1 : 0
  );

  const auto = await runSportsKeywordAutoMatch(Date.now() + 7000);

  const durationMs = Date.now() - start;

  return NextResponse.json({
    kalshi,
    polymarket,
    keywordAutoMatch: auto,
    durationMs,
    note: 'Sequential budgets: Kalshi ~23s, Polymarket ~23s, keyword auto-match ~7s (fits 55s).'
  });
}
