"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  GameState,
  SwipeDirection,
  Checkpoint,
  LeaderboardEntry,
} from "@/lib/game/gameTypes";
import {
  createInitialState,
  makeChoice,
  advanceChapter,
  skipTutorial,
  restoreCheckpoint,
  calculateScore,
  getChaptersCompleted,
  addInventoryItem,
  useBailout,
} from "@/lib/game/gameEngine";
import { getAvailableCheckpoints } from "@/lib/game/checkpointManager";
import { getCardForChapter } from "@/data/cards";
import { getChapter } from "@/data/chapters";

import GameCard, { GameCardHandle } from "@/components/game/GameCard";
import MetersDisplay from "@/components/game/MetersDisplay";
import ChapterProgress from "@/components/game/ChapterProgress";
import CheckpointSelector from "@/components/game/CheckpointSelector";
import DeathScreen from "@/components/game/DeathScreen";
import ResultScreen from "@/components/game/ResultScreen";
import ChapterSummary from "@/components/game/ChapterSummary";
import ShopModal from "@/components/game/ShopModal";
import KnowledgeCheckModal from "@/components/game/KnowledgeCheckModal";
import { getKnowledgeCheckForCard, KnowledgeCheck } from "@/data/knowledgeChecks";
import {
  saveGame,
  loadGame,
  clearSave,
  getPlayerName,
  startTimer,
  getElapsedSeconds,
} from "@/lib/game/storage";

type GamePhase =
  | "tutorial"
  | "playing"
  | "transitioning"
  | "knowledge_check"
  | "dead"
  | "eliminated"
  | "completed"
  | "chapter_summary";

function GamePageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "new";

  const [isMounted, setIsMounted] = useState(false);
  const [gameState, setGameState] = useState<GameState>(() => createInitialState(true));
  const [phase, setPhase] = useState<GamePhase>("tutorial");

  const [activeKnowledgeCheck, setActiveKnowledgeCheck] = useState<KnowledgeCheck | null>(null);
  const pendingNextStateRef = useRef<GameState | null>(null);

  const [isShopOpen, setIsShopOpen] = useState(false);
  const [resurrectNotice, setResurrectNotice] = useState(false);
  const [bailoutNotice, setBailoutNotice] = useState(false);

  const [cardKey, setCardKey] = useState(0);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const cardRef = useRef<GameCardHandle>(null);
  const isProcessing = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);
  const playerName = useRef<string>("");

  // Initialize on client mount
  useEffect(() => {
    setIsMounted(true);
    playerName.current = getPlayerName() || "Anonymous";

    if (mode === "continue") {
      const saved = loadGame();
      if (saved) {
        setGameState(saved.gameState);
        setPhase(saved.gameState.chapter === 0 ? "tutorial" : "playing");
      }
    } else {
      if (gameState.chapter > 0) {
        startTimer();
      }
    }

    // Start timer interval
    timerRef.current = setInterval(() => {
      setTimeSeconds(getElapsedSeconds());
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [mode]);

  // Auto-save when game state changes (only once out of tutorial)
  useEffect(() => {
    if (gameState.chapter > 0 && (gameState.status === "playing" || gameState.status === "chapter_complete")) {
      saveGame(playerName.current, gameState);
    }
  }, [gameState]);

  const card = getCardForChapter(gameState.chapter, gameState.cardIndex);
  const chapterInfo = getChapter(gameState.chapter);
  const isOracleActive = Boolean(gameState.inventory?.isOracleActive);

  // Handle choice animation complete
  const handleChoiceAnimationComplete = useCallback(
    (direction: SwipeDirection) => {
      if (!card) return;

      const previousHearts = gameState.inventory?.extraHearts || 0;
      const nextState = makeChoice(gameState, card, direction);

      // Check if Extra Heart saved player from death
      if (previousHearts > (nextState.inventory?.extraHearts || 0) && nextState.status === "playing") {
        setResurrectNotice(true);
        setTimeout(() => setResurrectNotice(false), 4000);
      }

      // If player died, handle death immediately
      if (nextState.status === "dead" || nextState.status === "eliminated") {
        setTimeout(() => {
          setGameState(nextState);
          setPhase(nextState.status === "dead" ? "dead" : "eliminated");
          isProcessing.current = false;
        }, 100);
        return;
      }

      // Check if a conceptual Knowledge Check is triggered after this card
      const check = getKnowledgeCheckForCard(gameState.chapter, gameState.cardIndex);
      if (check) {
        pendingNextStateRef.current = nextState;
        setTimeout(() => {
          setActiveKnowledgeCheck(check);
          setPhase("knowledge_check");
          isProcessing.current = false;
        }, 200);
        return;
      }

      setTimeout(() => {
        setGameState(nextState);

        // If transitioning from tutorial to chapter 1, start timer
        if (gameState.chapter === 0 && nextState.chapter === 1) {
          startTimer();
        }

        if (nextState.status === "completed") {
          setPhase("completed");
          if (timerRef.current) clearInterval(timerRef.current);
        } else if (nextState.status === "chapter_complete") {
          setPhase("chapter_summary");
        } else if (nextState.status === "tutorial") {
          setCardKey((k) => k + 1);
          setPhase("tutorial");
        } else {
          setCardKey((k) => k + 1);
          setPhase("playing");
        }

        isProcessing.current = false;
      }, 100);
    },
    [gameState, card]
  );

  // Handle Knowledge Check completion
  const handleCompleteKnowledgeCheck = useCallback(
    (isCorrect: boolean) => {
      const nextState = pendingNextStateRef.current;
      if (!nextState) {
        setActiveKnowledgeCheck(null);
        setPhase("playing");
        return;
      }

      // Reward player on correct answer: grant +2 Oracle Charges
      if (isCorrect && nextState.inventory) {
        nextState.inventory = {
          ...nextState.inventory,
          oracleCharges: (nextState.inventory.oracleCharges || 0) + 2,
          isOracleActive: true,
        };
      }

      setGameState(nextState);
      setActiveKnowledgeCheck(null);

      // If transitioning from tutorial to chapter 1, start timer
      if (gameState.chapter === 0 && nextState.chapter === 1) {
        startTimer();
      }

      if (nextState.status === "completed") {
        setPhase("completed");
        if (timerRef.current) clearInterval(timerRef.current);
      } else if (nextState.status === "chapter_complete") {
        setPhase("chapter_summary");
      } else if (nextState.status === "tutorial") {
        setCardKey((k) => k + 1);
        setPhase("tutorial");
      } else {
        setCardKey((k) => k + 1);
        setPhase("playing");
      }
    },
    [gameState.chapter]
  );

  // Skip tutorial directly to chapter 1
  const handleSkipTutorial = useCallback(() => {
    startTimer();
    const nextState = skipTutorial(gameState);
    setGameState(nextState);
    setCardKey((k) => k + 1);
    setPhase("playing");
    isProcessing.current = false;
  }, [gameState]);

  // Shop item management
  const handleBuyItem = useCallback((item: "oracle" | "extraHeart" | "bailout") => {
    setGameState((prev) => addInventoryItem(prev, item));
  }, []);

  const handleUseBailout = useCallback(() => {
    setGameState((prev) => useBailout(prev));
    setIsShopOpen(false);
    setBailoutNotice(true);
    setTimeout(() => setBailoutNotice(false), 4000);
  }, []);

  // Continue to next chapter
  const handleContinueChapter = useCallback(() => {
    const nextState = advanceChapter(gameState);
    setGameState(nextState);
    setCardKey((k) => k + 1);
    setPhase("playing");
    isProcessing.current = false;
  }, [gameState]);

  // Save and quit
  const handleSaveQuit = useCallback(() => {
    saveGame(playerName.current, gameState);
    router.push("/");
  }, [gameState, router]);

  // Restore checkpoint
  const handleRestoreCheckpoint = useCallback(
    (checkpoint: Checkpoint) => {
      const restored = restoreCheckpoint(gameState, checkpoint);
      setGameState((prev) => ({
        ...restored,
        checkpoints: prev.checkpoints,
      }));
      setCardKey((k) => k + 1);
      setPhase("playing");
      isProcessing.current = false;
    },
    [gameState]
  );

  // View results after elimination
  const handleViewResults = useCallback(() => {
    setPhase("completed");
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  // Submit score to leaderboard
  const handleSubmitScore = useCallback(async () => {
    if (isSubmitting || isSubmitted) return;
    setIsSubmitting(true);

    try {
      const score = calculateScore(
        gameState.meters,
        getChaptersCompleted(gameState)
      );

      const payload: Omit<LeaderboardEntry, "id" | "submittedAt"> = {
        name: playerName.current,
        score,
        chaptersCompleted: getChaptersCompleted(gameState),
        timeSeconds: getElapsedSeconds(),
        finalMeters: gameState.meters,
      };

      const res = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsSubmitted(true);
        clearSave();
      }
    } catch (error) {
      console.error("Failed to submit score:", error);
    }

    setIsSubmitting(false);
  }, [gameState, isSubmitting, isSubmitted]);

  // Play again
  const handlePlayAgain = useCallback(() => {
    clearSave();
    const fresh = createInitialState(true);
    setGameState(fresh);
    setCardKey((k) => k + 1);
    setPhase("tutorial");
    setTimeSeconds(0);
    setIsSubmitted(false);
    setIsSubmitting(false);
    isProcessing.current = false;
  }, []);

  const handleMainMenu = useCallback(() => {
    router.push("/");
  }, [router]);

  const isCardInteractive = phase === "playing" || phase === "tutorial";
  const isTutorialMode = gameState.chapter === 0;
  const availableCheckpoints = getAvailableCheckpoints(
    gameState.checkpoints,
    gameState.chapter
  );

  // Format time as MM:SS
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  if (!isMounted) {
    return (
      <div className="min-h-dvh bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full" />
      </div>
    );
  }

  const totalInventoryItems =
    (gameState.inventory?.oracleCharges ? 1 : 0) +
    (gameState.inventory?.extraHearts || 0) +
    (gameState.inventory?.bailoutCount || 0);

  return (
    <div className="relative min-h-dvh bg-zinc-950 text-white flex flex-col overflow-hidden notranslate" translate="no">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between pt-4 pb-1 px-4">
        <button
          onClick={handleMainMenu}
          className="text-zinc-600 hover:text-zinc-400 transition-colors p-1"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Shop Button */}
        <button
          onClick={() => setIsShopOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-900/90 border border-amber-500/30 hover:border-amber-500/60 active:scale-95 transition-all shadow-md group"
        >
          <span className="text-sm group-hover:scale-110 transition-transform">🛒</span>
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
            Cửa hàng
          </span>
          {totalInventoryItems > 0 && (
            <span className="ml-1 w-4 h-4 rounded-full bg-amber-500 text-black text-[9px] font-black flex items-center justify-center">
              {totalInventoryItems}
            </span>
          )}
        </button>

        <div className="text-right">
          {isTutorialMode ? (
            <button
              onClick={handleSkipTutorial}
              className="text-[11px] font-bold text-amber-400 hover:text-amber-300 uppercase tracking-wider bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-lg transition-colors"
            >
              Skip ➔
            </button>
          ) : (
            <div>
              <p className="text-[10px] uppercase tracking-wider text-zinc-600">Time</p>
              <p className="text-sm font-mono text-zinc-400 tabular-nums">
                {formatTime(timeSeconds)}
              </p>
            </div>
          )}
        </div>
      </header>

      {/* Floating Notices for Extra Heart / Bailout */}
      <AnimatePresence>
        {resurrectNotice && (
          <motion.div
            key="notice-resurrect"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl bg-pink-500/20 border border-pink-500 text-pink-200 text-xs font-bold shadow-2xl flex items-center gap-2 backdrop-blur-md"
          >
            <span>❤️</span> Extra Heart kích hoạt (Hồi sinh 50%)
          </motion.div>
        )}

        {bailoutNotice && (
          <motion.div
            key="notice-bailout"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl bg-amber-500/20 border border-amber-500 text-amber-200 text-xs font-bold shadow-2xl flex items-center gap-2 backdrop-blur-md"
          >
            <span>🏦</span> Gói cứu trợ Fed kích hoạt (Cân bằng 50%)
          </motion.div>
        )}

        {isOracleActive && (
          <motion.div
            key="notice-oracle"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative z-10 mx-auto mt-0.5 px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold flex items-center gap-1.5 shadow-sm"
          >
            <span>👁️</span> Thuốc Tiên Tri ({gameState.inventory?.oracleCharges} lượt)
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chapter progress */}
      <div className="relative z-10 px-4 py-1">
        <ChapterProgress chapter={gameState.chapter} cardIndex={gameState.cardIndex} />
      </div>

      {/* Meters */}
      <div className="relative z-10 px-4 py-1">
        <MetersDisplay meters={gameState.meters} />
      </div>

      {/* Card area */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-1">
        <AnimatePresence mode="wait">
          {card &&
            phase !== "dead" &&
            phase !== "eliminated" &&
            phase !== "completed" &&
            phase !== "chapter_summary" && (
              <motion.div
                key={cardKey}
                className="w-full flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <GameCard
                  ref={cardRef}
                  card={card}
                  onChoice={handleChoiceAnimationComplete}
                  disabled={!isCardInteractive}
                  showEffects={isOracleActive}
                />
              </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* ── Overlays ────────────────────────────────────── */}
      <AnimatePresence>
        {/* Knowledge Check Modal */}
        {phase === "knowledge_check" && activeKnowledgeCheck && (
          <KnowledgeCheckModal
            key={`overlay-kc-${activeKnowledgeCheck.id}`}
            check={activeKnowledgeCheck}
            onComplete={handleCompleteKnowledgeCheck}
          />
        )}

        {/* Shop Modal */}
        {isShopOpen && (
          <ShopModal
            key="overlay-shop"
            inventory={gameState.inventory || { oracleCharges: 0, isOracleActive: false, extraHearts: 0, bailoutCount: 0, extraHeartPurchases: 0, bailoutPurchases: 0 }}
            onClose={() => setIsShopOpen(false)}
            onBuyItem={handleBuyItem}
            onUseBailout={handleUseBailout}
          />
        )}

        {/* Chapter Summary */}
        {phase === "chapter_summary" && chapterInfo && (
          <ChapterSummary
            key={`overlay-summary-${gameState.chapter}`}
            chapterInfo={chapterInfo}
            onContinue={handleContinueChapter}
            onSaveQuit={handleSaveQuit}
          />
        )}

        {/* Dead with checkpoints */}
        {phase === "dead" && availableCheckpoints.length > 0 && (
          <CheckpointSelector
            key="overlay-checkpoint"
            checkpoints={availableCheckpoints}
            onSelect={handleRestoreCheckpoint}
          />
        )}

        {/* Dead without checkpoints OR eliminated */}
        {((phase === "dead" && availableCheckpoints.length === 0) ||
          phase === "eliminated") && (
          <DeathScreen
            key="overlay-death"
            failedMeter={gameState.failedMeter}
            chapterReached={gameState.chapter}
            onViewResults={handleViewResults}
          />
        )}

        {/* Results */}
        {phase === "completed" && (
          <ResultScreen
            key="overlay-result"
            gameState={gameState}
            timeSeconds={timeSeconds}
            onPlayAgain={handlePlayAgain}
            onMainMenu={handleMainMenu}
            onSubmitScore={handleSubmitScore}
            isSubmitting={isSubmitting}
            isSubmitted={isSubmitted}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function GamePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-dvh bg-zinc-950 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full" />
        </div>
      }
    >
      <GamePageInner />
    </Suspense>
  );
}
