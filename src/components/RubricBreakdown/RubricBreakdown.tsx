"use client";

import React, { useState } from "react";
import type { RubricCategory } from "@/types";
import { getScoreColor, getScoreBgColor } from "@/utils";
import {
  ChevronDown,
  ChevronUp,
  Zap,
  Search,
  FileText,
  Target,
  Eye,
  Cpu,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";

interface RubricBreakdownProps {
  categories: RubricCategory[];
}

export function RubricBreakdown({ categories }: RubricBreakdownProps) {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({
    conversion: true,
    performance: true,
  });

  const toggleCategory = (key: string) => {
    setOpenMap((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getCategoryIcon = (key: string) => {
    switch (key) {
      case "performance":
        return <Zap className="w-5 h-5 text-amber-500" />;
      case "seo":
        return <Search className="w-5 h-5 text-blue-500" />;
      case "content":
        return <FileText className="w-5 h-5 text-emerald-500" />;
      case "conversion":
        return <Target className="w-5 h-5 text-rose-500" />;
      case "accessibility":
        return <Eye className="w-5 h-5 text-purple-500" />;
      case "technical":
        return <Cpu className="w-5 h-5 text-indigo-500" />;
      default:
        return <Target className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Rubric Breakdown & Scored Audit
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Deterministic scoring: every single point traces back to an inspectable DOM element or
            PageSpeed metric.
          </p>
        </div>
        <button
          onClick={() => {
            const allOpen = Object.values(openMap).every(Boolean);
            const nextMap: Record<string, boolean> = {};
            categories.forEach((cat) => {
              nextMap[cat.key] = !allOpen;
            });
            setOpenMap(nextMap);
          }}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          {Object.values(openMap).every(Boolean) ? "Collapse All" : "Expand All"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {categories.map((cat) => {
          const percentage = Math.round((cat.score / cat.maxScore) * 100);
          const isOpen = !!openMap[cat.key];

          return (
            <div
              key={cat.key}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden transition-all hover:border-slate-300 dark:hover:border-slate-700"
            >
              <div
                onClick={() => toggleCategory(cat.key)}
                className="p-3.5 sm:p-5 flex items-center justify-between gap-3 cursor-pointer select-none hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                    {getCategoryIcon(cat.key)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base truncate">
                        {cat.name}
                      </h3>
                      <span className="text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex-shrink-0">
                        {Math.round(cat.weight * 100)}% Weight
                      </span>
                    </div>
                    {cat.audienceNote && (
                      <p className="text-[11px] sm:text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-0.5 line-clamp-1">
                        {cat.audienceNote}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                  <div className="text-right">
                    <div className="flex items-baseline justify-end gap-1">
                      <span className={`text-base sm:text-lg font-black ${getScoreColor(percentage)}`}>
                        {cat.score}
                      </span>
                      <span className="text-[11px] sm:text-xs text-slate-400">/ {cat.maxScore}</span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400">
                      {percentage}% score
                    </span>
                  </div>

                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                    {isOpen ? <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  </div>
                </div>
              </div>

              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5">
                <div
                  className={`h-1.5 rounded-r transition-all duration-500 ${getScoreBgColor(
                    percentage
                  )}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {isOpen && (
                <div className="p-5 pt-4 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                  <div className="grid grid-cols-1 gap-3">
                    {cat.details.map((detail, idx) => {
                      const itemPercent = (detail.score / detail.maxScore) * 100;
                      const isPassing = itemPercent >= 75;

                      return (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 space-y-2"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2">
                              {isPassing ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                              )}
                              <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                                {detail.label}
                              </span>
                            </div>

                            <span
                              className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                                isPassing
                                  ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
                                  : "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400"
                              }`}
                            >
                              {detail.score} / {detail.maxScore} pts
                            </span>
                          </div>

                          <div className="text-xs text-slate-600 dark:text-slate-300 pl-6">
                            <span className="font-medium text-slate-500 dark:text-slate-400">
                              Finding:{" "}
                            </span>
                            {detail.finding}
                          </div>

                          {detail.recommendation && (
                            <div className="flex items-start gap-1.5 text-xs text-blue-700 dark:text-blue-300 bg-blue-50/70 dark:bg-blue-950/40 p-2.5 rounded-lg border border-blue-200/60 dark:border-blue-900/40 ml-6">
                              <Lightbulb className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                              <div>
                                <span className="font-semibold">Recommendation: </span>
                                {detail.recommendation}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
