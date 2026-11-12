<script lang="ts" setup>
/**
 * Panel 1: the photos to stamp.
 *
 * Empty, it is one big dropzone — a <label> for a hidden file input, so a click, Enter or
 * Space opens the picker and a drop lands in the same place. Loaded, it shows a filmstrip of
 * the first few frames, the totals, and the caption switch.
 */
const props = withDefaults(defineProps<{
  images?: File[];
  addFilename?: boolean;
  busy?: boolean;
}>(), {
  images: () => [],
  addFilename: true,
  busy: false
});

const emit = defineEmits<{
  select: [files: File[]];
  clear: [];
  'update:addFilename': [value: boolean];
}>();

const { t, fileSize } = useLocale();

/** How many frames the filmstrip shows before it collapses into a count. */
const STRIP_LIMIT = 8;

const inputId = useId();
const isOver = ref(false);
const previews = ref<{ url: string; name: string }[]>([]);

const loaded = computed(() => props.images.length > 0);
const totalSize = computed(() => props.images.reduce((sum, file) => sum + file.size, 0));
const hiddenCount = computed(() => Math.max(0, props.images.length - STRIP_LIMIT));

const largest = computed(() =>
  props.images.reduce<File | null>((max, file) => (!max || file.size > max.size ? file : max), null)
);

const release = () => {
  previews.value.forEach(preview => URL.revokeObjectURL(preview.url));
  previews.value = [];
};

/**
 * Only the first few frames get an object URL. The gallery below decodes its own; handing
 * the strip the whole set would decode a second full-size copy of each, which on a big batch
 * is the difference between a working tab and a dead one.
 */
watch(
  () => props.images,
  (images) => {
    if (!import.meta.client) return;

    release();
    previews.value = images.slice(0, STRIP_LIMIT).map(file => ({ url: URL.createObjectURL(file), name: file.name }));
  },
  { immediate: true }
);

onUnmounted(release);

const onChange = (event: Event) => {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files.length > 0) {
    emit('select', Array.from(input.files));
  }

  // Cleared so picking the same folder twice still fires.
  input.value = '';
};

const onDrop = (event: DragEvent) => {
  isOver.value = false;

  const images = Array.from(event.dataTransfer?.files ?? []).filter(file => file.type.startsWith('image/'));

  if (images.length > 0) {
    emit('select', images);
  }
};

const onDragLeave = (event: DragEvent) => {
  const current = event.currentTarget as HTMLElement | null;

  if (current && !current.contains(event.relatedTarget as Node)) {
    isOver.value = false;
  }
};
</script>

<template>
  <section class="panel" aria-labelledby="frames-title">
    <div class="panel-head">
      <h3 id="frames-title" class="panel-title">
        <span class="num" aria-hidden="true" style="background: rgba(185, 198, 133, 0.6)">1</span>{{ t.home.framesTitle }}
      </h3>
      <div v-if="loaded" class="panel-tools">
        <span class="chip tnum">{{ t.home.selected(images.length) }}</span>
        <button type="button" class="btn btn-sm btn-ghost" :disabled="busy" @click="emit('clear')">{{ t.home.clear }}</button>
      </div>
    </div>

    <input :id="inputId"
           type="file"
           class="sr-only"
           multiple
           accept="image/*"
           :disabled="busy"
           @change="onChange">

    <label v-if="!loaded"
           class="dz"
           :class="{ 'is-over': isOver }"
           :for="inputId"
           @dragenter.prevent="isOver = true"
           @dragover.prevent
           @dragleave.prevent="onDragLeave"
           @drop.prevent="onDrop">
      <span class="dz-face">
        <svg class="dz-ill" viewBox="0 0 190 116" width="190" height="116" aria-hidden="true">
          <ellipse cx="92" cy="104" rx="80" ry="11" fill="#b9c685" opacity="0.5" filter="url(#wcSoft)" />
          <g class="fan fan-a"><g transform="translate(14 34) rotate(-10)"><rect width="66" height="60" rx="3" fill="#fffdf7" stroke="#e4dacb" /><use href="#sc2" x="4" y="4" width="58" height="43.5" /></g></g>
          <g class="fan fan-c"><g transform="translate(104 26) rotate(10)"><rect width="66" height="60" rx="3" fill="#fffdf7" stroke="#e4dacb" /><use href="#sc6" x="4" y="4" width="58" height="43.5" /></g></g>
          <g class="fan fan-b"><g transform="translate(56 18)"><rect width="72" height="66" rx="3" fill="#fffdf7" stroke="#e4dacb" /><use href="#sc1" x="4" y="4" width="64" height="48" /></g></g>
          <g transform="translate(160 84)">
            <circle r="18" style="fill: var(--accent)" filter="url(#wc)" />
            <path d="M0 -8 V7 M-6 1 L0 7 L6 1" fill="none" stroke="#fffdf8" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
          </g>
        </svg>
        <span class="dz-title">{{ t.home.dropFrames }}</span>
        <span class="dz-link">{{ t.home.pickDisk }}</span>
        <span class="hint">{{ t.home.framesHint }}</span>
      </span>
    </label>

    <template v-else>
      <div class="strip" role="list" :aria-label="t.home.stripAria">
        <img v-for="preview in previews"
             :key="preview.url"
             role="listitem"
             :src="preview.url"
             :alt="preview.name">
        <span v-if="hiddenCount > 0" class="strip-more tnum">+{{ hiddenCount }}</span>
      </div>

      <div class="kv-list">
        <p class="kv"><span>{{ t.home.kTotal }}</span><span>{{ t.home.vTotal(images.length, fileSize(totalSize)) }}</span></p>
        <p v-if="largest" class="kv"><span>{{ t.home.kLargest }}</span><span>{{ largest.name }} · {{ fileSize(largest.size) }}</span></p>
      </div>

      <label class="switch" style="margin-top: auto">
        <input type="checkbox"
               :checked="addFilename"
               :disabled="busy"
               @change="emit('update:addFilename', ($event.target as HTMLInputElement).checked)">
        <span>{{ t.home.filenameSwitch }}</span>
      </label>
    </template>
  </section>
</template>
