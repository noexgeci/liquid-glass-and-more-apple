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

// Waits for a condition instead of sleeping a fixed time (robust on slow CI).
const until = (fn, arg) => page.waitForFunction(fn, arg, { timeout: 4000 }).then(() => true, () => false);
await page.waitForTimeout(500);

let failed = 0;
const check = (name, ok, extra = '') => {
  console.log(`${ok ? '✓' : '✗'} ${name}${extra ? ' — ' + extra : ''}`);
  if (!ok) failed++;
};

await until(() => document.querySelectorAll('svg[data-lg-defs] filter').length > 3);
const filters = await page.evaluate(() => document.querySelectorAll('svg[data-lg-defs] filter').length);
check('refraction filters generated', filters > 3, filters + ' filters');
check('refraction applied to glass', await until(() => getComputedStyle(document.querySelector('.lg-glass')).backdropFilter.includes('url(')));

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
const slider = page.locator('.lg-slider').first();
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
check('menu opens in the top layer without leaving its parent', await page.evaluate(() => { const el = document.getElementById('menu'); return el.parentNode.id === 'menuHome' && el.matches(':popover-open'); }));
await page.locator('#menu .lg-menu-item').nth(1).click();
check('menu selects and closes', await until(() => window.__menu === 'share' && document.getElementById('menu').hidden));
check('menu leaves the top layer on close', await until(() => !document.getElementById('menu').hasAttribute('popover')));

// Context menu
await page.click('#ctx', { button: 'right' });
check('context menu opens', await until(() => document.getElementById('menu').classList.contains('is-open')));
await page.keyboard.press('Escape');
await until(() => document.getElementById('menu').hidden);

// Sheet
await page.click('#open-sheet');
check('sheet opens', await until(() => { const el = document.getElementById('sheet'); return el.classList.contains('is-open') && el.getBoundingClientRect().height > 100; }));
await page.waitForTimeout(500);
check('sheet escapes a transformed ancestor, stays in its form', await page.evaluate(() => {
  const el = document.getElementById('sheet');
  const r = el.getBoundingClientRect();
  return el.parentNode.id === 'sheetForm' && el.matches(':popover-open') && Math.abs(r.bottom - innerHeight) < 24 && document.getElementById('sheetForm').elements.note.value === 'kept';
}));
await page.click('#sheet-menu-btn');
check('menu inside a sheet shows above it', await until(() => {
  const m = document.getElementById('sheetMenu');
  if (!m.classList.contains('is-open')) return false;
  const r = m.querySelector('.lg-menu-item').getBoundingClientRect();
  return m.contains(document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2));
}));
await page.keyboard.press('Escape');
check('Escape closes only the menu above the sheet', await until(() => document.getElementById('sheetMenu').hidden && document.getElementById('sheet').classList.contains('is-open')));
await page.click('#sheet-alert-btn');
check('alert from a sheet shows above it', await until(() => {
  const a = document.querySelector('.lg-alert.is-open');
  if (!a) return false;
  const r = a.getBoundingClientRect();
  return a.contains(document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2));
}));
await page.keyboard.press('Escape');
check('Escape closes only the alert above the sheet', await until(() => window.__sheetAlert === 'Cancel' && document.getElementById('sheet').classList.contains('is-open')));
await page.waitForTimeout(350);
await page.keyboard.press('Escape');
check('sheet closes', await until(() => document.getElementById('sheet').hidden && !document.getElementById('sheet').hasAttribute('popover')));

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
check('tooltip adds to aria-describedby', (await page.getAttribute('#toggle', 'aria-describedby')) === 'hint lg-tooltip');
await page.mouse.move(0, 0);
check('tooltip restores aria-describedby', await until(() => document.getElementById('toggle').getAttribute('aria-describedby') === 'hint'));
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

// Date picker: locale, selection, keyboard grid, paging, bounds, compact popover
check('calendar follows the locale (Monday first, Hungarian)', await page.evaluate(() => {
  const h = document.querySelector('#cal .lg-calendar-weekdays span');
  return /hétfő/i.test(h.getAttribute('aria-label')) && /szeptember/.test(document.querySelector('#cal .lg-calendar-title-text').textContent);
}));
await page.evaluate(() => { window.__day = null; document.getElementById('cal').addEventListener('lg-change', (e) => (window.__day = e.detail.value)); });
await page.click('#cal .lg-calendar-day[data-date="2026-09-15"]');
check('calendar selects a day', await until(() => window.__day === '2026-09-15' && document.querySelector('#cal input[name="day"]').value === '2026-09-15'));
await page.keyboard.press('ArrowRight');
await page.keyboard.press('ArrowDown');
await page.keyboard.press('PageDown');
check('calendar keyboard grid (arrows, PageDown)', await until(() => document.activeElement.getAttribute('data-date') === '2026-10-23'));
await page.keyboard.press('Enter');
check('Enter picks the focused day', await until(() => window.__day === '2026-10-23'));
check('days before data-min are disabled', await page.evaluate(() => {
  document.querySelector('#cal .lg-calendar-prev').click();
  const d = document.querySelector('#cal .lg-calendar-day[data-date="2026-09-01"]');
  return d.getAttribute('aria-disabled') === 'true' && document.querySelector('#cal .lg-calendar-prev').disabled;
}));
await page.click('#cal .lg-calendar-title');
check('title opens month/year wheels', await until(() => {
  const cols = document.querySelectorAll('#cal .lg-calendar-chooser .lg-picker-column');
  return cols.length === 2 && cols[0].getAttribute('data-value') === '8' && cols[1].getAttribute('data-value') === '2026';
}));
await page.click('#cal .lg-calendar-title');
await page.click('#dp .lg-date-picker-button');
check('compact date picker opens its calendar in the top layer', await until(() => document.querySelector('#dp .lg-date-popover').matches(':popover-open')));
await page.click('#dp .lg-calendar-day[data-date="2026-10-20"]');
check('compact date picker takes the day and closes', await until(() => document.getElementById('dp').getAttribute('data-value') === '2026-10-20' && document.querySelector('#dp .lg-date-popover').hidden && /20/.test(document.querySelector('#dp .lg-date-picker-button').textContent)));

// Time picker: locale 12-hour wheels placed at the value, picks update it
check('time picker shows the locale format', (await page.textContent('#tp .lg-time-picker-button')) === '9:30 PM');
await page.click('#tp .lg-time-picker-button');
check('time picker wheels open at the value', await until(() => {
  const cols = [...document.querySelectorAll('#tp .lg-picker-column')];
  return cols.length === 3 && cols.every((c) => c.clientHeight > 0 && c.scrollTop > 0) && cols.map((c) => c.querySelector('[aria-selected="true"]').textContent).join(' ') === '9 30 PM';
}));
await page.locator('#tp .lg-picker-column').first().locator('.lg-picker-item', { hasText: /^10$/ }).click();
check('time picker takes a wheel change', await until(() => document.getElementById('tp').getAttribute('data-value') === '22:30' && document.querySelector('#tp input[name="alarm"]').value === '22:30'));
await page.keyboard.press('Escape');
await until(() => document.querySelector('#tp .lg-time-popover').hidden);

// Right-to-left: switch and slider mirror like iOS / the native range
{
  const b = await page.locator('#rtlSwitch').boundingBox();
  await page.mouse.move(b.x + b.width - 12, b.y + b.height / 2);
  await page.mouse.down();
  await page.mouse.move(b.x + 4, b.y + b.height / 2, { steps: 8 });
  await page.mouse.up();
  check('rtl: dragging the switch left turns it on', await until(() => document.querySelector('#rtlSwitch input').checked));
  check('rtl: slider minimum is on the right', await page.evaluate(() => {
    const body = document.querySelector('#rtlSlider .lg-slider-body').getBoundingClientRect();
    const t = document.querySelector('#rtlSlider .lg-slider-thumb').getBoundingClientRect();
    return Math.abs((body.right - (t.left + t.width / 2)) / body.width - 0.25) < 0.08;
  }));
}

// Adaptive glass follows the content underneath
check('adaptive glass turns dark over dark content', await until(() => document.getElementById('adaptDark').getAttribute('data-lg-appearance') === 'dark'));
check('adaptive glass stays light over light content', await until(() => document.getElementById('adaptLight').getAttribute('data-lg-appearance') === 'light'));

// Destroy/enhance round trip
const leaked = await page.evaluate(() => {
  const el = document.querySelector('.lg-segmented');
  LiquidGlass.destroy(el);
  const gone = !el.querySelector('.lg-segmented-indicator');
  LiquidGlass.enhance(el);
  return gone && !!el.querySelector('.lg-segmented-indicator');
});
check('destroy/enhance round trip', leaked);

// Engines without the Popover API (Safari < 17, Firefox < 125): presentations
// move to <body> while open and go back where they were afterwards.
const legacy = await browser.newPage({ viewport: { width: 1100, height: 800 } });
legacy.on('pageerror', (e) => errors.push('legacy: ' + e.message));
await legacy.addInitScript(() => {
  delete HTMLElement.prototype.showPopover;
  delete HTMLElement.prototype.hidePopover;
});
await legacy.goto(url);
const luntil = (fn) => legacy.waitForFunction(fn, null, { timeout: 4000 }).then(() => true, () => false);
await legacy.click('#open-sheet');
check('fallback: sheet opens from <body>', await luntil(() => { const el = document.getElementById('sheet'); return el.classList.contains('is-open') && el.parentNode === document.body; }));
await legacy.waitForTimeout(400);
await legacy.keyboard.press('Escape');
check('fallback: sheet returns to its form', await luntil(() => { const el = document.getElementById('sheet'); return el.hidden && el.parentNode.id === 'sheetForm'; }));
await legacy.click('#open-menu');
check('fallback: menu opens from <body>', await luntil(() => { const el = document.getElementById('menu'); return el.classList.contains('is-open') && el.parentNode === document.body; }));
await legacy.keyboard.press('Escape');
check('fallback: menu returns home', await luntil(() => { const el = document.getElementById('menu'); return el.hidden && el.parentNode.id === 'menuHome'; }));
await legacy.close();

check('no page errors', errors.length === 0, errors.join(' | '));
await browser.close();
console.log(failed ? `\n${failed} check(s) failed` : '\nall checks passed');
process.exit(failed ? 1 : 0);
