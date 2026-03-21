'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export interface WhaleFiltersProps {
  currentPeriod: '7d' | '30d';
  currentSort: string;
}

const PERIOD_OPTIONS = [
  { value: '7d', label: '7 Days' },
  { value: '30d', label: '30 Days' }
];

const SORT_OPTIONS = [
  { value: 'volume', label: 'Highest Volume' },
  { value: 'pnl', label: 'Best P&L' },
  { value: 'winrate', label: 'Best Win Rate' }
];

export function WhaleFilters({
  currentPeriod,
  currentSort
}: WhaleFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = (updates: { period?: string; sort?: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    if (updates.period !== undefined) params.set('period', updates.period);
    if (updates.sort !== undefined) {
      if (updates.sort === 'volume') params.delete('sort');
      else params.set('sort', updates.sort);
    }
    router.push(`/whales?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Select
        value={currentPeriod}
        onValueChange={(v) => updateParams({ period: v })}
      >
        <SelectTrigger className="w-[140px] border-white/20 bg-white/5">
          <SelectValue placeholder="Period" />
        </SelectTrigger>
        <SelectContent>
          {PERIOD_OPTIONS.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={currentSort}
        onValueChange={(v) => updateParams({ sort: v })}
      >
        <SelectTrigger className="w-[180px] border-white/20 bg-white/5">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <span className="text-sm text-muted-foreground">Top 50 whales</span>
    </div>
  );
}
