// ============================================================
// LAPSE — Checkpoint Manager (Chapter-Based)
// ============================================================

import { Checkpoint, Meters } from "./gameTypes";

/**
 * Create a checkpoint snapshot from the current chapter state.
 */
export function createCheckpoint(chapter: number, meters: Meters): Checkpoint {
  return { chapter, meters: { ...meters } };
}

/**
 * Add a checkpoint to the list.
 * If a checkpoint for that chapter already exists, overwrite it.
 */
export function addCheckpoint(
  checkpoints: Checkpoint[],
  checkpoint: Checkpoint
): Checkpoint[] {
  const filtered = checkpoints.filter(
    (cp) => cp.chapter !== checkpoint.chapter
  );
  return [...filtered, checkpoint].sort((a, b) => a.chapter - b.chapter);
}

/**
 * Get the available checkpoints for the player to choose from.
 * Returns up to 2 most recent chapter checkpoints before the current chapter.
 */
export function getAvailableCheckpoints(
  checkpoints: Checkpoint[],
  currentChapter: number
): Checkpoint[] {
  return checkpoints
    .filter((cp) => cp.chapter < currentChapter)
    .sort((a, b) => b.chapter - a.chapter)
    .slice(0, 2)
    .sort((a, b) => a.chapter - b.chapter);
}

/**
 * Check if the player has any checkpoints available for restoration.
 */
export function hasCheckpoints(
  checkpoints: Checkpoint[],
  currentChapter: number
): boolean {
  return getAvailableCheckpoints(checkpoints, currentChapter).length > 0;
}
