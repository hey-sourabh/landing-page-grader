"use client";

import React from "react";
import {
  Navbar,
  UrlInputBar,
  ScoreHero,
  AudienceCard,
  RubricBreakdown,
  BenchmarkView,
  ScoringNoteView,
  Footer,
} from "@/components";
import { useGrader } from "@/hooks";
import {
  AlertCircle,
  RefreshCw,
  Sparkles,
  Zap,
  Users,
  Target,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  const {
    activeTab,
    setActiveTab,
    result,
    isLoading,
    loadingStep,
    error,
    selectedRubric,
    handleToggleRubric,
    gradePage,
    displayedCategories,
  } = useGrader();

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Header & URL Input Bar */}
        {activeTab === "grader" && (
          <div className="space-y-4 sm:space-y-6 text-center">
            <div className="max-w-2xl mx-auto space-y-2 px-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                Live Teardown & Deterministic Scoring
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Grade Any Landing Page In Seconds
              </h1>
              <p className="text-xs sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                Audience detection, Google PageSpeed telemetry, and empirical calibration against
                real B2B conversion data.
              </p>
            </div>

            <UrlInputBar
              onGrade={gradePage}
              isLoading={isLoading}
              loadingStep={loadingStep}
            />

            {error && (
              <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs sm:text-sm flex items-center justify-between gap-3 text-left">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
                <button
                  onClick={() => gradePage("https://leena.ai/function/hr")}
                  className="flex items-center gap-1 font-semibold underline hover:no-underline text-xs flex-shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Try Example
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 1: Grader View */}
        {activeTab === "grader" && (
          <>
            {/* Loading State Skeleton */}
            {isLoading && !result && (
              <div className="space-y-6 pt-2 animate-pulse">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="space-y-3 w-full sm:w-2/3">
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-28" />
                      <div className="h-7 bg-slate-200 dark:bg-slate-800 rounded-xl w-3/4" />
                      <div className="h-4 bg-slate-100 dark:bg-slate-800/60 rounded-full w-5/6" />
                    </div>
                    <div className="w-32 h-32 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-900" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-16 rounded-xl bg-slate-100 dark:bg-slate-800" />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Empty State / Capabilities Showcase (Shown before any URL is graded) */}
            {!result && !isLoading && (
              <div className="max-w-4xl mx-auto space-y-6 pt-4">
                <div className="text-center space-y-1">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    What Gets Scored & How It Works
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    Every point traces back to an inspectable node on the page. Enter any URL above or choose a preset.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Card 1 */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      Live Telemetry & Web Vitals
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Real-time DOM parsing via Cheerio + live Google PageSpeed Insights v5 API measuring LCP, TBT, and CLS. No mock data.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Users className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      Audience Detection Engine
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Detects Enterprise Buyer, Self-Serve User, or Information Seeker. Changes what &ldquo;good&rdquo; means for that audience.
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <Target className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      Empirical Calibration (v1 vs v2)
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Calibrated against 90-day Leena AI production data, improving rank correlation from 0.5 (v1) to a perfect 1.0 (v2).
                    </p>
                  </div>
                </div>

                {/* Quick Start Callout */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950/30 border border-blue-200/80 dark:border-blue-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">
                      Want to see it in action immediately? Try the <strong>Leena AI — HR Solution</strong> preset above.
                    </span>
                  </div>
                  <button
                    onClick={() => gradePage("https://leena.ai/function/hr")}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex-shrink-0 transition-colors shadow-sm"
                  >
                    <span>Run HR Preset</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Results Teardown (Shown when a page has been graded) */}
            {result && (
              <div className="space-y-6 sm:space-y-8 pt-2">
                <ScoreHero
                  result={result}
                  selectedRubric={selectedRubric}
                  onToggleRubric={handleToggleRubric}
                />
                <AudienceCard audience={result.audience} />
                <RubricBreakdown categories={displayedCategories} />
              </div>
            )}
          </>
        )}

        {/* Tab 2: Real Results Benchmark (Checked against real results) */}
        {activeTab === "benchmark" && (
          <BenchmarkView
            onSelectUrlForGrading={(url) => {
              setActiveTab("grader");
              gradePage(url);
            }}
          />
        )}

        {/* Tab 3: Official Scoring Note */}
        {activeTab === "scoring-note" && <ScoringNoteView />}
      </main>

      <Footer />
    </div>
  );
}
