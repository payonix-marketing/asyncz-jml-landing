import { useState } from "react";
import { Button } from "src/components/ui/button";
import { Check } from "lucide-react";
import { getLocalizedPath, useLanguage } from "src/context/LanguageContext";
import { Link } from "wouter";

export function Pricing() {
  const { t, language } = useLanguage();
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: t("pricing.plans.free.name"),
      description: t("pricing.plans.free.description"),
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        { name: "3 Experts", included: true },
        { name: "2 Procedures", included: true },
        { name: "1 Branch", included: true },
        { name: "Basic Analytics", included: true },
        { name: "Chatbot Support", included: true },
        { name: "5 Collabriq Events/month", included: true },
      ],
      featured: false,
    },
    {
      name: t("pricing.plans.starter.name"),
      description: t("pricing.plans.starter.description"),
      monthlyPrice: 5.99,
      yearlyPrice: 4.97,
      features: [
        { name: "4 Experts", included: true },
        { name: "4 Procedures", included: true },
        { name: "1 Branch", included: true },
        { name: "Basic Analytics", included: true },
        { name: "Chatbot Support", included: true },
        { name: "Unlimited Collabriq Events", included: true },
      ],
      featured: false,
    },
    {
      name: t("pricing.plans.pro.name"),
      description: t("pricing.plans.pro.description"),
      monthlyPrice: 11.99,
      yearlyPrice: 9.95,
      features: [
        { name: "10 Experts", included: true },
        { name: "7 Procedures", included: true },
        { name: "1 Branch", included: true },
        { name: "Advanced Analytics", included: true },
        { name: "Custom Branding", included: true },
        { name: "Blacklist Protection", included: true },
        { name: "Email Support", included: true },
        { name: "10 Collabriq Events/month", included: true },
      ],
      featured: true,
    },
    {
      name: t("pricing.plans.enterprise.name"),
      description: t("pricing.plans.enterprise.description"),
      monthlyPrice: 24.99,
      yearlyPrice: 20.74,
      features: [
        { name: "Unlimited Experts", included: true },
        { name: "15 Procedures", included: true },
        { name: "3 Branches", included: true },
        { name: "Comprehensive Analytics", included: true },
        { name: "Domain Integration", included: true },
        { name: "Priority Support 24/7", included: true },
        { name: "Unlimited Collabriq Events", included: true },
      ],
      featured: false,
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Helpers: mailto builders and CTA logic
  const buildMailto = (email: string, subject: string, body: string) => {
    const s = encodeURIComponent(subject);
    const b = encodeURIComponent(body);
    return `mailto:${email}?subject=${s}&body=${b}`;
  };

  const enterpriseMailtoHref = buildMailto(
      "info@asyncz.com",
      "Enterprise Plan Inquiry",
      "Hello Asyncz Team,\n\nI have an Enterprise Plan and would like to discuss further details.\n\nBest regards,\n[Your Name]"
  );

  const studentMailtoHref = buildMailto(
      "info@asyncz.com",
      "Student Plan Inquiry",
      "Hello Asyncz Team,\n\nI am interested in the Student Plan and would like to learn more about eligibility, benefits, and pricing.\n\nBest regards,\n[Your Name]"
  );

  // Decide CTA for each plan card
  const getPlanCta = (planName: string) => {
    const isFree = planName === t("pricing.plans.free.name");
    const isEnterprise = planName === t("pricing.plans.enterprise.name");

    // Button text
    const label =
        (isEnterprise && (t as any)("pricing.startFreeTrial")) ||
        (isFree ? t("pricing.getStarted") : t("pricing.startFreeTrial"));

    // Link target
    const href = "https://app.asyncz.com/"; // default for Free/Starter/Pro

    // Variant and classes
    const isPrimary = !isFree || isEnterprise;

    return {
      label,
      href,
      variant: isPrimary ? "default" : "outline",
      className: isPrimary
          ? "brand-gradient text-white hover:shadow-lg"
          : "border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-green-500 hover:text-green-500",
    };
  };

  return (
      <section id="pricing" className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              {t("pricing.title")}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
              {t("pricing.description")}
            </p>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
              Contact:{" "}
              <a
                  href="mailto:info@asyncz.com?subject=Early Bird Special - Free Lifetime Pro Account&body=Hi,%0D%0A%0D%0AI would like to claim my free lifetime Pro account as an early adopter.%0D%0A%0D%0AThank you!"
                  className="text-green-500 hover:underline"
              >
                info@asyncz.com
              </a>
            </p>

            <div className="flex items-center justify-center mb-8 sm:mb-12">
            <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mr-2 sm:mr-3">
              {t("pricing.monthly")}
            </span>
              <button
                  onClick={() => setIsYearly(!isYearly)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                      isYearly ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
                  }`}
              >
              <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isYearly ? "translate-x-6" : "translate-x-1"
                  }`}
              />
              </button>
              <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 ml-2 sm:ml-3">
              {t("pricing.yearly")}{" "}
                <span className="text-green-500 font-semibold">{t("pricing.savePercent")}</span>
            </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {plans.map((plan, index) => {
              const cta = getPlanCta(plan.name);

              return (
                  <div
                      key={index}
                      className={`h-full flex flex-col p-4 sm:p-6 dark:text-gray-300 lg:p-8 rounded-2xl border transition-all hover:scale-105 ${
                          plan.featured
                              ? "bg-white dark:bg-gray-800 shadow-xl border-2 border-green-500 relative"
                              : "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                      }`}
                  >
                    {plan.featured && (
                        <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                    <span className="brand-gradient text-white px-4 py-1 sm:px-6 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                      {t("pricing.mostPopular")}
                    </span>
                        </div>
                    )}

                    <div className="text-center mb-6 sm:mb-8">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">{plan.name}</h3>
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                        ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                        <span className="text-sm sm:text-base lg:text-lg font-normal text-gray-600 dark:text-gray-300">
                      /month
                    </span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                        {plan.description}
                      </p>
                    </div>

                    <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                      {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <Check className="text-green-500 h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                            <span className="text-sm sm:text-base">{feature.name}</span>
                          </li>
                      ))}
                    </ul>

                    <div className="mt-auto">
                      <a href={cta.href} target="_blank" rel="noopener noreferrer">
                        <Button
                            className={`w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold transition-all transform hover:scale-105 text-sm sm:text-base ${cta.className}`}
                            variant={cta.variant as any}
                        >
                          {cta.label}
                        </Button>
                      </a>
                    </div>
                  </div>
              );
            })}
          </div>

          <div className="dark:text-gray-300 mt-16 space-y-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-50 to-orange-100 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">{t("pricing.needHelpChoosing")}</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  {t("pricing.demoDescription")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="mailto:info@asyncz.com?subject=asyncz Demo Request&body=Hi, I'd like to schedule a demo of asyncz to learn more about your pricing plans and features.">
                    <Button className="brand-gradient text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105">
                      {t("pricing.bookDemo")}
                    </Button>
                  </a>
                  <Link to={getLocalizedPath(language, "/pricing")}>
                    <Button
                        variant="outline"
                        className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg font-semibold hover:border-green-500 hover:text-green-500 transition-all"
                    >
                      {t("pricing.viewFullPricing")}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">{t("pricing.studentPlan")}</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  {t("pricing.studentDescription")}
                </p>

                {/* Student mailto CTA */}
                <a href={studentMailtoHref} target="_blank" rel="noopener noreferrer">
                  <Button className="brand-gradient text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105">
                    {(t as any)("pricingDetails.studentPlan.button") || t("pricing.contactToGetStarted")}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
