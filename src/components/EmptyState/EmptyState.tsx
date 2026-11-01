"use client";

import React from "react";
import { Zap, Target, BarChart3, ArrowRight } from "lucide-react";

interface EmptyStateProps {
  onSelectSampleUrl: (url: string) => void;
}

export function EmptyState({ onSelectSampleUrl }: EmptyStateProps) {
  return (
    <div className="pt-6 pb-12 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            Live PageSpeed Telemetry
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Direct integration with Google PageSpeed Insights auditing mobile LCP, TBT, CLS, and
            Core Web Vitals.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            Audience-Aware Weighting
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Classifies pages into Enterprise Buyer, Self-Serve, or Information Seeker personas to
            weight friction appropriately.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            Empirically Calibrated
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Validated against Leena AI 90-day real conversion dataset with a perfect 1.0 rank
            correlation under Rubric v2.
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-1">
        <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
          Ready to evaluate? Paste any landing page URL above or click one of the pre-tested dataset
          cards.
        </p>
        <button
          type="button"
          onClick={() => onSelectSampleUrl("https://leena.ai/function/hr")}
          className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline inline-flex items-center gap-1 pt-1"
        >
          <span>Try Leena AI HR Solution (Rank #1)</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

