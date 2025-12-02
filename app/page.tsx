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

        if (data?.data?.length > 0) {
          const liveTokens = data.data.slice(0, 20).map((p: any) => {
            const a = p.attributes;
            return {
              id: p.id,
              name: a.name?.split(' / ')[0] || 'Unknown',
              symbol: a.base_token_symbol || '???',
              price: a.base_token_price_usd ? `$${Number(a.base_token_price_usd).toFixed(8)}` : 'N/A',
              change24h: a.price_change_percentage?.h24 
                ? (a.price_change_percentage.h24 > 0 ? '+' : '') + a.price_change_percentage.h24.toFixed(2) + '%'
                : '0%',
              volume24h: a.volume_usd?.h24 
                ? '$' + (a.volume_usd.h24 / 1000000).toFixed(2) + 'M' 
                : '$0',
              liquidity: a.reserve_in_usd 
                ? '$' + (a.reserve_in_usd / 1000000).toFixed(2) + 'M' 
                : '$0',
              logo: a.base_token?.icon_url || 'https://via.placeholder.com/64',
              chain: 'Solana',
            };
          });
          setTokens(liveTokens);
        }
      } catch (err) {
        console.error("Failed to fetch live data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLive();
    const interval = setInterval(fetchLive, 15000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-32 text-center">
        <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Loading live tokens...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 px-4">
      <h1 className="text-5xl md:text-7xl font-black text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Hot Pairs • Live
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {tokens.map(token => (
          <div 
            key={token.id}
            className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-2xl p-6 hover:border-purple-600 transition-all hover:shadow-2xl hover:shadow-purple-500/20"
          >
            <div className="flex items-center gap-4 mb-5">
              <img src={token.logo} alt={token.name} className="w-16 h-16 rounded-full ring-4 ring-gray-800" />
              <div>
                <div className="text-xl font-black">{token.name}</div>
                <div className="text-sm text-gray-500">{token.symbol} • {token.chain}</div>
              </div>
            </div>

            <div className="text-3xl font-black mb-3">{token.price}</div>
            <div className={`text-2xl font-bold mb-6 ${token.change24h.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
              {token.change24h}
            </div>

            <div className="space-y-2 text-sm text-gray-400 mb-6">
              <div>Volume: {token.volume24h}</div>
              <div>Liquidity: {token.liquidity}</div>
            </div>

            <Link href={`/token/${token.id}`}>
              <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-lg">
                View Token
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
