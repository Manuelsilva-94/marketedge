import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface TradeRowProps {
  market: string;
  outcome: 'YES' | 'NO';
  side: 'BUY' | 'SELL';
  price: number;
  size: number;
  timestamp: string;
  transactionHash: string;
}

const POLYGONSCAN_TX = 'https://polygonscan.com/tx';

function timeAgo(iso: string): string {
  const sec = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (sec < 60) return 'just now';
  if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
  if (sec < 86400) return `${Math.floor(sec / 3600)}h ago`;
  return `${Math.floor(sec / 86400)}d ago`;
}

export function TradeRow({
  market,
  outcome,
  side,
  price,
  size,
  timestamp,
  transactionHash
}: TradeRowProps) {
  const totalUsd = price * size;

  return (
    <tr className="border-b border-white/10 transition-colors hover:bg-white/5">
      <td className="max-w-[200px] py-3 pr-2 text-sm">
        <span className="line-clamp-2" title={market}>
          {market || '—'}
        </span>
      </td>
      <td className="py-3 pr-2">
        <Badge
          variant="outline"
          className={cn(
            'text-xs',
            outcome === 'YES'
              ? 'border-green-500/40 bg-green-500/20 text-green-400'
              : 'border-red-500/40 bg-red-500/20 text-red-400'
          )}
        >
          {outcome}
        </Badge>
      </td>
      <td className="py-3 pr-2">
        <Badge
          variant="outline"
          className={cn(
            'text-xs',
            side === 'BUY'
              ? 'border-blue-500/40 bg-blue-500/20 text-blue-400'
              : 'border-amber-500/40 bg-amber-500/20 text-amber-400'
          )}
        >
          {side}
        </Badge>
      </td>
      <td className="py-3 font-mono text-sm">{(price * 100).toFixed(0)}¢</td>
      <td className="py-3 font-mono text-sm">
        ${totalUsd.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
      </td>
      <td className="py-3 text-sm text-muted-foreground">{timeAgo(timestamp)}</td>
      <td className="py-3">
        {transactionHash ? (
          <a
            href={`${POLYGONSCAN_TX}/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-[#00ff88]"
            aria-label="View on Polygonscan"
          >
            ↗
          </a>
        ) : (
          '—'
        )}
      </td>
    </tr>
  );
}
