'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TokenDetail() {
  const { address } = useParams();
  const [token, setToken] = useState<any>(null);

  useEffect(() => {
    // Simulate real token data fetch
    setToken({
      name: "Example Token",
      symbol: "EXMPL",
      chain: "Solana",
      price: "$0.0420",
      change24h: "+287.3%",
      volume: "$12.4M",
      liquidity: "$2.1M",
      mcap: "$42.0M",
      address: address,
    });
  }, [address]);

  useEffect(() => {
    if (!token) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      new (window as any).TradingView.widget({
        container_id: "tradingview_chart",
        width: "100%",
        height: 500,
        symbol: "BINANCE:BTCUSDT", // Replace with real pair later
        interval: "15",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#0a0a0f",
        enable_publishing: false,
        allow_symbol_change: true,
        studies: ["MASimple@tv-basicstudies"],
        backgroundColor: "#0a0a0f",
        gridColor: "#1a1a1a",
      });
    };
    document.body.appendChild(script);
  }, [token]);

  if (!token) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-6 mb-8">
          <img src="https://via.placeholder.com/64" alt="" className="w-16 h-16 rounded-full" />
          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {token.name} ({token.symbol})
            </h1>
            <p className="text-xl text-gray-400">{token.chain} • {address}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-[#111] rounded-xl p-6 border border-gray-800">
              <h2 className="text-2xl font-bold mb-4">Live Chart</h2>
              <div id="tradingview_chart" className="rounded-xl overflow-hidden" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-6">Token Statistics</h3>
              <div className="space-y-4 text-lg">
                <div className="flex justify-between"><span className="text-gray-400">Price</span><span className="font-bold">{token.price}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">24h Change</span><span className="text-green-400 font-bold">{token.change24h}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Volume 24h</span><span>{token.volume}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Liquidity</span><span>{token.liquidity}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Market Cap</span><span>{token.mcap}</span></div>
              </div>
            </div>

            <div className="space-y-4">
              <button className="w-full py-5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold text-xl hover:scale-105 transition">
                Trade on Jupiter
              </button>
              <button className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-xl hover:scale-105 transition">
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
