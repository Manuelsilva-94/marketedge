import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [total, active, byPlatform, volume, lastSync] = await Promise.all([
      prisma.market.count(),
      prisma.market.count({ where: { active: true } }),
      prisma.market.groupBy({
        by: ['platform'],
        _count: true
      }),
      prisma.market.aggregate({ _sum: { volume24h: true } }),
      prisma.market.findFirst({
        orderBy: { lastSyncedAt: 'desc' },
        select: { lastSyncedAt: true }
      })
    ]);

    const polymarketCount =
      byPlatform.find((p) => p.platform === 'POLYMARKET')?._count ?? 0;
    const kalshiCount = byPlatform.find((p) => p.platform === 'KALSHI')?._count ?? 0;
    const totalVolume24h = volume._sum.volume24h ?? 0;
    const lastSyncedAt = lastSync?.lastSyncedAt?.toISOString() ?? null;

    const body = {
      totalMarkets: total,
      activeMarkets: active,
      polymarketCount,
      kalshiCount,
      totalVolume24h,
      lastSyncedAt,
      whalesTracked: 50
    };

    return NextResponse.json(body, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60'
      }
    });
  } catch (error) {
    console.error('❌ Stats overview error:', error);
    return NextResponse.json(
      {
        totalMarkets: 0,
        activeMarkets: 0,
        polymarketCount: 0,
        kalshiCount: 0,
        totalVolume24h: 0,
        lastSyncedAt: null,
        whalesTracked: 50
      },
      { status: 500 }
    );
  }
}
