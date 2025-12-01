'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

interface Pair {
  id: number;
  rank: number;
  name: string;
  symbol: string;
  base: string;
  logo: string;
  age: string;
  change5m: string;
  change1h: string;
  change6h: string;
  change24h: string;
  volume: number;
  liquidity: number;
  txns: number;
  buys: number;
  sells: number;
  mcap: number;
  chain: string;
}

const SAMPLE_PAIRS: Pair[] = [
  { id: 1, rank: 1, name: "BULL", symbol: "BULL", base: "SOL", logo: "https://via.placeholder.com/28/ff3366/fff?text=B", age: "4h", change5m: "+4.2", change1h: "+12.1", change6h: "-8.4", change24h: "-22.1", volume: 1840000, liquidity: 892000, txns: 18400, buys: 68, sells: 32, mcap: 84200000, chain: "solana" },
  { id: 2, rank: 2, name: "MOONSHOT", symbol: "MOONSHOT", base: "SOL", logo: "https://via.placeholder.com/28/00ff00/000?text=M", age: "2h", change5m: "+38.7", change1h: "+91.2", change6h: "+176", change24h: "+176", volume: 3210000, liquidity: 1100000, txns: 31200, buys: 78, sells: 22, mcap: 110000000, chain: "solana" },
  { id: 3, rank: 3, name: "PEPE", symbol: "PEPE", base: "ETH", logo: "https://via.placeholder.com/28/3366ff/fff?text=P", age: "18d", change5m: "+1.1", change1h: "-3.2", change6h: "+7.8", change24h: "+14.5", volume: 42100000, liquidity: 28400000, txns: 89000, buys: 54, sells: 46, mcap: 4200000000, chain: "ethereum" },
  { id: 4, rank: 4, name: "DOGWIFHAT", symbol: "WIF", base: "SOL", logo: "https://via.placeholder.com/28/ffcc00/000?text=W", age: "11mo", change5m: "-0.8", change1h: "+5.6", change6h: "+11.2", change24h: "-9.3", volume: 38700000, liquidity: 19200000, txns: 67000, buys: 51, sells: 49, mcap: 3100000000, chain: "solana" },
  { id: 5, rank: 5, name: "GROK", symbol: "GROK", base: "ETH", logo: "https://via.placeholder.com/28/ff0066/fff?text=G", age: "3d", change5m: "+7.3", change1h: "+19.4", change6h: "+42.1", change24h: "+68.9", volume: 2940000, liquidity: 1670000, txns: 28900, buys: 72, sells: 28, mcap: 420000000, chain: "ethereum" },
  // Add the rest of your 50 pairs here...
];

export default function HotPairsPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="text-center py-32">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
          DEXTools Hot Pairs — DexNova Clone
        </h1>
        <p className="mt-8 text-2xl text-gray-400">50+ sample pairs • Real layout • Ready for live data</p>
      </div>
    </div>
  );
}
