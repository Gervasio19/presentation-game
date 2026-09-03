// ============================================================
// LAPSE — Game Types & Constants
// ============================================================

// ── Meters ───────────────────────────────────────────────────

export type Meters = {
  economy: number;
  publicTrust: number;
  policyPower: number;
  bankingHealth: number;
};

export type MeterKey = keyof Meters;

export const METER_KEYS: MeterKey[] = [
  "economy",
  "publicTrust",
  "policyPower",
  "bankingHealth",
];

/** Partial meter changes — only specified keys are affected */
export type MeterEffects = Partial<Meters>;

export type MeterInfo = {
  icon: string;
  label: string;
  lowDescription: string;
  highDescription: string;
  color: string;
};

export const METER_INFO: Record<MeterKey, MeterInfo> = {
  economy: {
    icon: "💰",
    label: "Economy",
    color: "#22c55e",
    lowDescription:
      "Total economic collapse — GDP is in freefall, markets have crashed.",
    highDescription:
      "Unsustainable bubble — the market is overheated beyond control.",
  },
  publicTrust: {
    icon: "👥",
    label: "Public Trust",
    color: "#3b82f6",
    lowDescription:
      "Mass panic — bank runs and civil unrest sweep the nation.",
    highDescription:
      "Dangerous complacency — the public ignores all warning signs.",
  },
  policyPower: {
    icon: "🏛️",
    label: "Policy Power",
    color: "#a855f7",
    lowDescription:
      "Political paralysis — you have no authority left to act.",
    highDescription:
      "Authoritarian overreach — markets lose all freedom and flee.",
  },
  bankingHealth: {
    icon: "🏦",
    label: "Banking Health",
    color: "#f59e0b",
    lowDescription:
      "Credit system collapse — no institution can lend or borrow.",
    highDescription:
      "Unchecked moral hazard — banks take increasingly reckless risks.",
  },
};

// ── Game Constants ───────────────────────────────────────────

export const TOTAL_CHAPTERS = 6;
export const CARDS_PER_CHAPTER = 6;
export const TOTAL_TUTORIAL_CARDS = 4;
export const TOTAL_CARDS = TOTAL_CHAPTERS * CARDS_PER_CHAPTER;
export const METER_MIN = 0;
export const METER_MAX = 100;
export const INITIAL_METER_VALUE = 50;
export const DANGER_LOW = 15;
export const DANGER_HIGH = 85;

// ── Cards ────────────────────────────────────────────────────

export type CardData = {
  id: string;
  chapter: number;
  cardIndex: number; // 1-based within chapter
  title: string;
  description: string;
  leftChoice: string;
  rightChoice: string;
  leftEffects: MeterEffects;
  rightEffects: MeterEffects;
  characterAvatar?: string;
  characterName?: string;
  characterRole?: string;
  imageUrl?: string;
  prompt?: string;
};

// ── Game State ───────────────────────────────────────────────

export type GameStatus =
  | "tutorial"
  | "playing"
  | "dead"
  | "eliminated"
  | "completed"
  | "chapter_complete";

export type FailedMeter = {
  key: MeterKey;
  value: number;
  direction: "too_low" | "too_high";
};

export type Checkpoint = {
  chapter: number;
  meters: Meters;
};

// ── Inventory / Shop Items ───────────────────────────────────

export const MAX_EXTRA_HEARTS = 2;
export const MAX_BAILOUTS = 2;

export type Inventory = {
  oracleCharges: number;
  isOracleActive: boolean;
  extraHearts: number;
  bailoutCount: number;
  extraHeartPurchases: number;
  bailoutPurchases: number;
};

export const INITIAL_INVENTORY: Inventory = {
  oracleCharges: 0,
  isOracleActive: false,
  extraHearts: 0,
  bailoutCount: 0,
  extraHeartPurchases: 0,
  bailoutPurchases: 0,
};

export type GameState = {
  chapter: number;
  cardIndex: number; // 1-based, current card within chapter
  meters: Meters;
  inventory: Inventory;
  checkpoints: Checkpoint[];
  status: GameStatus;
  failedMeter?: FailedMeter;
};

// ── Swipe ────────────────────────────────────────────────────

export type SwipeDirection = "left" | "right";

// ── Leaderboard ──────────────────────────────────────────────

export type LeaderboardEntry = {
  id: string;
  name: string;
  score: number;
  bonusPoints?: number; // Điểm thưởng seminar / phát biểu (+0.5, +1.0, ...)
  chaptersCompleted: number;
  timeSeconds: number;
  finalMeters: Meters;
  submittedAt: string;
};

// ── Player ───────────────────────────────────────────────────

export type SaveData = {
  playerName: string;
  gameState: GameState;
  startTime: number; // epoch ms
  savedAt: string;
};
