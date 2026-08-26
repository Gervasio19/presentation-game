"use client";

import { motion } from "framer-motion";

type DeathScreenProps = {
  dayReached: number;
  onEliminated: () => void;
};

/**
 * Shown when the player dies with NO checkpoints available.
 * Transitions to the eliminated result screen.
 */
export default function DeathScreen({ dayReached, onEliminated }: DeathScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="text-center space-y-6 px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <motion.p
          className="text-xs uppercase tracking-[0.4em] text-red-500/80 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          No Checkpoints Available
        </motion.p>

        <motion.h1
          className="text-4xl font-black text-white tracking-tight"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          YOU WERE ELIMINATED
        </motion.h1>

        <motion.div
          className="w-16 h-0.5 bg-gradient-to-r from-transparent via-red-500/60 to-transparent mx-auto"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        />

        <motion.p
          className="text-zinc-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          You reached Day {String(dayReached).padStart(2, "0")} before falling.
        </motion.p>

        <motion.button
          onClick={onEliminated}
          className="
            mt-4 px-8 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider
            bg-zinc-800 border border-zinc-700 text-white
            hover:bg-zinc-700 hover:border-zinc-600
            transition-all duration-200 active:scale-95
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          View Results
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
