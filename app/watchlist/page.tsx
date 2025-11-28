'use client';

import { useEffect, useState } from "react";
import TokenCard from "@/components/TokenCard";

export default function WatchlistPage() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("dexnova_watchlist") || "[]");
    setTokens(saved);
  }, []);

  if (tokens.length === 0) {
    return (
      <div className="min-h-screen p-10 text-center">
        <h1 className="text-4xl mb-4">Your Watchlist</h1>
        <p className="text-gray-400">No tokens saved yet. Start adding!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold text-center mb-10">My Watchlist ({tokens.length})</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {tokens.map((token: any) => (
          <TokenCard key={token.address} token={token} />
        ))}
      </div>
    </div>
  );
}