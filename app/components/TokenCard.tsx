import Link from 'next/link';

export default function TokenCard({ token, index }: { token: any; index: number }) {
  return (
    <div 
      className="token-card fade-in stagger-item"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {token.boosted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full text-xs font-bold animate-pulse">
          BOOSTED
        </div>
      )}
      
      <div className="flex items-center gap-4 mb-4">
        <img src={token.logo} alt="" className="w-14 h-14 rounded-full ring-2 ring-gray-700" />
        <div>
          <h3 className="token-name">{token.name}</h3>
          <p className="token-symbol">{token.chain}</p>
        </div>
      </div>
      
      <div className="price mb-2">{token.price}</div>
      <div className={`change mb-4 ${token.change24h.startsWith('+') ? 'change-positive' : 'change-negative'}`}>
        {token.change24h}
      </div>
      
      <div className="text-dex-small text-gray-400 space-y-1">
        <div>Vol: {token.volume}</div>
        <div>Liq: {token.liquidity}</div>
      </div>
      
      <Link href={`/token/${token.id}`}>
        <button className="btn-primary w-full mt-6">
          View Token
        </button>
      </Link>
    </div>
  );
}
