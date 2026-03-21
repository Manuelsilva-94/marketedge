'use client';

import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface WhaleHeaderProps {
  address: string;
  displayName: string;
  volume7d: number;
  volume30d: number;
  pnl7d: number | null;
  winRate: number | null;
  marketsTraded: number;
}

function formatVolume(volume: number): string {
  if (volume >= 1_000_000) return `$${(volume / 1_000_000).toFixed(1)}M`;
  if (volume >= 1_000) return `$${(volume / 1_000).toFixed(0)}K`;
  return `$${Math.round(volume)}`;
}

const POLYGONSCAN = 'https://polygonscan.com';
const POLYMARKET_PROFILE = 'https://polymarket.com/profile';

export function WhaleHeader({
  address,
  displayName,
  volume7d,
  volume30d,
  pnl7d,
  winRate,
  marketsTraded
}: WhaleHeaderProps) {
  const [copied, setCopied] = useState(false);

  const copyAddress = useCallback(() => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [address]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            🐋 {displayName}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyAddress}
              className={cn(
                'border-white/20 transition-colors',
                copied && 'border-green-500/50 text-green-400'
              )}
            >
              {copied ? '✓ Copied!' : 'Copy Address'}
            </Button>
            <Button variant="outline" size="sm" asChild className="border-white/20">
              <a
                href={`${POLYGONSCAN}/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Polygonscan ↗
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a
                href={`${POLYMARKET_PROFILE}/${address}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Polymarket ↗
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 rounded-lg border border-white/10 bg-white/5 p-4 md:grid-cols-4">
        <div>
          <p className="text-xs text-muted-foreground">Volume 7d</p>
          <p className="text-lg font-semibold">{formatVolume(volume7d)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Volume 30d</p>
          <p className="text-lg font-semibold">{formatVolume(volume30d)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">P&L 7d</p>
          <p
            className={cn(
              'text-lg font-semibold',
              pnl7d != null
                ? pnl7d >= 0
                  ? 'text-[#00ff88]'
                  : 'text-red-400'
                : 'text-muted-foreground'
            )}
          >
            {pnl7d != null
              ? `${pnl7d >= 0 ? '+' : ''}${formatVolume(pnl7d)}`
              : 'N/A'}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Win Rate</p>
          <p className="text-lg font-semibold">
            {winRate != null ? `${(winRate * 100).toFixed(0)}%` : 'N/A'}
          </p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="text-xs text-muted-foreground">Open Positions</p>
          <p className="text-lg font-semibold">
            {marketsTraded > 0 ? marketsTraded : '—'}
          </p>
        </div>
      </div>
    </div>
  );
}
