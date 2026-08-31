"use client";

import { SwipeDirection, MeterEffects, MeterKey, METER_INFO } from "@/lib/game/gameTypes";

type ChoiceButtonProps = {
  direction: SwipeDirection;
  label: string;
  effects: MeterEffects;
  onChoose: (dir: SwipeDirection) => void;
  disabled?: boolean;
  showEffects?: boolean;
};

export default function ChoiceButton({
  direction,
  label,
  effects,
  onChoose,
  disabled = false,
  showEffects = false,
}: ChoiceButtonProps) {
  const isLeft = direction === "left";

  // Pre-filter valid non-zero effects if oracle active
  const effectEntries = showEffects
    ? Object.entries(effects ?? {})
        .filter(([_, val]) => typeof val === "number" && val !== 0)
        .map(([key, val]) => ({
          key: key as MeterKey,
          val: val as number,
          info: METER_INFO[key as MeterKey],
        }))
        .filter((entry) => Boolean(entry.info))
    : [];

  return (
    <button
      type="button"
      onClick={() => onChoose(direction)}
      disabled={disabled}
      translate="no"
      className="notranslate flex-1 flex flex-col items-center justify-center py-3.5 px-3 rounded-2xl border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/15 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed select-none shadow-lg"
    >
      <div className="flex items-center justify-center gap-1.5 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1 w-full">
        {isLeft && (
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        )}
        <span className="truncate">{label}</span>
        {!isLeft && (
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        )}
      </div>

      {showEffects && effectEntries.length > 0 && (
        <div className="flex gap-2 text-[10px] flex-wrap justify-center mt-1">
          {effectEntries.map(({ key, val, info }) => {
            const isPositive = val > 0;
            return (
              <span
                key={key}
                className={`font-bold ${isPositive ? "text-green-400" : "text-red-400"}`}
              >
                {`${info.icon} ${isPositive ? "+" : ""}${val}`}
              </span>
            );
          })}
        </div>
      )}
    </button>
  );
}
