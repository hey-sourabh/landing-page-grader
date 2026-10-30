import type { CheerioAPI } from "cheerio";
import type { ConversionAnalysis } from "@/types";

export function analyzeConversion($: CheerioAPI): ConversionAnalysis {
  // Forms
  const forms = $("form");
  const formCount = forms.length;

  // Count form fields (across all forms)
  let totalFormFields = 0;
  forms.each((_, form) => {
    const inputs = $(form).find(
      'input:not([type="hidden"]):not([type="submit"]):not([type="button"]), textarea, select'
    );
    totalFormFields += inputs.length;
  });

  // CTAs
  const ctaElements = $(
    'a[class*="cta"], button[class*="cta"], a[class*="btn"], button[class*="btn"], ' +
    'a[class*="button"], [class*="hero"] a, [class*="hero"] button, ' +
    'button[type="submit"], input[type="submit"]'
  );
  const ctaCount = ctaElements.length;

  // Above the fold CTA (check first 600px worth of content heuristically)
  // We check if there's a CTA in the hero/header area
  const heroArea = $('[class*="hero"], [class*="banner"], header, [class*="above-fold"], [class*="fold"]');
  const aboveFoldCTA =
    heroArea.find("a, button").length > 0 ||
    $("header a, header button").length > 0;

  // Testimonials
  const hasTestimonials =
    $('[class*="testimonial"], [class*="review"], [class*="quote"], blockquote, [class*="customer-stor"]').length > 0;

  // Client/partner logos
  const hasLogos =
    $('[class*="logo"], [class*="client"], [class*="partner"], [class*="trusted"]').length > 0;

  // Pricing
  const bodyText = $("body").text().toLowerCase();
  const hasPricing =
    $('[class*="pricing"], [class*="price"], [class*="plan"]').length > 0 ||
    bodyText.includes("pricing") ||
    /\$\d+/.test(bodyText);

  // Video
  const hasVideo =
    $("video, iframe[src*='youtube'], iframe[src*='vimeo'], iframe[src*='wistia'], [class*='video']").length > 0;

  // FAQ
  const hasFAQ =
    $('[class*="faq"], [class*="accordion"], [class*="question"]').length > 0 ||
    bodyText.includes("frequently asked");

  // Phone number
  const hasPhoneNumber = $('a[href^="tel:"]').length > 0 || /\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(bodyText);

  // Chat widget
  const hasChatWidget =
    $('[class*="chat"], [id*="chat"], [class*="intercom"], [class*="drift"], [class*="zendesk"], [class*="crisp"], [class*="hubspot"]').length > 0 ||
    $('script[src*="intercom"], script[src*="drift"], script[src*="zendesk"], script[src*="crisp"], script[src*="hubspot"]').length > 0;

  return {
    formCount,
    ctaCount,
    aboveFoldCTA,
    hasTestimonials,
    hasLogos,
    hasPricing,
    hasVideo,
    hasFAQ,
    formFields: totalFormFields,
    hasPhoneNumber,
    hasChatWidget,
  };
}
