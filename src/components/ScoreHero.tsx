"use client";

import React from "react";
import type { GradeResult } from "@/types";
import { formatScore, getScoreBgColor, getScoreLabel } from "@/lib/utils";
import { ExternalLink, Layers, Zap, Clock, ShieldCheck, Target, ArrowUpDown } from "lucide-react";

interface ScoreHeroProps {
  result: GradeResult;
  selectedRubric: "v1" | "v2";
  onToggleRubric: (version: "v1" | "v2") => void;
}

export function ScoreHero({ result, selectedRubric, onToggleRubric }: ScoreHeroProps) {
  const currentScore = selectedRubric === "v1" ? result.v1Score ?? result.overallScore : result.overallScore;
  const currentLabel = getScoreLabel(currentScore);

  // SVG Gauge calculations
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentScore / 100) * circumference;

  const getStrokeColor = (score: number) => {
    if (score >= 80) return "#10b981"; // emerald
    if (score >= 60) return "#eab308"; // yellow
    if (score >= 40) return "#f97316"; // orange
    return "#ef4444"; // red
  };

  const getLetterScore = (score: number) => {
    if (score >= 90) return "A+";
    if (score >= 85) return "A";
    if (score >= 80) return "A-";
    if (score >= 75) return "B+";
    if (score >= 70) return "B";
    if (score >= 65) return "C+";
    if (score >= 60) return "C";
    return "D";
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden transition-all">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left: URL, Domain & Audience Overview */}
        <div className="flex-1 text-center lg:text-left space-y-3">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              {result.domain}
            </span>
            <span className="text-xs font-medium text-slate-400">
              Evaluated on {new Date(result.timestamp).toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center justify-center lg:justify-start gap-2 break-all">
            <span>{result.url}</span>
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-500 transition-colors p-1"
              title="Open website in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </h1>

          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl">
            {result.contentAnalysis.headlines[0]
              ? `"${result.contentAnalysis.headlines[0]}"`
              : "Scored teardown with audience-calibrated conversion weighting and PageSpeed telemetry."}
          </p>

          {/* Rubric Version Selector */}
          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              Rubric Mode:
            </span>
            <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium">
              <button
                type="button"
                onClick={() => onToggleRubric("v2")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  selectedRubric === "v2"
                    ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                Rubric v2 (Audience-Aware)
              </button>
              <button
                type="button"
                onClick={() => onToggleRubric("v1")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  selectedRubric === "v1"
                    ? "bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                Rubric v1 (Baseline Initial)
              </button>
            </div>

            {result.v1Score !== undefined && result.v2Score !== undefined && (
              <span className="text-xs font-medium text-slate-500">
                (Delta:{" "}
                <span
                  className={
                    result.v2Score >= result.v1Score ? "text-emerald-500" : "text-amber-500"
                  }
                >
                  {result.v2Score >= result.v1Score ? "+" : ""}
                  {(result.v2Score - result.v1Score).toFixed(1)} pts
                </span>
                )
              </span>
            )}
          </div>
        </div>

        {/* Right: Radial Score Gauge & Letter Grade */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative flex items-center justify-center">
            <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 160 160">
              {/* Background circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="text-slate-100 dark:text-slate-800"
                strokeWidth="12"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Animated Progress circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={getStrokeColor(currentScore)}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Center score text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {formatScore(currentScore)}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                out of 100
              </span>
            </div>
          </div>

          <div className="text-center sm:text-left space-y-1.5">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                Grade: {getLetterScore(currentScore)}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-md font-semibold text-white ${getScoreBgColor(
                  currentScore
                )}`}
              >
                {currentLabel}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
              {currentScore >= 80
                ? "Excellent optimization across conversion pathways and technical telemetry."
                : currentScore >= 65
                ? "Solid baseline with measurable upside in CTA alignment and friction reduction."
                : "Significant conversion friction and structural deficiencies discovered."}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Telemetry Bar */}
      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>PageSpeed</span>
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-white">
            {result.pageSpeed.performanceScore}/100
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            <span>LCP Time</span>
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-white">
            {(result.pageSpeed.lcp / 1000).toFixed(1)}s
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
            <Target className="w-3.5 h-3.5 text-emerald-500" />
            <span>CTAs Found</span>
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-white">
            {result.conversionAnalysis.ctaCount}
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
            <span>Security (SSL)</span>
          </div>
          <div className="text-base font-bold text-emerald-600 dark:text-emerald-400">
            {result.technicalAnalysis.hasSSL ? "Active HTTPS" : "Insecure HTTP"}
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
            <Layers className="w-3.5 h-3.5 text-purple-500" />
            <span>Headings</span>
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-white">
            {result.seoAnalysis.headingStructure.length}
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-rose-500" />
            <span>Form Fields</span>
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-white">
            {result.conversionAnalysis.formFields} fields
          </div>
        </div>
      </div>
    </div>
  );
}

