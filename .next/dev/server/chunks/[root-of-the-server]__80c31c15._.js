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
"[project]/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/adapter-pg/dist/index.mjs [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const globalForPrisma = globalThis;
function createPrismaClient() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        throw new Error('DATABASE_URL environment variable is not set');
    }
    const adapter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaPg"]({
        connectionString
    });
    return new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
        adapter,
        log: [
            'error',
            'warn'
        ],
        transactionOptions: {
            maxWait: 10000,
            timeout: 30000 // Timeout de 30s por transacción
        }
    });
}
const prisma = globalForPrisma.prisma ?? createPrismaClient();
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/app/api/arbitrage/live/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const dynamic = 'force-dynamic';
/**
 * Derives polymarket and kalshi YES prices from Comparison bestYes/bestNo.
 * bestYesPlatform has the best (lowest) YES price; bestNoPlatform has the best (lowest) NO price.
 */ function derivePrices(bestYesPrice, bestNoPrice, bestYesPlatform, bestNoPlatform) {
    const polyYes = bestYesPlatform === 'POLYMARKET' ? bestYesPrice : 1 - bestNoPrice;
    const kalshiYes = bestYesPlatform === 'KALSHI' ? bestYesPrice : 1 - bestNoPrice;
    return {
        polymarketYesPrice: polyYes,
        kalshiYesPrice: kalshiYes
    };
}
/**
 * Effective price after fees: Polymarket ~2% taker, Kalshi ~7% on payout
 */ function effectiveYesPrice(price, platform) {
    if (platform === 'POLYMARKET') return price * 1.02;
    if (platform === 'KALSHI') return price + 0.07 * (1 - price);
    return price;
}
const baseUrl = process.env.NEXT_PUBLIC_URL ?? (typeof process.env.VERCEL_URL === 'string' ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
async function GET(req) {
    const generatedAt = new Date().toISOString();
    try {
        const limitParam = req.nextUrl.searchParams.get('limit') || '10';
        const limit = Math.min(Math.max(parseInt(limitParam, 10) || 10, 1), 20);
        const comparisons = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].comparison.findMany({
            where: {
                arbitrageExists: true
            },
            orderBy: {
                arbitrageROI: 'desc'
            },
            take: limit
        });
        const opportunities = [];
        for (const c of comparisons){
            if (!c.marketIds || c.marketIds.length < 2) continue;
            const [polyId, kalshiId] = c.marketIds;
            const polyMarket = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.findUnique({
                where: {
                    id: polyId
                },
                select: {
                    id: true,
                    platform: true,
                    question: true,
                    category: true,
                    url: true,
                    volume24h: true
                }
            });
            const kalshiMarket = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.findUnique({
                where: {
                    id: kalshiId
                },
                select: {
                    id: true,
                    platform: true,
                    question: true,
                    category: true,
                    url: true,
                    volume24h: true
                }
            });
            if (!polyMarket || !kalshiMarket) continue;
            const polyIsPoly = polyMarket.platform === 'POLYMARKET';
            const polyM = polyIsPoly ? polyMarket : kalshiMarket;
            const kalshiM = polyIsPoly ? kalshiMarket : polyMarket;
            const bestYes = c.bestYesPrice ?? 0;
            const bestNo = c.bestNoPrice ?? 0;
            const { polymarketYesPrice, kalshiYesPrice } = derivePrices(bestYes, bestNo, c.bestYesPlatform, c.bestNoPlatform);
            const polymarketNoPrice = 1 - polymarketYesPrice;
            const kalshiNoPrice = 1 - kalshiYesPrice;
            const effectiveYesPoly = effectiveYesPrice(polymarketYesPrice, 'POLYMARKET');
            const effectiveYesKalshi = effectiveYesPrice(kalshiYesPrice, 'KALSHI');
            opportunities.push({
                id: c.id,
                question: polyM.question,
                category: polyM.category,
                polymarket: {
                    id: polyM.id,
                    yesPrice: polymarketYesPrice,
                    noPrice: polymarketNoPrice,
                    effectiveYesPrice: effectiveYesPoly,
                    url: polyM.url
                },
                kalshi: {
                    id: kalshiM.id,
                    yesPrice: kalshiYesPrice,
                    noPrice: kalshiNoPrice,
                    effectiveYesPrice: effectiveYesKalshi,
                    url: kalshiM.url
                },
                roi: c.arbitrageROI ?? 0,
                matchScore: 1,
                volume24h: (polyMarket.volume24h ?? 0) + (kalshiMarket.volume24h ?? 0)
            });
        }
        if (opportunities.length === 0) {
            const oppRes = await fetch(`${baseUrl}/api/arbitrage/opportunities?limit=${limit}&minRoi=0.005`, {
                cache: 'no-store'
            }).catch(()=>null);
            if (oppRes?.ok) {
                const oppData = await oppRes.json();
                const opps = oppData?.opportunities ?? [];
                if (opps.length > 0) {
                    const mapped = opps.map((o)=>({
                            id: String(o.id ?? ''),
                            question: String(o.question ?? ''),
                            category: o.category ?? null,
                            polymarket: {
                                id: o.polymarket?.id,
                                yesPrice: o.polymarket?.yesPrice,
                                noPrice: o.polymarket?.noPrice,
                                effectiveYesPrice: o.polymarket?.effectiveYesPrice,
                                url: o.polymarket?.url
                            },
                            kalshi: {
                                id: o.kalshi?.id,
                                yesPrice: o.kalshi?.yesPrice,
                                noPrice: o.kalshi?.noPrice,
                                effectiveYesPrice: o.kalshi?.effectiveYesPrice,
                                url: o.kalshi?.url
                            },
                            roi: o.roi ?? 0,
                            matchScore: o.matchScore ?? 1,
                            volume24h: o.polymarket?.volume24h + o.kalshi?.volume24h
                        }));
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        opportunities: mapped,
                        count: mapped.length,
                        generatedAt
                    }, {
                        headers: {
                            'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=60'
                        }
                    });
                }
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            opportunities,
            count: opportunities.length,
            generatedAt
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=60'
            }
        });
    } catch (error) {
        console.error('❌ Arbitrage live error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            opportunities: [],
            count: 0,
            generatedAt
        }, {
            status: 200
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__80c31c15._.js.map