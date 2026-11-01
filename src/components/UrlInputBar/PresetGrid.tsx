"use client";

import React from "react";
import { Search, ExternalLink } from "lucide-react";

interface PresetGridProps {
  onSelectPreset: (url: string) => void;
  disabled: boolean;
}

const PRESET_URLS = [
  {
    label: "Leena AI — HR Solution",
    category: "Functional Solution",
    badge: "Actual Rank #1 (0.58% CR)",
    badgeStyle:
      "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    url: "https://leena.ai/function/hr",
  },
  {
    label: "Leena AI — Homepage",
    category: "Main Company Portal",
    badge: "Actual Rank #2 (0.56% CR)",
    badgeStyle:
      "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    url: "https://leena.ai/",
  },
  {
    label: "Leena AI — Webinar Landing",
    category: "Campaign Resource",
    badge: "Actual Rank #3 (0.11% CR)",
    badgeStyle:
      "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    url: "https://leena.ai/resources/webinars/christus-health-hr-ai-rollout-webinar",
  },
  {
    label: "Linear App",
    category: "Benchmark SaaS",
    badge: "Self-Serve Persona",
    badgeStyle:
      "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    url: "https://linear.app",
  },
];

export function PresetGrid({ onSelectPreset, disabled }: PresetGridProps) {
  return (
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
            onClick={() => onSelectPreset(preset.url)}
            disabled={disabled}
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
  );
}

