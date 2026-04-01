'use client';

import { useState, useEffect, useMemo } from 'react';
import { ArbitrageStats } from '@/components/arbitrage/ArbitrageStats';
import { ArbitrageListWithPins } from '@/app/arbitrage/ArbitrageListWithPins';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const MIN_ROI_OPTIONS = [
  { value: '0.005', label: '≥ 0.5%' },
  { value: '0.01', label: '≥ 1%' },
  { value: '0.02', label: '≥ 2%' },
  { value: '0.05', label: '≥ 5%' },
  { value: '0.10', label: '≥ 10%' }
];

const CATEGORY_OPTIONS = [
  { value: 'ALL', label: 'All Categories' },
  { value: 'Sports', label: 'Sports' },
  { value: 'Politics', label: 'Politics' },
  { value: 'Crypto', label: 'Crypto' },
  { value: 'Economics', label: 'Economics' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Elections', label: 'Elections' },
  { value: 'Soccer', label: 'Soccer' },
  { value: 'Companies', label: 'Companies' },
  { value: 'Science', label: 'Science' },
  { value: 'Health', label: 'Health' }
];

const SORT_OPTIONS = [
  { value: 'roi', label: 'Best ROI' },
  { value: 'volume', label: 'Highest Volume' },
  { value: 'newest', label: 'Most Recent' }
];

export default function ArbitragePage() {
  const [allOpportunities, setAllOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generatedAt, setGeneratedAt] = useState<string>(new Date().toISOString());
  const [scannedPairs, setScannedPairs] = useState(0);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  // Filtros locales
  const [minRoi, setMinRoi] = useState('0.01');
  const [category, setCategory] = useState('ALL');
  const [sort, setSort] = useState('roi');

  async function fetchOpportunities() {
    console.log('[Arbitrage] fetchOpportunities called', new Date().toISOString());
    setLoading(true);
    setError(null);
    try {
      // Pedimos todas las oportunidades con minRoi muy bajo para filtrar localmente
      const res = await fetch(
        `/api/arbitrage/opportunities?minRoi=0.001&limit=50&_t=${Date.now()}`,
        { cache: 'no-store' }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setAllOpportunities(data.opportunities ?? []);
      setScannedPairs(data.scannedPairs ?? 0);
      setGeneratedAt(data.generatedAt ?? new Date().toISOString());
      setLastRefreshed(new Date());
    } catch (e) {
      console.error('[Arbitrage] fetch error:', e);
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      console.log('[Arbitrage] fetch complete, setting loading false');
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOpportunities();
  }, []);

  // Filtrado y ordenado local — instantáneo
  const filtered = useMemo(() => {
    const minRoiNum = parseFloat(minRoi) * 100;
    let result = allOpportunities.filter((o) => {
      if (o.roi < minRoiNum) return false;
      if (category !== 'ALL' && o.category?.toLowerCase() !== category.toLowerCase()) return false;
      return true;
    });

    if (sort === 'volume') {
      result = [...result].sort((a, b) => b.totalVolume24h - a.totalVolume24h);
    } else if (sort === 'newest') {
      result = [...result].sort(
        (a, b) => new Date(b.detectedAt).getTime() - new Date(a.detectedAt).getTime()
      );
    } else {
      result = [...result].sort((a, b) => b.roi - a.roi);
    }

    return result;
  }, [allOpportunities, minRoi, category, sort]);

  const avgRoi = filtered.length > 0
    ? filtered.reduce((s, o) => s + o.roi, 0) / filtered.length
    : 0;
  const bestRoi = filtered.length > 0 ? Math.max(...filtered.map((o) => o.roi)) : 0;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <ArbitrageStats
        count={filtered.length}
        avgRoi={avgRoi}
        bestRoi={bestRoi}
        scannedPairs={scannedPairs}
        generatedAt={generatedAt}
      />

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <Select value={minRoi} onValueChange={setMinRoi}>
            <SelectTrigger className="w-[120px] border-white/20 bg-white/5">
              <SelectValue placeholder="Min ROI" />
            </SelectTrigger>
            <SelectContent>
              {MIN_ROI_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[160px] border-white/20 bg-white/5">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORY_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[150px] border-white/20 bg-white/5">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <span className="text-sm text-muted-foreground">
            {loading ? 'Loading...' : `${filtered.length} opportunities`}
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={fetchOpportunities}
          disabled={loading}
          className="border-white/20 text-muted-foreground hover:text-foreground"
        >
          {loading ? '⟳ Scanning...' : '⟳ Refresh'}
        </Button>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-lg bg-white/5" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-6 py-12 text-center text-red-400">
            {error}
          </div>
        ) : filtered.length > 0 ? (
          <ArbitrageListWithPins opportunities={filtered} />
        ) : (
          <EmptyState
            icon="🔍"
            title="No arbitrage opportunities found"
            description="Try lowering the minimum ROI filter or check back soon."
            action={{ label: 'Show all (≥ 0.5%)', href: '#' }}
          />
        )}
      </div>

      {!loading && (
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Last updated: {lastRefreshed.toLocaleTimeString()} ·{' '}
          <button
            onClick={fetchOpportunities}
            className="underline hover:text-foreground"
          >
            Refresh
          </button>
        </p>
      )}
    </div>
  );
}
