import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface WhaleCardProps {
  rank: number;
  address: string;
  displayName: string;
  volume7d: number;
  pnl7d: number | null;
  winRate: number | null;
  topMarket: string | null;
  recentActivity: string;
}

function formatVolume(volume: number): string {
  if (volume >= 1_000_000) return `$${(volume / 1_000_000).toFixed(1)}M`;
  if (volume >= 1_000) return `$${(volume / 1_000).toFixed(0)}K`;
  return `$${Math.round(volume)}`;
}

function rankClass(rank: number): string {
  if (rank === 1) return 'bg-amber-400/20 text-amber-400 border-amber-400/40';
  if (rank === 2) return 'bg-slate-300/20 text-slate-300 border-slate-400/40';
  if (rank === 3) return 'bg-amber-700/20 text-amber-600 border-amber-700/40';
  return 'border-white/20 text-muted-foreground';
}

export function WhaleCard({
  rank,
  address,
  displayName,
  volume7d,
  pnl7d,
  winRate,
  topMarket,
  recentActivity
}: WhaleCardProps) {
  const isProfit = pnl7d != null && pnl7d >= 0;

  return (
    <Link href={`/whales/${address}`} className="block cursor-pointer">
      <Card className="border-white/10 bg-white/5 transition-all hover:border-white/20 hover:bg-white/[0.07]">
        <CardContent className="p-5">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge
              variant="outline"
              className={cn(
                'h-7 w-7 rounded-full border p-0 text-xs font-bold',
                rankClass(rank)
              )}
            >
              #{rank}
            </Badge>
            <span className="text-xs text-muted-foreground">{recentActivity}</span>
          </div>
          <p className="font-mono text-sm font-medium">{displayName}</p>

          <div className="space-y-1 text-sm">
            <p>
              Vol 7d: <span className="font-semibold">{formatVolume(volume7d)}</span>
            </p>
            <p>
              P&L:{' '}
              {pnl7d != null ? (
                <span
                  className={cn(
                    'font-semibold',
                    isProfit ? 'text-[#00ff88]' : 'text-red-400'
                  )}
                >
                  {isProfit ? '+' : ''}{formatVolume(pnl7d)}
                </span>
              ) : (
                <span className="text-muted-foreground">N/A</span>
              )}
            </p>
          </div>

          {winRate != null && (
            <div>
              <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                <span>Win</span>
                <span>{(winRate * 100).toFixed(0)}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className={cn(
                    'h-full rounded-full transition-all',
                    winRate >= 0.6 ? 'bg-[#00ff88]' : winRate >= 0.5 ? 'bg-amber-500' : 'bg-red-400'
                  )}
                  style={{ width: `${Math.min(100, winRate * 100)}%` }}
                />
              </div>
            </div>
          )}

          {topMarket && (
            <div>
              <p className="text-xs text-muted-foreground">Top</p>
              <p className="line-clamp-2 text-sm font-medium">{topMarket}</p>
            </div>
          )}

          <div className="flex items-center justify-end pt-2">
            <span className="text-sm font-medium text-[#00ff88]">View Profile →</span>
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
}
