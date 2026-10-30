import type { PageSpeedData } from "@/types";

const PAGESPEED_API_URL = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

interface LighthouseCategory {
  score: number | null;
}

interface LighthouseAudit {
  numericValue?: number;
  score?: number | null;
}

interface PageSpeedResponse {
  lighthouseResult?: {
    categories?: {
      performance?: LighthouseCategory;
      accessibility?: LighthouseCategory;
      "best-practices"?: LighthouseCategory;
      seo?: LighthouseCategory;
    };
    audits?: Record<string, LighthouseAudit>;
  };
  error?: {
    message: string;
  };
}

export async function getPageSpeedData(url: string): Promise<PageSpeedData> {
  const apiKey = process.env.PAGESPEED_API_KEY;

  const params = new URLSearchParams({
    url,
    category: "PERFORMANCE",
    strategy: "MOBILE",
  });

  // Add multiple categories
  ["ACCESSIBILITY", "BEST_PRACTICES", "SEO"].forEach((cat) => {
    params.append("category", cat);
  });

  if (apiKey) {
    params.set("key", apiKey);
  }

  try {
    const response = await fetch(`${PAGESPEED_API_URL}?${params.toString()}`, {
      signal: AbortSignal.timeout(60000),
    });

    if (!response.ok) {
      console.error(`PageSpeed API error: ${response.status}`);
      return getDefaultPageSpeedData();
    }

    const data: PageSpeedResponse = await response.json();

    if (data.error) {
      console.error(`PageSpeed API error: ${data.error.message}`);
      return getDefaultPageSpeedData();
    }

    const categories = data.lighthouseResult?.categories;
    const audits = data.lighthouseResult?.audits;

    return {
      performanceScore: Math.round((categories?.performance?.score ?? 0) * 100),
      accessibilityScore: Math.round((categories?.accessibility?.score ?? 0) * 100),
      bestPracticesScore: Math.round((categories?.["best-practices"]?.score ?? 0) * 100),
      seoScore: Math.round((categories?.seo?.score ?? 0) * 100),
      lcp: audits?.["largest-contentful-paint"]?.numericValue ?? 0,
      fid: audits?.["max-potential-fid"]?.numericValue ?? 0,
      cls: audits?.["cumulative-layout-shift"]?.numericValue ?? 0,
      fcp: audits?.["first-contentful-paint"]?.numericValue ?? 0,
      si: audits?.["speed-index"]?.numericValue ?? 0,
      tbt: audits?.["total-blocking-time"]?.numericValue ?? 0,
      ttfb: audits?.["server-response-time"]?.numericValue ?? 0,
    };
  } catch (error) {
    console.error("PageSpeed fetch failed:", error);
    return getDefaultPageSpeedData();
  }
}

function getDefaultPageSpeedData(): PageSpeedData {
  return {
    performanceScore: 50,
    accessibilityScore: 50,
    bestPracticesScore: 50,
    seoScore: 50,
    lcp: 4000,
    fid: 300,
    cls: 0.25,
    fcp: 3000,
    si: 4500,
    tbt: 600,
    ttfb: 800,
  };
}
