import { WhaleFilters } from '@/components/whales/WhaleFilters';
import { WhaleListWithPins } from '@/app/whales/WhaleListWithPins';
import { EmptyState } from '@/components/ui/EmptyState';
import type { LeaderboardResponse } from '@/app/api/whales/leaderboard/route';

const baseUrl =
  process.env.NEXT_PUBLIC_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

interface WhalesPageProps {
  searchParams: Promise<{
    period?: '7d' | '30d';
    sort?: 'volume' | 'pnl' | 'winrate';
    category?: string;
  }>;
}

export default async function WhalesPage({ searchParams }: WhalesPageProps) {
  const params = await searchParams;
  const period = params.period === '30d' ? '30d' : '7d';
  const sort = params.sort ?? 'volume';

  const searchParamsUrl = new URLSearchParams({
    period,
    sort,
    limit: '50'
  });

  let data: LeaderboardResponse;
  try {
    const res = await fetch(
      `${baseUrl}/api/whales/leaderboard?${searchParamsUrl.toString()}`,
      { cache: 'no-store' }
    );
    data = await res.json();
  } catch {
    data = {
      whales: [],
      period: '7d',
      generatedAt: new Date().toISOString()
    };
  }

  const whales = data.whales ?? [];
  const hasError = 'error' in data && (data as { error?: string }).error;

  // Pre-cargar trades de los top 3 whales en paralelo
  const top3 = whales.slice(0, 3);
  const top3TradesResults = await Promise.allSettled(
    top3.map((w) =>
      fetch(`${baseUrl}/api/whales/${encodeURIComponent(w.address)}`, {
        next: { revalidate: 300 }
      })
        .then((r) => r.json())
        .then((d) => ({ address: w.address, trades: d.recentTrades ?? [] }))
        .catch(() => ({ address: w.address, trades: [] }))
    )
  );
  const preloadedTrades: Record<string, Array<{
    id: string;
    market: string;
    outcome: string;
    side: string;
    price: number;
    size: number;
    timestamp: string;
    transactionHash: string;
  }>> = {};
  for (const result of top3TradesResults) {
    if (result.status === 'fulfilled') {
      preloadedTrades[result.value.address] = result.value.trades;
    }
  }

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">🐋 Whale Tracker</h1>
        <p className="mt-2 text-muted-foreground">
          Top Polymarket traders by volume. Data from public blockchain activity.
        </p>
      </div>

      <WhaleFilters currentPeriod={period} currentSort={sort} />

      <div className="mt-6">
        {whales.length > 0 ? (
          <WhaleListWithPins
            whales={whales.map((w) => ({
              proxyWallet: w.address,
              displayName: w.displayName,
              pnl: w.pnl7d ?? 0,
              volume: data.period === '30d' ? w.volume30d : w.volume7d,
              rank: w.rank,
              winRate: w.winRate,
              topMarket: w.topMarket,
              recentActivity: w.recentActivity
            }))}
            preloadedTrades={preloadedTrades}
          />
        ) : (
          <EmptyState
            icon="🐋"
            title="No whale data yet"
            description={
              hasError
                ? 'Unable to load leaderboard from Polymarket. The data API may be temporarily unavailable.'
                : 'Recent trading activity could not be aggregated. Try again later.'
            }
            action={{
              label: 'Back to Home',
              href: '/'
            }}
          />
        )}
      </div>

      <p className="mt-12 text-center text-xs text-muted-foreground">
        Data sourced from Polymarket public blockchain. Kalshi positions are private and not tracked.
      </p>
    </div>
  );
}
