'use client';
import { useState } from 'react';
import { useTokens } from '../lib/useTokens';

export default function Admin() {
  const [connected, setConnected] = useState(false);
  const { tokens, boostToken } = useTokens();

  const connect = () => setConnected(true); // Replace with real wallet check

  if (!connected) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <button onClick={connect} className="px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-2xl">
          Connect Admin Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-5xl font-black mb-10">Admin — Boost Tokens</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {tokens.map(t => (
          <div key={t.id} className="bg-gray-900 p-6 rounded-xl border border-gray-700">
            <h3 className="font-bold">{t.name}</h3>
            <button onClick={() => boostToken(t.id)} className={`mt-4 w-full py-3 rounded-xl font-bold ${t.boosted ? 'bg-yellow-600' : 'bg-purple-600'}`}>
              {t.boosted ? 'Boosted' : 'Boost Token'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
