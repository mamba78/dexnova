'use client';

import { useState, useEffect } from 'react';
import { Search, Home, Star, Bell, BarChart3, TrendingUp, Wallet, Megaphone, X, MessageCircle, Globe, Instagram, Youtube, Cookie } from 'lucide-react';

const SAMPLE_TOKENS = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  logo: `https://via.placeholder.com/32/${Math.floor(Math.random()*16777215).toString(16)}/fff?text=${String.fromCharCode(65 + (i % 26))}`,
  name: ["SantaHat", "BULLISH", "GREEN", "pippip", "BEAR", "SACHI", "dot", "Rizzmas", "TROLLBOY", "XMASJACK", "TCG", "KABUTO", "55", "WOJAK", "Ditto", "Franklin", "PEPENode", "MOONSHOT", "ACT", "LOCKIN", "POPCAT", "FARTCOIN", "MUMU", "BODEN", "GIGA", "PONKE", "BILLY", "AURA", "WEN", "SAMO", "ZERE", "KAK", "TRUMP", "MEW", "FLOKI", "SHIB", "JUP", "PEPE", "MOG", "BONK", "WIF", "GROK", "NEIRO", "SPX6900", "HYPE", "VIBE", "CHAD", "DEGEN", "MOON", "PUMP"][i] || `Token${i+1}`,
  chain: "SOL",
  age: ["5h", "1mo", "1d", "4h", "13h", "1mo", "4h", "1y", "11d", "5h", "1h", "2d", "14h", "28d", "1mo", "8h"][i % 16] || "2h",
  txns: Math.floor(Math.random() * 50000 + 5000).toLocaleString(),
  volume: "$" + (Math.random() * 10 + 0.toFixed(2) + "M",
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

export default function DexNova() {
  const [showCookie, setShowCookie] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('cookies-accepted')) setShowCookie(false);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookies-accepted', 'true');
    setShowCookie(false);
  };

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-gray-900 rounded-lg border border-gray-700"
      >
        Menu
      </button>

      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-[#0f0f0f] border-r border-gray-800 z-40 transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-black text-2xl">D</div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">DexNova</h1>
          </div>

          <nav className="space-y-2 flex-1">
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700">Home</a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-900/50 transition">Watchlist</a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-900/50 transition">Alerts</a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-900/50 transition">Multicharts</a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-900/50 transition">Hot Pairs</a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-900/50 transition">Gainers & Losers</a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-900/50 transition">Portfolio</a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-900/50 transition">Advertise</a>
          </nav>

          <div className="mt-auto">
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-4 rounded-xl font-bold hover:scale-105 transition">
              Connect Wallet
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="lg:ml-64 min-h-screen bg-[#0a0a0f]">
        {/* TOP HEADER */}
        <header className="fixed top-0 left-0 lg:left-64 right-0 bg-black/95 backdrop-blur border-b border-gray-800 z-30">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search token, pair or address..."
                className="w-full pl-14 pr-6 py-4 bg-gray-900 border border-gray-700 rounded-2xl focus:border-purple-500 outline-none text-lg"
              />
            </div>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:scale-105 transition">
              Get the App
            </button>
          </div>
        </header>

        {/* MAIN TABLE */}
        <main className="pt-24 pb-32 px-4">
          <div className="max-w-full mx-auto">
            <h1 className="text-5xl font-black text-center my-10 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Hot Pairs • Live Trending
            </h1>

            <div className="bg-[#111] rounded-xl overflow-hidden border border-gray-800">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#1a1a1a] sticky top-20 z-20">
                    <tr>
                      <th className="text-left p-4 font-normal">#</th>
                      <th className="text-left p-4 font-normal">TOKEN</th>
                      <th className="text-left p-4 font-normal">AGE</th>
                      <th className="text-right p-4 font-normal">TXNS</th>
                      <th className="text-right p-4 font-normal">VOLUME</th>
                      <th className="text-right p-4 font-normal">MAKERS</th>
                      <th className="text-right p-4 font-normal">1H</th>
                      <th className="text-right p-4 font-normal">24H</th>
                      <th className="text-right p-4 font-normal">LIQUIDITY</th>
                      <th className="text-right p-4 font-normal">MCAP</th>
                      <th className="text-right p-4 font-normal">TWEETS</th>
                      <th className="text-right p-4 font-normal">KOLS</th>
                      <th className="text-right p-4 font-normal">ACCOUNTS</th>
                      <th className="text-center p-4 font-normal">SAFE</th>
                      <th className="text-center p-4 font-normal">TRADE</th>
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
                        <td className={`p-4 text-right font-bold ${t.change1h.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{t.change1h}</td>
                        <td className={`p-4 text-right font-bold ${t.change24h.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{t.change24h}</td>
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
        </main>

        {/* FOOTER */}
        <footer className="bg-[#0a0a0f] border-t border-gray-800 mt-auto">
          <div className="max-w-7xl mx-auto px-6 py-12 text-center">
            <p className="text-gray-400 text-sm leading-relaxed max-w-5xl mx-auto mb-10">
              All content available on our website... (same disclaimer as DEXTools)
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm">
              <a href="#" className="hover:text-cyan-400">General Statement</a>
              <a href="#" className="hover:text-cyan-400">Legal Advice</a>
              <a href="#" className="hover:text-cyan-400">About Us</a>
              <a href="#" className="hover:text-cyan-400">DEXT Token</a>
              <a href="#" className="hover:text-cyan-400">Team</a>
              <a href="#" className="hover:text-cyan-400">Contact</a>
            </div>
            <div className="flex justify-center gap-8 mb-8">
              <X className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              <MessageCircle className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              <Globe className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              <Youtube className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
            </div>
            <div className="text-gray-600 text-sm">
              © DexNova.io 2025 — info@dexnova.io
            </div>
          </div>
        </footer>

        {/* COOKIE BANNER */}
        {showCookie && (
          <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur border-t border-gray-700 p-6 z-50">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Cookie className="w-8 h-8 text-cyan-400" />
                <p className="text-sm">We use cookies to improve your experience. <a href="#" className="text-cyan-400 underline">Cookie Policy</a></p>
              </div>
              <button onClick={acceptCookies} className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold">
                Accept All Cookies
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
