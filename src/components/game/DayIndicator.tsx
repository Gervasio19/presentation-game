"use client";

import { TOTAL_DAYS } from "@/lib/game/gameTypes";

type DayIndicatorProps = {
  day: number;
};

export default function DayIndicator({ day }: DayIndicatorProps) {
  return (
    <div className="text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-medium">
        Day
      </p>
      <p className="text-2xl font-bold tracking-wide text-white">
        <span className="text-amber-400">{String(day).padStart(2, "0")}</span>
        <span className="text-zinc-600 mx-1">/</span>
        <span className="text-zinc-400">{String(TOTAL_DAYS).padStart(2, "0")}</span>
      </p>
    </div>
  );
}
