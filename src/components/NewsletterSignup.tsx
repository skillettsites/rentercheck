"use client";

import { useState, useEffect } from "react";

interface NewsletterSignupProps {
  variant: "inline" | "banner";
  source?: string;
}

export default function NewsletterSignup({
  variant,
  source = "unknown",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const subscribed = localStorage.getItem("rentercheck-newsletter-subscribed");
      if (subscribed === "true") {
        setHidden(true);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        localStorage.setItem("rentercheck-newsletter-subscribed", "true");
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  if (hidden) return null;

  if (variant === "inline") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
        {status === "success" ? (
          <div className="flex items-center gap-3 text-green-700">
            <svg className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <p className="font-medium">You&apos;re subscribed! Check your inbox.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-600 mb-4">
              Get weekly tenant rights updates and rental market insights.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            {status === "error" && (
              <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
            )}
          </>
        )}
      </div>
    );
  }

  // variant === "banner"
  return (
    <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-20 text-center">
        {status === "success" ? (
          <div className="flex flex-col items-center gap-3">
            <svg className="h-10 w-10 text-accent-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <p className="text-xl font-semibold">You&apos;re subscribed! Check your inbox.</p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Stay Protected as a Renter
            </h2>
            <p className="mt-4 text-lg text-primary-100 max-w-2xl mx-auto">
              Weekly updates on your rights, law changes, and rental market data.
              Join 5,000+ UK renters.
            </p>
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full sm:flex-1 rounded-lg border border-primary-600 bg-primary-700/50 px-4 py-3 text-sm text-white placeholder:text-primary-300 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-accent-400"
                required
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full sm:w-auto rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-600 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            {status === "error" && (
              <p className="mt-3 text-sm text-red-300">{errorMessage}</p>
            )}
            <p className="mt-4 text-xs text-primary-300">
              No spam. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
