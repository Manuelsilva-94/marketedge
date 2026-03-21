'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const PLATFORM_OPTIONS = [
  { value: 'ALL', label: 'All Platforms' },
  { value: 'POLYMARKET', label: 'Polymarket' },
  { value: 'KALSHI', label: 'Kalshi' }
];

const CATEGORY_OPTIONS = [
  { value: '__all__', label: 'All Categories' },
  { value: 'Crypto', label: 'Crypto' },
  { value: 'Politics', label: 'Politics' },
  { value: 'Sports', label: 'Sports' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Science', label: 'Science' }
];

interface FilterBarProps {
  currentPlatform?: string;
  currentCategory?: string;
  totalResults: number;
}

export function FilterBar({
  currentPlatform = 'ALL',
  currentCategory = '',
  totalResults
}: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = (updates: { platform?: string; category?: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    if (updates.platform !== undefined) {
      if (updates.platform === 'ALL' || !updates.platform) params.delete('platform');
      else params.set('platform', updates.platform);
    }
    if (updates.category !== undefined) {
      if (!updates.category) params.delete('category');
      else params.set('category', updates.category);
    }
    params.delete('page');
    router.push(`/search?${params.toString()}`);
  };

  const hasActiveFilters =
    (currentPlatform && currentPlatform !== 'ALL') || (currentCategory && currentCategory.length > 0);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Select
          value={currentPlatform === 'ALL' || !currentPlatform ? 'ALL' : currentPlatform}
          onValueChange={(v) => updateParams({ platform: v })}
        >
          <SelectTrigger className="w-[180px] bg-white/5 border-white/10">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            {PLATFORM_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={currentCategory || '__all__'}
          onValueChange={(v) => updateParams({ category: v === '__all__' ? '' : v })}
        >
          <SelectTrigger className="w-[160px] bg-white/5 border-white/10">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORY_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {currentPlatform && currentPlatform !== 'ALL' && (
            <Badge
              variant="secondary"
              className="cursor-pointer gap-1 bg-white/10 hover:bg-white/20"
              onClick={() => updateParams({ platform: 'ALL' })}
            >
              {currentPlatform}
              <X className="h-3 w-3" />
            </Badge>
          )}
          {currentCategory && (
            <Badge
              variant="secondary"
              className="cursor-pointer gap-1 bg-white/10 hover:bg-white/20"
              onClick={() => updateParams({ category: '' })}
            >
              {currentCategory}
              <X className="h-3 w-3" />
            </Badge>
          )}
        </div>
      )}
      <span className="text-sm text-muted-foreground">
        {totalResults.toLocaleString()} market{totalResults !== 1 ? 's' : ''}
      </span>
    </div>
  );
}
