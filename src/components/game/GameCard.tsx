"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useCallback,
  useState,
} from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import {
  CardData,
  SwipeDirection,
  MeterEffects,
  MeterKey,
  METER_INFO,
} from "@/lib/game/gameTypes";

export type GameCardHandle = {
  triggerChoice: (direction: SwipeDirection) => void;
};

type GameCardProps = {
  card: CardData;
  onChoice: (direction: SwipeDirection) => void;
  disabled: boolean;
  showEffects?: boolean;
};

const SWIPE_THRESHOLD = 100;
const EXIT_X = 600;

function EffectsPreview({ effects }: { effects: MeterEffects }) {
  const entries = Object.entries(effects ?? {}).filter(
    ([, val]) => typeof val === "number" && val !== 0
  );
  if (entries.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1 justify-center mt-1 notranslate" translate="no">
      {entries.map(([key, val]) => {
        const info = METER_INFO[key as MeterKey];
        if (!info) return null;
        const isPositive = (val ?? 0) > 0;
        return (
          <span
            key={key}
            className={`text-[11px] font-bold ${
              isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            {`${info.icon} ${isPositive ? "+" : ""}${val}`}
          </span>
        );
      })}
    </div>
  );
}

const GameCard = forwardRef<GameCardHandle, GameCardProps>(
  function GameCard({ card, onChoice, disabled, showEffects = false }, ref) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
    const leftOpacity = useTransform(x, [-SWIPE_THRESHOLD, 0], [1, 0]);
    const rightOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1]);
    const hasCommitted = useRef(false);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
      hasCommitted.current = false;
      setImageError(false);
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

    useImperativeHandle(
      ref,
      () => ({
        triggerChoice: (direction: SwipeDirection) => {
          commitChoice(direction);
        },
      }),
      [commitChoice]
    );

    const isPrologue = card.chapter === 0;
    const avatar = card.characterAvatar || (isPrologue ? "👤" : "🏛️");
    const characterName = card.characterName || (isPrologue ? "Economic Advisor" : "Policy Advisor");

    return (
      <div className="relative w-full flex flex-col items-center justify-center select-none touch-none">
        {/* Lapse Narrative Prompt above Card (if available) */}
        {card.prompt && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm mb-2 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-amber-500/20 text-center shadow-lg backdrop-blur-sm"
          >
            <p className="text-[11px] italic text-amber-200/90 font-serif leading-relaxed">
              &ldquo;{card.prompt}&rdquo;
            </p>
          </motion.div>
        )}

        <div className="relative w-full flex items-center justify-center">
          {/* Left choice overlay */}
          <motion.div
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
            style={{ opacity: leftOpacity }}
          >
            <div className="bg-red-600/95 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-2 rounded-xl rotate-[-12deg] shadow-2xl max-w-[130px] text-center border border-red-400/50">
              {card.leftChoice}
              {showEffects && <EffectsPreview effects={card.leftEffects} />}
            </div>
          </motion.div>

          {/* Right choice overlay */}
          <motion.div
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
            style={{ opacity: rightOpacity }}
          >
            <div className="bg-emerald-600/95 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-2 rounded-xl rotate-[12deg] shadow-2xl max-w-[130px] text-center border border-emerald-400/50">
              {card.rightChoice}
              {showEffects && <EffectsPreview effects={card.rightEffects} />}
            </div>
          </motion.div>

          {/* Card body */}
          <motion.div
            className="relative w-full max-w-sm cursor-grab active:cursor-grabbing bg-gradient-to-b from-zinc-800/95 via-zinc-900 to-zinc-950 border border-zinc-700/60 rounded-3xl p-4 shadow-2xl shadow-black/60 backdrop-blur-md z-10 overflow-hidden"
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
            {/* Chapter/Card badge */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 bg-amber-500/90 text-black text-[9px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full shadow-md z-20">
              {isPrologue ? `Prologue — ${card.cardIndex}/4` : `Ch.${card.chapter} — Card ${card.cardIndex}/6`}
            </div>

            {/* Thematic Illustration Banner with Avatar Badge */}
            <div className="pt-4 pb-2 flex flex-col items-center justify-center">
              <div className="relative w-full h-36 rounded-2xl bg-zinc-900 border border-zinc-700/50 overflow-hidden shadow-inner group">
                {card.imageUrl && !imageError ? (
                  <div className="relative w-full h-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.imageUrl}
                      alt={card.title}
                      referrerPolicy="no-referrer"
                      loading="eager"
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05] transform group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Subtle dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent pointer-events-none" />

                    {/* Character Avatar & Name Overlay */}
                    <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10 shadow-lg">
                      <span className="text-sm">{avatar}</span>
                      <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider truncate max-w-[200px]">
                        {characterName}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-zinc-800 to-zinc-950 relative">
                    <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />
                    <span className="text-4xl filter drop-shadow-md">{avatar}</span>
                    <p className="mt-2 text-[10px] uppercase font-bold tracking-widest text-amber-400/90">
                      {characterName}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2 text-center pt-0.5">
              <h2 className="text-base font-bold text-white leading-snug tracking-tight">
                {card.title}
              </h2>

              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto" />

              <p className="text-xs text-zinc-300 leading-relaxed min-h-[44px] px-1 font-sans">
                {card.description}
              </p>

              {/* Interactive Tap-to-Choose Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    commitChoice("left");
                  }}
                  disabled={disabled}
                  className="bg-red-500/10 hover:bg-red-500/20 active:scale-95 border border-red-500/30 rounded-xl p-2 text-center transition-all cursor-pointer shadow-sm group"
                >
                  <p className="text-[9px] uppercase tracking-widest text-red-400 font-bold mb-0.5 flex items-center justify-center gap-1">
                    <span>←</span> Left
                  </p>
                  <p className="text-[11px] text-red-200 font-semibold leading-tight line-clamp-2">
                    {card.leftChoice}
                  </p>
                  {showEffects && <EffectsPreview effects={card.leftEffects} />}
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    commitChoice("right");
                  }}
                  disabled={disabled}
                  className="bg-emerald-500/10 hover:bg-emerald-500/20 active:scale-95 border border-emerald-500/30 rounded-xl p-2 text-center transition-all cursor-pointer shadow-sm group"
                >
                  <p className="text-[9px] uppercase tracking-widest text-emerald-400 font-bold mb-0.5 flex items-center justify-center gap-1">
                    Right <span>→</span>
                  </p>
                  <p className="text-[11px] text-emerald-200 font-semibold leading-tight line-clamp-2">
                    {card.rightChoice}
                  </p>
                  {showEffects && <EffectsPreview effects={card.rightEffects} />}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
);

export default GameCard;
