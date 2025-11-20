import {
  BUSINESS_HOURS,
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
} from "src/config/seo";
import { SUPPORTED_LANGUAGES } from "src/context/LanguageContext";

const BUSINESS_LOGO = `${SITE_URL}/favicon/icon.png`;

const formatOpeningHours = () =>
  Object.entries(BUSINESS_HOURS)
    .filter(([, hours]) => hours && hours.toLowerCase() !== "closed")
    .map(([day, hours]) => {
      const dayCode = day.slice(0, 2).toUpperCase();
      return `${dayCode} ${hours}`;
    });

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: BUSINESS_LOGO,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: CONTACT_PHONE,
      email: CONTACT_EMAIL,
      contactType: "customer service",
      areaServed: "Global",
      availableLanguage: SUPPORTED_LANGUAGES,
    },
  ],
  sameAs: SOCIAL_PROFILES,
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_NAME,
  image: BUSINESS_LOGO,
  url: SITE_URL,
  telephone: CONTACT_PHONE,
  email: CONTACT_EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT_ADDRESS.street,
    addressLocality: CONTACT_ADDRESS.city,
    addressRegion: CONTACT_ADDRESS.state,
    postalCode: CONTACT_ADDRESS.postalCode,
    addressCountry: CONTACT_ADDRESS.country,
  },
  openingHours: formatOpeningHours(),
};

export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: `${SITE_NAME} Scheduling Platform`,
  image: BUSINESS_LOGO,
  description:
    "asyncz delivers AI-powered scheduling, waitlist automation, and branch coordination for growing service teams.",
  brand: {
    "@type": "Brand",
    name: SITE_NAME,
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "0.00",
    priceValidUntil: "2026-01-01",
    availability: "https://schema.org/InStock",
  },
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Feature",
      value: "Multi-branch orchestration",
    },
    {
      "@type": "PropertyValue",
      name: "Feature",
      value: "AI waitlist and routing",
    },
    {
      "@type": "PropertyValue",
      name: "Feature",
      value: "Blacklist protection",
    },
    {
      "@type": "PropertyValue",
      name: "Feature",
      value: "Analytics and performance dashboards",
    },
  ],
};

// export const reviewSchema = {
//   "@context": "https://schema.org",
//   "@type": "AggregateRating",
//   itemReviewed: {
//     "@type": "SoftwareApplication",
//     name: SITE_NAME,
//     applicationCategory: "BusinessApplication",
//     operatingSystem: "Web"
//   },
//   ratingValue: "4.9",
//   reviewCount: "128",
//   bestRating: "5"
// };
