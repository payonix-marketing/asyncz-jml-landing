import { useMemo, useState } from "react";
import { Header } from "src/components/layout/header";
import { Footer } from "src/components/layout/footer";
import { Button } from "src/components/ui/button";
import { ChevronDown, ChevronUp, MessageCircle, Mail, Phone } from "lucide-react";
import { useLanguage } from "src/context/LanguageContext";
import { Seo, type StructuredData } from "src/components/Seo";
import { organizationSchema, generateFaqSchema } from "src/config/schema";

export default function FAQ() {
  const { t } = useLanguage();
  const [openItems, setOpenItems] = useState<number[]>([0]); // First item open by default

  // Helper function to get array items
  const getArrayItems = (key: string): any[] => {
    const result = t(key);
    return Array.isArray(result) ? result : [];
  };

  const categories = getArrayItems("faq.categories");
  const supportOptions = getArrayItems("faq.stillHaveQuestions.supportOptions");

  const seoConfig = useMemo(
    () => ({
      title: t("faq.pageTitle"),
      description: t("faq.metaDescription"),
      path: "/faq",
      keywords: [
        "asyncz faq",
        "asyncz support",
        "asyncz knowledge base"
      ],
      structuredData: [organizationSchema, generateFaqSchema(categories)].filter(Boolean) as StructuredData[],
    }),
    [t, categories]
  );

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
        prev.includes(index)
            ? prev.filter(i => i !== index)
            : [...prev, index]
    );
  };

  return (
      <div className="min-h-screen dark:text-gray-300">
        <Seo {...seoConfig} />
        <Header />

        <main>
          {/* Hero Section */}
          <section className="py-16 hero-gradient">
            <div className="max-w-4xl mx-auto px-4 pt-16 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                {t("faq.heroTitle")}{" "}
                <span className="bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent">
                {t("faq.heroTitleHighlight")}
              </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t("faq.heroDescription")}
              </p>
            </div>
          </section>

          {/* FAQ Content */}
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {categories.map((category: any, categoryIndex: number) => (
                  <div key={categoryIndex} className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                      {category.category}
                    </h2>

                    <div className="space-y-4">
                      {(category.questions || []).map((faq: any, faqIndex: number) => {
                        const globalIndex = categoryIndex * 100 + faqIndex;
                        const isOpen = openItems.includes(globalIndex);

                        return (
                            <div
                                key={faqIndex}
                                className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                            >
                              <button
                                  onClick={() => toggleItem(globalIndex)}
                                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors rounded-lg"
                              >
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                                  {faq.question}
                                </h3>
                                {isOpen ? (
                                    <ChevronUp className="text-green-500 h-5 w-5 flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="text-gray-400 h-5 w-5 flex-shrink-0" />
                                )}
                              </button>

                              {isOpen && (
                                  <div className="px-6 pb-4">
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                      {faq.answer}
                                    </p>
                                  </div>
                              )}
                            </div>
                        );
                      })}
                    </div>
                  </div>
              ))}
            </div>
          </section>

          {/* Still Have Questions Section */}
          <section className="py-16 section-alt">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-6">{t("faq.stillHaveQuestions.title")}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t("faq.stillHaveQuestions.description")}
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {supportOptions.map((option: any, index: number) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                      <div className="w-12 h-12 brand-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                        {option.icon === 'MessageCircle' && <MessageCircle className="text-white h-6 w-6" />}
                        {option.icon === 'Mail' && <Mail className="text-white h-6 w-6" />}
                        {option.icon === 'Phone' && <Phone className="text-white h-6 w-6" />}
                      </div>
                      <h3 className="font-semibold mb-2">{option.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {option.description}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {option.contact}
                      </p>
                    </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#contact">
                  <Button className="brand-gradient text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105">
                    {t("faq.stillHaveQuestions.contactSupportButton")}
                  </Button>
                </a>
                <a
                    href="https://app.asyncz.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  <Button
                      variant="outline"
                      className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-semibold hover:border-green-500 hover:text-green-500 transition-all"
                  >
                    {t("faq.stillHaveQuestions.startFreeTrialButton")}
                  </Button>
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
  );
}