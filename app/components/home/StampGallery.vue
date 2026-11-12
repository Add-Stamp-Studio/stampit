<script lang="ts" setup>
/**
 * The frames as they stand: the originals before a run, the stamped set after it.
 *
 * Only the first few are decoded into previews; the rest are counted. A gallery of every
 * frame in a 120-frame batch would hold 120 full-size decodes in memory just to be scrolled
 * past.
 */
const props = withDefaults(defineProps<{
  images?: File[];
  stamped?: boolean;
}>(), {
  images: () => [],
  stamped: false
});

const { t, formatNumber } = useLocale();

const GALLERY_LIMIT = 8;

interface Tile {
  url: string;
  name: string;
  width: number;
  height: number;
}

const tiles = ref<Tile[]>([]);
const reading = ref(false);

const hidden = computed(() => Math.max(0, props.images.length - GALLERY_LIMIT));
const shown = computed(() => Math.min(props.images.length, GALLERY_LIMIT));

const read = (file: File): Promise<Tile | null> =>
  new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => resolve({ url, name: file.name, width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    image.src = url;
  });

const release = () => {
  tiles.value.forEach(tile => URL.revokeObjectURL(tile.url));
  tiles.value = [];
};

/** A newer batch can land while an older one is still decoding; only the newest may write. */
let generation = 0;

watch(
  () => props.images,
  async (images) => {
    if (!import.meta.client) return;

    const mine = ++generation;

    release();

    if (images.length === 0) {
      reading.value = false;
      return;
    }

    reading.value = true;

    const read_ = await Promise.all(images.slice(0, GALLERY_LIMIT).map(read));
    const ready = read_.filter((tile): tile is Tile => tile !== null);

    if (mine !== generation) {
      ready.forEach(tile => URL.revokeObjectURL(tile.url));
      return;
    }

    tiles.value = ready;
    reading.value = false;
  },
  { immediate: true }
);

onUnmounted(release);

const megapixels = (tile: Tile) => formatNumber((tile.width * tile.height) / 1e6, 1);
</script>

<template>
  <section aria-labelledby="gallery-title" style="margin-top: 52px">
    <div style="display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 16px">
      <h3 id="gallery-title" style="font-size: 1.75rem; line-height: 1.2">{{ stamped ? t.home.galStamped : t.home.galTitle }}</h3>
      <p class="tnum" style="color: var(--muted); font-size: 15px">
        {{ stamped ? t.home.galNoteDone : t.home.galNote(shown, images.length) }}
      </p>
    </div>

    <p v-if="reading" class="hint" style="margin-top: 22px" role="status">
      <span class="spin" style="vertical-align: middle; margin-right: 10px"></span>{{ t.home.galReading }}
    </p>

    <ul v-else class="gallery">
      <li v-for="(tile, i) in tiles" :key="tile.url" class="tile">
        <div class="tile-img" :class="{ 'is-stamped': stamped }" :style="{ '--i': i }">
          <img :src="tile.url" :alt="tile.name">
          <span v-if="stamped" class="tick" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
          </span>
        </div>
        <p class="tile-name">{{ tile.name }}</p>
        <p class="tile-meta">{{ tile.width }}×{{ tile.height }} · {{ megapixels(tile) }} MP</p>
      </li>
      <li v-if="hidden > 0" class="more-tile">{{ t.home.moreFrames(hidden) }}</li>
    </ul>
  </section>
</template>
