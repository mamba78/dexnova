'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const networks = ['solana','base','ethereum','bsc','polygon','arbitrum','optimism','zksync_era'];

export default function TokensTable() {
  const searchParams = useSearchParams();
  const selectedChain = searchParams.get('chain') || 'all';
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      const all: any[] = [];
      const chainsToFetch = selectedChain === 'all' ? networks : [selectedChain];
      
      for (const net of chainsToFetch) {
        try {
          const res = await fetch(`https://api.geckoterminal.com/api/v2/networks/${net}/trending_pools`);
          const data = await res.json();
          if (data.data) {
            data.data.slice(0, 12).forEach((p: any) => {
              const a = p.attributes;
              all.push({
                id: a.address || Math.random().toString(36),
                name: a.name.split(' / ')[0] || 'Unknown',
                chain: net.replace('_',' ').replace(/\b\w/g, l => l.toUpperCase()),
                price: a.base_token_price_usd ? `$${Number(a.base_token_price_usd).toFixed(6)}` : 'N/A',
                change24h: a.price_change_percentage?.h24 ? (a.price_change_percentage.h24 > 0 ? '+' : '') + a.price_change_percentage.h24.toFixed(2) + '%' : '0%',
                volume: a.volume_usd?.h24 ? '$' + (a.volume_usd.h24 / 1e6).toFixed(2) + 'M' : '$0',
                liquidity: a.reserve_in_usd ? '$' + (a.reserve_in_usd / 1e6).toFixed(2) + 'M' : '$0',
                logo: a.base_token?.icon_url || 'https://via.placeholder.com/32',
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

  if (loading) return <div className="text-center py-32 text-3xl text-gray-400">Loading live tokens...</div>;

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tokens.map(t => (
        <div key={t.id} className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 hover:scale-105 transition-all duration-300 shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <img src={t.logo} alt="" className="w-14 h-14 rounded-full ring-2 ring-gray-700" />
            <div>
              <h3 className="font-bold text-lg">{t.name}</h3>
              <p className="text-sm text-gray-400">{t.chain}</p>
            </div>
          </div>
          <div className="text-3xl font-black mb-2">{t.price}</div>
          <div className={`text-xl font-bold mb-4 ${t.change24h.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
            {t.change24h}
          </div>
          <div className="text-sm text-gray-400 space-y-1">
            <div>Volume: {t.volume}</div>
            <div>Liquidity: {t.liquidity}</div>
          </div>
          <Link href={`/token/${t.id}`}>
            <button className="w-full mt-6 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:scale-105 transition shadow-lg">
              View Token
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}
