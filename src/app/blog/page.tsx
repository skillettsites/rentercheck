import type { Metadata } from "next";
import Link from "next/link";
import { blogArticles, categoryColors } from "@/data/blog-articles";
import type { BlogArticle } from "@/data/blog-articles";
import BlogCategoryFilter from "./BlogCategoryFilter";
import NewsletterSignup from "@/components/NewsletterSignup";

export const metadata: Metadata = {
  title: "RenterCheck Blog | Tenant Rights & Rental Guides",
  description:
    "Free guides to UK tenant rights, rental tips, and renting advice. Learn about deposits, rent increases, damp and mould law, landlord obligations, and how to protect yourself as a tenant.",
  openGraph: {
    title: "RenterCheck Blog | Tenant Rights & Rental Guides",
    description:
      "Free guides to UK tenant rights, rental tips, and renting advice for tenants in England.",
    url: "https://rentercheck.vercel.app/blog",
  },
};

function getExcerpt(article: BlogArticle): string {
  const firstSection = article.sections[0];
  if (!firstSection) return "";
  const text = firstSection.content
    .replace(/\*\*[^*]+\*\*/g, "")
    .replace(/\n\n/g, " ")
    .replace(/- /g, "");
  return text.length > 160 ? text.slice(0, 157) + "..." : text;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ArticleCard({ article }: { article: BlogArticle }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-primary-200"
    >
      <div className="flex items-center gap-3 mb-3">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${categoryColors[article.category]}`}
        >
          {article.category}
        </span>
        <span className="text-xs text-slate-400">
          {article.readTime} min read
        </span>
      </div>
      <h2 className="text-lg font-bold text-slate-900 group-hover:text-primary-700 transition-colors leading-snug mb-2">
        {article.title}
      </h2>
      <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">
        {getExcerpt(article)}
      </p>
      <div className="flex items-center justify-between">
        <time className="text-xs text-slate-400" dateTime={article.publishDate}>
          {formatDate(article.publishDate)}
        </time>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 group-hover:text-primary-700">
          Read article
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const categories: Array<BlogArticle["category"] | "All"> = [
    "All",
    "Rights",
    "Guides",
    "Money",
    "Safety",
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Tenant Rights &amp; Rental Guides
          </h1>
          <p className="mt-5 mx-auto max-w-2xl text-lg text-primary-100 leading-relaxed">
            Free, plain-English guides covering your rights as a UK tenant.
            Written by housing experts, based on current legislation including
            the Renters&apos; Rights Act 2025.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <BlogCategoryFilter
            categories={categories}
            articles={blogArticles.map((a) => ({
              slug: a.slug,
              category: a.category,
            }))}
          />

          {/* Article grid rendered per category by the client filter */}
          <div id="article-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {blogArticles.map((article) => (
              <div key={article.slug} data-category={article.category}>
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="pb-8 sm:pb-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <NewsletterSignup variant="inline" source="blog" />
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 p-8 sm:p-10 text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Check Your Rental Property
            </h2>
            <p className="mt-3 text-primary-100 max-w-lg mx-auto">
              Get a free safety report for any UK rental property. Check EPC
              ratings, local crime data, damp risks, and more.
            </p>
            <Link
              href="/check"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-md hover:bg-primary-50 transition-all"
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              Check Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
