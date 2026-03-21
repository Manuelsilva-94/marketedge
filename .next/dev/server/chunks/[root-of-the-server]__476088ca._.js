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
            url: `https://kalshi.com/markets/${raw.ticker.toLowerCase()}`,
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
"[project]/app/api/admin/debug-kalshi-pages/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$kalshi$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/kalshi.service.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$kalshi$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$kalshi$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const dynamic = 'force-dynamic';
const maxDuration = 60;
const KALSHI_PARLAY_PREFIXES = [
    'KXMVE',
    'KXMULTI',
    'KXCOMBO',
    'KXPARLAY'
];
function isParlay(ticker) {
    return KALSHI_PARLAY_PREFIXES.some((p)=>ticker.startsWith(p));
}
async function GET() {
    const kalshiService = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$kalshi$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KalshiService"]();
    const pageStats = [];
    let cursor;
    for(let page = 1; page <= 15; page++){
        const response = await kalshiService.getMarkets({
            status: 'open',
            limit: 200,
            cursor
        });
        const markets = response.markets ?? [];
        if (markets.length === 0) break;
        const parlays = markets.filter((m)=>isParlay(m.ticker));
        const normal = markets.filter((m)=>!isParlay(m.ticker));
        pageStats.push({
            page,
            total: markets.length,
            parlays: parlays.length,
            normal: normal.length,
            sampleNormal: normal.slice(0, 3).map((m)=>m.ticker),
            sampleParlay: parlays.slice(0, 2).map((m)=>m.ticker),
            cursor: response.cursor ?? null
        });
        cursor = response.cursor;
        if (!cursor) break;
        await new Promise((r)=>setTimeout(r, 200));
    }
    // También testear Polymarket directamente
    let polymarketStatus = '';
    try {
        const res = await fetch('https://gamma-api.polymarket.com/events?active=true&closed=false&limit=5&offset=0', {
            headers: {
                Accept: 'application/json'
            }
        });
        polymarketStatus = `HTTP ${res.status} — ${res.ok ? 'OK' : await res.text()}`;
    } catch (err) {
        polymarketStatus = `FETCH ERROR: ${err instanceof Error ? err.message : String(err)}`;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        pageStats,
        polymarketStatus
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__476088ca._.js.map