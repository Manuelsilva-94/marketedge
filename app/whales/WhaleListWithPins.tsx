'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useToast } from '@/components/providers/ToastProvider';

interface Trade {
  id: string;
  market: string;
  outcome: string;
  side: string;
  price: number;
  size: number;
  timestamp: string;
  transactionHash: string;
}

interface Whale {
  proxyWallet: string;
  displayName: string;
  pnl: number;
  volume: number;
  rank: number;
  winRate?: number | null;
  topMarket?: string | null;
  recentActivity?: string;
  profileImage?: string;
}

interface WhaleListWithPinsProps {
  whales: Whale[];
  preloadedTrades?: Record<string, Trade[]>;
}

function formatVolume(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${Math.round(n)}`;
}

function timeAgo(iso: string): string {
  const sec = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (sec < 60) return 'just now';
  if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
  if (sec < 86400) return `${Math.floor(sec / 3600)}h ago`;
  return `${Math.floor(sec / 86400)}d ago`;
}

function TradesMini({ trades }: { trades: Trade[] }) {
  if (trades.length === 0) {
    return <p className="mt-2 text-xs text-muted-foreground">No recent trades.</p>;
  }
  return (
    <div className="mt-2 space-y-1">
      {trades.slice(0, 3).map((t, idx) => (
        <div key={`${t.transactionHash}-${idx}`} className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className={`shrink-0 font-semibold ${t.outcome === 'YES' ? 'text-green-400' : 'text-red-400'}`}>
            {t.side} {t.outcome}
          </span>
          <span className="min-w-0 flex-1 truncate">{t.market}</span>
          <span className="shrink-0 font-mono">{(t.price * 100).toFixed(0)}¢</span>
          <span className="shrink-0 font-mono text-foreground">{formatVolume(t.price * t.size)}</span>
          <span className="shrink-0">{timeAgo(t.timestamp)}</span>
        </div>
      ))}
    </div>
  );
}

export function WhaleListWithPins({ whales, preloadedTrades = {} }: WhaleListWithPinsProps) {
  const { data: session } = useSession();
  const { showToast } = useToast();
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set());
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    // Top 3 empiezan expandidos
    new Set(whales.slice(0, 3).map((w) => w.proxyWallet))
  );
  const [loadedTrades, setLoadedTrades] = useState<Record<string, Trade[]>>(preloadedTrades);
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!session) return;
    fetch('/api/pins?type=WHALE')
      .then(r => r.json())
      .then(d => {
        if (d.pins) {
          setPinnedIds(new Set(d.pins.map((p: { targetId: string }) => p.targetId)));
        }
      });
  }, [session]);

  const togglePin = async (address: string) => {
    if (!session) {
      showToast({
        message: 'Sign in to track whales',
        type: 'info',
        link: { href: '/login', label: 'Sign in' }
      });
      return;
    }
    const isPinned = pinnedIds.has(address);
    if (isPinned) {
      await fetch('/api/pins', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'WHALE', targetId: address })
      });
      setPinnedIds(prev => { const next = new Set(prev); next.delete(address); return next; });
    } else {
      await fetch('/api/pins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'WHALE', targetId: address })
      });
      setPinnedIds(prev => new Set(prev).add(address));
    }
  };

  const toggleExpand = async (address: string) => {
    const isExpanded = expandedIds.has(address);
    if (isExpanded) {
      setExpandedIds(prev => { const next = new Set(prev); next.delete(address); return next; });
      return;
    }

    // Expandir: cargar trades si no los tenemos
    setExpandedIds(prev => new Set(prev).add(address));
    if (!loadedTrades[address] && !loadingIds.has(address)) {
      setLoadingIds(prev => new Set(prev).add(address));
      try {
        const res = await fetch(`/api/whales/${address}`);
        const data = await res.json();
        setLoadedTrades(prev => ({ ...prev, [address]: data.recentTrades ?? [] }));
      } catch {
        setLoadedTrades(prev => ({ ...prev, [address]: [] }));
      } finally {
        setLoadingIds(prev => { const next = new Set(prev); next.delete(address); return next; });
      }
    }
  };

  return (
    <div className="space-y-2">
      {whales.map((whale) => {
        const isExpanded = expandedIds.has(whale.proxyWallet);
        const isLoading = loadingIds.has(whale.proxyWallet);
        const trades = loadedTrades[whale.proxyWallet];

        return (
          <div
            key={whale.proxyWallet}
            className="rounded-xl border border-white/10 bg-white/5 transition-all hover:border-white/20"
          >
            {/* Header row */}
            <div className="flex items-center gap-4 p-4">
              <div className="w-7 shrink-0 text-center font-mono text-sm text-muted-foreground">
                #{whale.rank}
              </div>

              {whale.profileImage ? (
                <img src={whale.profileImage} alt="" className="h-9 w-9 shrink-0 rounded-full" />
              ) : (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-muted-foreground">
                  {whale.displayName.slice(0, 2).toUpperCase()}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <Link
                  href={`/whales/${whale.proxyWallet}`}
                  className="font-medium hover:text-[#00ff88] transition-colors"
                >
                  {whale.displayName}
                </Link>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span>Vol: <span className="font-semibold text-foreground">{formatVolume(whale.volume)}</span></span>
                  <span>P&L: <span className={`font-semibold ${whale.pnl >= 0 ? 'text-[#00ff88]' : 'text-red-400'}`}>
                    {whale.pnl >= 0 ? '+' : ''}{formatVolume(whale.pnl)}
                  </span></span>
                  {whale.winRate != null && (
                    <span>Win: <span className={`font-semibold ${whale.winRate >= 0.5 ? 'text-[#00ff88]' : 'text-amber-400'}`}>
                      {(whale.winRate * 100).toFixed(0)}%
                    </span></span>
                  )}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => togglePin(whale.proxyWallet)}
                  className={`text-lg transition-colors ${pinnedIds.has(whale.proxyWallet) ? 'text-yellow-400' : 'text-muted-foreground hover:text-yellow-400'}`}
                  title={pinnedIds.has(whale.proxyWallet) ? 'Untrack' : 'Track whale'}
                >
                  {pinnedIds.has(whale.proxyWallet) ? '★' : '☆'}
                </button>
                <button
                  onClick={() => toggleExpand(whale.proxyWallet)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isExpanded ? '▲' : '▼'}
                </button>
              </div>
            </div>

            {/* Trades expandibles */}
            {isExpanded && (
              <div className="border-t border-white/10 px-4 pb-4 pt-3">
                {isLoading ? (
                  <div className="space-y-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-4 animate-pulse rounded bg-white/5" />
                    ))}
                  </div>
                ) : (
                  <TradesMini trades={trades ?? []} />
                )}
                <Link
                  href={`/whales/${whale.proxyWallet}`}
                  className="mt-2 block text-xs text-[#00ff88] hover:underline"
                >
                  View full profile →
                </Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
