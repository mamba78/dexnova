'use client';
import { useState, useEffect } from 'react';
import { BoostManager } from '../lib/boostSystem';

const ADMIN_WALLETS = ["YOUR_WALLET_HERE"]; // Replace
const ADMIN_PASSWORD = "dexnova2025"; // Change

export default function AdminPanel() {
  const [auth, setAuth] = useState(false);
  const [wallet, setWallet] = useState('');
  const [tab, setTab] = useState<'dashboard' | 'footer' | 'chains'>('dashboard');

  const connect = async () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      const acc = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      if (ADMIN_WALLETS.includes(acc[0])) {
        setWallet(acc[0]);
        setAuth(true);
      } else alert("Unauthorized");
    }
  };

  if (!auth) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-gray-900 p-12 rounded-2xl border border-purple-500 text-center">
          <h1 className="text-5xl font-black mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <button onClick={connect} className="px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-2xl hover:scale-105 transition">
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-xl">Wallet: {wallet.slice(0,6)}...{wallet.slice(-4)}</p>
        </div>

        {/* TABS */}
        <div className="flex gap-4 mb-8">
          {['dashboard', 'footer', 'chains'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t as any)}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition ${
                tab === t ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-800'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {tab === 'dashboard' && <AnalyticsDashboard />}
        {tab === 'footer' && <FooterManager />}
        {tab === 'chains' && <ChainManager />}
      </div>
    </div>
  );
}

function AnalyticsDashboard() {
  const boosts = BoostManager.getAll();
  const revenue = BoostManager.getRevenue();
  const active = boosts.filter(b => b.paid && b.expiresAt > Date.now()).length;

  return (
    <div>
      <div className="grid md:grid-cols-4 gap-8 mb-12">
        <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700">
          <h3 className="text-xl font-bold text-gray-400">Total Revenue</h3>
          <p className="text-6xl font-black text-green-400 mt-4">${revenue.toFixed(2)}</p>
        </div>
        <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700">
          <h3 className="text-xl font-bold text-gray-400">Active Boosts</h3>
          <p className="text-6xl font-black text-yellow-400 mt-4">{active}</p>
        </div>
        <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700">
          <h3 className="text-xl font-bold text-gray-400">Total Boosts</h3>
          <p className="text-6xl font-black text-purple-400 mt-4">{boosts.length}</p>
        </div>
        <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700">
          <h3 className="text-xl font-bold text-gray-400">Avg. Boost</h3>
          <p className="text-6xl font-black text-cyan-400 mt-4">
            ${boosts.length > 0 ? (revenue / boosts.length).toFixed(1) : '0'}
          </p>
        </div>
      </div>

      <div className="bg-gray-900 rounded-2xl border border-gray-700 p-8">
        <h2 className="text-3xl font-black mb-6">Recent Boosts</h2>
        <div className="space-y-4">
          {boosts.slice(-10).reverse().map(b => (
            <div key={b.tokenId} className="flex justify-between items-center py-4 border-b border-gray-800">
              <div>
                <p className="font-bold">{b.tokenName}</p>
                <p className="text-sm text-gray-400">{b.chain} • {b.duration}</p>
              </div>
              <div className="text-right">
                <p className="text-green-400 font-bold">${b.priceUsd}</p>
                <p className="text-xs text-gray-500">
                  {new Date(b.boostedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FooterManager() {
  const [links, setLinks] = useState(() => {
    const saved = localStorage.getItem('footer-links');
    return saved ? JSON.parse(saved) : [
      { name: "General Statement", href: "/general", visible: true },
      { name: "Legal Advice", href: "/legal", visible: true },
      { name: "About Us", href: "/about", visible: true },
      { name: "DEXT Token", href: "/token", visible: true },
      { name: "Team", href: "/team", visible: true },
      { name: "Contact", href: "/contact", visible: true },
      { name: "Privacy Policy", href: "/privacy", visible: true },
      { name: "Terms of Service", href: "/terms", visible: true },
      { name: "Cookie Policy", href: "/cookie", visible: true },
      { name: "Affiliates", href: "/affiliates", visible: true },
      { name: "API Docs", href: "/api", visible: true },
    ];
  });

  const toggle = (i: number) => {
    const updated = [...links];
    updated[i].visible = !updated[i].visible;
    setLinks(updated);
    localStorage.setItem('footer-links', JSON.stringify(updated));
  };

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-700 p-8">
      <h2 className="text-4xl font-black mb-8">Footer Links Control</h2>
      <div className="space-y-4">
        {links.map((link, i) => (
          <div key={i} className="flex items-center justify-between py-4 border-b border-gray-800">
            <div>
              <p className="font-bold">{link.name}</p>
              <p className="text-sm text-gray-400">{link.href}</p>
            </div>
            <button
              onClick={() => toggle(i)}
              className={`px-8 py-3 rounded-xl font-bold ${link.visible ? 'bg-green-600' : 'bg-red-600'}`}
            >
              {link.visible ? 'VISIBLE' : 'HIDDEN'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChainManager() {
  const [chains, setChains] = useState(() => {
    const saved = localStorage.getItem('visible-chains');
    return saved ? JSON.parse(saved) : {
      solana: true, base: true, ethereum: true, bsc: true,
      polygon: true, arbitrum: true, optimism: true, zksync_era: true
    };
  });

  const toggleChain = (chain: string) => {
    const updated = { ...chains, [chain]: !chains[chain] };
    setChains(updated);
    localStorage.setItem('visible-chains', JSON.stringify(updated));
  };

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-700 p-8">
      <h2 className="text-4xl font-black mb-8">Chain Visibility</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {Object.keys(chains).map(chain => (
          <button
            key={chain}
            onClick={() => toggleChain(chain)}
            className={`p-6 rounded-xl font-bold text-lg transition ${
              chains[chain] ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-800'
            }`}
          >
            {chain.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </button>
        ))}
      </div>
    </div>
  );
}
