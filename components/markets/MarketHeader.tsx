import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { PlatformBadge } from './PlatformBadge';
import { Badge } from '@/components/ui/badge';
import { RefreshButton } from './RefreshButton';
import { cn } from '@/lib/utils';

export interface MarketHeaderMarket {
  id: string;
  platform: 'POLYMARKET' | 'KALSHI';
  question: string;
  category: string | null;
  url: string | null;
  endDate: string | null;
  volume24h: number;
  yesPrice: number | null;
  noPrice: number | null;
  effectiveYesPrice: number | null;
}

interface MarketHeaderProps {
  market: MarketHeaderMarket;
}

function formatCents(p: number): string {
  return `${Math.round(p * 100)}¢`;
}

function formatVolume(volume: number): string {
  if (volume >= 1_000_000) return `$${(volume / 1_000_000).toFixed(1)}M`;
  if (volume >= 1_000) return `$${(volume / 1_000).toFixed(0)}K`;
  return `$${Math.round(volume)}`;
}

export function MarketHeader({ market }: MarketHeaderProps) {
  const yesPrice = market.yesPrice ?? null;
  const noPrice = market.noPrice ?? null;
  const yesPct = yesPrice != null ? yesPrice * 100 : 50;
  const noPct = noPrice != null ? noPrice * 100 : 50;

  return (
    <header className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <PlatformBadge platform={market.platform} />
          {market.category && (
            <Badge variant="outline" className="border-white/20 text-muted-foreground">
              {market.category}
            </Badge>
          )}
        </div>
        <RefreshButton />
      </div>

      <h1 className="text-2xl font-semibold leading-tight md:text-3xl">
        {market.question}
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            YES
          </p>
          <p className="mt-1 text-2xl font-bold text-green-400">
            {yesPrice != null ? formatCents(yesPrice) : 'Price unavailable'}
          </p>
          {yesPrice != null && (
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-green-500"
                style={{ width: `${Math.min(100, yesPct)}%` }}
              />
            </div>
          )}
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            NO
          </p>
          <p className="mt-1 text-2xl font-bold text-red-400">
            {noPrice != null ? formatCents(noPrice) : 'Price unavailable'}
          </p>
          {noPrice != null && (
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-red-500"
                style={{ width: `${Math.min(100, noPct)}%` }}
              />
            </div>
          )}
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Volume 24h
          </p>
          <p className="mt-1 text-xl font-semibold">{formatVolume(market.volume24h)}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            End Date
          </p>
          <p className="mt-1 text-lg font-medium">
            {market.endDate
              ? new Date(market.endDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })
              : '–'}
          </p>
        </div>
      </div>

      {market.url && (
        <a
          href={market.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-[#00ff88] hover:underline"
        >
          Open on {market.platform === 'POLYMARKET' ? 'Polymarket' : 'Kalshi'}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
    </header>
  );
}
