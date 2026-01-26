import { create } from 'zustand'
import type { Market, Platform } from '../platforms/types'

interface MarketStore {
  selectedPlatform: Platform | 'all'
  searchQuery: string
  selectedCategory: string
  minVolume: number
  minSpread: number
  setSelectedPlatform: (platform: Platform | 'all') => void
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category: string) => void
  setMinVolume: (volume: number) => void
  setMinSpread: (spread: number) => void
}

export const useMarketStore = create<MarketStore>((set) => ({
  selectedPlatform: 'all',
  searchQuery: '',
  selectedCategory: 'all',
  minVolume: 0,
  minSpread: 0,
  setSelectedPlatform: (platform) => set({ selectedPlatform: platform }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setMinVolume: (volume) => set({ minVolume: volume }),
  setMinSpread: (spread) => set({ minSpread: spread }),
}))
