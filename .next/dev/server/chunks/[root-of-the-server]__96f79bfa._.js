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
"[project]/app/api/cron/match-new-markets/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$semantic$2d$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/semantic-matcher.service.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$semantic$2d$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$semantic$2d$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
const dynamic = 'force-dynamic';
const maxDuration = 300;
const CRON_SECRET = process.env.CRON_SECRET;
const MIN_KEYWORD_SCORE = 0.6;
const MAX_MARKETS_TO_PROCESS = 80;
const MAX_CANDIDATES_PER_MARKET = 3;
const GROQ_DELAY_MS = 1100;
function isAuthorized(req) {
    if ("TURBOPACK compile-time truthy", 1) return true;
    //TURBOPACK unreachable
    ;
    const auth = undefined;
}
async function GET(req) {
    if (!isAuthorized(req)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Unauthorized'
        }, {
            status: 401
        });
    }
    const startTime = Date.now();
    const MAX_DURATION_MS = 270_000; // 4.5 min — margen antes del timeout de 5min
    // Markets de Kalshi insertados en las últimas 12h sin ningún MarketMatch
    const since = new Date(Date.now() - 12 * 60 * 60 * 1000);
    const newKalshiMarkets = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.findMany({
        where: {
            platform: 'KALSHI',
            active: true,
            createdAt: {
                gte: since
            },
            AND: [
                {
                    matchesAsA: {
                        none: {}
                    }
                },
                {
                    matchesAsB: {
                        none: {}
                    }
                }
            ]
        },
        orderBy: {
            volume24h: 'desc'
        },
        take: MAX_MARKETS_TO_PROCESS
    });
    console.log(`[match-new] Found ${newKalshiMarkets.length} new Kalshi markets without match (last 12h)`);
    if (newKalshiMarkets.length === 0) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            processed: 0,
            pairsEvaluated: 0,
            newMatches: 0,
            durationMs: Date.now() - startTime,
            message: 'No new markets to match'
        });
    }
    // Cargar pool de Polymarket activos en memoria
    const polyPool = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.findMany({
        where: {
            platform: 'POLYMARKET',
            active: true
        },
        orderBy: {
            volume24h: 'desc'
        },
        take: 15000
    });
    console.log(`[match-new] Polymarket pool: ${polyPool.length} markets`);
    const matcher = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MatcherService"]();
    const semanticMatcher = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$semantic$2d$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SemanticMatcherService"]();
    let processed = 0;
    let pairsEvaluated = 0;
    let newMatches = 0;
    for (const kalshiMarket of newKalshiMarkets){
        if (Date.now() - startTime > MAX_DURATION_MS) {
            console.log(`[match-new] Time limit reached, stopping at ${processed}/${newKalshiMarkets.length}`);
            break;
        }
        const candidates = matcher.findMatchesFromCandidates(kalshiMarket, polyPool, MIN_KEYWORD_SCORE);
        if (candidates.length === 0) {
            processed++;
            continue;
        }
        const topCandidates = candidates.slice(0, MAX_CANDIDATES_PER_MARKET);
        console.log(`[match-new] ${kalshiMarket.question.slice(0, 50)} → ${topCandidates.length} candidates`);
        for (const candidate of topCandidates){
            if (Date.now() - startTime > MAX_DURATION_MS) break;
            // evaluatePair ya chequea cache y guarda en DB internamente
            const result = await semanticMatcher.evaluatePair(kalshiMarket, candidate.market);
            pairsEvaluated++;
            if (result.isEquivalent) {
                newMatches++;
                console.log(`[match-new] ✅ MATCH: ${kalshiMarket.question.slice(0, 40)} ↔ ${candidate.market.question.slice(0, 40)}`);
            }
            await new Promise((r)=>setTimeout(r, GROQ_DELAY_MS));
        }
        processed++;
    }
    const durationMs = Date.now() - startTime;
    console.log(`[match-new] Done: ${processed} processed, ${pairsEvaluated} pairs, ${newMatches} matches in ${durationMs}ms`);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        processed,
        pairsEvaluated,
        newMatches,
        durationMs,
        windowHours: 12,
        message: `${newMatches} new matches found from ${processed} new Kalshi markets`
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__96f79bfa._.js.map