'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlatformBadge } from './PlatformBadge';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface MarketCardProps {
  id: string;
  platform: 'POLYMARKET' | 'KALSHI';
  question: string;
  category: string | null;
  volume24h: number;
  liquidity: number;
  active: boolean;
  endDate: string | null;
  url: string | null;
  eventTitle: string | null;
  tags: string[];
}

function cleanQuestion(q: string): string {
  return q.replace(/\s+—\s+[^—]+$/, '').trim();
}

function formatVolume(volume: number): string {
  if (volume >= 1_000_000) return `$${(volume / 1_000_000).toFixed(1)}M`;
  if (volume >= 1_000) return `$${(volume / 1_000).toFixed(0)}K`;
  return `$${Math.round(volume)}`;
}

export function MarketCard({
  id,
  platform,
  question,
  category,
  volume24h,
  liquidity,
  active,
  endDate,
  url,
  eventTitle,
  tags
}: MarketCardProps) {
  return (
    <Card
      className={cn(
        'group border-white/10 bg-white/5 transition-all hover:border-white/20 hover:bg-white/[0.07] hover:shadow-md',
        'cursor-pointer'
      )}
    >
      <Link href={`/market/${id}`} className="block">
        <CardContent className="p-5">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <PlatformBadge platform={platform} />
              {category && (
                <Badge variant="outline" className="border-white/20 text-muted-foreground text-xs">
                  {category}
                </Badge>
              )}
              {active && (
                <span
                  className="h-2 w-2 shrink-0 rounded-full bg-[#00ff88]"
                  title="Active"
                  aria-hidden
                />
              )}
            </div>
            <h3 className="line-clamp-2 font-medium leading-tight">
              {cleanQuestion(question)}
            </h3>
            {eventTitle && (
              <p className="line-clamp-1 text-xs text-muted-foreground">{eventTitle}</p>
            )}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 text-xs text-muted-foreground">
              <span>Vol: {formatVolume(volume24h)}</span>
              <span>Liquidity: {formatVolume(liquidity)}</span>
              {endDate && (
                <span>Ends: {new Date(endDate).toLocaleDateString()}</span>
              )}
            </div>
          </div>
        </CardContent>
      </Link>
      <div className="flex gap-2 border-t border-white/10 px-5 pb-5 pt-0">
        <Button
          variant="ghost"
          size="sm"
          className="text-[#00ff88] hover:bg-[#00ff88]/10 hover:text-[#00ff88]"
          asChild
        >
          <Link href={`/market/${id}#comparison`} onClick={(e) => e.stopPropagation()}>
            Compare
          </Link>
        </Button>
        {url && (
          <Button variant="ghost" size="sm" asChild>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="gap-1"
            >
              Open
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        )}
      </div>
    </Card>
  );
}
