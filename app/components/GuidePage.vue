<script lang="ts" setup>
/**
 * The guide, in whichever language the URL names. pages/how-to-use.vue and
 * pages/bg/how-to-use.vue both render this.
 *
 * Every step is one column of prose and one picture of the control it describes, drawn from
 * the same pieces as the studio rather than screenshotted: screenshots go stale, and they are
 * wrong in one of the two themes. Step three is the real opacity control.
 */
const { t, locale, localePath } = useLocale();

const engineVersion = useRuntimeConfig().public.engineVersion as string;

/** Live, so step three demonstrates the control instead of picturing it. */
const demoOpacity = ref(75);

usePageSeo({
  title: t.value.guide.seoTitle,
  description: t.value.guide.seoDescription,
  base: '/how-to-use',
  locale: locale.value
});

/**
 * The same five steps, in the shape search engines read them. Built from the page's own
 * words, so a rewritten step cannot leave a stale HowTo behind.
 */
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: t.value.guide.ldName,
      description: t.value.guide.ldDescription,
      inLanguage: locale.value,
      totalTime: 'PT2M',
      tool: [{ '@type': 'HowToTool', name: t.value.guide.ldTool }],
      step: [1, 2, 3, 4, 5].map((n) => {
        const g = t.value.guide as unknown as Record<string, string>;

        return { '@type': 'HowToStep', name: g[`g${n}t`], text: g[`g${n}p1`] };
      })
    })
  }]
});

const home = computed(() => localePath('/'));

const nav = computed(() => [
  { label: t.value.common.nStamp, to: home.value },
  { label: t.value.guide.nSteps, to: '#steps' },
  { label: t.value.guide.nFaq, to: '#faq' },
  { label: t.value.guide.nHood, to: '#hood' }
]);

const cta = computed(() => ({ label: t.value.guide.cta, to: home.value }));

const faq = computed(() => {
  const g = t.value.guide;

  return [
    { title: g.f1t, text: g.f1d, icon: 'home' },
    { title: g.f2t, text: g.f2d, icon: 'file' },
    { title: g.f3t, text: g.f3d, icon: 'caption' },
    { title: g.f4t, text: g.f4d, icon: 'shield' },
    { title: g.f5t, text: g.f5d, icon: 'stack' },
    { title: g.f6t, text: g.f6d, icon: 'theme' }
  ];
});

const STAR = 'M12 2.8l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 16.8l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z';
</script>

<template>
  <div id="top">
    <a class="skip" href="#main">{{ t.common.skip }}</a>

    <AppHeader :links="nav" :home-to="home" :cta="cta" />

    <main id="main">
      <!-- HERO -->
      <section class="section bg-paper clip" aria-labelledby="hero-title">
        <svg class="grain" aria-hidden="true"><rect width="100%" height="100%" filter="url(#grain)" /></svg>

        <div class="leaves" aria-hidden="true">
          <span class="leaf" style="left: 20%; --d: 20s; --delay: -4s"><svg viewBox="0 0 20 24" width="16" height="19"><path d="M10 1 C 19 7 19 17 10 23 C 1 17 1 7 10 1 Z" fill="#e3702f" /><path d="M10 3 V21" stroke="#9b4a1d" stroke-width="1" /></svg></span>
          <span class="leaf" style="left: 48%; --d: 23s; --delay: -12s"><svg viewBox="0 0 26 30" width="20" height="23"><rect x="2" y="2" width="22" height="26" rx="2" fill="#fffdf7" stroke="#e4dacb" /><rect x="5" y="5" width="16" height="13" fill="#b9d3e6" /></svg></span>
          <span class="leaf" style="left: 70%; --d: 18s; --delay: -7s"><svg viewBox="0 0 20 24" width="15" height="18"><path d="M10 1 C 19 7 19 17 10 23 C 1 17 1 7 10 1 Z" fill="#fcbc1e" /><path d="M10 3 V21" stroke="#b88512" stroke-width="1" /></svg></span>
          <span class="leaf" style="left: 90%; --d: 21s; --delay: -16s"><svg viewBox="0 0 20 24" width="16" height="19"><path d="M10 1 C 19 7 19 17 10 23 C 1 17 1 7 10 1 Z" fill="#b9c685" /><path d="M10 3 V21" stroke="#6d8a3e" stroke-width="1" /></svg></span>
        </div>

        <div class="wrap hero-grid">
          <div class="hero-text" style="padding-bottom: 96px">
            <p class="eyebrow">{{ t.guide.heroEyebrow }}</p>
            <h1 id="hero-title" class="title-xl">{{ t.guide.heroTitle }}</h1>
            <p class="hero-lead">{{ t.guide.heroLead }}</p>
            <div class="hero-actions">
              <NuxtLink class="btn" :to="home">{{ t.guide.cta }}</NuxtLink>
              <a class="link-arrow" href="#steps">
                {{ t.guide.heroLink }}
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
              </a>
            </div>
            <ul class="hero-chips" :aria-label="t.guide.chipsAria">
              <li class="chip"><span class="chip-dot" style="color: #3e9a9c"></span>image-stamper v{{ engineVersion }}</li>
              <li class="chip">jpg · q75</li>
              <li class="chip">{{ t.guide.chipMp }}</li>
              <li class="chip">{{ t.guide.chipPng }}</li>
            </ul>
          </div>
          <div class="hero-art">
            <GuideHeroArt />
          </div>
        </div>

        <p class="wrap hero-caption" aria-hidden="true">DSC_4821_stamped.jpg · 6000×4000 · jpg q75</p>

        <svg aria-hidden="true" viewBox="0 0 1440 70" preserveAspectRatio="none" class="edge-flow" style="margin-top: 4px">
          <path d="M0 34 C 160 8 300 10 440 30 C 600 52 760 56 900 34 C 1040 14 1200 12 1440 38 L1440 70 L0 70 Z" style="fill: var(--band)" />
        </svg>
      </section>

      <!-- THE FIVE STEPS -->
      <section id="steps" class="section bg-band" aria-labelledby="steps-title" style="margin-top: -1px">
        <div class="wrap g-steps" style="padding-top: 40px; padding-bottom: 140px">
          <div class="center-head" style="margin-bottom: 64px">
            <p class="eyebrow">{{ t.guide.stEyebrow }}</p>
            <h2 id="steps-title" class="title-lg">{{ t.guide.stTitle }}</h2>
          </div>

          <!-- 01 · Frames -->
          <article class="g-step" aria-labelledby="g1-title">
            <div class="g-text">
              <div class="g-head">
                <span class="g-num" aria-hidden="true"><svg viewBox="0 0 76 76"><circle cx="38" cy="38" r="34" fill="#b9c685" opacity="0.6" filter="url(#wc)" /></svg><span>01</span></span>
                <div><p class="eyebrow">{{ t.guide.st1 }}</p><h2 id="g1-title">{{ t.guide.g1t }}</h2></div>
              </div>
              <p>{{ t.guide.g1p1 }}</p>
              <p>{{ t.guide.g1p2 }}</p>
              <ul class="points g-points">
                <li v-for="point in [t.guide.g1b1, t.guide.g1b2, t.guide.g1b3]" :key="point"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path :d="STAR" fill="currentColor" /></svg><span>{{ point }}</span></li>
              </ul>
            </div>
            <div class="g-vis" aria-hidden="true">
              <div class="panel">
                <div class="dz-static">
                  <svg viewBox="0 0 190 100" width="170" height="90" style="overflow: visible">
                    <ellipse cx="95" cy="92" rx="76" ry="9" fill="#b9c685" opacity="0.5" filter="url(#wcSoft)" />
                    <g transform="translate(18 28) rotate(-10)"><rect width="62" height="56" rx="3" fill="#fffdf7" stroke="#e4dacb" /><use href="#sc2" x="4" y="4" width="54" height="40.5" /></g>
                    <g transform="translate(108 22) rotate(10)"><rect width="62" height="56" rx="3" fill="#fffdf7" stroke="#e4dacb" /><use href="#sc6" x="4" y="4" width="54" height="40.5" /></g>
                    <g transform="translate(60 14)"><rect width="70" height="64" rx="3" fill="#fffdf7" stroke="#e4dacb" /><use href="#sc1" x="4" y="4" width="62" height="46.5" /></g>
                  </svg>
                  <p style="margin-top: 4px; font-size: 16px; font-weight: 800; color: var(--ink)">{{ t.guide.v1drop }}</p>
                  <p style="font-size: 14px; font-weight: 700; color: var(--accent-ink)">{{ t.guide.v1pick }}</p>
                  <p style="font-size: 12.5px; color: var(--muted)">jpg · png · webp</p>
                </div>
                <div class="strip g-strip">
                  <svg viewBox="0 0 160 120"><use href="#sc1" /></svg>
                  <svg viewBox="0 0 160 120"><use href="#sc3" /></svg>
                  <svg viewBox="0 0 160 120"><use href="#sc7" /></svg>
                  <svg viewBox="0 0 160 120"><use href="#sc4" /></svg>
                  <span class="strip-more">+116</span>
                </div>
                <p class="kv"><span>{{ t.guide.kTotal }}</span><span>{{ t.guide.vTotal }}</span></p>
              </div>
            </div>
          </article>

          <svg class="g-link" aria-hidden="true" viewBox="0 0 120 90" width="120" height="90"><path d="M60 4 C 18 26 102 56 60 86" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="2 9" style="stroke: var(--accent)" /></svg>

          <!-- 02 · Stamp -->
          <article class="g-step flip" aria-labelledby="g2-title">
            <div class="g-text">
              <div class="g-head">
                <span class="g-num" aria-hidden="true"><svg viewBox="0 0 76 76"><circle cx="38" cy="38" r="34" fill="#93b6d6" opacity="0.6" filter="url(#wc)" /></svg><span>02</span></span>
                <div><p class="eyebrow">{{ t.guide.st2 }}</p><h2 id="g2-title">{{ t.guide.g2t }}</h2></div>
              </div>
              <p>{{ t.guide.g2p1 }}</p>
              <p>{{ t.guide.g2p2 }}</p>
              <ul class="points g-points">
                <li v-for="point in [t.guide.g2b1, t.guide.g2b2, t.guide.g2b3]" :key="point"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path :d="STAR" fill="currentColor" /></svg><span>{{ point }}</span></li>
              </ul>
            </div>
            <div class="g-vis">
              <div class="panel">
                <div class="checker preview-box" style="min-height: 170px">
                  <svg viewBox="0 0 240 90" role="img" :aria-label="t.guide.previewAria"><use href="#mark" /></svg>
                </div>
                <div class="kv-list">
                  <p class="kv"><span>{{ t.guide.kSize }}</span><span>1200×450 · {{ t.guide.vKb }}</span></p>
                  <p class="kv"><span>{{ t.guide.kPos }}</span><span>{{ t.guide.vPos }}</span></p>
                </div>
              </div>
            </div>
          </article>

          <svg class="g-link" aria-hidden="true" viewBox="0 0 120 90" width="120" height="90"><path d="M60 4 C 102 26 18 56 60 86" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="2 9" style="stroke: var(--accent)" /></svg>

          <!-- 03 · Opacity, live -->
          <article class="g-step" aria-labelledby="g3-title">
            <div class="g-text">
              <div class="g-head">
                <span class="g-num" aria-hidden="true"><svg viewBox="0 0 76 76"><circle cx="38" cy="38" r="34" fill="#fcbc1e" opacity="0.5" filter="url(#wc)" /></svg><span>03</span></span>
                <div><p class="eyebrow">{{ t.guide.st3 }}</p><h2 id="g3-title">{{ t.guide.g3t }}</h2></div>
              </div>
              <p>{{ t.guide.g3p1 }}</p>
              <p>{{ t.guide.g3p2 }}</p>
              <ul class="points g-points">
                <li v-for="point in [t.guide.g3b1, t.guide.g3b2]" :key="point"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path :d="STAR" fill="currentColor" /></svg><span>{{ point }}</span></li>
              </ul>
            </div>
            <div class="g-vis">
              <p class="hand g-note" aria-hidden="true">{{ t.guide.v3note }}</p>
              <div class="panel">
                <div class="checker preview-box" style="min-height: 140px">
                  <svg viewBox="0 0 240 90" aria-hidden="true" :style="{ opacity: Math.max(demoOpacity, 5) / 100 }"><use href="#mark" /></svg>
                </div>
                <OpacityControl v-model="demoOpacity" />
              </div>
            </div>
          </article>

          <svg class="g-link" aria-hidden="true" viewBox="0 0 120 90" width="120" height="90"><path d="M60 4 C 18 26 102 56 60 86" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="2 9" style="stroke: var(--accent)" /></svg>

          <!-- 04 · Apply -->
          <article class="g-step flip" aria-labelledby="g4-title">
            <div class="g-text">
              <div class="g-head">
                <span class="g-num" aria-hidden="true"><svg viewBox="0 0 76 76"><circle cx="38" cy="38" r="34" fill="#ee6f52" opacity="0.45" filter="url(#wc)" /></svg><span>04</span></span>
                <div><p class="eyebrow">{{ t.guide.st4 }}</p><h2 id="g4-title">{{ t.guide.g4t }}</h2></div>
              </div>
              <p>{{ t.guide.g4p1 }}</p>
              <p>{{ t.guide.g4p2 }}</p>
              <ul class="points g-points">
                <li v-for="point in [t.guide.g4b1, t.guide.g4b2]" :key="point"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path :d="STAR" fill="currentColor" /></svg><span>{{ point }}</span></li>
              </ul>
            </div>
            <div class="g-vis" aria-hidden="true">
              <div class="panel">
                <div style="display: flex; align-items: center; gap: 16px">
                  <span class="fox-av">
                    <svg viewBox="0 0 76 76" width="76" height="76">
                      <circle cx="38" cy="40" r="34" fill="#fcbc1e" opacity="0.4" filter="url(#wc)" />
                      <g class="bob"><use href="#foxHead" x="6" y="8" width="64" height="61" /></g>
                    </svg>
                  </span>
                  <div style="flex: 1; min-width: 0">
                    <div style="display: flex; align-items: center; gap: 12px">
                      <h3 style="font-size: 1.4rem; line-height: 1.2">{{ t.guide.v4title }}</h3>
                      <span class="spin"></span>
                    </div>
                    <div class="bar" style="margin-top: 10px"><span style="width: 64%"></span></div>
                    <p class="tnum" style="margin-top: 6px; font-size: 13px; color: var(--muted)">77 / 120 · DSC_4877.jpg</p>
                  </div>
                </div>
                <span class="chip chip-ok" style="align-self: flex-start"><span class="chip-dot"></span>{{ t.guide.v4done }}</span>
              </div>
            </div>
          </article>

          <svg class="g-link" aria-hidden="true" viewBox="0 0 120 90" width="120" height="90"><path d="M60 4 C 102 26 18 56 60 86" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="2 9" style="stroke: var(--accent)" /></svg>

          <!-- 05 · Take the batch -->
          <article class="g-step" aria-labelledby="g5-title">
            <div class="g-text">
              <div class="g-head">
                <span class="g-num" aria-hidden="true"><svg viewBox="0 0 76 76"><circle cx="38" cy="38" r="34" fill="#8a82e0" opacity="0.45" filter="url(#wc)" /></svg><span>05</span></span>
                <div><p class="eyebrow">{{ t.guide.st5 }}</p><h2 id="g5-title">{{ t.guide.g5t }}</h2></div>
              </div>
              <p>{{ t.guide.g5p1 }}</p>
              <p>{{ t.guide.g5p2 }}</p>
              <ul class="points g-points">
                <li v-for="point in [t.guide.g5b1, t.guide.g5b2, t.guide.g5b3]" :key="point"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path :d="STAR" fill="currentColor" /></svg><span>{{ point }}</span></li>
              </ul>
            </div>
            <div class="g-vis" aria-hidden="true">
              <div class="panel">
                <div class="g-tiles">
                  <div v-for="scene in ['#sc1', '#sc3', '#sc2', '#sc6']" :key="scene" class="g-tile">
                    <svg viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice"><use :href="scene" /></svg>
                    <svg class="g-tile-mark" viewBox="0 0 240 90" style="opacity: 0.75"><use href="#mark" /></svg>
                    <span class="g-tick"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></span>
                  </div>
                </div>
                <div class="kv-list">
                  <p class="kv"><span>{{ t.guide.kArchive }}</span><span>stamped-images-1758…zip</span></p>
                  <p class="kv"><span>{{ t.guide.kInside }}</span><span>stamped-images/</span></p>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 8px">
                  <span class="btn btn-fake">{{ t.guide.v5folder }}</span>
                  <span class="btn btn-soft btn-fake">{{ t.guide.v5zip }}</span>
                </div>
              </div>
            </div>
          </article>
        </div>
        <svg class="edge" aria-hidden="true" viewBox="0 0 1440 70" preserveAspectRatio="none">
          <path d="M0 30 C 140 54 300 58 460 36 C 620 14 780 10 940 32 C 1100 54 1280 52 1440 26 L1440 70 L0 70 Z" style="fill: var(--night)" />
        </svg>
      </section>

      <!-- GOOD TO KNOW, UNDER THE STARS -->
      <section id="faq" class="section bg-night clip" aria-labelledby="faq-title">
        <NightScene moon="right" />
        <div class="wrap" style="position: relative; padding-top: 110px; padding-bottom: clamp(210px, 19vw, 280px)">
          <div class="center-head">
            <p class="eyebrow" style="color: #fcd977">{{ t.guide.faqEyebrow }}</p>
            <h2 id="faq-title" class="title-lg night-title">{{ t.guide.faqTitle }}</h2>
          </div>
          <ul class="cards" style="--min: 300px">
            <li v-for="item in faq" :key="item.icon" class="card" style="padding: 26px 24px">
              <span class="card-icon" style="width: 50px; height: 50px">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <template v-if="item.icon === 'home'"><path d="M4 11l8-7 8 7v9H4z" /><path d="M10 20v-6h4v6" /></template>
                  <template v-else-if="item.icon === 'file'"><path d="M6 3.5h8l4 4v13H6z" /><path d="M14 3.5v4h4" /><path d="M9 14h6M9 17h4" /></template>
                  <template v-else-if="item.icon === 'caption'"><path d="M8 15l4-10 4 10" /><path d="M9.5 11.5h5" /><path d="M5 19.5h14" /></template>
                  <template v-else-if="item.icon === 'shield'"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="M9 12l2 2 4-4" /></template>
                  <template v-else-if="item.icon === 'stack'"><path d="M12 3.5l8.5 4.5-8.5 4.5-8.5-4.5z" /><path d="M3.5 12l8.5 4.5 8.5-4.5" /><path d="M3.5 16l8.5 4.5 8.5-4.5" /></template>
                  <template v-else><circle cx="12" cy="12" r="8.5" /><path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" /></template>
                </svg>
              </span>
              <h3 style="font-size: 1.05rem; margin-top: 14px">{{ item.title }}</h3>
              <p style="font-size: 0.92rem; line-height: 1.6">{{ item.text }}</p>
            </li>
          </ul>
        </div>
        <svg class="edge" aria-hidden="true" viewBox="0 0 1440 70" preserveAspectRatio="none">
          <path d="M0 36 C 180 10 320 12 480 32 C 640 52 800 56 960 34 C 1120 12 1280 14 1440 40 L1440 70 L0 70 Z" style="fill: var(--paper)" />
        </svg>
      </section>

      <!-- UNDER THE HOOD -->
      <section id="hood" class="section bg-paper clip" aria-labelledby="hood-title">
        <svg class="grain" aria-hidden="true"><rect width="100%" height="100%" filter="url(#grain)" /></svg>
        <div class="wrap hood" style="position: relative">
          <div style="flex: 1 1 380px; min-width: 0; max-width: 500px">
            <p class="eyebrow">{{ t.guide.hoodEyebrow }}</p>
            <h2 id="hood-title" class="title-lg">{{ t.guide.hoodTitle }}</h2>
            <p style="margin-top: 18px; color: var(--muted)">{{ t.guide.hoodText }}</p>
            <p class="hand" aria-hidden="true" style="margin-top: 26px; font-size: 1.7rem; line-height: 1.1; transform: rotate(-3deg); transform-origin: left center">
              {{ t.guide.hoodNote }}
              <svg viewBox="0 0 90 40" width="90" height="40" style="vertical-align: middle; margin-left: 6px; overflow: visible"><path d="M4 26 C 28 34 56 30 80 14" fill="none" stroke-width="2.2" stroke-linecap="round" style="stroke: var(--accent-ink)" /><path d="M68 12 L82 13 L76 26" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="stroke: var(--accent-ink)" /></svg>
            </p>
          </div>
          <div class="panel" style="flex: 1 1 440px; min-width: 0; padding: 28px 30px">
            <dl class="hood-dl">
              <div class="kv"><dt>{{ t.guide.dEngine }}</dt><dd>@howbizarre/image-stamper v{{ engineVersion }} · Rust / WebAssembly</dd></div>
              <div class="kv"><dt>{{ t.guide.dOutput }}</dt><dd>{{ t.guide.vOutput }}</dd></div>
              <div class="kv"><dt>{{ t.guide.dPad }}</dt><dd>10 px</dd></div>
              <div class="kv"><dt>{{ t.guide.dCap }}</dt><dd>{{ t.guide.vCap }}</dd></div>
              <div class="kv"><dt>{{ t.guide.dFrame }}</dt><dd>120 MP · 65 535 px</dd></div>
              <div class="kv"><dt>{{ t.guide.dStamp }}</dt><dd>10 MB png</dd></div>
              <div class="kv"><dt>{{ t.guide.dArchive }}</dt><dd>{{ t.guide.vArchive }}</dd></div>
            </dl>
          </div>
        </div>
        <svg class="edge" aria-hidden="true" viewBox="0 0 1440 70" preserveAspectRatio="none">
          <path d="M0 38 C 170 12 330 12 490 34 C 650 56 810 58 970 36 C 1130 14 1290 14 1440 34 L1440 70 L0 70 Z" style="fill: var(--band)" />
        </svg>
      </section>

      <!-- OUT -->
      <section class="section bg-band" aria-labelledby="out-title">
        <div class="wrap" style="--w: 1100px; padding-top: 56px; padding-bottom: 110px; display: flex; flex-direction: column; align-items: center; text-align: center">
          <span class="fox-av" aria-hidden="true" style="width: 96px; height: 96px">
            <svg viewBox="0 0 76 76" width="96" height="96">
              <circle cx="38" cy="40" r="34" fill="#fcbc1e" opacity="0.4" filter="url(#wc)" />
              <g class="hop-loop"><use href="#foxHead" x="6" y="8" width="64" height="61" /></g>
            </svg>
          </span>
          <p class="hand" style="margin-top: 14px; font-size: 1.85rem; transform: rotate(-3deg)">{{ t.guide.outNote }}</p>
          <h2 id="out-title" style="font-size: clamp(2.4rem, 1.3rem + 4vw, 4.6rem); line-height: 1.08; margin-top: 10px">
            {{ t.guide.outA }}<span class="swash">{{ t.guide.outB }}<svg aria-hidden="true" viewBox="0 0 300 40" preserveAspectRatio="none"><path d="M4 26 C 60 12 140 10 296 18 C 220 26 120 32 10 36 Z" fill="#fcbc1e" opacity="0.6" filter="url(#wc)" /></svg></span>{{ t.guide.outC }}
          </h2>
          <p style="margin: 24px auto 0; max-width: 34em; font-size: 1.125rem; color: var(--muted)">{{ t.guide.outText }}</p>
          <div style="margin-top: 32px"><NuxtLink class="btn btn-lg" :to="home">{{ t.guide.cta }}</NuxtLink></div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>
