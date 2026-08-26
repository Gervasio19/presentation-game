// ============================================================
// LAPSE — Game Types
// ============================================================

export type GameStatus = "playing" | "dead" | "completed" | "eliminated";

export type Checkpoint = {
  day: number;
  progress: number;
  // Designed for future expansion — add fields here as game state grows
};

export type GameState = {
  day: number;
  progress: number;
  checkpoints: Checkpoint[];
  status: GameStatus;
};

export type CardData = {
  id: string;
  day: number;
  title: string;
  description: string;
  leftChoice: string;
  rightChoice: string;
  leftEffect: number;
  rightEffect: number;
};

export type SwipeDirection = "left" | "right";

export type GameAction =
  | { type: "MAKE_CHOICE"; direction: SwipeDirection }
  | { type: "RESTORE_CHECKPOINT"; checkpoint: Checkpoint }
  | { type: "RESTART" };

export const TOTAL_DAYS = 10;
export const INITIAL_PROGRESS = 50;
