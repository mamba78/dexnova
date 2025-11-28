'use client';

import { useState } from "react";
import { Rocket, Moon, Flame } from "lucide-react";

export default function EngagementTrio({ tokenAddress, chain }: { tokenAddress: string; chain: string }) {
  const [rocketed, setRocketed] = useState(false);
  const [moonVoted, setMoonVoted] = useState<"moon" | "zero" | null>(null);
  const [fired, setFired] = useState(false);

  return (
    <div className="flex justify-center gap-6 mt-4">
      <button
        onClick={() => setRocketed(true)}
        disabled={rocketed}
        className={`p-4 rounded-full transition-all ${rocketed ? "bg-green-600" : "bg-gray-800 hover:bg-gray-700"}`}
      >
        <Rocket className="w-8 h-8" />
        {rocketed && <span className="text-xs block">24h</span>}
      </button>

      <div className="flex gap-2">
        <button
          onClick={() => setMoonVoted("moon")}
          disabled={!!moonVoted}
          className={`p-4 rounded-full ${moonVoted === "moon" ? "bg-yellow-500" : "bg-gray-800"}`}
        >
          <Moon className="w-8 h-8" />
        </button>
        <button
          onClick={() => setMoonVoted("zero")}
          disabled={!!moonVoted}
          className={`p-4 rounded-full ${moonVoted === "zero" ? "bg-red-600" : "bg-gray-800"}`}
        >
          Zero
        </button>
      </div>

      <button
        onClick={() => setFired(true)}
        disabled={fired}
        className={`p-4 rounded-full animate-pulse ${fired ? "bg-orange-600" : "bg-gray-800"}`}
      >
        <Flame className="w-8 h-8" />
      </button>
    </div>
  );
}