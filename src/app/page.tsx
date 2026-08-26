"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type ModalType = "howToPlay" | "settings" | null;

export default function MainMenu() {
  const [modal, setModal] = useState<ModalType>(null);

  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="fixed inset-0 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(251,191,36,0.04)_0%,_transparent_70%)]" />

      {/* Subtle animated particles (CSS-only) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-amber-500/20 animate-pulse"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${2 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-sm">
        {/* Logo */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-6xl font-black tracking-[0.3em] text-white mb-3">
            LAPSE
          </h1>
          <motion.div
            className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500/80 to-transparent mx-auto mb-4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          />
          <motion.p
            className="text-xs uppercase tracking-[0.35em] text-zinc-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Survive the Crisis
          </motion.p>
        </motion.div>

        {/* Menu buttons */}
        <motion.div
          className="w-full space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <Link href="/game" className="block">
            <button className="
              w-full py-4 rounded-xl text-sm font-bold uppercase tracking-[0.25em]
              bg-amber-500 text-black
              hover:bg-amber-400 active:scale-[0.98]
              transition-all duration-200
              shadow-lg shadow-amber-500/20
            ">
              Play
            </button>
          </Link>

          <button
            onClick={() => setModal("howToPlay")}
            className="
              w-full py-3.5 rounded-xl text-sm font-semibold uppercase tracking-[0.2em]
              bg-zinc-800/80 border border-zinc-700/50 text-zinc-300
              hover:bg-zinc-700/80 hover:text-white hover:border-zinc-600
              active:scale-[0.98]
              transition-all duration-200
            "
          >
            How to Play
          </button>

          <button
            onClick={() => setModal("settings")}
            className="
              w-full py-3.5 rounded-xl text-sm font-semibold uppercase tracking-[0.2em]
              bg-zinc-800/80 border border-zinc-700/50 text-zinc-300
              hover:bg-zinc-700/80 hover:text-white hover:border-zinc-600
              active:scale-[0.98]
              transition-all duration-200
            "
          >
            Settings
          </button>
        </motion.div>

        {/* Version tag */}
        <motion.p
          className="mt-12 text-[10px] uppercase tracking-widest text-zinc-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          Prototype v0.1
        </motion.p>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {modal === "howToPlay" && (
          <Modal onClose={() => setModal(null)} title="How to Play">
            <div className="space-y-4 text-sm text-zinc-400 leading-relaxed">
              <p>
                <span className="text-white font-semibold">Survive 10 days</span> of
                escalating crisis by making critical decisions.
              </p>
              <p>
                Each day presents a dilemma card. <span className="text-amber-400">Swipe left or right</span> to
                choose — or use the buttons below the card.
              </p>
              <p>
                Your <span className="text-amber-400">progress meter</span> reflects the
                state of your crisis. Every decision shifts it. If progress
                reaches zero, you fail.
              </p>
              <p>
                <span className="text-white font-semibold">Checkpoints</span> are saved
                automatically every day. When you fail, choose any previous day to
                rewind time and try a different path.
              </p>
              <p>
                Reach <span className="text-white font-semibold">Day 10</span> with the
                highest possible progress to maximize your score.
              </p>
            </div>
          </Modal>
        )}

        {modal === "settings" && (
          <Modal onClose={() => setModal(null)} title="Settings">
            <div className="space-y-4 text-sm text-zinc-500">
              <p className="text-center py-8">
                Settings will be available in a future update.
              </p>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Modal Component ──────────────────────────────────────────

function Modal({
  onClose,
  title,
  children,
}: {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-white tracking-wide">{title}</h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors p-1"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}
