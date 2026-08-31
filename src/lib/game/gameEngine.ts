// ============================================================
// LAPSE — Game Engine (Multi-Meter Reigns-Style + Inventory)
// ============================================================

import {
  GameState,
  SwipeDirection,
  Checkpoint,
  CardData,
  Meters,
  MeterKey,
  MeterEffects,
  FailedMeter,
  Inventory,
  INITIAL_INVENTORY,
  TOTAL_CHAPTERS,
  CARDS_PER_CHAPTER,
  TOTAL_TUTORIAL_CARDS,
  MAX_EXTRA_HEARTS,
  MAX_BAILOUTS,
  INITIAL_METER_VALUE,
  METER_MIN,
  METER_MAX,
  METER_KEYS,
} from "./gameTypes";
import {
  createCheckpoint,
  addCheckpoint,
  hasCheckpoints,
} from "./checkpointManager";

// ── Helpers ──────────────────────────────────────────────────

function clampMeter(value: number): number {
  return Math.max(METER_MIN, Math.min(METER_MAX, value));
}

function createInitialMeters(): Meters {
  return {
    economy: INITIAL_METER_VALUE,
    publicTrust: INITIAL_METER_VALUE,
    policyPower: INITIAL_METER_VALUE,
    bankingHealth: INITIAL_METER_VALUE,
  };
}

function applyEffects(meters: Meters, effects: MeterEffects): Meters {
  return {
    economy: clampMeter(meters.economy + (effects.economy ?? 0)),
    publicTrust: clampMeter(meters.publicTrust + (effects.publicTrust ?? 0)),
    policyPower: clampMeter(meters.policyPower + (effects.policyPower ?? 0)),
    bankingHealth: clampMeter(
      meters.bankingHealth + (effects.bankingHealth ?? 0)
    ),
  };
}

/**
 * Check if any meter has hit a failure threshold (0 or 100).
 * Returns the first failed meter found, or undefined.
 */
function checkMeterFailure(meters: Meters): FailedMeter | undefined {
  for (const key of METER_KEYS) {
    const value = meters[key];
    if (value <= METER_MIN) {
      return { key, value, direction: "too_low" };
    }
    if (value >= METER_MAX) {
      return { key, value, direction: "too_high" };
    }
  }
  return undefined;
}

// ── Factory ──────────────────────────────────────────────────

export function createInitialState(withTutorial = true): GameState {
  return {
    chapter: withTutorial ? 0 : 1,
    cardIndex: 1,
    meters: createInitialMeters(),
    inventory: { ...INITIAL_INVENTORY },
    checkpoints: [],
    status: withTutorial ? "tutorial" : "playing",
  };
}

// ── Core Actions ─────────────────────────────────────────────

/**
 * Process a player's choice and return the next GameState.
 * Pure function — no mutations.
 */
export function makeChoice(
  state: GameState,
  card: CardData,
  direction: SwipeDirection
): GameState {
  if (state.status !== "playing" && state.status !== "tutorial") return state;

  const effects =
    direction === "left" ? card.leftEffects : card.rightEffects;
  let newMeters = applyEffects(state.meters, effects);

  // Manage Oracle charges
  let updatedInventory: Inventory = state.inventory
    ? { ...state.inventory }
    : { ...INITIAL_INVENTORY };

  if (updatedInventory.isOracleActive && updatedInventory.oracleCharges > 0) {
    const nextCharges = updatedInventory.oracleCharges - 1;
    updatedInventory.oracleCharges = nextCharges;
    if (nextCharges <= 0) {
      updatedInventory.isOracleActive = false;
    }
  }

  // ── Tutorial Handling (Chapter 0) ──
  if (state.chapter === 0 || state.status === "tutorial") {
    if (state.cardIndex >= TOTAL_TUTORIAL_CARDS) {
      // Completed tutorial -> start chapter 1 with fresh meters
      return {
        ...state,
        chapter: 1,
        cardIndex: 1,
        meters: createInitialMeters(),
        inventory: updatedInventory,
        status: "playing",
      };
    }
    return {
      ...state,
      cardIndex: state.cardIndex + 1,
      meters: newMeters,
      inventory: updatedInventory,
      status: "tutorial",
    };
  }

  // ── Death check: any meter at 0 or 100 ──
  const failedMeter = checkMeterFailure(newMeters);
  if (failedMeter) {
    // Check if player has an Extra Heart to resurrect
    if (updatedInventory.extraHearts > 0) {
      updatedInventory.extraHearts -= 1;
      // Resuscitate: bring the failed meter back to safe 50%
      newMeters = {
        ...newMeters,
        [failedMeter.key]: 50,
      };
      // Continue playing!
    } else {
      if (hasCheckpoints(state.checkpoints, state.chapter)) {
        return {
          ...state,
          meters: newMeters,
          inventory: updatedInventory,
          status: "dead",
          failedMeter,
        };
      }
      return {
        ...state,
        meters: newMeters,
        inventory: updatedInventory,
        status: "eliminated",
        failedMeter,
      };
    }
  }

  // ── Check if we finished the last card of the last chapter ──
  if (
    state.chapter >= TOTAL_CHAPTERS &&
    state.cardIndex >= CARDS_PER_CHAPTER
  ) {
    const cp = createCheckpoint(state.chapter, state.meters);
    const newCheckpoints = addCheckpoint(state.checkpoints, cp);
    return {
      ...state,
      meters: newMeters,
      inventory: updatedInventory,
      checkpoints: newCheckpoints,
      status: "completed",
    };
  }

  // ── Check if we finished the current chapter ──
  if (state.cardIndex >= CARDS_PER_CHAPTER) {
    const cp = createCheckpoint(state.chapter, state.meters);
    const newCheckpoints = addCheckpoint(state.checkpoints, cp);
    return {
      ...state,
      meters: newMeters,
      inventory: updatedInventory,
      checkpoints: newCheckpoints,
      status: "chapter_complete",
    };
  }

  // ── Advance to next card within the chapter ──
  return {
    ...state,
    cardIndex: state.cardIndex + 1,
    meters: newMeters,
    inventory: updatedInventory,
    status: "playing",
  };
}

/**
 * Skip tutorial directly into Chapter 1
 */
export function skipTutorial(state: GameState): GameState {
  return {
    ...state,
    chapter: 1,
    cardIndex: 1,
    meters: createInitialMeters(),
    status: "playing",
  };
}

/**
 * Use Emergency Bailout: instantly resets all 4 meters to 50%
 */
export function useBailout(state: GameState): GameState {
  if (!state.inventory || state.inventory.bailoutCount <= 0) return state;

  return {
    ...state,
    meters: createInitialMeters(),
    inventory: {
      ...state.inventory,
      bailoutCount: state.inventory.bailoutCount - 1,
    },
  };
}

/**
 * Add item to inventory
 */
export function addInventoryItem(
  state: GameState,
  item: "oracle" | "extraHeart" | "bailout",
  count = 1
): GameState {
  const current = state.inventory ? { ...state.inventory } : { ...INITIAL_INVENTORY };

  if (item === "oracle") {
    current.oracleCharges += count * 5; // 5 card previews per purchase
    current.isOracleActive = true;
  } else if (item === "extraHeart") {
    if (current.extraHeartPurchases >= MAX_EXTRA_HEARTS) return state;
    current.extraHearts += count;
    current.extraHeartPurchases += count;
  } else if (item === "bailout") {
    if (current.bailoutPurchases >= MAX_BAILOUTS) return state;
    current.bailoutCount += count;
    current.bailoutPurchases += count;
  }

  return {
    ...state,
    inventory: current,
  };
}

/**
 * Advance to the next chapter after chapter_complete status.
 */
export function advanceChapter(state: GameState): GameState {
  if (state.status !== "chapter_complete") return state;
  return {
    ...state,
    chapter: state.chapter + 1,
    cardIndex: 1,
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
    chapter: checkpoint.chapter,
    cardIndex: 1,
    meters: { ...checkpoint.meters },
    status: "playing",
    failedMeter: undefined,
  };
}

// ── Scoring ──────────────────────────────────────────────────

/**
 * Calculate the final score.
 * Score = average of all 4 meters × chapters completed × 10
 */
export function calculateScore(
  meters: Meters,
  chaptersCompleted: number
): number {
  const avg =
    (meters.economy +
      meters.publicTrust +
      meters.policyPower +
      meters.bankingHealth) /
    4;
  return Math.round(avg * Math.max(0, chaptersCompleted) * 10);
}

/**
 * Get the number of chapters completed based on the game state.
 */
export function getChaptersCompleted(state: GameState): number {
  if (state.status === "completed") return TOTAL_CHAPTERS;
  if (state.chapter === 0) return 0;
  return Math.max(0, state.chapter - 1);
}
