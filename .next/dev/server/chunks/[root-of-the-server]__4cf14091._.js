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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/lib/services/kalshi-auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KalshiAuth",
    ()=>KalshiAuth
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
;
class KalshiAuth {
    apiKey;
    privateKey;
    constructor(){
        this.apiKey = process.env.KALSHI_API_KEY;
        // Leer private key desde archivo o variable de entorno
        const privateKeyPath = process.env.KALSHI_PRIVATE_KEY_PATH;
        let keyPem;
        if (privateKeyPath) {
            // Si hay path, leer desde archivo (evita problemas de escaping)
            const fullPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].resolve(process.cwd(), privateKeyPath);
            const keyContent = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(fullPath, 'utf8');
            // Normalizar line endings (CRLF/CR -> LF) para compatibilidad con crypto
            keyPem = keyContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
        } else if (process.env.KALSHI_PRIVATE_KEY) {
            // En .env los \n suelen ser literales - convertir a saltos de línea reales
            keyPem = process.env.KALSHI_PRIVATE_KEY.replace(/\\n/g, '\n').trim();
        } else {
            throw new Error('KALSHI_PRIVATE_KEY o KALSHI_PRIVATE_KEY_PATH must be set');
        }
        // Validar y parsear la clave (soporta PKCS#1 y PKCS#8)
        try {
            const isPkcs1 = keyPem.includes('BEGIN RSA PRIVATE KEY');
            this.privateKey = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createPrivateKey({
                key: keyPem,
                format: 'pem',
                ...isPkcs1 && {
                    type: 'pkcs1'
                }
            });
        } catch (err) {
            throw new Error(`KALSHI_PRIVATE_KEY inválida: ${err instanceof Error ? err.message : err}. Verifica formato PEM y line endings.`);
        }
        console.log('✅ Kalshi auth initialized');
    }
    /**
   * Genera signature RSA-PSS para una request
   * Formato: timestamp + METHOD + path (sin query params, sin body)
   */ generateSignature(method, path) {
        const timestamp = Date.now().toString();
        // Mensaje: timestamp + METHOD + path
        // IMPORTANTE: NO incluir query params, NO incluir body
        const message = timestamp + method + path;
        // Firma RSA-PSS con SHA-256 (usar KeyObject parseado evita DECODER errors)
        const signature = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].sign('sha256', Buffer.from(message), {
            key: this.privateKey,
            padding: __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].constants.RSA_PKCS1_PSS_PADDING
        });
        return signature.toString('base64');
    }
    /**
   * Genera headers para una request autenticada
   */ getHeaders(method, path) {
        const timestamp = Date.now().toString();
        const signature = this.generateSignature(method, path);
        return {
            'KALSHI-ACCESS-KEY': this.apiKey,
            'KALSHI-ACCESS-TIMESTAMP': timestamp,
            'KALSHI-ACCESS-SIGNATURE': signature,
            'Content-Type': 'application/json',
            Accept: 'application/json'
        };
    }
}
}),
"[project]/lib/services/kalshi.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "KalshiService",
    ()=>KalshiService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$kalshi$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/kalshi-auth.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
class KalshiService {
    baseUrl = 'https://api.elections.kalshi.com/trade-api/v2';
    auth;
    constructor(){
        this.auth = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$kalshi$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KalshiAuth"]();
    }
    /**
   * Obtiene markets de Kalshi con paginación cursor-based
   */ async getMarkets(options = {}) {
        const { status = 'open', limit = 200, cursor } = options;
        // Path completo para firma (según docs Kalshi)
        const path = '/trade-api/v2/markets';
        const params = new URLSearchParams({
            status,
            limit: String(limit),
            ...cursor && {
                cursor
            }
        });
        const url = `${this.baseUrl}${path.replace('/trade-api/v2', '')}?${params}`;
        console.log(`📡 Fetching Kalshi markets: ${url}`);
        const headers = this.auth.getHeaders('GET', path);
        const response = await fetch(url, {
            headers
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Kalshi API error ${response.status}: ${errorText}`);
        }
        const data = await response.json();
        console.log(`✅ Fetched ${data.markets?.length || 0} markets from Kalshi`);
        return data;
    }
    /**
   * Normaliza un market de Kalshi a nuestro formato
   */ normalizeMarket(raw) {
        // Kalshi usa escala 0-100 (cents)
        // Convertir a 0-1 para normalizar con Polymarket
        const yesBid = raw.yes_bid / 100;
        const yesAsk = raw.yes_ask / 100;
        const noBid = raw.no_bid / 100;
        const noAsk = raw.no_ask / 100;
        const yesPrice = (yesBid + yesAsk) / 2;
        const noPrice = (noBid + noAsk) / 2;
        return {
            platform: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].KALSHI,
            externalId: raw.ticker,
            question: raw.title,
            slug: raw.ticker.toLowerCase(),
            description: raw.subtitle || null,
            category: raw.category || null,
            tags: [],
            yesPrice,
            noPrice,
            midPrice: (yesPrice + noPrice) / 2,
            yesBid,
            yesAsk,
            noBid,
            noAsk,
            makerFee: 0.07,
            takerFee: 0.07,
            feeStructure: 'payout_based',
            volume24h: raw.volume_24h || 0,
            volumeTotal: raw.volume || 0,
            liquidity: raw.liquidity || 0,
            openInterest: raw.open_interest || 0,
            active: raw.status === 'open' || raw.status === 'active',
            endDate: raw.close_time ? new Date(raw.close_time) : null,
            imageUrl: null,
            url: `https://kalshi.com/markets/${raw.ticker}`,
            lastSyncedAt: new Date()
        };
    }
    /**
   * Sincroniza markets a la base de datos
   */ async syncToDB(limit = 200) {
        console.log(`\n🔄 Starting Kalshi sync (limit: ${limit})...`);
        let allMarkets = [];
        let cursor;
        do {
            const response = await this.getMarkets({
                status: 'open',
                limit: 200,
                cursor
            });
            allMarkets = [
                ...allMarkets,
                ...response.markets
            ];
            cursor = response.cursor;
            console.log(`  📦 Accumulated ${allMarkets.length} markets...`);
            if (allMarkets.length >= limit) break;
            await new Promise((resolve)=>setTimeout(resolve, 100));
        }while (cursor)
        const marketsToSync = allMarkets.slice(0, limit);
        let synced = 0;
        let errors = 0;
        for (const raw of marketsToSync){
            try {
                const normalized = this.normalizeMarket(raw);
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.upsert({
                    where: {
                        platform_externalId: {
                            platform: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].KALSHI,
                            externalId: raw.ticker
                        }
                    },
                    update: {
                        question: normalized.question,
                        yesPrice: normalized.yesPrice,
                        noPrice: normalized.noPrice,
                        midPrice: normalized.midPrice,
                        yesBid: normalized.yesBid,
                        yesAsk: normalized.yesAsk,
                        noBid: normalized.noBid,
                        noAsk: normalized.noAsk,
                        volume24h: normalized.volume24h,
                        volumeTotal: normalized.volumeTotal,
                        liquidity: normalized.liquidity,
                        openInterest: normalized.openInterest,
                        active: normalized.active,
                        category: normalized.category,
                        url: normalized.url,
                        lastSyncedAt: normalized.lastSyncedAt,
                        updatedAt: new Date()
                    },
                    create: normalized
                });
                synced++;
                if (synced % 10 === 0) {
                    console.log(`  ⏳ Synced ${synced}/${marketsToSync.length}...`);
                }
            } catch (error) {
                errors++;
                console.error(`  ❌ Error syncing market ${raw.ticker}:`, error instanceof Error ? error.message : error);
            }
        }
        console.log(`\n✅ Kalshi sync complete:`);
        console.log(`   - Synced: ${synced}`);
        console.log(`   - Errors: ${errors}`);
        console.log(`   - Total: ${marketsToSync.length}`);
        return synced;
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/app/api/test/kalshi/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$kalshi$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/kalshi.service.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$kalshi$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$kalshi$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const dynamic = 'force-dynamic';
async function GET() {
    try {
        const service = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$kalshi$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KalshiService"]();
        console.log('🧪 Testing Kalshi service...');
        // Test 1: Fetch markets
        console.log('\n📊 Test 1: Fetching 5 markets...');
        const response = await service.getMarkets({
            limit: 5
        });
        console.log(`✅ Fetched ${response.markets.length} markets`);
        // Test 2: Normalize one
        if (response.markets.length > 0) {
            console.log('\n🔄 Test 2: Normalizing first market...');
            const normalized = service.normalizeMarket(response.markets[0]);
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
                fetch: response.markets.length,
                sync: synced
            },
            sample: response.markets[0]
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

//# sourceMappingURL=%5Broot-of-the-server%5D__4cf14091._.js.map