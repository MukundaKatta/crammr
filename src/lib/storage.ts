"use client";

export interface UserStats {
  bestScore: number;
  lastQuizDate: string | null;
  streak: number;
  totalQuizzes: number;
}

const STORAGE_KEY = "crammr_stats";

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

export function getStats(): UserStats {
  if (typeof window === "undefined")
    return { bestScore: 0, lastQuizDate: null, streak: 0, totalQuizzes: 0 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { bestScore: 0, lastQuizDate: null, streak: 0, totalQuizzes: 0 };
    return JSON.parse(raw);
  } catch {
    return { bestScore: 0, lastQuizDate: null, streak: 0, totalQuizzes: 0 };
  }
}

export function saveQuizResult(score: number, total: number): UserStats {
  const stats = getStats();
  const today = getToday();
  const yesterday = getYesterday();
  const pct = Math.round((score / total) * 100);

  if (pct > stats.bestScore) stats.bestScore = pct;

  if (stats.lastQuizDate === today) {
    // Already played today, no streak change
  } else if (stats.lastQuizDate === yesterday) {
    stats.streak += 1;
  } else {
    stats.streak = 1;
  }

  stats.lastQuizDate = today;
  stats.totalQuizzes += 1;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  return stats;
}

export function getCurrentStreak(): number {
  const stats = getStats();
  const today = getToday();
  const yesterday = getYesterday();

  if (stats.lastQuizDate === today || stats.lastQuizDate === yesterday) {
    return stats.streak;
  }
  return 0;
}
