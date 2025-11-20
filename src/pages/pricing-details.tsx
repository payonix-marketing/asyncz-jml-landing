import { useMemo, useState } from "react";
import { Header } from "src/components/layout/header";
import { Footer } from "src/components/layout/footer";
import { Button } from "src/components/ui/button";
import { Check, X } from "lucide-react";
import { useLanguage } from "src/context/LanguageContext";
import { useSeo } from "src/hooks/useSeo";
import { productSchema } from "src/config/schema";

export default function PricingDetails() {
  const { t } = useLanguage();
  const [isYearly, setIsYearly] = useState(false);

  const seoConfig = useMemo(
    () => ({
      title: t("pricingDetails.pageTitle"),
      description: t("pricingDetails.metaDescription"),
      path: "/pricing",
      keywords: [
        "asyncz pricing",
        "asyncz plans",
        "asyncz cost"
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

  // Pre-extract arrays
  const plans = getArrayItems("pricingDetails.plans");
  const featureCategories = getArrayItems("pricingDetails.featureComparison.categories");
  const enterpriseFeatures = getArrayItems("pricingDetails.enterprisePlan.features");
  const enterpriseSupport = getArrayItems("pricingDetails.enterprisePlan.support");
  const demoBenefits = getArrayItems("pricingDetails.demo.benefits");
  const demoDetails = getArrayItems("pricingDetails.demo.details");

  const renderFeatureValue = (value: string | boolean | number) => {
    if (typeof value === "boolean") {
      return value ? (
          <Check className="text-green-500 h-5 w-5 mx-auto" />
      ) : (
          <X className="text-red-500 h-5 w-5 mx-auto" />
      );
    }
    return <span className="text-center">{value}</span>;
  };

  return (
      <div className="min-h-screen dark:text-gray-300">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="py-16 hero-gradient">
            <div className="max-w-7xl dark:text-gray-300 mx-auto px-4 pt-16 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                {t("pricingDetails.heroTitle")}{" "}
                <span className="bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent">
                {t("pricingDetails.heroTitleHighlight")}
              </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                {t("pricingDetails.heroDescription")}
              </p>

              {/* Pricing Toggle */}
              <div className="flex items-center justify-center mb-8">
                <span className="text-gray-700 dark:text-gray-300 mr-3">{t("pricingDetails.pricingToggle.monthly")}</span>
                <button
                    onClick={() => setIsYearly(!isYearly)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                        isYearly
                            ? "bg-green-500"
                            : "bg-gray-300 dark:bg-gray-600"
                    }`}
                >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isYearly ? "translate-x-6" : "translate-x-1"
                    }`}
                />
                </button>
                <span className="text-gray-700 dark:text-gray-300 ml-3">
                {t("pricingDetails.pricingToggle.yearly")}{" "}
                  <span className="text-green-500 font-semibold">({t("pricingDetails.pricingToggle.saveText")})</span>
              </span>
              </div>
            </div>
          </section>

          {/* Plan Overview */}
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-4 gap-8 mb-16">
                {plans.map((plan: any, index: number) => (
                    <div
                        key={index}
                        className={`p-6 rounded-2xl border transition-all ${
                            plan.featured
                                ? "bg-white dark:bg-gray-800 shadow-xl border-2 border-green-500 relative"
                                : "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                        }`}
                    >
                      {plan.featured && (
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="brand-gradient text-white px-4 py-1 rounded-full text-sm font-semibold">
                        {t("pricingDetails.mostPopular")}
                      </span>
                          </div>
                      )}

                      <div className="text-center">
                        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                        <div className="text-3xl font-bold mb-2">
                          ${isYearly ? (plan.yearlyPrice / 12).toFixed(2) : plan.monthlyPrice}
                          <span className="text-lg font-normal text-gray-600 dark:text-gray-300">
                        /{t("pricingDetails.monthText")}
                      </span>
                        </div>
                        {isYearly && plan.yearlyPrice > 0 && (
                            <p className="text-sm text-green-600 dark:text-green-400 mb-2">
                              ${plan.yearlyPrice}/{t("pricingDetails.yearText")} - {t("pricingDetails.pricingToggle.saveText")} ${((plan.monthlyPrice * 12) - plan.yearlyPrice).toFixed(2)}
                            </p>
                        )}
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{plan.description}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          {t("pricingDetails.targetText")}: {plan.target}
                        </p>
                        {plan.trial && (
                            <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">
                              {t("pricingDetails.trialText")}
                            </p>
                        )}

                        <a
                            href="https://app.asyncz.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                          <Button
                              className={`w-full py-2 px-4 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                                  plan.featured || plan.name !== "Free"
                                      ? "brand-gradient text-white hover:shadow-lg"
                                      : "border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-green-500 hover:text-green-500"
                              }`}
                              variant={plan.featured || plan.name !== "Free" ? "default" : "outline"}
                          >
                            {plan.name === "Free" ? t("pricingDetails.getStartedButton") : t("pricingDetails.startTrialButton")}
                          </Button>
                        </a>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* Feature Comparison Table */}
          <section className="py-16 section-alt">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-12">
                {t("pricingDetails.featureComparison.title")}
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">{t("pricingDetails.featureComparison.featuresHeader")}</th>
                    <th className="px-6 py-4 text-center font-semibold">Free</th>
                    <th className="px-6 py-4 text-center font-semibold">Starter</th>
                    <th className="px-6 py-4 text-center font-semibold bg-green-50 dark:bg-green-900/20">Pro</th>
                    <th className="px-6 py-4 text-center font-semibold">Premium</th>
                  </tr>
                  </thead>
                  <tbody>
                  {featureCategories.flatMap((category: any, categoryIndex: number) => [
                    <tr key={`category-${categoryIndex}`} className="bg-gray-100 dark:bg-gray-700">
                      <td colSpan={5} className="px-6 py-3 font-bold text-lg">
                        {category.category}
                      </td>
                    </tr>,
                    ...(category.features || []).map((feature: any, featureIndex: number) => (
                        <tr
                            key={`feature-${categoryIndex}-${featureIndex}`}
                            className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        >
                          <td className="px-6 py-4">{feature.name}</td>
                          <td className="px-6 py-4 text-center">
                            {renderFeatureValue(feature.free)}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {renderFeatureValue(feature.starter)}
                          </td>
                          <td className="px-6 py-4 text-center bg-green-50 dark:bg-green-900/10">
                            {renderFeatureValue(feature.pro)}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {renderFeatureValue(feature.premium)}
                          </td>
                        </tr>
                    ))
                  ])}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Student Plan */}
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">{t("pricingDetails.studentPlan.title")}</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  {t("pricingDetails.studentPlan.description")}
                </p>
                <a
                    href={`mailto:info@asyncz.com?subject=${encodeURIComponent("Student Plan Inquiry")}&body=${encodeURIComponent("Hello Asyncz Team,\n\nI am interested in the Student Plan and would like to learn more about eligibility, benefits, and pricing.\n\nBest regards,\n[Your Name]")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  <Button className="brand-gradient text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105">
                    {t("pricingDetails.studentPlan.button")}
                  </Button>
                </a>

              </div>
            </div>
          </section>

          {/* Enterprise Plan */}
          <section className="py-16 section-alt">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h3 className="text-3xl font-bold mb-6">{t("pricingDetails.enterprisePlan.title")}</h3>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t("pricingDetails.enterprisePlan.subtitle")}
              </p>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                  <h4 className="font-semibold mb-4">{t("pricingDetails.enterprisePlan.featuresTitle")}:</h4>
                  <ul className="space-y-2 text-left">
                    {enterpriseFeatures.map((feature: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <Check className="text-green-500 h-4 w-4 mr-2" />
                          {feature}
                        </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                  <h4 className="font-semibold mb-4">{t("pricingDetails.enterprisePlan.supportTitle")}:</h4>
                  <ul className="space-y-2 text-left">
                    {enterpriseSupport.map((item: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <Check className="text-green-500 h-4 w-4 mr-2" />
                          {item}
                        </li>
                    ))}
                  </ul>
                </div>
              </div>
              <a
                  href={`mailto:info@asyncz.com?subject=${encodeURIComponent("Enterprise Plan Inquiry")}&body=${encodeURIComponent("Hello Asyncz Team,\n\nI have an Enterprise Plan and would like to discuss further details.\n\nBest regards,\n[Your Name]")}`}
                  target="_blank"
                  rel="noopener noreferrer"
              >
                <Button className="brand-gradient text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105">
                  {t("pricingDetails.enterprisePlan.button")}
                </Button>
              </a>

            </div>
          </section>

          {/* Schedule a Demo */}
          <section className="py-20 section-alt">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl font-bold mb-6">{t("pricingDetails.demo.title")}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t("pricingDetails.demo.description")}
              </p>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-6">{t("pricingDetails.demo.scheduleTitle")}</h3>
                <div className="grid md:grid-cols-2 gap-6 text-left mb-6">
                  {demoBenefits.map((benefit: any, index: number) => (
                      <div key={index} className="flex items-start">
                        <Check className="text-green-500 h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">{benefit.title}</h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {benefit.description}
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
                  <a href="mailto:info@asyncz.com?subject=Schedule asyncz Demo&body=Hi, I'd like to schedule a demo of asyncz. Please let me know your available times.">
                    <Button className="brand-gradient text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 w-full sm:w-auto">
                      {t("pricingDetails.demo.scheduleButton")}
                    </Button>
                  </a>
                  <a href="mailto:info@asyncz.com?subject=asyncz Pricing Inquiry">
                    <Button
                        variant="outline"
                        className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg font-semibold hover:border-green-500 hover:text-green-500 transition-all w-full sm:w-auto"
                    >
                      {t("pricingDetails.demo.contactButton")}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
  );
}
