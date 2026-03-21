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
        return `You are evaluating whether two prediction markets from different platforms are asking about the SAME real-world event and would resolve YES/NO under the same conditions.

Market A (${marketA.platform}):
- Question: "${marketA.question}"
- Category: ${marketA.category ?? 'unknown'}

Market B (${marketB.platform}):
- Question: "${marketB.question}"
- Category: ${marketB.category ?? 'unknown'}

IMPORTANT RULES:
1. Focus on the QUESTION TEXT, not the end dates. End dates in databases are often incorrect or use different conventions between platforms.
2. "FIFA World Cup" and "Men's World Cup" referring to the same year = EQUIVALENT
3. "Win the La Liga 2025-26" and "Win the La Liga" (same season implied) = EQUIVALENT  
4. "Win on [specific date]" vs "Win the league/tournament" = NOT EQUIVALENT (different scope)
5. Same event, different resolution deadlines (e.g. "by March 31" vs "before August") = NOT EQUIVALENT
6. Minor wording differences ("Will Spain" vs "Will the Spain") = EQUIVALENT if same event

Are these markets equivalent? They are equivalent if they ask about the same specific real-world outcome and would resolve the same way.

Respond with ONLY valid JSON, no markdown:
{
  "isEquivalent": true or false,
  "confidence": 0.0 to 1.0,
  "reasoning": "one sentence explanation"
}`;
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
        // Save to DB solo cuando Gemini respondió exitosamente
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].marketMatch.create({
            data: {
                marketAId: marketA.id,
                marketBId: marketB.id,
                isEquivalent: result.isEquivalent,
                confidence: result.confidence,
                reasoning: result.reasoning,
                model: 'groq-llama-3.1-8b'
            }
        });
        console.log(`[SemanticMatcher] ${marketA.question.slice(0, 40)}... ↔ ${marketB.question.slice(0, 40)}...`);
        console.log(`[SemanticMatcher] → ${result.isEquivalent ? '✅ EQUIVALENT' : '❌ NOT EQUIVALENT'} (${(result.confidence * 100).toFixed(0)}%) ${result.reasoning}`);
        return result;
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
"[project]/app/api/admin/semantic-index/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$semantic$2d$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/semantic-matcher.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/matcher.service.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$semantic$2d$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$semantic$2d$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
// Clave para trackear progreso en memoria (persiste mientras el servidor esté vivo)
let indexingProgress = {
    running: false,
    startedAt: null,
    processed: 0,
    totalToProcess: 0,
    evaluated: 0,
    equivalent: 0,
    notEquivalent: 0,
    errors: 0,
    lastProcessed: null,
    finishedAt: null
};
async function runIndexing() {
    const semanticMatcher = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$semantic$2d$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SemanticMatcherService"]();
    const matcher = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MatcherService"]();
    // Obtener todos los markets de Kalshi activos
    const kalshiMarkets = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.findMany({
        where: {
            platform: 'KALSHI',
            active: true
        },
        orderBy: {
            volumeTotal: 'desc'
        }
    });
    indexingProgress.totalToProcess = kalshiMarkets.length;
    console.log(`[SemanticIndex] Starting full seed: ${kalshiMarkets.length} Kalshi markets`);
    for (const kalshiMarket of kalshiMarkets){
        if (!indexingProgress.running) break; // permite cancelación
        indexingProgress.processed++;
        indexingProgress.lastProcessed = kalshiMarket.question.slice(0, 60);
        // Buscar candidatos en Polymarket
        let matches;
        try {
            matches = await matcher.findMatches(kalshiMarket, 0.6);
            matches = matches.filter((m)=>m.market.platform === 'POLYMARKET').slice(0, 3);
        } catch  {
            continue;
        }
        for (const match of matches){
            const polyMarket = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.findUnique({
                where: {
                    id: match.market.id
                }
            });
            if (!polyMarket) continue;
            // Skip si ya tiene evaluación real
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
                    ],
                    confidence: {
                        gt: 0
                    }
                }
            });
            if (existing) continue;
            try {
                const result = await semanticMatcher.evaluatePair(kalshiMarket, polyMarket);
                indexingProgress.evaluated++;
                if (result.isEquivalent) indexingProgress.equivalent++;
                else indexingProgress.notEquivalent++;
                console.log(`[SemanticIndex] ${result.isEquivalent ? '✅' : '❌'} ` + `[${indexingProgress.processed}/${indexingProgress.totalToProcess}] ` + `${kalshiMarket.question.slice(0, 35)} ↔ ${polyMarket.question.slice(0, 35)}`);
                await new Promise((r)=>setTimeout(r, 1000)); // rate limit Groq
            } catch  {
                indexingProgress.errors++;
            }
        }
    }
    indexingProgress.running = false;
    indexingProgress.finishedAt = new Date().toISOString();
    console.log(`[SemanticIndex] ✅ Finished. Evaluated: ${indexingProgress.evaluated}, ` + `Equivalent: ${indexingProgress.equivalent}, Not: ${indexingProgress.notEquivalent}`);
}
async function POST(request) {
    const { action = 'start' } = await request.json().catch(()=>({}));
    if (action === 'cancel') {
        indexingProgress.running = false;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'Cancellation requested',
            ...indexingProgress
        });
    }
    if (indexingProgress.running) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'Already running',
            ...indexingProgress
        });
    }
    // Reset progress
    indexingProgress = {
        running: true,
        startedAt: new Date().toISOString(),
        processed: 0,
        totalToProcess: 0,
        evaluated: 0,
        equivalent: 0,
        notEquivalent: 0,
        errors: 0,
        lastProcessed: null,
        finishedAt: null
    };
    // Correr en background — NO await
    runIndexing().catch((err)=>{
        console.error('[SemanticIndex] Fatal error:', err);
        indexingProgress.running = false;
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        message: 'Indexing started in background',
        ...indexingProgress
    });
}
async function GET() {
    const dbStats = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].marketMatch.groupBy({
        by: [
            'isEquivalent'
        ],
        _count: true,
        where: {
            confidence: {
                gt: 0
            }
        }
    });
    const total = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].marketMatch.count({
        where: {
            confidence: {
                gt: 0
            }
        }
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        progress: indexingProgress,
        db: {
            total,
            stats: dbStats
        }
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d29f8f6e._.js.map