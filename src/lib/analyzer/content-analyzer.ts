import type { CheerioAPI } from "cheerio";
import type { ContentAnalysis } from "@/types";

export function analyzeContent($: CheerioAPI): ContentAnalysis {
  const headlines: string[] = [];
  $("h1, h2, h3").each((_, el) => {
    const text = $(el).text().trim();
    if (text && text.length > 2) {
      headlines.push(text);
    }
  });

  const ctas: string[] = [];
  const ctaSelectors = [
    'a[class*="cta"]',
    'button[class*="cta"]',
    'a[class*="btn"]',
    'button[class*="btn"]',
    'a[class*="button"]',
    'button:not([type="submit"])',
    'input[type="submit"]',
    '[class*="hero"] a',
    '[class*="hero"] button',
  ];

  ctaSelectors.forEach((selector) => {
    $(selector).each((_, el) => {
      const text = $(el).text().trim() || $(el).attr("value") || "";
      if (text && text.length > 1 && text.length < 50) {
        ctas.push(text);
      }
    });
  });

  const uniqueCtas = [...new Set(ctas)];
  const h1 = $("h1").first().text().trim();
  const headlineClarity = scoreHeadlineClarity(h1);
  const valueProposition = scoreValueProposition($);
  const ctaQuality = scoreCTAQuality(uniqueCtas);
  const socialProof = scoreSocialProof($);
  const trustSignals = scoreTrustSignals($);

  const bodyText = $("body").text().replace(/\s+/g, " ").trim();
  const contentLength = bodyText.split(/\s+/).length;
  const readabilityScore = calculateReadability(bodyText);
  const keyMessages = extractKeyMessages($);

  return {
    headlineClarity,
    valueProposition,
    ctaQuality,
    socialProof,
    trustSignals,
    contentLength,
    readabilityScore,
    keyMessages,
    headlines,
    ctas: uniqueCtas,
  };
}

function scoreHeadlineClarity(h1: string): number {
  if (!h1) return 0;

  let score = 0;
  const wordCount = h1.split(/\s+/).length;

  if (wordCount >= 4 && wordCount <= 15) score += 30;
  else if (wordCount >= 2 && wordCount <= 20) score += 15;

  const actionWords = [
    "get", "start", "discover", "build", "transform", "automate",
    "improve", "boost", "grow", "learn", "try", "join", "create",
    "unlock", "power", "drive", "simplify", "streamline", "accelerate",
  ];
  if (actionWords.some((w) => h1.toLowerCase().includes(w))) score += 25;

  if (/\d/.test(h1)) score += 20;

  const genericPhrases = ["welcome", "home", "about us", "our company"];
  if (!genericPhrases.some((p) => h1.toLowerCase().includes(p))) score += 25;

  return Math.min(100, score);
}

function scoreValueProposition($: CheerioAPI): number {
  let score = 0;
  const heroSection = $('[class*="hero"], [class*="banner"], header, [class*="jumbotron"]').first();
  const heroText = heroSection.length ? heroSection.text() : $("h1").parent().text();

  if (!heroText) return 20;

  const benefitWords = [
    "save", "reduce", "increase", "improve", "faster", "easier",
    "better", "free", "instant", "automated", "efficient", "powerful",
    "roi", "cost", "time", "productivity", "revenue",
  ];
  const benefitCount = benefitWords.filter((w) =>
    heroText.toLowerCase().includes(w)
  ).length;
  score += Math.min(40, benefitCount * 15);

  if (/\d+%|\d+x|\$\d+|\d+ (hours|days|minutes)/.test(heroText)) score += 30;

  const subHeadline = heroSection.find("p, [class*='subtitle'], [class*='description']").first().text();
  if (subHeadline && subHeadline.length > 20) score += 30;

  return Math.min(100, score);
}

function scoreCTAQuality(ctas: string[]): number {
  if (ctas.length === 0) return 0;

  let score = 0;
  score += 20;

  const actionVerbs = [
    "get started", "try", "start", "sign up", "request", "book",
    "schedule", "download", "learn more", "see", "watch", "explore",
    "contact", "demo", "free trial",
  ];

  const hasActionCTA = ctas.some((cta) =>
    actionVerbs.some((verb) => cta.toLowerCase().includes(verb))
  );
  if (hasActionCTA) score += 30;

  const genericCTAs = ["submit", "click here", "click", "go", "ok", "send"];
  const hasSpecificCTA = ctas.some(
    (cta) => !genericCTAs.includes(cta.toLowerCase().trim())
  );
  if (hasSpecificCTA) score += 25;

  if (ctas.length >= 2 && ctas.length <= 5) score += 25;
  else if (ctas.length === 1) score += 15;

  return Math.min(100, score);
}

function scoreSocialProof($: CheerioAPI): number {
  let score = 0;

  const testimonialSelectors = [
    '[class*="testimonial"]',
    '[class*="review"]',
    '[class*="quote"]',
    'blockquote',
    '[class*="customer"]',
    '[class*="client-say"]',
  ];
  const hasTestimonials = testimonialSelectors.some((s) => $(s).length > 0);
  if (hasTestimonials) score += 30;

  const logoSelectors = [
    '[class*="logo"]',
    '[class*="client"]',
    '[class*="partner"]',
    '[class*="trusted"]',
    '[class*="brand"]',
  ];
  const hasLogos = logoSelectors.some((s) => $(s).length > 0);
  if (hasLogos) score += 25;

  const bodyText = $("body").text();
  if (/\d{1,3}(,\d{3})*\+?\s*(customers|users|companies|teams|clients|businesses)/i.test(bodyText)) {
    score += 25;
  }

  const certSelectors = ['[class*="award"]', '[class*="certif"]', '[class*="badge"]'];
  if (certSelectors.some((s) => $(s).length > 0)) score += 20;

  return Math.min(100, score);
}

function scoreTrustSignals($: CheerioAPI): number {
  let score = 0;

  const securityTerms = ["ssl", "secure", "encrypted", "privacy", "gdpr", "soc 2", "iso", "hipaa"];
  const bodyText = $("body").text().toLowerCase();
  if (securityTerms.some((term) => bodyText.includes(term))) score += 25;

  const aboutLinks = $('a[href*="about"], a[href*="team"], a[href*="company"]');
  if (aboutLinks.length > 0) score += 20;

  const hasContact = $('a[href*="contact"], a[href^="tel:"], a[href^="mailto:"]').length > 0;
  if (hasContact) score += 20;

  const footerLinks = $("footer a");
  const hasLegal = footerLinks.toArray().some((el) => {
    const href = $(el).attr("href") || "";
    const text = $(el).text().toLowerCase();
    return (
      href.includes("privacy") ||
      href.includes("terms") ||
      text.includes("privacy") ||
      text.includes("terms")
    );
  });
  if (hasLegal) score += 20;

  const socialPlatforms = ["twitter", "linkedin", "facebook", "instagram", "youtube", "x.com"];
  const hasSocial = socialPlatforms.some((platform) =>
    $(`a[href*="${platform}"]`).length > 0
  );
  if (hasSocial) score += 15;

  return Math.min(100, score);
}

function calculateReadability(text: string): number {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const words = text.split(/\s+/).filter((w) => w.length > 0);

  if (sentences.length === 0 || words.length === 0) return 50;

  const avgWordsPerSentence = words.length / sentences.length;
  const avgSyllablesPerWord =
    words.reduce((sum, word) => sum + countSyllables(word), 0) / words.length;

  const flesch = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;

  return Math.max(0, Math.min(100, flesch));
}

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (word.length <= 3) return 1;

  const vowels = word.match(/[aeiouy]+/g);
  let count = vowels ? vowels.length : 1;

  if (word.endsWith("e") && count > 1) count--;
  if (word.endsWith("le") && word.length > 3 && !/[aeiouy]/.test(word[word.length - 3])) count++;

  return Math.max(1, count);
}

function extractKeyMessages($: CheerioAPI): string[] {
  const messages: string[] = [];

  const heroH1 = $("h1").first().text().trim();
  if (heroH1) messages.push(heroH1);

  $("h2")
    .slice(0, 3)
    .each((_, el) => {
      const text = $(el).text().trim();
      if (text && text.length > 5 && text.length < 100) {
        messages.push(text);
      }
    });

  return messages;
}
