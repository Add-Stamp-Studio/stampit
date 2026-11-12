<script lang="ts" setup>
import type { StampingOptions, StampingProgress } from '~/composables/useImageStamping';

/**
 * The stamping table: frames, stamp, the run, and the way out with the results.
 *
 * Owns every piece of state the run needs; the panels only show it and report what the
 * visitor did.
 */
const { t, fileSize, formatNumber } = useLocale();

/** The state a freshly loaded page is in. Named so resetAll cannot drift from it. */
const INITIAL_OPACITY = 100;
const INITIAL_ADD_FILENAME = true;

const EMPTY_PROGRESS: StampingProgress = { current: 0, total: 0, currentFileName: '' };

const selectedImages = ref<File[]>([]);
const stampFile = ref<File | null>(null);
const opacity = ref(INITIAL_OPACITY);
const addFilename = ref(INITIAL_ADD_FILENAME);
const stampedImages = ref<File[]>([]);
const isStamping = ref(false);
const isDone = ref(false);
const progress = ref<StampingProgress>({ ...EMPTY_PROGRESS });
const elapsedSeconds = ref<number | null>(null);

/** Which save is running, if any: the two buttons share a disabled state but not a spinner. */
const savingMode = ref<'zip' | 'folder' | null>(null);
const saveProgress = ref<StampingProgress>({ ...EMPTY_PROGRESS });

/** What the last successful save did, in the words the chip shows. Null until one lands. */
const saveNotice = ref<string | null>(null);

/** Only Chromium has a folder picker, and only `window` can say so — hence onMounted. */
const canPickFolder = ref(false);

const { initialize, setStamp, applyStampToImages, downloadStampedImages, saveStampedImagesToFolder, canSaveToFolder } = useImageStamping();

onMounted(() => {
  canPickFolder.value = canSaveToFolder();
});

/** Anything that changes the input makes the last result stale. */
const invalidate = () => {
  stampedImages.value = [];
  isDone.value = false;
  saveNotice.value = null;
};

const onImages = (images: File[]) => {
  selectedImages.value = images;
  invalidate();
};

const clearImages = () => {
  selectedImages.value = [];
  invalidate();
};

const onStamp = (file: File) => {
  stampFile.value = file;
  isDone.value = false;
  saveNotice.value = null;
};

const removeStamp = () => {
  stampFile.value = null;
  isDone.value = false;
  saveNotice.value = null;
};

/**
 * Back to a just-loaded page: frames, stamp, results and settings all go. Not guarded by a
 * confirm — nothing it wipes takes more than a re-pick to get back, and while the stamped
 * frames exist the save buttons sit right beside it.
 */
const resetAll = () => {
  selectedImages.value = [];
  stampFile.value = null;
  stampedImages.value = [];
  opacity.value = INITIAL_OPACITY;
  addFilename.value = INITIAL_ADD_FILENAME;
  progress.value = { ...EMPTY_PROGRESS };
  isStamping.value = false;
  isDone.value = false;
  savingMode.value = null;
  saveProgress.value = { ...EMPTY_PROGRESS };
  saveNotice.value = null;
  elapsedSeconds.value = null;
};

/**
 * One option set for the whole run, shared by setStamp and applyStampToImages so the stamp
 * is decoded under the same limits as the photos. Everything the UI does not drive keeps the
 * default compiled into the engine.
 */
const options = computed<StampingOptions>(() => ({
  format: 'jpg',
  quality: 75,
  opacity: opacity.value,
  addFilename: addFilename.value
}));

const hasFrames = computed(() => selectedImages.value.length > 0);
const busy = computed(() => isStamping.value || savingMode.value !== null);
const canApply = computed(() => hasFrames.value && stampFile.value !== null && !isStamping.value && !isDone.value);

/** Anything moved away from a freshly loaded page: exactly when Reset all has work to do. */
const isDirty = computed(() =>
  hasFrames.value
  || stampFile.value !== null
  || stampedImages.value.length > 0
  || opacity.value !== INITIAL_OPACITY
  || addFilename.value !== INITIAL_ADD_FILENAME
);

const galleryImages = computed(() => (stampedImages.value.length > 0 ? stampedImages.value : selectedImages.value));
const stampedSize = computed(() => stampedImages.value.reduce((sum, file) => sum + file.size, 0));
const percent = computed(() => {
  const { current, total } = progress.value;

  return total > 0 ? Math.round((current / total) * 100) : 0;
});

/** Where the run stands, ordered by urgency: the first condition that holds is the one worth reading. */
const status = computed(() => {
  const h = t.value.home;

  if (isStamping.value) return { label: h.stStamping, hint: '', fox: 'bob' };
  if (isDone.value) return { label: h.stDone, hint: canPickFolder.value ? h.hDone : h.hDoneZipOnly, fox: 'hop' };
  if (!hasFrames.value) return { label: h.stWait, hint: h.hWait, fox: '' };
  if (!stampFile.value) return { label: h.stPick, hint: h.hPick, fox: '' };

  return { label: h.stReady, hint: h.hReady, fox: '' };
});

const apply = async () => {
  if (!canApply.value || !stampFile.value) return;

  isStamping.value = true;
  elapsedSeconds.value = null;
  progress.value = { current: 0, total: selectedImages.value.length, currentFileName: '' };

  const startedAt = performance.now();

  try {
    await initialize();
    await setStamp(stampFile.value, options.value);

    const results = await applyStampToImages(selectedImages.value, options.value, (next) => {
      progress.value = next;
    });

    stampedImages.value = results.map(result => result.file);
    elapsedSeconds.value = (performance.now() - startedAt) / 1000;
    isDone.value = true;
  } catch (error) {
    console.error('Stamping failed:', error);
    alert(`${t.value.home.errStamp}: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    isStamping.value = false;
    progress.value = { ...EMPTY_PROGRESS };
  }
};

/** The results in the shape both save paths take. */
const results = () => stampedImages.value.map(file => ({
  file,
  originalName: file.name.replace(/_stamped\.(jpg|webp)$/, '')
}));

const downloadZip = async () => {
  if (stampedImages.value.length === 0) return;

  savingMode.value = 'zip';

  try {
    await downloadStampedImages(results());
    saveNotice.value = t.value.home.noticeZip;
  } catch (error) {
    console.error('ZIP failed:', error);
    alert(`${t.value.home.errSave}: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    savingMode.value = null;
  }
};

/** Writes the frames into a folder the visitor points at, as loose files. Chromium only. */
const saveToFolder = async () => {
  if (stampedImages.value.length === 0) return;

  savingMode.value = 'folder';
  saveProgress.value = { current: 0, total: stampedImages.value.length, currentFileName: '' };

  try {
    const result = await saveStampedImagesToFolder(results(), {
      onProgress: (next) => {
        saveProgress.value = next;
      },
      onConflict: (names) => confirm(t.value.home.conflict(names.length, names.slice(0, 5).join('\n'), Math.max(0, names.length - 5)))
    });

    // Null is the overwrite prompt declined; the picker's own cancel throws instead.
    if (result) {
      saveNotice.value = t.value.home.noticeFolder(result.written, result.directoryName);
    }
  } catch (error) {
    // Dismissing the picker is a decision, not a fault.
    if (error instanceof DOMException && error.name === 'AbortError') return;

    console.error('Folder save failed:', error);
    alert(`${t.value.home.errSave}: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    savingMode.value = null;
    saveProgress.value = { ...EMPTY_PROGRESS };
  }
};

/** The confetti around the fox when a run lands. */
const BURST = [
  { dx: '-64px', dy: '-58px', r: '160deg', bg: '#fcbc1e' },
  { dx: '-20px', dy: '-78px', r: '220deg', bg: '#ee6f52', round: true },
  { dx: '34px', dy: '-70px', r: '120deg', bg: '#8a82e0' },
  { dx: '74px', dy: '-36px', r: '200deg', bg: '#b9c685', round: true },
  { dx: '86px', dy: '10px', r: '90deg', bg: '#5fbdbe' },
  { dx: '60px', dy: '52px', r: '240deg', bg: '#fcbc1e', round: true },
  { dx: '-8px', dy: '66px', r: '150deg', bg: '#ee6f52' },
  { dx: '-62px', dy: '46px', r: '210deg', bg: '#93b6d6', round: true },
  { dx: '-84px', dy: '-6px', r: '130deg', bg: '#b9c685' }
];
</script>

<template>
  <section id="stamp" class="section bg-band" aria-labelledby="stamp-title" style="margin-top: -1px">
    <div class="wrap" style="padding-top: 36px; padding-bottom: 120px">
      <div style="display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 18px 40px">
        <div style="max-width: 640px">
          <p class="eyebrow">{{ t.home.tbEyebrow }}</p>
          <h2 id="stamp-title" class="title-lg">{{ t.home.tbTitle }}</h2>
          <p style="margin-top: 16px">{{ t.home.tbText }}</p>
        </div>
        <p class="chip chip-ok" style="padding: 10px 18px; font-size: 14px">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4.5" y="10.5" width="15" height="10" rx="2.5" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" /><path d="M12 14.5v2" /></svg>
          {{ t.home.privacy }}
        </p>
      </div>

      <div class="table-grid">
        <HomeFramesPanel v-model:add-filename="addFilename"
                         :images="selectedImages"
                         :busy="busy"
                         @select="onImages"
                         @clear="clearImages" />

        <HomeStampPanel v-model:opacity="opacity"
                        :stamp="stampFile"
                        :busy="busy"
                        @select="onStamp"
                        @remove="removeStamp" />
      </div>

      <!-- Where the run stands, and the one thing to do about it. -->
      <div class="panel status">
        <div class="status-main">
          <span class="fox-av" aria-hidden="true">
            <svg viewBox="0 0 76 76" width="76" height="76">
              <circle cx="38" cy="40" r="34" fill="#fcbc1e" opacity="0.4" filter="url(#wc)" />
              <g :key="status.fox" :class="status.fox"><use href="#foxHead" x="6" y="8" width="64" height="61" /></g>
            </svg>
          </span>
          <div style="min-width: 0; flex: 1">
            <h3 class="panel-title">
              <span class="num" aria-hidden="true" style="background: rgba(252, 188, 30, 0.45)">3</span>{{ status.label }}
            </h3>
            <div v-if="isStamping" class="kv-list" style="margin-top: 10px; max-width: 460px">
              <div class="bar"
                   role="progressbar"
                   aria-valuemin="0"
                   :aria-valuemax="progress.total"
                   :aria-valuenow="progress.current"
                   :aria-label="status.label">
                <span :style="{ width: `${percent}%` }"></span>
              </div>
              <p class="tnum ellip" style="font-size: 13px; color: var(--muted)">
                {{ progress.current }} / {{ progress.total }} · {{ progress.currentFileName }}
              </p>
            </div>
            <p v-else role="status" style="margin-top: 6px; font-size: 15px; color: var(--muted)">{{ status.hint }}</p>
          </div>
        </div>

        <div class="status-actions">
          <button v-if="!isDone" type="button" class="btn btn-lg" :disabled="!canApply" @click="apply">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 3.5h5l-.8 6.5h-3.4z" /><rect x="4.5" y="10" width="15" height="5" rx="1.5" /><path d="M4 19.5h16" /></svg>
            {{ t.home.apply }}
          </button>

          <template v-else>
            <span class="chip chip-ok tnum">
              <span class="chip-dot"></span>{{ t.home.doneChip(stampedImages.length, formatNumber(elapsedSeconds ?? 0, 1)) }}
            </span>

            <button v-if="canPickFolder" type="button" class="btn btn-lg" :disabled="savingMode !== null" @click="saveToFolder">
              <span v-if="savingMode === 'folder'" class="spin spin-sm" aria-hidden="true"></span>
              <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 7A1.5 1.5 0 0 1 5 5.5h4l2 2h8A1.5 1.5 0 0 1 20.5 9v8.5A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5z" /><path d="M12 10.5v5M9.5 13l2.5 2.5 2.5-2.5" /></svg>
              <span class="tnum">{{ savingMode === 'folder' ? t.home.saving(saveProgress.current, saveProgress.total) : t.home.saveFolder }}</span>
            </button>

            <button type="button"
                    class="btn btn-lg"
                    :class="{ 'btn-soft': canPickFolder }"
                    :disabled="savingMode !== null"
                    @click="downloadZip">
              <span v-if="savingMode === 'zip'" class="spin spin-sm" aria-hidden="true"></span>
              <span class="tnum">{{ savingMode === 'zip' ? t.home.zipping : t.home.zip(fileSize(stampedSize)) }}</span>
            </button>
          </template>

          <span v-if="saveNotice" class="chip chip-ok" role="status"><span class="chip-dot"></span>{{ saveNotice }}</span>

          <!-- Shown the moment the page differs from how it loaded, not only at the end of a run. -->
          <button v-if="isDirty" type="button" class="btn btn-lg btn-ghost" :disabled="busy" @click="resetAll">{{ t.home.reset }}</button>
        </div>

        <span v-if="isDone" class="burst" aria-hidden="true">
          <i v-for="(bit, i) in BURST"
             :key="i"
             :style="{ '--dx': bit.dx, '--dy': bit.dy, '--r': bit.r, background: bit.bg, borderRadius: bit.round ? '50%' : undefined }"></i>
        </span>
      </div>

      <HomeStampGallery v-if="hasFrames" :images="galleryImages" :stamped="isDone" />
    </div>

    <svg class="edge" aria-hidden="true" viewBox="0 0 1440 70" preserveAspectRatio="none">
      <path d="M0 32 C 160 56 320 58 480 36 C 640 14 820 10 980 30 C 1140 50 1300 52 1440 30 L1440 70 L0 70 Z" style="fill: var(--paper)" />
    </svg>
  </section>
</template>
