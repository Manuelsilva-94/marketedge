'use client';

import { useCallback, useEffect, useState } from 'react';
import { BMC_DONATION_URL, PAYPAL_DONATION_URL } from '@/lib/donation-links';

const STORAGE_KEY = 'donation_bubble_closed';

type DonationBubbleProps = {
  /** Por defecto: fijo abajo a la izquierda en todo el sitio */
  className?: string;
};

export function DonationBubble({ className }: DonationBubbleProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      if (localStorage.getItem(STORAGE_KEY) === 'true') return;
      setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  const handleClose = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      /* ignore */
    }
    setShow(false);
  }, []);

  if (!show) return null;

  const positionClass =
    className?.trim() ?? 'fixed bottom-6 left-6 z-[60]';

  return (
    <div className={`group ${positionClass}`.trim()}>
      <div className="relative">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close donation bubble"
          className="pointer-events-none absolute -right-1 -top-1 z-10 flex h-5 w-5 scale-0 items-center justify-center rounded-full border border-white/10 bg-[#1a1a2e] text-xs leading-none text-muted-foreground opacity-0 shadow-md transition-all duration-300 hover:text-white group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100"
        >
          ×
        </button>
        <div className="flex h-11 max-w-[44px] items-center overflow-hidden rounded-full border border-white/10 bg-[#1a1a2e] text-sm text-muted-foreground shadow-lg transition-all duration-300 group-hover:max-w-[min(100vw-2rem,340px)] group-hover:text-white">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center text-base leading-none">
            ☕
          </span>
          <div className="flex min-w-0 shrink items-center gap-2 pr-3">
            <a
              href={BMC_DONATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 whitespace-nowrap text-xs transition-colors hover:text-white"
            >
              Buy me a coffee
            </a>
            <span className="select-none text-white/25" aria-hidden>
              ·
            </span>
            <a
              href={PAYPAL_DONATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 whitespace-nowrap text-xs transition-colors hover:text-white"
            >
              PayPal
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
