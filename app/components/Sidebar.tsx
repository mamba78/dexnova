'use client';
import { Home, Star, Bell, BarChart3, TrendingUp, Wallet, Menu } from 'lucide-react';
import { useState } from 'react';

const chains = ["Solana", "Base", "Ethereum", "BSC", "Polygon", "Arbitrum", "Optimism", "ZKsync Era"];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)} className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-gray-900/90 backdrop-blur rounded-lg border border-gray-800">
        <Menu className="w-5 h-5" />
      </button>

      <aside className={`fixed inset-y-0 left-0 w-64 bg-gray-950/95 backdrop-blur border-r border-gray-800 z-40 transform transition lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-black text-lg">D</div>
            <h1 className="text-lg font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">DexNova</h1>
          </div>

          <nav className="space-y-1 text-sm">
            <a href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-900/70 border border-gray-800">
              <Home className="w-4 h-4" /> Home
            </a>
            <a href="/watchlist" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-900/50 transition">
              <Star className="w-4 h-4" /> Watchlist
            </a>
            <a href="/alerts" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-900/50 transition">
              <Bell className="w-4 h-4" /> Alerts
            </a>
            <a href="/hot" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-900/50 transition">
              <TrendingUp className="w-4 h-4" /> Hot Pairs
            </a>
          </nav>

          <div className="mt-auto pt-8 border-t border-gray-800">
            <p className="text-xs uppercase text-gray-500 mb-3 px-4 font-bold tracking-wider">Chains</p>
            <div className="space-y-2">
              {chains.map(chain => (
                <div key={chain} className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-900/50 transition text-sm">
                  <div className="w-5 h-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" />
                  <span className="text-gray-300">{chain}</span>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-xl font-bold text-sm hover:scale-105 transition">
            Connect Wallet
          </button>
        </div>
      </aside>
    </>
  );
}
