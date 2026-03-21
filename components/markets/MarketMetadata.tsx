import { Badge } from '@/components/ui/badge';
import { PlatformBadge } from './PlatformBadge';
export interface MarketMetadataMarket {
  platform: 'POLYMARKET' | 'KALSHI';
  category: string | null;
  tags: string[];
  endDate: string | null;
  volume24h: number;
  volumeTotal: number;
  liquidity: number;
  makerFee: number | null;
  takerFee: number | null;
  url: string | null;
}

interface MarketMetadataProps {
  market: MarketMetadataMarket;
}

function formatVolume(volume: number): string {
  if (volume >= 1_000_000) return `$${(volume / 1_000_000).toFixed(1)}M`;
  if (volume >= 1_000) return `$${(volume / 1_000).toFixed(0)}K`;
  return `$${Math.round(volume)}`;
}

function daysUntil(endDate: string): number {
  const diff = new Date(endDate).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (24 * 60 * 60 * 1000)));
}

export function MarketMetadata({ market }: MarketMetadataProps) {
  const days = market.endDate ? daysUntil(market.endDate) : null;

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Metadata</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Platform
          </p>
          <div className="mt-1">
            <PlatformBadge platform={market.platform} />
          </div>
        </div>
        {market.category && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Category
            </p>
            <p className="mt-1 font-medium">{market.category}</p>
          </div>
        )}
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Tags
          </p>
          <div className="mt-1 flex flex-wrap gap-1">
            {market.tags.length > 0 ? (
              market.tags.slice(0, 8).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-white/20 text-xs text-muted-foreground"
                >
                  {tag}
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">–</span>
            )}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            End Date
          </p>
          <p className="mt-1 font-medium">
            {market.endDate
              ? new Date(market.endDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })
              : '–'}
          </p>
          {days != null && days <= 7 && days > 0 && (
            <p className="mt-0.5 text-xs text-amber-400">{days} days left</p>
          )}
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Volume (24h / Total)
          </p>
          <p className="mt-1 font-medium">
            {formatVolume(market.volume24h)} / {formatVolume(market.volumeTotal)}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Liquidity
          </p>
          <p className="mt-1 font-medium">{formatVolume(market.liquidity)}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Fees (Maker / Taker)
          </p>
          <p className="mt-1 font-medium">
            {market.makerFee != null
              ? `${(market.makerFee * 100).toFixed(1)}%`
              : '–'}{' '}
            /{' '}
            {market.takerFee != null
              ? `${(market.takerFee * 100).toFixed(1)}%`
              : '–'}
          </p>
        </div>
        {market.url && (
          <div className="sm:col-span-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Platform link
            </p>
            <a
              href={market.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block truncate text-sm text-[#00ff88] hover:underline"
            >
              {market.url}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
