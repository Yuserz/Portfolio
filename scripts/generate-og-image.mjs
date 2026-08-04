/**
 * Generates public/og-image.png (1200x630) in the site's terminal aesthetic:
 * black background, grayscale avatar on the right, `> SYSTEM READY.` prompt +
 * name + role on the left. Re-run after swapping the avatar:
 *   node scripts/generate-og-image.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const AVATAR_PATH = resolve(__dirname, "../src/assets/images/profile.webp");
const OUT_PATH = resolve(__dirname, "../public/og-image.png");

const W = 1200;
const H = 630;
const AVATAR_SIZE = 400;
const AVATAR_LEFT = W - 80 - AVATAR_SIZE; // right-aligned with 80px margin
const AVATAR_TOP = Math.round((H - AVATAR_SIZE) / 2);

const name = "YUSRI";
const role = "FULL-STACK DEVELOPER";

/** SVG text layer — mono terminal lines + name. */
function textSvg() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <style>
    .mono { font-family: "Geist Mono", Consolas, monospace; }
    .sans { font-family: "Hanken Grotesk", Arial, sans-serif; }
  </style>

  <!-- prompt line -->
  <text x="80" y="250" class="mono" font-size="22" fill="#848484" letter-spacing="2">
    &gt; SYSTEM READY.
  </text>
  <rect x="322" y="240" width="10" height="20" fill="#C6C6C6" />

  <!-- name -->
  <text x="76" y="380" class="sans" font-size="96" font-weight="700" fill="#FFFFFF" letter-spacing="-2">
    ${name}
  </text>

  <!-- role -->
  <text x="80" y="430" class="mono" font-size="20" fill="#C6C6C6" letter-spacing="4">
    ${role}
  </text>

  <!-- version chip -->
  <rect x="78" y="455" width="196" height="34" rx="4" fill="none" stroke="#303033" stroke-width="2" />
  <text x="94" y="478" class="mono" font-size="16" fill="#848484" letter-spacing="2">
    PORTFOLIO V3.0
  </text>
</svg>`;
}

async function main() {
  const avatar = await sharp(AVATAR_PATH)
    .resize(AVATAR_SIZE, AVATAR_SIZE, { fit: "cover" })
    .grayscale()
    .png()
    .toBuffer();

  const svg = Buffer.from(textSvg());
  const svgMeta = await sharp(svg).metadata();

  const out = await sharp({
    create: { width: W, height: H, channels: 3, background: "#000000" },
  })
    .composite([
      { input: avatar, left: AVATAR_LEFT, top: AVATAR_TOP },
      { input: svg, left: 0, top: 0, width: svgMeta.width, height: svgMeta.height },
    ])
    .png()
    .toBuffer();

  writeFileSync(OUT_PATH, out);
  const meta = await sharp(out).metadata();
  console.log(`Wrote ${OUT_PATH} (${meta.width}x${meta.height}, ${(out.length / 1024).toFixed(1)} KB)`);
}

main().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
