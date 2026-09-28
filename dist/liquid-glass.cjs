/*! Liquid Glass Kit v0.1.0 | MIT | https://github.com/noexgeci/liquid-glass-and-more-apple */
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var index_exports = {};
__export(index_exports, {
  actionSheet: () => actionSheet,
  alert: () => alert,
  closePopover: () => closePopover,
  configure: () => configure,
  createDisplacementMap: () => createDisplacementMap,
  destroy: () => destroy,
  enhance: () => enhance,
  hasIcon: () => hasIcon,
  icon: () => icon,
  iconNames: () => iconNames,
  icons: () => icons,
  init: () => init,
  isRegisteredIcon: () => isRegisteredIcon,
  isStarted: () => isStarted,
  menu: () => menu,
  openPopover: () => openPopover,
  refract: () => refract,
  refresh: () => refresh,
  refreshAdaptive: () => refreshAdaptive,
  registerIcons: () => registerIcons,
  select: () => select,
  setTheme: () => setTheme,
  sfAliases: () => sfAliases,
  sheet: () => sheet,
  start: () => start,
  stop: () => stop,
  supportsRefraction: () => supportsRefraction,
  toast: () => toast,
  unrefract: () => unrefract,
  version: () => version
});
module.exports = __toCommonJS(index_exports);

// src/icons.js
var F = ' data-fill=""';
var icons = {
  // navigation
  "chevron-left": '<path d="M15 5l-7 7 7 7"/>',
  "chevron-right": '<path d="M9 5l7 7-7 7"/>',
  "chevron-up": '<path d="M5 15l7-7 7 7"/>',
  "chevron-down": '<path d="M5 9l7 7 7-7"/>',
  "arrow-left": '<path d="M19 12H5M11 5l-7 7 7 7"/>',
  "arrow-right": '<path d="M5 12h14M13 5l7 7-7 7"/>',
  "arrow-up": '<path d="M12 19V5M5 11l7-7 7 7"/>',
  "arrow-down": '<path d="M12 5v14M5 13l7 7 7-7"/>',
  "arrow-up-right": '<path d="M7 17L17 7M8.5 7H17v8.5"/>',
  xmark: '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
  checkmark: '<path d="M4.5 12.5l5 5L19.5 7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  ellipsis: '<circle cx="6" cy="12" r="1.7"' + F + '/><circle cx="12" cy="12" r="1.7"' + F + '/><circle cx="18" cy="12" r="1.7"' + F + "/>",
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L20 20"/>',
  sidebar: '<rect x="3.5" y="4.5" width="17" height="15" rx="3"/><path d="M9.5 4.5v15"/>',
  "line-3": '<path d="M4 7h16M4 12h16M4 17h16"/>',
  list: '<path d="M9 6.5h11M9 12h11M9 17.5h11"/><circle cx="4.8" cy="6.5" r="1.2"' + F + '/><circle cx="4.8" cy="12" r="1.2"' + F + '/><circle cx="4.8" cy="17.5" r="1.2"' + F + "/>",
  grid: '<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',
  sliders: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
  // objects
  house: '<path d="M4 10.2L12 4l8 6.2V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1z"/>',
  gear: '<path d="M12 2.8l1.7 2.4 2.8-.8.7 2.8 2.6 1.3-1.2 2.6 1.2 2.6-2.6 1.3-.7 2.8-2.8-.8L12 21.2l-1.7-2.4-2.8.8-.7-2.8-2.6-1.3 1.2-2.6-1.2-2.6 2.6-1.3.7-2.8 2.8.8z"/><circle cx="12" cy="12" r="3.2"/>',
  person: '<circle cx="12" cy="8" r="3.6"/><path d="M5 20a7 7 0 0 1 14 0"/>',
  "person-circle": '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="10" r="2.8"/><path d="M6.8 18.2a6 6 0 0 1 10.4 0"/>',
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
  "info-circle": '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5"/><circle cx="12" cy="7.8" r="1.1"' + F + "/>",
  "exclamation-triangle": '<path d="M10.3 4.4a2 2 0 0 1 3.4 0l7.3 12.7a2 2 0 0 1-1.7 3H4.7a2 2 0 0 1-1.7-3z"/><path d="M12 9.5v4.5"/><circle cx="12" cy="17" r="1.1"' + F + "/>",
  "checkmark-circle": '<circle cx="12" cy="12" r="8.5"/><path d="M8 12.3l2.7 2.7L16.2 9.5"/>',
  "plus-circle": '<circle cx="12" cy="12" r="8.5"/><path d="M12 8v8M8 12h8"/>',
  "xmark-circle": '<circle cx="12" cy="12" r="8.5"/><path d="M9.2 9.2l5.6 5.6M14.8 9.2l-5.6 5.6"/>',
  download: '<path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 19.5h14"/>',
  refresh: '<path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3M19.5 4.5v4h-4"/>',
  eye: '<path d="M2.8 12S6.2 5.5 12 5.5 21.2 12 21.2 12 17.8 18.5 12 18.5 2.8 12 2.8 12z"/><circle cx="12" cy="12" r="3"/>',
  tag: '<path d="M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1.5 1.5 0 0 1 0 2.1l-6.4 6.4a1.5 1.5 0 0 1-2.1 0z"/><circle cx="8" cy="8" r="1.4"/>',
  // media
  play: '<path d="M7 4.8v14.4a.8.8 0 0 0 1.2.7l11.3-7.2a.8.8 0 0 0 0-1.4L8.2 4.1A.8.8 0 0 0 7 4.8z"' + F + "/>",
  pause: '<rect x="6" y="4.5" width="4" height="15" rx="1.2"' + F + '/><rect x="14" y="4.5" width="4" height="15" rx="1.2"' + F + "/>",
  forward: '<path d="M3 6.2v11.6a.7.7 0 0 0 1.1.6L12 12.6V17.8a.7.7 0 0 0 1.1.6l8.2-5.8a.7.7 0 0 0 0-1.2l-8.2-5.8a.7.7 0 0 0-1.1.6v5.2L4.1 5.6a.7.7 0 0 0-1.1.6z"' + F + "/>",
  backward: '<path d="M21 6.2v11.6a.7.7 0 0 1-1.1.6L12 12.6V17.8a.7.7 0 0 1-1.1.6l-8.2-5.8a.7.7 0 0 1 0-1.2l8.2-5.8a.7.7 0 0 1 1.1.6v5.2l7.9-5.8a.7.7 0 0 1 1.1.6z"' + F + "/>",
  "music-note": '<path d="M9 18V6l11-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
  speaker: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
  "speaker-slash": '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4zM16 9.5l5 5M21 9.5l-5 5"/>',
  radio: '<circle cx="12" cy="12" r="2.4"/><path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M5 5a10 10 0 0 0 0 14M19 5a10 10 0 0 1 0 14"/>',
  tv: '<rect x="3" y="5" width="18" height="12.5" rx="2.5"/><path d="M8 20.5h8"/>',
  books: '<path d="M5 4.5h3.5v15H5zM10.5 4.5H14v15h-3.5zM15.8 5.3l3.2-.9 3.4 13.7-3.2.9z"/>',
  // controls & system
  wifi: '<path d="M4 9.5a11.5 11.5 0 0 1 16 0M7 12.8a7.2 7.2 0 0 1 10 0M10 16a3 3 0 0 1 4 0"/><circle cx="12" cy="19" r="1.1"' + F + "/>",
  bluetooth: '<path d="M7 7.5l10 9-5 4.5V3l5 4.5-10 9"/>',
  airplane: '<path d="M21 12.5l-7.5-2V5a1.5 1.5 0 0 0-3 0v5.5L3 12.5v2l7.5-1.5v4.5L8.5 19v1.5l3.5-1 3.5 1V19l-2-1.5V13l7.5 1.5z"/>',
  antenna: '<path d="M12 11v10M9 21h6"/><circle cx="12" cy="9" r="2"/><path d="M8 5.5a5.5 5.5 0 0 0 0 7M16 5.5a5.5 5.5 0 0 1 0 7"/>',
  battery: '<rect x="3" y="7.5" width="16" height="9" rx="2.5"/><path d="M21.5 10.5v3"/><rect x="5" y="9.5" width="9" height="5" rx="1"' + F + "/>",
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.8v2M12 19.2v2M2.8 12h2M19.2 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M5.5 18.5l1.4-1.4M17.1 6.9l1.4-1.4"/>',
  "hand-raised": '<path d="M8.5 12V5.5a1.5 1.5 0 0 1 3 0V11M11.5 11V4a1.5 1.5 0 0 1 3 0v7M14.5 11V5.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7 6 6 0 0 1-5-2.7L3 14.6a1.5 1.5 0 0 1 2.4-1.8l3.1 3.2"/>',
  accessibility: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="7.8" r="1.2"' + F + '/><path d="M7.5 10h9M12 10v3.5l-2.5 4M12 13.5l2.5 4"/>',
  keyboard: '<rect x="3" y="6" width="18" height="12" rx="2.5"/><path d="M7 10h.01M10 10h.01M13 10h.01M16 10h.01M7 14h10"/>',
  display: '<rect x="3" y="4.5" width="18" height="12" rx="2.5"/><path d="M9 20.5h6M12 16.5v4"/>',
  iphone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.8"/><path d="M10.5 5h3"/>',
  laptop: '<path d="M5 6.5a1.5 1.5 0 0 1 1.5-1.5h11A1.5 1.5 0 0 1 19 6.5V15H5zM2.5 17.5h19"/>',
  watch: '<rect x="6.5" y="6" width="11" height="12" rx="3"/><path d="M9 6l.7-3h4.6l.7 3M9 18l.7 3h4.6l.7-3"/>'
};
var sfAliases = {
  "chevron.left": "chevron-left",
  "chevron.right": "chevron-right",
  "chevron.up": "chevron-up",
  "chevron.down": "chevron-down",
  "arrow.left": "arrow-left",
  "arrow.right": "arrow-right",
  "arrow.up": "arrow-up",
  "arrow.down": "arrow-down",
  "arrow.up.right": "arrow-up-right",
  "arrow.down.to.line": "download",
  "arrow.clockwise": "refresh",
  xmark: "xmark",
  checkmark: "checkmark",
  plus: "plus",
  minus: "minus",
  ellipsis: "ellipsis",
  magnifyingglass: "search",
  "sidebar.left": "sidebar",
  "line.3.horizontal": "line-3",
  "list.bullet": "list",
  "square.grid.2x2": "grid",
  "slider.horizontal.3": "sliders",
  house: "house",
  "house.fill": "house",
  gearshape: "gear",
  "gearshape.fill": "gear",
  person: "person",
  "person.fill": "person",
  "person.crop.circle": "person-circle",
  heart: "heart",
  "heart.fill": "heart",
  star: "star",
  "star.fill": "star",
  bell: "bell",
  "bell.fill": "bell",
  trash: "trash",
  "square.and.arrow.up": "share",
  bookmark: "bookmark",
  pencil: "pencil",
  "square.and.pencil": "compose",
  paperplane: "paperplane",
  link: "link",
  lock: "lock",
  "lock.fill": "lock",
  globe: "globe",
  bag: "bag",
  creditcard: "creditcard",
  camera: "camera",
  photo: "photo",
  folder: "folder",
  "doc.text": "doc",
  envelope: "envelope",
  message: "message",
  phone: "phone",
  calendar: "calendar",
  clock: "clock",
  "mappin.and.ellipse": "location",
  location: "location",
  map: "map",
  cloud: "cloud",
  sparkles: "sparkles",
  bolt: "bolt",
  "bolt.fill": "bolt",
  "info.circle": "info-circle",
  "exclamationmark.triangle": "exclamation-triangle",
  "checkmark.circle": "checkmark-circle",
  "plus.circle": "plus-circle",
  "xmark.circle": "xmark-circle",
  eye: "eye",
  tag: "tag",
  "play.fill": "play",
  "pause.fill": "pause",
  "forward.fill": "forward",
  "backward.fill": "backward",
  "music.note": "music-note",
  mic: "mic",
  "mic.fill": "mic",
  "speaker.wave.2": "speaker",
  "speaker.slash": "speaker-slash",
  "dot.radiowaves.left.and.right": "radio",
  tv: "tv",
  "books.vertical": "books",
  wifi: "wifi",
  airplane: "airplane",
  "antenna.radiowaves.left.and.right": "antenna",
  "battery.100": "battery",
  moon: "moon",
  "moon.fill": "moon",
  "sun.max": "sun",
  "hand.raised": "hand-raised",
  accessibility: "accessibility",
  keyboard: "keyboard",
  display: "display",
  iphone: "iphone",
  laptopcomputer: "laptop",
  applewatch: "watch"
};
var registered = /* @__PURE__ */ Object.create(null);
function addIcons(map) {
  for (const name in map) registered[name] = String(map[name]).trim();
}
var reverseAliases = /* @__PURE__ */ Object.create(null);
for (const sf in sfAliases) (reverseAliases[sfAliases[sf]] = reverseAliases[sfAliases[sf]] || []).push(sf);
function findRegistered(name) {
  if (registered[name]) return registered[name];
  const builtin = sfAliases[name] || name;
  if (registered[builtin]) return registered[builtin];
  for (const sf of reverseAliases[builtin] || []) if (registered[sf]) return registered[sf];
  return null;
}
function isRegisteredIcon(name) {
  return !!findRegistered(name);
}
function hasIcon(name) {
  return !!(findRegistered(name) || icons[name] || icons[sfAliases[name]]);
}
function sizeSvg(svg, size, className, a11y) {
  return svg.replace(/<svg\b([^>]*)>/i, (m, attrs) => {
    const cleaned = attrs.replace(/\s(width|height|class|aria-hidden|role|aria-label)="[^"]*"/gi, "");
    const fill = /\sfill=/.test(cleaned) ? "" : ' fill="currentColor"';
    return `<svg${cleaned} width="${size}" height="${size}"${fill}${className ? ` class="${className}"` : ""} ${a11y}>`;
  });
}
function icon(name, options = {}) {
  const size = options.size || 24;
  const label = options.label;
  const a11y = label ? `role="img" aria-label="${String(label).replace(/"/g, "&quot;")}"` : 'aria-hidden="true"';
  const own = findRegistered(name);
  if (own) {
    if (/^<svg/i.test(own)) return sizeSvg(own, size, options.className, a11y);
    return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor"${options.className ? ` class="${options.className}"` : ""} ${a11y}>${own}</svg>`;
  }
  const body = icons[name] || icons[sfAliases[name]];
  if (!body) return "";
  const sw = options.strokeWidth || 1.9;
  const cls = options.className ? ` class="${options.className}"` : "";
  const inner = body.replace(/ data-fill=""/g, ' fill="currentColor" stroke="none"');
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"${cls} ${a11y}>${inner}</svg>`;
}
var iconNames = Object.keys(icons);

// src/core.js
var version = "0.1.0";
var SVG_NS = "http://www.w3.org/2000/svg";
var config = {
  refraction: "auto",
  // true | false | 'auto' (Chromium engines: Chrome, Edge, Opera, Brave, Electron)
  dynamicLight: true,
  // specular rim follows the pointer
  observe: true
  // enhance components that are added to the DOM later
};
function configure(options) {
  Object.assign(config, options || {});
  refractionSupport = void 0;
  return { ...config };
}
var isBrowser = () => typeof window !== "undefined" && typeof document !== "undefined";
function clamp(v, min, max) {
  return v < min ? min : v > max ? max : v;
}
function $(sel, root) {
  if (!sel || !isBrowser()) return null;
  if (typeof sel !== "string") return sel;
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
function reveal(el, fn) {
  void el.offsetWidth;
  fn();
}
function mq(query) {
  return !!(window.matchMedia && window.matchMedia(query).matches);
}
function prefersReducedMotion() {
  return mq("(prefers-reduced-motion: reduce)");
}
function numAttr(el, name, fallback) {
  const v = el.getAttribute(name);
  return v == null || v === "" ? fallback : parseFloat(v);
}
function state(el) {
  if (!el.__lg) el.__lg = { flags: {}, cleanups: [], injected: [] };
  return el.__lg;
}
function claim(el, flag) {
  const s = state(el);
  if (s.flags[flag]) {
    if (s.revive) s.revive();
    return false;
  }
  s.flags[flag] = true;
  return true;
}
var classObserver = null;
function watchClass(el) {
  const s = state(el);
  if (s.watched || typeof MutationObserver === "undefined") return;
  s.watched = true;
  if (!classObserver) {
    classObserver = new MutationObserver((records) => {
      for (const r of records) {
        const t = r.target;
        const st = t.__lg;
        if (st && st.owned) {
          for (const c of st.owned) if (!t.classList.contains(c)) t.classList.add(c);
        }
        if (tracked.has(t)) {
          const tr = tracked.get(t);
          tr.dirty = true;
          if (tr.visible) queueMap(t);
        }
      }
    });
  }
  classObserver.observe(el, { attributes: true, attributeFilter: ["class"] });
}
function ownClass(el, name, on) {
  const s = state(el);
  if (!s.owned) s.owned = /* @__PURE__ */ new Set();
  if (on) {
    s.owned.add(name);
    el.classList.add(name);
    watchClass(el);
  } else {
    s.owned.delete(name);
    el.classList.remove(name);
  }
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
  if (uad && uad.brands) return uad.brands.some((b) => b.brand === "Chromium");
  const ua = navigator.userAgent;
  return /Chrome\/\d+/.test(ua) && !/Firefox\//.test(ua);
}
var refractionSupport;
function supportsRefraction() {
  if (!isBrowser()) return false;
  if (refractionSupport !== void 0) return refractionSupport;
  const css = !!(window.CSS && CSS.supports && CSS.supports("backdrop-filter", "url(#lg)"));
  if (config.refraction === false || mq("(prefers-reduced-transparency: reduce)")) refractionSupport = false;
  else if (config.refraction === true) refractionSupport = css;
  else refractionSupport = css && isChromium();
  return refractionSupport;
}
var defs = null;
var filters = /* @__PURE__ */ new Map();
var unused = [];
var tracked = /* @__PURE__ */ new Map();
var filterSeq = 0;
var uid = 0;
var MAX_UNUSED = 32;
var MAP_MAX_SIDE = 200;
function getDefs() {
  if (defs && defs.isConnected) return defs;
  if (defs) {
    filters.clear();
    unused.length = 0;
    tracked.forEach((st, el) => {
      st.key = null;
      st.dirty = true;
      if (el.isConnected && st.visible) setTimeout(() => queueMap(el), 0);
    });
  }
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  svg.setAttribute("width", "0");
  svg.setAttribute("height", "0");
  svg.setAttribute("data-lg-defs", "");
  svg.style.cssText = "position:absolute;top:0;left:0;width:0;height:0;overflow:hidden;pointer-events:none";
  defs = document.createElementNS(SVG_NS, "defs");
  svg.appendChild(defs);
  (document.body || document.documentElement).appendChild(svg);
  return defs;
}
function createDisplacementMap(w, h, radius, bezel, depth, magnify) {
  const res = Math.min(1, MAP_MAX_SIDE / Math.max(w, h));
  const mw = Math.max(2, Math.round(w * res));
  const mh = Math.max(2, Math.round(h * res));
  const hw = w / 2;
  const hh = h / 2;
  const r = Math.min(radius, hw, hh);
  const B = Math.max(1, Math.min(bezel, hw, hh));
  const rn = Math.min(Math.max(r, B), hw, hh);
  const lensK = magnify > 1 ? 1 - 1 / magnify : 0;
  const maxD = depth * B + lensK * Math.sqrt(w * w + h * h) / 2;
  const scale = Math.max(1, Math.ceil(maxD * 2 + 2));
  const canvas = document.createElement("canvas");
  canvas.width = mw;
  canvas.height = mh;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const img = ctx.createImageData(mw, mh);
  const px32 = new Uint32Array(img.data.buffer);
  px32.fill(4286611584);
  const k = 255 / scale;
  const inv = 1 / res;
  const qw = Math.ceil(mw / 2);
  const qh = Math.ceil(mh / 2);
  const innerX = hw - r;
  const innerY = hh - r;
  const normX = hw - rn;
  const normY = hh - rn;
  for (let j = 0; j < qh; j++) {
    const ay = hh - (j + 0.5) * inv;
    const jm = mh - 1 - j;
    for (let i = 0; i < qw; i++) {
      const ax = hw - (i + 0.5) * inv;
      const qx = ax - innerX;
      const qy = ay - innerY;
      const ox = qx > 0 ? qx : 0;
      const oy = qy > 0 ? qy : 0;
      let dist = r - Math.sqrt(ox * ox + oy * oy) - (qx > qy ? qx < 0 ? qx : 0 : qy < 0 ? qy : 0);
      if (dist < 0) dist = 0;
      let dx = 0;
      let dy = 0;
      if (dist < B) {
        const nx0 = ax - normX;
        const ny0 = ay - normY;
        let nx;
        let ny;
        if (nx0 > 0 && ny0 > 0) {
          const l = Math.sqrt(nx0 * nx0 + ny0 * ny0);
          nx = nx0 / l;
          ny = ny0 / l;
        } else if (nx0 > ny0) {
          nx = 1;
          ny = 0;
        } else {
          nx = 0;
          ny = 1;
        }
        const t = 1 - dist / B;
        const m = depth * B * t * t;
        dx = nx * m;
        dy = ny * m;
      }
      if (lensK) {
        dx += ax * lensK;
        dy += ay * lensK;
      }
      if (dx === 0 && dy === 0) continue;
      const rp = clamp(Math.round(127.5 + dx * k), 0, 255);
      const rn2 = clamp(Math.round(127.5 - dx * k), 0, 255);
      const gp = clamp(Math.round(127.5 + dy * k), 0, 255);
      const gn = clamp(Math.round(127.5 - dy * k), 0, 255);
      const im = mw - 1 - i;
      px32[j * mw + i] = 4286578688 | gp << 8 | rp;
      px32[j * mw + im] = 4286578688 | gp << 8 | rn2;
      px32[jm * mw + i] = 4286578688 | gn << 8 | rp;
      px32[jm * mw + im] = 4286578688 | gn << 8 | rn2;
    }
  }
  ctx.putImageData(img, 0, 0);
  return { url: canvas.toDataURL("image/png"), scale, width: mw, height: mh };
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
  const id = "lg-refract-" + ++filterSeq;
  const f = document.createElementNS(SVG_NS, "filter");
  f.setAttribute("id", id);
  f.setAttribute("x", "0");
  f.setAttribute("y", "0");
  f.setAttribute("width", "1");
  f.setAttribute("height", "1");
  f.setAttribute("color-interpolation-filters", "sRGB");
  let input = "SourceGraphic";
  if (o.saturate !== 1) {
    const sat = document.createElementNS(SVG_NS, "feColorMatrix");
    sat.setAttribute("in", input);
    sat.setAttribute("type", "saturate");
    sat.setAttribute("values", String(o.saturate));
    sat.setAttribute("result", "sat");
    f.appendChild(sat);
    input = "sat";
  }
  if (o.brightness !== 1) {
    const ct = document.createElementNS(SVG_NS, "feComponentTransfer");
    ct.setAttribute("in", input);
    ct.setAttribute("result", "lit");
    for (const ch of ["R", "G", "B"]) {
      const fn = document.createElementNS(SVG_NS, "feFunc" + ch);
      fn.setAttribute("type", "linear");
      fn.setAttribute("slope", String(o.brightness));
      ct.appendChild(fn);
    }
    f.appendChild(ct);
    input = "lit";
  }
  const fi = document.createElementNS(SVG_NS, "feImage");
  fi.setAttribute("href", map.url);
  fi.setAttribute("preserveAspectRatio", "none");
  fi.setAttribute("result", "map");
  const fd = document.createElementNS(SVG_NS, "feDisplacementMap");
  fd.setAttribute("in", input);
  fd.setAttribute("in2", "map");
  fd.setAttribute("scale", String(map.scale));
  fd.setAttribute("xChannelSelector", "R");
  fd.setAttribute("yChannelSelector", "G");
  fd.setAttribute("result", "bent");
  f.append(fi, fd);
  if (o.blur > 0) {
    const gb = document.createElementNS(SVG_NS, "feGaussianBlur");
    gb.setAttribute("in", "bent");
    gb.setAttribute("stdDeviation", String(o.blur));
    gb.setAttribute("edgeMode", "duplicate");
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
  if (/%/.test(value)) v = v / 100 * Math.min(w, h);
  return Math.min(v, w / 2, h / 2);
}
var FRAME_BUDGET = 8;
var pendingMaps = /* @__PURE__ */ new Set();
var flushQueued = false;
var budgetStart = 0;
var budgetFrame = -1;
function withinBudget() {
  const now = performance.now();
  if (budgetFrame !== frameCount) {
    budgetFrame = frameCount;
    budgetStart = now;
  }
  return now - budgetStart < FRAME_BUDGET;
}
var frameCount = 0;
function queueMap(el) {
  pendingMaps.add(el);
  if (flushQueued) return;
  flushQueued = true;
  requestAnimationFrame(() => {
    flushQueued = false;
    frameCount++;
    for (const target of pendingMaps) {
      if (!withinBudget()) break;
      pendingMaps.delete(target);
      applyRefraction(target);
    }
    if (pendingMaps.size) queueMap(pendingMaps.values().next().value);
  });
}
var idleMaps = /* @__PURE__ */ new Set();
var idleQueued = false;
function queueIdle(el) {
  idleMaps.add(el);
  if (idleQueued) return;
  idleQueued = true;
  const run = (deadline) => {
    idleQueued = false;
    for (const target of idleMaps) {
      if (deadline && deadline.timeRemaining() < 3) break;
      idleMaps.delete(target);
      const st = tracked.get(target);
      if (st && st.dirty && target.isConnected) applyRefraction(target);
      if (!deadline) break;
    }
    if (idleMaps.size) queueIdle(idleMaps.values().next().value);
  };
  if (typeof requestIdleCallback === "function") requestIdleCallback(run, { timeout: 2e3 });
  else setTimeout(run, 120);
}
function isNearViewport(el) {
  const r = el.getBoundingClientRect();
  const m = 250;
  return r.bottom > -m && r.right > -m && r.top < window.innerHeight + m && r.left < window.innerWidth + m;
}
var intersectionObserver = null;
function getIntersectionObserver() {
  if (intersectionObserver || typeof IntersectionObserver === "undefined") return intersectionObserver;
  intersectionObserver = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const st = tracked.get(e.target);
        if (!st) continue;
        st.visible = e.isIntersecting;
        if (st.visible && st.dirty) queueMap(e.target);
      }
    },
    { rootMargin: "250px" }
  );
  return intersectionObserver;
}
var resizeObserver = null;
function getResizeObserver() {
  if (resizeObserver || typeof ResizeObserver === "undefined") return resizeObserver;
  resizeObserver = new ResizeObserver((entries) => {
    frameCount++;
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
  st.dirty = true;
  if (st.visible === void 0) st.visible = isNearViewport(el);
  if (!st.visible) {
    queueIdle(el);
    return;
  }
  if (!st.key && !withinBudget()) {
    queueMap(el);
    return;
  }
  const now = performance.now();
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
  st.dirty = false;
  const w = Math.round(st.w);
  const h = Math.round(st.h);
  const r = parseRadius(getComputedStyle(el).borderTopLeftRadius, w, h);
  const o = st.opts;
  const bezel = numAttr(el, "data-lg-bezel", o.bezel != null ? o.bezel : clamp(Math.min(w, h) * 0.3, 6, 28));
  const depth = clamp(numAttr(el, "data-lg-depth", o.depth != null ? o.depth : 0.45), 0, 0.5);
  const magnify = numAttr(el, "data-lg-magnify", o.magnify != null ? o.magnify : 1);
  const cs = getComputedStyle(el);
  const saturate = o.saturate != null ? o.saturate : parseFloat(cs.getPropertyValue("--_sat")) || 1;
  const brightness = o.brightness != null ? o.brightness : parseFloat(cs.getPropertyValue("--_bright")) || 1;
  const blurVar = cs.getPropertyValue("--lg-refract-blur");
  const blur = o.blur != null ? o.blur : blurVar ? parseFloat(blurVar) || 0 : 0;
  const key = [w, h, Math.round(r), Math.round(bezel), depth.toFixed(2), magnify.toFixed(2), saturate, brightness, blur].join(":");
  if (key === st.key) return;
  const id = acquireFilter(key, w, h, r, { bezel, depth, magnify, saturate, brightness, blur });
  releaseFilter(st.key);
  st.key = key;
  el.style.setProperty("--lg-refract", "url(#" + id + ")");
  ownClass(el, "lg-refractive", true);
}
function refract(el, opts) {
  el = $(el);
  if (!el || !supportsRefraction() || !getResizeObserver()) return el;
  if (el.getAttribute("data-lg-refraction") === "off") return el;
  const existing = tracked.get(el);
  if (existing) {
    if (opts) {
      existing.opts = opts;
      applyRefraction(el);
    }
    return el;
  }
  tracked.set(el, { opts: opts || {}, key: null, w: 0, h: 0, last: 0, timer: 0, visible: void 0, dirty: false });
  getResizeObserver().observe(el);
  watchClass(el);
  const io = getIntersectionObserver();
  if (io) io.observe(el);
  return el;
}
function unrefract(el) {
  el = $(el);
  const st = el && tracked.get(el);
  if (!st) return;
  clearTimeout(st.timer);
  if (resizeObserver) resizeObserver.unobserve(el);
  if (intersectionObserver) intersectionObserver.unobserve(el);
  pendingMaps.delete(el);
  idleMaps.delete(el);
  releaseFilter(st.key);
  tracked.delete(el);
  el.style.removeProperty("--lg-refract");
  ownClass(el, "lg-refractive", false);
}
function sweepDisconnected() {
  tracked.forEach((_, el) => {
    if (!el.isConnected) unrefract(el);
  });
}
var lightFrame = 0;
var lastAngle = 135;
function onLightMove(e) {
  if (lightFrame || e.pointerType === "touch") return;
  const x = e.clientX;
  const y = e.clientY;
  lightFrame = requestAnimationFrame(() => {
    lightFrame = 0;
    const nx = x / window.innerWidth - 0.5;
    const ny = y / window.innerHeight - 0.5;
    const angle = 135 + nx * 50 - ny * 30;
    if (Math.abs(angle - lastAngle) < 1.5) return;
    lastAngle = angle;
    document.documentElement.style.setProperty("--lg-light-angle", angle.toFixed(1) + "deg");
  });
}
var PRESSABLE = ".lg-button, .lg-glass--interactive, .lg-tabbar-search, .lg-tabbar-action";
function onPressStart(e) {
  if (e.button > 0) return;
  const el = e.target.closest && e.target.closest(PRESSABLE);
  if (!el || el.disabled || el.getAttribute("aria-disabled") === "true") return;
  const rect = el.getBoundingClientRect();
  const setPoint = (ev) => {
    const px = clamp((ev.clientX - rect.left) / rect.width, 0, 1);
    const py = clamp((ev.clientY - rect.top) / rect.height, 0, 1);
    el.style.setProperty("--lg-px", (px * 100).toFixed(1) + "%");
    el.style.setProperty("--lg-py", (py * 100).toFixed(1) + "%");
    el.style.setProperty("--lg-dx", ((px - 0.5) * Math.min(8, rect.width * 0.08)).toFixed(2) + "px");
    el.style.setProperty("--lg-dy", ((py - 0.5) * Math.min(6, rect.height * 0.1)).toFixed(2) + "px");
  };
  setPoint(e);
  el.classList.add("is-pressed");
  const start2 = performance.now();
  const move = (ev) => setPoint(ev);
  const end = () => {
    document.removeEventListener("pointermove", move);
    document.removeEventListener("pointerup", end);
    document.removeEventListener("pointercancel", end);
    setTimeout(() => {
      el.classList.remove("is-pressed");
      el.style.removeProperty("--lg-dx");
      el.style.removeProperty("--lg-dy");
    }, Math.max(0, 140 - (performance.now() - start2)));
  };
  document.addEventListener("pointermove", move, { passive: true });
  document.addEventListener("pointerup", end);
  document.addEventListener("pointercancel", end);
}
function makeStretch(el, baseX, baseY) {
  let lastX = 0;
  let lastT = 0;
  let v = 0;
  let timer = 0;
  const apply = (sx, sy) => {
    el.style.setProperty("--_sx", sx.toFixed(3));
    el.style.setProperty("--_sy", sy.toFixed(3));
  };
  return {
    start(x) {
      lastX = x;
      lastT = performance.now();
      v = 0;
    },
    move(x) {
      const now = performance.now();
      const dt = Math.max(8, now - lastT);
      v = v * 0.6 + (x - lastX) / dt * 0.4;
      lastX = x;
      lastT = now;
      const k = Math.min(Math.abs(v) * 0.09, 0.22);
      apply(baseX * (1 + k), baseY * (1 - k * 0.55));
      clearTimeout(timer);
      timer = setTimeout(() => apply(baseX, baseY), 90);
    },
    end() {
      clearTimeout(timer);
      el.style.removeProperty("--_sx");
      el.style.removeProperty("--_sy");
    }
  };
}
function initSwitch(el) {
  if (!claim(el, "switch")) return;
  const input = el.querySelector("input");
  if (!input) return;
  if (!input.hasAttribute("role")) input.setAttribute("role", "switch");
  let thumb = el.querySelector(".lg-switch-thumb");
  if (!thumb) thumb = inject(el, create("span", "lg-switch-thumb", { "aria-hidden": "true" }));
  const lensOpts = { bezel: 7, depth: 0.35, magnify: 1.12, saturate: 1.6, brightness: 1.08, blur: 0.4 };
  refract(thumb, lensOpts);
  state(el).revive = () => refract(thumb, lensOpts);
  let pointerId = null;
  let startX = 0;
  let startOn = false;
  let moved = false;
  let x = 0;
  let travel = 0;
  let pressedAt = 0;
  let suppressClick = false;
  const stretch = makeStretch(thumb, 1.42, 1.5);
  listen(el, el, "pointerdown", (e) => {
    if (input.disabled || e.button > 0) return;
    pointerId = e.pointerId;
    startX = e.clientX;
    startOn = input.checked;
    moved = false;
    pressedAt = performance.now();
    const pad = thumb.offsetLeft;
    travel = el.clientWidth - thumb.offsetWidth - pad * 2;
    x = startOn ? travel : 0;
    el.classList.add("is-pressed");
    stretch.start(e.clientX);
    try {
      el.setPointerCapture(pointerId);
    } catch (_) {
    }
  });
  listen(el, el, "pointermove", (e) => {
    if (e.pointerId !== pointerId) return;
    const dx = e.clientX - startX;
    if (!moved && Math.abs(dx) > 3) {
      moved = true;
      el.classList.add("is-dragging");
    }
    if (moved) {
      x = clamp((startOn ? travel : 0) + dx, 0, travel);
      thumb.style.setProperty("--_x", x + "px");
      stretch.move(e.clientX);
    }
  });
  const end = (e) => {
    if (e.pointerId !== pointerId) return;
    pointerId = null;
    el.classList.remove("is-dragging");
    stretch.end();
    if (moved) {
      thumb.style.removeProperty("--_x");
      if (x > travel / 2 !== input.checked) input.click();
      suppressClick = true;
      setTimeout(() => suppressClick = false, 60);
    }
    setTimeout(() => {
      if (pointerId == null) el.classList.remove("is-pressed");
    }, Math.max(0, 260 - (performance.now() - pressedAt)));
  };
  listen(el, el, "pointerup", end);
  listen(el, el, "pointercancel", end);
  listen(
    el,
    el,
    "click",
    (e) => {
      if (suppressClick && e.isTrusted) {
        suppressClick = false;
        e.preventDefault();
      }
    },
    true
  );
}
function initSlider(el) {
  if (!claim(el, "slider")) return;
  const input = el.querySelector('input[type="range"]');
  if (!input) return;
  let body = el.querySelector(".lg-slider-body");
  if (!body) {
    body = create("div", "lg-slider-body");
    input.parentNode.insertBefore(body, input);
    body.appendChild(input);
    onCleanup(el, () => {
      if (body.parentNode) {
        body.parentNode.insertBefore(input, body);
        body.remove();
      }
    });
  }
  if (!body.querySelector(".lg-slider-track")) {
    const track = create("div", "lg-slider-track", { "aria-hidden": "true" });
    track.appendChild(create("div", "lg-slider-fill"));
    inject(body, track);
  }
  const ticks = parseInt(el.getAttribute("data-lg-ticks"), 10);
  if (ticks > 1 && !body.querySelector(".lg-slider-ticks")) {
    const row = create("div", "lg-slider-ticks", { "aria-hidden": "true" });
    for (let i = 0; i < ticks; i++) row.appendChild(document.createElement("i"));
    inject(body, row);
  }
  let thumb = body.querySelector(".lg-slider-thumb");
  if (!thumb) thumb = inject(body, create("div", "lg-slider-thumb", { "aria-hidden": "true" }));
  const lensOpts = { bezel: 7, depth: 0.35, magnify: 1.18, saturate: 1.5, brightness: 1.08, blur: 0.4 };
  refract(thumb, lensOpts);
  state(el).revive = () => refract(thumb, lensOpts);
  const sync = () => {
    const min = parseFloat(input.min || 0);
    const max = parseFloat(input.max || 100);
    const ratio = max > min ? (parseFloat(input.value) - min) / (max - min) : 0;
    el.style.setProperty("--_ratio", clamp(ratio, 0, 1).toFixed(4));
  };
  sync();
  listen(el, input, "input", sync);
  listen(el, input, "change", sync);
  ownClass(el, "is-ready", true);
  onCleanup(el, () => ownClass(el, "is-ready", false));
  state(el).sync = sync;
  let activeAt = 0;
  const stretch = makeStretch(thumb, 1.5, 1.6);
  const onMove = (e) => stretch.move(e.clientX);
  listen(el, input, "pointerdown", (e) => {
    if (input.disabled || e.button > 0) return;
    activeAt = performance.now();
    el.classList.add("is-active");
    stretch.start(e.clientX);
    document.addEventListener("pointermove", onMove, { passive: true });
    const end = () => {
      document.removeEventListener("pointermove", onMove);
      stretch.end();
      document.removeEventListener("pointerup", end);
      document.removeEventListener("pointercancel", end);
      setTimeout(() => el.classList.remove("is-active"), Math.max(0, 220 - (performance.now() - activeAt)));
    };
    document.addEventListener("pointerup", end);
    document.addEventListener("pointercancel", end);
  });
  const desc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
  if (desc && desc.set && !el.hasAttribute("data-lg-controlled")) {
    Object.defineProperty(input, "value", {
      configurable: true,
      get() {
        return desc.get.call(this);
      },
      set(v) {
        desc.set.call(this, v);
        sync();
      }
    });
    onCleanup(el, () => delete input.value);
  }
}
function initSegmented(el) {
  if (!claim(el, "segmented")) return;
  let indicator = el.querySelector(":scope > .lg-segmented-indicator");
  if (!indicator) indicator = inject(el, create("span", "lg-segmented-indicator", { "aria-hidden": "true" }), el.firstChild);
  const lensOpts = { bezel: 8, depth: 0.35, magnify: 1.1, saturate: 1.5, brightness: 1.06, blur: 0 };
  refract(indicator, lensOpts);
  state(el).revive = () => refract(indicator, lensOpts);
  const items = () => Array.from(el.children).filter((c) => c.matches("label, button"));
  const isSelected = (item) => {
    const input = item.querySelector("input");
    if (input) return input.checked;
    return item.getAttribute("aria-pressed") === "true" || item.getAttribute("aria-selected") === "true";
  };
  const selectedIndex = () => items().findIndex(isSelected);
  const place = (index) => {
    const item = items()[index];
    if (!item) {
      indicator.style.opacity = "0";
      return;
    }
    indicator.style.opacity = "";
    indicator.style.setProperty("--_x", item.offsetLeft + "px");
    indicator.style.setProperty("--_w", item.offsetWidth + "px");
  };
  const select2 = (index, fromUser) => {
    const list = items();
    const item = list[index];
    if (!item) return;
    const input = item.querySelector("input");
    if (input) {
      if (!input.checked) {
        if (fromUser) input.click();
        else input.checked = true;
      }
    } else {
      list.forEach((it, i) => {
        it.setAttribute(it.hasAttribute("aria-selected") ? "aria-selected" : "aria-pressed", i === index ? "true" : "false");
      });
      if (fromUser) emit(el, "lg-change", { index, value: item.value || item.textContent.trim() });
    }
    place(index);
  };
  state(el).select = select2;
  state(el).refresh = () => place(selectedIndex());
  indicator.style.transition = "none";
  place(selectedIndex());
  ownClass(el, "is-ready", true);
  nextFrame(() => indicator.style.transition = "");
  onCleanup(el, () => ownClass(el, "is-ready", false));
  listen(el, el, "change", () => place(selectedIndex()));
  listen(el, el, "click", (e) => {
    const item = e.target.closest("button");
    if (item && item.parentNode === el) select2(items().indexOf(item), true);
  });
  const ro = getResizeObserver() && new ResizeObserver(() => place(selectedIndex()));
  if (ro) {
    ro.observe(el);
    onCleanup(el, () => ro.disconnect());
  }
  let drag = null;
  listen(el, el, "pointerdown", (e) => {
    if (e.button > 0) return;
    const list = items();
    const item = e.target.closest("label, button");
    const idx = list.indexOf(item);
    if (idx < 0 || idx !== selectedIndex()) return;
    drag = { id: e.pointerId, startX: e.clientX, x0: item.offsetLeft, w: item.offsetWidth, moved: false, near: idx };
    drag.stretch = makeStretch(indicator, 1.12, 1.3);
    drag.stretch.start(e.clientX);
    el.classList.add("is-dragging");
    try {
      el.setPointerCapture(e.pointerId);
    } catch (_) {
    }
  });
  listen(el, el, "pointermove", (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.startX;
    if (!drag.moved && Math.abs(dx) < 3) return;
    drag.moved = true;
    indicator.classList.add("is-moving");
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    const x = clamp(drag.x0 + dx, pad, el.clientWidth - pad - drag.w);
    indicator.style.setProperty("--_x", x + "px");
    drag.stretch.move(e.clientX);
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
    d.stretch.end();
    indicator.classList.remove("is-moving");
    setTimeout(() => el.classList.remove("is-dragging"), d.moved ? 0 : 180);
    if (d.moved) {
      swallowNextClick(el);
      select2(d.near, true);
    } else {
      place(selectedIndex());
    }
  };
  listen(el, el, "pointerup", endDrag);
  listen(el, el, "pointercancel", endDrag);
}
function swallowNextClick(el) {
  const swallow = (ev) => {
    if (!ev.isTrusted) return;
    ev.preventDefault();
    ev.stopPropagation();
    el.removeEventListener("click", swallow, true);
  };
  el.addEventListener("click", swallow, true);
  setTimeout(() => el.removeEventListener("click", swallow, true), 60);
}
function initTabbar(bar) {
  if (!claim(bar, "tabbar")) return;
  const tabsEl = bar.querySelector(".lg-tabbar-tabs");
  if (!tabsEl) return;
  let indicator = tabsEl.querySelector(":scope > .lg-tabbar-indicator");
  if (!indicator) indicator = inject(tabsEl, create("div", "lg-tabbar-indicator", { "aria-hidden": "true" }), tabsEl.firstChild);
  let lens = bar.querySelector(":scope > .lg-tabbar-lens");
  if (!lens) lens = inject(bar, create("div", "lg-tabbar-lens", { "aria-hidden": "true" }));
  const lensOpts = { bezel: 14, depth: 0.4, magnify: 1.16, saturate: 1.4, brightness: 1.05, blur: 0 };
  refract(lens, lensOpts);
  state(bar).revive = () => refract(lens, lensOpts);
  const tabs = () => $$(".lg-tab", tabsEl);
  const current = () => tabs().findIndex((t) => t.classList.contains("is-selected") || t.getAttribute("aria-current") === "page" || t.getAttribute("aria-selected") === "true");
  const place = (index) => {
    const t = tabs()[index];
    if (!t) return;
    const pad = parseFloat(getComputedStyle(tabsEl).paddingLeft) || 0;
    indicator.style.left = pad + "px";
    indicator.style.setProperty("--_x", t.offsetLeft - pad + "px");
    indicator.style.setProperty("--_w", t.offsetWidth + "px");
  };
  const select2 = (index, fromUser) => {
    const list = tabs();
    const t = list[index];
    if (!t) return;
    list.forEach((tab, i) => {
      const on = i === index;
      tab.classList.toggle("is-selected", on);
      if (tab.tagName === "A") {
        if (on) tab.setAttribute("aria-current", "page");
        else tab.removeAttribute("aria-current");
      } else {
        tab.setAttribute("aria-selected", on ? "true" : "false");
      }
    });
    place(index);
    if (fromUser) emit(bar, "lg-change", { index, tab: t, value: t.getAttribute("data-value") });
  };
  state(bar).select = select2;
  state(bar).refresh = () => place(Math.max(0, current()));
  indicator.style.transition = "none";
  place(Math.max(0, current()));
  nextFrame(() => indicator.style.transition = "");
  const ro = getResizeObserver() && new ResizeObserver(() => place(Math.max(0, current())));
  if (ro) {
    ro.observe(tabsEl);
    onCleanup(bar, () => ro.disconnect());
  }
  listen(bar, tabsEl, "dragstart", (e) => e.preventDefault());
  if (tabs().some((t) => t.tagName === "BUTTON")) {
    tabsEl.setAttribute("role", "tablist");
    tabs().forEach((t) => t.tagName === "BUTTON" && t.setAttribute("role", "tab"));
  }
  listen(bar, tabsEl, "keydown", (e) => {
    const keys = { ArrowRight: 1, ArrowLeft: -1, Home: -Infinity, End: Infinity };
    if (!(e.key in keys)) return;
    const list = tabs();
    const i = list.indexOf(document.activeElement);
    if (i < 0) return;
    e.preventDefault();
    const step = keys[e.key];
    const next = step === -Infinity ? 0 : step === Infinity ? list.length - 1 : (i + step + list.length) % list.length;
    list[next].focus();
    if (list[next].tagName === "BUTTON") select2(next, true);
  });
  listen(bar, tabsEl, "click", (e) => {
    const t = e.target.closest(".lg-tab");
    if (!t) return;
    if (t.tagName === "A" && (t.getAttribute("href") || "#").charAt(0) === "#") e.preventDefault();
    ownClass(bar, "is-minimized", false);
    select2(tabs().indexOf(t), true);
  });
  let drag = null;
  const lensTo = (cx, animate) => {
    const br = bar.getBoundingClientRect();
    const tr = tabsEl.getBoundingClientRect();
    const list = tabs();
    const ref = list[Math.max(0, current())] || list[0];
    const w = ref.offsetWidth + 14;
    const x = clamp(cx - w / 2, tr.left - 4, tr.right - w + 4) - br.left;
    lens.classList.toggle("is-moving", !animate);
    lens.style.setProperty("--_w", w + "px");
    lens.style.setProperty("--_lh", tr.height + 10 + "px");
    lens.style.setProperty("--_x", x + "px");
    lens.style.setProperty("--_y", tr.top - br.top - 5 + "px");
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
  listen(bar, tabsEl, "pointerdown", (e) => {
    if (e.button > 0 || bar.classList.contains("is-minimized")) return;
    const t = e.target.closest(".lg-tab");
    if (!t) return;
    const r = t.getBoundingClientRect();
    drag = { id: e.pointerId, startX: e.clientX, moved: false };
    drag.near = lensTo(r.left + r.width / 2, true);
    drag.timer = setTimeout(() => drag && bar.classList.add("is-dragging"), 90);
  });
  listen(bar, tabsEl, "pointermove", (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    if (!drag.moved && Math.abs(e.clientX - drag.startX) < 6) return;
    if (!drag.moved) {
      drag.moved = true;
      clearTimeout(drag.timer);
      bar.classList.add("is-dragging");
      try {
        tabsEl.setPointerCapture(e.pointerId);
      } catch (_) {
      }
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
      select2(d.near, true);
    }
    const t = tabs()[d.moved ? d.near : Math.max(0, current())];
    if (t) {
      const r = t.getBoundingClientRect();
      lensTo(r.left + r.width / 2, true);
    }
    setTimeout(() => bar.classList.remove("is-dragging"), d.moved ? 60 : 200);
  };
  listen(bar, tabsEl, "pointerup", endDrag);
  listen(bar, tabsEl, "pointercancel", endDrag);
  const target = bar.getAttribute("data-lg-minimize-on-scroll");
  if (target != null) {
    const scroller = target && target !== "window" ? $(target) : window;
    if (scroller) {
      let lastY = 0;
      const getY = () => scroller === window ? window.scrollY : scroller.scrollTop;
      listen(
        bar,
        scroller,
        "scroll",
        () => {
          const y = getY();
          const dy = y - lastY;
          if (y < 40 || dy < -12) ownClass(bar, "is-minimized", false);
          else if (dy > 6 && y > 80) ownClass(bar, "is-minimized", true);
          if (Math.abs(dy) > 6 || y < 40) lastY = y;
        },
        { passive: true }
      );
    }
  }
}
function scrollParent(el) {
  let p = el.parentElement;
  while (p && p !== document.body) {
    const oy = getComputedStyle(p).overflowY;
    if (oy === "auto" || oy === "scroll") return p;
    p = p.parentElement;
  }
  return window;
}
function initNavbar(el) {
  if (!claim(el, "navbar")) return;
  const sel = el.getAttribute("data-lg-scroll");
  const scroller = sel ? sel === "window" ? window : $(sel) : scrollParent(el);
  if (!scroller) return;
  const threshold = numAttr(el, "data-lg-threshold", el.classList.contains("lg-navbar--large") ? 44 : 2);
  const update = () => {
    const y = scroller === window ? window.scrollY : scroller.scrollTop;
    ownClass(el, "is-scrolled", y > threshold);
  };
  listen(el, scroller, "scroll", update, { passive: true });
  update();
}
function initPickerColumn(col) {
  if (!claim(col, "picker")) return;
  if (!col.hasAttribute("role")) col.setAttribute("role", "listbox");
  if (!col.hasAttribute("tabindex")) col.tabIndex = 0;
  const items = () => $$(".lg-picker-item", col);
  items().forEach((it) => it.setAttribute("role", "option"));
  const rowH = () => {
    const first = col.querySelector(".lg-picker-item");
    return first && first.offsetHeight || 34;
  };
  let frame = 0;
  let settle = 0;
  let current = -1;
  const paint = () => {
    frame = 0;
    const h = rowH();
    const center = col.scrollTop / h;
    const list2 = items();
    const from = Math.max(0, Math.floor(center) - 6);
    const to = Math.min(list2.length - 1, Math.ceil(center) + 6);
    for (let i = from; i <= to; i++) {
      const d = i - center;
      const s = list2[i].style;
      s.setProperty("--_rx", clamp(-d * 20, -80, 80).toFixed(1) + "deg");
      s.setProperty("--_s", (1 - Math.min(Math.abs(d) * 0.035, 0.2)).toFixed(3));
      s.setProperty("--_o", Math.max(0.25, 1 - Math.abs(d) * 0.2).toFixed(3));
    }
  };
  const commit = (fromUser) => {
    const list2 = items();
    const index = clamp(Math.round(col.scrollTop / rowH()), 0, list2.length - 1);
    if (index === current) return;
    current = index;
    list2.forEach((it, i) => it.setAttribute("aria-selected", i === index ? "true" : "false"));
    const item = list2[index];
    const value = item ? item.getAttribute("data-value") || item.textContent.trim() : null;
    col.setAttribute("data-value", value);
    if (item && item.id) col.setAttribute("aria-activedescendant", item.id);
    if (fromUser) emit(col, "lg-change", { index, value });
  };
  const scrollToIndex = (index, smooth) => {
    const list2 = items();
    index = clamp(index, 0, list2.length - 1);
    col.scrollTo({ top: index * rowH(), behavior: smooth && !prefersReducedMotion() ? "smooth" : "instant" });
  };
  listen(
    col,
    col,
    "scroll",
    () => {
      if (!frame) frame = requestAnimationFrame(paint);
      clearTimeout(settle);
      settle = setTimeout(() => commit(true), 110);
    },
    { passive: true }
  );
  listen(col, col, "click", (e) => {
    const it = e.target.closest(".lg-picker-item");
    if (it) scrollToIndex(items().indexOf(it), true);
  });
  listen(col, col, "keydown", (e) => {
    const keys = { ArrowDown: 1, ArrowUp: -1, PageDown: 5, PageUp: -5 };
    if (e.key in keys) {
      e.preventDefault();
      scrollToIndex(Math.max(current, 0) + keys[e.key], true);
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      scrollToIndex(e.key === "Home" ? 0 : items().length - 1, true);
    }
  });
  state(col).select = (index) => scrollToIndex(index, true);
  state(col).refresh = () => paint();
  const list = items();
  const want = col.getAttribute("data-value");
  let start2 = want != null ? list.findIndex((it) => (it.getAttribute("data-value") || it.textContent.trim()) === want) : -1;
  if (start2 < 0) start2 = list.findIndex((it) => it.getAttribute("aria-selected") === "true");
  const place = () => {
    col.scrollTop = Math.max(0, start2) * rowH();
    paint();
    commit(false);
  };
  place();
  if (getResizeObserver()) {
    const ro = new ResizeObserver(() => {
      const idx = current < 0 ? Math.max(0, start2) : current;
      col.scrollTop = idx * rowH();
      paint();
    });
    ro.observe(col);
    onCleanup(col, () => ro.disconnect());
  }
}
var adaptive = /* @__PURE__ */ new Set();
var adaptFrame = 0;
function parseColors(str) {
  const out = [];
  const re = /rgba?\(([^)]+)\)/g;
  let m;
  while (m = re.exec(str)) {
    const p = m[1].split(/[\s,/]+/).filter(Boolean).map(parseFloat);
    out.push([p[0], p[1], p[2], p.length > 3 ? p[3] : 1]);
  }
  return out;
}
function relLuminance(r, g, b) {
  const f = (c) => {
    c /= 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function luminanceBehind(el, x, y) {
  const stack = document.elementsFromPoint(x, y);
  for (const node of stack) {
    if (el === node || el.contains(node)) continue;
    const tag = node.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "IFRAME") return null;
    const cs = getComputedStyle(node);
    if (cs.backgroundImage && cs.backgroundImage !== "none") {
      if (/url\(/.test(cs.backgroundImage)) return null;
      const stops = parseColors(cs.backgroundImage).filter((c) => c[3] > 0.2);
      if (stops.length) {
        let sum = 0;
        for (const c of stops) sum += relLuminance(c[0], c[1], c[2]);
        return sum / stops.length;
      }
    }
    const bg = parseColors(cs.backgroundColor)[0];
    if (bg && bg[3] > 0.5) return relLuminance(bg[0], bg[1], bg[2]);
  }
  return null;
}
function adapt(el) {
  const r = el.getBoundingClientRect();
  if (!r.width || r.bottom < 0 || r.top > window.innerHeight) return;
  const y = r.top + r.height / 2;
  let sum = 0;
  let n = 0;
  for (const fx of [0.2, 0.5, 0.8]) {
    const l2 = luminanceBehind(el, r.left + r.width * fx, y);
    if (l2 != null) {
      sum += l2;
      n++;
    }
  }
  if (!n) return;
  const l = sum / n;
  const dark = el.getAttribute("data-lg-appearance") === "dark";
  if (!dark && l < 0.18) el.setAttribute("data-lg-appearance", "dark");
  else if (dark && l > 0.3) el.setAttribute("data-lg-appearance", "light");
  else if (!dark && !el.hasAttribute("data-lg-appearance")) el.setAttribute("data-lg-appearance", "light");
}
function scheduleAdapt() {
  if (adaptFrame || !adaptive.size) return;
  adaptFrame = requestAnimationFrame(() => {
    adaptFrame = 0;
    adaptive.forEach((el) => el.isConnected ? adapt(el) : adaptive.delete(el));
  });
}
function refreshAdaptive() {
  scheduleAdapt();
}
function initAdaptive(el) {
  state(el).reviveAdaptive = () => {
    adaptive.add(el);
    scheduleAdapt();
  };
  if (!claim(el, "adaptive")) {
    state(el).reviveAdaptive();
    return;
  }
  adaptive.add(el);
  if (adaptive.size === 1) {
    window.addEventListener("scroll", scheduleAdapt, { passive: true, capture: true });
    window.addEventListener("resize", scheduleAdapt, { passive: true });
  }
  onCleanup(el, () => {
    adaptive.delete(el);
    el.removeAttribute("data-lg-appearance");
  });
  scheduleAdapt();
}
var MINUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';
var PLUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5v14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';
function initStepper(el) {
  if (!claim(el, "stepper")) return;
  if (el.hasAttribute("data-lg-controlled")) return;
  const min = numAttr(el, "data-min", -Infinity);
  const max = numAttr(el, "data-max", Infinity);
  const step = numAttr(el, "data-step", 1);
  let value = numAttr(el, "data-value", 0);
  const output = $(el.getAttribute("data-lg-output"));
  if (!el.querySelector("button")) {
    el.innerHTML = '<button type="button" aria-label="Decrement" data-lg-step="-1">' + MINUS + '</button><span class="lg-stepper-divider" aria-hidden="true"></span><button type="button" aria-label="Increment" data-lg-step="1">' + PLUS + "</button>";
  }
  const buttons = $$("button", el);
  const render = () => {
    buttons[0].disabled = value <= min;
    buttons[buttons.length - 1].disabled = value >= max;
    el.setAttribute("data-value", String(value));
    if (output) output.textContent = String(value);
  };
  listen(el, el, "click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    const dir = parseFloat(b.getAttribute("data-lg-step")) || (b === buttons[0] ? -1 : 1);
    const next = clamp(Math.round((value + dir * step) * 1e6) / 1e6, min, max);
    if (next === value) return;
    value = next;
    render();
    emit(el, "lg-change", { value });
  });
  render();
}
function initPageControl(el) {
  if (!claim(el, "pages")) return;
  if (el.hasAttribute("data-lg-controlled")) return;
  const count = numAttr(el, "data-count", 0);
  if (count && !el.querySelector("button")) {
    for (let i = 0; i < count; i++) el.appendChild(create("button", null, { type: "button", "aria-label": "Page " + (i + 1) }));
  }
  const dots = $$("button", el);
  const select2 = (index, fromUser) => {
    dots.forEach((d, i) => i === index ? d.setAttribute("aria-current", "true") : d.removeAttribute("aria-current"));
    el.setAttribute("data-index", String(index));
    if (fromUser) emit(el, "lg-change", { index });
  };
  state(el).select = select2;
  select2(numAttr(el, "data-index", 0), false);
  listen(el, el, "click", (e) => {
    const b = e.target.closest("button");
    if (b) select2(dots.indexOf(b), true);
  });
}
var iconGeneration = 0;
function registerIcons(map) {
  addIcons(map);
  iconGeneration++;
  if (isBrowser()) for (const el of $$("[data-lg-icon]")) initIcon(el);
}
function initIcon(el) {
  const name = el.getAttribute("data-lg-icon");
  if (el.__lgIcon === name && el.__lgIconGen === iconGeneration) return;
  el.__lgIcon = name;
  el.__lgIconGen = iconGeneration;
  el.innerHTML = icon(name, {
    size: numAttr(el, "data-size", 24),
    strokeWidth: numAttr(el, "data-stroke", 1.9),
    label: el.getAttribute("data-label") || void 0
  });
}
function initSpinner(el) {
  if (!claim(el, "spinner") || el.children.length) return;
  for (let i = 0; i < 8; i++) inject(el, document.createElement("i"));
  if (!el.hasAttribute("role")) el.setAttribute("role", "progressbar");
  if (!el.hasAttribute("aria-label")) el.setAttribute("aria-label", "Loading");
}
var canPopover = () => typeof HTMLElement !== "undefined" && typeof HTMLElement.prototype.showPopover === "function";
function lift(el) {
  const s = state(el);
  if (s.lifted) lower(el);
  if (canPopover()) {
    if (!el.hasAttribute("popover")) {
      el.setAttribute("popover", "manual");
      s.ownPopover = true;
    }
    try {
      el.showPopover();
      s.lifted = "popover";
      return;
    } catch (_) {
      if (s.ownPopover) el.removeAttribute("popover");
      s.ownPopover = false;
    }
  }
  if (el.parentNode !== document.body) {
    s.home = { parent: el.parentNode, next: el.nextSibling };
    document.body.appendChild(el);
  }
  s.lifted = "body";
}
function lower(el) {
  const s = state(el);
  const how = s.lifted;
  s.lifted = null;
  if (how === "popover") {
    try {
      if (el.matches(":popover-open")) el.hidePopover();
    } catch (_) {
    }
    if (s.ownPopover) el.removeAttribute("popover");
    s.ownPopover = false;
  } else if (how === "body" && s.home) {
    const { parent, next } = s.home;
    s.home = null;
    if (parent.isConnected && el.parentNode === document.body) parent.insertBefore(el, next && next.parentNode === parent ? next : null);
  }
}
var openPanel = null;
function placePanel(panel, anchor, placement, point) {
  const margin = 8;
  const gap = 8;
  const ar = anchor ? anchor.getBoundingClientRect() : { left: point.x, right: point.x, top: point.y, bottom: point.y, width: 0, height: 0 };
  const vw = document.documentElement.clientWidth;
  const vh = window.innerHeight;
  panel.style.left = "0px";
  panel.style.top = "0px";
  const pw = panel.offsetWidth;
  const ph = panel.offsetHeight;
  const g = anchor ? gap : 2;
  const below = placement !== "top" && (ar.bottom + g + ph <= vh - margin || ar.top - g - ph < margin);
  const top = clamp(below ? ar.bottom + g : ar.top - g - ph, margin, Math.max(margin, vh - ph - margin));
  const alignEnd = ar.left + pw > vw - margin && ar.right - pw >= margin;
  const left = clamp(alignEnd ? ar.right - pw : ar.left, margin, Math.max(margin, vw - pw - margin));
  panel.style.left = Math.round(left) + "px";
  panel.style.top = Math.round(top) + "px";
  const ox = clamp(ar.left + ar.width / 2 - left, 0, pw);
  panel.style.setProperty("--lg-origin", ox + "px " + (below ? 0 : ph) + "px");
}
function openPopover(panel, anchor, options = {}) {
  panel = $(panel);
  anchor = $(anchor);
  if (!panel) return;
  if (openPanel && openPanel.panel === panel) {
    closePopover();
    return;
  }
  closePopover(true);
  panel.classList.add("lg-glass");
  panel.classList.remove("is-closing", "is-open");
  panel.hidden = false;
  lift(panel);
  refract(panel);
  placePanel(panel, anchor, options.placement || anchor && anchor.getAttribute("data-lg-placement"), { x: options.x || 0, y: options.y || 0 });
  if (anchor) anchor.setAttribute("aria-expanded", "true");
  const s = { panel, anchor };
  openPanel = s;
  s.onDown = (e) => {
    if (panel.contains(e.target) || anchor && anchor.contains(e.target)) return;
    closePopover();
  };
  s.onKey = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closePopover();
      if (anchor) anchor.focus();
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Home" || e.key === "End") {
      const items = $$('.lg-menu-item:not(:disabled):not([aria-disabled="true"])', panel);
      if (!items.length) return;
      e.preventDefault();
      let i = items.indexOf(document.activeElement);
      if (e.key === "Home") i = 0;
      else if (e.key === "End") i = items.length - 1;
      else i = e.key === "ArrowDown" ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
      items[i].focus();
    }
  };
  s.onResize = () => closePopover(true);
  document.addEventListener("pointerdown", s.onDown, true);
  document.addEventListener("keydown", s.onKey);
  window.addEventListener("resize", s.onResize);
  reveal(panel, () => {
    panel.classList.add("is-open");
    if (panel.classList.contains("lg-menu") && options.focus !== false) {
      const first = panel.querySelector(".lg-menu-item:not(:disabled)");
      if (first) first.focus({ preventScroll: true });
    }
  });
  emit(panel, "lg-open", { anchor });
}
function closePopover(immediate, panel) {
  const s = openPanel;
  if (!s || panel && $(panel) !== s.panel) return;
  openPanel = null;
  const el = s.panel;
  document.removeEventListener("pointerdown", s.onDown, true);
  document.removeEventListener("keydown", s.onKey);
  window.removeEventListener("resize", s.onResize);
  if (s.anchor) s.anchor.setAttribute("aria-expanded", "false");
  el.classList.remove("is-open");
  const hide = () => {
    el.classList.remove("is-closing");
    el.hidden = true;
    lower(el);
  };
  if (immediate === true) {
    hide();
  } else {
    el.classList.add("is-closing");
    setTimeout(() => {
      if (!(openPanel && openPanel.panel === el)) hide();
    }, 220);
  }
  emit(el, "lg-close", {});
}
function onMenuItemClick(e) {
  const item = e.target.closest(".lg-menu-item, [data-lg-dismiss]");
  if (!item) return;
  const panel = item.closest(".lg-menu, .lg-popover");
  if (!panel) return;
  if (item.matches("[data-lg-dismiss]") && !item.matches(".lg-menu-item")) {
    closePopover();
    return;
  }
  if (item.disabled || item.getAttribute("aria-disabled") === "true") return;
  if (item.getAttribute("role") === "menuitemcheckbox") {
    item.setAttribute("aria-checked", item.getAttribute("aria-checked") === "true" ? "false" : "true");
  }
  emit(panel, "lg-select", { item, value: item.getAttribute("data-value") || item.textContent.trim() });
  if (!item.hasAttribute("data-lg-keep-open")) closePopover();
}
function menu(anchor, items, options = {}) {
  const panel = create("div", "lg-menu lg-glass", { role: "menu" });
  panel.hidden = true;
  for (const it of items || []) {
    if (it === "-" || it.separator) {
      panel.appendChild(create("div", "lg-menu-separator", { role: "separator" }));
      continue;
    }
    if (it.title) {
      const t = create("div", "lg-menu-title");
      t.textContent = it.title;
      panel.appendChild(t);
      continue;
    }
    const b = create("button", "lg-menu-item" + (it.destructive ? " lg-menu-item--destructive" : ""), {
      type: "button",
      role: it.checked != null ? "menuitemcheckbox" : "menuitem",
      "aria-checked": it.checked != null ? String(!!it.checked) : null,
      "data-value": it.value != null ? String(it.value) : null
    });
    if (it.disabled) b.disabled = true;
    if (it.icon) b.insertAdjacentHTML("beforeend", it.icon);
    const s = document.createElement("span");
    s.textContent = it.label;
    b.appendChild(s);
    if (it.shortcut) {
      const k = create("span", "lg-menu-shortcut");
      k.textContent = it.shortcut;
      b.appendChild(k);
    }
    panel.appendChild(b);
  }
  document.body.appendChild(panel);
  return new Promise((resolve) => {
    let done = false;
    panel.addEventListener("lg-select", (e) => {
      done = true;
      resolve(e.detail.value);
    });
    panel.addEventListener("lg-close", () => {
      setTimeout(() => {
        if (!done) resolve(null);
        unrefract(panel);
        panel.remove();
      }, 260);
    });
    const isPoint = anchor && typeof anchor === "object" && "x" in anchor && !(anchor instanceof Element);
    openPopover(panel, isPoint ? null : anchor, isPoint ? { ...options, x: anchor.x, y: anchor.y } : options);
  });
}
var modalStack = [];
function trapFocus(container, e) {
  if (e.key !== "Tab") return;
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
  const ov = create("div", "lg-overlay" + (className ? " " + className : ""), { "aria-hidden": "true" });
  (parent || document.body).appendChild(ov);
  if (!parent) lift(ov);
  reveal(ov, () => ov.classList.add("is-open"));
  return ov;
}
function removeOverlay(ov) {
  if (!ov) return;
  ov.classList.remove("is-open");
  setTimeout(() => ov.remove(), 320);
}
function buildActions(actions, cancelClass, onPick) {
  return actions.map((a, i) => {
    let cls = "lg-alert-button";
    if (a.prominent || a.style === "prominent") cls += " lg-alert-button--prominent";
    if (a.role === "destructive" || a.destructive) cls += " lg-alert-button--destructive";
    if (a.role === "cancel" && cancelClass) cls += " " + cancelClass;
    const b = create("button", cls, { type: "button" });
    b.textContent = a.label;
    b.addEventListener("click", () => onPick(a, i));
    return b;
  });
}
var resultOf = (a) => a ? a.value != null ? a.value : a.label : null;
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
    document.removeEventListener("keydown", onKey);
    box.classList.remove("is-open");
    box.classList.add("is-closing");
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
    if (e.key === "Escape" && cancelAction) {
      e.preventDefault();
      close(resultOf(cancelAction));
    }
    trapFocus(box, e);
  };
  document.addEventListener("keydown", onKey);
  document.body.appendChild(box);
  lift(box);
  refract(box);
  reveal(box, () => {
    box.classList.add("is-open");
    const target = box.querySelector("input, textarea") || box.querySelector(".lg-alert-button--prominent") || box.querySelector(".lg-alert-button");
    if (target) target.focus({ preventScroll: true });
  });
  return close;
}
function alert(options) {
  if (!isBrowser()) return Promise.resolve(null);
  if (typeof options === "string") options = { title: options };
  options = options || {};
  const actions = options.actions && options.actions.length ? options.actions : [{ label: "OK", prominent: true }];
  return new Promise((resolve) => {
    const overlay = makeOverlay();
    const box = create("div", "lg-alert lg-glass", { role: "alertdialog", "aria-modal": "true" });
    const id = "lg-alert-" + ++uid;
    if (options.title) {
      const h = create("h2", "lg-alert-title", { id: id + "-t" });
      h.textContent = options.title;
      box.appendChild(h);
      box.setAttribute("aria-labelledby", id + "-t");
    }
    if (options.message) {
      const p = create("p", "lg-alert-message", { id: id + "-m" });
      p.textContent = options.message;
      box.appendChild(p);
      box.setAttribute("aria-describedby", id + "-m");
    }
    let field = null;
    if (options.input) {
      const wrap = create("div", "lg-alert-content");
      field = create("input", "lg-textfield", {
        type: options.input.type || "text",
        placeholder: options.input.placeholder || "",
        "aria-label": options.input.label || options.title || "Input"
      });
      field.value = options.input.value || "";
      wrap.appendChild(field);
      box.appendChild(wrap);
    }
    if (options.content) {
      const c = create("div", "lg-alert-content");
      if (typeof options.content === "string") c.innerHTML = options.content;
      else c.appendChild(options.content);
      box.appendChild(c);
    }
    const row = create("div", "lg-alert-actions" + (actions.length > 2 || options.stacked ? " lg-alert-actions--stacked" : ""));
    let close;
    buildActions(actions, "", (a) => close(resultOf(a))).forEach((b) => row.appendChild(b));
    box.appendChild(row);
    const cancel = actions.find((a) => a.role === "cancel");
    const getResult = field ? (action) => ({ action, value: field.value }) : null;
    close = presentModal(box, overlay, cancel || (actions.length === 1 ? actions[0] : null), resolve, getResult);
    if (field) {
      field.addEventListener("keydown", (e) => {
        if (e.key !== "Enter" || e.isComposing || e.keyCode === 229) return;
        e.preventDefault();
        const primary = actions.find((a) => a.prominent || a.style === "prominent") || actions.filter((a) => a.role !== "cancel").pop() || actions[actions.length - 1];
        close(resultOf(primary));
      });
    }
    if (options.dismissOnOverlay && cancel) overlay.addEventListener("click", () => close(resultOf(cancel)));
  });
}
function actionSheet(options) {
  if (!isBrowser()) return Promise.resolve(null);
  options = options || {};
  const actions = options.actions || [];
  return new Promise((resolve) => {
    const overlay = makeOverlay();
    const box = create("div", "lg-action-sheet lg-glass", { role: "dialog", "aria-modal": "true" });
    if (options.title) {
      const h = create("p", "lg-action-sheet-title");
      h.textContent = options.title;
      box.appendChild(h);
    }
    if (options.message) {
      const m = create("p", "lg-action-sheet-message");
      m.textContent = options.message;
      box.appendChild(m);
    }
    const cancel = actions.find((a) => a.role === "cancel");
    const rest = actions.filter((a) => a !== cancel);
    if (cancel) rest.push(cancel);
    let close;
    buildActions(rest, "lg-action-sheet-cancel", (a) => close(resultOf(a))).forEach((b) => box.appendChild(b));
    close = presentModal(box, overlay, cancel || { label: null }, resolve);
    overlay.addEventListener("click", () => close(resultOf(cancel)));
  });
}
var sheetStack = [];
var Sheet = class {
  constructor(el) {
    this.el = el;
    this.overlay = null;
    this.detent = null;
    this.contained = el.classList.contains("lg-sheet--contained");
    el.classList.add("lg-glass");
    if (!el.hasAttribute("role")) el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.addEventListener("click", (e) => {
      if (e.target.closest("[data-lg-dismiss]")) this.close();
    });
    for (const g of $$(".lg-sheet-grabber, .lg-sheet-header", el)) {
      g.addEventListener("pointerdown", (e) => {
        if (e.target.closest("button, a, input, select, textarea")) return;
        this._dragStart(e, g);
      });
    }
    const grabber = el.querySelector(".lg-sheet-grabber");
    if (grabber) {
      grabber.setAttribute("role", "button");
      grabber.setAttribute("tabindex", "0");
      grabber.setAttribute("aria-label", "Resize sheet");
      const cycle = () => {
        if (this._justDragged) return;
        const list = this.detents();
        this.setDetent(list[(list.indexOf(this.detent) + 1) % list.length]);
      };
      grabber.addEventListener("click", cycle);
      grabber.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          cycle();
        }
      });
    }
  }
  get isOpen() {
    return this.el.classList.contains("is-open");
  }
  containerHeight() {
    if (this.contained && this.el.offsetParent) return this.el.offsetParent.clientHeight;
    return window.innerHeight;
  }
  detents() {
    return (this.el.getAttribute("data-lg-detents") || "medium large").split(/[\s,]+/).filter(Boolean);
  }
  heightFor(detent) {
    const H = this.containerHeight();
    if (detent === "large") return H - (this.contained ? 54 : Math.min(54, H * 0.06));
    if (detent === "medium") return Math.round(H * 0.5);
    if (/%$/.test(detent)) return Math.round(parseFloat(detent) / 100 * H);
    return Math.min(parseFloat(detent) || H * 0.5, H);
  }
  setDetent(detent) {
    const list = this.detents();
    if (list.indexOf(detent) < 0) detent = list[0];
    this.detent = detent;
    const large = detent === "large";
    this.el.style.setProperty("--_h", this.heightFor(detent) + "px");
    this.el.classList.toggle("is-large", large);
    this.el.classList.toggle("is-inset", !large);
    emit(this.el, "lg-detent", { detent });
    return this;
  }
  open(detent) {
    const el = this.el;
    if (this.isOpen) {
      if (detent) this.setDetent(detent);
      return this;
    }
    this.prevFocus = document.activeElement;
    clearTimeout(this._hideTimer);
    if (this.contained) {
      this.overlay = makeOverlay(el.parentNode, "lg-overlay--sheet");
      this.overlay.style.position = "absolute";
      this.overlay.style.zIndex = "999";
      el.parentNode.insertBefore(this.overlay, el);
      el.hidden = false;
    } else {
      lower(el);
      this.overlay = makeOverlay(null, "lg-overlay--sheet");
      el.hidden = false;
      lift(el);
    }
    this.overlay.addEventListener("click", () => this.close());
    this.setDetent(detent || this.detents()[0]);
    refract(el);
    sheetStack.push(this);
    this._onKey = (e) => {
      if (sheetStack[sheetStack.length - 1] !== this || modalStack.length || openPanel) return;
      if (e.key === "Escape") {
        if (e.defaultPrevented) return;
        e.preventDefault();
        this.close();
      } else trapFocus(el, e);
    };
    document.addEventListener("keydown", this._onKey);
    reveal(el, () => {
      el.classList.add("is-open");
      const f = el.querySelector("[autofocus]") || el.querySelector(".lg-sheet-grabber");
      if (f) f.focus({ preventScroll: true });
    });
    emit(el, "lg-open", {});
    return this;
  }
  close() {
    const el = this.el;
    if (!this.isOpen) return this;
    el.classList.remove("is-open");
    removeOverlay(this.overlay);
    this.overlay = null;
    document.removeEventListener("keydown", this._onKey);
    const i = sheetStack.indexOf(this);
    if (i > -1) sheetStack.splice(i, 1);
    this._hideTimer = setTimeout(() => {
      if (this.isOpen) return;
      el.hidden = true;
      if (!this.contained) lower(el);
    }, 450);
    if (this.prevFocus && this.prevFocus.focus) this.prevFocus.focus({ preventScroll: true });
    emit(el, "lg-close", {});
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
    const maxH = this.heightFor("large");
    let lastY = startY;
    let lastT = performance.now();
    let v = 0;
    let moved = false;
    try {
      handle.setPointerCapture(e.pointerId);
    } catch (_) {
    }
    const move = (ev) => {
      const dy = ev.clientY - startY;
      if (!moved && Math.abs(dy) < 3) return;
      if (!moved) {
        moved = true;
        el.classList.add("is-dragging");
      }
      const now = performance.now();
      v = (ev.clientY - lastY) / Math.max(1, now - lastT);
      lastY = ev.clientY;
      lastT = now;
      let h = startH - dy;
      if (h > maxH) h = maxH + (h - maxH) * 0.15;
      el.style.setProperty("--_h", Math.max(0, h) + "px");
    };
    const up = () => {
      handle.removeEventListener("pointermove", move);
      handle.removeEventListener("pointerup", up);
      handle.removeEventListener("pointercancel", up);
      el.classList.remove("is-dragging");
      if (!moved) return;
      this._justDragged = true;
      setTimeout(() => this._justDragged = false, 60);
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
    handle.addEventListener("pointermove", move);
    handle.addEventListener("pointerup", up);
    handle.addEventListener("pointercancel", up);
  }
};
function sheet(target) {
  const el = $(target);
  if (!el) return null;
  if (!el.__lgSheet) el.__lgSheet = new Sheet(el);
  return el.__lgSheet;
}
var toastHost = null;
function toast(options) {
  if (!isBrowser()) return { close() {
  }, element: null };
  if (typeof options === "string") options = { title: options };
  options = options || {};
  if (!toastHost || !toastHost.isConnected) {
    toastHost = create("div", "lg-toasts", { role: "status", "aria-live": "polite" });
    document.body.appendChild(toastHost);
  }
  const t = create("div", "lg-toast lg-glass");
  if (options.icon) {
    const ic = create("div", "lg-toast-icon");
    if (options.iconBackground) ic.style.setProperty("--lg-toast-icon-bg", options.iconBackground);
    ic.innerHTML = options.icon;
    t.appendChild(ic);
  }
  const body = create("div", "lg-toast-body");
  const title = create("div", "lg-toast-title");
  const ts = document.createElement("span");
  ts.textContent = options.title || "";
  title.appendChild(ts);
  if (options.time) {
    const tm = create("span", "lg-toast-time");
    tm.textContent = options.time;
    title.appendChild(tm);
  }
  body.appendChild(title);
  if (options.message) {
    const msg = create("div", "lg-toast-message");
    msg.textContent = options.message;
    body.appendChild(msg);
  }
  t.appendChild(body);
  toastHost.insertBefore(t, toastHost.firstChild);
  lift(toastHost);
  refract(t);
  reveal(t, () => t.classList.add("is-open"));
  let timer = 0;
  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;
    clearTimeout(timer);
    t.classList.remove("is-open");
    t.classList.add("is-closing");
    setTimeout(() => {
      unrefract(t);
      t.remove();
    }, 320);
  };
  const duration = options.duration == null ? 4e3 : options.duration;
  if (duration > 0) timer = setTimeout(close, duration);
  t.addEventListener("pointerdown", (e) => {
    const y0 = e.clientY;
    let moved = false;
    try {
      t.setPointerCapture(e.pointerId);
    } catch (_) {
    }
    const move = (ev) => {
      const dy = ev.clientY - y0;
      if (Math.abs(dy) > 3) moved = true;
      t.classList.add("is-dragging");
      t.style.setProperty("--_dy", (dy < 0 ? dy : dy * 0.2) + "px");
    };
    const up = (ev) => {
      t.removeEventListener("pointermove", move);
      t.removeEventListener("pointerup", up);
      t.removeEventListener("pointercancel", up);
      t.classList.remove("is-dragging");
      t.style.removeProperty("--_dy");
      if (ev.clientY - y0 < -24) close();
      else if (!moved && options.onClick) options.onClick();
    };
    t.addEventListener("pointermove", move);
    t.addEventListener("pointerup", up);
    t.addEventListener("pointercancel", up);
  });
  return { close, element: t };
}
var tooltipEl = null;
var tooltipTimer = 0;
var tooltipTarget = null;
function describe(el, on) {
  const ids = (el.getAttribute("aria-describedby") || "").split(/\s+/).filter((x) => x && x !== "lg-tooltip");
  if (on) ids.push("lg-tooltip");
  if (ids.length) el.setAttribute("aria-describedby", ids.join(" "));
  else el.removeAttribute("aria-describedby");
}
function hideTooltip() {
  clearTimeout(tooltipTimer);
  if (tooltipTarget) describe(tooltipTarget, false);
  tooltipTarget = null;
  if (tooltipEl) tooltipEl.classList.remove("is-open");
}
function showTooltip(t, delay) {
  hideTooltip();
  tooltipTarget = t;
  tooltipTimer = setTimeout(() => {
    if (tooltipTarget !== t || !t.isConnected) return;
    if (!tooltipEl || !tooltipEl.isConnected) {
      tooltipEl = create("div", "lg-tooltip", { role: "tooltip", id: "lg-tooltip" });
      document.body.appendChild(tooltipEl);
    }
    tooltipEl.textContent = t.getAttribute("data-lg-tooltip");
    describe(t, true);
    lift(tooltipEl);
    const r = t.getBoundingClientRect();
    tooltipEl.style.left = "0px";
    tooltipEl.style.top = "0px";
    const w = tooltipEl.offsetWidth;
    const h = tooltipEl.offsetHeight;
    const vw = document.documentElement.clientWidth;
    const below = r.bottom + 8 + h < window.innerHeight;
    tooltipEl.style.left = Math.round(clamp(r.left + r.width / 2 - w / 2, 8, vw - w - 8)) + "px";
    tooltipEl.style.top = Math.round(below ? r.bottom + 8 : r.top - h - 8) + "px";
    reveal(tooltipEl, () => tooltipEl.classList.add("is-open", "was-open"));
  }, delay);
}
function onTooltipOver(e) {
  if (e.pointerType === "touch" || e.buttons) return;
  const t = e.target.closest && e.target.closest("[data-lg-tooltip]");
  if (!t || t === tooltipTarget) return;
  showTooltip(t, tooltipEl && tooltipEl.classList.contains("was-open") ? 80 : 650);
}
function onTooltipOut(e) {
  const t = tooltipTarget;
  if (!t || e.relatedTarget && t.contains(e.relatedTarget)) return;
  hideTooltip();
  setTimeout(() => {
    if (!tooltipTarget && tooltipEl) tooltipEl.classList.remove("was-open");
  }, 400);
}
function onTooltipFocus(e) {
  const t = e.target;
  if (!t.hasAttribute || !t.hasAttribute("data-lg-tooltip") || t === tooltipTarget) return;
  let visible = true;
  try {
    visible = t.matches(":focus-visible");
  } catch (_) {
  }
  if (visible) showTooltip(t, 300);
}
function onTooltipBlur(e) {
  if (e.target === tooltipTarget) hideTooltip();
}
function onTooltipKey(e) {
  if (e.key === "Escape" && tooltipTarget && tooltipEl && tooltipEl.classList.contains("is-open")) hideTooltip();
}
function onDocumentClick(e) {
  const toggle = e.target.closest("[data-lg-toggle]");
  if (toggle && !toggle.disabled) {
    const on = toggle.getAttribute("aria-pressed") !== "true";
    toggle.setAttribute("aria-pressed", String(on));
    emit(toggle, "lg-change", { pressed: on });
  }
  const t = e.target.closest("[data-lg-menu], [data-lg-popover], [data-lg-sheet], [data-lg-alert]");
  if (!t) {
    onMenuItemClick(e);
    return;
  }
  if (t.hasAttribute("data-lg-menu") || t.hasAttribute("data-lg-popover")) {
    e.preventDefault();
    const target = $(t.getAttribute("data-lg-menu") || t.getAttribute("data-lg-popover"));
    if (target) openPopover(target, t);
  } else if (t.hasAttribute("data-lg-sheet")) {
    e.preventDefault();
    const s = sheet(t.getAttribute("data-lg-sheet"));
    if (s) s.open(t.getAttribute("data-lg-detent") || void 0);
  } else if (t.hasAttribute("data-lg-alert")) {
    e.preventDefault();
    alert({ title: t.getAttribute("data-lg-alert"), message: t.getAttribute("data-lg-message") });
  }
}
var longPress = null;
function onContextMenu(e) {
  const t = e.target.closest("[data-lg-context-menu]");
  if (!t) return;
  const panel = $(t.getAttribute("data-lg-context-menu"));
  if (!panel) return;
  e.preventDefault();
  if (openPanel && openPanel.panel === panel) return;
  openPopover(panel, null, { x: e.clientX, y: e.clientY });
}
function onLongPressStart(e) {
  if (e.pointerType !== "touch") return;
  const t = e.target.closest("[data-lg-context-menu]");
  if (!t) return;
  const x = e.clientX;
  const y = e.clientY;
  clearTimeout(longPress);
  longPress = setTimeout(() => {
    const panel = $(t.getAttribute("data-lg-context-menu"));
    if (panel) openPopover(panel, null, { x, y });
  }, 480);
  const cancel = () => {
    clearTimeout(longPress);
    document.removeEventListener("pointerup", cancel);
    document.removeEventListener("pointercancel", cancel);
    document.removeEventListener("pointermove", onMove);
  };
  const onMove = (ev) => {
    if (Math.hypot(ev.clientX - x, ev.clientY - y) > 8) cancel();
  };
  document.addEventListener("pointerup", cancel);
  document.addEventListener("pointercancel", cancel);
  document.addEventListener("pointermove", onMove, { passive: true });
}
var GLASS_SELECTOR = ".lg-glass, .lg-glass-surface, .lg-button, [data-lg-refract]";
var NO_GLASS_BUTTON = /(^|\s)lg-button--(bordered|filled|plain)(\s|$)/;
var COMPONENTS = [
  [".lg-switch", initSwitch],
  [".lg-slider", initSlider],
  [".lg-segmented", initSegmented],
  [".lg-tabbar", initTabbar],
  [".lg-navbar", initNavbar],
  [".lg-stepper", initStepper],
  [".lg-page-control", initPageControl],
  [".lg-spinner", initSpinner],
  ["[data-lg-icon]", initIcon],
  ["[data-lg-adaptive]", initAdaptive],
  [".lg-picker-column", initPickerColumn]
];
function initGlass(el) {
  if (el.classList.contains("lg-button")) {
    if (NO_GLASS_BUTTON.test(el.className)) return;
    if (el.parentElement && el.parentElement.classList.contains("lg-group")) return;
  }
  if (el.hidden) return;
  refract(el);
}
function init(root) {
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
function enhance(el) {
  el = $(el);
  if (!el || !isBrowser()) return () => {
  };
  init(el);
  return () => destroy(el);
}
function destroy(root) {
  if (!isBrowser()) return;
  root = $(root);
  if (!root) return;
  const nodes = [root, ...$$("*", root)];
  for (const n of nodes) {
    if (tracked.has(n)) unrefract(n);
    const s = n.__lg;
    if (!s) continue;
    for (const fn of s.cleanups.splice(0)) {
      try {
        fn();
      } catch (_) {
      }
    }
    for (const node of s.injected.splice(0)) node.remove();
    s.flags = {};
  }
}
function select(el, index) {
  el = $(el);
  const s = el && el.__lg;
  if (s && s.select) s.select(index, false);
}
function refresh(el) {
  el = $(el);
  const s = el && el.__lg;
  if (s && s.refresh) s.refresh();
  if (s && s.sync) s.sync();
}
function setTheme(theme, root) {
  if (!isBrowser()) return;
  const el = $(root) || document.documentElement;
  if (theme === "light" || theme === "dark") el.setAttribute("data-lg-theme", theme);
  else el.removeAttribute("data-lg-theme");
}
var started = false;
var mutationObserver = null;
function start(options) {
  if (!isBrowser()) return stop;
  if (options) configure(options);
  if (started) return stop;
  started = true;
  const go = () => {
    if (!started) return;
    document.documentElement.classList.add(supportsRefraction() ? "lg-has-refraction" : "lg-no-refraction");
    document.addEventListener("pointerdown", onPressStart, { passive: true });
    document.addEventListener("pointerdown", onLongPressStart, { passive: true });
    document.addEventListener("click", onDocumentClick);
    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("pointerover", onTooltipOver, { passive: true });
    document.addEventListener("pointerout", onTooltipOut, { passive: true });
    document.addEventListener("focusin", onTooltipFocus);
    document.addEventListener("focusout", onTooltipBlur);
    document.addEventListener("keydown", onTooltipKey);
    document.addEventListener("pointerdown", hideTooltip, { passive: true, capture: true });
    window.addEventListener("scroll", hideTooltip, { passive: true, capture: true });
    if (config.dynamicLight) document.addEventListener("pointermove", onLightMove, { passive: true });
    init(document);
    if (config.observe && typeof MutationObserver !== "undefined") {
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
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", go, { once: true });
  else go();
  return stop;
}
function stop() {
  if (!started || !isBrowser()) return;
  started = false;
  document.removeEventListener("pointerdown", onPressStart);
  document.removeEventListener("pointerdown", onLongPressStart);
  document.removeEventListener("click", onDocumentClick);
  document.removeEventListener("contextmenu", onContextMenu);
  document.removeEventListener("pointerover", onTooltipOver);
  document.removeEventListener("pointerout", onTooltipOut);
  document.removeEventListener("focusin", onTooltipFocus);
  document.removeEventListener("focusout", onTooltipBlur);
  document.removeEventListener("keydown", onTooltipKey);
  document.removeEventListener("pointerdown", hideTooltip, true);
  window.removeEventListener("scroll", hideTooltip, true);
  hideTooltip();
  document.removeEventListener("pointermove", onLightMove);
  if (mutationObserver) mutationObserver.disconnect();
  mutationObserver = null;
}
function isStarted() {
  return started;
}
