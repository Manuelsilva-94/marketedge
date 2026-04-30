import { NextRequest, NextResponse } from 'next/server';
import { requireCronAuth } from '@/lib/cron-auth';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;
export const preferredRegion = 'iad1';

/**
 * Legacy: ejecuta Kalshi y luego Polymarket con **deadlines independientes** (~115s cada uno),
 * para que Polymarket no quede sin tiempo si Kalshi ocupa todo el presupuesto.
 * Preferido para jobs largos: llamar por separado
 * `/api/cron/discover-kalshi-markets` y `/api/cron/discover-polymarket-markets`.
 */
export async function GET(req: NextRequest) {
  const authError = requireCronAuth(req);
  if (authError) return authError;

  return NextResponse.json(
    {
      error: 'This endpoint is deprecated. Use /api/cron/match-new-markets and /api/cron/discover-sports.'
    },
    { status: 410 }
  );
}
