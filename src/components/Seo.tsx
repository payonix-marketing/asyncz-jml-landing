import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";
import {
  DEFAULT_SOCIAL_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "src/config/seo";
import {
  SUPPORTED_LANGUAGES,
  getLocalizedPath,
  type Language,
} from "src/context/LanguageContext";

export interface StructuredData {
  [key: string]: unknown;
}

export interface SeoProps {
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

const stripLanguageFromPath = (target: string) => {
  const normalizedPath = target.startsWith("/") ? target : `/${target}`;
  const segments = normalizedPath.split("/").filter(Boolean);

  if (segments.length === 0) return "/";

  const [maybeLang, ...rest] = segments;
  if (SUPPORTED_LANGUAGES.includes(maybeLang as Language)) {
    return rest.length > 0 ? `/${rest.join("/")}` : "/";
  }

  return normalizedPath;
};

export function Seo({
  title,
  description,
  path,
  canonicalUrl,
  type = "website",
  image,
  keywords,
  noindex,
  structuredData,
}: SeoProps) {
  const [location] = useLocation();
  const rawPath = path ?? location;
  const cleanPath = stripLanguageFromPath(rawPath);

  const canonical = useMemo(() => {
    if (canonicalUrl) return canonicalUrl;
    const defaultLangPath = getLocalizedPath(SUPPORTED_LANGUAGES[0] as Language, cleanPath);
    return `${SITE_URL}${defaultLangPath}`;
  }, [canonicalUrl, cleanPath]);

  const ogImage = image ? `${SITE_URL}${image}` : DEFAULT_SOCIAL_IMAGE;

  const structuredDataScripts = useMemo(() => {
    if (!structuredData) return [];
    const data = Array.isArray(structuredData) ? structuredData : [structuredData];
    return data
      .filter((schema) => schema && Object.keys(schema).length > 0)
      .map((schema, index) => (
        <script key={`ld-json-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ));
  }, [structuredData]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords.join(", ")} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      <link rel="canonical" href={canonical} />
      {SUPPORTED_LANGUAGES.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={`${SITE_URL}${getLocalizedPath(lang, cleanPath)}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${SITE_URL}${getLocalizedPath(SUPPORTED_LANGUAGES[0] as Language, cleanPath)}`}
      />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {structuredDataScripts}
    </Helmet>
  );
}