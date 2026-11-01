"use client";

import React, { useState } from "react";
import { Gauge, Sparkles, BarChart3, FileText, Menu, X } from "lucide-react";
import { MobileNavDrawer } from "./MobileNavDrawer";

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

        <nav className="hidden sm:flex items-center gap-1.5 lg:gap-2">
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

      {mobileMenuOpen && (
        <MobileNavDrawer activeTab={activeTab} onSelectTab={handleSelectTab} />
      )}
    </header>
  );
}
