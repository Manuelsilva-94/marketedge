import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface PositionCardProps {
  market: string;
  marketSlug: string;
  outcome: 'YES' | 'NO';
  size: number;
  avgPrice: number;
  currentPrice: number | null;
  unrealizedPnl: number | null;
}

function formatUsd(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(2)}K`;
  return `$${n.toFixed(2)}`;
}

export function PositionCard({
  market,
  marketSlug,
  outcome,
  size,
  avgPrice,
  currentPrice,
  unrealizedPnl
}: PositionCardProps) {
  const positionValue = size * avgPrice;

  return (
    <Card className="border-white/10 bg-white/5 transition-all hover:border-white/20">
      <CardContent className="p-4">
        <div className="space-y-3">
          {marketSlug ? (
            <Link
              href={`https://polymarket.com/event/${marketSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-green-400 transition-colors line-clamp-2"
            >
              {market || 'Unknown market'} ↗
            </Link>
          ) : (
            <p className="font-medium line-clamp-2">{market || 'Unknown market'}</p>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className={
                outcome === 'YES'
                  ? 'border-green-500/40 bg-green-500/20 text-green-400'
                  : 'border-red-500/40 bg-red-500/20 text-red-400'
              }
            >
              {outcome}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Size</p>
              <p className="font-mono">{size.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg entry</p>
              <p className="font-mono">{(avgPrice * 100).toFixed(1)}¢</p>
            </div>
            {currentPrice != null && (
              <>
                <div>
                  <p className="text-xs text-muted-foreground">Current</p>
                  <p className="font-mono">{(currentPrice * 100).toFixed(1)}¢</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Unrealized P&L</p>
                  <p
                    className={cn(
                      'font-mono font-semibold',
                      unrealizedPnl != null
                        ? unrealizedPnl >= 0
                          ? 'text-[#00ff88]'
                          : 'text-red-400'
                        : 'text-muted-foreground'
                    )}
                  >
                    {unrealizedPnl != null ? formatUsd(unrealizedPnl) : '—'}
                  </p>
                </div>
              </>
            )}
          </div>
          {positionValue > 0 && (
            <p className="text-xs text-muted-foreground">
              Position value: {formatUsd(positionValue)}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
