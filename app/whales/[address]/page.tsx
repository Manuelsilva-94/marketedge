import { notFound } from 'next/navigation';
import { WhaleHeader } from '@/components/whales/WhaleHeader';
import { TradeRow } from '@/components/whales/TradeRow';
import { PositionCard } from '@/components/whales/PositionCard';
import { Button } from '@/components/ui/button';
import type { WhaleProfileApiResponse } from '@/app/api/whales/[address]/route';

const baseUrl =
  process.env.NEXT_PUBLIC_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

interface WhaleDetailPageProps {
  params: Promise<{ address: string }>;
}

export default async function WhaleDetailPage({ params }: WhaleDetailPageProps) {
  const { address } = await params;
  const normalized = address?.trim();
  const isValidAddress = normalized ? /^0x[a-fA-F0-9]{40}$/.test(normalized) : false;
  if (!normalized || !isValidAddress) notFound();

  let data: WhaleProfileApiResponse;
  try {
    const res = await fetch(`${baseUrl}/api/whales/${encodeURIComponent(normalized!)}`, {
      next: { revalidate: 300 }
    });
    data = await res.json();
  } catch {
    notFound();
  }

  if (!data || data.error) notFound();

  const { stats, recentTrades, topPositions } = data;

  return (
    <div className="container px-4 py-8">
      <WhaleHeader
        address={data.address}
        displayName={data.displayName}
        volume7d={stats.volume7d}
        volume30d={stats.volume30d}
        pnl7d={stats.pnl7d}
        winRate={stats.winRate}
        marketsTraded={topPositions.length}
      />

      {recentTrades.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold">Recent Trades</h2>
          <div className="overflow-x-auto rounded-lg border border-white/10">
            <table className="w-full min-w-[600px] text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="py-3 pr-2 text-xs font-medium text-muted-foreground">Market</th>
                  <th className="py-3 pr-2 text-xs font-medium text-muted-foreground">Outcome</th>
                  <th className="py-3 pr-2 text-xs font-medium text-muted-foreground">Side</th>
                  <th className="py-3 pr-2 text-xs font-medium text-muted-foreground">Price</th>
                  <th className="py-3 pr-2 text-xs font-medium text-muted-foreground">Total</th>
                  <th className="py-3 pr-2 text-xs font-medium text-muted-foreground">Time</th>
                  <th className="py-3 text-xs font-medium text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {recentTrades.map((t) => (
                  <TradeRow
                    key={t.id}
                    market={t.market}
                    outcome={t.outcome as 'YES' | 'NO'}
                    side={t.side as 'BUY' | 'SELL'}
                    price={t.price}
                    size={t.size}
                    timestamp={t.timestamp}
                    transactionHash={t.transactionHash}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {topPositions.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold">Top Positions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topPositions.map((p, i) => (
              <PositionCard
                key={`${p.marketSlug}-${i}`}
                market={p.market}
                marketSlug={p.marketSlug}
                outcome={p.outcome as 'YES' | 'NO'}
                size={p.size}
                avgPrice={p.avgPrice}
                currentPrice={p.currentPrice}
                unrealizedPnl={p.unrealizedPnl}
              />
            ))}
          </div>
        </section>
      )}

      {recentTrades.length === 0 && topPositions.length === 0 && (
        <p className="mt-8 text-center text-muted-foreground">
          No recent trades or open positions for this address.
        </p>
      )}

      <div className="mt-10 flex justify-center">
        <Button variant="outline" asChild className="border-white/20">
          <a
            href={`https://polymarket.com/profile/${data.address}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Polymarket ↗
          </a>
        </Button>
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        Data sourced from Polymarket public blockchain. Kalshi positions are private and not tracked.
      </p>
    </div>
  );
}
