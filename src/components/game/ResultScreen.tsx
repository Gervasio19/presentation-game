'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GameState, METER_INFO, METER_KEYS } from '@/lib/game/gameTypes';
import { calculateScore, getChaptersCompleted } from '@/lib/game/gameEngine';

type ResultScreenProps = {
  gameState: GameState;
  timeSeconds: number;
  onPlayAgain: () => void;
  onMainMenu: () => void;
  onSubmitScore: () => void;
  isSubmitting?: boolean;
  isSubmitted?: boolean;
};

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function ResultScreen({ 
  gameState, timeSeconds, onPlayAgain, onMainMenu, onSubmitScore, isSubmitting, isSubmitted 
}: ResultScreenProps) {
  const isDead = gameState.status === 'dead';
  const chaptersCompleted = getChaptersCompleted(gameState);
  const score = calculateScore(gameState.meters, chaptersCompleted);
  
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md ${isDead ? 'bg-red-950/90' : 'bg-amber-950/90'}`}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-black/60 border rounded-3xl p-6 shadow-2xl flex flex-col items-center border-white/10"
      >
        <h1 className={`text-3xl font-black mb-1 ${isDead ? 'text-red-500' : 'text-amber-500'}`}>
          {isDead ? 'YOU WERE ELIMINATED' : '🏆 CRISIS SURVIVED'}
        </h1>
        
        <div className="text-center my-6">
          <div className="text-zinc-400 text-sm uppercase tracking-widest font-bold mb-1">Final Score</div>
          <div className={`text-6xl font-black ${isDead ? 'text-red-400' : 'text-amber-400'}`}>
            {score.toLocaleString()}
          </div>
        </div>
        
        <div className="w-full grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <div className="text-zinc-500 text-xs font-bold uppercase mb-1">Chapters</div>
            <div className="text-xl font-bold text-white">{chaptersCompleted} / 6</div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <div className="text-zinc-500 text-xs font-bold uppercase mb-1">Time</div>
            <div className="text-xl font-bold text-white">{formatTime(timeSeconds)}</div>
          </div>
        </div>
        
        <div className="w-full bg-white/5 rounded-2xl p-5 mb-8">
          <div className="text-zinc-500 text-xs font-bold uppercase mb-4 text-center">Final Meters</div>
          <div className="space-y-3">
            {METER_KEYS.map((key) => {
              const info = METER_INFO[key];
              const val = gameState.meters[key];
              return (
                <div key={key} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="flex items-center gap-1.5">
                      <span>{info.icon}</span>
                      <span className="text-zinc-300 font-medium">{info.label}</span>
                    </span>
                    <span className="text-zinc-400 font-mono">{Math.round(val)}%</span>
                  </div>
                  <div className="h-2 bg-black rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${val}%`, backgroundColor: info.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="w-full space-y-3">
          <button
            onClick={onSubmitScore}
            disabled={isSubmitting || isSubmitted}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all
              ${isSubmitted ? 'bg-green-600 text-white' : 
                isDead ? 'bg-red-600 hover:bg-red-500 text-white' : 
                'bg-amber-500 hover:bg-amber-400 text-zinc-950'}
              disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSubmitting ? 'Submitting...' : isSubmitted ? '✓ Submitted' : 'Submit to Leaderboard'}
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onPlayAgain}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl font-bold transition-colors"
            >
              Play Again
            </button>
            <button
              onClick={onMainMenu}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl font-bold transition-colors"
            >
              Main Menu
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
