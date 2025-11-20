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
import { Seo } from "src/components/Seo";
import {
  localBusinessSchema,
  organizationSchema,
  productSchema,
  websiteSchema,
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
        websiteSchema,
      ],
    }),
    [t] 
  );

  return (
    <div className="min-h-screen dark:text-gray-300">
      <Seo {...seoConfig} />
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