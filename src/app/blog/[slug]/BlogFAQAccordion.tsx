"use client";

import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

export default function BlogFAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-slate-100">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="py-4 first:pt-0 last:pb-0">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-start justify-between gap-4 text-left cursor-pointer group"
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold text-slate-900 group-hover:text-primary-700 transition-colors leading-snug">
                {faq.question}
              </span>
              <svg
                className={`h-5 w-5 shrink-0 mt-0.5 text-slate-400 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                isOpen ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-sm text-slate-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
