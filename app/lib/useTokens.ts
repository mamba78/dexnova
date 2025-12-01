import { useState, useEffect } from 'react';

const networks = ['solana','base','ethereum','bsc','polygon','arbitrum','optimism','zksync_era'];

export function useTokens() {
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const all: any[] = [];
      for (const net of networks) {
        try {
          const res = await fetch(`https://api.geckoterminal.com/api/v2/networks/${net}/trending_pools`);
          const data = await res.json();
          if (data.data) {
            data.data.slice(0, 8).forEach((p: any) => {
              const a = p.attributes;
              all.push({
                id: a.address || Math.random().toString(36),
                name: a.name.split(' / ')[0],
                chain: net.replace('_',' ').replace(/\b\w/g, l => l.toUpperCase()),
                price: a.base_token_price_usd ? `$${parseFloat(a.base_token_price_usd).toFixed(6)}` : '$0.00',
                change1h: a.price_change_percentage?.h1 ? a.price_change_percentage.h1.toFixed(2) + '%' : '0%',
                change24h: a.price_change_percentage?.h24 ? a.price_change_percentage.h24.toFixed(2) + '%' : '0%',
                volume: a.volume_usd?.h24 ? '$' + (a.volume_usd.h24 / 1e6).toFixed(2) + 'M' : '$0',
                liquidity: a.reserve_in_usd ? '$' + (a.reserve_in_usd / 1e6).toFixed(2) + 'M' : '$0',
                mcap: a.fdv_usd ? '$' + (a.fdv_usd / 1e6).toFixed(1) + 'M' : '$0',
                logo: a.base_token?.icon_url || 'https://via.placeholder.com/32',
                boosted: localStorage.getItem('boosted-' + a.address) === 'true',
              });
            });
          }
        } catch (e) {}
      }
      setTokens(all);
      setLoading(false);
    };
    fetchAll();
    const id = setInterval(fetchAll, 15000);
    return () => clearInterval(id);
  }, []);

  const boostToken = (id: string) => {
    localStorage.setItem('boosted-' + id, 'true');
    setTokens(prev => prev.map(t => t.id === id ? { ...t, boosted: true } : t));
  };

  return { tokens, loading, boostToken };
}
