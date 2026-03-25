'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import Link from 'next/link';

type ToastType = 'info' | 'error' | 'success';

const ICONS: Record<ToastType, string> = {
  info: 'ℹ️',
  success: '✅',
  error: '⚠️'
};

export interface ShowToastOptions {
  message: string;
  type?: ToastType;
  link?: { href: string; label: string };
}

type ToastContextValue = {
  showToast: (opts: ShowToastOptions) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return { showToast: () => {}, toastPortal: null };
  }
  return { ...ctx, toastPortal: null };
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<ShowToastOptions | null>(null);

  const dismiss = useCallback(() => {
    setOpen(false);
    setContent(null);
  }, []);

  const showToast = useCallback((opts: ShowToastOptions) => {
    setContent(opts);
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, dismiss]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const modal =
    open && content ? (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="toast-modal-title"
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          aria-label="Close"
          onClick={dismiss}
        />
        <div className="relative z-10 w-full max-w-sm rounded-2xl border border-white/20 bg-[#1a1a2e] px-8 py-10 text-center text-white shadow-2xl transition-opacity duration-300">
          <div className="flex flex-col items-center">
            <span className="mb-5 text-4xl leading-none" aria-hidden>
              {ICONS[content.type ?? 'info']}
            </span>
            <h2
              id="toast-modal-title"
              className="max-w-[280px] text-balance text-lg font-semibold leading-snug text-foreground"
            >
              {content.message}
            </h2>
            <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:justify-center sm:gap-3">
              <Link
                href={content.link?.href ?? '/login'}
                onClick={dismiss}
                className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-lg bg-[#00ff88] px-6 text-sm font-semibold text-[#0a0a0f] transition-colors hover:bg-[#00ff88]/90 sm:flex-initial sm:min-w-[140px]"
              >
                {content.link?.label ?? 'Sign in'}
              </Link>
              <button
                type="button"
                onClick={dismiss}
                className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-lg border border-white/20 bg-transparent px-6 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground sm:flex-initial sm:min-w-[140px]"
              >
                Not now
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {modal}
    </ToastContext.Provider>
  );
}
