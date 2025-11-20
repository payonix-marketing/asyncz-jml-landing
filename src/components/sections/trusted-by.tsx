import { useLanguage } from "src/context/LanguageContext";
import deviofy from "src/assets/img/partners/deviofy.webp";
import epiclaunchx from "src/assets/img/partners/EpicLaunchX.webp";
import zahnarztmustafayev from "src/assets/img/partners/zahnarztmustafayev.webp";
import orkhanbarini from "src/assets/img/partners/orkhanbarini.webp";
import myweeshy from "src/assets/img/partners/MyWeeshy.webp";
import surprisetable from "src/assets/img/partners/Surprisetable.webp";
import eventeam from "src/assets/img/partners/eventeam.webp";
import mealper from "src/assets/img/partners/mealper.webp";
import vexvon from "src/assets/img/partners/Vexvon.webp";

export function TrustedBy() {
  const { t } = useLanguage();

  const companies = [
    { name: "Deviofy", logo: deviofy, website: "https://deviofy.com", width: 120, height: 50 },
    { name: "Zahnarzt-mustafayev.de", logo: zahnarztmustafayev, website: "https://zahnarzt-mustafayev.de", width: 120, height: 64 },
    { name: "Orkhanbarini.com", logo: orkhanbarini, website: "https://orkhanbarini.com/", width: 120, height: 20 },
    { name: "Myweeshy", logo: myweeshy, website: "https://myweeshy.com/", width: 120, height: 120 },
    { name: "Vexvon", logo: vexvon, website: "https://vexvon.com/", width: 120, height: 14 },
    { name: "Eventeam", logo: eventeam, website: "https://eventeam.az/", width: 120, height: 28 },
    { name: "Surprisetable", logo: surprisetable, website: "https://surprisetable.com/", width: 120, height: 120 },
  ];

  // Create seamless loop by duplicating array
  const duplicatedCompanies = [...companies, ...companies];

  const handleCompanyClick = (website: string) => {
    window.open(website, '_blank', 'noopener,noreferrer');
  };

  return (
      <section className="py-8 sm:py-12 lg:py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white mb-8 sm:mb-10 lg:mb-12">
            {t('trustedBy.title')}{" "}
            <span className="text-green-600">{t('trustedBy.count')}</span> {t('trustedBy.subtitle')}
          </h2>
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll space-x-8">
              {duplicatedCompanies.map((company, index) => (
                  <div
                      key={`${company.name}-${index}`}
                      onClick={() => handleCompanyClick(company.website)}
                      className="bg-gray-200 dark:bg-gray-700 h-20 rounded-lg flex items-center justify-center min-w-[160px] opacity-60 hover:opacity-100 transition-all duration-300 flex-shrink-0 px-4 cursor-pointer hover:scale-105 hover:shadow-lg"
                  >
                    <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        loading="lazy"
                        width={company.width}
                        height={company.height}
                        className="h-8 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
}