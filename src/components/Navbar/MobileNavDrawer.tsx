"use client";

import React from "react";
import { Sparkles, BarChart3, FileText, ChevronRight } from "lucide-react";

interface MobileNavDrawerProps {
  activeTab: "grader" | "benchmark" | "scoring-note";
  onSelectTab: (tab: "grader" | "benchmark" | "scoring-note") => void;
}

export function MobileNavDrawer({ activeTab, onSelectTab }: MobileNavDrawerProps) {
  return (
    <div className="sm:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-2 shadow-2xl transition-all animate-in fade-in slide-in-from-top-2 duration-150">
      <button
        type="button"
        onClick={() => onSelectTab("grader")}
        className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all text-left ${
          activeTab === "grader"
            ? "bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100"
            : "hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
              activeTab === "grader"
                ? "bg-blue-600 text-white"
                : "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
            }`}
          >
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold">Live URL Grader</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Enter any link for scored audit & teardown
            </div>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
      </button>

      <button
        type="button"
        onClick={() => onSelectTab("benchmark")}
        className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all text-left ${
          activeTab === "benchmark"
            ? "bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100"
            : "hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
              activeTab === "benchmark"
                ? "bg-emerald-600 text-white"
                : "bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-sm font-bold">
              <span>Real Results Benchmark</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800">
                3 Pages
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              90-day Leena AI dataset & calibration
            </div>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
      </button>

      <button
        type="button"
        onClick={() => onSelectTab("scoring-note")}
        className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all text-left ${
          activeTab === "scoring-note"
            ? "bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-100"
            : "hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
              activeTab === "scoring-note"
                ? "bg-indigo-600 text-white"
                : "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400"
            }`}
          >
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold">Official Scoring Note</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              1-page rubric methodology & rationale
            </div>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
      </button>
    </div>
  );
}

