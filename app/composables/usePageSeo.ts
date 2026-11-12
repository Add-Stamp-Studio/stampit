import { LOCALES, pathFor } from './useLocale';
import type { Locale } from './useLocale';

interface PageSeo {
  /** The whole <title>, not a fragment — no site name is appended for you. */
  title: string;

  /** One sentence, under ~155 characters, or search engines will cut it mid-word. */
  description: string;

  /** The page's path without a language prefix, e.g. `/` or `/how-to-use`. */
  base: string;

  /** The language this copy of the page is in. */
  locale: Locale;

  /** Overrides the default share card. Absolute, or a path from the site root. */
  image?: string;
}

/**
 * The per-page half of the head: title, description, language, canonical, the hreflang
 * pair, and the Open Graph and Twitter tags that go with them.
 *
 * The constants — og:site_name, twitter:card, the icons — live in nuxt.config and are not
 * repeated here.
 *
 * Every URL comes out absolute against runtimeConfig.public.siteUrl. A relative canonical
 * resolves against whatever host served the page, which on a preview deploy means the
 * preview declares itself canonical and competes with production for the same content.
 */
export function usePageSeo({ title, description, base, locale, image }: PageSeo) {
  const siteUrl = useRuntimeConfig().public.siteUrl as string;
  const t = LOCALES[locale];

  const absolute = (value: string) => (value.startsWith('http') ? value : `${siteUrl}${value}`);

  const url = absolute(pathFor(locale, base));
  // Each language has its own share card, with its own words on it.
  const imageUrl = absolute(image ?? (locale === 'bg' ? '/og-image-bg.jpg' : '/og-image.jpg'));
  const other: Locale = locale === 'en' ? 'bg' : 'en';

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogUrl: url,
    ogLocale: t.ogLocale,
    ogLocaleAlternate: LOCALES[other].ogLocale,
    ogImage: imageUrl,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: 'image/jpeg',
    ogImageAlt: t.common.ogImageAlt,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: imageUrl
  });

  useHead({
    htmlAttrs: { lang: locale },
    link: [
      { rel: 'canonical', href: url },
      { rel: 'alternate', hreflang: 'en', href: absolute(pathFor('en', base)) },
      { rel: 'alternate', hreflang: 'bg', href: absolute(pathFor('bg', base)) },
      { rel: 'alternate', hreflang: 'x-default', href: absolute(pathFor('en', base)) }
    ]
  });
}
