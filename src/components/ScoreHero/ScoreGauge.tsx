"use client";

import React from "react";
import { formatScore, getScoreBgColor, getScoreLabel } from "@/utils";

interface ScoreGaugeProps {
  score: number;
}

export function ScoreGauge({ score }: ScoreGaugeProps) {
  const currentLabel = getScoreLabel(score);
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getStrokeColor = (val: number) => {
    if (val >= 80) return "#10b981";
    if (val >= 60) return "#eab308";
    if (val >= 40) return "#f97316";
    return "#ef4444";
  };

  const getLetterScore = (val: number) => {
    if (val >= 90) return "A+";
    if (val >= 85) return "A";
    if (val >= 80) return "A-";
    if (val >= 75) return "B+";
    if (val >= 70) return "B";
    if (val >= 65) return "C+";
    if (val >= 60) return "C";
    return "D";
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <div className="relative flex items-center justify-center">
        <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r={radius}
            className="text-slate-100 dark:text-slate-800"
            strokeWidth="12"
            stroke="currentColor"
            fill="transparent"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={getStrokeColor(score)}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {formatScore(score)}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            out of 100
          </span>
        </div>
      </div>

      <div className="text-center sm:text-left space-y-1.5">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <span className="text-2xl font-black text-slate-900 dark:text-white">
            Grade: {getLetterScore(score)}
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-md font-semibold text-white ${getScoreBgColor(
              score
            )}`}
          >
            {currentLabel}
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
          {score >= 80
            ? "Excellent optimization across conversion pathways and technical telemetry."
            : score >= 65
            ? "Solid baseline with measurable upside in CTA alignment and friction reduction."
            : "Significant conversion friction and structural deficiencies discovered."}
        </p>
      </div>
    </div>
  );
}

