"use client";

import React from "react";
import { LEENA_DATASET } from "@/lib/benchmark-data";
import { CheckCircle2 } from "lucide-react";

interface BenchmarkTableProps {
  selectedPageUrl: string;
  onSelectPageUrl: (url: string) => void;
  onSelectUrlForGrading: (url: string) => void;
}

export function BenchmarkTable({
  selectedPageUrl,
  onSelectPageUrl,
  onSelectUrlForGrading,
}: BenchmarkTableProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md overflow-hidden space-y-4">
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Ground-Truth Dataset & Performance Metrics
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Real traffic & conversion data over 90 days from the confidential Leena AI dataset.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
              <th className="py-3 px-3">Page / URL</th>
              <th className="py-3 px-3">Traffic Source Split</th>
              <th className="py-3 px-3 text-right">Sessions</th>
              <th className="py-3 px-3 text-right">Form Fills</th>
              <th className="py-3 px-3 text-right">Actual CR</th>
              <th className="py-3 px-3 text-center">Actual Rank</th>
              <th className="py-3 px-3 text-center">v1 Score (Rank)</th>
              <th className="py-3 px-3 text-center">v2 Score (Rank)</th>
              <th className="py-3 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {LEENA_DATASET.map((page, idx) => {
              const isSelected = selectedPageUrl === page.url;
              const rankMatch = page.v2Rank === page.actualRank;

              return (
                <tr
                  key={idx}
                  onClick={() => onSelectPageUrl(page.url)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-blue-50/70 dark:bg-blue-950/30"
                      : "hover:bg-slate-50/60 dark:hover:bg-slate-800/40"
                  }`}
                >
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{page.pageType}</span>
                      {rankMatch && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 inline" />
                      )}
                    </div>
                    <div className="text-[11px] text-blue-600 dark:text-blue-400 truncate max-w-xs font-mono">
                      {page.url}
                    </div>
                  </td>

                  <td className="py-3.5 px-3 min-w-[140px]">
                    <div className="flex items-center gap-1 text-[10px] text-slate-500 mb-1">
                      {page.trafficSplit.paidSearch > 0 && (
                        <span className="font-semibold text-blue-600">
                          Search {page.trafficSplit.paidSearch}%
                        </span>
                      )}
                      {page.trafficSplit.paidSocial > 0 && (
                        <span className="font-semibold text-purple-600">
                          Social {page.trafficSplit.paidSocial}%
                        </span>
                      )}
                      {page.trafficSplit.direct > 0 && (
                        <span className="font-semibold text-emerald-600">
                          Direct {page.trafficSplit.direct}%
                        </span>
                      )}
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden flex">
                      <div
                        style={{ width: `${page.trafficSplit.direct}%` }}
                        className="bg-emerald-500"
                        title={`Direct: ${page.trafficSplit.direct}%`}
                      />
                      <div
                        style={{ width: `${page.trafficSplit.organicSearch}%` }}
                        className="bg-cyan-500"
                        title={`Organic Search: ${page.trafficSplit.organicSearch}%`}
                      />
                      <div
                        style={{ width: `${page.trafficSplit.paidSearch}%` }}
                        className="bg-blue-500"
                        title={`Paid Search: ${page.trafficSplit.paidSearch}%`}
                      />
                      <div
                        style={{ width: `${page.trafficSplit.paidSocial}%` }}
                        className="bg-purple-500"
                        title={`Paid Social: ${page.trafficSplit.paidSocial}%`}
                      />
                      <div
                        style={{ width: `${page.trafficSplit.email}%` }}
                        className="bg-amber-500"
                        title={`Email: ${page.trafficSplit.email}%`}
                      />
                    </div>
                  </td>

                  <td className="py-3.5 px-3 text-right font-medium text-slate-700 dark:text-slate-300">
                    {page.sessions.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-3 text-right font-medium text-slate-700 dark:text-slate-300">
                    {page.formFills.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-3 text-right font-bold text-slate-900 dark:text-white">
                    {page.conversionRate.toFixed(2)}%
                  </td>

                  <td className="py-3.5 px-3 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-full font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                      #{page.actualRank}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-center text-slate-500">
                    <span className="font-semibold">{page.v1Score}</span>{" "}
                    <span className="text-[10px]">
                      (#{page.v1Rank}
                      {page.v1Rank !== page.actualRank ? " ✗" : " ✓"})
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-center">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {page.v2Score}
                    </span>{" "}
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      (#{page.v2Rank} ✓)
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectUrlForGrading(page.url);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-100 transition-colors"
                    >
                      Grade Live
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

