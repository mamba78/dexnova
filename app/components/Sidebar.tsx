'use client';
import { Home, Star, Bell, BarChart3, TrendingUp, Wallet, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const chains = [
  { name: "Solana", id: "solana", gradient: "from-purple-400 to-pink-500" },
  { name: "Base", id: "base", gradient: "from-blue-400 to-cyan-500" },
  { name: "Ethereum", id: "ethereum", gradient: "from-indigo-400 to-purple-600" },
  { name: "BSC", id: "bsc", gradient: "from-yellow-400 to-amber-600" },
  { name: "Polygon", id: "polygon", gradient: "from-purple-500 to-pink-600" },
  { name: "Arbitrum", id: "arbitrum", gradient: "from-blue-500 to-indigo-600" },
  { name: "Optimism", id: "optimism", gradient: "from-red-500 to-orange-500" },
  { name: "ZKsync Era", id: "zksync_era", gradient: "from-violet-500 to-purple-700" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  useRouter();
  const pathname = usePathname();
  const [selectedChain, setSelectedChain] = useState<string>("all");

  // Sync URL with selected chain
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const chain = params.get('chain') || 'all';
    setSelectedChain(chain);
  }, [pathname]);

  const handleChainClick = (chainId: string) => {
    setSelectedChain(chainId);
    const url = chainId === 'all' ? '/' : `/?chain=${chainId}`;
    router.push(url, { scroll: false });
  };

  return (
    <>
      <button onClick={() => setOpen(!open)} className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-gray-900 rounded-lg border border-gray-700">
        <Menu className="w-5 h-5" />
      </button>

      <aside className={`fixed inset-y-0 left-0 w-64 bg-[#0b0e17] border-r border-gray-800 z-40 transform transition lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-black text-xl">D</div>
            <h1 className="text-xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">DexNova</h1>
          </div>

          {/* Main Menu */}
          <nav className="space-y-1 text-sm">
            <a href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-800">
              <Home className="w-4 h-4" /> Home
            </a>
            <a href="/watchlist" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-900/50 transition">
              <Star className="w-4 h-4" /> Watchlist
            </a>
            <a href="/alerts" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-900/50 transition">
              <Bell className="w-4 h-4" /> Alerts
            </a>
            <a href="/multichart" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-900/50 transition">
              <BarChart3 className="w-4 h-4" /> Multicharts
            </a>
            <a href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-900/50 transition">
              <TrendingUp className="w-4 h-4" /> Hot Pairs
            </a>
          </nav>

          {/* CHAINS — ELEGANT SECTION */}
          <div className="mt-12 border-t border-gray-800 pt-6">
            <p className="text-xs uppercase text-gray-500 mb-4 px-4 font-bold tracking-wider">Chains</p>
            <div className="space-y-2">
              <div
                onClick={() => handleChainClick('all')}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition text-sm ${
                  selectedChain === 'all' ? 'bg-gray-800 shadow-lg shadow-purple-500/20' : 'hover:bg-gray-900/50'
                }`}
              >
                <div className="w-6 h-6 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full" />
                <span>All Chains</span>
              </div>
              {chains.map(chain => (
                <div
                  key={chain.id}
                  onClick={() => handleChainClick(chain.id)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition text-sm relative overflow-hidden ${
                    selectedChain === chain.id 
                      ? 'text-white shadow-lg' 
                      : 'hover:bg-gray-900/50'
                  }`}
                >
                  <div className={`w-6 h-6 bg-gradient-to-r ${chain.gradient} rounded-full ${selectedChain === chain.id ? 'ring-4 ring-white/30' : ''}`} />
                  <span>{chain.name}</span>
                  {selectedChain === chain.id && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${chain.gradient} opacity-20 pointer-events-none`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Connect Wallet */}
          <button className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 py-3.5 rounded-xl font-bold text-sm hover:scale-105 transition shadow-lg">
            Connect Wallet
          </button>
        </div>
      </aside>
    </>
  );
}
