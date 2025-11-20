import { useMemo, useState } from "react";
import { Header } from "src/components/layout/header";
import { Footer } from "src/components/layout/footer";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import {
  Search,
  Book,
  Users,
  Settings,
  CreditCard,
  Shield,
  MessageCircle,
  ChevronRight,
  ExternalLink,
  Download,
  Video,
  FileText
} from "lucide-react";
import { getLocalizedPath, useLanguage } from "src/context/LanguageContext";
import { Link } from "wouter";
import { Seo } from "src/components/Seo";
import { organizationSchema } from "src/config/schema";

export default function HelpCenter() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const seoConfig = useMemo(
    () => ({
      title: t("helpCenter.pageTitle"),
      description: t("helpCenter.metaDescription"),
      path: "/help-center",
      keywords: [
        "asyncz help center",
        "asyncz documentation",
        "asyncz support"
      ],
      structuredData: organizationSchema
    }),
    [t]
  );

  // Helper function to get array items
  const getArrayItems = (key: string): any[] => {
    const result = t(key);
    return Array.isArray(result) ? result : [];
  };

  const getIconComponent = (iconName: string) => {
    const icons = {
      Book,
      Users,
      Settings,
      CreditCard,
      Shield,
      ExternalLink,
      MessageCircle,
      Video,
      Download,
      FileText
    };
    return icons[iconName as keyof typeof icons] || Book;
  };

  const articles = getArrayItems("helpCenter.articles");
  const quickActions = getArrayItems("helpCenter.quickActions.actions");
  const categories = getArrayItems("helpCenter.browseByCategory.categories");
  const supportOptions = getArrayItems("helpCenter.contactSupport.supportOptions");

  const filteredArticles = articles.filter((article: any) => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch = searchQuery === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularArticles = articles.filter((article: any) => article.popular);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return Video;
      case "tutorial": return Book;
      case "technical": return Settings;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "tutorial": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "technical": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
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
                {t("helpCenter.heroTitle")}{" "}
                <span className="bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent">
                {t("helpCenter.heroTitleHighlight")}
              </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t("helpCenter.heroDescription")}
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                    type="text"
                    placeholder={t("helpCenter.searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-4 text-lg rounded-lg border border-gray-300 dark:border-gray-600 w-full"
                />
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-center mb-12">{t("helpCenter.quickActions.title")}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickActions.map((action: any, index: number) => {
                  const IconComponent = getIconComponent(action.icon);
                  return (
                      <a
                          key={index}
                          href={action.action}
                          className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl hover:shadow-lg transition-all transform hover:scale-105"
                      >
                        <div className="w-12 h-12 brand-gradient rounded-full flex items-center justify-center mb-4">
                          <IconComponent className="text-white h-6 w-6" />
                        </div>
                        <h3 className="font-semibold mb-2">{action.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{action.description}</p>
                      </a>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Popular Articles */}
          <section className="py-16 section-alt">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-center mb-12">{t("helpCenter.popularArticles.title")}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {popularArticles.slice(0, 6).map((article: any, index: number) => {
                  const TypeIcon = getTypeIcon(article.type);
                  return (
                      <div
                          key={index}
                          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(article.type)}`}>
                        <TypeIcon className="inline h-3 w-3 mr-1" />
                        {article.type}
                      </span>
                          <span className="text-gray-500 text-sm">{article.readTime}</span>
                        </div>
                        <h3 className="font-semibold mb-2">{article.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{article.description}</p>
                        <div className="flex items-center text-green-500 text-sm font-medium">
                          {t("helpCenter.popularArticles.readArticle")} <ChevronRight className="h-4 w-4 ml-1" />
                        </div>
                      </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Browse by Category */}
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-center mb-12">{t("helpCenter.browseByCategory.title")}</h2>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((category: any) => {
                  const IconComponent = getIconComponent(category.icon);
                  return (
                      <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                              selectedCategory === category.id
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                      >
                        <IconComponent className="h-5 w-5 mr-2" />
                        {category.name}
                      </button>
                  );
                })}
              </div>

              {/* Articles List */}
              <div className="space-y-4">
                {filteredArticles.map((article: any, index: number) => {
                  const TypeIcon = getTypeIcon(article.type);
                  return (
                      <div
                          key={index}
                          className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl hover:shadow-lg transition-all cursor-pointer"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium mr-3 ${getTypeColor(article.type)}`}>
                            <TypeIcon className="inline h-3 w-3 mr-1" />
                            {article.type}
                          </span>
                              <span className="text-gray-500 text-sm">{article.readTime}</span>
                              {article.popular && (
                                  <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 text-xs rounded-full">
                              {t("helpCenter.browseByCategory.popularLabel")}
                            </span>
                              )}
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{article.description}</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400 ml-4 flex-shrink-0" />
                        </div>
                      </div>
                  );
                })}
              </div>

              {filteredArticles.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                      {t("helpCenter.browseByCategory.noArticlesFound")}
                    </p>
                    <Button
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory("all");
                        }}
                        variant="outline"
                        className="mt-4"
                    >
                      {t("helpCenter.browseByCategory.clearFilters")}
                    </Button>
                  </div>
              )}
            </div>
          </section>

          {/* About asyncz */}
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-6">{t("helpCenter.aboutAsyncz.title")}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t("helpCenter.aboutAsyncz.description")}
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl max-w-md mx-auto">
                <p><strong>{t("helpCenter.aboutAsyncz.product.label")}:</strong> {t("helpCenter.aboutAsyncz.product.value")}</p>
                <p><strong>{t("helpCenter.aboutAsyncz.developer.label")}:</strong> {t("helpCenter.aboutAsyncz.developer.value")}</p>
                <p><strong>{t("helpCenter.aboutAsyncz.location.label")}:</strong> {t("helpCenter.aboutAsyncz.location.value")}</p>
              </div>
            </div>
          </section>

          {/* Contact Support */}
          <section className="py-16 section-alt">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-6">{t("helpCenter.contactSupport.title")}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t("helpCenter.contactSupport.description")}
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {supportOptions.map((option: any, index: number) => {
                  const IconComponent = getIconComponent(option.icon);
                  return (
                      <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                        <IconComponent className={`w-12 h-12 ${option.iconColor} mx-auto mb-4`} />
                        <h3 className="font-semibold mb-2">{option.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                          {option.description}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {option.availability}
                        </p>
                      </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:info@asyncz.com">
                  <Button className="brand-gradient text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105">
                    {t("helpCenter.contactSupport.contactSupportButton")}
                  </Button>
                </a>
                <Link to={getLocalizedPath(language, "/faq")}>
                  <Button
                      variant="outline"
                      className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-semibold hover:border-green-500 hover:text-green-500 transition-all"
                  >
                    {t("helpCenter.contactSupport.browseFaqButton")}
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
  );
}