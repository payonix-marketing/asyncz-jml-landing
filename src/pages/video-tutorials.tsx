import { useMemo, useState } from "react";
import { Header } from "src/components/layout/header";
import { Footer } from "src/components/layout/footer";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import {
  Search,
  Play,
  Clock,
  Users,
  Settings,
  Calendar,
  TrendingUp,
  Shield,
  Smartphone,
  Globe,
  Filter,
  Star
} from "lucide-react";
import { useLanguage } from "src/context/LanguageContext";
import { Seo } from "src/components/Seo";
import { productSchema } from "src/config/schema";

export default function VideoTutorials() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const seoConfig = useMemo(
    () => ({
      title: t("videoTutorials.pageTitle"),
      description: t("videoTutorials.metaDescription"),
      path: "/video-tutorials",
      keywords: [
        "asyncz tutorials",
        "asyncz walkthrough",
        "asyncz training"
      ],
      structuredData: productSchema
    }),
    [t]
  );

  // Helper function to get array items
  const getArrayItems = (key: string): any[] => {
    const result = t(key);
    return Array.isArray(result) ? result : [];
  };

  // Pre-extract arrays
  const categories = getArrayItems("videoTutorials.categories");
  const difficulties = getArrayItems("videoTutorials.difficulties");
  const videos = getArrayItems("videoTutorials.videos");
  const upcomingTutorials = getArrayItems("videoTutorials.comingSoon.upcomingList");

  const filteredVideos = videos.filter((video: any) => {
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || video.difficulty === selectedDifficulty;
    const matchesSearch = searchQuery === "" ||
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const featuredVideos = videos.filter((video: any) => video.featured);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Play,
      Users,
      Calendar,
      Globe,
      TrendingUp,
      Shield,
      Smartphone
    };
    return icons[iconName] || Play;
  };

  return (
      <div className="min-h-screen dark:text-gray-300">
        <Seo {...seoConfig} />
        <Header />

        <main>
          {/* Hero Section */}
          <section className="py-16 hero-gradient">
            <div className="max-w-6xl mx-auto px-4 pt-16 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                {t("videoTutorials.heroTitle")}{" "}
                <span className="bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent">
                {t("videoTutorials.heroTitleHighlight")}
              </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                {t("videoTutorials.heroDescription")}
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto mb-8">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                    type="text"
                    placeholder={t("videoTutorials.searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-4 text-lg rounded-lg border border-gray-300 dark:border-gray-600 w-full"
                />
              </div>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{videos.length}</div>
                  <div className="text-gray-600 dark:text-gray-300">{t("videoTutorials.stats.videoTutorials")}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{t("videoTutorials.stats.hoursContentValue")}</div>
                  <div className="text-gray-600 dark:text-gray-300">{t("videoTutorials.stats.hoursContent")}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{t("videoTutorials.stats.avgRatingValue")}</div>
                  <div className="text-gray-600 dark:text-gray-300">{t("videoTutorials.stats.avgRating")}</div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Videos */}
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-12">{t("videoTutorials.featuredTitle")}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredVideos.map((video: any, index: number) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer group">
                      <div className="relative">
                        <img
                            src={video.thumbnail}
                            alt={video.title}
                            loading="lazy"
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="h-12 w-12 text-white" />
                        </div>
                        <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                          {video.duration}
                        </div>
                        <div className="absolute top-3 left-3 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                          <Star className="h-3 w-3 inline mr-1" />
                          {t("videoTutorials.featuredLabel")}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(video.difficulty)}`}>
                        {t(`videoTutorials.difficulties.${video.difficulty}`)}
                      </span>
                          <div className="ml-auto flex items-center text-gray-500 text-sm">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            {video.rating}
                          </div>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{video.description}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{video.views} {t("videoTutorials.viewsText")}</span>
                          <span>{video.duration}</span>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* Filters & All Videos */}
          <section className="py-16 section-alt">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-12">{t("videoTutorials.allTutorialsTitle")}</h2>

              {/* Filters */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">{t("videoTutorials.filterBy")}:</span>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="mb-4">
                  <h3 className="font-medium mb-3">{t("videoTutorials.categoryFilter")}</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category: any, index: number) => {
                      const IconComponent = getIconComponent(category.icon);
                      return (
                          <button
                              key={index}
                              onClick={() => setSelectedCategory(category.id)}
                              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                                  selectedCategory === category.id
                                      ? "bg-green-500 text-white"
                                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                              }`}
                          >
                            <IconComponent className="h-4 w-4 mr-2" />
                            {category.name}
                          </button>
                      );
                    })}
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">{t("videoTutorials.difficultyFilter")}</h3>
                  <div className="flex flex-wrap gap-2">
                    {difficulties.map((difficulty: any, index: number) => (
                        <button
                            key={index}
                            onClick={() => setSelectedDifficulty(difficulty.id)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                selectedDifficulty === difficulty.id
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                            }`}
                        >
                          {difficulty.name}
                        </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Video Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVideos.map((video: any, index: number) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer group">
                      <div className="relative">
                        <img
                            src={video.thumbnail}
                            alt={video.title}
                            loading="lazy"
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="h-12 w-12 text-white" />
                        </div>
                        <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                          {video.duration}
                        </div>
                        {video.featured && (
                            <div className="absolute top-3 left-3 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                              {t("videoTutorials.featuredLabel")}
                            </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(video.difficulty)}`}>
                        {t(`videoTutorials.difficulties.${video.difficulty}`)}
                      </span>
                          <div className="ml-auto flex items-center text-gray-500 text-sm">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            {video.rating}
                          </div>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{video.description}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{video.views} {t("videoTutorials.viewsText")}</span>
                          <span>{video.duration}</span>
                        </div>
                      </div>
                    </div>
                ))}
              </div>

              {filteredVideos.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                      {t("videoTutorials.noVideosFound")}
                    </p>
                    <Button
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory("all");
                          setSelectedDifficulty("all");
                        }}
                        variant="outline"
                    >
                      {t("videoTutorials.clearFilters")}
                    </Button>
                  </div>
              )}
            </div>
          </section>

          {/* Coming Soon */}
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-6">{t("videoTutorials.comingSoon.title")}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t("videoTutorials.comingSoon.description")}
              </p>

              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl max-w-md mx-auto">
                <h3 className="font-semibold mb-4">{t("videoTutorials.comingSoon.upcomingTitle")}</h3>
                <ul className="text-left text-gray-600 dark:text-gray-300 space-y-2">
                  {upcomingTutorials.map((tutorial: string, index: number) => (
                      <li key={index}>• {tutorial}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 section-alt">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-6">{t("videoTutorials.cta.title")}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t("videoTutorials.cta.description")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                    href="https://app.asyncz.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  <Button className="brand-gradient text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 w-full sm:w-auto">
                    {t("videoTutorials.cta.startTrialButton")}
                  </Button>
                </a>
                <Button
                    variant="outline"
                    className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg font-semibold hover:border-green-500 hover:text-green-500 transition-all w-full sm:w-auto"
                >
                  {t("videoTutorials.cta.helpCenterButton")}
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
  );
}