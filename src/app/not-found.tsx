import Link from "next/link";
import PostcodeSearch from "@/components/PostcodeSearch";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-50">
        <svg
          className="h-10 w-10 text-primary-600"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>

      <h1 className="mt-8 text-4xl font-bold text-slate-900 tracking-tight">
        Page Not Found
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Sorry, we could not find the page you were looking for. It may have been moved or
        no longer exists.
      </p>

      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-primary-700"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          Back to Home
        </Link>
      </div>

      <div className="mt-12">
        <p className="mb-4 text-sm font-medium text-slate-500 uppercase tracking-wider">
          Or search for a property
        </p>
        <PostcodeSearch size="sm" />
      </div>
    </div>
  );
}
