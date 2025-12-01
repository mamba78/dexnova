import { useState, useEffect } from 'react';

const CHAINS = {
  solana: 'solana',
  base: 'base',
  ethereum: 'ethereum',
  bsc: 'bsc',
  polygon: 'polygon',
  arbitrum: 'arbitrum',
  optimism: 'optimism',
  zksync_era: 'zksync_era'
};

export function useLiveTokens(chain: string = 'all') {
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      const allTokens: any[] = [];
      const chainsToFetch = chain === 'all' ? Object.values(CHAINS) : [chain];

      for (const net of chainsToFetch) {
        try {
          const res = await fetch(`https://api.geckoterminal.com/api/v2/networks/${net}/trending_pools`);
          const data = await res.json();
          if (data?.data) {
            data.data.slice(0, 12).forEach((pool: any) => {
              const a = pool.attributes;
              allTokens.push({
                id: pool.id,
                address: a.address,
                name: a.name.split(' / ')[0],
                symbol: a.base_token_symbol,
                chain: net.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
                price: a.base_token_price_usd ? `$${Number(a.base_token_price_usd).toFixed(6)}` : 'N/A',
                change1h: a.price_change_percentage?.h1?.toFixed(2) || '0',
                change24h: a.price_change_percentage?.h24?.toFixed(2) || '0',
                volume24h: a.volume_usd?.h24 ? (a.volume_usd.h24 / 1e6).toFixed(2) + 'M' : '0',
                liquidity: a.reserve_in_usd ? (a.reserve_in_usd / 1e6).toFixed(2) + 'M' : '0',
                logo: a.base_token?.icon_url || 'https://via.placeholder.com/64',
                fdv: a.fdv_usd ? (a.fdv_usd / 1e6).toFixed(1) + 'M' : 'N/A',
              });
            });
          }
        } catch (e) {
          console.log(`Failed to fetch ${net}`);
        }
      }
      setTokens(allTokens);
      setLoading(false);
    };

    fetchTokens();
    const interval = setInterval(fetchTokens, 20000);
    return () => clearInterval(interval);
  }, [chain]);

  return { tokens, loading };
}
