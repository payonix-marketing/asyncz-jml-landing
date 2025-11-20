import { useState } from "react";
import { Button } from "src/components/ui/button";
import { useLanguage, type Language } from "src/context/LanguageContext";
import { ChevronDown, Globe } from "lucide-react";

const languages = [
  { code: "en" as Language, name: "English" },
  { code: "az" as Language, name: "Azərbaycan" },
  { code: "tr" as Language, name: "Türkçe" },
  { code: "de" as Language, name: "Deutsch" },
  { code: "fr" as Language, name: "Français" },
  { code: "es" as Language, name: "Español" },
  { code: "pt" as Language, name: "Português" },
  { code: "ru" as Language, name: "Русский" },
  { code: "uk" as Language, name: "Українська" },
  { code: "zh" as Language, name: "中文 (简体)" },
  { code: "ja" as Language, name: "日本語" },
  { code: "ko" as Language, name: "한국어" },
  { code: "ar" as Language, name: "العربية" },
  { code: "cs" as Language, name: "Čeština" },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
      <div className="relative">
        <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <span className="uppercase font-mono text-sm">{language}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>

        {isOpen && (
            <>
              <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-20">
                <div className="py-1">
                  {languages.map((lang) => (
                      <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 ${
                              language === lang.code
                                  ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                                  : "text-gray-700 dark:text-gray-300"
                          }`}
                      >
                        <span className="uppercase font-mono text-xs w-7">{lang.code}</span>
                        <span>{lang.name}</span>
                      </button>
                  ))}
                </div>
              </div>
            </>
        )}
      </div>
  );
}
