import { loadVerifiedPairsWithTokens, type LoadedSubscriptions } from './market-loader';
import { PriceManager } from './price-manager';
import { PolymarketWsClient } from './polymarket-ws';
import { KalshiWsClient } from './kalshi-ws';

/** Refresh verified pair list from DB every 30 min (reduces Supabase egress vs 10 min). */
const PAIR_REFRESH_MS = 30 * 60 * 1000;

let subs: LoadedSubscriptions | null = null;
let priceManager: PriceManager | null = null;
let polyClient: PolymarketWsClient | null = null;
let kalshiClient: KalshiWsClient | null = null;

function getAssetIds(): string[] {
  if (!subs) return [];
  return [...subs.yesTokenByMatch.values(), ...subs.noTokenByMatch.values()];
}

function getKalshiTickers(): string[] {
  return subs?.pairs.map((p) => p.kalshiExternalId) ?? [];
}

function onPolyTick(args: { assetId: string; bestAsk: number }): void {
  const s = subs;
  const pm = priceManager;
  if (!s || !pm) return;
  const matchId = s.tokenToMatchId.get(args.assetId);
  if (!matchId) return;
  const side = s.tokenSide.get(args.assetId);
  if (!side) return;
  if (side === 'yes') {
    const yes = args.bestAsk;
    const no = 1 - yes;
    pm.updatePolymarket(matchId, { yes, no });
  } else {
    const no = args.bestAsk;
    const yes = 1 - no;
    pm.updatePolymarket(matchId, { yes, no });
  }
}

function onKalshiTick(args: { marketTicker: string; yesAsk: number }): void {
  const s = subs;
  const pm = priceManager;
  if (!s || !pm) return;
  const matchId = s.kalshiTickerToMatchId.get(args.marketTicker);
  if (!matchId) return;
  const yes = args.yesAsk;
  const no = 1 - yes;
  pm.updateKalshi(matchId, { yes, no });
}

async function bootstrap(): Promise<void> {
  const loaded = await loadVerifiedPairsWithTokens();
  subs = loaded;

  const pm = new PriceManager(loaded.pairs);
  await pm.hydrateFromDb();
  pm.startFlushLoop();
  priceManager = pm;

  polyClient = new PolymarketWsClient(
    (ev) => onPolyTick({ assetId: ev.assetId, bestAsk: ev.bestAsk }),
    getAssetIds
  );
  kalshiClient = new KalshiWsClient(onKalshiTick, getKalshiTickers);

  polyClient.start();
  kalshiClient.start();

  console.log('[worker] Started Polymarket + Kalshi WebSocket clients');
}

async function refreshPairs(): Promise<void> {
  if (!priceManager || !polyClient || !kalshiClient) return;
  try {
    const loaded = await loadVerifiedPairsWithTokens();
    subs = loaded;
    priceManager.setPairs(loaded.pairs);
    await priceManager.hydrateFromDb();
    polyClient.updateSubscriptions();
    kalshiClient.updateSubscriptions();
    console.log('[worker] Refreshed pair list');
  } catch (e) {
    console.error('[worker] refreshPairs failed', e);
  }
}

async function shutdown(): Promise<void> {
  polyClient?.stop();
  kalshiClient?.stop();
  await priceManager?.shutdown();
  process.exit(0);
}

void bootstrap().catch((e) => {
  console.error('[worker] Fatal', e);
  process.exit(1);
});

setInterval(() => {
  void refreshPairs();
}, PAIR_REFRESH_MS);

process.on('SIGINT', () => void shutdown());
process.on('SIGTERM', () => void shutdown());
