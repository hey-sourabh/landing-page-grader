import { NextRequest, NextResponse } from "next/server";
import { gradeUrl } from "@/lib/analyzer/grader";
import { normalizeUrl } from "@/lib/utils";
import type { GradeResult } from "@/types";

// In-memory cache for fast repeated runs within same session
const cache = new Map<string, { result: GradeResult; expiresAt: number }>();
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawUrl = body.url;

    if (!rawUrl || typeof rawUrl !== "string") {
      return NextResponse.json(
        { success: false, error: "A valid URL string is required." },
        { status: 400 }
      );
    }

    const url = normalizeUrl(rawUrl);

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid URL protocol or domain format." },
        { status: 400 }
      );
    }

    // Check cache unless refresh requested
    const cacheKey = url.toLowerCase();
    const cached = cache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now() && !body.refresh) {
      return NextResponse.json({
        success: true,
        data: cached.result,
        cached: true,
      });
    }

    // Run grading engine
    const gradeResult = await gradeUrl(url);

    // Cache the result
    cache.set(cacheKey, {
      result: gradeResult,
      expiresAt: Date.now() + CACHE_TTL_MS,
    });

    return NextResponse.json({
      success: true,
      data: gradeResult,
      cached: false,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Grading API error:", err);
    return NextResponse.json(
      {
        success: false,
        error:
          err.message ||
          "Failed to fetch and grade the requested URL. Please ensure the site is reachable.",
      },
      { status: 500 }
    );
  }
}
