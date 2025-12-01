'use client';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, Link2, LogOut, Edit2, Trash2, Plus } from 'lucide-react';

const ADMIN_USERS = [
  { username: "admin", password: "dexnova2025", role: "admin" },
  { username: "moderator", password: "mod2025", role: "moderator" },
];

export default function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [tab, setTab] = useState<'dashboard' | 'users' | 'links' | 'chains'>('dashboard');

  const login = () => {
    {
    const user = ADMIN_USERS.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      setLoggedIn(true);
      localStorage.setItem('admin-auth', JSON.stringify(user));
    } else {
      alert("Wrong credentials");
    }
  };

  const logout = () => {
    setLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('admin-auth');
  };

  useEffect(() => {
    const saved = localStorage.getItem('admin-auth');
    if (saved) {
      setCurrentUser(JSON.parse(saved));
      setLoggedIn(true);
    }
  }, []);

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-gray-900 p-12 rounded-2xl border border-purple-500 w-96">
          <h1 className="text-4xl font-black text-center mb-10 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Admin Login
          </h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full px-6 py-4 mb-4 bg-gray-800 rounded-xl text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && login()}
            className="w-full px-6 py-4 mb-8 bg-gray-800 rounded-xl text-white"
          />
          <button onClick={login} className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-xl hover:scale-105 transition">
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <div className="flex items-center gap-6">
            <p className="text-xl">Welcome, <span className="font-bold text-purple-400">{currentUser.username}</span></p>
            <button onClick={logout} className="flex items-center gap-2 px-6 py-3 bg-red-600 rounded-xl font-bold hover:bg-red-700 transition">
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-4 mb-10">
          {['dashboard', 'users', 'links', 'chains'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t as any)}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition ${
                tab === t ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-2xl' : 'bg-gray-800'
              }`}
            >
              {t === 'dashboard' ? 'Analytics' : t === 'users' ? 'Users' : t === 'links' ? 'Footer Links' : 'Chains'}
            </button>
          ))}
        </div>

        {tab === 'dashboard' && <RevenueDashboard />}
        {tab === 'users' && <UserManagement currentUser={currentUser} />}
        {tab === 'links' && <LinkManager />}
        {tab === 'chains' && <ChainManager />}
      </div>
    </div>
  );
}

function RevenueDashboard() {
  const mockData = [
    { day: 'Mon', revenue: 245 },
    { day: 'Tue', revenue: 189 },
    { day: 'Wed', revenue: 420 },
    { day: 'Thu', revenue: 380 },
    { day: 'Fri', revenue: 612 },
    { day: 'Sat', revenue: 890 },
    { day: 'Sun', revenue: 1200 },
  ];

  return (
    <div>
      <div className="grid md:grid-cols-4 gap-8 mb-12">
        <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-8 rounded-2xl border border-purple-500">
          <h3 className="text-xl font-bold text-gray-300">Total Revenue</h3>
          <p className="text-6xl font-black text-white mt-4">$3,936</p>
          <p className="text-green-400 text-lg mt-2">+42% this week</p>
        </div>
        <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 p-8 rounded-2xl border border-blue-500">
          <h3 className="text-xl font-bold text-gray-300">Active Boosts</h3>
          <p className="text-6xl font-black text-white mt-4">47</p>
        </div>
        <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 p-8 rounded-2xl border border-green-500">
          <h3 className="text-xl font-bold text-gray-300">Total Users</h3>
          <p className="text-6xl font-black text-white mt-4">8,421</p>
        </div>
        <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 p-8 rounded-2xl border border-orange-500">
          <h3 className="text-xl font-bold text-gray-300">Conversion</h3>
          <p className="text-6xl font-black text-white mt-4">3.8%</p>
        </div>
      </div>

      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
        <h2 className="text-4xl font-black mb-8">Revenue This Week</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="day" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#111', border: '1px solid #444' }}
              labelStyle={{ color: '#a '#a855f7' }}
            />
            <Line type="monotone" dataKey="revenue" stroke="#a855f7" strokeWidth={4} dot={{ fill: '#a855f7' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function UserManagement({ currentUser }: { currentUser: any }) {
  const [users, setUsers] = useState([
    { id: 1, username: "admin", role: "admin", status: "active" },
    { id: 2, username: "moderator", role: "moderator", status: "active" },
    { id: 3, username: "analyst", role: "viewer", status: "active" },
  ]);

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-700 p-8">
      <h2 className="text-4xl font-black mb-8">User Management</h2>
      <div className="space-y-4">
        {users.map(user => (
          <div key={user.id} className="flex items-center justify-between py-6 border-b border-gray-800">
            <div>
              <p className="text-2xl font-bold">{user.username}</p>
              <p className="text-gray-400">{user.role}</p>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-blue-600 rounded-xl font-bold hover:bg-blue-700 transition">Edit</button>
              <button className="px-6 py-3 bg-red-600 rounded-xl font-bold hover:bg-red-700 transition">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LinkManager() {
  const [links, setLinks] = useState(() => {
    const saved = localStorage.getItem('footer-links');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "General Statement", href: "/general", visible: true },
      { id: 2, name: "Legal Advice", href: "/legal", visible: true },
      { id: 3, name: "About Us", href: "/about", visible: true },
      // ... add all
    ];
  });

  const toggle = (id: number) => {
    const updated = links.map(l => l.id === id ? { ...l, visible: !l.visible } : l);
    setLinks(updated);
    localStorage.setItem('footer-links', JSON.stringify(updated));
  };

  const addLink = () => {
    const name = prompt("Link name?");
    const href = prompt("URL?");
    if (name && href) {
      setLinks([...links, { id: Date.now(), name, href, visible: true }]);
    }
  };

  const removeLink = (id: number) => {
    setLinks(links.filter(l => l.id !== id));
  };

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-700 p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-black">Footer Links</h2>
        <button onClick={addLink} className="flex items-center gap-2 px-6 py-3 bg-green-600 rounded-xl font-bold hover:bg-green-700 transition">
          <Plus className="w-5 h-5" /> Add Link
        </button>
      </div>
      {/* List with edit/delete */}
    </div>
  );
}

function ChainManager() {
  // Same as before but with edit/delete
}

