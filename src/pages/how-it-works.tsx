import { useMemo } from "react";
import { Header } from "src/components/layout/header";
import { Footer } from "src/components/layout/footer";
import { Button } from "src/components/ui/button";
import {
  Calendar,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Stethoscope,
  Scissors,
  Monitor,
  Building,
  User,
  MapPin
} from "lucide-react";
import { getLocalizedPath, useLanguage } from "src/context/LanguageContext";
import { Link } from "wouter";
import { useSeo } from "src/hooks/useSeo";
import { productSchema } from "src/config/schema";

export default function HowItWorks() {
  const { t, language } = useLanguage();

  const seoConfig = useMemo(
    () => ({
      title: t("howItWorks.pageTitle"),
      description: t("howItWorks.metaDescription"),
      path: "/how-it-works",
      keywords: [
        "how asyncz works",
        "asyncz automation",
        "asyncz onboarding"
      ],
      structuredData: productSchema
    }),
    [t]
  );

  useSeo(seoConfig);

  // Helper function to get array items
  const getArrayItems = (key: string): any[] => {
    const result = t(key);
    return Array.isArray(result) ? result : [];
  };

  const getIconComponent = (iconName: string) => {
    const icons = {
      User,
      Stethoscope,
      GraduationCap,
      Briefcase,
      Monitor,
      Scissors,
      Building,
      MapPin,
      Calendar,
      Users,
      Clock,
      CheckCircle,
      ArrowRight
    };
    return icons[iconName as keyof typeof icons] || User;
  };

  // Pre-extract arrays
  const processSteps = getArrayItems("howItWorks.process.steps");
  const businessTypes = getArrayItems("howItWorks.businessTypes.types");
  const calendarFeatures = getArrayItems("howItWorks.calendarFeatures.features");
  const specialFeatures = getArrayItems("howItWorks.calendarFeatures.specialFeatures.items");
  const customerJourneySteps = getArrayItems("howItWorks.customerJourney.steps");
  const eventPlanningSteps = getArrayItems("howItWorks.eventPlanning.steps");
  const concordFeatures = getArrayItems("howItWorks.eventPlanning.concordFeatures.features");
  const demoItems = getArrayItems("howItWorks.demo.whatYoullLearn.items");
  const demoDetails = getArrayItems("howItWorks.demo.details");

  return (
      <div className="min-h-screen dark:text-gray-300">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="py-16 hero-gradient">
            <div className="max-w-4xl mx-auto px-4 pt-16 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                {t("howItWorks.heroTitle")}{" "}
                <span className="bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent">
                {t("howItWorks.heroTitleHighlight")}
              </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                {t("howItWorks.heroDescription")}
              </p>
            </div>
            <div className="animate-float parallax-image flex justify-center">
              <iframe
                  className="rounded-2xl shadow-2xl w-full max-w-2xl h-64 sm:h-80 md:h-96"
                  src="https://www.youtube.com/embed/oi-RQ1oNvuo"
                  title="How asyncz works - Demo 2025: Next-Gen AI Scheduling for Modern Businesses"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
              ></iframe>
            </div>
          </section>

          {/* How It Works Process */}
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {t("howItWorks.process.title")}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  {t("howItWorks.process.subtitle")}
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {processSteps.map((step: any, index: number) => {
                  const IconComponent = getIconComponent(step.icon);
                  return (
                      <div key={index} className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                        <div className="bg-gray-50  dark:bg-gray-800 p-8 rounded-2xl">
                          <div className="flex items-center mb-6">
                            <div className="w-12 h-12 brand-gradient rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                              {step.step}
                            </div>
                            <IconComponent className="text-green-500 h-8 w-8" />
                          </div>
                          <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-6">{step.description}</p>
                          <ul className="space-y-2">
                            {(step.details || []).map((detail: string, detailIndex: number) => (
                                <li key={detailIndex} className="flex items-start">
                                  <CheckCircle className="text-green-500 h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-300">{detail}</span>
                                </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Business Types Section */}
          <section className="py-16 section-alt">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {t("howItWorks.businessTypes.title")}{" "}
                  <span className="bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent">
                  {t("howItWorks.businessTypes.titleHighlight")}
                </span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  {t("howItWorks.businessTypes.subtitle")}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {businessTypes.map((business: any, index: number) => {
                  const IconComponent = getIconComponent(business.icon);
                  return (
                      <div
                          key={index}
                          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                      >
                        <div className="w-16 h-16 brand-gradient rounded-full flex items-center justify-center mb-4">
                          <IconComponent className="text-white h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{business.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                          {business.description}
                        </p>
                        <div className="mb-4">
                          <h4 className="font-medium mb-2 text-sm">{t("howItWorks.businessTypes.keyBenefitsLabel")}:</h4>
                          <ul className="space-y-1">
                            {(business.benefits || []).slice(0, 3).map((benefit: string, benefitIndex: number) => (
                                <li key={benefitIndex} className="flex items-start text-sm">
                                  <CheckCircle className="text-green-500 h-3 w-3 mr-2 mt-1 flex-shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                                </li>
                            ))}
                          </ul>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          <strong>{t("howItWorks.businessTypes.examplesLabel")}:</strong> {business.examples}
                        </div>
                      </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Calendar Features Section */}
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {t("howItWorks.calendarFeatures.title")}{" "}
                  <span className="bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent">
                  {t("howItWorks.calendarFeatures.titleHighlight")}
                </span>{" "}
                  {t("howItWorks.calendarFeatures.titleEnd")}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  {t("howItWorks.calendarFeatures.description")}
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
                <div>
                  <h3 className="text-2xl font-bold mb-6">{t("howItWorks.calendarFeatures.controlTitle")}</h3>
                  <div className="space-y-6">
                    {calendarFeatures.map((feature: any, index: number) => (
                        <div key={index} className="flex items-start">
                          <div className="w-8 h-8 brand-gradient rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <CheckCircle className="text-white h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">{feature.title}</h4>
                            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl">
                  <h4 className="text-lg font-semibold mb-4">{t("howItWorks.calendarFeatures.specialFeatures.title")}:</h4>
                  <div className="space-y-4">
                    {specialFeatures.map((item: any, index: number) => {
                      const IconComponent = getIconComponent(item.icon);
                      return (
                          <div key={index} className="flex items-center">
                            <IconComponent className="text-green-500 h-5 w-5 mr-3" />
                            <span>{item.text}</span>
                          </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Customer Journey Section */}
          <section className="py-16 section-alt">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {t("howItWorks.customerJourney.title")}{" "}
                  <span className="bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent">
                  {t("howItWorks.customerJourney.titleHighlight")}
                </span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  {t("howItWorks.customerJourney.subtitle")}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-16">
                <div className="grid md:grid-cols-4 gap-8">
                  {customerJourneySteps.map((step: any, index: number) => (
                      <div key={index} className="text-center">
                        <div className="w-16 h-16 brand-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white font-bold text-xl">{step.step}</span>
                        </div>
                        <h3 className="font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {step.description}
                        </p>
                      </div>
                  ))}
                </div>
              </div>

              {/* Event Planning Special Process */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {t("howItWorks.eventPlanning.title")}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  {t("howItWorks.eventPlanning.subtitle")}
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
                <div className="grid md:grid-cols-4 gap-8">
                  {eventPlanningSteps.map((step: any, index: number) => (
                      <div key={index} className="text-center">
                        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white font-bold text-xl">{step.step}</span>
                        </div>
                        <h3 className="font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {step.description}
                        </p>
                      </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 inline-block">
                    <h4 className="font-semibold mb-2">{t("howItWorks.eventPlanning.concordFeatures.title")}:</h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      {concordFeatures.map((feature: string, index: number) => (
                          <div key={index} className="flex items-center">
                            <CheckCircle className="text-green-500 h-4 w-4 mr-2" />
                            <span>{feature}</span>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-6">
                {t("howItWorks.cta.title")}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t("howItWorks.cta.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                    href="https://app.asyncz.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  <Button className="brand-gradient text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-105">
                    {t("howItWorks.cta.primaryButton")}
                  </Button>
                </a>
                <Link to={getLocalizedPath(language, "/pricing")}>
                  <Button
                      variant="outline"
                      className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg font-semibold text-lg hover:border-green-500 hover:text-green-500 transition-all"
                  >
                    {t("howItWorks.cta.secondaryButton")}
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Schedule a Demo */}
          <section className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl font-bold mb-6">{t("howItWorks.demo.title")}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t("howItWorks.demo.description")}
              </p>

              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-6">{t("howItWorks.demo.whatYoullLearn.title")}</h3>
                <div className="grid md:grid-cols-2 gap-6 text-left mb-6">
                  {demoItems.map((item: any, index: number) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="text-green-500 h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">{item.title}</h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {item.description}
                          </p>
                        </div>
                      </div>
                  ))}
                </div>

                <div className="space-y-4 mb-6">
                  {demoDetails.map((detail: any, index: number) => (
                      <p key={index} className="text-gray-600 dark:text-gray-300">
                        <strong>{detail.label}:</strong> {detail.value}
                      </p>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="mailto:info@asyncz.com?subject=asyncz Demo Request&body=Hi, I'd like to schedule a demo of asyncz to see how it works for my business. Please let me know available times.">
                    <Button className="brand-gradient text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 w-full sm:w-auto">
                      {t("howItWorks.demo.bookButton")}
                    </Button>
                  </a>
                  <Link to={getLocalizedPath(language, "/video-tutorials")}>
                    <Button
                        variant="outline"
                        className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg font-semibold hover:border-green-500 hover:text-green-500 transition-all w-full sm:w-auto"
                    >
                      {t("howItWorks.demo.watchButton")}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
  );
}
