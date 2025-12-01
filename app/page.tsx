import { Suspense } from 'react';
import SEO from './components/SEO';
import ChainFilter from './components/ChainFilter';
import TokensTable from './components/TokensTable';

export default function Home() {
  return (
    <>
      <SEO 
        title="DexNova — Live Hot Pairs & DEX Tracker 2025"
        description="Real-time multi-chain DEX analytics: Solana, Ethereum, Base, Arbitrum, ZKsync. Track volume, liquidity, price changes, and boosted tokens instantly."
      />
      <div className="min-h-screen bg-black pt-24 px-6">
        <h1 className="text-6xl font-black text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Hot Pairs • Live Multi-Chain
        </h1>
        
        <Suspense fallback={<div className="text-center py-12">Loading filters...</div>}>
          <ChainFilter />
        </Suspense>
        
        <Suspense fallback={<div className="text-center py-32 text-3xl text-gray-400">Loading live tokens...</div>}>
          <TokensTable />
        </Suspense>
      </div>
    </>
  );
}
