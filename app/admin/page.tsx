'use client';
import { useState } from 'react';

export default function AdminPanel() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const login = () => {
    if (username === "admin" && password === "dexnova2025") {
      setLoggedIn(true);
      localStorage.setItem('admin', 'true');
    } else {
      alert("Wrong credentials");
    }
  };

  if (localStorage.getItem('admin') === 'true') setLoggedIn(true);

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-gray-900 p-12 rounded-2xl border border-purple-500 w-96">
          <h1 className="text-5xl font-black text-center mb-10 text-purple-400">Admin Login</h1>
          <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} className="w-full px-6 py-4 mb-4 bg-gray-800 rounded-xl" />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} onKeyPress={e => e.key === 'Enter' && login()} className="w-full px-6 py-4 mb-8 bg-gray-800 rounded-xl" />
          <button onClick={login} className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-xl hover:scale-105 transition">
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-10">
      <h1 className="text-6xl font-black mb-10 text-purple-400">Admin Panel</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-gray-900 p-8 rounded-2xl border border-purple-500">
          <h2 className="text-3xl font-bold mb-4">Revenue</h2>
          <p className="text-5xl font-black text-green-400">$4,746</p>
        </div>
        <div className="bg-gray-900 p-8 rounded-2xl border border-purple-500">
          <h2 className="text-3xl font-bold mb-4">Active Boosts</h2>
          <p className="text-5xl font-black text-yellow-400">52</p>
        </div>
        <div className="bg-gray-900 p-8 rounded-2xl border border-purple-500">
          <h2 className="text-3xl font-bold mb-4">Total Users</h2>
          <p className="text-5xl font-black text-cyan-400">9,847</p>
        </div>
      </div>
      <button onClick={() => { localStorage.removeItem('admin'); window.location.reload(); }} className="mt-10 px-8 py-4 bg-red-600 rounded-xl font-bold">
        Logout
      </button>
    </div>
  );
}
