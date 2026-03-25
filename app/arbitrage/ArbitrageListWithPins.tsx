'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/providers/ToastProvider';
import { OpportunityCard } from '@/components/arbitrage/OpportunityCard';
import type { OpportunityCardOpportunity } from '@/components/arbitrage/OpportunityCard';

type OpportunityWithMatchId = OpportunityCardOpportunity & { matchId?: string };

interface ArbitrageListWithPinsProps {
  opportunities: OpportunityWithMatchId[];
}

export function ArbitrageListWithPins({ opportunities }: ArbitrageListWithPinsProps) {
  const { data: session } = useSession();
  const { showToast } = useToast();
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!session) return;
    fetch('/api/pins?type=ARBITRAGE')
      .then(r => r.json())
      .then(d => {
        if (d.pins) {
          setPinnedIds(new Set(d.pins.map((p: { targetId: string }) => p.targetId)));
        }
      });
  }, [session]);

  const togglePin = async (id: string) => {
    if (!session) {
      showToast({
        message: 'Sign in to pin arbitrage opportunities',
        type: 'info',
        link: { href: '/login', label: 'Sign in' }
      });
      return;
    }
    const isPinned = pinnedIds.has(id);
    if (isPinned) {
      await fetch('/api/pins', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'ARBITRAGE', targetId: id })
      });
      setPinnedIds(prev => { const next = new Set(prev); next.delete(id); return next; });
    } else {
      await fetch('/api/pins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'ARBITRAGE', targetId: id })
      });
      setPinnedIds(prev => new Set(prev).add(id));
    }
  };

  return (
    <ul className="space-y-4">
      {opportunities.map((opp) => (
        <li key={opp.id} className="relative">
          <div className="absolute top-0 right-0 z-10 pt-5 pr-5">
            <button
              onClick={() => togglePin(opp.matchId ?? opp.id)}
              className={`text-lg transition-colors ${pinnedIds.has(opp.matchId ?? opp.id) ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-400'}`}
              title={pinnedIds.has(opp.matchId ?? opp.id) ? 'Unpin' : 'Pin to dashboard'}
            >
              {pinnedIds.has(opp.matchId ?? opp.id) ? '★' : '☆'}
            </button>
          </div>
          <OpportunityCard opportunity={opp} />
        </li>
      ))}
    </ul>
  );
}
