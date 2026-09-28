# Component reference

Every component works three ways:

- **HTML** with the classes below plus `dist/liquid-glass.js` (or `start()` from the ES module);
- **React** from `liquid-glass-kit/react` (client components, Next.js ready);
- **any framework** (Vue, Svelte, Astro, Angular): render the HTML markup and call `start()` once.

Colors accept a system color name (`red`, `orange`, `yellow`, `green`, `mint`, `teal`, `cyan`, `blue`, `indigo`, `purple`, `pink`, `brown`, `gray`) or any CSS color wherever a `tint` is mentioned.

Icons use SF Symbols names (`magnifyingglass`, `chevron.left`, `square.and.arrow.up`, …); see [Icons](#icons).

---

## Materials

### Liquid Glass surface

```html
<div class="lg-glass">Regular</div>
<div class="lg-glass lg-glass--clear">Clear</div>
<div class="lg-glass lg-glass--clear lg-glass--dimmed">Clear over bright content (HIG 35% dimming)</div>
<div class="lg-glass lg-glass--tinted" style="--lg-tint: var(--lg-purple)">Tinted</div>
<div class="lg-glass lg-glass--prominent">Prominent (accent colored)</div>
<div class="lg-glass lg-glass--thick">More opaque</div>
<div class="lg-glass lg-glass--capsule">Capsule</div>
<div class="lg-glass lg-glass--interactive">Lights up and swells when pressed</div>
<div class="lg-glass" data-lg-adaptive>Light/dark with the content underneath</div>
```

```tsx
<Glass variant="clear" shape="capsule" interactive adaptive tint="indigo" bezel={20} magnify={1.2}>…</Glass>
```

| Attribute | Meaning |
| --- | --- |
| `data-lg-bezel="20"` | Width of the refracting rim in px (default: 30% of the short side, 6–28) |
| `data-lg-depth="0.45"` | Rim bend strength, 0–0.5 |
| `data-lg-magnify="1.2"` | Uniform lens magnification |
| `data-lg-refraction="off"` | Blur only, no refraction |
| `data-lg-adaptive` | Switch light/dark appearance with the content underneath |

CSS variables: `--lg-glass-blur`, `--lg-glass-fill`, `--lg-glass-saturate`, `--lg-glass-brightness`, `--lg-glass-shadow`, `--lg-light-angle`, `--lg-tint`.

### Standard materials (content layer)

`.lg-material-ultrathin`, `.lg-material-thin`, `.lg-material-regular`, `.lg-material-thick`, `.lg-material-chrome`, and `.lg-card` for a solid content card (`<Card>`).

### Scroll edge effect

```html
<div class="lg-scroll-edge"></div>            <!-- top of a scroll container -->
<div class="lg-scroll-edge lg-scroll-edge--bottom"></div>
```

---

## Buttons

```html
<button class="lg-button">Glass</button>
<button class="lg-button lg-button--prominent">Done</button>
<button class="lg-button lg-button--clear">Over media</button>
<button class="lg-button lg-button--bordered">Bordered</button>
<button class="lg-button lg-button--filled">Filled</button>
<button class="lg-button lg-button--plain">Plain</button>
<button class="lg-button lg-button--destructive lg-button--bordered">Delete</button>
<button class="lg-button lg-button--icon" aria-label="Share"><span data-lg-icon="square.and.arrow.up"></span></button>
<button class="lg-button" aria-busy="true">Saving</button>
<button class="lg-button" data-lg-toggle aria-pressed="false">Favorites</button>
```

Sizes (HIG): `--mini` 28 · `--small` 32 · regular 44 · `--large` 52 · `--xl` 64. Shapes: capsule (default), `--icon` (circle), `--rounded`. `--block` for full width. Tint: `style="--lg-tint: var(--lg-green)"`.

```tsx
<Button variant="prominent" size="large" tint="green" icon={<Icon name="checkmark" />}>Done</Button>
<Button shape="circle" icon={<Icon name="chevron.left" />} aria-label="Back" />
<ToggleButton pressed={on} onPressedChange={setOn}>Favorites</ToggleButton>
```

### Button group (one glass surface)

```html
<div class="lg-group lg-glass" role="group" aria-label="Edit">
  <button class="lg-button lg-button--icon" aria-label="Like"><span data-lg-icon="heart"></span></button>
  <button>Edit</button>
</div>
```

`<ButtonGroup height={36}>…</ButtonGroup>`. Height via `--lg-group-height`.

---

## Controls

### Switch

```html
<label class="lg-switch"><input type="checkbox" checked aria-label="Wi-Fi"></label>
<label class="lg-switch lg-switch--small" style="--lg-switch-tint: var(--lg-indigo)"><input type="checkbox"></label>
```

`<Switch checked={on} onCheckedChange={setOn} label="Wi-Fi" tint="indigo" size="small" />`. The thumb turns into a glass lens while held and can be dragged. Fires the native `change` event.

### Slider

```html
<div class="lg-slider" data-lg-ticks="5">
  <span data-lg-icon="speaker.slash"></span>
  <input type="range" min="0" max="100" value="40" aria-label="Volume">
  <span data-lg-icon="speaker.wave.2"></span>
</div>
```

`<Slider value={v} onValueChange={setV} min={0} max={100} ticks={5} minIcon={…} maxIcon={…} tint="orange" />`. Native `input`/`change` events; setting `input.value` updates the visuals.

### Segmented control

```html
<div class="lg-segmented" role="radiogroup" aria-label="Period">
  <label><input type="radio" name="p" checked>Day</label>
  <label><input type="radio" name="p">Week</label>
</div>
```

Button variant: `<button aria-pressed="true">` children, emits `lg-change` `{ index, value }`. Modifiers: `--block`, `--small`.
`<SegmentedControl options={[{ value: 'day', label: 'Day' }]} value={v} onValueChange={setV} block />`.

### Stepper

```html
<div class="lg-stepper" data-min="0" data-max="10" data-step="1" data-value="2" data-lg-output="#count"></div>
```

Emits `lg-change` `{ value }`. `<Stepper value={n} onValueChange={setN} min={0} max={10} />`.

### Text field, search field, select, checkbox

```html
<input class="lg-textfield" placeholder="Name">
<textarea class="lg-textfield"></textarea>
<input class="lg-textfield" aria-invalid="true"><p class="lg-field-message lg-field-message--error">Required</p>
<div class="lg-search lg-glass"><span data-lg-icon="magnifyingglass"></span><input type="search" placeholder="Search"></div>
<select class="lg-select"><option>By date</option></select>
<input type="checkbox" class="lg-checkbox">
```

React: `<TextField multiline />`, `<SearchField glass trailing={…} />`, `<Select plain>`, `<Checkbox />`.

---

## Navigation

### Navigation bar

```html
<header class="lg-navbar lg-navbar--large" data-lg-scroll="#scroller">
  <div class="lg-navbar-leading"><button class="lg-button lg-button--icon" aria-label="Back"><span data-lg-icon="chevron.left"></span></button></div>
  <div class="lg-navbar-title">Settings</div>
  <div class="lg-navbar-trailing"><button class="lg-button lg-button--prominent">Done</button></div>
</header>
<h1 class="lg-large-title-header">Settings</h1>
```

After scrolling past the large title, `is-scrolled` shows the inline title and the scroll edge effect. `data-lg-scroll` is a selector or `window` (default: nearest scrolling ancestor). `--edge` always shows the edge effect.
`<NavigationBar large title="Settings" leading={…} trailing={…} scrollTarget="#scroller" />` + `<LargeTitle>`.

### Toolbar

```html
<div class="lg-toolbar">
  <div class="lg-group lg-glass">…</div>
  <span class="lg-spacer"></span>
  <button class="lg-button lg-button--prominent lg-button--icon" aria-label="Compose"><span data-lg-icon="square.and.pencil"></span></button>
</div>
```

`--top` for a top toolbar. `<Toolbar>` + `<Spacer />`.

### Tab bar

```html
<nav class="lg-tabbar" data-lg-minimize-on-scroll aria-label="Tabs">
  <div class="lg-tabbar-tabs lg-glass">
    <a class="lg-tab is-selected" href="/"><span data-lg-icon="house"></span><span class="lg-tab-label">Home</span></a>
    <a class="lg-tab" href="/library"><span data-lg-icon="books.vertical"></span><span class="lg-tab-label">Library</span><span class="lg-badge">3</span></a>
  </div>
  <button class="lg-tabbar-search lg-glass" aria-label="Search"><span data-lg-icon="magnifyingglass"></span></button>
</nav>
```

Floating capsule (62 pt), lens while pressing/dragging across tabs, minimizes on scroll down (`data-lg-minimize-on-scroll` = `window` or a selector). `--absolute` / `--static` positioning. Emits `lg-change` `{ index, tab, value }`. Button tabs get tablist semantics and arrow keys.
`<TabBar items={[…]} value={tab} onValueChange={setTab} search minimizeOnScroll adaptive />`.

### Sidebar

```html
<nav class="lg-sidebar lg-glass">
  <div class="lg-sidebar-section">Library</div>
  <a class="lg-sidebar-item is-selected" href="#"><span data-lg-icon="photo"></span>Photos<span class="lg-sidebar-count">128</span></a>
</nav>
```

`--ios` for iPad sizing. `<Sidebar variant="ios">`, `<SidebarSection>`, `<SidebarItem icon selected count>`.

### Global navigation (apple.com style)

```html
<div class="lg-globalnav">
  <nav class="lg-globalnav-bar lg-glass">
    <a class="lg-globalnav-brand" href="/">Brand</a>
    <div class="lg-globalnav-links"><a href="#" aria-current="page">Overview</a><a href="#">Specs</a></div>
    <a class="lg-button lg-button--prominent lg-button--small" href="#">Buy</a>
  </nav>
</div>
```

Links scroll horizontally on narrow screens. `<GlobalNav brand links actions />`.

---

## Lists

```html
<section class="lg-list-section">
  <div class="lg-list-header">Connections</div>
  <ul class="lg-list">
    <li class="lg-row">
      <span class="lg-row-icon" style="--lg-row-icon-bg: var(--lg-orange)"><span data-lg-icon="airplane"></span></span>
      <span class="lg-row-title">Airplane Mode</span>
      <label class="lg-switch"><input type="checkbox"></label>
    </li>
    <li><a class="lg-row" href="#"><span class="lg-row-title">Wi-Fi</span><span class="lg-row-detail">Home</span><span class="lg-chevron"></span></a></li>
    <li class="lg-row"><span class="lg-row-title">Selected</span><span class="lg-checkmark"></span></li>
  </ul>
  <div class="lg-list-footer">Footer text</div>
</section>
```

Row parts: `.lg-row-icon`, `.lg-row-title`, `.lg-row-content` + `.lg-row-subtitle`, `.lg-row-detail`, `.lg-chevron`, `.lg-checkmark`, `.lg-row--destructive`. `.lg-list--plain` removes the inset card.
`<ListSection header footer>` + `<ListRow icon iconColor title subtitle detail accessory checked href onClick />`.

### Disclosure

```html
<details class="lg-disclosure">
  <summary>Advanced</summary>
  <div class="lg-disclosure-content">…</div>
</details>
```

`<Disclosure title="Advanced" defaultOpen>…</Disclosure>`.

---

## Presentations

### Alert

```js
const choice = await LiquidGlass.alert({
  title: 'Delete photo?',
  message: 'This can’t be undone.',
  actions: [{ label: 'Cancel', role: 'cancel' }, { label: 'Delete', role: 'destructive', prominent: true }],
});
const { action, value } = await LiquidGlass.alert({ title: 'Rename', input: { value: 'Untitled' }, actions: […] });
```

Declarative: `<button data-lg-alert="Title" data-lg-message="Message">`. Escape triggers the `cancel` action; three or more actions stack.

### Action sheet

```js
await LiquidGlass.actionSheet({ title: 'Sign out?', actions: [{ label: 'Sign Out', role: 'destructive' }, { label: 'Cancel', role: 'cancel' }] });
```

### Sheet

```html
<button data-lg-sheet="#settings" data-lg-detent="medium">Open</button>
<div class="lg-sheet" id="settings" data-lg-detents="medium large" hidden>
  <div class="lg-sheet-grabber"></div>
  <div class="lg-sheet-header">
    <button class="lg-button lg-button--icon" data-lg-dismiss aria-label="Close"><span data-lg-icon="xmark"></span></button>
    <h2 class="lg-sheet-title">Settings</h2>
    <button class="lg-button lg-button--icon lg-button--prominent" data-lg-dismiss aria-label="Done"><span data-lg-icon="checkmark"></span></button>
  </div>
  <div class="lg-sheet-content">…</div>
</div>
```

Detents: `medium`, `large`, percentages or px. Drag the grabber/header, tap the grabber to cycle, Escape or the overlay closes. `--contained` keeps it inside a positioned parent. Events: `lg-open`, `lg-close`, `lg-detent`. JS: `LiquidGlass.sheet('#settings').open('large')`.
`<Sheet open={open} onOpenChange={setOpen} detents={['medium', 'large']} title leading trailing contained>`.

### Menu, popover, context menu

```html
<button class="lg-button" data-lg-menu="#more">More</button>
<div class="lg-menu" id="more" hidden>
  <div class="lg-menu-title">Document</div>
  <button class="lg-menu-item" data-value="copy"><span data-lg-icon="doc.text"></span>Copy<span class="lg-menu-shortcut">⌘C</span></button>
  <button class="lg-menu-item" role="menuitemcheckbox" aria-checked="true">Pinned</button>
  <div class="lg-menu-separator"></div>
  <button class="lg-menu-item lg-menu-item--destructive">Delete</button>
</div>

<div data-lg-context-menu="#more">Right-click or long-press me</div>
<button data-lg-popover="#info">Info</button><div class="lg-popover" id="info" hidden>Any content</div>
```

Emits `lg-select` `{ item, value }` on the panel; `data-lg-keep-open` keeps it open. Arrow keys, Home/End and Escape work. `data-lg-placement="top"` on the trigger.
JS: `await LiquidGlass.menu(anchorOrPoint, [{ label, icon, value, destructive, shortcut, checked }, '-'])`.
React: `<Menu trigger={<Button>More</Button>}><MenuItem icon onSelect shortcut destructive checked /></Menu>`, `<Popover trigger>`.

### Toast

```js
LiquidGlass.toast({ title: 'Messages', message: 'Hi!', icon: LiquidGlass.icon('message'), iconBackground: 'var(--lg-green)', time: 'now', duration: 4000 });
```

Swipe up to dismiss; returns `{ close }`.

### Tooltip

`<button data-lg-tooltip="Share this page">…</button>` — macOS-style help tag after a short hover delay.

---

## Indicators

```html
<progress class="lg-progress" value="0.6"></progress>
<progress class="lg-progress"></progress>                       <!-- indeterminate -->
<span class="lg-ring" style="--lg-value: 0.7"></span>
<span class="lg-spinner"></span> <span class="lg-spinner lg-spinner--large"></span>
<div class="lg-page-control lg-glass" data-count="5" data-index="0"></div>
<span class="lg-badge">3</span>
```

React: `<ProgressBar value />`, `<ProgressRing value size stroke tint />`, `<Spinner size="large" />`, `<PageControl count index onIndexChange prominent />`, `<Badge color>`.

---

## macOS window

```html
<div class="lg-window lg-window--sidebar" style="--lg-sidebar-width: 220px">
  <div class="lg-window-body">
    <nav class="lg-sidebar lg-glass">…</nav>
    <div class="lg-window-main">…</div>
    <div class="lg-window-toolbar lg-drag">
      <div class="lg-traffic-lights"><span></span><span></span><span></span></div>
      <span class="lg-window-title">Photos</span>
      <span class="lg-spacer"></span>
      <div class="lg-group lg-glass">…</div>
    </div>
  </div>
</div>
```

`.lg-drag` marks draggable title-bar regions in Electron/Tauri; interactive children stay clickable. `<Window title sidebar toolbar sidebarWidth>`, `<TrafficLights onClose onMinimize onZoom />`.

---

## Typography

`.lg-large-title` 34/41 · `.lg-title-1` 28/34 · `.lg-title-2` 22/28 · `.lg-title-3` 20/25 · `.lg-headline` 17/22 semibold · `.lg-body` 17/22 · `.lg-callout` 16/21 · `.lg-subheadline` 15/20 · `.lg-footnote` 13/18 · `.lg-caption-1` 12/16 · `.lg-caption-2` 11/13, each with the SF Pro tracking value. Modifiers: `.lg-emphasized`, `.lg-rounded`, `.lg-serif`, `.lg-mono`. Put `class="lg"` on `<body>` for the base font, size and colors.

## Colors

System: `--lg-red` … `--lg-brown`, `--lg-gray` … `--lg-gray-6` (iOS 26 values, light/dark, increased contrast).
Semantic: `--lg-label`, `--lg-label-secondary`, `--lg-label-tertiary`, `--lg-label-quaternary`, `--lg-fill(-secondary/-tertiary/-quaternary)`, `--lg-bg(-secondary/-tertiary)`, `--lg-bg-grouped(-secondary/-tertiary)`, `--lg-separator`, `--lg-accent`, `--lg-link`, `--lg-destructive`.
apple.com web palette: `--lg-web-text`, `--lg-web-text-secondary`, `--lg-web-link`, `--lg-web-bg`, `--lg-web-bg-alt`.
Theme: `data-lg-theme="light|dark"` or `.lg-light` / `.lg-dark` on any element; `data-lg-contrast="more"` for Apple's increased contrast colors.

## Icons

```html
<span data-lg-icon="magnifyingglass" data-size="20" data-label="Search"></span>
```

```tsx
<Icon name="square.and.arrow.up" size={20} />
```

Built-in fallback glyphs cover common SF Symbols names. To use Apple's originals where their license allows, export SVGs from the SF Symbols app and call `registerIcons({ magnifyingglass: svg })`; every icon on the page switches over.

## Motion

Springs: `--lg-ease-bouncy` / `--lg-dur-bouncy`, `--lg-ease-spring` / `--lg-dur-spring`, `--lg-ease-smooth` / `--lg-dur-smooth` (CSS `linear()` curves from damped spring equations). `prefers-reduced-motion` swaps them for short ease-outs.
