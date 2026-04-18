import { NextRequest, NextResponse } from 'next/server';
import { Platform } from '@/lib/db-types';
import {
  DEADLINE_MS,
  runDiscoverKalshi,
  runDiscoverPolymarket,
  writeSyncLogIfNeeded
} from '@/lib/discover-markets-shared';
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

  const startTime = Date.now();

  const kalshi = await runDiscoverKalshi(Date.now() + DEADLINE_MS);
  await writeSyncLogIfNeeded(
    Platform.KALSHI,
    kalshi.newInDB,
    kalshi.durationMs,
    kalshi.error ? 1 : 0
  );

  const polymarket = await runDiscoverPolymarket(Date.now() + DEADLINE_MS);
  await writeSyncLogIfNeeded(
    Platform.POLYMARKET,
    polymarket.newInDB,
    polymarket.durationMs,
    polymarket.error ? 1 : 0
  );

  const durationMs = Date.now() - startTime;
  console.log(`[discover-markets] Done in ${durationMs}ms`, { kalshi, polymarket });

  return NextResponse.json({
    kalshi: {
      fetched: kalshi.fetched,
      newInDB: kalshi.newInDB,
      pages: kalshi.pages,
      durationMs: kalshi.durationMs,
      error: kalshi.error
    },
    polymarket: {
      fetched: polymarket.fetched,
      newInDB: polymarket.newInDB,
      pages: polymarket.pages,
      durationMs: polymarket.durationMs,
      error: polymarket.error
    },
    durationMs,
    note: 'Each platform had its own ~115s budget. For isolated runs use /api/cron/discover-kalshi-markets and /api/cron/discover-polymarket-markets'
  });
}
