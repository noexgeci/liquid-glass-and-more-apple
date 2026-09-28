/*!
 * Liquid Glass Kit — Apple-style Liquid Glass UI for the web
 * https://github.com/noexgeci/liquid-glass-and-more-apple
 * MIT License. Not affiliated with or endorsed by Apple Inc.
 *
 * SSR-safe: nothing here touches `window` or `document` until a function is
 * called in the browser, so the module can be imported by Next.js server
 * components, Remix loaders, Astro frontmatter, etc.
 */

export const version = '__VERSION__';

const SVG_NS = 'http://www.w3.org/2000/svg';

const config = {
  refraction: 'auto', // true | false | 'auto' (Chromium engines: Chrome, Edge, Opera, Brave, Electron)
  dynamicLight: true, // specular rim follows the pointer
  observe: true, // enhance components that are added to the DOM later
};

export function configure(options) {
  Object.assign(config, options || {});
  refractionSupport = undefined;
  return { ...config };
}

/* ==========================================================================
   Environment helpers
   ========================================================================== */

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

function clamp(v, min, max) {
  return v < min ? min : v > max ? max : v;
}

function $(sel, root) {
  if (!sel || !isBrowser()) return null;
  if (typeof sel !== 'string') return sel;
  return (root || document).querySelector(sel);
}

function $$(sel, root) {
  return Array.from((root || document).querySelectorAll(sel));
}

function create(tag, className, attrs) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (attrs) {
    for (const k in attrs) if (attrs[k] != null) el.setAttribute(k, attrs[k]);
  }
  return el;
}

function emit(el, name, detail) {
  el.dispatchEvent(new CustomEvent(name, { bubbles: true, detail }));
}

function nextFrame(fn) {
  requestAnimationFrame(() => requestAnimationFrame(fn));
}

function mq(query) {
  return !!(window.matchMedia && window.matchMedia(query).matches);
}

function numAttr(el, name, fallback) {
  const v = el.getAttribute(name);
  return v == null || v === '' ? fallback : parseFloat(v);
}

/* Per-element state: which behaviors are attached and how to undo them. */
function state(el) {
  if (!el.__lg) el.__lg = { flags: {}, cleanups: [], injected: [] };
  return el.__lg;
}

function claim(el, flag) {
  const s = state(el);
  if (s.flags[flag]) return false;
  s.flags[flag] = true;
  return true;
}

function onCleanup(el, fn) {
  state(el).cleanups.push(fn);
}

function inject(host, node, before) {
  if (before) host.insertBefore(node, before);
  else host.appendChild(node);
  state(host).injected.push(node);
  return node;
}

function listen(el, target, type, fn, opts) {
  target.addEventListener(type, fn, opts);
  onCleanup(el, () => target.removeEventListener(type, fn, opts));
}

function isChromium() {
  const uad = navigator.userAgentData;
  if (uad && uad.brands) return uad.brands.some((b) => b.brand === 'Chromium');
  const ua = navigator.userAgent;
  return /Chrome\/\d+/.test(ua) && !/Firefox\//.test(ua);
}

let refractionSupport;

/** True when the engine can render SVG refraction inside backdrop-filter. */
export function supportsRefraction() {
  if (!isBrowser()) return false;
  if (refractionSupport !== undefined) return refractionSupport;
  const css = !!(window.CSS && CSS.supports && CSS.supports('backdrop-filter', 'url(#lg)'));
  if (config.refraction === false || mq('(prefers-reduced-transparency: reduce)')) refractionSupport = false;
  else if (config.refraction === true) refractionSupport = css;
  else refractionSupport = css && isChromium();
  return refractionSupport;
}

/* ==========================================================================
   Refraction engine

   Each glass surface gets an SVG filter whose displacement map models a
   convex glass rim: pixels inside the rim band sample the backdrop from
   further inward (lensing) while the center stays true. Thumbs and lenses
   additionally magnify. The filter uses objectBoundingBox units, so it
   stretches with the element during animations and a fresh map is
   generated once the size settles.
   ========================================================================== */

let defs = null;
const filters = new Map(); // key -> { id, refs, node }
const unused = []; // LRU of keys with refs === 0
const tracked = new Map(); // element -> refraction state
let filterSeq = 0;
let uid = 0;
const MAX_UNUSED = 32;
const MAP_MAX_SIDE = 320;

function getDefs() {
  if (defs && defs.isConnected) return defs;
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.setAttribute('data-lg-defs', '');
  svg.style.cssText = 'position:absolute;top:0;left:0;width:0;height:0;overflow:hidden;pointer-events:none';
  defs = document.createElementNS(SVG_NS, 'defs');
  svg.appendChild(defs);
  (document.body || document.documentElement).appendChild(svg);
  return defs;
}

/**
 * Builds the displacement map for a rounded rectangle.
 * R/G encode the x/y sample offset (0.5 = none), in units of `scale`.
 */
export function createDisplacementMap(w, h, radius, bezel, depth, magnify) {
  const res = Math.min(1, MAP_MAX_SIDE / Math.max(w, h));
  const mw = Math.max(2, Math.round(w * res));
  const mh = Math.max(2, Math.round(h * res));
  const hw = w / 2;
  const hh = h / 2;
  const r = Math.min(radius, hw, hh);
  const B = Math.max(1, Math.min(bezel, hw, hh));
  const rn = Math.min(Math.max(r, B), hw, hh); // radius used for rim normals
  const lensK = magnify > 1 ? 1 - 1 / magnify : 0;
  const maxD = depth * B + (lensK * Math.hypot(w, h)) / 2;
  const scale = Math.max(1, Math.ceil(maxD * 2 + 2));

  const canvas = document.createElement('canvas');
  canvas.width = mw;
  canvas.height = mh;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(mw, mh);
  const data = img.data;

  for (let j = 0; j < mh; j++) {
    const py = (j + 0.5) / res - hh;
    const ay = Math.abs(py);
    for (let i = 0; i < mw; i++) {
      const px = (i + 0.5) / res - hw;
      const ax = Math.abs(px);
      // signed distance to the rounded rect, positive inside
      const qx = ax - (hw - r);
      const qy = ay - (hh - r);
      let dist = -(Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r);
      if (dist < 0) dist = 0;
      let dx = 0;
      let dy = 0;
      if (dist < B) {
        const nx0 = ax - (hw - rn);
        const ny0 = ay - (hh - rn);
        let nx;
        let ny;
        if (nx0 > 0 && ny0 > 0) {
          const l = Math.hypot(nx0, ny0);
          nx = nx0 / l;
          ny = ny0 / l;
        } else if (nx0 > ny0) {
          nx = 1;
          ny = 0;
        } else {
          nx = 0;
          ny = 1;
        }
        if (px < 0) nx = -nx;
        if (py < 0) ny = -ny;
        // convex rim: strongest bend at the edge, smooth join with the flat center
        const t = 1 - dist / B;
        const m = depth * B * t * t;
        dx = -nx * m;
        dy = -ny * m;
      }
      if (lensK) {
        dx -= px * lensK;
        dy -= py * lensK;
      }
      const k = (j * mw + i) * 4;
      data[k] = clamp(Math.round((dx / scale + 0.5) * 255), 0, 255);
      data[k + 1] = clamp(Math.round((dy / scale + 0.5) * 255), 0, 255);
      data[k + 2] = 128;
      data[k + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return { url: canvas.toDataURL('image/png'), scale, width: mw, height: mh };
}

function acquireFilter(key, w, h, r, o) {
  const entry = filters.get(key);
  if (entry) {
    if (entry.refs === 0) {
      const idx = unused.indexOf(key);
      if (idx > -1) unused.splice(idx, 1);
    }
    entry.refs++;
    return entry.id;
  }
  const map = createDisplacementMap(w, h, r, o.bezel, o.depth, o.magnify);
  const id = 'lg-refract-' + ++filterSeq;
  const f = document.createElementNS(SVG_NS, 'filter');
  f.setAttribute('id', id);
  f.setAttribute('x', '0');
  f.setAttribute('y', '0');
  f.setAttribute('width', '1');
  f.setAttribute('height', '1');
  f.setAttribute('color-interpolation-filters', 'sRGB');
  // Color first, then displacement: a color primitive placed after
  // feDisplacementMap renders tile artifacts in Chromium's backdrop path.
  let input = 'SourceGraphic';
  if (o.saturate !== 1) {
    const sat = document.createElementNS(SVG_NS, 'feColorMatrix');
    sat.setAttribute('in', input);
    sat.setAttribute('type', 'saturate');
    sat.setAttribute('values', String(o.saturate));
    sat.setAttribute('result', 'sat');
    f.appendChild(sat);
    input = 'sat';
  }
  if (o.brightness !== 1) {
    const ct = document.createElementNS(SVG_NS, 'feComponentTransfer');
    ct.setAttribute('in', input);
    ct.setAttribute('result', 'lit');
    for (const ch of ['R', 'G', 'B']) {
      const fn = document.createElementNS(SVG_NS, 'feFunc' + ch);
      fn.setAttribute('type', 'linear');
      fn.setAttribute('slope', String(o.brightness));
      ct.appendChild(fn);
    }
    f.appendChild(ct);
    input = 'lit';
  }
  const fi = document.createElementNS(SVG_NS, 'feImage');
  fi.setAttribute('href', map.url);
  fi.setAttribute('preserveAspectRatio', 'none');
  fi.setAttribute('result', 'map');
  const fd = document.createElementNS(SVG_NS, 'feDisplacementMap');
  fd.setAttribute('in', input);
  fd.setAttribute('in2', 'map');
  fd.setAttribute('scale', String(map.scale));
  fd.setAttribute('xChannelSelector', 'R');
  fd.setAttribute('yChannelSelector', 'G');
  fd.setAttribute('result', 'bent');
  f.append(fi, fd);
  // Frost happens in the filter too, so the CSS chain is a single url():
  // mixing url() with CSS blur/color functions misrenders in Chromium.
  if (o.blur > 0) {
    const gb = document.createElementNS(SVG_NS, 'feGaussianBlur');
    gb.setAttribute('in', 'bent');
    gb.setAttribute('stdDeviation', String(o.blur));
    gb.setAttribute('edgeMode', 'duplicate');
    f.appendChild(gb);
  }
  getDefs().appendChild(f);
  filters.set(key, { id, refs: 1, node: f });
  return id;
}

function releaseFilter(key) {
  const entry = key && filters.get(key);
  if (!entry) return;
  entry.refs--;
  if (entry.refs > 0) return;
  unused.push(key);
  while (unused.length > MAX_UNUSED) {
    const old = unused.shift();
    const e = filters.get(old);
    if (e && e.refs <= 0) {
      e.node.remove();
      filters.delete(old);
    }
  }
}

function parseRadius(value, w, h) {
  let v = parseFloat(value) || 0;
  if (/%/.test(value)) v = (v / 100) * Math.min(w, h);
  return Math.min(v, w / 2, h / 2);
}

let resizeObserver = null;
function getResizeObserver() {
  if (resizeObserver || typeof ResizeObserver === 'undefined') return resizeObserver;
  resizeObserver = new ResizeObserver((entries) => {
    for (const e of entries) {
      const box = e.borderBoxSize && e.borderBoxSize[0];
      scheduleUpdate(e.target, box ? box.inlineSize : e.target.offsetWidth, box ? box.blockSize : e.target.offsetHeight);
    }
  });
  return resizeObserver;
}

function scheduleUpdate(el, w, h) {
  const st = tracked.get(el);
  if (!st) return;
  st.w = w;
  st.h = h;
  const now = performance.now();
  // While an element keeps resizing (animations) the current map stretches;
  // a fresh one is generated once things settle.
  if (now - st.last < 90) {
    clearTimeout(st.timer);
    st.timer = setTimeout(() => applyRefraction(el), 110);
    st.last = now;
    return;
  }
  st.last = now;
  applyRefraction(el);
}

function applyRefraction(el) {
  const st = tracked.get(el);
  if (!st || !st.w || !st.h || st.w < 4 || st.h < 4) return;
  const w = Math.round(st.w);
  const h = Math.round(st.h);
  const r = parseRadius(getComputedStyle(el).borderTopLeftRadius, w, h);
  const o = st.opts;
  const bezel = numAttr(el, 'data-lg-bezel', o.bezel != null ? o.bezel : clamp(Math.min(w, h) * 0.3, 6, 28));
  const depth = clamp(numAttr(el, 'data-lg-depth', o.depth != null ? o.depth : 0.45), 0, 0.5);
  const magnify = numAttr(el, 'data-lg-magnify', o.magnify != null ? o.magnify : 1);
  const cs = getComputedStyle(el);
  const saturate = o.saturate != null ? o.saturate : parseFloat(cs.getPropertyValue('--_sat')) || 1;
  const brightness = o.brightness != null ? o.brightness : parseFloat(cs.getPropertyValue('--_bright')) || 1;
  const blurVar = cs.getPropertyValue('--lg-refract-blur');
  const blur = o.blur != null ? o.blur : blurVar ? parseFloat(blurVar) || 0 : 0;
  const key = [w, h, Math.round(r), Math.round(bezel), depth.toFixed(2), magnify.toFixed(2), saturate, brightness, blur].join(':');
  if (key === st.key) return;
  const id = acquireFilter(key, w, h, r, { bezel, depth, magnify, saturate, brightness, blur });
  releaseFilter(st.key);
  st.key = key;
  el.style.setProperty('--lg-refract', 'url(#' + id + ')');
  el.classList.add('lg-refractive');
}

/**
 * Adds real refraction to any element with a backdrop (Chromium only;
 * elsewhere the CSS blur fallback stays in place).
 * @param {Element|string} el
 * @param {{bezel?: number, depth?: number, magnify?: number}} [opts]
 */
export function refract(el, opts) {
  el = $(el);
  if (!el || !supportsRefraction() || !getResizeObserver()) return el;
  if (el.getAttribute('data-lg-refraction') === 'off') return el;
  const existing = tracked.get(el);
  if (existing) {
    if (opts) {
      existing.opts = opts;
      existing.key = null;
      applyRefraction(el);
    }
    return el;
  }
  tracked.set(el, { opts: opts || {}, key: null, w: 0, h: 0, last: 0, timer: 0 });
  getResizeObserver().observe(el);
  return el;
}

/** Removes refraction added by `refract`. */
export function unrefract(el) {
  el = $(el);
  const st = el && tracked.get(el);
  if (!st) return;
  clearTimeout(st.timer);
  if (resizeObserver) resizeObserver.unobserve(el);
  releaseFilter(st.key);
  tracked.delete(el);
  el.style.removeProperty('--lg-refract');
  el.classList.remove('lg-refractive');
}

function sweepDisconnected() {
  tracked.forEach((_, el) => {
    if (!el.isConnected) unrefract(el);
  });
}

/* ==========================================================================
   Dynamic light — the specular rim follows the pointer
   ========================================================================== */

let lightFrame = 0;
let lastAngle = 135;

function onLightMove(e) {
  if (lightFrame || e.pointerType === 'touch') return;
  const x = e.clientX;
  const y = e.clientY;
  lightFrame = requestAnimationFrame(() => {
    lightFrame = 0;
    const nx = x / window.innerWidth - 0.5;
    const ny = y / window.innerHeight - 0.5;
    const angle = 135 + nx * 50 - ny * 30;
    if (Math.abs(angle - lastAngle) < 1.5) return;
    lastAngle = angle;
    document.documentElement.style.setProperty('--lg-light-angle', angle.toFixed(1) + 'deg');
  });
}

/* ==========================================================================
   Press feedback — glass swells, lights up at the touch point and leans
   toward the finger
   ========================================================================== */

const PRESSABLE = '.lg-button, .lg-glass--interactive, .lg-tabbar-search, .lg-tabbar-action';

function onPressStart(e) {
  if (e.button > 0) return;
  const el = e.target.closest && e.target.closest(PRESSABLE);
  if (!el || el.disabled || el.getAttribute('aria-disabled') === 'true') return;
  const rect = el.getBoundingClientRect();
  const setPoint = (ev) => {
    const px = clamp((ev.clientX - rect.left) / rect.width, 0, 1);
    const py = clamp((ev.clientY - rect.top) / rect.height, 0, 1);
    el.style.setProperty('--lg-px', (px * 100).toFixed(1) + '%');
    el.style.setProperty('--lg-py', (py * 100).toFixed(1) + '%');
    el.style.setProperty('--lg-dx', ((px - 0.5) * Math.min(8, rect.width * 0.08)).toFixed(2) + 'px');
    el.style.setProperty('--lg-dy', ((py - 0.5) * Math.min(6, rect.height * 0.1)).toFixed(2) + 'px');
  };
  setPoint(e);
  el.classList.add('is-pressed');
  const start = performance.now();
  const move = (ev) => setPoint(ev);
  const end = () => {
    document.removeEventListener('pointermove', move);
    document.removeEventListener('pointerup', end);
    document.removeEventListener('pointercancel', end);
    setTimeout(() => {
      el.classList.remove('is-pressed');
      el.style.removeProperty('--lg-dx');
      el.style.removeProperty('--lg-dy');
    }, Math.max(0, 140 - (performance.now() - start)));
  };
  document.addEventListener('pointermove', move, { passive: true });
  document.addEventListener('pointerup', end);
  document.addEventListener('pointercancel', end);
}

/* ==========================================================================
   Switch — thumb turns into a glass lens while held, draggable
   ========================================================================== */

function initSwitch(el) {
  if (!claim(el, 'switch')) return;
  const input = el.querySelector('input');
  if (!input) return;
  if (!input.hasAttribute('role')) input.setAttribute('role', 'switch');
  let thumb = el.querySelector('.lg-switch-thumb');
  if (!thumb) thumb = inject(el, create('span', 'lg-switch-thumb', { 'aria-hidden': 'true' }));
  refract(thumb, { bezel: 7, depth: 0.35, magnify: 1.12, saturate: 1.6, brightness: 1.08, blur: 0.4 });

  let pointerId = null;
  let startX = 0;
  let startOn = false;
  let moved = false;
  let x = 0;
  let travel = 0;
  let pressedAt = 0;
  let suppressClick = false;

  listen(el, el, 'pointerdown', (e) => {
    if (input.disabled || e.button > 0) return;
    pointerId = e.pointerId;
    startX = e.clientX;
    startOn = input.checked;
    moved = false;
    pressedAt = performance.now();
    const pad = thumb.offsetLeft;
    travel = el.clientWidth - thumb.offsetWidth - pad * 2;
    x = startOn ? travel : 0;
    el.classList.add('is-pressed');
    try {
      el.setPointerCapture(pointerId);
    } catch (_) {}
  });

  listen(el, el, 'pointermove', (e) => {
    if (e.pointerId !== pointerId) return;
    const dx = e.clientX - startX;
    if (!moved && Math.abs(dx) > 3) {
      moved = true;
      el.classList.add('is-dragging');
    }
    if (moved) {
      x = clamp((startOn ? travel : 0) + dx, 0, travel);
      thumb.style.setProperty('--_x', x + 'px');
    }
  });

  const end = (e) => {
    if (e.pointerId !== pointerId) return;
    pointerId = null;
    el.classList.remove('is-dragging');
    if (moved) {
      thumb.style.removeProperty('--_x');
      // A real click keeps frameworks (React, Vue…) in sync with the change.
      if (x > travel / 2 !== input.checked) input.click();
      suppressClick = true;
      setTimeout(() => (suppressClick = false), 60);
    }
    setTimeout(() => {
      if (pointerId == null) el.classList.remove('is-pressed');
    }, Math.max(0, 260 - (performance.now() - pressedAt)));
  };
  listen(el, el, 'pointerup', end);
  listen(el, el, 'pointercancel', end);
  listen(
    el,
    el,
    'click',
    (e) => {
      if (suppressClick && e.isTrusted) {
        suppressClick = false;
        e.preventDefault();
      }
    },
    true
  );
}

/* ==========================================================================
   Slider — native <input type=range> underneath, glass lens thumb on top
   ========================================================================== */

function initSlider(el) {
  if (!claim(el, 'slider')) return;
  const input = el.querySelector('input[type="range"]');
  if (!input) return;
  let body = el.querySelector('.lg-slider-body');
  if (!body) {
    body = create('div', 'lg-slider-body');
    input.parentNode.insertBefore(body, input);
    body.appendChild(input);
    onCleanup(el, () => {
      if (body.parentNode) {
        body.parentNode.insertBefore(input, body);
        body.remove();
      }
    });
  }
  if (!body.querySelector('.lg-slider-track')) {
    const track = create('div', 'lg-slider-track', { 'aria-hidden': 'true' });
    track.appendChild(create('div', 'lg-slider-fill'));
    inject(body, track);
  }
  const ticks = parseInt(el.getAttribute('data-lg-ticks'), 10);
  if (ticks > 1 && !body.querySelector('.lg-slider-ticks')) {
    const row = create('div', 'lg-slider-ticks', { 'aria-hidden': 'true' });
    for (let i = 0; i < ticks; i++) row.appendChild(document.createElement('i'));
    inject(body, row);
  }
  let thumb = body.querySelector('.lg-slider-thumb');
  if (!thumb) thumb = inject(body, create('div', 'lg-slider-thumb', { 'aria-hidden': 'true' }));
  refract(thumb, { bezel: 7, depth: 0.35, magnify: 1.18, saturate: 1.5, brightness: 1.08, blur: 0.4 });

  const sync = () => {
    const min = parseFloat(input.min || 0);
    const max = parseFloat(input.max || 100);
    const ratio = max > min ? (parseFloat(input.value) - min) / (max - min) : 0;
    el.style.setProperty('--_ratio', clamp(ratio, 0, 1).toFixed(4));
  };
  sync();
  listen(el, input, 'input', sync);
  listen(el, input, 'change', sync);
  el.classList.add('is-ready');
  onCleanup(el, () => el.classList.remove('is-ready'));
  state(el).sync = sync;

  let activeAt = 0;
  listen(el, input, 'pointerdown', (e) => {
    if (input.disabled || e.button > 0) return;
    activeAt = performance.now();
    el.classList.add('is-active');
    const end = () => {
      document.removeEventListener('pointerup', end);
      document.removeEventListener('pointercancel', end);
      setTimeout(() => el.classList.remove('is-active'), Math.max(0, 220 - (performance.now() - activeAt)));
    };
    document.addEventListener('pointerup', end);
    document.addEventListener('pointercancel', end);
  });

  // Programmatic `input.value = …` also updates the visuals. Framework-managed
  // sliders (data-lg-controlled) render the ratio themselves.
  const desc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
  if (desc && desc.set && !el.hasAttribute('data-lg-controlled')) {
    Object.defineProperty(input, 'value', {
      configurable: true,
      get() {
        return desc.get.call(this);
      },
      set(v) {
        desc.set.call(this, v);
        sync();
      },
    });
    onCleanup(el, () => delete input.value);
  }
}

/* ==========================================================================
   Segmented control — sliding pill that turns into a draggable lens
   ========================================================================== */

function initSegmented(el) {
  if (!claim(el, 'segmented')) return;
  let indicator = el.querySelector(':scope > .lg-segmented-indicator');
  if (!indicator) indicator = inject(el, create('span', 'lg-segmented-indicator', { 'aria-hidden': 'true' }), el.firstChild);
  refract(indicator, { bezel: 8, depth: 0.35, magnify: 1.1, saturate: 1.5, brightness: 1.06, blur: 0 });

  const items = () => Array.from(el.children).filter((c) => c.matches('label, button'));
  const isSelected = (item) => {
    const input = item.querySelector('input');
    if (input) return input.checked;
    return item.getAttribute('aria-pressed') === 'true' || item.getAttribute('aria-selected') === 'true';
  };
  const selectedIndex = () => items().findIndex(isSelected);

  const place = (index) => {
    const item = items()[index];
    if (!item) {
      indicator.style.opacity = '0';
      return;
    }
    indicator.style.opacity = '';
    indicator.style.setProperty('--_x', item.offsetLeft + 'px');
    indicator.style.setProperty('--_w', item.offsetWidth + 'px');
  };

  const select = (index, fromUser) => {
    const list = items();
    const item = list[index];
    if (!item) return;
    const input = item.querySelector('input');
    if (input) {
      if (!input.checked) {
        if (fromUser) input.click();
        else input.checked = true;
      }
    } else {
      list.forEach((it, i) => {
        it.setAttribute(it.hasAttribute('aria-selected') ? 'aria-selected' : 'aria-pressed', i === index ? 'true' : 'false');
      });
      if (fromUser) emit(el, 'lg-change', { index, value: item.value || item.textContent.trim() });
    }
    place(index);
  };
  state(el).select = select;
  state(el).refresh = () => place(selectedIndex());

  indicator.style.transition = 'none';
  place(selectedIndex());
  el.classList.add('is-ready');
  nextFrame(() => (indicator.style.transition = ''));
  onCleanup(el, () => el.classList.remove('is-ready'));

  listen(el, el, 'change', () => place(selectedIndex()));
  listen(el, el, 'click', (e) => {
    const item = e.target.closest('button');
    if (item && item.parentNode === el) select(items().indexOf(item), true);
  });

  const ro = getResizeObserver() && new ResizeObserver(() => place(selectedIndex()));
  if (ro) {
    ro.observe(el);
    onCleanup(el, () => ro.disconnect());
  }

  // Drag the selection lens (starts on the selected segment, as on iOS).
  let drag = null;
  listen(el, el, 'pointerdown', (e) => {
    if (e.button > 0) return;
    const list = items();
    const item = e.target.closest('label, button');
    const idx = list.indexOf(item);
    if (idx < 0 || idx !== selectedIndex()) return;
    drag = { id: e.pointerId, startX: e.clientX, x0: item.offsetLeft, w: item.offsetWidth, moved: false, near: idx };
    el.classList.add('is-dragging');
    try {
      el.setPointerCapture(e.pointerId);
    } catch (_) {}
  });
  listen(el, el, 'pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.startX;
    if (!drag.moved && Math.abs(dx) < 3) return;
    drag.moved = true;
    indicator.classList.add('is-moving');
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    const x = clamp(drag.x0 + dx, pad, el.clientWidth - pad - drag.w);
    indicator.style.setProperty('--_x', x + 'px');
    const center = x + drag.w / 2;
    let best = Infinity;
    items().forEach((it, i) => {
      const d = Math.abs(it.offsetLeft + it.offsetWidth / 2 - center);
      if (d < best) {
        best = d;
        drag.near = i;
      }
    });
  });
  const endDrag = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const d = drag;
    drag = null;
    indicator.classList.remove('is-moving');
    setTimeout(() => el.classList.remove('is-dragging'), d.moved ? 0 : 180);
    if (d.moved) {
      swallowNextClick(el);
      select(d.near, true);
    } else {
      place(selectedIndex());
    }
  };
  listen(el, el, 'pointerup', endDrag);
  listen(el, el, 'pointercancel', endDrag);
}

function swallowNextClick(el) {
  const swallow = (ev) => {
    if (!ev.isTrusted) return;
    ev.preventDefault();
    ev.stopPropagation();
    el.removeEventListener('click', swallow, true);
  };
  el.addEventListener('click', swallow, true);
  setTimeout(() => el.removeEventListener('click', swallow, true), 60);
}

/* ==========================================================================
   Tab bar — floating capsule, sliding selection, glass lens while dragging,
   minimizes on scroll
   ========================================================================== */

function initTabbar(bar) {
  if (!claim(bar, 'tabbar')) return;
  const tabsEl = bar.querySelector('.lg-tabbar-tabs');
  if (!tabsEl) return;
  let indicator = tabsEl.querySelector(':scope > .lg-tabbar-indicator');
  if (!indicator) indicator = inject(tabsEl, create('div', 'lg-tabbar-indicator', { 'aria-hidden': 'true' }), tabsEl.firstChild);
  let lens = bar.querySelector(':scope > .lg-tabbar-lens');
  if (!lens) lens = inject(bar, create('div', 'lg-tabbar-lens', { 'aria-hidden': 'true' }));
  refract(lens, { bezel: 14, depth: 0.4, magnify: 1.16, saturate: 1.4, brightness: 1.05, blur: 0 });

  const tabs = () => $$('.lg-tab', tabsEl);
  const current = () =>
    tabs().findIndex((t) => t.classList.contains('is-selected') || t.getAttribute('aria-current') === 'page' || t.getAttribute('aria-selected') === 'true');

  const place = (index) => {
    const t = tabs()[index];
    if (!t) return;
    const pad = parseFloat(getComputedStyle(tabsEl).paddingLeft) || 0;
    indicator.style.left = pad + 'px';
    indicator.style.setProperty('--_x', t.offsetLeft - pad + 'px');
    indicator.style.setProperty('--_w', t.offsetWidth + 'px');
  };

  const select = (index, fromUser) => {
    const list = tabs();
    const t = list[index];
    if (!t) return;
    list.forEach((tab, i) => {
      const on = i === index;
      tab.classList.toggle('is-selected', on);
      if (tab.tagName === 'A') {
        if (on) tab.setAttribute('aria-current', 'page');
        else tab.removeAttribute('aria-current');
      } else {
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
      }
    });
    place(index);
    if (fromUser) emit(bar, 'lg-change', { index, tab: t, value: t.getAttribute('data-value') });
  };
  state(bar).select = select;
  state(bar).refresh = () => place(Math.max(0, current()));

  indicator.style.transition = 'none';
  place(Math.max(0, current()));
  nextFrame(() => (indicator.style.transition = ''));
  const ro = getResizeObserver() && new ResizeObserver(() => place(Math.max(0, current())));
  if (ro) {
    ro.observe(tabsEl);
    onCleanup(bar, () => ro.disconnect());
  }

  // Tabs are often links: keep the browser from starting a link drag.
  listen(bar, tabsEl, 'dragstart', (e) => e.preventDefault());
  listen(bar, tabsEl, 'click', (e) => {
    const t = e.target.closest('.lg-tab');
    if (!t) return;
    if (t.tagName === 'A' && (t.getAttribute('href') || '#').charAt(0) === '#') e.preventDefault();
    bar.classList.remove('is-minimized');
    select(tabs().indexOf(t), true);
  });

  let drag = null;
  const lensTo = (cx, animate) => {
    const br = bar.getBoundingClientRect();
    const tr = tabsEl.getBoundingClientRect();
    const list = tabs();
    const ref = list[Math.max(0, current())] || list[0];
    const w = ref.offsetWidth + 14;
    const x = clamp(cx - w / 2, tr.left - 4, tr.right - w + 4) - br.left;
    lens.classList.toggle('is-moving', !animate);
    lens.style.setProperty('--_w', w + 'px');
    lens.style.setProperty('--_lh', tr.height + 10 + 'px');
    lens.style.setProperty('--_x', x + 'px');
    lens.style.setProperty('--_y', tr.top - br.top - 5 + 'px');
    let best = Infinity;
    let near = 0;
    list.forEach((t, i) => {
      const r = t.getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - cx);
      if (d < best) {
        best = d;
        near = i;
      }
    });
    return near;
  };
  listen(bar, tabsEl, 'pointerdown', (e) => {
    if (e.button > 0 || bar.classList.contains('is-minimized')) return;
    const t = e.target.closest('.lg-tab');
    if (!t) return;
    const r = t.getBoundingClientRect();
    drag = { id: e.pointerId, startX: e.clientX, moved: false };
    drag.near = lensTo(r.left + r.width / 2, true);
    drag.timer = setTimeout(() => drag && bar.classList.add('is-dragging'), 90);
  });
  listen(bar, tabsEl, 'pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    if (!drag.moved && Math.abs(e.clientX - drag.startX) < 6) return;
    if (!drag.moved) {
      drag.moved = true;
      clearTimeout(drag.timer);
      bar.classList.add('is-dragging');
      try {
        tabsEl.setPointerCapture(e.pointerId);
      } catch (_) {}
    }
    drag.near = lensTo(e.clientX, false);
  });
  const endDrag = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const d = drag;
    drag = null;
    clearTimeout(d.timer);
    if (d.moved) {
      swallowNextClick(tabsEl);
      select(d.near, true);
    }
    const t = tabs()[d.moved ? d.near : Math.max(0, current())];
    if (t) {
      const r = t.getBoundingClientRect();
      lensTo(r.left + r.width / 2, true);
    }
    setTimeout(() => bar.classList.remove('is-dragging'), d.moved ? 60 : 200);
  };
  listen(bar, tabsEl, 'pointerup', endDrag);
  listen(bar, tabsEl, 'pointercancel', endDrag);

  const target = bar.getAttribute('data-lg-minimize-on-scroll');
  if (target != null) {
    const scroller = target && target !== 'window' ? $(target) : window;
    if (scroller) {
      let lastY = 0;
      const getY = () => (scroller === window ? window.scrollY : scroller.scrollTop);
      listen(
        bar,
        scroller,
        'scroll',
        () => {
          const y = getY();
          const dy = y - lastY;
          if (y < 40 || dy < -12) bar.classList.remove('is-minimized');
          else if (dy > 6 && y > 80) bar.classList.add('is-minimized');
          if (Math.abs(dy) > 6 || y < 40) lastY = y;
        },
        { passive: true }
      );
    }
  }
}

/* ==========================================================================
   Navigation bar — inline title and scroll edge effect after scrolling
   ========================================================================== */

function scrollParent(el) {
  let p = el.parentElement;
  while (p && p !== document.body) {
    const oy = getComputedStyle(p).overflowY;
    if (oy === 'auto' || oy === 'scroll') return p;
    p = p.parentElement;
  }
  return window;
}

function initNavbar(el) {
  if (!claim(el, 'navbar')) return;
  const sel = el.getAttribute('data-lg-scroll');
  const scroller = sel ? (sel === 'window' ? window : $(sel)) : scrollParent(el);
  if (!scroller) return;
  const threshold = numAttr(el, 'data-lg-threshold', el.classList.contains('lg-navbar--large') ? 44 : 2);
  const update = () => {
    const y = scroller === window ? window.scrollY : scroller.scrollTop;
    el.classList.toggle('is-scrolled', y > threshold);
  };
  listen(el, scroller, 'scroll', update, { passive: true });
  update();
}

/* ==========================================================================
   Stepper, page control, spinner
   ========================================================================== */

const MINUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';
const PLUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5v14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';

function initStepper(el) {
  if (!claim(el, 'stepper')) return;
  if (el.hasAttribute('data-lg-controlled')) return; // framework-managed
  const min = numAttr(el, 'data-min', -Infinity);
  const max = numAttr(el, 'data-max', Infinity);
  const step = numAttr(el, 'data-step', 1);
  let value = numAttr(el, 'data-value', 0);
  const output = $(el.getAttribute('data-lg-output'));
  if (!el.querySelector('button')) {
    el.innerHTML =
      '<button type="button" aria-label="Decrement" data-lg-step="-1">' + MINUS + '</button>' +
      '<span class="lg-stepper-divider" aria-hidden="true"></span>' +
      '<button type="button" aria-label="Increment" data-lg-step="1">' + PLUS + '</button>';
  }
  const buttons = $$('button', el);
  const render = () => {
    buttons[0].disabled = value <= min;
    buttons[buttons.length - 1].disabled = value >= max;
    el.setAttribute('data-value', String(value));
    if (output) output.textContent = String(value);
  };
  listen(el, el, 'click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    const dir = parseFloat(b.getAttribute('data-lg-step')) || (b === buttons[0] ? -1 : 1);
    const next = clamp(Math.round((value + dir * step) * 1e6) / 1e6, min, max);
    if (next === value) return;
    value = next;
    render();
    emit(el, 'lg-change', { value });
  });
  render();
}

function initPageControl(el) {
  if (!claim(el, 'pages')) return;
  if (el.hasAttribute('data-lg-controlled')) return;
  const count = numAttr(el, 'data-count', 0);
  if (count && !el.querySelector('button')) {
    for (let i = 0; i < count; i++) el.appendChild(create('button', null, { type: 'button', 'aria-label': 'Page ' + (i + 1) }));
  }
  const dots = $$('button', el);
  const select = (index, fromUser) => {
    dots.forEach((d, i) => (i === index ? d.setAttribute('aria-current', 'true') : d.removeAttribute('aria-current')));
    el.setAttribute('data-index', String(index));
    if (fromUser) emit(el, 'lg-change', { index });
  };
  state(el).select = select;
  select(numAttr(el, 'data-index', 0), false);
  listen(el, el, 'click', (e) => {
    const b = e.target.closest('button');
    if (b) select(dots.indexOf(b), true);
  });
}

function initSpinner(el) {
  if (!claim(el, 'spinner') || el.children.length) return;
  for (let i = 0; i < 8; i++) inject(el, document.createElement('i'));
  if (!el.hasAttribute('role')) el.setAttribute('role', 'progressbar');
  if (!el.hasAttribute('aria-label')) el.setAttribute('aria-label', 'Loading');
}

/* ==========================================================================
   Menus, popovers and context menus
   ========================================================================== */

let openPanel = null;

function placePanel(panel, anchor, placement, point) {
  const margin = 8;
  const gap = 8;
  const ar = anchor
    ? anchor.getBoundingClientRect()
    : { left: point.x, right: point.x, top: point.y, bottom: point.y, width: 0, height: 0 };
  const vw = document.documentElement.clientWidth;
  const vh = window.innerHeight;
  panel.style.left = '0px';
  panel.style.top = '0px';
  const pw = panel.offsetWidth;
  const ph = panel.offsetHeight;
  const g = anchor ? gap : 2;
  const below = placement !== 'top' && (ar.bottom + g + ph <= vh - margin || ar.top - g - ph < margin);
  const top = clamp(below ? ar.bottom + g : ar.top - g - ph, margin, Math.max(margin, vh - ph - margin));
  const alignEnd = ar.left + pw > vw - margin && ar.right - pw >= margin;
  const left = clamp(alignEnd ? ar.right - pw : ar.left, margin, Math.max(margin, vw - pw - margin));
  panel.style.left = Math.round(left) + 'px';
  panel.style.top = Math.round(top) + 'px';
  const ox = clamp(ar.left + ar.width / 2 - left, 0, pw);
  panel.style.setProperty('--lg-origin', ox + 'px ' + (below ? 0 : ph) + 'px');
}

/**
 * Opens a `.lg-menu` / `.lg-popover` element next to an anchor (or at a point).
 * @param {Element|string} panel
 * @param {Element|string|null} anchor
 * @param {{placement?: 'top'|'bottom', x?: number, y?: number, focus?: boolean}} [options]
 */
export function openPopover(panel, anchor, options = {}) {
  panel = $(panel);
  anchor = $(anchor);
  if (!panel) return;
  if (openPanel && openPanel.panel === panel) {
    closePopover();
    return;
  }
  closePopover(true);
  if (panel.parentNode !== document.body) {
    const home = { parent: panel.parentNode, next: panel.nextSibling };
    state(panel).home = state(panel).home || home;
    document.body.appendChild(panel);
  }
  panel.classList.add('lg-glass');
  panel.classList.remove('is-closing', 'is-open');
  panel.hidden = false;
  refract(panel);
  placePanel(panel, anchor, options.placement || (anchor && anchor.getAttribute('data-lg-placement')), { x: options.x || 0, y: options.y || 0 });
  if (anchor) anchor.setAttribute('aria-expanded', 'true');
  const s = { panel, anchor };
  openPanel = s;

  s.onDown = (e) => {
    if (panel.contains(e.target) || (anchor && anchor.contains(e.target))) return;
    closePopover();
  };
  s.onKey = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closePopover();
      if (anchor) anchor.focus();
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Home' || e.key === 'End') {
      const items = $$('.lg-menu-item:not(:disabled):not([aria-disabled="true"])', panel);
      if (!items.length) return;
      e.preventDefault();
      let i = items.indexOf(document.activeElement);
      if (e.key === 'Home') i = 0;
      else if (e.key === 'End') i = items.length - 1;
      else i = e.key === 'ArrowDown' ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
      items[i].focus();
    }
  };
  s.onResize = () => closePopover(true);
  document.addEventListener('pointerdown', s.onDown, true);
  document.addEventListener('keydown', s.onKey);
  window.addEventListener('resize', s.onResize);

  nextFrame(() => {
    if (openPanel !== s) return;
    panel.classList.add('is-open');
    if (panel.classList.contains('lg-menu') && options.focus !== false) {
      const first = panel.querySelector('.lg-menu-item:not(:disabled)');
      if (first) first.focus({ preventScroll: true });
    }
  });
  emit(panel, 'lg-open', { anchor });
}

/** Closes the open menu or popover. */
export function closePopover(immediate) {
  const s = openPanel;
  if (!s) return;
  openPanel = null;
  const panel = s.panel;
  document.removeEventListener('pointerdown', s.onDown, true);
  document.removeEventListener('keydown', s.onKey);
  window.removeEventListener('resize', s.onResize);
  if (s.anchor) s.anchor.setAttribute('aria-expanded', 'false');
  panel.classList.remove('is-open');
  if (immediate === true) {
    panel.hidden = true;
  } else {
    panel.classList.add('is-closing');
    setTimeout(() => {
      if (openPanel && openPanel.panel === panel) return;
      panel.classList.remove('is-closing');
      panel.hidden = true;
    }, 220);
  }
  emit(panel, 'lg-close', {});
}

function onMenuItemClick(e) {
  const item = e.target.closest('.lg-menu-item, [data-lg-dismiss]');
  if (!item) return;
  const panel = item.closest('.lg-menu, .lg-popover');
  if (!panel) return;
  if (item.matches('[data-lg-dismiss]') && !item.matches('.lg-menu-item')) {
    closePopover();
    return;
  }
  if (item.disabled || item.getAttribute('aria-disabled') === 'true') return;
  if (item.getAttribute('role') === 'menuitemcheckbox') {
    item.setAttribute('aria-checked', item.getAttribute('aria-checked') === 'true' ? 'false' : 'true');
  }
  emit(panel, 'lg-select', { item, value: item.getAttribute('data-value') || item.textContent.trim() });
  if (!item.hasAttribute('data-lg-keep-open')) closePopover();
}

/**
 * Builds and opens a menu. Resolves with the chosen item's value, or null.
 * @param {Element|string|{x:number,y:number}} anchor
 * @param {Array} items  [{ label, icon?, value?, destructive?, disabled?, checked? } | '-' | { title }]
 */
export function menu(anchor, items, options = {}) {
  const panel = create('div', 'lg-menu lg-glass', { role: 'menu' });
  panel.hidden = true;
  for (const it of items || []) {
    if (it === '-' || it.separator) {
      panel.appendChild(create('div', 'lg-menu-separator', { role: 'separator' }));
      continue;
    }
    if (it.title) {
      const t = create('div', 'lg-menu-title');
      t.textContent = it.title;
      panel.appendChild(t);
      continue;
    }
    const b = create('button', 'lg-menu-item' + (it.destructive ? ' lg-menu-item--destructive' : ''), {
      type: 'button',
      role: it.checked != null ? 'menuitemcheckbox' : 'menuitem',
      'aria-checked': it.checked != null ? String(!!it.checked) : null,
      'data-value': it.value != null ? String(it.value) : null,
    });
    if (it.disabled) b.disabled = true;
    if (it.icon) b.insertAdjacentHTML('beforeend', it.icon);
    const s = document.createElement('span');
    s.textContent = it.label;
    b.appendChild(s);
    if (it.shortcut) {
      const k = create('span', 'lg-menu-shortcut');
      k.textContent = it.shortcut;
      b.appendChild(k);
    }
    panel.appendChild(b);
  }
  document.body.appendChild(panel);
  return new Promise((resolve) => {
    let done = false;
    panel.addEventListener('lg-select', (e) => {
      done = true;
      resolve(e.detail.value);
    });
    panel.addEventListener('lg-close', () => {
      setTimeout(() => {
        if (!done) resolve(null);
        unrefract(panel);
        panel.remove();
      }, 260);
    });
    const isPoint = anchor && typeof anchor === 'object' && 'x' in anchor && !(anchor instanceof Element);
    openPopover(panel, isPoint ? null : anchor, isPoint ? { ...options, x: anchor.x, y: anchor.y } : options);
  });
}

/* ==========================================================================
   Modal helpers
   ========================================================================== */

const modalStack = [];

function trapFocus(container, e) {
  if (e.key !== 'Tab') return;
  const f = $$('button:not(:disabled), [href], input:not(:disabled), select, textarea, [tabindex]:not([tabindex="-1"])', container).filter(
    (n) => n.offsetParent !== null || n === document.activeElement
  );
  if (!f.length) return;
  const first = f[0];
  const last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

function makeOverlay(parent, className) {
  const ov = create('div', 'lg-overlay' + (className ? ' ' + className : ''), { 'aria-hidden': 'true' });
  (parent || document.body).appendChild(ov);
  nextFrame(() => ov.classList.add('is-open'));
  return ov;
}

function removeOverlay(ov) {
  if (!ov) return;
  ov.classList.remove('is-open');
  setTimeout(() => ov.remove(), 320);
}

/* ==========================================================================
   Alert & action sheet
   ========================================================================== */

function buildActions(actions, cancelClass, onPick) {
  return actions.map((a, i) => {
    let cls = 'lg-alert-button';
    if (a.prominent || a.style === 'prominent') cls += ' lg-alert-button--prominent';
    if (a.role === 'destructive' || a.destructive) cls += ' lg-alert-button--destructive';
    if (a.role === 'cancel' && cancelClass) cls += ' ' + cancelClass;
    const b = create('button', cls, { type: 'button' });
    b.textContent = a.label;
    b.addEventListener('click', () => onPick(a, i));
    return b;
  });
}

const resultOf = (a) => (a ? (a.value != null ? a.value : a.label) : null);

function presentModal(box, overlay, cancelAction, resolve, getResult) {
  const prevFocus = document.activeElement;
  const entry = { box };
  modalStack.push(entry);
  let closed = false;
  const close = (result) => {
    if (closed) return;
    closed = true;
    const i = modalStack.indexOf(entry);
    if (i > -1) modalStack.splice(i, 1);
    document.removeEventListener('keydown', onKey);
    box.classList.remove('is-open');
    box.classList.add('is-closing');
    removeOverlay(overlay);
    setTimeout(() => {
      unrefract(box);
      box.remove();
    }, 320);
    if (prevFocus && prevFocus.focus) prevFocus.focus({ preventScroll: true });
    resolve(getResult ? getResult(result) : result);
  };
  const onKey = (e) => {
    if (modalStack[modalStack.length - 1] !== entry) return;
    if (e.key === 'Escape' && cancelAction) {
      e.preventDefault();
      close(resultOf(cancelAction));
    }
    trapFocus(box, e);
  };
  document.addEventListener('keydown', onKey);
  document.body.appendChild(box);
  refract(box);
  nextFrame(() => {
    box.classList.add('is-open');
    const target =
      box.querySelector('input, textarea') || box.querySelector('.lg-alert-button--prominent') || box.querySelector('.lg-alert-button');
    if (target) target.focus({ preventScroll: true });
  });
  return close;
}

/**
 * iOS 26 style alert. Resolves with the chosen action's `value` (or label).
 * With `input`, resolves with `{ action, value }`.
 */
export function alert(options) {
  if (!isBrowser()) return Promise.resolve(null);
  if (typeof options === 'string') options = { title: options };
  options = options || {};
  const actions = options.actions && options.actions.length ? options.actions : [{ label: 'OK', prominent: true }];
  return new Promise((resolve) => {
    const overlay = makeOverlay();
    const box = create('div', 'lg-alert lg-glass', { role: 'alertdialog', 'aria-modal': 'true' });
    const id = 'lg-alert-' + ++uid;
    if (options.title) {
      const h = create('h2', 'lg-alert-title', { id: id + '-t' });
      h.textContent = options.title;
      box.appendChild(h);
      box.setAttribute('aria-labelledby', id + '-t');
    }
    if (options.message) {
      const p = create('p', 'lg-alert-message', { id: id + '-m' });
      p.textContent = options.message;
      box.appendChild(p);
      box.setAttribute('aria-describedby', id + '-m');
    }
    let field = null;
    if (options.input) {
      const wrap = create('div', 'lg-alert-content');
      field = create('input', 'lg-textfield', {
        type: options.input.type || 'text',
        placeholder: options.input.placeholder || '',
        'aria-label': options.input.label || options.title || 'Input',
      });
      field.value = options.input.value || '';
      wrap.appendChild(field);
      box.appendChild(wrap);
    }
    if (options.content) {
      const c = create('div', 'lg-alert-content');
      if (typeof options.content === 'string') c.innerHTML = options.content;
      else c.appendChild(options.content);
      box.appendChild(c);
    }
    const row = create('div', 'lg-alert-actions' + (actions.length > 2 || options.stacked ? ' lg-alert-actions--stacked' : ''));
    let close;
    buildActions(actions, '', (a) => close(resultOf(a))).forEach((b) => row.appendChild(b));
    box.appendChild(row);
    const cancel = actions.find((a) => a.role === 'cancel');
    const getResult = field ? (action) => ({ action, value: field.value }) : null;
    close = presentModal(box, overlay, cancel || (actions.length === 1 ? actions[0] : null), resolve, getResult);
    if (field) {
      field.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const primary = actions.find((a) => a.prominent) || actions[actions.length - 1];
          close(resultOf(primary));
        }
      });
    }
    if (options.dismissOnOverlay && cancel) overlay.addEventListener('click', () => close(resultOf(cancel)));
  });
}

/** Bottom action sheet (confirmation dialog). Resolves with the chosen value, or null. */
export function actionSheet(options) {
  if (!isBrowser()) return Promise.resolve(null);
  options = options || {};
  const actions = options.actions || [];
  return new Promise((resolve) => {
    const overlay = makeOverlay();
    const box = create('div', 'lg-action-sheet lg-glass', { role: 'dialog', 'aria-modal': 'true' });
    if (options.title) {
      const h = create('p', 'lg-action-sheet-title');
      h.textContent = options.title;
      box.appendChild(h);
    }
    if (options.message) {
      const m = create('p', 'lg-action-sheet-message');
      m.textContent = options.message;
      box.appendChild(m);
    }
    const cancel = actions.find((a) => a.role === 'cancel');
    const rest = actions.filter((a) => a !== cancel);
    if (cancel) rest.push(cancel);
    let close;
    buildActions(rest, 'lg-action-sheet-cancel', (a) => close(resultOf(a))).forEach((b) => box.appendChild(b));
    close = presentModal(box, overlay, cancel || { label: null }, resolve);
    overlay.addEventListener('click', () => close(resultOf(cancel)));
  });
}

/* ==========================================================================
   Sheet with detents
   ========================================================================== */

class Sheet {
  constructor(el) {
    this.el = el;
    this.overlay = null;
    this.detent = null;
    this.contained = el.classList.contains('lg-sheet--contained');
    el.classList.add('lg-glass');
    if (!el.hasAttribute('role')) el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.addEventListener('click', (e) => {
      if (e.target.closest('[data-lg-dismiss]')) this.close();
    });
    for (const g of $$('.lg-sheet-grabber, .lg-sheet-header', el)) {
      g.addEventListener('pointerdown', (e) => {
        if (e.target.closest('button, a, input, select, textarea')) return;
        this._dragStart(e, g);
      });
    }
    const grabber = el.querySelector('.lg-sheet-grabber');
    if (grabber) {
      grabber.setAttribute('role', 'button');
      grabber.setAttribute('tabindex', '0');
      grabber.setAttribute('aria-label', 'Resize sheet');
      const cycle = () => {
        if (this._justDragged) return;
        const list = this.detents();
        this.setDetent(list[(list.indexOf(this.detent) + 1) % list.length]);
      };
      grabber.addEventListener('click', cycle);
      grabber.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          cycle();
        }
      });
    }
  }

  get isOpen() {
    return this.el.classList.contains('is-open');
  }

  containerHeight() {
    if (this.contained && this.el.offsetParent) return this.el.offsetParent.clientHeight;
    return window.innerHeight;
  }

  detents() {
    return (this.el.getAttribute('data-lg-detents') || 'medium large').split(/[\s,]+/).filter(Boolean);
  }

  heightFor(detent) {
    const H = this.containerHeight();
    if (detent === 'large') return H - (this.contained ? 54 : Math.min(54, H * 0.06));
    if (detent === 'medium') return Math.round(H * 0.5);
    if (/%$/.test(detent)) return Math.round((parseFloat(detent) / 100) * H);
    return Math.min(parseFloat(detent) || H * 0.5, H);
  }

  setDetent(detent) {
    const list = this.detents();
    if (list.indexOf(detent) < 0) detent = list[0];
    this.detent = detent;
    const large = detent === 'large';
    this.el.style.setProperty('--_h', this.heightFor(detent) + 'px');
    this.el.classList.toggle('is-large', large);
    this.el.classList.toggle('is-inset', !large);
    emit(this.el, 'lg-detent', { detent });
    return this;
  }

  open(detent) {
    const el = this.el;
    if (this.isOpen) {
      if (detent) this.setDetent(detent);
      return this;
    }
    this.prevFocus = document.activeElement;
    this.overlay = makeOverlay(el.parentNode, 'lg-overlay--sheet');
    if (this.contained) {
      this.overlay.style.position = 'absolute';
      this.overlay.style.zIndex = '999';
    }
    el.parentNode.insertBefore(this.overlay, el);
    this.overlay.addEventListener('click', () => this.close());
    el.hidden = false;
    this.setDetent(detent || this.detents()[0]);
    refract(el);
    this._onKey = (e) => {
      if (e.key === 'Escape') this.close();
      else trapFocus(el, e);
    };
    document.addEventListener('keydown', this._onKey);
    nextFrame(() => {
      el.classList.add('is-open');
      const f = el.querySelector('[autofocus]') || el.querySelector('.lg-sheet-grabber');
      if (f) f.focus({ preventScroll: true });
    });
    emit(el, 'lg-open', {});
    return this;
  }

  close() {
    const el = this.el;
    if (!this.isOpen) return this;
    el.classList.remove('is-open');
    removeOverlay(this.overlay);
    this.overlay = null;
    document.removeEventListener('keydown', this._onKey);
    setTimeout(() => {
      if (!this.isOpen) el.hidden = true;
    }, 450);
    if (this.prevFocus && this.prevFocus.focus) this.prevFocus.focus({ preventScroll: true });
    emit(el, 'lg-close', {});
    return this;
  }

  toggle(detent) {
    return this.isOpen ? this.close() : this.open(detent);
  }

  _dragStart(e, handle) {
    if (e.button > 0) return;
    const el = this.el;
    const startY = e.clientY;
    const startH = el.getBoundingClientRect().height;
    const maxH = this.heightFor('large');
    let lastY = startY;
    let lastT = performance.now();
    let v = 0;
    let moved = false;
    try {
      handle.setPointerCapture(e.pointerId);
    } catch (_) {}
    const move = (ev) => {
      const dy = ev.clientY - startY;
      if (!moved && Math.abs(dy) < 3) return;
      if (!moved) {
        moved = true;
        el.classList.add('is-dragging');
      }
      const now = performance.now();
      v = (ev.clientY - lastY) / Math.max(1, now - lastT);
      lastY = ev.clientY;
      lastT = now;
      let h = startH - dy;
      if (h > maxH) h = maxH + (h - maxH) * 0.15; // rubber band
      el.style.setProperty('--_h', Math.max(0, h) + 'px');
    };
    const up = () => {
      handle.removeEventListener('pointermove', move);
      handle.removeEventListener('pointerup', up);
      handle.removeEventListener('pointercancel', up);
      el.classList.remove('is-dragging');
      if (!moved) return;
      this._justDragged = true;
      setTimeout(() => (this._justDragged = false), 60);
      const h = el.getBoundingClientRect().height - v * 180;
      const list = this.detents();
      if (h < this.heightFor(list[0]) * 0.6) {
        this.close();
        return;
      }
      let best = list[0];
      let bestD = Infinity;
      for (const d of list) {
        const dist = Math.abs(this.heightFor(d) - h);
        if (dist < bestD) {
          bestD = dist;
          best = d;
        }
      }
      this.setDetent(best);
    };
    handle.addEventListener('pointermove', move);
    handle.addEventListener('pointerup', up);
    handle.addEventListener('pointercancel', up);
  }
}

/** Returns the controller for a `.lg-sheet` element: open(detent), close(), toggle(), setDetent(). */
export function sheet(target) {
  const el = $(target);
  if (!el) return null;
  if (!el.__lgSheet) el.__lgSheet = new Sheet(el);
  return el.__lgSheet;
}

/* ==========================================================================
   Toast / notification banner
   ========================================================================== */

let toastHost = null;

/** Shows a notification banner. Returns `{ close, element }`. */
export function toast(options) {
  if (!isBrowser()) return { close() {}, element: null };
  if (typeof options === 'string') options = { title: options };
  options = options || {};
  if (!toastHost || !toastHost.isConnected) {
    toastHost = create('div', 'lg-toasts', { role: 'status', 'aria-live': 'polite' });
    document.body.appendChild(toastHost);
  }
  const t = create('div', 'lg-toast lg-glass');
  if (options.icon) {
    const ic = create('div', 'lg-toast-icon');
    if (options.iconBackground) ic.style.setProperty('--lg-toast-icon-bg', options.iconBackground);
    ic.innerHTML = options.icon;
    t.appendChild(ic);
  }
  const body = create('div', 'lg-toast-body');
  const title = create('div', 'lg-toast-title');
  const ts = document.createElement('span');
  ts.textContent = options.title || '';
  title.appendChild(ts);
  if (options.time) {
    const tm = create('span', 'lg-toast-time');
    tm.textContent = options.time;
    title.appendChild(tm);
  }
  body.appendChild(title);
  if (options.message) {
    const msg = create('div', 'lg-toast-message');
    msg.textContent = options.message;
    body.appendChild(msg);
  }
  t.appendChild(body);
  toastHost.insertBefore(t, toastHost.firstChild);
  refract(t);
  nextFrame(() => t.classList.add('is-open'));

  let timer = 0;
  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;
    clearTimeout(timer);
    t.classList.remove('is-open');
    t.classList.add('is-closing');
    setTimeout(() => {
      unrefract(t);
      t.remove();
    }, 320);
  };
  const duration = options.duration == null ? 4000 : options.duration;
  if (duration > 0) timer = setTimeout(close, duration);

  t.addEventListener('pointerdown', (e) => {
    const y0 = e.clientY;
    let moved = false;
    try {
      t.setPointerCapture(e.pointerId);
    } catch (_) {}
    const move = (ev) => {
      const dy = ev.clientY - y0;
      if (Math.abs(dy) > 3) moved = true;
      t.classList.add('is-dragging');
      t.style.setProperty('--_dy', (dy < 0 ? dy : dy * 0.2) + 'px');
    };
    const up = (ev) => {
      t.removeEventListener('pointermove', move);
      t.removeEventListener('pointerup', up);
      t.removeEventListener('pointercancel', up);
      t.classList.remove('is-dragging');
      t.style.removeProperty('--_dy');
      if (ev.clientY - y0 < -24) close();
      else if (!moved && options.onClick) options.onClick();
    };
    t.addEventListener('pointermove', move);
    t.addEventListener('pointerup', up);
    t.addEventListener('pointercancel', up);
  });
  return { close, element: t };
}

/* ==========================================================================
   Declarative triggers (event delegation)
   ========================================================================== */

function onDocumentClick(e) {
  const t = e.target.closest('[data-lg-menu], [data-lg-popover], [data-lg-sheet], [data-lg-alert]');
  if (!t) {
    onMenuItemClick(e);
    return;
  }
  if (t.hasAttribute('data-lg-menu') || t.hasAttribute('data-lg-popover')) {
    e.preventDefault();
    const target = $(t.getAttribute('data-lg-menu') || t.getAttribute('data-lg-popover'));
    if (target) openPopover(target, t);
  } else if (t.hasAttribute('data-lg-sheet')) {
    e.preventDefault();
    const s = sheet(t.getAttribute('data-lg-sheet'));
    if (s) s.open(t.getAttribute('data-lg-detent') || undefined);
  } else if (t.hasAttribute('data-lg-alert')) {
    e.preventDefault();
    alert({ title: t.getAttribute('data-lg-alert'), message: t.getAttribute('data-lg-message') });
  }
}

let longPress = null;

function onContextMenu(e) {
  const t = e.target.closest('[data-lg-context-menu]');
  if (!t) return;
  const panel = $(t.getAttribute('data-lg-context-menu'));
  if (!panel) return;
  e.preventDefault();
  openPopover(panel, null, { x: e.clientX, y: e.clientY });
}

function onLongPressStart(e) {
  if (e.pointerType !== 'touch') return;
  const t = e.target.closest('[data-lg-context-menu]');
  if (!t) return;
  const x = e.clientX;
  const y = e.clientY;
  clearTimeout(longPress);
  longPress = setTimeout(() => {
    const panel = $(t.getAttribute('data-lg-context-menu'));
    if (panel) openPopover(panel, null, { x, y });
  }, 480);
  const cancel = () => {
    clearTimeout(longPress);
    document.removeEventListener('pointerup', cancel);
    document.removeEventListener('pointercancel', cancel);
    document.removeEventListener('pointermove', onMove);
  };
  const onMove = (ev) => {
    if (Math.hypot(ev.clientX - x, ev.clientY - y) > 8) cancel();
  };
  document.addEventListener('pointerup', cancel);
  document.addEventListener('pointercancel', cancel);
  document.addEventListener('pointermove', onMove, { passive: true });
}

/* ==========================================================================
   Enhance / destroy
   ========================================================================== */

const GLASS_SELECTOR = '.lg-glass, .lg-glass-surface, .lg-button, [data-lg-refract]';
const NO_GLASS_BUTTON = /(^|\s)lg-button--(bordered|filled|plain)(\s|$)/;

const COMPONENTS = [
  ['.lg-switch', initSwitch],
  ['.lg-slider', initSlider],
  ['.lg-segmented', initSegmented],
  ['.lg-tabbar', initTabbar],
  ['.lg-navbar', initNavbar],
  ['.lg-stepper', initStepper],
  ['.lg-page-control', initPageControl],
  ['.lg-spinner', initSpinner],
];

function initGlass(el) {
  if (el.classList.contains('lg-button')) {
    if (NO_GLASS_BUTTON.test(el.className)) return;
    if (el.parentElement && el.parentElement.classList.contains('lg-group')) return;
  }
  if (el.hidden) return; // refracted when shown (menus, sheets, …)
  refract(el);
}

/**
 * Enhances every Liquid Glass component inside `root` (default: document).
 * Safe to call repeatedly — already enhanced elements are skipped.
 */
export function init(root) {
  if (!isBrowser()) return root;
  root = $(root) || document;
  const scope = root.nodeType === 1 ? [root] : [];
  const each = (sel, fn) => {
    for (const n of scope) if (n.matches(sel)) fn(n);
    for (const n of $$(sel, root)) fn(n);
  };
  each(GLASS_SELECTOR, initGlass);
  for (const [sel, fn] of COMPONENTS) each(sel, fn);
  return root;
}

/** Enhances a single element (component root or glass surface). Returns a cleanup function. */
export function enhance(el) {
  el = $(el);
  if (!el || !isBrowser()) return () => {};
  init(el);
  return () => destroy(el);
}

/** Undoes `init`/`enhance` for `root` and its descendants. */
export function destroy(root) {
  if (!isBrowser()) return;
  root = $(root);
  if (!root) return;
  const nodes = [root, ...$$('*', root)];
  for (const n of nodes) {
    if (tracked.has(n)) unrefract(n);
    const s = n.__lg;
    if (!s) continue;
    for (const fn of s.cleanups.splice(0)) {
      try {
        fn();
      } catch (_) {}
    }
    for (const node of s.injected.splice(0)) node.remove();
    s.flags = {};
  }
}

/** Selects an item of a segmented control, tab bar or page control programmatically. */
export function select(el, index) {
  el = $(el);
  const s = el && el.__lg;
  if (s && s.select) s.select(index, false);
}

/** Re-measures an enhanced component after external layout changes. */
export function refresh(el) {
  el = $(el);
  const s = el && el.__lg;
  if (s && s.refresh) s.refresh();
  if (s && s.sync) s.sync();
}

/** Sets the color scheme: 'light', 'dark' or 'auto' (system). */
export function setTheme(theme, root) {
  if (!isBrowser()) return;
  const el = $(root) || document.documentElement;
  if (theme === 'light' || theme === 'dark') el.setAttribute('data-lg-theme', theme);
  else el.removeAttribute('data-lg-theme');
}

/* ==========================================================================
   Start / stop
   ========================================================================== */

let started = false;
let mutationObserver = null;

/**
 * Installs global behaviors (press feedback, dynamic light, declarative
 * triggers), enhances the current DOM and watches for new components.
 * Idempotent; returns `stop`.
 */
export function start(options) {
  if (!isBrowser()) return stop;
  if (options) configure(options);
  if (started) return stop;
  started = true;
  const go = () => {
    if (!started) return;
    document.documentElement.classList.add(supportsRefraction() ? 'lg-has-refraction' : 'lg-no-refraction');
    document.addEventListener('pointerdown', onPressStart, { passive: true });
    document.addEventListener('pointerdown', onLongPressStart, { passive: true });
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('contextmenu', onContextMenu);
    if (config.dynamicLight) document.addEventListener('pointermove', onLightMove, { passive: true });
    init(document);
    if (config.observe && typeof MutationObserver !== 'undefined') {
      mutationObserver = new MutationObserver((records) => {
        let removed = false;
        for (const r of records) {
          r.addedNodes.forEach((n) => {
            if (n.nodeType === 1 && !(defs && n === defs.parentNode)) init(n);
          });
          if (r.removedNodes.length) removed = true;
        }
        if (removed) sweepDisconnected();
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go, { once: true });
  else go();
  return stop;
}

/** Removes the global behaviors installed by `start`. */
export function stop() {
  if (!started || !isBrowser()) return;
  started = false;
  document.removeEventListener('pointerdown', onPressStart);
  document.removeEventListener('pointerdown', onLongPressStart);
  document.removeEventListener('click', onDocumentClick);
  document.removeEventListener('contextmenu', onContextMenu);
  document.removeEventListener('pointermove', onLightMove);
  if (mutationObserver) mutationObserver.disconnect();
  mutationObserver = null;
}

export function isStarted() {
  return started;
}
