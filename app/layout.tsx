import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { ToastProvider } from '@/components/providers/ToastProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DonationBubble } from '@/components/ui/DonationBubble';
import Script from 'next/script';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit'
});

export const metadata: Metadata = {
  title: 'MarketEdge — Compare Prediction Markets',
  description:
    'Real-time comparison across Polymarket & Kalshi. Find arbitrage opportunities and follow smart money.'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en" className="dark">
      <body className={`min-h-screen bg-[#0a0a0f] font-sans text-foreground antialiased ${outfit.variable}`}>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3037455847496100"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <SessionProvider session={session}>
          <ToastProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ToastProvider>
        </SessionProvider>
        <DonationBubble />
      </body>
    </html>
  );
}
