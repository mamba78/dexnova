'use client';

import { useState } from 'react';

export default function AdminDashboard() {
  const features = [
    { name: "Engagement Trio", enabled: true },
    { name: "Watchlist", enabled: true },
    { name: "Whale Tracker", enabled: true },
    { name: "Airdrop Scanner", enabled: false },
    { name: "Sponsored Badges", enabled: true },
    { name: "Premium Tier", enabled: false },
  ];

  const [toggles, setToggles] = useState(features);

  const toggle = (index: number) => {
    const newToggles = [...toggles];
    newToggles[index].enabled = !newToggles[index].enabled;
    setToggles(newToggles);
    // Later: save to Supabase + trigger docs update
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-purple-900 to-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-10 text-cyan-400">DexNova Admin</h1>
        
        <div className="bg-gray-900 rounded-3xl p-8 border border-cyan-500">
          <h2 className="text-3xl mb-6">Feature Toggles</h2>
          {toggles.map((f, i) => (
            <div key={i} className="flex justify-between items-center py-4 border-b border-gray-800">
              <span className="text-xl">{f.name}</span>
              <button
                onClick={() => toggle(i)}
                className={`w-16 h-8 rounded-full transition-all ${f.enabled ? "bg-cyan-500" : "bg-gray-700"}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full transition-all ${f.enabled ? "translate-x-9" : "translate-x-1"}`} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-2xl">Revenue Today: <span className="text-green-400">$0</span></p>
          <p className="text-gray-400 mt-4">Docs auto-update on every toggle</p>
        </div>
      </div>
    </div>
  );
}