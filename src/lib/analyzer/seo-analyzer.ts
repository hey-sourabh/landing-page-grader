import type { CheerioAPI } from "cheerio";
import type { SEOAnalysis } from "@/types";

export function analyzeSEO($: CheerioAPI, url: string): SEOAnalysis {
  const title = $("title").text().trim();
  const titleLength = title.length;

  const metaDescription =
    $('meta[name="description"]').attr("content")?.trim() || "";
  const metaDescriptionLength = metaDescription.length;

  const h1Elements = $("h1");
  const hasH1 = h1Elements.length > 0;
  const h1Count = h1Elements.length;

  const headingStructure: { tag: string; text: string }[] = [];
  $("h1, h2, h3, h4, h5, h6").each((_, el) => {
    const tag = $(el).prop("tagName")?.toLowerCase() || "h1";
    const text = $(el).text().trim();
    if (text) {
      headingStructure.push({ tag, text: text.substring(0, 80) });
    }
  });

  const hasOpenGraph =
    $('meta[property^="og:"]').length > 0 ||
    $('meta[name^="og:"]').length > 0;

  const hasTwitterCard =
    $('meta[name^="twitter:"]').length > 0 ||
    $('meta[property^="twitter:"]').length > 0;

  let internalLinks = 0;
  let externalLinks = 0;
  try {
    const domain = new URL(url).hostname;
    $("a[href]").each((_, el) => {
      const href = $(el).attr("href") || "";
      if (href.startsWith("/") || href.startsWith("#")) {
        internalLinks++;
      } else if (href.startsWith("http")) {
        try {
          const linkDomain = new URL(href).hostname;
          if (linkDomain.includes(domain) || domain.includes(linkDomain)) {
            internalLinks++;
          } else {
            externalLinks++;
          }
        } catch {
          externalLinks++;
        }
      }
    });
  } catch {
  }

  const hasCanonical = $('link[rel="canonical"]').length > 0;

  return {
    title,
    titleLength,
    metaDescription,
    metaDescriptionLength,
    hasH1,
    h1Count,
    headingStructure,
    hasOpenGraph,
    hasTwitterCard,
    internalLinks,
    externalLinks,
    hasCanonical,
  };
}
