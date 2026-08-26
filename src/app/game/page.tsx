"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  GameState,
  SwipeDirection,
  Checkpoint,
} from "@/lib/game/gameTypes";
import {
  createInitialState,
  makeChoice,
  restoreCheckpoint,
} from "@/lib/game/gameEngine";
import { getAvailableCheckpoints } from "@/lib/game/checkpointManager";
import { getCardForDay } from "@/data/cards";

import GameCard, { GameCardHandle } from "@/components/game/GameCard";
import ProgressBar from "@/components/game/ProgressBar";
import DayIndicator from "@/components/game/DayIndicator";
import ChoiceButton from "@/components/game/ChoiceButton";
import CheckpointSelector from "@/components/game/CheckpointSelector";
import DeathScreen from "@/components/game/DeathScreen";
import ResultScreen from "@/components/game/ResultScreen";

type GamePhase = "playing" | "transitioning" | "dead" | "eliminated" | "completed";

export default function GamePage() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>(createInitialState);
  const [phase, setPhase] = useState<GamePhase>("playing");
  const [cardKey, setCardKey] = useState(0);
  const cardRef = useRef<GameCardHandle>(null);
  const isProcessing = useRef(false);

  const card = getCardForDay(gameState.day);

  // Called after the card exit animation completes (from swipe or button trigger)
  const handleChoiceAnimationComplete = useCallback(
    (direction: SwipeDirection) => {
      if (!card) return;

      const nextState = makeChoice(gameState, card, direction);

      // Small delay to let exit animation finish visually
      setTimeout(() => {
        setGameState(nextState);

        if (nextState.status === "dead") {
          setPhase("dead");
        } else if (nextState.status === "eliminated") {
          setPhase("eliminated");
        } else if (nextState.status === "completed") {
          setPhase("completed");
        } else {
          setCardKey((k) => k + 1);
          setPhase("playing");
        }

        isProcessing.current = false;
      }, 100);
    },
    [gameState, card]
  );

  // Button click → trigger the card's exit animation via ref
  const handleButtonClick = useCallback(
    (direction: SwipeDirection) => {
      if (isProcessing.current || !card || !cardRef.current) return;
      isProcessing.current = true;
      setPhase("transitioning");
      cardRef.current.triggerChoice(direction);
    },
    [card]
  );

  const handleRestoreCheckpoint = useCallback((checkpoint: Checkpoint) => {
    const restored = restoreCheckpoint(
      { day: 0, progress: 0, checkpoints: [], status: "dead" as const },
      checkpoint
    );
    setGameState((prev) => ({
      ...restored,
      checkpoints: prev.checkpoints,
    }));
    setCardKey((k) => k + 1);
    setPhase("playing");
    isProcessing.current = false;
  }, []);

  const handleEliminated = useCallback(() => {
    setPhase("completed");
  }, []);

  const handlePlayAgain = useCallback(() => {
    setGameState(createInitialState());
    setCardKey((k) => k + 1);
    setPhase("playing");
    isProcessing.current = false;
  }, []);

  const handleMainMenu = useCallback(() => {
    router.push("/");
  }, [router]);

  const isCardInteractive = phase === "playing";
  const availableCheckpoints = getAvailableCheckpoints(gameState.checkpoints, gameState.day);

  return (
    <div className="relative min-h-dvh bg-zinc-950 text-white flex flex-col overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex flex-col items-center pt-6 pb-2 px-4 space-y-3">
        <h1 className="text-lg font-black tracking-[0.3em] text-zinc-300 uppercase">
          Lapse
        </h1>
        <DayIndicator day={gameState.day} />
      </header>

      {/* Progress bar */}
      <div className="relative z-10 px-6 py-3">
        <ProgressBar progress={gameState.progress} />
      </div>

      {/* Card area */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-4">
        <AnimatePresence mode="wait">
          {card && phase !== "dead" && phase !== "eliminated" && phase !== "completed" && (
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
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom buttons */}
      {card && (phase === "playing" || phase === "transitioning") && (
        <div className="relative z-10 px-6 pb-8 pt-2 flex gap-3">
          <ChoiceButton
            direction="left"
            label={card.leftChoice}
            onChoose={handleButtonClick}
            disabled={!isCardInteractive}
          />
          <ChoiceButton
            direction="right"
            label={card.rightChoice}
            onChoose={handleButtonClick}
            disabled={!isCardInteractive}
          />
        </div>
      )}

      {/* Overlays */}
      <AnimatePresence>
        {phase === "dead" && availableCheckpoints.length > 0 && (
          <CheckpointSelector
            checkpoints={availableCheckpoints}
            onSelect={handleRestoreCheckpoint}
          />
        )}

        {(phase === "dead" && availableCheckpoints.length === 0) || phase === "eliminated" ? (
          <DeathScreen
            dayReached={gameState.day}
            onEliminated={handleEliminated}
          />
        ) : null}

        {phase === "completed" && (
          <ResultScreen
            gameState={gameState}
            onPlayAgain={handlePlayAgain}
            onMainMenu={handleMainMenu}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
