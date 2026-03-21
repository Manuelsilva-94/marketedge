import { NextResponse } from 'next/server';
import { WhaleService } from '@/lib/services/whale.service';

export const dynamic = 'force-dynamic';

export interface WhaleProfileApiResponse {
  address: string;
  displayName: string;
  stats: {
    volume7d: number;
    volume30d: number;
    pnl7d: number | null;
    pnl30d: number | null;
    winRate: number | null;
    marketsTraded: number;
    avgPositionSize: number;
  };
  recentTrades: Array<{
    id: string;
    market: string;
    marketSlug: string;
    outcome: string;
    price: number;
    size: number;
    side: string;
    timestamp: string;
    transactionHash: string;
  }>;
  topPositions: Array<{
    market: string;
    marketSlug: string;
    outcome: string;
    size: number;
    avgPrice: number;
    currentPrice: number | null;
    unrealizedPnl: number | null;
  }>;
  error: string | null;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ address: string }> }
) {
  const { address } = await context.params;
  const normalized = address?.trim().toLowerCase();

  const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(normalized ?? '');
  if (!normalized || !isValidAddress) {
    return NextResponse.json(
      { error: 'Invalid wallet address format', address: '', displayName: '', stats: {} as WhaleProfileApiResponse['stats'], recentTrades: [], topPositions: [] },
      { status: 404 }
    );
  }

  try {
    const whaleService = new WhaleService();
    const profile = await whaleService.getTraderProfile(normalized);

    const totalSize = profile.recentTrades.reduce((s, t) => s + t.size, 0);
    const avgPositionSize =
      profile.recentTrades.length > 0 ? totalSize / profile.recentTrades.length : 0;

    const response: WhaleProfileApiResponse = {
      address: profile.address,
      displayName: profile.displayName,
      stats: {
        volume7d: profile.volume7d,
        volume30d: profile.volume30d,
        pnl7d: profile.pnl7d,
        pnl30d: profile.pnl30d,
        winRate: profile.winRate,
        marketsTraded: profile.marketsTraded,
        avgPositionSize
      },
      recentTrades: profile.recentTrades.map((t) => ({
        id: t.id,
        market: t.market,
        marketSlug: t.marketSlug,
        outcome: t.outcome,
        price: t.price,
        size: t.size,
        side: t.side,
        timestamp: t.timestamp,
        transactionHash: t.transactionHash
      })),
      topPositions: profile.topPositions.map((p) => ({
        market: p.market,
        marketSlug: p.marketSlug,
        outcome: p.outcome,
        size: p.size,
        avgPrice: p.avgPrice,
        currentPrice: p.currentPrice,
        unrealizedPnl: p.unrealizedPnl
      })),
      error: null
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=120'
      }
    });
  } catch (error) {
    console.error('❌ Whale profile error:', error);
    return NextResponse.json(
      {
        address: normalized,
        displayName: `${normalized.slice(0, 6)}...${normalized.slice(-4)}`,
        stats: {
          volume7d: 0,
          volume30d: 0,
          pnl7d: null,
          pnl30d: null,
          winRate: null,
          marketsTraded: 0,
          avgPositionSize: 0
        },
        recentTrades: [],
        topPositions: [],
        error: error instanceof Error ? error.message : 'Failed to fetch profile'
      },
      { status: 200 }
    );
  }
}
