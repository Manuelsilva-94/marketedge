import { prisma } from '@/lib/prisma';

const GAMMA = 'https://gamma-api.polymarket.com';

export type MatchPair = {
  matchId: string;
  polyMarketId: string;
  polyExternalId: string;
  kalshiExternalId: string;
};

export type LoadedSubscriptions = {
  pairs: MatchPair[];
  /** YES outcome CLOB token id */
  yesTokenByMatch: Map<string, string>;
  /** NO outcome CLOB token id */
  noTokenByMatch: Map<string, string>;
  /** token id -> matchId */
  tokenToMatchId: Map<string, string>;
  /** token id -> which outcome this token represents */
  tokenSide: Map<string, 'yes' | 'no'>;
  kalshiTickerToMatchId: Map<string, string>;
};

function parseClobTokenIds(raw: unknown): string[] | null {
  if (raw == null) return null;
  try {
    const arr =
      typeof raw === 'string'
        ? (JSON.parse(raw) as unknown)
        : raw;
    if (!Array.isArray(arr) || arr.length < 2) return null;
    const a = String(arr[0]).trim();
    const b = String(arr[1]).trim();
    if (!a || !b) return null;
    return [a, b];
  } catch {
    return null;
  }
}

async function fetchGammaClobTokenIds(conditionId: string): Promise<string[] | null> {
  const res = await fetch(`${GAMMA}/markets/${encodeURIComponent(conditionId)}`, {
    headers: { Accept: 'application/json' }
  });
  if (!res.ok) return null;
  const data = (await res.json()) as Record<string, unknown>;
  const ids =
    parseClobTokenIds(data.clobTokenIds) ??
    parseClobTokenIds(data.clob_token_ids);
  return ids;
}

/**
 * Loads verified POLY+KALSHI pairs, ensures `polyTokenIds` on Polymarket rows via Gamma,
 * returns subscription maps for WebSocket clients.
 */
export async function loadVerifiedPairsWithTokens(): Promise<LoadedSubscriptions> {
  const verifiedPairs = await prisma.marketMatch.findMany({
    where: {
      isEquivalent: true,
      confidence: { gte: 0.82 },
      marketA: { active: true },
      marketB: { active: true }
    },
    include: {
      marketA: {
        select: {
          id: true,
          platform: true,
          externalId: true,
          volume24h: true,
          polyTokenIds: true
        }
      },
      marketB: {
        select: {
          id: true,
          platform: true,
          externalId: true,
          volume24h: true,
          polyTokenIds: true
        }
      }
    }
  });

  const pairs: MatchPair[] = [];
  const yesTokenByMatch = new Map<string, string>();
  const noTokenByMatch = new Map<string, string>();
  const tokenToMatchId = new Map<string, string>();
  const tokenSide = new Map<string, 'yes' | 'no'>();
  const kalshiTickerToMatchId = new Map<string, string>();

  for (const row of verifiedPairs) {
    const poly =
      row.marketA.platform === 'POLYMARKET' ? row.marketA : row.marketB;
    const kalshi =
      row.marketA.platform === 'KALSHI' ? row.marketA : row.marketB;
    if (poly.platform !== 'POLYMARKET' || kalshi.platform !== 'KALSHI') continue;

    const vol = (poly.volume24h ?? 0) + (kalshi.volume24h ?? 0);
    if (vol <= 100) continue;

    let tokenIds = parseClobTokenIds(poly.polyTokenIds);
    if (!tokenIds) {
      tokenIds = await fetchGammaClobTokenIds(poly.externalId);
      if (tokenIds) {
        await prisma.market.update({
          where: { id: poly.id },
          data: { polyTokenIds: JSON.stringify(tokenIds) }
        });
      }
    }

    if (!tokenIds) {
      console.warn(
        `[market-loader] No clobTokenIds for poly market ${poly.externalId}, skipping pair ${row.id}`
      );
      continue;
    }

    const [yesTok, noTok] = tokenIds;
    pairs.push({
      matchId: row.id,
      polyMarketId: poly.id,
      polyExternalId: poly.externalId,
      kalshiExternalId: kalshi.externalId
    });

    yesTokenByMatch.set(row.id, yesTok);
    noTokenByMatch.set(row.id, noTok);
    tokenToMatchId.set(yesTok, row.id);
    tokenToMatchId.set(noTok, row.id);
    tokenSide.set(yesTok, 'yes');
    tokenSide.set(noTok, 'no');
    kalshiTickerToMatchId.set(kalshi.externalId, row.id);
  }

  console.log(
    `[market-loader] ${pairs.length} pairs, ${tokenToMatchId.size} polymarket tokens, ${kalshiTickerToMatchId.size} kalshi tickers`
  );

  return {
    pairs,
    yesTokenByMatch,
    noTokenByMatch,
    tokenToMatchId,
    tokenSide,
    kalshiTickerToMatchId
  };
}
