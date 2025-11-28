'use client';

import { Heart } from "lucide-react";
import { useState } from "react";

export default function WatchlistButton({ token }: { token: any }) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const watchlist = JSON.parse(localStorage.getItem("dexnova_watchlist") || "[]");
    if (!watchlist.find((t: any) => t.address === token.address)) {
      watchlist.push(token);
      localStorage.setItem("dexnova_watchlist", JSON.stringify(watchlist));
      setSaved(true);
    }
  };

  return (
    <button
      onClick={handleSave}
      className={`mt-3 flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
        saved ? "bg-pink-600" : "bg-gray-800 hover:bg-gray-700"
      }`}
    >
      <Heart className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
      {saved ? "Saved" : "Add to Watchlist"}
    </button>
  );
}