'use client';
import { useEffect, useState, useRef } from 'react';
import { Grid3x3, Table } from 'lucide-react';

const chains = [
  { id: 'all', name: 'All Chains', color: 'bg-gray-600' },
  { id: 'solana', name: 'Solana', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
  { id: 'base', name: 'Base', color: 'bg-blue-600' },
  { id: 'ethereum', name: 'Ethereum', color: 'bg-gray-500' },
  { id: 'bsc', name: 'BSC', color: 'bg-yellow-500' },
  { id: 'polygon', name: 'Polygon', color: 'bg-purple-700' },
  { id: 'arbitrum', name: 'Arbitrum', color: 'bg-indigo-600' },
  { id: 'optimism', name: 'Optimism', color: 'bg-red-600' },
  { id: 'zksync', name: 'ZKsync Era', color: 'bg-indigo-500' },
];

export default function Home() {
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedChain, setSelectedChain] = useState('all');
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver>();

  const fetchTokens = async (append = false) => {
    try {
      const res = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://api.geckoterminal.com/api/v2/networks/solana/trending_pools'));
      const wrapper = await res.json();
      const data = JSON.parse(wrapper.contents || '{}');

      if (data?.data?.length > 0) {
        const newTokens = data.data.slice(0, 30).map((p: any, i: number) => {
          const a = p.attributes || {};
          return {
            id: p.id || Date.now() + i,
            name: a.name?.split(' / ')[0] || 'Unknown',
            symbol: a.base_token_symbol || 'SOL',
            price: a.base_token_price_usd ? Number(a.base_token_price_usd).toFixed(8) : '0.00000000',
            change24h: a.price_change_percentage?.h24?.toFixed(2) || '0',
            volume24h: a.volume_usd?.h24 ? (a.volume_usd.h24 / 1000000).toFixed(1) + 'M' : '0',
            liquidity: a.reserve_in_usd ? (a.reserve_in_usd / 1000000).toFixed(1) + 'M' : '0',
            logo: a.base_token?.icon_url || 'https://via.placeholder.com/64',
          };
        });
        setTokens(prev => append ? [...prev, ...newTokens] : newTokens);
        setHasMore(newTokens.length === 30);
      }
    } catch (err) {
      setTokens(prev => append ? prev : Array(20).fill(null).map((_, i) => ({
        id: i,
        name: ['BONK', 'WIF', 'POPCAT'][i % 3],
        symbol: 'SOL',
        price: (Math.random() * 0.01).toFixed(8),
        change24h: (Math.random() * 500 - 100).toFixed(2),
        volume24h: (Math.random() * 200).toFixed(1) + 'M',
        liquidity: (Math.random() * 100).toFixed(1) + 'M',
        logo: 'https://assets.coingecko.com/coins/images/28600/small/bonk.png',
      })));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, [selectedChain]);

  const lastTokenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading || !hasMore) return;

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchTokens(true);
      }
    });

    if (lastTokenRef.current) {
      observer.current.observe(lastTokenRef.current);
    }

    return () => observer.current?.disconnect();
  }, [loading, hasMore]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* CHAINS AT TOP — DEXTOOLS STYLE */}
      <div className="bg-black/80 border-b border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="flex gap-3">
            {chains.map(chain => (
              <button
                key={chain.id}
                onClick={() => setSelectedChain(chain.id)}
                className={`px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition ${
                  selectedChain === chain.id
                    ? chain.color.includes('gradient') ? 'bg-gradient-to-r from-purple-500 to-pink-500' : chain.color
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                {chain.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SINGLE SEARCH + VIEW TOGGLE */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="relative w-full lg:w-96">
            <input
              type="text"
              placeholder="Search token, pair or address..."
              className="w-full pl-12 pr-6 py-4 bg-gray-900/80 rounded-xl border border-gray-700 focus:border-purple-500 outline-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-8 py-4 rounded-l-xl font-bold ${viewMode === 'grid' ? 'bg-purple-600' : 'bg-gray-800'}`}
            >
              <Grid3x3 className="inline w-5 h-5 mr-2" /> Grid
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-8 py-4 rounded-r-xl font-bold ${viewMode === 'table' ? 'bg-purple-600' : 'bg-gray-800'}`}
            >
              <Table className="inline w-5 h-5 mr-2" /> Table
            </button>
          </div>
        </div>
      </div>

      {/* GRID VIEW — INFINITE SCROLL */}
      {viewMode === 'grid' && (
        <div className="max-w-7xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {tokens.map((t, i) => (
              <div
                key={t.id}
                ref={i === tokens.length - 1 ? lastTokenRef : null}
                className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 hover:border-purple-600 transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500 text-sm">#{i + 1}</span>
                  <div className="text-xs text-gray-500">{t.age}</div>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <img src={t.logo} className="w-16 h-16 rounded-full ring-4 ring-gray-800" />
                  <div>
                    <div className="text-2xl font-black">{t.name}</div>
                    <div className="text-sm text-gray-400">{t.symbol}/SOL</div>
                  </div>
                </div>
                <div className="text-3xl font-black mb-4">{t.price}</div>
                <div className={`text-2xl font-bold mb-6 ${t.change24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {t.change24h > 0 ? '+' : ''}{t.change24h}%
                </div>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>Volume: ${t.volume24h}</div>
                  <div>Liquidity: ${t.liquidity}</div>
                </div>
                <button className="w-full mt-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:scale-105 transition">
                  Trade
                </button>
              </div>
            ))}
          </div>
          {loading && <div className="text-center py-10 text-gray-400">Loading more tokens...</div>}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="max-w-full overflow-x-auto px-4 pb-20">
          <p className="text-center py-32 text-gray-500">Table view coming soon</p>
        </div>
      )}
    </div>
  );
}
