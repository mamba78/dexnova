import { BoostManager } from '../../lib/boostSystem';

export default function BoostAnalytics() {
  const boosts = BoostManager.getAll();
  const active = BoostManager.getActive();
  const revenue = BoostManager.getRevenue();

  return (
    <div className="min-h-screen bg-black p-10">
      <h1 className="text-6xl font-black mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Boost Analytics
      </h1>
      
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-gray-900 p-8 rounded-xl border border-gray-700">
          <h3 className="text-xl font-bold text-gray-400">Total Revenue</h3>
          <p className="text-5xl font-black text-green-400 mt-4">${revenue.toFixed(2)}</p>
        </div>
        <div className="bg-gray-900 p-8 rounded-xl border border-gray-700">
          <h3 className="text-xl font-bold text-gray-400">Active Boosts</h3>
          <p className="text-5xl font-black text-yellow-400 mt-4">{active.length}</p>
        </div>
        <div className="bg-gray-900 p-8 rounded-xl border border-gray-700">
          <h3 className="text-xl font-bold text-gray-400">Total Boosts</h3>
          <p className="text-5xl font-black text-purple-400 mt-4">{boosts.length}</p>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-700 p-8">
        <h2 className="text-3xl font-black mb-6">Active Boosts</h2>
        <div className="space-y-4">
          {active.map(b => (
            <div key={b.tokenId} className="flex justify-between items-center py-4 border-b border-gray-800">
              <div>
                <p className="font-bold">{b.tokenName}</p>
                <p className="text-sm text-gray-400">{b.chain} • {b.duration}</p>
              </div>
              <div className="text-right">
                <p className="text-green-400 font-bold">${b.priceUsd}</p>
                <p className="text-xs text-gray-500">Expires in {Math.round((b.expiresAt - Date.now()) / 3600000)}h</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
