'use client';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, Link2, LogOut, Edit2, Trash2, Plus, Eye, EyeOff, Shield, UserCheck, UserX } from 'lucide-react';

const revenueData = [
  { day: 'Mon', revenue: 245 }, { day: 'Tue', revenue: 389 }, { day: 'Wed', revenue: 520 },
  { day: 'Thu', revenue: 680 }, { day: 'Fri', revenue: 912 }, { day: 'Sat', revenue: 1100 }, { day: 'Sun', revenue: 1400 },
];

export default function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [tab, setTab] = useState<'dashboard' | 'users' | 'links' | 'api' | 'chains'>('dashboard');

  // Admin users with roles
  const [adminUsers, setAdminUsers] = useState(() => {
    const saved = localStorage.getItem('admin-users');
    return saved ? JSON.parse(saved) : [
      { id: 1, username: "admin", password: "dexnova2025", role: "admin", status: "active" },
      { id: 2, username: "moderator", password: "mod2025", role: "moderator", status: "active" },
      { id: 3, username: "viewer", password: "view123", role: "viewer", status: "active" },
    ];
  });

  // Footer links with CRUD
  const [footerLinks, setFooterLinks] = useState(() => {
    const saved = localStorage.getItem('footer-links');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "General Statement", href: "/general", visible: true },
      { id: 2, name: "Legal Advice", href: "/legal", visible: true },
      { id: 3, name: "About Us", href: "/about", visible: true },
      { id: 4, name: "DEXT Token", href: "/token", visible: true },
      { id: 5, name: "Team", href: "/team", visible: true },
      { id: 6, name: "Contact", href: "/contact", visible: true },
      { id: 7, name: "Privacy Policy", href: "/privacy", visible: true },
      { id: 8, name: "Terms of Service", href: "/terms", visible: true },
      { id: 9, name: "Cookie Policy", href: "/cookie", visible: true },
      { id: 10, name: "Affiliates", href: "/affiliates", visible: true },
      { id: 11, name: "API Docs", href: "/api", visible: true },
    ];
  });

  // API Links toggle
  const [apiLinks, setApiLinks] = useState(() => {
    const saved = localStorage.getItem('api-links');
    return saved ? JSON.parse(saved) : { enabled: true, key: "dexnova_api_2025_pro" };
  });

  const login = () => {
    const user = adminUsers.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      setLoggedIn(true);
      localStorage.setItem('admin-auth', JSON.stringify(user));
    } else {
      alert("Invalid credentials");
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
      const user = JSON.parse(saved);
      setCurrentUser(user);
      setLoggedIn(true);
    }
  }, []);

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-gray-900 p-12 rounded-2xl border border-purple-500 w-96 shadow-2xl">
          <h1 className="text-5xl font-black text-center mb-10 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Admin Login
          </h1>
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-6 py-4 mb-4 bg-gray-800 rounded-xl border border-gray-700 focus:border-purple-500 outline-none" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} onKeyPress={e => e.key === 'Enter' && login()} className="w-full px-6 py-4 mb-8 bg-gray-800 rounded-xl border border-gray-700 focus:border-purple-500 outline-none" />
          <button onClick={login} className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-xl hover:scale-105 transition shadow-lg">
            Login
          </button>
        </div>
      </div>
    );
  }

  const canEdit = currentUser.role === 'admin';

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <div className="flex items-center gap-6">
            <p className="text-xl">Welcome, <span className="font-bold text-purple-400">{currentUser.username}</span> ({currentUser.role})</p>
            <button onClick={logout} className="flex items-center gap-2 px-6 py-3 bg-red-600 rounded-xl font-bold hover:bg-red-700 transition">
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>
        </div>

        <div className="flex gap-4 mb-10">
          {['dashboard', 'users', 'links', 'api', 'chains'].map(t => (
            <button key={t} onClick={() => setTab(t as any)} className={`px-8 py-4 rounded-xl font-bold text-lg transition ${tab === t ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-2xl' : 'bg-gray-800 hover:bg-gray-700'}`}>
              {t === 'dashboard' ? 'Analytics' : t === 'users' ? 'Users' : t === 'links' ? 'Footer Links' : t === 'api' ? 'API Links' : 'Chains'}
            </button>
          ))}
        </div>

        {tab === 'dashboard' && <AnalyticsDashboard />}
        {tab === 'users' && <UserManagement users={adminUsers} setUsers={setAdminUsers} canEdit={canEdit} />}
        {tab === 'links' && <LinkManager links={footerLinks} setLinks={setFooterLinks} canEdit={canEdit} />}
        {tab === 'api' && <APILinksManager apiLinks={apiLinks} setApiLinks={setApiLinks} canEdit={canEdit} />}
        {tab === 'chains' && <ChainManager />}
      </div>
    </div>
  );
}

function AnalyticsDashboard() {
  return (
    <div>
      <div className="grid md:grid-cols-4 gap-8 mb-12">
        <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-8 rounded-2xl border border-purple-500">
          <h3 className="text-xl font-bold text-gray-300">Total Revenue</h3>
          <p className="text-6xl font-black text-white mt-4">$4,746</p>
          <p className="text-green-400 text-lg mt-2">+68% this week</p>
        </div>
        {/* More stats */}
      </div>
      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
        <h2 className="text-4xl font-black mb-8">Revenue This Week</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="day" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #444' }} />
            <Line type="monotone" dataKey="revenue" stroke="#a855f7" strokeWidth={4} dot={{ fill: '#a855f7' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function UserManagement({ users, setUsers, canEdit }: any) {
  const addUser = () => {
    const username = prompt("Username:");
    const password = prompt("Password:");
    const role = prompt("Role (admin/moderator/viewer):");
    if (username && password && role) {
      setUsers([...users, { id: Date.now(), username, password, role, status: "active" }]);
    }
  };

  const deleteUser = (id: number) => {
    if (confirm("Delete this user?")) {
      setUsers(users.filter((u: any) => u.id !== id));
    }
  };

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-700 p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-black">User Management</h2>
        {canEdit && <button onClick={addUser} className="flex items-center gap-2 px-6 py-3 bg-green-600 rounded-xl font-bold hover:bg-green-700 transition"><Plus className="w-5 h-5" /> Add User</button>}
      </div>
      <div className="space-y-4">
        {users.map((user: any) => (
          <div key={user.id} className="flex items-center justify-between py-6 border-b border-gray-800">
            <div className="flex items-center gap-4">
              {user.role === 'admin' && <Shield className="w-6 h-6 text-purple-400" />}
              {user.role === 'moderator' && <UserCheck className="w-6 h-6 text-blue-400" />}
              {user.role === 'viewer' && <UserX className="w-6 h-6 text-gray-400" />}
              <div>
                <p className="text-2xl font-bold">{user.username}</p>
                <p className="text-gray-400 capitalize">{user.role}</p>
              </div>
            </div>
            {canEdit && (
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-blue-600 rounded-xl font-bold hover:bg-blue-700 transition"><Edit2 className="w-5 h-5" /></button>
                <button onClick={() => deleteUser(user.id)} className="px-6 py-3 bg-red-600 rounded-xl font-bold hover:bg-red-700 transition"><Trash2 className="w-5 h-5" /></button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function LinkManager({ links, setLinks, canEdit }: any) {
  const addLink = () => {
    const name = prompt("Link name:");
    const href = prompt("URL (e.g. /privacy):");
    if (name && href) {
      setLinks([...links, { id: Date.now(), name, href, visible: true }]);
    }
  };

  const toggle = (id: number) => {
    setLinks(links.map((l: any) => l.id === id ? { ...l, visible: !l.visible } : l));
  };

  const remove = (id: number) => {
    if (confirm("Delete link?")) {
      setLinks(links.filter((l: any) => l.id !== id));
    }
  };

  useEffect(() => {
    localStorage.setItem('footer-links', JSON.stringify(links));
  }, [links]);

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-700 p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-black">Footer Links</h2>
        {canEdit && <button onClick={addLink} className="flex items-center gap-2 px-6 py-3 bg-green-600 rounded-xl font-bold hover:bg-green-700 transition"><Plus className="w-5 h-5" /> Add Link</button>}
      </div>
      <div className="space-y-4">
        {links.map((link: any) => (
          <div key={link.id} className="flex items-center justify-between py-6 border-b border-gray-800">
            <div>
              <p className="text-2xl font-bold">{link.name}</p>
              <p className="text-gray-400">{link.href}</p>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => toggle(link.id)} className={`px-6 py-3 rounded-xl font-bold ${link.visible ? 'bg-green-600' : 'bg-red-600'}`}>
                {link.visible ? 'Visible' : 'Hidden'}
              </button>
              {canEdit && <button onClick={() => remove(link.id)} className="px-6 py-3 bg-red-600 rounded-xl font-bold hover:bg-red-700 transition"><Trash2 className="w-5 h-5" /></button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function APILinksManager({ apiLinks, setApiLinks, canEdit }: any) {
  const toggleAPI = () => {
    const updated = { ...apiLinks, enabled: !apiLinks.enabled };
    setApiLinks(updated);
    localStorage.setItem('api-links', JSON.stringify(updated));
  };

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-700 p-8">
      <h2 className="text-4xl font-black mb-8">API Links Control</h2>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">API Access</p>
            <p className="text-gray-400">Enable/disable API docs in footer</p>
          </div>
          <button onClick={toggleAPI} disabled={!canEdit} className={`px-8 py-4 rounded-xl font-bold text-xl ${apiLinks.enabled ? 'bg-green-600' : 'bg-red-600'} ${!canEdit && 'opacity-50'}`}>
            {apiLinks.enabled ? 'ENABLED' : 'DISABLED'}
          </button>
        </div>
        {apiLinks.enabled && (
          <div className="bg-gray-800 p-6 rounded-xl">
            <p className="text-sm text-gray-400">Current API Key</p>
            <code className="text-green-400 font-mono text-lg">{apiLinks.key}</code>
          </div>
        )}
      </div>
    </div>
  );
}

function ChainManager() {
  return <div className="text-4xl text-center py-32 text-gray-400">Chain Manager Coming Soon</div>;
}
