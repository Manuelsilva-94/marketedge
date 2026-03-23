import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildKalshiUrl } from '@/lib/utils/kalshi-url';
import { MarketHeader } from '@/components/markets/MarketHeader';
import { MarketMetadata } from '@/components/markets/MarketMetadata';
import { ComparisonTable } from '@/components/comparison/ComparisonTable';
import { ArbitrageAlert } from '@/components/comparison/ArbitrageAlert';
import { ChevronRight } from 'lucide-react';

const baseUrl =
  process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000';

interface MarketPageProps {
  params: Promise<{ id: string }>;
}

export default async function MarketPage({ params }: MarketPageProps) {
  const { id } = await params;

  let data: {
    market: {
      id: string;
      platform: 'POLYMARKET' | 'KALSHI';
      question: string;
      category: string | null;
      tags: string[];
      endDate: string | null;
      volume24h: number;
      volumeTotal: number;
      liquidity: number;
      url: string | null;
      externalId?: string;
      seriesId?: string | null;
      eventId?: string | null;
      eventTitle: string | null;
      yesPrice: number | null;
      noPrice: number | null;
      effectiveYesPrice: number | null;
      makerFee: number | null;
      takerFee: number | null;
    };
    matches: Array<{
      market: {
        id: string;
        platform: 'POLYMARKET' | 'KALSHI';
        question: string;
        url: string | null;
        yesPrice: number | null;
        noPrice: number | null;
        effectiveYesPrice: number | null;
      };
      matchScore: number;
      matchType: 'STRICT' | 'FUZZY' | 'RELATED';
    }>;
    arbitrage: {
      detected: boolean;
      roi: number | null;
      buyYesOn: 'POLYMARKET' | 'KALSHI' | null;
      buyNoOn: 'POLYMARKET' | 'KALSHI' | null;
      explanation: string | null;
    } | null;
    error: string | null;
  } | null = null;

  try {
    const res = await fetch(`${baseUrl}/api/compare/${id}`, {
      cache: 'no-store'
    });
    data = await res.json();
  } catch {
    notFound();
  }

  if (!data || data.error || !data.market) {
    notFound();
  }

  const { market, matches, arbitrage } = data;
  const searchQuery = market.question
    .replace(/^Will\s+/i, '')
    .replace(/\?.*/, '')
    .split(' ')
    .slice(0, 4)
    .join(' ');
  const questionTruncated =
    market.question.length > 50
      ? `${market.question.slice(0, 50)}…`
      : market.question;

  return (
    <div className="container px-4 py-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/search" className="hover:text-foreground">
          Search
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="truncate max-w-[200px] md:max-w-md" title={market.question}>
          {questionTruncated}
        </span>
      </nav>

      <div className="mx-auto max-w-4xl space-y-10">
        <MarketHeader
          market={{
            id: market.id,
            platform: market.platform,
            question: market.question,
            category: market.category,
            url: market.platform === 'KALSHI' && market.externalId
              ? buildKalshiUrl({ externalId: market.externalId, seriesId: market.seriesId, eventId: market.eventId, url: market.url })
              : market.url,
            endDate: market.endDate,
            volume24h: market.volume24h,
            yesPrice: market.yesPrice,
            noPrice: market.noPrice,
            effectiveYesPrice: market.effectiveYesPrice
          }}
        />

        {arbitrage?.detected && arbitrage.roi != null && arbitrage.buyYesOn && arbitrage.buyNoOn && (
          <ArbitrageAlert
            roi={arbitrage.roi}
            buyYesOn={arbitrage.buyYesOn}
            buyNoOn={arbitrage.buyNoOn}
            explanation={arbitrage.explanation}
          />
        )}

        {matches.length > 0 ? (
          <ComparisonTable
            baseMarket={{
              id: market.id,
              platform: market.platform,
              question: market.question,
              yesPrice: market.yesPrice,
              noPrice: market.noPrice,
              effectiveYesPrice: market.effectiveYesPrice,
              url: market.platform === 'KALSHI' && market.externalId
                ? buildKalshiUrl({ externalId: market.externalId, seriesId: market.seriesId, eventId: market.eventId, url: market.url })
                : market.url
            }}
            matches={matches.map((m) => ({
              market: m.market,
              matchScore: m.matchScore,
              matchType: m.matchType
            }))}
          />
        ) : (
          <div className="rounded-lg border border-white/10 bg-white/5 px-6 py-8 text-center space-y-3">
            <p className="text-muted-foreground text-sm">
              No automatic matches found on other platforms
            </p>
            <Link
              href={`/search?q=${encodeURIComponent(searchQuery)}`}
              className="inline-block rounded border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition-colors"
            >
              🔍 Find manually →
            </Link>
          </div>
        )}

        <MarketMetadata
          market={{
            platform: market.platform,
            category: market.category,
            tags: market.tags,
            endDate: market.endDate,
            volume24h: market.volume24h,
            volumeTotal: market.volumeTotal,
            liquidity: market.liquidity,
            makerFee: market.makerFee,
            takerFee: market.takerFee,
            url: market.platform === 'KALSHI' && market.externalId
              ? buildKalshiUrl({ externalId: market.externalId, seriesId: market.seriesId, eventId: market.eventId, url: market.url })
              : market.url
          }}
        />
      </div>
    </div>
  );
}
