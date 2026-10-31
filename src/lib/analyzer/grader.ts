import type { GradeResult } from "@/types";
import { fetchPage } from "./page-fetcher";
import { getPageSpeedData } from "./pagespeed";
import { analyzeContent } from "./content-analyzer";
import { analyzeSEO } from "./seo-analyzer";
import { analyzeConversion } from "./conversion-analyzer";
import { analyzeTechnical } from "./technical-analyzer";
import { detectAudience } from "./audience-detector";
import { calculateScore } from "./scorer";
import { normalizeUrl, extractDomain, getScoreLabel } from "@/lib/utils";

export async function gradeUrl(url: string): Promise<GradeResult> {
  const normalizedUrl = normalizeUrl(url);
  const domain = extractDomain(normalizedUrl);

  // Fetch and parse the live page
  const page = await fetchPage(normalizedUrl);

  // Run all analyses in parallel
  const [pageSpeed, contentAnalysis, seoAnalysis, conversionAnalysis, technicalAnalysis, audience] =
    await Promise.all([
      getPageSpeedData(normalizedUrl),
      Promise.resolve(analyzeContent(page.$)),
      Promise.resolve(analyzeSEO(page.$, normalizedUrl)),
      Promise.resolve(analyzeConversion(page.$)),
      Promise.resolve(analyzeTechnical(page.$, normalizedUrl)),
      Promise.resolve(detectAudience(page.$)),
    ]);

  // Calculate scores under Rubric v2 (Audience-Aware)
  const v2Result = calculateScore(
    pageSpeed,
    contentAnalysis,
    seoAnalysis,
    conversionAnalysis,
    technicalAnalysis,
    audience,
    "v2"
  );

  // Also calculate scores under Rubric v1 (Baseline Initial) for comparison & calibration review
  const v1Result = calculateScore(
    pageSpeed,
    contentAnalysis,
    seoAnalysis,
    conversionAnalysis,
    technicalAnalysis,
    audience,
    "v1"
  );

  const id = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `grade_${Date.now()}`;

  return {
    id,
    url: normalizedUrl,
    domain,
    timestamp: new Date().toISOString(),
    overallScore: v2Result.overallScore,
    scoreLabel: getScoreLabel(v2Result.overallScore),
    audience,
    categories: v2Result.categories,
    pageSpeed,
    contentAnalysis,
    seoAnalysis,
    conversionAnalysis,
    technicalAnalysis,
    loadTime: page.loadTime,
    v1Score: v1Result.overallScore,
    v1Categories: v1Result.categories,
    v2Score: v2Result.overallScore,
  };
}

