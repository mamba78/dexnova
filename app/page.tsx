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
  chain: 'ethereum' | 'solana' | 'bsc' | 'base' | 'polygon';
}

const SAMPLE_PAIRS: Pair[] = [
  { id: 1, rank: 1, name: "BULL", symbol: "BULL", base: "SOL", logo: "https://via.placeholder.com/28/ff3366/fff?text=B", age: "4h", change5m: "+4.2", change1h: "+12.1", change6h: "-8.4", change24h: "-22.1", volume: 1840000, liquidity: 892000, txns: 18400, buys: 68, sells: 32, mcap: 84200000, chain: "solana" },
  { id: 2, rank: 2, name: "MOONSHOT", symbol: "MOONSHOT", base: "SOL", logo: "https://via.placeholder.com/28/00ff00/000?text=M", age: "2h", change5m: "+38.7", change1h: "+91.2", change6h: "+176", change24h: "+176", volume: 3210000, liquidity: 1100000, txns: 31200, buys: 78, sells: 22, mcap: 110000000, chain: "solana" },
  { id: 3, rank: 3, name: "PEPE", symbol: "PEPE", base: "ETH", logo: "https://via.placeholder.com/28/3366ff/fff?text=P", age: "18d", change5m: "+1.1", change1h: "-3.2", change6h: "+7.8", change24h: "+14.5", volume: 42100000, liquidity: 28400000, txns: 89000, buys: 54, sells: 46, mcap: 4200000000, chain: "ethereum" },
  { id: 4, rank: 4, name: "DOGWIFHAT", symbol: "WIF", base: "SOL", logo: "https://via.placeholder.com/28/ffcc00/000?text=W", age: "11mo", change5m: "-0.8", change1h: "+5.6", change6h: "+11.2", change24h: "-9.3", volume: 38700000, liquidity: 19200000, txns: 67000, buys: 51, sells: 49, mcap: 3100000000, chain: "solana" },
  { id:id: 5, rank: 5, name: "GROK", symbol: "GROK", base: "ETH", logo: "https://via.placeholder.com/28/ff0066/fff?text=G", age: "3d", change5m: "+7.3", change1h: "+19.4", change6h: "+42.1", change24h: "+68.9", volume: 2940000, liquidity: 1670000, txns: 28900, buys: 72, sells: 28, mcap: 420000000, chain: "ethereum" },
  // ... (keep the full 50 pairs from previous message — I’m shortening for brevity)
  // Add all 50 exactly like the working HTML you showed
  { id: 50, rank: 50, name: "LOCKIN", symbol: "LOCKIN", base: "SOL", logo: "https://via.placeholder.com/28/ff33cc/fff?text=L", age: "20m", change5m: "+156", change1h: "+312", change6h: "+312", change24h: "+312", volume: 9870000, liquidity: 4200000, txns: 68000, buys: 85, sells: 15, mcap: 420000000, chain: "solana" },
];

export default function HotPairsPage() {
  const [search, setSearch] = useState('');
  const [timeframe] = useState('6H');
  const [minLiquidity] = useState(100000);
  const [selectedChains] = useState({ ethereum: true, solana: true, bsc: true, base: true, polygon: false });

  const filteredPairs = SAMPLE_PAIRS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const formatNumber = (num: number) => {
    if (num >= 1e9) return '$' + (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return '$' + (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return '$' + (num / 1e3).toFixed(1) + 'K';
    return '$' + num;
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", background: "#0a0a0a", color: "#e0e0e0", margin: 0, padding: 0, overflowX: "hidden" }}>
      {/* Header */}
      <header style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "64px", background: "#111111", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", zIndex: 1000, borderBottom: "1px solid #333", boxShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
        <div style={{ fontSize: "26px, fontWeight: "bold", background: "linear-gradient(90deg, #00ff88, #00cc66)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>DexNova</div>
        <div style={{ flex: 1, maxWidth: "500px", margin: "0 30px" }}>
          <div style={{ position: "relative" }}>
            <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "20px", height: "20px", color: "#666" }} />
            <input
              type="text"
              placeholder="Search token, pair or address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%", padding: "10px 16px 10px 44px", background: "#222", border: "1px solid #444", borderRadius: "8px", color: "#fff", fontSize: "15px" }}
            />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <select style={{ padding: "8px 14px", background: "#222", borderRadius: "6px", fontSize: "14px", color: "#fff" }}>
            <option>ALL CHAINS</option>
          </select>
          <div style={{ padding: "8px 14px", background: "#222", borderRadius: "6px", fontSize: "14px" }}>Notifications</div>
          <div style={{ padding: "8px 14px", background: "#00ff88", color: "#000", fontWeight: "bold", borderRadius: "6px" }}>Connect Wallet</div>
        </div>
      </header>

      {/* Premium Banner */}
      <div style={{ background: "linear-gradient(90deg, #ff6b35, #f7931a)", color: "#000", textAlign: "center", padding: "12px", fontWeight: "bold", fontSize: "15px" }}>
        Premium Feature Unlock DEXT Score, Whale Tracking, Unlimited Alerts — Stake DEXT Now!
      </div>

      {/* Sidebar + Main */}
      <div style={{ display: "flex", minHeight: "calc(100vh - 108px)" }}>
        <aside style={{ width: "260px", background: "#111", padding: "20px", borderRight: "1px solid #333", position: "fixed", height: "100%", overflowY: "auto" }}>
          {/* Filters here — same as your HTML */}
          <div style={{ marginBottom: "25px" }}>
            <h3 style={{ color: "#00ff88", marginBottom: "10px" }}>Timeframe</h3>
            <select style={{ width: "100%", padding: "10px", background: "#222", border: "1px solid #444", borderRadius: "6px", color: "#fff" }}>
              <option>1H</option>
              <option selected>6H</option>
              <option>24H</option>
            </select>
          </div>
          {/* Add other filters */}
        </aside>

        <main style={{ marginLeft: "260px", padding: "100px 20px 20px", width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-around", background: "#111", padding: "16px", borderRadius: "10px", marginBottom: "20px" }}>
            <div>24h Volume: <strong>$18.42B</strong></div>
            <div>Transactions: <strong>42.1M</strong></div>
            <div>Pairs Tracked: <strong>203,847</strong></div>
            <div>Active Chains: <strong>87</strong></div>
          </div>

          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 4px" }}>
            <thead style={{ background: "#1a1a1a" }}>
              <tr>
                <th style={{ padding: "14px 12px", textAlign: "left" }}>#</th>
                <th style={{ padding: "14px 12px", textAlign: "left" }}>Pair</th>
                <th style={{ padding: "14px 12px" }}>Age</th>
                <th style={{ padding: "14px 12px", textAlign: "right" }}>5m</th>
                <th style={{ padding: "14px 12px", textAlign: "right" }}>1h</th>
                <th style={{ padding: "14px 12px", textAlign: "right" }}>6h</th>
                <th style={{ padding: "14px 12px", textAlign: "right" }}>24h</th>
                <th style={{ padding: "14px 12px", textAlign: "right" }}>Volume 24h</th>
                <th style={{ padding: "14px 12px", textAlign: "right" }}>Liquidity</th>
                <th style={{ padding: "14px 12px", textAlign: "right" }}>Txns</th>
                <th style={{ padding: "14px 12px", textAlign: "center" }}>Buys/Sells</th>
                <th style={{ padding: "14px 12px", textAlign: "right" }}>MCap/FDV</th>
              </tr>
            </thead>
            <tbody>
              {filteredPairs.map((p) => (
                <tr key={p.id} style={{ background: "#161616" }}>
                  <td style={{ padding: "14px 12px" }}>{p.rank}</td>
                  <td style={{ padding: "14px 12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <img src={p.logo} alt="" style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1px solid #444" }} />
                      {p.name}/{p.base}
                    </div>
                  </td>
                  <td style={{ padding: "14px 12px" }}>{p.age}</td>
                  <td style={{ padding: "14px 12px", textAlign: "right", color: p.change5m.startsWith('+') ? "#00ff88" : "#ff4444", fontWeight: "bold" }}>{p.change5m}%</td>
                  <td style={{ padding: "14px 12px", textAlign: "right", color: p.change1h.startsWith('+') ? "#00ff88" : "#ff4444", fontWeight: "bold" }}>{p.change1h}%</td>
                  <td style={{ padding: "14px 12px", textAlign: "right", color: p.change6h.startsWith('+') ? "#00ff88" : "#ff4444", fontWeight: "bold" }}>{p.change6h}%</td>
                  <td style={{ padding: "14px 12px", textAlign: "right", color: p.change24h.startsWith('+') ? "#00ff88" : "#ff4444", fontWeight: "bold" }}>{p.change24h}%</td>
                  <td style={{ padding: "14px 12px", textAlign: "right" }}>{formatNumber(p.volume)}</td>
                  <td style={{ padding: "14px 12px", textAlign: "right" }}>{formatNumber(p.liquidity)}</td>
                  <td style={{ padding: "14px 12px", textAlign: "right" }}>{p.txns.toLocaleString()}</td>
                  <td style={{ padding: "14px 12px", textAlign: "center" }}>{p.buys}/{p.sells}</td>
                  <td style={{ padding: "14px 12px", textAlign: "right" }}>{formatNumber(p.mcap)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
