'use client';
import { useEffect, useState } from 'react';
import TokenCard from './components/TokenCard';

export default function Home() {
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const res = await fetch('https://api.geckoterminal.com/api/v2/networks/solana/trending_pools');
        const data = await res.json();
        if (data.data) {
          setTokens(data.data.slice(0, 20).map((p: any) => {
            const a = p.attributes;
            return {
              id: p.id,
              name: a.name.split(' / ')[0],
              chain: 'Solana',
              price: `$${Number(a.base_token_price_usd || 0).toFixed(6)}`,
              change24h: a.price_change_percentage?.h24?.toFixed(2) + '%' || '0%',
              volume24h: (a.volume_usd?.h24 / 1e6).toFixed(2) + 'M',
              liquidity: (a.reserve_in_usd / 1e6).toFixed(2) + 'M',
              logo: a.base_token?.icon_url || 'https://via.placeholder.com/64',
            };
          }));
        }
      } catch (e) {
        console.log("API error");
      } finally {
        setLoading(false);
      }
    };
    fetchTokens();
    const interval = setInterval(fetchTokens, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black pt-20 px-4 md:px-6">
      <h1 className="text-4xl md:text-6xl font-black text-center mb-10 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Hot Pairs • Live
      </h1>

      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading live tokens...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {tokens.map((token, i) => (
            <TokenCard key={token.id} token={token} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
