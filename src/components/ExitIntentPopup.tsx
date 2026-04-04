"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const hasShown = useRef(false);
  const readyRef = useRef(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  const dismiss = useCallback(() => {
    setVisible(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("rentercheck-exit-popup-shown", "true");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Don't show if already dismissed this session or already subscribed
    if (sessionStorage.getItem("rentercheck-exit-popup-shown") === "true") return;
    if (localStorage.getItem("rentercheck-newsletter-subscribed") === "true") return;

    // Wait 10 seconds before enabling
    const timer = setTimeout(() => {
      readyRef.current = true;
    }, 10000);

    const handleMouseLeave = (e: MouseEvent) => {
      if (
        e.clientY <= 0 &&
        readyRef.current &&
        !hasShown.current
      ) {
        hasShown.current = true;
        setVisible(true);
      }
    };

    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
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
        body: JSON.stringify({ email, source: "exit-intent" }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        localStorage.setItem("rentercheck-newsletter-subscribed", "true");
        setTimeout(() => dismiss(), 2000);
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) {
      dismiss();
    }
  };

  if (!visible) return null;

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div className="animate-slide-up w-full max-w-md mx-4 mb-4 sm:mb-0 rounded-2xl bg-white p-6 sm:p-8 shadow-2xl relative">
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 rounded-full p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Close popup"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {status === "success" ? (
          <div className="text-center py-4">
            <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <p className="mt-3 text-lg font-semibold text-slate-900">Check your inbox!</p>
            <p className="mt-1 text-sm text-slate-600">Your tenant rights checklist is on its way.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Before you go...
              </h3>
              <p className="mt-2 text-slate-600 leading-relaxed">
                Get your free tenant rights checklist emailed to you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-lg bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Sending..." : "Send Me the Checklist"}
              </button>
            </form>

            {status === "error" && (
              <p className="mt-2 text-sm text-red-600 text-center">{errorMessage}</p>
            )}

            <button
              onClick={dismiss}
              className="mt-4 w-full text-center text-sm text-slate-400 hover:text-slate-600 transition-colors"
            >
              No thanks
            </button>
          </>
        )}
      </div>
    </div>
  );
}
