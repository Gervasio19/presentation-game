"use client";

import { motion } from "framer-motion";

type ProgressBarProps = {
  progress: number; // 0–100
};

export default function ProgressBar({ progress }: ProgressBarProps) {
  const isLow = progress <= 25;
  const isCritical = progress <= 10;

  return (
    <div className="w-full px-1">
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-semibold">
          Progress
        </p>
        <p
          className={`text-sm font-bold tabular-nums transition-colors duration-500 ${
            isCritical
              ? "text-red-400"
              : isLow
              ? "text-amber-400"
              : "text-zinc-300"
          }`}
        >
          {Math.round(progress)}%
        </p>
      </div>

      {/* Track */}
      <div className="relative h-3 rounded-full bg-zinc-800/80 overflow-hidden border border-zinc-700/50">
        {/* Fill */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: isCritical
              ? "linear-gradient(90deg, #dc2626, #f87171)"
              : isLow
              ? "linear-gradient(90deg, #d97706, #fbbf24)"
              : "linear-gradient(90deg, #d97706, #f59e0b, #fbbf24)",
          }}
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />

        {/* Shine overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
