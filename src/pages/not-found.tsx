import { useMemo } from "react";
import { ArrowLeft, Compass, Home, LifeBuoy } from "lucide-react";
import { Header } from "src/components/layout/header";
import { Footer } from "src/components/layout/footer";
import { Button } from "src/components/ui/button";
import { Card, CardContent } from "src/components/ui/card";
import { useLanguage, getLocalizedPath } from "src/context/LanguageContext";
import { useSeo } from "src/hooks/useSeo";

export default function NotFound() {
  const { t, language } = useLanguage();

  const seoConfig = useMemo(
    () => ({
      title: "asyncz | Page Not Found",
      description:
        "The page you were looking for could not be found. Explore asyncz features, pricing, or contact our team for support.",
      path: "/404",
      noindex: true,
      keywords: ["asyncz 404", "asyncz support", "page not found"]
    }),
    []
  );

  useSeo(seoConfig);

  const navigationLinks = [
    {
      icon: Home,
      label: t("navigation.home"),
      href: getLocalizedPath(language, "/")
    },
    {
      icon: Compass,
      label: t("navigation.features"),
      href: getLocalizedPath(language, "/features")
    },
    {
      icon: LifeBuoy,
      label: t("navigation.contact"),
      href: getLocalizedPath(language, "/contact")
    }
  ];

  const linkDescriptionTemplate = t("notFound.linkDescription");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-5xl w-full space-y-12">
          <div className="text-center space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-700 px-4 py-1 text-sm font-semibold dark:bg-emerald-900/40 dark:text-emerald-200">
              {t("notFound.tagline")}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              {t("notFound.title")}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t("notFound.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                className="brand-gradient text-white px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition"
              >
                <a href={getLocalizedPath(language, "/")}>
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  {t("notFound.primaryCta")}
                </a>
              </Button>
              <Button
                variant="outline"
                className="px-8 py-3 text-base font-semibold border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-300 dark:border-emerald-400 dark:hover:bg-emerald-900/30"
                asChild
              >
                <a href={getLocalizedPath(language, "/contact")}>
                  {t("notFound.secondaryCta")}
                </a>
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {navigationLinks.map(({ icon: Icon, label, href }) => {
              const description =
                typeof linkDescriptionTemplate === "string"
                  ? linkDescriptionTemplate.replace("{section}", label as string)
                  : label;
              return (
                <Card key={label} className="border border-gray-200 dark:border-gray-800 hover:border-emerald-400 transition">
                  <CardContent className="p-6 space-y-4">
                    <Icon className="h-8 w-8 text-emerald-500" aria-hidden="true" />
                    <h2 className="text-xl font-semibold">{label}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
                    <a
                      href={href}
                      className="inline-flex items-center text-emerald-600 dark:text-emerald-300 font-medium"
                    >
                      {t("notFound.explore")}
                      <ArrowLeft className="ml-2 h-4 w-4 rotate-180" aria-hidden="true" />
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
