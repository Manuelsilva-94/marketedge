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
        ]
    });
}
const prisma = globalForPrisma.prisma ?? createPrismaClient();
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/services/manifold.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "ManifoldService",
    ()=>ManifoldService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
class ManifoldService {
    baseUrl = 'https://api.manifold.markets/v0';
    /**
   * Obtiene markets de Manifold
   * Solo filtramos BINARY markets (YES/NO)
   */ async getMarkets(options = {}) {
        const { limit = 1000, before } = options;
        const params = new URLSearchParams({
            limit: String(limit),
            ...before && {
                before
            }
        });
        console.log(`📡 Fetching Manifold markets: ${this.baseUrl}/markets?${params}`);
        const response = await fetch(`${this.baseUrl}/markets?${params}`, {
            headers: {
                Accept: 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Manifold API error: ${response.status}`);
        }
        const markets = await response.json();
        // Filtrar solo BINARY markets
        const binaryMarkets = markets.filter((m)=>m.outcomeType === 'BINARY' && !m.isResolved);
        console.log(`✅ Fetched ${markets.length} markets, ${binaryMarkets.length} are binary`);
        return binaryMarkets;
    }
    /**
   * Normaliza un market de Manifold a nuestro formato
   */ normalizeMarket(raw) {
        const yesPrice = raw.probability;
        const noPrice = 1 - raw.probability;
        return {
            platform: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].MANIFOLD,
            externalId: raw.id,
            question: raw.question,
            slug: raw.slug,
            description: null,
            category: null,
            tags: [],
            yesPrice,
            noPrice,
            midPrice: (yesPrice + noPrice) / 2,
            yesBid: null,
            yesAsk: null,
            noBid: null,
            noAsk: null,
            makerFee: 0,
            takerFee: 0,
            feeStructure: 'free',
            volume24h: raw.volume24Hours || 0,
            volumeTotal: raw.volume || 0,
            liquidity: raw.pool ? raw.pool.YES + raw.pool.NO : 0,
            active: !raw.isResolved,
            endDate: raw.closeTime ? new Date(raw.closeTime) : null,
            resolvedAt: raw.isResolved ? new Date(raw.lastUpdatedTime) : null,
            outcome: raw.resolution || null,
            imageUrl: null,
            url: raw.url,
            lastSyncedAt: new Date()
        };
    }
    /**
   * Sincroniza markets a la base de datos
   */ async syncToDB(limit = 500) {
        console.log(`\n🔄 Starting Manifold sync (limit: ${limit})...`);
        const markets = await this.getMarkets({
            limit
        });
        const marketsToSync = markets.slice(0, limit);
        let synced = 0;
        let errors = 0;
        for (const raw of marketsToSync){
            try {
                const normalized = this.normalizeMarket(raw);
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.upsert({
                    where: {
                        platform_externalId: {
                            platform: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].MANIFOLD,
                            externalId: raw.id
                        }
                    },
                    update: {
                        question: normalized.question,
                        yesPrice: normalized.yesPrice,
                        noPrice: normalized.noPrice,
                        midPrice: normalized.midPrice,
                        volume24h: normalized.volume24h,
                        volumeTotal: normalized.volumeTotal,
                        liquidity: normalized.liquidity,
                        active: normalized.active,
                        url: normalized.url,
                        lastSyncedAt: normalized.lastSyncedAt,
                        updatedAt: new Date()
                    },
                    create: normalized
                });
                synced++;
                if (synced % 25 === 0) {
                    console.log(`  ⏳ Synced ${synced}/${marketsToSync.length}...`);
                }
            } catch (error) {
                errors++;
                console.error(`  ❌ Error syncing market ${raw.id}:`, error instanceof Error ? error.message : error);
            }
        }
        console.log(`\n✅ Manifold sync complete:`);
        console.log(`   - Synced: ${synced}`);
        console.log(`   - Errors: ${errors}`);
        console.log(`   - Total: ${marketsToSync.length}`);
        return synced;
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/app/api/test/manifold/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$manifold$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/manifold.service.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$manifold$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$manifold$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const dynamic = 'force-dynamic';
async function GET() {
    try {
        const service = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$manifold$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ManifoldService"]();
        console.log('🧪 Testing Manifold service...');
        // Test 1: Fetch markets
        console.log('\n📊 Test 1: Fetching 10 markets...');
        const markets = await service.getMarkets({
            limit: 100
        });
        console.log(`✅ Fetched ${markets.length} binary markets`);
        // Test 2: Normalize one
        if (markets.length > 0) {
            console.log('\n🔄 Test 2: Normalizing first market...');
            const normalized = service.normalizeMarket(markets[0]);
            console.log('✅ Normalized:', {
                question: normalized.question,
                yesPrice: normalized.yesPrice,
                noPrice: normalized.noPrice,
                volume24h: normalized.volume24h
            });
        }
        // Test 3: Sync to DB
        console.log('\n💾 Test 3: Syncing 20 markets to DB...');
        const synced = await service.syncToDB(20);
        console.log(`✅ Synced ${synced} markets to database`);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            tests: {
                fetch: markets.length,
                sync: synced
            },
            sample: markets[0]
        });
    } catch (error) {
        console.error('❌ Test failed:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1d217778._.js.map