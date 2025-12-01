import { Connection } from '@solana/web3.js';

const PUMP_FUN_PROGRAM = new PublicKey("6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P");
const connection = new Connection("https://api.mainnet-beta.solana.com");

export async function monitorPumpFunLaunches() {
  connection.onLogs(
    PUMP_FUN_PROGRAM,
    async (logs) => {
      if (logs.err) return;
      if (logs.logs.some(log => log.includes("initialize"))) {
        // New token launched on Pump.fun
        const tokenAddress = extractTokenFromLogs(logs.logs);
        if (tokenAddress) {
          // Auto-boost for 7 days
          const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
          localStorage.setItem(`boosted-${tokenAddress}`, JSON.stringify({
            expiresAt,
            boostedAt: Date.now(),
            source: 'pump.fun',
            paid: true
          }));
          console.log(`Auto-boosted Pump.fun token: ${tokenAddress}`);
        }
      }
    },
    "confirmed"
  );
}
