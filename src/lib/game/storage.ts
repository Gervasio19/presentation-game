// ============================================================
// LAPSE — Local Storage Manager
// ============================================================

import { GameState, SaveData } from "./gameTypes";

const SAVE_KEY = "lapse_save";
const PLAYER_KEY = "lapse_player";
const TIMER_KEY = "lapse_timer";

// ── Player Name ──────────────────────────────────────────────

export function savePlayerName(name: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PLAYER_KEY, name);
}

export function getPlayerName(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(PLAYER_KEY);
}

// ── Timer ────────────────────────────────────────────────────

export function startTimer(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TIMER_KEY, Date.now().toString());
}

export function getStartTime(): number | null {
  if (typeof window === "undefined") return null;
  const val = localStorage.getItem(TIMER_KEY);
  return val ? parseInt(val, 10) : null;
}

export function getElapsedSeconds(): number {
  const start = getStartTime();
  if (!start) return 0;
  return Math.floor((Date.now() - start) / 1000);
}

// ── Game Save ────────────────────────────────────────────────

export function saveGame(playerName: string, gameState: GameState): void {
  if (typeof window === "undefined") return;
  const data: SaveData = {
    playerName,
    gameState,
    startTime: getStartTime() ?? Date.now(),
    savedAt: new Date().toISOString(),
  };
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

export function loadGame(): SaveData | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SaveData;
  } catch {
    return null;
  }
}

export function hasSavedGame(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SAVE_KEY) !== null;
}

export function clearSave(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SAVE_KEY);
  localStorage.removeItem(TIMER_KEY);
}
