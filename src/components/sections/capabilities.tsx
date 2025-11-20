import { CheckCircle } from "lucide-react";
import { useLanguage } from "src/context/LanguageContext";
export function Capabilities() {
  const { t } = useLanguage();

  const capabilities = [
    {
      title: t("capabilities.smartCalendar.title"),
      description: t("capabilities.smartCalendar.description"),
      features: t("capabilities.smartCalendar.features"),
      image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&h=720&q=80&fm=webp",
      imagePosition: "left"
    },
    {
      title: t("capabilities.analytics.title"),
      description: t("capabilities.analytics.description"),
      features: t("capabilities.analytics.features"),
      image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&h=720&q=80&fm=webp",
      imagePosition: "right"
    },
    {
      title: t("capabilities.collaboration.title"),
      description: t("capabilities.collaboration.description"),
      features: t("capabilities.collaboration.features"),
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=600",
      imagePosition: "left"
    }
  ];

  return (
      <section id="about" className="py-20 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t("capabilities.sectionTitlePart1")}{" "}
              <span className="bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent">
    {t("capabilities.sectionTitlePart2")}
  </span>
            </h2>


            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t("capabilities.sectionDescription")}
            </p>
          </div>

          {capabilities.map((capability, index) => (
              <div
                  key={index}
                  className={`grid dark:text-gray-300 lg:grid-cols-2 gap-16 items-center mb-16 ${
                      index % 2 === 1 ? "lg:gap-16" : ""
                  }`}
              >
                <div className={capability.imagePosition === "right" ? "lg:order-2" : ""}>
                  <img
                      src={capability.image}
                      alt={`${capability.title} preview`}
                      loading="lazy"
                      width={index === 2 ? 1000 : 1200}
                      height={index === 2 ? 600 : 720}
                      className="rounded-2xl shadow-2xl w-full object-cover"
                  />
                </div>
                <div className={capability.imagePosition === "right" ? "lg:order-1" : ""}>
                  <h3 className="text-3xl font-bold mb-6">{capability.title}</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    {capability.description}
                  </p>
                  <div className="space-y-4">
                    {Array.isArray(capability.features)
                        ? capability.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center">
                              <CheckCircle className="text-green-500 h-5 w-5 mr-3" />
                              <span>{feature}</span>
                            </div>
                        ))
                        : null}
                  </div>
                </div>
              </div>
          ))}
        </div>
      </section>
  );
}