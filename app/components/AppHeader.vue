<script lang="ts" setup>
import stampitDark from '~/assets/logos/stampit-dark.svg';
import stampitLight from '~/assets/logos/stampit-light.svg';
import type { Locale } from '~/composables/useLocale';

export interface NavItem {
  label: string;
  to: string;
}

/**
 * The sticky masthead: wordmark, the page's own sections, language, theme and the one call
 * to action. Below 980 px the links fold into a menu.
 */
const props = defineProps<{
  /** The links in the bar; each page names its own sections. */
  links: NavItem[];
  /** Where the wordmark goes: the top of this page, or the home page from elsewhere. */
  homeTo: string;
  cta: NavItem;
}>();

const { t, locale, switchPath } = useLocale();
const { toggle } = useTheme();

const langOpen = ref(false);
const menuOpen = ref(false);
const langAnchor = ref<HTMLElement | null>(null);

const languages = computed(() =>
  (Object.keys(LOCALES) as Locale[]).map(code => ({
    code,
    name: LOCALES[code].name,
    to: switchPath(code),
    current: code === locale.value
  }))
);

/** In-page anchors scroll; the menu has done its job either way. */
const closeAll = () => {
  langOpen.value = false;
  menuOpen.value = false;
};

const onDocumentClick = (event: MouseEvent) => {
  if (langOpen.value && langAnchor.value && !langAnchor.value.contains(event.target as Node)) {
    langOpen.value = false;
  }
};

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') closeAll();
};

watch([langOpen, menuOpen], ([lang, menu]) => {
  if (!import.meta.client) return;

  const listening = lang || menu;

  document.removeEventListener('click', onDocumentClick);
  document.removeEventListener('keydown', onKeydown);

  if (listening) {
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onKeydown);
  }
});

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick);
  document.removeEventListener('keydown', onKeydown);
});

/** Hash links stay plain anchors: NuxtLink would route to them, which is not what a jump is. */
const isHash = (to: string) => to.startsWith('#');

const ctaIsHash = computed(() => isHash(props.cta.to));
</script>

<template>
  <header class="hdr">
    <div class="wrap hdr-inner">
      <NuxtLink v-if="!isHash(homeTo)" class="hdr-logo" :to="homeTo" :aria-label="t.common.logoHome">
        <img class="logo-light" :src="stampitLight" alt="" width="150" height="44">
        <img class="logo-dark" :src="stampitDark" alt="" width="150" height="44">
      </NuxtLink>
      <a v-else class="hdr-logo" :href="homeTo" :aria-label="t.common.logoHome">
        <img class="logo-light" :src="stampitLight" alt="" width="150" height="44">
        <img class="logo-dark" :src="stampitDark" alt="" width="150" height="44">
      </a>

      <nav class="nav-links" :aria-label="t.common.navMain">
        <template v-for="link in links" :key="link.to">
          <a v-if="isHash(link.to)" class="nav-link" :href="link.to">{{ link.label }}</a>
          <NuxtLink v-else class="nav-link" :to="link.to">{{ link.label }}</NuxtLink>
        </template>
      </nav>

      <div class="nav-actions">
        <div ref="langAnchor" class="menu-anchor">
          <button type="button"
                  class="icon-btn"
                  :aria-expanded="langOpen"
                  aria-haspopup="true"
                  :aria-label="t.common.langAria"
                  @click="langOpen = !langOpen">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.6 2.6 3.8 5.6 3.8 9s-1.2 6.4-3.8 9c-2.6-2.6-3.8-5.6-3.8-9S9.4 5.6 12 3z" /></svg>
            <span class="lang-label">{{ t.common.langLabel }}</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
          </button>

          <!-- Links, not buttons: each language is its own page, with its own address. -->
          <div v-if="langOpen" class="menu" :aria-label="t.common.langMenu">
            <NuxtLink v-for="lang in languages"
                      :key="lang.code"
                      class="menu-item"
                      :to="lang.to"
                      :lang="lang.code"
                      :hreflang="lang.code"
                      :aria-current="lang.current ? 'page' : undefined"
                      @click="closeAll">
              <span>{{ lang.name }}</span>
              <svg v-if="lang.current" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            </NuxtLink>
          </div>
        </div>

        <!-- Which way it points is CSS, not state: the HTML is prerendered in one theme, and
             the .dark class from the boot script is already right before anything hydrates. -->
        <button type="button" class="icon-btn" style="padding: 0" @click="toggle">
          <svg class="dark-only" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
          <svg class="light-only" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" /></svg>
          <span class="sr-only light-only">{{ t.common.themeToDark }}</span>
          <span class="sr-only dark-only">{{ t.common.themeToLight }}</span>
        </button>

        <a v-if="ctaIsHash" class="btn nav-cta" :href="cta.to">{{ cta.label }}</a>
        <NuxtLink v-else class="btn nav-cta" :to="cta.to">{{ cta.label }}</NuxtLink>

        <button type="button"
                class="icon-btn nav-burger"
                :aria-expanded="menuOpen"
                :aria-label="menuOpen ? t.common.menuClose : t.common.menuOpen"
                @click="menuOpen = !menuOpen">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
      </div>
    </div>

    <nav v-if="menuOpen" class="mobile-nav" :aria-label="t.common.navMobile">
      <template v-for="link in links" :key="link.to">
        <a v-if="isHash(link.to)" class="nav-link" :href="link.to" @click="closeAll">{{ link.label }}</a>
        <NuxtLink v-else class="nav-link" :to="link.to" @click="closeAll">{{ link.label }}</NuxtLink>
      </template>
      <a v-if="ctaIsHash" class="btn" :href="cta.to" @click="closeAll">{{ cta.label }}</a>
      <NuxtLink v-else class="btn" :to="cta.to" @click="closeAll">{{ cta.label }}</NuxtLink>
    </nav>
  </header>
</template>
