import type { CheerioAPI } from "cheerio";
import type { TechnicalAnalysis } from "@/types";

export function analyzeTechnical(
  $: CheerioAPI,
  url: string,
  _headers?: Record<string, string>
): TechnicalAnalysis {
  // SSL check
  const hasSSL = url.startsWith("https://");

  // Mobile friendly indicators
  const hasViewport = $('meta[name="viewport"]').length > 0;
  const viewportContent = $('meta[name="viewport"]').attr("content") || "";
  const isMobileFriendly =
    hasViewport && viewportContent.includes("width=device-width");

  // Structured data
  const hasStructuredData =
    $('script[type="application/ld+json"]').length > 0;

  // Canonical
  const hasCanonical = $('link[rel="canonical"]').length > 0;

  // Favicon
  const hasFavicon =
    $('link[rel="icon"]').length > 0 ||
    $('link[rel="shortcut icon"]').length > 0 ||
    $('link[rel="apple-touch-icon"]').length > 0;

  // Robots
  const robotsMeta = $('meta[name="robots"]').attr("content") || "";
  const hasRobotsTxt = !robotsMeta.includes("noindex");

  // Sitemap (check for sitemap link in HTML)
  const hasSitemap =
    $('a[href*="sitemap"]').length > 0 ||
    $('link[rel="sitemap"]').length > 0;

  // Image optimization
  const images = $("img");
  const totalImages = images.length;
  let imagesWithAlt = 0;
  let optimizedImages = 0;

  images.each((_, img) => {
    const alt = $(img).attr("alt");
    if (alt && alt.trim()) imagesWithAlt++;

    // Check for modern image formats or lazy loading
    const src = $(img).attr("src") || "";
    const srcset = $(img).attr("srcset") || "";
    const loading = $(img).attr("loading");

    if (
      src.includes(".webp") ||
      src.includes(".avif") ||
      srcset.includes("webp") ||
      srcset.includes("avif") ||
      loading === "lazy" ||
      $(img).attr("decoding") === "async"
    ) {
      optimizedImages++;
    }
  });

  const imageOptimization =
    totalImages > 0
      ? Math.round((optimizedImages / totalImages) * 100)
      : 100;

  return {
    hasSSL,
    isMobileFriendly,
    hasStructuredData,
    hasCanonical,
    hasFavicon,
    hasRobotsTxt,
    hasSitemap,
    imageOptimization,
    totalImages,
    imagesWithAlt,
  };
}
