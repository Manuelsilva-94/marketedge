import WebSocket from 'ws';
import { KalshiAuth } from '@/lib/services/kalshi-auth';

const WS_URL = 'wss://api.elections.kalshi.com/trade-api/ws/v2';
const WS_SIGN_PATH = '/trade-api/ws/v2';
const CHUNK = 40;

export type KalshiPriceHandler = (args: {
  marketTicker: string;
  yesAsk: number;
}) => void;

export class KalshiWsClient {
  private ws: WebSocket | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private attempt = 0;
  private stopped = false;
  private msgId = 1;
  private auth: KalshiAuth;
  private tickers: string[] = [];

  constructor(
    private onTicker: KalshiPriceHandler,
    private getTickers: () => string[]
  ) {
    this.auth = new KalshiAuth();
  }

  start(): void {
    this.stopped = false;
    this.tickers = this.getTickers();
    this.connect();
  }

  updateSubscriptions(): void {
    this.tickers = this.getTickers();
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.sendTickerSubscribe(this.tickers);
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
    const delay = Math.min(60_000, 1000 * Math.pow(2, this.attempt));
    this.attempt++;
    this.reconnectTimer = setTimeout(() => this.connect(), delay);
  }

  private connect(): void {
    if (this.stopped) return;
    this.tickers = this.getTickers();
    if (this.tickers.length === 0) {
      console.warn('[kalshi-ws] No tickers — retry in 30s');
      this.reconnectTimer = setTimeout(() => this.connect(), 30_000);
      return;
    }

    const headers = this.auth.getHeaders('GET', WS_SIGN_PATH);

    this.ws = new WebSocket(WS_URL, {
      headers: {
        'KALSHI-ACCESS-KEY': headers['KALSHI-ACCESS-KEY']!,
        'KALSHI-ACCESS-SIGNATURE': headers['KALSHI-ACCESS-SIGNATURE']!,
        'KALSHI-ACCESS-TIMESTAMP': headers['KALSHI-ACCESS-TIMESTAMP']!
      }
    });

    this.ws.on('open', () => {
      console.log('[kalshi-ws] connected');
      this.attempt = 0;
      this.sendTickerSubscribe(this.tickers);
    });

    this.ws.on('message', (data: WebSocket.RawData) => {
      let msg: Record<string, unknown>;
      try {
        msg = JSON.parse(data.toString()) as Record<string, unknown>;
      } catch {
        return;
      }

      const type = msg.type as string | undefined;
      if (type === 'error') {
        console.error('[kalshi-ws] server error', msg);
        return;
      }
      if (type !== 'ticker') return;

      const inner = msg.msg as Record<string, unknown> | undefined;
      if (!inner) return;

      const ticker =
        inner.market_ticker != null
          ? String(inner.market_ticker)
          : inner.marketTicker != null
            ? String(inner.marketTicker)
            : '';
      if (!ticker) return;

      const askRaw =
        inner.yes_ask_dollars ?? inner.yes_ask ?? inner.yesAskDollars;
      if (askRaw == null) return;
      const yesAsk = parseFloat(String(askRaw));
      if (!Number.isFinite(yesAsk)) return;

      this.onTicker({ marketTicker: ticker, yesAsk });
    });

    this.ws.on('close', () => {
      console.warn('[kalshi-ws] closed — reconnecting');
      this.softReconnect();
    });

    this.ws.on('error', (err) => {
      console.error('[kalshi-ws] error', err);
    });
  }

  private sendTickerSubscribe(tickers: string[]): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    for (let i = 0; i < tickers.length; i += CHUNK) {
      const chunk = tickers.slice(i, i + CHUNK);
      this.ws.send(
        JSON.stringify({
          id: this.msgId++,
          cmd: 'subscribe',
          params: {
            channels: ['ticker'],
            market_tickers: chunk
          }
        })
      );
    }
  }
}
