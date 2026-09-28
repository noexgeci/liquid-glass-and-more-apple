'use client';
/*! Liquid Glass Kit v0.1.0 | MIT | https://github.com/noexgeci/liquid-glass-and-more-apple */

// src/react.jsx
import * as React from "react";
import { createPortal } from "react-dom";
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
  version as version2,
  icons,
  icon,
  iconNames
} from "./liquid-glass.mjs";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var { forwardRef, useEffect, useLayoutEffect, useRef, useState, useCallback, useImperativeHandle } = React;
var useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
var idCounter = 0;
var useStableId = React.useId || function useFallbackId() {
  const ref = useRef(null);
  if (ref.current == null) ref.current = "lg" + ++idCounter;
  return ref.current;
};
var REACT_MAJOR = parseInt(React.version, 10) || 18;
function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}
function useMergedRef(forwarded) {
  const local = useRef(null);
  useImperativeHandle(forwarded, () => local.current, []);
  return local;
}
function useLiquidGlass(ref) {
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return void 0;
    init(el);
    return () => destroy(el);
  }, []);
}
function useControllable(value, defaultValue, onChange) {
  const [inner, setInner] = useState(defaultValue);
  const controlled = value !== void 0;
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
function tintStyle(tint, style, prop = "--lg-tint") {
  if (!tint) return style;
  const color = /^(red|orange|yellow|green|mint|teal|cyan|blue|indigo|purple|pink|brown|gray)$/.test(tint) ? `var(--lg-${tint})` : tint;
  return { ...style, [prop]: color };
}
function Icon({ name, size = 24, strokeWidth = 1.9, label, className, style, ...rest }) {
  const body = icons[name];
  if (!body) return null;
  return /* @__PURE__ */ jsx(
    "svg",
    {
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      style,
      role: label ? "img" : void 0,
      "aria-label": label,
      "aria-hidden": label ? void 0 : true,
      dangerouslySetInnerHTML: { __html: body.replace(/ data-fill=""/g, ' fill="currentColor" stroke="none"') },
      ...rest
    }
  );
}
function LiquidGlassProvider({ children, theme, refraction, dynamicLight }) {
  useEffect(() => {
    const opts = {};
    if (refraction !== void 0) opts.refraction = refraction;
    if (dynamicLight !== void 0) opts.dynamicLight = dynamicLight;
    start(opts);
  }, []);
  useEffect(() => {
    if (theme) setTheme(theme);
  }, [theme]);
  return children === void 0 ? null : children;
}
var GLASS_VARIANTS = { regular: "", clear: "lg-glass--clear", tinted: "lg-glass--tinted", prominent: "lg-glass--prominent", thick: "lg-glass--thick", opaque: "lg-glass--opaque", dimmed: "lg-glass--dimmed" };
var Glass = forwardRef(function Glass2({ as: Tag = "div", variant = "regular", shape, tint, interactive, flat, bezel, depth, magnify, className, style, children, ...rest }, ref) {
  const local = useMergedRef(ref);
  useLiquidGlass(local);
  return /* @__PURE__ */ jsx(
    Tag,
    {
      ref: local,
      className: cx(
        "lg-glass",
        GLASS_VARIANTS[variant],
        shape === "capsule" && "lg-glass--capsule",
        shape === "circle" && "lg-glass--circle",
        interactive && "lg-glass--interactive",
        flat && "lg-glass--flat",
        className
      ),
      style: tintStyle(tint, style),
      "data-lg-bezel": bezel,
      "data-lg-depth": depth,
      "data-lg-magnify": magnify,
      ...rest,
      children
    }
  );
});
function ScrollEdge({ position = "top", className, ...rest }) {
  return /* @__PURE__ */ jsx("div", { "aria-hidden": "true", className: cx("lg-scroll-edge", position === "bottom" && "lg-scroll-edge--bottom", className), ...rest });
}
var BUTTON_SIZES = { mini: "lg-button--mini", small: "lg-button--small", regular: "", large: "lg-button--large", xl: "lg-button--xl" };
var Button = forwardRef(function Button2({ as, variant = "glass", size = "regular", shape = "capsule", icon: icon2, destructive, tint, block, className, style, children, type, ...rest }, ref) {
  const local = useMergedRef(ref);
  useLiquidGlass(local);
  const Tag = as || (rest.href ? "a" : "button");
  const iconOnly = shape === "circle" || icon2 && !children;
  return /* @__PURE__ */ jsxs(
    Tag,
    {
      ref: local,
      type: Tag === "button" ? type || "button" : type,
      className: cx(
        "lg-button",
        variant !== "glass" && `lg-button--${variant}`,
        BUTTON_SIZES[size],
        iconOnly && "lg-button--icon",
        shape === "rounded" && "lg-button--rounded",
        destructive && "lg-button--destructive",
        block && "lg-button--block",
        className
      ),
      style: tintStyle(tint, style),
      ...rest,
      children: [
        icon2,
        children
      ]
    }
  );
});
var ButtonGroup = forwardRef(function ButtonGroup2({ className, children, height, style, ...rest }, ref) {
  const local = useMergedRef(ref);
  useLiquidGlass(local);
  return /* @__PURE__ */ jsx("div", { ref: local, role: "group", className: cx("lg-group lg-glass", className), style: height ? { ...style, "--lg-group-height": height + "px" } : style, ...rest, children });
});
var Switch = forwardRef(function Switch2({ checked, defaultChecked = false, onCheckedChange, onChange, disabled, size, tint, className, style, id, name, value, "aria-label": ariaLabel, label, ...rest }, ref) {
  const local = useRef(null);
  useLiquidGlass(local);
  const [on, setOn] = useControllable(checked, defaultChecked, onCheckedChange);
  return /* @__PURE__ */ jsxs("label", { ref: local, className: cx("lg-switch", size === "small" && "lg-switch--small", className), style: tintStyle(tint, style, "--lg-switch-tint"), ...rest, children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        ref,
        type: "checkbox",
        role: "switch",
        id,
        name,
        value,
        "aria-label": ariaLabel || label,
        checked: on,
        disabled,
        onChange: (e) => {
          setOn(e.target.checked);
          if (onChange) onChange(e);
        }
      }
    ),
    /* @__PURE__ */ jsx("span", { className: "lg-switch-thumb", "aria-hidden": "true" })
  ] });
});
var Slider = forwardRef(function Slider2({ value, defaultValue = 50, min = 0, max = 100, step = 1, onValueChange, onChange, ticks, minIcon, maxIcon, tint, disabled, className, style, "aria-label": ariaLabel, label, ...rest }, ref) {
  const local = useRef(null);
  useLiquidGlass(local);
  const [v, setV] = useControllable(value, defaultValue, onValueChange);
  const ratio = max > min ? (Number(v) - min) / (max - min) : 0;
  useEffect(() => {
    if (local.current) refresh(local.current);
  }, [v]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: local,
      "data-lg-controlled": "",
      className: cx("lg-slider is-ready", className),
      style: { ...tintStyle(tint, style, "--lg-slider-tint"), "--_ratio": Math.min(1, Math.max(0, ratio)).toFixed(4) },
      ...rest,
      children: [
        minIcon,
        /* @__PURE__ */ jsxs("div", { className: "lg-slider-body", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              ref,
              type: "range",
              min,
              max,
              step,
              value: v,
              disabled,
              "aria-label": ariaLabel || label,
              onChange: (e) => {
                setV(Number(e.target.value));
                if (onChange) onChange(e);
              }
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "lg-slider-track", "aria-hidden": "true", children: /* @__PURE__ */ jsx("div", { className: "lg-slider-fill" }) }),
          ticks > 1 && /* @__PURE__ */ jsx("div", { className: "lg-slider-ticks", "aria-hidden": "true", children: Array.from({ length: ticks }, (_, i) => /* @__PURE__ */ jsx("i", {}, i)) }),
          /* @__PURE__ */ jsx("div", { className: "lg-slider-thumb", "aria-hidden": "true" })
        ] }),
        maxIcon
      ]
    }
  );
});
var SegmentedControl = forwardRef(function SegmentedControl2({ options, value, defaultValue, onValueChange, name, size, block, className, "aria-label": ariaLabel, ...rest }, ref) {
  const local = useMergedRef(ref);
  const autoName = "lg-seg-" + useStableId().replace(/[^a-zA-Z0-9_-]/g, "");
  const items = (options || []).map((o) => typeof o === "object" ? o : { value: o, label: String(o) });
  const [v, setV] = useControllable(value, defaultValue !== void 0 ? defaultValue : items[0] && items[0].value, onValueChange);
  useLiquidGlass(local);
  useEffect(() => {
    if (local.current) refresh(local.current);
  }, [v]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: local,
      role: "radiogroup",
      "aria-label": ariaLabel,
      className: cx("lg-segmented", size === "small" && "lg-segmented--small", block && "lg-segmented--block", className),
      ...rest,
      children: [
        /* @__PURE__ */ jsx("span", { className: "lg-segmented-indicator", "aria-hidden": "true" }),
        items.map((o) => /* @__PURE__ */ jsxs("label", { title: o.title, children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "radio",
              name: name || autoName,
              value: String(o.value),
              checked: o.value === v,
              disabled: o.disabled,
              onChange: () => setV(o.value),
              "aria-label": o.label ? void 0 : o["aria-label"]
            }
          ),
          o.icon,
          o.label
        ] }, String(o.value)))
      ]
    }
  );
});
var Stepper = forwardRef(function Stepper2({ value, defaultValue = 0, min = -Infinity, max = Infinity, step = 1, onValueChange, className, decrementLabel = "Decrement", incrementLabel = "Increment", ...rest }, ref) {
  const [v, setV] = useControllable(value, defaultValue, onValueChange);
  const change = (dir) => {
    const next = Math.min(max, Math.max(min, Math.round((v + dir * step) * 1e6) / 1e6));
    if (next !== v) setV(next);
  };
  return /* @__PURE__ */ jsxs("div", { ref, className: cx("lg-stepper", className), "data-lg-controlled": "", ...rest, children: [
    /* @__PURE__ */ jsx("button", { type: "button", "aria-label": decrementLabel, disabled: v <= min, onClick: () => change(-1), children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M5 12h14", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round" }) }) }),
    /* @__PURE__ */ jsx("span", { className: "lg-stepper-divider", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx("button", { type: "button", "aria-label": incrementLabel, disabled: v >= max, onClick: () => change(1), children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M5 12h14M12 5v14", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round" }) }) })
  ] });
});
var TextField = forwardRef(function TextField2({ multiline, className, ...rest }, ref) {
  const Tag = multiline ? "textarea" : "input";
  return /* @__PURE__ */ jsx(Tag, { ref, className: cx("lg-textfield", className), ...rest });
});
var SEARCH_ICON = /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", children: [
  /* @__PURE__ */ jsx("circle", { cx: "10.5", cy: "10.5", r: "6.5" }),
  /* @__PURE__ */ jsx("path", { d: "M15.5 15.5l4.5 4.5" })
] });
var SearchField = forwardRef(function SearchField2({ glass = true, size, className, style, trailing, placeholder = "Search", ...rest }, ref) {
  const wrap = useRef(null);
  useLiquidGlass(wrap);
  return /* @__PURE__ */ jsxs("div", { ref: wrap, className: cx("lg-search", glass && "lg-glass", size === "small" && "lg-search--small", className), style, children: [
    SEARCH_ICON,
    /* @__PURE__ */ jsx("input", { ref, type: "search", placeholder, ...rest }),
    trailing
  ] });
});
var Checkbox = forwardRef(function Checkbox2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx("input", { ref, type: "checkbox", className: cx("lg-checkbox", className), ...rest });
});
var NavigationBar = forwardRef(function NavigationBar2({ title, large, leading, trailing, scrollTarget, threshold, edge, className, children, ...rest }, ref) {
  const local = useMergedRef(ref);
  useLiquidGlass(local);
  return /* @__PURE__ */ jsxs(
    "header",
    {
      ref: local,
      className: cx("lg-navbar", large && "lg-navbar--large", edge && "lg-navbar--edge", className),
      "data-lg-scroll": scrollTarget,
      "data-lg-threshold": threshold,
      ...rest,
      children: [
        /* @__PURE__ */ jsx("div", { className: "lg-navbar-leading", children: leading }),
        title != null && /* @__PURE__ */ jsx("div", { className: "lg-navbar-title", children: title }),
        /* @__PURE__ */ jsx("div", { className: "lg-navbar-trailing", children: trailing }),
        children
      ]
    }
  );
});
function LargeTitle({ as: Tag = "h1", className, ...rest }) {
  return /* @__PURE__ */ jsx(Tag, { className: cx("lg-large-title-header", className), ...rest });
}
function Toolbar({ position = "bottom", className, ...rest }) {
  return /* @__PURE__ */ jsx("div", { className: cx("lg-toolbar", position === "top" && "lg-toolbar--top", className), ...rest });
}
function Spacer() {
  return /* @__PURE__ */ jsx("span", { className: "lg-spacer" });
}
var TabBar = forwardRef(function TabBar2({ items, value, defaultValue, onValueChange, search, onSearch, searchLabel = "Search", action, minimizeOnScroll, position = "fixed", tint, className, style, "aria-label": ariaLabel = "Tabs", ...rest }, ref) {
  const local = useMergedRef(ref);
  const list = items || [];
  const [v, setV] = useControllable(value, defaultValue !== void 0 ? defaultValue : list[0] && list[0].value, onValueChange);
  useLiquidGlass(local);
  useEffect(() => {
    const el = local.current;
    if (!el) return void 0;
    const onChange = (e) => {
      const item = list[e.detail.index];
      if (item && item.value !== v) setV(item.value);
    };
    el.addEventListener("lg-change", onChange);
    return () => el.removeEventListener("lg-change", onChange);
  });
  useEffect(() => {
    const idx = list.findIndex((i) => i.value === v);
    if (local.current && idx > -1) coreSelect(local.current, idx);
  }, [v]);
  const minimizeAttr = minimizeOnScroll === true ? "window" : minimizeOnScroll || void 0;
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      ref: local,
      "aria-label": ariaLabel,
      className: cx("lg-tabbar", position === "absolute" && "lg-tabbar--absolute", position === "static" && "lg-tabbar--static", className),
      style: tintStyle(tint, style, "--lg-tabbar-tint"),
      "data-lg-minimize-on-scroll": minimizeAttr,
      ...rest,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "lg-tabbar-tabs lg-glass", children: [
          /* @__PURE__ */ jsx("div", { className: "lg-tabbar-indicator", "aria-hidden": "true" }),
          list.map((item) => {
            const selected = item.value === v;
            const Tag = item.href ? "a" : "button";
            return /* @__PURE__ */ jsxs(
              Tag,
              {
                href: item.href,
                type: Tag === "button" ? "button" : void 0,
                className: cx("lg-tab", selected && "is-selected"),
                "aria-current": Tag === "a" && selected ? "page" : void 0,
                "aria-selected": Tag === "button" ? selected : void 0,
                role: Tag === "button" ? "tab" : void 0,
                "data-value": String(item.value),
                children: [
                  item.icon,
                  /* @__PURE__ */ jsx("span", { className: "lg-tab-label", children: item.label }),
                  item.badge != null && item.badge !== false && /* @__PURE__ */ jsx("span", { className: "lg-badge", children: item.badge })
                ]
              },
              String(item.value)
            );
          })
        ] }),
        action,
        search && /* @__PURE__ */ jsx("button", { type: "button", className: "lg-tabbar-search lg-glass", "aria-label": searchLabel, onClick: onSearch, children: search === true ? SEARCH_ICON : search }),
        /* @__PURE__ */ jsx("div", { className: "lg-tabbar-lens", "aria-hidden": "true" })
      ]
    }
  );
});
function Sidebar({ variant = "mac", className, children, ...rest }) {
  const ref = useRef(null);
  useLiquidGlass(ref);
  return /* @__PURE__ */ jsx("nav", { ref, className: cx("lg-sidebar lg-glass", variant === "ios" && "lg-sidebar--ios", className), ...rest, children });
}
function SidebarSection({ className, ...rest }) {
  return /* @__PURE__ */ jsx("div", { className: cx("lg-sidebar-section", className), ...rest });
}
function SidebarItem({ as, icon: icon2, selected, count, className, children, ...rest }) {
  const Tag = as || (rest.href ? "a" : "button");
  return /* @__PURE__ */ jsxs(
    Tag,
    {
      type: Tag === "button" ? "button" : void 0,
      className: cx("lg-sidebar-item", selected && "is-selected", className),
      "aria-current": selected ? "page" : void 0,
      ...rest,
      children: [
        icon2,
        /* @__PURE__ */ jsx("span", { children }),
        count != null && /* @__PURE__ */ jsx("span", { className: "lg-sidebar-count", children: count })
      ]
    }
  );
}
function GlobalNav({ brand, links, actions, className, ...rest }) {
  const ref = useRef(null);
  useLiquidGlass(ref);
  return /* @__PURE__ */ jsx("div", { className: cx("lg-globalnav", className), ...rest, children: /* @__PURE__ */ jsxs("nav", { ref, className: "lg-globalnav-bar lg-glass", children: [
    /* @__PURE__ */ jsx("div", { className: "lg-globalnav-brand", children: brand }),
    /* @__PURE__ */ jsx("div", { className: "lg-globalnav-links", children: (links || []).map((l) => /* @__PURE__ */ jsx("a", { href: l.href, "aria-current": l.current ? "page" : void 0, children: l.label }, l.href + l.label)) }),
    actions
  ] }) });
}
function List({ plain, className, children, ...rest }) {
  return /* @__PURE__ */ jsx("ul", { className: cx("lg-list", plain && "lg-list--plain", className), ...rest, children });
}
function ListSection({ header, footer, prominentHeader, className, children, ...rest }) {
  return /* @__PURE__ */ jsxs("section", { className: cx("lg-list-section", className), ...rest, children: [
    header != null && /* @__PURE__ */ jsx("div", { className: cx("lg-list-header", prominentHeader && "lg-list-header--prominent"), children: header }),
    /* @__PURE__ */ jsx("ul", { className: "lg-list", children }),
    footer != null && /* @__PURE__ */ jsx("div", { className: "lg-list-footer", children: footer })
  ] });
}
function ListRow({ as, icon: icon2, iconColor, title, subtitle, detail, chevron, checked, accessory, destructive, className, children, ...rest }) {
  const interactive = rest.onClick || rest.href;
  const Tag = as || (rest.href ? "a" : rest.onClick ? "button" : "li");
  const row = /* @__PURE__ */ jsxs(Tag, { type: Tag === "button" ? "button" : void 0, className: cx("lg-row", destructive && "lg-row--destructive", className), ...rest, children: [
    icon2 && /* @__PURE__ */ jsx("span", { className: "lg-row-icon", style: iconColor ? { "--lg-row-icon-bg": /^(red|orange|yellow|green|mint|teal|cyan|blue|indigo|purple|pink|brown|gray)$/.test(iconColor) ? `var(--lg-${iconColor})` : iconColor } : void 0, children: icon2 }),
    subtitle ? /* @__PURE__ */ jsxs("span", { className: "lg-row-content", children: [
      /* @__PURE__ */ jsx("span", { className: "lg-row-title", children: title }),
      /* @__PURE__ */ jsx("span", { className: "lg-row-subtitle", children: subtitle })
    ] }) : /* @__PURE__ */ jsx("span", { className: "lg-row-title", children: title }),
    children,
    detail != null && /* @__PURE__ */ jsx("span", { className: "lg-row-detail", children: detail }),
    accessory,
    checked && /* @__PURE__ */ jsx("span", { className: "lg-checkmark", "aria-label": "Selected" }),
    (chevron || chevron === void 0 && interactive && !checked && !accessory) && /* @__PURE__ */ jsx("span", { className: "lg-chevron", "aria-hidden": "true" })
  ] });
  return Tag === "li" ? row : /* @__PURE__ */ jsx("li", { children: row });
}
function usePortalTarget(enabled) {
  const [target, setTarget] = useState(null);
  useIsoLayoutEffect(() => {
    if (enabled) setTarget(document.body);
  }, [enabled]);
  return target;
}
var Sheet = forwardRef(function Sheet2({ open, onOpenChange, detents = ["medium", "large"], detent, onDetentChange, title, leading, trailing, grabber = true, contained, className, children, ...rest }, ref) {
  const local = useMergedRef(ref);
  const portal = usePortalTarget(!contained);
  const ctrl = useRef(null);
  const onOpenChangeRef = useRef(onOpenChange);
  onOpenChangeRef.current = onOpenChange;
  const onDetentRef = useRef(onDetentChange);
  onDetentRef.current = onDetentChange;
  useIsoLayoutEffect(() => {
    const el = local.current;
    if (!el) return void 0;
    ctrl.current = sheetController(el);
    const onClose = () => onOpenChangeRef.current && onOpenChangeRef.current(false);
    const onDetent = (e) => onDetentRef.current && onDetentRef.current(e.detail.detent);
    el.addEventListener("lg-close", onClose);
    el.addEventListener("lg-detent", onDetent);
    return () => {
      el.removeEventListener("lg-close", onClose);
      el.removeEventListener("lg-detent", onDetent);
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
  const node = /* @__PURE__ */ jsxs("div", { ref: local, className: cx("lg-sheet lg-glass", contained && "lg-sheet--contained", className), "data-lg-detents": detents.join(" "), hidden: true, ...rest, children: [
    grabber && /* @__PURE__ */ jsx("div", { className: "lg-sheet-grabber" }),
    (title != null || leading || trailing) && /* @__PURE__ */ jsxs("div", { className: "lg-sheet-header", children: [
      /* @__PURE__ */ jsx("div", { children: leading }),
      title != null ? /* @__PURE__ */ jsx("h2", { className: "lg-sheet-title", children: title }) : /* @__PURE__ */ jsx("span", {}),
      /* @__PURE__ */ jsx("div", { children: trailing })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "lg-sheet-content", children })
  ] });
  if (contained) return node;
  return portal ? createPortal(node, portal) : null;
});
function Menu({ trigger, children, placement, className, onOpenChange, popover, ...rest }) {
  const panelRef = useRef(null);
  const triggerRef = useRef(null);
  const portal = usePortalTarget(true);
  const onOpenChangeRef = useRef(onOpenChange);
  onOpenChangeRef.current = onOpenChange;
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return void 0;
    const onOpen = () => onOpenChangeRef.current && onOpenChangeRef.current(true);
    const onClose = () => onOpenChangeRef.current && onOpenChangeRef.current(false);
    el.addEventListener("lg-open", onOpen);
    el.addEventListener("lg-close", onClose);
    return () => {
      el.removeEventListener("lg-open", onOpen);
      el.removeEventListener("lg-close", onClose);
      unrefract(el);
    };
  }, [portal]);
  const triggerEl = React.isValidElement(trigger) ? React.cloneElement(trigger, {
    ref: (node) => {
      triggerRef.current = node;
      const r = REACT_MAJOR >= 19 ? trigger.props.ref : trigger.ref;
      if (typeof r === "function") r(node);
      else if (r) r.current = node;
    },
    "aria-haspopup": popover ? "dialog" : "menu",
    "aria-expanded": false,
    onClick: (e) => {
      if (trigger.props.onClick) trigger.props.onClick(e);
      if (!e.defaultPrevented && panelRef.current) openPopover(panelRef.current, triggerRef.current, { placement });
    }
  }) : trigger;
  const panel = /* @__PURE__ */ jsx("div", { ref: panelRef, role: popover ? "dialog" : "menu", className: cx(popover ? "lg-popover" : "lg-menu", "lg-glass", className), hidden: true, ...rest, children });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    triggerEl,
    portal && createPortal(panel, portal)
  ] });
}
function Popover(props) {
  return /* @__PURE__ */ jsx(Menu, { ...props, popover: true });
}
function MenuItem({ icon: icon2, onSelect, onClick, destructive, disabled, shortcut, detail, checked, keepOpen, className, children, ...rest }) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      role: checked !== void 0 ? "menuitemcheckbox" : "menuitem",
      "aria-checked": checked !== void 0 ? checked : void 0,
      disabled,
      "data-lg-keep-open": keepOpen ? "" : void 0,
      className: cx("lg-menu-item", destructive && "lg-menu-item--destructive", className),
      onClick: (e) => {
        if (onClick) onClick(e);
        if (onSelect) onSelect(e);
      },
      ...rest,
      children: [
        icon2,
        /* @__PURE__ */ jsx("span", { children }),
        shortcut && /* @__PURE__ */ jsx("span", { className: "lg-menu-shortcut", children: shortcut }),
        detail && /* @__PURE__ */ jsx("span", { className: "lg-menu-detail", children: detail })
      ]
    }
  );
}
function MenuSeparator({ line }) {
  return /* @__PURE__ */ jsx("div", { role: "separator", className: cx("lg-menu-separator", line && "lg-menu-separator--line") });
}
function MenuTitle({ className, ...rest }) {
  return /* @__PURE__ */ jsx("div", { className: cx("lg-menu-title", className), ...rest });
}
function ProgressBar({ value, max = 1, indeterminate, tint, className, style, ...rest }) {
  return /* @__PURE__ */ jsx(
    "progress",
    {
      className: cx("lg-progress", className),
      max,
      value: indeterminate ? void 0 : value,
      style: tintStyle(tint, style, "--lg-progress-tint"),
      ...rest
    }
  );
}
function ProgressRing({ value = 0, size = 28, stroke = 3.5, tint, className, style, ...rest }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      role: "progressbar",
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-valuenow": Math.round(value * 100),
      className: cx("lg-ring", className),
      style: { ...tintStyle(tint, style, "--lg-ring-tint"), "--lg-value": value, "--_size": size + "px", "--_stroke": stroke + "px" },
      ...rest
    }
  );
}
function Spinner({ size, className, label = "Loading", ...rest }) {
  return /* @__PURE__ */ jsxs("span", { role: "progressbar", "aria-label": label, className: cx("lg-spinner", size === "large" && "lg-spinner--large", className), ...rest, children: [
    /* @__PURE__ */ jsx("i", {}),
    /* @__PURE__ */ jsx("i", {}),
    /* @__PURE__ */ jsx("i", {}),
    /* @__PURE__ */ jsx("i", {}),
    /* @__PURE__ */ jsx("i", {}),
    /* @__PURE__ */ jsx("i", {}),
    /* @__PURE__ */ jsx("i", {}),
    /* @__PURE__ */ jsx("i", {})
  ] });
}
function PageControl({ count, index, defaultIndex = 0, onIndexChange, prominent, className, ...rest }) {
  const [i, setI] = useControllable(index, defaultIndex, onIndexChange);
  const ref = useRef(null);
  useLiquidGlass(ref);
  return /* @__PURE__ */ jsx("div", { ref, className: cx("lg-page-control", prominent && "lg-glass", className), "data-lg-controlled": "", ...rest, children: Array.from({ length: count }, (_, n) => /* @__PURE__ */ jsx("button", { type: "button", "aria-label": `Page ${n + 1}`, "aria-current": n === i ? "true" : void 0, onClick: () => setI(n) }, n)) });
}
function Badge({ color, className, style, ...rest }) {
  return /* @__PURE__ */ jsx("span", { className: cx("lg-badge", className), style: tintStyle(color, style, "--lg-badge-color"), ...rest });
}
function TrafficLights({ className, onClose, onMinimize, onZoom, ...rest }) {
  return /* @__PURE__ */ jsxs("div", { className: cx("lg-traffic-lights", className), ...rest, children: [
    /* @__PURE__ */ jsx("span", { role: onClose ? "button" : void 0, "aria-label": onClose ? "Close" : void 0, onClick: onClose }),
    /* @__PURE__ */ jsx("span", { role: onMinimize ? "button" : void 0, "aria-label": onMinimize ? "Minimize" : void 0, onClick: onMinimize }),
    /* @__PURE__ */ jsx("span", { role: onZoom ? "button" : void 0, "aria-label": onZoom ? "Zoom" : void 0, onClick: onZoom })
  ] });
}
function Window({ title, toolbar, sidebar, trafficLights = true, className, children, style, sidebarWidth = 240, ...rest }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cx("lg-window", sidebar && "lg-window--sidebar", className),
      style: sidebar ? { ...style, "--lg-sidebar-width": sidebarWidth + "px" } : style,
      ...rest,
      children: /* @__PURE__ */ jsxs("div", { className: "lg-window-body", children: [
        sidebar && /* @__PURE__ */ jsx(Sidebar, { children: sidebar }),
        /* @__PURE__ */ jsx("div", { className: "lg-window-main", children }),
        /* @__PURE__ */ jsxs("div", { className: "lg-window-toolbar lg-drag", children: [
          trafficLights && /* @__PURE__ */ jsx(TrafficLights, {}),
          title && /* @__PURE__ */ jsx("span", { className: "lg-window-title", children: title }),
          /* @__PURE__ */ jsx("span", { className: "lg-spacer" }),
          /* @__PURE__ */ jsx("div", { className: "lg-no-drag", children: toolbar })
        ] })
      ] })
    }
  );
}
export {
  Badge,
  Button,
  ButtonGroup,
  Checkbox,
  Glass,
  GlobalNav,
  Icon,
  LargeTitle,
  LiquidGlassProvider,
  List,
  ListRow,
  ListSection,
  Menu,
  MenuItem,
  MenuSeparator,
  MenuTitle,
  NavigationBar,
  PageControl,
  Popover,
  ProgressBar,
  ProgressRing,
  ScrollEdge,
  SearchField,
  SegmentedControl,
  Sheet,
  Sidebar,
  SidebarItem,
  SidebarSection,
  Slider,
  Spacer,
  Spinner,
  Stepper,
  Switch,
  TabBar,
  TextField,
  Toolbar,
  TrafficLights,
  Window,
  actionSheet,
  alert,
  closePopover as closeMenu,
  configure,
  icon,
  iconNames,
  icons,
  menu,
  refract,
  setTheme,
  start,
  stop,
  supportsRefraction,
  toast,
  unrefract,
  useLiquidGlass,
  version2 as version
};
