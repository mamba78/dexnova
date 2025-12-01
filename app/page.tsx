import { Suspense } from 'react';
import ChainFilter from './components/ChainFilter';
import TokensTable from './components/TokensTable';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 px-6">
      <h1 className="text-dex-h1 text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent fade-in">
        Hot Pairs • Live Multi-Chain
      </h1>
      
      <Suspense fallback={<div className="text-center py-12 text-dex-body">Loading filters...</div>}>
        <ChainFilter />
      </Suspense>
      
      <Suspense fallback={<div className="text-center py-32 text-dex-h2 text-gray-400">Loading live tokens...</div>}>
        <TokensTable />
      </Suspense>
    </div>
  );
}
