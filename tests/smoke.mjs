// End-to-end smoke test in headless Chromium.
//   npm test            (needs `playwright` installed: npm i -D playwright)
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let playwright;
for (const id of ['playwright', '/opt/node22/lib/node_modules/playwright']) {
  try {
    playwright = require(id);
    break;
  } catch (_) {}
}
if (!playwright) {
  console.log('smoke: playwright not installed, skipping (npm i -D playwright)');
  process.exit(0);
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const url = pathToFileURL(path.join(root, 'tests/kitchen-sink.html')).href;
// GPU rasterization matches real desktop Chrome/Electron; the software
// raster path misplaces backdrop filters that reference SVG filters.
const browser = await playwright.chromium.launch({
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-gpu-rasterization'],
});
const page = await browser.newPage({ viewport: { width: 1100, height: 800 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
await page.goto(url);
await page.waitForTimeout(500);

// Waits for a condition instead of sleeping a fixed time (robust on slow CI).
const until = (fn, arg) => page.waitForFunction(fn, arg, { timeout: 3000 }).then(() => true, () => false);

let failed = 0;
const check = (name, ok, extra = '') => {
  console.log(`${ok ? '✓' : '✗'} ${name}${extra ? ' — ' + extra : ''}`);
  if (!ok) failed++;
};

const filters = await page.evaluate(() => document.querySelectorAll('svg[data-lg-defs] filter').length);
check('refraction filters generated', filters > 3, filters + ' filters');
check('refraction applied to glass', await page.evaluate(() => getComputedStyle(document.querySelector('.lg-glass')).backdropFilter.includes('url(')));

// Switch: click toggles, drag toggles
const sw = page.locator('.lg-switch').nth(1);
const before = await sw.locator('input').isChecked();
await sw.click();
await page.waitForTimeout(350);
check('switch toggles on click', (await sw.locator('input').isChecked()) !== before);
const box = await sw.boundingBox();
const on = await sw.locator('input').isChecked();
await page.mouse.move(box.x + (on ? box.width - 12 : 12), box.y + box.height / 2);
await page.mouse.down();
await page.mouse.move(box.x + (on ? 4 : box.width - 4), box.y + box.height / 2, { steps: 8 });
await page.mouse.up();
await page.waitForTimeout(350);
check('switch toggles on drag', (await sw.locator('input').isChecked()) !== on);

// Slider: drag updates value and ratio
const slider = page.locator('.lg-slider');
const sb = await slider.boundingBox();
await page.mouse.click(sb.x + sb.width * 0.9, sb.y + sb.height / 2);
const val = await slider.locator('input').inputValue();
const ratio = await slider.evaluate((el) => el.style.getPropertyValue('--_ratio'));
check('slider value follows pointer', Number(val) > 70, 'value ' + val + ', ratio ' + ratio);

// Segmented: click and drag
const seg = page.locator('.lg-segmented');
await seg.locator('label').nth(2).click();
await page.waitForTimeout(100);
check('segmented selects on click', await seg.locator('input').nth(2).isChecked());
const s0 = await seg.locator('label').nth(2).boundingBox();
const s1 = await seg.locator('label').nth(0).boundingBox();
await page.mouse.move(s0.x + s0.width / 2, s0.y + s0.height / 2);
await page.mouse.down();
await page.mouse.move(s1.x + s1.width / 2, s1.y + s1.height / 2, { steps: 10 });
await page.mouse.up();
await page.waitForTimeout(200);
check('segmented selects on drag', await seg.locator('input').nth(0).isChecked());

// Stepper
const stepper = page.locator('.lg-stepper');
await stepper.locator('button').nth(1).click();
check('stepper increments', (await stepper.getAttribute('data-value')) === '3');

// Tab bar
await page.locator('.lg-tab').nth(2).click();
await page.waitForTimeout(100);
check('tab bar selects', await page.locator('.lg-tab').nth(2).evaluate((el) => el.classList.contains('is-selected')));

// Menu
await page.click('#open-menu');
check('menu opens', await until(() => { const el = document.getElementById('menu'); return !el.hidden && el.classList.contains('is-open'); }));
await page.locator('#menu .lg-menu-item').nth(1).click();
check('menu selects and closes', await until(() => window.__menu === 'share' && document.getElementById('menu').hidden));

// Context menu
await page.click('#ctx', { button: 'right' });
check('context menu opens', await until(() => document.getElementById('menu').classList.contains('is-open')));
await page.keyboard.press('Escape');
await until(() => document.getElementById('menu').hidden);

// Sheet
await page.click('#open-sheet');
check('sheet opens', await until(() => { const el = document.getElementById('sheet'); return el.classList.contains('is-open') && el.getBoundingClientRect().height > 100; }));
await page.waitForTimeout(500);
await page.locator('#sheet [data-lg-dismiss]').click();
check('sheet closes', await until(() => document.getElementById('sheet').hidden));

// Alert
await page.click('#open-alert');
check('alert shows', await until(() => document.querySelectorAll('.lg-alert.is-open').length === 1));
await page.keyboard.press('Escape');
check('alert resolves with cancel on Escape', await until(() => window.__alert === 'Cancel'));

// Toast
await page.click('#open-toast');
check('toast shows', await until(() => document.querySelectorAll('.lg-toast.is-open').length === 1));

// Page control
await page.locator('.lg-page-control button').nth(3).click();
check('page control selects', (await page.locator('.lg-page-control').getAttribute('data-index')) === '3');

// Toggle button + tooltip + disclosure
await page.click('#toggle');
check('toggle button flips aria-pressed', (await page.getAttribute('#toggle', 'aria-pressed')) === 'true');
await page.mouse.move(0, 0);
await page.hover('#toggle');
check('tooltip appears on hover', await until(() => { const t = document.querySelector('.lg-tooltip'); return !!t && t.classList.contains('is-open') && t.textContent === 'Tooltip text'; }));
await page.mouse.move(0, 0);
await page.click('#disc summary');
check('disclosure opens', await page.evaluate(() => document.getElementById('disc').open));

// Wheel picker: initial value, keyboard, click
check('picker starts at data-value', await page.evaluate(() => document.querySelector('#pick [aria-selected="true"]')?.textContent === 'C'));
await page.evaluate(() => { window.__pick = null; document.getElementById('pick').addEventListener('lg-change', (e) => (window.__pick = e.detail.value)); });
await page.focus('#pick');
await page.keyboard.press('ArrowDown');
check('picker moves with arrow keys', await until(() => window.__pick === 'd'));
await page.locator('#pick .lg-picker-item', { hasText: 'F' }).click();
check('picker selects a clicked row', await until(() => window.__pick === 'f'));

// Adaptive glass follows the content underneath
check('adaptive glass turns dark over dark content', await until(() => document.getElementById('adaptDark').classList.contains('lg-dark')));
check('adaptive glass stays light over light content', await until(() => document.getElementById('adaptLight').classList.contains('lg-light')));

// Destroy/enhance round trip
const leaked = await page.evaluate(() => {
  const el = document.querySelector('.lg-segmented');
  LiquidGlass.destroy(el);
  const gone = !el.querySelector('.lg-segmented-indicator');
  LiquidGlass.enhance(el);
  return gone && !!el.querySelector('.lg-segmented-indicator');
});
check('destroy/enhance round trip', leaked);

check('no page errors', errors.length === 0, errors.join(' | '));
await browser.close();
console.log(failed ? `\n${failed} check(s) failed` : '\nall checks passed');
process.exit(failed ? 1 : 0);
