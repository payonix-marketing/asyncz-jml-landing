import { useLanguage } from "src/context/LanguageContext";
import deviofy from "src/assets/img/partners/deviofy.png";
import epiclaunchx from "src/assets/img/partners/EpicLaunchX.svg";
import zahnarztmustafayev from "src/assets/img/partners/zahnarztmustafayev.png";
import orkhanbarini from "src/assets/img/partners/orkhanbarini.png";
import myweeshy from "src/assets/img/partners/MyWeeshy.png";
import surprisetable from "src/assets/img/partners/Surprisetable.png";
import eventeam from "src/assets/img/partners/eventeam.png";
import mealper from "src/assets/img/partners/mealper.svg";
import vexvon from "src/assets/img/partners/Vexvon.png";

export function TrustedBy() {
  const { t } = useLanguage();

  const companies = [
    { name: "Deviofy", logo: deviofy, website: "https://deviofy.com" },
    { name: "Zahnarzt-mustafayev.de", logo: zahnarztmustafayev, website: "https://zahnarzt-mustafayev.de" },
    // { name: "EpicLaunchX", logo: epiclaunchx, website: "https://beta.epiclaunchx.io/" },
    { name: "Orkhanbarini.com", logo: orkhanbarini, website: "https://orkhanbarini.com/" },
    // { name: "Mealper", logo: mealper, website: "https://mealper.com/" },
    { name: "Myweeshy", logo: myweeshy, website: "https://myweeshy.com/" },
    { name: "Vexvon", logo: vexvon, website: "https://vexvon.com/" },
    { name: "Eventeam", logo: eventeam, website: "https://eventeam.az/" },
    { name: "Surprisetable", logo: surprisetable, website: "https://surprisetable.com/" },
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
            <span className="text-green-500">{t('trustedBy.count')}</span> {t('trustedBy.subtitle')}
          </h2>
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll space-x-8">
              {duplicatedCompanies.map((company, index) => (
                  <div
                      key={`${company.name}-${index}`}
                      onClick={() => handleCompanyClick(company.website)}
                      className="bg-gray-200 dark:bg-gray-700 h-16 sm:h-20 rounded-lg flex items-center justify-center min-w-[140px] sm:min-w-[160px] opacity-60 hover:opacity-100 transition-all duration-300 flex-shrink-0 px-4 cursor-pointer hover:scale-105 hover:shadow-lg"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <img
                          src={company.logo}
                          alt={`${company.name} logo`}
                          loading="lazy"
                          className="h-6 sm:h-8 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                          onError={(e) => {
                            // Fallback to text if logo fails to load
                            e.currentTarget.style.display = 'none';
                            const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                            if (nextElement) {
                              nextElement.style.display = 'block';
                            }
                          }}
                      />
                      <span className="font-semibold text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap hidden">
                    {company.name}
                  </span>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
}
