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
    ()=>KalshiService,
    "buildKalshiQuestion",
    ()=>buildKalshiQuestion
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
function buildKalshiQuestion(market, event) {
    const eventTitle = event?.title?.trim() || '';
    const yesSubTitle = market.yes_sub_title?.trim() || '';
    const subtitle = market.subtitle?.trim() || '';
    const marketTitle = market.title?.trim() || '';
    // Caso 1: market.title es específico y diferente del event.title
    if (marketTitle && marketTitle !== eventTitle && marketTitle.length > 15) {
        const suffix = yesSubTitle || subtitle;
        return suffix ? `${marketTitle} — ${suffix}` : marketTitle;
    }
    // Caso 2: event.title + yes_sub_title (Sports, Mentions, la mayoría)
    if (eventTitle && yesSubTitle) {
        return `${eventTitle} — ${yesSubTitle}`;
    }
    // Caso 3: event.title + subtitle (Crypto pricing con threshold)
    if (eventTitle && subtitle) {
        return `${eventTitle} — ${subtitle}`;
    }
    // Caso 4: solo event.title
    if (eventTitle) return eventTitle;
    return marketTitle || market.ticker || 'Unknown market';
}
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
   * Obtiene precios live para un market (para compare/arbitrage)
   */ async getLiveMarket(market) {
        if (market.platform !== __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].KALSHI) return null;
        try {
            const path = `/trade-api/v2/markets/${market.externalId}`;
            const url = `${this.baseUrl}/markets/${market.externalId}`;
            const headers = this.auth.getHeaders('GET', path);
            const response = await fetch(url, {
                headers,
                next: {
                    revalidate: 0
                }
            });
            if (!response.ok) {
                console.error(`[Kalshi] Failed to fetch ${market.externalId}:`, response.status);
                return null;
            }
            const { market: kalshiMarket } = await response.json();
            // Kalshi usa yes_bid/yes_ask en centavos (0-100)
            const yesBid = (kalshiMarket.yes_bid ?? 50) / 100;
            const yesAsk = (kalshiMarket.yes_ask ?? 50) / 100;
            const yesPrice = (yesBid + yesAsk) / 2;
            const noPrice = 1 - yesPrice;
            // Kalshi fee: 7% del profit
            const effectiveYesPrice = yesPrice + 0.07 * (1 - yesPrice);
            console.log(`[Kalshi] ${market.externalId}: yes=${yesPrice.toFixed(3)}, no=${noPrice.toFixed(3)}`);
            return {
                yesPrice,
                noPrice,
                effectiveYesPrice,
                lastUpdated: new Date().toISOString()
            };
        } catch (error) {
            console.error(`[Kalshi] getLiveMarket failed for ${market.externalId}:`, error);
            return null;
        }
    }
    /**
   * Obtiene un market por ticker (para precios live - legacy)
   */ async getMarket(ticker) {
        const path = `/trade-api/v2/markets/${ticker}`;
        const url = `${this.baseUrl}/markets/${ticker}`;
        try {
            const headers = this.auth.getHeaders('GET', path);
            const response = await fetch(url, {
                headers
            });
            if (!response.ok) return null;
            const data = await response.json();
            return data.market ?? null;
        } catch  {
            return null;
        }
    }
    /**
   * Construye la pregunta correcta combinando event.title, market.yes_sub_title, market.subtitle
   * Basado en la estructura real de la API de Kalshi.
   */ buildKalshiQuestion(market, event) {
        return buildKalshiQuestion(market, event);
    }
    /**
   * Normaliza un market de Kalshi a nuestro formato (sin event)
   */ normalizeMarket(raw, event) {
        const question = event ? this.buildKalshiQuestion(raw, event) : raw.subtitle || raw.title;
        return {
            platform: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].KALSHI,
            externalId: raw.ticker,
            question,
            slug: raw.ticker.toLowerCase(),
            description: raw.subtitle || null,
            category: raw.category || null,
            tags: [],
            makerFee: 0.07,
            takerFee: 0.07,
            feeStructure: 'payout_based',
            volume24h: raw.volume_24h ?? 0,
            volumeTotal: raw.volume ?? 0,
            liquidity: raw.liquidity ?? 0,
            openInterest: raw.open_interest ?? 0,
            active: raw.status === 'open' || raw.status === 'active',
            endDate: raw.close_time ? new Date(raw.close_time) : null,
            imageUrl: null,
            url: `https://kalshi.com/markets/${raw.ticker}`,
            eventId: event?.event_ticker || raw.event_ticker || null,
            eventSlug: (event?.event_slug ?? event?.event_ticker ?? raw.event_ticker) || null,
            eventTitle: event?.title || null,
            seriesId: event?.series_ticker || null,
            lastSyncedAt: new Date()
        };
    }
    /**
   * Normaliza un market de Kalshi con event (para full sync desde /events)
   * Usa buildKalshiQuestion para construir la pregunta correcta por outcome
   */ normalizeMarketFromEvent(market, event) {
        const base = this.normalizeMarket(market, event);
        return {
            ...base,
            eventId: event.event_ticker || market.event_ticker || null,
            eventSlug: (event.event_slug ?? event.event_ticker ?? market.event_ticker) || null,
            eventTitle: event.title || null,
            seriesId: event.series_ticker || null
        };
    }
    /**
   * Sync completo desde /events con nested markets
   */ async syncFullEventsToDB(maxMarkets = 50000) {
        console.log(`\n🔄 FULL SYNC: Kalshi Events (max: ${maxMarkets})...`);
        const startTime = Date.now();
        const MAX_DURATION = 480000; // 8 minutos (margen para evitar timeout Vercel)
        const allMarkets = [];
        let cursor;
        const path = '/trade-api/v2/events';
        do {
            if (Date.now() - startTime > MAX_DURATION) {
                console.log(`  ⏰ Time limit (8 min) reached, stopping at ${allMarkets.length} markets`);
                break;
            }
            const params = new URLSearchParams({
                with_nested_markets: 'true',
                limit: '200'
            });
            if (cursor) params.set('cursor', cursor);
            const url = `${this.baseUrl}/events?${params}`;
            const headers = this.auth.getHeaders('GET', path);
            console.log(`  📡 Fetching events (cursor: ${cursor || 'initial'})...`);
            const response = await fetch(url, {
                headers
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`  ❌ API error: ${response.status} - ${errorText}`);
                break;
            }
            const data = await response.json();
            for (const event of data.events || []){
                if (event.markets && event.markets.length > 0) {
                    for (const market of event.markets){
                        allMarkets.push({
                            market,
                            event
                        });
                        if (allMarkets.length >= maxMarkets) break;
                    }
                }
                if (allMarkets.length >= maxMarkets) break;
            }
            cursor = data.cursor;
            console.log(`  📦 Total accumulated: ${allMarkets.length}`);
            await new Promise((resolve)=>setTimeout(resolve, 100));
        }while (cursor && allMarkets.length < maxMarkets)
        console.log(`\n💾 Saving ${allMarkets.length} markets to DB...`);
        let synced = 0;
        let errors = 0;
        const BATCH_SIZE = 50;
        const updateFields = (normalized)=>({
                question: normalized.question,
                slug: normalized.slug,
                description: normalized.description,
                category: normalized.category,
                tags: normalized.tags,
                eventId: normalized.eventId,
                eventSlug: normalized.eventSlug,
                eventTitle: normalized.eventTitle,
                seriesId: normalized.seriesId,
                volume24h: normalized.volume24h,
                volumeTotal: normalized.volumeTotal,
                liquidity: normalized.liquidity,
                active: normalized.active,
                endDate: normalized.endDate,
                url: normalized.url,
                lastSyncedAt: new Date(),
                updatedAt: new Date()
            });
        for(let i = 0; i < allMarkets.length; i += BATCH_SIZE){
            if (Date.now() - startTime > MAX_DURATION) {
                console.log(`  ⏰ Time limit reached during save, saved ${synced} so far`);
                break;
            }
            const batch = allMarkets.slice(i, i + BATCH_SIZE);
            try {
                const operations = batch.map(({ market, event })=>{
                    const normalized = this.normalizeMarketFromEvent(market, event);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.upsert({
                        where: {
                            platform_externalId: {
                                platform: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].KALSHI,
                                externalId: market.ticker
                            }
                        },
                        update: updateFields(normalized),
                        create: normalized
                    });
                });
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].$transaction(operations);
                synced += batch.length;
                if (synced % 500 === 0 || i + BATCH_SIZE >= allMarkets.length) {
                    console.log(`  ⏳ Saved ${synced}/${allMarkets.length}...`);
                }
            } catch (error) {
                errors += batch.length;
                console.error(`  ❌ Batch error at ${i}:`, error instanceof Error ? error.message : error);
                for (const { market, event } of batch){
                    try {
                        const normalized = this.normalizeMarketFromEvent(market, event);
                        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.upsert({
                            where: {
                                platform_externalId: {
                                    platform: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].KALSHI,
                                    externalId: market.ticker
                                }
                            },
                            update: updateFields(normalized),
                            create: normalized
                        });
                        synced++;
                        errors--;
                    } catch (singleError) {
                        console.error(`    ❌ Individual error: ${market.ticker}`);
                    }
                }
            }
        }
        const duration = Math.round((Date.now() - startTime) / 1000);
        console.log(`\n✅ FULL SYNC COMPLETE:`);
        console.log(`   - Synced: ${synced}`);
        console.log(`   - Errors: ${errors}`);
        console.log(`   - Duration: ${duration}s`);
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].syncLog.create({
            data: {
                platform: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].KALSHI,
                lastSyncedAt: new Date(),
                marketsCount: synced,
                duration,
                errors
            }
        });
        return synced;
    }
    /**
   * Sync incremental con min_created_ts
   */ async syncIncrementalToDB() {
        console.log(`\n🔄 INCREMENTAL SYNC: Kalshi...`);
        const lastSync = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].syncLog.findFirst({
            where: {
                platform: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].KALSHI
            },
            orderBy: {
                lastSyncedAt: 'desc'
            }
        });
        if (!lastSync) {
            console.log(`  ⚠️ No previous sync found, running full sync...`);
            return this.syncFullEventsToDB();
        }
        const sinceTs = Math.floor(lastSync.lastSyncedAt.getTime() / 1000);
        const path = '/trade-api/v2/markets';
        const params = new URLSearchParams({
            status: 'open',
            min_created_ts: String(sinceTs),
            limit: '1000'
        });
        const url = `${this.baseUrl}/markets?${params}`;
        const headers = this.auth.getHeaders('GET', path);
        const response = await fetch(url, {
            headers
        });
        if (!response.ok) {
            throw new Error(`Kalshi API error: ${response.status}`);
        }
        const data = await response.json();
        const markets = data.markets || [];
        console.log(`  📦 Found ${markets.length} new markets`);
        let synced = 0;
        const startTime = Date.now();
        for (const market of markets){
            try {
                const normalized = this.normalizeMarket(market);
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.upsert({
                    where: {
                        platform_externalId: {
                            platform: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].KALSHI,
                            externalId: market.ticker
                        }
                    },
                    update: {
                        question: normalized.question,
                        slug: normalized.slug,
                        description: normalized.description,
                        category: normalized.category,
                        eventId: normalized.eventId,
                        eventSlug: normalized.eventSlug,
                        volume24h: normalized.volume24h,
                        volumeTotal: normalized.volumeTotal,
                        liquidity: normalized.liquidity,
                        active: normalized.active,
                        endDate: normalized.endDate,
                        url: normalized.url,
                        lastSyncedAt: new Date(),
                        updatedAt: new Date()
                    },
                    create: normalized
                });
                synced++;
            } catch (error) {
                console.error(`Error syncing ${market.ticker}:`, error);
            }
        }
        const duration = Math.round((Date.now() - startTime) / 1000);
        console.log(`  ✅ Synced ${synced} new markets`);
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].syncLog.create({
            data: {
                platform: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].KALSHI,
                lastSyncedAt: new Date(),
                marketsCount: synced,
                duration,
                errors: 0
            }
        });
        return synced;
    }
    /**
   * Sincroniza markets a la base de datos (legacy - usa /markets)
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
                        slug: normalized.slug,
                        description: normalized.description,
                        category: normalized.category,
                        tags: normalized.tags,
                        eventId: normalized.eventId,
                        eventSlug: normalized.eventSlug,
                        eventTitle: normalized.eventTitle,
                        seriesId: normalized.seriesId,
                        volume24h: normalized.volume24h,
                        volumeTotal: normalized.volumeTotal,
                        liquidity: normalized.liquidity,
                        openInterest: normalized.openInterest,
                        active: normalized.active,
                        endDate: normalized.endDate,
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
   * Obtiene precios live para un market (para compare/arbitrage)
   * Intenta por externalId (conditionId) primero, luego por slug si falla
   */ async getLiveMarket(market) {
        if (market.platform !== 'POLYMARKET') return null;
        try {
            console.log('[Polymarket] Fetching live price for:', market.externalId, market.slug ?? '(no slug)');
            // Intento 1: por conditionId
            let response = await fetch(`https://gamma-api.polymarket.com/markets/${encodeURIComponent(market.externalId)}`, {
                headers: {
                    Accept: 'application/json'
                },
                next: {
                    revalidate: 0
                }
            });
            let data = response.ok ? await response.json() : null;
            // Intento 2: por slug si falló
            if (!data && market.slug) {
                response = await fetch(`https://gamma-api.polymarket.com/markets?slug=${encodeURIComponent(market.slug)}&limit=1`, {
                    headers: {
                        Accept: 'application/json'
                    }
                });
                const arr = response.ok ? await response.json() : [];
                data = Array.isArray(arr) && arr.length > 0 ? arr[0] : null;
            }
            if (!data) return null;
            console.log('[Polymarket] Raw outcomePrices:', data.outcomePrices);
            // outcomePrices viene como string JSON: "[\"0.15\",\"0.85\"]" o como array
            let prices = [];
            const op = data.outcomePrices;
            if (op != null) {
                const raw = typeof op === 'string' ? JSON.parse(op) : op;
                prices = (Array.isArray(raw) ? raw : []).map((p)=>parseFloat(String(p)));
            }
            const yesPrice = prices[0] ?? 0.5;
            const noPrice = prices[1] ?? 1 - yesPrice;
            const effectiveYesPrice = yesPrice * 1.02;
            return {
                yesPrice,
                noPrice,
                effectiveYesPrice,
                lastUpdated: new Date().toISOString()
            };
        } catch (error) {
            console.error(`[Polymarket] getLiveMarket failed for ${market.externalId}:`, error);
            return null;
        }
    }
    /**
   * Obtiene un market por id/conditionId (para precios live - legacy)
   */ async getMarket(id) {
        const result = await this.getLiveMarket({
            externalId: id,
            platform: 'POLYMARKET',
            slug: null
        });
        return result ? {
            yesPrice: result.yesPrice,
            noPrice: result.noPrice
        } : null;
    }
    /**
   * Normaliza un market de Polymarket a nuestro formato.
   * Incluye eventId, eventSlug, eventTitle cuando se provee eventInfo.
   */ normalizeMarket(raw, eventInfo) {
        const r = raw;
        const question = String(r.question ?? r.title ?? '');
        const slug = String(r.slug ?? r.id ?? '');
        const description = r.description != null ? String(r.description) : null;
        const category = r.groupItemTitle != null ? String(r.groupItemTitle) : r.category != null ? String(r.category) : null;
        const tags = Array.isArray(r.tags) ? r.tags : [];
        return {
            platform: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].POLYMARKET,
            externalId: String(r.id ?? r.conditionId ?? r.slug ?? ''),
            question,
            slug,
            description,
            category,
            tags,
            makerFee: 0.02,
            takerFee: 0.02,
            feeStructure: 'flat',
            volume24h: parseFloat(String(r.volume24hr ?? r.volume24h ?? '0')) || 0,
            volumeTotal: parseFloat(String(r.volume ?? r.volumeTotal ?? '0')) || 0,
            liquidity: parseFloat(String(r.liquidity ?? '0')) || 0,
            active: Boolean(r.active !== false && r.closed !== true),
            endDate: r.endDate ? new Date(String(r.endDate)) : null,
            imageUrl: typeof r.image === 'string' ? r.image : typeof r.imageUrl === 'string' ? r.imageUrl : null,
            url: (()=>{
                const s = eventInfo?.slug ?? (typeof r.eventSlug === 'string' ? r.eventSlug : null) ?? (typeof r.slug === 'string' ? r.slug : null) ?? slug;
                return s ? `https://polymarket.com/event/${s}` : null;
            })(),
            eventId: eventInfo?.id ?? (typeof r.eventId === 'string' ? r.eventId : null),
            eventSlug: eventInfo?.slug ?? (typeof r.eventSlug === 'string' ? r.eventSlug : typeof r.slug === 'string' ? r.slug : null),
            eventTitle: eventInfo?.title ?? (typeof r.eventTitle === 'string' ? r.eventTitle : typeof r.title === 'string' ? r.title : null),
            lastSyncedAt: new Date()
        };
    }
    /**
   * Sync completo: Trae TODOS los markets activos ordenados por volumen
   */ async syncFullToDB(maxMarkets = 50000, startOffset = 0) {
        console.log(`\n🔄 FULL SYNC: Polymarket (max: ${maxMarkets}, startOffset: ${startOffset})...`);
        const startTime = Date.now();
        const MAX_DURATION = 480000; // 8 minutos (margen para evitar timeout Vercel)
        const items = [];
        let offset = startOffset;
        const pageSize = 100;
        while(items.length < maxMarkets){
            if (Date.now() - startTime > MAX_DURATION) {
                console.log(`  ⏰ Time limit (8 min) reached, stopping at ${items.length} markets`);
                break;
            }
            const params = new URLSearchParams({
                active: 'true',
                closed: 'false',
                limit: String(pageSize),
                offset: String(offset)
            });
            // Nota: Removemos order y ascending (causaban 422)
            // Polymarket ya ordena por volume por defecto
            console.log(`  📡 Fetching offset ${offset}...`);
            const response = await fetch(`${this.gammaUrl}/events?${params}`, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`  ❌ API error at offset ${offset}: ${response.status}`);
                console.error(`  ❌ Response body: ${errorText}`);
                console.error(`  ❌ URL was: ${this.gammaUrl}/events?${params}`);
                break;
            }
            const events = await response.json();
            if (!events || events.length === 0) {
                console.log(`  ✅ No more events, stopping at ${items.length}`);
                break;
            }
            const eventInfo = (e)=>({
                    id: e.id,
                    slug: e.slug,
                    title: e.title
                });
            for (const event of events){
                const markets = event.markets && event.markets.length > 0 ? event.markets : [
                    event
                ];
                for (const m of markets){
                    const raw = typeof m === 'object' && m && 'id' in m ? m : {
                        id: event.id,
                        ...m
                    };
                    items.push({
                        raw,
                        event: eventInfo(event)
                    });
                }
            }
            offset += pageSize;
            console.log(`  📦 Total accumulated: ${items.length}`);
            await new Promise((resolve)=>setTimeout(resolve, 100));
        }
        console.log(`\n💾 Saving ${items.length} markets to DB...`);
        let synced = 0;
        let errors = 0;
        // Guardar UNO POR UNO (sin transacciones - más rápido en Supabase free tier)
        for(let i = 0; i < items.length; i++){
            if (Date.now() - startTime > MAX_DURATION) {
                console.log(`  ⏰ Time limit reached, saved ${synced} markets`);
                break;
            }
            const { raw, event } = items[i];
            try {
                const normalized = this.normalizeMarket(raw, event);
                const externalId = String(raw.id ?? raw.conditionId ?? raw.slug ?? '');
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.upsert({
                    where: {
                        platform_externalId: {
                            platform: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].POLYMARKET,
                            externalId
                        }
                    },
                    update: {
                        question: normalized.question,
                        slug: normalized.slug,
                        description: normalized.description,
                        category: normalized.category,
                        tags: normalized.tags,
                        eventId: normalized.eventId,
                        eventSlug: normalized.eventSlug,
                        eventTitle: normalized.eventTitle,
                        volume24h: normalized.volume24h,
                        volumeTotal: normalized.volumeTotal,
                        liquidity: normalized.liquidity,
                        active: normalized.active,
                        endDate: normalized.endDate,
                        url: normalized.url,
                        imageUrl: normalized.imageUrl,
                        lastSyncedAt: new Date(),
                        updatedAt: new Date()
                    },
                    create: normalized
                });
                synced++;
                if (synced % 500 === 0) {
                    console.log(`  ⏳ Saved ${synced}/${items.length}...`);
                }
            } catch (error) {
                errors++;
                if (errors <= 10) {
                    console.error(`  ❌ Error at ${i}: ${error instanceof Error ? error.message : error}`);
                }
            }
        }
        const duration = Math.round((Date.now() - startTime) / 1000);
        console.log(`\n✅ FULL SYNC COMPLETE:`);
        console.log(`   - Markets synced: ${synced}`);
        console.log(`   - Errors: ${errors}`);
        console.log(`   - Duration: ${duration}s`);
        if (items.length > 0) {
            console.log(`   - Success rate: ${(synced / items.length * 100).toFixed(1)}%`);
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].syncLog.create({
            data: {
                platform: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].POLYMARKET,
                lastSyncedAt: new Date(),
                marketsCount: synced,
                duration,
                errors
            }
        });
        return synced;
    }
    /**
   * Sync incremental: Solo markets nuevos desde última sync
   */ async syncIncrementalToDB() {
        console.log(`\n🔄 INCREMENTAL SYNC: Polymarket...`);
        const lastSync = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].syncLog.findFirst({
            where: {
                platform: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].POLYMARKET
            },
            orderBy: {
                lastSyncedAt: 'desc'
            }
        });
        if (!lastSync) {
            console.log(`  ⚠️ No previous sync found, running full sync...`);
            return this.syncFullToDB();
        }
        const sinceDate = lastSync.lastSyncedAt.toISOString();
        console.log(`  📅 Syncing markets created after: ${sinceDate}`);
        const params = new URLSearchParams({
            active: 'true',
            closed: 'false',
            start_date_min: sinceDate,
            order: 'start_date',
            ascending: 'false',
            limit: '100'
        });
        const response = await fetch(`${this.gammaUrl}/events?${params}`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Polymarket API error: ${response.status}`);
        }
        const events = await response.json();
        const items = [];
        const eventInfo = (e)=>({
                id: e.id,
                slug: e.slug,
                title: e.title
            });
        for (const event of events ?? []){
            const markets = event.markets && event.markets.length > 0 ? event.markets : [
                event
            ];
            for (const m of markets){
                const raw = typeof m === 'object' && m && 'id' in m ? m : {
                    id: event.id,
                    ...m
                };
                items.push({
                    raw,
                    event: eventInfo(event)
                });
            }
        }
        console.log(`  📦 Found ${items.length} new markets`);
        let synced = 0;
        const startTime = Date.now();
        for (const { raw, event } of items){
            try {
                const normalized = this.normalizeMarket(raw, event);
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.upsert({
                    where: {
                        platform_externalId: {
                            platform: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].POLYMARKET,
                            externalId: String(raw.id ?? raw.conditionId ?? raw.slug ?? '')
                        }
                    },
                    update: {
                        question: normalized.question,
                        slug: normalized.slug,
                        description: normalized.description,
                        category: normalized.category,
                        tags: normalized.tags,
                        eventId: normalized.eventId,
                        eventSlug: normalized.eventSlug,
                        eventTitle: normalized.eventTitle,
                        volume24h: normalized.volume24h,
                        volumeTotal: normalized.volumeTotal,
                        liquidity: normalized.liquidity,
                        active: normalized.active,
                        endDate: normalized.endDate,
                        url: normalized.url,
                        imageUrl: normalized.imageUrl,
                        lastSyncedAt: new Date(),
                        updatedAt: new Date()
                    },
                    create: normalized
                });
                synced++;
            } catch (error) {
                console.error(`Error syncing ${raw.id}:`, error);
            }
        }
        const duration = Math.round((Date.now() - startTime) / 1000);
        console.log(`  ✅ Synced ${synced} new markets`);
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].syncLog.create({
            data: {
                platform: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].POLYMARKET,
                lastSyncedAt: new Date(),
                marketsCount: synced,
                duration,
                errors: 0
            }
        });
        return synced;
    }
    /**
   * Sincroniza markets a la base de datos (legacy - usa /markets)
   * Usa paginación (500 por request) para obtener más de 500 markets
   */ async syncToDB(limit = 100) {
        console.log(`\n🔄 Starting Polymarket sync (limit: ${limit})...`);
        const BATCH_SIZE = 500;
        let markets = [];
        let offset = 0;
        while(markets.length < limit){
            const batch = await this.getMarkets({
                active: true,
                limit: Math.min(BATCH_SIZE, limit - markets.length),
                offset
            });
            if (batch.length === 0) break;
            markets = [
                ...markets,
                ...batch
            ];
            offset += batch.length;
            if (batch.length < BATCH_SIZE) break;
            await new Promise((r)=>setTimeout(r, 300));
        }
        const marketsToSync = markets.slice(0, limit);
        let synced = 0;
        let errors = 0;
        for (const raw of marketsToSync){
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
                        slug: normalized.slug,
                        description: normalized.description,
                        category: normalized.category,
                        tags: normalized.tags,
                        eventId: normalized.eventId,
                        eventSlug: normalized.eventSlug,
                        eventTitle: normalized.eventTitle,
                        volume24h: normalized.volume24h,
                        volumeTotal: normalized.volumeTotal,
                        liquidity: normalized.liquidity,
                        active: normalized.active,
                        imageUrl: normalized.imageUrl,
                        url: normalized.url,
                        lastSyncedAt: normalized.lastSyncedAt,
                        updatedAt: new Date()
                    },
                    create: normalized
                });
                synced++;
                if (synced % 50 === 0) {
                    console.log(`  ⏳ Synced ${synced}/${marketsToSync.length}...`);
                }
            } catch (error) {
                errors++;
                console.error(`  ❌ Error syncing market ${raw.id}:`, error instanceof Error ? error.message : error);
            }
        }
        console.log(`\n✅ Polymarket sync complete:`);
        console.log(`   - Synced: ${synced}`);
        console.log(`   - Errors: ${errors}`);
        console.log(`   - Total: ${marketsToSync.length}`);
        return synced;
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/services/normalizer.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Servicio de normalización de preguntas para matching cross-platform
 */ __turbopack_context__.s([
    "NormalizerService",
    ()=>NormalizerService
]);
class NormalizerService {
    PRICE_VERBS = new Map([
        [
            'reach',
            'cross'
        ],
        [
            'hit',
            'cross'
        ],
        [
            'exceed',
            'cross'
        ],
        [
            'surpass',
            'cross'
        ],
        [
            'above',
            'cross'
        ],
        [
            'over',
            'cross'
        ],
        [
            'break',
            'cross'
        ],
        [
            'top',
            'cross'
        ],
        [
            'below',
            'under'
        ],
        [
            'drop',
            'under'
        ],
        [
            'fall',
            'under'
        ],
        [
            'dip',
            'under'
        ],
        [
            'sink',
            'under'
        ]
    ]);
    GEO_SYNONYMS = new Map([
        [
            'us',
            'usa'
        ],
        [
            'u.s.',
            'usa'
        ],
        [
            'u.s.a.',
            'usa'
        ],
        [
            'united states',
            'usa'
        ],
        [
            'america',
            'usa'
        ]
    ]);
    POLITICAL_SYNONYMS = new Map([
        [
            'potus',
            'president'
        ],
        [
            'presidential election',
            'president'
        ],
        [
            'presidency',
            'president'
        ],
        [
            'gop',
            'republican'
        ],
        [
            'democrat',
            'democratic'
        ],
        [
            'dems',
            'democratic'
        ],
        [
            'reps',
            'republican'
        ]
    ]);
    CRYPTO_SYNONYMS = new Map([
        [
            'btc',
            'bitcoin'
        ],
        [
            'eth',
            'ethereum'
        ],
        [
            'ether',
            'ethereum'
        ],
        [
            'sol',
            'solana'
        ],
        [
            'xrp',
            'ripple'
        ]
    ]);
    ADDITIONAL_SYNONYMS = new Map([
        [
            'fifa world cup',
            'world cup'
        ],
        [
            "men's world cup",
            'world cup'
        ],
        [
            'mens world cup',
            'world cup'
        ],
        [
            'world cup winner',
            'world cup'
        ],
        [
            'presidential election',
            'president election'
        ],
        [
            'us presidential',
            'us president'
        ],
        [
            'above',
            'over'
        ],
        [
            'below',
            'under'
        ],
        [
            'by end of',
            'by'
        ],
        [
            'end of',
            'by'
        ]
    ]);
    STOPWORDS = new Set([
        'will',
        'the',
        'a',
        'an',
        'be',
        'is',
        'are',
        'was',
        'were',
        'do',
        'does',
        'did',
        'have',
        'has',
        'had',
        'to',
        'of',
        'in',
        'on',
        'at',
        'by',
        'for',
        'with',
        'about',
        'or',
        'and',
        'but',
        'if',
        'that',
        'this',
        'any',
        'ever',
        'next',
        'last',
        'first',
        'get',
        'go',
        'make'
    ]);
    /**
   * Normaliza números en texto
   */ normalizeNumbers(text) {
        let normalized = text;
        normalized = normalized.replace(/\$?([\d,]+)K\b/gi, (_, num)=>{
            return String(parseInt(num.replace(/,/g, '')) * 1000);
        });
        normalized = normalized.replace(/\$?([\d,]+)M\b/gi, (_, num)=>{
            return String(parseInt(num.replace(/,/g, '')) * 1000000);
        });
        normalized = normalized.replace(/\$?([\d,]+)/g, (_, num)=>{
            return num.replace(/,/g, '');
        });
        normalized = normalized.replace(/(\d+)\.0+\b/g, '$1');
        return normalized;
    }
    /**
   * Normaliza fechas a formato estándar
   */ normalizeDates(text) {
        let normalized = text;
        const months = {
            january: '01',
            jan: '01',
            february: '02',
            feb: '02',
            march: '03',
            mar: '03',
            april: '04',
            apr: '04',
            may: '05',
            june: '06',
            jun: '06',
            july: '07',
            jul: '07',
            august: '08',
            aug: '08',
            september: '09',
            sep: '09',
            sept: '09',
            october: '10',
            oct: '10',
            november: '11',
            nov: '11',
            december: '12',
            dec: '12'
        };
        normalized = normalized.replace(/end of (\w+)\s+(\d{4})/gi, (_, month, year)=>{
            const monthNum = months[month.toLowerCase()] || '12';
            return `${year}-${monthNum}-31`;
        });
        normalized = normalized.replace(/(\w+)\s+(\d{1,2}),?\s+(\d{4})/gi, (_, month, day, year)=>{
            const monthNum = months[month.toLowerCase()] || '01';
            const dayPadded = String(day).padStart(2, '0');
            return `${year}-${monthNum}-${dayPadded}`;
        });
        return normalized;
    }
    /**
   * Aplica todos los sinónimos
   */ applySynonyms(text) {
        let normalized = text.toLowerCase();
        const allSynonyms = [
            ...this.ADDITIONAL_SYNONYMS.entries(),
            ...this.PRICE_VERBS.entries(),
            ...this.GEO_SYNONYMS.entries(),
            ...this.POLITICAL_SYNONYMS.entries(),
            ...this.CRYPTO_SYNONYMS.entries()
        ];
        for (const [from, to] of allSynonyms){
            const regex = new RegExp(`\\b${from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
            normalized = normalized.replace(regex, to);
        }
        return normalized;
    }
    /**
   * Limpia puntuación y espacios extra
   */ cleanText(text) {
        return text.toLowerCase().replace(/[^\w\s-]/g, ' ').replace(/\s+/g, ' ').trim();
    }
    /**
   * Remueve stopwords
   */ removeStopwords(text) {
        const words = text.split(' ');
        const filtered = words.filter((word)=>!this.STOPWORDS.has(word));
        return filtered.join(' ');
    }
    /**
   * Extrae keywords relevantes
   */ extractKeywords(text) {
        return text.split(' ').filter((word)=>word.length > 2).filter((word)=>!this.STOPWORDS.has(word));
    }
    /**
   * PIPELINE COMPLETO: Normaliza una pregunta
   */ normalize(question) {
        let text = question;
        text = this.normalizeNumbers(text);
        text = this.normalizeDates(text);
        text = this.applySynonyms(text);
        text = this.cleanText(text);
        text = this.removeStopwords(text);
        const keywords = this.extractKeywords(text);
        return {
            normalized: text,
            keywords
        };
    }
}
}),
"[project]/lib/services/matcher.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "MatcherService",
    ()=>MatcherService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$normalizer$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/normalizer.service.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
class MatcherService {
    normalizer;
    constructor(){
        this.normalizer = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$normalizer$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NormalizerService"]();
    }
    /**
   * Extrae entidades (palabras capitalizadas que NO están al inicio de frase).
   * Ignora "Will", "Win", "World", "Cup" etc que aparecen capitalizadas por
   * estar al inicio o por formato, pero no son entidades reales.
   */ extractEntities(text) {
        const words = text.split(/\s+/);
        return words.filter((w, index)=>{
            if (index === 0) return false;
            if (!/^[A-Z]/.test(w)) return false;
            if (w.length <= 3) return false;
            const clean = w.toLowerCase().replace(/[^a-z]/g, '');
            const commonWords = new Set([
                'will',
                'the',
                'win',
                'cup',
                'world',
                'fifa'
            ]);
            return !commonWords.has(clean);
        }).map((w)=>w.toLowerCase().replace(/[^a-z]/g, ''));
    }
    /**
   * Calcula similarity score entre dos sets de keywords
   */ calculateKeywordSimilarity(keywords1, keywords2, text1, text2) {
        if (keywords1.length === 0 || keywords2.length === 0) return 0;
        const set1 = new Set(keywords1);
        const set2 = new Set(keywords2);
        const intersection = [
            ...set1
        ].filter((k)=>set2.has(k)).length;
        const union = new Set([
            ...set1,
            ...set2
        ]).size;
        const jaccardScore = union > 0 ? intersection / union : 0;
        const entities1 = text1 ? this.extractEntities(text1) : [];
        const entities2 = text2 ? this.extractEntities(text2) : [];
        const sharedEntities = entities1.filter((e)=>entities2.includes(e)).length;
        const entityBonus = sharedEntities > 0 ? Math.min(sharedEntities * 0.15, 0.25) : 0;
        return Math.min(1, jaccardScore + entityBonus);
    }
    /**
   * Penalización por diferencia de fechas de resolución.
   * Mismo año → OK. Diff > 3 años → fuerte. Diff 1-3 años → leve.
   */ applyDatePenalty(score, date1, date2) {
        if (!date1 || !date2) return score;
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diffDays = Math.abs((d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24));
        // Mismo año calendario → sin penalización
        if (d1.getFullYear() === d2.getFullYear()) return score;
        // Diferencia > 3 años → casi seguro son mercados distintos
        if (diffDays > 1095) return score * 0.3;
        // Diferencia entre 1 y 3 años → penalización leve
        if (diffDays > 365) return score * 0.85;
        // Menos de 1 año de diferencia → sin penalización
        return score;
    }
    /**
   * Calcula el match score entre dos markets
   */ scoreMatch(sourceMarket, sourceQuestion, sourceKeywords, targetMarket, targetKeywords) {
        const similarity = this.calculateKeywordSimilarity(sourceKeywords, targetKeywords, sourceQuestion, targetMarket.question);
        const penalizedScore = this.applyDatePenalty(similarity, sourceMarket.endDate, targetMarket.endDate);
        const flags = [];
        let matchType;
        if (penalizedScore >= 0.9) {
            matchType = 'STRICT';
        } else if (penalizedScore >= 0.75) {
            matchType = 'FUZZY';
            flags.push('FUZZY_MATCH');
        } else if (penalizedScore >= 0.6) {
            matchType = 'RELATED';
            flags.push('RELATED_ONLY');
        } else {
            matchType = 'RELATED';
            flags.push('LOW_CONFIDENCE');
        }
        if (targetMarket.endDate) {
            const sourceText = sourceKeywords.join(' ');
            const targetText = targetKeywords.join(' ');
            const sourceYear = sourceText.match(/\d{4}/)?.[0];
            const targetYear = targetText.match(/\d{4}/)?.[0];
            if (sourceYear && targetYear && sourceYear !== targetYear) {
                flags.push('DIFFERENT_YEAR');
            }
        }
        return {
            market: targetMarket,
            score: penalizedScore,
            matchType,
            flags
        };
    }
    /**
   * Encuentra markets equivalentes en otras plataformas
   */ STOP_KEYWORDS = new Set([
        'will',
        'the',
        'win',
        'winning',
        'won',
        'get',
        'have',
        'been',
        'reach',
        'above',
        'below',
        'over',
        'under',
        'who',
        'what',
        'when',
        'world',
        'cup',
        'fifa',
        '2024',
        '2025',
        '2026',
        '2027',
        '2028',
        'january',
        'february',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december'
    ]);
    async findMatches(sourceMarket, minScore = 0.6) {
        console.log(`\n[Matcher] ============================`);
        console.log(`[Matcher] Source: "${sourceMarket.question}"`);
        console.log(`[Matcher] Source eventTitle: "${sourceMarket.eventTitle ?? ''}"`);
        const { normalized, keywords } = this.normalizer.normalize(sourceMarket.question);
        // Extraer solo entidades reales para el pre-filtro (evita 1000 candidates genéricos)
        const entityKeywords = sourceMarket.question.split(/\s+/).filter((w)=>/^[A-Z][a-z]/.test(w)).map((w)=>w.toLowerCase().replace(/[^a-z]/g, '')).filter((w)=>w.length > 3 && !this.STOP_KEYWORDS.has(w)).slice(0, 3);
        const fallbackKeywords = sourceMarket.question.toLowerCase().split(/\s+/).filter((w)=>w.length > 6 && !this.STOP_KEYWORDS.has(w)).slice(0, 3);
        const searchKeywords = entityKeywords.length > 0 ? entityKeywords : fallbackKeywords;
        console.log(`[Matcher] searchKeywords:`, searchKeywords);
        console.log(`[Matcher] entityKeywords:`, entityKeywords);
        console.log(`[Matcher] fallbackKeywords:`, fallbackKeywords);
        if (searchKeywords.length === 0) {
            console.log(`[Matcher] No keywords found, skipping match`);
            return [];
        }
        const candidates = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.findMany({
            where: {
                platform: {
                    not: sourceMarket.platform
                },
                active: true,
                AND: searchKeywords.map((kw)=>({
                        question: {
                            contains: kw,
                            mode: 'insensitive'
                        }
                    }))
            },
            take: 100
        });
        console.log(`[Matcher] DB query used keywords:`, searchKeywords);
        console.log(`[Matcher] Candidates found:`, candidates.length);
        if (candidates.length > 0) {
            console.log(`[Matcher] First 3 candidates:`, candidates.slice(0, 3).map((c)=>({
                    q: c.question,
                    platform: c.platform
                })));
        }
        console.log(`[Matcher] Candidates after entity filter: ${candidates.length}`);
        console.log(`   Normalized: "${normalized}"`);
        console.log(`   Keywords: [${keywords.join(', ')}]`);
        const results = [];
        for (const candidate of candidates){
            const cleanQuestion = candidate.question.includes(' — ') ? candidate.question.split(' — ')[0] : candidate.question;
            const candidateNormalized = this.normalizer.normalize(cleanQuestion);
            const matchResult = this.scoreMatch(sourceMarket, sourceMarket.question, keywords, candidate, candidateNormalized.keywords);
            if (matchResult.score >= minScore) {
                results.push(matchResult);
            }
        }
        const allScores = candidates.map((c)=>{
            const cleanQ = c.question.includes(' — ') ? c.question.split(' — ')[0] : c.question;
            return {
                question: c.question,
                score: this.scoreMatch(sourceMarket, sourceMarket.question, keywords, c, this.normalizer.normalize(cleanQ).keywords).score
            };
        }).sort((a, b)=>b.score - a.score).slice(0, 5);
        console.log(`[Matcher] Top 5 scores:`, JSON.stringify(allScores, null, 2));
        results.sort((a, b)=>b.score - a.score);
        console.log(`   ✅ Found ${results.length} matches above ${minScore}`);
        return results;
    }
    /**
   * Encuentra matches dentro de una lista pre-filtrada de candidatos (sin fetchear de DB).
   * Útil cuando ya tienes candidatos por entity keywords.
   */ findMatchesFromCandidates(sourceMarket, candidates, minScore = 0.6) {
        if (candidates.length === 0) return [];
        const { keywords } = this.normalizer.normalize(sourceMarket.question);
        const results = [];
        for (const candidate of candidates){
            const cleanQuestion = candidate.question.includes(' — ') ? candidate.question.split(' — ')[0] : candidate.question;
            const candidateNormalized = this.normalizer.normalize(cleanQuestion);
            const matchResult = this.scoreMatch(sourceMarket, sourceMarket.question, keywords, candidate, candidateNormalized.keywords);
            if (matchResult.score >= minScore) {
                results.push(matchResult);
            }
        }
        results.sort((a, b)=>b.score - a.score);
        return results;
    }
    /**
   * Encuentra el mejor match para un market
   */ async findBestMatch(sourceMarket) {
        const matches = await this.findMatches(sourceMarket, 0.75);
        return matches.length > 0 ? matches[0] : null;
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/services/semantic-matcher.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "SemanticMatcherService",
    ()=>SemanticMatcherService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.1-8b-instant';
class SemanticMatcherService {
    static async clearErrorCache() {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].marketMatch.deleteMany({
            where: {
                confidence: 0
            }
        });
        return result.count;
    }
    static inFlight = 0;
    static MAX_CONCURRENT = 1;
    async callGroq(prompt) {
        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) throw new Error('GROQ_API_KEY not set');
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: GROQ_MODEL,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.1,
                max_tokens: 300
            })
        });
        if (!response.ok) {
            const err = await response.text();
            throw new Error(`Groq API error ${response.status}: ${err}`);
        }
        const data = await response.json();
        return data.choices?.[0]?.message?.content ?? '';
    }
    buildPrompt(marketA, marketB) {
        const questionA = marketA.question;
        const questionB = marketB.question;
        return `You are evaluating whether two prediction market questions resolve under IDENTICAL conditions.

Market A: "${questionA}"
Market B: "${questionB}"

STRICT RULES - A market pair is equivalent ONLY IF:
1. The subject is the same specific entity (same person, same team, same event)
2. The resolution condition is identical or practically identical
3. The timeframe/deadline is compatible

AUTOMATIC REJECTION - Mark as NOT equivalent if ANY of these apply:
- Different finish positions (Top 5 vs Top 10 vs Top 20 vs winner — these are DIFFERENT markets)
- Different people or entities (Michael Kim vs Si Woo Kim, Berger vs Spaun — DIFFERENT people = NOT equivalent)
- Different scope or audience: "top US Netflix movie" vs "top global Netflix movie" are NOT equivalent. "US election" vs "global election" are NOT equivalent. Any geographic or audience restriction makes markets different even if the subject is identical.
- Different dates (March 12 vs March 13 — NOT equivalent)
- Different thresholds (above $70k vs above $72k — NOT equivalent)
- One asks about a specific quantity/percentage, the other does not
- Same topic but different questions (e.g. "Will X happen?" vs "When will X happen?" vs "How much will X be?")

IMPORTANT: Two markets about the same general topic are NOT equivalent unless they resolve under the same specific conditions. When in doubt, return isEquivalent: false.

ALSO IMPORTANT: Treat semantically identical phrases as equivalent even if worded differently. Examples:
- "above $70,000" and "$70,000 or above" → SAME condition, mark as equivalent
- "win La Liga" and "win the La Liga" → SAME condition, mark as equivalent
- "before 2027" and "before Jan 2027" → SAME condition, mark as equivalent
- "top 5" and "Top 5" → SAME condition, mark as equivalent

Respond with valid JSON only, no explanation outside the JSON:
{"isEquivalent": boolean, "confidence": number between 0 and 1, "reasoning": "one sentence explanation"}`;
    }
    preFilterNotEquivalent(questionA, questionB) {
        // Retorna true si los mercados DEFINITIVAMENTE no son equivalentes
        // sin necesidad de llamar a Groq
        const a = questionA.toLowerCase();
        const b = questionB.toLowerCase();
        // Regla 1: US vs Global scope
        const hasUS = (s)=>s.includes(' us ') || s.includes(' us netflix') || s.includes('top us ') || s.includes('united states');
        const hasGlobal = (s)=>s.includes(' global ') || s.includes('worldwide') || s.includes('world ');
        if (hasUS(a) && hasGlobal(b) || hasUS(b) && hasGlobal(a)) return true;
        // Regla 2: Distintos números de finish position (Top 5 vs Top 10 vs Top 20)
        const topMatch = (s)=>s.match(/top\s+(\d+)/i);
        const topA = topMatch(a);
        const topB = topMatch(b);
        if (topA && topB && topA[1] !== topB[1]) return true;
        // Regla 3: Distintas fechas — cubre mes completo y abreviado (march/mar, january/jan, etc.)
        const dateMatch = (s)=>s.match(/(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+(\d{1,2})/i);
        const dateA = dateMatch(a);
        const dateB = dateMatch(b);
        // Comparar solo el número del día, no el nombre del mes completo
        // (mar 12 y march 12 son el mismo día)
        if (dateA && dateB && dateA[1] !== dateB[1]) return true;
        // Regla 4: Distintos thresholds numéricos para el mismo activo
        const thresholdMatch = (s)=>s.match(/\$?([\d,]+(?:\.\d+)?)\s*(?:k|m|b)?\s*(?:or above|or below|or higher|or lower)/i);
        const threshA = thresholdMatch(a);
        const threshB = thresholdMatch(b);
        if (threshA && threshB && threshA[1] !== threshB[1]) return true;
        return false;
    }
    async evaluatePair(marketA, marketB) {
        // Check DB cache first
        const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].marketMatch.findFirst({
            where: {
                OR: [
                    {
                        marketAId: marketA.id,
                        marketBId: marketB.id
                    },
                    {
                        marketAId: marketB.id,
                        marketBId: marketA.id
                    }
                ],
                confidence: {
                    gt: 0
                }
            }
        });
        if (existing) {
            return {
                isEquivalent: existing.isEquivalent,
                confidence: existing.confidence,
                reasoning: existing.reasoning ?? ''
            };
        }
        if (this.preFilterNotEquivalent(marketA.question, marketB.question)) {
            return {
                isEquivalent: false,
                confidence: 0,
                reasoning: 'Pre-filter: structurally incompatible markets'
            };
        }
        console.log(`[SemanticMatcher] Using Groq llama-3.1-8b`);
        const prompt = this.buildPrompt(marketA, marketB);
        let result;
        if (SemanticMatcherService.inFlight >= SemanticMatcherService.MAX_CONCURRENT) {
            console.log(`[SemanticMatcher] Concurrency limit, passing pair through`);
            return {
                isEquivalent: true,
                confidence: 0.5,
                reasoning: 'Fallback: concurrency limit'
            };
        }
        SemanticMatcherService.inFlight++;
        try {
            const raw = await this.callGroq(prompt);
            // Strip markdown fences if present
            const clean = raw.replace(/```json|```/g, '').trim();
            const parsed = JSON.parse(clean);
            result = {
                isEquivalent: Boolean(parsed.isEquivalent),
                confidence: Math.min(1, Math.max(0, Number(parsed.confidence) || 0)),
                reasoning: String(parsed.reasoning || '')
            };
        } catch (err) {
            const errMsg = err instanceof Error ? err.message : String(err);
            console.warn(`[SemanticMatcher] API unavailable, passing pair through: ${errMsg.slice(0, 80)}`);
            // Gemini no disponible → dejar pasar el par sin guardar en DB
            return {
                isEquivalent: true,
                confidence: 0.5,
                reasoning: 'Fallback: semantic validation unavailable'
            };
        } finally{
            SemanticMatcherService.inFlight--;
        }
        // Guardar como equivalente solo con alta confianza (>= 0.82)
        const shouldMarkEquivalent = result.isEquivalent && result.confidence >= 0.82;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].marketMatch.create({
            data: {
                marketAId: marketA.id,
                marketBId: marketB.id,
                isEquivalent: shouldMarkEquivalent,
                confidence: result.confidence,
                reasoning: result.reasoning,
                model: 'groq-llama-3.1-8b'
            }
        });
        const effectiveEquivalent = shouldMarkEquivalent;
        console.log(`[SemanticMatcher] ${marketA.question.slice(0, 40)}... ↔ ${marketB.question.slice(0, 40)}...`);
        console.log(`[SemanticMatcher] → ${effectiveEquivalent ? '✅ EQUIVALENT' : '❌ NOT EQUIVALENT'} (${(result.confidence * 100).toFixed(0)}%) ${result.reasoning}`);
        return {
            isEquivalent: effectiveEquivalent,
            confidence: result.confidence,
            reasoning: result.reasoning
        };
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/app/api/cron/discover-markets/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic,
    "maxDuration",
    ()=>maxDuration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$kalshi$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/kalshi.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$polymarket$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/polymarket.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/matcher.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$semantic$2d$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/semantic-matcher.service.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$kalshi$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$polymarket$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$semantic$2d$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$kalshi$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$polymarket$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$semantic$2d$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
const dynamic = 'force-dynamic';
const maxDuration = 300;
const MIN_KEYWORD_SCORE = 0.6;
const MAX_PAIRS_TO_EVALUATE = 20;
const RATE_LIMIT_DELAY = 1100;
async function GET(req) {
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Unauthorized'
        }, {
            status: 401
        });
    }
    const startedAt = Date.now();
    const MAX_DURATION = 240_000;
    let newKalshiMarkets = 0;
    let newPolyMarkets = 0;
    let pairsEvaluated = 0;
    let newMatches = 0;
    let errors = 0;
    try {
        const kalshiService = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$kalshi$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KalshiService"]();
        const polyService = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$polymarket$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PolymarketService"]();
        const matcherService = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MatcherService"]();
        const semanticMatcher = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$semantic$2d$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SemanticMatcherService"]();
        // PASO 1: Detectar markets nuevos de Kalshi
        // Fetcha una página de markets recientes y compara contra DB
        console.log('[Discovery] Checking for new Kalshi markets...');
        const newKalshiIds = [];
        try {
            const kalshiResponse = await kalshiService.getMarkets({
                status: 'open',
                limit: 200
            });
            const markets = (kalshiResponse.markets || []).filter((m)=>!m.ticker.startsWith('KXMVE') && !m.ticker.includes('CROSSCATEGORY'));
            if (markets.length > 0) {
                const tickers = markets.map((m)=>m.ticker);
                const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.findMany({
                    where: {
                        platform: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].KALSHI,
                        externalId: {
                            in: tickers
                        }
                    },
                    select: {
                        externalId: true
                    }
                });
                const existingSet = new Set(existing.map((m)=>m.externalId));
                const newMarkets = markets.filter((m)=>!existingSet.has(m.ticker));
                for (const market of newMarkets){
                    try {
                        const normalized = kalshiService.normalizeMarket(market);
                        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.create({
                            data: normalized
                        });
                        newKalshiIds.push(market.ticker);
                        newKalshiMarkets++;
                    } catch  {
                        errors++;
                    }
                }
            }
        } catch (e) {
            console.error('[Discovery] Kalshi fetch error:', e);
            errors++;
        }
        console.log(`[Discovery] ${newKalshiMarkets} new Kalshi markets`);
        // PASO 2: Detectar markets nuevos de Polymarket
        // Fetcha los eventos más recientes y compara contra DB
        console.log('[Discovery] Checking for new Polymarket markets...');
        const newPolyIds = [];
        try {
            const response = await fetch('https://gamma-api.polymarket.com/events?active=true&closed=false&limit=100&offset=0', {
                headers: {
                    Accept: 'application/json'
                }
            });
            if (response.ok) {
                const events = await response.json();
                const allMarkets = [];
                for (const event of events || []){
                    const markets = event.markets?.length > 0 ? event.markets : [
                        event
                    ];
                    for (const market of markets){
                        const externalId = String(market.id ?? market.conditionId ?? '');
                        if (externalId) {
                            allMarkets.push({
                                market: {
                                    ...market
                                },
                                event: {
                                    id: event.id,
                                    slug: event.slug,
                                    title: event.title
                                }
                            });
                        }
                    }
                }
                if (allMarkets.length > 0) {
                    const externalIds = allMarkets.map((m)=>String(m.market.id ?? m.market.conditionId ?? ''));
                    const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.findMany({
                        where: {
                            platform: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].POLYMARKET,
                            externalId: {
                                in: externalIds
                            }
                        },
                        select: {
                            externalId: true
                        }
                    });
                    const existingSet = new Set(existing.map((m)=>m.externalId));
                    for (const { market, event } of allMarkets){
                        const externalId = String(market.id ?? market.conditionId ?? '');
                        if (!externalId || existingSet.has(externalId)) continue;
                        try {
                            const normalized = polyService.normalizeMarket(market, event);
                            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.create({
                                data: normalized
                            });
                            newPolyIds.push(externalId);
                            newPolyMarkets++;
                        } catch  {
                            errors++;
                        }
                    }
                }
            }
        } catch (e) {
            console.error('[Discovery] Polymarket fetch error:', e);
            errors++;
        }
        console.log(`[Discovery] ${newPolyMarkets} new Polymarket markets`);
        // Actualizar SyncLogs
        if (newKalshiMarkets > 0) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].syncLog.create({
                data: {
                    platform: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].KALSHI,
                    lastSyncedAt: new Date(),
                    marketsCount: newKalshiMarkets,
                    duration: Math.round((Date.now() - startedAt) / 1000),
                    errors
                }
            });
        }
        if (newPolyMarkets > 0) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].syncLog.create({
                data: {
                    platform: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].POLYMARKET,
                    lastSyncedAt: new Date(),
                    marketsCount: newPolyMarkets,
                    duration: Math.round((Date.now() - startedAt) / 1000),
                    errors
                }
            });
        }
        // PASO 3: Matching de markets nuevos
        if ((newKalshiMarkets > 0 || newPolyMarkets > 0) && Date.now() - startedAt < MAX_DURATION) {
            console.log('[Discovery] Running matcher on new markets...');
            // Obtener los markets recién insertados
            const newKalshi = newKalshiIds.length > 0 ? await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.findMany({
                where: {
                    platform: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].KALSHI,
                    externalId: {
                        in: newKalshiIds
                    }
                }
            }) : [];
            const newPoly = newPolyIds.length > 0 ? await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.findMany({
                where: {
                    platform: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].POLYMARKET,
                    externalId: {
                        in: newPolyIds
                    }
                }
            }) : [];
            // Pool de candidatos
            const polyPool = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.findMany({
                where: {
                    platform: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].POLYMARKET,
                    active: true
                },
                orderBy: {
                    volume24h: 'desc'
                },
                take: 2000
            });
            const kalshiPool = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.findMany({
                where: {
                    platform: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].KALSHI,
                    active: true
                },
                orderBy: {
                    volume24h: 'desc'
                },
                take: 2000
            });
            // Nuevos Kalshi contra pool Polymarket
            for (const kalshiMarket of newKalshi){
                if (Date.now() - startedAt > MAX_DURATION) break;
                if (pairsEvaluated >= MAX_PAIRS_TO_EVALUATE) break;
                const candidates = matcherService.findMatchesFromCandidates(kalshiMarket, polyPool, MIN_KEYWORD_SCORE);
                for (const candidate of candidates.slice(0, 3)){
                    if (Date.now() - startedAt > MAX_DURATION) break;
                    if (pairsEvaluated >= MAX_PAIRS_TO_EVALUATE) break;
                    const polyMarket = candidate.market;
                    const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].marketMatch.findFirst({
                        where: {
                            OR: [
                                {
                                    marketAId: kalshiMarket.id,
                                    marketBId: polyMarket.id
                                },
                                {
                                    marketAId: polyMarket.id,
                                    marketBId: kalshiMarket.id
                                }
                            ]
                        }
                    });
                    if (existing) continue;
                    try {
                        pairsEvaluated++;
                        const result = await semanticMatcher.evaluatePair(kalshiMarket, polyMarket);
                        if (result.isEquivalent) {
                            newMatches++;
                            console.log(`[Discovery] MATCH: ${kalshiMarket.question.slice(0, 60)} ↔ ${polyMarket.question.slice(0, 60)}`);
                        }
                        await new Promise((r)=>setTimeout(r, RATE_LIMIT_DELAY));
                    } catch  {
                        errors++;
                    }
                }
            }
            // Nuevos Polymarket contra pool Kalshi
            for (const polyMarket of newPoly){
                if (Date.now() - startedAt > MAX_DURATION) break;
                if (pairsEvaluated >= MAX_PAIRS_TO_EVALUATE) break;
                const candidates = matcherService.findMatchesFromCandidates(polyMarket, kalshiPool, MIN_KEYWORD_SCORE);
                for (const candidate of candidates.slice(0, 3)){
                    if (Date.now() - startedAt > MAX_DURATION) break;
                    if (pairsEvaluated >= MAX_PAIRS_TO_EVALUATE) break;
                    const kalshiMarket = candidate.market;
                    const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].marketMatch.findFirst({
                        where: {
                            OR: [
                                {
                                    marketAId: polyMarket.id,
                                    marketBId: kalshiMarket.id
                                },
                                {
                                    marketAId: kalshiMarket.id,
                                    marketBId: polyMarket.id
                                }
                            ]
                        }
                    });
                    if (existing) continue;
                    try {
                        pairsEvaluated++;
                        const result = await semanticMatcher.evaluatePair(polyMarket, kalshiMarket);
                        if (result.isEquivalent) {
                            newMatches++;
                            console.log(`[Discovery] MATCH: ${polyMarket.question.slice(0, 60)} ↔ ${kalshiMarket.question.slice(0, 60)}`);
                        }
                        await new Promise((r)=>setTimeout(r, RATE_LIMIT_DELAY));
                    } catch  {
                        errors++;
                    }
                }
            }
        } else {
            console.log('[Discovery] No new markets, skipping matching');
        }
        const duration = Date.now() - startedAt;
        console.log(`[Discovery] Done: ${newKalshiMarkets} new Kalshi, ${newPolyMarkets} new Poly, ${pairsEvaluated} pairs evaluated, ${newMatches} new matches in ${duration}ms`);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            newKalshiMarkets,
            newPolyMarkets,
            pairsEvaluated,
            newMatches,
            errors,
            durationMs: duration,
            runAt: new Date().toISOString()
        });
    } catch (err) {
        console.error('[Discovery] Fatal error:', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err instanceof Error ? err.message : 'Unknown error'
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c7aa9cd5._.js.map