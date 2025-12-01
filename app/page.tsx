'use client';
import { useSearchParams } from 'next/navigation';
import { useTokensTable} from './components/TokensTable';

export default function Home() {
  const searchParams = useSearchParams();
  const chain = searchParams.get('chain') || 'all';

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 px-6">
      <h1 className="text-6xl font-black text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Hot Pairs • {chain === 'all' ? 'All Chains' : chain.charAt(0).toUpperCase() + chain.slice(1)} Live
      </h1>
      <TokensTable selectedChain={chain} />
    </div>
  );
}
