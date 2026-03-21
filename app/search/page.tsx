'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { SearchInput } from '@/components/search/SearchInput';
import { Button } from '@/components/ui/button';

const LIMIT = 20;

function cleanQuestion(q: string, platform?: string): string {
  // Para Kalshi, mantener el sufijo con el candidato/outcome (ej: "— Greg Abbott")
  // Para Polymarket, también mantener — contiene info útil
  return q.trim();
}

interface Market {
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

function MarketSelectCard({
  market,
  selected,
  onSelect
}: {
  market: Market;
  selected: boolean;
  onSelect: (m: Market) => void;
}) {
  return (
    <div
      onClick={() => onSelect(market)}
      className={`cursor-pointer rounded-lg border p-4 transition-all ${
        selected
          ? 'border-green-500 bg-green-500/10'
          : 'border-white/10 bg-white/5 hover:border-white/30'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-1 h-4 w-4 shrink-0 rounded border-2 transition-colors ${
            selected ? 'border-green-500 bg-green-500' : 'border-white/30'
          }`}
        />
        <div className="min-w-0 flex-1">
          <Link
            href={`/market/${market.id}`}
            onClick={(e) => e.stopPropagation()}
            className="text-sm font-medium leading-snug line-clamp-2 hover:text-green-400 transition-colors"
          >
            {market.platform === 'KALSHI' && market.question.includes(' — ')
              ? (() => {
                  const [base, suffix] = market.question.split(' — ');
                  return (
                    <>
                      <span className="text-muted-foreground font-normal">{base} — </span>
                      <span>{suffix}</span>
                    </>
                  );
                })()
              : market.question
            }
          </Link>
          {market.eventTitle && market.eventTitle !== market.question && (
            <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
              {market.eventTitle}
            </p>
          )}
          <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
            {market.volume24h > 0 && (
              <span>Vol: ${(market.volume24h / 1000).toFixed(0)}K</span>
            )}
            {market.endDate && (
              <span>Ends: {new Date(market.endDate).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PlatformColumn({
  platform,
  markets,
  loading,
  selected,
  onSelect,
  page,
  total,
  onPageChange
}: {
  platform: 'POLYMARKET' | 'KALSHI';
  markets: Market[];
  loading: boolean;
  selected: Market | null;
  onSelect: (m: Market) => void;
  page: number;
  total: number;
  onPageChange: (p: number) => void;
}) {
  const color = platform === 'POLYMARKET' ? 'text-blue-400' : 'text-purple-400';
  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className={`font-semibold ${color}`}>
          {platform === 'POLYMARKET' ? 'Polymarket' : 'Kalshi'}
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            ({total.toLocaleString()})
          </span>
        </h2>
        {selected && (
          <span className="text-xs text-green-400">✓ Selected</span>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-lg bg-white/5" />
          ))}
        </div>
      ) : markets.length === 0 ? (
        <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-10 text-center text-sm text-muted-foreground">
          No results on {platform === 'POLYMARKET' ? 'Polymarket' : 'Kalshi'}
        </div>
      ) : (
        <div className="space-y-2">
          {markets.map((m) => (
            <MarketSelectCard
              key={m.id}
              market={m}
              selected={selected?.id === m.id}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            ←
          </Button>
          <span className="text-xs text-muted-foreground">
            {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            →
          </Button>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get('q') ?? '';

  const [polyMarkets, setPolyMarkets] = useState<Market[]>([]);
  const [kalshiMarkets, setKalshiMarkets] = useState<Market[]>([]);
  const [polyTotal, setPolyTotal] = useState(0);
  const [kalshiTotal, setKalshiTotal] = useState(0);
  const [polyPage, setPolyPage] = useState(1);
  const [kalshiPage, setKalshiPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedPoly, setSelectedPoly] = useState<Market | null>(null);
  const [selectedKalshi, setSelectedKalshi] = useState<Market | null>(null);

  useEffect(() => {
    if (q.length < 2) return;
    setLoading(true);
    setSelectedPoly(null);
    setSelectedKalshi(null);
    setPolyPage(1);
    setKalshiPage(1);

    Promise.all([
      fetch(
        `/api/markets/search?q=${encodeURIComponent(q)}&platform=POLYMARKET&limit=${LIMIT}&offset=0`
      ).then((r) => r.json()),
      fetch(
        `/api/markets/search?q=${encodeURIComponent(q)}&platform=KALSHI&limit=${LIMIT}&offset=0`
      ).then((r) => r.json())
    ])
      .then(([poly, kalshi]) => {
        setPolyMarkets(poly.markets ?? []);
        setPolyTotal(poly.total ?? 0);
        setKalshiMarkets(kalshi.markets ?? []);
        setKalshiTotal(kalshi.total ?? 0);
      })
      .finally(() => setLoading(false));
  }, [q]);

  useEffect(() => {
    if (q.length < 2 || polyPage === 1) return;
    fetch(
      `/api/markets/search?q=${encodeURIComponent(q)}&platform=POLYMARKET&limit=${LIMIT}&offset=${(polyPage - 1) * LIMIT}`
    )
      .then((r) => r.json())
      .then((data) => {
        setPolyMarkets(data.markets ?? []);
        setPolyTotal(data.total ?? 0);
      });
  }, [q, polyPage]);

  useEffect(() => {
    if (q.length < 2 || kalshiPage === 1) return;
    fetch(
      `/api/markets/search?q=${encodeURIComponent(q)}&platform=KALSHI&limit=${LIMIT}&offset=${(kalshiPage - 1) * LIMIT}`
    )
      .then((r) => r.json())
      .then((data) => {
        setKalshiMarkets(data.markets ?? []);
        setKalshiTotal(data.total ?? 0);
      });
  }, [q, kalshiPage]);

  const canCompare = selectedPoly !== null && selectedKalshi !== null;

  function handleCompare() {
    if (!canCompare) return;
    router.push(`/compare?a=${selectedPoly!.id}&b=${selectedKalshi!.id}`);
  }

  return (
    <div className="container px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <SearchInput defaultValue={q} />

        {q.length < 2 ? (
          <div className="rounded-lg border border-white/10 bg-white/5 px-6 py-16 text-center text-muted-foreground">
            Enter a search term to find and compare markets
          </div>
        ) : (
          <>
            {/* Compare bar */}
            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3">
              <div className="text-sm text-muted-foreground">
                {canCompare ? (
                  <span className="text-white">
                    Ready to compare: <span className="text-blue-400">Polymarket</span> vs{' '}
                    <span className="text-purple-400">Kalshi</span>
                  </span>
                ) : (
                  'Select one market from each column to compare'
                )}
              </div>
              <Button
                onClick={handleCompare}
                disabled={!canCompare}
                size="sm"
                className="bg-green-600 hover:bg-green-700 disabled:opacity-30"
              >
                Compare Selected →
              </Button>
            </div>

            {/* Two columns */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <PlatformColumn
                platform="POLYMARKET"
                markets={polyMarkets}
                loading={loading}
                selected={selectedPoly}
                onSelect={setSelectedPoly}
                page={polyPage}
                total={polyTotal}
                onPageChange={setPolyPage}
              />
              <PlatformColumn
                platform="KALSHI"
                markets={kalshiMarkets}
                loading={loading}
                selected={selectedKalshi}
                onSelect={setSelectedKalshi}
                page={kalshiPage}
                total={kalshiTotal}
                onPageChange={setKalshiPage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
