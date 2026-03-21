module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/services/whale.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WhaleService",
    ()=>WhaleService
]);
const DATA_API = 'https://data-api.polymarket.com';
function truncateAddress(address) {
    if (!address || address.length < 12) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
function parseTrade(raw) {
    const wallet = raw.proxyWallet ?? raw.user ?? raw.owner;
    if (!wallet || typeof wallet !== 'string') return null;
    const size = typeof raw.size === 'number' ? raw.size : parseFloat(String(raw.size ?? 0)) || 0;
    const price = typeof raw.price === 'number' ? raw.price : parseFloat(String(raw.price ?? 0)) || 0;
    const ts = raw.timestamp;
    const timestamp = typeof ts === 'number' ? new Date(ts * 1000).toISOString() : typeof ts === 'string' ? ts : new Date().toISOString();
    return {
        id: String(raw.id ?? raw.transactionHash ?? `${wallet}-${timestamp}`),
        market: String(raw.title ?? raw.market ?? ''),
        marketSlug: String(raw.slug ?? raw.eventSlug ?? ''),
        outcome: raw.outcome === 'Yes' || raw.outcomeIndex === 0 ? 'YES' : 'NO',
        price,
        size,
        side: raw.side === 'SELL' ? 'SELL' : 'BUY',
        timestamp,
        transactionHash: String(raw.transactionHash ?? ''),
        proxyWallet: wallet
    };
}
class WhaleService {
    /**
   * Fetch recent trades from Data API (no user filter = recent global trades if supported)
   */ async fetchRecentTrades(limit) {
        const res = await fetch(`${DATA_API}/trades?limit=${Math.min(limit, 1000)}&takerOnly=false`, {
            headers: {
                Accept: 'application/json'
            },
            next: {
                revalidate: 300
            }
        });
        if (!res.ok) return [];
        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.data ?? data?.trades ?? [];
        const out = [];
        for (const item of list){
            const t = parseTrade(item);
            if (t && t.proxyWallet) out.push(t);
        }
        return out;
    }
    /**
   * Fetch activity for a single user
   */ async fetchUserActivity(address, limit) {
        const res = await fetch(`${DATA_API}/activity?user=${encodeURIComponent(address)}&limit=${limit}&type=TRADE`, {
            headers: {
                Accept: 'application/json'
            },
            next: {
                revalidate: 300
            }
        });
        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data) ? data : data?.data ?? data?.activity ?? [];
    }
    /**
   * Fetch trades for a single user
   */ async getTraderTrades(address, limit = 20) {
        const res = await fetch(`${DATA_API}/trades?user=${encodeURIComponent(address)}&limit=${limit}&takerOnly=false`, {
            headers: {
                Accept: 'application/json'
            },
            next: {
                revalidate: 300
            }
        });
        if (!res.ok) return [];
        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.data ?? data?.trades ?? [];
        const out = [];
        for (const item of list){
            const t = parseTrade(item);
            if (t) out.push(t);
        }
        return out.slice(0, limit);
    }
    /**
   * Fetch positions for a user
   */ async getTraderPositions(address) {
        const res = await fetch(`${DATA_API}/positions?user=${encodeURIComponent(address)}`, {
            headers: {
                Accept: 'application/json'
            },
            next: {
                revalidate: 300
            }
        });
        if (!res.ok) return [];
        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.data ?? data?.positions ?? [];
        return list.slice(0, 20).map((p)=>({
                market: String(p.title ?? p.market ?? ''),
                marketSlug: String(p.slug ?? p.eventSlug ?? ''),
                outcome: p.outcome === 'Yes' || p.outcomeIndex === 0 ? 'YES' : 'NO',
                size: typeof p.size === 'number' ? p.size : parseFloat(String(p.size ?? 0)) || 0,
                avgPrice: typeof p.avgPrice === 'number' ? p.avgPrice : parseFloat(String(p.price ?? p.avgPrice ?? 0)) || 0,
                currentPrice: typeof p.currentPrice === 'number' ? p.currentPrice : null,
                unrealizedPnl: typeof p.unrealizedPnl === 'number' ? p.unrealizedPnl : null
            }));
    }
    /**
   * Fetch profile for a single address (profile endpoint if available)
   */ async fetchProfile(address) {
        const res = await fetch(`${DATA_API}/profile/${encodeURIComponent(address)}`, {
            headers: {
                Accept: 'application/json'
            },
            next: {
                revalidate: 300
            }
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data && typeof data === 'object' ? data : null;
    }
    /**
   * Top traders from Data API leaderboard
   */ async getTopTraders(period, limit = 50) {
        const timePeriod = period === '7d' ? 'WEEK' : 'MONTH';
        try {
            const res = await fetch(`${DATA_API}/v1/leaderboard?timePeriod=${timePeriod}&orderBy=PNL&limit=${limit}`, {
                headers: {
                    Accept: 'application/json'
                },
                cache: 'no-store'
            });
            if (!res.ok) {
                console.error(`[WhaleService] Leaderboard fetch failed: ${res.status}`);
                return [];
            }
            const data = await res.json();
            const list = Array.isArray(data) ? data : data?.data ?? data?.leaderboard ?? data?.results ?? [];
            if (list.length === 0) {
                console.warn('[WhaleService] Leaderboard returned empty array');
                return [];
            }
            console.log(`[WhaleService] Leaderboard: ${list.length} entries, sample keys: ${Object.keys(list[0] ?? {}).join(', ')}`);
            return list.slice(0, limit).map((entry, index)=>{
                // proxyWallet puede venir con sufijo numérico: "0xABC...123-1772479215461"
                // Limpiar: quedarse solo con la parte hex antes del guión si hay sufijo numérico
                const rawWallet = String(entry.proxyWallet ?? entry.address ?? '');
                const address = rawWallet.includes('-') ? rawWallet.split('-')[0] : rawWallet;
                const userName = entry.userName;
                const xUsername = entry.xUsername;
                // Ignorar userName/xUsername que sean addresses Ethereum (empiezan con 0x)
                // o que sean numéricos puros — en esos casos usar truncateAddress
                function isValidName(n) {
                    if (n == null || n === '' || n === 'null') return false;
                    const s = String(n).trim();
                    if (s.length <= 2) return false;
                    if (s.startsWith('0x')) return false; // address disfrazada de nombre
                    if (/^\d+$/.test(s)) return false; // puramente numérico
                    return true;
                }
                const rawName = isValidName(userName) ? String(userName).trim() : isValidName(xUsername) ? String(xUsername).trim() : null;
                const displayName = rawName ?? truncateAddress(address);
                const pnl = typeof entry.pnl === 'number' ? entry.pnl : null;
                const volume = typeof entry.vol === 'number' ? entry.vol : typeof entry.volume === 'number' ? entry.volume : 0;
                return {
                    address,
                    displayName,
                    pnl7d: period === '7d' ? pnl : null,
                    pnl30d: period === '30d' ? pnl : null,
                    volume7d: period === '7d' ? volume : 0,
                    volume30d: period === '30d' ? volume : volume,
                    winRate: typeof entry.winRate === 'number' ? entry.winRate : null,
                    marketsTraded: typeof entry.marketsTraded === 'number' && entry.marketsTraded > 0 ? entry.marketsTraded : typeof entry.numTrades === 'number' && entry.numTrades > 0 ? entry.numTrades : 0,
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
   */ async getTraderProfile(address) {
        const [trades, positions, profile] = await Promise.all([
            this.getTraderTrades(address, 20),
            this.getTraderPositions(address),
            this.fetchProfile(address)
        ]);
        const volume7d = trades.filter((t)=>Date.now() - new Date(t.timestamp).getTime() < 7 * 86400 * 1000).reduce((s, t)=>s + t.price * t.size, 0);
        const volume30d = trades.reduce((s, t)=>s + t.price * t.size, 0);
        const marketsSet = new Set(trades.map((t)=>t.market || t.marketSlug));
        const pnl7d = profile?.pnl7d ?? profile?.pnl ?? null;
        const pnl30d = profile?.pnl30d ?? null;
        const winRate = profile?.winRate ?? null;
        return {
            address,
            displayName: truncateAddress(address),
            pnl7d: pnl7d ?? null,
            pnl30d: pnl30d ?? null,
            volume7d,
            volume30d,
            winRate: winRate ?? null,
            marketsTraded: marketsSet.size,
            biggestWin: profile?.biggestWin ?? null,
            recentTrades: trades,
            topPositions: positions
        };
    }
}
}),
"[project]/app/api/whales/[address]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$whale$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/whale.service.ts [app-route] (ecmascript)");
;
;
const dynamic = 'force-dynamic';
async function GET(_request, context) {
    const { address } = await context.params;
    const normalized = address?.trim().toLowerCase();
    const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(normalized ?? '');
    if (!normalized || !isValidAddress) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Invalid wallet address format',
            address: '',
            displayName: '',
            stats: {},
            recentTrades: [],
            topPositions: []
        }, {
            status: 404
        });
    }
    try {
        const whaleService = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$whale$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WhaleService"]();
        const profile = await whaleService.getTraderProfile(normalized);
        const totalSize = profile.recentTrades.reduce((s, t)=>s + t.size, 0);
        const avgPositionSize = profile.recentTrades.length > 0 ? totalSize / profile.recentTrades.length : 0;
        const response = {
            address: profile.address,
            displayName: profile.displayName,
            stats: {
                volume7d: profile.volume7d,
                volume30d: profile.volume30d,
                pnl7d: profile.pnl7d,
                pnl30d: profile.pnl30d,
                winRate: profile.winRate,
                marketsTraded: profile.marketsTraded,
                avgPositionSize
            },
            recentTrades: profile.recentTrades.map((t)=>({
                    id: t.id,
                    market: t.market,
                    marketSlug: t.marketSlug,
                    outcome: t.outcome,
                    price: t.price,
                    size: t.size,
                    side: t.side,
                    timestamp: t.timestamp,
                    transactionHash: t.transactionHash
                })),
            topPositions: profile.topPositions.map((p)=>({
                    market: p.market,
                    marketSlug: p.marketSlug,
                    outcome: p.outcome,
                    size: p.size,
                    avgPrice: p.avgPrice,
                    currentPrice: p.currentPrice,
                    unrealizedPnl: p.unrealizedPnl
                })),
            error: null
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(response, {
            headers: {
                'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=120'
            }
        });
    } catch (error) {
        console.error('❌ Whale profile error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            address: normalized,
            displayName: `${normalized.slice(0, 6)}...${normalized.slice(-4)}`,
            stats: {
                volume7d: 0,
                volume30d: 0,
                pnl7d: null,
                pnl30d: null,
                winRate: null,
                marketsTraded: 0,
                avgPositionSize: 0
            },
            recentTrades: [],
            topPositions: [],
            error: error instanceof Error ? error.message : 'Failed to fetch profile'
        }, {
            status: 200
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__79ce1d42._.js.map