'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export interface ArbitrageFiltersProps {
  currentMinRoi: number;
  currentCategory: string | undefined;
  currentSort: string;
  totalResults: number;
}

const MIN_ROI_OPTIONS = [
  { value: '0.005', label: '0.5%' },
  { value: '0.01', label: '1%' },
  { value: '0.02', label: '2%' },
  { value: '0.05', label: '5%' },
  { value: '0.10', label: '10%+' }
];

const CATEGORY_OPTIONS = [
  { value: 'ALL', label: 'All Categories' },
  { value: 'crypto', label: 'Crypto' },
  { value: 'politics', label: 'Politics' },
  { value: 'sports', label: 'Sports' },
  { value: 'finance', label: 'Finance' },
  { value: 'science', label: 'Science' }
];

const SORT_OPTIONS = [
  { value: 'roi', label: 'Best ROI' },
  { value: 'volume', label: 'Highest Volume' },
  { value: 'newest', label: 'Most Recent' }
];

function minRoiToValue(n: number): string {
  if (n <= 0.5) return '0.005';
  if (n <= 1) return '0.01';
  if (n <= 2) return '0.02';
  if (n <= 5) return '0.05';
  return '0.10';
}

export function ArbitrageFilters({
  currentMinRoi,
  currentCategory,
  currentSort,
  totalResults
}: ArbitrageFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = (updates: {
    minRoi?: string;
    category?: string;
    sort?: string;
  }) => {
    const params = new URLSearchParams(searchParams.toString());
    if (updates.minRoi !== undefined) {
      if (updates.minRoi === '0.01') params.delete('minRoi');
      else params.set('minRoi', updates.minRoi);
    }
    if (updates.category !== undefined) {
      const category = updates.category === 'ALL' ? undefined : updates.category;
      if (!category) params.delete('category');
      else params.set('category', category);
    }
    if (updates.sort !== undefined) {
      if (updates.sort === 'roi') params.delete('sort');
      else params.set('sort', updates.sort);
    }
    router.push(`/arbitrage?${params.toString()}`);
  };

  const minRoiValue = minRoiToValue(currentMinRoi);
  const categoryValue = currentCategory || 'ALL';
  const sortValue = currentSort || 'roi';

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Select
        value={minRoiValue}
        onValueChange={(v) => updateParams({ minRoi: v })}
      >
        <SelectTrigger className="w-[120px] border-white/20 bg-white/5">
          <SelectValue placeholder="Min ROI" />
        </SelectTrigger>
        <SelectContent>
          {MIN_ROI_OPTIONS.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={categoryValue}
        onValueChange={(v) => updateParams({ category: v })}
      >
        <SelectTrigger className="w-[130px] border-white/20 bg-white/5">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {CATEGORY_OPTIONS.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={sortValue}
        onValueChange={(v) => updateParams({ sort: v })}
      >
        <SelectTrigger className="w-[160px] border-white/20 bg-white/5">
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

      <span className="text-sm text-muted-foreground">
        {totalResults} {totalResults === 1 ? 'opportunity' : 'opportunities'}
      </span>
    </div>
  );
}
