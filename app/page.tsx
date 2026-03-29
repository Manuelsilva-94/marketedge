import type { Metadata } from 'next';
import Link from 'next/link';
import { auth } from '@/auth';
import { SearchBar } from '@/components/markets/SearchBar';
import { ArbitrageCard } from '@/components/markets/ArbitrageCard';
import { StatsGrid } from '@/components/stats/StatsGrid';
import { WhaleCard } from '@/components/whales/WhaleCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BMC_DONATION_URL, PAYPAL_DONATION_URL } from '@/lib/donation-links';

export const metadata: Metadata = {
  title: 'MarketEdge — Compare Prediction Markets & Find Arbitrage',
  description:
    'Real-time comparison of Polymarket and Kalshi. Find arbitrage opportunities, track whale traders, and compare prices across prediction markets.',
  openGraph: {
    title: 'MarketEdge — Compare Prediction Markets & Find Arbitrage',
    description:
      'Real-time comparison of Polymarket and Kalshi. Find arbitrage opportunities and track whale traders.',
    url: 'https://marketedge-chi.vercel.app',
    siteName: 'MarketEdge',
    type: 'website'
  },
  twitter: {
    card: 'summary',
    title: 'MarketEdge',
    description: 'Find arbitrage opportunities across Polymarket & Kalshi'
  }
};

const baseUrl =
  process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000';

const DEFAULT_STATS = {
  totalMarkets: 0,
  activeMarkets: 0,
  polymarketCount: 0,
  kalshiCount: 0,
  totalVolume24h: 0,
  lastSyncedAt: null as string | null,
  whalesTracked: 50
};


interface ArbitrageOpportunity {
  id: string;
  question: string;
  category: string | null;
  polymarket: { yesPrice: number; volume24h?: number };
  kalshi: { yesPrice: number; volume24h?: number };
  roi: number;
  volume24h?: number;
}

interface WhaleLeaderboardItem {
  address: string;
  displayName: string;
  volume7d: number;
  pnl7d: number | null;
  winRate: number | null;
  marketsTraded: number;
  topMarket: string | null;
  recentActivity: string;
}

const HOW_IT_WORKS = [
  { title: 'Search Markets', desc: 'Find markets across Polymarket and Kalshi' },
  { title: 'Compare Prices', desc: 'See effective prices with fees included' },
  { title: 'Find Arbitrage', desc: 'We detect opportunities automatically' }
];

function formatVolume(v: number): string {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `$${(v / 1_000).toFixed(0)}K`;
  return `$${Math.round(v)}`;
}

export default async function HomePage() {
  const session = await auth();
  const isNewUser = !session?.user;

  const [statsResult, trendingResult, arbitrageResult, whalesResult] = await Promise.allSettled([
    fetch(`${baseUrl}/api/stats/overview`, { next: { revalidate: 300 } }).then((r) => r.json()),
    fetch(`${baseUrl}/api/markets/trending?limit=3`, { next: { revalidate: 300 } }).then((r) => r.json()),
    fetch(`${baseUrl}/api/arbitrage/live?limit=3`, { next: { revalidate: 120 } }).then((r) => r.json()),
    fetch(`${baseUrl}/api/whales/leaderboard?period=7d&limit=3`, { next: { revalidate: 600 } }).then((r) => r.json())
  ]);

  const statsData =
    statsResult.status === 'fulfilled' ? statsResult.value : DEFAULT_STATS;
  const trendingData =
    trendingResult.status === 'fulfilled'
      ? trendingResult.value
      : { markets: [] as Array<{ id: string; platform: string; question: string; category: string | null; volume24h: number; url: string | null }> };
  const arbitrageData =
    arbitrageResult.status === 'fulfilled'
      ? arbitrageResult.value
      : { opportunities: [] as ArbitrageOpportunity[] };

  const stats = statsData && typeof statsData === 'object' ? statsData : DEFAULT_STATS;
  const totalMarkets = stats.totalMarkets ?? 0;
  const totalVolume = stats.totalVolume24h ?? 0;
  const opportunities: ArbitrageOpportunity[] = arbitrageData?.opportunities ?? [];
  const trendingMarkets = trendingData?.markets ?? [];
  const whalesData = whalesResult.status === 'fulfilled' ? whalesResult.value : { whales: [] };
  const whales: WhaleLeaderboardItem[] = Array.isArray(whalesData?.whales) ? whalesData.whales : [];

  return (
    <div className="bg-[#0a0a0f]">
      {/* Section 1: Hero */}
      <section className="border-b border-white/10 px-4 pt-24 pb-16">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Compare Prediction Markets. Find Arbitrage. Follow Smart Money.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            Real-time comparison across Polymarket & Kalshi
          </p>
          <div className="mx-auto mt-8 max-w-xl">
            <SearchBar size="lg" placeholder="Search markets..." />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span>{totalMarkets > 0 ? `${totalMarkets.toLocaleString()}+ Markets` : '–'}</span>
            <span>•</span>
            <span>2 Platforms</span>
            <span>•</span>
            <span>Live Prices</span>
          </div>
        </div>
        {/* Support section */}
        <div className="container mx-auto max-w-6xl mt-6">
          <div className="flex flex-col items-center gap-3 text-center  sm:justify-between sm:text-left">
            <div>
              <p className="text-sm font-medium text-center text-muted-foreground">
                MarketEdge is free to use
              </p>
              <p className="text-xs text-muted-foreground/60">
                If it saves you time or money, consider supporting the project
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center justify-center gap-3 sm:justify-end">
              <a
                href={BMC_DONATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground"
              >
                ☕ Buy me a coffee
              </a>
              <a
                href={PAYPAL_DONATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground"
              >
                PayPal
              </a>
            </div>
          </div>
        </div>

      </section>

      {/* Onboarding banner — solo para usuarios no logueados */}
      {isNewUser && (
        <section className="border-b border-white/10 bg-[#00ff88]/5 px-4 py-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="text-xl">👋</span>
                <div>
                  <p className="text-sm font-medium text-white">
                    New to MarketEdge?
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Search a market → Compare prices across platforms → Find arbitrage opportunities automatically.
                    Sign in to save your favorites and get alerts.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-8 sm:ml-0">
                <a
                  href="/search"
                  className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10 transition-colors"
                >
                  Search Markets
                </a>
                <a
                  href="/login"
                  className="rounded-lg bg-[#00ff88] px-3 py-1.5 text-xs font-medium text-black hover:bg-[#00ff88]/90 transition-colors"
                >
                  Sign in free →
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section 2: Live Arbitrage Opportunities */}
      <section className="border-b border-white/10 px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Live Arbitrage Opportunities</h2>
            <Button variant="link" asChild className="text-[#00ff88] hover:text-[#00ff88]/90">
              <Link href="/arbitrage">View All Opportunities →</Link>
            </Button>
          </div>
          {opportunities.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {opportunities.slice(0, 3).map((opp) => (
                <ArbitrageCard
                  key={opp.id}
                  question={opp.question}
                  polymarketYesPrice={opp.polymarket?.yesPrice ?? 0.5}
                  kalshiYesPrice={opp.kalshi?.yesPrice ?? 0.5}
                  roi={(opp.roi ?? 0) / 100}
                  volume24h={Math.max(
                    (opp.polymarket?.volume24h ?? 0) + (opp.kalshi?.volume24h ?? 0),
                    opp.volume24h ?? 0
                  )}
                  category={opp.category ?? 'General'}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-white/10 bg-white/5 px-6 py-12 text-center text-muted-foreground">
              Scanning for opportunities...
            </div>
          )}
        </div>
      </section>

      {/* Section 3: Stats Overview */}
      <section className="border-b border-white/10 px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <StatsGrid
            stats={[
              {
                value: totalMarkets > 0 ? totalMarkets.toLocaleString() : '–',
                label: 'Total Markets'
              },
              {
                value: opportunities.length > 0 ? opportunities.length : '–',
                label: 'Active Arbitrages'
              },
              {
                value: totalVolume > 0 ? formatVolume(totalVolume) : '–',
                label: 'Total Volume'
              },
              {
                value: stats.whalesTracked ?? 50,
                label: 'Whales Tracked'
              }
            ]}
          />
        </div>
      </section>

      {/* Section 4: Top Whales */}
      <section className="border-b border-white/10 px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Top Whales This Week</h2>
            <Button variant="link" asChild className="text-[#00ff88] hover:text-[#00ff88]/90">
              <Link href="/whales">View Leaderboard →</Link>
            </Button>
          </div>
          {whales.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {whales.slice(0, 3).map((whale, i) => (
                <WhaleCard
                  key={whale.address}
                  rank={i + 1}
                  address={whale.address}
                  displayName={whale.displayName}
                  volume7d={whale.volume7d}
                  pnl7d={whale.pnl7d}
                  winRate={whale.winRate}
                  topMarket={whale.topMarket}
                  recentActivity={whale.recentActivity}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-white/10 bg-white/5 px-6 py-12 text-center text-muted-foreground">
              No whales tracked yet.
            </div>
          )}
        </div>
      </section>

      {/* Section 5: How It Works */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-2xl font-semibold tracking-tight">How It Works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {HOW_IT_WORKS.map((item, i) => (
              <Card key={i} className="border-white/10 bg-white/5 text-center">
                <CardContent className="p-8">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-xl font-bold text-[#00ff88]">
                    {i + 1}
                  </div>
                  <h3 className="mb-2 font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
