"use client";

import React from "react";
import type { AudienceDetection } from "@/types";
import { AUDIENCE_WEIGHT_EXPLANATION } from "@/lib/constants";
import { Users, CheckCircle, Info, Compass } from "lucide-react";

interface AudienceCardProps {
  audience: AudienceDetection;
}

export function AudienceCard({ audience }: AudienceCardProps) {
  const formatAudienceTitle = (type: string) => {
    switch (type) {
      case "enterprise-buyer":
        return "Enterprise B2B Decision-Maker";
      case "self-serve-user":
        return "Self-Serve / Product-Led User";
      case "information-seeker":
        return "Information / Resource Seeker";
      default:
        return type;
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "enterprise-buyer":
        return "bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800";
      case "self-serve-user":
        return "bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800";
      case "information-seeker":
        return "bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-lg space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Audience Detection Engine
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getBadgeColor(
                  audience.primaryAudience
                )}`}
              >
                {audience.confidence}% Confidence
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Target Audience: {formatAudienceTitle(audience.primaryAudience)}
            </h2>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
        {audience.description}
      </p>

      {/* Extracted Page Signals */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-blue-500" />
          Detected Semantic Signals On This Page:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {audience.signals.length > 0 ? (
            audience.signals.map((signal, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800"
              >
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{signal}</span>
              </div>
            ))
          ) : (
            <div className="text-xs text-slate-400 italic">
              Standard consumer / general product signals detected.
            </div>
          )}
        </div>
      </div>

      {/* Signal Weight Differential Callout (Assignment Hard Requirement) */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-indigo-500 flex-shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Signal Weight Differential in Action
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 space-y-3">
          <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            Signal:{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              {AUDIENCE_WEIGHT_EXPLANATION.signal}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-950 space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                <span>Enterprise Buyer</span>
                <span className="text-indigo-600 dark:text-indigo-400">30% Weight</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                {AUDIENCE_WEIGHT_EXPLANATION["enterprise-buyer"].reason}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-950 space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                <span>Self-Serve User</span>
                <span className="text-purple-600 dark:text-purple-400">20% Weight</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                {AUDIENCE_WEIGHT_EXPLANATION["self-serve-user"].reason}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-950 space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                <span>Information Seeker</span>
                <span className="text-amber-600 dark:text-amber-400">5% Weight</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                {AUDIENCE_WEIGHT_EXPLANATION["information-seeker"].reason}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

