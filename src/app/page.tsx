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
import { AlertCircle, RefreshCw, Sparkles } from "lucide-react";

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
  } = useGrader("https://leena.ai/function/hr");

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* URL Input Bar is prominent on the Grader tab */}
        {activeTab === "grader" && (
          <div className="space-y-4 text-center">
            <div className="max-w-2xl mx-auto space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                Live Teardown & Deterministic Scoring
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Grade Any Landing Page In Seconds
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
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
                  onClick={() => gradePage(result?.url || "https://leena.ai/function/hr")}
                  className="flex items-center gap-1 font-semibold underline hover:no-underline text-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Retry
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 1: Grader View */}
        {activeTab === "grader" && result && (
          <div className="space-y-8 pt-4">
            {/* Score Hero */}
            <ScoreHero
              result={result}
              selectedRubric={selectedRubric}
              onToggleRubric={handleToggleRubric}
            />

            {/* Audience Card (Required: Grading by audience) */}
            <AudienceCard audience={result.audience} />

            {/* Detailed Scored Categories (Required: Your own rubric) */}
            <RubricBreakdown categories={displayedCategories} />
          </div>
        )}

        {/* Tab 2: Real Results Benchmark (Required: Checked against real results) */}
        {activeTab === "benchmark" && (
          <BenchmarkView
            onSelectUrlForGrading={(url) => {
              setActiveTab("grader");
              gradePage(url);
            }}
          />
        )}

        {/* Tab 3: Official Scoring Note (Required: Scoring Note) */}
        {activeTab === "scoring-note" && <ScoringNoteView />}
      </main>

      <Footer />
    </div>
  );
}
