import { NextResponse } from 'next/server';
import { PolymarketService } from '@/lib/services/polymarket.service';
import { KalshiService } from '@/lib/services/kalshi.service';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 10 min
export const preferredRegion = 'iad1';

export async function GET(request: Request) {
  try {
    // Auth
    const authHeader = request.headers.get('authorization');
    const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;

    if (authHeader !== expectedAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('\n🔄 CRON: Master Sync Job');
    const startTime = Date.now();

    const results = {
      polymarket: 0,
      kalshi: 0,
      errors: [] as string[]
    };

    // Polymarket: Incremental (rápido)
    try {
      console.log('\n📊 Syncing Polymarket...');
      const polyService = new PolymarketService();
      results.polymarket = await polyService.syncIncrementalToDB();
    } catch (error) {
      const msg = `Polymarket failed: ${error instanceof Error ? error.message : error}`;
      console.error(`❌ ${msg}`);
      results.errors.push(msg);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Kalshi: Incremental
    try {
      console.log('\n📊 Syncing Kalshi...');
      const kalshiService = new KalshiService();
      results.kalshi = await kalshiService.syncIncrementalToDB();
    } catch (error) {
      const msg = `Kalshi failed: ${error instanceof Error ? error.message : error}`;
      console.error(`❌ ${msg}`);
      results.errors.push(msg);
    }

    // Cleanup: Eliminar markets closed hace >30 días
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const deleted = await prisma.market.deleteMany({
      where: {
        active: false,
        endDate: { lt: thirtyDaysAgo }
      }
    });

    console.log(`\n🗑️ Cleaned up ${deleted.count} old markets`);

    const duration = Math.round((Date.now() - startTime) / 1000);

    console.log(`\n✅ CRON COMPLETE:`);
    console.log(`   - Polymarket: ${results.polymarket}`);
    console.log(`   - Kalshi: ${results.kalshi}`);
    console.log(`   - Cleaned: ${deleted.count}`);
    console.log(`   - Duration: ${duration}s`);
    console.log(`   - Errors: ${results.errors.length}`);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      duration,
      results,
      cleaned: deleted.count,
      errors: results.errors
    });
  } catch (error) {
    console.error('❌ CRON FAILED:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
