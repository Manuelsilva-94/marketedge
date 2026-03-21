import { prisma } from '../prisma';
import type { Market } from '@/lib/db-types';
import { NormalizerService } from './normalizer.service';

interface MatchResult {
  market: Market;
  score: number;
  matchType: 'STRICT' | 'FUZZY' | 'RELATED';
  flags: string[];
}

export class MatcherService {
  private normalizer: NormalizerService;

  constructor() {
    this.normalizer = new NormalizerService();
  }

  /**
   * Extrae entidades (palabras capitalizadas que NO están al inicio de frase).
   * Ignora "Will", "Win", "World", "Cup" etc que aparecen capitalizadas por
   * estar al inicio o por formato, pero no son entidades reales.
   */
  private extractEntities(text: string): string[] {
    const words = text.split(/\s+/);
    return words
      .filter((w, index) => {
        if (index === 0) return false;
        if (!/^[A-Z]/.test(w)) return false;
        if (w.length <= 3) return false;
        const clean = w.toLowerCase().replace(/[^a-z]/g, '');
        const commonWords = new Set(['will', 'the', 'win', 'cup', 'world', 'fifa']);
        return !commonWords.has(clean);
      })
      .map((w) => w.toLowerCase().replace(/[^a-z]/g, ''));
  }

  /**
   * Calcula similarity score entre dos sets de keywords
   */
  private calculateKeywordSimilarity(
    keywords1: string[],
    keywords2: string[],
    text1?: string,
    text2?: string
  ): number {
    if (keywords1.length === 0 || keywords2.length === 0) return 0;

    const set1 = new Set(keywords1);
    const set2 = new Set(keywords2);

    const intersection = [...set1].filter((k) => set2.has(k)).length;
    const union = new Set([...set1, ...set2]).size;
    const jaccardScore = union > 0 ? intersection / union : 0;

    const entities1 = text1 ? this.extractEntities(text1) : [];
    const entities2 = text2 ? this.extractEntities(text2) : [];
    const sharedEntities = entities1.filter((e) => entities2.includes(e)).length;
    const entityBonus = sharedEntities > 0 ? Math.min(sharedEntities * 0.15, 0.25) : 0;

    return Math.min(1, jaccardScore + entityBonus);
  }

  /**
   * Penalización por diferencia de fechas de resolución.
   * Mismo año → OK. Diff > 3 años → fuerte. Diff 1-3 años → leve.
   */
  private applyDatePenalty(
    score: number,
    date1: string | Date | null,
    date2: string | Date | null
  ): number {
    if (!date1 || !date2) return score;

    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffDays = Math.abs(
      (d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24)
    );

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
   */
  private scoreMatch(
    sourceMarket: Market,
    sourceQuestion: string,
    sourceKeywords: string[],
    targetMarket: Market,
    targetKeywords: string[]
  ): MatchResult {
    const similarity = this.calculateKeywordSimilarity(
      sourceKeywords,
      targetKeywords,
      sourceQuestion,
      targetMarket.question
    );
    const penalizedScore = this.applyDatePenalty(
      similarity,
      sourceMarket.endDate,
      targetMarket.endDate
    );
    const flags: string[] = [];

    let matchType: 'STRICT' | 'FUZZY' | 'RELATED';

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
   */
  private readonly STOP_KEYWORDS = new Set([
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

  async findMatches(sourceMarket: Market, minScore = 0.6): Promise<MatchResult[]> {
    console.log(`\n[Matcher] ============================`);
    console.log(`[Matcher] Source: "${sourceMarket.question}"`);
    console.log(`[Matcher] Source eventTitle: "${sourceMarket.eventTitle ?? ''}"`);

    const { normalized, keywords } = this.normalizer.normalize(sourceMarket.question);

    // Extraer solo entidades reales para el pre-filtro (evita 1000 candidates genéricos)
    const entityKeywords = sourceMarket.question
      .split(/\s+/)
      .filter((w: string) => /^[A-Z][a-z]/.test(w))
      .map((w: string) => w.toLowerCase().replace(/[^a-z]/g, ''))
      .filter((w: string) => w.length > 3 && !this.STOP_KEYWORDS.has(w))
      .slice(0, 3);

    const fallbackKeywords = sourceMarket.question
      .toLowerCase()
      .split(/\s+/)
      .filter((w: string) => w.length > 6 && !this.STOP_KEYWORDS.has(w))
      .slice(0, 3);

    const searchKeywords =
      entityKeywords.length > 0 ? entityKeywords : fallbackKeywords;

    console.log(`[Matcher] searchKeywords:`, searchKeywords);
    console.log(`[Matcher] entityKeywords:`, entityKeywords);
    console.log(`[Matcher] fallbackKeywords:`, fallbackKeywords);

    if (searchKeywords.length === 0) {
      console.log(`[Matcher] No keywords found, skipping match`);
      return [];
    }

    const candidates = await prisma.market.findMany({
      where: {
        platform: { not: sourceMarket.platform },
        active: true,
        AND: searchKeywords.map((kw: string) => ({
          question: { contains: kw, mode: 'insensitive' as const }
        }))
      },
      take: 100
    });

    console.log(`[Matcher] DB query used keywords:`, searchKeywords);
    console.log(`[Matcher] Candidates found:`, candidates.length);
    if (candidates.length > 0) {
      console.log(
        `[Matcher] First 3 candidates:`,
        candidates.slice(0, 3).map((c: Market) => ({ q: c.question, platform: c.platform }))
      );
    }
    console.log(`[Matcher] Candidates after entity filter: ${candidates.length}`);

    console.log(`   Normalized: "${normalized}"`);
    console.log(`   Keywords: [${keywords.join(', ')}]`);

    const results: MatchResult[] = [];

    for (const candidate of candidates) {
      const cleanQuestion = candidate.question.includes(' — ')
        ? candidate.question.split(' — ')[0]
        : candidate.question;
      const candidateNormalized = this.normalizer.normalize(cleanQuestion);

      const matchResult = this.scoreMatch(
        sourceMarket,
        sourceMarket.question,
        keywords,
        candidate,
        candidateNormalized.keywords
      );

      if (matchResult.score >= minScore) {
        results.push(matchResult);
      }
    }

    const allScores = candidates
      .map((c: Market) => {
        const cleanQ = c.question.includes(' — ') ? c.question.split(' — ')[0] : c.question;
        return {
          question: c.question,
          score: this.scoreMatch(
            sourceMarket,
            sourceMarket.question,
            keywords,
            c,
            this.normalizer.normalize(cleanQ).keywords
          ).score
        };
      })
      .sort((a: { score: number }, b: { score: number }) => b.score - a.score)
      .slice(0, 5);
    console.log(`[Matcher] Top 5 scores:`, JSON.stringify(allScores, null, 2));

    results.sort((a: MatchResult, b: MatchResult) => b.score - a.score);

    console.log(`   ✅ Found ${results.length} matches above ${minScore}`);

    return results;
  }

  /**
   * Encuentra matches dentro de una lista pre-filtrada de candidatos (sin fetchear de DB).
   * Útil cuando ya tienes candidatos por entity keywords.
   */
  findMatchesFromCandidates(
    sourceMarket: Market,
    candidates: Market[],
    minScore = 0.6
  ): MatchResult[] {
    if (candidates.length === 0) return [];

    const { keywords } = this.normalizer.normalize(sourceMarket.question);
    const results: MatchResult[] = [];

    for (const candidate of candidates) {
      const cleanQuestion = candidate.question.includes(' — ')
        ? candidate.question.split(' — ')[0]
        : candidate.question;
      const candidateNormalized = this.normalizer.normalize(cleanQuestion);
      const matchResult = this.scoreMatch(
        sourceMarket,
        sourceMarket.question,
        keywords,
        candidate,
        candidateNormalized.keywords
      );
      if (matchResult.score >= minScore) {
        results.push(matchResult);
      }
    }

    results.sort((a: MatchResult, b: MatchResult) => b.score - a.score);
    return results;
  }

  /**
   * Encuentra el mejor match para un market
   */
  async findBestMatch(sourceMarket: Market): Promise<MatchResult | null> {
    const matches = await this.findMatches(sourceMarket, 0.75);
    return matches.length > 0 ? matches[0] : null;
  }
}
