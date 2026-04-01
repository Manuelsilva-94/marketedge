import Link from 'next/link';
import { SearchBar } from '@/components/markets/SearchBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BMC_DONATION_URL, PAYPAL_DONATION_URL } from '@/lib/donation-links';

const HOW_IT_WORKS = [
  { title: 'Search Markets', desc: 'Find markets across Polymarket and Kalshi' },
  { title: 'Compare Prices', desc: 'See effective prices with fees included' },
  { title: 'Find Arbitrage', desc: 'We detect opportunities automatically' }
];

export default function HomeLoading() {
  return (
    <div className="bg-[#0a0a0f]">
      {/* Section 1: Hero — fully static */}
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
            <span>–</span>
            <span>•</span>
            <span>2 Platforms</span>
            <span>•</span>
            <span>Live Prices</span>
          </div>
        </div>
        <div className="container mx-auto max-w-6xl mt-6">
          <div className="flex flex-col items-center gap-3 text-center sm:justify-between sm:text-left">
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
               Buy me a coffee
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

      {/* Onboarding banner — static */}
      <section className="border-b border-white/10 bg-[#00ff88]/5 px-4 py-5">
        <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">👋</span>
            <div>
              <p className="font-semibold text-white">New to MarketEdge?</p>
              <p className="text-sm text-muted-foreground">
                Search a market → Compare prices across platforms → Find arbitrage opportunities automatically. Sign in to save your favorites and get alerts.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button asChild size="sm" className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
              <Link href="/search">Search Markets</Link>
            </Button>
            <Button asChild size="sm" className="bg-[#00ff88] hover:bg-[#00ff88]/90 text-[#0a0a0f]">
              <Link href="/login">Sign in (free) →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Section 2: Arbitrage skeleton */}
      <section className="border-b border-white/10 px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Live Arbitrage Opportunities</h2>
            <Button variant="link" asChild className="text-[#00ff88] hover:text-[#00ff88]/90">
              <Link href="/arbitrage">View All Opportunities →</Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-white/10 bg-white/5">
                <CardContent className="space-y-4 p-5">
                  <div className="h-5 w-full animate-pulse rounded bg-white/5" />
                  <div className="h-5 w-3/4 animate-pulse rounded bg-white/5" />
                  <div className="flex gap-4">
                    <div className="h-4 w-24 animate-pulse rounded bg-white/5" />
                    <div className="h-4 w-20 animate-pulse rounded bg-white/5" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Stats skeleton */}
      <section className="border-b border-white/10 px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border-white/10 bg-white/5">
                <CardContent className="flex flex-col gap-2 p-6">
                  <div className="h-10 w-20 animate-pulse rounded bg-white/5" />
                  <div className="h-4 w-24 animate-pulse rounded bg-white/5" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Whales skeleton */}
      <section className="border-b border-white/10 px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Top Whales This Week</h2>
            <Button variant="link" asChild className="text-[#00ff88] hover:text-[#00ff88]/90">
              <Link href="/whales">View Leaderboard →</Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-white/10 bg-white/5">
                <CardContent className="space-y-4 p-5">
                  <div className="flex justify-between">
                    <div className="h-6 w-6 animate-pulse rounded-full bg-white/5" />
                    <div className="h-5 w-28 animate-pulse rounded bg-white/5" />
                  </div>
                  <div className="h-4 w-24 animate-pulse rounded bg-white/5" />
                  <div className="h-7 w-20 animate-pulse rounded bg-white/5" />
                  <div className="h-2 w-full animate-pulse rounded-full bg-white/5" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: How it works — fully static */}
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
