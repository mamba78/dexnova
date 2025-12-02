'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import BoostModal from './BoostModal';
import { Sparkles } from 'lucide-react';

export default function TokenCard({ token, index }: { token: any; index: number }) {
  const [showBoost, setShowBoost] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const boostData = localStorage.getItem(`boosted-${token.id}`);
    if (boostData) {
      const { expiresAt } = JSON.parse(boostData);
      const updateTimer = () => {
        const left = expiresAt - Date.now();
        if (left <= 0) {
          localStorage.removeItem(`boosted-${token.id}`);
          setTimeLeft('');
        } else {
          const days = Math.floor(left / 86400000);
          const hours = Math.floor((left % 86400000) / 3600000);
          setTimeLeft(days > 0 ? `${days}d ${hours}h left` : `${hours}h left`);
        }
      };
      updateTimer();
      const interval = setInterval(updateTimer, 60000);
      return () => clearInterval(interval);
    }
  }, [token.id]);

  const isBoosted = !!localStorage.getItem(`boosted-${token.id}`);

  const handleBoosted = () => {
    window.location.reload(); // Refresh to update boost status
  };

  return (
    <>
      <div 
        className={`relative bg-gray-900/60 border rounded-xl p-6 transition-all duration-300 hover:scale-[1.03] cursor-pointer
          ${isBoosted ? 'border-yellow-500 shadow-2xl shadow-yellow-500/30 ring-2 ring-yellow-500/50' : 'border-gray-800'}`}
      >
        {isBoosted && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
            <div className="bg-gradient-to-r from-yellow-400 to-amber-600 text-black px-5 py-2 rounded-full font-bold text-sm shadow-xl flex items-center gap-2 animate-pulse">
              <Sparkles className="w-4 h-4" />
              BOOSTED • {timeLeft}
            </div>
          </div>
        )}

        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <img src={token.logo} alt="" className="w-14 h-14 rounded-full ring-2 ring-gray-700" />
            <div>
              <h3 className="font-bold text-xl">{token.name}</h3>
              <p className="text-sm text-gray-400">{token.chain}</p>
            </div>
          </div>
          {!isBoosted && (
            <button 
              onClick={() => setShowBoost(true)}
              className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-black rounded-lg font-bold text-xs hover:scale-110 transition"
            >
              BOOST
            </button>
          )}
        </div>

        <div className="text-3xl font-black mb-2">{token.price}</div>
        <div className={`text-2xl font-bold mb-4 ${token.change24h.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
          {token.change24h}
        </div>

        <div className="text-sm text-gray-400 space-y-1">
          <div>Vol: ${token.volume24h}</div>
          <div>Liq: ${token.liquidity}</div>
        </div>

        <Link href={`/token/${token.id}`}>
          <button className="w-full mt-6 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:scale-105 transition shadow-lg">
            View Token
          </button>
        </Link>
      </div>

      {showBoost && (
        <BoostModal 
          token={token} 
          onClose={() => setShowBoost(false)} 
          onBoosted={handleBoosted}
        />
      )}
    </>
  );
}
