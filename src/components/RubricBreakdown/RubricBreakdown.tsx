"use client";

import React, { useState } from "react";
import type { RubricCategory } from "@/types";
import { RubricCategoryCard } from "./RubricCategoryCard";

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

  const handleToggleAll = () => {
    const allOpen = Object.values(openMap).every(Boolean);
    const nextMap: Record<string, boolean> = {};
    categories.forEach((cat) => {
      nextMap[cat.key] = !allOpen;
    });
    setOpenMap(nextMap);
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
          onClick={handleToggleAll}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          {Object.values(openMap).every(Boolean) ? "Collapse All" : "Expand All"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {categories.map((cat) => (
          <RubricCategoryCard
            key={cat.key}
            cat={cat}
            isOpen={!!openMap[cat.key]}
            onToggle={() => toggleCategory(cat.key)}
          />
        ))}
      </div>
    </div>
  );
}
