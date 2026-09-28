/*
 * Liquid Glass Kit — React bindings (Next.js App Router ready: the built file
 * starts with 'use client').
 *
 * Components render the exact markup the CSS expects and attach behaviors
 * from the shared core on mount; they clean up after themselves on unmount
 * and work in React 17–19, StrictMode included.
 */
import * as React from 'react';
import { createPortal } from 'react-dom';
import {
  start,
  stop,
  init,
  destroy,
  refresh,
  select as coreSelect,
  setTheme,
  sheet as sheetController,
  openPopover,
  closePopover,
  refract,
  unrefract,
  alert,
  actionSheet,
  toast,
  menu,
  supportsRefraction,
  configure,
  version,
  icons,
  icon,
  iconNames,
  registerIcons,
  hasIcon,
  sfAliases,
} from './core.js';

export { alert, actionSheet, toast, menu, refract, unrefract, supportsRefraction, configure, setTheme, version, start, stop, icon, icons, iconNames, registerIcons, hasIcon, sfAliases };

const { forwardRef, useEffect, useLayoutEffect, useRef, useState, useCallback, useImperativeHandle } = React;
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
let idCounter = 0;
// React 18+ has useId; React 17 gets a stable per-instance fallback.
const useStableId =
  React.useId ||
  function useFallbackId() {
    const ref = useRef(null);
    if (ref.current == null) ref.current = 'lg' + ++idCounter;
    return ref.current;
  };
const REACT_MAJOR = parseInt(React.version, 10) || 18;

function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}

function useMergedRef(forwarded) {
  const local = useRef(null);
  useImperativeHandle(forwarded, () => local.current, []);
  return local;
}

/** Attaches Liquid Glass behaviors to the element in `ref` for the component's lifetime. */
export function useLiquidGlass(ref) {
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    init(el);
    return () => destroy(el);
  }, []);
}

/** Controlled/uncontrolled state helper. */
function useControllable(value, defaultValue, onChange) {
  const [inner, setInner] = useState(defaultValue);
  const controlled = value !== undefined;
  const current = controlled ? value : inner;
  const set = useCallback(
    (next) => {
      if (!controlled) setInner(next);
      if (onChange) onChange(next);
    },
    [controlled, onChange]
  );
  return [current, set];
}

function tintStyle(tint, style, prop = '--lg-tint') {
  if (!tint) return style;
  const color = /^(red|orange|yellow|green|mint|teal|cyan|blue|indigo|purple|pink|brown|gray)$/.test(tint) ? `var(--lg-${tint})` : tint;
  return { ...style, [prop]: color };
}

/* ==========================================================================
   Icons
   ========================================================================== */

/** SF-inspired line icon from the kit's set: <Icon name="house" /> */
export function Icon({ name, size = 24, strokeWidth = 1.9, label, className, style, ...rest }) {
  const body = icons[name] || icons[sfAliases[name]];
  // Registered icons (e.g. exported SF Symbols) render through icon().
  const html = icon(name, { size, strokeWidth, label, className });
  if (!html) return null;
  if (!body || html.indexOf('stroke-linecap') < 0) {
    return <span style={{ display: 'contents', ...style }} dangerouslySetInnerHTML={{ __html: html }} {...rest} />;
  }
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      dangerouslySetInnerHTML={{ __html: body.replace(/ data-fill=""/g, ' fill="currentColor" stroke="none"') }}
      {...rest}
    />
  );
}

/* ==========================================================================
   Provider
   ========================================================================== */

/**
 * Starts the kit once on the client (press feedback, dynamic light,
 * declarative triggers, auto-enhancement) and optionally sets the theme.
 */
export function LiquidGlassProvider({ children, theme, refraction, dynamicLight }) {
  useEffect(() => {
    const opts = {};
    if (refraction !== undefined) opts.refraction = refraction;
    if (dynamicLight !== undefined) opts.dynamicLight = dynamicLight;
    start(opts);
  }, []);
  useEffect(() => {
    if (theme) setTheme(theme);
  }, [theme]);
  return children === undefined ? null : children;
}

/* ==========================================================================
   Materials
   ========================================================================== */

const GLASS_VARIANTS = { regular: '', clear: 'lg-glass--clear', tinted: 'lg-glass--tinted', prominent: 'lg-glass--prominent', thick: 'lg-glass--thick', opaque: 'lg-glass--opaque', dimmed: 'lg-glass--dimmed' };

export const Glass = forwardRef(function Glass(
  { as: Tag = 'div', variant = 'regular', shape, tint, interactive, flat, bezel, depth, magnify, className, style, children, ...rest },
  ref
) {
  const local = useMergedRef(ref);
  useLiquidGlass(local);
  return (
    <Tag
      ref={local}
      className={cx(
        'lg-glass',
        GLASS_VARIANTS[variant],
        shape === 'capsule' && 'lg-glass--capsule',
        shape === 'circle' && 'lg-glass--circle',
        interactive && 'lg-glass--interactive',
        flat && 'lg-glass--flat',
        className
      )}
      style={tintStyle(tint, style)}
      data-lg-bezel={bezel}
      data-lg-depth={depth}
      data-lg-magnify={magnify}
      {...rest}
    >
      {children}
    </Tag>
  );
});

export function ScrollEdge({ position = 'top', className, ...rest }) {
  return <div aria-hidden="true" className={cx('lg-scroll-edge', position === 'bottom' && 'lg-scroll-edge--bottom', className)} {...rest} />;
}

/* ==========================================================================
   Buttons
   ========================================================================== */

const BUTTON_SIZES = { mini: 'lg-button--mini', small: 'lg-button--small', regular: '', large: 'lg-button--large', xl: 'lg-button--xl' };

export const Button = forwardRef(function Button(
  { as, variant = 'glass', size = 'regular', shape = 'capsule', icon, destructive, tint, block, className, style, children, type, ...rest },
  ref
) {
  const local = useMergedRef(ref);
  useLiquidGlass(local);
  const Tag = as || (rest.href ? 'a' : 'button');
  const iconOnly = shape === 'circle' || (icon && !children);
  return (
    <Tag
      ref={local}
      type={Tag === 'button' ? type || 'button' : type}
      className={cx(
        'lg-button',
        variant !== 'glass' && `lg-button--${variant}`,
        BUTTON_SIZES[size],
        iconOnly && 'lg-button--icon',
        shape === 'rounded' && 'lg-button--rounded',
        destructive && 'lg-button--destructive',
        block && 'lg-button--block',
        className
      )}
      style={tintStyle(tint, style)}
      {...rest}
    >
      {icon}
      {children}
    </Tag>
  );
});

export const ButtonGroup = forwardRef(function ButtonGroup({ className, children, height, style, ...rest }, ref) {
  const local = useMergedRef(ref);
  useLiquidGlass(local);
  return (
    <div ref={local} role="group" className={cx('lg-group lg-glass', className)} style={height ? { ...style, '--lg-group-height': height + 'px' } : style} {...rest}>
      {children}
    </div>
  );
});

/* ==========================================================================
   Controls
   ========================================================================== */

export const Switch = forwardRef(function Switch(
  { checked, defaultChecked = false, onCheckedChange, onChange, disabled, size, tint, className, style, id, name, value, 'aria-label': ariaLabel, label, ...rest },
  ref
) {
  const local = useRef(null);
  useLiquidGlass(local);
  const [on, setOn] = useControllable(checked, defaultChecked, onCheckedChange);
  return (
    <label ref={local} className={cx('lg-switch', size === 'small' && 'lg-switch--small', className)} style={tintStyle(tint, style, '--lg-switch-tint')} {...rest}>
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        id={id}
        name={name}
        value={value}
        aria-label={ariaLabel || label}
        checked={on}
        disabled={disabled}
        onChange={(e) => {
          setOn(e.target.checked);
          if (onChange) onChange(e);
        }}
      />
      <span className="lg-switch-thumb" aria-hidden="true" />
    </label>
  );
});

export const Slider = forwardRef(function Slider(
  { value, defaultValue = 50, min = 0, max = 100, step = 1, onValueChange, onChange, ticks, minIcon, maxIcon, tint, disabled, className, style, 'aria-label': ariaLabel, label, ...rest },
  ref
) {
  const local = useRef(null);
  useLiquidGlass(local);
  const [v, setV] = useControllable(value, defaultValue, onValueChange);
  const ratio = max > min ? (Number(v) - min) / (max - min) : 0;
  useEffect(() => {
    if (local.current) refresh(local.current);
  }, [v]);
  return (
    <div
      ref={local}
      data-lg-controlled=""
      className={cx('lg-slider is-ready', className)}
      style={{ ...tintStyle(tint, style, '--lg-slider-tint'), '--_ratio': Math.min(1, Math.max(0, ratio)).toFixed(4) }}
      {...rest}
    >
      {minIcon}
      <div className="lg-slider-body">
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={v}
          disabled={disabled}
          aria-label={ariaLabel || label}
          onChange={(e) => {
            setV(Number(e.target.value));
            if (onChange) onChange(e);
          }}
        />
        <div className="lg-slider-track" aria-hidden="true">
          <div className="lg-slider-fill" />
        </div>
        {ticks > 1 && (
          <div className="lg-slider-ticks" aria-hidden="true">
            {Array.from({ length: ticks }, (_, i) => (
              <i key={i} />
            ))}
          </div>
        )}
        <div className="lg-slider-thumb" aria-hidden="true" />
      </div>
      {maxIcon}
    </div>
  );
});

export const SegmentedControl = forwardRef(function SegmentedControl(
  { options, value, defaultValue, onValueChange, name, size, block, className, 'aria-label': ariaLabel, ...rest },
  ref
) {
  const local = useMergedRef(ref);
  const autoName = 'lg-seg-' + useStableId().replace(/[^a-zA-Z0-9_-]/g, '');
  const items = (options || []).map((o) => (typeof o === 'object' ? o : { value: o, label: String(o) }));
  const [v, setV] = useControllable(value, defaultValue !== undefined ? defaultValue : items[0] && items[0].value, onValueChange);
  useLiquidGlass(local);
  useEffect(() => {
    if (local.current) refresh(local.current);
  }, [v]);
  return (
    <div
      ref={local}
      role="radiogroup"
      aria-label={ariaLabel}
      className={cx('lg-segmented', size === 'small' && 'lg-segmented--small', block && 'lg-segmented--block', className)}
      {...rest}
    >
      <span className="lg-segmented-indicator" aria-hidden="true" />
      {items.map((o) => (
        <label key={String(o.value)} title={o.title}>
          <input
            type="radio"
            name={name || autoName}
            value={String(o.value)}
            checked={o.value === v}
            disabled={o.disabled}
            onChange={() => setV(o.value)}
            aria-label={o.label ? undefined : o['aria-label']}
          />
          {o.icon}
          {o.label}
        </label>
      ))}
    </div>
  );
});

export const Stepper = forwardRef(function Stepper(
  { value, defaultValue = 0, min = -Infinity, max = Infinity, step = 1, onValueChange, className, decrementLabel = 'Decrement', incrementLabel = 'Increment', ...rest },
  ref
) {
  const [v, setV] = useControllable(value, defaultValue, onValueChange);
  const change = (dir) => {
    const next = Math.min(max, Math.max(min, Math.round((v + dir * step) * 1e6) / 1e6));
    if (next !== v) setV(next);
  };
  return (
    <div ref={ref} className={cx('lg-stepper', className)} data-lg-controlled="" {...rest}>
      <button type="button" aria-label={decrementLabel} disabled={v <= min} onClick={() => change(-1)}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12h14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </button>
      <span className="lg-stepper-divider" aria-hidden="true" />
      <button type="button" aria-label={incrementLabel} disabled={v >= max} onClick={() => change(1)}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12h14M12 5v14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
});

export const TextField = forwardRef(function TextField({ multiline, className, ...rest }, ref) {
  const Tag = multiline ? 'textarea' : 'input';
  return <Tag ref={ref} className={cx('lg-textfield', className)} {...rest} />;
});

const SEARCH_ICON = (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.5 15.5l4.5 4.5" />
  </svg>
);

export const SearchField = forwardRef(function SearchField({ glass = true, size, className, style, trailing, placeholder = 'Search', ...rest }, ref) {
  const wrap = useRef(null);
  useLiquidGlass(wrap);
  return (
    <div ref={wrap} className={cx('lg-search', glass && 'lg-glass', size === 'small' && 'lg-search--small', className)} style={style}>
      {SEARCH_ICON}
      <input ref={ref} type="search" placeholder={placeholder} {...rest} />
      {trailing}
    </div>
  );
});

export const Checkbox = forwardRef(function Checkbox({ className, ...rest }, ref) {
  return <input ref={ref} type="checkbox" className={cx('lg-checkbox', className)} {...rest} />;
});

/* ==========================================================================
   Navigation
   ========================================================================== */

export const NavigationBar = forwardRef(function NavigationBar(
  { title, large, leading, trailing, scrollTarget, threshold, edge, className, children, ...rest },
  ref
) {
  const local = useMergedRef(ref);
  useLiquidGlass(local);
  return (
    <header
      ref={local}
      className={cx('lg-navbar', large && 'lg-navbar--large', edge && 'lg-navbar--edge', className)}
      data-lg-scroll={scrollTarget}
      data-lg-threshold={threshold}
      {...rest}
    >
      <div className="lg-navbar-leading">{leading}</div>
      {title != null && <div className="lg-navbar-title">{title}</div>}
      <div className="lg-navbar-trailing">{trailing}</div>
      {children}
    </header>
  );
});

export function LargeTitle({ as: Tag = 'h1', className, ...rest }) {
  return <Tag className={cx('lg-large-title-header', className)} {...rest} />;
}

export function Toolbar({ position = 'bottom', className, ...rest }) {
  return <div className={cx('lg-toolbar', position === 'top' && 'lg-toolbar--top', className)} {...rest} />;
}

export function Spacer() {
  return <span className="lg-spacer" />;
}

export const TabBar = forwardRef(function TabBar(
  { items, value, defaultValue, onValueChange, search, onSearch, searchLabel = 'Search', action, minimizeOnScroll, position = 'fixed', tint, className, style, 'aria-label': ariaLabel = 'Tabs', ...rest },
  ref
) {
  const local = useMergedRef(ref);
  const list = items || [];
  const [v, setV] = useControllable(value, defaultValue !== undefined ? defaultValue : list[0] && list[0].value, onValueChange);
  useLiquidGlass(local);
  useEffect(() => {
    const el = local.current;
    if (!el) return undefined;
    const onChange = (e) => {
      const item = list[e.detail.index];
      if (item && item.value !== v) setV(item.value);
    };
    el.addEventListener('lg-change', onChange);
    return () => el.removeEventListener('lg-change', onChange);
  });
  useEffect(() => {
    const idx = list.findIndex((i) => i.value === v);
    if (local.current && idx > -1) coreSelect(local.current, idx);
  }, [v]);
  const minimizeAttr = minimizeOnScroll === true ? 'window' : minimizeOnScroll || undefined;
  return (
    <nav
      ref={local}
      aria-label={ariaLabel}
      className={cx('lg-tabbar', position === 'absolute' && 'lg-tabbar--absolute', position === 'static' && 'lg-tabbar--static', className)}
      style={tintStyle(tint, style, '--lg-tabbar-tint')}
      data-lg-minimize-on-scroll={minimizeAttr}
      {...rest}
    >
      <div className="lg-tabbar-tabs lg-glass">
        <div className="lg-tabbar-indicator" aria-hidden="true" />
        {list.map((item) => {
          const selected = item.value === v;
          const Tag = item.href ? 'a' : 'button';
          return (
            <Tag
              key={String(item.value)}
              href={item.href}
              type={Tag === 'button' ? 'button' : undefined}
              className={cx('lg-tab', selected && 'is-selected')}
              aria-current={Tag === 'a' && selected ? 'page' : undefined}
              aria-selected={Tag === 'button' ? selected : undefined}
              role={Tag === 'button' ? 'tab' : undefined}
              data-value={String(item.value)}
            >
              {item.icon}
              <span className="lg-tab-label">{item.label}</span>
              {item.badge != null && item.badge !== false && <span className="lg-badge">{item.badge}</span>}
            </Tag>
          );
        })}
      </div>
      {action}
      {search && (
        <button type="button" className="lg-tabbar-search lg-glass" aria-label={searchLabel} onClick={onSearch}>
          {search === true ? SEARCH_ICON : search}
        </button>
      )}
      <div className="lg-tabbar-lens" aria-hidden="true" />
    </nav>
  );
});

export function Sidebar({ variant = 'mac', className, children, ...rest }) {
  const ref = useRef(null);
  useLiquidGlass(ref);
  return (
    <nav ref={ref} className={cx('lg-sidebar lg-glass', variant === 'ios' && 'lg-sidebar--ios', className)} {...rest}>
      {children}
    </nav>
  );
}

export function SidebarSection({ className, ...rest }) {
  return <div className={cx('lg-sidebar-section', className)} {...rest} />;
}

export function SidebarItem({ as, icon, selected, count, className, children, ...rest }) {
  const Tag = as || (rest.href ? 'a' : 'button');
  return (
    <Tag
      type={Tag === 'button' ? 'button' : undefined}
      className={cx('lg-sidebar-item', selected && 'is-selected', className)}
      aria-current={selected ? 'page' : undefined}
      {...rest}
    >
      {icon}
      <span>{children}</span>
      {count != null && <span className="lg-sidebar-count">{count}</span>}
    </Tag>
  );
}

export function GlobalNav({ brand, links, actions, className, ...rest }) {
  const ref = useRef(null);
  useLiquidGlass(ref);
  return (
    <div className={cx('lg-globalnav', className)} {...rest}>
      <nav ref={ref} className="lg-globalnav-bar lg-glass">
        <div className="lg-globalnav-brand">{brand}</div>
        <div className="lg-globalnav-links">
          {(links || []).map((l) => (
            <a key={l.href + l.label} href={l.href} aria-current={l.current ? 'page' : undefined}>
              {l.label}
            </a>
          ))}
        </div>
        {actions}
      </nav>
    </div>
  );
}

/* ==========================================================================
   Lists
   ========================================================================== */

export function List({ plain, className, children, ...rest }) {
  return (
    <ul className={cx('lg-list', plain && 'lg-list--plain', className)} {...rest}>
      {children}
    </ul>
  );
}

export function ListSection({ header, footer, prominentHeader, className, children, ...rest }) {
  return (
    <section className={cx('lg-list-section', className)} {...rest}>
      {header != null && <div className={cx('lg-list-header', prominentHeader && 'lg-list-header--prominent')}>{header}</div>}
      <ul className="lg-list">{children}</ul>
      {footer != null && <div className="lg-list-footer">{footer}</div>}
    </section>
  );
}

export function ListRow({ as, icon, iconColor, title, subtitle, detail, chevron, checked, accessory, destructive, className, children, ...rest }) {
  const interactive = rest.onClick || rest.href;
  const Tag = as || (rest.href ? 'a' : rest.onClick ? 'button' : 'li');
  const row = (
    <Tag type={Tag === 'button' ? 'button' : undefined} className={cx('lg-row', destructive && 'lg-row--destructive', className)} {...rest}>
      {icon && (
        <span className="lg-row-icon" style={iconColor ? { '--lg-row-icon-bg': /^(red|orange|yellow|green|mint|teal|cyan|blue|indigo|purple|pink|brown|gray)$/.test(iconColor) ? `var(--lg-${iconColor})` : iconColor } : undefined}>
          {icon}
        </span>
      )}
      {subtitle ? (
        <span className="lg-row-content">
          <span className="lg-row-title">{title}</span>
          <span className="lg-row-subtitle">{subtitle}</span>
        </span>
      ) : (
        <span className="lg-row-title">{title}</span>
      )}
      {children}
      {detail != null && <span className="lg-row-detail">{detail}</span>}
      {accessory}
      {checked && <span className="lg-checkmark" aria-label="Selected" />}
      {(chevron || (chevron === undefined && interactive && !checked && !accessory)) && <span className="lg-chevron" aria-hidden="true" />}
    </Tag>
  );
  return Tag === 'li' ? row : <li>{row}</li>;
}

/* ==========================================================================
   Presentations
   ========================================================================== */

function usePortalTarget(enabled) {
  const [target, setTarget] = useState(null);
  useIsoLayoutEffect(() => {
    if (enabled) setTarget(document.body);
  }, [enabled]);
  return target;
}

/**
 * Bottom sheet with detents. Controlled with `open` / `onOpenChange`.
 * `contained` keeps it inside its positioned parent instead of the viewport.
 */
export const Sheet = forwardRef(function Sheet(
  { open, onOpenChange, detents = ['medium', 'large'], detent, onDetentChange, title, leading, trailing, grabber = true, contained, className, children, ...rest },
  ref
) {
  const local = useMergedRef(ref);
  const portal = usePortalTarget(!contained);
  const ctrl = useRef(null);
  const onOpenChangeRef = useRef(onOpenChange);
  onOpenChangeRef.current = onOpenChange;
  const onDetentRef = useRef(onDetentChange);
  onDetentRef.current = onDetentChange;

  useIsoLayoutEffect(() => {
    const el = local.current;
    if (!el) return undefined;
    ctrl.current = sheetController(el);
    const onClose = () => onOpenChangeRef.current && onOpenChangeRef.current(false);
    const onDetent = (e) => onDetentRef.current && onDetentRef.current(e.detail.detent);
    el.addEventListener('lg-close', onClose);
    el.addEventListener('lg-detent', onDetent);
    return () => {
      el.removeEventListener('lg-close', onClose);
      el.removeEventListener('lg-detent', onDetent);
      if (ctrl.current && ctrl.current.isOpen) ctrl.current.close();
    };
  }, [portal, contained]);

  useEffect(() => {
    const c = ctrl.current;
    if (!c) return;
    if (open && !c.isOpen) c.open(detent);
    else if (!open && c.isOpen) c.close();
    else if (open && detent && c.detent !== detent) c.setDetent(detent);
  }, [open, detent, portal]);

  const node = (
    <div ref={local} className={cx('lg-sheet lg-glass', contained && 'lg-sheet--contained', className)} data-lg-detents={detents.join(' ')} hidden {...rest}>
      {grabber && <div className="lg-sheet-grabber" />}
      {(title != null || leading || trailing) && (
        <div className="lg-sheet-header">
          <div>{leading}</div>
          {title != null ? <h2 className="lg-sheet-title">{title}</h2> : <span />}
          <div>{trailing}</div>
        </div>
      )}
      <div className="lg-sheet-content">{children}</div>
    </div>
  );
  if (contained) return node;
  return portal ? createPortal(node, portal) : null;
});

/* Menus & popovers ------------------------------------------------------- */

/**
 * <Menu trigger={<Button>…</Button>}>
 *   <MenuItem icon={…} onSelect={…}>Copy</MenuItem>
 *   <MenuSeparator />
 * </Menu>
 */
export function Menu({ trigger, children, placement, className, onOpenChange, popover, ...rest }) {
  const panelRef = useRef(null);
  const triggerRef = useRef(null);
  const portal = usePortalTarget(true);
  const onOpenChangeRef = useRef(onOpenChange);
  onOpenChangeRef.current = onOpenChange;

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return undefined;
    const onOpen = () => onOpenChangeRef.current && onOpenChangeRef.current(true);
    const onClose = () => onOpenChangeRef.current && onOpenChangeRef.current(false);
    el.addEventListener('lg-open', onOpen);
    el.addEventListener('lg-close', onClose);
    return () => {
      el.removeEventListener('lg-open', onOpen);
      el.removeEventListener('lg-close', onClose);
      unrefract(el);
    };
  }, [portal]);

  const triggerEl = React.isValidElement(trigger)
    ? React.cloneElement(trigger, {
        ref: (node) => {
          triggerRef.current = node;
          const r = REACT_MAJOR >= 19 ? trigger.props.ref : trigger.ref;
          if (typeof r === 'function') r(node);
          else if (r) r.current = node;
        },
        'aria-haspopup': popover ? 'dialog' : 'menu',
        'aria-expanded': false,
        onClick: (e) => {
          if (trigger.props.onClick) trigger.props.onClick(e);
          if (!e.defaultPrevented && panelRef.current) openPopover(panelRef.current, triggerRef.current, { placement });
        },
      })
    : trigger;

  const panel = (
    <div ref={panelRef} role={popover ? 'dialog' : 'menu'} className={cx(popover ? 'lg-popover' : 'lg-menu', 'lg-glass', className)} hidden {...rest}>
      {children}
    </div>
  );
  return (
    <>
      {triggerEl}
      {portal && createPortal(panel, portal)}
    </>
  );
}

export function Popover(props) {
  return <Menu {...props} popover />;
}

export function MenuItem({ icon, onSelect, onClick, destructive, disabled, shortcut, detail, checked, keepOpen, className, children, ...rest }) {
  return (
    <button
      type="button"
      role={checked !== undefined ? 'menuitemcheckbox' : 'menuitem'}
      aria-checked={checked !== undefined ? checked : undefined}
      disabled={disabled}
      data-lg-keep-open={keepOpen ? '' : undefined}
      className={cx('lg-menu-item', destructive && 'lg-menu-item--destructive', className)}
      onClick={(e) => {
        if (onClick) onClick(e);
        if (onSelect) onSelect(e);
      }}
      {...rest}
    >
      {icon}
      <span>{children}</span>
      {shortcut && <span className="lg-menu-shortcut">{shortcut}</span>}
      {detail && <span className="lg-menu-detail">{detail}</span>}
    </button>
  );
}

export function MenuSeparator({ line }) {
  return <div role="separator" className={cx('lg-menu-separator', line && 'lg-menu-separator--line')} />;
}

export function MenuTitle({ className, ...rest }) {
  return <div className={cx('lg-menu-title', className)} {...rest} />;
}

export { closePopover as closeMenu };

/* ==========================================================================
   Indicators
   ========================================================================== */

export function ProgressBar({ value, max = 1, indeterminate, tint, className, style, ...rest }) {
  return (
    <progress
      className={cx('lg-progress', className)}
      max={max}
      value={indeterminate ? undefined : value}
      style={tintStyle(tint, style, '--lg-progress-tint')}
      {...rest}
    />
  );
}

export function ProgressRing({ value = 0, size = 28, stroke = 3.5, tint, className, style, ...rest }) {
  return (
    <span
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
      className={cx('lg-ring', className)}
      style={{ ...tintStyle(tint, style, '--lg-ring-tint'), '--lg-value': value, '--_size': size + 'px', '--_stroke': stroke + 'px' }}
      {...rest}
    />
  );
}

export function Spinner({ size, className, label = 'Loading', ...rest }) {
  return (
    <span role="progressbar" aria-label={label} className={cx('lg-spinner', size === 'large' && 'lg-spinner--large', className)} {...rest}>
      <i />
      <i />
      <i />
      <i />
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

export function PageControl({ count, index, defaultIndex = 0, onIndexChange, prominent, className, ...rest }) {
  const [i, setI] = useControllable(index, defaultIndex, onIndexChange);
  const ref = useRef(null);
  useLiquidGlass(ref);
  return (
    <div ref={ref} className={cx('lg-page-control', prominent && 'lg-glass', className)} data-lg-controlled="" {...rest}>
      {Array.from({ length: count }, (_, n) => (
        <button key={n} type="button" aria-label={`Page ${n + 1}`} aria-current={n === i ? 'true' : undefined} onClick={() => setI(n)} />
      ))}
    </div>
  );
}

export function Badge({ color, className, style, ...rest }) {
  return <span className={cx('lg-badge', className)} style={tintStyle(color, style, '--lg-badge-color')} {...rest} />;
}

/* ==========================================================================
   macOS window chrome
   ========================================================================== */

export function TrafficLights({ className, onClose, onMinimize, onZoom, ...rest }) {
  return (
    <div className={cx('lg-traffic-lights', className)} {...rest}>
      <span role={onClose ? 'button' : undefined} aria-label={onClose ? 'Close' : undefined} onClick={onClose} />
      <span role={onMinimize ? 'button' : undefined} aria-label={onMinimize ? 'Minimize' : undefined} onClick={onMinimize} />
      <span role={onZoom ? 'button' : undefined} aria-label={onZoom ? 'Zoom' : undefined} onClick={onZoom} />
    </div>
  );
}

export function Window({ title, toolbar, sidebar, trafficLights = true, className, children, style, sidebarWidth = 240, ...rest }) {
  return (
    <div
      className={cx('lg-window', sidebar && 'lg-window--sidebar', className)}
      style={sidebar ? { ...style, '--lg-sidebar-width': sidebarWidth + 'px' } : style}
      {...rest}
    >
      <div className="lg-window-body">
        {sidebar && <Sidebar>{sidebar}</Sidebar>}
        <div className="lg-window-main">{children}</div>
        <div className="lg-window-toolbar lg-drag">
          {trafficLights && <TrafficLights />}
          {title && <span className="lg-window-title">{title}</span>}
          <span className="lg-spacer" />
          <div className="lg-no-drag">{toolbar}</div>
        </div>
      </div>
    </div>
  );
}
