// ============================================================
// LAPSE — Game Engine
// ============================================================

import {
  GameState,
  SwipeDirection,
  Checkpoint,
  CardData,
  TOTAL_DAYS,
  INITIAL_PROGRESS,
} from "./gameTypes";
import {
  isCheckpointDay,
  createCheckpoint,
  addCheckpoint,
  hasCheckpoints,
} from "./checkpointManager";

// ── Helpers ──────────────────────────────────────────────────

function clampProgress(value: number): number {
  return Math.max(0, Math.min(100, value));
}

// ── Factory ──────────────────────────────────────────────────

export function createInitialState(): GameState {
  return {
    day: 1,
    progress: INITIAL_PROGRESS,
    checkpoints: [],
    status: "playing",
  };
}

// ── Core Actions ─────────────────────────────────────────────

/**
 * Process a player's choice and return the next GameState.
 * This is a PURE function — no mutations.
 */
export function makeChoice(
  state: GameState,
  card: CardData,
  direction: SwipeDirection
): GameState {
  if (state.status !== "playing") return state;

  const effect = direction === "left" ? card.leftEffect : card.rightEffect;
  const newProgress = clampProgress(state.progress + effect);

  // ── Death check ──
  if (newProgress <= 0) {
    if (hasCheckpoints(state.checkpoints)) {
      return { ...state, progress: 0, status: "dead" };
    }
    // No checkpoints → eliminated
    return { ...state, progress: 0, status: "eliminated" };
  }

  // ── Checkpoint creation (after surviving the day) ──
  let newCheckpoints = state.checkpoints;
  if (isCheckpointDay(state.day)) {
    const cp = createCheckpoint(state.day, newProgress);
    newCheckpoints = addCheckpoint(state.checkpoints, cp);
  }

  // ── Day 10 completion ──
  if (state.day >= TOTAL_DAYS) {
    return {
      ...state,
      progress: newProgress,
      checkpoints: newCheckpoints,
      status: "completed",
    };
  }

  // ── Advance to next day ──
  return {
    ...state,
    day: state.day + 1,
    progress: newProgress,
    checkpoints: newCheckpoints,
    status: "playing",
  };
}

/**
 * Restore the game to a saved checkpoint.
 */
export function restoreCheckpoint(
  state: GameState,
  checkpoint: Checkpoint
): GameState {
  return {
    ...state,
    day: checkpoint.day,
    progress: checkpoint.progress,
    status: "playing",
  };
}

// ── Scoring ──────────────────────────────────────────────────

export function calculateScore(
  finalProgress: number,
  daysSurvived: number
): number {
  return finalProgress * 10 + daysSurvived * 100;
}
