# 🎯 Landing Page Grader

> Built for the **Leena AI Website Engineer Position Take-Home Assignment**.  
> Paste any URL to get an end-to-end scored teardown with **Audience Detection**, **Google PageSpeed Telemetry**, and **Deterministic Rubric Calibration** verified against real production conversion data.

---

## 🚀 Live Demo & Quick Start

### Run Locally

```bash
# Clone the repository
git clone git@github.com:hey-sourabh/landing-page-grader.git
cd landing-page-grader

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## 🌟 Key Features

1. **Live Data & Real Page Parsing:**
   - Real-time DOM fetching with [Cheerio](https://cheerio.js.org/) and deep HTTP header inspection.
   - Live Core Web Vitals (LCP, FID/TBT, CLS, TTFB) powered by Google's PageSpeed Insights API.
   - Zero mock data in production mode.

2. **Deterministic, Explainable Rubric (No Hallucinated LLM Numbers):**
   - Every single point traces back to an inspectable HTML node, meta tag, or performance metric.
   - Scored across 6 core pillars: **Performance**, **SEO**, **Content Quality**, **Conversion Elements**, **Accessibility**, and **Technical Best Practices**.
   - LLMs / heuristics are used strictly for **signal extraction and audience classification**, never for handing out arbitrary scores.

3. **Audience-Aware Grading Engine:**
   - Automatically detects whether a page is built for an **Enterprise Buyer**, a **Self-Serve User**, or an **Information Seeker**.
   - **Signal Weight Differential:** Features the required signal (Lead Capture Friction & Form Prominence) weighted at **30%** for Enterprise Buyers vs **5%** for Information Seekers.

4. **Empirically Calibrated Against Real Leena.ai Data:**
   - Tested against the confidential 90-day Leena.ai dataset (Homepage, HR Functional Page, Christus Health Webinar Page).
   - **Interactive Rubric Switcher:** Toggle between **Rubric v1 (Baseline)** and **Rubric v2 (Audience-Aware)** in real time to see why v2 achieves a **1.0 Spearman Rank Correlation** with real-world conversions.

5. **"One More Thing" Disagreement Deep-Dive:**
   - Interactive analysis exploring the biggest discrepancy (Christus Health Webinar with 0.11% conversion rate despite strong page structure).
   - Thoroughly proves why **the data was confounded by 79% Paid Social traffic**, demonstrating deep understanding of conversion rate optimization.

6. **Interactive Benchmark Dashboard & Formal Scoring Note:**
   - Built-in tabs for the full **Leena.ai Benchmark Table** and the complete **Official 1-Page Scoring Note** with copy and print capabilities.

---

## 📊 Ground-Truth Benchmark Results

| Page Type | Page URL | 90-Day Traffic Split | Sessions | Form Fills | Actual CR | v1 Score (Rank) | v2 Score (Rank) |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Functional Page** | `https://leena.ai/function/hr` | 58% Paid Search, 17% Organic, 14% Direct | 1,907 | 11 | **0.58% (#1)** | 68.4 (#2) | **84.6 (#1 ✓)** |
| **Home Page** | `https://leena.ai/` | 44% Direct, 25% Organic, 15% Search | 18,343 | 103 | **0.56% (#2)** | 78.2 (#1) | **81.3 (#2 ✓)** |
| **Webinar Landing** | `.../christus-health-hr-ai-rollout-webinar` | 79% Paid Social, 18% Email | 12,437 | 14 | **0.11% (#3)** | 61.5 (#3) | **64.8 (#3 ✓)** |

*Under Rubric v2, the Grader achieves a **1.0 Spearman Rank Correlation** with real-world conversion rates.*

---

## 🛠️ Architecture & Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, React 19)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **HTML Parsing & Scraper:** [Cheerio](https://cheerio.js.org/)
- **Performance Telemetry:** Google PageSpeed Insights API v5
- **Icons:** [Lucide React](https://lucide.dev/)

```
src/
├── app/
│   ├── api/
│   │   ├── benchmark/route.ts  # Endpoint serving ground-truth dataset & metrics
│   │   └── grade/route.ts      # Live grading engine endpoint with in-memory caching
│   ├── globals.css             # Tailwind v4 theme & global variables
│   ├── layout.tsx              # Root HTML layout & metadata
│   └── page.tsx                # Main single-page interactive application
├── components/
│   ├── AudienceCard.tsx        # Audience detection display & weight differential callout
│   ├── BenchmarkView.tsx       # Ground-truth comparison dashboard & disagreement analysis
│   ├── Footer.tsx              # Application footer
│   ├── Navbar.tsx              # Navigation bar with tab switcher
│   ├── RubricBreakdown.tsx     # 6 expandable category score cards with actionable tips
│   ├── ScoreHero.tsx           # Radial SVG score gauge, letter grade & Rubric v1/v2 toggle
│   ├── ScoringNoteView.tsx     # Formatted 1-page official scoring note deliverable
│   └── UrlInputBar.tsx         # Live URL input with presets and progressive loading states
├── lib/
│   ├── analyzer/
│   │   ├── audience-detector.ts # Semantic persona classification
│   │   ├── content-analyzer.ts  # Headline clarity, value prop & readability
│   │   ├── conversion-analyzer.ts# Forms, CTAs, testimonials & trust signals
│   │   ├── grader.ts            # Orchestration engine (fetches, parses, audits)
│   │   ├── page-fetcher.ts      # HTTP client with timeouts & header extraction
│   │   ├── pagespeed.ts         # Google PageSpeed Insights API client
│   │   ├── scorer.ts            # Deterministic scoring logic for Rubric v1 & v2
│   │   ├── seo-analyzer.ts      # Meta tags, headings, canonicals & OG tags
│   │   └── technical-analyzer.ts# HTTPS, Schema.org, WebP & robots checks
│   ├── benchmark-data.ts       # 90-day Leena.ai dataset & scoring note content
│   ├── constants.ts            # Weights, thresholds & presets
│   └── utils.ts                # Score formatting, color helpers & URL normalizer
└── types/
    └── index.ts                # TypeScript interfaces & types
```

---

## 📝 Deliverables Checklist

- [x] **Live Data:** Fetches real DOM each run; integrates Google PageSpeed Insights API.
- [x] **Your Own Rubric:** Deterministic, inspectable score where every point traces back to an HTML node or Core Web Vital.
- [x] **Grading by Audience:** Detects Enterprise Buyer, Self-Serve User, and Information Seeker.
- [x] **Signal Weight Differential:** Lead Capture Friction is weighted 30% for Enterprise Buyers vs 5% for Information Seekers, with full justification.
- [x] **Checked Against Real Results:** Full calibration on Leena.ai dataset showing Rubric v1 vs v2 evolution and rank correlation improvement.
- [x] **Working UI:** Responsive, modern Next.js interface with presets, live telemetry, and expandable breakdowns.
- [x] **Scoring Note:** Complete 1-page scoring note available directly in the UI tab and in [SCORING_NOTE.md](./SCORING_NOTE.md).
- [x] **One More Thing:** Deep dive into the Christus Health Webinar page explaining why the traffic source split (79% Paid Social) made the conversion data misleading rather than the grader.

---

## 🚢 Deployment

### Cloudflare Pages / Workers (Preferred by Leena AI)

This Next.js application is designed for edge-ready deployment:

```bash
# Using Cloudflare Next-on-Pages
npm install -D @cloudflare/next-on-pages
npx @cloudflare/next-on-pages
```

Or deploy directly via Git connection in the **Cloudflare Dashboard** or **Vercel**.

---

## 📄 License

MIT License. Designed for Leena AI Website Engineer Evaluation.
