'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { buildKalshiUrl } from '@/lib/utils/kalshi-url';

interface Pin {
  id: string;
  type: string;
  targetId: string;
  notes: string | null;
  createdAt: string;
}

interface ArbitrageOpportunity {
  id: string;
  roiPercent: number;
  active: boolean;
  polyPrice: number;
  kalshiPrice: number;
  buyYesOn: string;
  buyNoOn: string;
  detectedAt: string;
  closedAt: string | null;
  match: {
    marketA: { id: string; platform: string; question: string; category: string | null; url: string | null; volume24h: number; externalId?: string; seriesId?: string | null; eventId?: string | null };
    marketB: { id: string; platform: string; question: string; category: string | null; url: string | null; volume24h: number; externalId?: string; seriesId?: string | null; eventId?: string | null };
  };
}

interface Comparison {
  id: string;
  createdAt: string;
  marketA: { id: string; platform: string; question: string; url: string | null };
  marketB: { id: string; platform: string; question: string; url: string | null };
}

interface DashboardData {
  pinnedArbitrage: ArbitrageOpportunity[];
  pinnedWhales: { address: string; pinnedAt: string; notes: string | null }[];
  pinnedComparisons: Comparison[];
  stats: {
    totalArbitrage: number;
    activeArbitrage: number;
    totalWhales: number;
    totalComparisons: number;
  };
}

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

type DashboardTab = 'pins' | 'notifications';

export default function DashboardClient({ user }: { user: User }) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<DashboardTab>('pins');

  const [emailNotifications, setEmailNotifications] = useState(false);
  const [telegramLinked, setTelegramLinked] = useState(false);
  const [telegramCode, setTelegramCode] = useState<string | null>(null);
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifLoaded, setNotifLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/dashboard')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (tab !== 'notifications') return;
    setNotifLoading(true);
    fetch('/api/user/notifications')
      .then(r => r.json())
      .then((d) => {
        setEmailNotifications(!!d.emailNotifications);
        setTelegramLinked(!!d.telegramLinked);
        setNotifLoaded(true);
      })
      .catch(() => setNotifLoaded(true))
      .finally(() => setNotifLoading(false));
  }, [tab]);

  const unpinArbitrage = async (id: string) => {
    await fetch('/api/pins', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'ARBITRAGE', targetId: id })
    });
    setData(prev => prev ? {
      ...prev,
      pinnedArbitrage: prev.pinnedArbitrage.filter(a => a.id !== id),
      stats: { ...prev.stats, totalArbitrage: prev.stats.totalArbitrage - 1, activeArbitrage: prev.stats.activeArbitrage - 1 }
    } : null);
  };

  const unpinWhale = async (address: string) => {
    await fetch('/api/pins', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'WHALE', targetId: address })
    });
    setData(prev => prev ? {
      ...prev,
      pinnedWhales: prev.pinnedWhales.filter(w => w.address !== address),
      stats: { ...prev.stats, totalWhales: prev.stats.totalWhales - 1 }
    } : null);
  };

  const unpinComparison = async (id: string) => {
    await fetch('/api/pins', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'COMPARISON', targetId: id })
    });
    setData(prev => prev ? {
      ...prev,
      pinnedComparisons: prev.pinnedComparisons.filter(c => c.id !== id),
      stats: { ...prev.stats, totalComparisons: prev.stats.totalComparisons - 1 }
    } : null);
  };

  const firstName = user.name?.split(' ')[0] ?? 'there';

  const toggleEmail = async () => {
    const r = await fetch('/api/user/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'toggle_email' })
    });
    const d = await r.json();
    if (d.emailNotifications !== undefined) setEmailNotifications(d.emailNotifications);
  };

  const generateTelegramCode = async () => {
    const r = await fetch('/api/user/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'generate_telegram_code' })
    });
    const d = await r.json();
    if (d.code) setTelegramCode(d.code);
  };

  const unlinkTelegram = async () => {
    await fetch('/api/user/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'unlink_telegram' })
    });
    setTelegramLinked(false);
    setTelegramCode(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-1">
            {user.image && (
              <img src={user.image} alt="" className="w-8 h-8 rounded-full" />
            )}
            <span className="text-gray-400 text-sm">Hey, {firstName}</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Your Dashboard</h1>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 border-b border-gray-800">
          <button
            type="button"
            onClick={() => setTab('pins')}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              tab === 'pins'
                ? 'border-[#00ff88] text-white'
                : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            Pins
          </button>
          <button
            type="button"
            onClick={() => setTab('notifications')}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              tab === 'notifications'
                ? 'border-[#00ff88] text-white'
                : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            Notifications
          </button>
        </div>

        {tab === 'notifications' && (
          <div className="space-y-6 max-w-xl">
            {notifLoading && (
              <div className="text-gray-500 text-sm py-8 text-center">Loading...</div>
            )}

            {notifLoaded && (
              <>
                {/* Email */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-white font-semibold">📧 Email Alerts</h3>
                      <p className="text-gray-400 text-sm mt-1">
                        Get notified at <span className="text-white">{user.email}</span> when
                        new arbitrage opportunities with ROI ≥ 1% are detected.
                      </p>
                    </div>
                    <button
                      onClick={toggleEmail}
                      className={`shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                        emailNotifications ? 'bg-[#00ff88]' : 'bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          emailNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  {emailNotifications && (
                    <p className="mt-3 text-xs text-[#00ff88]">✓ Email alerts active</p>
                  )}
                </div>

                {/* Telegram */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-white font-semibold">✈️ Telegram Alerts</h3>
                  <p className="text-gray-400 text-sm mt-1 mb-4">
                    Receive instant Telegram messages when arbitrage opportunities appear.
                  </p>

                  {telegramLinked ? (
                    <div className="space-y-3">
                      <p className="text-xs text-[#00ff88]">✓ Telegram linked</p>
                      <button
                        onClick={unlinkTelegram}
                        className="text-xs text-gray-500 hover:text-red-400 transition-colors underline"
                      >
                        Unlink Telegram
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {!telegramCode ? (
                        <button
                          onClick={generateTelegramCode}
                          className="inline-flex items-center gap-2 rounded-lg bg-[#229ED9] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a8bbf] transition-colors"
                        >
                          Connect Telegram
                        </button>
                      ) : (
                        <div className="space-y-3">
                          <a
                            href={`https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME}?start=${telegramCode}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-[#229ED9] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a8bbf] transition-colors"
                          >
                            ✈️ Open Telegram to verify →
                          </a>
                          <p className="text-xs text-gray-500">
                            Click the button above → tap Start in Telegram. Code expires in 10 minutes.
                          </p>
                          <button
                            onClick={() => setTelegramCode(null)}
                            className="text-xs text-gray-600 hover:text-gray-400 underline"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {tab === 'pins' && (
        <>
        {/* Stats row */}
        {data && (
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div className="text-2xl font-bold text-white">{data.stats.activeArbitrage}</div>
              <div className="text-gray-400 text-sm mt-1">Active arbitrage pins</div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div className="text-2xl font-bold text-white">{data.stats.totalWhales}</div>
              <div className="text-gray-400 text-sm mt-1">Whales tracked</div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div className="text-2xl font-bold text-white">{data.stats.totalComparisons}</div>
              <div className="text-gray-400 text-sm mt-1">Comparisons saved</div>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-gray-500 text-center py-20">Loading your pins...</div>
        )}

        {data && (
          <div className="space-y-10">

            {/* Arbitrage Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">📌 Pinned Arbitrage</h2>
                <Link href="/arbitrage" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Browse opportunities →
                </Link>
              </div>

              {data.pinnedArbitrage.length === 0 ? (
                <div className="bg-gray-900 border border-gray-800 border-dashed rounded-xl p-8 text-center">
                  <p className="text-gray-500 text-sm">No pinned arbitrage opportunities yet.</p>
                  <Link href="/arbitrage" className="text-blue-400 text-sm hover:underline mt-1 inline-block">
                    Find opportunities →
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.pinnedArbitrage.map(opp => {
                    const poly = opp.match.marketA.platform === 'POLYMARKET' ? opp.match.marketA : opp.match.marketB;
                    const kalshi = opp.match.marketA.platform === 'KALSHI' ? opp.match.marketA : opp.match.marketB;
                    return (
                      <div key={opp.id} className={`bg-gray-900 border rounded-xl p-5 flex items-center justify-between gap-4 ${opp.active ? 'border-gray-800' : 'border-gray-800 opacity-50'}`}>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {!opp.active && <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">Closed</span>}
                            {poly.category && <span className="text-xs text-gray-500">#{poly.category}</span>}
                          </div>
                          <p className="text-white font-medium truncate">{poly.question}</p>
                          <div className="flex items-center gap-3 mt-2 text-sm text-gray-400">
                            <span className="text-green-400 font-semibold">+{opp.roiPercent.toFixed(2)}% ROI</span>
                            <span>Buy YES on {opp.buyYesOn === 'POLYMARKET' ? 'Polymarket' : 'Kalshi'}</span>
                            <span>Buy NO on {opp.buyNoOn === 'POLYMARKET' ? 'Polymarket' : 'Kalshi'}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {poly.url && <a href={poly.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">Poly</a>}
                          {(kalshi.externalId || kalshi.url) && <a href={kalshi.externalId ? buildKalshiUrl({ externalId: kalshi.externalId, seriesId: kalshi.seriesId, eventId: kalshi.eventId, url: kalshi.url }) : kalshi.url!} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-400 hover:underline">Kalshi</a>}
                          <button
                            onClick={() => unpinArbitrage(opp.id)}
                            className="text-gray-600 hover:text-red-400 transition-colors ml-2 text-lg leading-none"
                            title="Unpin"
                          >×</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Whales Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">🐋 Tracked Whales</h2>
                <Link href="/whales" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Browse whales →
                </Link>
              </div>

              {data.pinnedWhales.length === 0 ? (
                <div className="bg-gray-900 border border-gray-800 border-dashed rounded-xl p-8 text-center">
                  <p className="text-gray-500 text-sm">No whales tracked yet.</p>
                  <Link href="/whales" className="text-blue-400 text-sm hover:underline mt-1 inline-block">
                    Find whales to track →
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.pinnedWhales.map(whale => (
                    <div key={whale.address} className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <Link href={`/whales/${whale.address}`} className="text-white font-medium hover:text-blue-400 transition-colors font-mono text-sm">
                          {whale.address.slice(0, 6)}...{whale.address.slice(-4)}
                        </Link>
                        {whale.notes && <p className="text-gray-500 text-sm mt-1">{whale.notes}</p>}
                        <p className="text-gray-600 text-xs mt-1">Pinned {new Date(whale.pinnedAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Link href={`/whales/${whale.address}`} className="text-xs text-blue-400 hover:underline">View profile</Link>
                        <button
                          onClick={() => unpinWhale(whale.address)}
                          className="text-gray-600 hover:text-red-400 transition-colors ml-2 text-lg leading-none"
                          title="Unpin"
                        >×</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Comparisons Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">⚖️ Saved Comparisons</h2>
                <Link href="/search" className="text-sm text-gray-400 hover:text-white transition-colors">
                  New comparison →
                </Link>
              </div>

              {data.pinnedComparisons.length === 0 ? (
                <div className="bg-gray-900 border border-gray-800 border-dashed rounded-xl p-8 text-center">
                  <p className="text-gray-500 text-sm">No saved comparisons yet.</p>
                  <Link href="/search" className="text-blue-400 text-sm hover:underline mt-1 inline-block">
                    Compare markets →
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.pinnedComparisons.map(comp => (
                    <div key={comp.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-blue-400 font-medium truncate max-w-xs">{comp.marketA.question}</span>
                          <span className="text-gray-600 shrink-0">vs</span>
                          <span className="text-purple-400 font-medium truncate max-w-xs">{comp.marketB.question}</span>
                        </div>
                        <p className="text-gray-600 text-xs mt-2">Saved {new Date(comp.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Link
                          href={`/compare?a=${comp.marketA.id}&b=${comp.marketB.id}`}
                          className="text-xs text-blue-400 hover:underline"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => unpinComparison(comp.id)}
                          className="text-gray-600 hover:text-red-400 transition-colors ml-2 text-lg leading-none"
                          title="Unpin"
                        >×</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

          </div>
        )}
        </>
        )}
      </div>
    </div>
  );
}
