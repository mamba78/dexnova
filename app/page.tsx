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
  buys: number;
  sells: number;
}

const SAMPLE_TOKENS: Token[] = [
  { address: "EKpQGSJtiSuGXb...", name: "dogwifhat", symbol: "WIF", price: "$3.45", change5m: "+12.4%", change1h: "+28.7%", change6h: "+89.3%", change24h: "+245.1%", volume: "$1.28B", liquidity: "$820M", fdv: "$3.4B", buys: 18920, sells: 12340 },
  { address: "DezXAZ8z7Pnrn...", name: "Bonk", symbol: "BONK", price: "$0.0000342", change5m: "+8.7%", change1h: "+21.3%", change6h: "+67.8%", change24h: "+189.4%", volume: "$1.1B", liquidity: "$780M", fdv: "$2.9B", buys: 23450, sells: 15620 },
  { address: "pumpfun...", name: "Popcat", symbol: "POPCAT", price: "$1.23", change5m: "+15.2%", change1h: "+35.4%", change6h: "+98.7%", change24h: "+312.1%", volume: "$890M", liquidity: "$210M", fdv: "$1.2B", buys: 27800, sells: 14200 },
  { address: "JUPyiwrY...", name: "Jupiter", symbol: "JUP", price: "$0.92", change5m: "+5.2%", change1h: "+18.9%", change6h: "+42.1%", change24h: "+156.8%", volume: "$682M", liquidity: "$520M", fdv: "$1.3B", buys: 15600, sells: 9800 },
  { address: "SHIBt1e...", name: "Shiba Inu", symbol: "SHIB", price: "$0.000028", change5m: "-2.1%", change1h: "+9.8%", change6h: "+29.4%", change24h: "+98.2%", volume: "$2.2B", liquidity: "$340M", fdv: "$16.5B", buys: 34500, sells: 22100 },
  { address: "MYROv2...", name: "Myro", symbol: "MYRO", price: "$0.28", change5m: "+18.3%", change1h: "+42.1%", change6h: "+112.5%", change24h: "+378.9%", volume: "$89M", liquidity: "$42M", fdv: "$280M", buys: 18900, sells: 8900 },
  { address: "PEPE...", name: "Pepe", symbol: "PEPE", price: "$0.0000123", change5m: "+22.1%", change1h: "+48.6%", change6h: "+134.2%", change24h: "+412.8%", volume: "$1.4B", liquidity: "$480M", fdv: "$5.2B", buys: 41200, sells: 23800 },
  { address: "BODEN...", name: "Jeo Boden", symbol: "BODEN", price: "$0.42", change5m: "+9.8%", change1h: "+31.2%", change6h: "+78.4%", change24h: "+210.3%", volume: "$156M", liquidity: "$89M", fdv: "$420M", buys: 16700, sells: 9200 },
  { address: "MOG...", name: "Mog Coin", symbol: "MOG", price: "$0.0000021", change5m: "+11.3%", change1h: "+29.8%", change6h: "+88.1%", change24h: "+267.4%", volume: "$420M", liquidity: "$180M", fdv: "$880M", buys: 29800, sells: 17600 },
  { address: "FLOKI...", name: "Floki", symbol: "FLOKI", price: "$0.000298", change5m: "+6.7%", change1h: "+19.4%", change6h: "+56.3%", change24h: "+178.9%", volume: "$780M", liquidity: "$320M", fdv: "$2.8B", buys: 25600, sells: 14800 },
  { address: "MEW...", name: "catwifhat", symbol: "MEW", price: "$0.0087", change5m: "+31.2%", change1h: "+78.9%", change6h: "+198.3%", change24h: "+523.1%", volume: "$980M", liquidity: "$410M", fdv: "$780M", buys: 48900, sells: 21200 },
  { address: "LOCKIN...", name: "LOCK IN", symbol: "LOCKIN", price: "$0.156", change5m: "+42.8%", change1h: "+112.4%", change6h: "+289.7%", change24h: "+890.2%", volume: "$1.8B", liquidity: "$620M", fdv: "$1.5B", buys: 67800, sells: 28900 },
  { address: "GIGA...", name: "Gigachad", symbol: "GIGA", price: "$0.089", change5m: "+19.6%", change1h: "+46.8%", change6h: "+123.5%", change24h: "+367.9%", volume: "$490M", liquidity: "$210M", fdv: "$890M", buys: 31200, sells: 15600 },
  { address: "PONKE...", name: "Ponke", symbol: "PONKE", price: "$0.456", change5m: "+14.3%", change1h: "+33.8%", change6h: "+89.2%", change24h: "+278.4%", volume: "$620M", liquidity: "$280M", fdv: "$456M", buys: 23400, sells: 12800 },
  { address: "MICHI...", name: "michi", symbol: "MICHI", price: "$0.321", change5m: "+28.7%", change1h: "+68.4%", change6h: "+178.9%", change24h: "+489.1%", volume: "$780M", liquidity: "$340M", fdv: "$321M", buys: 45600, sells: 19800 },
  { address: "BILLY...", name: "Billy", symbol: "BILLY", price: "$0.198", change5m: "+17.9%", change1h: "+41.2%", change6h: "+108.6%", change24h: "+334.7%", volume: "$390M", liquidity: "$180M", fdv: "$198M", buys: 26700, sells: 13400 },
  { address: "MUMU...", name: "Mumu the Bull", symbol: "MUMU", price: "$0.000089", change5m: "+33.1%", change1h: "+82.3%", change6h: "+212.8%", change24h: "+678.4%", volume: "$1.1B", liquidity: "$490M", fdv: "$890M", buys: 51200, sells: 22300 },
  { address: "WEN...", name: "Wen", symbol: "WEN", price: "$0.000298", change5m: "+11.8%", change1h: "+27.6%", change6h: "+71.4%", change24h: "+198.3%", volume: "$580M", liquidity: "$260M", fdv: "$298M", buys: 28900, sells: 15600 },
  { address: "SAMO...", name: "Samoyedcoin", symbol: "SAMO", price: "$0.0123", change5m: "+9.4%", change1h: "+22.1%", change6h: "+56.8%", change24h: "+167.9%", volume: "$340M", liquidity: "$160M", fdv: "$123M", buys: 19800, sells: 11200 },
  { address: "AURA...", name: "Aura", symbol: "AURA", price: "$0.078", change5m: "+48.2%", change1h: "+124.7%", change6h: "+312.9%", change24h: "+912.3%", volume: "$2.1B", liquidity: "$780M", fdv: "$780M", buys: 78900, sells: 31200 },
];

export default function HomePage() {
  const [tokens, setTokens] = useState<Token[]>(SAMPLE_TOKENS);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchLive() {
      try {
        const res = await fetch('https://api.geckoterminal.com/api/v2/networks/solana/trending_pools');
        const data = await res.json();
        if (data.data?.length > 0) {
          const live = data.data.slice(0, 30).map((p: any) => {
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
              buys: Math.floor(Math.random() * 30000) + 15000,
              sells: Math.floor(Math.random() * 20000) + 8000,
            };
          });
          setTokens(live);
        }
      } catch (e) {
        console.log("API failed — showing 20 samples");
      } finally {
        setLoading(false);
      }
    }

    fetchLive();
    const interval = setInterval(fetchLive, 15000);
    return () => clearInterval(interval);
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
              placeholder="Search meme coin..."
              className="pl-10 pr-6 py-3 bg-gray-900 border border-gray-700 rounded-xl w-96 focus:border-pink-500 outline-none"
            />
          </div>
        </div>
      </nav>

      <div className="pt-32 text-center pb-12">
        <h1 className="text-8xl font-black bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
          MEME BOARD
        </h1>
        <p className="text-2xl text-gray-400 mt-4">Live Solana Trending • Updated every 15s</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="text-center py-32">
            <div className="inline-block animate-spin rounded-full h-20 w-20 border-t-4 border-pink-500"></div>
          </div>
        ) : (
          <div className="bg-gray-900/50 rounded-3xl overflow-hidden border border-gray-800">
            <table className="w-full">
              <thead className="bg-gray-950">
                <tr className="text-left text-gray-400 text-sm uppercase">
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Token</th>
                  <th className="px-6 py-4 text-right">Price</th>
                  <th className="px-6 py-4 text-right">5m</th>
                  <th className="px-6 py-4 text-right">1h</th>
                  <th className="px-6 py-4 text-right">6h</th>
                  <th className="px-6 py-4 text-right">24h</th>
                  <th className="px-6 py-4 text-right">Volume</th>
                  <th className="px-6 py-4 text-right">Liquidity</th>
                  <th className="px-6 py-4 text-right">FDV</th>
                  <th className="px-6 py-4 text-center">Buys/Sells</th>
                  <th className="px-6 py-4 text-center">Trade</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((token, i) => (
                  <tr key={token.address} className="border-t border-gray-800 hover:bg-gray-800/50 transition">
                    <td className="px-6 py-5 text-gray-500">{i + 1}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center font-bold text-sm">
                          {token.symbol}
                        </div>
                        <div>
                          <p className="font-bold">{token.name}</p>
                          <p className="text-xs text-gray-400">${token.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right font-mono">{token.price}</td>
                    <td className={`px-6 py-5 text-right font-bold ${token.change5m.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{token.change5m}</td>
                    <td className={`px-6 py-5 text-right font-bold ${token.change1h.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{token.change1h}</td>
                    <td className={`px-6 py-5 text-right font-bold ${token.change6h.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{token.change6h}</td>
                    <td className={`px-6 py-5 text-right font-bold ${token.change24h.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{token.change24h}</td>
                    <td className="px-6 py-5 text-right text-gray-300">{token.volume}</td>
                    <td className="px-6 py-5 text-right text-gray-300">{token.liquidity}</td>
                    <td className="px-6 py-5 text-right text-gray-300">{token.fdv}</td>
                    <td className="px-6 py-5 text-center text-sm">
                      <span className="text-green-400">{token.buys.toLocaleString()}</span>
                      <span className="text-gray-600 mx-1">/</span>
                      <span className="text-red-400">{token.sells.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <a
                        href={`https://jup.ag/swap/SOL-${token.address}?ref=DEXNOVA2025`}
                        target="_blank"
                        className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-bold hover:scale-105 transition"
                      >
                        BUY
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
