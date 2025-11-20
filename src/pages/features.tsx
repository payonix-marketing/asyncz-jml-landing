import { useMemo } from "react";
import { CheckCircle2, Lock, PieChart, ShieldAlert, Sparkles, Timer } from "lucide-react";
import { Header } from "src/components/layout/header";
import { Footer } from "src/components/layout/footer";
import { Button } from "src/components/ui/button";
import { Card, CardContent } from "src/components/ui/card";
import { useLanguage, getLocalizedPath } from "src/context/LanguageContext";
import { Seo } from "src/components/Seo";
import { productSchema } from "src/config/schema";

export default function FeaturesPage() {
  const { t, language } = useLanguage();

  const seoConfig = useMemo(
    () => ({
      title: t("featuresPage.pageTitle"),
      description: t("featuresPage.metaDescription"),
      path: "/features",
      keywords: t("featuresPage.keywords"),
      structuredData: productSchema
    }),
    [t]
  );

  const features = [
    {
      title: t("features.smartCalendar.title"),
      description: t("features.smartCalendar.description"),
      icon: Timer
    },
    {
      title: t("features.multiBranch.title"),
      description: t("features.multiBranch.description"),
      icon: CheckCircle2
    },
    {
      title: t("features.analytics.title"),
      description: t("features.analytics.description"),
      icon: PieChart
    },
    {
      title: t("features.blacklistProtection.title"),
      description: t("features.blacklistProtection.description"),
      icon: ShieldAlert
    },
    {
      title: t("features.customBranding.title"),
      description: t("features.customBranding.description"),
      icon: Sparkles
    },
    {
      title: t("features.domainIntegration.title"),
      description: t("features.domainIntegration.description"),
      icon: Lock
    }
  ];

  const deepDives = t("featuresPage.deepDives");
  const differentiators = t("featuresPage.differentiators");

  const localize = (path: string) => getLocalizedPath(language, path);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
      <Seo {...seoConfig} />
      <Header />
      <main className="pt-24 pb-16 sm:pt-28 sm:pb-24">
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
              {t("featuresPage.tagline")}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              {t("featuresPage.heroTitle")}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t("featuresPage.heroSubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="brand-gradient text-white px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition" asChild>
                <a href={localize("/pricing")}>
                  {t("featuresPage.primaryCta")}
                </a>
              </Button>
              <Button
                variant="outline"
                className="px-8 py-3 text-base font-semibold border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-300 dark:border-emerald-400 dark:hover:bg-emerald-900/30"
                asChild
              >
                <a href={localize("/contact")}>
                  {t("featuresPage.secondaryCta")}
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="mt-16 sm:mt-20 px-4 sm:px-6 lg:px-8" aria-labelledby="core-capabilities">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 id="core-capabilities" className="text-3xl font-bold">
                {t("featuresPage.coreTitle")}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t("featuresPage.coreDescription")}
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map(({ title, description, icon: Icon }) => (
                <Card key={title} className="h-full border border-gray-200/70 bg-white/80 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:border-emerald-400 dark:border-gray-800 dark:bg-gray-900/60">
                  <CardContent className="p-6 space-y-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 sm:mt-24 px-4 sm:px-6 lg:px-8" aria-labelledby="workflow-deep-dives">
          <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <h2 id="workflow-deep-dives" className="text-3xl font-bold">
                {t("featuresPage.deepDiveTitle")}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t("featuresPage.deepDiveDescription")}
              </p>
              <ul className="space-y-4">
                {Array.isArray(deepDives) &&
                  deepDives.map((item: any) => (
                    <li key={item.title} className="rounded-2xl border border-emerald-200/60 bg-white/70 p-4 shadow-sm dark:border-emerald-900/40 dark:bg-gray-900/60">
                      <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-300">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="space-y-6">
              <Card className="border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-2xl font-semibold text-emerald-600 dark:text-emerald-300">
                    {t("featuresPage.analyticsHighlight.title")}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {t("featuresPage.analyticsHighlight.description")}
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    {Array.isArray(t("featuresPage.analyticsHighlight.metrics")) &&
                      (t("featuresPage.analyticsHighlight.metrics") as string[]).map((metric) => (
                        <li key={metric}>{metric}</li>
                      ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="border border-emerald-200/80 bg-emerald-50 shadow-lg dark:border-emerald-900/40 dark:bg-emerald-950/40">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-2xl font-semibold text-emerald-700 dark:text-emerald-200">
                    {t("featuresPage.waitlistHighlight.title")}
                  </h3>
                  <p className="text-sm leading-relaxed text-emerald-900/80 dark:text-emerald-100">
                    {t("featuresPage.waitlistHighlight.description")}
                  </p>
                  <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                    {t("featuresPage.waitlistHighlight.metric")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="mt-20 sm:mt-24 px-4 sm:px-6 lg:px-8" aria-labelledby="differentiators">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 id="differentiators" className="text-3xl font-bold">
                {t("featuresPage.differentiatorTitle")}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t("featuresPage.differentiatorDescription")}
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {Array.isArray(differentiators) &&
                differentiators.map((item: any) => (
                  <Card key={item.title} className="border border-gray-200 bg-white shadow-md dark:border-gray-800 dark:bg-gray-900">
                    <CardContent className="p-6 space-y-3">
                      <h3 className="text-xl font-semibold text-emerald-600 dark:text-emerald-300">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>

        <section className="mt-20 sm:mt-24 px-4 sm:px-6 lg:px-8" aria-labelledby="cta">
          <div className="max-w-4xl mx-auto rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-100 to-teal-100 p-8 text-center shadow-lg dark:border-emerald-900/40 dark:from-emerald-950/60 dark:to-teal-900/40">
            <h2 id="cta" className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">
              {t("featuresPage.finalCtaTitle")}
            </h2>
            <p className="mt-4 text-lg text-emerald-900/80 dark:text-emerald-100/80">
              {t("featuresPage.finalCtaDescription")}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
              <Button className="brand-gradient text-white px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition" asChild>
                <a href={localize("/contact")}>
                  {t("featuresPage.finalPrimaryCta")}
                </a>
              </Button>
              <Button variant="ghost" className="px-8 py-3 text-base font-semibold text-emerald-700 hover:text-emerald-900 dark:text-emerald-200 dark:hover:text-emerald-100" asChild>
                <a href={localize("/blog")}>{t("featuresPage.finalSecondaryCta")}</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}