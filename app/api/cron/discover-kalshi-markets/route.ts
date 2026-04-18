import { NextRequest, NextResponse } from 'next/server';
import { Platform } from '@/lib/db-types';
import {
  DEADLINE_MS,
  runDiscoverKalshi,
  writeSyncLogIfNeeded
} from '@/lib/discover-markets-shared';
import { requireCronAuth } from '@/lib/cron-auth';

export const dynamic = 'force-dynamic';
/** Hobby plan max ~60s; use this route from local/cron-job.org Pro or expect truncation. */
export const maxDuration = 120;
export const preferredRegion = 'iad1';

export async function GET(req: NextRequest) {
  const authError = requireCronAuth(req);
  if (authError) return authError;

  const deadline = Date.now() + DEADLINE_MS;
  const kalshi = await runDiscoverKalshi(deadline);

  await writeSyncLogIfNeeded(
    Platform.KALSHI,
    kalshi.newInDB,
    kalshi.durationMs,
    kalshi.error ? 1 : 0
  );

  console.log(`[discover-kalshi-markets] Done in ${kalshi.durationMs}ms`, kalshi);

  return NextResponse.json({
    platform: 'kalshi' as const,
    ...kalshi
  });
}
