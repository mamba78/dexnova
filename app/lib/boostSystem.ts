export interface Boost {
  tokenId: string;
  tokenName: string;
  chain: string;
  duration: '24h' | '7d' | '30d';
  priceUsd: number;
  paid: boolean;
  txSignature?: string;
  expiresAt: number;
  boostedAt: number;
}

export class BoostManager {
  static STORAGE_KEY = 'dexnova_boosts_v2';

  static getAll(): Boost[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  static add(boost: Omit<Boost, 'boostedAt'>) {
    const boosts = this.getAll();
    const newBoost = { ...boost, boostedAt: Date.now() };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify([...boosts, newBoost]));
  }

  static getActive(): Boost[] {
    return this.getAll().filter(b => b.paid && b.expiresAt > Date.now());
  }

  static getRevenue(): number {
    return this.getAll().filter(b => b.paid).reduce((sum, b) => sum + b.priceUsd, 0);
  }

  static verifyPayment(txSignature: string): boolean {
    // In real app: verify via Solana RPC + Jupiter API
    // For demo: accept any signature longer than 50 chars
    return txSignature.length > 50;
  }
}
