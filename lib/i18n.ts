export type Locale = 'en' | 'tr' | 'el' | 'ru';

export const locales: { value: Locale; label: string; region: string }[] = [
  { value: 'en', label: 'EN', region: 'English' },
  { value: 'tr', label: 'TR', region: 'Türkçe' },
  { value: 'el', label: 'GR', region: 'Ελληνικά' },
  { value: 'ru', label: 'RU', region: 'Русский' },
];

export const defaultLocale: Locale = 'en';

type Dictionary = Record<string, Record<Locale, string>>;

const dictionary: Dictionary = {
  browse: { en: 'Browse', tr: 'Gözat', el: 'Περιήγηση', ru: 'Обзор' },
  sell: { en: 'Sell', tr: 'Sat', el: 'Πώληση', ru: 'Продать' },
  dashboard: { en: 'Dashboard', tr: 'Panel', el: 'Πίνακας', ru: 'Панель' },
  stories: { en: 'Stories', tr: 'Hikayeler', el: 'Ιστορίες', ru: 'Истории' },
  faq: { en: 'FAQ', tr: 'SSS', el: 'Συχνές ερωτήσεις', ru: 'Вопросы' },
  marketplace: { en: 'Marketplace', tr: 'Pazar', el: 'Αγορά', ru: 'Маркетплейс' },
  producers: { en: 'Producers', tr: 'Üreticiler', el: 'Παραγωγοί', ru: 'Производители' },
  login: { en: 'Login', tr: 'Giriş', el: 'Σύνδεση', ru: 'Вход' },
  signup: { en: 'Sign up', tr: 'Kaydol', el: 'Εγγραφή', ru: 'Регистрация' },
  heroTagline: {
    en: 'Buy & sell locally. No fees. No fuss.',
    tr: 'Yerelde al ve sat. Ücret yok. Gereksiz karmaşa yok.',
    el: 'Αγόρασε και πούλα τοπικά. Χωρίς προμήθειες. Χωρίς φασαρία.',
    ru: 'Покупайте и продавайте локально. Без комиссий. Без суеты.',
  },
  ctaStart: { en: 'Start Selling', tr: 'Satışa Başla', el: 'Ξεκίνα να πουλάς', ru: 'Начать продавать' },
};

export function t(key: keyof typeof dictionary, locale: Locale = defaultLocale) {
  return dictionary[key]?.[locale] ?? dictionary[key]?.[defaultLocale] ?? key;
}

export function normalizeLocale(input?: string | null): Locale {
  const match = locales.find((item) => item.value === input);
  return match?.value ?? defaultLocale;
}