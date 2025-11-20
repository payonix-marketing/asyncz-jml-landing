import { useState, useEffect } from "react";
import { Button } from "src/components/ui/button";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { LanguageSelector } from "src/components/ui/language-selector";
import { getLocalizedPath, useLanguage } from "src/context/LanguageContext";
import logo from "../../assets/logo.webp";
import { Link } from "wouter";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t, language } = useLanguage();

  const buildPath = (path: string) => getLocalizedPath(language, path);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getAppAsynczUrl = () => {
    if (language && language !== "en") {
      return `https://app.asyncz.com/login?lang=${language}`;
    }
    return "https://app.asyncz.com/login?lang=en";
  }

  return (
      <header
          className={`fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ${
              isScrolled ? "shadow-lg" : ""
          }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <Link to={buildPath("/")} className="flex items-center space-x-2">
                <img src={logo} alt="asyncz logo" className="w-[8rem]" style={{ marginBottom: '12px' }} width="128" height="35" />
                <span className="font-serif text-2xl font-bold text-primary dark:text-primary"></span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link to={buildPath("/how-it-works")} className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors cursor-pointer whitespace-nowrap">
                {t("navigation.howItWorks")}
              </Link>
              <Link to={buildPath("/features")} className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors cursor-pointer whitespace-nowrap">
                {t("navigation.features")}
              </Link>
              <Link to={buildPath("/pricing")} className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors cursor-pointer whitespace-nowrap">
                {t("navigation.pricing")}
              </Link>
              <Link to={buildPath("/blog")} className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors cursor-pointer whitespace-nowrap">
                {t("navigation.blog")}
              </Link>
              <Link to={buildPath("/about-us")} className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors cursor-pointer whitespace-nowrap">
                {t("navigation.aboutUs")}
              </Link>
              <Link to={buildPath("/faq")} className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors cursor-pointer whitespace-nowrap">
                {t("navigation.faq")}
              </Link>
              <Link to={buildPath("/contact")} className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors cursor-pointer whitespace-nowrap">
                {t("navigation.contact")}
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              <LanguageSelector />
              <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                {theme === "dark" ? <Sun className="h-4 w-4 lg:h-5 lg:w-5" /> : <Moon className="h-4 w-4 lg:h-5 lg:w-5" />}
              </Button>
              <a href={getAppAsynczUrl()} target="_blank" rel="noopener noreferrer">
                <Button className="brand-gradient text-white px-3 py-2 lg:px-6 lg:py-2 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 text-sm lg:text-base whitespace-nowrap">
                  {t("navigation.signIn")}
                </Button>
              </a>
            </div>

            {/* Mobile menu button */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Open menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
              <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4 px-2">
                <div className="flex flex-col space-y-4">
                  <Link to={buildPath("/how-it-works")} onClick={() => setIsMenuOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors text-left">
                    {t("navigation.howItWorks")}
                  </Link>
                  <Link to={buildPath("/features")} onClick={() => setIsMenuOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors text-left">
                    {t("navigation.features")}
                  </Link>
                  <Link to={buildPath("/pricing")} onClick={() => setIsMenuOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors text-left">
                    {t("navigation.pricing")}
                  </Link>
                  <Link to={buildPath("/blog")} onClick={() => setIsMenuOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors text-left">
                    {t("navigation.blog")}
                  </Link>
                  <Link to={buildPath("/about-us")} onClick={() => setIsMenuOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors text-left">
                    {t("navigation.aboutUs")}
                  </Link>
                  <Link to={buildPath("/faq")} onClick={() => setIsMenuOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors text-left">
                    {t("navigation.faq")}
                  </Link>
                  <Link to={buildPath("/contact")} onClick={() => setIsMenuOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors text-left">
                    {t("navigation.contact")}
                  </Link>

                  {/* Mobile language selector and CTA */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{t("navigation.language")}</span>
                      <LanguageSelector />
                    </div>
                    <a
                        href="https://app.asyncz.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                    >
                      <Button className="w-full brand-gradient text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
                        {t("hero.startFreeTrial")}
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
          )}
        </div>
      </header>
  );
}