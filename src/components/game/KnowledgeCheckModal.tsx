"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { KnowledgeCheck } from "@/data/knowledgeChecks";

type KnowledgeCheckModalProps = {
  check: KnowledgeCheck;
  onComplete: (isCorrect: boolean) => void;
};

export default function KnowledgeCheckModal({
  check,
  onComplete,
}: KnowledgeCheckModalProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
  };

  const isCorrect = selectedOption === check.correctIndex;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto notranslate" translate="no">
      <motion.div
        className="max-w-md w-full my-auto bg-zinc-900 border border-cyan-500/40 rounded-3xl shadow-2xl p-6 flex flex-col gap-4 text-left shadow-cyan-950/40"
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
      >
        {/* Header Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold uppercase tracking-wider border border-cyan-500/40 shadow-sm">
              KNOWLEDGE CHECK
            </span>
            <span className="text-[11px] text-zinc-400 font-medium">
              Ch.{check.chapter}
            </span>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono">
            {check.milestoneTitle}
          </span>
        </div>

        {/* Question Text */}
        <h3 className="text-base font-bold text-white leading-snug tracking-tight pt-1">
          {check.question}
        </h3>

        {/* Options A, B, C, D */}
        <div className="space-y-2.5 pt-1">
          {check.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isOptionCorrect = idx === check.correctIndex;

            let btnStyle =
              "bg-zinc-800/80 border-zinc-700/80 text-zinc-200 hover:bg-zinc-700 hover:border-zinc-600";

            if (isAnswered) {
              if (isOptionCorrect) {
                btnStyle =
                  "bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold shadow-lg shadow-emerald-950/50";
              } else if (isSelected && !isOptionCorrect) {
                btnStyle =
                  "bg-red-500/20 border-red-500 text-red-300";
              } else {
                btnStyle = "bg-zinc-900/60 border-zinc-800 text-zinc-500 opacity-60";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={isAnswered}
                className={`w-full text-left p-3.5 rounded-2xl border text-xs transition-all flex items-start gap-3 active:scale-[0.99] ${btnStyle}`}
              >
                <span className="w-5 h-5 rounded-full bg-black/40 text-center font-mono font-bold shrink-0 flex items-center justify-center text-[10px] text-zinc-300">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-relaxed flex-1">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback / Explanation Box */}
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3.5 rounded-2xl text-xs space-y-1 border ${
              isCorrect
                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-200"
                : "bg-amber-500/15 border-amber-500/40 text-amber-200"
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold text-xs">
              {isCorrect ? (
                <>
                  <span className="text-emerald-400">✓</span>
                  <span className="text-emerald-300 font-bold">
                    +2 Thuốc Tiên Tri
                  </span>
                </>
              ) : (
                <span className="text-amber-300 font-bold">
                  Explanation:
                </span>
              )}
            </div>
            <p className="text-[11px] text-zinc-300 leading-relaxed font-sans">
              {check.explanation}
            </p>
          </motion.div>
        )}

        {/* Continue Button */}
        {isAnswered && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => onComplete(isCorrect)}
            className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all active:scale-98 mt-1"
          >
            Continue →
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
