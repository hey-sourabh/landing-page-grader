"use client";

import React, { useState } from "react";
import {
  Gauge,
  Sparkles,
  BarChart3,
  FileText,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

interface NavbarProps {
  activeTab: "grader" | "benchmark" | "scoring-note";
  setActiveTab: (tab: "grader" | "benchmark" | "scoring-note") => void;
}

export function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectTab = (tab: "grader" | "benchmark" | "scoring-note") => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand & Logo */}
        <div
          onClick={() => handleSelectTab("grader")}
          className="flex items-center gap-2.5 cursor-pointer group flex-shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                PageGrader
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                Live
              </span>
            </div>
            <p className="hidden sm:block text-[11px] text-slate-500 dark:text-slate-400 font-medium -mt-0.5">
              Audience-Aware Website Teardowns
            </p>
          </div>
        </div>

        {/* Desktop Navigation Tabs (Hidden on mobile) */}
        <nav className="hidden sm:flex items-center gap-1.5 lg:gap-2">
          {/* Tab 1: Grader */}
          <button
            type="button"
            onClick={() => handleSelectTab("grader")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "grader"
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
            }`}
          >
            <Sparkles className="w-4 h-4 text-blue-500 dark:text-blue-400" />
            <span>Grader</span>
          </button>

          {/* Tab 2: Real Results / Benchmark */}
          <button
            type="button"
            onClick={() => handleSelectTab("benchmark")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "benchmark"
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <span>Real Results</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-800">
              3
            </span>
          </button>

          {/* Tab 3: Official Scoring Note */}
          <button
            type="button"
            onClick={() => handleSelectTab("scoring-note")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "scoring-note"
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
            }`}
          >
            <FileText className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            <span>Scoring Note</span>
          </button>
        </nav>

        {/* Mobile Hamburger Button (Visible only on mobile < sm) */}
        <div className="flex sm:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-slate-900 dark:text-white" />
            ) : (
              <Menu className="w-5 h-5 text-slate-900 dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-2 shadow-2xl transition-all animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Mobile Item 1: Grader */}
          <button
            type="button"
            onClick={() => handleSelectTab("grader")}
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

          {/* Mobile Item 2: Real Results */}
          <button
            type="button"
            onClick={() => handleSelectTab("benchmark")}
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

          {/* Mobile Item 3: Scoring Note */}
          <button
            type="button"
            onClick={() => handleSelectTab("scoring-note")}
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
      )}
    </header>
  );
}
