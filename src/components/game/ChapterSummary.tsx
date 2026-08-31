'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChapterInfo } from '@/data/chapters';

export default function ChapterSummary({ 
  chapterInfo, 
  onContinue, 
  onSaveQuit 
}: { 
  chapterInfo: ChapterInfo; 
  onContinue: () => void; 
  onSaveQuit: () => void;
}) {
  const isFinalChapter = chapterInfo.chapter === 6;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        className="max-w-md w-full my-auto bg-zinc-900 border border-zinc-700/80 rounded-3xl shadow-2xl p-6 flex flex-col gap-4 text-left"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        {/* Header Badge */}
        <div className="flex flex-col items-center gap-1.5 text-center pb-1">
          <motion.div 
            className="w-12 h-12 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-2xl mb-1 shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: "spring", bounce: 0.5 }}
          >
            ✓
          </motion.div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-0.5 rounded-full border border-emerald-500/20">
            Chapter {chapterInfo.chapter} Complete
          </div>
          <h2 className="text-xl font-black text-white">{chapterInfo.title}</h2>
          <div className="text-xs text-amber-400/90 font-medium">{chapterInfo.subtitle} • {chapterInfo.period}</div>
        </div>

        {/* What You Learned Section */}
        <div className="bg-zinc-800/60 rounded-2xl p-4 border border-zinc-700/50 space-y-2.5">
          <h3 className="text-zinc-400 font-bold text-[11px] tracking-wider uppercase flex items-center gap-1.5">
            <span>💡</span> WHAT YOU LEARNED
          </h3>
          <ul className="flex flex-col gap-2.5">
            {chapterInfo.knowledgeSummary?.map((point, index) => (
              <motion.li 
                key={index}
                className="flex gap-2.5 text-xs text-zinc-200 items-start leading-relaxed"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <span className="text-amber-400 shrink-0 text-xs mt-0.5">•</span>
                <span>{point}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Key Connection Causal Chain */}
        {chapterInfo.keyConnection && (
          <motion.div 
            className="bg-amber-500/10 rounded-2xl p-3.5 border border-amber-500/30 space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px] uppercase tracking-wider">
              <span>🔗</span> KEY CONNECTION
            </div>
            <p className="text-xs font-semibold text-amber-200 leading-snug">
              {chapterInfo.keyConnection}
            </p>

            {/* Visual Step-by-Step Flow for Chapter 5 */}
            {chapterInfo.flowDiagram && (
              <div className="pt-2 flex flex-wrap items-center justify-center gap-1.5 text-[10px] font-mono text-zinc-300 bg-black/40 p-2.5 rounded-xl border border-amber-500/20">
                {chapterInfo.flowDiagram.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <span className="px-2 py-0.5 rounded-lg bg-zinc-800 text-amber-300 font-bold border border-zinc-700 shadow-sm">
                      {step}
                    </span>
                    {idx < chapterInfo.flowDiagram!.length - 1 && (
                      <span className="text-amber-500 font-black">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-1">
          <motion.button
            onClick={onContinue}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all active:scale-98"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            {isFinalChapter ? "View Final Results →" : `Continue to Chapter ${chapterInfo.chapter + 1} →`}
          </motion.button>
          <motion.button
            onClick={onSaveQuit}
            className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white text-xs font-medium transition-colors"
          >
            Save & Exit
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
