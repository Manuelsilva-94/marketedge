import { NextRequest, NextResponse } from 'next/server';
import {
  runSportsKeywordAutoMatch
} from '@/lib/discover-sports-shared';
import { requireCronAuth } from '@/lib/cron-auth';

export const dynamic = 'force-dynamic';
/** Hobby / cron-job.org: keep at 55s. */
export const maxDuration = 55;
export const preferredRegion = 'iad1';

export async function GET(req: NextRequest) {
  const authError = requireCronAuth(req);
  if (authError) return authError;

  const start = Date.now();
  const auto = await runSportsKeywordAutoMatch(Date.now() + 50_000);

  const durationMs = Date.now() - start;

  return NextResponse.json({
    keywordAutoMatch: auto,
    durationMs,
    note: 'Sports auto-match via live Polymarket search only (no bulk market ingestion).'
  });
}
