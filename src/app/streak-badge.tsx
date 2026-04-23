"use client";

import { useEffect, useState } from "react";
import { getStats } from "../lib/storage";

export function StreakBadge() {
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);

  useEffect(() => {
    const stats = getStats();
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split("T")[0];

    if (
      stats.lastQuizDate === today ||
      stats.lastQuizDate === yesterday
    ) {
      setStreak(stats.streak);
    }
    setBest(stats.bestScore);
  }, []);

  if (streak === 0 && best === 0) return null;

  return (
    <div className="mt-8 flex items-center justify-center gap-6 text-sm text-neutral-600">
      {streak > 0 && (
        <span className="flex items-center gap-1.5">
          🔥 <span className="font-semibold text-neutral-900">{streak}-day</span> streak
        </span>
      )}
      {best > 0 && (
        <span className="flex items-center gap-1.5">
          🏆 Best: <span className="font-semibold text-neutral-900">{best}%</span>
        </span>
      )}
    </div>
  );
}
