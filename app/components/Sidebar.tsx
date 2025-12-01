'use client';
import { Home from 'lucide-react/dist/esm/icons/home';
import Star from 'lucide-react/dist/esm/icons/star';
import Bell from 'lucide-react/dist/esm/icons/bell';
import BarChart3 from 'lucide-react/dist/esm/icons/bar-chart-3';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';
import Wallet from 'lucide-react/dist/esm/icons/wallet';
import Megaphone from 'lucide-react/dist/esm/icons/megaphone';
import Menu from 'lucide-react/dist/esm/icons/menu';
import { useState } from 'react';

const chains = ["Solana","Base","Ethereum","BSC","Polygon","Arbitrum","Optimism","ZKsync Era"];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)} className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-gray-900 rounded-lg border border-gray-700">
        <Menu className="w-5 h-5" />
      </button>

      <aside className={`fixed inset-y-0 left-0 w-64 bg-[#0b0e17] border-r border-gray-800 z-40 transform transition lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-black text-xl">D</div>
              <h1 className="text-xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">DexNova</h1>
            </div>

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
              <a href="/hot" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-900/50 transition">
                <TrendingUp className="w-4 h-4" /> Hot Pairs
              </a>
            </nav>

            <div className="mt-12">
              <p className="text-xs uppercase text-gray-500 mb-3 px-4">Chains</p>
              {chains.map(c => (
                <div key={c} className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-900/50 transition text-sm">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3.5 rounded-xl font-bold text-sm hover:scale-105 transition">
            Connect Wallet
          </button>
        </div>
      </aside>
    </>
  );
}
