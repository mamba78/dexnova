'use client';
import { Home, Star, Bell, BarChart3, TrendingUp, Wallet, Megaphone, Menu, Globe } from 'lucide-react';
import { useState } from 'react';

const chains = [
  { name: "Solana", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
  { name: "Base", color: "bg-gradient-to-r from-blue-500 to-blue-700" },
  { name: "Ethereum", color: "bg-gradient-to-r from-gray-500 to-gray-700" },
  { name: "BSC", color: "bg-gradient-to-r from-yellow-400 to-yellow-600" },
  { name: "Polygon", color: "bg-gradient-to-r from-purple-600 to-purple-800" },
  { name: "Arbitrum", color: "bg-gradient-to-r from-blue-600 to-indigo-600" },
  { name: "Optimism", color: "bg-gradient-to-r from-red-500 to-orange-500" },
  { name: "ZKsync", color: "bg-gradient-to-r from-indigo-500 to-purple-600" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)} className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 rounded-lg border border-gray-700">
        <Menu className="w-5 h-5" />
      </button>

      <aside className={`fixed inset-y-0 left-0 w-64 bg-[#0b0e17] border-r border-gray-800 z-40 transform transition lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-black text-xl">D</div>
            <h1 className="text-xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">DexNova</h1>
          </div>

          <nav className="space-y-1 flex-1 text-sm">
            <a href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-900/70 border border-gray-800">
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
            <a href="/gainers" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-900/50 transition">
              <TrendingUp className="w-4 h-4 rotate-180" /> Gainers
            </a>
            <a href="/portfolio" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-900/50 transition">
              <Wallet className="w-4 h-4" /> Portfolio
            </a>
            <a href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-900/50 transition">
              <Megaphone className="w-4 h-4" /> Admin Panel
            </a>
          </nav>

          <div className="mt-8">
            <p className="text-xs uppercase text-gray-500 mb-3 px-4">Chains</p>
            {chains.map(c => (
              <div key={c.name} className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-900/50 cursor-pointer transition text-sm">
                <div className={`w-6 h-6 ${c.color} rounded-full`} />
                <span>{c.name}</span>
              </div>
            ))}
          </div>

          <button className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 py-3.5 rounded-xl font-bold text-sm hover:scale-105 transition">
            Connect Wallet
          </button>
        </div>
      </aside>
    </>
  );
}
