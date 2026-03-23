import 'dotenv/config';
import crypto from 'crypto';

// Kalshi Auth (same as fetch-kalshi.ts)
class KalshiAuth {
  private apiKey: string;
  private privateKey: crypto.KeyObject;

  constructor() {
    this.apiKey = process.env.KALSHI_API_KEY!;

    const envKey = process.env.KALSHI_PRIVATE_KEY;
    if (!envKey) {
      throw new Error('KALSHI_PRIVATE_KEY must be set');
    }
    const keyPem = envKey.replace(/\\n/g, '\n').trim();

    try {
      const isPkcs1 = keyPem.includes('BEGIN RSA PRIVATE KEY');
      this.privateKey = crypto.createPrivateKey({
        key: keyPem,
        format: 'pem',
        ...(isPkcs1 && { type: 'pkcs1' })
      });
    } catch (err) {
      throw new Error(
        `KALSHI_PRIVATE_KEY invalid: ${err instanceof Error ? err.message : err}`
      );
    }

    console.log('✅ Kalshi auth initialized');
  }

  getHeaders(method: string, apiPath: string): Record<string, string> {
    const timestamp = Date.now().toString();
    const message = timestamp + method + apiPath;
    const signature = crypto
      .sign('sha256', Buffer.from(message), {
        key: this.privateKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING
      })
      .toString('base64');

    return {
      'KALSHI-ACCESS-KEY': this.apiKey,
      'KALSHI-ACCESS-TIMESTAMP': timestamp,
      'KALSHI-ACCESS-SIGNATURE': signature,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
  }
}

const baseUrl = 'https://api.elections.kalshi.com';
const EVENT_TICKERS = ['KXEARNINGSMENTIONNVDA', 'KXBTCD', 'KXNBAMVP'] as const;

async function fetchEvent(auth: KalshiAuth, eventTicker: string) {
  const apiPath = `/trade-api/v2/events/${eventTicker}`;
  const url = `${baseUrl}${apiPath}?with_nested_markets=true`;
  const headers = auth.getHeaders('GET', apiPath);

  const res = await fetch(url, { headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} - ${text}`);
  }
  return res.json();
}

async function main() {
  const auth = new KalshiAuth();

  for (const ticker of EVENT_TICKERS) {
    console.log('\n' + '='.repeat(70));
    console.log(`📡 Event: ${ticker}`);
    console.log('='.repeat(70));

    try {
      const data = await fetchEvent(auth, ticker);
      const event = data.event ?? data;
      const markets = event.markets ?? data.markets ?? [];

      console.log('\n[EVENT] Object.keys(event):');
      console.log(JSON.stringify(Object.keys(event), null, 2));

      if (markets.length > 0) {
        const market = markets[0];
        console.log('\n[MARKET] Object.keys(market[0]):');
        console.log(JSON.stringify(Object.keys(market), null, 2));

        console.log('\n[VALUES]:');
        console.log('  event.title:', JSON.stringify(event.title));
        console.log('  market.title:', JSON.stringify(market.title));
        console.log('  market.subtitle:', JSON.stringify(market.subtitle));
        console.log('  market.yes_sub_title:', JSON.stringify(market.yes_sub_title));
        console.log('  market.yes_bid:', market.yes_bid);
        console.log('  market.ticker:', JSON.stringify(market.ticker));
        console.log('  market.event_ticker:', JSON.stringify(market.event_ticker));
      } else {
        console.log('\n⚠️ No markets in response');
        console.log('Raw event keys:', Object.keys(event));
      }
    } catch (err) {
      console.log('\n❌ Error:', err instanceof Error ? err.message : err);
      // Try fetching by series if event_ticker 404s
      const seriesPath = '/trade-api/v2/events';
      const seriesUrl = `${baseUrl}${seriesPath}?series_ticker=${ticker}&with_nested_markets=true&limit=1`;
      const headers = auth.getHeaders('GET', seriesPath);
      try {
        const res = await fetch(seriesUrl, { headers });
        if (res.ok) {
          const json = await res.json();
          const events = json.events ?? [];
          if (events.length > 0) {
            const ev = events[0];
            const mkts = ev.markets ?? [];
            console.log('\n(Fallback: fetched first event from series)');
            console.log('event.event_ticker:', ev.event_ticker);
            console.log('[EVENT] Object.keys:', JSON.stringify(Object.keys(ev), null, 2));
            if (mkts.length > 0) {
              const m = mkts[0];
              console.log('[MARKET] Object.keys:', JSON.stringify(Object.keys(m), null, 2));
              console.log('  event.title:', JSON.stringify(ev.title));
              console.log('  market.title:', JSON.stringify(m.title));
              console.log('  market.subtitle:', JSON.stringify(m.subtitle));
              console.log('  market.yes_sub_title:', JSON.stringify(m.yes_sub_title));
              console.log('  market.yes_bid:', m.yes_bid);
              console.log('  market.ticker:', JSON.stringify(m.ticker));
              console.log('  market.event_ticker:', JSON.stringify(m.event_ticker));
            }
          }
        }
      } catch (_) {
        // ignore
      }
    }

    await new Promise((r) => setTimeout(r, 200));
  }

  console.log('\n✅ Done\n');

  // Test buildKalshiQuestion con los 3 casos del debug
  await testBuildKalshiQuestion();
}

async function testBuildKalshiQuestion() {
  const { buildKalshiQuestion } = await import(
    '../lib/services/kalshi.service'
  );

  console.log('\n' + '='.repeat(70));
  console.log('🧪 Test buildKalshiQuestion()');
  console.log('='.repeat(70));

  const cases = [
    {
      name: 'NVDA earnings',
      market: {
        title: 'What will NVIDIA Corporation say during their next earnings call?',
        subtitle: '',
        ticker: 'KXEARNINGSMENTIONNVDA-26',
        yes_sub_title: 'VR / Virtual Reality'
      },
      event: {
        title: 'What will NVIDIA Corporation say during their next earnings call?'
      },
      expected:
        'What will NVIDIA Corporation say during their next earnings call? — VR / Virtual Reality'
    },
    {
      name: 'BTC price',
      market: {
        title: 'Bitcoin price on Mar 13, 2026 at 5pm EDT?',
        subtitle: '$74,500 or above',
        ticker: 'KXBTCD-26MAR13',
        yes_sub_title: ''
      },
      event: {
        title: 'Bitcoin price on Mar 13, 2026 at 5pm EDT?'
      },
      expected:
        'Bitcoin price on Mar 13, 2026 at 5pm EDT? — $74,500 or above'
    },
    {
      name: 'NBA MVP',
      market: {
        title: 'MVP Winner?',
        subtitle: '',
        ticker: 'KXNBAMVP-26',
        yes_sub_title: 'Shai Gilgeous-Alexander'
      },
      event: { title: 'MVP Winner?' },
      expected: 'MVP Winner? — Shai Gilgeous-Alexander'
    }
  ];

  for (const c of cases) {
    const result = buildKalshiQuestion(c.market, c.event);
    const ok = result === c.expected;
    console.log(`\n[${c.name}]`);
    console.log(`  Expected: ${c.expected}`);
    console.log(`  Got:      ${result}`);
    console.log(`  ${ok ? '✅ OK' : '❌ FAIL'}`);
  }
  console.log('\n');
}

main().catch(console.error);
