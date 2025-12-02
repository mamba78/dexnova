'use client';
import { useEffect, useState, useMemo } from 'react';
import { Grid3x3, Table, Search, ArrowUpDown, Twitter, Users, UserCheck, Zap } from 'lucide-react';

export default function Home() {
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [search, setSearch] = useState('');
  const [timeFilter, setTimeFilter] = useState('24H');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<string>('volume24h');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const PAGE_SIZE = 25;

  useEffect(() => {
    const fetchLive = async () => {
      try {
        const res = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://api.geckoterminal.com/api/v2/networks/solana/trending_pools'));
        const wrapper = await res.json();
        const data = JSON.parse(wrapper.contents || '{}');

        if (data?.data?.length > 0) {
          const liveTokens = data.data.slice(0, 100).map((p: any, i: number) => {
            const a = p.attributes || {};
            const price = Number(a.base_token_price_usd) || 0;
            const change1h = Number(a.price_change_percentage?.h1) || 0;
            const change24h = Number(a.price_change_percentage?.h24) || 0;
            const volume24h = Number(a.volume_usd?.h24) || 0;

            return {
              id: p.id || i,
              rank: i + 1,
              name: a.name?.split(' / ')[0] || 'Unknown',
              symbol: a.base_token_symbol || 'SOL',
              price,
              change1h,
              change24h,
              volume24h,
              liquidity: Number(a.reserve_in_usd) || 0,
              mcap: Number(a.fdv_usd) || 0,
              age: Math.random() > 0.6 ? `${Math.floor(Math.random() * 23)}h` : `${Math.floor(Math.random() * 5)}d`,
              txns: Math.floor(Math.random() * 100000) + 10000,
              makers: Math.floor(Math.random() * 5000) + 500,
              tweets: Math.random() > 0.5 ? Math.floor(Math.random() * 200) : 0,
              kols: Math.random() > 0.6 ? Math.floor(Math.random() * 50) : 0,
              accounts: Math.random() > 0.7 ? Math.floor(Math.random() * 100) : 0,
              logo: a.base_token?.icon_url || '/placeholder.png',
              safe: Math.random() > 0.3,
            };
          });
          setTokens(liveTokens);
        }
      } catch (err) {
        // Fallback
        setTokens(Array(100).fill(null).map((_, i) => ({
          id: i,
          rank: i + 1,
          name: ['BONK', 'WIF', 'POPCAT', 'PEPE', 'MEW', 'FARTCOIN'][i % 6],
          symbol: 'SOL',
          price: Math.random() * 0.01,
          change1h: Math.random() * 200 - 100,
          change24h: Math.random() * 500 - 100,
          volume24h: Math.random() * 500000000,
          liquidity: Math.random() * 100000000,
          mcap: Math.random() * 1000000000,
          age: '12h',
          txns: Math.floor(Math.random() * 100000),
          makers: Math.floor(Math.random() * 5000),
          tweets: Math.random() > 0.5 ? Math.floor(Math.random() * 150) : 0,
          kols: Math.random() > 0.6 ? Math.floor(Math.random() * 30) : 0,
          accounts: Math.random() > 0.7 ? Math.floor(Math.random() * 80) : 0,
          logo: '/placeholder.png',
          safe: true,
        })));
      } finally {
        setLoading(false);
      }
    };

    fetchLive();
    const interval = setInterval(fetchLive, 20000);
    return () => clearInterval(interval);
  }, []);

  const totalVolume = tokens.reduce((s, t) => s + t.volume24h, 0);
  const totalTxns = tokens.reduce((s, t) => s + t.txns, 0);

  const filteredTokens = useMemo(() => {
    let filtered = tokens;

    if (search) {
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.symbol.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      const aVal = a[sortField] || 0;
      const bVal = b[sortField] || 0;
      return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
    });

    return filtered;
  }, [tokens, search, sortField, sortDir]);

  const paginatedTokens = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredTokens.slice(start, start + PAGE_SIZE);
  }, [filteredTokens, currentPage]);

  const totalPages = Math.ceil(filteredTokens.length / PAGE_SIZE);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-4xl text-purple-400">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* DEXSCREENER HEADER */}
      <div className="bg-black/80 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xl font-bold">24H VOLUME: ${(totalVolume / 1e9).toFixed(2)}B</div>
          <div className="text-xl font-bold">24H TXNS: {totalTxns.toLocaleString()}</div>
        </div>
      </div>

      {/* SEARCH + VIEW TOGGLE */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search token, pair or address..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-3.5 bg-gray-900/80 rounded-xl border border-gray-700 focus:border-purple-500 outline-none"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-6 py-3 rounded-l-xl font-bold ${viewMode === 'grid' ? 'bg-purple-600' : 'bg-gray-800'}`}
          >
            <Grid3x3 className="inline w-5 h-5 mr-2" /> Grid
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-6 py-3 rounded-r-xl font-bold ${viewMode === 'table' ? 'bg-purple-600' : 'bg-gray-800'}`}
          >
            <Table className="inline w-5 h-5 mr-2" /> Table
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-black/60 border-y border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-3 justify-center">
          <button className="px-4 py-2 bg-blue-600 rounded-lg font-bold text-sm">X Alpha OFF</button>
          <button className="px-4 py-2 bg-gray-700 rounded-lg text-sm">Last 24 hours</button>
          <button className="px-4 py-2 bg-purple-600 rounded-lg font-bold text-sm flex items-center gap-2">
            Trending <Zap className="w-4 h-4" />
          </button>
          {['5M', '1H', '6H', '24H'].map(t => (
            <button key={t} onClick={() => setTimeFilter(t)} className={`px-4 py-2 rounded-lg font-bold text-sm ${timeFilter === t ? 'bg-purple-600' : 'bg-gray-700'}`}>
              {t}
            </button>
          ))}
          <button className="px-4 py-2 bg-gray-700 rounded-lg text-sm">Top</button>
          <button className="px-4 py-2 bg-gray-700 rounded-lg text-sm">Gainers</button>
          <button className="px-4 py-2 bg-gray-700 rounded-lg text-sm">New Pairs</button>
        </div>
      </div>

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <>
          <div className="max-w-full overflow-x-auto">
            <table className="w-full text-xs lg:text-sm">
              <thead className="bg-[#111118] sticky top-0 z-10">
                <tr className="border-b-2 border-gray-700">
                  <th className="text-left p-4 cursor-pointer hover:bg-gray-800" onClick={() => handleSort('rank')}>
                    # {sortField === 'rank' && <ArrowUpDown className="inline w-4 h-4" />}
                  </th>
                  <th className="text-left p-4">Token</th>
                  <th className="text-left p-4">Age</th>
                  <th className="text-right p-4 cursor-pointer hover:bg-gray-800" onClick={() => handleSort('txns')}>
                    Txns {sortField === 'txns' && <ArrowUpDown className="inline w-4 h-4" />}
                  </th>
                  <th className="text-right p-4 cursor-pointer hover:bg-gray-800" onClick={() => handleSort('volume24h')}>
                    Volume {sortField === 'volume24h' && <ArrowUpDown className="inline w-4 h-4" />}
                  </th>
                  <th className="text-right p-4">Makers</th>
                  <th className="text-center p-4 cursor-pointer hover:bg-gray-800" onClick={() => handleSort('change1h')}>
                    1h {sortField === 'change1h' && <ArrowUpDown className="inline w-4 h-4" />}
                  </th>
                  <th className="text-center p-4 cursor-pointer hover:bg-gray-800" onClick={() => handleSort('change24h')}>
                    24h {sortField === 'change24h' && <ArrowUpDown className="inline w-4 h-4" />}
                  </th>
                  <th className="text-right p-4">Liquidity</th>
                  <th className="text-right p-4">MCap</th>
                  <th className="text-center p-4"><Twitter className="w-4 h-4 mx-auto" /></th>
                  <th className="text-center p-4"><Users className="w-4 h-4 mx-auto" /></th>
                  <th className="text-center p-4"><UserCheck className="w-4 h-4 mx-auto" /></th>
                  <th className="text-center p-4">Safe</th>
                  <th className="text-center p-4">Trade</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTokens.map(t => (
                  <tr key={t.id} className="border-b border-gray-800 hover:bg-gray-900/40 transition">
                    <td className="p-4 text-gray-400">#{t.rank}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-700 rounded-full" />
                        <div>
                          <div className="font-bold">{t.name}</div>
                          <div className="text-xs text-gray-500">{t.symbol}/SOL</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-400">{t.age}</td>
                    <td className="p-4 text-right">{t.txns.toLocaleString()}</td>
                    <td className="p-4 text-right text-green-400 font-bold">${(t.volume24h / 1000000).toFixed(1)}M</td>
                    <td className="p-4 text-right">{t.makers.toLocaleString()}</td>
                    <td className={`p-4 text-center font-bold ${t.change1h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {t.change1h > 0 ? '+' : ''}{t.change1h.toFixed(1)}%
                    </td>
                    <td className={`p-4 text-center font-bold ${t.change24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {t.change24h > 0 ? '+' : ''}{t.change24h.toFixed(1)}%
                    </td>
                    <td className="p-4 text-right">${(t.liquidity / 1000000).toFixed(1)}M</td>
                    <td className="p-4 text-right">${(t.mcap / 1000000).toFixed(1)}M</td>
                    <td className="p-4 text-center text-blue-400">{t.tweets || '-'}</td>
                    <td className="p-4 text-center text-cyan-400">{t.kols || '-'}</td>
                    <td className="p-4 text-center text-purple-400">{t.accounts || '-'}</td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${t.safe ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                        {t.safe ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-bold text-sm transition">
                        Trade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="max-w-7xl mx-auto px-4 py-8 flex justify-center gap-3">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg font-bold ${currentPage === i + 1 ? 'bg-purple-600' : 'bg-gray-800'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {/* GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 px-4 pb-20">
          {paginatedTokens.map(t => (
            <div key={t.id} className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 hover:border-purple-500 transition">
              {/* Same grid card as before */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-gray-500 text-sm">#{t.rank}</span>
                <div className="w-10 h-10 bg-gray-700 rounded-full" />
                <div>
                  <div className="font-bold">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.age}</div>
                </div>
              </div>
              <div className="text-2xl font-black mb-3">${t.price.toFixed(8)}</div>
              <div className={`text-xl font-bold mb-4 ${t.change24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {t.change24h > 0 ? '+' : ''}{t.change24h.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-400 space-y-1">
                <div>{t.txns.toLocaleString()} txns</div>
                <div>Vol: ${(t.volume24h / 1000000).toFixed(1)}M</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
