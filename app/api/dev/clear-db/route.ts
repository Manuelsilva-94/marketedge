import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 404 });
  }

  try {
    console.log('🗑️  Clearing database...');

    const deletedMarkets = await prisma.market.deleteMany({});
    const deletedSyncLogs = await prisma.syncLog.deleteMany({});

    console.log(`✅ Deleted ${deletedMarkets.count} markets`);
    console.log(`✅ Deleted ${deletedSyncLogs.count} sync logs`);

    return NextResponse.json({
      success: true,
      deleted: {
        markets: deletedMarkets.count,
        syncLogs: deletedSyncLogs.count
      }
    });
  } catch (error) {
    console.error('❌ Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
