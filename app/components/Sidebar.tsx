'use client';
import { Home, Star, TrendingUp, Wallet, Megaphone, Menu } from 'lucide-react';
import { useState } from 'react';

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
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-black text-2xl">D</div>
              <h1 className="text-xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">DexNova</h1>
            </div>
            <nav className="space-y-1 text-sm">
              <a href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-800">
                <Home className="w-4 h-4" /> Home
              </a>
              <a href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-900/50 transition">
                <Megaphone className="w-4 h-4" /> Admin
              </a>
              <a href="/dune" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-900/50 transition">
                <TrendingUp className="w-4 h-4" /> Dune Analytics
              </a>
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
