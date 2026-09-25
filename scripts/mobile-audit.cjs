const { chromium, devices } = require('playwright');

const BASE = process.env.AUDIT_BASE || "https://koora-demo.web.app";
const paths = [
  ['home', '/'],
  ['villas', '/villas'],
  ['detail', '/villas/casa-ficus'],
  ['about', '/about'],
  ['faq', '/faq'],
  ['contact', '/contact'],
];
const viewports = [
  ['iphone-se', { viewport: { width: 375, height: 667 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }],
  ['iphone-14', { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 }],
  ['android-sm', { viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }],
];
const waitRealImages = async page => {
  await page.evaluate(async () => {
    await Promise.all(Array.from(document.images).map(img => img.complete || new Promise(resolve => {
      img.addEventListener('load', resolve, { once: true });
      img.addEventListener('error', resolve, { once: true });
      setTimeout(resolve, 10000);
    })));
  });
};
(async () => {
  const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const report = { issues: [], notes: [] };

  for (const [deviceName, options] of viewports) {
    const context = await browser.newContext(options);
    const page = await context.newPage();
    const consoleErrors = [];
    page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
    page.on('pageerror', error => consoleErrors.push(error.message));
    page.on('response', res => { if (res.status() >= 400) consoleErrors.push(`${res.status()} ${res.url()}`); });

    for (const [name, path] of paths) {
      await page.goto(BASE + path, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await waitRealImages(page);
      const data = await page.evaluate(() => {
        const doc = document.documentElement;
        const bodyRect = document.body.getBoundingClientRect();
        const overflowX = Math.max(doc.scrollWidth - window.innerWidth, 0);
        const overflowing = [];
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && (r.right > window.innerWidth + 2 || r.left < -2)) {
            const cs = getComputedStyle(el);
            if (cs.position !== 'fixed' || r.right > window.innerWidth + 2) {
              overflowing.push({ tag: el.tagName, cls: String(el.className).slice(0,140), text: (el.textContent || '').trim().slice(0,80), left: r.left, right: r.right, width: r.width, pos: cs.position });
            }
          }
        }
        const viewportMeta = document.querySelector('meta[name="viewport"]')?.content || '';
        const tinyInputs = Array.from(document.querySelectorAll('input,select,textarea')).map(el => ({ tag: el.tagName, type: el.getAttribute('type'), value: el.value, fontSize: getComputedStyle(el).fontSize, rect: el.getBoundingClientRect().toJSON() })).filter(x => parseFloat(x.fontSize) < 16);
        const images = Array.from(document.images).map(img => ({ src: img.currentSrc || img.src, ok: img.complete && img.naturalWidth > 0, alt: img.alt }));
        const headings = Array.from(document.querySelectorAll('h1,h2,h3')).map(h => ({ tag: h.tagName, text: h.innerText.trim(), size: getComputedStyle(h).fontSize, rect: h.getBoundingClientRect().toJSON() }));
        const fixed = Array.from(document.querySelectorAll('button,a,[role="button"]')).map(el => {
          const r = el.getBoundingClientRect();
          const cs = getComputedStyle(el);
          return { text: el.innerText.trim().slice(0,80) || el.getAttribute('aria-label') || '', href: el.getAttribute('href') || '', rect: r.toJSON(), pos: cs.position, display: cs.display, visibility: cs.visibility, pointer: cs.pointerEvents };
        }).filter(x => x.pos === 'fixed' || (x.rect.height > 0 && x.rect.bottom <= window.innerHeight && x.pos === 'sticky'));
        return { overflowX, scrollWidth: doc.scrollWidth, innerWidth: window.innerWidth, bodyRight: bodyRect.right, viewportMeta, overflowing: overflowing.slice(0,30), tinyInputs, brokenImages: images.filter(i => !i.ok), imageCount: images.length, headings, fixed };
      });
      if (data.overflowX) report.issues.push({ device: deviceName, page: name, type: 'horizontal overflow', data });
      if (data.brokenImages.length) report.issues.push({ device: deviceName, page: name, type: 'broken images', data: data.brokenImages });
      if (data.tinyInputs.length) report.issues.push({ device: deviceName, page: name, type: 'input zoom risk', data: data.tinyInputs });
      if (!data.viewportMeta.includes('width=device-width')) report.issues.push({ device: deviceName, page: name, type: 'viewport meta', data });
      console.log(`${deviceName} ${name}: overflow=${data.overflowX} images=${data.imageCount} broken=${data.brokenImages.length} tinyInputs=${data.tinyInputs.length} overflowing=${data.overflowing.length}`);
    }

    // Interaction audit on home.
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const menu = page.getByRole('button', { name: 'Open menu' });
    if (await menu.count()) {
      const menuBox = await menu.boundingBox();
      if (menuBox && menuBox.width < 40) report.issues.push({ device: deviceName, page: 'home', type: 'small tap target', data: { target: 'Open menu', box: menuBox } });
      await menu.tap();
      await page.waitForTimeout(300);
      const menuState = await page.evaluate(() => {
        const menu = document.querySelector('nav[aria-label], div.fixed nav, nav');
        const links = Array.from(document.querySelectorAll('div.fixed a')).map(a => ({ text: a.innerText.trim(), rect: a.getBoundingClientRect().toJSON(), visible: !!a.offsetParent }));
        return { bodyOverflow: getComputedStyle(document.body).overflow, links };
      });
      report.notes.push({ device: deviceName, page: 'mobile menu', menuState });
      const first = page.locator('div.fixed a').first();
      if (await first.count()) {
        const box = await first.boundingBox();
        if (box && box.height < 44) report.issues.push({ device: deviceName, page: 'mobile menu', type: 'small tap target', data: { box } });
      }
      await page.getByRole("button", { name: "Open menu" }).tap();
    }

    // Search modal.
    const searchTrigger = page.locator('button', { hasText: /Anywhere|Add dates|2 guests/i }).first();
    if (await searchTrigger.count()) {
      await searchTrigger.tap();
      await page.waitForTimeout(300);
      const modal = await page.evaluate(() => {
        const inputs = Array.from(document.querySelectorAll('input,select')).map(el => ({ type: el.getAttribute('type'), fontSize: getComputedStyle(el).fontSize, rect: el.getBoundingClientRect().toJSON() }));
        return { inputs, bodyOverflow: getComputedStyle(document.body).overflow };
      });
      report.notes.push({ device: deviceName, page: 'search modal', modal });
      const close = page.getByRole('button', { name: 'Close search' });
      if (await close.count()) await close.tap();
    }

    // Villa detail fixed bottom panels.
    await page.goto(BASE + '/villas/casa-ficus', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
    const fixed = await page.evaluate(() => Array.from(document.querySelectorAll('button,a')).map(el => {
      const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
      return { text: el.innerText.trim() || el.getAttribute('aria-label') || el.getAttribute('href'), pos: cs.position, display: cs.display, rect: r.toJSON(), visible: !!el.offsetParent && cs.display !== 'none' };
    }).filter(x => x.pos === 'fixed' && x.visible));
    const overlaps = [];
    for (let i=0;i<fixed.length;i++) for (let j=i+1;j<fixed.length;j++) {
      const a=fixed[i].rect,b=fixed[j].rect;
      const x=Math.max(0, Math.min(a.right,b.right)-Math.max(a.left,b.left));
      const y=Math.max(0, Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));
      if (x>2 && y>2) overlaps.push({a:fixed[i],b:fixed[j],x,y});
    }
    if (overlaps.length) report.issues.push({ device: deviceName, page: 'villa detail', type: 'fixed control overlap', overlaps });

    if (consoleErrors.length) report.issues.push({ device: deviceName, type: 'browser errors', errors: [...new Set(consoleErrors)] });
    await context.close();
  }

  require('fs').writeFileSync('/tmp/koora-mobile-audit.json', JSON.stringify(report, null, 2));
  console.log('\nISSUES COUNT:', report.issues.length);
  console.log(JSON.stringify(report.issues, null, 2));
  await browser.close();
})();
