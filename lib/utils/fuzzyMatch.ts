import type { Market } from '../platforms/types'

/**
 * Calculate similarity between two market titles using Levenshtein distance
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = []
  const len1 = str1.length
  const len2 = str2.length

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }

  return matrix[len1][len2]
}

/**
 * Normalize text for comparison
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Calculate similarity score between two markets (0-100)
 */
export function calculateSimilarity(marketA: Market, marketB: Market): number {
  const titleA = normalizeText(marketA.title)
  const titleB = normalizeText(marketB.title)

  // Exact match
  if (titleA === titleB) {
    return 100
  }

  // Check if one title contains the other
  if (titleA.includes(titleB) || titleB.includes(titleA)) {
    return 90
  }

  // Calculate Levenshtein distance
  const maxLen = Math.max(titleA.length, titleB.length)
  if (maxLen === 0) return 100

  const distance = levenshteinDistance(titleA, titleB)
  const similarity = ((maxLen - distance) / maxLen) * 100

  // Boost similarity if categories match
  if (marketA.category.toLowerCase() === marketB.category.toLowerCase()) {
    return Math.min(100, similarity + 10)
  }

  return Math.max(0, similarity)
}

/**
 * Check if two markets are similar enough to be considered the same
 */
export function areMarketsSimilar(marketA: Market, marketB: Market, threshold: number = 70): boolean {
  return calculateSimilarity(marketA, marketB) >= threshold
}
