import { NextResponse } from 'next/server';
import { PolymarketService } from '@/lib/services/polymarket.service';

export const dynamic = 'force-dynamic';
export const maxDuration = 600; // 10 min

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 404 });
  }

  try {
    const service = new PolymarketService();

    console.log('🧪 Testing Polymarket FULL sync...');
    const synced = await service.syncFullToDB(50000);

    return NextResponse.json({
      success: true,
      synced,
      message: 'Full sync completed'
    });
  } catch (error) {
    console.error('❌ Full sync failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
