'use client';
import { Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 bg-black/95 backdrop-blur border-b border-gray-800 z-30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input type="text" placeholder="Search token, pair or address..." className="w-full pl-14 pr-6 py-4 bg-gray-900 border border-gray-700 rounded-2xl focus:border-purple-500 outline-none text-lg" />
        </div>
        <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:scale-105 transition">
          Get the App
        </button>
      </div>
    </header>
  );
}
