import React from "react";
import { Gauge } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 py-8 text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4 text-blue-600" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Landing Page Grader
          </span>
          <span>— Built for Leena AI Website Engineer Evaluation</span>
        </div>

        <div className="flex items-center gap-4">
          <span>Deterministic Scoring • Google PageSpeed Insights • Real Data Calibrated</span>
        </div>
      </div>
    </footer>
  );
}
