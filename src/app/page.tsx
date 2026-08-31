"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { LeaderboardEntry } from "@/lib/game/gameTypes";
import { getPlayerName, savePlayerName, hasSavedGame } from "@/lib/game/storage";
import Leaderboard from "@/components/game/Leaderboard";

type ModalType = "howToPlay" | "nameInput" | "leaderboard" | null;

export default function MainMenu() {
  const [modal, setModal] = useState<ModalType>(null);
  const [playerName, setPlayerName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [hasSave, setHasSave] = useState(false);
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);

  useEffect(() => {
    const saved = getPlayerName();
    if (saved) setPlayerName(saved);
    setHasSave(hasSavedGame());
  }, []);

  const fetchLeaderboard = useCallback(async () => {
    setLeaderboardLoading(true);
    try {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();
      setLeaderboardEntries(data.entries || []);
    } catch {
      setLeaderboardEntries([]);
    }
    setLeaderboardLoading(false);
  }, []);

  const handleOpenLeaderboard = () => {
    setModal("leaderboard");
    fetchLeaderboard();
  };

  const handlePlayClick = () => {
    if (!playerName) {
      setModal("nameInput");
    }
    // If name exists, the Link will navigate
  };

  const handleNameSubmit = () => {
    const trimmed = nameInput.trim();
    if (trimmed.length < 2) return;
    savePlayerName(trimmed);
    setPlayerName(trimmed);
    setModal(null);
  };

  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="fixed inset-0 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(251,191,36,0.04)_0%,_transparent_70%)]" />

      {/* Subtle animated particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-amber-500/20 animate-pulse"
            style={{
              left: `${10 + i * 11}%`,
              top: `${15 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${2 + i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-sm">
        {/* Logo */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl sm:text-6xl font-black tracking-[0.3em] text-white mb-3">
            LAPSE
          </h1>
          <motion.div
            className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500/80 to-transparent mx-auto mb-4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          />
          <motion.p
            className="text-[10px] uppercase tracking-[0.35em] text-zinc-500 mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Survive the 2008 Crisis
          </motion.p>
          <motion.p
            className="text-[9px] uppercase tracking-[0.2em] text-zinc-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            Monetary & Financial Theory — Topic 2
          </motion.p>
        </motion.div>

        {/* Player name display */}
        {playerName && (
          <motion.div
            className="mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">
              Welcome back
            </p>
            <p className="text-sm font-semibold text-amber-400">
              {playerName}
            </p>
          </motion.div>
        )}

        {/* Menu buttons */}
        <motion.div
          className="w-full space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          {/* Play / New Game */}
          {playerName ? (
            <Link href="/game?mode=new" className="block">
              <button className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-[0.25em] bg-amber-500 text-black hover:bg-amber-400 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-amber-500/20">
                {hasSave ? "New Game" : "Play"}
              </button>
            </Link>
          ) : (
            <button
              onClick={handlePlayClick}
              className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-[0.25em] bg-amber-500 text-black hover:bg-amber-400 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-amber-500/20"
            >
              Play
            </button>
          )}

          {/* Continue (if save exists) */}
          {hasSave && playerName && (
            <Link href="/game?mode=continue" className="block">
              <button className="w-full py-3.5 rounded-xl text-sm font-semibold uppercase tracking-[0.2em] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 active:scale-[0.98] transition-all duration-200">
                Continue
              </button>
            </Link>
          )}

          {/* Leaderboard */}
          <button
            onClick={handleOpenLeaderboard}
            className="w-full py-3.5 rounded-xl text-sm font-semibold uppercase tracking-[0.2em] bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 hover:bg-zinc-700/80 hover:text-white hover:border-zinc-600 active:scale-[0.98] transition-all duration-200"
          >
            🏆 Leaderboard
          </button>

          {/* How to Play */}
          <button
            onClick={() => setModal("howToPlay")}
            className="w-full py-3.5 rounded-xl text-sm font-semibold uppercase tracking-[0.2em] bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 hover:bg-zinc-700/80 hover:text-white hover:border-zinc-600 active:scale-[0.98] transition-all duration-200"
          >
            How to Play
          </button>
        </motion.div>

        {/* Version tag */}
        <motion.p
          className="mt-10 text-[10px] uppercase tracking-widest text-zinc-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          v1.0 — The 2008 Global Financial Crisis
        </motion.p>
      </div>

      {/* ── Modals ───────────────────────────────────────── */}
      <AnimatePresence>
        {/* How to Play */}
        {modal === "howToPlay" && (
          <Modal key="modal-howToPlay" onClose={() => setModal(null)} title="How to Play">
            <div className="space-y-4 text-sm text-zinc-400 leading-relaxed">
              <p>
                You are a <span className="text-white font-semibold">financial policymaker</span> navigating
                the <span className="text-amber-400">2008 Global Financial Crisis</span>.
              </p>
              <p>
                Each scenario presents a dilemma.{" "}
                <span className="text-amber-400">Swipe left or right</span> (or click the buttons) to make your choice.
              </p>
              <div className="bg-zinc-800/50 rounded-lg p-3 space-y-2">
                <p className="text-white font-semibold text-xs uppercase tracking-wider mb-2">
                  4 Meters to Balance:
                </p>
                <p>💰 <span className="text-green-400">Economy</span> — GDP, markets, growth</p>
                <p>👥 <span className="text-blue-400">Public Trust</span> — Confidence & stability</p>
                <p>🏛️ <span className="text-purple-400">Policy Power</span> — Political capital</p>
                <p>🏦 <span className="text-amber-400">Banking Health</span> — System stability</p>
              </div>
              <p>
                If <span className="text-red-400">ANY meter hits 0 or 100</span>, you fail!
                Keep all four balanced to survive.
              </p>
              <p>
                Navigate <span className="text-white font-semibold">6 chapters</span> (36 decisions) from the housing
                bubble to regulatory reform.
              </p>
              <p>
                <span className="text-white font-semibold">Checkpoints</span> save automatically between chapters.
                Your <span className="text-amber-400">time</span> is tracked for the leaderboard!
              </p>
            </div>
          </Modal>
        )}

        {/* Name Input */}
        {modal === "nameInput" && (
          <Modal key="modal-nameInput" onClose={() => setModal(null)} title="Enter Your Name">
            <div className="space-y-4">
              <p className="text-sm text-zinc-400">
                Your name will appear on the class leaderboard.
              </p>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                placeholder="Enter your full name..."
                maxLength={30}
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all"
              />
              <button
                onClick={handleNameSubmit}
                disabled={nameInput.trim().length < 2}
                className="w-full py-3 rounded-xl text-sm font-bold uppercase tracking-wider bg-amber-500 text-black hover:bg-amber-400 active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Start Playing
              </button>
            </div>
          </Modal>
        )}

        {/* Leaderboard */}
        {modal === "leaderboard" && (
          <Modal key="modal-leaderboard" onClose={() => setModal(null)} title="🏆 Leaderboard">
            {leaderboardLoading ? (
              <div className="py-8 text-center text-zinc-500">
                <div className="animate-spin w-6 h-6 border-2 border-amber-500/30 border-t-amber-500 rounded-full mx-auto mb-3" />
                Loading...
              </div>
            ) : (
              <Leaderboard
                entries={leaderboardEntries}
                currentPlayerName={playerName}
              />
            )}
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
        className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto"
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
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}
