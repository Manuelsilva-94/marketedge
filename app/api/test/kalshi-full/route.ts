import { NextResponse } from 'next/server';
import { KalshiService } from '@/lib/services/kalshi.service';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 10 min

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 404 });
  }

  try {
    const service = new KalshiService();
    const synced = await service.syncFullEventsToDB(50000);

    return NextResponse.json({ success: true, synced });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown'
      },
      { status: 500 }
    );
  }
}
