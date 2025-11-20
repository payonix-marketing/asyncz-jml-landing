import { Button } from "src/components/ui/button";
import { getLocalizedPath, useLanguage } from "src/context/LanguageContext";
import { Link } from "wouter";
import { useParallax, useParallaxScale } from "src/hooks/use-parallax";
import ai from "src/assets/img/ai.png";

export function Hero() {
  const { t, language } = useLanguage();
  const aboutUsPath = getLocalizedPath(language, "/about-us");
  const featuresPath = getLocalizedPath(language, "/features");
  const textParallax = useParallax(0.3);
  const imageParallax = useParallax(0.5);
  const bgParallax = useParallax(0.1);
  const scaleParallax = useParallaxScale(1, 0.0002);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
      <section className="pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-32 lg:pb-24 hero-gradient parallax-container">
        {/* Parallax Background */}
        <div
            className="parallax-bg"
            style={{ transform: bgParallax.transform }}
            ref={bgParallax.elementRef}
        />

        {/* Floating Shapes */}
        <div className="floating-shapes">
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
        </div>

        {/* Geometric Shapes */}
        <div className="geometric-shapes">
          <div className="geometric-triangle"></div>
          <div className="geometric-square"></div>
          <div className="geometric-line"></div>
          <div className="geometric-hexagon"></div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div
                className="animate-slide-up parallax-text"
                style={{ transform: textParallax.transform }}
                ref={textParallax.elementRef}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl dark:text-gray-300 font-bold leading-tight mb-4 sm:mb-6">
                {t('hero.title')}{" "}
                <span className="relative inline-flex items-center bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent">
                  <img
                      src={ai}
                      alt="asyncz AI scheduling illustration"
                      loading="lazy"
                      className="absolute"
                      style={{
                        top: 0,
                        left: '-1.5rem',
                        height: '25.5rem',
                        width: '2.5rem',
                        zIndex: 1,
                        objectFit: 'contain'
                      }}
                  />
                {t('hero.titleHighlight')}
              </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                {t('hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {/*<a*/}
                {/*    href="https://app.asyncz.com/"*/}
                {/*    target="_blank"*/}
                {/*    rel="noopener noreferrer"*/}
                {/*    className="w-full sm:w-auto"*/}
                {/*>*/}
                {/*  <Button className="brand-gradient text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:shadow-xl transition-all transform hover:scale-105 w-full">*/}
                {/*    {t('hero.startFreeTrial')}*/}
                {/*  </Button>*/}
                {/*</a>*/}

                <a
                    href={`mailto:info@asyncz.com?subject=Claim%20My%20Lifetime%20Pro%20Access%20on%20asyncz&body=Hi%20asyncz%20team,%0A%0AI'd%20like%20to%20claim%20my%20lifetime%20Pro%20access%20as%20an%20early%20user.%20Please%20let%20me%20know%20the%20next%20steps.%0A%0AThanks!`}
                    className="w-full sm:w-auto"
                >
                  <Button className="brand-gradient text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:shadow-xl transition-all transform hover:scale-105 w-full">
                    {t('hero.startFreeTrial')}
                  </Button>
                </a>

                <Button
                    variant="outline"
                    className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:border-green-500 hover:text-green-500 transition-all w-full sm:w-auto"
                    asChild
                >
                  <Link to={featuresPath}>{t('hero.exploreFeatures')}</Link>
                </Button>
              </div>
              <div className="mt-4 sm:mt-6">
                <Link to={aboutUsPath}>
                  <Button
                      variant="ghost"
                      className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 font-medium transition-colors"
                  >
                    {t('hero.learnAboutUs')}
                  </Button>
                </Link>
              </div>
            </div>
            {/* Mockup Image with Parallax */}
            {/*<div*/}
            {/*    className="animate-float parallax-image"*/}
            {/*    style={{*/}
            {/*      transform: `${imageParallax.transform} scale(${scaleParallax.scale})`*/}
            {/*    }}*/}
            {/*    ref={imageParallax.elementRef}*/}
            {/*>*/}
            {/*  <img*/}
            {/*      src={logo}*/}
            {/*      alt="asyncz Dashboard Mockup"*/}
            {/*      className="rounded-2xl shadow-2xl w-full"*/}
            {/*  />*/}
            {/*</div>*/}

              <div
                  className="animate-float parallax-image"
                  style={{
                      transform: `${imageParallax.transform} scale(${scaleParallax.scale})`
                  }}
                  ref={imageParallax.elementRef}
              >
                  <iframe
                      className="rounded-2xl shadow-2xl w-full h-64 sm:h-80 md:h-96"
                      src="https://www.youtube.com/embed/oi-RQ1oNvuo"
                      title="How asyncz works - Demo 2025: Next-Gen AI Scheduling for Modern Businesses"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                  ></iframe>
              </div>

          </div>
        </div>
      </section>
  );
}
