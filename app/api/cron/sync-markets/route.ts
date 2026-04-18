import { NextResponse } from 'next/server';
import { PolymarketService } from '@/lib/services/polymarket.service';
import { KalshiService } from '@/lib/services/kalshi.service';
import { prisma } from '@/lib/prisma';
import { requireCronAuth } from '@/lib/cron-auth';

export const dynamic = 'force-dynamic';
export const maxDuration = 55;
export const preferredRegion = 'iad1';

export async function GET(request: Request) {
  try {
    const authError = requireCronAuth(request);
    if (authError) return authError;

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

    // Cleanup: inactive con endDate > 7 días atrás
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const deletedInactive = await prisma.market.deleteMany({
      where: {
        active: false,
        endDate: { lt: sevenDaysAgo }
      }
    });

    // Resolved sin matches útiles, más de 7 días (reduce tamaño DB / egress)
    const resolvedCutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const deletedResolvedStale = await prisma.market.deleteMany({
      where: {
        active: false,
        resolvedAt: { not: null, lt: resolvedCutoff },
        AND: [{ matchesAsA: { none: {} } }, { matchesAsB: { none: {} } }]
      }
    });

    const deleted = deletedInactive.count + deletedResolvedStale.count;
    console.log(
      `\n🗑️ Cleaned up ${deletedInactive.count} inactive by endDate + ${deletedResolvedStale.count} resolved stale (no matches) = ${deleted} total`
    );

    const duration = Math.round((Date.now() - startTime) / 1000);

    console.log(`\n✅ CRON COMPLETE:`);
    console.log(`   - Polymarket: ${results.polymarket}`);
    console.log(`   - Kalshi: ${results.kalshi}`);
    console.log(`   - Cleaned: ${deleted}`);
    console.log(`   - Duration: ${duration}s`);
    console.log(`   - Errors: ${results.errors.length}`);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      duration,
      results,
      cleaned: deleted,
      cleanedInactiveEndDate: deletedInactive.count,
      cleanedResolvedStale: deletedResolvedStale.count,
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
