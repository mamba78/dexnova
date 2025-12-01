export interface Token {
  address: string;
  name: string;
  symbol: string;
  price: string;
  change24h: string;
  chain: string;
  volume24h: string;
  fdv: string;
  liquidity: string;
  sparkline: number[];
}

export async function getTrendingTokens(chain: string = "solana", limit: number = 20): Promise<Token[]> {
  try {
    const response = await fetch(`https://api.geckoterminal.com/api/v2/networks/${chain}/trending_pools?page=1`);
    const data = await response.json();

    if (data.data && data.data.length > 0) {
      return data.data.slice(0, limit).map((pool: any) => {
        const attrs = pool.attributes;
        const baseToken = attrs.base_token;
        const price = attrs.base_token_price_usd || "0.00";

        return {
          address: baseToken.address,
          name: baseToken.name || baseToken.symbol,
          symbol: baseToken.symbol,
          price: `$${parseFloat(price).toFixed(6)}`,
          change24h: `${attrs.price_change_percentage.h24 > 0 ? '+' : ''}${attrs.price_change_percentage.h24.toFixed(2)}%`,
          chain: chain.charAt(0).toUpperCase() + chain.slice(1),
          volume24h: `$${parseFloat(attrs.volume_usd.h24).toLocaleString()}`,
          fdv: `$${parseFloat(attrs.fdv_usd).toLocaleString()}`,
          liquidity: `$${parseFloat(attrs.reserve_in_usd).toLocaleString()}`,
          sparkline: [1, 1.1, 1.05, 1.2, 1.15], // Mock — replace with real OHLCV
        };
      });
    }
  } catch (error) {
    console.error('GeckoTerminal API error:', error);
  }

  // Fallback mock data
  return [
    { address: "EKpQGSJ...", name: "dogwifhat", symbol: "WIF", price: "$2.41", change24h: "+8.7%", chain: "Solana", volume24h: "$682M", fdv: "$2.4B", liquidity: "$520M", sparkline: [1, 1.1, 1.05, 1.2, 1.15] },
    { address: "JUPyiwrY...", name: "Jupiter", symbol: "JUP", price: "$0.92", change24h: "+15.3%", chain: "Solana", volume24h: "$195M", fdv: "$1.3B", liquidity: "$380M", sparkline: [1, 1.3, 1.1, 1.4, 1.6] },
  ];
}
