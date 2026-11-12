/**
 * Renders the icon set from one vector source, and the share cards from scripts/og-card.html.
 *
 * Run by hand — `node scripts/build-icons.mjs` — not from `npm run build`; the outputs are
 * committed, and this file is here so the next change starts from the same source rather
 * than from a bitmap. Everything lands in public/, which Nuxt serves from the site root.
 *
 * The icons are the fox from the studio's status panel, on its yellow watercolor wash: pure
 * vector, no text, so they come out the same on any machine.
 *
 * The share cards carry words, set in Prata and Manrope, which no build box has installed.
 * So they are an HTML page that loads the fonts from Google, screenshotted by Chromium:
 *
 *   CHROME=/path/to/chrome node scripts/build-icons.mjs
 *
 * Without CHROME the icons are written and the cards are left as they are.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public');

/** Straight from the tokens in app/assets/css/main.css. */
const PAPER = '#fbf7ee';
const SUN = '#fcbc1e';

/** The site's watercolor edge filter (SiteDefs.vue, #wc). */
const WATERCOLOR = `
<filter id="wc" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="3" result="warp"/>
  <feDisplacementMap in="SourceGraphic" in2="warp" scale="6" xChannelSelector="R" yChannelSelector="G" result="shape"/>
  <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="17" result="blot"/>
  <feColorMatrix in="blot" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.85 0 0 0 0.32" result="blotA"/>
  <feComposite in="shape" in2="blotA" operator="in" result="wash"/>
  <feMorphology in="shape" operator="erode" radius="1.4" result="inner"/>
  <feComposite in="shape" in2="inner" operator="out" result="rim"/>
  <feMerge><feMergeNode in="wash"/><feMergeNode in="rim"/></feMerge>
</filter>`;

/** The fox head (SiteDefs.vue, #foxHead), in its own 88 × 84 box starting at x = 2. */
const FOX = `
<g filter="url(#wc)">
  <path d="M66 34 L72 4 L84 40 Z" fill="#c4561f"/>
  <path d="M86 62 C 86 42 74 30 60 30 C 46 30 36 38 28 46 L8 58 C 5 60 6 63 9 64 L30 70 C 42 79 62 82 74 78 C 82 74 86 68 86 62 Z" fill="#e3702f"/>
  <path d="M44 36 L40 6 L62 30 Z" fill="#e3702f"/>
</g>
<path d="M70 30 L72.5 13 L79 36 Z" fill="#4a2a20" opacity="0.55"/>
<path d="M46.5 32 L43.5 15 L56 29 Z" fill="#4a2a20" opacity="0.55"/>
<path d="M9 64 L30 70 C 42 79 58 81 70 78 C 58 72 42 68 26 63 C 20 61 14 62 9 64 Z" fill="#fff3e3"/>
<ellipse cx="57" cy="62" rx="6.5" ry="3.8" fill="#ee6f52" opacity="0.45"/>
<circle cx="8.6" cy="60" r="3.4" fill="#2b1d18"/>
<ellipse cx="45" cy="48" rx="3.2" ry="3.8" fill="#2b1d18"/>
<circle cx="44" cy="46.6" r="1.1" fill="#ffffff"/>`;

/**
 * The tile, drawn in the status panel's own 76 × 76 coordinates so the wash and the fox sit
 * exactly as they do on the page.
 *
 * `radius` is in those units (17.5 ≈ the old 118 px at 512). Zero is for the Apple touch
 * icon, which iOS rounds itself, and for the maskable one, which Android crops to a circle
 * of 80 % — `scale` pulls the drawing into that safe zone.
 */
const SETTINGS = {
  large: { radius: 17.5, scale: 1 },
  small: { radius: 14, scale: 1.12 },
  square: { radius: 0, scale: 1 },
  maskable: { radius: 0, scale: 0.8 }
};

const tile = (size, setting = 'large') => {
  const { radius, scale } = SETTINGS[setting];

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 76 76">
  <defs>${WATERCOLOR}</defs>
  <rect width="76" height="76" rx="${radius}" fill="${PAPER}"/>
  <g transform="translate(38 39) scale(${scale}) translate(-38 -39)">
    <circle cx="38" cy="40" r="32" fill="${SUN}" opacity="0.45" filter="url(#wc)"/>
    <svg x="6" y="8" width="64" height="61" viewBox="2 0 88 84">${FOX}</svg>
  </g>
</svg>`;
};

/** Packs PNGs into a .ico: a 6-byte header, a 16-byte directory row each, then the images. */
const ico = (entries) => {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);

  let offset = 6 + 16 * entries.length;

  const directory = entries.map(({ size, data }) => {
    const row = Buffer.alloc(16);
    row.writeUInt8(size >= 256 ? 0 : size, 0);
    row.writeUInt8(size >= 256 ? 0 : size, 1);
    row.writeUInt8(0, 2);
    row.writeUInt8(0, 3);
    row.writeUInt16LE(1, 4);
    row.writeUInt16LE(32, 6);
    row.writeUInt32LE(data.length, 8);
    row.writeUInt32LE(offset, 12);
    offset += data.length;
    return row;
  });

  return Buffer.concat([header, ...directory, ...entries.map(entry => entry.data)]);
};

/** Rendered large and scaled down, so the watercolor noise averages out instead of aliasing. */
const png = async (svg, size) =>
  sharp(await sharp(Buffer.from(svg)).resize(1024, 1024).png().toBuffer())
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer();

mkdirSync(out, { recursive: true });

const icoSizes = await Promise.all([16, 32, 48].map(async size => ({ size, data: await png(tile(1024, 'small'), size) })));
writeFileSync(join(out, 'favicon.ico'), ico(icoSizes));

writeFileSync(join(out, 'apple-touch-icon.png'), await png(tile(1024, 'square'), 180));
writeFileSync(join(out, 'icon-192.png'), await png(tile(1024), 192));
writeFileSync(join(out, 'icon-512.png'), await png(tile(1024), 512));
writeFileSync(join(out, 'icon-maskable-512.png'), await png(tile(1024, 'maskable'), 512));

console.log('Wrote favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png, icon-maskable-512.png');

/**
 * The share cards, one per language. og-card.html reads the language from its hash.
 * --virtual-time-budget gives the web fonts time to arrive before the shot is taken.
 */
const chrome = process.env.CHROME;

if (!chrome) {
  console.log('CHROME not set: share cards left as they are.');
} else {
  const card = pathToFileURL(join(root, 'scripts', 'og-card.html')).href;

  for (const [lang, file] of [['en', 'og-image.jpg'], ['bg', 'og-image-bg.jpg']]) {
    const shot = join(out, `${file}.png`);

    execFileSync(chrome, [
      '--headless',
      '--no-sandbox',
      '--disable-gpu',
      '--hide-scrollbars',
      '--allow-file-access-from-files',
      '--virtual-time-budget=10000',
      '--window-size=1200,630',
      `--screenshot=${shot}`,
      `${card}#${lang}`
    ], { stdio: 'ignore' });

    // JPEG, not PNG: the paper grain and the washes are noise a PNG cannot compress, and a
    // megabyte share card is one some unfurlers give up on.
    writeFileSync(join(out, file), await sharp(shot).jpeg({ quality: 86, mozjpeg: true }).toBuffer());
    rmSync(shot);
    console.log(`Wrote ${file}`);
  }
}
