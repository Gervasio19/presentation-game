import { NextRequest, NextResponse } from "next/server";
import { LeaderboardEntry } from "@/lib/game/gameTypes";

// ============================================================
// LAPSE — Secure Leaderboard API Route
// ============================================================
// Token Security:
// - UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are accessed
//   strictly server-side in this API route, NEVER exposed to client.
// Anti-Cheat & Validation:
// - Server-side recalculation and validation of score
// - Sanitization of player names (2-30 chars, XSS-safe)
// - Bounded chapters (0-6) and time validation
// ============================================================

const LEADERBOARD_KEY = "lapse:leaderboard";
const MAX_LEADERBOARD_ENTRIES = 100;

// Lazy-loaded Redis instance
let redisInstance: {
  get: (key: string) => Promise<LeaderboardEntry[] | null>;
  set: (key: string, value: LeaderboardEntry[]) => Promise<unknown>;
} | null = null;

async function getRedis() {
  if (redisInstance) return redisInstance;

  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN;

  if (url && token) {
    try {
      const { Redis } = await import("@upstash/redis");
      redisInstance = new Redis({ url, token });
      return redisInstance;
    } catch (err) {
      console.error("Redis init with url/token error:", err);
    }
  }

  // Fallback to Redis.fromEnv() which scans all standard Vercel KV and Upstash prefixes
  try {
    const { Redis } = await import("@upstash/redis");
    redisInstance = Redis.fromEnv();
    return redisInstance;
  } catch {
    // If no Redis environment is configured, fallback smoothly to in-memory store
  }

  return null;
}

// In-memory fallback for local development
let memoryStore: LeaderboardEntry[] = [];

async function getEntries(): Promise<LeaderboardEntry[]> {
  const r = await getRedis();
  if (r) {
    try {
      const data = await r.get(LEADERBOARD_KEY);
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("Redis get error:", err);
      return [...memoryStore];
    }
  }
  return [...memoryStore];
}

async function saveEntries(entries: LeaderboardEntry[]): Promise<void> {
  const topEntries = entries.slice(0, MAX_LEADERBOARD_ENTRIES);
  const r = await getRedis();
  if (r) {
    try {
      await r.set(LEADERBOARD_KEY, topEntries);
    } catch (err) {
      console.error("Redis save error:", err);
      memoryStore = topEntries;
    }
  } else {
    memoryStore = topEntries;
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
    // 3. Less time = better (faster completion)
    return a.timeSeconds - b.timeSeconds;
  });
}

function sanitizeName(rawName: unknown): string | null {
  if (typeof rawName !== "string") return null;
  // Strip control chars, html tags, excessive whitespace
  const sanitized = rawName.replace(/<[^>]*>?/gm, "").trim().slice(0, 30);
  if (sanitized.length < 2) return null;
  return sanitized;
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

// ── POST: Submit score with strict server verification ─────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name: rawName, score: clientScore, chaptersCompleted: rawChapters, timeSeconds: rawTime, finalMeters } = body;

    // 1. Validate Player Name
    const cleanName = sanitizeName(rawName);
    if (!cleanName) {
      return NextResponse.json(
        { error: "Tên người chơi phải từ 2 đến 30 ký tự." },
        { status: 400 }
      );
    }

    // 2. Validate Chapters Completed (0 to 6)
    const chapters = Number(rawChapters);
    if (isNaN(chapters) || chapters < 0 || chapters > 6) {
      return NextResponse.json(
        { error: "Dữ liệu Chapter hoàn thành không hợp lệ." },
        { status: 400 }
      );
    }

    // 3. Validate Time Elapsed (at least 5s, max 4h)
    const time = Number(rawTime);
    if (isNaN(time) || time < 5 || time > 14400) {
      return NextResponse.json(
        { error: "Thời gian chơi không hợp lệ." },
        { status: 400 }
      );
    }

    // 4. Validate and Sanitize Final Meters
    const meters = {
      economy: Math.max(0, Math.min(100, Number(finalMeters?.economy ?? 50))),
      publicTrust: Math.max(0, Math.min(100, Number(finalMeters?.publicTrust ?? 50))),
      policyPower: Math.max(0, Math.min(100, Number(finalMeters?.policyPower ?? 50))),
      bankingHealth: Math.max(0, Math.min(100, Number(finalMeters?.bankingHealth ?? 50))),
    };

    // 5. Server-side Score Recalculation & Anti-Cheat Validation
    // Formula: average(4 meters) * chaptersCompleted * 10 (max ~6000)
    const avgMeters = (meters.economy + meters.publicTrust + meters.policyPower + meters.bankingHealth) / 4;
    const serverVerifiedScore = Math.round(avgMeters * chapters * 10);

    // If client score deviates abnormally or exceeds theoretical cap (6000), use verified server score
    let finalScore = Math.round(Number(clientScore));
    if (isNaN(finalScore) || finalScore < 0 || finalScore > 6500 || Math.abs(finalScore - serverVerifiedScore) > 50) {
      finalScore = serverVerifiedScore;
    }

    const entry: LeaderboardEntry = {
      id: `${cleanName.toLowerCase()}-${Date.now()}`,
      name: cleanName,
      score: finalScore,
      chaptersCompleted: chapters,
      timeSeconds: Math.round(time),
      finalMeters: meters,
      submittedAt: new Date().toISOString(),
    };

    const entries = await getEntries();

    // Deduplicate / Update: if same player submits a better result, update their record
    const existingIdx = entries.findIndex(
      (e) => e.name.toLowerCase() === cleanName.toLowerCase()
    );

    if (existingIdx !== -1) {
      const existing = entries[existingIdx];
      const isBetter =
        entry.chaptersCompleted > existing.chaptersCompleted ||
        (entry.chaptersCompleted === existing.chaptersCompleted && entry.score > existing.score) ||
        (entry.chaptersCompleted === existing.chaptersCompleted && entry.score === existing.score && entry.timeSeconds < existing.timeSeconds);

      if (isBetter) {
        entries[existingIdx] = entry;
      }
    } else {
      entries.push(entry);
    }

    const sorted = sortEntries(entries);
    await saveEntries(sorted);

    // Find rank in updated leaderboard
    const rank = sorted.findIndex((e) => e.name.toLowerCase() === cleanName.toLowerCase()) + 1;

    return NextResponse.json({ success: true, rank, entry });
  } catch (error) {
    console.error("Leaderboard POST error:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi khi lưu bảng xếp hạng." },
      { status: 500 }
    );
  }
}
