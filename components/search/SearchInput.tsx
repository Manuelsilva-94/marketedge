'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  defaultValue?: string;
  autoFocus?: boolean;
  className?: string;
}

export function SearchInput({ defaultValue = '', autoFocus, className }: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(defaultValue);

  const submit = useCallback(() => {
    const q = query.trim();
    const params = new URLSearchParams(searchParams.toString());
    if (q) {
      params.set('q', q);
      params.delete('page');
    } else {
      params.delete('q');
    }
    router.push(`/search?${params.toString()}`);
  }, [query, router, searchParams]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit();
    }
  };

  const clear = () => {
    setQuery('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');
    params.delete('page');
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className={cn('relative mb-6 flex w-full items-center gap-2', className)}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 shrink-0 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search markets..."
          autoFocus={autoFocus}
          className="pl-10 pr-10 bg-white/5 border-white/10"
        />
        {query.length > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={clear}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Button
        type="button"
        onClick={submit}
        className="shrink-0 bg-[#00ff88] text-[#0a0a0f] hover:bg-[#00ff88]/90"
      >
        Search
      </Button>
      <p className="absolute -bottom-5 left-0 text-xs text-muted-foreground">
        Press Enter to search
      </p>
    </div>
  );
}
