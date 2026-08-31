"use client";

import { motion } from "framer-motion";
import { TOTAL_CHAPTERS, CARDS_PER_CHAPTER, TOTAL_TUTORIAL_CARDS } from "@/lib/game/gameTypes";

export default function ChapterProgress({
  chapter,
  cardIndex,
}: {
  chapter: number;
  cardIndex: number;
}) {
  const isTutorial = chapter === 0;
  const totalCards = isTutorial ? TOTAL_TUTORIAL_CARDS : CARDS_PER_CHAPTER;
  const dots = Array.from({ length: totalCards }, (_, i) => i);

  return (
    <div className="flex flex-col items-center gap-1.5 notranslate" translate="no">
      <h2 className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
        {isTutorial ? (
          <span>
            PROLOGUE &bull; <span className="text-amber-400">TUTORIAL</span>
          </span>
        ) : (
          <span>
            CHAPTER <span className="text-amber-400 font-bold">{chapter}</span> / {TOTAL_CHAPTERS}
          </span>
        )}
      </h2>

      <div className="flex justify-center gap-1.5">
        {dots.map((dotIndex) => {
          const isCompleted = dotIndex < cardIndex - 1;
          const isCurrent = dotIndex === cardIndex - 1;

          return (
            <motion.div
              key={dotIndex}
              className={`w-2 h-2 rounded-full ${
                isCompleted
                  ? "bg-amber-500 shadow-sm shadow-amber-500/50"
                  : isCurrent
                  ? "bg-amber-400 animate-pulse ring-2 ring-amber-400/40"
                  : "bg-zinc-700/60"
              }`}
              initial={false}
              animate={{
                scale: isCurrent ? [1, 1.25, 1] : 1,
              }}
              transition={{
                duration: 1.5,
                repeat: isCurrent ? Infinity : 0,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
