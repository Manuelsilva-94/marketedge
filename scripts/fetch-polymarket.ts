import fs from 'fs';
import path from 'path';

interface PolymarketMarket {
  id: string;
  question?: string;
  slug?: string;
  title?: string;
  description?: string;
  volume24hr?: string;
  volume?: string;
  liquidity?: string;
  active?: boolean;
  closed?: boolean;
  groupItemTitle?: string;
  category?: string;
  tags?: string[];
  image?: string;
  endDate?: string;
  eventId?: string;
  eventSlug?: string;
  eventTitle?: string;
}

interface PolymarketEvent {
  id: string;
  slug?: string;
  title?: string;
  markets?: PolymarketMarket[];
}

interface EventInfo {
  id: string;
  slug?: string;
  title?: string;
}

async function fetchAllPolymarkets() {
  console.log('🔄 Fetching ALL Polymarket markets...\n');

  const gammaUrl = 'https://gamma-api.polymarket.com';
  const allItems: Array<{
    raw: Record<string, unknown>;
    event?: EventInfo;
  }> = [];

  let offset = 0;
  const pageSize = 100;
  const startTime = Date.now();

  while (true) {
    const params = new URLSearchParams({
      active: 'true',
      closed: 'false',
      limit: String(pageSize),
      offset: String(offset)
    });

    console.log(`📡 Fetching offset ${offset}...`);

    const response = await fetch(`${gammaUrl}/events?${params}`, {
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
      console.error(`❌ API error: ${response.status}`);
      break;
    }

    const events = (await response.json()) as PolymarketEvent[];

    if (!events || events.length === 0) {
      console.log(`✅ No more events, stopping at ${allItems.length}`);
      break;
    }

    // Extract markets from events
    for (const event of events) {
      const eventInfo: EventInfo = {
        id: event.id,
        slug: event.slug,
        title: event.title
      };

      const markets =
        event.markets && event.markets.length > 0
          ? event.markets
          : [event as unknown as Record<string, unknown>];

      for (const m of markets) {
        const raw =
          typeof m === 'object' && m && 'id' in m
            ? (m as Record<string, unknown>)
            : { id: event.id, ...m };

        allItems.push({ raw, event: eventInfo });
      }
    }

    offset += pageSize;
    console.log(`📦 Total accumulated: ${allItems.length}`);

    // Rate limiting
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Safety: max 100 pages
    if (offset > 10000) {
      console.log(`⚠️ Safety limit reached at offset ${offset}`);
      break;
    }
  }

  const duration = Math.round((Date.now() - startTime) / 1000);

  console.log(`\n✅ FETCH COMPLETE:`);
  console.log(`   - Total markets: ${allItems.length}`);
  console.log(`   - Duration: ${duration}s`);

  // Sample externalIds para verificar
  const sampleItems = allItems.slice(0, 3);
  console.log('\n[Polymarket] Sample externalIds:');
  sampleItems.forEach(({ raw }, i) => {
    const externalId = String(raw.id ?? raw.conditionId ?? raw.slug ?? '');
    console.log(`  ${i + 1}. id=${raw.id}, conditionId=${raw.conditionId}, externalId=${externalId}`);
  });

  // Normalize data for SQL generation
  const normalized = allItems.map(({ raw, event }) => {
    const question = String(raw.question ?? raw.title ?? '');
    const slug = String(raw.slug ?? raw.id ?? '');
    const externalId = String(raw.id ?? raw.conditionId ?? raw.slug ?? '');
    const description =
      raw.description != null ? String(raw.description) : null;
    const category =
      raw.groupItemTitle != null
        ? String(raw.groupItemTitle)
        : raw.category != null
          ? String(raw.category)
          : null;
    const tags = Array.isArray(raw.tags) ? raw.tags : [];

    return {
      platform: 'POLYMARKET',
      externalId,
      question,
      slug,
      description,
      category,
      tags,
      volume24h:
        parseFloat(String(raw.volume24hr ?? raw.volume24h ?? '0')) || 0,
      volumeTotal:
        parseFloat(String(raw.volume ?? raw.volumeTotal ?? '0')) || 0,
      liquidity: parseFloat(String(raw.liquidity ?? '0')) || 0,
      active: Boolean(raw.active !== false && raw.closed !== true),
      endDate: raw.endDate ? String(raw.endDate) : null,
      imageUrl: raw.image ?? raw.imageUrl ?? null,
      url: (event?.slug ?? raw.eventSlug ?? raw.slug ?? slug)
        ? `https://polymarket.com/event/${event?.slug ?? raw.eventSlug ?? raw.slug ?? slug}`
        : null,
      eventId: event?.id ?? raw.eventId ?? null,
      eventSlug: event?.slug ?? raw.eventSlug ?? null,
      eventTitle: event?.title ?? raw.eventTitle ?? null
    };
  });

  // Save to JSON
  const outputPath = path.join(process.cwd(), 'data', 'polymarket-markets.json');

  // Create data directory if it doesn't exist
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(normalized, null, 2));

  console.log(`\n💾 Saved to: ${outputPath}`);
  console.log(
    `📊 File size: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB`
  );

  return normalized;
}

// Execute
fetchAllPolymarkets().catch(console.error);
