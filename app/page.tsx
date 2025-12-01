'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Image from 'next/image';

interface Token {
  address: string;
  name: string;
  symbol: string;
  price: string;
  change5m: string;
  change1h: string;
  change6h: string;
  change24h: string;
  volume24h: string;
  liquidity: string;
  fdv: string;
  logo?: string;
  isHot?: boolean;
}

export default function App() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('https://api.geckoterminal.com/api/v2/networks/solana/trending_pools');
        const data = await res.json();
        if (data.data) {
          const formatted = data.data.slice(0, 50).map((p: any, i: number) => {
            const a = p.attributes;
            return {
              address: a.base_token.address,
              name: a.name.split(' / ')[0],
              symbol: a.base_token.symbol,
              price: `$${Number(a.base_token_price_usd || 0).toFixed(6)}`,
              change5m: a.price_change_percentage?.m5 ? (a.price_change_percentage.m5 > 0 ? '+' : '') + a.price_change_percentage.m5.toFixed(1) + '%' : '0.0%',
              change1h: a.price_change_percentage?.h1 ? (a.price_change_percentage.h1 > 0 ? '+' : '') + a.price_change_percentage.h1.toFixed(1) + '%' : '0.0%',
              change6h: a.price_change_percentage?.h6 ? (a.price_change_percentage.h6 > 0 ? '+' : '') + a.price_change_percentage.h6.toFixed(1) + '%' : '0.0%',
              change24h: a.price_change_percentage?.h24 ? (a.price_change_percentage.h24 > 0 ? '+' : '') + a.price_change_percentage.h24.toFixed(1) + '%' : '0.0%',
              volume24h: `$${(a.volume_usd?.h24 / 1e6 || 0).toFixed(1)}M`,
              liquidity: `$${(a.reserve_in_usd / 1e6 || 0).toFixed(1)}M`,
              fdv: a.fdv_usd ? `$${(a.fdv_usd / 1e9).toFixed(2)}B` : '$0',
              logo: a.base_token.icon_url || `https://ui-avatars.com/api/?name=${a.base_token.symbol}&background=0D8ABC&color=fff`,
              isHot: i < 5,
            };
          });
          setTokens(formatted);
        }
      } catch (e) {
        // fallback mock
        setTokens([
          { address: "EKpQGSJtiSuGXb...", name: "dogwifhat", symbol: "WIF", price: "$3.45", change5m: "+12.4%", change1h: "+28.7%", change6h: "+89.3%", change24h: "+245.1%", volume24h: "$1.2B", liquidity: "$820M", fdv: "$3.4B", logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/coins/images/34599/large/dogwifhat.jpg", isHot: true },
          { address: "DezXAZ8z7Pnr...", name: "Bonk", symbol: "BONK", price: "$0.0000342", change5m: "+8.7%", change1h: "+21.3%", change6h: "+67.8%", change24h: "+189.4%", volume24h: "$1.1B", liquidity: "$780M", fdv: "$2.9B", logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/coins/images/28929/large/bonk.jpg", isHot: true },
        ]);
      } finally {
        setLoading(false);
      }
    }
    load();
    const interval = setInterval(load, 15000);
    return () => clearInterval(interval);
  }, []);

  const filtered = tokens.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0b1120] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0b1120]/90 backdrop-blur-xl border-b border-cyan-900/30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">DexNova</h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search token..."
              className="w-80 pl-12 pr-6 py-3 bg-[#1e293b]/80 border border-cyan-800 rounded-2xl focus:border-cyan-500 outline-none transition"
            />
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="pt-24 pb-8 text-center bg-gradient-to-b from-[#0b1120] to-[#1e1b4b]/20">
        <h2 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Trending on Solana
        </h2>
        <p className="mt-4 text-xl text-cyan-300">Live data • Updated every 15 seconds</p>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((token) => (
              <div key={token.address} className="group relative bg-gradient-to-br from-[#1e293b]/50 to-[#0f172a] rounded-2xl border border-cyan-900/30 p-5 hover:border-cyan-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                {token.isHot && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-pink-600 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                    HOT
                  </div>
                )}
                <div className="flex items-center gap-4 mb-4">
                  <Image src={token.logo || '/placeholder.png'} alt="" width={48} height={48} className="rounded-full" />
                  <div>
                    <h3 className="font-bold text-lg">{token.name}</h3>
                    <p className="text-cyan-400 text-sm">${token.symbol}</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price</span>
                    <span className="font-bold">{token.price}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className={token.change5m.startsWith('+') ? 'text-green-400' : 'text-red-400'}>{token.change5m} (5m)</div>
                    <div className={token.change1h.startsWith('+') ? 'text-green-400' : 'text-red-400'}>{token.change1h} (1h)</div>
                    <div className={token.change6h.startsWith('+') ? 'text-green-400' : 'text-red-400'}>{token.change6h} (6h)</div>
                    <div className={token.change24h.startsWith('+') ? 'text-green-400' : 'text-red-400'}>{token.change24h} (24h)</div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">24h Vol</span>
                    <span>{token.volume24h}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Liquidity</span>
                    <span>{token.liquidity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">FDV</span>
                    <span>{token.fdv}</span>
                  </div>
                </div>

                <a
                  href={`https://jup.ag/swap/SOL-${token.address}?ref=DEXNOVA2025`}
                  target="_blank"
                  className="mt-5 w-full block text-center py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold hover:from-cyan-400 hover:to-purple-500 transition"
                >
                  Trade on Jupiter
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
