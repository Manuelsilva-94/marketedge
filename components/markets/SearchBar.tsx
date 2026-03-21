'use client';

import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  size?: 'sm' | 'lg';
  placeholder?: string;
}

export function SearchBar({ size = 'sm', placeholder = 'Search markets...' }: SearchBarProps) {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('q') as string;
    if (query?.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        name="q"
        type="search"
        placeholder={placeholder}
        className={cn(
          'pl-10 pr-4 bg-white/5 border-white/10 placeholder:text-muted-foreground focus-visible:ring-[#00ff88]/30',
          size === 'lg' ? 'h-14 text-lg pl-12' : 'h-10'
        )}
      />
      {size === 'lg' && (
        <Button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#00ff88] text-[#0a0a0f] hover:bg-[#00ff88]/90"
        >
          Search
        </Button>
      )}
    </form>
  );
}
