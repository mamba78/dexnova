'use client';
import { useState } from 'react';

export default function AdminPanel() {
  const [connected, setConnected] = useState(false);
  const [wallet, setWallet] = useState('');

  const connectWallet = async () => {
    // @ts-ignore — safe in browser
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        // @ts-ignore
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWallet(accounts[0]);
        setConnected(true);
      } catch (e) {
        alert("Connection failed");
      }
    } else {
      alert("Install MetaMask or Phantom");
    }
  };

  if (!connected) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center p-10 bg-gray-900 rounded-xl border border-gray-700">
          <h1 className="text-4xl font-black mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Admin Panel</h1>
          <button onClick={connectWallet} className="px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-xl hover:scale-105 transition">
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-5xl font-black mb-10">Admin Panel</h1>
      <p>Connected: {wallet}</p>
      {/* Full dashboard coming in next message */}
    </div>
  );
}
