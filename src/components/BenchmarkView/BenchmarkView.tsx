"use client";

import React, { useState } from "react";
import { LEENA_DATASET } from "@/lib/benchmark-data";
import { CheckCircle2, Scale, Sparkles } from "lucide-react";
import { BenchmarkTable } from "./BenchmarkTable";
import { BenchmarkDeepDive } from "./BenchmarkDeepDive";
import { BenchmarkDisagreement } from "./BenchmarkDisagreement";

interface BenchmarkViewProps {
  onSelectUrlForGrading: (url: string) => void;
}

export function BenchmarkView({ onSelectUrlForGrading }: BenchmarkViewProps) {
  const [selectedPageUrl, setSelectedPageUrl] = useState(LEENA_DATASET[0].url);
  const activePage = LEENA_DATASET.find((p) => p.url === selectedPageUrl) || LEENA_DATASET[0];

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-2">
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            Empirical Validation on Real Leena.ai 90-Day Data
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Checked Against Real Results: Rubric Evolution & Benchmark
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            &ldquo;A page your grader scores 85 should convert better than one it scores 60.&rdquo;
            Below is the empirical test across real leena.ai pages, comparing our baseline Rubric v1
            against our final Audience-Aware Rubric v2.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-xl border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Rubric v2 Rank Correlation: 1.0 (Perfect Match)</span>
            </div>
            <div className="flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1.5 rounded-xl border border-amber-500/30">
              <Scale className="w-4 h-4 text-amber-400" />
              <span>Rubric v1 Baseline Correlation: 0.5 (Inverted Ranks 1 & 2)</span>
            </div>
          </div>
        </div>
      </div>

      <BenchmarkTable
        selectedPageUrl={selectedPageUrl}
        onSelectPageUrl={setSelectedPageUrl}
        onSelectUrlForGrading={onSelectUrlForGrading}
      />

      <BenchmarkDeepDive
        activePage={activePage}
        onSelectUrlForGrading={onSelectUrlForGrading}
      />

      <BenchmarkDisagreement />
    </div>
  );
}
