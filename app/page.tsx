'use client';
import { useTokens } from './lib/useTokens';
import TokenCard from './components/TokenCard';

export default function Home() {
  const { tokens, loading } = useTokens();

  return (
    <div className="p-6">
      <h1 className="text-5xl font-black text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Hot Pairs • Live
      </h1>
      {loading ? (
        <div className="text-center py-20 text-2xl">Loading real-time data...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tokens.sort((a,b) => b.boosted ? 1 : -1).map(t => (
            <TokenCard key={t.id} token={t} />
          ))}
        </div>
      )}
    </div>
  );
}
