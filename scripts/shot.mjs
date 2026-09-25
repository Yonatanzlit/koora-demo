// Screenshot every page of the koora site so the agent can visually verify UI work.
// Usage: node scripts/shot.mjs [baseUrl]
// Writes PNGs to /tmp/koora-shots/ and prints the paths.

import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.argv[2] || 'http://localhost:3000';
const OUT = '/tmp/koora-shots';
mkdirSync(OUT, { recursive: true });

const PAGES = [
  ['home', '/'],
  ['villas', '/villas'],
  ['casa-ficus', '/villas/casa-ficus'],
  ['casa-la-onda-ultra-suite', '/villas/casa-la-onda-ultra-suite'],
  ['about', '/about'],
  ['faq', '/faq'],
  ['contact', '/contact'],
];

// Mobile = iPhone 15-ish, Desktop = 1440x900
const VIEWPORTS = [
  ['mobile', { width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 }],
  ['desktop', { width: 1440, height: 900 }],
];

const browser = await chromium.launch();
const shots = [];

for (const [vpName, vp] of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: !!vp.isMobile, deviceScaleFactor: vp.deviceScaleFactor || 1 });
  const page = await ctx.newPage();

  for (const [name, path] of PAGES) {
    try {
      console.log(`Navigating to ${BASE + path}`);
      const res = await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 60000 });
      console.log(`Navigated to ${BASE + path}, status: ${res ? res.status() : '???'}`);
      // give framer-motion / images a beat to settle
      await page.waitForTimeout(1200);
      // scroll through the page so lazy images + fade-ups trigger
      await page.evaluate(async () => {
        const step = window.innerHeight;
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(800);

      const file = `${OUT}/${vpName}-${name}.png`;
      await page.screenshot({ path: file, fullPage: true });
      const status = res ? res.status() : '???';
      shots.push(`${vpName.padEnd(8)} ${String(status).padEnd(4)} ${path.padEnd(28)} -> ${file}`);
    } catch (e) {
      shots.push(`${vpName.padEnd(8)} FAIL ${path.padEnd(28)} -> ${e.message}`);
    }
  }
  await ctx.close();
}

await browser.close();
console.log(shots.join('\n'));
