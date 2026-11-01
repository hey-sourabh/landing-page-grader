"use client";

import React, { useState } from "react";
import { Loader2, Globe, ArrowRight, Sparkles } from "lucide-react";

interface UrlInputBarProps {
  onGrade: (url: string) => Promise<void>;
  isLoading: boolean;
  loadingStep?: string;
}

const PRESET_URLS = [
  {
    label: "Leena AI — HR Solution",
    badge: "Actual Rank #1 (0.58% CR)",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    url: "https://leena.ai/function/hr",
  },
  {
    label: "Leena AI — Homepage",
    badge: "Actual Rank #2 (0.56% CR)",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    url: "https://leena.ai/",
  },
  {
    label: "Leena AI — Webinar Landing",
    badge: "Actual Rank #3 (0.11% CR)",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    url: "https://leena.ai/resources/webinars/christus-health-hr-ai-rollout-webinar",
  },
  {
    label: "Linear App",
    badge: "Self-Serve SaaS",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
    url: "https://linear.app",
  },
];

export function UrlInputBar({ onGrade, isLoading, loadingStep }: UrlInputBarProps) {
  const [inputUrl, setInputUrl] = useState("https://leena.ai/function/hr");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim() || isLoading) return;
    onGrade(inputUrl.trim());
  };

  const handleSelectPreset = (url: string) => {
    setInputUrl(url);
    onGrade(url);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center shadow-xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 sm:p-2.5 transition-all focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
          <div className="pl-3 pr-2 text-slate-400">
            <Globe className="w-5 h-5" />
          </div>

          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Paste any landing page URL (e.g. https://leena.ai/function/hr)..."
            disabled={isLoading}
            className="flex-1 bg-transparent px-2 py-2 text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />

          <button
            type="submit"
            disabled={isLoading || !inputUrl.trim()}
            className="flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium text-sm sm:text-base shadow-md shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">Grading Live...</span>
              </>
            ) : (
              <>
                <span>Grade Page</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {isLoading && (
          <div className="mt-3 flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium animate-pulse">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>{loadingStep || "Fetching page DOM & running Google PageSpeed audit..."}</span>
          </div>
        )}
      </form>

      {/* Dataset Presets */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Test Real Dataset Pages:
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Tested against 90-day conversion data
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {PRESET_URLS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectPreset(preset.url)}
              disabled={isLoading}
              className="group text-left p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 bg-white/70 dark:bg-slate-900/70 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all text-xs"
            >
              <div className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                {preset.label}
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span
                  className={`inline-block text-[10px] px-1.5 py-0.5 rounded-md font-medium border ${preset.badgeColor}`}
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

