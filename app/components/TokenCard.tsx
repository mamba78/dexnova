import Link from 'next/link';

export default function TokenCard({ token }: { token: any }) {
  return (
    <div className={`bg-gray-900/50 border ${token.boosted ? 'border-yellow-500 shadow-lg shadow-yellow-500/20' : 'border-gray-800'} rounded-xl p-6 hover:scale-105 transition`}>
      {token.boosted && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full text-xs font-bold">BOOSTED</div>}
      <div className="flex items-center gap-4 mb-4">
        <img src={token.logo} alt="" className="w-12 h-12 rounded-full" />
        <div>
          <h3 className="font-bold text-lg">{token.name}</h3>
          <p className="text-sm text-gray-400">{token.chain}</p>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between"><span>Price</span><span className="font-bold">{token.price}</span></div>
        <div className="flex justify-between"><span>24h</span><span className={token.change24h.startsWith('+') ? 'text-green-400' : 'text-red-400'}>{token.change24h}</span></div>
        <div className="flex justify-between"><span>Volume</span><span>{token.volume}</span></div>
      </div>
      <Link href={`/token/${token.id}`}>
        <button className="w-full mt-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:scale-105 transition">
          View Detail
        </button>
      </Link>
    </div>
  );
}
