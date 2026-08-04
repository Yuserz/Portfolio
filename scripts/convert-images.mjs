import sharp from "sharp";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const DIR = "src/assets/images";

// Heavy SVGs whose payload is an embedded raster PNG — rasterize to WebP.
// maxWidth keeps them crisp on retina (~2x display size) without bloat.
const targets = [
  { name: "profile", maxWidth: 900 },
  { name: "banana", maxWidth: 800 },
  { name: "carRental", maxWidth: 800 },
  { name: "nail", maxWidth: 800 },
  { name: "caritas", maxWidth: 800 },
];

const kb = (bytes) => (bytes / 1024).toFixed(0) + " KB";

let before = 0;
let after = 0;

for (const { name, maxWidth } of targets) {
  const input = join(DIR, `${name}.svg`);
  const output = join(DIR, `${name}.webp`);
  const inSize = statSync(input).size;
  before += inSize;

  // density 200 renders the SVG large enough that the downscale stays sharp
  await sharp(input, { density: 200 })
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(output);

  const outSize = statSync(output).size;
  after += outSize;
  console.log(
    `${name}: ${kb(inSize)} -> ${kb(outSize)}  (${(
      (1 - outSize / inSize) *
      100
    ).toFixed(0)}% smaller)`
  );
}

console.log(
  `\nTOTAL: ${kb(before)} -> ${kb(after)}  (${(
    (1 - after / before) *
    100
  ).toFixed(0)}% smaller)`
);
