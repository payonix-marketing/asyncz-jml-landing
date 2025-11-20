import { MapPin, Globe, Users } from "lucide-react";
import { Card, CardContent } from "src/components/ui/card";
import { Button } from "src/components/ui/button";
import { useLanguage, getLocalizedPath } from "src/context/LanguageContext";

const getArray = (value: unknown): any[] => (Array.isArray(value) ? value : []);

export function LocationSpotlight() {
  const { t, language } = useLanguage();
  const spotlight = t("locationSpotlight");
  const highlights = getArray(spotlight?.highlights);

  if (!spotlight || typeof spotlight !== "object") {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-gray-950" aria-labelledby="location-spotlight">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
              <Globe className="h-4 w-4" aria-hidden="true" />
              {spotlight.tagline}
            </span>
            <h2 id="location-spotlight" className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              {spotlight.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">{spotlight.description}</p>
            <Button className="brand-gradient text-white px-6 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition" asChild>
              <a href={getLocalizedPath(language, spotlight.ctaHref ?? "/contact")}>{spotlight.ctaLabel}</a>
            </Button>
          </div>

          <div className="space-y-4">
            {highlights.map((highlight: any) => (
              <Card key={highlight.title} className="border border-gray-200 bg-white shadow-md dark:border-gray-800 dark:bg-gray-900">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300">
                    {highlight.icon === "users" ? (
                      <Users className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{highlight.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{highlight.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
