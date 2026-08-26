"use client";

import { motion } from "framer-motion";
import { Checkpoint } from "@/lib/game/gameTypes";

type CheckpointSelectorProps = {
  checkpoints: Checkpoint[];
  onSelect: (checkpoint: Checkpoint) => void;
};

export default function CheckpointSelector({
  checkpoints,
  onSelect,
}: CheckpointSelectorProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-full max-w-md mx-4 space-y-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
      >
        {/* Title */}
        <div className="text-center space-y-3">
          <motion.p
            className="text-xs uppercase tracking-[0.4em] text-red-500/80 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Crisis Collapsed
          </motion.p>
          <motion.h1
            className="text-3xl font-black text-white tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            YOUR CRISIS HAS COLLAPSED
          </motion.h1>
          <motion.div
            className="w-16 h-0.5 bg-gradient-to-r from-transparent via-red-500/60 to-transparent mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          />
          <motion.p
            className="text-sm text-zinc-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            Choose a checkpoint to continue.
          </motion.p>
        </div>

        {/* Checkpoint cards */}
        <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
          {checkpoints.map((cp, i) => (
            <motion.button
              key={cp.day}
              onClick={() => onSelect(cp)}
              className="
                w-full p-4 rounded-xl text-left transition-all duration-200
                bg-zinc-800/70 border border-zinc-700/50
                hover:bg-zinc-700/70 hover:border-amber-500/40
                active:scale-[0.98]
                group
              "
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + Math.min(i, 5) * 0.1, duration: 0.4 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 group-hover:text-amber-500/60 transition-colors">
                    Checkpoint
                  </p>
                  <p className="text-lg font-bold text-white">
                    Day {String(cp.day).padStart(2, "0")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                    Progress
                  </p>
                  <p className="text-lg font-bold text-amber-400">
                    {Math.round(cp.progress)}%
                  </p>
                </div>
                <div className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-5 h-5 text-amber-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Mini progress bar */}
              <div className="mt-2 h-1.5 rounded-full bg-zinc-700/50 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-400"
                  style={{ width: `${cp.progress}%` }}
                />
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
