import WebSocket from 'ws';

const WS_URL = 'wss://ws-subscriptions-clob.polymarket.com/ws/market';
const CHUNK = 50;
const PING_MS = 10_000;

export type PolyPriceHandler = (args: {
  assetId: string;
  bestAsk: number;
  marketConditionId: string;
}) => void;

export class PolymarketWsClient {
  private ws: WebSocket | null = null;
  private pingTimer: ReturnType<typeof setInterval> | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private attempt = 0;
  private stopped = false;
  private assetIds: string[] = [];

  constructor(
    private onPrice: PolyPriceHandler,
    private getAssetIds: () => string[]
  ) {}

  start(): void {
    this.stopped = false;
    this.assetIds = this.getAssetIds();
    this.connect();
  }

  updateSubscriptions(): void {
    this.assetIds = this.getAssetIds();
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.sendSubscribes(this.assetIds);
    } else {
      this.softReconnect();
    }
  }

  stop(): void {
    this.stopped = true;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.clearPing();
    if (this.ws) {
      this.ws.removeAllListeners();
      this.ws.close();
      this.ws = null;
    }
  }

  private softReconnect(): void {
    if (this.stopped) return;
    if (this.ws) {
      this.ws.removeAllListeners();
      this.ws.close();
      this.ws = null;
    }
    this.clearPing();
    const delay = Math.min(60_000, 1000 * Math.pow(2, this.attempt));
    this.attempt++;
    this.reconnectTimer = setTimeout(() => this.connect(), delay);
  }

  private connect(): void {
    if (this.stopped) return;
    this.assetIds = this.getAssetIds();
    if (this.assetIds.length === 0) {
      console.warn('[polymarket-ws] No asset ids — retry in 30s');
      this.reconnectTimer = setTimeout(() => this.connect(), 30_000);
      return;
    }

    this.ws = new WebSocket(WS_URL);

    this.ws.on('open', () => {
      console.log('[polymarket-ws] connected');
      this.attempt = 0;
      this.sendSubscribes(this.assetIds);
      this.clearPing();
      this.pingTimer = setInterval(() => {
        if (this.ws?.readyState === WebSocket.OPEN) {
          this.ws.send('PING');
        }
      }, PING_MS);
    });

    this.ws.on('message', (data: WebSocket.RawData) => {
      const raw = data.toString();
      if (raw === 'PONG') return;
      let msg: Record<string, unknown>;
      try {
        msg = JSON.parse(raw) as Record<string, unknown>;
      } catch {
        return;
      }

      const eventType = (msg.event_type ?? msg.type) as string | undefined;
      if (eventType !== 'best_bid_ask') return;

      const assetId = msg.asset_id != null ? String(msg.asset_id) : '';
      const bestAskRaw = msg.best_ask;
      const market = msg.market != null ? String(msg.market) : '';
      if (!assetId || bestAskRaw == null) return;

      const bestAsk = parseFloat(String(bestAskRaw));
      if (!Number.isFinite(bestAsk)) return;

      this.onPrice({ assetId, bestAsk, marketConditionId: market });
    });

    this.ws.on('close', () => {
      console.warn('[polymarket-ws] closed — reconnecting');
      this.clearPing();
      this.softReconnect();
    });

    this.ws.on('error', (err) => {
      console.error('[polymarket-ws] error', err);
    });
  }

  private sendSubscribes(ids: string[]): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    for (let i = 0; i < ids.length; i += CHUNK) {
      const chunk = ids.slice(i, i + CHUNK);
      this.ws.send(
        JSON.stringify({
          assets_ids: chunk,
          type: 'market',
          custom_feature_enabled: true
        })
      );
    }
  }

  private clearPing(): void {
    if (this.pingTimer) {
      clearInterval(this.pingTimer);
      this.pingTimer = null;
    }
  }
}
