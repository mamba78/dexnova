export async function getRaydiumPools() {
  try {
    const res = await fetch('https://api.raydium.io/v2/main/pairs');
    const data = await res.json();
    return data.map((pool: any) => ({
      address: pool.ammId,
      name: pool.baseMint === "So11111111111111111111111111111111111111112" ? "SOL Pair" : pool.name,
      symbol: pool.name.split('/')[0],
      price: `$${pool.price?.toFixed(6) || '0'}`,
      change24h: pool.priceChange24h ? `${pool.priceChange24h > 0 ? '+' : ''}${pool.priceChange24h.toFixed(1)}%` : '+0%',
      volume24h: `$${pool.volume24h?.toLocaleString() || '0'}`,
      fdv: `$${pool.marketCap?.toLocaleString() || '0'}`,
      liquidity: `$${pool.liquidity?.toLocaleString() || '0'}`,
      chain: "Solana",
    }));
  } catch (e) {
    return [];
  }
}
