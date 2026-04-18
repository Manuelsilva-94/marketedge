# Cron schedule (recommended)

These routes live under `/api/cron/*` and are typically triggered by **cron-job.org** (or similar) with `Authorization: Bearer <CRON_SECRET>`.

## Vercel Hobby constraints

- **Built-in Vercel Cron:** only **one** job/day on Hobby; `vercel.json` points to **`sync-markets`** (daily incremental sync + cleanup). `maxDuration` for that route is **55s** (Hobby max ~60s).
- **Long-running discovery** (`discover-*` with 120s/300s): run **locally** with `npm run discover-local` / `npm run discover-sports-local`, or use **cron-job.org** only for routes with **maxDuration ≤ 55s**.

## cron-job.org (free tier: ~5 jobs, **30s** client timeout)

The HTTP **function may still run up to `maxDuration`** on Vercel after the client disconnects. Prefer routes capped at **55s**.

| Route | Purpose | Suggested frequency |
|--------|---------|---------------------|
| `arbitrage-scanner` | Fallback when Railway `PriceCache` is stale | Every **30 minutes** |
| `match-new-markets` | LLM match: Kalshi unmatched (7d window + backlog) | Every **6 hours** |
| `discover-sports` | Sports-only: Kalshi `series_ticker` + Polymarket `tag_id`; keyword auto-match | Every **2–4 hours** |
| `sync-markets` | Incremental Polymarket + Kalshi + cleanup inactive/resolved | **Daily** (also Vercel cron) |

## Local / manual (no timeout)

| Script | Command |
|--------|---------|
| Full discovery | `npm run discover-local` |
| Sports discovery | `npm run discover-sports-local` |
| Match (Groq) | `npx tsx scripts/match-new-local.ts` |
| Sync verified pairs | `npm run sync-active-local` |
| Aggressive cleanup | `npm run cleanup-markets` |
| All-in-one | `.\scripts\daily-routine.ps1` |

## Legacy / long HTTP routes (local or Pro)

| Route | Notes |
|--------|--------|
| `discover-kalshi-markets` | Full Kalshi `/events` cursor; **120s** — use **Session pooler** `DATABASE_URL` |
| `discover-polymarket-markets` | Gamma `/events` paginated; **120s** |
| `discover-markets` | Legacy; **300s** — both platforms |
| `sync-active-markets` | Verified pairs refresh; **300s** — prefer `sync-active-local` on Hobby |
| `full-sync-kalshi` | Full Kalshi walk; **300s** — not in `vercel.json` |

**Removed:** `update-prices` — replaced by the Railway WebSocket worker writing to `PriceCache`.

**Railway:** `npm run worker` — WebSocket prices + `PriceCache` + arbitrage alerts.
