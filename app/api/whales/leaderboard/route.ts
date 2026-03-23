import { NextRequest, NextResponse } from 'next/server';
import { WhaleService } from '@/lib/services/whale.service';

export const dynamic = 'force-dynamic';
export const preferredRegion = 'iad1';

export interface LeaderboardResponse {
  whales: Array<{
    rank: number;
    address: string;
    displayName: string;
    volume7d: number;
    volume30d: number;
    pnl7d: number | null;
    winRate: number | null;
    marketsTraded: number;
    topMarket: string | null;
    recentActivity: string;
  }>;
  period: '7d' | '30d';
  generatedAt: string;
}

export async function GET(req: NextRequest) {
  const generatedAt = new Date().toISOString();
  const searchParams = req.nextUrl.searchParams;
  const period = (searchParams.get('period') === '30d' ? '30d' : '7d') as '7d' | '30d';
  const limit = Math.min(Math.max(parseInt(searchParams.get('limit') ?? '50', 10) || 50, 1), 100);
  const sort = searchParams.get('sort') ?? 'volume';

  try {
    const whaleService = new WhaleService();
    const list = await whaleService.getTopTraders(period, limit);

    let sorted = [...list];
    if (sort === 'pnl') {
      sorted.sort((a, b) => (b.pnl7d ?? -Infinity) - (a.pnl7d ?? -Infinity));
    } else if (sort === 'winrate') {
      sorted.sort((a, b) => (b.winRate ?? -Infinity) - (a.winRate ?? -Infinity));
    } else {
      sorted.sort((a, b) => (period === '7d' ? b.volume7d - a.volume7d : b.volume30d - a.volume30d));
    }

    const whales = sorted.slice(0, limit).map((w, i) => ({
      rank: i + 1,
      address: w.address,
      displayName: w.displayName,
      volume7d: w.volume7d,
      volume30d: w.volume30d,
      pnl7d: w.pnl7d,
      winRate: w.winRate,
      marketsTraded: w.marketsTraded,
      topMarket: w.topMarket ?? null,
      recentActivity: w.recentActivity ?? ''
    }));

    const response: LeaderboardResponse = {
      whales,
      period,
      generatedAt
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=300'
      }
    });
  } catch (error) {
    console.error('❌ Whales leaderboard error:', error);
    return NextResponse.json(
      {
        whales: [],
        period,
        generatedAt,
        error: error instanceof Error ? error.message : 'Failed to fetch leaderboard'
      },
      { status: 200 }
    );
  }
}
