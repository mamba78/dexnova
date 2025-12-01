'use client';
import { useState } from 'react';

const ADMIN_WALLETS = ["YOUR_WALLET_ADDRESS_HERE"]; // Replace with your wallet
const ADMIN_PASSWORD = "dexnova2025admin"; // Change this

export default function AdminPanel() {
  const [connected, setConnected] = useState(false);
  const [wallet, setWallet] = useState('');
  const [password, setPassword] = useState('');
  const [pages, setPages] = useState({
    general: true, legal: true, about: true, token: true, team: true, contact: true
  });

  const connect = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (ADMIN_WALLETS.includes(accounts[0])) {
        setWallet(accounts[0]);
        setConnected(true);
      } else {
        alert("Not authorized");
      }
    }
  };

  if (!connected) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center p-10 bg-gray-900 rounded-xl border border-gray-700">
          <h1 className="text-4xl font-black mb-8 text-purple-400">Admin Access</h1>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-6 py-4 mb-6 bg-gray-800 rounded-xl"
          />
          <button onClick={connect} className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold">
            Connect Wallet
          </button>
          {password === ADMIN_PASSWORD && <p className="text-green-400 mt-4">Password correct — connect wallet</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-5xl font-black mb-10">Admin Panel</h1>
      <p>Wallet: {wallet}</p>
      {/* Dashboard + page toggles + boost tokens */}
    </div>
  );
}
