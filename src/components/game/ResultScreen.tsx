"use client";

import { motion } from "framer-motion";
import { GameState } from "@/lib/game/gameTypes";
import { calculateScore } from "@/lib/game/gameEngine";

type ResultScreenProps = {
  gameState: GameState;
  onPlayAgain: () => void;
  onMainMenu: () => void;
};

export default function ResultScreen({
  gameState,
  onPlayAgain,
  onMainMenu,
}: ResultScreenProps) {
  const isCompleted = gameState.status === "completed";
  const daysSurvived = gameState.day;
  const score = calculateScore(gameState.progress, daysSurvived);

  const stats = [
    {
      label: "Final Progress",
      value: `${Math.round(gameState.progress)}%`,
    },
    {
      label: "Days Survived",
      value: `${daysSurvived}`,
    },
    {
      label: "Checkpoints Reached",
      value: `${gameState.checkpoints.length}`,
    },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="w-full max-w-sm mx-4 space-y-8 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        {/* Header */}
        <div className="space-y-3">
          {isCompleted ? (
            <>
              <motion.div
                className="text-5xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              >
                🏆
              </motion.div>
              <motion.h1
                className="text-3xl font-black text-white tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                CRISIS SURVIVED
              </motion.h1>
              <motion.div
                className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent mx-auto"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              />
            </>
          ) : (
            <>
              <motion.h1
                className="text-3xl font-black text-white tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                YOU WERE ELIMINATED
              </motion.h1>
              <motion.div
                className="w-16 h-0.5 bg-gradient-to-r from-transparent via-red-500/60 to-transparent mx-auto"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              />
            </>
          )}
        </div>

        {/* Stats */}
        <div className="space-y-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/60 border border-zinc-700/40"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 + i * 0.15 }}
            >
              <span className="text-xs uppercase tracking-widest text-zinc-500">
                {stat.label}
              </span>
              <span className="text-lg font-bold text-white">{stat.value}</span>
            </motion.div>
          ))}
        </div>

        {/* Score */}
        <motion.div
          className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.4 }}
        >
          <p className="text-[10px] uppercase tracking-[0.4em] text-amber-500/60 mb-1">
            Temporary Prototype Score
          </p>
          <p className="text-4xl font-black text-amber-400 tabular-nums">
            {score.toLocaleString()}
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <button
            onClick={onPlayAgain}
            className="
              w-full py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider
              bg-amber-500 text-black
              hover:bg-amber-400 active:scale-[0.98]
              transition-all duration-200
            "
          >
            Play Again
          </button>
          <button
            onClick={onMainMenu}
            className="
              w-full py-3 rounded-xl text-sm font-semibold uppercase tracking-wider
              bg-zinc-800/80 border border-zinc-700/50 text-zinc-300
              hover:bg-zinc-700/80 hover:text-white
              active:scale-[0.98]
              transition-all duration-200
            "
          >
            Main Menu
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
