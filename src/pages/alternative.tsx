import { useMemo } from "react";
import { Header } from "src/components/layout/header";
import { Footer } from "src/components/layout/footer";
import { Button } from "src/components/ui/button";
import { CheckCircle2, XCircle, Quote } from "lucide-react";
import { useLanguage, getLocalizedPath } from "src/context/LanguageContext";
import { Seo } from "src/components/Seo";
import { organizationSchema, productSchema } from "src/config/schema";
import { Card, CardContent, CardHeader, CardTitle } from "src/components/ui/card";

interface AlternativePageProps {
  params: {
    competitor: string;
  };
}

const getArray = (value: unknown): any[] => (Array.isArray(value) ? value : []);

export default function AlternativePage({ params }: AlternativePageProps) {
  const { t, language } = useLanguage();
  const { competitor } = params;

  const content = useMemo(() => {
    const key = `alternatives.${competitor}`;
    const data = t(key);
    return typeof data === 'object' && data !== null ? data : {};
  }, [t, competitor]);

  const seoConfig = useMemo(() => ({
    title: content.seo?.title ?? `${competitor} Alternative`,
    description: content.seo?.description ?? `See why asyncz is the best alternative to ${competitor}.`,
    path: `/alternative/${competitor}`,
    keywords: content.seo?.keywords ?? [],
    structuredData: [organizationSchema, productSchema],
  }), [content, competitor]);

  const comparisonFeatures = getArray(content.comparison?.features);
  const painPoints = getArray(content.painPoints);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100">
      <Seo {...seoConfig} />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 hero-gradient text-center">
          <div className="max-w-4xl mx-auto px-4 pt-16 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
              {content.hero?.title.replace('{competitor}', content.name)}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              {content.hero?.subtitle.replace('{competitor}', content.name)}
            </p>
            <Button asChild className="brand-gradient text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-105">
              <a href={getLocalizedPath(language, "/pricing")}>{content.hero?.cta}</a>
            </Button>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">{content.painPointsTitle?.replace('{competitor}', content.name)}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {painPoints.map((point: any) => (
                <Card key={point.title} className="border-red-200 bg-red-50/50 dark:border-red-900/40 dark:bg-red-950/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-red-800 dark:text-red-300">{point.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-red-700 dark:text-red-200">{point.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 section-alt">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              {content.comparison?.title.replace('{competitor}', content.name)}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="px-6 py-4 text-left font-semibold text-lg">Feature</th>
                    <th className="px-6 py-4 text-center font-semibold text-lg">{content.name}</th>
                    <th className="px-6 py-4 text-center font-semibold text-lg bg-emerald-50 dark:bg-emerald-900/20">asyncz</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature: any) => (
                    <tr key={feature.name} className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-6 py-4 font-medium">{feature.name}</td>
                      <td className="px-6 py-4 text-center">
                        {feature.competitor ? <CheckCircle2 className="h-6 w-6 text-green-500 mx-auto" /> : <XCircle className="h-6 w-6 text-red-500 mx-auto" />}
                      </td>
                      <td className="px-6 py-4 text-center bg-emerald-50/50 dark:bg-emerald-900/10">
                        {feature.asyncz ? <CheckCircle2 className="h-6 w-6 text-green-500 mx-auto" /> : <XCircle className="h-6 w-6 text-red-500 mx-auto" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Targeted Testimonial */}
        {content.testimonial && (
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <Quote className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
              <p className="text-xl italic text-gray-700 dark:text-gray-200">
                “{content.testimonial.quote}”
              </p>
              <div className="mt-6">
                <p className="font-semibold text-gray-900 dark:text-gray-100">{content.testimonial.author}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{content.testimonial.role.replace('{competitor}', content.name)}</p>
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="py-20 section-alt">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">{content.finalCta?.title}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {content.finalCta?.subtitle}
            </p>
            <Button asChild size="lg" className="brand-gradient text-white px-10 py-6 rounded-lg font-semibold text-xl hover:shadow-xl transition-all transform hover:scale-105">
              <a href={getLocalizedPath(language, "/pricing")}>{content.finalCta?.cta}</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}