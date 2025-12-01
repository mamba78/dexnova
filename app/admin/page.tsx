'use client';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, Link2, LogOut, Edit2, Trash2, Plus, Eye, EyeOff, Shield, Globe } from 'lucide-react';

export default function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [tab, setTab] = useState<'dashboard' | 'users' | 'links' | 'chains'>('dashboard');
  
  const [users, setUsers] = useState<any[]>([]);
  const [links, setLinks] = useState<any[]>([]);
  const [chains, setChains] = useState<any>({});

  useEffect(() => {
    const saved = localStorage.getItem('admin-auth');
    if (saved) {
      setCurrentUser(JSON.parse(saved));
      setLoggedIn(true);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    const res = await fetch('/api/admin/data');
    const data = await res.json();
    setUsers(data.users || []);
    setLinks(data.links || []);
    setChains(data.chains || {});
  };

  const saveUsers = async () => {
    await fetch('/api/admin/users', { method: 'POST', body: JSON.stringify(users) });
  };

  const saveLinks = async () => {
    await fetch('/api/admin/links', { method: 'POST', body: JSON.stringify(links) });
  };

  const saveChains = async () => {
    await fetch('/api/admin/chains', { method: 'POST', body: JSON.stringify(chains) });
  };

  // ... login/logout code (same as before)

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header + Tabs */}
        <div className="flex gap-4 mb-10">
          <button onClick={() => setTab('dashboard')} className={tab === 'dashboard' ? 'bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-xl font-bold' : 'bg-gray-800 px-8 py-4 rounded-xl'}>
            Analytics
          </button>
          <button onClick={() => setTab('users')} className={tab === 'users' ? 'bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-xl font-bold' : 'bg-gray-800 px-8 py-4 rounded-xl'}>
            Users
          </button>
          <button onClick={() => setTab('links')} className={tab === 'links' ? 'bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-xl font-bold' : 'bg-gray-800 px-8 py-4 rounded-xl'}>
            Footer Links
          </button>
          <button onClick={() => setTab('chains')} className={tab === 'chains' ? 'bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-xl font-bold' : 'bg-gray-800 px-8 py-4 rounded-xl'}>
            <Globe className="inline w-5 h-5 mr-2" /> Chains
          </button>
        </div>

        {tab === 'chains' && (
          <div className="bg-gray-900 rounded-2xl border border-gray-700 p-8">
            <h2 className="text-4xl font-black mb-8">Chain Management</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {Object.keys(chains).map(chain => (
                <div key={chain} className="text-center">
                  <p className="text-2xl font-bold capitalize mb-4">{chain.replace('_', ' ')}</p>
                  <button
                    onClick={() => {
                      setChains({ ...chains, [chain]: !chains[chain] });
                      saveChains();
                    }}
                    className={`w-full py-6 rounded-xl font-bold text-xl transition ${
                      chains[chain] ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gray-800'
                    }`}
                  >
                    {chains[chain] ? 'VISIBLE' : 'HIDDEN'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other tabs: dashboard, users, links — already implemented */}
      </div>
    </div>
  );
}
