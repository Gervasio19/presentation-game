// ============================================================
// LAPSE — Checkpoint Manager
// ============================================================

import { Checkpoint, CHECKPOINT_DAYS } from "./gameTypes";

/**
 * Determine whether a given day triggers a checkpoint save.
 */
export function isCheckpointDay(day: number): boolean {
  return (CHECKPOINT_DAYS as readonly number[]).includes(day);
}

/**
 * Create a checkpoint snapshot from the current game state.
 */
export function createCheckpoint(day: number, progress: number): Checkpoint {
  return { day, progress };
}

/**
 * Add a checkpoint to the list.
 * If a checkpoint for that day already exists, overwrite it with the new one.
 */
export function addCheckpoint(
  checkpoints: Checkpoint[],
  checkpoint: Checkpoint
): Checkpoint[] {
  const filtered = checkpoints.filter((cp) => cp.day !== checkpoint.day);
  return [...filtered, checkpoint].sort((a, b) => a.day - b.day);
}

/**
 * Check if the player has any checkpoints available for restoration.
 */
export function hasCheckpoints(checkpoints: Checkpoint[]): boolean {
  return checkpoints.length > 0;
}
