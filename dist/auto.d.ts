/**
 * Liquid Glass Kit — Apple-style Liquid Glass UI for the web.
 * All functions are safe to import on the server; they do nothing until
 * called in a browser.
 */

export declare const version: string;

export interface LiquidGlassConfig {
  /** `'auto'` enables SVG refraction on Chromium engines (Chrome, Edge, Opera, Electron). Default `'auto'`. */
  refraction?: boolean | 'auto';
  /** Specular rim follows the pointer. Default `true`. */
  dynamicLight?: boolean;
  /** Enhance components added to the DOM after `start()`. Default `true`. */
  observe?: boolean;
}

export interface RefractionOptions {
  /** Width of the refracting rim in CSS px. Default: 30% of the short side, clamped 6–28. */
  bezel?: number;
  /** Rim bend strength, 0–0.5. Default 0.45. */
  depth?: number;
  /** Uniform magnification (lens), e.g. 1.15. Default 1. */
  magnify?: number;
}

export type Theme = 'light' | 'dark' | 'auto';

/** Installs global behaviors and enhances the document. Idempotent. Returns `stop`. */
export declare function start(options?: LiquidGlassConfig): () => void;
export declare function stop(): void;
export declare function isStarted(): boolean;
export declare function configure(options: LiquidGlassConfig): Required<LiquidGlassConfig>;

/** Enhances every component inside `root` (default `document`). */
export declare function init<T extends Element | Document>(root?: T | string): T;
/** Enhances one element and returns a cleanup function. */
export declare function enhance(el: Element | string): () => void;
/** Undoes `init`/`enhance` for an element and its descendants. */
export declare function destroy(root: Element | string): void;
/** Programmatically selects an item of a segmented control, tab bar or page control. */
export declare function select(el: Element | string, index: number): void;
/** Re-measures an enhanced component after external layout changes. */
export declare function refresh(el: Element | string): void;

export declare function supportsRefraction(): boolean;
export declare function refract<T extends Element>(el: T | string, options?: RefractionOptions): T;
export declare function unrefract(el: Element | string): void;
export declare function createDisplacementMap(
  width: number,
  height: number,
  radius: number,
  bezel: number,
  depth: number,
  magnify: number
): { url: string; scale: number; width: number; height: number };

export declare function setTheme(theme: Theme, root?: Element | string): void;

export interface AlertAction<V = string> {
  label: string;
  value?: V;
  /** `cancel` answers Escape; `destructive` renders red. */
  role?: 'cancel' | 'destructive' | 'default';
  /** Accent-filled button for the preferred action. */
  prominent?: boolean;
  destructive?: boolean;
}

export interface AlertOptions<V = string> {
  title?: string;
  message?: string;
  actions?: AlertAction<V>[];
  /** HTML string or element placed above the buttons. */
  content?: string | Element;
  /** Adds a text field; the promise then resolves with `{ action, value }`. */
  input?: { type?: string; placeholder?: string; value?: string; label?: string };
  stacked?: boolean;
  dismissOnOverlay?: boolean;
}

export declare function alert<V = string>(options: AlertOptions<V> | string): Promise<V | string | null | { action: V | string | null; value: string }>;

export interface ActionSheetOptions<V = string> {
  title?: string;
  message?: string;
  actions: AlertAction<V>[];
}
export declare function actionSheet<V = string>(options: ActionSheetOptions<V>): Promise<V | string | null>;

export interface ToastOptions {
  title?: string;
  message?: string;
  /** HTML (e.g. an inline SVG) shown in the icon tile. */
  icon?: string;
  iconBackground?: string;
  time?: string;
  /** Milliseconds; 0 keeps it until dismissed. Default 4000. */
  duration?: number;
  onClick?: () => void;
}
export declare function toast(options: ToastOptions | string): { close(): void; element: HTMLElement | null };

export interface MenuItemSpec {
  label: string;
  value?: string | number;
  /** HTML string, e.g. an inline SVG. */
  icon?: string;
  shortcut?: string;
  destructive?: boolean;
  disabled?: boolean;
  checked?: boolean;
}
export declare function menu(
  anchor: Element | string | { x: number; y: number },
  items: Array<MenuItemSpec | '-' | { separator: true } | { title: string }>,
  options?: { placement?: 'top' | 'bottom' }
): Promise<string | null>;

export declare function openPopover(
  panel: Element | string,
  anchor?: Element | string | null,
  options?: { placement?: 'top' | 'bottom'; x?: number; y?: number; focus?: boolean }
): void;
export declare function closePopover(immediate?: boolean): void;

export interface SheetController {
  readonly el: HTMLElement;
  readonly isOpen: boolean;
  detent: string | null;
  open(detent?: string): SheetController;
  close(): SheetController;
  toggle(detent?: string): SheetController;
  setDetent(detent: string): SheetController;
  detents(): string[];
}
export declare function sheet(target: Element | string): SheetController | null;

declare global {
  interface Window {
    /** Present when the script-tag build (`dist/liquid-glass.js`) is loaded. */
    LiquidGlass?: typeof import('./index');
    /** Read by the script-tag build before it starts. */
    LiquidGlassConfig?: LiquidGlassConfig;
  }
}
