<script lang="ts" setup>
/**
 * The guide's hero: an easel in the meadow holding a stamped print, with its filename along
 * the bottom edge, and the fox pointing at it.
 */
const { t } = useLocale();
</script>

<template>
<svg class="ill" viewBox="0 0 640 540" role="img" :aria-label="t.guide.heroIll">
<g class="ill-day">
<circle cx="520" cy="96" r="90" fill="#fcbc1e" opacity="0.22" filter="url(#wcSoft)" />
<circle cx="520" cy="96" r="56" fill="#fcbc1e" opacity="0.5" filter="url(#wcSoft)" />
</g>
<g class="ill-night">
<circle cx="520" cy="92" r="80" fill="#fcbc1e" opacity="0.12" filter="url(#wcSoft)" />
<path d="M524.3 40.1 A48 48 0 1 0 571.6 108 A41 41 0 1 1 524.3 40.1 Z" fill="#fcbc1e" filter="url(#wc)" />
<g fill="#f5f0e4"><circle cx="70" cy="40" r="2" /><circle cx="300" cy="30" r="1.6" /><circle cx="430" cy="60" r="2.2" /><circle cx="610" cy="190" r="1.8" /><circle cx="40" cy="200" r="1.4" /></g>
</g>
<path d="M-520 470 C -380 452 -200 446 -80 440 C 0 436 40 410 110 396 C 170 384 210 388 250 398 C 340 416 410 372 510 366 C 570 362 620 372 660 384 L660 540 L-520 540 Z" fill="#c3cf92" opacity="0.7" filter="url(#wcSoft)" />
<g filter="url(#wc)">
<rect x="531" y="418" width="18" height="34" fill="#6b4a35" />
<path d="M540 291.5 L648.9 426.8 Q540 434.8 431.1 426.8 Z" fill="#3f6b4f" />
<path d="M540 291.5 L648.9 426.8 Q594 432.8 540 432.8 Z" fill="#24402f" opacity="0.35" />
<path d="M540 225.5 L632.4 357.5 Q540 365.5 447.6 357.5 Z" fill="#477656" />
<path d="M540 225.5 L632.4 357.5 Q586 363.5 540 363.5 Z" fill="#24402f" opacity="0.35" />
<path d="M540 159.5 L612.6 281.6 Q540 289.6 467.4 281.6 Z" fill="#4f805d" />
<path d="M540 159.5 L612.6 281.6 Q576 287.6 540 287.6 Z" fill="#24402f" opacity="0.35" />
<path d="M540 110 L592.8 209 Q540 217 487.2 209 Z" fill="#5a8b66" />
<path d="M540 110 L592.8 209 Q566 215 540 215 Z" fill="#24402f" opacity="0.35" />
</g>
<path d="M-520 486 C -360 476 -200 470 -60 466 C 0 464 30 452 80 450 C 140 448 190 458 260 462 C 350 466 440 446 530 452 C 590 456 630 462 660 466 L660 560 L-520 560 Z" fill="#a7bf74" filter="url(#wcSoft)" />
<ellipse cx="270" cy="490" rx="150" ry="12" fill="#2a3a24" opacity="0.18" filter="url(#wcSoft)" />
<!-- the easel -->
<g filter="url(#wc)">
<path d="M266 92 L278 92 L318 486 L306 488 Z" fill="#6b4630" />
<path d="M262 96 L274 96 L190 494 L178 492 Z" fill="#8a5e40" />
<path d="M276 96 L288 96 L370 494 L358 496 Z" fill="#8a5e40" />
<rect x="140" y="344" width="268" height="14" rx="4" fill="#7a5036" />
</g>
<!-- the stamped print on it -->
<g transform="translate(130 112) rotate(-2 142 116)">
<g filter="url(#wc)"><rect x="0" y="0" width="284" height="232" rx="4" fill="#fffdf7" /></g>
<use href="#sc1" x="10" y="10" width="264" height="198" />
<use href="#mark" x="56" y="80" width="172" height="64.5" opacity="0.92" style="filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.45))" />
<text x="142" y="202" text-anchor="middle" style="font-family: Manrope, sans-serif; font-size: 9px; font-weight: 700; fill: rgba(125, 125, 125, 0.95)">DSC_4821.jpg</text>
</g>
<!-- a small stamp resting in the grass -->
<g transform="translate(104 486) rotate(-8)">
<g filter="url(#wc)">
<ellipse cx="0" cy="-58" rx="16" ry="14" fill="#b07a4f" />
<path d="M-8 -46 H8 L11 -24 H-11 Z" fill="#8a5e40" />
<rect x="-34" y="-28" width="68" height="22" rx="6" style="fill: var(--accent)" />
</g>
<rect x="-31" y="-7" width="62" height="7" rx="2" fill="#0b1839" />
</g>
<text x="24" y="120" transform="rotate(-7 24 120)" style="font-family: Caveat, cursive; font-size: 32px; font-weight: 600; fill: var(--accent-ink)">{{ t.guide.heroNote }}</text>
<path d="M66 134 C 80 160 96 186 118 200" fill="none" stroke-width="2.2" stroke-linecap="round" style="stroke: var(--accent-ink)" />
<path d="M104 198 L120 202 L116 186" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="stroke: var(--accent-ink)" />
<!-- the fox, pointing at it -->
<g transform="translate(452 272) scale(1.08)">
<g filter="url(#wc)">
<path d="M96 192 C 150 196 176 160 170 118 C 166 88 146 70 128 76 C 142 94 146 126 134 152 C 124 172 108 182 90 184 Z" fill="#df6a2e" />
<path d="M128 76 C 140 70 160 76 168 98 C 158 95 149 95 141 99 C 139 90 135 82 128 76 Z" fill="#fff3e3" />
<path d="M56 70 C 56 84 54 92 50 102 L 92 98 C 90 86 88 74 84 64 Z" fill="#df6a2e" />
<path d="M58 84 C 30 102 24 160 36 196 L112 196 C 124 160 114 108 88 86 Z" fill="#df6a2e" />
<path d="M88 86 C 114 108 124 160 112 196 L98 196 C 106 160 102 116 84 92 Z" fill="#b9501f" opacity="0.55" />
<path d="M50 96 C 38 124 42 166 56 192 L80 192 C 74 154 70 118 66 98 Z" fill="#fff3e3" />
<path d="M66 34 L72 4 L84 40 Z" fill="#c4561f" />
<path d="M86 62 C 86 42 74 30 60 30 C 46 30 36 38 28 46 L8 58 C 5 60 6 63 9 64 L30 70 C 42 79 62 82 74 78 C 82 74 86 68 86 62 Z" fill="#e3702f" />
<path d="M44 36 L40 6 L62 30 Z" fill="#e3702f" />
</g>
<path d="M70 30 L72.5 13 L79 36 Z" fill="#4a2a20" opacity="0.55" />
<path d="M46.5 32 L43.5 15 L56 29 Z" fill="#4a2a20" opacity="0.55" />
<path d="M9 64 L30 70 C 42 79 58 81 70 78 C 58 72 42 68 26 63 C 20 61 14 62 9 64 Z" fill="#fff3e3" />
<ellipse cx="57" cy="62" rx="6.5" ry="3.8" fill="#ee6f52" opacity="0.45" />
<path d="M52 168 L50 197 L62 197 L64 170 Z M68 170 L68 197 L80 197 L80 172 Z" fill="#4a2a20" />
<circle cx="8.6" cy="60" r="3.4" fill="#2b1d18" />
<ellipse cx="45" cy="48" rx="3.2" ry="3.8" fill="#2b1d18" />
<circle cx="44" cy="46.6" r="1.1" fill="#ffffff" />
<g class="wave">
<path d="M64 114 C 50 112 36 102 28 90 C 25 85 31 80 36 84 C 44 94 54 100 66 102 Z" fill="#df6a2e" filter="url(#wc)" />
<ellipse cx="29.5" cy="85" rx="5.4" ry="4.8" fill="#4a2a20" />
</g>
</g>
<g filter="url(#wc)">
<use href="#tuft" transform="translate(40 506) scale(1.1)" />
<use href="#tuft" transform="translate(150 500)" />
<use href="#tuft" transform="translate(250 508) scale(1.2)" />
<use href="#tuft" transform="translate(340 502)" />
<use href="#tuft" transform="translate(430 508) scale(1.15)" />
<use href="#tuft" transform="translate(530 498)" />
<use href="#tuft" transform="translate(612 506) scale(1.1)" />
</g>
<use href="#flower" fill="#fcbc1e" transform="translate(74 502)" />
<use href="#flower" fill="#ee6f52" transform="translate(222 506) scale(0.9)" />
<use href="#flower" fill="#fff8ec" transform="translate(392 504)" />
<use href="#flower" fill="#fcbc1e" transform="translate(586 498) scale(0.85)" />
<g transform="translate(436 172) rotate(12)"><use class="flutter" href="#butterfly" fill="#8a82e0" /></g>
<g transform="translate(470 240) rotate(-10) scale(0.75)"><use class="flutter" href="#butterfly" fill="#fcbc1e" style="animation-delay: -0.4s" /></g>
</svg>
</template>
