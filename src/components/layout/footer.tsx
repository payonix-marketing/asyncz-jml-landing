import {Facebook, Linkedin, Instagram} from "lucide-react";
import { Link } from "wouter";
import logo from "src/assets/logo.png";
import { getLocalizedPath, useLanguage } from "src/context/LanguageContext";

export function Footer() {
  const { t, language } = useLanguage();

  const localize = (href: string) => getLocalizedPath(language, href);
  const isHttpLink = (href: string) => href.startsWith("http");

  const renderBottomLink = (href: string, label: string) => {
    const localizedHref = localize(href);
    if (localizedHref.startsWith('/')) {
      return (
          <Link to={localizedHref} className="text-gray-400 hover:text-green-500 text-sm transition-colors">
            {label}
          </Link>
      );
    }

    return (
        <a
            href={localizedHref}
            className="text-gray-400 hover:text-green-500 text-sm transition-colors"
            target={isHttpLink(localizedHref) ? "_blank" : undefined}
            rel={isHttpLink(localizedHref) ? "noopener noreferrer" : undefined}
        >
          {label}
        </a>
    );
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Helper function to get array items
  const getArrayItems = (key: string): any[] => {
    const result = t(key);
    return Array.isArray(result) ? result : [];
  };

  // Pre-extract arrays
  const footerSections = getArrayItems("footer.sections");
  const socialLinks = getArrayItems("footer.socialLinks");

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Facebook,
      Linkedin,
      Instagram
    };
    return icons[iconName] || Facebook; // Fixed: return a single default icon
  };

  const handleLinkClick = (link: any) => {
    if (link.action) {
      const actionMap: { [key: string]: () => void } = {
        scrollToFeatures: () => scrollToSection("features"),
        scrollToTestimonials: () => scrollToSection("testimonials"),
        scrollToContact: () => scrollToSection("contact")
      };
      const actionFunction = actionMap[link.action];
      if (actionFunction) {
        actionFunction();
      }
    }
  };

  return (
      <footer className="bg-gray-900 text-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <Link to={localize("/")} className="flex items-center space-x-2">
                  <img src={logo} alt={t("footer.logoAlt") ?? "asyncz logo"} className="w-[8rem]" loading="lazy" />
                  <span className="font-serif text-2xl font-bold text-primary dark:text-primary">
                </span>
                </Link>
              </div>
              <p className="text-gray-300 mb-6">
                {t("footer.companyDescription")}
              </p>

              {/* Product Hunt Badge */}
              <div className="mb-6">
                <a
                    href="https://www.producthunt.com/products/asyncz-next-gen-scheduling-for-teams?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-asyncz&#0045;next&#0045;gen&#0045;scheduling&#0045;for&#0045;teams"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block hover:opacity-80 transition-opacity"
                >
                  <img
                      src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=986395&theme=dark&t=1751484777449"
                      alt="asyncz – Next-Gen Scheduling for Teams Product Hunt badge"
                      className="w-[250px] h-[54px] max-w-full"
                      width="250"
                      height="54"
                      loading="lazy"
                  />
                </a>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social: any, index: number) => {
                  const IconComponent = getIconComponent(social.icon);
                  return (
                      <a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors"
                          aria-label={social.label}
                      >
                        <IconComponent className="h-5 w-5" />
                      </a>
                  );
                })}
                {/*There is no X icon in lucide-react, so we use a custom SVG*/}
                <a
                    href="https://x.com/asynczcom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors"
                    aria-label="X (Twitter) asyncz"
                >
                  <svg xmlns="http://www.w3.org/2000/svg"
                       shapeRendering="geometricPrecision"
                       textRendering="geometricPrecision"
                       imageRendering="optimizeQuality"
                       fillRule="evenodd"  // Changed from fill-rule to fillRule
                       clipRule="evenodd"  // Changed from clip-rule to clipRule
                       viewBox="-300 -300 1112 1062.799">
                    <path fill="white" fillRule="nonzero" d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section: any, index: number) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold mb-6">{section.title}</h3>
                  <ul className="space-y-4">
                    {section.links.map((link: any, linkIndex: number) => {
                      if (!link.href) {
                        return (
                            <li key={linkIndex}>
                              <button
                                  onClick={() => handleLinkClick(link)}
                                  className="text-gray-300 hover:text-green-500 transition-colors text-left"
                              >
                                {link.name}
                              </button>
                            </li>
                        );
                      }

                      const localizedHref = localize(link.href);
                      const isInternalLink = localizedHref.startsWith('/');

                      return (
                          <li key={linkIndex}>
                            {isInternalLink ? (
                                <Link to={localizedHref} className="text-gray-300 hover:text-green-500 transition-colors">
                                  {link.name}
                                </Link>
                            ) : (
                                <a
                                    href={localizedHref}
                                    target={isHttpLink(localizedHref) ? "_blank" : undefined}
                                    rel={isHttpLink(localizedHref) ? "noopener noreferrer" : undefined}
                                    className="text-gray-300 hover:text-green-500 transition-colors"
                                >
                                  {link.name}
                                </a>
                            )}
                          </li>
                      );
                    })}
                  </ul>
                </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                {t("footer.copyright.text")}{" "}
                <a
                    href={t("footer.copyright.deviofy.href")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary"
                >
                  {t("footer.copyright.deviofy.name")}
                </a>
                {t("footer.copyright.allRightsReserved")}
              </p>
              <div className="flex items-center space-x-6">
                {renderBottomLink(
                    t("footer.bottomLinks.privacyPolicy.href"),
                    t("footer.bottomLinks.privacyPolicy.name")
                )}
                {renderBottomLink(
                    t("footer.bottomLinks.termsOfService.href"),
                    t("footer.bottomLinks.termsOfService.name")
                )}
                {renderBottomLink(
                    t("footer.bottomLinks.cookiePolicy.href"),
                    t("footer.bottomLinks.cookiePolicy.name")
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
}
