// React bindings in headless Chromium (StrictMode): refs, re-mounts, unmounts
// while open, controlled components and the provider's configuration order.
//   npm test
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import * as esbuild from 'esbuild';

const require = createRequire(import.meta.url);
let playwright;
for (const id of ['playwright', '/opt/node22/lib/node_modules/playwright']) {
  try {
    playwright = require(id);
    break;
  } catch (_) {}
}
if (!playwright) {
  console.log('react-smoke: playwright not installed, skipping (npm i -D playwright)');
  process.exit(0);
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'tests/.out');
fs.mkdirSync(out, { recursive: true });
await esbuild.build({
  entryPoints: [path.join(root, 'tests/react-app.jsx')],
  bundle: true,
  outfile: path.join(out, 'react-app.js'),
  jsx: 'automatic',
  define: { 'process.env.NODE_ENV': '"development"' },
  logLevel: 'warning',
});
fs.writeFileSync(
  path.join(out, 'react.html'),
  '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../dist/liquid-glass.css"></head>' +
    '<body><div id="root"></div><script src="react-app.js"></script></body></html>'
);

const browser = await playwright.chromium.launch({
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-gpu-rasterization'],
});
const page = await browser.newPage({ viewport: { width: 900, height: 800 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => (m.type() === 'error' || m.type() === 'warning') && errors.push(m.text()));
await page.goto(pathToFileURL(path.join(out, 'react.html')).href);
await page.waitForSelector('#g');

const until = (fn, arg) => page.waitForFunction(fn, arg, { timeout: 4000 }).then(() => true, () => false);
let failed = 0;
const check = (name, ok, extra = '') => {
  console.log(`${ok ? '✓' : '✗'} react: ${name}${extra ? ' — ' + extra : ''}`);
  if (!ok) failed++;
};

check('provider options apply before children mount', await page.evaluate(() => !document.getElementById('g').classList.contains('lg-refractive')));
check('forwarded ref points at the element', (await page.evaluate(() => window.__glassRef.current && window.__glassRef.current.tagName)) === 'DIV');
await page.evaluate(() => window.__set.setTag('section'));
check('forwarded ref follows a new element (as)', await until(() => window.__glassRef.current && window.__glassRef.current.tagName === 'SECTION'));

await page.click('#mt');
check('menu opens', await until(() => !!document.querySelector('.lg-menu.is-open')));
await page.evaluate(() => window.__set.setShowMenu(false));
check('menu unmounted while open is released', await until(() => document.querySelectorAll('.lg-menu').length === 1));
await page.click('#mt2');
check('another menu opens afterwards', await until(() => !!document.querySelector('.lg-menu.is-open')));
await page.keyboard.press('Escape');
check('and closes with Escape', await until(() => !document.querySelector('.lg-menu.is-open')));

const shown = () => page.evaluate(() => (document.querySelector('#pc .lg-picker-item[aria-selected="true"]') || {}).textContent);
check('picker column starts at value', (await shown()) === 'b');
await page.evaluate(() => window.__set.setPv('d'));
check('picker column follows controlled value', await until(() => (document.querySelector('#pc .lg-picker-item[aria-selected="true"]') || {}).textContent === 'd'));

check('registered icon keeps its own SVG', (await page.evaluate(() => document.querySelector('#ic svg').getAttribute('viewBox'))) === '0 0 10 10');
check('built-in icon renders', (await page.evaluate(() => document.querySelector('#ic2 svg').getAttribute('stroke-linecap'))) === 'round');

await page.evaluate(() => window.__set.setSeg('c'));
check('segmented control keeps is-ready across renders', await until(() => document.getElementById('seg').classList.contains('is-ready')));

await page.evaluate(() => window.__set.setOpen(true));
check('sheet opens in the top layer', await until(() => { const s = document.getElementById('sh'); return s.classList.contains('is-open') && s.matches(':popover-open'); }));
await page.keyboard.press('Escape');
check('Escape closes the sheet and reports it', await until(() => document.getElementById('sh').hidden && window.__open === false));

check('no errors or warnings', errors.length === 0, errors.join(' | '));
await browser.close();
if (failed) {
  console.log(`\n${failed} react check(s) failed`);
  process.exit(1);
}
console.log('\nall react checks passed');
