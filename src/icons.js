/*
 * Liquid Glass Kit icons — an original, SF-inspired line icon set.
 * (SF Symbols may only be used in apps for Apple platforms, so the kit
 * ships its own.) 24×24 grid, round caps and joins, `currentColor`.
 *
 * Each entry is the inner SVG markup. Shapes marked with data-fill render
 * filled; everything else is stroked.
 */

const F = ' data-fill=""';

export const icons = {
  // navigation
  'chevron-left': '<path d="M15 5l-7 7 7 7"/>',
  'chevron-right': '<path d="M9 5l7 7-7 7"/>',
  'chevron-up': '<path d="M5 15l7-7 7 7"/>',
  'chevron-down': '<path d="M5 9l7 7 7-7"/>',
  'arrow-left': '<path d="M19 12H5M11 5l-7 7 7 7"/>',
  'arrow-right': '<path d="M5 12h14M13 5l7 7-7 7"/>',
  'arrow-up': '<path d="M12 19V5M5 11l7-7 7 7"/>',
  'arrow-down': '<path d="M12 5v14M5 13l7 7 7-7"/>',
  'arrow-up-right': '<path d="M7 17L17 7M8.5 7H17v8.5"/>',
  xmark: '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
  checkmark: '<path d="M4.5 12.5l5 5L19.5 7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  ellipsis: '<circle cx="6" cy="12" r="1.7"' + F + '/><circle cx="12" cy="12" r="1.7"' + F + '/><circle cx="18" cy="12" r="1.7"' + F + '/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L20 20"/>',
  sidebar: '<rect x="3.5" y="4.5" width="17" height="15" rx="3"/><path d="M9.5 4.5v15"/>',
  'line-3': '<path d="M4 7h16M4 12h16M4 17h16"/>',
  list: '<path d="M9 6.5h11M9 12h11M9 17.5h11"/><circle cx="4.8" cy="6.5" r="1.2"' + F + '/><circle cx="4.8" cy="12" r="1.2"' + F + '/><circle cx="4.8" cy="17.5" r="1.2"' + F + '/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',
  sliders: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',

  // objects
  house: '<path d="M4 10.2L12 4l8 6.2V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1z"/>',
  gear: '<path d="M12 2.8l1.7 2.4 2.8-.8.7 2.8 2.6 1.3-1.2 2.6 1.2 2.6-2.6 1.3-.7 2.8-2.8-.8L12 21.2l-1.7-2.4-2.8.8-.7-2.8-2.6-1.3 1.2-2.6-1.2-2.6 2.6-1.3.7-2.8 2.8.8z"/><circle cx="12" cy="12" r="3.2"/>',
  person: '<circle cx="12" cy="8" r="3.6"/><path d="M5 20a7 7 0 0 1 14 0"/>',
  'person-circle': '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="10" r="2.8"/><path d="M6.8 18.2a6 6 0 0 1 10.4 0"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z"/>',
  star: '<path d="M12 3.8l2.5 5.2 5.7.8-4.1 4 1 5.6L12 16.7l-5.1 2.7 1-5.6-4.1-4 5.7-.8z"/>',
  bell: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  trash: '<path d="M4.5 6.5h15M9.5 6.5V4.8h5v1.7M6.5 6.5l.9 12.6a1.5 1.5 0 0 0 1.5 1.4h6.2a1.5 1.5 0 0 0 1.5-1.4l.9-12.6M10 10.5v6M14 10.5v6"/>',
  share: '<path d="M12 15V3.5M7.5 8L12 3.5 16.5 8"/><path d="M8 11H6.5A1.5 1.5 0 0 0 5 12.5v7A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-1.5-1.5H16"/>',
  bookmark: '<path d="M6.5 4.5h11v16l-5.5-4-5.5 4z"/>',
  pencil: '<path d="M15.5 4.5l4 4L9 19H5v-4zM13.5 6.5l4 4"/>',
  compose: '<path d="M11 4.5H6.5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V13"/><path d="M17.5 3.5l3 3-8 8H9.5v-3z"/>',
  paperplane: '<path d="M20.5 3.5L3.5 10.5l7 3 3 7zM10.5 13.5l10-10"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5c-2.4 2.4-3.5 5.2-3.5 8.5s1.1 6.1 3.5 8.5M12 3.5c2.4 2.4 3.5 5.2 3.5 8.5s-1.1 6.1-3.5 8.5M3.8 9.5h16.4M3.8 14.5h16.4"/>',
  bag: '<path d="M5 7.5h14l-1 12.4a1.5 1.5 0 0 1-1.5 1.4h-9A1.5 1.5 0 0 1 6 19.9z"/><path d="M9 10V7a3 3 0 0 1 6 0v3"/>',
  creditcard: '<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3 10h18M6.5 15h4"/>',
  camera: '<path d="M4 8.5a2 2 0 0 1 2-2h2.2l1.6-2h4.4l1.6 2H18a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="3.5"/>',
  photo: '<rect x="3.5" y="5" width="17" height="14" rx="2.5"/><circle cx="9" cy="10" r="1.6"/><path d="M4 17l5-4.5 4 3.5 3-2.5 4.5 4"/>',
  folder: '<path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/>',
  doc: '<path d="M6.5 3.5h7l4.5 4.5v11a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 5 19V5a1.5 1.5 0 0 1 1.5-1.5z"/><path d="M13.5 3.5V8H18M8.5 12.5h7M8.5 16h5"/>',
  envelope: '<rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="M4.5 7l7.5 6 7.5-6"/>',
  message: '<path d="M12 4c4.7 0 8.5 3.1 8.5 7s-3.8 7-8.5 7c-1 0-2-.1-2.9-.4L5 19.5l1.2-3.4C4.6 14.9 3.5 13 3.5 11c0-3.9 3.8-7 8.5-7z"/>',
  phone: '<path d="M6.6 3.8l2.5-.4 1.6 4-1.9 1.4a11 11 0 0 0 6.4 6.4l1.4-1.9 4 1.6-.4 2.5a2 2 0 0 1-2.2 1.7C10.9 18.3 5.7 13.1 4.9 6a2 2 0 0 1 1.7-2.2z"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  location: '<path d="M12 21s-6.5-5.9-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.1 12 21 12 21z"/><circle cx="12" cy="10" r="2.3"/>',
  map: '<path d="M9 4.5L3.5 6.5v13L9 17.5l6 2 5.5-2v-13L15 6.5z"/><path d="M9 4.5v13M15 6.5v13"/>',
  cloud: '<path d="M7.5 18.5a4 4 0 0 1-.6-8 5.5 5.5 0 0 1 10.6 1.5 3.3 3.3 0 0 1-.5 6.5z"/>',
  sparkles: '<path d="M11 3.5l1.8 5.2L18 10.5l-5.2 1.8L11 17.5l-1.8-5.2L4 10.5l5.2-1.8zM18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>',
  bolt: '<path d="M13 2.5L5 13.5h6l-1 8 8-11h-6z"/>',
  'info-circle': '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5"/><circle cx="12" cy="7.8" r="1.1"' + F + '/>',
  'exclamation-triangle': '<path d="M10.3 4.4a2 2 0 0 1 3.4 0l7.3 12.7a2 2 0 0 1-1.7 3H4.7a2 2 0 0 1-1.7-3z"/><path d="M12 9.5v4.5"/><circle cx="12" cy="17" r="1.1"' + F + '/>',
  'checkmark-circle': '<circle cx="12" cy="12" r="8.5"/><path d="M8 12.3l2.7 2.7L16.2 9.5"/>',
  'plus-circle': '<circle cx="12" cy="12" r="8.5"/><path d="M12 8v8M8 12h8"/>',
  'xmark-circle': '<circle cx="12" cy="12" r="8.5"/><path d="M9.2 9.2l5.6 5.6M14.8 9.2l-5.6 5.6"/>',
  download: '<path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 19.5h14"/>',
  refresh: '<path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3M19.5 4.5v4h-4"/>',
  eye: '<path d="M2.8 12S6.2 5.5 12 5.5 21.2 12 21.2 12 17.8 18.5 12 18.5 2.8 12 2.8 12z"/><circle cx="12" cy="12" r="3"/>',
  tag: '<path d="M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1.5 1.5 0 0 1 0 2.1l-6.4 6.4a1.5 1.5 0 0 1-2.1 0z"/><circle cx="8" cy="8" r="1.4"/>',

  // media
  play: '<path d="M7 4.8v14.4a.8.8 0 0 0 1.2.7l11.3-7.2a.8.8 0 0 0 0-1.4L8.2 4.1A.8.8 0 0 0 7 4.8z"' + F + '/>',
  pause: '<rect x="6" y="4.5" width="4" height="15" rx="1.2"' + F + '/><rect x="14" y="4.5" width="4" height="15" rx="1.2"' + F + '/>',
  forward: '<path d="M3 6.2v11.6a.7.7 0 0 0 1.1.6L12 12.6V17.8a.7.7 0 0 0 1.1.6l8.2-5.8a.7.7 0 0 0 0-1.2l-8.2-5.8a.7.7 0 0 0-1.1.6v5.2L4.1 5.6a.7.7 0 0 0-1.1.6z"' + F + '/>',
  backward: '<path d="M21 6.2v11.6a.7.7 0 0 1-1.1.6L12 12.6V17.8a.7.7 0 0 1-1.1.6l-8.2-5.8a.7.7 0 0 1 0-1.2l8.2-5.8a.7.7 0 0 1 1.1.6v5.2l7.9-5.8a.7.7 0 0 1 1.1.6z"' + F + '/>',
  'music-note': '<path d="M9 18V6l11-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
  speaker: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
  'speaker-slash': '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4zM16 9.5l5 5M21 9.5l-5 5"/>',
  radio: '<circle cx="12" cy="12" r="2.4"/><path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M5 5a10 10 0 0 0 0 14M19 5a10 10 0 0 1 0 14"/>',
  tv: '<rect x="3" y="5" width="18" height="12.5" rx="2.5"/><path d="M8 20.5h8"/>',
  books: '<path d="M5 4.5h3.5v15H5zM10.5 4.5H14v15h-3.5zM15.8 5.3l3.2-.9 3.4 13.7-3.2.9z"/>',

  // controls & system
  wifi: '<path d="M4 9.5a11.5 11.5 0 0 1 16 0M7 12.8a7.2 7.2 0 0 1 10 0M10 16a3 3 0 0 1 4 0"/><circle cx="12" cy="19" r="1.1"' + F + '/>',
  bluetooth: '<path d="M7 7.5l10 9-5 4.5V3l5 4.5-10 9"/>',
  airplane: '<path d="M21 12.5l-7.5-2V5a1.5 1.5 0 0 0-3 0v5.5L3 12.5v2l7.5-1.5v4.5L8.5 19v1.5l3.5-1 3.5 1V19l-2-1.5V13l7.5 1.5z"/>',
  antenna: '<path d="M12 11v10M9 21h6"/><circle cx="12" cy="9" r="2"/><path d="M8 5.5a5.5 5.5 0 0 0 0 7M16 5.5a5.5 5.5 0 0 1 0 7"/>',
  battery: '<rect x="3" y="7.5" width="16" height="9" rx="2.5"/><path d="M21.5 10.5v3"/><rect x="5" y="9.5" width="9" height="5" rx="1"' + F + '/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.8v2M12 19.2v2M2.8 12h2M19.2 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M5.5 18.5l1.4-1.4M17.1 6.9l1.4-1.4"/>',
  'hand-raised': '<path d="M8.5 12V5.5a1.5 1.5 0 0 1 3 0V11M11.5 11V4a1.5 1.5 0 0 1 3 0v7M14.5 11V5.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7 6 6 0 0 1-5-2.7L3 14.6a1.5 1.5 0 0 1 2.4-1.8l3.1 3.2"/>',
  accessibility: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="7.8" r="1.2"' + F + '/><path d="M7.5 10h9M12 10v3.5l-2.5 4M12 13.5l2.5 4"/>',
  keyboard: '<rect x="3" y="6" width="18" height="12" rx="2.5"/><path d="M7 10h.01M10 10h.01M13 10h.01M16 10h.01M7 14h10"/>',
  display: '<rect x="3" y="4.5" width="18" height="12" rx="2.5"/><path d="M9 20.5h6M12 16.5v4"/>',
  iphone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.8"/><path d="M10.5 5h3"/>',
  laptop: '<path d="M5 6.5a1.5 1.5 0 0 1 1.5-1.5h11A1.5 1.5 0 0 1 19 6.5V15H5zM2.5 17.5h19"/>',
  watch: '<rect x="6.5" y="6" width="11" height="12" rx="3"/><path d="M9 6l.7-3h4.6l.7 3M9 18l.7 3h4.6l.7-3"/>',
};

/*
 * SF Symbols names resolve to the matching built-in glyph, so markup can be
 * written with Apple's names today and pick up real SF Symbols the moment
 * they are registered (see registerIcons).
 */
export const sfAliases = {
  'chevron.left': 'chevron-left',
  'chevron.right': 'chevron-right',
  'chevron.backward': 'chevron-left',
  'chevron.forward': 'chevron-right',
  'arrow.backward': 'arrow-left',
  'arrow.forward': 'arrow-right',
  'chevron.up': 'chevron-up',
  'chevron.down': 'chevron-down',
  'arrow.left': 'arrow-left',
  'arrow.right': 'arrow-right',
  'arrow.up': 'arrow-up',
  'arrow.down': 'arrow-down',
  'arrow.up.right': 'arrow-up-right',
  'arrow.down.to.line': 'download',
  'arrow.clockwise': 'refresh',
  xmark: 'xmark',
  checkmark: 'checkmark',
  plus: 'plus',
  minus: 'minus',
  ellipsis: 'ellipsis',
  magnifyingglass: 'search',
  'sidebar.left': 'sidebar',
  'line.3.horizontal': 'line-3',
  'list.bullet': 'list',
  'square.grid.2x2': 'grid',
  'slider.horizontal.3': 'sliders',
  house: 'house',
  'house.fill': 'house',
  gearshape: 'gear',
  'gearshape.fill': 'gear',
  person: 'person',
  'person.fill': 'person',
  'person.crop.circle': 'person-circle',
  heart: 'heart',
  'heart.fill': 'heart',
  star: 'star',
  'star.fill': 'star',
  bell: 'bell',
  'bell.fill': 'bell',
  trash: 'trash',
  'square.and.arrow.up': 'share',
  bookmark: 'bookmark',
  pencil: 'pencil',
  'square.and.pencil': 'compose',
  paperplane: 'paperplane',
  link: 'link',
  lock: 'lock',
  'lock.fill': 'lock',
  globe: 'globe',
  bag: 'bag',
  creditcard: 'creditcard',
  camera: 'camera',
  photo: 'photo',
  folder: 'folder',
  'doc.text': 'doc',
  envelope: 'envelope',
  message: 'message',
  phone: 'phone',
  calendar: 'calendar',
  clock: 'clock',
  'mappin.and.ellipse': 'location',
  location: 'location',
  map: 'map',
  cloud: 'cloud',
  sparkles: 'sparkles',
  bolt: 'bolt',
  'bolt.fill': 'bolt',
  'info.circle': 'info-circle',
  'exclamationmark.triangle': 'exclamation-triangle',
  'checkmark.circle': 'checkmark-circle',
  'plus.circle': 'plus-circle',
  'xmark.circle': 'xmark-circle',
  eye: 'eye',
  tag: 'tag',
  'play.fill': 'play',
  'pause.fill': 'pause',
  'forward.fill': 'forward',
  'backward.fill': 'backward',
  'music.note': 'music-note',
  mic: 'mic',
  'mic.fill': 'mic',
  'speaker.wave.2': 'speaker',
  'speaker.slash': 'speaker-slash',
  'dot.radiowaves.left.and.right': 'radio',
  tv: 'tv',
  'books.vertical': 'books',
  wifi: 'wifi',
  airplane: 'airplane',
  'antenna.radiowaves.left.and.right': 'antenna',
  'battery.100': 'battery',
  moon: 'moon',
  'moon.fill': 'moon',
  'sun.max': 'sun',
  'hand.raised': 'hand-raised',
  accessibility: 'accessibility',
  keyboard: 'keyboard',
  display: 'display',
  iphone: 'iphone',
  laptopcomputer: 'laptop',
  applewatch: 'watch',
};

/* Icons registered by the app (e.g. SVGs exported from the SF Symbols app). */
const registered = Object.create(null);

/**
 * Adds icons by name (see registerIcons in the core for the public API).
 * Values are complete SVG documents or inner SVG markup.
 */
export function addIcons(map) {
  for (const name in map) registered[name] = String(map[name]).trim();
}

// built-in name → SF Symbols names that map to it
const reverseAliases = Object.create(null);
for (const sf in sfAliases) (reverseAliases[sfAliases[sf]] = reverseAliases[sfAliases[sf]] || []).push(sf);

function findRegistered(name) {
  if (registered[name]) return registered[name];
  const builtin = sfAliases[name] || name;
  if (registered[builtin]) return registered[builtin];
  for (const sf of reverseAliases[builtin] || []) if (registered[sf]) return registered[sf];
  return null;
}

/** True when the app registered an SVG for this name (directly or via an SF Symbols alias). */
export function isRegisteredIcon(name) {
  return !!findRegistered(name);
}

export function hasIcon(name) {
  return !!(findRegistered(name) || icons[name] || icons[sfAliases[name]]);
}

function sizeSvg(svg, size, className, a11y) {
  // Registered SVGs keep their own geometry; only size, color and a11y are set.
  return svg.replace(/<svg\b([^>]*)>/i, (m, attrs) => {
    const cleaned = attrs.replace(/\s(width|height|class|aria-hidden|role|aria-label)="[^"]*"/gi, '');
    const fill = /\sfill=/.test(cleaned) ? '' : ' fill="currentColor"';
    return `<svg${cleaned} width="${size}" height="${size}"${fill}${className ? ` class="${className}"` : ''} ${a11y}>`;
  });
}

/** SF Symbols `…backward` / `…forward` names mirror in right-to-left layouts. */
export const isDirectional = (name) => /\.(backward|forward)(\.|$)/.test(String(name));

/** Returns an `<svg>` string for an icon (registered icons first, then built-in). */
export function icon(name, options = {}) {
  const size = options.size || 24;
  const label = options.label;
  let a11y = label ? `role="img" aria-label="${String(label).replace(/"/g, '&quot;')}"` : 'aria-hidden="true"';
  if (isDirectional(name)) a11y += ' data-lg-directional=""';
  const own = findRegistered(name);
  if (own) {
    if (/^<svg/i.test(own)) return sizeSvg(own, size, options.className, a11y);
    return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor"${options.className ? ` class="${options.className}"` : ''} ${a11y}>${own}</svg>`;
  }
  const body = icons[name] || icons[sfAliases[name]];
  if (!body) return '';
  const sw = options.strokeWidth || 1.9;
  const cls = options.className ? ` class="${options.className}"` : '';
  // Filled parts carry data-fill; turn that into real fill attributes.
  const inner = body.replace(/ data-fill=""/g, ' fill="currentColor" stroke="none"');
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"${cls} ${a11y}>${inner}</svg>`;
}

export const iconNames = Object.keys(icons);
