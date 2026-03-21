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
        return `You are evaluating whether two prediction markets from different platforms are asking about the SAME event and will resolve the same way.

Market A (${marketA.platform}):
- Question: "${marketA.question}"
- End date: ${marketA.endDate?.toISOString().split('T')[0] ?? 'unknown'}
- Category: ${marketA.category ?? 'unknown'}

Market B (${marketB.platform}):
- Question: "${marketB.question}"
- End date: ${marketB.endDate?.toISOString().split('T')[0] ?? 'unknown'}
- Category: ${marketB.category ?? 'unknown'}

Are these markets equivalent? They are equivalent if:
1. They ask about the same specific event or outcome
2. They would resolve YES/NO under the same real-world conditions
3. Their resolution dates are compatible (within ~60 days or same event)

They are NOT equivalent if:
- They ask about the same topic but different specific outcomes (e.g. "win by March 31" vs "win by January 2027")
- They have different resolution criteria
- One is about a specific round/stage and the other is about winning overall

Respond with ONLY valid JSON, no markdown, no explanation outside JSON:
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
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$semantic$2d$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$semantic$2d$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
// Candidatos hardcodeados para evaluar primero (pares conocidos problemáticos)
const PRIORITY_PAIRS = [
    // Hormuz - distintas fechas, NO equivalentes
    {
        polyQuestion: 'Will Iran close the Strait of Hormuz by March 31?',
        kalshiExternalId: 'KXCLOSEHORMUZ-27JAN-26AUG'
    }
];
async function POST(request) {
    const { limit = 20, onlyPriority = false } = await request.json().catch(()=>({}));
    const semanticMatcher = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$semantic$2d$matcher$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SemanticMatcherService"]();
    const results = {
        evaluated: 0,
        equivalent: 0,
        notEquivalent: 0,
        errors: 0
    };
    // 1. Evaluar priority pairs primero
    for (const pair of PRIORITY_PAIRS){
        const polyMarket = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.findFirst({
            where: {
                platform: 'POLYMARKET',
                question: {
                    contains: pair.polyQuestion.slice(0, 30)
                }
            }
        });
        const kalshiMarket = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].market.findFirst({
            where: {
                platform: 'KALSHI',
                externalId: pair.kalshiExternalId
            }
        });
        if (!polyMarket || !kalshiMarket) continue;
        // Verificar si ya existe evaluación real (confidence > 0)
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
                ],
                confidence: {
                    gt: 0
                }
            }
        });
        if (existing) {
            console.log(`[SemanticIndex] Already evaluated: ${polyMarket.question.slice(0, 40)}`);
            continue;
        }
        try {
            const result = await semanticMatcher.evaluatePair(polyMarket, kalshiMarket);
            results.evaluated++;
            if (result.isEquivalent) results.equivalent++;
            else results.notEquivalent++;
            // Rate limit: esperar 2s entre llamadas
            await new Promise((r)=>setTimeout(r, 2000));
        } catch (err) {
            results.errors++;
        }
    }
    if (onlyPriority) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ...results,
            message: 'Priority pairs evaluated'
        });
    }
    // 2. Evaluar pares del scanner que no tienen evaluación real todavía
    // Buscar los MarketMatch con confidence = 0 (errores/fallbacks) o sin registro
    // que correspondan a matches de alta confianza del keyword matcher
    // Por ahora, retornar los resultados de priority
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ...results,
        message: `Evaluated ${results.evaluated} pairs. ${results.equivalent} equivalent, ${results.notEquivalent} not equivalent.`
    });
}
async function GET() {
    // Ver estado del índice semántico
    const stats = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].marketMatch.groupBy({
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
        total,
        stats
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ba108149._.js.map