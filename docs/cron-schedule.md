# Cron schedule (recommended)

These routes live under `/api/cron/*` and are typically triggered by **cron-job.org** (or similar) with `Authorization: Bearer <CRON_SECRET>`, except where noted.

| Route | Purpose | Suggested frequency |
|--------|---------|---------------------|
| `discover-kalshi-markets` | Solo Kalshi: `/events` con cursor hasta fin o ~115s. Mejor **Session pooler** en `DATABASE_URL` para evitar cortes en batches grandes. | Every **6–12 hours** |
| `discover-polymarket-markets` | Solo Polymarket: Gamma `/events` paginado hasta vacío o ~115s. | Same |
| `discover-markets` | **Legacy:** corre Kalshi y luego Polymarket con **dos** presupuestos de ~115s (Polymarket ya no se queda sin tiempo). `maxDuration` 300s en Vercel si ambas fases corren seguidas. | Optional; prefer two routes above |
| `match-new-markets` | LLM match: Kalshi **without** a match from last **7 days** plus a **backlog** slice of older unmatched (by volume). | Every **6 hours** |
| `sync-active-markets` | Live prices for verified pairs; mark resolved; set `resolvedAt`; close related arbitrage rows | Every **6 hours** |
| `sync-markets` | Incremental sync + delete old inactive markets | **Daily** |
| `arbitrage-scanner` | Fallback scanner when Railway worker prices are stale (`PriceCache` older than ~5 min for a pair) | Every **30 minutes** |
| `full-sync-kalshi` | Full Kalshi cursor walk | **Weekly** (also in `vercel.json`) |

**Removed:** `update-prices` — replaced by the Railway WebSocket worker writing to `PriceCache`.

**Vercel:** Real-time prices and arbitrage detection are owned by the **Railway worker** (`npm run worker`). The app reads `PriceCache` from PostgreSQL.
