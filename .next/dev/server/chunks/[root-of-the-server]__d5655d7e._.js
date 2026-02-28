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
"[project]/lib/services/polymarket.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "PolymarketService",
    ()=>PolymarketService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
class PolymarketService {
    gammaUrl = 'https://gamma-api.polymarket.com';
    /**
   * Obtiene markets de Polymarket
   */ async getMarkets(options = {}) {
        const { active = true, limit = 100, offset = 0 } = options;
        const params = new URLSearchParams({
            active: String(active),
            closed: String(!active),
            limit: String(limit),
            offset: String(offset)
        });
        console.log(`📡 Fetching Polymarket markets: ${this.gammaUrl}/markets?${params}`);
        const response = await fetch(`${this.gammaUrl}/markets?${params}`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Polymarket API error: ${response.status}`);
        }
        const markets = await response.json();
        console.log(`✅ Fetched ${markets.length} markets from Polymarket`);
        return markets;
    }
    /**
   * Normaliza un market de Polymarket a nuestro formato
   */ normalizeMarket(raw) {
        // Parse prices (viene como JSON string)
        const prices = JSON.parse(raw.outcomePrices);
        const yesPrice = parseFloat(prices[0] || '0.5');
        const noPrice = parseFloat(prices[1] || '0.5');
        return {
            platform: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].POLYMARKET,
            externalId: raw.id,
            question: raw.question,
            slug: raw.slug,
            description: raw.description || null,
            category: raw.groupItemTitle || null,
            tags: raw.tags || [],
            // Prices (ya normalizados 0-1)
            yesPrice,
            noPrice,
            midPrice: (yesPrice + noPrice) / 2,
            // Polymarket no usa bid/ask
            yesBid: null,
            yesAsk: null,
            noBid: null,
            noAsk: null,
            // Fees (aproximados, pueden variar)
            makerFee: 0.02,
            takerFee: 0.02,
            feeStructure: 'flat',
            // Volume (convertir strings a números)
            volume24h: parseFloat(raw.volume24hr || '0'),
            volumeTotal: parseFloat(raw.volume || '0'),
            liquidity: parseFloat(raw.liquidity || '0'),
            // Status
            active: raw.active && !raw.closed,
            endDate: raw.endDate ? new Date(raw.endDate) : null,
            // URLs
            imageUrl: raw.image || null,
            url: `https://polymarket.com/event/${raw.slug}`,
            // Timestamps
            lastSyncedAt: new Date()
        };
    }
    /**
   * Sincroniza markets a la base de datos
   */ async syncToDB(limit = 100) {
        console.log(`\n🔄 Starting Polymarket sync (limit: ${limit})...`);
        const markets = await this.getMarkets({
            active: true,
            limit
        });
        let synced = 0;
        let errors = 0;
        for (const raw of markets){
            try {
                const normalized = this.normalizeMarket(raw);
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.upsert({
                    where: {
                        platform_externalId: {
                            platform: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].POLYMARKET,
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
                        category: normalized.category,
                        tags: normalized.tags,
                        imageUrl: normalized.imageUrl,
                        url: normalized.url,
                        lastSyncedAt: normalized.lastSyncedAt,
                        updatedAt: new Date()
                    },
                    create: normalized
                });
                synced++;
                if (synced % 10 === 0) {
                    console.log(`  ⏳ Synced ${synced}/${markets.length}...`);
                }
            } catch (error) {
                errors++;
                console.error(`  ❌ Error syncing market ${raw.id}:`, error instanceof Error ? error.message : error);
            }
        }
        console.log(`\n✅ Polymarket sync complete:`);
        console.log(`   - Synced: ${synced}`);
        console.log(`   - Errors: ${errors}`);
        console.log(`   - Total: ${markets.length}`);
        return synced;
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/app/api/test/polymarket/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$polymarket$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/polymarket.service.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$polymarket$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$polymarket$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const dynamic = 'force-dynamic';
async function GET() {
    try {
        const service = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$polymarket$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PolymarketService"]();
        console.log('🧪 Testing Polymarket service...');
        // Test 1: Fetch markets
        console.log('\n📊 Test 1: Fetching 5 markets...');
        const markets = await service.getMarkets({
            limit: 5
        });
        console.log(`✅ Fetched ${markets.length} markets`);
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
            error: error instanceof Error ? error.message : 'Unknown error'
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d5655d7e._.js.map