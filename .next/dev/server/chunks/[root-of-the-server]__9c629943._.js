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
"[project]/lib/services/comparison.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "ComparisonService",
    ()=>ComparisonService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/matcher.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$polymarket$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/polymarket.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$kalshi$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/kalshi.service.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$polymarket$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$kalshi$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$polymarket$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$kalshi$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
class ComparisonService {
    matcher;
    constructor(){
        this.matcher = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MatcherService"]();
    }
    /**
   * Calcula el precio efectivo después de fees.
   *
   * POLYMARKET: feesEnabled=false para la mayoría → sin fees por ahora.
   * KALSHI: fee = 7% × P × (1 - P) por contrato.
   */ calculateEffectivePrice(price, platform) {
        if (platform === 'POLYMARKET') {
            return price;
        }
        if (platform === 'KALSHI') {
            const fee = 0.07 * price * (1 - price);
            return price + fee;
        }
        return price;
    }
    /**
   * Detecta arbitraje YES+NO entre dos markets.
   * Opción A: YES en base + NO en match. Opción B: YES en match + NO en base.
   */ detectArbitragePair(baseMarket, matchMarket) {
        if (!baseMarket.yesPrice || !matchMarket.yesPrice) {
            return {
                detected: false,
                roi: null,
                buyYesOn: null,
                sellYesOn: null,
                buyNoOn: null,
                explanation: null
            };
        }
        // Filtrar precios extremos (mercado resuelto o sin liquidez)
        if (baseMarket.yesPrice <= 0.001 || baseMarket.yesPrice >= 0.999 || matchMarket.yesPrice <= 0.001 || matchMarket.yesPrice >= 0.999) {
            console.log('[Arbitrage] ⚠️ Extreme price detected - market likely resolved, skipping');
            return {
                detected: false,
                roi: null,
                buyYesOn: null,
                sellYesOn: null,
                buyNoOn: null,
                explanation: null
            };
        }
        const baseYes = baseMarket.yesPrice;
        const baseNo = baseMarket.noPrice ?? 1 - baseYes;
        const matchYes = matchMarket.yesPrice;
        const matchNo = matchMarket.noPrice ?? 1 - matchYes;
        const baseEffYes = this.calculateEffectivePrice(baseYes, baseMarket.platform);
        const baseEffNo = this.calculateEffectivePrice(baseNo, baseMarket.platform);
        const matchEffYes = this.calculateEffectivePrice(matchYes, matchMarket.platform);
        const matchEffNo = this.calculateEffectivePrice(matchNo, matchMarket.platform);
        const totalA = baseEffYes + matchEffNo;
        const roiA = totalA < 1 ? (1 - totalA) / totalA : 0;
        const totalB = matchEffYes + baseEffNo;
        const roiB = totalB < 1 ? (1 - totalB) / totalB : 0;
        const bestRoi = Math.max(roiA, roiB);
        const useOptionA = roiA >= roiB;
        // Sanity check: ROI > 20% indica match incorrecto (mercados eficientes: 0.5% - 5%)
        if (bestRoi > 0.2) {
            console.log(`[Arbitrage] ⚠️ ROI ${(bestRoi * 100).toFixed(1)}% too high - likely bad match, skipping`);
            return {
                detected: false,
                roi: null,
                buyYesOn: null,
                sellYesOn: null,
                buyNoOn: null,
                explanation: null
            };
        }
        console.log(`[Arbitrage] ${baseMarket.platform} YES: ${baseYes} → eff: ${baseEffYes}`);
        console.log(`[Arbitrage] ${matchMarket.platform} NO: ${matchNo} → eff: ${matchEffNo}`);
        console.log(`[Arbitrage] Option A total: ${totalA} → ROI: ${(roiA * 100).toFixed(2)}%`);
        console.log(`[Arbitrage] Option B total: ${totalB} → ROI: ${(roiB * 100).toFixed(2)}%`);
        if (bestRoi > 0.005) {
            const buyYesOn = useOptionA ? baseMarket.platform : matchMarket.platform;
            const buyNoOn = useOptionA ? matchMarket.platform : baseMarket.platform;
            const cheapYes = useOptionA ? baseEffYes : matchEffYes;
            const cheapNo = useOptionA ? matchEffNo : baseEffNo;
            const totalCost = cheapYes + cheapNo;
            return {
                detected: true,
                roi: parseFloat((bestRoi * 100).toFixed(2)),
                buyYesOn,
                sellYesOn: buyNoOn,
                buyNoOn,
                explanation: `Buy YES on ${buyYesOn} at ${(cheapYes * 100).toFixed(1)}¢ + ` + `Buy NO on ${buyNoOn} at ${(cheapNo * 100).toFixed(1)}¢. ` + `Total cost: ${(totalCost * 100).toFixed(1)}¢. ` + `Guaranteed profit: ${(bestRoi * 100).toFixed(2)}% ROI.`
            };
        }
        return {
            detected: false,
            roi: null,
            buyYesOn: null,
            sellYesOn: null,
            buyNoOn: null,
            explanation: null
        };
    }
    /**
   * Detecta la mejor oportunidad de arbitraje entre base y sus matches.
   */ detectArbitrage(comparison) {
        const { sourceMarket, matches } = comparison;
        if (!sourceMarket.yesPrice || matches.length === 0) {
            return {
                detected: false,
                roi: null,
                buyYesOn: null,
                sellYesOn: null,
                buyNoOn: null,
                explanation: null
            };
        }
        const base = {
            yesPrice: sourceMarket.yesPrice,
            noPrice: sourceMarket.noPrice ?? 1 - sourceMarket.yesPrice,
            platform: sourceMarket.platform
        };
        let best = {
            detected: false,
            roi: null,
            buyYesOn: null,
            sellYesOn: null,
            buyNoOn: null,
            explanation: null
        };
        for (const m of matches){
            if (!m.yesPrice) continue;
            const match = {
                yesPrice: m.yesPrice,
                noPrice: m.noPrice ?? 1 - m.yesPrice,
                platform: m.platform
            };
            const result = this.detectArbitragePair(base, match);
            if (result.detected && result.roi != null && (best.roi == null || result.roi > best.roi)) {
                best = result;
            }
        }
        return best;
    }
    /**
   * Obtiene precios live para un market
   */ async fetchLivePrices(market) {
        const fallback = {
            yesPrice: 0.5,
            noPrice: 0.5
        };
        try {
            if (market.platform === 'POLYMARKET') {
                const poly = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$polymarket$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PolymarketService"]();
                const result = await poly.getLiveMarket({
                    externalId: market.externalId,
                    platform: 'POLYMARKET',
                    slug: market.slug
                });
                return result ? {
                    yesPrice: result.yesPrice,
                    noPrice: result.noPrice
                } : fallback;
            }
            if (market.platform === 'KALSHI') {
                const kalshi = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$kalshi$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KalshiService"]();
                const result = await kalshi.getLiveMarket({
                    externalId: market.externalId,
                    platform: 'KALSHI'
                });
                return result ? {
                    yesPrice: result.yesPrice,
                    noPrice: result.noPrice
                } : fallback;
            }
        } catch  {
        // Kalshi auth puede fallar si no está configurado
        }
        return fallback;
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
        // Fetch live prices for source and matches
        const [sourcePrices, ...matchPricesList] = await Promise.all([
            this.fetchLivePrices(sourceMarket),
            ...matchResults.map((m)=>this.fetchLivePrices(m.market))
        ]);
        const sourceWithPrices = {
            ...sourceMarket,
            ...sourcePrices
        };
        const matchesWithPrices = matchResults.map((m, i)=>({
                ...m,
                market: {
                    ...m.market,
                    ...matchPricesList[i]
                }
            }));
        const sourceData = {
            id: sourceMarket.id,
            platform: sourceMarket.platform,
            question: sourceMarket.question,
            yesPrice: sourceWithPrices.yesPrice,
            noPrice: sourceWithPrices.noPrice,
            effectiveYes: this.calculateEffectivePrice(sourceWithPrices.yesPrice ?? 0.5, sourceMarket.platform),
            effectiveNo: this.calculateEffectivePrice(sourceWithPrices.noPrice ?? 1 - (sourceWithPrices.yesPrice ?? 0.5), sourceMarket.platform),
            fees: sourceMarket.takerFee ?? 0,
            liquidity: sourceMarket.liquidity,
            volume24h: sourceMarket.volume24h,
            volumeTotal: sourceMarket.volumeTotal,
            endDate: sourceMarket.endDate?.toISOString(),
            category: sourceMarket.category ?? undefined,
            lastSyncedAt: sourceMarket.lastSyncedAt.toISOString(),
            url: sourceMarket.url ?? ''
        };
        const matchesData = matchesWithPrices.map((m)=>({
                id: m.market.id,
                platform: m.market.platform,
                question: m.market.question,
                yesPrice: m.market.yesPrice ?? 0.5,
                noPrice: m.market.noPrice ?? 0.5,
                effectiveYes: this.calculateEffectivePrice(m.market.yesPrice ?? 0.5, m.market.platform),
                effectiveNo: this.calculateEffectivePrice(m.market.noPrice ?? 1 - (m.market.yesPrice ?? 0.5), m.market.platform),
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
            sourceWithPrices,
            ...matchesWithPrices.map((m)=>m.market)
        ];
        const allData = [
            sourceData,
            ...matchesData
        ];
        const bestYes = allData.reduce((min, curr)=>curr.effectiveYes < min.effectiveYes ? curr : min);
        const bestNo = allData.reduce((min, curr)=>curr.effectiveNo < min.effectiveNo ? curr : min);
        const worstYes = allData.reduce((max, curr)=>curr.effectiveYes > max.effectiveYes ? curr : max);
        const worstNo = allData.reduce((max, curr)=>curr.effectiveNo > max.effectiveNo ? curr : max);
        const arbitrage = this.detectArbitrage({
            sourceMarket: sourceData,
            matches: matchesData
        });
        console.log(`   Best YES: ${bestYes.platform} at $${bestYes.effectiveYes.toFixed(3)}`);
        console.log(`   Best NO: ${bestNo.platform} at $${bestNo.effectiveNo.toFixed(3)}`);
        if (arbitrage.detected && arbitrage.roi != null) {
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
"[project]/lib/services/telegram.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TelegramService",
    ()=>TelegramService
]);
class TelegramService {
    botToken;
    chatId;
    baseUrl;
    constructor(){
        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;
        if (!token || !chatId) {
            throw new Error('TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be set');
        }
        this.botToken = token;
        this.chatId = chatId;
        this.baseUrl = `https://api.telegram.org/bot${token}`;
    }
    async sendMessage(text) {
        try {
            const response = await fetch(`${this.baseUrl}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: this.chatId,
                    text,
                    parse_mode: 'HTML',
                    disable_web_page_preview: true
                })
            });
            if (!response.ok) {
                const error = await response.text();
                console.error('[Telegram] Send failed:', error);
                return false;
            }
            return true;
        } catch (error) {
            console.error('[Telegram] Error:', error);
            return false;
        }
    }
    formatArbitrageAlert(opportunity) {
        const categoryTag = opportunity.category ? `#${opportunity.category.replace(/\s+/g, '')}` : '';
        const roiStr = opportunity.roi.toFixed(2);
        const buyYesPrice = opportunity.buyYesOn === 'POLYMARKET' ? (opportunity.polymarket.yesPrice * 100).toFixed(1) : (opportunity.kalshi.yesPrice * 100).toFixed(1);
        const buyNoPrice = opportunity.buyNoOn === 'POLYMARKET' ? (opportunity.polymarket.noPrice * 100).toFixed(1) : (opportunity.kalshi.noPrice * 100).toFixed(1);
        const buyYesPlatform = opportunity.buyYesOn === 'POLYMARKET' ? 'Polymarket' : 'Kalshi';
        const buyNoPlatform = opportunity.buyNoOn === 'POLYMARKET' ? 'Polymarket' : 'Kalshi';
        const polyUrl = opportunity.polymarket.url ?? 'https://polymarket.com';
        const kalshiUrl = opportunity.kalshi.url ?? 'https://kalshi.com';
        return [
            `🔔 <b>Arbitrage Alert</b> ${categoryTag}`,
            ``,
            `<b>${opportunity.question}</b>`,
            ``,
            `💰 ROI: <b>+${roiStr}%</b>`,
            ``,
            `📈 Buy YES on <b>${buyYesPlatform}</b> @ ${buyYesPrice}¢`,
            `📉 Buy NO on <b>${buyNoPlatform}</b> @ ${buyNoPrice}¢`,
            ``,
            `🔗 <a href="${polyUrl}">Polymarket</a> | <a href="${kalshiUrl}">Kalshi</a>`
        ].join('\n');
    }
}
}),
"[project]/app/api/cron/arbitrage-scanner/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$comparison$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/comparison.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$telegram$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/telegram.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$polymarket$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/polymarket.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$kalshi$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/kalshi.service.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$comparison$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$polymarket$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$kalshi$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$comparison$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$polymarket$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$kalshi$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
const dynamic = 'force-dynamic';
const maxDuration = 300;
function effectiveYesPrice(price, platform) {
    if (platform === 'KALSHI') return price + 0.07 * price * (1 - price);
    return price;
}
async function GET(req) {
    // Verificar authorization para evitar llamadas no autorizadas
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
    const MIN_ROI = 0.005; // 0.5% mínimo
    const BATCH_SIZE = 10;
    const newOpportunities = [];
    const closedOpportunities = [];
    let telegramService = null;
    try {
        telegramService = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$telegram$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TelegramService"]();
    } catch  {
        console.warn('[CronScanner] Telegram not configured, alerts disabled');
    }
    try {
        const polyService = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$polymarket$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PolymarketService"]();
        let kalshiService = null;
        try {
            kalshiService = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$kalshi$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KalshiService"]();
        } catch  {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Kalshi auth not configured'
            }, {
                status: 500
            });
        }
        const comparisonService = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$comparison$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ComparisonService"]();
        // PASO 1: Cargar pares verificados con volumen
        const verifiedPairs = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].marketMatch.findMany({
            where: {
                isEquivalent: true,
                confidence: {
                    gte: 0.82
                },
                marketA: {
                    active: true
                },
                marketB: {
                    active: true
                }
            },
            include: {
                marketA: {
                    select: {
                        id: true,
                        platform: true,
                        question: true,
                        externalId: true,
                        slug: true,
                        volume24h: true,
                        url: true,
                        category: true
                    }
                },
                marketB: {
                    select: {
                        id: true,
                        platform: true,
                        question: true,
                        externalId: true,
                        slug: true,
                        volume24h: true,
                        url: true,
                        category: true
                    }
                }
            }
        });
        // Normalizar: poly siempre es poly, kalshi siempre es kalshi
        const pairs = verifiedPairs.map((pair)=>{
            const poly = pair.marketA.platform === 'POLYMARKET' ? pair.marketA : pair.marketB;
            const kalshi = pair.marketA.platform === 'KALSHI' ? pair.marketA : pair.marketB;
            if (poly.platform !== 'POLYMARKET' || kalshi.platform !== 'KALSHI') return null;
            return {
                matchId: pair.id,
                poly,
                kalshi
            };
        }).filter((p)=>p !== null).filter((p)=>(p.poly.volume24h ?? 0) + (p.kalshi.volume24h ?? 0) > 100);
        console.log(`[CronScanner] ${pairs.length} pairs to scan`);
        // PASO 2: Fetch precios en batches y calcular arbitraje
        const detectedThisScan = new Map();
        for(let i = 0; i < pairs.length; i += BATCH_SIZE){
            const batch = pairs.slice(i, i + BATCH_SIZE);
            await Promise.allSettled(batch.map(async (pair)=>{
                try {
                    const [polyLive, kalshiLive] = await Promise.all([
                        polyService.getLiveMarket({
                            externalId: pair.poly.externalId,
                            platform: 'POLYMARKET',
                            slug: pair.poly.slug
                        }),
                        kalshiService.getLiveMarket({
                            externalId: pair.kalshi.externalId,
                            platform: 'KALSHI'
                        })
                    ]);
                    if (!polyLive?.yesPrice || !kalshiLive?.yesPrice) return;
                    const arbitrage = comparisonService.detectArbitrage({
                        sourceMarket: {
                            ...polyLive,
                            platform: 'POLYMARKET'
                        },
                        matches: [
                            {
                                ...kalshiLive,
                                platform: 'KALSHI'
                            }
                        ]
                    });
                    if (arbitrage.detected && arbitrage.roi !== null && arbitrage.roi / 100 >= MIN_ROI) {
                        detectedThisScan.set(pair.matchId, {
                            roi: arbitrage.roi,
                            polyPrice: polyLive.yesPrice,
                            kalshiPrice: kalshiLive.yesPrice,
                            buyYesOn: arbitrage.buyYesOn ?? 'POLYMARKET',
                            buyNoOn: arbitrage.buyNoOn ?? 'KALSHI'
                        });
                    }
                } catch  {
                // Silenciar errores individuales
                }
            }));
            // Pausa entre batches
            if (i + BATCH_SIZE < pairs.length) {
                await new Promise((r)=>setTimeout(r, 300));
            }
        }
        // Deduplicar por kalshi market: si el mismo market de Kalshi aparece en múltiples
        // oportunidades, quedarse solo con la de mayor ROI
        const deduplicatedScan = new Map();
        for (const [matchId, data] of detectedThisScan.entries()){
            // Obtener el kalshi market id para este matchId
            const pair = pairs.find((p)=>p.matchId === matchId);
            if (!pair) continue;
            const kalshiId = pair.kalshi.id;
            const existing = deduplicatedScan.get(kalshiId);
            if (!existing || data.roi > existing.roi) {
                deduplicatedScan.set(kalshiId, {
                    matchId,
                    ...data
                });
            }
        }
        // Convertir de vuelta a Map<matchId, data>
        const finalScan = new Map();
        for (const data of deduplicatedScan.values()){
            const { matchId, ...rest } = data;
            finalScan.set(matchId, rest);
        }
        console.log(`[CronScanner] ${detectedThisScan.size} opportunities detected, ${finalScan.size} after deduplication`);
        // PASO 3: Sincronizar con tabla ArbitrageOpportunity
        // 3a: Oportunidades activas actuales en DB
        const activeInDb = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].arbitrageOpportunity.findMany({
            where: {
                active: true
            },
            select: {
                id: true,
                matchId: true
            }
        });
        const activeMatchIds = new Set(activeInDb.map((o)=>o.matchId));
        // 3b: Nuevas oportunidades (detectadas pero no en DB activa)
        for (const [matchId, data] of finalScan.entries()){
            if (!activeMatchIds.has(matchId)) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].arbitrageOpportunity.create({
                    data: {
                        matchId,
                        roiPercent: data.roi,
                        buyYesOn: data.buyYesOn,
                        buyNoOn: data.buyNoOn,
                        polyPrice: data.polyPrice,
                        kalshiPrice: data.kalshiPrice,
                        active: true
                    }
                });
                newOpportunities.push(matchId);
                console.log(`[CronScanner] NEW opportunity: matchId=${matchId} ROI=${data.roi.toFixed(2)}%`);
                // Enviar alerta por Telegram
                if (telegramService && data.roi >= 1.0) {
                    try {
                        // Buscar datos del market para formatear el mensaje
                        const match = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].marketMatch.findUnique({
                            where: {
                                id: matchId
                            },
                            include: {
                                marketA: {
                                    select: {
                                        question: true,
                                        category: true,
                                        url: true,
                                        platform: true
                                    }
                                },
                                marketB: {
                                    select: {
                                        question: true,
                                        category: true,
                                        url: true,
                                        platform: true
                                    }
                                }
                            }
                        });
                        if (match) {
                            const polyMarket = match.marketA.platform === 'POLYMARKET' ? match.marketA : match.marketB;
                            const kalshiMarket = match.marketA.platform === 'KALSHI' ? match.marketA : match.marketB;
                            const message = telegramService.formatArbitrageAlert({
                                question: polyMarket.question,
                                roi: data.roi,
                                category: polyMarket.category,
                                buyYesOn: data.buyYesOn,
                                buyNoOn: data.buyNoOn,
                                polymarket: {
                                    yesPrice: data.polyPrice,
                                    noPrice: 1 - data.polyPrice,
                                    url: polyMarket.url
                                },
                                kalshi: {
                                    yesPrice: data.kalshiPrice,
                                    noPrice: 1 - data.kalshiPrice,
                                    url: kalshiMarket.url
                                }
                            });
                            await telegramService.sendMessage(message);
                        }
                    } catch (e) {
                        console.error('[CronScanner] Telegram alert failed:', e);
                    }
                }
            } else {
                // Actualizar precio y ROI de oportunidad existente
                const existing = activeInDb.find((o)=>o.matchId === matchId);
                if (existing) {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].arbitrageOpportunity.update({
                        where: {
                            id: existing.id
                        },
                        data: {
                            roiPercent: data.roi,
                            polyPrice: data.polyPrice,
                            kalshiPrice: data.kalshiPrice,
                            buyYesOn: data.buyYesOn,
                            buyNoOn: data.buyNoOn
                        }
                    });
                }
            }
        }
        // 3c: Cerrar oportunidades que ya no tienen arbitraje
        for (const active of activeInDb){
            if (!finalScan.has(active.matchId)) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].arbitrageOpportunity.update({
                    where: {
                        id: active.id
                    },
                    data: {
                        active: false,
                        closedAt: new Date()
                    }
                });
                closedOpportunities.push(active.matchId);
                console.log(`[CronScanner] CLOSED opportunity: matchId=${active.matchId}`);
            }
        }
        const duration = Date.now() - startedAt;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            scannedPairs: pairs.length,
            detectedCount: finalScan.size,
            newOpportunities: newOpportunities.length,
            closedOpportunities: closedOpportunities.length,
            durationMs: duration,
            runAt: new Date().toISOString()
        });
    } catch (err) {
        console.error('[CronScanner] Fatal error:', err);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__9c629943._.js.map