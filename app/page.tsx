'use client';

import { useState, useEffect } from 'react';
import { Search, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface Token {
  address: string;
  name: string;
  symbol: string;
  price: string;
  change5m: string;
  change1h: string;
  change6h: string;
  change24h: string;
  volume: string;
  liquidity: string;
  fdv: string;
}

const SAMPLE_TOKENS: Token[] = [
  { address: "EKpQGSJtiSuGXbPCr92R7g5w53C5KdqU4qW6bY9z3Q1t", name: "dogwifhat", symbol: "WIF", price: "$3.45", change5m: "+12.4%", change1h: "+28.7%", change6h: "+89.3%", change24h: "+245.1%", volume: "$1.2B", liquidity: "$820M", fdv: "$3.4B" },
  { address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263", name: "Bonk", symbol: "BONK", price: "$0.0000342", change5m: "+8.7%", change1h: "+21.3%", change6h: "+67.8%", change24h: "+189.4%", volume: "$1.1B", liquidity: "$780M", fdv: "$2.9B" },
  { address: "pumpfun111111111111111111111111111111111", name: "Popcat", symbol: "POPCAT", price: "$1.23", change5m: "+15.2%", change1h: "+35.4%", change6h: "+98.7%", change24h: "+312.1%", volume: "$890M", liquidity: "$210M", fdv: "$1.2B" },
  { address: "JUPyiwrYfeNUR...", name: "Jupiter", symbol: "JUP", price: "$0.92", change5m: "+5.2%", change1h: "+18.9%", change6h: "+42.1%", change24h: "+156.8%", volume: "$682M", liquidity: "$520M", fdv: "$1.3B" },
  { address: "SHIBt1e2...", name: "Shiba Inu", symbol: "SHIB", price: "$0.000028", change5m: "-2.1%", change1h: "+9.8%", change6h: "+29.4%", change24h: "+98.2%", volume: "$2.2B", liquidity: "$340M", fdv: "$16.5B" },
  { address: "MYROv2sol...", name: "Myro", symbol: "MYRO", price: "$0.28", change5m: "+18.3%", change1h: "+42.1%", change6h: "+112.5%", change24h: "+378.9%", volume: "$89M", liquidity: "$42M", fdv: "$280M" },
];

export default function HomePage() {
  const [tokens, setTokens] = useState<Token[]>(SAMPLE_TOKENS);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('https://api.geckoterminal.com/api/v2/networks/solana/trending_pools');
        const json = await res.json();
        if (json.data?.length > 0) {
          const live = json.data.slice(0, 25).map((p: any) => {
            const a = p.attributes;
            return {
              address: a.base_token.address,
              name: a.name.split(' / ')[0] || a.base_token.name,
              symbol: a.base_token.symbol,
              price: a.base_token_price_usd ? `$${Number(a.base_token_price_usd).toFixed(6)}` : '$0.00',
              change5m: a.price_change_percentage?.m5 ? `${a.price_change_percentage.m5 > 0 ? '+' : ''}${a.price_change_percentage.m5.toFixed(1)}%` : '0.0%',
              change1h: a.price_change_percentage?.h1 ? `${a.price_change_percentage.h1 > 0 ? '+' : ''}${a.price_change_percentage.h1.toFixed(1)}%` : '0.0%',
              change6h: a.price_change_percentage?.h6 ? `${a.price_change_percentage.h6 > 0 ? '+' : ''}${a.price_change_percentage.h6.toFixed(1)}%` : '0.0%',
              change24h: a.price_change_percentage?.h24 ? `${a.price_change_percentage.h24 > 0 ? '+' : ''}${a.price_change_percentage.h24.toFixed(1)}%` : '0.0%',
              volume: a.volume_usd?.h24 ? `$${(a.volume_usd.h24 / 1e6).toFixed(1)}M` : '$0',
              liquidity: a.reserve_in_usd ? `$${(a.reserve_in_usd / 1e6).toFixed(1)}M` : '$0',
              fdv: a.fdv_usd ? `$${(a.fdv_usd / 1e9).toFixed(2)}B` : '$0',
            };
          });
          setTokens(live);
        }
      } catch (e) {
        console.log("API failed → showing samples");
      } finally {
        setLoading(false);
      }
    }
    load();
    const id = setInterval(load, 15000);
    return () => clearInterval(id);
  }, []);

  const filtered = tokens.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 inset-x-0 z-50 bg-black/95 backdrop-blur border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-4xl font-black bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">DexNova</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search any meme..."
              className="pl-10 pr-6 py-3 bg-gray-900 border border-gray-700 rounded-xl w-96 focus:border-pink-500 outline-none"
            />
          </div>
        </div>
      </nav>

      <div className="pt-32 text-center pb-12">
        <h1 className="text-8xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          SOLANA LEADERBOARD
        </h1>
        <p className="text-2xl text-gray-400 mt-4">Real-time meme coins • Updated every 15s</p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="text-center py-32">
            <div className="inline-block animate-spin rounded-full h-20 w-20 border-t-4 border-pink-500"></div>
          </div>
        ) : (
          <div className="bg-gray-950/60 rounded-3xl overflow-hidden border border-gray-800">
            <table className="w-full">
              <thead className="bg-gray-900/80">
                <tr className="text-left text-gray-400 text-sm uppercase">
                  <th className="px-6 py-5">#</th>
                  <th className="px-6 py-5">Token</th>
                  <th className="px-6 py-5 text-right">Price</th>
                  <th className="px-6 py-5 text-right">5m</th>
                  <th className="px-6 py-5 text-right">1h</th>
                  <th className="px-6 py-5 text-right">6h</th>
                  <th className="px-6 py-5 text-right">24h</th>
                  <th className="px-6 py-5 text-right">Volume</th>
                  <th className="px-6 py-5 text-right">Liq</th>
                  <th className="px-6 py-5 text-right">FDV</th>
                  <th className="px-6 py-5 text-center">Trade</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((token, i) => (
                  <tr key={token.address} className="border-t border-gray-800 hover:bg-gray-900/50">
                    <td className="px-6 py-5 text-gray-500">{i + 1}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-lg">
                          {token.symbol.slice(0, 3)}
                        </div>
                        <div>
                          <Link href={`/token/${token.address}`} className="font-bold hover:text-cyan-400">
                            {token.name}
                          </Link>
                          <p className="text-sm text-gray-500">{token.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right font-bold">{token.price}</td>
                    <td className={`px-6 py-5 text-right font-bold ${token.change5m.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{token.change5m}</td>
                    <td className={`px-6 py-5 text-right font-bold ${token.change1h.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{token.change1h}</td>
                    <td className={`px-6 py-5 text-right font-bold ${token.change6h.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{token.change6h}</td>
                    <td className={`px-6 py-5 text-right font-bold ${token.change24h.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{token.change24h}</td>
                    <td className="px-6 py-5 text-right text-gray-300">{token.volume}</td>
                    <td className="px-6 py-5 text-right text-gray-300">{token.liquidity}</td>
                    <td className="px-6 py-5 text-right text-gray-300">{token.fdv}</td>
                    <td className="px-6 py-5 text-center">
                      <a
                        href={`https://jup.ag/swap/SOL-${token.address}?ref=DEXNOVA2025`}
                        target="_blank"
                        className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold hover:scale-105 transition"
                      >
                        BUY NOW
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
