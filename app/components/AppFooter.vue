<script lang="ts" setup>
import addstampDark from '~/assets/logos/addstamp-dark.svg';
import addstampLight from '~/assets/logos/addstamp-light.svg';
import stampitDark from '~/assets/logos/stampit-dark.svg';
import stampitLight from '~/assets/logos/stampit-light.svg';

const { t, localePath, base } = useLocale();

/** The year the page was built: a prerendered © is only ever as new as the last deploy. */
const year = new Date().getFullYear();

const onHome = computed(() => base.value === '/');
</script>

<template>
  <footer class="ft">
    <div class="wrap ft-grid">
      <div>
        <a v-if="onHome" class="ft-logo" href="#top" :aria-label="t.common.logoTop">
          <img class="logo-light" :src="stampitLight" alt="" width="140" height="41">
          <img class="logo-dark" :src="stampitDark" alt="" width="140" height="41">
        </a>
        <NuxtLink v-else class="ft-logo" :to="localePath('/')" :aria-label="t.common.logoHome">
          <img class="logo-light" :src="stampitLight" alt="" width="140" height="41">
          <img class="logo-dark" :src="stampitDark" alt="" width="140" height="41">
        </NuxtLink>
        <p class="ft-tag">{{ t.common.ftTag }}</p>
      </div>

      <nav aria-label="StampIt">
        <p class="ft-head">StampIt</p>
        <ul class="ft-list">
          <li><NuxtLink class="nav-link" :to="`${localePath('/')}#stamp`">{{ t.common.nStamp }}</NuxtLink></li>
          <li><NuxtLink class="nav-link" :to="localePath('/how-to-use')">{{ t.common.ftGuide }}</NuxtLink></li>
          <li><a class="nav-link" href="https://github.com/Add-Stamp-Studio/stampit">{{ t.common.ftSource }}</a></li>
        </ul>
      </nav>

      <nav aria-label="Add Stamp Studio">
        <p class="ft-head">{{ t.common.ftMadeBy }}</p>
        <a class="ft-logo" href="https://addstamp.studio" aria-label="Add Stamp Studio">
          <img class="logo-light" :src="addstampLight" alt="" width="132" height="27">
          <img class="logo-dark" :src="addstampDark" alt="" width="132" height="27">
        </a>
        <ul class="ft-list" style="margin-top: 4px">
          <li><a class="nav-link" href="https://addstamp.studio">addstamp.studio</a></li>
          <li><a class="nav-link" href="https://github.com/Add-Stamp-Studio">GitHub</a></li>
        </ul>
      </nav>

      <nav :aria-label="t.common.ftFollow">
        <p class="ft-head">{{ t.common.ftFollow }}</p>
        <ul class="ft-list">
          <li>
            <a class="nav-link" href="https://github.com/howbizarre">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" /></svg>
              howbizarre
            </a>
          </li>
          <li>
            <a class="nav-link" href="https://x.com/howbizarre">
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" /></svg>
              howbizarre
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <div class="wrap ft-bottom">
      <p>{{ t.common.ftCopy(year) }}</p>
      <p class="ft-motto">{{ t.common.ftLlap }}</p>
    </div>
  </footer>
</template>
