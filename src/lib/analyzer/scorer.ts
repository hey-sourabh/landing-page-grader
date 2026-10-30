import type {
  AudienceDetection,
  ContentAnalysis,
  ConversionAnalysis,
  PageSpeedData,
  RubricCategory,
  RubricDetail,
  SEOAnalysis,
  TechnicalAnalysis,
} from "@/types";
import { RUBRIC_WEIGHTS } from "@/lib/constants";

export interface ScorerOutput {
  overallScore: number;
  categories: RubricCategory[];
  rubricVersion: "v1" | "v2";
}

// Rubric v1 (Initial baseline: static weights, no audience adaptation)
export const RUBRIC_V1_WEIGHTS = {
  performance: 0.30,
  seo: 0.20,
  content: 0.20,
  conversion: 0.15,
  accessibility: 0.10,
  technical: 0.05,
};

export function calculateScore(
  pageSpeed: PageSpeedData,
  content: ContentAnalysis,
  seo: SEOAnalysis,
  conversion: ConversionAnalysis,
  technical: TechnicalAnalysis,
  audience: AudienceDetection,
  version: "v1" | "v2" = "v2"
): ScorerOutput {
  const weights =
    version === "v1"
      ? RUBRIC_V1_WEIGHTS
      : RUBRIC_WEIGHTS[audience.primaryAudience] || RUBRIC_WEIGHTS["enterprise-buyer"];

  const performanceCategory = scorePerformance(pageSpeed);
  const seoCategory = scoreSEO(seo);
  const contentCategory = scoreContent(content, audience, version);
  const conversionCategory = scoreConversion(conversion, audience, version);
  const accessibilityCategory = scoreAccessibility(pageSpeed, technical);
  const technicalCategory = scoreTechnical(technical);

  const categories: RubricCategory[] = [
    { ...performanceCategory, weight: weights.performance },
    { ...seoCategory, weight: weights.seo },
    { ...contentCategory, weight: weights.content },
    { ...conversionCategory, weight: weights.conversion },
    { ...accessibilityCategory, weight: weights.accessibility },
    { ...technicalCategory, weight: weights.technical },
  ];

  // Calculate weighted overall score
  const overallScore = categories.reduce((total, cat) => {
    const normalizedScore = (cat.score / cat.maxScore) * 100;
    return total + normalizedScore * cat.weight;
  }, 0);

  return {
    overallScore: Math.round(overallScore * 10) / 10,
    categories,
    rubricVersion: version,
  };
}

function scorePerformance(ps: PageSpeedData): Omit<RubricCategory, "weight"> {
  const details: RubricDetail[] = [];

  // PageSpeed Performance Score (0-30 points)
  const perfScore = Math.round((Math.max(0, Math.min(100, ps.performanceScore)) / 100) * 30);
  details.push({
    label: "Lighthouse Performance Metric",
    score: perfScore,
    maxScore: 30,
    finding: `Performance rating: ${ps.performanceScore}/100 based on Google PageSpeed Insights.`,
    recommendation:
      ps.performanceScore < 60
        ? "Minify JavaScript, compress assets with AVIF/WebP, and leverage browser caching."
        : undefined,
  });

  // LCP (Largest Contentful Paint) (0-25 points)
  let lcpScore = 0;
  if (ps.lcp <= 2500) lcpScore = 25;
  else if (ps.lcp <= 4000) lcpScore = 15;
  else if (ps.lcp <= 6000) lcpScore = 8;
  else lcpScore = 3;

  details.push({
    label: "Largest Contentful Paint (LCP)",
    score: lcpScore,
    maxScore: 25,
    finding: `${(ps.lcp / 1000).toFixed(2)}s (${ps.lcp <= 2500 ? "Good <= 2.5s" : ps.lcp <= 4000 ? "Needs Improvement <= 4.0s" : "Poor > 4.0s"}).`,
    recommendation:
      ps.lcp > 2500
        ? "Preload the hero image/LCP element and eliminate render-blocking stylesheets."
        : undefined,
  });

  // CLS (Cumulative Layout Shift) (0-20 points)
  let clsScore = 0;
  if (ps.cls <= 0.1) clsScore = 20;
  else if (ps.cls <= 0.25) clsScore = 12;
  else if (ps.cls <= 0.5) clsScore = 5;
  else clsScore = 2;

  details.push({
    label: "Cumulative Layout Shift (CLS)",
    score: clsScore,
    maxScore: 20,
    finding: `${ps.cls.toFixed(3)} (${ps.cls <= 0.1 ? "Good <= 0.1" : ps.cls <= 0.25 ? "Needs Improvement <= 0.25" : "Poor > 0.25"}).`,
    recommendation:
      ps.cls > 0.1
        ? "Explicitly reserve aspect-ratio dimensions on all images and banner containers."
        : undefined,
  });

  // TBT (Total Blocking Time) (0-25 points)
  let tbtScore = 0;
  if (ps.tbt <= 200) tbtScore = 25;
  else if (ps.tbt <= 600) tbtScore = 15;
  else if (ps.tbt <= 1000) tbtScore = 8;
  else tbtScore = 3;

  details.push({
    label: "Total Blocking Time (TBT)",
    score: tbtScore,
    maxScore: 25,
    finding: `${Math.round(ps.tbt)}ms (${ps.tbt <= 200 ? "Good <= 200ms" : ps.tbt <= 600 ? "Needs Improvement <= 600ms" : "Poor > 600ms"}).`,
    recommendation:
      ps.tbt > 200
        ? "Defer third-party tracking tags (GTM, Hotjar, Drift) and split large bundle scripts."
        : undefined,
  });

  const totalScore = details.reduce((sum, d) => sum + d.score, 0);
  const maxScore = details.reduce((sum, d) => sum + d.maxScore, 0);

  return {
    name: "Performance",
    key: "performance",
    score: totalScore,
    maxScore,
    details,
  };
}

function scoreSEO(seo: SEOAnalysis): Omit<RubricCategory, "weight"> {
  const details: RubricDetail[] = [];

  // Title tag (0-20 points)
  const titleScore =
    seo.titleLength >= 30 && seo.titleLength <= 65
      ? 20
      : seo.titleLength > 10 && seo.titleLength < 80
      ? 14
      : seo.titleLength > 0
      ? 8
      : 0;

  details.push({
    label: "Page Title Tag",
    score: titleScore,
    maxScore: 20,
    finding: seo.title
      ? `"${seo.title.substring(0, 65)}${seo.title.length > 65 ? "..." : ""}" (${seo.titleLength} chars)`
      : "Missing <title> tag.",
    recommendation:
      titleScore < 20
        ? "Keep title length between 30 and 65 characters with clear solution keywords."
        : undefined,
  });

  // Meta description (0-20 points)
  const metaScore =
    seo.metaDescriptionLength >= 120 && seo.metaDescriptionLength <= 165
      ? 20
      : seo.metaDescriptionLength >= 60 && seo.metaDescriptionLength <= 200
      ? 12
      : seo.metaDescriptionLength > 0
      ? 6
      : 0;

  details.push({
    label: "Meta Description",
    score: metaScore,
    maxScore: 20,
    finding: seo.metaDescription
      ? `${seo.metaDescriptionLength} characters provided.`
      : "No meta description tag discovered.",
    recommendation:
      metaScore < 20
        ? "Craft a concise 120-160 character meta description with an actionable CTA."
        : undefined,
  });

  // Heading hierarchy (0-20 points)
  let headingScore = 0;
  if (seo.hasH1) headingScore += 10;
  if (seo.h1Count === 1) headingScore += 5;
  if (seo.headingStructure.length >= 3) headingScore += 5;

  details.push({
    label: "Heading Structure (H1-H6)",
    score: headingScore,
    maxScore: 20,
    finding: `${seo.h1Count} H1 found; ${seo.headingStructure.length} subheadings detected.`,
    recommendation:
      !seo.hasH1
        ? "Add a single, authoritative H1 tag that matches primary user search query."
        : seo.h1Count > 1
        ? "Consolidate into exactly one H1 tag to maintain semantic hierarchy."
        : undefined,
  });

  // Open Graph & Social Cards (0-20 points)
  let socialScore = 0;
  if (seo.hasOpenGraph) socialScore += 10;
  if (seo.hasTwitterCard) socialScore += 10;

  details.push({
    label: "Social Open Graph Tags",
    score: socialScore,
    maxScore: 20,
    finding: `Open Graph: ${seo.hasOpenGraph ? "Configured ✓" : "Missing ✗"} | Twitter Card: ${seo.hasTwitterCard ? "Configured ✓" : "Missing ✗"}`,
    recommendation:
      socialScore < 20
        ? "Provide og:image, og:title, and twitter:card tags for optimal preview on LinkedIn/X."
        : undefined,
  });

  // Canonical tag & Link architecture (0-20 points)
  let linkScore = 0;
  if (seo.hasCanonical) linkScore += 10;
  if (seo.internalLinks >= 4) linkScore += 10;
  else if (seo.internalLinks > 0) linkScore += 5;

  details.push({
    label: "Canonical & Internal Links",
    score: linkScore,
    maxScore: 20,
    finding: `Canonical tag: ${seo.hasCanonical ? "Present ✓" : "Missing ✗"} | Internal links: ${seo.internalLinks} | External links: ${seo.externalLinks}`,
    recommendation: !seo.hasCanonical ? "Specify a rel='canonical' link to prevent duplicate indexing." : undefined,
  });

  const totalScore = details.reduce((sum, d) => sum + d.score, 0);
  const maxScore = details.reduce((sum, d) => sum + d.maxScore, 0);

  return {
    name: "SEO",
    key: "seo",
    score: totalScore,
    maxScore,
    details,
  };
}

function scoreContent(
  content: ContentAnalysis,
  audience: AudienceDetection,
  version: "v1" | "v2"
): Omit<RubricCategory, "weight"> {
  const details: RubricDetail[] = [];

  // Headline clarity (0-25 points)
  const headlineScore = Math.round((content.headlineClarity / 100) * 25);
  details.push({
    label: "Headline Clarity & Value Hook",
    score: headlineScore,
    maxScore: 25,
    finding: content.headlines[0]
      ? `Main headline: "${content.headlines[0].substring(0, 70)}" (Clarity Index: ${content.headlineClarity}/100)`
      : "No primary H1 headline found.",
    recommendation:
      headlineScore < 18
        ? "Frame headline around the specific outcome your customer achieves, avoiding buzzwords."
        : undefined,
  });

  // Value proposition (0-25 points)
  const vpScore = Math.round((content.valueProposition / 100) * 25);
  details.push({
    label: "Value Proposition Strength",
    score: vpScore,
    maxScore: 25,
    finding: `Evaluation: ${content.valueProposition >= 70 ? "High clarity with explicit benefits" : content.valueProposition >= 40 ? "Moderate, could use sharper metrics" : "Vague or generic messaging"}`,
    recommendation:
      vpScore < 18
        ? "Add quantified proof points (e.g., 'Resolves 70% of employee queries in 30 seconds')."
        : undefined,
  });

  // CTA text & Actionability (0-25 points)
  const ctaScore = Math.round((content.ctaQuality / 100) * 25);
  details.push({
    label: "Call-to-Action Actionability",
    score: ctaScore,
    maxScore: 25,
    finding: `${content.ctas.length} distinct CTA triggers detected: [${content.ctas.slice(0, 3).join(", ")}]`,
    recommendation:
      ctaScore < 18
        ? "Replace generic text like 'Submit' with benefit-oriented copy such as 'Schedule Live HR Demo'."
        : undefined,
  });

  // Readability & Content Length (0-25 points)
  const readScore = Math.round((content.readabilityScore / 100) * 25);
  details.push({
    label: "Readability & Scannability",
    score: readScore,
    maxScore: 25,
    finding: `Readability score: ${Math.round(content.readabilityScore)}/100 across ~${content.contentLength} words.`,
    recommendation:
      readScore < 15
        ? "Use bullet points, bold key phrases, and break text into bite-sized 2-sentence paragraphs."
        : undefined,
  });

  const totalScore = details.reduce((sum, d) => sum + d.score, 0);
  const maxScore = details.reduce((sum, d) => sum + d.maxScore, 0);

  const audienceNote =
    version === "v2"
      ? audience.primaryAudience === "information-seeker"
        ? "Weighted heavily at 30% for Information Seekers because learning value and depth are the primary conversion drivers."
        : audience.primaryAudience === "enterprise-buyer"
        ? "Weighted at 20% for Enterprise Buyers: crisp messaging is critical, but trust and conversion friction outweigh pure text."
        : "Weighted at 15% for Self-Serve: clean, minimal copy beats long sales prose."
      : "Baseline static weight: 20%.";

  return {
    name: "Content Quality",
    key: "content",
    score: totalScore,
    maxScore,
    details,
    audienceNote,
  };
}

function scoreConversion(
  conv: ConversionAnalysis,
  audience: AudienceDetection,
  version: "v2" | "v1"
): Omit<RubricCategory, "weight"> {
  const details: RubricDetail[] = [];

  // Form presence and low-friction fields (0-20 points)
  let formScore = 0;
  if (conv.formCount > 0) {
    formScore += 10;
    if (conv.formFields >= 1 && conv.formFields <= 5) formScore += 10; // optimal friction
    else if (conv.formFields > 5 && conv.formFields <= 8) formScore += 6;
    else formScore += 3;
  } else if (conv.ctaCount > 0) {
    // If modal/offsite CTA exists
    formScore += 7;
  }

  details.push({
    label: "Lead Capture Form Friction",
    score: formScore,
    maxScore: 20,
    finding:
      conv.formCount > 0
        ? `${conv.formCount} form(s) found with ${conv.formFields} total input fields.`
        : "No inline lead capture form found (direct CTA buttons only).",
    recommendation:
      conv.formCount === 0
        ? "Embed an inline capture form for high-intent landing pages."
        : conv.formFields > 5
        ? "Remove unnecessary form fields (e.g. phone/address) to reduce drop-off."
        : undefined,
  });

  // Above-the-fold CTA trigger (0-20 points)
  const aboveFoldScore = conv.aboveFoldCTA ? 20 : 0;
  details.push({
    label: "Above-the-Fold Primary CTA",
    score: aboveFoldScore,
    maxScore: 20,
    finding: conv.aboveFoldCTA
      ? "Prominent CTA found in hero / header viewport."
      : "No prominent CTA found above the initial fold.",
    recommendation: !conv.aboveFoldCTA ? "Place a primary action button in the hero banner above the fold." : undefined,
  });

  // Social Proof & Enterprise Trust Logos (0-20 points)
  let proofScore = 0;
  if (conv.hasTestimonials) proofScore += 10;
  if (conv.hasLogos) proofScore += 10;

  details.push({
    label: "Social Proof & Customer Logos",
    score: proofScore,
    maxScore: 20,
    finding: `Customer Testimonials: ${conv.hasTestimonials ? "Found ✓" : "None ✗"} | Brand Logos: ${conv.hasLogos ? "Found ✓" : "None ✗"}`,
    recommendation:
      proofScore < 20
        ? "Showcase recognizable enterprise customer logos (e.g. Puma, Abbott, Coca-Cola) and customer quotes."
        : undefined,
  });

  // Rich Supporting Signals: Video, FAQ, Pricing, Live Chat (0-20 points)
  let supportScore = 0;
  if (conv.hasVideo) supportScore += 5;
  if (conv.hasFAQ) supportScore += 5;
  if (conv.hasPricing) supportScore += 5;
  if (conv.hasChatWidget) supportScore += 5;

  details.push({
    label: "Conversion Assist Elements",
    score: supportScore,
    maxScore: 20,
    finding:
      [
        conv.hasVideo ? "Product Demo Video ✓" : null,
        conv.hasFAQ ? "FAQ Accordion ✓" : null,
        conv.hasPricing ? "Pricing Calculator ✓" : null,
        conv.hasChatWidget ? "Live Chat / Intercom ✓" : null,
      ]
        .filter(Boolean)
        .join(" | ") || "No secondary assist widgets detected.",
    recommendation:
      supportScore < 10
        ? "Add a 90-second product walkthrough video and an FAQ to address buyer objections."
        : undefined,
  });

  // Contact Clarity & Redundancy (0-20 points)
  let contactScore = 0;
  if (conv.hasPhoneNumber) contactScore += 10;
  if (conv.ctaCount >= 2) contactScore += 10;
  else if (conv.ctaCount === 1) contactScore += 5;

  details.push({
    label: "Action Pathway Redundancy",
    score: contactScore,
    maxScore: 20,
    finding: `${conv.ctaCount} actionable buttons throughout page | Phone direct line: ${conv.hasPhoneNumber ? "Yes" : "No"}.`,
    recommendation:
      conv.ctaCount < 2 ? "Repeat the primary CTA at the bottom of the page after the value evidence." : undefined,
  });

  const totalScore = details.reduce((sum, d) => sum + d.score, 0);
  const maxScore = details.reduce((sum, d) => sum + d.maxScore, 0);

  const audienceNote =
    version === "v2"
      ? audience.primaryAudience === "enterprise-buyer"
        ? "Weighted at 30% (HIGHEST) for Enterprise Buyers: Enterprise sales pipeline directly hinges on demo requests, proof points, and qualified forms."
        : audience.primaryAudience === "information-seeker"
        ? "Weighted at only 5% for Information Seekers: Aggressive sales forms disrupt educational reading and drive high bounce rates."
        : "Weighted at 20% for Self-Serve: Quick sign-up triggers matter, but speed and simplicity dominate."
      : "Baseline static weight: 15%.";

  return {
    name: "Conversion Elements",
    key: "conversion",
    score: totalScore,
    maxScore,
    details,
    audienceNote,
  };
}

function scoreAccessibility(
  ps: PageSpeedData,
  tech: TechnicalAnalysis
): Omit<RubricCategory, "weight"> {
  const details: RubricDetail[] = [];

  // Lighthouse accessibility score (0-40 points)
  const a11yScore = Math.round((Math.max(0, Math.min(100, ps.accessibilityScore)) / 100) * 40);
  details.push({
    label: "Lighthouse Accessibility Audit",
    score: a11yScore,
    maxScore: 40,
    finding: `Accessibility rating: ${ps.accessibilityScore}/100.`,
    recommendation:
      ps.accessibilityScore < 85
        ? "Audit color contrast ratios and ensure interactive elements have keyboard tab focus."
        : undefined,
  });

  // Image alt text coverage (0-30 points)
  const altScore =
    tech.totalImages === 0 ? 30 : Math.round((tech.imagesWithAlt / tech.totalImages) * 30);
  details.push({
    label: "Image Alt Attribute Coverage",
    score: altScore,
    maxScore: 30,
    finding: `${tech.imagesWithAlt} of ${tech.totalImages} images have valid alt descriptions (${tech.totalImages > 0 ? Math.round((tech.imagesWithAlt / tech.totalImages) * 100) : 100}%).`,
    recommendation:
      altScore < 25 ? "Provide descriptive alt text for screen readers on all illustrative graphics." : undefined,
  });

  // Mobile viewport configuration (0-30 points)
  const mobileScore = tech.isMobileFriendly ? 30 : 0;
  details.push({
    label: "Responsive Mobile Viewport",
    score: mobileScore,
    maxScore: 30,
    finding: tech.isMobileFriendly
      ? "Valid viewport meta tag configured for responsive breakpoints."
      : "Missing mobile viewport meta tag.",
    recommendation: !tech.isMobileFriendly ? "Add meta name='viewport' content='width=device-width, initial-scale=1'." : undefined,
  });

  const totalScore = details.reduce((sum, d) => sum + d.score, 0);
  const maxScore = details.reduce((sum, d) => sum + d.maxScore, 0);

  return {
    name: "Accessibility",
    key: "accessibility",
    score: totalScore,
    maxScore,
    details,
  };
}

function scoreTechnical(tech: TechnicalAnalysis): Omit<RubricCategory, "weight"> {
  const details: RubricDetail[] = [];

  // SSL / HTTPS (0-25 points)
  details.push({
    label: "Transport Layer Security (HTTPS)",
    score: tech.hasSSL ? 25 : 0,
    maxScore: 25,
    finding: tech.hasSSL ? "Encrypted over HTTPS ✓" : "Insecure HTTP connection ✗",
    recommendation: !tech.hasSSL ? "Force automatic redirection to HTTPS." : undefined,
  });

  // Structured Data (Schema.org / JSON-LD) (0-25 points)
  details.push({
    label: "Schema.org Structured Data",
    score: tech.hasStructuredData ? 25 : 0,
    maxScore: 25,
    finding: tech.hasStructuredData
      ? "Valid JSON-LD schema found on page."
      : "No structured data markup detected.",
    recommendation:
      !tech.hasStructuredData
        ? "Implement SoftwareApplication or Organization JSON-LD markup for enhanced SERP rich snippets."
        : undefined,
  });

  // Modern Image Optimization (0-25 points)
  const imgOptScore = Math.round((tech.imageOptimization / 100) * 25);
  details.push({
    label: "Next-Gen Image Formats & Lazy Loading",
    score: imgOptScore,
    maxScore: 25,
    finding: `${tech.imageOptimization}% of images use WebP/AVIF or native lazy loading.`,
    recommendation:
      imgOptScore < 20
        ? "Convert legacy PNG/JPEG files to WebP and apply loading='lazy' to below-fold media."
        : undefined,
  });

  // Essential Health Checks (Favicon, Canonical, Robots) (0-25 points)
  let healthScore = 0;
  if (tech.hasFavicon) healthScore += 8;
  if (tech.hasCanonical) healthScore += 9;
  if (tech.hasRobotsTxt) healthScore += 8;

  details.push({
    label: "Essential Technical Hygiene",
    score: healthScore,
    maxScore: 25,
    finding: `Favicon: ${tech.hasFavicon ? "✓" : "✗"} | Canonical: ${tech.hasCanonical ? "✓" : "✗"} | Crawlable: ${tech.hasRobotsTxt ? "✓" : "✗"}`,
    recommendation:
      healthScore < 25 ? "Ensure favicon and canonical link tags are explicitly declared in the <head>." : undefined,
  });

  const totalScore = details.reduce((sum, d) => sum + d.score, 0);
  const maxScore = details.reduce((sum, d) => sum + d.maxScore, 0);

  return {
    name: "Technical Best Practices",
    key: "technical",
    score: totalScore,
    maxScore,
    details,
  };
}

