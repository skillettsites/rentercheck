import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  blogArticles,
  getAllArticleSlugs,
  getArticleBySlug,
  categoryColors,
} from "@/data/blog-articles";
import PostcodeSearch from "@/components/PostcodeSearch";
import BlogFAQAccordion from "./BlogFAQAccordion";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} | RenterCheck`,
    description: article.metaDescription,
    openGraph: {
      title: `${article.title} | RenterCheck`,
      description: article.metaDescription,
      url: `https://rentercheck.vercel.app/blog/${article.slug}`,
      type: "article",
      publishedTime: article.publishDate,
      modifiedTime: article.lastUpdated,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.metaDescription,
    },
  };
}

function renderContent(text: string) {
  // Split by double newline to get paragraphs/blocks
  const blocks = text.split("\n\n");

  return blocks.map((block, blockIdx) => {
    // Check if this block is a list (all lines start with "- ")
    const lines = block.split("\n");
    const isAllBullets = lines.every((line) => line.startsWith("- "));

    if (isAllBullets && lines.length > 0) {
      return (
        <ul key={blockIdx} className="space-y-2 ml-1">
          {lines.map((line, lineIdx) => (
            <li
              key={lineIdx}
              className="flex gap-2 text-slate-700"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
              <span>{renderInline(line.slice(2))}</span>
            </li>
          ))}
        </ul>
      );
    }

    // Mixed content: some bullets, some paragraphs
    return lines.map((line, lineIdx) => {
      if (line.startsWith("- ")) {
        return (
          <div key={`${blockIdx}-${lineIdx}`} className="flex gap-2 text-slate-700 ml-1">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
            <span>{renderInline(line.slice(2))}</span>
          </div>
        );
      }
      if (line.trim() === "") return null;
      return (
        <p key={`${blockIdx}-${lineIdx}`} className="text-slate-700">
          {renderInline(line)}
        </p>
      );
    });
  });
}

function renderInline(text: string) {
  // Handle **bold** and [link text](/url) patterns
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <Link
          key={i}
          href={linkMatch[2]}
          className="font-medium text-primary-600 underline decoration-primary-200 hover:decoration-primary-400 transition-colors"
        >
          {linkMatch[1]}
        </Link>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const relatedArticles = article.relatedSlugs
    .map((s) => getArticleBySlug(s))
    .filter(Boolean);

  // Build JSON-LD schemas
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishDate,
    dateModified: article.lastUpdated,
    author: {
      "@type": "Organization",
      name: "RenterCheck",
      url: "https://rentercheck.vercel.app",
    },
    publisher: {
      "@type": "Organization",
      name: "RenterCheck",
      url: "https://rentercheck.vercel.app",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://rentercheck.vercel.app/blog/${article.slug}`,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link
              href="/"
              className="hover:text-primary-600 transition-colors"
            >
              Home
            </Link>
            <svg
              className="h-4 w-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
            <Link
              href="/blog"
              className="hover:text-primary-600 transition-colors"
            >
              Blog
            </Link>
            <svg
              className="h-4 w-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
            <span className="text-slate-700 font-medium truncate">
              {article.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-10">
          {/* Sidebar: Table of Contents (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                On this page
              </h2>
              <nav className="space-y-1">
                {article.sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 leading-snug"
                  >
                    {section.heading}
                  </a>
                ))}
                <a
                  href="#faqs"
                  className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 leading-snug"
                >
                  FAQs
                </a>
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <article className="min-w-0">
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${categoryColors[article.category]}`}
                >
                  {article.category}
                </span>
                <span className="text-sm text-slate-400">
                  {article.readTime} min read
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                {article.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                <time dateTime={article.publishDate}>
                  Published {formatDate(article.publishDate)}
                </time>
                {article.lastUpdated !== article.publishDate && (
                  <time dateTime={article.lastUpdated}>
                    Updated {formatDate(article.lastUpdated)}
                  </time>
                )}
              </div>
            </header>

            {/* Mobile TOC */}
            <div className="lg:hidden mb-8 rounded-2xl border border-slate-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-slate-900 mb-3">
                Contents
              </h2>
              <nav className="space-y-1">
                {article.sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-sm text-primary-600 hover:text-primary-800 py-1"
                  >
                    {section.heading}
                  </a>
                ))}
                <a
                  href="#faqs"
                  className="block text-sm text-primary-600 hover:text-primary-800 py-1"
                >
                  FAQs
                </a>
              </nav>
            </div>

            {/* Article sections */}
            <div className="space-y-8">
              {article.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 rounded-2xl border border-slate-100 bg-white p-6 sm:p-8"
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5">
                    {section.heading}
                  </h2>
                  <div className="space-y-4 leading-relaxed">
                    {renderContent(section.content)}
                  </div>
                </section>
              ))}
            </div>

            {/* FAQs */}
            <section
              id="faqs"
              className="scroll-mt-24 mt-8 rounded-2xl border border-slate-100 bg-white p-6 sm:p-8"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5">
                Frequently Asked Questions
              </h2>
              <BlogFAQAccordion faqs={article.faqs} />
            </section>

            {/* CTA: Check Your Rental */}
            <div className="mt-10 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 p-6 sm:p-8 text-white">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">
                Check Your Rental Property
              </h2>
              <p className="text-primary-100 mb-5 max-w-lg">
                Get a free safety report for any UK rental. Check EPC ratings,
                local crime, damp risks, and landlord compliance.
              </p>
              <PostcodeSearch size="sm" />
            </div>

            {/* Related articles */}
            {relatedArticles.length > 0 && (
              <div className="mt-10">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedArticles.map((related) =>
                    related ? (
                      <Link
                        key={related.slug}
                        href={`/blog/${related.slug}`}
                        className="group rounded-2xl border border-slate-100 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:border-primary-200"
                      >
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold mb-2 ${categoryColors[related.category]}`}
                        >
                          {related.category}
                        </span>
                        <h3 className="font-semibold text-slate-900 group-hover:text-primary-700 transition-colors leading-snug">
                          {related.title}
                        </h3>
                        <p className="mt-1 text-xs text-slate-400">
                          {related.readTime} min read
                        </p>
                      </Link>
                    ) : null,
                  )}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-10 rounded-2xl border border-warning-200 bg-warning-50 p-5 text-sm text-warning-800 leading-relaxed">
              <p className="font-semibold mb-1">Disclaimer</p>
              <p>
                This article provides general information about tenant rights in
                England based on legislation current as of 2026. It is not legal
                advice. Laws differ in Scotland, Wales, and Northern Ireland. If
                you need help with a specific situation, contact{" "}
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
