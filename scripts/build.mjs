// Builds every distributable from src/ into dist/.
//   node scripts/build.mjs          one-off build
//   node scripts/build.mjs --watch  rebuild on change
import { build, context } from 'esbuild';
import { readFile, writeFile, mkdir, copyFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const r = (...p) => path.join(root, ...p);
const pkg = JSON.parse(await readFile(r('package.json'), 'utf8'));
const watch = process.argv.includes('--watch');

// Modern engines. safari16 keeps the -webkit- prefixes Safari still needs;
// light-dark(), linear() easing, :has() and @property pass through untouched.
const target = ['chrome111', 'edge111', 'firefox120', 'safari16'];
const banner = `/*! Liquid Glass Kit v${pkg.version} | MIT | ${pkg.homepage} */`;
const define = { __VERSION__: JSON.stringify(pkg.version) };

// Framework entries import the shared core instead of bundling a second copy.
const shareCore = (file) => ({
  name: 'share-core',
  setup(b) {
    b.onResolve({ filter: /^\.\/core\.js$/ }, () => ({ path: './' + file, external: true }));
  },
});

const replaceVersion = {
  name: 'version',
  setup(b) {
    b.onLoad({ filter: /src[\\/].*\.jsx?$/ }, async (args) => {
      const src = await readFile(args.path, 'utf8');
      return { contents: src.replaceAll('__VERSION__', pkg.version), loader: args.path.endsWith('x') ? 'jsx' : 'js' };
    });
  },
};

const jobs = [
  // core
  { entryPoints: [r('src/index.js')], outfile: r('dist/liquid-glass.mjs'), format: 'esm' },
  { entryPoints: [r('src/index.js')], outfile: r('dist/liquid-glass.cjs'), format: 'cjs' },
  // <script> builds
  { entryPoints: [r('src/global.js')], outfile: r('dist/liquid-glass.js'), format: 'iife' },
  { entryPoints: [r('src/global.js')], outfile: r('dist/liquid-glass.min.js'), format: 'iife', minify: true },
  // React
  {
    entryPoints: [r('src/react.jsx')],
    outfile: r('dist/react.mjs'),
    format: 'esm',
    external: ['react', 'react-dom'],
    plugins: [replaceVersion, shareCore('liquid-glass.mjs')],
    banner: { js: `'use client';\n${banner}` },
    jsx: 'automatic',
  },
  {
    entryPoints: [r('src/react.jsx')],
    outfile: r('dist/react.cjs'),
    format: 'cjs',
    external: ['react', 'react-dom'],
    plugins: [replaceVersion, shareCore('liquid-glass.cjs')],
    banner: { js: `'use client';\n${banner}` },
    jsx: 'automatic',
  },
  // CSS
  { entryPoints: [r('src/liquid-glass.css')], outfile: r('dist/liquid-glass.min.css'), minify: true, loader: { '.css': 'css' } },
].map((o) => ({
  bundle: true,
  target,
  logLevel: 'warning',
  legalComments: 'none',
  banner: { js: banner, css: banner },
  plugins: [replaceVersion],
  define,
  ...o,
}));

async function extras() {
  await mkdir(r('dist'), { recursive: true });
  const css = await readFile(r('src/liquid-glass.css'), 'utf8');
  await writeFile(r('dist/liquid-glass.css'), css.replace('Liquid Glass Kit v0.1.0', 'Liquid Glass Kit v' + pkg.version));
  // Side-effect entry: `import 'liquid-glass-kit/auto'` starts the kit in the browser.
  await writeFile(
    r('dist/auto.mjs'),
    `${banner}\nimport { start } from './liquid-glass.mjs';\nif (typeof window !== 'undefined') start();\nexport * from './liquid-glass.mjs';\n`
  );
  await writeFile(
    r('dist/auto.cjs'),
    `${banner}\n'use strict';\nconst lg = require('./liquid-glass.cjs');\nif (typeof window !== 'undefined') lg.start();\nmodule.exports = lg;\n`
  );
  for (const f of ['index.d.ts', 'react.d.ts']) await copyFile(r('types', f), r('dist', f));
  await copyFile(r('types/index.d.ts'), r('dist/auto.d.ts'));
}

if (watch) {
  for (const j of jobs) await (await context(j)).watch();
  await extras();
  console.log('watching src/ …');
} else {
  await rm(r('dist'), { recursive: true, force: true });
  await Promise.all(jobs.map((j) => build(j)));
  await extras();
  console.log(`built liquid-glass-kit v${pkg.version} → dist/`);
}
