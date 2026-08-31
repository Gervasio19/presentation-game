"use client";

import { motion } from "framer-motion";
import { FailedMeter, METER_INFO } from "@/lib/game/gameTypes";

type DeathScreenProps = {
  failedMeter?: FailedMeter;
  chapterReached: number;
  onViewResults: () => void;
};

export default function DeathScreen({
  failedMeter,
  chapterReached,
  onViewResults,
}: DeathScreenProps) {
  const info = failedMeter ? METER_INFO[failedMeter.key] : null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="w-full max-w-sm text-center space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {/* Skull icon */}
        <motion.div
          className="text-5xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        >
          💀
        </motion.div>

        <motion.h1
          className="text-3xl font-black text-white tracking-tight"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          YOU WERE ELIMINATED
        </motion.h1>

        <motion.div
          className="w-16 h-0.5 bg-gradient-to-r from-transparent via-red-500/60 to-transparent mx-auto"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        />

        <motion.p
          className="text-zinc-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          You reached Chapter {chapterReached}
        </motion.p>

        {/* Failed meter explanation */}
        {failedMeter && info && (
          <motion.div
            className="bg-red-500/10 border border-red-500/30 rounded-xl p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="text-3xl mb-2">{info.icon}</div>
            <p className="text-white font-bold">
              {info.label} reached{" "}
              {failedMeter.direction === "too_low" ? "0%" : "100%"}
            </p>
            <p className="text-red-300/80 text-sm mt-1">
              {failedMeter.direction === "too_low"
                ? info.lowDescription
                : info.highDescription}
            </p>
          </motion.div>
        )}

        <motion.button
          onClick={onViewResults}
          className="w-full mt-4 px-8 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider bg-zinc-800 border border-zinc-700 text-white hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-200 active:scale-95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          View Results
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
