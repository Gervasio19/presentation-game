"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LeaderboardEntry } from "@/lib/game/gameTypes";
import Leaderboard from "@/components/game/Leaderboard";

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchScores = useCallback(async () => {
    try {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();
      if (data?.entries) {
        setEntries(data.entries);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (err) {
      console.error("Fetch leaderboard error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScores();

    // Live auto-polling every 3 seconds for seminar projector display
    const timer = setInterval(fetchScores, 3000);
    return () => clearInterval(timer);
  }, [fetchScores]);

  return (
    <div className="relative min-h-dvh bg-zinc-950 text-white flex flex-col items-center p-4 sm:p-8 overflow-x-hidden">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(251,191,36,0.06)_0%,_transparent_70%)] pointer-events-none" />

      {/* Header bar - Sharp square styling */}
      <header className="relative z-10 w-full max-w-4xl flex items-center justify-between mb-6 pb-4 border-b-2 border-zinc-800">
        <Link
          href="/"
          className="text-xs sm:text-sm font-mono font-bold text-zinc-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 uppercase tracking-wider"
        >
          <span>←</span> Menu Chính
        </Link>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/80 border border-emerald-500/50 text-xs font-mono text-emerald-400 font-bold tracking-wider">
            <span className="w-2 h-2 bg-emerald-400 animate-ping" />
            REAL-TIME LIVE
          </span>
          {lastUpdated && (
            <span className="text-xs text-zinc-500 font-mono hidden sm:inline">
              Cập nhật: {lastUpdated}
            </span>
          )}
        </div>
      </header>

      {/* Main Container - max-w-4xl for Large Display */}
      <main className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-5xl font-black tracking-widest text-amber-500 uppercase font-mono flex items-center justify-center gap-3">
            <span>🏆</span> BẢNG VINH DANH LỚP HỌC
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 uppercase tracking-widest font-mono">
            2008 GFC Policy Simulation Leaderboard & Activity Scoring
          </p>
        </div>

        {/* Podium for Top 3 (Square Terminal Cards) */}
        {entries.length >= 3 && (
          <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full mb-8 items-end">
            {/* 2nd Place */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-zinc-900 border-2 border-slate-500/50 p-4 sm:p-5 text-center flex flex-col items-center shadow-xl rounded-none font-mono"
            >
              <div className="text-3xl sm:text-4xl mb-1">🥈</div>
              <div className="text-sm sm:text-base font-bold text-zinc-200 truncate w-full">
                {entries[1].name}
              </div>
              <div className="text-lg sm:text-2xl font-black text-slate-300 mt-1">
                {entries[1].score.toLocaleString()}
              </div>
              {entries[1].bonusPoints && entries[1].bonusPoints > 0 ? (
                <div className="text-xs text-amber-400 font-bold mt-1 bg-amber-500/20 px-2 py-0.5 border border-amber-500/40">
                  ⭐ +{entries[1].bonusPoints}đ
                </div>
              ) : null}
              <div className="text-xs text-zinc-500 mt-1">
                Ch. {entries[1].chaptersCompleted}/6
              </div>
            </motion.div>

            {/* 1st Place (Champion) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-900 border-2 border-amber-400 p-5 sm:p-7 text-center flex flex-col items-center shadow-2xl shadow-amber-500/10 -mt-4 rounded-none font-mono"
            >
              <div className="text-4xl sm:text-5xl mb-1">🥇</div>
              <div className="text-base sm:text-lg font-black text-amber-300 truncate w-full uppercase tracking-wider">
                {entries[0].name}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
                {entries[0].score.toLocaleString()}
              </div>
              {entries[0].bonusPoints && entries[0].bonusPoints > 0 ? (
                <div className="text-xs sm:text-sm text-amber-400 font-bold mt-1 bg-amber-500/20 px-2.5 py-0.5 border border-amber-500">
                  ⭐ +{entries[0].bonusPoints}đ thưởng
                </div>
              ) : null}
              <div className="text-xs text-amber-500/80 mt-1">
                Ch. {entries[0].chaptersCompleted}/6
              </div>
            </motion.div>

            {/* 3rd Place */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-900 border-2 border-amber-700/60 p-4 sm:p-5 text-center flex flex-col items-center shadow-xl rounded-none font-mono"
            >
              <div className="text-3xl sm:text-4xl mb-1">🥉</div>
              <div className="text-sm sm:text-base font-bold text-zinc-200 truncate w-full">
                {entries[2].name}
              </div>
              <div className="text-lg sm:text-2xl font-black text-amber-600 mt-1">
                {entries[2].score.toLocaleString()}
              </div>
              {entries[2].bonusPoints && entries[2].bonusPoints > 0 ? (
                <div className="text-xs text-amber-400 font-bold mt-1 bg-amber-500/20 px-2 py-0.5 border border-amber-500/40">
                  ⭐ +{entries[2].bonusPoints}đ
                </div>
              ) : null}
              <div className="text-xs text-zinc-500 mt-1">
                Ch. {entries[2].chaptersCompleted}/6
              </div>
            </motion.div>
          </div>
        )}

        {/* Full Leaderboard Table with +0.5 Controls */}
        <div className="w-full">
          {loading ? (
            <div className="py-20 text-center text-zinc-500 font-mono">
              <div className="animate-spin w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 mx-auto mb-4" />
              ĐANG TẢI DỮ LIỆU XẾP HẠNG TRỰC TIẾP...
            </div>
          ) : (
            <Leaderboard entries={entries} onRefresh={fetchScores} />
          )}
        </div>
      </main>
    </div>
  );
}
