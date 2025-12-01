'use client';
import { Home, Star, Bell, BarChart3, TrendingUp, Wallet, Menu } from 'lucide-react';
import { useState } from 'react';

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
        <div className="p-6 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-black text-xl">D</div>
              <h1 className="text-xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">DexNova</h1>
            </div>

            <nav className="space-y-1 text-sm">
              {menu.map(item => (
                <a key={item.label} href={item.href} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-900/60 transition">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3.5 rounded-xl font-bold text-sm hover:scale-105 transition">
            Connect Wallet
          </button>
        </div>
      </aside>
    </>
  );
}
