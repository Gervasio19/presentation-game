"use client";

import { SwipeDirection } from "@/lib/game/gameTypes";

type ChoiceButtonProps = {
  direction: SwipeDirection;
  label: string;
  onChoose: (dir: SwipeDirection) => void;
  disabled?: boolean;
};

export default function ChoiceButton({
  direction,
  label,
  onChoose,
  disabled = false,
}: ChoiceButtonProps) {
  const isLeft = direction === "left";

  return (
    <button
      onClick={() => onChoose(direction)}
      disabled={disabled}
      className={`
        flex-1 py-3.5 px-4 rounded-xl text-sm font-semibold uppercase tracking-wider
        transition-all duration-200 border
        disabled:opacity-30 disabled:cursor-not-allowed
        ${
          isLeft
            ? "bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20 hover:border-rose-500/50 active:scale-95"
            : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 active:scale-95"
        }
      `}
    >
      <span className="flex items-center justify-center gap-2">
        {isLeft && (
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        )}
        <span className="truncate">{label}</span>
        {!isLeft && (
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        )}
      </span>
    </button>
  );
}
