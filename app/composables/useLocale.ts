import { bg } from '~/i18n/bg';
import { en } from '~/i18n/en';
import type { Messages } from '~/i18n/en';

export type Locale = 'en' | 'bg';

export const LOCALES: Record<Locale, Messages> = { en, bg };

/** English lives at the root, Bulgarian under /bg. */
const PREFIX: Record<Locale, string> = { en: '', bg: '/bg' };

/** The language a path is in. Read from the path alone, so a prerendered page cannot disagree with its URL. */
export function localeOfPath(path: string): Locale {
  return path === '/bg' || path.startsWith('/bg/') ? 'bg' : 'en';
}

/** A page's path without its language prefix: `/bg/how-to-use` → `/how-to-use`, `/bg` → `/`. */
export function basePath(path: string): string {
  const stripped = localeOfPath(path) === 'bg' ? path.slice(3) : path;

  return stripped === '' ? '/' : stripped.replace(/\/$/, '') || '/';
}

/** The same page in the given language. */
export function pathFor(locale: Locale, base: string): string {
  const prefix = PREFIX[locale];

  return base === '/' ? prefix || '/' : `${prefix}${base}`;
}

/**
 * The page's language and its words.
 *
 * Two languages, two prerendered copies of each page, and no runtime switching: the language
 * is a property of the URL. That is what lets search engines index both and lets a shared
 * link open in the language it was shared in.
 */
export function useLocale() {
  const route = useRoute();

  const locale = computed<Locale>(() => localeOfPath(route.path));
  const t = computed<Messages>(() => LOCALES[locale.value]);
  const base = computed(() => basePath(route.path));

  /** A path within the site, in the current language. */
  const localePath = (path: string) => pathFor(locale.value, path);

  /** This page, in the other language. */
  const switchPath = (target: Locale) => pathFor(target, base.value);

  /** A number the way this language writes it: 8.4 in English, 8,4 in Bulgarian. */
  const formatNumber = (value: number, fractionDigits = 1) =>
    new Intl.NumberFormat(locale.value === 'bg' ? 'bg-BG' : 'en-GB', {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits
    }).format(value);

  /** formatFileSize with this language's decimal mark. */
  const fileSize = (bytes: number) => {
    const formatted = formatFileSize(bytes);

    return locale.value === 'bg' ? formatted.replace('.', ',') : formatted;
  };

  return { locale, t, base, localePath, switchPath, formatNumber, fileSize };
}
