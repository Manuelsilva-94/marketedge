import { NextRequest, NextResponse } from 'next/server';
import { requireCronAuth } from '@/lib/cron-auth';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

export async function GET(req: NextRequest) {
    const authError = requireCronAuth(req);
    if (authError) return authError;

    return NextResponse.json(
      { error: 'This endpoint is deprecated and intentionally disabled.' },
      { status: 410 }
    );
}
