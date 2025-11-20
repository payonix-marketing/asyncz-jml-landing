import {useEffect, useMemo, useState} from "react";
import { Header } from "src/components/layout/header";
import { Footer } from "src/components/layout/footer";
import {Language, useLanguage} from "src/context/LanguageContext";
import { Seo } from "src/components/Seo";
import { organizationSchema } from "src/config/schema";
import {getLegalPolicy} from "../api/api";
import {LegalAgreementType} from "../types";

export default function PrivacyPolicy() {
  const { t, language } = useLanguage();
  const [policy, setPolicy] = useState<string>("");
  const [policyCreatedAt, setPolicyCreatedAt] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // Safe helpers
  const ts = (key: string): string => {
    const v = t(key);
    return typeof v === "string" ? v : "";
  };

  // Fetch terms content from API
  useEffect(() => {
    const fetchTermsContent = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getLegalPolicy(
            LegalAgreementType.PRIVACY_POLICY,
            language as Language
        );

        setPolicy(response.content || "");
        setPolicyCreatedAt(response.createdAt || "");
      } catch (err) {
        console.error("Error fetching terms content:", err);
        setError("Failed to load terms content");
      } finally {
        setLoading(false);
      }
    };

    fetchTermsContent();
  }, [t]);


  const seoConfig = useMemo(
    () => ({
      title: ts("privacyPolicy.pageTitle"),
      description: ts("privacyPolicy.metaDescription"),
      path: "/privacy-policy",
      keywords: [
        "asyncz privacy",
        "asyncz gdpr",
        "asyncz compliance"
      ],
      structuredData: organizationSchema
    }),
    [t]
  );

  if (loading) {
    return (
        <div className="min-h-screen dark:text-gray-300">
          <Header />
          <main>
            <section className="py-16 bg-white dark:bg-gray-900">
              <div className="max-w-4xl mx-auto px-4 pt-16 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </div>
    );
  }

  return (
      <div className="min-h-screen dark:text-gray-300">
        <Seo {...seoConfig} />
        <Header />

        <main>
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 pt-16 sm:px-6 lg:px-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                {ts("privacyPolicy.title")}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                  {ts("privacyPolicy.lastUpdated") + policyCreatedAt}
              </p>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div
                    style={{
                      lineHeight: '1.6',
                      fontSize: '16px',
                      whiteSpace: 'pre-line'
                    }}
                >
                  {policy}
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
  );
}