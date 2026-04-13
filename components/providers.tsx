"use client";

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { defaultLocale, normalizeLocale, type Locale } from '@/lib/i18n';

type LocaleContextValue = { locale: Locale; setLocale: (locale: Locale) => void };

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const url = new URL(window.location.href);
    const nextLocale = normalizeLocale(url.searchParams.get('lang') ?? window.localStorage.getItem('ostra-locale'));
    setLocaleState(nextLocale);
    window.localStorage.setItem('ostra-locale', nextLocale);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale: (nextLocale: Locale) => {
        setLocaleState(nextLocale);
        window.localStorage.setItem('ostra-locale', nextLocale);
        const url = new URL(window.location.href);
        url.searchParams.set('lang', nextLocale);
        window.history.replaceState({}, '', url.toString());
      },
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return context;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <LocaleProvider>{children}</LocaleProvider>;
}