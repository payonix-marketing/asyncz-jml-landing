import { Calendar, Users, TrendingUp, Shield, Mail, Globe } from "lucide-react";
import { Button } from "src/components/ui/button";
import { getLocalizedPath, useLanguage } from "src/context/LanguageContext";
import { Link } from "wouter";

export function Features() {
  const { t, language } = useLanguage();
  const features = [
    {
      icon: Calendar,
      title: t('features.smartCalendar.title'),
      description: t('features.smartCalendar.description')
    },
    {
      icon: Users,
      title: t('features.multiBranch.title'),
      description: t('features.multiBranch.description')
    },
    {
      icon: TrendingUp,
      title: t('features.analytics.title'),
      description: t('features.analytics.description')
    },
    {
      icon: Shield,
      title: t('features.blacklistProtection.title'),
      description: t('features.blacklistProtection.description')
    },
    {
      icon: Mail,
      title: t('features.customBranding.title'),
      description: t('features.customBranding.description')
    },
    {
      icon: Globe,
      title: t('features.domainIntegration.title'),
      description: t('features.domainIntegration.description')
    }
  ];

  return (
      <section id="features" className="py-12 sm:py-16 lg:py-20 section-alt">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              {t('features.title')}{" "}
              <span className="bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent">
              {t('features.titleHighlight')}
            </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
                <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 brand-gradient rounded-full flex items-center justify-center mb-4 sm:mb-6">
                    <feature.icon className="text-white h-7 w-7 sm:h-8 sm:w-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold dark:text-gray-300  mb-3 sm:mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                    {feature.description}
                  </p>
                </div>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <Link to={getLocalizedPath(language, "/pricing")}>
              <Button className="brand-gradient text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:shadow-xl transition-all transform hover:scale-105">
                {t('features.exploreAllFeatures')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
  );
}
