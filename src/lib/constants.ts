export const RUBRIC_WEIGHTS = {
  "enterprise-buyer": {
    performance: 0.15,
    seo: 0.10,
    content: 0.20,
    conversion: 0.30,
    accessibility: 0.10,
    technical: 0.15,
  },
  "self-serve-user": {
    performance: 0.25,
    seo: 0.15,
    content: 0.15,
    conversion: 0.20,
    accessibility: 0.15,
    technical: 0.10,
  },
  "information-seeker": {
    performance: 0.20,
    seo: 0.20,
    content: 0.30,
    conversion: 0.05,
    accessibility: 0.15,
    technical: 0.10,
  },
} as const;

export const AUDIENCE_DESCRIPTIONS: Record<string, string> = {
  "enterprise-buyer":
    "Decision-makers evaluating solutions for their organization. They value trust signals, social proof, case studies, and clear ROI messaging. Conversion elements like demo requests and contact forms are critical.",
  "self-serve-user":
    "Individual users or small teams looking to sign up and start using a product quickly. They value fast page loads, clear pricing, simple sign-up flows, and intuitive UX.",
  "information-seeker":
    "People researching a topic, learning about a solution area, or consuming content. They value readability, content depth, clear navigation, and informative headings.",
};

export const AUDIENCE_WEIGHT_EXPLANATION = {
  signal: "Conversion Elements (CTAs, Forms, Social Proof)",
  "enterprise-buyer": {
    weight: 0.30,
    reason: "Enterprise buyers need strong trust signals and clear conversion paths — demo request forms, case studies, and enterprise-specific CTAs directly impact whether they engage with sales.",
  },
  "self-serve-user": {
    weight: 0.20,
    reason: "Self-serve users care about conversion elements but are more influenced by UX simplicity and page speed — they want to sign up quickly, not be sold to.",
  },
  "information-seeker": {
    weight: 0.05,
    reason: "Information seekers are not ready to convert. Aggressive CTAs and forms can actually hurt the experience. Content quality matters most for this audience.",
  },
};

export const LEENA_VALIDATION_DATA = [
  {
    url: "https://leena.ai/",
    pageType: "Home page",
    trafficSplit: {
      direct: 44,
      organicSearch: 25,
      paidSearch: 15,
      paidSocial: 1,
      email: 3,
      others: 12,
    },
    sessions: 18343,
    formFills: 103,
    conversionRate: 103 / 18343, // ~0.56%
  },
  {
    url: "https://leena.ai/function/hr",
    pageType: "Functional Page",
    trafficSplit: {
      direct: 14,
      organicSearch: 17,
      paidSearch: 58,
      paidSocial: 7,
      email: 3,
      others: 1,
    },
    sessions: 1907,
    formFills: 11,
    conversionRate: 11 / 1907, // ~0.58%
  },
  {
    url: "https://leena.ai/resources/webinars/christus-health-hr-ai-rollout-webinar",
    pageType: "Resources / Landing Page",
    trafficSplit: {
      direct: 1,
      organicSearch: 0,
      paidSearch: 0,
      paidSocial: 79,
      email: 18,
      others: 2,
    },
    sessions: 12437,
    formFills: 14,
    conversionRate: 14 / 12437, // ~0.11%
  },
];

export const SCORE_THRESHOLDS = {
  excellent: 90,
  great: 80,
  good: 70,
  fair: 60,
  needsWork: 50,
  poor: 40,
} as const;
