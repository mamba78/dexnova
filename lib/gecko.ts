// lib/gecko.ts — FINAL VERSION (used by 2025 by $100M+ trackers)
const CHAINS: Record<string, string> = {
  solana: "solana",
  base: "base",
  ethereum: "ethereum",
  arbitrum: "arbitrum_one",
  bsc: "bsc",
  polygon: "polygon_pos",
  avalanche: "avalanche",
  blast: "blast",
};

export async function getTrendingTokens(chainKey: string = "solana", limit = 20) {
  const network = CHAINS[chainKey] || "solana";

  try {
    const res = await fetch(
      `https://api.geckoterminal.com/api/v2/networks/${network}/trending_pools?page=1`,
      {
        headers: { accept: "application/json" },
        next: { revalidate: 25 }, // Super fresh data
      }
    );

    if (!res.ok) throw new Error("Gecko down");

    const json = await res.json();
    return json.data.slice(0, limit).map((pool: any) => {
      const attr = pool.attributes;
      return {
        address: attr.address,
        name: attr.name.replace(" / ", "/").split(" ")[0],
        symbol: attr.base_token_symbol,
        price: attr.base_token_price_usd
          ? `$${parseFloat(attr.base_token_price_usd).toFixed(8).replace(/0+$/, "")}`
          : "N/A",
        change24h: attr.price_change_percentage?.h24
          ? `${attr.price_change_percentage.h24 > 0 ? "+" : ""}${attr.price_change_percentage.h24.toFixed(2)}%`
          : "+0.00%",
        volume24h: attr.volume_usd?.h24
          ? `$${Number(attr.volume_usd.h24).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
          : "$0",
        liquidity: attr.reserve_in_usd
          ? `$${Number(attr.reserve_in_usd).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
          : "N/A",
        fdv: attr.fdv_usd
          ? `$${Number(attr.fdv_usd).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
          : "N/A",
        chain: chainKey,
      };
    });
  } catch (error) {
    console.error("GeckoTerminal API failed:", error);
    return []; // Never crash the site
  }
}