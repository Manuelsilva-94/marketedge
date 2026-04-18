import { NextRequest, NextResponse } from 'next/server';
import { Platform } from '@/lib/db-types';
import {
  DEADLINE_MS,
  runDiscoverPolymarket,
  writeSyncLogIfNeeded
} from '@/lib/discover-markets-shared';
import { requireCronAuth } from '@/lib/cron-auth';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;
export const preferredRegion = 'iad1';

export async function GET(req: NextRequest) {
  const authError = requireCronAuth(req);
  if (authError) return authError;

  const deadline = Date.now() + DEADLINE_MS;
  const polymarket = await runDiscoverPolymarket(deadline);

  await writeSyncLogIfNeeded(
    Platform.POLYMARKET,
    polymarket.newInDB,
    polymarket.durationMs,
    polymarket.error ? 1 : 0
  );

  console.log(`[discover-polymarket-markets] Done in ${polymarket.durationMs}ms`, polymarket);

  return NextResponse.json({
    platform: 'polymarket' as const,
    ...polymarket
  });
}
