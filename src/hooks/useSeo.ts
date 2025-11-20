import { useEffect } from "react";
import { useLocation } from "wouter";
import {
  DEFAULT_SOCIAL_IMAGE,
  SITE_NAME,
  SITE_URL
} from "src/config/seo";
import {
  SUPPORTED_LANGUAGES,
  getLocalizedPath,
  type Language
} from "src/context/LanguageContext";

export interface StructuredData {
  [key: string]: unknown;
}

export interface UseSeoOptions {
  title: string;
  description: string;
  path?: string;
  canonicalUrl?: string;
  type?: "website" | "article" | "product" | "profile" | string;
  image?: string;
  keywords?: string[];
  noindex?: boolean;
  structuredData?: StructuredData | StructuredData[];
}

const HEAD = () => document.querySelector("head");

const ensureMetaTag = (selector: string, create: () => HTMLElement) => {
  const existing = document.querySelector(selector);
  if (existing) {
    return existing as HTMLElement;
  }
  const element = create();
  HEAD()?.appendChild(element);
  return element;
};

const normaliseUrl = (urlOrPath: string) => {
  if (!urlOrPath) {
    return SITE_URL;
  }

  if (/^https?:/i.test(urlOrPath)) {
    return urlOrPath;
  }

  const path = urlOrPath.startsWith("/") ? urlOrPath : `/${urlOrPath}`;
  return `${SITE_URL}${path}`;
};

const stripLanguageFromPath = (target: string) => {
  const normalizedPath = target.startsWith("/") ? target : `/${target}`;
  const segments = normalizedPath.split("/").filter(Boolean);

  if (segments.length === 0) {
    return "/";
  }

  const [maybeLang, ...rest] = segments;
  if (SUPPORTED_LANGUAGES.includes(maybeLang as Language)) {
    return rest.length > 0 ? `/${rest.join("/")}` : "/";
  }

  return normalizedPath;
};

const getCurrentLanguage = (path: string): Language => {
  const segments = path.split("/").filter(Boolean);
  if (segments.length === 0) {
    return SUPPORTED_LANGUAGES[0] as Language;
  }
  
  const maybeLang = segments[0];
  if (SUPPORTED_LANGUAGES.includes(maybeLang as Language)) {
    return maybeLang as Language;
  }
  
  return SUPPORTED_LANGUAGES[0] as Language;
};

const updateAlternateLinks = (path: string | undefined) => {
  document
    .querySelectorAll('link[rel="alternate"][data-managed="asyncz"]')
    .forEach((node) => node.remove());

  const rawPath = path ?? window.location.pathname;
  const cleanPath = stripLanguageFromPath(rawPath);
  const currentLang = getCurrentLanguage(rawPath);

  SUPPORTED_LANGUAGES.forEach((lang) => {
    const href = normaliseUrl(getLocalizedPath(lang, cleanPath));
    const link = document.createElement("link");
    link.setAttribute("rel", "alternate");
    link.setAttribute("hreflang", lang);
    link.setAttribute("href", href);
    link.setAttribute("data-managed", "asyncz");
    HEAD()?.appendChild(link);
  });

  const defaultHref = normaliseUrl(
    getLocalizedPath(SUPPORTED_LANGUAGES[0] as Language, cleanPath)
  );
  const xDefault = document.createElement("link");
  xDefault.setAttribute("rel", "alternate");
  xDefault.setAttribute("hreflang", "x-default");
  xDefault.setAttribute("href", defaultHref);
  xDefault.setAttribute("data-managed", "asyncz");
  HEAD()?.appendChild(xDefault);
};

const updateStructuredData = (structuredData?: StructuredData | StructuredData[]) => {
  document
    .querySelectorAll('script[type="application/ld+json"][data-managed="asyncz"]')
    .forEach((node) => node.remove());

  if (!structuredData) {
    return;
  }

  const data = Array.isArray(structuredData) ? structuredData : [structuredData];
  data
    .filter((schema) => schema && Object.keys(schema).length > 0)
    .forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-managed", "asyncz");
      script.text = JSON.stringify(schema, null, 0);
      HEAD()?.appendChild(script);
    });
};

const updateCanonical = (canonicalUrl: string) => {
  document
    .querySelectorAll('link[rel="canonical"][data-managed="asyncz"]')
    .forEach((node) => node.remove());

  const link = document.createElement("link");
  link.setAttribute("rel", "canonical");
  link.setAttribute("href", canonicalUrl);
  link.setAttribute("data-managed", "asyncz");
  HEAD()?.appendChild(link);
};

const setMetaContent = (selector: string, content: string) => {
  if (!content) {
    return;
  }
  const element = ensureMetaTag(selector, () => {
    const meta = document.createElement("meta");
    const matches = selector.match(/([a-z-]+)="([^"]+)"/i);
    if (matches) {
      meta.setAttribute(matches[1], matches[2]);
    }
    return meta;
  });
  element.setAttribute("content", content);
};

const applySeoMetadata = ({
  title,
  description,
  path,
  canonicalUrl,
  type = "website",
  image,
  keywords,
  noindex,
  structuredData
}: UseSeoOptions) => {
  if (typeof document === "undefined") {
    return;
  }

  document.title = title;

  setMetaContent('meta[name="description"]', description);
  setMetaContent('meta[name="robots"]', noindex ? "noindex, nofollow" : "index, follow");

  const canonical = normaliseUrl(canonicalUrl ?? window.location.pathname);
  updateCanonical(canonical);
  updateAlternateLinks(path ?? window.location.pathname);

  const ogImage = image ? normaliseUrl(image) : DEFAULT_SOCIAL_IMAGE;
  setMetaContent('meta[property="og:title"]', title);
  setMetaContent('meta[property="og:description"]', description);
  setMetaContent('meta[property="og:type"]', type);
  setMetaContent('meta[property="og:url"]', canonical);
  setMetaContent('meta[property="og:site_name"]', SITE_NAME);
  setMetaContent('meta[property="og:image"]', ogImage);

  setMetaContent('meta[name="twitter:card"]', "summary_large_image");
  setMetaContent('meta[name="twitter:title"]', title);
  setMetaContent('meta[name="twitter:description"]', description);
  setMetaContent('meta[name="twitter:image"]', ogImage);

  if (keywords && keywords.length > 0) {
    setMetaContent('meta[name="keywords"]', keywords.join(", "));
  }

  updateStructuredData(structuredData);
};

export const useSeo = (options: UseSeoOptions) => {
  const [location] = useLocation();
  const language = options.path?.split('/')[1] || 'en';

  useEffect(() => {
    applySeoMetadata({ ...options });
  }, [location, options, language]);
};

export { applySeoMetadata };









// import { useEffect } from "react";
// import { useLocation } from "wouter";
// import {
//   DEFAULT_SOCIAL_IMAGE,
//   SITE_NAME,
//   SITE_URL
// } from "src/config/seo";
// import {
//   SUPPORTED_LANGUAGES,
//   getLocalizedPath,
//   type Language
// } from "src/context/LanguageContext";

// export interface StructuredData {
//   [key: string]: unknown;
// }

// export interface UseSeoOptions {
//   title: string;
//   description: string;
//   path?: string;
//   canonicalUrl?: string;
//   type?: "website" | "article" | "product" | "profile" | string;
//   image?: string;
//   keywords?: string[];
//   noindex?: boolean;
//   structuredData?: StructuredData | StructuredData[];
// }

// const HEAD = () => document.querySelector("head");

// const ensureMetaTag = (selector: string, create: () => HTMLElement) => {
//   const existing = document.querySelector(selector);
//   if (existing) {
//     return existing as HTMLElement;
//   }
//   const element = create();
//   HEAD()?.appendChild(element);
//   return element;
// };

// const normaliseUrl = (urlOrPath: string) => {
//   if (!urlOrPath) {
//     return SITE_URL;
//   }

//   if (/^https?:/i.test(urlOrPath)) {
//     return urlOrPath;
//   }

//   const path = urlOrPath.startsWith("/") ? urlOrPath : `/${urlOrPath}`;
//   return `${SITE_URL}${path}`;
// };

// const stripLanguageFromPath = (target: string) => {
//   const normalizedPath = target.startsWith("/") ? target : `/${target}`;
//   const segments = normalizedPath.split("/").filter(Boolean);

//   if (segments.length === 0) {
//     return "/";
//   }

//   const [maybeLang, ...rest] = segments;
//   if (SUPPORTED_LANGUAGES.includes(maybeLang as Language)) {
//     return rest.length > 0 ? `/${rest.join("/")}` : "/";
//   }

//   return normalizedPath;
// };

// const updateAlternateLinks = (path: string | undefined) => {
//   document
//     .querySelectorAll('link[rel="alternate"][data-managed="asyncz"]')
//     .forEach((node) => node.remove());

//   const rawPath = path ?? window.location.pathname;
//   const cleanPath = stripLanguageFromPath(rawPath);

//   SUPPORTED_LANGUAGES.forEach((lang) => {
//     const href = normaliseUrl(getLocalizedPath(lang, cleanPath));
//     const link = document.createElement("link");
//     link.setAttribute("rel", "alternate");
//     link.setAttribute("hrefLang", lang);
//     link.setAttribute("href", href);
//     link.setAttribute("data-managed", "asyncz");
//     HEAD()?.appendChild(link);
//   });

//   const defaultHref = normaliseUrl(
//     getLocalizedPath(SUPPORTED_LANGUAGES[0] as Language, cleanPath)
//   );
//   const xDefault = document.createElement("link");
//   xDefault.setAttribute("rel", "alternate");
//   xDefault.setAttribute("hrefLang", "x-default");
//   xDefault.setAttribute("href", defaultHref);
//   xDefault.setAttribute("data-managed", "asyncz");
//   HEAD()?.appendChild(xDefault);
// };

// const updateStructuredData = (structuredData?: StructuredData | StructuredData[]) => {
//   document
//     .querySelectorAll('script[type="application/ld+json"][data-managed="asyncz"]')
//     .forEach((node) => node.remove());

//   if (!structuredData) {
//     return;
//   }

//   const data = Array.isArray(structuredData) ? structuredData : [structuredData];
//   data
//     .filter((schema) => schema && Object.keys(schema).length > 0)
//     .forEach((schema) => {
//       const script = document.createElement("script");
//       script.type = "application/ld+json";
//       script.setAttribute("data-managed", "asyncz");
//       script.text = JSON.stringify(schema, null, 0);
//       HEAD()?.appendChild(script);
//     });
// };

// const updateCanonical = (canonicalUrl: string) => {
//   document
//     .querySelectorAll('link[rel="canonical"][data-managed="asyncz"]')
//     .forEach((node) => node.remove());

//   const link = document.createElement("link");
//   link.setAttribute("rel", "canonical");
//   link.setAttribute("href", canonicalUrl);
//   link.setAttribute("data-managed", "asyncz");
//   HEAD()?.appendChild(link);
// };

// const setMetaContent = (selector: string, content: string) => {
//   if (!content) {
//     return;
//   }
//   const element = ensureMetaTag(selector, () => {
//     const meta = document.createElement("meta");
//     const matches = selector.match(/([a-z-]+)="([^"]+)"/i);
//     if (matches) {
//       meta.setAttribute(matches[1], matches[2]);
//     }
//     return meta;
//   });
//   element.setAttribute("content", content);
// };

// const applySeoMetadata = ({
//   title,
//   description,
//   path,
//   canonicalUrl,
//   type = "website",
//   image,
//   keywords,
//   noindex,
//   structuredData
// }: UseSeoOptions) => {
//   if (typeof document === "undefined") {
//     return;
//   }

//   document.title = title;

//   setMetaContent('meta[name="description"]', description);
//   setMetaContent('meta[name="robots"]', noindex ? "noindex, nofollow" : "index, follow");

//   const canonical = normaliseUrl(canonicalUrl ?? window.location.pathname);
//   updateCanonical(canonical);
//   updateAlternateLinks(path ?? window.location.pathname);

//   const ogImage = image ? normaliseUrl(image) : DEFAULT_SOCIAL_IMAGE;
//   setMetaContent('meta[property="og:title"]', title);
//   setMetaContent('meta[property="og:description"]', description);
//   setMetaContent('meta[property="og:type"]', type);
//   setMetaContent('meta[property="og:url"]', canonical);
//   setMetaContent('meta[property="og:site_name"]', SITE_NAME);
//   setMetaContent('meta[property="og:image"]', ogImage);

//   setMetaContent('meta[name="twitter:card"]', "summary_large_image");
//   setMetaContent('meta[name="twitter:title"]', title);
//   setMetaContent('meta[name="twitter:description"]', description);
//   setMetaContent('meta[name="twitter:image"]', ogImage);

//   if (keywords && keywords.length > 0) {
//     setMetaContent('meta[name="keywords"]', keywords.join(", "));
//   }

//   updateStructuredData(structuredData);
// };

// export const useSeo = (options: UseSeoOptions) => {
//   const [location] = useLocation();
//   const language = options.path?.split('/')[1] || 'en';

//   useEffect(() => {
//     applySeoMetadata({ ...options });
//   }, [location, options, language]);
// };

// export { applySeoMetadata };
