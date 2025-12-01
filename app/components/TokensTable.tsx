'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const networks = ['solana','base','ethereum','bsc','polygon','arbitrum','optimism','zksync_era'];

export default function TokensTable({ selectedChain }: { selectedChain: string }) {
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      const all: any[] = [];
      for (const net of networks) {
        if (selectedChain !== 'all' && net !== selectedChain) continue;
        try {
          const res = await fetch(`https://api.geckoterminal.com/api/v2/networks/${net}/trending_pools`);
          const data = await res.json();
          if (data.data) {
            data.data.slice(0, 12).forEach((p: any) => {
              const a = p.attributes;
              all.push({
                id: a.address || Math.random().toString(36),
                name: a.name.split(' / ')[0],
                chain: net.replace('_',' ').replace(/\b\w/g, l => l.toUpperCase()),
                price: a.base_token_price_usd ? `$${Number(a.base_token_price_usd).toFixed(6)}` : 'N/A',
                change24h: a.price_change_percentage?.h24 ? (a.price_change_percentage.h24 > 0 ? '+' : '') + a.price_change_percentage.h24.toFixed(2) + '%' : '0%',
                volume: a.volume_usd?.h24 ? '$' + (a.volume_usd.h24 / 1e6).toFixed(2) + 'M' : '$0',
                liquidity: a.reserve_in_usd ? '$' + (a.reserve_in_usd / 1e6).toFixed(2) + 'M' : '$0',
                logo: a.base_token?.icon_url || 'https://via.placeholder.com/32',
                boosted: localStorage.getItem(`boosted-${p.id}`) === 'true',
              });
            });
          }
        } catch (e) {}
      }
      setTokens(all);
      setLoading(false);
    };
    fetchTokens();
    const interval = setInterval(fetchTokens, 20000);
    return () => clearInterval(interval);
  }, [selectedChain]);

  if (loading) return <div className="text-center py-32 text-2xl">Loading live tokens...</div>;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tokens.map(t => (
        <div key={t.id} className={`relative bg-gray-900/60 border ${t.boosted ? 'border-yellow-500 shadow-lg shadow-yellow-500/30' : 'border-gray-800'} rounded-xl p-6 hover:scale-105 transition-all duration-300`}>
          {t.boosted && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full text-xs font-bold animate-pulse">
              BOOSTED
            </div>
          )}
          <div className="flex items-center gap-4 mb-4">
            <img src={t.logo} alt="" className="w-12 h-12 rounded-full ring-2 ring-gray-700" />
            <div>
              <h3 className="font-bold text-lg">{t.name}</h3>
              <p className="text-xs text-gray-400">{t.chain}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-2xl font-black">{t.price}</div>
            <div className={`text-xl font-bold ${t.change24h.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
              {t.change24h}
            </div>
            <div className="text-sm text-gray-400">
              Vol: {t.volume} • Liq: {t.liquidity}
            </div>
          </div>
          <Link href={`/token/${t.id}`}>
            <button className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:scale-105 transition">
              View Token
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}
