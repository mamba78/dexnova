'use client';

import { useState, useEffect } from 'react';
import { Search, ExternalLink } from 'lucide-react';

const SAMPLE_TOKENS = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  logo: `https://via.placeholder.com/32/${Math.floor(Math.random()*16777215).toString(16)}/fff?text=${String.fromCharCode(65 + (i % 26))}`,
  name: ["SantaHat", "BULLISH", "GREEN", "pippip", "BEAR", "SACHI", "dot", "Rizzmas", "TROLLBOY", "XMASJACK", "TCG", "KABUTO", "55", "WOJAK", "Ditto", "Franklin", "PEPENode", "MOONSHOT", "ACT", "LOCKIN", "POPCAT", "FARTCOIN", "MUMU", "BODEN", "GIGA", "PONKE", "BILLY", "AURA", "WEN", "SAMO", "ZERE", "KAK", "TRUMP", "MEW", "FLOKI", "SHIB", "JUP", "PEPE", "MOG", "BONK", "WIF", "GROK", "NEIRO", "SPX6900", "HYPE", "VIBE", "CHAD", "DEGEN", "MOON", "PUMP"][i] || `Token${i+1}`,
  chain: "SOL",
  age: ["5h", "1mo", "1d", "4h", "13h", "1mo", "4h", "1y", "11d", "5h", "1h", "2d", "14h", "28d", "1mo", "8h"][i % 16] || "2h",
  txns: Math.floor(Math.random() * 50000 + 5000).toLocaleString(),
  volume: "$" + (Math.random() * 10 + 0.5).toFixed(2) + "M",
  makers: Math.floor(Math.random() * 20000 + 1000).toLocaleString(),
  change1h: (Math.random() > 0.5 ? "+" : "-") + (Math.random() * 100).toFixed(2) + "%",
  change24h: (Math.random() > 0.5 ? "+" : "-") + (Math.random() * 300).toFixed(2) + "%",
  liquidity: "$" + (Math.random() * 5 + 0.1).toFixed(2) + "M",
  mcap: "$" + (Math.random() * 500 + 10).toFixed(1) + "M",
  tweets: Math.floor(Math.random() * 1000 + 50),
  kols: Math.floor(Math.random() * 100 + 1),
  accounts: Math.floor(Math.random() * 500 + 10),
  safe: Math.random() > 0.15 ? "Yes" : "No",
}));

export default function DexScreenerClone() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Top Bar */}
      <div className="bg-black border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-full mx-auto px-4 py-3 flex flex-wrap items-center justify-between text-sm gap-4">
          <div className="flex items-center gap-6">
            <span className="text-green-400 font-bold">24H VOLUME: $13.62B</span>
            <span className="text-gray-400">24H TXNS: 37,955,099</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button className="px-4 py-2 bg-blue-600 rounded text-white font-bold">X Alpha OFF</button>
            <select className="bg-gray-800 px-4 py-2 rounded"><option>Last 24 hours</option></select>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-purple-600 rounded">Trending</button>
              <button className="px-3 py-1 bg-gray-800 rounded">5M</button>
              <button className="px-3 py-1 bg-gray-800 rounded">1H</button>
              <button className="px-3 py-1 bg-gray-800 rounded">6H</button>
              <button className="px-3 py-1 bg-gray-800 rounded">24H</button>
            </div>
            <button className="px-4 py-2 bg-gray-800 rounded">Top</button>
            <button className="px-4 py-2 bg-gray-800 rounded">Gainers</button>
            <button className="px-4 py-2 bg-gray-800 rounded">New Pairs</button>
            <button className="px-4 py-2 bg-yellow-600 rounded">Boosted</button>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="p-4">
        <div className="bg-[#111] rounded-xl overflow-hidden border border-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#1a1a1a] sticky top-16 z-20">
                <tr>
                  <th className="text-left p-4">#</th>
                  <th className="text-left p-4">TOKEN</th>
                  <th className="text-left p-4">AGE</th>
                  <th className="text-right p-4">TXNS</th>
                  <th className="text-right p-4">VOLUME</th>
                  <th className="text-right p-4">MAKERS</th>
                  <th className="text-right p-4">1H</th>
                  <th className="text-right p-4">24H</th>
                  <th className="text-right p-4">LIQUIDITY</th>
                  <th className="text-right p-4">MCAP</th>
                  <th className="text-right p-4">TWEETS</th>
                  <th className="text-right p-4">KOLS</th>
                  <th className="text-right p-4">ACCOUNTS</th>
                  <th className="text-center p-4">SAFE</th>
                  <th className="text-center p-4">TRADE</th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE_TOKENS.map((t) => (
                  <tr key={t.id} className="border-t border-gray-800 hover:bg-gray-900/50 transition">
                    <td className="p-4 text-gray-500">#{t.id}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={t.logo} alt="" className="w-8 h-8 rounded-full" />
                        <div>
                          <div className="font-bold">{t.name}</div>
                          <div className="text-xs text-gray-500">{t.chain}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-400">{t.age}</td>
                    <td className="p-4 text-right">{t.txns}</td>
                    <td className="p-4 text-right text-green-400 font-bold">{t.volume}</td>
                    <td className="p-4 text-right">{t.makers}</td>
                    <td className={`p-4 text-right font-bold ${t.change1h.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {t.change1h}
                    </td>
                    <td className={`p-4 text-right font-bold ${t.change24h.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {t.change24h}
                    </td>
                    <td className="p-4 text-right">{t.liquidity}</td>
                    <td className="p-4 text-right">{t.mcap}</td>
                    <td className="p-4 text-right">{t.tweets}</td>
                    <td className="p-4 text-right">{t.kols}</td>
                    <td className="p-4 text-right">{t.accounts}</td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded text-xs font-bold ${t.safe === "Yes" ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                        {t.safe}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button className="bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-2 rounded font-bold hover:scale-105 transition">
                        Trade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
