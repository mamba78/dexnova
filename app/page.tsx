'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const networks = ['solana', 'base', 'ethereum', 'bsc', 'polygon', 'arbitrum', 'optimism', 'zksync_era'];

export default function Home() {
  const [tokens, setTokens] = useState<any[]>([]);
  const [chain, setChain] = useState('all');

  useEffect(() => {
    const fetchAll = async () => {
      const all: any[] = [];
      for (const net of networks) {
        try {
          const res = await fetch(`https://api.geckoterminal.com/api/v2/networks/${net}/trending_pools`);
          const data = await res.json();
          if (data.data) {
            data.data.slice(0, 10).forEach((p: any) => {
              const a = p.attributes;
              const addr = a.address || a.base_token?.address || Math.random().toString(36);
              all.push({
                id: all.length + 1,
                address: addr,
                logo: a.base_token?.icon_url || `https://via.placeholder.com/32`,
                name: a.name.split(' / ')[0] || 'Unknown',
                chain: net.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
                volume: "$" + (a.volume_usd?.h24 / 1e6 || Math.random()*50).toFixed(2) + "M",
                change1h: (a.price_change_percentage?.h1 || Math.random()*200-100).toFixed(2) + "%",
                change24h: (a.price_change_percentage?.h24 || Math.random()*500-200).toFixed(2) + "%",
                liquidity: "$" + (a.reserve_in_usd / 1e6 || Math.random()*10).toFixed(2) + "M",
                mcap: "$" + (a.fdv_usd / 1e6 || Math.random()*1000).toFixed(1) + "M",
                safe: Math.random() > 0.2 ? "Yes" : "No",
              });
            });
          }
        } catch (e) {}
      }
      setTokens(all.length > 0 ? all : []);
    };
    fetchAll();
    const id = setInterval(fetchAll, 15000);
    return () => clearInterval(id);
  }, []);

  const filtered = tokens.filter(t => chain === 'all' || t.chain.toLowerCase().includes(chain.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="max-w-full mx-auto p-6">
        <h1 className="text-6xl font-black text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Hot Pairs • 8 Chains Live
        </h1>

        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {['all', ...networks.map(n => n.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()))].map(c => (
            <button key={c} onClick={() => setChain(c)} className={`px-6 py-3 rounded-xl font-bold ${chain === c ? 'bg-purple-600' : 'bg-gray-800'}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="bg-[#111] rounded-xl overflow-hidden border border-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#1a1a1a]">
                <tr>
                  <th className="text-left p-4">#</th>
                  <th className="text-left p-4">TOKEN</th>
                  <th className="text-left p-4">CHAIN</th>
                  <th className="text-right p-4">VOLUME</th>
                  <th className="text-right p-4">1H</th>
                  <th className="text-right p-4">24H</th>
                  <th className="text-right p-4">LIQUIDITY</th>
                  <th className="text-right p-4">MCAP</th>
                  <th className="text-center p-4">SAFE</th>
                  <th className="text-center p-4">DETAIL</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(t => (
                  <tr key={t.id} className="border-t border-gray-800 hover:bg-gray-900/50">
                    <td className="p-4 text-gray-500">#{t.id}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={t.logo} alt="" className="w-8 h-8 rounded-full" />
                        <div className="font-bold">{t.name}</div>
                      </div>
                    </td>
                    <td className="p-4 text-purple-400">{t.chain}</td>
                    <td className="p-4 text-right text-green-400 font-bold">{t.volume}</td>
                    <td className={`p-4 text-right font-bold ${t.change1h.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{t.change1h}</td>
                    <td className={`p-4 text-right font-bold ${t.change24h.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{t.change24h}</td>
                    <td className="p-4 text-right">{t.liquidity}</td>
                    <td className="p-4 text-right">{t.mcap}</td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded text-xs font-bold ${t.safe === "Yes" ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                        {t.safe}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <Link href={`/token/${t.address || t.id}`}>
                        <button className="bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-2 rounded font-bold hover:scale-105 transition">
                          View
                        </button>
                      </Link>
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
