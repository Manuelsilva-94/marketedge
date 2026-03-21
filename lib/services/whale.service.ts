const DATA_API = 'https://data-api.polymarket.com';

export interface PolymarketTrade {
  id: string;
  market: string;
  marketSlug: string;
  outcome: string;
  price: number;
  size: number;
  side: 'BUY' | 'SELL';
  timestamp: string;
  transactionHash: string;
  proxyWallet: string;
}

export interface Position {
  market: string;
  marketSlug: string;
  outcome: 'YES' | 'NO';
  size: number;
  avgPrice: number;
  currentPrice: number | null;
  unrealizedPnl: number | null;
}

export interface WhaleProfile {
  address: string;
  displayName: string;
  pnl7d: number | null;
  pnl30d: number | null;
  volume7d: number;
  volume30d: number;
  winRate: number | null;
  marketsTraded: number;
  biggestWin: number | null;
  recentTrades: PolymarketTrade[];
  topPositions: Position[];
}

/** Leaderboard row: WhaleProfile plus topMarket and recentActivity */
export interface LeaderboardWhale extends WhaleProfile {
  topMarket: string | null;
  recentActivity: string;
  rank?: number;
  profileImage?: string | null;
}

/** Raw trade from Data API (field names may vary) */
interface RawTrade {
  id?: string;
  transactionHash?: string;
  proxyWallet?: string;
  user?: string;
  owner?: string;
  side?: string;
  asset?: string;
  conditionId?: string;
  size?: number;
  price?: number;
  timestamp?: number | string;
  title?: string;
  slug?: string;
  outcome?: string;
  outcomeIndex?: number;
  eventSlug?: string;
  [key: string]: unknown;
}

/** Raw activity event (if API returns activity feed) */
interface RawActivity {
  id?: string;
  type?: string;
  user?: string;
  proxyWallet?: string;
  timestamp?: number | string;
  size?: number;
  price?: number;
  side?: string;
  outcome?: string;
  market?: string;
  slug?: string;
  transactionHash?: string;
  [key: string]: unknown;
}

function truncateAddress(address: string): string {
  if (!address || address.length < 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function parseTrade(raw: RawTrade): PolymarketTrade | null {
  const wallet = raw.proxyWallet ?? raw.user ?? raw.owner;
  if (!wallet || typeof wallet !== 'string') return null;
  const size = typeof raw.size === 'number' ? raw.size : parseFloat(String(raw.size ?? 0)) || 0;
  const price = typeof raw.price === 'number' ? raw.price : parseFloat(String(raw.price ?? 0)) || 0;
  const ts = raw.timestamp;
  const timestamp =
    typeof ts === 'number'
      ? new Date(ts * 1000).toISOString()
      : typeof ts === 'string'
        ? ts
        : new Date().toISOString();
  return {
    id: String(raw.id ?? raw.transactionHash ?? `${wallet}-${timestamp}`),
    market: String(raw.title ?? raw.market ?? ''),
    marketSlug: String(raw.slug ?? raw.eventSlug ?? ''),
    outcome: raw.outcome === 'Yes' || raw.outcomeIndex === 0 ? 'YES' : 'NO',
    price,
    size,
    side: (raw.side === 'SELL' ? 'SELL' : 'BUY') as 'BUY' | 'SELL',
    timestamp,
    transactionHash: String(raw.transactionHash ?? ''),
    proxyWallet: wallet
  };
}

export class WhaleService {
  /**
   * Fetch recent trades from Data API (no user filter = recent global trades if supported)
   */
  private async fetchRecentTrades(limit: number): Promise<PolymarketTrade[]> {
    const res = await fetch(
      `${DATA_API}/trades?limit=${Math.min(limit, 1000)}&takerOnly=false`,
      { headers: { Accept: 'application/json' }, next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    const list = Array.isArray(data) ? data : data?.data ?? data?.trades ?? [];
    const out: PolymarketTrade[] = [];
    for (const item of list) {
      const t = parseTrade(item as RawTrade);
      if (t && t.proxyWallet) out.push(t);
    }
    return out;
  }

  /**
   * Fetch activity for a single user
   */
  private async fetchUserActivity(address: string, limit: number): Promise<RawActivity[]> {
    const res = await fetch(
      `${DATA_API}/activity?user=${encodeURIComponent(address)}&limit=${limit}&type=TRADE`,
      { headers: { Accept: 'application/json' }, next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : data?.data ?? data?.activity ?? [];
  }

  /**
   * Fetch trades for a single user
   */
  async getTraderTrades(address: string, limit = 20): Promise<PolymarketTrade[]> {
    const res = await fetch(
      `${DATA_API}/trades?user=${encodeURIComponent(address)}&limit=${limit}&takerOnly=false`,
      { headers: { Accept: 'application/json' }, next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    const list = Array.isArray(data) ? data : data?.data ?? data?.trades ?? [];
    const out: PolymarketTrade[] = [];
    for (const item of list) {
      const t = parseTrade(item as RawTrade);
      if (t) out.push(t);
    }
    return out.slice(0, limit);
  }

  /**
   * Fetch positions for a user
   */
  async getTraderPositions(address: string): Promise<Position[]> {
    const res = await fetch(
      `${DATA_API}/positions?user=${encodeURIComponent(address)}`,
      { headers: { Accept: 'application/json' }, next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    const list = Array.isArray(data) ? data : data?.data ?? data?.positions ?? [];
    return list.slice(0, 20).map((p: Record<string, unknown>) => ({
      market: String(p.title ?? p.market ?? ''),
      marketSlug: String(p.slug ?? p.eventSlug ?? ''),
      outcome: (p.outcome === 'Yes' || p.outcomeIndex === 0 ? 'YES' : 'NO') as 'YES' | 'NO',
      size: typeof p.size === 'number' ? p.size : parseFloat(String(p.size ?? 0)) || 0,
      avgPrice: typeof p.avgPrice === 'number' ? p.avgPrice : parseFloat(String(p.price ?? p.avgPrice ?? 0)) || 0,
      currentPrice: typeof p.currentPrice === 'number' ? p.currentPrice : null,
      unrealizedPnl: typeof p.unrealizedPnl === 'number' ? p.unrealizedPnl : null
    }));
  }

  /**
   * Fetch profile for a single address (profile endpoint if available)
   */
  private async fetchProfile(address: string): Promise<Record<string, unknown> | null> {
    const res = await fetch(
      `${DATA_API}/profile/${encodeURIComponent(address)}`,
      { headers: { Accept: 'application/json' }, next: { revalidate: 300 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data && typeof data === 'object' ? data : null;
  }

  /**
   * Top traders from Data API leaderboard
   */
  async getTopTraders(period: '7d' | '30d', limit = 50): Promise<LeaderboardWhale[]> {
    const timePeriod = period === '7d' ? 'WEEK' : 'MONTH';

    try {
      const res = await fetch(
        `${DATA_API}/v1/leaderboard?timePeriod=${timePeriod}&orderBy=PNL&limit=${limit}`,
        {
          headers: { Accept: 'application/json' },
          cache: 'no-store'
        }
      );

      if (!res.ok) {
        console.error(`[WhaleService] Leaderboard fetch failed: ${res.status}`);
        return [];
      }

      const data = await res.json();
      const list = Array.isArray(data)
        ? data
        : data?.data ?? data?.leaderboard ?? data?.results ?? [];

      if (list.length === 0) {
        console.warn('[WhaleService] Leaderboard returned empty array');
        return [];
      }

      console.log(
        `[WhaleService] Leaderboard: ${list.length} entries, sample keys: ${Object.keys(list[0] ?? {}).join(', ')}`
      );

      return list.slice(0, limit).map((entry: Record<string, unknown>, index: number) => {
        // proxyWallet puede venir con sufijo numérico: "0xABC...123-1772479215461"
        // Limpiar: quedarse solo con la parte hex antes del guión si hay sufijo numérico
        const rawWallet = String(entry.proxyWallet ?? entry.address ?? '');
        const address = rawWallet.includes('-')
          ? rawWallet.split('-')[0]
          : rawWallet;

        const userName = entry.userName;
        const xUsername = entry.xUsername;

        // Ignorar userName/xUsername que sean addresses Ethereum (empiezan con 0x)
        // o que sean numéricos puros — en esos casos usar truncateAddress
        function isValidName(n: unknown): boolean {
          if (n == null || n === '' || n === 'null') return false;
          const s = String(n).trim();
          if (s.length <= 2) return false;
          if (s.startsWith('0x')) return false; // address disfrazada de nombre
          if (/^\d+$/.test(s)) return false;    // puramente numérico
          return true;
        }

        const rawName = isValidName(userName)
          ? String(userName).trim()
          : isValidName(xUsername)
            ? String(xUsername).trim()
            : null;
        const displayName = rawName ?? truncateAddress(address);

        const pnl = typeof entry.pnl === 'number' ? entry.pnl : null;
        const volume =
          typeof entry.vol === 'number'
            ? entry.vol
            : typeof entry.volume === 'number'
              ? entry.volume
              : 0;

        return {
          address,
          displayName,
          pnl7d: period === '7d' ? pnl : null,
          pnl30d: period === '30d' ? pnl : null,
          volume7d: period === '7d' ? volume : 0,
          volume30d: period === '30d' ? volume : volume,
          winRate: typeof entry.winRate === 'number' ? entry.winRate : null,
          marketsTraded:
            typeof entry.marketsTraded === 'number' && entry.marketsTraded > 0
              ? entry.marketsTraded
              : typeof entry.numTrades === 'number' && entry.numTrades > 0
                ? entry.numTrades
                : 0,
          biggestWin: null,
          recentTrades: [],
          topPositions: [],
          topMarket: typeof entry.topMarket === 'string' ? entry.topMarket : null,
          recentActivity: `#${index + 1} by PnL`,
          rank: typeof entry.rank === 'number' ? entry.rank : index + 1,
          profileImage: typeof entry.profileImage === 'string' ? entry.profileImage : null
        };
      });
    } catch (err) {
      console.error('[WhaleService] getTopTraders error:', err);
      return [];
    }
  }

  /**
   * Full profile for one address
   */
  async getTraderProfile(address: string): Promise<WhaleProfile> {
    const [trades, positions, profile] = await Promise.all([
      this.getTraderTrades(address, 20),
      this.getTraderPositions(address),
      this.fetchProfile(address)
    ]);

    const volume7d = trades
      .filter((t) => Date.now() - new Date(t.timestamp).getTime() < 7 * 86400 * 1000)
      .reduce((s, t) => s + t.price * t.size, 0);
    const volume30d = trades.reduce((s, t) => s + t.price * t.size, 0);
    const marketsSet = new Set(trades.map((t) => t.market || t.marketSlug));

    const pnl7d = (profile?.pnl7d ?? profile?.pnl ?? null) as number | null;
    const pnl30d = (profile?.pnl30d ?? null) as number | null;
    const winRate = (profile?.winRate ?? null) as number | null;

    return {
      address,
      displayName: truncateAddress(address),
      pnl7d: pnl7d ?? null,
      pnl30d: pnl30d ?? null,
      volume7d,
      volume30d,
      winRate: winRate ?? null,
      marketsTraded: marketsSet.size,
      biggestWin: (profile?.biggestWin as number) ?? null,
      recentTrades: trades,
      topPositions: positions
    };
  }
}
