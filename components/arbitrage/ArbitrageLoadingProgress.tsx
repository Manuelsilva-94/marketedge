'use client';

import { useEffect, useState } from 'react';

const PROGRESS_MESSAGES = [
  'Scanning Polymarket markets...',
  'Matching with Kalshi candidates...',
  'Validating semantic matches...',
  'Fetching live prices...',
  'Finding arbitrage opportunities...'
];

const INTERVAL_MS = 2500;

export function ArbitrageLoadingProgress() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % PROGRESS_MESSAGES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mb-8 flex flex-col items-center justify-center gap-4 rounded-lg border border-white/10 bg-white/5 px-6 py-10">
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#00ff88]/30 border-t-[#00ff88]" />
        <p className="text-lg font-medium text-foreground">
          {PROGRESS_MESSAGES[index]}
        </p>
      </div>
      <p className="text-sm text-muted-foreground">
        This usually takes 20–60 seconds
      </p>
    </div>
  );
}
