<script lang="ts" setup>
/**
 * The night behind "nothing leaves home" and the guide's FAQ: a watercolor sky with a moon and
 * twinkling stars over painted hills, and the fox asleep in the grass. Sits behind the
 * section's content; the section itself sets the padding that keeps text off the hills.
 */
withDefaults(defineProps<{ moon?: 'left' | 'right' }>(), { moon: 'left' });
</script>

<template>
<div class="night-art">
<svg aria-hidden="true" viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice" class="night-sky">
<g filter="url(#wcSoft)">
<ellipse cx="260" cy="200" rx="360" ry="160" fill="#1d2d5e" opacity="0.7" />
<ellipse cx="1120" cy="160" rx="420" ry="150" fill="#22336b" opacity="0.55" />
<ellipse cx="760" cy="420" rx="520" ry="180" fill="#16244f" opacity="0.7" />
<ellipse cx="1240" cy="470" rx="260" ry="120" fill="#2a3a78" opacity="0.45" />
</g>
<g :transform="moon === 'right' ? 'translate(1084 0)' : undefined">
<circle cx="176" cy="118" r="80" fill="#fcbc1e" opacity="0.12" filter="url(#wcSoft)" />
<path d="M172.6 62.1 A56 56 0 1 0 227.4 140.4 A48 48 0 1 1 172.6 62.1 Z" fill="#fcbc1e" filter="url(#wc)" />
</g>
<g class="twinkle" fill="#f5f0e4">
<circle cx="340" cy="60" r="1.8" /><circle cx="520" cy="140" r="1.4" /><circle cx="690" cy="48" r="2.2" /><circle cx="880" cy="120" r="1.6" /><circle cx="1010" cy="70" r="1.8" /><circle cx="1300" cy="110" r="2" /><circle cx="1400" cy="220" r="1.4" /><circle cx="60" cy="300" r="1.6" /><circle cx="420" cy="250" r="1.3" />
</g>
<g class="twinkle" fill="#f5f0e4" style="animation-delay: -1.2s">
<circle cx="250" cy="40" r="1.4" /><circle cx="610" cy="210" r="1.8" /><circle cx="780" cy="180" r="1.3" /><circle cx="960" cy="240" r="1.6" /><circle cx="1180" cy="40" r="1.6" /><circle cx="1240" cy="260" r="1.4" /><circle cx="140" cy="220" r="1.8" /><circle cx="300" cy="340" r="1.2" />
</g>
<g class="twinkle" fill="#fcd977" style="animation-delay: -2.4s">
<path d="M460 81 l2.4 6.6 6.6 2.4 -6.6 2.4 -2.4 6.6 -2.4 -6.6 -6.6 -2.4 6.6 -2.4 z" />
<path d="M1090 171 l2.4 6.6 6.6 2.4 -6.6 2.4 -2.4 6.6 -2.4 -6.6 -6.6 -2.4 6.6 -2.4 z" />
<path d="M820 291 l2.4 6.6 6.6 2.4 -6.6 2.4 -2.4 6.6 -2.4 -6.6 -6.6 -2.4 6.6 -2.4 z" />
<path d="M1360 321 l2.4 6.6 6.6 2.4 -6.6 2.4 -2.4 6.6 -2.4 -6.6 -6.6 -2.4 6.6 -2.4 z" />
<path d="M200 371 l2.4 6.6 6.6 2.4 -6.6 2.4 -2.4 6.6 -2.4 -6.6 -6.6 -2.4 6.6 -2.4 z" />
</g>
</svg>
<svg aria-hidden="true" viewBox="0 0 1440 360" preserveAspectRatio="xMidYMax slice" class="night-land">
<g filter="url(#paint)"><path d="M-30 250 L-30 180 L60 142 L118 160 L232 64 L300 118 L358 106 L448 166 L522 136 L604 182 L700 148 L762 122 L842 168 L930 156 L1010 116 L1082 138 L1182 54 L1262 106 L1322 96 L1400 126 L1470 112 L1470 250 Z" fill="#3d4182" /><path d="M232 64 L118 160 L150 232 L206 168 Z M522 136 L448 166 L478 222 Z M762 122 L700 148 L728 214 Z M1010 116 L930 156 L966 218 Z M1182 54 L1082 138 L1112 226 L1160 150 Z M358 106 L300 118 L326 190 Z M1322 96 L1262 106 L1290 180 Z" fill="#5a59a3" /><path d="M232 64 L206 88 L218 94 L228 84 L238 96 L250 80 Z M1182 54 L1154 78 L1168 84 L1178 74 L1190 88 L1202 70 Z" fill="#8a84c8" /></g>
<g filter="url(#paint)"><path d="M-30 270 L-30 196 L70 168 L140 196 L214 150 L318 214 L400 232 L470 270 Z M960 270 L1040 232 L1120 210 L1230 150 L1300 190 L1370 164 L1470 198 L1470 270 Z" fill="#2a2d66" /><path d="M70 168 L20 210 L52 250 L88 196 Z M214 150 L168 214 L200 252 L232 186 Z M1230 150 L1176 214 L1206 250 L1240 186 Z M1370 164 L1330 200 L1352 236 Z" fill="#424590" /></g>
<g filter="url(#paint)"><path d="M-30 360 L-30 236 C 110 214 236 220 352 238 C 492 260 610 246 740 232 C 880 218 1020 230 1150 246 C 1270 260 1380 240 1470 232 L1470 360 Z" fill="#1d4034" /></g>
<g filter="url(#paint)"><path d="M-30 360 L-30 246 C 90 232 212 240 318 258 C 430 278 540 284 660 284 C 820 284 980 274 1140 270 C 1290 266 1390 272 1470 276 L1470 360 Z" fill="#376a3b" /><path d="M40 252 C 120 240 210 244 290 258 C 220 262 140 266 70 266 Z M560 286 C 650 276 760 274 860 278 C 790 288 690 294 600 294 Z" fill="#4f8a41" /><path d="M255 262 L248.7 249.1 L257.2 248.1 L254.3 233.8 L263.6 235 L261.2 214.7 L273.9 223.5 L276.7 207.8 L287.4 214.3 L291.5 193.1 L303.4 207.8 L310.4 189.3 L321 204.4 L330 191.2 L339 204.4 L349.8 187.4 L356.6 207.8 L367.2 199.1 L372.6 214.3 L384.6 204 L386.1 223.5 L396.2 220 L396.4 235 L405.4 234.2 L402.8 248.1 L411.9 248.6 L405 262 Z M166 246 L160 233.3 L168.8 233.7 L168.7 221.8 L176.8 222.9 L179.7 209.6 L189 214.8 L194.3 198.6 L204 210.5 L212 193 L220 210.5 L229.6 199.1 L235 214.8 L244.8 208.3 L247.2 222.9 L258.2 216.7 L255.2 233.7 L261 236.1 L258 246 Z M940 262 L931.8 247.5 L942.4 249 L939.9 234.5 L949.5 237.1 L950.7 222.3 L960.7 227.2 L964.8 212.4 L975.1 220.2 L981.4 203.8 L991.5 216.5 L1000 195.7 L1008.5 216.5 L1018.4 205.3 L1024.9 220.2 L1036.4 207.6 L1039.3 227.2 L1051.1 217.9 L1050.5 237.1 L1060.4 233.9 L1057.6 249 L1066.7 248.9 L1060 262 Z M1060 246 L1057.4 237.3 L1062.7 235.3 L1063.2 225.1 L1070.3 226.2 L1073.5 214.9 L1081.6 220.1 L1087.2 206.2 L1095 218 L1102.7 208.1 L1108.4 220.1 L1116.7 214.2 L1119.7 226.2 L1128.2 222.3 L1127.3 235.3 L1133.8 236 L1130 246 Z" fill="#163626" /></g>
<g filter="url(#paint)"><path d="M-30 360 L-30 304 C 220 290 450 292 640 298 C 820 304 950 270 1090 242 C 1230 216 1350 214 1470 222 L1470 360 Z" fill="#6c9b3b" /><path d="M880 290 C 980 266 1100 240 1220 230 C 1310 224 1390 226 1440 232 C 1340 246 1180 262 1040 282 C 980 290 920 296 880 290 Z" fill="#8dba48" /><path d="M1040 262 C 1120 246 1220 236 1320 236 C 1250 250 1140 264 1060 272 Z" fill="#aacd5c" /></g>
<g transform="translate(676 262)">
<ellipse cx="44" cy="24" rx="44" ry="20" fill="#c9582a" filter="url(#wc)" />
<path d="M86 22 C 102 38 82 54 50 50 C 30 48 14 44 6 38 C 22 40 44 42 58 40 C 76 38 90 32 86 22 Z" fill="#df6a2e" filter="url(#wc)" />
<path d="M6 38 C 13 43 22 46 30 47 C 22 42 14 40 6 38 Z" fill="#fff3e3" />
<g filter="url(#wc)">
<circle cx="14" cy="26" r="15" fill="#e3702f" />
<path d="M2 18 L0 2 L12 12 Z M15 12 L21 0 L27 15 Z" fill="#e3702f" />
</g>
<path d="M0 30 C 6 36 16 37 23 32 C 16 34 8 33 0 30 Z" fill="#fff3e3" />
<path d="M7 24 C 10 27 14 27 17 24" fill="none" stroke="#2b1d18" stroke-width="1.6" stroke-linecap="round" />
<circle cx="0.5" cy="30" r="2.2" fill="#2b1d18" />
</g>
<g class="twinkle" style="font-family: Caveat, cursive; font-weight: 600; fill: #fcd977">
<text x="706" y="246" style="font-size: 20px">z</text>
<text x="720" y="228" style="font-size: 17px">z</text>
<text x="732" y="212" style="font-size: 14px">z</text>
</g>
</svg>

</div>
</template>
