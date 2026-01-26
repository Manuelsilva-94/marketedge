export const API_URLS = {
  POLYMARKET: 'https://gamma-api.polymarket.com',
  KALSHI: 'https://api.elections.kalshi.com',
} as const

export const AFFILIATE_LINKS = {
  POLYMARKET: 'https://polymarket.com?utm_source=marketedge',
  KALSHI: 'https://kalshi.com?utm_source=marketedge',
} as const

export const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes in milliseconds

export const ARBITRAGE_THRESHOLD = 3 // Minimum gap percentage to show
export const HIGH_CONFIDENCE_THRESHOLD = 80 // Minimum confidence for high-confidence matches
