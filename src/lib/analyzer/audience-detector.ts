import type { CheerioAPI } from "cheerio";
import type { AudienceType, AudienceDetection } from "@/types";
import { AUDIENCE_DESCRIPTIONS } from "@/lib/constants";

interface AudienceSignals {
  enterprise: number;
  selfServe: number;
  informational: number;
  enterpriseSignals: string[];
  selfServeSignals: string[];
  informationalSignals: string[];
}

export function detectAudience($: CheerioAPI): AudienceDetection {
  const signals = analyzeAudienceSignals($);

  const scores = {
    "enterprise-buyer": signals.enterprise,
    "self-serve-user": signals.selfServe,
    "information-seeker": signals.informational,
  };

  const entries = Object.entries(scores) as [AudienceType, number][];
  entries.sort((a, b) => b[1] - a[1]);

  const [primaryAudience, topScore] = entries[0];
  const totalScore = entries.reduce((sum, [, s]) => sum + s, 0);

  const confidence = totalScore > 0 ? Math.round((topScore / totalScore) * 100) : 33;

  const signalMap: Record<AudienceType, string[]> = {
    "enterprise-buyer": signals.enterpriseSignals,
    "self-serve-user": signals.selfServeSignals,
    "information-seeker": signals.informationalSignals,
  };

  return {
    primaryAudience,
    confidence,
    signals: signalMap[primaryAudience],
    description: AUDIENCE_DESCRIPTIONS[primaryAudience],
  };
}

function analyzeAudienceSignals($: CheerioAPI): AudienceSignals {
  const bodyText = $("body").text().toLowerCase();
  const signals: AudienceSignals = {
    enterprise: 0,
    selfServe: 0,
    informational: 0,
    enterpriseSignals: [],
    selfServeSignals: [],
    informationalSignals: [],
  };

  const enterpriseKeywords = [
    "enterprise", "demo", "request a demo", "book a demo", "schedule a demo",
    "contact sales", "talk to sales", "custom pricing", "roi",
    "case study", "case studies", "compliance", "soc", "gdpr", "hipaa",
    "security", "sla", "dedicated", "custom solution", "implementation",
    "onboarding", "integration", "api", "sso", "saml",
  ];

  for (const keyword of enterpriseKeywords) {
    if (bodyText.includes(keyword)) {
      signals.enterprise += 2;
      signals.enterpriseSignals.push(`Contains "${keyword}" messaging`);
    }
  }

  if ($('[class*="demo"], [id*="demo"]').length > 0) {
    signals.enterprise += 3;
    signals.enterpriseSignals.push("Has demo request section");
  }

  if ($('[class*="case-stud"], [class*="casestud"]').length > 0) {
    signals.enterprise += 3;
    signals.enterpriseSignals.push("Features case studies");
  }

  if ($('[class*="logo"], [class*="client"], [class*="trusted"]').length > 0) {
    signals.enterprise += 2;
    signals.enterpriseSignals.push("Shows client logos / trust badges");
  }

  const selfServeKeywords = [
    "sign up", "signup", "get started", "free trial", "free plan",
    "start free", "no credit card", "instant", "try for free",
    "create account", "pricing", "monthly", "annually",
    "per month", "per user", "basic", "pro", "premium",
  ];

  for (const keyword of selfServeKeywords) {
    if (bodyText.includes(keyword)) {
      signals.selfServe += 2;
      signals.selfServeSignals.push(`Contains "${keyword}" messaging`);
    }
  }

  if ($('[class*="pricing"], [class*="plan"]').length > 0) {
    signals.selfServe += 3;
    signals.selfServeSignals.push("Has pricing/plan section");
  }

  if ($('form input[type="email"]').length > 0 && $('form').length <= 2) {
    signals.selfServe += 2;
    signals.selfServeSignals.push("Simple email signup form");
  }

  const infoKeywords = [
    "blog", "article", "learn", "guide", "tutorial", "how to",
    "what is", "introduction", "overview", "resource", "webinar",
    "whitepaper", "ebook", "report", "research", "insights",
    "read more", "continue reading",
  ];

  for (const keyword of infoKeywords) {
    if (bodyText.includes(keyword)) {
      signals.informational += 2;
      signals.informationalSignals.push(`Contains "${keyword}" content`);
    }
  }

  if ($("article, [class*='blog'], [class*='article'], [class*='post']").length > 0) {
    signals.informational += 4;
    signals.informationalSignals.push("Has article/blog content structure");
  }

  const wordCount = bodyText.split(/\s+/).length;
  if (wordCount > 2000) {
    signals.informational += 3;
    signals.informationalSignals.push("Long-form content (2000+ words)");
  }

  const navLinks = $("nav a").length;
  if (navLinks > 10) {
    signals.informational += 1;
    signals.informationalSignals.push("Extensive navigation structure");
  }

  signals.enterpriseSignals = signals.enterpriseSignals.slice(0, 5);
  signals.selfServeSignals = signals.selfServeSignals.slice(0, 5);
  signals.informationalSignals = signals.informationalSignals.slice(0, 5);

  return signals;
}
