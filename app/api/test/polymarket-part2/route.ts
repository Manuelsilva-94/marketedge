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

    console.log('🧪 Testing Polymarket PART 2 sync...');

    // Segunda mitad: 25K markets desde offset 2500
    // (offset 2500 porque cada página trae ~10-20 markets, 2500 páginas = ~25K markets)
    const synced = await service.syncFullToDB(25000, 2500);

    return NextResponse.json({
      success: true,
      synced,
      part: 2,
      message: 'Part 2 completed - Full sync done!'
    });
  } catch (error) {
    console.error('❌ Part 2 failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
