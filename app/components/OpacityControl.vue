<script lang="ts" setup>
/**
 * Stamp opacity as four swatches plus a slider.
 *
 * Each swatch is filled to the strength it stands for, so 25 % looks like 25 % before it is
 * clicked; the slider covers the values in between. The same control drives the studio and
 * the live demo in the guide.
 */
const model = defineModel<number>({ required: true });

const { t } = useLocale();

const PRESETS = [25, 50, 75, 100] as const;

const clamp = (value: number) => Math.min(100, Math.max(1, Math.round(value)));

const onSlide = (event: Event) => {
  model.value = clamp(Number((event.target as HTMLInputElement).value));
};
</script>

<template>
  <div class="kv-list" style="gap: 8px">
    <div class="op-grid" role="group" :aria-label="t.home.opacity">
      <button v-for="preset in PRESETS"
              :key="preset"
              type="button"
              class="op-btn"
              :aria-pressed="model === preset"
              @click="model = preset">
        <span class="op-sw checker" aria-hidden="true"><span :style="{ opacity: preset / 100 }"></span></span>
        <span>{{ preset }} %</span>
      </button>
    </div>

    <label class="range-row">
      <span>{{ t.home.opacity }}</span>
      <input class="range" type="range" min="1" max="100" step="1" :value="model" @input="onSlide">
      <output>{{ model }} %</output>
    </label>
  </div>
</template>
