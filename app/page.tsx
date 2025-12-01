'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    chain: 'all',
    timeframe: '24h',
    minVolume: 0,
    minLiquidity: 0,
    safeOnly: false,
  });

  useEffect(() => {
    const fetchLiveTokens = async () => {
      const all: any[] = [];
      const networks = ['solana', 'base', 'ethereum', 'bsc', 'polygon', 'arbitrum', 'optimism', 'zksync_era'];
      
      for (const net of networks) {
        try {
          const res = await fetch(`https://api.geckoterminal.com/api/v2/networks/${net}/pools?include=base_token,quote_token`, {
            headers: { 'accept': 'application/json' }
          });
          const data = await res.json();
          if (data?.data) {
            data.data.slice(0, 15).forEach((pool: any) => {
              const a = pool.attributes;
              all.push({
                id: pool.id,
                name: a.name.split(' / ')[0],
                symbol: a.base_token_symbol,
                chain: net.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
                price: a.base_token_price_usd ? `$${Number(a.base_token_price_usd).toFixed(6)}` : 'N/A',
                change24h: a.price_change_percentage?.h24 ? (a.price_change_percentage.h24 > 0 ? '+' : '') + a.price_change_percentage.h24.toFixed(2) + '%' : '0%',
                volume: a.volume_usd?.h24 ? '$' + (a.volume_usd.h24 / 1e6).toFixed(2) + 'M' : '$0',
                liquidity: a.reserve_in_usd ? '$' + (a.reserve_in_usd / 1e6).toFixed(2) + 'M' : '$0',
                logo: a.base_token?.icon_url || '/placeholder.svg',
                boosted: localStorage.getItem(`boosted-${pool.id}`) === 'true',
              });
            });
          }
        } catch (e) {
          console.log("API error for", net);
        }
      }
      setTokens(all);
      setLoading(false);
    };

    fetchLiveTokens();
    const interval = setInterval(fetchLiveTokens, 15000);
    return () => clearInterval(interval);
  }, []);

  const filtered = tokens.filter(t => {
    if (filters.chain !== 'all' && t.chain.toLowerCase() !== filters.chain.toLowerCase()) return false;
    if (filters.minVolume > 0 && parseFloat(t.volume.replace(/[^0-9.]/g,'')) < filters.minVolume) return false;
    if (filters.minLiquidity > 0 && parseFloat(t.liquidity.replace(/[^0-9.]/g,'')) < filters.minLiquidity) return false;
    if (filters.safeOnly && !t.safe) return false;
    return true;
  });

  return (
    <div className="p-6 pt-24">
      <h1 className="text-6xl font-black text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Hot Pairs • Live Multi-Chain
      </h1>

      {/* FULL FILTERS */}
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4 mb-8 justify-center">
        <select onChange={(e) => setFilters(f => ({ ...f, chain: e.target.value }))} className="px-6 py-3 bg-gray-900 rounded-xl">
          <option value="all">All Chains</option>
          <option>Solana</option><option>Base</option><option>Ethereum</option>
        </select>
        <input type="number" placeholder="Min Volume (M)" onChange={e => setFilters(f => ({ ...f, minVolume: Number(e.target.value) }))} className="px-4 py-3 bg-gray-900 rounded-xl" />
        <input type="number" placeholder="Min Liquidity (M)" onChange={e => setFilters(f => ({ ...f, minLiquidity: Number(e.target.value) }))} className="px-4 py-3 bg-gray-900 rounded-xl" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" onChange={e => setFilters(f => ({ ...f, safeOnly: e.target.checked }))} /> Safe Only
        </label>
      </div>

      {loading ? (
        <div className="text-center py-32 text-3xl">Loading live tokens...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map(t => (
            <div key={t.id} className={`bg-gray-900/50 border ${t.boosted ? 'border-yellow-500' : 'border-gray-800'} rounded-xl p-6 hover:scale-105 transition`}>
              {t.boosted && <div className="text-xs bg-yellow-500 text-black px-3 py-1 rounded-full inline-block mb-2">BOOSTED</div>}
              <div className="flex items-center gap-3 mb-4">
                <img src={t.logo} className="w-10 h-10 rounded-full" />
                <div>
                  <div className="font-bold">{t.name}</div>
                  <div className="text-sm text-gray-400">{t.chain}</div>
                </div>
              </div>
              <div className="text-2xl font-black mb-2">{t.price}</div>
              <div className={`text-lg font-bold ${t.change24h.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{t.change24h}</div>
              <div className="text-sm text-gray-400 mt-4">Vol: {t.volume} • Liq: {t.liquidity}</div>
              <Link href={`/token/${t.id}`}>
                <button className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:scale-105 transition">
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
