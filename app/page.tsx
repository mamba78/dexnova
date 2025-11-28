// app/page.tsx — 100% FINAL VERSION (Deploy this now)
import { getTrendingTokens } from "@/lib/gecko";
import TokenCard from "@/components/TokenCard";
import EngagementTrio from "@/components/EngagementTrio";
import WatchlistButton from "@/components/WatchlistButton";
import { Metadata } from "next";

export const revalidate = 30; // Refresh every 30 seconds

// BEST SEO IN CRYPTO 2025
export const metadata: Metadata = {
  title: "DexNova – #1 Live DEX Tracker 2025 | Solana, Base, ETH & More",
  description: "Real-time trending tokens, whale alerts, airdrop scanner, and gamified engagement. 100% positive. Better than DexScreener.",
  keywords: "dex tracker, solana dex, base chain, dex screener alternative, trending tokens, jupiter swap, memecoin tracker",
  authors: [{ name: "DexNova" }],
  openGraph: {
    title: "DexNova – The Future of DEX Tracking",
    description: "Real-time multi-chain scanner with Rocket, Moon & Fire buttons. Earn on every swap.",
    url: "https://dexnova.app",
    siteName: "DexNova",
    images: [
      {
        url: "https://dexnova.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DexNova – Live DEX Tracker",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DexNova – Better Than DexScreener",
    description: "Live trending, whale alerts, airdrops, and gamified engagement",
    images: ["https://dexnova.app/og-image.jpg"],
    creator: "@dexnova",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function HomePage() {
  const tokens = await getTrendingTokens("solana", 12); // Real live data

  return (
    <>
      <main className="min-h-screen bg-black text-white pb-20">
        {/* Hero */}
        <section className="pt-10 pb-16 px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
            DexNova
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mt-4 max-w-2xl mx-auto">
            The <span className="text-cyan-400 font-bold">safest</span>, most{" "}
            <span className="text-pink-400 font-bold">addictive</span> DEX tracker of 2025
          </p>
          <p className="text-gray-500 mt-2">Real-time • 8 Chains • Zero Rug Scores • Pure Alpha</p>
        </section>

        {/* Live Trending Grid – Perfect Mobile & Desktop */}
        <section className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Live Trending on <span className="text-cyan-400">Solana</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
            {tokens.map((token: any) => (
              <TokenCard key={token.address} token={token}>
                {/* Jupiter Swap Button + Watchlist */}
                <div className="mt-4 space-y-3">
                  <a
                    href={`https://jup.ag/swap/SOL-${token.address}?ref=DEXNOVA2025`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 py-3.5 rounded-2xl font-bold text-lg transition transform hover:scale-105 shadow-lg"
                  >
                    Buy on Jupiter
                  </a>

                  <WatchlistButton token={token} />
                </div>

                {/* Engagement Trio – Always at bottom */}
                <EngagementTrio tokenAddress={token.address} chain={token.chain} />
              </TokenCard>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400">More chains coming weekly • Built for degens, by degens</p>
          </div>
        </section>
      </main>
    </>
  );
}