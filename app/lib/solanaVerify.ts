export async function verifyBoostPayment(txSignature: string, expectedAmount: number): Promise<boolean> {
  // Mock verification — in production use real Solana RPC
  if (txSignature.length > 50 && txSignature.startsWith('5')) {
    console.log("Payment verified (mock):", txSignature);
    return true;
  }
  return false;
}
