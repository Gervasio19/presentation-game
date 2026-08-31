'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Checkpoint, METER_INFO, MeterKey, METER_KEYS } from '@/lib/game/gameTypes';
import { getChapter } from '@/data/chapters';

type CheckpointSelectorProps = {
  checkpoints: Checkpoint[];
  onSelect: (checkpoint: Checkpoint) => void;
};

export default function CheckpointSelector({ checkpoints, onSelect }: CheckpointSelectorProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-zinc-900 border border-red-500/30 rounded-2xl p-6 shadow-2xl flex flex-col max-h-[90vh]"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black text-red-500 tracking-wider mb-2">CRISIS COLLAPSED</h2>
          <p className="text-zinc-400">Choose a checkpoint to continue.</p>
        </div>

        <div className="overflow-y-auto pr-2 space-y-4">
          {checkpoints.map((cp, idx) => {
            const chapterInfo = getChapter(cp.chapter);
            return (
              <motion.button
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => onSelect(cp)}
                className="w-full text-left bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-amber-500/50 rounded-xl p-4 transition-all group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-amber-500 text-xs font-bold uppercase tracking-wider">Chapter {cp.chapter}</span>
                    <h3 className="text-white font-bold text-lg">{chapterInfo?.title || `Chapter ${cp.chapter}`}</h3>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  {METER_KEYS.map((key) => {
                    const info = METER_INFO[key];
                    const val = cp.meters[key];
                    return (
                      <div key={key} className="flex flex-col gap-1">
                        <div className="flex justify-between items-center text-[10px]">
                          <span>{info.icon}</span>
                          <span className="text-zinc-400">{val}%</span>
                        </div>
                        <div className="h-1.5 bg-black rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full"
                            style={{ width: `${val}%`, backgroundColor: info.color }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
