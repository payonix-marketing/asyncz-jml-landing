import { useMemo } from "react";
import { useLocation } from "wouter";
import { Header } from "src/components/layout/header";
import { Hero } from "src/components/sections/hero";
import { TrustedBy } from "src/components/sections/trusted-by";
import { Features } from "src/components/sections/features";
import { Pricing } from "src/components/sections/pricing";
import { Capabilities } from "src/components/sections/capabilities";
import { Contact } from "src/components/sections/contact";
import { Footer } from "src/components/layout/footer";
import { LocationSpotlight } from "src/components/sections/location-spotlight";
import { TargetLandingPage, resolveTargetLanding } from "./target-landing";
import { useSeo } from "src/hooks/useSeo";
import {
  localBusinessSchema,
  organizationSchema,
  productSchema,
  // reviewSchema,
} from "src/config/schema";
import { useLanguage } from "src/context/LanguageContext";

function DefaultLanding() {
  const { t } = useLanguage();
  const seoConfig = useMemo(
    () => ({
      title: t("home.pageTitle"),
      description: t("home.metaDescription"),
      path: "/",
      keywords: [
        "asyncz scheduling",
        "AI booking software",
        "multi-branch scheduling",
        "waitlist automation",
        "appointment analytics",
      ],
      structuredData: [
        organizationSchema,
        localBusinessSchema,
        productSchema,
        // reviewSchema,
      ],
    }),
    [t] 
  );

  useSeo(seoConfig);

  return (
    <div className="min-h-screen dark:text-gray-300">
      <Header />
      <main>
        <Hero />
        <LocationSpotlight />
        <TrustedBy />
        <Features />
        <Pricing />
        <Capabilities />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function Home() {
  const [location] = useLocation();

  const targetLanding = useMemo(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    return resolveTargetLanding(params.get("target"));
  }, [location]);

  if (targetLanding) {
    return <TargetLandingPage {...targetLanding} />;
  }
  return <DefaultLanding />;
}