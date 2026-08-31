"use client";

import { motion } from "framer-motion";
import { Meters, METER_KEYS, METER_INFO, DANGER_LOW, DANGER_HIGH } from "@/lib/game/gameTypes";

type MetersDisplayProps = {
  meters: Meters;
};

export default function MetersDisplay({ meters }: MetersDisplayProps) {
  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      {METER_KEYS.map((key) => {
        const info = METER_INFO[key];
        const value = meters[key];
        const isDanger = value < DANGER_LOW || value > DANGER_HIGH;

        return (
          <div key={key} className="flex flex-col gap-0.5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <span className="text-xs">{info.icon}</span>
                <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">
                  {info.label}
                </span>
              </div>
              <span
                className={`text-xs font-bold tabular-nums transition-colors duration-300 ${
                  isDanger ? "text-red-400" : "text-zinc-300"
                }`}
              >
                {Math.round(value)}
              </span>
            </div>
            <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden border border-zinc-700/50">
              <motion.div
                className={`h-full rounded-full ${isDanger ? "meter-danger" : ""}`}
                style={{
                  backgroundColor: isDanger ? "#ef4444" : info.color,
                }}
                initial={false}
                animate={{ width: `${value}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
