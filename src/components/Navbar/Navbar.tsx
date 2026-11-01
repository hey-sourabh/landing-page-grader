"use client";

import React from "react";
import { Gauge, Sparkles, BarChart3, FileText } from "lucide-react";

interface NavbarProps {
  activeTab: "grader" | "benchmark" | "scoring-note";
  setActiveTab: (tab: "grader" | "benchmark" | "scoring-note") => void;
}

export function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-slate-950/90 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Left: Brand & Logo */}
        <div
          onClick={() => setActiveTab("grader")}
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group flex-shrink-0"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
            <Gauge className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white leading-none">
                PageGrader
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                Live
              </span>
            </div>
            {/* Subtitle is hidden on mobile screens to prevent header wrapping */}
            <p className="hidden sm:block text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5 whitespace-nowrap">
              Audience-Aware Website Teardowns
            </p>
          </div>
        </div>

        {/* Right: Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {/* Tab 1: Grader */}
          <button
            type="button"
            onClick={() => setActiveTab("grader")}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "grader"
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
            }`}
            title="Live URL Grader"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
            <span>Grader</span>
          </button>

          {/* Tab 2: Real Results / Benchmark */}
          <button
            type="button"
            onClick={() => setActiveTab("benchmark")}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "benchmark"
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
            }`}
            title="90-Day Leena AI Dataset Benchmark"
          >
            <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
            <span className="hidden md:inline">Real Results</span>
            <span className="md:hidden">Results</span>
            <span className="hidden sm:inline-block text-[10px] px-1 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 font-bold">
              3
            </span>
          </button>

          {/* Tab 3: Official Scoring Note */}
          <button
            type="button"
            onClick={() => setActiveTab("scoring-note")}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "scoring-note"
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
            }`}
            title="1-Page Official Scoring Note Deliverable"
          >
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400 flex-shrink-0" />
            <span className="hidden md:inline">Scoring Note</span>
            <span className="md:hidden">Note</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
