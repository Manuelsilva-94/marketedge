import { notFound } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { buildKalshiUrl } from '@/lib/utils/kalshi-url';
import { PolymarketService } from '@/lib/services/polymarket.service';
import { KalshiService } from '@/lib/services/kalshi.service';

interface ComparePageProps {
  searchParams: Promise<{ a?: string; b?: string }>;
}

function PriceBox({
  label,
  price,
  color
}: {
  label: string;
  price: number | null;
  color: string;
}) {
  return (
    <div className={`rounded-lg border ${color} p-4 text-center`}>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-2xl font-bold">
        {price !== null ? `${(price * 100).toFixed(1)}¢` : '—'}
      </p>
    </div>
  );
}

function kalshiEffectivePrice(price: number): number {
  return price + 0.07 * price * (1 - price);
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const params = await searchParams;
  const { a, b } = params;

  if (!a || !b) notFound();

  const [marketA, marketB] = await Promise.all([
    prisma.market.findUnique({ where: { id: a } }),
    prisma.market.findUnique({ where: { id: b } })
  ]);

  if (!marketA || !marketB) notFound();

  const polyMarket = marketA.platform === 'POLYMARKET' ? marketA : marketB;
  const kalshiMarket = marketA.platform === 'KALSHI' ? marketA : marketB;

  let polyPrice: { yesPrice: number; noPrice: number } | null = null;
  let kalshiPrice: { yesPrice: number; noPrice: number } | null = null;

  const polyService = new PolymarketService();
  let kalshiService: KalshiService | null = null;
  try {
    kalshiService = new KalshiService();
  } catch {
    /* Kalshi not configured */
  }

  try {
    const live = await polyService.getLiveMarket({
      externalId: polyMarket.externalId,
      platform: 'POLYMARKET',
      slug: polyMarket.slug
    });
    if (live) polyPrice = { yesPrice: live.yesPrice, noPrice: live.noPrice };
  } catch {
    /* use null */
  }

  if (kalshiService) {
    try {
      const live = await kalshiService.getLiveMarket({
        externalId: kalshiMarket.externalId,
        platform: 'KALSHI'
      });
      if (live) kalshiPrice = { yesPrice: live.yesPrice, noPrice: live.noPrice };
    } catch {
      /* use null */
    }
  }

  let arbitrage: { roi: number; buyYesOn: string; buyNoOn: string } | null = null;
  if (polyPrice && kalshiPrice) {
    const polyEffYes = polyPrice.yesPrice;
    const polyEffNo = polyPrice.noPrice;
    const kalshiEffYes = kalshiEffectivePrice(kalshiPrice.yesPrice);
    const kalshiEffNo = kalshiEffectivePrice(kalshiPrice.noPrice);

    const optionA = polyEffYes + kalshiEffNo;
    const optionB = kalshiEffYes + polyEffNo;

    if (optionA < 1) {
      arbitrage = { roi: ((1 - optionA) / optionA) * 100, buyYesOn: 'POLYMARKET', buyNoOn: 'KALSHI' };
    } else if (optionB < 1) {
      arbitrage = { roi: ((1 - optionB) / optionB) * 100, buyYesOn: 'KALSHI', buyNoOn: 'POLYMARKET' };
    }
  }

  // Auto-save comparison to dashboard if user is logged in
  try {
    const session = await auth();
    if (session?.user?.id && marketA && marketB) {
      const targetId = `${marketA.id}:${marketB.id}`;
      await prisma.pin.upsert({
        where: {
          userId_type_targetId: {
            userId: session.user.id,
            type: 'COMPARISON',
            targetId
          }
        },
        update: {},
        create: {
          userId: session.user.id,
          type: 'COMPARISON',
          targetId
        }
      });
    }
  } catch {
    // silenciar errores de auto-save para no romper la página
  }

  return (
    <div className="container px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <Link
          href="/search"
          className="text-sm text-muted-foreground hover:text-white transition-colors"
        >
          ← Back to search
        </Link>

        <h1 className="text-2xl font-bold">Market Comparison</h1>

        {arbitrage && arbitrage.roi > 0.5 && (
          <div className="rounded-lg border border-green-500/50 bg-green-500/10 px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-green-400">
                  🎯 Arbitrage Opportunity — {arbitrage.roi.toFixed(2)}% ROI
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Buy YES on{' '}
                  {arbitrage.buyYesOn === 'POLYMARKET' ? 'Polymarket' : 'Kalshi'} · Buy NO on{' '}
                  {arbitrage.buyNoOn === 'POLYMARKET' ? 'Polymarket' : 'Kalshi'}
                </p>
                <p className="text-xs text-amber-400/80 mt-2">
                  ⚠️ This is a manual comparison — verify that both markets resolve on the same event before trading.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-stretch">
          <div className="rounded-lg border border-blue-500/30 bg-white/5 p-6 space-y-4 flex flex-col">
            <div className="flex items-center gap-2">
              <span className="rounded bg-blue-500/20 px-2 py-0.5 text-xs font-medium text-blue-400">
                POLYMARKET
              </span>
              {polyMarket.category && (
                <span className="text-xs text-muted-foreground">{polyMarket.category}</span>
              )}
            </div>
            <p className="font-medium leading-snug">{polyMarket.question}</p>
            {polyMarket.endDate && (
              <p className="text-xs text-muted-foreground">
                Ends: {new Date(polyMarket.endDate).toLocaleDateString()}
              </p>
            )}
            <div className="grid grid-cols-2 gap-3">
              <PriceBox label="YES" price={polyPrice?.yesPrice ?? null} color="border-green-500/30" />
              <PriceBox label="NO" price={polyPrice?.noPrice ?? null} color="border-red-500/30" />
            </div>
            <div className="flex gap-3 text-xs text-muted-foreground">
              <span>Vol 24h: ${((polyMarket.volume24h ?? 0) / 1000).toFixed(0)}K</span>
              <span>Liq: ${((polyMarket.liquidity ?? 0) / 1000).toFixed(0)}K</span>
            </div>
            <div className="flex-1" />
            {polyMarket.url && (
              <Link
                href={polyMarket.url}
                target="_blank"
                className="block text-center rounded border border-blue-500/30 py-2 text-sm text-blue-400 hover:bg-blue-500/10 transition-colors"
              >
                Open on Polymarket ↗
              </Link>
            )}
          </div>

          <div className="rounded-lg border border-purple-500/30 bg-white/5 p-6 space-y-4 flex flex-col">
            <div className="flex items-center gap-2">
              <span className="rounded bg-purple-500/20 px-2 py-0.5 text-xs font-medium text-purple-400">
                KALSHI
              </span>
              {kalshiMarket.category && (
                <span className="text-xs text-muted-foreground">{kalshiMarket.category}</span>
              )}
            </div>
            <p className="font-medium leading-snug">{kalshiMarket.question}</p>
            {kalshiMarket.endDate && (
              <p className="text-xs text-muted-foreground">
                Ends: {new Date(kalshiMarket.endDate).toLocaleDateString()}
              </p>
            )}
            <div className="grid grid-cols-2 gap-3">
              <PriceBox
                label="YES"
                price={kalshiPrice?.yesPrice ?? null}
                color="border-green-500/30"
              />
              <PriceBox label="NO" price={kalshiPrice?.noPrice ?? null} color="border-red-500/30" />
            </div>
            <div className="flex gap-3 text-xs text-muted-foreground">
              <span>Vol 24h: ${((kalshiMarket.volume24h ?? 0) / 1000).toFixed(0)}K</span>
              <span>Liq: ${((kalshiMarket.liquidity ?? 0) / 1000).toFixed(0)}K</span>
            </div>
            <div className="flex-1" />
            {(kalshiMarket.externalId || kalshiMarket.url) && (
              <Link
                href={buildKalshiUrl({ externalId: kalshiMarket.externalId, seriesId: kalshiMarket.seriesId, eventId: kalshiMarket.eventId, url: kalshiMarket.url })}
                target="_blank"
                className="block text-center rounded border border-purple-500/30 py-2 text-sm text-purple-400 hover:bg-purple-500/10 transition-colors"
              >
                Open on Kalshi ↗
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
