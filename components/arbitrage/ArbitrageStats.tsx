import { RefreshButton } from '@/components/markets/RefreshButton';

export interface ArbitrageStatsProps {
  count: number;
  avgRoi: number;
  bestRoi: number;
  scannedPairs: number;
  generatedAt: string;
}

function formatScanned(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

function timeAgo(iso: string): string {
  const sec = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (sec < 60) return 'just now';
  if (sec < 120) return '1 minute ago';
  if (sec < 3600) return `${Math.floor(sec / 60)} minutes ago`;
  if (sec < 7200) return '1 hour ago';
  return `${Math.floor(sec / 3600)} hours ago`;
}

export function ArbitrageStats({
  count,
  avgRoi,
  bestRoi,
  scannedPairs,
  generatedAt
}: ArbitrageStatsProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            ⚡ Live Arbitrage Scanner
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Scanning markets across Polymarket & Kalshi
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 rounded-lg border border-white/10 bg-white/5 p-4">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-[#00ff88]">{count}</span>
          <span className="text-sm text-muted-foreground">Active</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">{avgRoi.toFixed(1)}%</span>
          <span className="text-sm text-muted-foreground">Avg ROI</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-[#00ff88]">{bestRoi.toFixed(1)}%</span>
          <span className="text-sm text-muted-foreground">Best</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">{formatScanned(scannedPairs)}</span>
          <span className="text-sm text-muted-foreground">pairs scanned</span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Last updated: {timeAgo(generatedAt)}
      </p>
    </div>
  );
}
