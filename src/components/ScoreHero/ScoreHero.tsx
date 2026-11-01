"use client";

import React from "react";
import type { GradeResult } from "@/types";
import { ExternalLink, Layers } from "lucide-react";
import { ScoreGauge } from "./ScoreGauge";
import { ScoreTelemetryBar } from "./ScoreTelemetryBar";

interface ScoreHeroProps {
  result: GradeResult;
  selectedRubric: "v1" | "v2";
  onToggleRubric: (version: "v1" | "v2") => void;
}

export function ScoreHero({ result, selectedRubric, onToggleRubric }: ScoreHeroProps) {
  const currentScore =
    selectedRubric === "v1" ? result.v1Score ?? result.overallScore : result.overallScore;

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden transition-all">
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
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

        <ScoreGauge score={currentScore} />
      </div>

      <ScoreTelemetryBar result={result} />
    </div>
  );
}
