// components/TokenCard.tsx — ULTIMATE FINAL VERSION
'use client';

import Link from "next/link";
import { ArrowUpRight, ArrowDownRight, Heart, ExternalLink } from "lucide-react";
import { useState } from "react";

interface Token {
  address: string;
  name: string;
  symbol?: string;
  price: string;
  change24h: string;
  chain: string;
  liquidity?: string;
  volume24h?: string;
  fdv?: string;
}

export default function TokenCard({ token, children }: { token: Token; children?: React.ReactNode }) {
  const isUp = token.change24h.startsWith("+");
  const [isSaved, setIsSaved] = useState(false);

  // Jupiter affiliate from Admin Panel (env var controlled there)
  const jupiterRef = process.env.NEXT_PUBLIC_JUPITER_REF || "DEXNOVA2025";

  const handleSave = () => {
    const watchlist = JSON.parse(localStorage.getItem("dexnova_watchlist") || "[]");
    if (!watchlist.find((t: Token) => t.address === token.address)) {
      watchlist.push(token);
      localStorage.setItem("dexnova_watchlist", JSON.stringify(watchlist));
      setIsSaved(true);
    }
  };

  return (
    <div className="group relative bg-gradient-to-br from-gray-950 via-gray-900 to-black rounded-3xl overflow-hidden border border-gray-800 hover:border-cyan-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 h-full flex flex-col">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent blur-3xl" />
      </div>

      <Link href={`/token/${token.address}`} className="relative z-10 block flex-1 p-6 pb-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-5">
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl md:text-3xl font-black text-white truncate">{token.name}</h3>
            {token.symbol && (
              <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">{token.symbol}</p>
            )}
            <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{token.chain}</p>
          </div>

          <div className={`flex items-center gap-1.5 ${isUp ? "text-green-400" : "text-red-400"} font-bold`}>
            {isUp ? <ArrowUpRight className="w-6 h-6" /> : <ArrowDownRight className="w-6 h-6" />}
            <span className="text-xl md:text-2xl">{token.change24h}</span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <p className="text-4xl md:text-5xl font-black text-white leading-none">{token.price}</p>
          {token.liquidity && (
            <p className="text-sm text-gray-400 mt-2">Liquidity: {token.liquidity}</p>
          )}
        </div>

        {/* Extra Stats Row */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gray-800/60 backdrop-blur rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wide">24h Volume</p>
            <p className="text-sm font-bold text-white mt-1">{token.volume24h || "—"}</p>
          </div>
          <div className="bg-gray-800/60 backdrop-blur rounded-xl rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wide">FDV</p>
            <p className="text-sm font-bold text-white mt-1">{token.fdv || "—"}</p>
          </div>
        </div>

        {/* Transparency Rating (Positive Only) 
        <div className="bg-gradient-to-r from-cyan-900/40 to-purple-900/40 backdrop-blur rounded-2xl p-4 text-center border border-cyan-500/30">
          <p className="text-xs text-cyan-300 uppercase tracking-widest mb-1">Community Trust Score</p>
          <p className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            94%
          </p>
        </div>
      </Link>

      {/* Bottom Action Bar */}
      <div className="relative z-10 p-6 pt-4 space-y-3 border-t border-gray-800 bg-black/40 backdrop-blur">
        {/* Jupiter Swap Button */}
        <a
          href={`https://jup.ag/swap/SOL-${token.address}?ref=${jupiterRef}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 hover:from-cyan-400 hover:via-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-2xl font-black text-lg transition-all transform hover:scale-105 shadow-xl hover:shadow-cyan-500/50"
        >
          <span>Buy on Jupiter</span>
          <ExternalLink className="w-5 h-5" />
        </a>

        {/* Watchlist Button */}
        <button
          onClick={handleSave}
          className={`w-full flex items-center justify-center gap-3 py-3 rounded-2xl font-bold transition-all ${
            isSaved
              ? "bg-pink-600 text-white shadow-lg shadow-pink-500/30"
              : "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
          }`}
        >
          <Heart className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
          {isSaved ? "Saved to Watchlist" : "Add to Watchlist"}
        </button>

        {/* Children = Engagement Trio */}
        <div className="pt-2">{children}</div>
      </div>
    </div>
  );
}