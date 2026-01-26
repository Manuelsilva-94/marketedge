import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MarketEdge - Cross-Platform Prediction Markets Intelligence",
  description: "Aggregate data from Polymarket + Kalshi. Detect arbitrage opportunities across platforms. Real-time analytics and alerts.",
  openGraph: {
    title: "MarketEdge - Cross-Platform Prediction Markets Intelligence",
    description: "Aggregate data from Polymarket + Kalshi. Detect arbitrage opportunities across platforms.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center space-x-2">
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    MarketEdge
                  </span>
                </Link>
                <nav className="flex items-center space-x-6">
                  <Link
                    href="/"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/arbitrage"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Arbitrage
                  </Link>
                  <Link
                    href="/platform/polymarket"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Polymarket
                  </Link>
                  <Link
                    href="/platform/kalshi"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Kalshi
                  </Link>
                </nav>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container px-4 py-8">
              {children}
            </main>

            {/* Footer */}
            <footer className="border-t bg-muted/50">
              <div className="container px-4 py-8">
                <div className="grid gap-8 md:grid-cols-3">
                  <div>
                    <h3 className="font-semibold mb-4">MarketEdge</h3>
                    <p className="text-sm text-muted-foreground">
                      Cross-platform prediction markets intelligence and arbitrage detection.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Platforms</h3>
                    <div className="space-y-2 text-sm">
                      <a
                        href="https://polymarket.com?utm_source=marketedge"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-muted-foreground hover:text-foreground"
                      >
                        Polymarket
                      </a>
                      <a
                        href="https://kalshi.com?utm_source=marketedge"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-muted-foreground hover:text-foreground"
                      >
                        Kalshi
                      </a>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Ad Space</h3>
                    <div className="text-sm text-muted-foreground">
                      <p>Powered by prediction markets</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                  <p>© {new Date().getFullYear()} MarketEdge. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
