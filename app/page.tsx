'use client';

import { useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';

export default function HotPairsPage() {
  const [search, setSearch] = useState('');
  const [timeframe, setTimeframe] = useState('6H');
  const [minLiquidity, setMinLiquidity] = useState(100000);
  const [selectedChains, setSelectedChains] = useState({ ethereum: true, solana: true, bsc: true, base: true, polygon: false });
  const [hideRugs, setHideRugs] = useState(false);
  const [pairs, setPairs] = useState([
    { id: 1, rank: 1, name: "BULL", symbol: "BULL", base: "SOL", logo: "https://via.placeholder.com/28/ff3366/fff?text=B", age: "4h", change5m: "+4.2", change1h: "+12.1", change6h: "-8.4", change24h: "-22.1", volume: 1840000, liquidity: 892000, txns: 18400, buys: 68, sells: 32, mcap: 84200000, chain: "solana" },
    { id: 2, rank: 2, name: "MOONSHOT", symbol: "MOONSHOT", base: "SOL", logo: "https://via.placeholder.com/28/00ff00/000?text=M", age: "2h", change5m: "+38.7", change1h: "+91.2", change6h: "+176", change24h: "+176", volume: 3210000, liquidity: 1100000, txns: 31200, buys: 78, sells: 22, mcap: 110000000, chain: "solana" },
    { id: 3, rank: 3, name: "PEPE", symbol: "PEPE", base: "ETH", logo: "https://via.placeholder.com/28/3366ff/fff?text=P", age: "18d", change5m: "+1.1", change1h: "-3.2", change6h: "+7.8", change24h: "+14.5", volume: 42100000, liquidity: 28400000, txns: 89000, buys: 54, sells: 46, mcap: 4200000000, chain: "ethereum" },
    { id: 4, rank: 4, name: "DOGWIFHAT", symbol: "DOGWIFHAT", base: "SOL", logo: "https://via.placeholder.com/28/ffcc00/000?text=D", age: "11mo", change5m: "-0.8", change1h: "+5.6", change6h: "+11.2", change24h: "-9.3", volume: 38700000, liquidity: 19200000, txns: 67000, buys: 51, sells: 49, mcap: 3100000000, chain: "solana" },
    { id: 5, rank: 5, name: "GROK", symbol: "GROK", base: "ETH", logo: "https://via.placeholder.com/28/ff0066/fff?text=G", age: "3d", change5m: "+7.3", change1h: "+19.4", change6h: "+42.1", change24h: "+68.9", volume: 2940000, liquidity: 1670000, txns: 28900, buys: 72, sells: 28, mcap: 420000000, chain: "ethereum" },
    { id: 6, rank: 6, name: "ACT", symbol: "ACT", base: "SOL", logo: "https://via.placeholder.com/28/66ff33/000?text=A", age: "45m", change5m: "+112", change1h: "+248", change6h: "+248", change24h: "+248", volume: 5120000, liquidity: 2300000, txns: 41000, buys: 81, sells: 19, mcap: 230000000, chain: "solana" },
    { id: 7, rank: 7, name: "NEIRO", symbol: "NEIRO", base: "ETH", logo: "https://via.placeholder.com/28/cc33ff/fff?text=N", age: "6d", change5m: "-4.1", change1h: "+8.7", change6h: "-12.3", change24h: "+33.5", volume: 18900000, liquidity: 11200000, txns: 52000, buys: 58, sells: 42, mcap: 890000000, chain: "ethereum" },
    { id: 8, rank: 8, name: "SPX6900", symbol: "SPX6900", base: "ETH", logo: "https://via.placeholder.com/28/ffff33/000?text=S", age: "22d", change5m: "+2.9", change1h: "-6.5", change6h: "+22.1", change24h: "+41.2", volume: 9800000, liquidity: 6400000, txns: 31000, buys: 62, sells: 38, mcap: 690000000, chain: "ethereum" },
    { id: 9, rank: 9, name: "FARTCOIN", symbol: "FARTCOIN", base: "SOL", logo: "https://via.placeholder.com/28/ff6600/fff?text=F", age: "5h", change5m: "+67.3", change1h: "+134", change6h: "+201", change24h: "+201", volume: 7410000, liquidity: 3100000, txns: 59000, buys: 79, sells: 21, mcap: 310000000, chain: "solana" },
    { id: 10, rank: 10, name: "POPCAT", symbol: "POPCAT", base: "SOL", logo: "https://via.placeholder.com/28/00ffff/fff?text=P", age: "9mo", change5m: "-1.2", change1h: "+4.4", change6h: "+18.7", change24h: "-5.6", volume: 31200000, liquidity: 22800000, txns: 71000, buys: 53, sells: 47, mcap: 1900000000, chain: "solana" },
    { id: 11, rank: 11, name: "BONK", symbol: "BONK", base: "SOL", logo: "https://via.placeholder.com/28/ff3399/fff?text=B", age: "2y", change5m: "+0.9", change1h: "-2.1", change6h: "+9.3", change24h: "+17.8", volume: 48100000, liquidity: 33500000, txns: 102000, buys: 55, sells: 45, mcap: 2800000000, chain: "solana" },
    { id: 12, rank: 12, name: "MOG", symbol: "MOG", base: "ETH", logo: "https://via.placeholder.com/28/33ffcc/000?text=M", age: "14d", change5m: "+5.6", change1h: "+21.3", change6h: "+48.7", change24h: "+92.1", volume: 12400000, liquidity: 7900000, txns: 44000, buys: 69, sells: 31, mcap: 790000000, chain: "ethereum" },
    { id: 13, rank: 13, name: "AURA", symbol: "AURA", base: "SOL", logo: "https://via.placeholder.com/28/9900ff/fff?text=A", age: "1h", change5m: "+89", change1h: "+178", change6h: "+178", change24h: "+178", volume: 4880000, liquidity: 1950000, txns: 37000, buys: 83, sells: 17, mcap: 195000000, chain: "solana" },
    { id: 14, rank: 14, name: "LOCKIN", symbol: "LOCKIN", base: "SOL", logo: "https://via.placeholder.com/28/ffcc99/000?text=L", age: "20m", change5m: "+156", change1h: "+312", change6h: "+312", change24h: "+312", volume: 9870000, liquidity: 4200000, txns: 68000, buys: 85, sells: 15, mcap: 420000000, chain: "solana" },
    { id: 15, rank: 15, name: "MICHI", symbol: "MICHI", base: "SOL", logo: "https://via.placeholder.com/28/66ff33/000?text=M", age: "6mo", change5m: "+28.7", change1h: "+68.4", change6h: "+178.9", change24h: "+489.1", volume: 7800000, liquidity: 3400000, txns: 45600, buys: 67, sells: 33, mcap: 321000000, chain: "solana" },
    { id: 16, rank: 16, name: "BODEN", symbol: "BODEN", base: "SOL", logo: "https://via.placeholder.com/28/ff0066/fff?text=B", age: "10mo", change5m: "+9.8", change1h: "+31.2", change6h: "+78.4", change24h: "+210.3", volume: 1560000, liquidity: 890000, txns: 16700, buys: 71, sells: 29, mcap: 420000000, chain: "solana" },
    { id: 17, rank: 17, name: "GIGA", symbol: "GIGA", base: "SOL", logo: "https://via.placeholder.com/28/ff6600/fff?text=G", age: "5mo", change5m: "+19.6", change1h: "+46.8", change6h: "+123.5", change24h: "+367.9", volume: 4900000, liquidity: 2100000, txns: 31200, buys: 73, sells: 27, mcap: 890000000, chain: "solana" },
    { id: 18, rank: 18, name: "PONKE", symbol: "PONKE", base: "SOL", logo: "https://via.placeholder.com/28/00ffff/fff?text=P", age: "8mo", change5m: "+14.3", change1h: "+33.8", change6h: "+89.2", change24h: "+278.4", volume: 6200000, liquidity: 2800000, txns: 23400, buys: 64, sells: 36, mcap: 456000000, chain: "solana" },
    { id: 19, rank: 19, name: "BILLY", symbol: "BILLY", base: "SOL", logo: "https://via.placeholder.com/28/33ccff/000?text=B", age: "7mo", change5m: "+17.9", change1h: "+41.2", change6h: "+108.6", change24h: "+334.7", volume: 3900000, liquidity: 1800000, txns: 26700, buys: 62, sells: 38, mcap: 198000000, chain: "solana" },
    { id: 20, rank: 20, name: "MUMU", symbol: "MUMU", base: "SOL", logo: "https://via.placeholder.com/28/ff3399/fff?text=M", age: "4mo", change5m: "+33.1", change1h: "+82.3", change6h: "+212.8", change24h: "+678.4", volume: 11000000, liquidity: 4900000, txns: 51200, buys: 76, sells: 24, mcap: 890000000, chain: "solana" },
    // Add 30 more for 50 total (similar structure, varied data)
    { id: 21, rank: 21, name: "WEN", symbol: "WEN", base: "SOL", logo: "https://via.placeholder.com/28/ffff33/000?text=W", age: "1y", change5m: "+11.8", change1h: "+27.6", change6h: "+71.4", change24h: "+198.3", volume: 5800000, liquidity: 2600000, txns: 28900, buys: 58, sells: 42, mcap: 298000000, chain: "solana" },
    { id: 22, rank: 22, name: "SAMO", symbol: "SAMO", base: "SOL", logo: "https://via.placeholder.com/28/33ffcc/000?text=S", age: "2y", change5m: "+9.4", change1h: "+22.1", change6h: "+56.8", change24h: "+167.9", volume: 3400000, liquidity: 1600000, txns: 19800, buys: 59, sells: 41, mcap: 123000000, chain: "solana" },
    { id: 23, rank: 23, name: "ZERE", symbol: "ZERE", base: "SOL", logo: "https://via.placeholder.com/28/6666ff/fff?text=Z", age: "3h", change5m: "+41.2", change1h: "+88.5", change6h: "+122", change24h: "+122", volume: 1670000, liquidity: 780000, txns: 21000, buys: 74, sells: 26, mcap: 78000000, chain: "solana" },
    { id: 24, rank: 24, name: "KAK", symbol: "KAK", base: "SOL", logo: "https://via.placeholder.com/28/ffcc99/000?text=K", age: "6h", change5m: "-12.4", change1h: "+33.1", change6h: "+67.8", change24h: "+91.2", volume: 2310000, liquidity: 990000, txns: 29000, buys: 66, sells: 34, mcap: 99000000, chain: "solana" },
    { id: 25, rank: 25, name: "TRUMP", symbol: "TRUMP", base: "SOL", logo: "https://via.placeholder.com/28/33ccff/000?text=T", age: "11d", change5m: "+3.8", change1h: "-7.2", change6h: "+19.4", change24h: "+38.6", volume: 8900000, liquidity: 5500000, txns: 34000, buys: 59, sells: 41, mcap: 550000000, chain: "solana" },
    { id: 26, rank: 26, name: "MEW", symbol: "MEW", base: "SOL", logo: "https://via.placeholder.com/28/ff33cc/fff?text=M", age: "11mo", change5m: "+31.2", change1h: "+78.9", change6h: "+198.3", change24h: "+523.1", volume: 9800000, liquidity: 4100000, txns: 48900, buys: 82, sells: 18, mcap: 780000000, chain: "solana" },
    { id: 27, rank: 27, name: "FLOKI", symbol: "FLOKI", base: "BSC", logo: "https://via.placeholder.com/28/ff0066/fff?text=F", age: "2y", change5m: "+6.7", change1h: "+19.4", change6h: "+56.3", change24h: "+178.9", volume: 7800000, liquidity: 3200000, txns: 25600, buys: 63, sells: 37, mcap: 2800000000, chain: "bsc" },
    { id: 28, rank: 28, name: "SHIB", symbol: "SHIB", base: "ETH", logo: "https://via.placeholder.com/28/ff3366/fff?text=S", age: "4y", change5m: "-2.1", change1h: "+9.8", change6h: "+29.4", change24h: "+98.2", volume: 22000000, liquidity: 3400000, txns: 23400, buys: 56, sells: 44, mcap: 16500000000, chain: "ethereum" },
    { id: 29, rank: 29, name: "JUP", symbol: "JUP", base: "SOL", logo: "https://via.placeholder.com/28/00ff88/000?text=J", age: "1y", change5m: "+5.2", change1h: "+18.9", change6h: "+42.1", change24h: "+156.8", volume: 6820000, liquidity: 5200000, txns: 12450, buys: 67, sells: 33, mcap: 1300000000, chain: "solana" },
    { id: 30, rank: 30, name: "PEPE", symbol: "PEPE", base: "ETH", logo: "https://via.placeholder.com/28/3366ff/fff?text=P", age: "2y", change5m: "+22.1", change1h: "+48.6", change6h: "+134.2", change24h: "+412.8", volume: 14000000, liquidity: 4800000, txns: 41200, buys: 75, sells: 25, mcap: 5200000000, chain: "ethereum" },
    // Continue with 20 more varied pairs for 50 total
    { id: 31, rank: 31, name: "BODEN", symbol: "BODEN", base: "SOL", logo: "https://via.placeholder.com/28/ffcc00/000?text=B", age: "10mo", change5m: "+9.8", change1h: "+31.2", change6h: "+78.4", change24h: "+210.3", volume: 1560000, liquidity: 890000, txns: 17800, buys: 72, sells: 28, mcap: 420000000, chain: "solana" },
    { id: 32, rank: 32, name: "MOG", symbol: "MOG", base: "ETH", logo: "https://via.placeholder.com/28/00ff00/000?text=M", age: "11mo", change5m: "+11.3", change1h: "+29.8", change6h: "+88.1", change24h: "+267.4", volume: 4200000, liquidity: 1800000, txns: 29800, buys: 68, sells: 32, mcap: 880000000, chain: "ethereum" },
    { id: 33, rank: 33, name: "GIGA", symbol: "GIGA", base: "SOL", logo: "https://via.placeholder.com/28/ff6600/fff?text=G", age: "5mo", change5m: "+19.6", change1h: "+46.8", change6h: "+123.5", change24h: "+367.9", volume: 4900000, liquidity: 2100000, txns: 31200, buys: 74, sells: 26, mcap: 890000000, chain: "solana" },
    { id: 34, rank: 34, name: "PONKE", symbol: "PONKE", base: "SOL", logo: "https://via.placeholder.com/28/66ff33/000?text=P", age: "8mo", change5m: "+14.3", change1h: "+33.8", change6h: "+89.2", change24h: "+278.4", volume: 6200000, liquidity: 2800000, txns: 23400, buys: 65, sells: 35, mcap: 456000000, chain: "solana" },
    { id: 35, rank: 35, name: "MICHI", symbol: "MICHI", base: "SOL", logo: "https://via.placeholder.com/28/cc33ff/fff?text=M", age: "6mo", change5m: "+28.7", change1h: "+68.4", change6h: "+178.9", change24h: "+489.1", volume: 7800000, liquidity: 3400000, txns: 45600, buys: 76, sells: 24, mcap: 321000000, chain: "solana" },
    { id: 36, rank: 36, name: "BILLY", symbol: "BILLY", base: "SOL", logo: "https://via.placeholder.com/28/ff0066/fff?text=B", age: "7mo", change5m: "+17.9", change1h: "+41.2", change6h: "+108.6", change24h: "+334.7", volume: 3900000, liquidity: 1800000, txns: 26700, buys: 61, sells: 39, mcap: 198000000, chain: "solana" },
    { id: 37, rank: 37, name: "MUMU", symbol: "MUMU", base: "SOL", logo: "https://via.placeholder.com/28/ff3366/fff?text=M", age: "4mo", change5m: "+33.1", change1h: "+82.3", change6h: "+212.8", change24h: "+678.4", volume: 11000000, liquidity: 4900000, txns: 51200, buys: 77, sells: 23, mcap: 890000000, chain: "solana" },
    { id: 38, rank: 38, name: "WEN", symbol: "WEN", base: "SOL", logo: "https://via.placeholder.com/28/ffff33/000?text=W", age: "1y", change5m: "+11.8", change1h: "+27.6", change6h: "+71.4", change24h: "+198.3", volume: 5800000, liquidity: 2600000, txns: 28900, buys: 57, sells: 43, mcap: 298000000, chain: "solana" },
    { id: 39, rank: 39, name: "SAMO", symbol: "SAMO", base: "SOL", logo: "https://via.placeholder.com/28/33ffcc/000?text=S", age: "2y", change5m: "+9.4", change1h: "+22.1", change6h: "+56.8", change24h: "+167.9", volume: 3400000, liquidity: 1600000, txns: 19800, buys: 60, sells: 40, mcap: 123000000, chain: "solana" },
    { id: 40, rank: 40, name: "ZERE", symbol: "ZERE", base: "SOL", logo: "https://via.placeholder.com/28/6666ff/fff?text=Z", age: "3h", change5m: "+41.2", change1h: "+88.5", change6h: "+122", change24h: "+122", volume: 1670000, liquidity: 780000, txns: 21000, buys: 75, sells: 25, mcap: 78000000, chain: "solana" },
    { id: 41, rank: 41, name: "KAK", symbol: "KAK", base: "SOL", logo: "https://via.placeholder.com/28/ffcc99/000?text=K", age: "6h", change5m: "-12.4", change1h: "+33.1", change6h: "+67.8", change24h: "+91.2", volume: 2310000, liquidity: 990000, txns: 29000, buys: 67, sells: 33, mcap: 99000000, chain: "solana" },
    { id: 42, rank: 42, name: "TRUMP", symbol: "TRUMP", base: "SOL", logo: "https://via.placeholder.com/28/33ccff/000?text=T", age: "11d", change5m: "+3.8", change1h: "-7.2", change6h: "+19.4", change24h: "+38.6", volume: 8900000, liquidity: 5500000, txns: 34000, buys: 58, sells: 42, mcap: 550000000, chain: "solana" },
    { id: 43, rank: 43, name: "MEW", symbol: "MEW", base: "SOL", logo: "https://via.placeholder.com/28/ff33cc/fff?text=M", age: "11mo", change5m: "+31.2", change1h: "+78.9", change6h: "+198.3", change24h: "+523.1", volume: 9800000, liquidity: 4100000, txns: 48900, buys: 83, sells: 17, mcap: 780000000, chain: "solana" },
    { id: 44, rank: 44, name: "FLOKI", symbol: "FLOKI", base: "BSC", logo: "https://via.placeholder.com/28/ff0066/fff?text=F", age: "2y", change5m: "+6.7", change1h: "+19.4", change6h: "+56.3", change24h: "+178.9", volume: 7800000, liquidity: 3200000, txns: 25600, buys: 64, sells: 36, mcap: 2800000000, chain: "bsc" },
    { id: 45, rank: 45, name: "SHIB", symbol: "SHIB", base: "ETH", logo: "https://via.placeholder.com/28/ff3366/fff?text=S", age: "4y", change5m: "-2.1", change1h: "+9.8", change6h: "+29.4", change24h: "+98.2", volume: 22000000, liquidity: 3400000, txns: 23400, buys: 57, sells: 43, mcap: 16500000000, chain: "ethereum" },
    { id: 46, rank: 46, name: "JUP", symbol: "JUP", base: "SOL", logo: "https://via.placeholder.com/28/00ff88/000?text=J", age: "1y", change5m: "+5.2", change1h: "+18.9", change6h: "+42.1", change24h: "+156.8", volume: 6820000, liquidity: 5200000, txns: 12450, buys: 66, sells: 34, mcap: 1300000000, chain: "solana" },
    { id: 47, rank: 47, name: "PEPE", symbol: "PEPE", base: "ETH", logo: "https://via.placeholder.com/28/3366ff/fff?text=P", age: "2y", change5m: "+22.1", change1h: "+48.6", change6h: "+134.2", change24h: "+412.8", volume: 14000000, liquidity: 4800000, txns: 41200, buys: 76, sells: 24, mcap: 5200000000, chain: "ethereum" },
    { id: 48, rank: 48, name: "BODEN", symbol: "BODEN", base: "SOL", logo: "https://via.placeholder.com/28/ffcc00/000?text=B", age: "10mo", change5m: "+9.8", change1h: "+31.2", change6h: "+78.4", change24h: "+210.3", volume: 1560000, liquidity: 890000, txns: 17800, buys: 73, sells: 27, mcap: 420000000, chain: "solana" },
    { id: 49, rank: 49, name: "MOG", symbol: "MOG", base: "ETH", logo: "https://via.placeholder.com/28/00ff00/000?text=M", age: "11mo", change5m: "+11.3", change1h: "+29.8", change6h: "+88.1", change24h: "+267.4", volume: 4200000, liquidity: 1800000, txns: 29800, buys: 69, sells: 31, mcap: 880000000, chain: "ethereum" },
    { id: 50, rank: 50, name: "GIGA", symbol: "GIGA", base: "SOL", logo: "https://via.placeholder.com/28/ff6600/fff?text=G", age: "5mo", change5m: "+19.6", change1h: "+46.8", change6h: "+123.5", change24h: "+367.9", volume: 4900000, liquidity: 2100000, txns: 31200, buys: 74, sells: 26, mcap: 890000000, chain: "solana" },
  ]);

  const filteredPairs = pairs.filter(p => 
    p.liquidity >= minLiquidity &&
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    Object.keys(selectedChains).some(chain => selectedChains[chain] && p.chain === chain)
  );

  const formatNumber = (num: number) => {
    if (num >= 1e9) return '$' + (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return '$' + (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return '$' + (num / 1e3).toFixed(1) + 'K';
    return '$' + num;
  };

  const formatChange = (change: number) => change > 0 ? `+${change}%` : `${change}%`;

  const sortTable = (column: number) => {
    const sorted = [...filteredPairs].sort((a, b) => {
      let valA = a as any;
      let valB = b as any;
      if (column === 7) return parseFloat(valB.volume) - parseFloat(valA.volume); // Volume descending
      if (column === 8) return parseFloat(valB.liquidity) - parseFloat(valA.liquidity); // Liquidity descending
      return 0;
    });
    setPairs(sorted);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", background: "#0a0a0a", color: "#e0e0e0", margin: 0, padding: 0, overflowX: "hidden" }}>
      {/* Header */}
      <header style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "64px", background: "#111111", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", zIndex: 1000, borderBottom: "1px solid #333", boxShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
        <div style={{ fontSize: "26px", fontWeight: "bold", background: "linear-gradient(90deg, #00ff88, #00cc66)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>DexNova</div>
        <div style={{ flex: 1, maxWidth: "500px", margin: "0 30px" }}>
          <input 
            type="text" 
            placeholder="Search token, pair or address..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "10px 16px", background: "#222", border: "1px solid #444", borderRadius: "8px", color: "#fff", fontSize: "15px" }} 
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <select style={{ padding: "8px 14px", background: "#222", borderRadius: "6px", fontSize: "14px", color: "#fff" }}>
            <option>ALL CHAINS</option>
            <option>Ethereum</option>
            <option>Solana</option>
            <option>BSC</option>
            <option>Base</option>
          </select>
          <div style={{ padding: "8px 14px", background: "#222", borderRadius: "6px", fontSize: "14px", color: "#fff" }}>Notifications</div>
          <div style={{ padding: "8px 14px", background: "#00ff88", borderRadius: "6px", fontSize: "14px", color: "#000", fontWeight: "bold" }}>Connect Wallet</div>
        </div>
      </header>

      {/* Premium Banner */}
      <div style={{ background: "linear-gradient(90deg, #ff6b35, #f7931a)", color: "#000", textAlign: "center", padding: "12px", fontWeight: "bold", fontSize: "15px" }}>
        Premium Feature Unlock DEXT Score, Whale Tracking, Unlimited Alerts — Stake DEXT Now!
      </div>

      {/* Sidebar */}
      <aside style={{ position: "fixed", left: 0, top: "64px", width: "260px", height: "calc(100vh - 64px)", background: "#111", padding: "20px", overflowY: "auto", borderRight: "1px solid #333" }}>
        <div style={{ marginBottom: "25px" }}>
          <h3 style={{ color: "#00ff88", margin: "0 0 10px 0", fontSize: "16px" }}>Timeframe</h3>
          <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)} style={{ width: "100%", padding: "10px", background: "#222", border: "1px solid #444", borderRadius: "6px", color: "#fff", marginBottom: "8px" }}>
            <option>1H</option>
            <option>6H</option>
            <option>24H</option>
          </select>
        </div>
        <div style={{ marginBottom: "25px" }}>
          <h3 style={{ color: "#00ff88", margin: "0 0 10px 0", fontSize: "16px" }}>Min Liquidity</h3>
          <input type="range" min="0" max="5000000" step="10000" value={minLiquidity} onChange={(e) => setMinLiquidity(Number(e.target.value))} style={{ width: "100%" }} />
          <span>{formatNumber(minLiquidity)}</span>
        </div>
        <div style={{ marginBottom: "25px" }}>
          <h3 style={{ color: "#00ff88", margin: "0 0 10px 0", fontSize: "16px" }}>Chains</h3>
          <label><input type="checkbox" checked={selectedChains.ethereum} onChange={(e) => setSelectedChains({...selectedChains, ethereum: e.target.checked})} /> Ethereum</label><br />
          <label><input type="checkbox" checked={selectedChains.solana} onChange={(e) => setSelectedChains({...selectedChains, solana: e.target.checked})} /> Solana</label><br />
          <label><input type="checkbox" checked={selectedChains.bsc} onChange={(e) => setSelectedChains({...selectedChains, bsc: e.target.checked})} /> BSC</label><br />
          <label><input type="checkbox" checked={selectedChains.base} onChange={(e) => setSelectedChains({...selectedChains, base: e.target.checked})} /> Base</label><br />
          <label><input type="checkbox" checked={selectedChains.polygon} onChange={(e) => setSelectedChains({...selectedChains, polygon: e.target.checked})} /> Polygon</label>
        </div>
        <div>
          <label><input type="checkbox" checked={hideRugs} onChange={(e) => setHideRugs(e.target.checked)} /> Hide potential rugs</label>
        </div>
      </aside>

      {/* Main */}
      <main style={{ marginLeft: "260px", padding: "90px 20px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-around", background: "#111", padding: "16px", borderRadius: "10px", marginBottom: "20px", fontSize: "15px" }}>
          <div>24h Volume: <strong>$18.42B</strong></div>
          <div>Transactions: <strong>42.1M</strong></div>
          <div>Pairs Tracked: <strong>203,847</strong></div>
          <div>Active Chains: <strong>87</strong></div>
        </div>

        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 4px" }}>
          <thead>
            <tr style={{ textAlign: "left", fontWeight: "600", fontSize: "13px" }}>
              <th onClick={() => sortTable(0)} style={{ background: "#1a1a1a", padding: "14px 12px", cursor: "pointer" }}>#</th>
              <th onClick={() => sortTable(1)} style={{ background: "#1a1a1a", padding: "14px 12px", cursor: "pointer" }}>Pair</th>
              <th onClick={() => sortTable(2)} style={{ background: "#1a1a1a", padding: "14px 12px", cursor: "pointer" }}>Age</th>
              <th onClick={() => sortTable(3)} style={{ background: "#1a1a1a", padding: "14px 12px", cursor: "pointer" }}>5m</th>
              <th onClick={() => sortTable(4)} style={{ background: "#1a1a1a", padding: "14px 12px", cursor: "pointer" }}>1h</th>
              <th onClick={() => sortTable(5)} style={{ background: "#1a1a1a", padding: "14px 12px", cursor: "pointer" }}>6h</th>
              <th onClick={() => sortTable(6)} style={{ background: "#1a1a1a", padding: "14px 12px", cursor: "pointer" }}>24h</th>
              <th onClick={() => sortTable(7)} style={{ background: "#1a1a1a", padding: "14px 12px", cursor: "pointer" }}>Volume 24h</th>
              <th onClick={() => sortTable(8)} style={{ background: "#1a1a1a", padding: "14px 12px", cursor: "pointer" }}>Liquidity</th>
              <th onClick={() => sortTable(9)} style={{ background: "#1a1a1a", padding: "14px 12px", cursor: "pointer" }}>Txns</th>
              <th onClick={() => sortTable(10)} style={{ background: "#1a1a1a", padding: "14px 12px", cursor: "pointer" }}>Buys/Sells</th>
              <th onClick={() => sortTable(11)} style={{ background: "#1a1a1a", padding: "14px 12px", cursor: "pointer" }}>MCap/FDV</th>
            </tr>
          </thead>
          <tbody>
            {filteredPairs.map((pair) => (
              <tr key={pair.id} style={{ background: "#161616" }}>
                <td style={{ padding: "14px 12px" }}>{pair.rank}</td>
                <td style={{ padding: "14px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <img src={pair.logo} alt={pair.symbol} style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1px solid #444" }} />
                    {pair.name}/{pair.base}
                  </div>
                </td>
                <td style={{ padding: "14px 12px" }}>{pair.age}</td>
                <td style={{ padding: "14px 12px", textAlign: "right", color: pair.change5m > 0 ? "#00ff88" : "#ff4444", fontWeight: "bold" }}>{formatChange(pair.change5m)}</td>
                <td style={{ padding: "14px 12px", textAlign: "right", color: pair.change1h > 0 ? "#00ff88" : "#ff4444", fontWeight: "bold" }}>{formatChange(pair.change1h)}</td>
                <td style={{ padding: "14px 12px", textAlign: "right", color: pair.change6h > 0 ? "#00ff88" : "#ff4444", fontWeight: "bold" }}>{formatChange(pair.change6h)}</td>
                <td style={{ padding: "14px 12px", textAlign: "right", color: pair.change24h > 0 ? "#00ff88" : "#ff4444", fontWeight: "bold" }}>{formatChange(pair.change24h)}</td>
                <td style={{ padding: "14px 12px", textAlign: "right" }}>{formatNumber(pair.volume)}</td>
                <td style={{ padding: "14px 12px", textAlign: "right" }}>{formatNumber(pair.liquidity)}</td>
                <td style={{ padding: "14px 12px", textAlign: "right" }}>{pair.txns.toLocaleString()}</td>
                <td style={{ padding: "14px 12px", textAlign: "center" }}>{pair.buys}/{pair.sells}</td>
                <td style={{ padding: "14px 12px", textAlign: "right" }}>{formatNumber(pair.mcap)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ textAlign: "center", padding: "20px", fontSize: "15px" }}>
          Showing 1–50 of <strong>203,847</strong> pairs  <button style={{ padding: "8px 16px", background: "#00ff88", border: "none", borderRadius: "6px", color: "#000", fontWeight: "bold" }}>Load More</button>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ background: "#111", padding: "30px", textAlign: "center", borderTop: "1px solid #333", fontSize: "14px", color: "#888" }}>
        <div style={{ marginBottom: "10px" }}>
          <a href="#" style={{ color: "#00ff88", margin: "0 12px", textDecoration: "none" }}>About</a>
          <a href="#" style={{ color: "#00ff88", margin: "0 12px", textDecoration: "none" }}>Privacy Policy</a>
          <a href="#" style={{ color: "#00ff88", margin: "0 12px", textDecoration: "none" }}>Terms of Service</a>
          <a href="#" style={{ color: "#00ff88", margin: "0 12px", textDecoration: "none" }}>API</a>
          <a href="#" style={{ color: "#00ff88", margin: "0 12px", textDecoration: "none" }}>Contact</a>
        </div>
        <div>© 2025 DexNova • All rights reserved • Twitter • Telegram • Discord</div>
      </footer>

      <style jsx global>{`
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #0a0a0a; color: #e0e0e0; margin: 0; padding: 0; overflow-x: hidden; }
        @media (max-width: 1024px) {
          aside { position: relative; width: 100%; height: auto; }
          main { margin-left: 0; }
        }
      `}</style>
    </div>
  );
}
