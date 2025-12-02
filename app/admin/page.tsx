'use client';
import { useState, useEffect } from 'react';

export default function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('admin') === 'true') {
      setLoggedIn(true);
    }
  }, []);

  const login = () => {
    if (username === "admin" && password === "dexnova2025") {
      localStorage.setItem('admin', 'true');
      setLoggedIn(true);
    } else {
      alert("Wrong credentials");
    }
  };

  const logout = () => {
    localStorage.removeItem('admin');
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-gray-900 p-12 rounded-2xl border border-purple-500 w-96 shadow-2xl">
          <h1 className="text-5xl font-black text-center mb-10 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Admin Login
          </h1>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            className="w-full px-6 py-4 mb-4 bg-gray-800 rounded-xl border border-gray-700 focus:border-purple-500 outline-none" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            onKeyPress={e => e.key === 'Enter' && login()}
            className="w-full px-6 py-4 mb-8 bg-gray-800 rounded-xl border border-gray-700 focus:border-purple-500 outline-none" 
          />
          <button 
            onClick={login}
            className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-xl hover:scale-105 transition shadow-lg"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <button 
            onClick={logout}
            className="px-8 py-4 bg-red-600 rounded-xl font-bold hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-8 rounded-2xl border border-purple-500">
            <h3 className="text-2xl font-bold text-gray-300">Total Revenue</h3>
            <p className="text-6xl font-black text-green-400 mt-4">$4,746</p>
          </div>
          <div className="bg-gray-900 p-8 rounded-2xl border border-purple-500">
            <h3 className="text-2xl font-bold text-gray-300">Active Boosts</h3>
            <p className="text-6xl font-black text-yellow-400 mt-4">52</p>
          </div>
          <div className="bg-gray-900 p-8 rounded-2xl border border-purple-500">
            <h3 className="text-2xl font-bold text-gray-300">Total Users</h3>
            <p className="text-6xl font-black text-cyan-400 mt-4">9,847</p>
          </div>
        </div>
      </div>
    </div>
  );
}
