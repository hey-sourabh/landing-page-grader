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
  EmptyState,
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
  } = useGrader();

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
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

        {activeTab === "grader" && (
          <>
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

            {!result && !isLoading && (
              <EmptyState onSelectSampleUrl={(url) => gradePage(url)} />
            )}

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

        {activeTab === "benchmark" && (
          <BenchmarkView
            onSelectUrlForGrading={(url) => {
              setActiveTab("grader");
              gradePage(url);
            }}
          />
        )}

        {activeTab === "scoring-note" && <ScoringNoteView />}
      </main>

      <Footer />
    </div>
  );
}
