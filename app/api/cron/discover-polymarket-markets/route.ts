import { NextRequest, NextResponse } from 'next/server';
import { requireCronAuth } from '@/lib/cron-auth';

export const dynamic = 'force-dynamic';
/** Hobby plan max ~60s; use `npm run discover-local` for full runs. */
export const maxDuration = 120;
export const preferredRegion = 'iad1';

export async function GET(req: NextRequest) {
  const authError = requireCronAuth(req);
  if (authError) return authError;

  return NextResponse.json(
    {
      error: 'This endpoint is deprecated. Use /api/cron/match-new-markets.'
    },
    { status: 410 }
  );
}
