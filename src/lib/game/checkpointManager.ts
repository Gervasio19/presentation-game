// ============================================================
// LAPSE — Checkpoint Manager
// ============================================================

import { Checkpoint } from "./gameTypes";


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
 * Get the available checkpoints for the player to choose from.
 * Returns up to 3 immediately preceding days.
 */
export function getAvailableCheckpoints(
  checkpoints: Checkpoint[],
  currentDay: number
): Checkpoint[] {
  return checkpoints
    .filter((cp) => cp.day >= currentDay - 3 && cp.day < currentDay)
    .sort((a, b) => a.day - b.day);
}

/**
 * Check if the player has any checkpoints available for restoration.
 */
export function hasCheckpoints(checkpoints: Checkpoint[], currentDay: number): boolean {
  return getAvailableCheckpoints(checkpoints, currentDay).length > 0;
}
