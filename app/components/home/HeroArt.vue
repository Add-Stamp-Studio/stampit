<script lang="ts" setup>
/**
 * The home hero: a rubber stamp thunking a mark onto a pile of photos, photos floating up
 * out of the pile, and the fox cheering it on beside the pines. Day and night versions of the
 * sky are both drawn; CSS shows the one that matches the theme.
 */
const { t } = useLocale();
</script>

<template>
<svg class="ill" viewBox="0 0 640 540" role="img" :aria-label="t.home.heroIll">
<g class="ill-day">
<circle cx="470" cy="110" r="96" fill="#fcbc1e" opacity="0.22" filter="url(#wcSoft)" />
<circle cx="470" cy="110" r="60" fill="#fcbc1e" opacity="0.5" filter="url(#wcSoft)" />
</g>
<g class="ill-night">
<circle cx="470" cy="104" r="84" fill="#fcbc1e" opacity="0.12" filter="url(#wcSoft)" />
<path d="M474.3 50.1 A50 50 0 1 0 523.6 120.6 A43 43 0 1 1 474.3 50.1 Z" fill="#fcbc1e" filter="url(#wc)" />
<g fill="#f5f0e4">
<circle cx="96" cy="40" r="2" /><circle cx="300" cy="30" r="1.6" /><circle cx="380" cy="64" r="2.2" /><circle cx="600" cy="50" r="1.8" /><circle cx="250" cy="150" r="1.4" /><circle cx="590" cy="200" r="1.6" />
<path d="M220 51 l2.4 6.6 6.6 2.4 -6.6 2.4 -2.4 6.6 -2.4 -6.6 -6.6 -2.4 6.6 -2.4 z" />
</g>
</g>
<path d="M-520 470 C -380 452 -200 446 -80 440 C 0 436 40 410 110 396 C 170 384 210 388 250 398 C 340 416 410 372 510 366 C 570 362 620 372 660 384 L660 540 L-520 540 Z" fill="#c3cf92" opacity="0.7" filter="url(#wcSoft)" />
<g opacity="0.9" filter="url(#wc)">
<rect x="464" y="416" width="12" height="22" fill="#7a5a43" />
<path d="M470 340 L536 422 Q470 428 404 422 Z" fill="#86a978" />
<path d="M470 300 L526 380 Q470 386 414 380 Z" fill="#8fb281" />
<path d="M470 260 L514 334 Q470 340 426 334 Z" fill="#98ba8a" />
<path d="M470 230 L502 290 Q470 296 438 290 Z" fill="#a2c294" />
</g>
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
<g filter="url(#wc)">
<rect x="603" y="440" width="14" height="26" fill="#5d4030" />
<path d="M610 338 L695.8 444.6 Q610 452.6 524.2 444.6 Z" fill="#2f5a44" />
<path d="M610 338 L695.8 444.6 Q653 450.6 610 450.6 Z" fill="#1c3a2b" opacity="0.4" />
<path d="M610 286 L682.8 390 Q610 398 537.2 390 Z" fill="#37634c" />
<path d="M610 286 L682.8 390 Q646 396 610 396 Z" fill="#1c3a2b" opacity="0.4" />
<path d="M610 234 L667.2 330.2 Q610 338.2 552.8 330.2 Z" fill="#3f6d54" />
<path d="M610 234 L667.2 330.2 Q638 336 610 336 Z" fill="#1c3a2b" opacity="0.4" />
<path d="M610 195 L651.6 273 Q610 281 568.4 273 Z" fill="#48775c" />
<path d="M610 195 L651.6 273 Q630 279 610 279 Z" fill="#1c3a2b" opacity="0.4" />
</g>
<path d="M-520 486 C -360 476 -200 470 -60 466 C 0 464 30 452 80 450 C 140 448 190 458 260 462 C 350 466 440 446 530 452 C 590 456 630 462 660 466 L660 560 L-520 560 Z" fill="#a7bf74" filter="url(#wcSoft)" />
<ellipse cx="250" cy="482" rx="190" ry="14" fill="#2a3a24" opacity="0.18" filter="url(#wcSoft)" />
<!-- photos floating up out of the folder -->
<g transform="translate(64 150) rotate(-12)"><g class="float" style="--fl: 5.6s; --fd: -1.2s">
<rect x="0" y="0" width="58" height="64" rx="2" fill="#fffdf7" stroke="#e4dacb" />
<use href="#sc6" x="5" y="5" width="48" height="36" />
</g></g>
<g transform="translate(178 70) rotate(9)"><g class="float" style="--fl: 6.4s; --fd: -3s">
<rect x="0" y="0" width="52" height="58" rx="2" fill="#fffdf7" stroke="#e4dacb" />
<use href="#sc4" x="4" y="4" width="44" height="33" />
<circle cx="40" cy="48" r="5" fill="none" stroke-width="1.6" style="stroke: var(--accent)" />
</g></g>
<g transform="translate(330 112) rotate(-6)"><g class="float" style="--fl: 5s; --fd: -0.4s">
<rect x="0" y="0" width="48" height="54" rx="2" fill="#fffdf7" stroke="#e4dacb" />
<use href="#sc5" x="4" y="4" width="40" height="30" />
</g></g>
<!-- the stack -->
<g transform="translate(46 286) rotate(-10 88 71)">
<g filter="url(#wc)"><rect x="0" y="0" width="176" height="142" rx="4" fill="#fffdf7" /></g>
<use href="#sc2" x="8" y="8" width="160" height="120" />
<g transform="translate(140 112) rotate(-14)" opacity="0.85"><circle r="13" fill="none" stroke-width="2.4" style="stroke: var(--accent)" /><text y="5" text-anchor="middle" style="font-family: Manrope, sans-serif; font-size: 13px; font-weight: 800; fill: var(--accent)">©</text></g>
</g>
<g transform="translate(298 302) rotate(9 88 71)">
<g filter="url(#wc)"><rect x="0" y="0" width="176" height="142" rx="4" fill="#fffdf7" /></g>
<use href="#sc4" x="8" y="8" width="160" height="120" />
<g transform="translate(138 110) rotate(10)" opacity="0.85"><circle r="13" fill="none" stroke-width="2.4" style="stroke: var(--accent)" /><text y="5" text-anchor="middle" style="font-family: Manrope, sans-serif; font-size: 13px; font-weight: 800; fill: var(--accent)">©</text></g>
</g>
<g transform="translate(150 330) rotate(-3 100 81)">
<g filter="url(#wc)"><rect x="0" y="0" width="200" height="162" rx="4" fill="#fffdf7" /></g>
<use href="#sc1" x="8" y="8" width="184" height="138" />
</g>
<!-- the fresh mark -->
<g transform="translate(250 406) rotate(-10)">
<g class="ink" filter="url(#wc)">
<circle r="31" fill="none" stroke-width="4.5" style="stroke: var(--accent)" />
<circle r="24" fill="none" stroke-width="1.8" style="stroke: var(--accent)" />
<text y="10" text-anchor="middle" style="font-family: Manrope, sans-serif; font-size: 28px; font-weight: 800; fill: var(--accent)">©</text>
</g>
</g>
<g class="thunk">
<path d="M196 372 L184 360 M250 358 L250 342 M304 372 L316 360" fill="none" stroke-width="2.6" stroke-linecap="round" style="stroke: var(--ink)" opacity="0.55" />
</g>
<!-- the stamp -->
<g transform="translate(250 318)">
<g class="press">
<g filter="url(#wc)">
<ellipse cx="0" cy="-122" rx="30" ry="26" fill="#b07a4f" />
<path d="M-14 -100 H14 L20 -46 H-20 Z" fill="#8a5e40" />
<rect x="-62" y="-50" width="124" height="40" rx="9" style="fill: var(--accent)" />
</g>
<rect x="-56" y="-12" width="112" height="12" rx="3" fill="#0b1839" />
<path d="M-20 -124 C -14 -138 2 -144 14 -140" stroke="#ffffff" stroke-width="4" fill="none" opacity="0.35" stroke-linecap="round" />
<text x="0" y="-24" text-anchor="middle" style="font-family: Manrope, sans-serif; font-size: 13px; font-weight: 800; letter-spacing: 1.5px; fill: #fffdf8">stampit</text>
</g>
</g>
<g transform="translate(336 300)">
<g class="thunk">
<text x="0" y="0" transform="rotate(-8)" style="font-family: Caveat, cursive; font-size: 40px; font-weight: 600; fill: var(--accent-ink)">{{ t.home.thunk }}</text>
</g>
</g>
<!-- the fox, cheering -->
<g transform="translate(446 270) scale(1.1)">
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
<use href="#tuft" transform="translate(40 504) scale(1.1)" />
<use href="#tuft" transform="translate(140 498)" />
<use href="#tuft" transform="translate(232 506) scale(1.2)" />
<use href="#tuft" transform="translate(338 500)" />
<use href="#tuft" transform="translate(420 506) scale(1.15)" />
<use href="#tuft" transform="translate(526 496)" />
<use href="#tuft" transform="translate(610 504) scale(1.1)" />
</g>
<use href="#flower" fill="#fcbc1e" transform="translate(104 500)" />
<use href="#flower" fill="#ee6f52" transform="translate(292 504) scale(0.9)" />
<use href="#flower" fill="#fff8ec" transform="translate(470 502)" />
<use href="#flower" fill="#fcbc1e" transform="translate(568 496) scale(0.85)" />
<g transform="translate(410 212) rotate(12)"><use class="flutter" href="#butterfly" fill="#ee6f52" /></g>
<g transform="translate(30 250) rotate(-8) scale(0.8)"><use class="flutter" href="#butterfly" fill="#fcbc1e" style="animation-delay: -0.3s" /></g>
</svg>
</template>
