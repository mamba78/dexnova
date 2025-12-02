'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLive = async () => {
      try {
        const res = await fetch('https://api.geckoterminal.com/api/v2/networks/solana/trending_pools');
        const data = await res.json();
        if (data?.data) {
          const live = data.data.slice(0, 20).map((p: any) => {
            const a = p.attributes;
            return {
              id: p.id,
              name: a.name.split(' / ')[0],
              symbol: a.base_token_symbol,
              price: a.base_token_price_usd ? `$${Number(a.base_token_price_usd).toFixed(6)}` : 'N/A',
              change24h: a.price_change_percentage?.h24 ? (a.price_change_percentage.h24 > 0 ? '+' : '') + a.price_change_percentage.h24.toFixed(2) + '%' : '0%',
              volume24h: a.volume_usd?.h24 ? '$' + (a.volume_usd.h24 / 1e6).toFixed(2) + 'M' : '$0',
              liquidity: a.reserve_in_usd ? '$' + (a.reserve_in_usd / 1e6).toFixed(2) + 'M' : '$0',
              logo: a.base_token?.icon_url || 'https://via.placeholder.com/64',
              chain: 'Solana',
            };
          });
          setTokens(live);
        }
      } catch (e) {
        console.log("API error");
      } finally {
        setLoading(false);
      }
    };

    fetchLive();
    const interval = setInterval(fetchLive, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black pt-24 px-4 md:px-6">
      <h1 className="text-5xl md:text-6xl font-black text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Hot Pairs • Live
      </h1>

      {loading ? (
        <div className="text-center py-32 text-2xl text-gray-400">Loading real-time data...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {tokens.map(token => (
            <div key={token.id} className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <img src={token.logo} alt="" className="w-14 h-14 rounded-full ring-2 ring-gray-700" />
                <div>
                  <h3 className="font-bold text-lg">{token.name}</h3>
                  <p className="text-sm text-gray-400">{token.chain}</p>
                </div>
              </div>
              <div className="text-3xl font-black mb-2">{token.price}</div>
              <div className={`text-2xl font-bold mb-4 ${token.change24h.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {token.change24h}
              </div>
              <div className="text-sm text-gray-400 space-y-1">
                <div>Vol: {token.volume24h}</div>
                <div>Liq: {token.liquidity}</div>
              </div>
              <Link href={`/token/${token.id}`}>
                <button className="w-full mt-6 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:scale-105 transition">
                  View Token
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
