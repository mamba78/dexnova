export const APIs = {
  geckoTerminal: "https://api.geckoterminal.com/api/v2",
  birdeye: "https://public-api.birdeye.so",
  pumpFun: "https://pumpportal.fun/api/data",
  jupiter: "https://quote-api.jup.ag/v6",
};

export async function getJupiterQuote(inputMint: string, outputMint: string, amount: number) {
  const res = await fetch(
    `${APIs.jupiter}/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=50`
  );
  return res.json();
}

export async function getJupiterSwap(tx: any, wallet: any) {
  const res = await fetch(`${APIs.jupiter}/swap`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ route: tx, userPublicKey: wallet.publicKey.toBase58() }),
  });
  return res.json();
}
