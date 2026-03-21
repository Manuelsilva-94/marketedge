import { prisma } from '../prisma';
import type { Market } from '@/lib/db-types';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.1-8b-instant';

interface SemanticMatchResult {
  isEquivalent: boolean;
  confidence: number;
  reasoning: string;
}

export class SemanticMatcherService {
  static async clearErrorCache(): Promise<number> {
    const result = await prisma.marketMatch.deleteMany({
      where: { confidence: 0 }
    });
    return result.count;
  }

  private static inFlight = 0;
  private static readonly MAX_CONCURRENT = 1;

  private async callGroq(prompt: string): Promise<string> {
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
        messages: [{ role: 'user', content: prompt }],
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

  private buildPrompt(marketA: Market, marketB: Market): string {
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

  private preFilterNotEquivalent(questionA: string, questionB: string): boolean {
    // Retorna true si los mercados DEFINITIVAMENTE no son equivalentes
    // sin necesidad de llamar a Groq

    const a = questionA.toLowerCase();
    const b = questionB.toLowerCase();

    // Regla 1: US vs Global scope
    const hasUS = (s: string) =>
      s.includes(' us ') ||
      s.includes(' us netflix') ||
      s.includes('top us ') ||
      s.includes('united states');
    const hasGlobal = (s: string) =>
      s.includes(' global ') || s.includes('worldwide') || s.includes('world ');
    if ((hasUS(a) && hasGlobal(b)) || (hasUS(b) && hasGlobal(a))) return true;

    // Regla 2: Distintos números de finish position (Top 5 vs Top 10 vs Top 20)
    const topMatch = (s: string) => s.match(/top\s+(\d+)/i);
    const topA = topMatch(a);
    const topB = topMatch(b);
    if (topA && topB && topA[1] !== topB[1]) return true;

    // Regla 3: Distintas fechas — cubre mes completo y abreviado (march/mar, january/jan, etc.)
    const dateMatch = (s: string) =>
      s.match(
        /(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+(\d{1,2})/i
      );
    const dateA = dateMatch(a);
    const dateB = dateMatch(b);
    // Comparar solo el número del día, no el nombre del mes completo
    // (mar 12 y march 12 son el mismo día)
    if (dateA && dateB && dateA[1] !== dateB[1]) return true;

    // Regla 4: Distintos thresholds numéricos para el mismo activo
    const thresholdMatch = (s: string) =>
      s.match(
        /\$?([\d,]+(?:\.\d+)?)\s*(?:k|m|b)?\s*(?:or above|or below|or higher|or lower)/i
      );
    const threshA = thresholdMatch(a);
    const threshB = thresholdMatch(b);
    if (threshA && threshB && threshA[1] !== threshB[1]) return true;

    return false;
  }

  async evaluatePair(marketA: Market, marketB: Market): Promise<SemanticMatchResult> {
    // Check DB cache first
    const existing = await prisma.marketMatch.findFirst({
      where: {
        OR: [
          { marketAId: marketA.id, marketBId: marketB.id },
          { marketAId: marketB.id, marketBId: marketA.id }
        ],
        confidence: { gt: 0 }
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
    let result: SemanticMatchResult;

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
      console.warn(
        `[SemanticMatcher] API unavailable, passing pair through: ${errMsg.slice(0, 80)}`
      );

      // Gemini no disponible → dejar pasar el par sin guardar en DB
      return {
        isEquivalent: true,
        confidence: 0.5,
        reasoning: 'Fallback: semantic validation unavailable'
      };
    } finally {
      SemanticMatcherService.inFlight--;
    }

    // Guardar como equivalente solo con alta confianza (>= 0.82)
    const shouldMarkEquivalent = result.isEquivalent && result.confidence >= 0.82;

    await prisma.marketMatch.create({
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
    console.log(
      `[SemanticMatcher] ${marketA.question.slice(0, 40)}... ↔ ${marketB.question.slice(0, 40)}...`
    );
    console.log(
      `[SemanticMatcher] → ${effectiveEquivalent ? '✅ EQUIVALENT' : '❌ NOT EQUIVALENT'} (${(result.confidence * 100).toFixed(0)}%) ${result.reasoning}`
    );

    return {
      isEquivalent: effectiveEquivalent,
      confidence: result.confidence,
      reasoning: result.reasoning
    };
  }
}
