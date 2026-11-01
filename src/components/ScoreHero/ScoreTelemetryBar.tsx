"use client";

import React from "react";
import type { GradeResult } from "@/types";
import { Zap, Clock, ShieldCheck, Target, ArrowUpDown, Layers } from "lucide-react";

interface ScoreTelemetryBarProps {
  result: GradeResult;
}

export function ScoreTelemetryBar({ result }: ScoreTelemetryBarProps) {
  return (
    <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4 text-center">
      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>PageSpeed</span>
        </div>
        <div className="text-base font-bold text-slate-900 dark:text-white">
          {result.pageSpeed.performanceScore}/100
        </div>
      </div>

      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
          <Clock className="w-3.5 h-3.5 text-blue-500" />
          <span>LCP Time</span>
        </div>
        <div className="text-base font-bold text-slate-900 dark:text-white">
          {(result.pageSpeed.lcp / 1000).toFixed(1)}s
        </div>
      </div>

      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
          <Target className="w-3.5 h-3.5 text-emerald-500" />
          <span>CTAs Found</span>
        </div>
        <div className="text-base font-bold text-slate-900 dark:text-white">
          {result.conversionAnalysis.ctaCount}
        </div>
      </div>

      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
          <span>Security (SSL)</span>
        </div>
        <div className="text-base font-bold text-emerald-600 dark:text-emerald-400">
          {result.technicalAnalysis.hasSSL ? "Active HTTPS" : "Insecure HTTP"}
        </div>
      </div>

      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
          <Layers className="w-3.5 h-3.5 text-purple-500" />
          <span>Headings</span>
        </div>
        <div className="text-base font-bold text-slate-900 dark:text-white">
          {result.seoAnalysis.headingStructure.length}
        </div>
      </div>

      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
          <ArrowUpDown className="w-3.5 h-3.5 text-rose-500" />
          <span>Form Fields</span>
        </div>
        <div className="text-base font-bold text-slate-900 dark:text-white">
          {result.conversionAnalysis.formFields} fields
        </div>
      </div>
    </div>
  );
}

