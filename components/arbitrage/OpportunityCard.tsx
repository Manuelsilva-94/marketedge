'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { buildKalshiUrl } from '@/lib/utils/kalshi-url';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Platform } from '@/lib/types';

export interface OpportunityCardOpportunity {
  id: string;
  question: string;
  category: string | null;
  roi: number;
  matchScore: number;
  matchType: 'STRICT' | 'FUZZY' | 'RELATED';
  polymarket: {
    id: string;
    yesPrice: number;
    noPrice: number;
    effectiveYesPrice: number;
    volume24h: number;
    url: string | null;
  };
  kalshi: {
    id: string;
    externalId?: string;
    seriesId?: string | null;
    eventId?: string | null;
    yesPrice: number;
    noPrice: number;
    effectiveYesPrice: number;
    volume24h: number;
    url: string | null;
  };
  buyYesOn: Platform;
  buyNoOn: Platform;
  totalVolume24h: number;
  detectedAt: string;
}

interface OpportunityCardProps {
  opportunity: OpportunityCardOpportunity;
}

function formatVolume(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${Math.round(n)}`;
}

function roiBadgeClass(roi: number): string {
  if (roi >= 2) return 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/40';
  if (roi >= 1) return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
  return 'bg-white/10 text-muted-foreground border-white/20';
}

function matchTypeClass(matchType: string): string {
  if (matchType === 'STRICT') return 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/40';
  if (matchType === 'FUZZY') return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
  return 'bg-white/10 text-muted-foreground border-white/20';
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const o = opportunity;

  const handleShare = async () => {
    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}/compare?a=${o.polymarket.id}&b=${o.kalshi.id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: abrir en nueva pestaña
      window.open(shareUrl, '_blank');
    }
  };

  const yesPoly = o.polymarket.yesPrice;
  const noPoly = o.polymarket.noPrice;
  const yesKalshi = o.kalshi.yesPrice;
  const noKalshi = o.kalshi.noPrice;

  const effYesPoly = o.polymarket.effectiveYesPrice;
  const effYesKalshi = o.kalshi.effectiveYesPrice;
  const effNoPoly = o.polymarket.noPrice * 1.02;
  const effNoKalshi = o.kalshi.noPrice + 0.07 * (1 - o.kalshi.noPrice);

  const costYes = o.buyYesOn === 'POLYMARKET' ? effYesPoly : effYesKalshi;
  const costNo = o.buyNoOn === 'POLYMARKET' ? effNoPoly : effNoKalshi;
  const totalCost = costYes + costNo;
  const profit = 1 - totalCost;
  const roiPct = totalCost > 0 ? (profit / totalCost) * 100 : 0;

  const polyUrl = o.polymarket.url || 'https://polymarket.com';
  const kalshiUrl = o.kalshi.externalId
    ? buildKalshiUrl({ externalId: o.kalshi.externalId, seriesId: o.kalshi.seriesId, eventId: o.kalshi.eventId, url: o.kalshi.url })
    : (o.kalshi.url || 'https://kalshi.com');

  return (
    <Card
      className="overflow-hidden border-white/10 bg-white/5 transition-all hover:border-white/20 cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <CardContent className="p-0">
        <div className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="outline"
                  className={cn('text-xs', matchTypeClass(o.matchType))}
                >
                  {o.matchType}
                </Badge>
                {o.category && (
                  <Badge variant="outline" className="border-white/20 text-muted-foreground">
                    {o.category}
                  </Badge>
                )}
              </div>
              <h3 className="mt-2 line-clamp-2 font-medium leading-tight">
                {o.question}
              </h3>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-6 text-sm">
            <span className="text-muted-foreground">
              Polymarket: <span className="font-mono font-semibold text-green-400">{(yesPoly * 100).toFixed(0)}¢ YES</span>
            </span>
            <span className="text-muted-foreground">
              Kalshi: <span className="font-mono font-semibold text-amber-400">{(yesKalshi * 100).toFixed(0)}¢ YES</span>
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className={cn('border', roiBadgeClass(o.roi))}>
                +{o.roi.toFixed(1)}% ROI
              </Badge>
              <span className="text-sm text-muted-foreground">
                Vol: {formatVolume(o.totalVolume24h)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  void handleShare();
                }}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded border border-white/10 hover:border-white/20"
                title="Copy link to compare"
              >
                {copied ? '✓ Copied!' : '⎘ Share'}
              </button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(!expanded);
                }}
              >
                {expanded ? '▲ Collapse' : '▼ Details'}
              </Button>
            </div>
          </div>
        </div>

        <div
          className={cn(
            'grid transition-all duration-200 ease-in-out',
            expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="overflow-hidden">
            <div className="border-t border-white/10 bg-white/[0.03] p-5">
              <h4 className="text-sm font-semibold text-muted-foreground">
                HOW TO EXECUTE
              </h4>
              <ol className="mt-3 list-decimal space-y-1 pl-4 text-sm">
                <li>
                  Buy YES on {o.buyYesOn === 'POLYMARKET' ? 'Polymarket' : 'Kalshi'} at {(o.buyYesOn === 'POLYMARKET' ? yesPoly : yesKalshi) * 100}¢
                </li>
                <li>
                  Buy NO on {o.buyNoOn === 'POLYMARKET' ? 'Polymarket' : 'Kalshi'} at {(o.buyNoOn === 'POLYMARKET' ? noPoly : noKalshi) * 100}¢
                </li>
              </ol>
              <p className="mt-3 text-sm text-muted-foreground">
                With fees: Effective YES {o.buyYesOn === 'POLYMARKET' ? '(Polymarket)' : '(Kalshi)'}: {((o.buyYesOn === 'POLYMARKET' ? effYesPoly : effYesKalshi) * 100).toFixed(1)}¢ · Effective NO {o.buyNoOn === 'POLYMARKET' ? '(Polymarket)' : '(Kalshi)'}: {((o.buyNoOn === 'POLYMARKET' ? effNoPoly : effNoKalshi) * 100).toFixed(1)}¢
              </p>
              <p className="mt-1 text-sm">
                Total: {(totalCost * 100).toFixed(1)}¢ → Profit: {(profit * 100).toFixed(1)}¢ ({(roiPct).toFixed(1)}% ROI)
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outline" size="sm" asChild className="border-white/20">
                  <a href={polyUrl} target="_blank" rel="noopener noreferrer">
                    Open Polymarket ↗
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild className="border-white/20">
                  <a href={kalshiUrl} target="_blank" rel="noopener noreferrer">
                    Open Kalshi ↗
                  </a>
                </Button>
              </div>
              <p className="mt-4 text-xs text-amber-500/90">
                ⚠️ Prices change rapidly. Verify before trading.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
