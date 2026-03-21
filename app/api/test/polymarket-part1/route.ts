import { NextResponse } from 'next/server';
import { PolymarketService } from '@/lib/services/polymarket.service';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutos

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 404 });
  }

  try {
    const service = new PolymarketService();

    console.log('🧪 Testing Polymarket PART 1 sync...');

    // Primera mitad: 25K markets desde offset 0
    const synced = await service.syncFullToDB(25000, 0);

    return NextResponse.json({
      success: true,
      synced,
      part: 1,
      message: 'Part 1 completed - Run part 2 next'
    });
  } catch (error) {
    console.error('❌ Part 1 failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
