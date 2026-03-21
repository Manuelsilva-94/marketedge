/**
 * Servicio de normalización de preguntas para matching cross-platform
 */
export class NormalizerService {
  private readonly PRICE_VERBS = new Map([
    ['reach', 'cross'],
    ['hit', 'cross'],
    ['exceed', 'cross'],
    ['surpass', 'cross'],
    ['above', 'cross'],
    ['over', 'cross'],
    ['break', 'cross'],
    ['top', 'cross'],
    ['below', 'under'],
    ['drop', 'under'],
    ['fall', 'under'],
    ['dip', 'under'],
    ['sink', 'under']
  ]);

  private readonly GEO_SYNONYMS = new Map([
    ['us', 'usa'],
    ['u.s.', 'usa'],
    ['u.s.a.', 'usa'],
    ['united states', 'usa'],
    ['america', 'usa']
  ]);

  private readonly POLITICAL_SYNONYMS = new Map([
    ['potus', 'president'],
    ['presidential election', 'president'],
    ['presidency', 'president'],
    ['gop', 'republican'],
    ['democrat', 'democratic'],
    ['dems', 'democratic'],
    ['reps', 'republican']
  ]);

  private readonly CRYPTO_SYNONYMS = new Map([
    ['btc', 'bitcoin'],
    ['eth', 'ethereum'],
    ['ether', 'ethereum'],
    ['sol', 'solana'],
    ['xrp', 'ripple']
  ]);

  private readonly ADDITIONAL_SYNONYMS = new Map([
    ['fifa world cup', 'world cup'],
    ["men's world cup", 'world cup'],
    ['mens world cup', 'world cup'],
    ['world cup winner', 'world cup'],
    ['presidential election', 'president election'],
    ['us presidential', 'us president'],
    ['above', 'over'],
    ['below', 'under'],
    ['by end of', 'by'],
    ['end of', 'by']
  ]);

  private readonly STOPWORDS = new Set([
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
   */
  normalizeNumbers(text: string): string {
    let normalized = text;

    normalized = normalized.replace(/\$?([\d,]+)K\b/gi, (_, num) => {
      return String(parseInt(num.replace(/,/g, '')) * 1000);
    });

    normalized = normalized.replace(/\$?([\d,]+)M\b/gi, (_, num) => {
      return String(parseInt(num.replace(/,/g, '')) * 1000000);
    });

    normalized = normalized.replace(/\$?([\d,]+)/g, (_, num) => {
      return num.replace(/,/g, '');
    });

    normalized = normalized.replace(/(\d+)\.0+\b/g, '$1');

    return normalized;
  }

  /**
   * Normaliza fechas a formato estándar
   */
  normalizeDates(text: string): string {
    let normalized = text;

    const months: Record<string, string> = {
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

    normalized = normalized.replace(
      /end of (\w+)\s+(\d{4})/gi,
      (_, month, year) => {
        const monthNum = months[month.toLowerCase()] || '12';
        return `${year}-${monthNum}-31`;
      }
    );

    normalized = normalized.replace(
      /(\w+)\s+(\d{1,2}),?\s+(\d{4})/gi,
      (_, month, day, year) => {
        const monthNum = months[month.toLowerCase()] || '01';
        const dayPadded = String(day).padStart(2, '0');
        return `${year}-${monthNum}-${dayPadded}`;
      }
    );

    return normalized;
  }

  /**
   * Aplica todos los sinónimos
   */
  applySynonyms(text: string): string {
    let normalized = text.toLowerCase();

    const allSynonyms = [
      ...this.ADDITIONAL_SYNONYMS.entries(),
      ...this.PRICE_VERBS.entries(),
      ...this.GEO_SYNONYMS.entries(),
      ...this.POLITICAL_SYNONYMS.entries(),
      ...this.CRYPTO_SYNONYMS.entries()
    ];

    for (const [from, to] of allSynonyms) {
      const regex = new RegExp(`\\b${from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      normalized = normalized.replace(regex, to);
    }

    return normalized;
  }

  /**
   * Limpia puntuación y espacios extra
   */
  cleanText(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Remueve stopwords
   */
  removeStopwords(text: string): string {
    const words = text.split(' ');
    const filtered = words.filter((word) => !this.STOPWORDS.has(word));
    return filtered.join(' ');
  }

  /**
   * Extrae keywords relevantes
   */
  extractKeywords(text: string): string[] {
    return text
      .split(' ')
      .filter((word) => word.length > 2)
      .filter((word) => !this.STOPWORDS.has(word));
  }

  /**
   * PIPELINE COMPLETO: Normaliza una pregunta
   */
  normalize(question: string): {
    normalized: string;
    keywords: string[];
  } {
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
