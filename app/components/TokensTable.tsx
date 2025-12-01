'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import SkeletonLoader from './SkeletonLoader';

const networks = ['solana','base','ethereum','bsc','polygon','arbitrum','optimism','zksync_era'];

function TokensTableContent() {
  const searchParams = useSearchParams();
  const selectedChain = searchParams.get('chain') || 'all';
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      const all: any[] = [];
      const chainsToFetch = selectedChain === 'all' ? networks : [selectedChain];
      
      for (const net of chainsToFetch) {
        try {
          const res = await fetch(`https://api.geckoterminal.com/api/v2/networks/${net}/trending_pools`);
          const data = await res.json();
          if (data.data) {
            data.data.slice(0, 12).forEach((p: any) => {
              const a = p.attributes;
              all.push({
                id: a.address || Math.random().toString(36),
                name: a.name.split(' / ')[0] || 'Unknown',
                chain: net.replace('_',' ').replace(/\b\w/g, l => l.toUpperCase()),
                price: a.base_token_price_usd ? `$${Number(a.base_token_price_usd).toFixed(6)}` : 'N/A',
                change24h: a.price_change_percentage?.h24 ? (a.price_change_percentage.h24 > 0 ? '+' : '') + a.price_change_percentage.h24.toFixed(2) + '%' : '0%',
                volume: a.volume_usd?.h24 ? '$' + (a.volume_usd.h24 / 1e6).toFixed(2) + 'M' : '$0',
                liquidity: a.reserve_in_usd ? '$' + (a.reserve_in_usd / 1e6).toFixed(2) + 'M' : '$0',
                logo: a.base_token?.icon_url || 'https://via.placeholder.com/32',
              });
            });
          }
        } catch (e) {}
      }
      setTokens(all);
      setLoading(false);
    };

    fetchTokens();
    const interval = setInterval(fetchTokens, 20000);
    return () => clearInterval(interval);
  }, [selectedChain]);

  if (loading) return <SkeletonLoader />;

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tokens.map((t, i) => (
        <div 
          key={t.id} 
          className="token-card fade-in stagger-item"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          <div className="flex items-center gap-4 mb-4">
            <img src={t.logo} alt="" className="w-14 h-14 rounded-full ring-2 ring-gray-700" />
            <div>
              <h3 className="token-name">{t.name}</h3>
              <p className="token-symbol">{t.chain}</p>
            </div>
          </div>
          <div className="price mb-2">{t.price}</div>
          <div className={`change mb-4 ${t.change24h.startsWith('+') ? 'change-positive' : 'change-negative'}`}>
            {t.change24h}
          </div>
          <div className="text-dex-small text-gray-400 space-y-1">
            <div>Vol: {t.volume}</div>
            <div>Liq: {t.liquidity}</div>
          </div>
          <Link href={`/token/${t.id}`}>
            <button className="btn-primary w-full mt-6">
              View Token
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default function TokensTable() {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <TokensTableContent />
    </Suspense>
  );
}
