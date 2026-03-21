'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { PlatformBadge } from '@/components/markets/PlatformBadge';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface MarketWithPrices {
  id: string;
  platform: 'POLYMARKET' | 'KALSHI';
  question: string;
  yesPrice: number | null;
  noPrice: number | null;
  effectiveYesPrice: number | null;
  url: string | null;
}

export interface MatchWithPrices {
  market: MarketWithPrices;
  matchScore: number;
  matchType: 'STRICT' | 'FUZZY' | 'RELATED';
}

interface ComparisonTableProps {
  baseMarket: MarketWithPrices;
  matches: MatchWithPrices[];
}

function formatCents(p: number | null): string {
  if (p == null) return '–';
  return `${Math.round(p * 100)}¢`;
}

function priceBar(p: number | null): number {
  if (p == null) return 50;
  return Math.min(100, Math.max(0, p * 100));
}

function matchTypeColor(matchType: string): string {
  switch (matchType) {
    case 'STRICT':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'FUZZY':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    default:
      return 'bg-white/10 text-muted-foreground border-white/20';
  }
}

export function ComparisonTable({ baseMarket, matches }: ComparisonTableProps) {
  const allRows: { market: MarketWithPrices; matchScore?: number; matchType?: string; isBase: boolean }[] = [
    { market: baseMarket, isBase: true }
  ];
  matches.forEach((m) => {
    allRows.push({
      market: m.market,
      matchScore: m.matchScore,
      matchType: m.matchType,
      isBase: false
    });
  });

  const bestEffYes = Math.min(
    ...allRows
      .map((r) => r.market.effectiveYesPrice)
      .filter((p): p is number => p != null),
    Infinity
  );
  const bestEffYesVal = bestEffYes === Infinity ? null : bestEffYes;

  return (
    <TooltipProvider>
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Cross-Platform Comparison</h2>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="pb-3 pr-4 text-left font-medium text-muted-foreground">
                  Market
                </th>
                <th className="pb-3 px-4 text-left font-medium text-muted-foreground">
                  YES Price
                </th>
                <th className="pb-3 px-4 text-left font-medium text-muted-foreground">
                  NO Price
                </th>
                <th className="pb-3 pl-4 text-left font-medium text-muted-foreground">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help underline decoration-dotted">
                        Eff. YES
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      Effective YES price including platform fees
                    </TooltipContent>
                  </Tooltip>
                </th>
              </tr>
            </thead>
            <tbody>
              {allRows.map((row) => {
                const isBest =
                  row.market.effectiveYesPrice != null &&
                  row.market.effectiveYesPrice === bestEffYesVal;
                return (
                  <tr
                    key={row.market.id}
                    className={cn(
                      'border-b border-white/10',
                      isBest && 'bg-[#00ff88]/10'
                    )}
                  >
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <PlatformBadge platform={row.market.platform} />
                        {row.matchType && (
                          <Badge
                            variant="outline"
                            className={cn(
                              'text-xs',
                              matchTypeColor(row.matchType)
                            )}
                          >
                            {row.matchType}
                          </Badge>
                        )}
                        {row.isBase && (
                          <span className="text-xs text-muted-foreground">
                            (base)
                          </span>
                        )}
                        <span className="line-clamp-1 font-medium">
                          {row.market.question}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">
                          {formatCents(row.market.yesPrice)}
                        </span>
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-green-500"
                            style={{
                              width: `${priceBar(row.market.yesPrice)}%`
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-red-400">
                      {formatCents(row.market.noPrice)}
                    </td>
                    <td className="py-3 pl-4">
                      <span
                        className={
                          isBest ? 'font-semibold text-[#00ff88]' : undefined
                        }
                      >
                        {formatCents(row.market.effectiveYesPrice)}
                      </span>
                      {isBest && (
                        <span className="ml-1 text-xs text-[#00ff88]">
                          best
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="space-y-3 md:hidden">
          {allRows.map((row) => {
            const isBest =
              row.market.effectiveYesPrice != null &&
              row.market.effectiveYesPrice === bestEffYesVal;
            return (
              <div
                key={row.market.id}
                className={cn(
                  'rounded-lg border border-white/10 bg-white/5 p-4',
                  isBest && 'border-[#00ff88]/50 bg-[#00ff88]/10'
                )}
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <PlatformBadge platform={row.market.platform} />
                  {row.matchType && (
                    <Badge
                      variant="outline"
                      className={cn('text-xs', matchTypeColor(row.matchType))}
                    >
                      {row.matchType}
                    </Badge>
                  )}
                  {row.isBase && (
                    <span className="text-xs text-muted-foreground">(base)</span>
                  )}
                </div>
                <p className="mb-3 line-clamp-2 text-sm font-medium">
                  {row.market.question}
                </p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">YES</p>
                    <p className="text-green-400">
                      {formatCents(row.market.yesPrice)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">NO</p>
                    <p className="text-red-400">
                      {formatCents(row.market.noPrice)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Eff. YES</p>
                    <p
                      className={
                        isBest ? 'font-semibold text-[#00ff88]' : undefined
                      }
                    >
                      {formatCents(row.market.effectiveYesPrice)}
                      {isBest && ' (best)'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </TooltipProvider>
  );
}
