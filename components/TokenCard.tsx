'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface Token {
  address: string;
  name: string;
  symbol: string;
  price: string;
  change24h: string;
  chain: string;
  volume24h: string;
  fdv: string;
  liquidity: string;
  sparkline: number[];
}

export default function TokenCard({ token }: { token: Token }) {
  const isUp = token.change24h.startsWith('+');

  return (
    <Link href={`/token/${token.address}`} className="group">
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-cyan-500 transition-all hover:shadow-2xl hover:shadow-cyan-500/20">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white truncate">{token.name}</h3>
            <p className="text-sm text-gray-400">{token.symbol} • {token.chain}</p>
          </div>
          <span className={`text-lg font-bold px-3 py-1 rounded-full ${isUp ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'}`}>
            {token.change24h}
          </span>
        </div>

        {/* Price */}
        <p className="text-3xl font-black text-white mb-4">{token.price}</p>

        {/* Sparkline Chart */}
        <div className="h-12 w-full bg-gray-800 rounded-lg overflow-hidden mb-4">
          <svg viewBox="0 0 100 12" className="w-full h-full">
            <polyline
              points="0,10 10,8 20,6 30,4 40,2 50,3 60,5 70,7 80,9 90,11 100,10"
              fill="none"
              stroke={isUp ? '#10b981' : '#ef4444'}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-sm text-gray-400 mb-4">
          <div className="text-center">
            <p>Volume 24h</p>
            <p className="font-bold text-white">{token.volume24h}</p>
          </div>
          <div className="text-center">
            <p>FDV</p>
            <p className="font-bold text-white">{token.fdv}</p>
          </div>
          <div className="text-center">
            <p>Liquidity</p>
            <p className="font-bold text-white">{token.liquidity}</p>
          </div>
        </div>

        {/* Buy Button */}
        <a
          href={`https://jup.ag/swap/SOL-${token.address}?ref=DEXNOVA2025`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold text-white hover:from-cyan-400 hover:to-purple-500 transition"
        >
          Buy on Jupiter
          <ExternalLink className="inline w-4 h-4 ml-2" />
        </a>
      </div>
    </Link>
  );
}
