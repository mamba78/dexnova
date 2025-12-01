import { Connection, PublicKey } from '@solana/web3.js';

// Replace with your actual boost wallet
const BOOST_WALLET = new PublicKey("YOUR_BOOST_WALLET_HERE");

const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

export async function verifyBoostPayment(txSignature: string, expectedAmount: number): Promise<boolean> {
  try {
    const tx = await connection.getParsedTransaction(txSignature, {
      maxSupportedTransactionVersion: 0,
    });

    if (!tx) return false;

    // Check if transaction is confirmed
    if (tx.meta?.err !== null) return false;

    // Check recipient
    const instructions = tx.transaction.message.instructions;
    for (const ix of instructions) {
      if ('parsed' in ix) {
        const info = ix.parsed?.info;
        if (info?.destination === BOOST_WALLET.toBase58() && info?.lamports) {
          const paid = info.lamports / 1e9; // SOL
          if (Math.abs(paid - expectedAmount) < 0.01) return true;
        }
      }
    }
    return false;
  } catch (e) {
    console.error("Verification failed:", e);
    return false;
  }
}
