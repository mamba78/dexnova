'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const all: any[] = [];
      const networks = ['solana','base','ethereum','bsc','polygon','arbitrum','optimism','zksync_era'];
      for (const net of networks) {
        try {
          const res = await fetch(`https://api.geckoterminal.com/api/v2/networks/${net}/trending_pools`);
          const data = await res.json();
          if (data.data) {
            data.data.slice(0, 6).forEach((p: any) => {
              const a = p.attributes;
              all.push({
                id: a.address || Math.random().toString(36),
                name: a.name.split(' / ')[0],
                chain: net.replace('_',' ').replace(/\b\w/g, l => l.toUpperCase()),
                price: a.base_token_price_usd ? `$${parseFloat(a.base_token_price_usd).toFixed(6)}` : '$0.00',
                change24h: a.price_change_percentage?.h24 ? a.price_change_percentage.h24.toFixed(2) + '%' : '0%',
                volume: a.volume_usd?.h24 ? '$' + (a.volume_usd.h24 / 1e6).toFixed(2) + 'M' : '$0',
                liquidity: a.reserve_in_usd ? '$' + (a.reserve_in_usd / 1e6).toFixed(2) + 'M' : '$0',
                boosted: localStorage.getItem('boosted-' + a.address) === 'true',
              });
            });
          }
        } catch (e) {}
      }
      setTokens(all);
      setLoading(false);
    };
    fetchData();
    const id = setInterval(fetchData, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-5xl font-black text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Hot Pairs • Live
      </h1>
      {loading ? (
        <div className="text-center py-20 text-2xl">Loading real-time data...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tokens.sort((a,b) => b.boosted ? -1 : 1).map(t => (
            <div key={t.id} className={`bg-gray-900/50 border ${t.boosted ? 'border-yellow-500 shadow-lg shadow-yellow-500/20' : 'border-gray-800'} rounded-xl p-6 hover:scale-105 transition`}>
              {t.boosted && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full text-xs font-bold">BOOSTED</div>}
              <h3 className="font-bold text-lg">{t.name}</h3>
              <p className="text-sm text-gray-400">{t.chain}</p>
              <p className="text-2xl font-black my-4">{t.price}</p>
              <p className={`text-xl font-bold ${t.change24h.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{t.change24h}</p>
              <p className="text-sm text-gray-400 mt-2">Volume: {t.volume}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
