import { useMemo } from "react";
import { format } from "date-fns";
import { Header } from "src/components/layout/header";
import { Footer } from "src/components/layout/footer";
import { ShareButtons } from "src/components/ui/share-buttons";
import { useLanguage, getLocalizedPath } from "src/context/LanguageContext";
import { useSeo } from "src/hooks/useSeo";
import { SITE_NAME, SITE_URL, DEFAULT_SOCIAL_IMAGE } from "src/config/seo";
import { Card, CardContent } from "src/components/ui/card";
import { Button } from "src/components/ui/button";

interface BlogArticleProps {
  params: {
    slug: string;
  };
}

const getArray = (value: unknown): any[] => (Array.isArray(value) ? value : []);

const buildBlogSchema = (post: any, url: string) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.excerpt,
  image: DEFAULT_SOCIAL_IMAGE,
  datePublished: post.published,
  dateModified: post.published,
  author: {
    "@type": "Person",
    name: post.author
  },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/favicon/icon.png`
    }
  },
  mainEntityOfPage: url,
  url
});

export default function BlogArticlePage({ params }: BlogArticleProps) {
  const { t, language } = useLanguage();
  const posts = useMemo(() => getArray(t("blog.posts")), [t]);
  const post = posts.find((item: any) => item.slug === params.slug);

  const localizedUrl = getLocalizedPath(language, `/blog/${params.slug}`);
  const shareUrl = typeof window !== "undefined" ? window.location.href : `${SITE_URL}${localizedUrl}`;

  const seoConfig = useMemo(() => {
    if (!post) {
      return {
        title: SITE_NAME,
        description: t("blog.metaDescription"),
        path: localizedUrl,
        noindex: true
      };
    }

    return {
      title: post.title,
      description: post.excerpt,
      path: `/blog/${post.slug}`,
      keywords: post.tags ?? [],
      structuredData: buildBlogSchema(post, shareUrl)
    };
  }, [localizedUrl, post, shareUrl, t]);

  useSeo(seoConfig);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
        <Header />
        <main className="pt-24 pb-20 sm:pt-28 sm:pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl font-bold">{t("blog.articleNotFoundTitle")}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">{t("blog.articleNotFoundDescription")}</p>
            <Button asChild className="brand-gradient text-white px-6 py-3 text-base font-semibold">
              <a href={getLocalizedPath(language, "/blog")}>{t("blog.backToBlog")}</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="pt-24 pb-20 sm:pt-28 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto space-y-10">
          <header className="space-y-4 text-center">
            <p className="text-sm font-medium uppercase tracking-wide text-emerald-600 dark:text-emerald-300">{post.category}</p>
            <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {format(new Date(post.published), "MMMM d, yyyy")} • {post.readingTime} • {post.author}
            </p>
            <ShareButtons title={post.title} url={shareUrl} className="justify-center" />
          </header>

          <Card className="border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900">
            <CardContent className="prose prose-emerald max-w-none dark:prose-invert">
              {post.content.map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-2 text-xs text-emerald-600 dark:text-emerald-300">
            {post.tags?.map((tag: string) => (
              <span key={tag} className="rounded-full border border-emerald-200/60 bg-emerald-50 px-2 py-1 dark:border-emerald-900/40 dark:bg-emerald-950/40">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex justify-center">
            <Button variant="ghost" className="text-emerald-600 hover:text-emerald-500 dark:text-emerald-300" asChild>
              <a href={getLocalizedPath(language, "/blog")}>{t("blog.backToBlog")}</a>
            </Button>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
