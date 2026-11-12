<script lang="ts" setup>
/**
 * The home page, in whichever language the URL names. pages/index.vue and pages/bg/index.vue
 * both render this; the words come from useLocale.
 */
const { t, locale, localePath } = useLocale();

usePageSeo({
  title: t.value.home.seoTitle,
  description: t.value.home.seoDescription,
  base: '/',
  locale: locale.value
});

/**
 * Tells search engines what the page is rather than leaving them to infer it from a tool
 * with an empty dropzone. `price: 0` is what earns the free label in a result; without an
 * offer the software is assumed paid.
 */
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'StampIt',
      url: `${useRuntimeConfig().public.siteUrl}${localePath('/') === '/' ? '' : localePath('/')}`,
      inLanguage: locale.value,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any browser with WebAssembly',
      browserRequirements: 'Requires WebAssembly',
      description: t.value.home.ldDescription,
      offers: { '@type': 'Offer', price: 0, priceCurrency: 'EUR' },
      license: 'https://opensource.org/licenses/MIT',
      author: { '@type': 'Organization', name: 'Add Stamp Studio', url: 'https://addstamp.studio' },
      featureList: t.value.home.ldFeatures
    })
  }]
});

const nav = computed(() => [
  { label: t.value.common.nStamp, to: '#stamp' },
  { label: t.value.home.nHow, to: '#how' },
  { label: t.value.common.nGuide, to: localePath('/how-to-use') },
  { label: t.value.home.nOpen, to: '#open' }
]);

const cta = computed(() => ({ label: t.value.home.cta, to: '#stamp' }));

const steps = computed(() => {
  const h = t.value.home;

  return [
    { title: h.s1t, text: h.s1d, side: 'r', color: '#b9c685', opacity: 0.6, icon: 'frames' },
    { title: h.s2t, text: h.s2d, side: 'l', color: '#93b6d6', opacity: 0.6, icon: 'stamp' },
    { title: h.s3t, text: h.s3d, side: 'r', color: '#fcbc1e', opacity: 0.5, icon: 'opacity' },
    { title: h.s4t, text: h.s4d, side: 'l', color: '#ee6f52', opacity: 0.45, icon: 'apply' },
    { title: h.s5t, text: h.s5d, side: 'r', color: '#8a82e0', opacity: 0.45, icon: 'take' }
  ];
});

const cards = computed(() => {
  const h = t.value.home;

  return [
    { title: h.c1t, text: h.c1d, icon: 'cloud' },
    { title: h.c2t, text: h.c2d, icon: 'person' },
    { title: h.c3t, text: h.c3d, icon: 'home' },
    { title: h.c4t, text: h.c4d, icon: 'frame' }
  ];
});
</script>

<template>
  <div id="top">
    <a class="skip" href="#main">{{ t.common.skip }}</a>

    <AppHeader :links="nav" home-to="#top" :cta="cta" />

    <main id="main">
      <!-- HERO -->
      <section class="section bg-paper clip" aria-labelledby="hero-title">
        <svg class="grain" aria-hidden="true"><rect width="100%" height="100%" filter="url(#grain)" /></svg>

        <div class="leaves" aria-hidden="true">
          <span class="leaf" style="left: 14%; --d: 19s; --delay: -2s"><svg viewBox="0 0 20 24" width="18" height="22"><path d="M10 1 C 19 7 19 17 10 23 C 1 17 1 7 10 1 Z" fill="#e3702f" /><path d="M10 3 V21" stroke="#9b4a1d" stroke-width="1" /></svg></span>
          <span class="leaf" style="left: 38%; --d: 24s; --delay: -9s"><svg viewBox="0 0 26 30" width="20" height="23"><rect x="2" y="2" width="22" height="26" rx="2" fill="#fffdf7" stroke="#e4dacb" /><rect x="5" y="5" width="16" height="13" fill="#93b6d6" /></svg></span>
          <span class="leaf" style="left: 52%; --d: 22s; --delay: -11s"><svg viewBox="0 0 20 24" width="14" height="17"><path d="M10 1 C 19 7 19 17 10 23 C 1 17 1 7 10 1 Z" fill="#fcbc1e" /><path d="M10 3 V21" stroke="#b88512" stroke-width="1" /></svg></span>
          <span class="leaf" style="left: 72%; --d: 17s; --delay: -6s"><svg viewBox="0 0 20 24" width="16" height="19"><path d="M10 1 C 19 7 19 17 10 23 C 1 17 1 7 10 1 Z" fill="#b9c685" /><path d="M10 3 V21" stroke="#6d8a3e" stroke-width="1" /></svg></span>
          <span class="leaf" style="left: 88%; --d: 21s; --delay: -15s"><svg viewBox="0 0 26 30" width="18" height="21"><rect x="2" y="2" width="22" height="26" rx="2" fill="#fffdf7" stroke="#e4dacb" /><rect x="5" y="5" width="16" height="13" fill="#f2c6a0" /><circle cx="17" cy="23" r="2.4" fill="none" stroke="#ee6f52" stroke-width="1.2" /></svg></span>
        </div>

        <div class="wrap hero-grid">
          <div class="hero-text">
            <p class="hero-kicker">{{ t.home.heroEyebrow }}</p>
            <h1 id="hero-title" class="title-xl">{{ t.home.heroTitle }}</h1>
            <p class="hero-lead">{{ t.home.heroLead }}</p>
            <div class="hero-actions">
              <a class="btn" href="#stamp">{{ t.home.cta }}</a>
              <a class="link-arrow" href="#how">
                {{ t.home.heroLink }}
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
            </div>
          </div>
          <div class="hero-art">
            <HomeHeroArt />
          </div>
        </div>

        <HomeDryingLine />

        <svg aria-hidden="true" viewBox="0 0 1440 70" preserveAspectRatio="none" class="edge-flow">
          <path d="M0 34 C 160 8 300 10 440 30 C 600 52 760 56 900 34 C 1040 14 1200 12 1440 38 L1440 70 L0 70 Z" style="fill: var(--band)" />
        </svg>
      </section>

      <!-- THE STAMPING TABLE -->
      <HomeStampingTable />

      <!-- HOW IT WORKS -->
      <section id="how" class="section bg-paper clip" aria-labelledby="how-title">
        <svg class="grain" aria-hidden="true"><rect width="100%" height="100%" filter="url(#grain)" /></svg>
        <div class="wrap" style="--w: 1120px; position: relative; padding-top: 84px; padding-bottom: 130px">
          <div class="center-head">
            <p class="eyebrow">{{ t.home.howEyebrow }}</p>
            <h2 id="how-title" class="title-lg">{{ t.home.howTitle }}</h2>
            <p style="margin-top: 18px; color: var(--muted)">{{ t.home.howText }}</p>
          </div>

          <div class="trail">
            <svg class="trail-svg" aria-hidden="true" viewBox="0 0 1000 700" preserveAspectRatio="none">
              <path class="trail-path" pathLength="1" d="M500 0 C 500 30 500 50 500 70 C 520 110 610 100 604 140 C 598 176 548 168 556 146 C 564 124 606 140 584 176 C 566 204 516 196 500 210 C 480 250 392 250 392 280 C 392 312 480 318 500 350 C 520 390 608 392 608 420 C 608 452 520 456 500 490 C 480 530 392 520 396 562 C 400 598 446 590 440 566 C 434 542 392 556 406 590 C 418 618 480 614 500 630 C 512 660 506 680 500 700" fill="none" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" style="stroke: var(--accent)" />
            </svg>
            <div class="trail-line" aria-hidden="true"></div>

            <ol class="trail-list">
              <li v-for="(step, i) in steps" :key="i" class="trail-row">
                <div v-if="step.side === 'r'" class="trail-empty"></div>
                <div v-else class="trail-text trail-text-l">
                  <p class="eyebrow">{{ t.home.step }} 0{{ i + 1 }}</p>
                  <h3>{{ step.title }}</h3>
                  <p class="trail-desc">{{ step.text }}</p>
                </div>

                <div class="trail-marker">
                  <div class="trail-dot">
                    <svg aria-hidden="true" viewBox="0 0 84 84">
                      <circle cx="42" cy="42" r="37" style="fill: var(--paper)" />
                      <circle cx="42" cy="42" r="34" :fill="step.color" :opacity="step.opacity" filter="url(#wc)" />
                    </svg>
                    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <template v-if="step.icon === 'frames'"><rect x="3" y="4" width="18" height="16" rx="3" /><circle cx="8.5" cy="9.5" r="1.6" /><path d="M3 16.5l4.5-4.2a2 2 0 0 1 2.7 0L15 17" /><path d="M14 14.2l1.6-1.5a2 2 0 0 1 2.7 0L21 15.4" /></template>
                      <template v-else-if="step.icon === 'stamp'"><path d="M9.5 3.5h5l-.8 6.5h-3.4z" /><rect x="4.5" y="10" width="15" height="5" rx="1.5" /><path d="M4 19.5h16" /></template>
                      <template v-else-if="step.icon === 'opacity'"><circle cx="12" cy="12" r="8" /><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" /></template>
                      <template v-else-if="step.icon === 'apply'"><path d="M12 3v9" /><path d="M8.5 8.5L12 12l3.5-3.5" /><path d="M5 15.5h14" /><path d="M7 19.5h10" /></template>
                      <template v-else><path d="M12 4v11" /><path d="M7.5 10.5L12 15l4.5-4.5" /><path d="M4 17v2.5A1.5 1.5 0 0 0 5.5 21h13a1.5 1.5 0 0 0 1.5-1.5V17" /></template>
                    </svg>
                  </div>
                </div>

                <div v-if="step.side === 'r'" class="trail-text trail-text-r">
                  <p class="eyebrow">{{ t.home.step }} 0{{ i + 1 }}</p>
                  <h3>{{ step.title }}</h3>
                  <p class="trail-desc">{{ step.text }}</p>
                </div>
                <div v-else class="trail-empty"></div>
              </li>
            </ol>
          </div>

          <div style="margin-top: 56px; display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center">
            <p class="hand" style="font-size: 1.7rem; transform: rotate(-2deg)">{{ t.home.howNote }}</p>
            <NuxtLink class="btn btn-ghost" :to="localePath('/how-to-use')">{{ t.home.howBtn }}</NuxtLink>
          </div>
        </div>
        <svg class="edge" aria-hidden="true" viewBox="0 0 1440 70" preserveAspectRatio="none">
          <path d="M0 30 C 140 54 300 58 460 36 C 620 14 780 10 940 32 C 1100 54 1280 52 1440 26 L1440 70 L0 70 Z" style="fill: var(--night)" />
        </svg>
      </section>

      <!-- NIGHT: NOTHING LEAVES HOME -->
      <section class="section bg-night clip" aria-labelledby="night-title">
        <NightScene moon="left" />
        <div class="wrap" style="--w: 1120px; position: relative; padding-top: 120px; padding-bottom: clamp(200px, 18vw, 270px); text-align: center">
          <h2 id="night-title" class="title-lg night-title" style="margin-top: 0">{{ t.home.ngTitle }}</h2>
          <p style="margin: 18px auto 0; max-width: 40em; color: #d9d8e2">{{ t.home.ngText }}</p>
          <ul class="cards">
            <li v-for="card in cards" :key="card.icon" class="card">
              <span class="card-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <template v-if="card.icon === 'cloud'"><path d="M7 18.5h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.2 9.6 4.5 4.5 0 0 0 7 18.5z" /><path d="M3.5 3.5l17 17" /></template>
                  <template v-else-if="card.icon === 'person'"><circle cx="12" cy="8" r="3.5" /><path d="M5 20c1-3.6 3.8-5.5 7-5.5s6 1.9 7 5.5" /></template>
                  <template v-else-if="card.icon === 'home'"><path d="M4 11l8-7 8 7v9H4z" /><path d="M10 20v-6h4v6" /></template>
                  <template v-else><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /><rect x="8" y="8" width="8" height="8" rx="1.5" /></template>
                </svg>
              </span>
              <h3>{{ card.title }}</h3>
              <p>{{ card.text }}</p>
            </li>
          </ul>
        </div>
        <svg class="edge" aria-hidden="true" viewBox="0 0 1440 70" preserveAspectRatio="none">
          <path d="M0 36 C 180 10 320 12 480 32 C 640 52 800 56 960 34 C 1120 12 1280 14 1440 40 L1440 70 L0 70 Z" style="fill: var(--band)" />
        </svg>
      </section>

      <!-- OPEN SOURCE -->
      <section id="open" class="section bg-band" aria-labelledby="open-title">
        <div class="wrap op-wrap">
          <div class="op-ill">
            <HomeOpenSourceArt />
          </div>
          <div class="op-text">
            <p class="chip chip-caps">{{ t.home.opEyebrow }}</p>
            <h2 id="open-title" class="title-lg" style="margin-top: 18px">{{ t.home.opTitle }}</h2>
            <p style="margin-top: 20px; font-weight: 700; color: var(--ink)">{{ t.home.opStrong }}</p>
            <p style="margin-top: 14px">{{ t.home.opText }}</p>
            <ul class="points">
              <li>
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 2.8l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 16.8l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" fill="currentColor" /></svg>
                <span>{{ t.home.ob1 }}</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 2.8l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 16.8l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" fill="currentColor" /></svg>
                <span>{{ t.home.ob2 }}</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 2.8l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 16.8l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" fill="currentColor" /></svg>
                <span>{{ t.home.ob3a }} <a class="hortun-link" href="https://hortun.com"><span class="hortun-h">H</span>ortun</a>{{ t.home.ob3b }}</span>
              </li>
            </ul>
            <div style="margin-top: 32px; display: flex; flex-wrap: wrap; gap: 14px">
              <a class="btn" href="https://github.com/Add-Stamp-Studio/stampit">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" /></svg>
                {{ t.home.opBtn }}
              </a>
              <a class="btn btn-ghost" href="https://addstamp.studio">{{ t.home.opStudio }}</a>
            </div>
          </div>
        </div>
        <svg class="edge" aria-hidden="true" viewBox="0 0 1440 70" preserveAspectRatio="none">
          <path d="M0 38 C 170 12 330 12 490 34 C 650 56 810 58 970 36 C 1130 14 1290 14 1440 34 L1440 70 L0 70 Z" style="fill: var(--paper)" />
        </svg>
      </section>

      <!-- MOTTO -->
      <section class="section bg-paper clip" aria-labelledby="motto-title">
        <svg class="grain" aria-hidden="true"><rect width="100%" height="100%" filter="url(#grain)" /></svg>
        <div class="wrap" style="--w: 1160px; position: relative; padding-top: 96px; padding-bottom: 120px; text-align: center">
          <p class="hand" style="font-size: 1.85rem; transform: rotate(-3deg)">{{ t.home.moNote }}</p>
          <h2 id="motto-title" style="font-size: clamp(2.8rem, 1.4rem + 5.4vw, 6rem); line-height: 1.06; margin-top: 12px">
            {{ t.home.moA }}<span class="swash">{{ t.home.moB }}<svg aria-hidden="true" viewBox="0 0 300 40" preserveAspectRatio="none"><path d="M4 26 C 60 12 140 10 296 18 C 220 26 120 32 10 36 Z" fill="#fcbc1e" opacity="0.6" filter="url(#wc)" /></svg></span>{{ t.home.moC }}
          </h2>
          <p style="margin: 28px auto 0; max-width: 34em; font-size: 1.125rem; color: var(--muted)">{{ t.home.moText }}</p>
          <div style="margin-top: 34px"><a class="btn btn-lg" href="#stamp">{{ t.home.cta }}</a></div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>
