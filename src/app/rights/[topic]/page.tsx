import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  rightsTopics,
  getAllTopicSlugs,
  getTopicBySlug,
} from "@/data/rights-topics";

interface PageProps {
  params: Promise<{ topic: string }>;
}

export async function generateStaticParams() {
  return getAllTopicSlugs().map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic: slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return {};

  return {
    title: `${topic.title} | RenterCheck`,
    description: topic.metaDescription,
    openGraph: {
      title: `${topic.title} | RenterCheck`,
      description: topic.metaDescription,
      url: `https://rentercheck.vercel.app/rights/${topic.slug}`,
    },
  };
}

function renderContent(text: string) {
  // Convert **bold** to <strong> and handle line-level bullet points
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default async function TopicPage({ params }: PageProps) {
  const { topic: slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

  const relatedTopics = topic.relatedTopics
    .map((s) => getTopicBySlug(s))
    .filter(Boolean);

  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-primary-600 transition-colors">
              Home
            </Link>
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            <Link href="/rights" className="hover:text-primary-600 transition-colors">
              Rights
            </Link>
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-slate-700 font-medium truncate">
              {topic.shortTitle}
            </span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-10">
          {/* Sidebar: Table of Contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                On this page
              </h2>
              <nav className="space-y-1">
                {topic.sections.map((section, i) => (
                  <a
                    key={i}
                    href={`#section-${i}`}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 leading-snug"
                  >
                    {section.heading}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <article className="min-w-0">
            {/* Title */}
            <header className="mb-10">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                {topic.title}
              </h1>
              <p className="mt-3 text-sm text-slate-500">
                Last updated: {new Date(topic.lastUpdated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </header>

            {/* Mobile TOC */}
            <div className="lg:hidden mb-8 rounded-2xl border border-slate-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-slate-900 mb-3">
                Contents
              </h2>
              <nav className="space-y-1">
                {topic.sections.map((section, i) => (
                  <a
                    key={i}
                    href={`#section-${i}`}
                    className="block text-sm text-primary-600 hover:text-primary-800 py-1"
                  >
                    {section.heading}
                  </a>
                ))}
              </nav>
            </div>

            {/* Sections */}
            <div className="space-y-8">
              {topic.sections.map((section, i) => (
                <section
                  key={i}
                  id={`section-${i}`}
                  className="scroll-mt-24 rounded-2xl border border-slate-100 bg-white p-6 sm:p-8"
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5">
                    {section.heading}
                  </h2>
                  <div className="space-y-4 text-slate-700 leading-relaxed">
                    {section.content.map((paragraph, j) => {
                      // Bullet point
                      if (paragraph.startsWith("- ")) {
                        return (
                          <li
                            key={j}
                            className="ml-5 list-disc marker:text-primary-400"
                          >
                            {renderContent(paragraph.slice(2))}
                          </li>
                        );
                      }
                      return (
                        <p key={j}>{renderContent(paragraph)}</p>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>

            {/* Feedback */}
            <div className="mt-10 rounded-2xl border border-slate-100 bg-white p-6 sm:p-8 text-center">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">
                Was this guide helpful?
              </h2>
              <p className="text-sm text-slate-500 mb-5">
                Your feedback helps us improve our guides for other tenants.
              </p>
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-accent-50 hover:border-accent-300 hover:text-accent-700"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m7.723-9.132c.186.095.37.196.55.303m-7.723 8.83a3 3 0 0 1-2.25-2.906V9.554a3 3 0 0 1 2.25-2.905" />
                  </svg>
                  Yes, helpful
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-danger-50 hover:border-danger-300 hover:text-danger-700"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 2.25 12.25c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
                  </svg>
                  Could be better
                </button>
              </div>
            </div>

            {/* Related Topics */}
            {relatedTopics.length > 0 && (
              <div className="mt-10">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                  Related Guides
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedTopics.map((related) =>
                    related ? (
                      <Link
                        key={related.slug}
                        href={`/rights/${related.slug}`}
                        className="group rounded-2xl border border-slate-100 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:border-primary-200"
                      >
                        <h3 className="font-semibold text-slate-900 group-hover:text-primary-700 transition-colors">
                          {related.shortTitle}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500 line-clamp-2">
                          {related.description}
                        </p>
                      </Link>
                    ) : null
                  )}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-10 rounded-2xl border border-warning-200 bg-warning-50 p-5 text-sm text-warning-800 leading-relaxed">
              <p className="font-semibold mb-1">Disclaimer</p>
              <p>
                This guide provides general information about tenant rights in
                England based on legislation current as of 2026. It is not
                legal advice. If you need help with a specific situation,
                contact{" "}
                <a
                  href="https://www.shelter.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline hover:text-warning-900"
                >
                  Shelter
                </a>{" "}
                (0808 800 4444) or{" "}
                <a
                  href="https://www.citizensadvice.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline hover:text-warning-900"
                >
                  Citizens Advice
                </a>
                .
              </p>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
