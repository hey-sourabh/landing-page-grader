"use client";

import React, { useState, useEffect } from "react";
import type { GradeResult } from "@/types";
import { Navbar } from "@/components/Navbar";
import { UrlInputBar } from "@/components/UrlInputBar";
import { ScoreHero } from "@/components/ScoreHero";
import { AudienceCard } from "@/components/AudienceCard";
import { RubricBreakdown } from "@/components/RubricBreakdown";
import { BenchmarkView } from "@/components/BenchmarkView";
import { ScoringNoteView } from "@/components/ScoringNoteView";
import { Footer } from "@/components/Footer";
import { AlertCircle, RefreshCw, Sparkles } from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"grader" | "benchmark" | "scoring-note">("grader");
  const [result, setResult] = useState<GradeResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [selectedRubric, setSelectedRubric] = useState<"v1" | "v2">("v2");

  // Run initial grading on default page (HR Solution page) so the user sees immediate results
  useEffect(() => {
    gradePage("https://leena.ai/function/hr");
  }, []);

  const gradePage = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setLoadingStep("Connecting & fetching live page DOM...");

    try {
      // Progressive status updates for great UX
      const timer1 = setTimeout(() => {
        setLoadingStep("Querying Google PageSpeed Insights & Core Web Vitals...");
      }, 1000);

      const timer2 = setTimeout(() => {
        setLoadingStep("Auditing semantic headlines, forms, CTAs & enterprise trust proof...");
      }, 2500);

      const timer3 = setTimeout(() => {
        setLoadingStep("Detecting target audience & calibrating dynamic weights...");
      }, 4000);

      const response = await fetch("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to grade page.");
      }

      setResult(data.data);
      setActiveTab("grader");
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Grading failed:", err);
      setError(
        err.message ||
          "Could not analyze this URL. Please verify the URL is accessible and try again."
      );
    } finally {
      setIsLoading(false);
      setLoadingStep("");
    }
  };

  const handleToggleRubric = (version: "v1" | "v2") => {
    setSelectedRubric(version);
  };

  // Determine which categories to show based on selected rubric version
  const displayedCategories =
    selectedRubric === "v1" && result?.v1Categories
      ? result.v1Categories
      : result?.categories || [];

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* URL Input Bar is sticky / prominent on the Grader tab */}
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
