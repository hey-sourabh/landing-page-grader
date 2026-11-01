"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

export function BenchmarkDisagreement() {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-amber-950/20 border-2 border-amber-300 dark:border-amber-800/80 rounded-3xl p-6 sm:p-8 shadow-lg space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black shadow-md shadow-amber-500/30">
          !
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Assignment Requirement: One More Thing
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            The Biggest Disagreement: Who is Wrong — Your Grader, or the Data?
          </h3>
        </div>
      </div>

      <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>
          <strong>The Disagreement:</strong> The CHRISTUS Health Webinar Landing Page (
          <code className="text-xs bg-amber-100 dark:bg-amber-950/80 px-1 py-0.5 rounded text-amber-900 dark:text-amber-300">
            .../christus-health-hr-ai-rollout-webinar
          </code>
          ) received <strong>12,437 visits</strong> yet yielded only <strong>14 form fills</strong>
          — a microscopic <strong>0.11% conversion rate</strong>. In comparison, the HR functional
          solution page converted at <strong>0.58%</strong> (over 5x higher!).
        </p>

        <p>
          Yet our grader evaluates the webinar page at a respectable <strong>64.8 score</strong>
          (it has clear speaker credentials, reputable customer case story, clear event headline,
          and working form). Why did it convert so abysmally in reality?
        </p>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/60 space-y-2">
          <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Verdict: The Data is Misleading (The Traffic Source Confounder)
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            When analyzing the dataset&apos;s traffic split column, the culprit becomes undeniable:
            <strong> 79% of the webinar page traffic came from Paid Social</strong> (LinkedIn /
            Meta ads) and <strong>18% from Email</strong>, with <strong>0% Organic</strong> and{" "}
            <strong>0% Search</strong>.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            By contrast, the top-performing HR page was fueled by <strong>58% Paid Search</strong>{" "}
            (prospects actively seeking enterprise HR automation software). Paid social delivers
            passive scrollers on mobile phones inside in-app webviews who bounce before filling
            out multi-field B2B business forms.
          </p>
          <p className="text-xs font-semibold text-amber-800 dark:text-amber-300 pt-1">
            Key Architectural Takeaway: A landing page grader must grade page execution for its
            intended audience, not take the blame for a media buyer driving mismatched, low-intent
            traffic.
          </p>
        </div>
      </div>
    </div>
  );
}

