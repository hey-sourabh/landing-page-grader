"use client";

import React, { useState } from "react";
import { Globe, ArrowRight, Loader2, X, Sparkles } from "lucide-react";
import { PresetGrid } from "./PresetGrid";

interface UrlInputBarProps {
  onGrade: (url: string) => Promise<void>;
  isLoading: boolean;
  loadingStep?: string;
}

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

      <PresetGrid onSelectPreset={handleSelectPreset} disabled={isLoading} />
    </div>
  );
}
