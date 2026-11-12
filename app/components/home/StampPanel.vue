<script lang="ts" setup>
/**
 * Panel 2: the mark.
 *
 * One PNG, checked here before it reaches the engine: the name, the actual bytes' type and
 * the size. The preview sits on a checkerboard, not on the paper — most stamps are white,
 * and the alpha channel is the thing worth seeing.
 */
const props = withDefaults(defineProps<{
  stamp?: File | null;
  busy?: boolean;
}>(), {
  stamp: null,
  busy: false
});

const opacity = defineModel<number>('opacity', { required: true });

const emit = defineEmits<{
  select: [file: File];
  remove: [];
}>();

const { t, fileSize } = useLocale();

/** One number, shown in the hint and enforced in validate(). Whole megabytes, so the label reads "10 MB", not "10.0 MB". */
const MAX_STAMP_MB = 10;
const MAX_STAMP_BYTES = MAX_STAMP_MB * 1024 * 1024;
const MAX_STAMP_LABEL = `${MAX_STAMP_MB} MB`;

const inputId = useId();
const isOver = ref(false);
const previewUrl = ref<string | null>(null);
const dimensions = ref<{ width: number; height: number } | null>(null);
const error = ref('');

watch(
  () => props.stamp,
  (file) => {
    if (!import.meta.client) return;

    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);

    previewUrl.value = null;
    dimensions.value = null;

    if (!file) return;

    error.value = '';
    previewUrl.value = URL.createObjectURL(file);

    const image = new Image();

    image.onload = () => {
      dimensions.value = { width: image.naturalWidth, height: image.naturalHeight };
    };
    image.src = previewUrl.value;
  },
  { immediate: true }
);

onUnmounted(() => {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
});

const validate = (file: File): boolean => {
  if (!file.name.toLowerCase().endsWith('.png')) {
    error.value = t.value.home.errNotPng(file.name);
    return false;
  }

  if (file.type !== 'image/png') {
    error.value = t.value.home.errNotPngData(file.name);
    return false;
  }

  if (file.size > MAX_STAMP_BYTES) {
    error.value = t.value.home.errTooBig(fileSize(file.size), MAX_STAMP_LABEL);
    return false;
  }

  error.value = '';
  return true;
};

const take = (file: File | undefined) => {
  if (file && validate(file)) emit('select', file);
};

const onChange = (event: Event) => {
  const input = event.target as HTMLInputElement;

  take(input.files?.[0]);

  // Cleared so picking the same file again still fires.
  input.value = '';
};

const onDrop = (event: DragEvent) => {
  isOver.value = false;
  take(event.dataTransfer?.files?.[0]);
};

const onDragLeave = (event: DragEvent) => {
  const current = event.currentTarget as HTMLElement | null;

  if (current && !current.contains(event.relatedTarget as Node)) {
    isOver.value = false;
  }
};

const remove = () => {
  error.value = '';
  emit('remove');
};
</script>

<template>
  <section class="panel" aria-labelledby="stampp-title">
    <div class="panel-head">
      <h3 id="stampp-title" class="panel-title">
        <span class="num" aria-hidden="true" style="background: rgba(147, 182, 214, 0.6)">2</span>{{ t.home.stampTitle }}
      </h3>
      <div v-if="stamp" class="panel-tools">
        <span class="chip" style="max-width: 220px"><span class="ellip">{{ stamp.name }}</span></span>
        <button type="button" class="btn btn-sm btn-ghost" :disabled="busy" @click="remove">{{ t.home.remove }}</button>
      </div>
    </div>

    <input :id="inputId"
           type="file"
           class="sr-only"
           accept=".png,image/png"
           :disabled="busy"
           @change="onChange">

    <label v-if="!stamp"
           class="dz"
           :class="{ 'is-over': isOver }"
           :for="inputId"
           @dragenter.prevent="isOver = true"
           @dragover.prevent
           @dragleave.prevent="onDragLeave"
           @drop.prevent="onDrop">
      <span class="dz-face">
        <svg class="dz-ill" viewBox="0 0 190 116" width="190" height="116" aria-hidden="true">
          <ellipse cx="95" cy="104" rx="76" ry="11" fill="#93b6d6" opacity="0.5" filter="url(#wcSoft)" />
          <ellipse cx="95" cy="102" rx="38" ry="8" fill="none" stroke-width="3" opacity="0.75" style="stroke: var(--accent)" />
          <g transform="translate(95 84)">
            <g class="dz-stamp">
              <g filter="url(#wc)">
                <ellipse cx="0" cy="-60" rx="17" ry="15" fill="#b07a4f" />
                <path d="M-8 -48 H8 L11 -22 H-11 Z" fill="#8a5e40" />
                <rect x="-36" y="-26" width="72" height="22" rx="6" style="fill: var(--accent)" />
              </g>
              <rect x="-33" y="-6" width="66" height="6" rx="2" fill="#0b1839" />
            </g>
          </g>
          <path d="M44 30 l2 5.5 5.5 2 -5.5 2 -2 5.5 -2 -5.5 -5.5 -2 5.5 -2 z" fill="#fcbc1e" />
          <path d="M148 18 l1.6 4.4 4.4 1.6 -4.4 1.6 -1.6 4.4 -1.6 -4.4 -4.4 -1.6 4.4 -1.6 z" fill="#fcbc1e" />
        </svg>
        <span class="dz-title">{{ t.home.dropStamp }}</span>
        <span class="dz-link">{{ t.home.pickPng }}</span>
        <span class="hint">{{ t.home.stampHint(MAX_STAMP_LABEL) }}</span>
      </span>
    </label>

    <template v-else>
      <div class="checker preview-box">
        <img v-if="previewUrl"
             :src="previewUrl"
             :alt="t.home.previewAlt(stamp.name)"
             :style="{ opacity: Math.max(opacity, 5) / 100 }">
      </div>

      <OpacityControl v-model="opacity" />

      <div class="kv-list" style="margin-top: auto">
        <p v-if="dimensions" class="kv">
          <span>{{ t.home.kSize }}</span>
          <span>{{ dimensions.width }}×{{ dimensions.height }} · {{ fileSize(stamp.size) }}</span>
        </p>
        <p class="kv"><span>{{ t.home.kPos }}</span><span>{{ t.home.vPos }}</span></p>
      </div>
    </template>

    <p v-if="error" class="err" role="alert">{{ error }}</p>
  </section>
</template>
