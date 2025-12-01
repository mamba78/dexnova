export async function getPumpFunLaunches() {
  try {
    const res = await fetch('https://pumpportal.fun/api/data');
    const data = await res.json();

    return data.slice(0, 20).map((t: any) => ({
      address: t.mint,
      name: t.name,
      symbol: t.symbol.toUpperCase(),
      price: `$${parseFloat(t.price_usd || 0).toFixed(6)}`,
      change24h: t.price_change_24h ? `${t.price_change_24h > 0 ? '+' : ''}${t.price_change_24h.toFixed(1)}%` : '+0%',
      volume24h: t.volume_24h ? `$${parseFloat(t.volume_24h).toLocaleString()}` : '$0',
      fdv: t.market_cap ? `$${parseFloat(t.market_cap).toLocaleString()}` : '$0',
      liquidity: t.liquidity ? `$${parseFloat(t.liquidity).toLocaleString()}` : '$0',
      age: "New",
      isPumpFun: true,
    }));
  } catch (e) {
    console.error("Pump.fun API down");
    return [];
  }
}
