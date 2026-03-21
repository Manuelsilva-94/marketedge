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
"[project]/app/api/compare/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$comparison$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/comparison.service.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$comparison$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$comparison$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const dynamic = 'force-dynamic';
async function GET(_request, context) {
    try {
        const { id: marketId } = await context.params;
        const dbMarket = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.findUnique({
            where: {
                id: marketId
            },
            select: {
                id: true,
                platform: true,
                question: true,
                category: true,
                tags: true,
                endDate: true,
                volume24h: true,
                volumeTotal: true,
                liquidity: true,
                url: true,
                eventTitle: true,
                makerFee: true,
                takerFee: true
            }
        });
        if (!dbMarket) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                market: null,
                matches: [],
                arbitrage: null,
                error: 'Market not found'
            }, {
                status: 404
            });
        }
        const comparisonService = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$comparison$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ComparisonService"]();
        const result = await comparisonService.compareMarket(marketId);
        const effectiveYes = result.sourceMarket.yesPrice != null ? result.sourceMarket.effectiveYes : null;
        const response = {
            market: {
                id: dbMarket.id,
                platform: dbMarket.platform,
                question: dbMarket.question,
                category: dbMarket.category,
                tags: dbMarket.tags ?? [],
                endDate: dbMarket.endDate?.toISOString() ?? null,
                volume24h: dbMarket.volume24h,
                volumeTotal: dbMarket.volumeTotal,
                liquidity: dbMarket.liquidity,
                url: dbMarket.url,
                eventTitle: dbMarket.eventTitle,
                yesPrice: result.sourceMarket.yesPrice ?? null,
                noPrice: result.sourceMarket.noPrice ?? null,
                effectiveYesPrice: effectiveYes,
                makerFee: dbMarket.makerFee,
                takerFee: dbMarket.takerFee
            },
            matches: result.matches.map((m)=>({
                    market: {
                        id: m.id,
                        platform: m.platform,
                        question: m.question,
                        url: m.url ?? null,
                        yesPrice: m.yesPrice ?? null,
                        noPrice: m.noPrice ?? null,
                        effectiveYesPrice: m.effectiveYes ?? null
                    },
                    matchScore: m.matchScore,
                    matchType: m.matchType || 'RELATED'
                })),
            arbitrage: result.arbitrage ? {
                detected: result.arbitrage.exists,
                roi: result.arbitrage.roi ?? null,
                buyYesOn: result.arbitrage.exists ? result.bestDeal.yes.platform : null,
                buyNoOn: result.arbitrage.exists ? result.bestDeal.no.platform : null,
                explanation: result.arbitrage.strategy ?? null
            } : {
                detected: false,
                roi: null,
                buyYesOn: null,
                buyNoOn: null,
                explanation: null
            },
            error: null
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(response);
    } catch (error) {
        console.error('❌ Compare error:', error);
        if (error instanceof Error && error.message === 'Market not found') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                market: null,
                matches: [],
                arbitrage: null,
                error: 'Market not found'
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            market: null,
            matches: [],
            arbitrage: null,
            error: error instanceof Error ? error.message : 'Comparison failed'
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6e7c0873._.js.map