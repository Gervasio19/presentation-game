"use client";

import { useCallback, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { CardData, SwipeDirection } from "@/lib/game/gameTypes";

export type GameCardHandle = {
  triggerChoice: (direction: SwipeDirection) => void;
};

type GameCardProps = {
  card: CardData;
  onChoice: (direction: SwipeDirection) => void;
  disabled: boolean;
};

const SWIPE_THRESHOLD = 100;
const EXIT_X = 600;

const GameCard = forwardRef<GameCardHandle, GameCardProps>(
  function GameCard({ card, onChoice, disabled }, ref) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
    const leftOpacity = useTransform(x, [-SWIPE_THRESHOLD, 0], [1, 0]);
    const rightOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1]);
    const hasCommitted = useRef(false);

    // Reset when card identity changes
    useEffect(() => {
      hasCommitted.current = false;
      x.set(0);
    }, [card.id, x]);

    const commitChoice = useCallback(
      (direction: SwipeDirection) => {
        if (hasCommitted.current || disabled) return;
        hasCommitted.current = true;

        const targetX = direction === "left" ? -EXIT_X : EXIT_X;
        animate(x, targetX, {
          type: "spring",
          stiffness: 300,
          damping: 30,
          onComplete: () => {
            onChoice(direction);
          },
        });
      },
      [onChoice, disabled, x]
    );

    // Expose trigger for parent (button clicks)
    useImperativeHandle(
      ref,
      () => ({
        triggerChoice: (direction: SwipeDirection) => {
          commitChoice(direction);
        },
      }),
      [commitChoice]
    );

    return (
      <div className="relative w-full flex items-center justify-center select-none touch-none">
        {/* Left choice overlay */}
        <motion.div
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
          style={{ opacity: leftOpacity }}
        >
          <div className="bg-rose-500/90 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg rotate-[-12deg] shadow-lg shadow-rose-500/30 max-w-[140px] text-center">
            {card.leftChoice}
          </div>
        </motion.div>

        {/* Right choice overlay */}
        <motion.div
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
          style={{ opacity: rightOpacity }}
        >
          <div className="bg-emerald-500/90 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg rotate-[12deg] shadow-lg shadow-emerald-500/30 max-w-[140px] text-center">
            {card.rightChoice}
          </div>
        </motion.div>

        {/* Card body */}
        <motion.div
          className="
            relative w-full max-w-sm cursor-grab active:cursor-grabbing
            bg-gradient-to-br from-zinc-800/90 to-zinc-900/95
            border border-zinc-700/50 rounded-2xl p-6
            shadow-2xl shadow-black/40
            backdrop-blur-sm z-10
          "
          style={{ x, rotate }}
          drag={disabled ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.7}
          onDragEnd={(_, info) => {
            if (hasCommitted.current || disabled) return;

            if (info.offset.x < -SWIPE_THRESHOLD) {
              commitChoice("left");
            } else if (info.offset.x > SWIPE_THRESHOLD) {
              commitChoice("right");
            } else {
              animate(x, 0, { type: "spring", stiffness: 400, damping: 30 });
            }
          }}
          whileTap={disabled ? undefined : { scale: 1.02 }}
        >
          {/* Day badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500/90 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
            Day {card.day}
          </div>

          <div className="pt-4 space-y-4">
            <h2 className="text-xl font-bold text-white text-center leading-tight">
              {card.title}
            </h2>

            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent mx-auto" />

            <p className="text-sm text-zinc-400 leading-relaxed text-center">
              {card.description}
            </p>

            {/* Choice hints */}
            <div className="flex items-stretch gap-3 pt-2">
              <div className="flex-1 bg-rose-500/5 border border-rose-500/20 rounded-lg p-3 text-center">
                <p className="text-[10px] uppercase tracking-widest text-rose-400/60 mb-1">
                  ← Swipe Left
                </p>
                <p className="text-xs text-rose-300 font-medium">
                  {card.leftChoice}
                </p>
              </div>
              <div className="flex-1 bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3 text-center">
                <p className="text-[10px] uppercase tracking-widest text-emerald-400/60 mb-1">
                  Swipe Right →
                </p>
                <p className="text-xs text-emerald-300 font-medium">
                  {card.rightChoice}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
);

export default GameCard;
