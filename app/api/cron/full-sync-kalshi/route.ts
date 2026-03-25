import { NextRequest, NextResponse } from 'next/server';
import { KalshiService } from '@/lib/services/kalshi.service';
import { requireCronAuth } from '@/lib/cron-auth';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

export async function GET(req: NextRequest) {
    const authError = requireCronAuth(req);
    if (authError) return authError;

    console.log('[full-sync-kalshi] Starting weekly full sync...');
    const startTime = Date.now();

    try {
        const kalshiService = new KalshiService();
        const synced = await kalshiService.syncFullEventsToDB();

        const durationMs = Date.now() - startTime;
        console.log(`[full-sync-kalshi] Done: ${synced} markets synced in ${durationMs}ms`);

        return NextResponse.json({
            synced,
            durationMs,
            message: `Full Kalshi sync complete: ${synced} markets`
        });
    } catch (err) {
        console.error('[full-sync-kalshi] Error:', err);
        return NextResponse.json(
            { error: err instanceof Error ? err.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
