'use client';
import { useSearchParams } from 'next/navigation';
import { useLiveTokens } from '../lib/useLiveTokens';
import TokenCard from './TokenCard';
import SkeletonLoader from './SkeletonLoader';

export default function TokensTable() {
  const searchParams = useSearchParams();
  const chain = searchParams.get('chain') || 'all';
  const { tokens, loading } = useLiveTokens(chain);

  // Sort: boosted first, then by volume
  const sortedTokens = [...tokens].sort((a, b) => {
    const aBoosted = localStorage.getItem(`boosted-${a.id}`) === 'true';
    const bBoosted = localStorage.getItem(`boosted-${b.id}`) === 'true';
    if (aBoosted && !bBoosted) return -1;
    if (!aBoosted && bBoosted) return 1;
    return 0;
  });

  if (loading) return <SkeletonLoader />;

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {sortedTokens.map((token, i) => (
        <TokenCard key={token.id} token={token} index={i} />
      ))}
    </div>
  );
}
