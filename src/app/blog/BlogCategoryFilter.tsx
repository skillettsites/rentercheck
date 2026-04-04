"use client";

import { useState, useEffect } from "react";
import type { BlogArticle } from "@/data/blog-articles";

interface Props {
  categories: Array<BlogArticle["category"] | "All">;
  articles: { slug: string; category: BlogArticle["category"] }[];
}

const tabColors: Record<string, string> = {
  All: "bg-primary-600 text-white",
  Rights: "bg-primary-100 text-primary-700",
  Guides: "bg-accent-100 text-accent-700",
  Money: "bg-warning-100 text-warning-700",
  Safety: "bg-danger-100 text-danger-700",
};

export default function BlogCategoryFilter({ categories, articles }: Props) {
  const [active, setActive] = useState<string>("All");

  useEffect(() => {
    const grid = document.getElementById("article-grid");
    if (!grid) return;
    const items = grid.querySelectorAll<HTMLElement>("[data-category]");
    items.forEach((item) => {
      if (active === "All" || item.dataset.category === active) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  }, [active]);

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const count =
          cat === "All"
            ? articles.length
            : articles.filter((a) => a.category === cat).length;
        const isActive = active === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
              isActive
                ? tabColors[cat]
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {cat}
            <span
              className={`text-xs ${
                isActive ? "opacity-80" : "text-slate-400"
              }`}
            >
              ({count})
            </span>
          </button>
        );
      })}
    </div>
  );
}
