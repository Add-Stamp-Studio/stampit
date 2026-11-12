<script lang="ts" setup>
/**
 * The watercolor kit every illustration draws from: the paper and paint filters, the grass,
 * flower and butterfly pieces, the fox head, the © MY STUDIO mark and eight little scenes
 * that stand in for photos. Rendered once per page; everything else points at it by id.
 */
</script>

<template>
<svg width="0" height="0" aria-hidden="true" focusable="false" class="defs">
<defs>
<filter id="wc" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB">
<feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="3" result="warp" />
<feDisplacementMap in="SourceGraphic" in2="warp" scale="6" xChannelSelector="R" yChannelSelector="G" result="shape" />
<feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="17" result="blot" />
<feColorMatrix in="blot" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.85 0 0 0 0.32" result="blotA" />
<feComposite in="shape" in2="blotA" operator="in" result="wash" />
<feMorphology in="shape" operator="erode" radius="1.4" result="inner" />
<feComposite in="shape" in2="inner" operator="out" result="rim" />
<feMerge><feMergeNode in="wash" /><feMergeNode in="rim" /></feMerge>
</filter>
<filter id="wcSoft" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
<feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves="3" seed="8" result="warp" />
<feDisplacementMap in="SourceGraphic" in2="warp" scale="22" xChannelSelector="R" yChannelSelector="G" result="shape" />
<feGaussianBlur in="shape" stdDeviation="1.4" result="soft" />
<feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="21" result="blot" />
<feColorMatrix in="blot" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0.15" result="blotA" />
<feComposite in="soft" in2="blotA" operator="in" result="wash" />
<feMorphology in="shape" operator="erode" radius="2" result="inner" />
<feComposite in="shape" in2="inner" operator="out" result="rim0" />
<feGaussianBlur in="rim0" stdDeviation="0.8" result="rim" />
<feMerge><feMergeNode in="wash" /><feMergeNode in="rim" /></feMerge>
</filter>
<filter id="paint" x="-4%" y="-10%" width="108%" height="120%" color-interpolation-filters="sRGB">
<feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="4" result="warp" />
<feDisplacementMap in="SourceGraphic" in2="warp" scale="7" xChannelSelector="R" yChannelSelector="G" result="shape" />
<feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="1" seed="9" result="n" />
<feColorMatrix in="n" type="matrix" values="0 0 0 0 0.96  0 0 0 0 0.94  0 0 0 0 0.86  12 0 0 0 -7.6" result="lite" />
<feComposite in="lite" in2="shape" operator="in" result="liteIn" />
<feColorMatrix in="n" type="matrix" values="0 0 0 0 0.04  0 0 0 0 0.05  0 0 0 0 0.16  -10 0 0 0 3.7" result="dark" />
<feComposite in="dark" in2="shape" operator="in" result="darkIn" />
<feComponentTransfer in="liteIn" result="liteSoft"><feFuncA type="linear" slope="0.16" /></feComponentTransfer>
<feComponentTransfer in="darkIn" result="darkSoft"><feFuncA type="linear" slope="0.24" /></feComponentTransfer>
<feMerge><feMergeNode in="shape" /><feMergeNode in="liteSoft" /><feMergeNode in="darkSoft" /></feMerge>
</filter>
<filter id="grain" x="0" y="0" width="100%" height="100%">
<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="5" stitchTiles="stitch" />
<feColorMatrix type="matrix" values="0 0 0 0 0.42  0 0 0 0 0.36  0 0 0 0 0.28  0 0 0 0.9 -0.25" />
</filter>
<g id="tuft">
<path d="M-2 0 C -4 -16 -12 -30 -22 -40 C -10 -30 -3 -18 2 0 Z" fill="#6d9a4c" />
<path d="M0 0 C 0 -18 2 -34 6 -48 C 6 -32 4 -16 4 0 Z" fill="#87b05c" />
<path d="M2 0 C 6 -14 14 -26 26 -34 C 16 -24 9 -12 6 0 Z" fill="#5f8f45" />
<path d="M-6 0 C -10 -10 -18 -18 -28 -22 C -18 -14 -11 -7 -3 0 Z" fill="#9cbd6a" />
<path d="M6 0 C 12 -8 20 -14 30 -16 C 20 -10 13 -4 9 0 Z" fill="#7aa553" />
</g>
<g id="flower">
<path d="M0 0 C 1 -10 -1 -20 1 -30" fill="none" stroke="#5f8f45" stroke-width="2" />
<circle cx="1" cy="-32" r="5" />
</g>
<g id="butterfly">
<ellipse cx="-11" cy="-7" rx="13" ry="9" transform="rotate(-28 -11 -7)" />
<ellipse cx="11" cy="-7" rx="13" ry="9" transform="rotate(28 11 -7)" />
<ellipse cx="-8" cy="7" rx="8" ry="6" transform="rotate(24 -8 7)" opacity="0.75" />
<ellipse cx="8" cy="7" rx="8" ry="6" transform="rotate(-24 8 7)" opacity="0.75" />
<rect x="-1.5" y="-10" width="3" height="22" rx="1.5" fill="#3b2b22" />
<path d="M-1 -10 C -4 -16 -7 -18 -9 -18 M1 -10 C 4 -16 7 -18 9 -18" stroke="#3b2b22" stroke-width="1.2" fill="none" />
</g>
<symbol id="foxHead" viewBox="2 0 88 84">
<g filter="url(#wc)">
<path d="M66 34 L72 4 L84 40 Z" fill="#c4561f" />
<path d="M86 62 C 86 42 74 30 60 30 C 46 30 36 38 28 46 L8 58 C 5 60 6 63 9 64 L30 70 C 42 79 62 82 74 78 C 82 74 86 68 86 62 Z" fill="#e3702f" />
<path d="M44 36 L40 6 L62 30 Z" fill="#e3702f" />
</g>
<path d="M70 30 L72.5 13 L79 36 Z" fill="#4a2a20" opacity="0.55" />
<path d="M46.5 32 L43.5 15 L56 29 Z" fill="#4a2a20" opacity="0.55" />
<path d="M9 64 L30 70 C 42 79 58 81 70 78 C 58 72 42 68 26 63 C 20 61 14 62 9 64 Z" fill="#fff3e3" />
<ellipse cx="57" cy="62" rx="6.5" ry="3.8" fill="#ee6f52" opacity="0.45" />
<circle cx="8.6" cy="60" r="3.4" fill="#2b1d18" />
<ellipse cx="45" cy="48" rx="3.2" ry="3.8" fill="#2b1d18" />
<circle cx="44" cy="46.6" r="1.1" fill="#ffffff" />
</symbol>
<symbol id="mark" viewBox="0 0 240 90">
<rect x="4" y="4" width="232" height="82" rx="18" fill="none" stroke="#ffffff" stroke-width="5" />
<rect x="14" y="14" width="212" height="62" rx="11" fill="none" stroke="#ffffff" stroke-width="2" />
<text x="120" y="56" text-anchor="middle" style="font-family: Manrope, sans-serif; font-size: 27px; font-weight: 800; letter-spacing: 3px; fill: #ffffff">© MY STUDIO</text>
</symbol>
<symbol id="sc1" viewBox="0 0 160 120">
<rect width="160" height="120" fill="#f7dcc0" />
<circle cx="114" cy="38" r="16" fill="#fcbc1e" opacity="0.85" />
<path d="M0 86 L34 46 L58 70 L86 32 L120 74 L140 58 L160 72 V120 H0 Z" fill="#7b8fc0" filter="url(#wc)" />
<path d="M86 32 L74 48 L82 52 L90 44 L98 49 Z M34 46 L27 55 L36 57 Z" fill="#fffdf7" opacity="0.9" />
<path d="M0 96 C 40 84 90 90 160 82 V120 H0 Z" fill="#7d9a69" filter="url(#wc)" />
<path d="M0 108 C 50 100 110 106 160 100 V120 H0 Z" fill="#5f7f52" />
</symbol>
<symbol id="sc2" viewBox="0 0 160 120">
<rect width="160" height="120" fill="#f3b28f" />
<rect width="160" height="38" fill="#e98f7a" opacity="0.55" />
<circle cx="80" cy="70" r="22" fill="#fcd977" />
<rect y="70" width="160" height="50" fill="#3e7fa0" filter="url(#wc)" />
<path d="M20 82 H50 M70 90 H110 M30 100 H52 M100 104 H136 M62 78 H74" stroke="#fcd977" stroke-width="2.5" stroke-linecap="round" opacity="0.8" />
</symbol>
<symbol id="sc3" viewBox="0 0 160 120">
<rect width="160" height="120" fill="#d6e8ea" />
<path d="M0 78 C 40 64 100 70 160 60 V120 H0 Z" fill="#a7c4a0" filter="url(#wc)" />
<path d="M30 38 L44 80 H16 Z M30 54 L48 98 H12 Z" fill="#3f6b4f" filter="url(#wc)" />
<path d="M72 26 L90 78 H54 Z M72 46 L94 102 H50 Z" fill="#2f5a44" filter="url(#wc)" />
<path d="M120 40 L134 84 H106 Z M120 56 L138 102 H102 Z" fill="#477656" filter="url(#wc)" />
<path d="M0 104 C 50 96 110 102 160 96 V120 H0 Z" fill="#5f8f45" />
</symbol>
<symbol id="sc4" viewBox="0 0 160 120">
<rect width="160" height="120" fill="#ece4f6" />
<circle cx="40" cy="30" r="12" fill="#fcbc1e" opacity="0.7" />
<path d="M0 64 C 50 56 110 60 160 54 V120 H0 Z" fill="#b9c685" filter="url(#wc)" />
<path d="M80 66 L-10 124 M80 66 L22 124 M80 66 L52 124 M80 66 L80 124 M80 66 L108 124 M80 66 L138 124 M80 66 L170 124" stroke="#8a82e0" stroke-width="9" stroke-linecap="round" opacity="0.9" />
<circle cx="128" cy="48" r="12" fill="#5f8f45" filter="url(#wc)" />
<rect x="126" y="56" width="4" height="12" fill="#6b4a35" />
</symbol>
<symbol id="sc5" viewBox="0 0 160 120">
<rect width="160" height="120" fill="#1d2d5e" />
<path d="M118 16 A12 12 0 1 0 132 34 A10 10 0 1 1 118 16 Z" fill="#fcd977" />
<g fill="#f5f0e4"><circle cx="30" cy="20" r="1.2" /><circle cx="70" cy="12" r="1" /><circle cx="96" cy="30" r="1.2" /><circle cx="150" cy="44" r="1" /></g>
<path d="M0 120 V70 H22 V56 H40 V78 H54 V44 H76 V66 H92 V50 H110 V72 H128 V60 H146 V80 H160 V120 Z" fill="#2a3a78" filter="url(#wc)" />
<g fill="#fcd977"><rect x="6" y="80" width="5" height="6" /><rect x="28" y="64" width="5" height="6" /><rect x="60" y="54" width="5" height="6" /><rect x="66" y="74" width="5" height="6" /><rect x="98" y="60" width="5" height="6" /><rect x="134" y="70" width="5" height="6" /><rect x="44" y="88" width="5" height="6" /><rect x="114" y="84" width="5" height="6" /></g>
<rect y="104" width="160" height="16" fill="#16244f" />
</symbol>
<symbol id="sc6" viewBox="0 0 160 120">
<rect width="160" height="120" fill="#d9eeee" />
<path d="M0 62 C 30 40 60 46 84 58 C 110 40 140 44 160 56 V72 H0 Z" fill="#86a978" filter="url(#wc)" />
<rect y="68" width="160" height="52" fill="#5fbdbe" filter="url(#wc)" />
<path d="M60 90 H100 L94 98 H66 Z" fill="#6e4b39" />
<path d="M81 88 V62 L97 86 Z" fill="#ee6f52" />
<path d="M78 88 V70 L67 86 Z" fill="#fffdf7" />
<path d="M30 104 H50 M110 100 H132 M64 110 H94" stroke="#e8f6f6" stroke-width="2" stroke-linecap="round" />
</symbol>
<symbol id="sc7" viewBox="0 0 160 120">
<rect width="160" height="120" fill="#f2c6a0" />
<circle cx="80" cy="64" r="46" fill="#fbd98a" opacity="0.7" filter="url(#wcSoft)" />
<use href="#foxHead" x="36" y="22" width="92" height="88" />
</symbol>
<symbol id="sc8" viewBox="0 0 160 120">
<rect width="160" height="120" fill="#fbe7bf" />
<circle cx="120" cy="34" r="14" fill="#ee6f52" opacity="0.75" />
<path d="M0 78 C 40 58 80 70 110 80 C 130 70 150 66 160 70 V120 H0 Z" fill="#e3a414" filter="url(#wc)" />
<path d="M0 98 C 50 84 100 96 160 88 V120 H0 Z" fill="#c4861f" filter="url(#wc)" />
<rect x="40" y="62" width="8" height="32" rx="4" fill="#5f8f45" />
<rect x="31" y="68" width="6" height="14" rx="3" fill="#5f8f45" />
<rect x="33" y="78" width="9" height="5" rx="2" fill="#5f8f45" />
<rect x="51" y="66" width="6" height="12" rx="3" fill="#5f8f45" />
<rect x="46" y="74" width="9" height="5" rx="2" fill="#5f8f45" />
</symbol>
</defs>
</svg>
</template>

<style>
.defs {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}
</style>
