'use client';
import Link from 'next/link';

export default function TokenCard({ token, index }: { token: any; index: number }) {
  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 hover:scale-[1.02] transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <img src={token.logo} alt="" className="w-12 h-12 rounded-full ring-2 ring-gray-700" />
        <div className="flex-1">
          <h3 className="font-bold text-base md:text-lg">{token.name}</h3>
          <p className="text-xs text-gray-400">{token.chain}</p>
        </div>
      </div>

      <div className="text-xl md:text-2xl font-black mb-2">{token.price}</div>
      <div className={`text-lg md:text-xl font-bold mb-4 ${token.change24h.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
        {token.change24h}
      </div>

      <div className="text-xs md:text-sm text-gray-400 space-y-1">
        <div>Vol: ${token.volume24h}</div>
        <div>Liq: ${token.liquidity}</div>
      </div>

      <Link href={`/token/${token.id}`}>
        <button className="w-full mt-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-sm hover:scale-105 transition">
          View Token
        </button>
      </Link>
    </div>
  );
}
