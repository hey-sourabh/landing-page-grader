"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type { GradeResult, RubricCategory } from "@/types";

export type GraderTab = "grader" | "benchmark" | "scoring-note";
export type RubricVersion = "v1" | "v2";

export interface UseGraderReturn {
  activeTab: GraderTab;
  setActiveTab: (tab: GraderTab) => void;
  result: GradeResult | null;
  isLoading: boolean;
  loadingStep: string;
  error: string | null;
  selectedRubric: RubricVersion;
  handleToggleRubric: (version: RubricVersion) => void;
  gradePage: (url: string) => Promise<void>;
  displayedCategories: RubricCategory[];
}

export function useGrader(initialUrl = "https://leena.ai/function/hr"): UseGraderReturn {
  const [activeTab, setActiveTab] = useState<GraderTab>("grader");
  const [result, setResult] = useState<GradeResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [selectedRubric, setSelectedRubric] = useState<RubricVersion>("v2");

  const gradePage = useCallback(async (url: string) => {
    setIsLoading(true);
    setError(null);
    setLoadingStep("Connecting & fetching live page DOM...");

    const timer1 = setTimeout(() => {
      setLoadingStep("Querying Google PageSpeed Insights & Core Web Vitals...");
    }, 1000);

    const timer2 = setTimeout(() => {
      setLoadingStep("Auditing semantic headlines, forms, CTAs & enterprise trust proof...");
    }, 2500);

    const timer3 = setTimeout(() => {
      setLoadingStep("Detecting target audience & calibrating dynamic weights...");
    }, 4000);

    try {
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
    } catch (err: unknown) {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      console.error("Grading failed:", err);
      setError(
        (err instanceof Error ? err.message : null) ||
          "Could not analyze this URL. Please verify the URL is accessible and try again."
      );
    } finally {
      setIsLoading(false);
      setLoadingStep("");
    }
  }, []);

  // Run initial grade on mount so the user has immediate data
  useEffect(() => {
    if (initialUrl) {
      gradePage(initialUrl);
    }
  }, [initialUrl, gradePage]);

  const handleToggleRubric = useCallback((version: RubricVersion) => {
    setSelectedRubric(version);
  }, []);

  const displayedCategories = useMemo<RubricCategory[]>(() => {
    if (selectedRubric === "v1" && result?.v1Categories) {
      return result.v1Categories;
    }
    return result?.categories || [];
  }, [selectedRubric, result]);

  return {
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
  };
}

