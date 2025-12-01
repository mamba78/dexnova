'use client';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function TokenCard({ token, index }: { token: any; index: number }) {
  const isBoosted = localStorage.getItem(`boosted-${token.id}`) === 'true';

  return (
    <div 
      className={`relative bg-gray-900/60 border rounded-xl p-6 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl cursor-pointer
        ${isBoosted 
          ? 'border-yellow-500 shadow-2xl shadow-yellow-500/30 ring-2 ring-yellow-500/50' 
          : 'border-gray-800 hover:border-purple-500/50'
        }`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* BOOSTED BADGE */}
      {isBoosted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-amber-600 text-black px-5 py-2 rounded-full font-bold text-sm shadow-xl flex items-center gap-2 animate-pulse">
            <Sparkles className="w-4 h-4" />
            BOOSTED
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 mb-4">
        <img src={token.logo} alt="" className="w-14 h-14 rounded-full ring-2 ring-gray-700" />
        <div>
          <h3 className="font-bold text-xl">{token.name}</h3>
          <p className="text-sm text-gray-400">{token.chain}</p>
        </div>
      </div>

      <div className="text-3xl font-black mb-2">{token.price}</div>
      <div className={`text-2xl font-bold mb-4 ${token.change24h.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
        {token.change24h.startsWith('+') ? '+' : ''}{token.change24h}
      </div>

      <div className="text-sm text-gray-400 space-y-1">
        <div>Vol: ${token.volume24h}</div>
        <div>Liq: ${token.liquidity}</div>
      </div>

      <Link href={`/token/${token.id}`}>
        <button className="w-full mt-6 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:scale-105 transition shadow-lg">
          View Token
        </button>
      </Link>
    </div>
  );
}
