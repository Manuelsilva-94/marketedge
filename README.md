# MarketEdge - Cross-Platform Prediction Markets Intelligence

A Next.js 14+ web application that aggregates prediction market data from Polymarket and Kalshi, detects arbitrage opportunities, and provides real-time analytics.

## Features

- **Unified Dashboard**: View markets from both Polymarket and Kalshi in one place
- **Arbitrage Detection**: Automatically find price discrepancies across platforms
- **Real-time Analytics**: Live market data with 5-minute caching
- **Advanced Filtering**: Search, filter by category, volume, and spread
- **Platform-Specific Views**: Dedicated pages for each platform
- **Monetization Ready**: Ad placeholders and affiliate link integration

## Tech Stack

- **Next.js 16** with App Router
- **TypeScript** (strict mode)
- **Tailwind CSS v4** with dark mode
- **React Query** for data fetching and caching
- **Zustand** for state management
- **shadcn/ui** components

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
/app
├── page.tsx              # Main dashboard
├── layout.tsx            # Root layout with navigation
├── arbitrage/page.tsx   # Arbitrage opportunities page
├── platform/[slug]/     # Platform-specific pages
└── components/          # React components
    ├── MarketTable.tsx
    ├── PlatformTabs.tsx
    ├── ArbitrageCard.tsx
    ├── FilterBar.tsx
    └── AdPlaceholder.tsx

/lib
├── platforms/           # API wrappers and types
│   ├── types.ts
│   ├── polymarket.ts
│   ├── kalshi.ts
│   └── arbitrage.ts
├── store/               # Zustand stores
└── utils/               # Utility functions
```

## API Integration

### Polymarket
- Base URL: `https://gamma-api.polymarket.com`
- Endpoints: `/events`, `/events/{slug}/markets`
- No authentication required
- Rate limit: ~1000 req/hour

### Kalshi
- Base URL: `https://api.elections.kalshi.com`
- Endpoints: `/trade-api/v2/markets`
- Optional API key for read-only access
- Generous rate limits

## Deployment

This project is ready to deploy on Vercel:

```bash
# Deploy to Vercel
vercel
```

## Environment Variables

No environment variables are required for the MVP. Future features may require:
- `KALSHI_API_KEY` (optional)
- `STRIPE_SECRET_KEY` (for premium subscriptions)
- `GOOGLE_ADSENSE_ID` (for ad monetization)

## License

MIT
