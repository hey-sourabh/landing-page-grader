"use client";

import React from "react";
import { SCORING_NOTE } from "@/lib/benchmark-data";
import { useClipboard } from "@/hooks";
import { FileText, Copy, Check, Printer } from "lucide-react";

export function ScoringNoteView() {
  const { copied, copy } = useClipboard();

  const handleCopy = () => {
    const text = SCORING_NOTE.sections
      .map((s) => `${s.heading}\n\n${s.content}`)
      .join("\n\n---\n\n");
    copy(`${SCORING_NOTE.title}\n\n${text}`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-2">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Official Scoring Note (Deliverable)
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Complete 1-page rubric methodology, audience adjustments, and calibration notes.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Text</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Note</span>
          </button>
        </div>
      </div>

      {/* Main Document Body */}
      <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 font-serif sm:text-base leading-relaxed text-slate-800 dark:text-slate-200">
        <header className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2 font-sans">
          <div className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Leena AI — Website Engineer Take-Home Deliverable
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Landing Page Grader: Scoring Note & Methodology
          </h2>
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
            <span>Author: Website Engineer Candidate</span>
            <span>•</span>
            <span>Date: October 2026</span>
            <span>•</span>
            <span>Scope: Full Teardown & Calibration</span>
          </div>
        </header>

        {SCORING_NOTE.sections.map((section, idx) => (
          <section key={idx} className="space-y-3">
            <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-white">
              {section.heading}
            </h3>
            <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line font-sans">
              {section.content}
            </div>
          </section>
        ))}

        <footer className="border-t border-slate-200 dark:border-slate-800 pt-6 font-sans text-xs text-slate-500 dark:text-slate-400">
          <p>
            Summary: Grader v2 aligns with real-world conversion rankings (Spearman rho = 1.0) by
            incorporating audience intent and weighting conversion elements according to buying
            velocity rather than vanity metrics.
          </p>
        </footer>
      </article>
    </div>
  );
}

