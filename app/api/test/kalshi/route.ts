import { NextResponse } from 'next/server';
import { KalshiService } from '@/lib/services/kalshi.service';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 404 });
  }

  try {
    const service = new KalshiService();

    console.log('🧪 Testing Kalshi service...');

    // Test 1: Fetch markets
    console.log('\n📊 Test 1: Fetching 5 markets...');
    const response = await service.getMarkets({ limit: 5 });
    console.log(`✅ Fetched ${response.markets.length} markets`);

    // Test 2: Normalize one
    if (response.markets.length > 0) {
      console.log('\n🔄 Test 2: Normalizing first market...');
      const normalized = service.normalizeMarket(response.markets[0]);
      console.log('✅ Normalized:', {
        question: normalized.question,
        volume24h: normalized.volume24h
      });
    }

    // Test 3: Sync to DB
    console.log('\n💾 Test 3: Syncing 20 markets to DB...');
    const synced = await service.syncToDB(20);
    console.log(`✅ Synced ${synced} markets to database`);

    return NextResponse.json({
      success: true,
      tests: {
        fetch: response.markets.length,
        sync: synced
      },
      sample: response.markets[0]
    });
  } catch (error) {
    console.error('❌ Test failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
