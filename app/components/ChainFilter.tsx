'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const chains = [
  { id: 'all', name: 'All Chains' },
  { id: 'solana', name: 'Solana' },
  { id: 'base', name: 'Base' },
  { id: 'ethereum', name: 'Ethereum' },
  { id: 'bsc', name: 'BSC' },
  { id: 'polygon', name: 'Polygon' },
  { id: 'arbitrum', name: 'Arbitrum' },
  { id: 'optimism', name: 'Optimism' },
  { id: 'zksync_era', name: 'ZKsync Era' },
];

export default function ChainFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentChain = searchParams.get('chain') || 'all';

  const setChain = (chain: string) => {
    const url = chain === 'all' ? '/' : `/?chain=${chain}`;
    router.push(url, { scroll: false });
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-12">
      {chains.map(c => (
        <button
          key={c.id}
          onClick={() => setChain(c.id)}
          className={`px-8 py-3.5 rounded-xl font-bold text-sm transition-all ${
            currentChain === c.id
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/50'
              : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}
