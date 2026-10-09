import { writeFile } from "node:fs/promises";
import sharp from "sharp";

import { brandColors, brandMonogram, brandSquircle } from "../src/lib/brand.ts";

const { burgundy, paper, rose, ink } = brandColors;
const mark = `<path d="${brandMonogram}" fill="none" stroke="${paper}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
const svg = (body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 64 64">${body}</svg>\n`;
const shaped = svg(`<path fill="${burgundy}" d="${brandSquircle}"/>${mark}`);
const adaptive = svg(
  `<style>@media(prefers-color-scheme:dark){.tile{fill:${rose}}.mark{stroke:${ink}}}</style><path class="tile" fill="${burgundy}" d="${brandSquircle}"/>${mark.replace("<path ", '<path class="mark" ')}`,
);
// Full bleed for OS masks, with all meaningful strokes inside the central 80% circle.
const maskable = svg(
  `<path fill="${burgundy}" d="M0 0h64v64H0z"/><g transform="translate(6.4 6.4) scale(.8)">${mark}</g>`,
);
await Promise.all([
  writeFile("src/app/icon.svg", adaptive),
  writeFile("public/manifest-icon.svg", shaped),
  writeFile("public/manifest-icon-maskable.svg", maskable),
  sharp(Buffer.from(maskable))
    .resize(180, 180)
    .png()
    .toFile("src/app/apple-icon.png"),
  sharp(Buffer.from(shaped))
    .resize(192, 192)
    .png()
    .toFile("public/manifest-icon-192.png"),
  sharp(Buffer.from(shaped))
    .resize(512, 512)
    .png()
    .toFile("public/manifest-icon-512.png"),
]);
