'use client';
import { Home, Star, Bell, BarChart3, TrendingUp, Wallet, Menu } from 'lucide-react';
import { useState } from 'react';

const chains = [
  { name: "Solana", color: "from-purple-500 to-pink-500" },
  { name: "Base", color: "from-blue-500 to-blue-700" },
  { name: "Ethereum", color: "from-gray-500 to-gray-700" },
  { name: "BSC", color: "from-yellow-400 to-yellow-600" },
  { name: "Polygon", color: "from-purple-600 to-purple-800" },
  { name: "Arbitrum", color: "from-blue-600 to-indigo-600" },
  { name: "Optimism", color: "from-red-500 to-orange-500" },
  { name: "ZKsync Era", color: "from-indigo-500 to-purple-600" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const menu = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Star, label: "Watchlist", href: "/watchlist" },
    { icon: Bell, label: "Alerts", href: "/alerts" },
    { icon: BarChart3, label: "Multicharts", href: "/multichart" },
    { icon: TrendingUp, label: "Hot Pairs", href: "/" },
    { icon: TrendingUp, label: "Gainers & Losers", href: "/gainers" },
    { icon: Wallet, label: "Portfolio", href: "/portfolio" },
  ];

  return (
    <>
      <button onClick={() => setOpen(!open)} className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-gray-900 rounded-lg border border-gray-700">
        <Menu className="w-5 h-5" />
      </button>

      <aside className={`fixed inset-y-0 left-0 w-64 bg-[#0b0e17] border-r border-gray-800 z-40 transform transition lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-black text-xl">D</div>
            <h1 className="text-xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">DexNova</h1>
          </div>

          {/* Main Menu */}
          <nav className="space-y-1 text-sm flex-1">
            {menu.map(item => (
              <a key={item.label} href={item.href} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-900/60 transition">
                <item.icon className="w-4 h-4" />
                {item.label}
              </a>
            ))}
          </nav>

          {/* CHAINS — SEPARATE SECTION AT BOTTOM */}
          <div className="mt-10 border-t border-gray-800 pt-6">
            <p className="text-xs uppercase text-gray-500 mb-4 px-4 font-bold tracking-wider">Chains</p>
            <div className="space-y-2">
              {chains.map(chain => (
                <div key={chain.name} className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-900/50 transition cursor-pointer text-sm">
                  <div className={`w-6 h-6 bg-gradient-to-r ${chain.color} rounded-full`} />
                  <span>{chain.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Connect Wallet Button */}
          <button className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 py-3.5 rounded-xl font-bold text-sm hover:scale-105 transition">
            Connect Wallet
          </button>
        </div>
      </aside>
    </>
  );
}
