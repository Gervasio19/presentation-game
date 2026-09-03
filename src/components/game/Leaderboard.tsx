"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { LeaderboardEntry } from "@/lib/game/gameTypes";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

type LeaderboardProps = {
  entries: LeaderboardEntry[];
  currentPlayerName?: string;
  onRefresh?: () => void;
};

export default function Leaderboard({
  entries,
  currentPlayerName,
  onRefresh,
}: LeaderboardProps) {
  const [quickName, setQuickName] = useState("");
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  // Bonus Points Handler (+0.5 or -0.5)
  const handleModifyBonus = async (name: string, delta: number) => {
    setIsUpdating(name);
    try {
      const res = await fetch("/api/leaderboard", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, delta }),
      });
      if (res.ok && onRefresh) {
        onRefresh();
      }
    } catch (err) {
      console.error("Bonus update error:", err);
    } finally {
      setIsUpdating(null);
    }
  };

  const handleQuickAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = quickName.trim();
    if (!trimmed) return;
    await handleModifyBonus(trimmed, 0.5);
    setQuickName("");
  };

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
        if (onRefresh) onRefresh();
        else window.location.reload();
      } else {
        alert(data.error || "Sai mật khẩu Admin!");
      }
    } catch {
      alert("Lỗi kết nối khi reset.");
    }
  };

  return (
    <div className="w-full bg-zinc-950 border-2 border-zinc-700 shadow-2xl flex flex-col rounded-none font-sans">
      {/* Header Bar - Sharp Square Terminal Style */}
      <div className="p-4 bg-zinc-900 border-b-2 border-zinc-700 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">🏆</span>
          <h2 className="text-base sm:text-lg font-black text-amber-400 tracking-widest uppercase font-mono">
            SEMINAR LEADERBOARD
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/80 border border-emerald-500/50 text-[11px] font-mono text-emerald-400 font-bold tracking-wider">
            <span className="w-2 h-2 bg-emerald-400 animate-ping" />
            REAL-TIME LIVE
          </span>
        </div>
      </div>

      {/* Quick Award Bar for Class Participation */}
      <form
        onSubmit={handleQuickAdd}
        className="p-3 bg-zinc-900/60 border-b border-zinc-800 flex flex-wrap items-center gap-2"
      >
        <span className="text-xs font-mono font-bold text-zinc-400 uppercase">
          ⚡ Thưởng phát biểu:
        </span>
        <input
          type="text"
          value={quickName}
          onChange={(e) => setQuickName(e.target.value)}
          placeholder="Nhập tên sinh viên..."
          className="flex-1 min-w-[160px] bg-black border border-zinc-700 px-3 py-1.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500 font-mono rounded-none placeholder:text-zinc-600"
        />
        <button
          type="submit"
          disabled={!quickName.trim()}
          className="px-3 py-1.5 bg-amber-500 text-black text-xs font-mono font-black uppercase hover:bg-amber-400 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed rounded-none"
        >
          +0.5 Điểm Thưởng
        </button>
      </form>

      {/* Leaderboard Table / Empty State */}
      {!entries || entries.length === 0 ? (
        <div className="w-full p-12 text-center bg-zinc-950">
          <p className="text-base font-mono text-zinc-500 uppercase tracking-wider">
            Chưa có dữ liệu ghi danh. Hãy là người đầu tiên tham gia!
          </p>
        </div>
      ) : (
        <div className="max-h-[65vh] overflow-y-auto overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-900 sticky top-0 z-10 border-b-2 border-zinc-700 shadow-md">
              <tr className="text-zinc-400 text-xs sm:text-sm font-mono uppercase tracking-wider">
                <th className="px-4 py-3.5 text-center w-14 border-r border-zinc-800">Hạng</th>
                <th className="px-4 py-3.5 border-r border-zinc-800">Sinh Viên</th>
                <th className="px-4 py-3.5 text-right border-r border-zinc-800">Điểm Game</th>
                <th className="px-4 py-3.5 text-center border-r border-zinc-800">Thưởng Seminar</th>
                <th className="px-3 py-3.5 text-center border-r border-zinc-800 hidden sm:table-cell">Ch.</th>
                <th className="px-4 py-3.5 text-right border-r border-zinc-800 hidden sm:table-cell">Thời gian</th>
                <th className="px-3 py-3.5 text-center w-28">Cộng Điểm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80 font-mono text-xs sm:text-sm">
              {entries.map((entry, index) => {
                const rank = index + 1;
                const isCurrentPlayer =
                  currentPlayerName &&
                  entry.name.toLowerCase() === currentPlayerName.toLowerCase();
                const bonus = Number(entry.bonusPoints ?? 0);

                let rowBg = "bg-zinc-950 hover:bg-zinc-900/70 transition-colors";
                if (rank === 1) rowBg = "bg-amber-500/10 hover:bg-amber-500/15";
                else if (rank === 2) rowBg = "bg-slate-400/10 hover:bg-slate-400/15";
                else if (rank === 3) rowBg = "bg-amber-700/10 hover:bg-amber-700/15";

                if (isCurrentPlayer) {
                  rowBg += " border-l-4 border-l-amber-500";
                }

                let rankDisplay: React.ReactNode = `#${rank}`;
                if (rank === 1) rankDisplay = "🥇 1";
                else if (rank === 2) rankDisplay = "🥈 2";
                else if (rank === 3) rankDisplay = "🥉 3";

                return (
                  <motion.tr
                    key={entry.id}
                    className={`${rowBg}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.02 }}
                  >
                    {/* Rank */}
                    <td className="px-4 py-3.5 text-center font-bold text-zinc-300 border-r border-zinc-800/80">
                      {rankDisplay}
                    </td>

                    {/* Student Name */}
                    <td className="px-4 py-3.5 font-bold text-zinc-100 border-r border-zinc-800/80">
                      <span className="text-sm sm:text-base">{entry.name}</span>
                      {isCurrentPlayer && (
                        <span className="ml-2 text-[10px] bg-amber-500 text-black font-black px-1.5 py-0.5 uppercase tracking-wider">
                          YOU
                        </span>
                      )}
                    </td>

                    {/* Game Score */}
                    <td className="px-4 py-3.5 text-right font-black text-emerald-400 text-sm sm:text-base border-r border-zinc-800/80">
                      {entry.score.toLocaleString()}
                    </td>

                    {/* Seminar Bonus Points (+0.5) */}
                    <td className="px-4 py-3.5 text-center border-r border-zinc-800/80">
                      {bonus > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500/20 border border-amber-500 text-amber-300 font-bold text-xs sm:text-sm">
                          ⭐ +{bonus}đ
                        </span>
                      ) : (
                        <span className="text-zinc-600">—</span>
                      )}
                    </td>

                    {/* Chapters Completed */}
                    <td className="px-3 py-3.5 text-center text-zinc-400 border-r border-zinc-800/80 hidden sm:table-cell">
                      {entry.chaptersCompleted}/6
                    </td>

                    {/* Time Elapsed */}
                    <td className="px-4 py-3.5 text-right text-zinc-400 border-r border-zinc-800/80 hidden sm:table-cell">
                      {formatTime(entry.timeSeconds)}
                    </td>

                    {/* +0.5 / -0.5 Action Buttons */}
                    <td className="px-3 py-3.5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleModifyBonus(entry.name, 0.5)}
                          disabled={isUpdating === entry.name}
                          title="Cộng 0.5 điểm phát biểu"
                          className="px-2 py-1 bg-amber-500/20 border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black active:scale-90 transition-all font-bold text-xs rounded-none"
                        >
                          +0.5
                        </button>
                        {bonus > 0 && (
                          <button
                            onClick={() => handleModifyBonus(entry.name, -0.5)}
                            disabled={isUpdating === entry.name}
                            title="Bớt 0.5 điểm"
                            className="px-1.5 py-1 bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-red-400 hover:border-red-500 active:scale-90 transition-all font-bold text-xs rounded-none"
                          >
                            -
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer Controls */}
      <div className="p-3 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
        <span className="text-zinc-500">
          Tổng cộng: <strong className="text-zinc-300">{entries.length}</strong> sinh viên
        </span>

        <button
          onClick={handleAdminReset}
          className="text-zinc-600 hover:text-red-400 transition-colors uppercase tracking-wider font-bold"
        >
          ⚙️ Admin Reset
        </button>
      </div>
    </div>
  );
}
