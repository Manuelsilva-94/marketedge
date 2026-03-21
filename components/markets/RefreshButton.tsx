'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RefreshButtonProps {
  label?: string;
  className?: string;
}

export function RefreshButton({
  label = 'Refresh Prices',
  className
}: RefreshButtonProps) {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    router.refresh();
    await new Promise((r) => setTimeout(r, 1500));
    setIsRefreshing(false);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleRefresh}
      disabled={isRefreshing}
      className={cn('border-white/20', className)}
    >
      <RefreshCw size={16} className={cn('mr-2', isRefreshing && 'animate-spin')} />
      {isRefreshing ? 'Refreshing...' : label}
    </Button>
  );
}
