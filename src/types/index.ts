export interface PageSpeedData {
  performanceScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;
  seoScore: number;
  lcp: number; // Largest Contentful Paint in ms
  fid: number; // First Input Delay in ms
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint in ms
  si: number;  // Speed Index in ms
  tbt: number; // Total Blocking Time in ms
  ttfb: number; // Time to First Byte in ms
}

export type AudienceType = "enterprise-buyer" | "self-serve-user" | "information-seeker";

export interface AudienceDetection {
  primaryAudience: AudienceType;
  confidence: number;
  signals: string[];
  description: string;
}

export interface RubricCategory {
  name: string;
  key: string;
  score: number;
  maxScore: number;
  weight: number;
  details: RubricDetail[];
  audienceNote?: string;
}

export interface RubricDetail {
  label: string;
  score: number;
  maxScore: number;
  finding: string;
  recommendation?: string;
}

export interface ContentAnalysis {
  headlineClarity: number;
  valueProposition: number;
  ctaQuality: number;
  socialProof: number;
  trustSignals: number;
  contentLength: number;
  readabilityScore: number;
  keyMessages: string[];
  headlines: string[];
  ctas: string[];
}

export interface TechnicalAnalysis {
  hasSSL: boolean;
  isMobileFriendly: boolean;
  hasStructuredData: boolean;
  hasCanonical: boolean;
  hasFavicon: boolean;
  hasRobotsTxt: boolean;
  hasSitemap: boolean;
  imageOptimization: number;
  totalImages: number;
  imagesWithAlt: number;
}

export interface SEOAnalysis {
  title: string;
  titleLength: number;
  metaDescription: string;
  metaDescriptionLength: number;
  hasH1: boolean;
  h1Count: number;
  headingStructure: { tag: string; text: string }[];
  hasOpenGraph: boolean;
  hasTwitterCard: boolean;
  internalLinks: number;
  externalLinks: number;
  hasCanonical: boolean;
}

export interface ConversionAnalysis {
  formCount: number;
  ctaCount: number;
  aboveFoldCTA: boolean;
  hasTestimonials: boolean;
  hasLogos: boolean;
  hasPricing: boolean;
  hasVideo: boolean;
  hasFAQ: boolean;
  formFields: number;
  hasPhoneNumber: boolean;
  hasChatWidget: boolean;
}

export interface GradeResult {
  id: string;
  url: string;
  domain: string;
  timestamp: string;
  overallScore: number;
  scoreLabel: string;
  audience: AudienceDetection;
  categories: RubricCategory[];
  pageSpeed: PageSpeedData;
  contentAnalysis: ContentAnalysis;
  seoAnalysis: SEOAnalysis;
  conversionAnalysis: ConversionAnalysis;
  technicalAnalysis: TechnicalAnalysis;
  screenshotUrl?: string;
  loadTime: number;
  v1Score?: number;
  v1Categories?: RubricCategory[];
  v2Score?: number;
}

export interface ValidationResult {
  url: string;
  pageType: string;
  graderScore: number;
  graderRank: number;
  actualConversionRate: number;
  actualRank: number;
  rankDifference: number;
  sessions: number;
  formFills: number;
}

export interface GradingRequest {
  url: string;
}

export interface GradingResponse {
  success: boolean;
  data?: GradeResult;
  error?: string;
}
