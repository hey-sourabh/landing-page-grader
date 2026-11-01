"use client";

import React, { useState } from "react";
import {
  Globe,
  ArrowRight,
  Loader2,
  X,
  Sparkles,
  Search,
  ExternalLink,
} from "lucide-react";

interface UrlInputBarProps {
  onGrade: (url: string) => Promise<void>;
  isLoading: boolean;
  loadingStep?: string;
}

const PRESET_URLS = [
  {
    label: "Leena AI — HR Solution",
    category: "Functional Solution",
    badge: "Actual Rank #1 (0.58% CR)",
    badgeStyle: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    url: "https://leena.ai/function/hr",
  },
  {
    label: "Leena AI — Homepage",
    category: "Main Company Portal",
    badge: "Actual Rank #2 (0.56% CR)",
    badgeStyle: "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    url: "https://leena.ai/",
  },
  {
    label: "Leena AI — Webinar Landing",
    category: "Campaign Resource",
    badge: "Actual Rank #3 (0.11% CR)",
    badgeStyle: "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    url: "https://leena.ai/resources/webinars/christus-health-hr-ai-rollout-webinar",
  },
  {
    label: "Linear App",
    category: "Benchmark SaaS",
    badge: "Self-Serve Persona",
    badgeStyle: "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    url: "https://linear.app",
  },
];

export function UrlInputBar({ onGrade, isLoading, loadingStep }: UrlInputBarProps) {
  const [inputUrl, setInputUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputUrl.trim();
    if (!trimmed || isLoading) return;
    onGrade(trimmed);
  };

  const handleSelectPreset = (url: string) => {
    setInputUrl(url);
    onGrade(url);
  };

  const handleClear = () => {
    setInputUrl("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 shadow-lg shadow-slate-200/50 dark:shadow-none transition-all duration-200 focus-within:border-blue-500 dark:focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/10">
          <div className="pl-3 sm:pl-4 pr-1.5 sm:pr-2 text-slate-400 dark:text-slate-500 flex items-center justify-center flex-shrink-0">
            <Globe className="w-5 h-5 text-blue-500 dark:text-blue-400" />
          </div>

          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Paste any landing page URL (e.g. https://leena.ai/function/hr)..."
            disabled={isLoading}
            className="flex-1 min-w-0 bg-transparent py-2.5 sm:py-3 px-2 text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
          />

          {inputUrl && !isLoading && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 mr-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Clear URL"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="submit"
            disabled={isLoading || !inputUrl.trim()}
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 active:scale-95 flex-shrink-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">Analyzing...</span>
                <span className="sm:hidden">Auditing...</span>
              </>
            ) : (
              <>
                <span>Grade Page</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </>
            )}
          </button>
        </div>

        {isLoading && (
          <div className="mt-3.5 p-3 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/50 flex items-center justify-center gap-2.5 text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium animate-pulse">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 animate-spin" />
            <span className="truncate">
              {loadingStep || "Fetching page DOM & running Google PageSpeed audit..."}
            </span>
          </div>
        )}
      </form>

      <div className="pt-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2 px-1">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-blue-500" />
            Or Test Real Dataset Pages:
          </span>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 hidden sm:inline">
            Tested against 90-day Leena AI conversion data
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {PRESET_URLS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectPreset(preset.url)}
              disabled={isLoading}
              className="group text-left p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 bg-white dark:bg-slate-900 hover:bg-blue-50/40 dark:hover:bg-blue-950/30 shadow-sm hover:shadow transition-all duration-150 active:scale-[0.99] flex flex-col justify-between"
            >
              <div className="space-y-0.5">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {preset.category}
                  </span>
                  <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                  {preset.label}
                </div>
              </div>

              <div className="mt-2.5">
                <span
                  className={`inline-flex items-center text-[10px] sm:text-[11px] px-2 py-0.5 rounded-lg font-semibold border ${preset.badgeStyle}`}
                >
                  {preset.badge}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
