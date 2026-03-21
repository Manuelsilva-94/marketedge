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
   * Calcula similarity score entre dos sets de keywords
   */ calculateKeywordSimilarity(keywords1, keywords2) {
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
        return union > 0 ? intersection / union : 0;
    }
    /**
   * Calcula el match score entre dos markets
   */ scoreMatch(sourceKeywords, targetMarket, targetKeywords) {
        const similarity = this.calculateKeywordSimilarity(sourceKeywords, targetKeywords);
        const flags = [];
        let matchType;
        if (similarity >= 0.9) {
            matchType = 'STRICT';
        } else if (similarity >= 0.75) {
            matchType = 'FUZZY';
            flags.push('FUZZY_MATCH');
        } else if (similarity >= 0.6) {
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
            score: similarity,
            matchType,
            flags
        };
    }
    /**
   * Encuentra markets equivalentes en otras plataformas
   */ async findMatches(sourceMarket, minScore = 0.75) {
        console.log(`\n🔍 Finding matches for: "${sourceMarket.question}"`);
        const { normalized, keywords } = this.normalizer.normalize(sourceMarket.question);
        console.log(`   Normalized: "${normalized}"`);
        console.log(`   Keywords: [${keywords.join(', ')}]`);
        const candidates = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.findMany({
            where: {
                platform: {
                    not: sourceMarket.platform
                },
                active: true
            },
            take: 1000
        });
        console.log(`   Found ${candidates.length} candidates to compare`);
        const results = [];
        for (const candidate of candidates){
            const candidateNormalized = this.normalizer.normalize(candidate.question);
            const matchResult = this.scoreMatch(keywords, candidate, candidateNormalized.keywords);
            if (matchResult.score >= minScore) {
                results.push(matchResult);
            }
        }
        results.sort((a, b)=>b.score - a.score);
        console.log(`   ✅ Found ${results.length} matches above ${minScore}`);
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
"[project]/lib/services/comparison.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "ComparisonService",
    ()=>ComparisonService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/matcher.service.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
class ComparisonService {
    matcher;
    constructor(){
        this.matcher = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MatcherService"]();
    }
    /**
   * Calcula el precio efectivo después de fees
   */ calculateEffectivePrice(market, side) {
        const basePrice = side === 'YES' ? market.yesPrice ?? 0.5 : market.noPrice ?? 0.5;
        if (market.platform === 'POLYMARKET') {
            const fee = market.takerFee ?? 0.02;
            return basePrice * (1 + fee);
        }
        if (market.platform === 'KALSHI') {
            const payout = 1 - basePrice;
            const fee = 0.07 * payout;
            return basePrice + fee;
        }
        return basePrice;
    }
    /**
   * Detecta oportunidades de arbitraje
   */ detectArbitrage(markets) {
        if (markets.length < 2) return null;
        const pricesWithFees = markets.map((m)=>({
                market: m,
                effectiveYes: this.calculateEffectivePrice(m, 'YES'),
                effectiveNo: this.calculateEffectivePrice(m, 'NO')
            }));
        const bestYes = pricesWithFees.reduce((min, curr)=>curr.effectiveYes < min.effectiveYes ? curr : min);
        const bestNo = pricesWithFees.reduce((min, curr)=>curr.effectiveNo < min.effectiveNo ? curr : min);
        const totalCost = bestYes.effectiveYes + bestNo.effectiveNo;
        if (totalCost < 0.98) {
            const profit = 1.0 - totalCost;
            const roi = totalCost > 0 ? profit / totalCost * 100 : 0;
            return {
                exists: true,
                type: 'cross-platform',
                roi,
                profit,
                strategy: `Buy YES on ${bestYes.market.platform} at $${bestYes.effectiveYes.toFixed(3)}, buy NO on ${bestNo.market.platform} at $${bestNo.effectiveNo.toFixed(3)}. Guaranteed profit: $${profit.toFixed(3)} per $1 bet (${roi.toFixed(2)}% ROI)`
            };
        }
        return null;
    }
    /**
   * Compara un market con sus equivalentes
   */ async compareMarket(marketId) {
        const sourceMarket = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.findUnique({
            where: {
                id: marketId
            }
        });
        if (!sourceMarket) {
            throw new Error('Market not found');
        }
        console.log(`\n📊 Comparing market: "${sourceMarket.question}"`);
        console.log(`   Platform: ${sourceMarket.platform}`);
        const matchResults = await this.matcher.findMatches(sourceMarket, 0.7);
        console.log(`   Found ${matchResults.length} matches`);
        const sourceData = {
            id: sourceMarket.id,
            platform: sourceMarket.platform,
            question: sourceMarket.question,
            yesPrice: sourceMarket.yesPrice ?? 0.5,
            noPrice: sourceMarket.noPrice ?? 0.5,
            effectiveYes: this.calculateEffectivePrice(sourceMarket, 'YES'),
            effectiveNo: this.calculateEffectivePrice(sourceMarket, 'NO'),
            fees: sourceMarket.takerFee ?? 0,
            liquidity: sourceMarket.liquidity,
            volume24h: sourceMarket.volume24h,
            volumeTotal: sourceMarket.volumeTotal,
            endDate: sourceMarket.endDate?.toISOString(),
            category: sourceMarket.category ?? undefined,
            lastSyncedAt: sourceMarket.lastSyncedAt.toISOString(),
            url: sourceMarket.url ?? ''
        };
        const matchesData = matchResults.map((m)=>({
                id: m.market.id,
                platform: m.market.platform,
                question: m.market.question,
                yesPrice: m.market.yesPrice ?? 0.5,
                noPrice: m.market.noPrice ?? 0.5,
                effectiveYes: this.calculateEffectivePrice(m.market, 'YES'),
                effectiveNo: this.calculateEffectivePrice(m.market, 'NO'),
                fees: m.market.takerFee ?? 0,
                liquidity: m.market.liquidity,
                volume24h: m.market.volume24h,
                volumeTotal: m.market.volumeTotal,
                endDate: m.market.endDate?.toISOString(),
                category: m.market.category ?? undefined,
                lastSyncedAt: m.market.lastSyncedAt.toISOString(),
                url: m.market.url ?? '',
                matchScore: m.score,
                matchType: m.matchType
            }));
        const allMarkets = [
            sourceMarket,
            ...matchResults.map((m)=>m.market)
        ];
        const allData = [
            sourceData,
            ...matchesData
        ];
        const bestYes = allData.reduce((min, curr)=>curr.effectiveYes < min.effectiveYes ? curr : min);
        const bestNo = allData.reduce((min, curr)=>curr.effectiveNo < min.effectiveNo ? curr : min);
        const worstYes = allData.reduce((max, curr)=>curr.effectiveYes > max.effectiveYes ? curr : max);
        const worstNo = allData.reduce((max, curr)=>curr.effectiveNo > max.effectiveNo ? curr : max);
        const arbitrage = this.detectArbitrage(allMarkets);
        console.log(`   Best YES: ${bestYes.platform} at $${bestYes.effectiveYes.toFixed(3)}`);
        console.log(`   Best NO: ${bestNo.platform} at $${bestNo.effectiveNo.toFixed(3)}`);
        if (arbitrage) {
            console.log(`   🎯 ARBITRAGE: ${arbitrage.roi.toFixed(2)}% ROI`);
        }
        return {
            sourceMarket: sourceData,
            matches: matchesData,
            bestDeal: {
                yes: {
                    platform: bestYes.platform,
                    price: bestYes.yesPrice,
                    effectivePrice: bestYes.effectiveYes,
                    savingsVsWorst: worstYes.effectiveYes - bestYes.effectiveYes
                },
                no: {
                    platform: bestNo.platform,
                    price: bestNo.noPrice,
                    effectivePrice: bestNo.effectiveNo,
                    savingsVsWorst: worstNo.effectiveNo - bestNo.effectiveNo
                }
            },
            arbitrage: arbitrage ?? undefined
        };
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
   * Obtiene un market por id/conditionId (para precios live)
   */ async getMarket(id) {
        try {
            const response = await fetch(`${this.gammaUrl}/markets/${encodeURIComponent(id)}`, {
                headers: {
                    Accept: 'application/json'
                }
            });
            if (!response.ok) return null;
            const data = await response.json();
            const op = data.outcomePrices;
            if (typeof op !== 'string') return null;
            const parsed = JSON.parse(op);
            if (!Array.isArray(parsed) || parsed.length < 2) return null;
            const yesPrice = parseFloat(parsed[0]);
            const noPrice = parseFloat(parsed[1]);
            if (Number.isNaN(yesPrice) || Number.isNaN(noPrice)) return null;
            return {
                yesPrice,
                noPrice
            };
        } catch  {
            return null;
        }
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
   * Obtiene un market por ticker (para precios live)
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
   * Normaliza un market de Kalshi a nuestro formato (sin event)
   */ normalizeMarket(raw) {
        return {
            platform: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Platform"].KALSHI,
            externalId: raw.ticker,
            question: raw.title,
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
            eventId: raw.event_ticker || null,
            eventSlug: raw.event_ticker || null,
            eventTitle: null,
            seriesId: null,
            lastSyncedAt: new Date()
        };
    }
    /**
   * Normaliza un market de Kalshi con event (para full sync desde /events)
   * Usa market.title para question, extrae eventId/eventSlug/eventTitle del event
   */ normalizeMarketFromEvent(market, event) {
        const base = this.normalizeMarket(market);
        return {
            ...base,
            question: market.title,
            eventId: event.event_ticker || market.event_ticker || null,
            eventSlug: event.event_ticker || market.event_ticker || null,
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
"[project]/app/api/arbitrage/opportunities/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/matcher.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$comparison$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/comparison.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$polymarket$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/polymarket.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$kalshi$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/kalshi.service.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$comparison$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$polymarket$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$kalshi$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$comparison$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$polymarket$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$kalshi$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
const dynamic = 'force-dynamic';
const maxDuration = 20;
const TIMEOUT_MS = 15_000;
const BATCH_SIZE = 10;
const BATCH_DELAY_MS = 200;
const MIN_MATCH_SCORE = 0.75;
function effectiveYesPrice(price, platform) {
    if (platform === 'POLYMARKET') return price * 1.02;
    if (platform === 'KALSHI') return price + 0.07 * (1 - price);
    return price;
}
function effectiveNoPrice(price, platform) {
    if (platform === 'POLYMARKET') return price * 1.02;
    if (platform === 'KALSHI') return price + 0.07 * (1 - price);
    return price;
}
async function fetchPolymarketPrices(externalId, polyService) {
    return polyService.getMarket(externalId);
}
async function fetchKalshiPrices(ticker, kalshiService) {
    const m = await kalshiService.getMarket(ticker);
    if (!m) return null;
    const yesPrice = m.last_price ?? m.yes_ask ?? m.yes_bid ?? 0.5;
    const noPrice = 1 - yesPrice;
    return {
        yesPrice,
        noPrice
    };
}
async function GET(req) {
    const generatedAt = new Date().toISOString();
    const searchParams = req.nextUrl.searchParams;
    const minRoiParam = searchParams.get('minRoi') ?? '0.01';
    const category = searchParams.get('category') || undefined;
    const sort = searchParams.get('sort') ?? 'roi';
    const limitParam = searchParams.get('limit') ?? '20';
    const limit = Math.min(Math.max(parseInt(limitParam, 10) || 20, 1), 50);
    const minRoiPercent = parseFloat(minRoiParam) * 100;
    const polyService = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$polymarket$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PolymarketService"]();
    let kalshiService = null;
    try {
        kalshiService = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$kalshi$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KalshiService"]();
    } catch  {
    // Kalshi auth not configured
    }
    const whereBase = {
        active: true,
        volume24h: {
            gt: 1000
        },
        ...category && {
            category: {
                contains: category,
                mode: 'insensitive'
            }
        }
    };
    const select = {
        id: true,
        platform: true,
        question: true,
        category: true,
        volume24h: true,
        url: true,
        externalId: true,
        slug: true,
        takerFee: true
    };
    const timeoutPromise = new Promise((_, reject)=>{
        setTimeout(()=>reject(new Error('TIMEOUT')), TIMEOUT_MS);
    });
    const scanPromise = (async ()=>{
        const [polyMarkets, kalshiMarkets] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.findMany({
                where: {
                    ...whereBase,
                    platform: 'POLYMARKET'
                },
                orderBy: {
                    volume24h: 'desc'
                },
                take: 100,
                select
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.findMany({
                where: {
                    ...whereBase,
                    platform: 'KALSHI'
                },
                orderBy: {
                    volume24h: 'desc'
                },
                take: 100,
                select
            })
        ]);
        const matcher = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MatcherService"]();
        const comparisonService = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$comparison$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ComparisonService"]();
        const pairs = [];
        for (const poly of polyMarkets){
            const fullPoly = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.findUnique({
                where: {
                    id: poly.id
                }
            });
            if (!fullPoly) continue;
            const matches = await matcher.findMatches(fullPoly, MIN_MATCH_SCORE);
            for (const m of matches){
                const kalshiRow = kalshiMarkets.find((k)=>k.id === m.market.id);
                if (kalshiRow) {
                    pairs.push({
                        poly,
                        kalshi: kalshiRow,
                        matchScore: m.score,
                        matchType: m.matchType || 'RELATED'
                    });
                    break; // best match only per poly
                }
            }
        }
        const opportunities = [];
        const now = new Date().toISOString();
        for(let i = 0; i < pairs.length; i += BATCH_SIZE){
            const batch = pairs.slice(i, i + BATCH_SIZE);
            const results = await Promise.allSettled(batch.map(async (pair)=>{
                const [polyPrices, kalshiPrices] = await Promise.all([
                    fetchPolymarketPrices(pair.poly.externalId, polyService),
                    kalshiService ? fetchKalshiPrices(pair.kalshi.externalId, kalshiService) : Promise.resolve(null)
                ]);
                const yesPoly = polyPrices?.yesPrice ?? 0.5;
                const noPoly = polyPrices?.noPrice ?? 0.5;
                const yesKalshi = kalshiPrices?.yesPrice ?? 0.5;
                const noKalshi = kalshiPrices?.noPrice ?? 0.5;
                const polyWithPrices = {
                    ...pair.poly,
                    platform: 'POLYMARKET',
                    yesPrice: yesPoly,
                    noPrice: noPoly,
                    takerFee: pair.poly.takerFee ?? 0.02
                };
                const kalshiWithPrices = {
                    ...pair.kalshi,
                    platform: 'KALSHI',
                    yesPrice: yesKalshi,
                    noPrice: noKalshi,
                    takerFee: pair.kalshi.takerFee ?? 0.07
                };
                const arbitrage = comparisonService.detectArbitrage([
                    polyWithPrices,
                    kalshiWithPrices
                ]);
                if (!arbitrage || arbitrage.roi < minRoiPercent) return null;
                const effYesPoly = effectiveYesPrice(yesPoly, 'POLYMARKET');
                const effYesKalshi = effectiveYesPrice(yesKalshi, 'KALSHI');
                const effNoPoly = effectiveNoPrice(noPoly, 'POLYMARKET');
                const effNoKalshi = effectiveNoPrice(noKalshi, 'KALSHI');
                const bestYesPlatform = effYesPoly <= effYesKalshi ? 'POLYMARKET' : 'KALSHI';
                const bestNoPlatform = effNoPoly <= effNoKalshi ? 'POLYMARKET' : 'KALSHI';
                const buyYesOn = bestYesPlatform;
                const buyNoOn = bestNoPlatform;
                return {
                    id: `${pair.poly.id}-${pair.kalshi.id}`,
                    question: pair.poly.question,
                    category: pair.poly.category,
                    roi: arbitrage.roi,
                    matchScore: pair.matchScore,
                    matchType: pair.matchType,
                    polymarket: {
                        id: pair.poly.id,
                        yesPrice: yesPoly,
                        noPrice: noPoly,
                        effectiveYesPrice: effYesPoly,
                        volume24h: pair.poly.volume24h,
                        url: pair.poly.url
                    },
                    kalshi: {
                        id: pair.kalshi.id,
                        yesPrice: yesKalshi,
                        noPrice: noKalshi,
                        effectiveYesPrice: effYesKalshi,
                        volume24h: pair.kalshi.volume24h,
                        url: pair.kalshi.url
                    },
                    buyYesOn: buyYesOn,
                    buyNoOn: buyNoOn,
                    totalVolume24h: pair.poly.volume24h + pair.kalshi.volume24h,
                    detectedAt: now
                };
            }));
            for (const r of results){
                if (r.status === 'fulfilled' && r.value) opportunities.push(r.value);
            }
            if (i + BATCH_SIZE < pairs.length) {
                await new Promise((r)=>setTimeout(r, BATCH_DELAY_MS));
            }
        }
        if (sort === 'volume') {
            opportunities.sort((a, b)=>b.totalVolume24h - a.totalVolume24h);
        } else if (sort === 'newest') {
            opportunities.sort((a, b)=>new Date(b.detectedAt).getTime() - new Date(a.detectedAt).getTime());
        } else {
            opportunities.sort((a, b)=>b.roi - a.roi);
        }
        const top = opportunities.slice(0, limit);
        return {
            opportunities: top,
            count: top.length,
            scannedPairs: pairs.length,
            generatedAt
        };
    })();
    try {
        const data = await Promise.race([
            scanPromise,
            timeoutPromise
        ]);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data, {
            headers: {
                'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=60'
            }
        });
    } catch (err) {
        if (err instanceof Error && err.message === 'TIMEOUT') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                opportunities: [],
                count: 0,
                scannedPairs: 0,
                generatedAt,
                error: 'Scan timed out after 15s'
            }, {
                status: 200
            });
        }
        console.error('❌ Arbitrage opportunities error:', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            opportunities: [],
            count: 0,
            scannedPairs: 0,
            generatedAt,
            error: err instanceof Error ? err.message : 'Unknown error'
        }, {
            status: 200
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6107f03c._.js.map