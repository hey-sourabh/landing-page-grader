"use client";

import React from "react";
import type { LeenaPageData } from "@/lib/benchmark-data";
import { ArrowRight, TrendingUp, Scale } from "lucide-react";

interface BenchmarkDeepDiveProps {
  activePage: LeenaPageData;
  onSelectUrlForGrading: (url: string) => void;
}

export function BenchmarkDeepDive({
  activePage,
  onSelectUrlForGrading,
}: BenchmarkDeepDiveProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-lg space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Selected Page Teardown & Rubric Calibration
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
            {activePage.title}
          </h3>
          <p className="text-xs font-mono text-slate-500 mt-0.5">{activePage.url}</p>
        </div>

        <button
          onClick={() => onSelectUrlForGrading(activePage.url)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm w-fit transition-all"
        >
          <span>Run Full Live Grader</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            Empirical Real-World Dynamics
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {activePage.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-blue-500 font-bold">•</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Rubric v1 vs v2 Calibration Analysis
          </h4>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            {activePage.disagreementNote}
          </p>
        </div>
      </div>
    </div>
  );
}

