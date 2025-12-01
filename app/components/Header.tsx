'use client';
import { Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 bg-black/95 backdrop-blur border-b border-gray-800 z-30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input type="text" placeholder="Search token, pair or address..." className="w-full pl-12 pr-6 py-3.5 bg-gray-900 border border-gray-700 rounded-xl focus:border-purple-500 outline-none text-base" />
        </div>
      </div>
    </header>
  );
}
