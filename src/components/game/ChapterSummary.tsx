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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        className="max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 flex flex-col gap-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <motion.div 
            className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center text-3xl mb-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
          >
            ✓
          </motion.div>
          <h2 className="text-2xl font-bold text-slate-100">Chapter {chapterInfo.chapter} Complete</h2>
          <div className="text-amber-500 font-medium">{chapterInfo.title}</div>
          <div className="text-slate-400 text-sm">{chapterInfo.period}</div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
          <h3 className="text-slate-300 font-semibold mb-3 text-sm tracking-wider uppercase">What You Learned</h3>
          <ul className="flex flex-col gap-3">
            {chapterInfo.knowledgeSummary?.map((point, index) => (
              <motion.li 
                key={index}
                className="flex gap-3 text-sm text-slate-300 items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.15 }}
              >
                <span className="shrink-0 mt-0.5">💡</span>
                <span>{point}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <motion.button
            onClick={onContinue}
            className="w-full py-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold shadow-lg shadow-amber-900/20 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isFinalChapter ? "See Final Results" : `Continue to Chapter ${chapterInfo.chapter + 1}`}
          </motion.button>
          <motion.button
            onClick={onSaveQuit}
            className="w-full py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Save & Quit
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
