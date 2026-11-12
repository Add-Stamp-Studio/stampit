// The guide shows which engine the site runs. The engine is the npm package, so its version
// is the one that means something, read from the package rather than duplicated here.
import engine from "@howbizarre/image-stamper/package.json";

/**
 * Where the site actually lives. Canonical links, Open Graph URLs and the sitemap are all
 * absolute, and an absolute URL that points at the wrong host is worse than none at all —
 * so it is declared once, here, and overridable per deploy with NUXT_PUBLIC_SITE_URL.
 *
 * No trailing slash: everything below joins paths onto it.
 */
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://stampit.addstamp.studio';

/**
 * Sets the theme class before first paint.
 *
 * The pages are prerendered as light-theme HTML — a build machine has no way to know what
 * the visitor prefers. Without this the app would flash the light palette on every load for
 * anyone on a dark OS, which is most of the audience.
 */
const themeBoot = `try{var t=localStorage.getItem('add-stamp:theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}`;

export default defineNuxtConfig({
  /**
   * On, but only so the pages can be prerendered — see nitro.prerender below. Nothing is
   * rendered per request: the output is static HTML plus the same client bundle as before.
   *
   * This is what makes the site indexable. As a pure SPA the server returned an empty
   * shell, which Google will render eventually and every other crawler — Bing, and the
   * unfurlers behind Slack, X, LinkedIn and Facebook — will not.
   */
  ssr: true,

  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      // Pages own their title, description and lang via usePageSeo; these are only what a
      // page without one would get.
      htmlAttrs: { lang: 'en' },
      title: 'StampIt — batch watermarking in the browser',

      meta: [
        { name: 'description', content: 'Put your mark on a whole folder of photos. Nothing leaves the browser.' },
        { name: 'author', content: 'Add Stamp Studio' },

        // Both palettes are declared so the browser chrome matches whichever theme is live.
        { name: 'theme-color', content: '#fbf7ee', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#11141b', media: '(prefers-color-scheme: dark)' },

        // Per-page og:title/description/url/image/locale are set by usePageSeo. These are
        // the constants, which would otherwise be repeated on every page.
        { property: 'og:site_name', content: 'StampIt' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:creator', content: '@howbizarre' }
      ],

      link: [
        // 48x48 is the largest entry in the .ico; naming it stops Chrome guessing.
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },

        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Caveat:wght@500;600&family=Manrope:wght@400..800&family=Prata&display=swap'
        }
      ],

      script: [{ innerHTML: themeBoot, tagPosition: 'head' }]
    }
  },

  runtimeConfig: {
    public: {
      engineVersion: engine.version,
      siteUrl
    }
  },

  vite: {
    /**
     * Vite's dependency cache, in the project root rather than node_modules/.cache, so it is
     * in plain sight and clearing it is `rm -rf .vite`. Nuxt resolves this against the root
     * and adds client/ and server/ under it. Ignored in .gitignore.
     */
    cacheDir: '.vite',

    /**
     * Dev server only. On startup Nuxt crawls the module graph and transforms everything it
     * finds, the engine's .wasm included, which the bundled engine only points at by URL.
     * Vite 8 compiles a .wasm it is asked to transform as an ES module, fails on the
     * wasm-bindgen import "./image_stamper_bg.js", and the error lands in the terminal and in
     * Nuxt's overlay although the browser loads the .wasm as a plain file and nothing is
     * broken. Two pages need no warmup; the first load in dev is a moment slower without it.
     */
    warmupEntry: false,

    optimizeDeps: {
      /**
       * Dev server only. Both are imported lazily, the first time a batch runs, so Vite found
       * them late: it pre-bundled them mid-session and reloaded the page, and before that it
       * served the engine's raw files, whose .wasm Vite 8 then tried to compile as an ES module
       * ("Failed to resolve import ./image_stamper_bg.js"). Named here, they are bundled at
       * startup, and the dev server only ever serves the bundled engine, which points at the
       * .wasm by URL, as the production build does.
       */
      include: ['@howbizarre/image-stamper', 'jszip']
    }
  },

  nitro: {
    preset: 'cloudflare_module',

    cloudflare: {
      deployConfig: true,
      nodeCompat: true
    },

    /**
     * Both pages, in both languages, and the sitemap are written out as files at build time.
     *
     * crawlLinks is off: the route list is short and named right here, and a crawler would
     * also chase the outbound GitHub and X links in the footer.
     */
    prerender: {
      routes: ['/', '/how-to-use', '/bg', '/bg/how-to-use', '/sitemap.xml'],
      crawlLinks: false,
      failOnError: true
    }

    // No route rules for the engine: Vite bundles @howbizarre/image-stamper and emits its
    // .wasm as a content-hashed asset under /_nuxt/, which gets the same immutable caching
    // as every other asset, and Workers static assets serve it as application/wasm.
  },

  modules: ['nitro-cloudflare-dev']
});
