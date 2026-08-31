'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LeaderboardEntry } from '@/lib/game/gameTypes';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export default function Leaderboard({ entries, currentPlayerName }: { entries: LeaderboardEntry[]; currentPlayerName?: string }) {
  const handleAdminReset = async () => {
    const secret = prompt("Nhập mã bảo mật Admin để Reset Bảng Xếp Hạng:");
    if (!secret) return;

    try {
      const res = await fetch(`/api/leaderboard?secret=${encodeURIComponent(secret)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        alert("✓ Bảng xếp hạng đã được xóa sạch về 0!");
        window.location.reload();
      } else {
        alert(data.error || "Sai mật khẩu Admin!");
      }
    } catch {
      alert("Lỗi kết nối khi reset.");
    }
  };

  if (!entries || entries.length === 0) {
    return (
      <div className="w-full p-8 text-center bg-slate-900/50 rounded-xl border border-slate-700">
        <h2 className="text-xl font-bold text-amber-500 tracking-widest mb-4">🏆 LEADERBOARD</h2>
        <p className="text-slate-400">Chưa có ai ghi điểm. Hãy là người đầu tiên!</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl flex flex-col">
      <div className="p-4 bg-slate-950 border-b border-slate-800">
        <h2 className="text-xl font-bold text-amber-500 tracking-widest text-center flex items-center justify-center gap-2">
          <span>🏆</span> LEADERBOARD
        </h2>
      </div>
      
      <div className="max-h-[60vh] overflow-y-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-900/80 sticky top-0 z-10 backdrop-blur-md shadow-sm">
            <tr className="text-slate-400 border-b border-slate-700">
              <th className="px-4 py-3 font-semibold text-center w-12">Rank</th>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold text-right">Score</th>
              <th className="px-4 py-3 font-semibold text-center">Ch.</th>
              <th className="px-4 py-3 font-semibold text-right">Time</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => {
              const rank = index + 1;
              const isCurrentPlayer = currentPlayerName && entry.name === currentPlayerName;
              
              let rowClass = "border-b border-slate-800 transition-colors hover:bg-slate-800/50";
              if (rank === 1) rowClass += " bg-yellow-500/10";
              else if (rank === 2) rowClass += " bg-slate-300/10";
              else if (rank === 3) rowClass += " bg-orange-700/10";
              
              if (isCurrentPlayer) rowClass += " border-2 border-amber-500/50 shadow-[inset_0_0_15px_rgba(245,158,11,0.15)]";
              
              let rankDisplay: React.ReactNode = rank;
              if (rank === 1) rankDisplay = "🥇";
              else if (rank === 2) rankDisplay = "🥈";
              else if (rank === 3) rankDisplay = "🥉";

              return (
                <motion.tr 
                  key={entry.id}
                  className={rowClass}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="px-4 py-3 text-center font-bold text-slate-300">{rankDisplay}</td>
                  <td className="px-4 py-3 font-medium text-slate-200">
                    {entry.name}
                    {isCurrentPlayer && <span className="ml-2 text-xs bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded">YOU</span>}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-emerald-400">{entry.score.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-slate-400">{entry.chaptersCompleted}/6</td>
                  <td className="px-4 py-3 text-right font-mono text-slate-400">{formatTime(entry.timeSeconds)}</td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-2.5 bg-slate-950/80 border-t border-slate-800/80 flex justify-center">
        <button
          onClick={handleAdminReset}
          className="text-[10px] text-zinc-600 hover:text-red-400/80 transition-colors uppercase tracking-wider font-mono"
        >
          ⚙️ Admin Reset Leaderboard
        </button>
      </div>
    </div>
  );
}
