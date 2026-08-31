import { NextRequest, NextResponse } from "next/server";
import { LeaderboardEntry } from "@/lib/game/gameTypes";

// ============================================================
// LAPSE — Leaderboard API Route
// ============================================================
//
// For development & self-hosted: Uses in-memory store
// For production on Vercel: Add @upstash/redis and set env vars
//
// To use Upstash Redis (recommended for production):
// 1. Sign up at console.upstash.com (free tier)
// 2. Create a Redis database
// 3. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in Vercel env
// ============================================================

// In-memory store (works for development and single-process deployments)
// For Vercel serverless, this persists while the function is warm
const LEADERBOARD_KEY = "lapse:leaderboard";

// Try to load @upstash/redis if available
let redis: {
  get: (key: string) => Promise<LeaderboardEntry[] | null>;
  set: (key: string, value: LeaderboardEntry[]) => Promise<unknown>;
} | null = null;

async function initRedis() {
  if (redis) return redis;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    try {
      const { Redis } = await import("@upstash/redis");
      redis = new Redis({ url, token });
      return redis;
    } catch {
      // @upstash/redis not installed, fall back to in-memory
    }
  }
  return null;
}

// In-memory fallback
let memoryStore: LeaderboardEntry[] = [];

async function getEntries(): Promise<LeaderboardEntry[]> {
  const r = await initRedis();
  if (r) {
    const data = await r.get(LEADERBOARD_KEY);
    return data ?? [];
  }
  return [...memoryStore];
}

async function saveEntries(entries: LeaderboardEntry[]): Promise<void> {
  const r = await initRedis();
  if (r) {
    await r.set(LEADERBOARD_KEY, entries);
  } else {
    memoryStore = entries;
  }
}

function sortEntries(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return [...entries].sort((a, b) => {
    // 1. More chapters completed = better
    if (b.chaptersCompleted !== a.chaptersCompleted) {
      return b.chaptersCompleted - a.chaptersCompleted;
    }
    // 2. Higher score = better
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    // 3. Less time = better
    return a.timeSeconds - b.timeSeconds;
  });
}

// ── GET: Fetch leaderboard ───────────────────────────────────

export async function GET() {
  try {
    const entries = await getEntries();
    const sorted = sortEntries(entries);
    return NextResponse.json({ entries: sorted });
  } catch (error) {
    console.error("Leaderboard GET error:", error);
    return NextResponse.json({ entries: [] });
  }
}

// ── POST: Submit score ───────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, score, chaptersCompleted, timeSeconds, finalMeters } = body;

    // Validate
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }
    if (typeof score !== "number" || typeof chaptersCompleted !== "number") {
      return NextResponse.json(
        { error: "Invalid score or chapters data" },
        { status: 400 }
      );
    }

    const entry: LeaderboardEntry = {
      id: `${name.trim().toLowerCase()}-${Date.now()}`,
      name: name.trim(),
      score: Math.round(score),
      chaptersCompleted,
      timeSeconds: Math.round(timeSeconds),
      finalMeters: finalMeters ?? {
        economy: 0,
        publicTrust: 0,
        policyPower: 0,
        bankingHealth: 0,
      },
      submittedAt: new Date().toISOString(),
    };

    let entries = await getEntries();

    // Update existing entry if same player has a worse score, otherwise add
    const existingIdx = entries.findIndex(
      (e) => e.name.toLowerCase() === entry.name.toLowerCase()
    );

    if (existingIdx !== -1) {
      const existing = entries[existingIdx];
      // Keep the better score
      if (
        entry.chaptersCompleted > existing.chaptersCompleted ||
        (entry.chaptersCompleted === existing.chaptersCompleted &&
          entry.score > existing.score) ||
        (entry.chaptersCompleted === existing.chaptersCompleted &&
          entry.score === existing.score &&
          entry.timeSeconds < existing.timeSeconds)
      ) {
        entries[existingIdx] = entry;
      }
    } else {
      entries.push(entry);
    }

    const sorted = sortEntries(entries);
    await saveEntries(sorted);

    // Find rank
    const rank =
      sorted.findIndex(
        (e) => e.name.toLowerCase() === entry.name.toLowerCase()
      ) + 1;

    return NextResponse.json({ success: true, rank, entry });
  } catch (error) {
    console.error("Leaderboard POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
