# Cron schedule (recommended)

These routes live under `/api/cron/*` and are typically triggered by **cron-job.org** (or similar) with `Authorization: Bearer <CRON_SECRET>`, except where noted.

| Route | Purpose | Suggested frequency |
|--------|---------|---------------------|
| `discover-markets` | Ingest new Kalshi + Polymarket markets | Every **4 hours** |
| `match-new-markets` | LLM match for recent Kalshi markets | Every **6 hours** |
| `sync-active-markets` | Live prices for verified pairs; mark resolved; set `resolvedAt`; close related arbitrage rows | Every **6 hours** |
| `sync-markets` | Incremental sync + delete old inactive markets | **Daily** |
| `arbitrage-scanner` | Fallback scanner when Railway worker prices are stale (`PriceCache` older than ~5 min for a pair) | Every **30 minutes** |
| `full-sync-kalshi` | Full Kalshi cursor walk | **Weekly** (also in `vercel.json`) |

**Removed:** `update-prices` — replaced by the Railway WebSocket worker writing to `PriceCache`.

**Vercel:** Real-time prices and arbitrage detection are owned by the **Railway worker** (`npm run worker`). The app reads `PriceCache` from PostgreSQL.
