import { Platform } from '../types';

export const PLATFORM_CONFIG: Record<
  Platform,
  {
    label: string;
    color: string;
    bgColor: string;
    borderColor: string;
    textColor: string;
  }
> = {
  POLYMARKET: {
    label: 'Polymarket',
    color: '#3B82F6',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    textColor: 'text-blue-400'
  },
  KALSHI: {
    label: 'Kalshi',
    color: '#F59E0B',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    textColor: 'text-amber-400'
  }
};

export function getPlatformConfig(platform: Platform) {
  return PLATFORM_CONFIG[platform];
}

export function formatPrice(price: number): string {
  return `${Math.round(price * 100)}¢`;
}

export function formatPercent(price: number): string {
  return `${(price * 100).toFixed(1)}%`;
}

export function formatVolume(volume: number): string {
  if (volume >= 1_000_000) return `$${(volume / 1_000_000).toFixed(1)}M`;
  if (volume >= 1_000) return `$${(volume / 1_000).toFixed(0)}K`;
  return `$${Math.round(volume)}`;
}

export function getLiquidity(liquidity: number): 'High' | 'Medium' | 'Low' {
  if (liquidity >= 100_000) return 'High';
  if (liquidity >= 10_000) return 'Medium';
  return 'Low';
}

export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}
