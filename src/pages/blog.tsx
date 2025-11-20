import { useMemo, useState } from "react";
import { format } from "date-fns";
import { Header } from "src/components/layout/header";
import { Footer } from "src/components/layout/footer";
import { Card, CardContent } from "src/components/ui/card";
import { Button } from "src/components/ui/button";
import { ShareButtons } from "src/components/ui/share-buttons";
import { getLocalizedPath, useLanguage } from "src/context/LanguageContext";
import { Seo } from "src/components/Seo";
import { SITE_URL } from "src/config/seo";
import { organizationSchema } from "src/config/schema";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author: string;
  published: string;
  readingTime: string;
  tags?: string[];
}

const getArray = (value: unknown): any[] => (Array.isArray(value) ? value : []);

export default function BlogPage() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const posts = useMemo<BlogPost[]>(() => getArray(t("blog.posts")), [t]);
  const categories = useMemo(() => ["all", ...getArray(t("blog.categories"))], [t]);

  const seoConfig = useMemo(
    () => ({
      title: t("blog.pageTitle"),
      description: t("blog.metaDescription"),
      path: "/blog",
      keywords: t("blog.keywords"),
      structuredData: organizationSchema,
    }),
    [t]
  );

  const filteredPosts = selectedCategory === "all"
    ? posts
    : posts.filter((post) => post.category === selectedCategory);

  const shareUrl = typeof window !== "undefined"
    ? window.location.href
    : `${SITE_URL}${getLocalizedPath(language, "/blog")}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
      <Seo {...seoConfig} />
      <Header />
      <main className="pt-24 pb-20 sm:pt-28 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
            {t("blog.tagline")}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{t("blog.heroTitle")}</h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("blog.heroSubtitle")}
          </p>
          <ShareButtons title={t("blog.heroTitle") ?? "asyncz Blog"} url={shareUrl} className="justify-center" />
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={selectedCategory === category ? "brand-gradient text-white" : "border-emerald-400 text-emerald-600 dark:text-emerald-200"}
              onClick={() => setSelectedCategory(category)}
            >
              {category === "all" ? t("blog.allLabel") : category}
            </Button>
          ))}
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {filteredPosts.map((post) => (
            <Card key={post.slug} className="border border-gray-200 bg-white shadow-lg transition hover:-translate-y-1 dark:border-gray-800 dark:bg-gray-900">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-1 text-left">
                  <p className="text-sm font-medium uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
                    {post.category}
                  </p>
                  <h2 className="text-2xl font-semibold leading-tight">
                    <a href={getLocalizedPath(language, `/blog/${post.slug}`)} className="hover:text-emerald-600 dark:hover:text-emerald-300">
                      {post.title}
                    </a>
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {format(new Date(post.published), "MMMM d, yyyy")} • {post.readingTime}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 text-xs text-emerald-600 dark:text-emerald-300">
                  {post.tags?.map((tag) => (
                    <span key={tag} className="rounded-full border border-emerald-200/60 bg-emerald-50 px-2 py-1 dark:border-emerald-900/40 dark:bg-emerald-950/40">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div>
                  <a
                    className="inline-flex items-center font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-300"
                    href={getLocalizedPath(language, `/blog/${post.slug}`)}
                  >
                    {t("blog.readMore")}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <p className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
            {t("blog.emptyState")}
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
}