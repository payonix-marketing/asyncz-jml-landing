import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'wouter';

import enTranslations from '../locales/en.json';
import azTranslations from '../locales/az.json';
import trTranslations from '../locales/tr.json';
import deTranslations from '../locales/de.json';
import frTranslations from '../locales/fr.json';
import esTranslations from '../locales/es.json';
import ptTranslations from '../locales/pt.json';
import ruTranslations from '../locales/ru.json';
import zhTranslations from '../locales/zh.json';
import jaTranslations from '../locales/ja.json';
import koTranslations from '../locales/ko.json';
import arTranslations from '../locales/ar.json';
import csTranslations from '../locales/cs.json';
import ukTranslations from '../locales/uk.json';

export const SUPPORTED_LANGUAGES = ['en', 'az', 'tr', 'de', 'fr', 'es', 'pt', 'ru', 'zh', 'ja', 'ko', 'ar', 'cs', 'uk'] as const;
export type Language = typeof SUPPORTED_LANGUAGES[number];
export const DEFAULT_LANGUAGE: Language = 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => any;
}

const translations: Record<Language, any> = {
    en: enTranslations,
    az: azTranslations,
    tr: trTranslations,
    de: deTranslations,
    fr: frTranslations,
    es: esTranslations,
    pt: ptTranslations,
    ru: ruTranslations,
    zh: zhTranslations,
    ja: jaTranslations,
    ko: koTranslations,
    ar: arTranslations,
    cs: csTranslations,
    uk: ukTranslations
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const isSupportedLanguage = (value: string | null | undefined): value is Language => {
    return !!value && SUPPORTED_LANGUAGES.includes(value as Language);
};

const trimSlashes = (path: string) => path.replace(/^\/+|\/+$/g, '');

const splitPathSegments = (path: string): string[] => {
    const trimmed = trimSlashes(path);
    return trimmed ? trimmed.split('/') : [];
};

const extractLanguageFromPath = (path: string): Language | undefined => {
    const segments = splitPathSegments(path);
    const candidate = segments[0];
    return isSupportedLanguage(candidate) ? candidate : undefined;
};

const buildPathWithLanguage = (language: Language, path: string): string => {
    const normalized = path.startsWith('/') ? path : `/${path}`;
    const segments = splitPathSegments(normalized);
    const hasLanguagePrefix = segments.length > 0 && isSupportedLanguage(segments[0]);
    const remainder = hasLanguagePrefix ? segments.slice(1) : segments;
    const restPath = remainder.join('/');
    return `/${language}${restPath ? `/${restPath}` : ''}`;
};

const getPreferredLanguage = (): Language => {
    if (typeof window === 'undefined') {
        return DEFAULT_LANGUAGE;
    }

    const stored = window.localStorage.getItem('asyncz-language');
    if (isSupportedLanguage(stored)) {
        return stored;
    }

    const browserLang = window.navigator.language?.toLowerCase() ?? '';
    console.log('Detected browser language:', browserLang);

    const match = SUPPORTED_LANGUAGES.find((lang) => browserLang === lang || browserLang.startsWith(`${lang}-`));

    return match ?? DEFAULT_LANGUAGE;
};

export const getLocalizedPath = (language: Language, targetPath: string): string => {
    if (!targetPath) {
        return `/${language}`;
    }

    if (/^(https?:|mailto:|tel:)/i.test(targetPath) || targetPath.startsWith('#')) {
        return targetPath;
    }

    const normalized = targetPath.startsWith('/') ? targetPath : `/${targetPath}`;
    const queryIndex = normalized.search(/[?#]/);
    const pathname = queryIndex >= 0 ? normalized.slice(0, queryIndex) : normalized;
    const suffix = queryIndex >= 0 ? normalized.slice(queryIndex) : '';

    const segments = splitPathSegments(pathname);
    if (segments.length > 0 && isSupportedLanguage(segments[0])) {
        return `${pathname}${suffix}`;
    }

    const rest = segments.join('/');
    const prefixed = `/${language}${rest ? `/${rest}` : ''}`;
    return `${prefixed}${suffix}`;
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [location, setLocation] = useLocation();
    const [language, setLanguageState] = useState<Language>(() => {
        const languageFromPath = extractLanguageFromPath(location);
        if (languageFromPath) {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('asyncz-language', languageFromPath);
            }
            return languageFromPath;
        }
        return getPreferredLanguage(); // This will use the browser language if no path language is found
    });

    useEffect(() => {
        const languageFromPath = extractLanguageFromPath(location);
        if (languageFromPath) {
            setLanguageState((current) => (current === languageFromPath ? current : languageFromPath));
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('asyncz-language', languageFromPath);
            }
            return;
        }

        const preferred = getPreferredLanguage();
        const target = buildPathWithLanguage(preferred, location);
        if (target !== location) {
            setLocation(target, { replace: true });
        }
    }, [location, setLocation]);

    const changeLanguage = (nextLanguage: Language) => {
        setLanguageState(nextLanguage);
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('asyncz-language', nextLanguage);
        }
        const target = buildPathWithLanguage(nextLanguage, location);
        if (target !== location) {
            setLocation(target);
        }
    };

    const getNestedTranslation = (obj: any, path: string): any => {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : null;
        }, obj);
    };

    const t = (key: string): any => {
        const translation = getNestedTranslation(translations[language], key);
        if (translation !== null && translation !== undefined) {
            return translation;
        }

        const fallback = getNestedTranslation(translations.en, key);
        if (fallback !== null && fallback !== undefined) {
            return fallback;
        }

        console.warn(`Translation missing for key: ${key}`);
        return key;
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage: changeLanguage,
                t
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
