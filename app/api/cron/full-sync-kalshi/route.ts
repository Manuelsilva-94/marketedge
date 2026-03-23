import { NextRequest, NextResponse } from 'next/server';
import { KalshiService } from '@/lib/services/kalshi.service';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const CRON_SECRET = process.env.CRON_SECRET;

function isAuthorized(req: NextRequest): boolean {
    if (process.env.NODE_ENV === 'development') return true;
    const auth = req.headers.get('authorization');
    return auth === `Bearer ${CRON_SECRET}`;
}

export async function GET(req: NextRequest) {
    if (!isAuthorized(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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
