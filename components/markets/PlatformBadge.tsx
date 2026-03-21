import { cn } from '@/lib/utils';

type PlatformType = 'POLYMARKET' | 'KALSHI';

interface PlatformBadgeProps {
  platform: PlatformType;
  className?: string;
}

export function PlatformBadge({ platform, className }: PlatformBadgeProps) {
  const isPoly = platform === 'POLYMARKET';
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        isPoly
          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
        className
      )}
    >
      {isPoly ? 'P' : 'K'}
    </span>
  );
}
