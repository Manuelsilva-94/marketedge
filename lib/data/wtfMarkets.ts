import type { Market } from '../platforms/types'

/**
 * Curated list of WTF (weird, absurd, controversial) markets
 * These are manually selected markets that are interesting/entertaining
 */
export const curatedWTFMarkets: Partial<Market>[] = [
  {
    id: 'wtf-1',
    title: 'Will aliens be confirmed by 2025?',
    description: 'Official government confirmation of extraterrestrial life',
    category: 'Entertainment',
    platform: 'polymarket',
  },
  {
    id: 'wtf-2',
    title: 'Will Elon Musk fight Mark Zuckerberg?',
    description: 'The cage match that may or may not happen',
    category: 'Entertainment',
    platform: 'polymarket',
  },
  {
    id: 'wtf-3',
    title: 'Will Donald Trump be president in 2025?',
    description: 'Political prediction market',
    category: 'Politics',
    platform: 'kalshi',
  },
  {
    id: 'wtf-4',
    title: 'Will AI achieve AGI by 2026?',
    description: 'Artificial General Intelligence milestone',
    category: 'Technology',
    platform: 'polymarket',
  },
  {
    id: 'wtf-5',
    title: 'Will Bitcoin reach $1M by 2030?',
    description: 'Extreme crypto prediction',
    category: 'Crypto',
    platform: 'kalshi',
  },
  {
    id: 'wtf-6',
    title: 'Will there be a zombie apocalypse by 2025?',
    description: 'The walking dead scenario',
    category: 'Entertainment',
    platform: 'polymarket',
  },
  {
    id: 'wtf-7',
    title: 'Will humans land on Mars by 2030?',
    description: 'Space exploration milestone',
    category: 'Technology',
    platform: 'kalshi',
  },
  {
    id: 'wtf-8',
    title: 'Will a celebrity get divorced in 2024?',
    description: 'Entertainment industry drama',
    category: 'Entertainment',
    platform: 'polymarket',
  },
  {
    id: 'wtf-9',
    title: 'Will the world end in 2024?',
    description: 'Apocalyptic prediction',
    category: 'Other',
    platform: 'polymarket',
  },
  {
    id: 'wtf-10',
    title: 'Will robots replace 50% of jobs by 2030?',
    description: 'AI automation impact',
    category: 'Economics',
    platform: 'kalshi',
  },
]

/**
 * Check if a market matches any curated WTF market
 */
export function isCuratedWTF(market: Market): boolean {
  return curatedWTFMarkets.some(
    wtf => wtf.title?.toLowerCase() === market.title.toLowerCase()
  )
}
