'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface SaveComparisonButtonProps {
  marketAId: string;
  marketBId: string;
}

export function SaveComparisonButton({ marketAId, marketBId }: SaveComparisonButtonProps) {
  const { data: session } = useSession();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const targetId = `${marketAId}:${marketBId}`;

  useEffect(() => {
    if (!session) return;
    fetch('/api/pins?type=COMPARISON')
      .then(r => r.json())
      .then(d => {
        if (d.pins?.some((p: { targetId: string }) => p.targetId === targetId)) {
          setSaved(true);
        }
      });
  }, [session, targetId]);

  const toggle = async () => {
    if (!session) {
      window.location.href = '/login';
      return;
    }
    setLoading(true);
    if (saved) {
      await fetch('/api/pins', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'COMPARISON', targetId })
      });
      setSaved(false);
    } else {
      await fetch('/api/pins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'COMPARISON', targetId })
      });
      setSaved(true);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`flex items-center gap-2 text-sm transition-colors disabled:opacity-50 ${
        saved ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'
      }`}
    >
      <span>{saved ? '★' : '☆'}</span>
      <span>{loading ? '...' : saved ? 'Saved to dashboard' : 'Save to dashboard'}</span>
    </button>
  );
}
