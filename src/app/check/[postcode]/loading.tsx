export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      {/* Header skeleton */}
      <div className="animate-fade-in text-center mb-12">
        <div className="mx-auto h-8 w-72 rounded-lg bg-slate-200 animate-pulse" />

        {/* Score circle skeleton */}
        <div className="mt-8 flex justify-center">
          <div className="h-32 w-32 rounded-full border-8 border-slate-200 animate-pulse flex items-center justify-center">
            <div className="h-8 w-12 rounded bg-slate-200" />
          </div>
        </div>

        {/* Loading message */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <svg
            className="animate-spin h-5 w-5 text-primary-600"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <p className="text-lg text-slate-600 font-medium">
            Checking 20+ data sources...
          </p>
        </div>
      </div>

      {/* Skeleton cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Card header skeleton */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-slate-200 animate-pulse" />
              <div className="h-6 w-40 rounded bg-slate-200 animate-pulse" />
            </div>

            {/* Card content skeleton lines */}
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-slate-100 animate-pulse" />
              <div className="h-4 w-3/4 rounded bg-slate-100 animate-pulse" />
              <div className="h-4 w-5/6 rounded bg-slate-100 animate-pulse" />
              <div className="h-4 w-2/3 rounded bg-slate-100 animate-pulse" />
            </div>

            {/* Fake bar chart skeleton */}
            {i === 1 && (
              <div className="mt-4 space-y-2">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <div className="h-3 w-20 rounded bg-slate-100 animate-pulse" />
                    <div
                      className="h-3 rounded bg-slate-200 animate-pulse"
                      style={{ width: `${80 - j * 15}%` }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Premium section skeleton */}
      <div className="mt-10">
        <div className="h-6 w-56 rounded bg-slate-200 animate-pulse mx-auto mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <div className="h-5 w-32 rounded bg-slate-200 animate-pulse mb-4" />
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-slate-100 animate-pulse" />
                <div className="h-3 w-4/5 rounded bg-slate-100 animate-pulse" />
                <div className="h-3 w-3/4 rounded bg-slate-100 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
