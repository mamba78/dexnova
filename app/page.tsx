'use client';

import { useState } from 'react';
import { Search, Zap, TrendingUp, Rocket, ExternalLink } from 'lucide-react';
import Image from 'next/image';

const SAMPLE_TOKENS = [
  { name: "dogwifhat", symbol: "WIF", price: "$3.45", change: "+245.1%", vol: "$1.28B", age: "11mo", logo: "https://dd.dexscreener.com/ds-data/tokens/solana/EKpQGSJtiSuGXbPCr92R7g5w53C5KdqU4qW6bY9z3Q1t.png" },
  { name: "Bonk", symbol: "BONK", price: "$0.0000342", change: "+189.4%", vol: "$1.1B", age: "2y", logo: "https://dd.dexscreener.com/ds-data/tokens/solana/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263.png" },
  { name: "Popcat", symbol: "POPCAT", price: "$1.23", change: "+523.7%", vol: "$980M", age: "9mo", logo: "https://dd.dexscreener.com/ds-data/tokens/solana/6q3s8iZwvJ8uQJ8eZ4b8n8x8v8Y8Z8a8b8c8d8e8f8g8.png" },
  { name: "LOCK IN", symbol: "LOCKIN", price: "$0.156", change: "+890.2%", vol: "$1.8B", age: "3d", logo: "https://via.placeholder.com/60" },
  { name: "michi", symbol: "MICHI", price: "$0.321", change: "+489.1%", vol: "$780M", age: "6mo", logo: "https://via.placeholder.com/60" },
  { name: "Mumu the Bull", symbol: "MUMU", price: "$0.000089", change: "+678.4%", vol: "$1.1B", age: "4mo", logo: "https://via.placeholder.com/60" },
  { name: "Jeo Boden", symbol: "BODEN", price: "$0.42", change: "+210.3%", vol: "$156M", age: "10mo", logo: "https://via.placeholder.com/60" },
  { name: "Gigachad", symbol: "GIGA", price: "$0.089", change: "+367.9%", vol: "$490M", age: "5mo", logo: "https://via.placeholder.com/60" },
  { name: "Pepe", symbol: "PEPE", price: "$0.0000123", change: "+412.8%", vol: "$1.4B", age: "2y", logo: "https://via.placeholder.com/60" },
  { name: "catwifhat", symbol: "MEW", price: "$0.0087", change: "+523.1%", vol: "$980M", age: "11mo", logo: "https://via.placeholder.com/60" },
  { name: "Ponke", symbol: "PONKE", price: "$0.456", change: "+278.4%", vol: "$620M", age: "8mo", logo: "https://via.placeholder.com/60" },
  { name: "Billy", symbol: "BILLY", price: "$0.198", change: "+334.7%", vol: "$390M", age: "7mo", logo: "https://via.placeholder.com/60" },
  { name: "Aura", symbol: "AURA", price: "$0.078", change: "+912.3%", vol: "$2.1B", age: "2d", logo: "https://via.placeholder.com/60" },
  { name: "Wen", symbol: "WEN", price: "$0.000298", change: "+198.3%", vol: "$580M", age: "1y", logo: "https://via.placeholder.com/60" },
  { name: "Myro", symbol: "MYRO", price: "$0.28", change: "+378.9%", vol: "$89M", age: "1y", logo: "https://via.placeholder.com/60" },
  { name: "Mog Coin", symbol: "MOG", price: "$0.0000021", change: "+267.4%", vol: "$420M", age: "11mo", logo: "https://via.placeholder.com/60" },
  { name: "Floki", symbol: "FLOKI", price: "$0.000298", change: "+178.9%", vol: "$780M", age: "2y", logo: "https://via.placeholder.com/60" },
  { name: "Samoyed", symbol: "SAMO", price: "$0.0123", change: "+167.9%", vol: "$340M", age: "2y", logo: "https://via.placeholder.com/60" },
  { name: "Zhan", symbol: "ZHAN", price: "$0.044", change: "+445.8%", vol: "$680M", age: "1d", logo: "https://via.placeholder.com/60" },
  { name: "CocaCola", symbol: "COLA", price: "$0.089", change: "+289.1%", vol: "$490M", age: "5d", logo: "https://via.placeholder.com/60" },
];

export default function Home() {
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Nitro Bar */}
      <div className="bg-gradient-to-r from-purple-900 via-pink-900 to-cyan-900 py-1 text-center text-sm font-bold">
        NITRO USERS SEE 10× MORE TOKENS • UPGRADE NOW → GET NITRO
      </div>

      {/* Header */}
      <header className="border-b border-gray-800 bg-[#161b22]/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">DexNova</h1>
            <nav className="hidden md:flex gap-6 text-sm">
              <a href="#" className="text-cyan-400 font-bold">Hot Pairs</a>
              <a href="#" className="hover:text-cyan-400">Gainers</a>
              <a href="#" className="hover:text-cyan-400">New Pairs</a>
            </nav>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search token..."
              className="pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg w-72 focus:border-cyan-500 outline-none"
            />
          </div>
        </div>
      </header>

      {/* Main 3-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* New Launches */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
            <Rocket className="w-5 h-5" /> NEW LAUNCHES
          </h2>
          {SAMPLE_TOKENS.slice(0, 8).map((t, i) => (
            <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:border-cyan-600 transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-700 rounded-full" />
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-xs text-gray-400">${t.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-bold">{t.change}</p>
                  <p className="text-xs text-gray-400">{t.vol}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trending */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-pink-400 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" /> TRENDING RIGHT NOW
          </h2>
          {SAMPLE_TOKENS.slice(8, 16).map((t, i) => (
            <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:border-pink-600 transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image src={t.logo} alt="" width={40} height={40} className="rounded-full" unoptimized />
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-xs text-gray-400">${t.symbol} • {t.age}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-bold">{t.change}</p>
                  <p className="text-xs text-gray-400">{t.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Top Gainers + Nitro */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-yellow-400 flex items-center gap-2">
              <Zap className="w-5 h-5" /> TOP GAINERS 24H
            </h2>
            {SAMPLE_TOKENS.slice(0, 8).map((t, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-800">
                <span className="text-sm">{i+1}. ${t.symbol}</span>
                <span className="text-green-400 font-bold">{t.change}</span>
              </div>
            ))}
          </div>

          <div className="bg-gray-900/50 rounded-lg p-6 text-center">
            <p className="text-cyan-400 font-bold mb-4">Want 10× more tokens?</p>
            <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-bold hover:scale-105 transition">
              GET NITRO - $29/mo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
