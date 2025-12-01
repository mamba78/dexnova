export async function getTrendingTokens(): Promise<any[]> {
  try {
    const res = await fetch('https://api.geckoterminal.com/api/v2/networks/solana/trending_pools');
    const json = await res.json();
    
    if (!json.data) return [];

    return json.data.map((p: any) => {
      const a = p.attributes;
      const base = a.base_token;
      return {
        address: base.address,
        name: a.name.split(' / ')[0],
        symbol: base.symbol,
        price: a.base_token_price_usd ? `$${Number(a.base_token_price_usd).toFixed(6)}` : '$0.00',
        change24h: a.price_change_percentage?.h24 ? 
          `${a.price_change_percentage.h24 > 0 ? '+' : ''}${a.price_change_percentage.h24.toFixed(2)}%` : 
          '+0.00%',
        volume24h: a.volume_usd?.h24 ? `$${Number(a.volume_usd.h24).toLocaleString()}` : '$0',
        fdv: a.fdv_usd ? `$${Number(a.fdv_usd).toLocaleString()}` : '$0',
        liquidity: a.reserve_in_usd ? `$${Number(a.reserve_in_usd).toLocaleString()}` : '$0',
      };
    });
  } catch (e) {
    console.error('API failed:', e);
    return []; // Never crash
  }
}
