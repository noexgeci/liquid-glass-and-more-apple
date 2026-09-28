import * as React from 'react';
import type { LiquidGlassConfig, Theme } from './index';

export {
  alert,
  actionSheet,
  toast,
  menu,
  refract,
  unrefract,
  supportsRefraction,
  configure,
  setTheme,
  version,
  start,
  stop,
  icon,
  icons,
  iconNames,
  registerIcons,
  hasIcon,
  isRegisteredIcon,
  sfAliases,
} from './index';
export type { IconName } from './index';
export type { AlertOptions, AlertAction, ToastOptions, MenuItemSpec, SheetController, RefractionOptions, Theme } from './index';

type SystemColor = 'red' | 'orange' | 'yellow' | 'green' | 'mint' | 'teal' | 'cyan' | 'blue' | 'indigo' | 'purple' | 'pink' | 'brown' | 'gray';
/** A system color name or any CSS color. */
export type Tint = SystemColor | (string & {});

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name'> {
  /** Built-in name or SF Symbols name ("magnifyingglass", "chevron.left"). */
  name: import('./index').IconName | (string & {});
  size?: number;
  strokeWidth?: number;
  /** Accessible label; without it the icon is decorative (aria-hidden). */
  label?: string;
}
export declare function Icon(props: IconProps): React.ReactElement | null;

export interface LiquidGlassProviderProps {
  children?: React.ReactNode;
  theme?: Theme;
  refraction?: LiquidGlassConfig['refraction'];
  dynamicLight?: boolean;
}
export declare function LiquidGlassProvider(props: LiquidGlassProviderProps): React.ReactElement | null;

/** Attaches Liquid Glass behaviors to `ref.current` while mounted. */
export declare function useLiquidGlass(ref: React.RefObject<Element | null>): void;

export interface GlassProps extends DivProps {
  as?: React.ElementType;
  variant?: 'regular' | 'clear' | 'tinted' | 'prominent' | 'thick' | 'opaque' | 'dimmed';
  shape?: 'capsule' | 'circle';
  tint?: Tint;
  interactive?: boolean;
  flat?: boolean;
  /** Switch light/dark appearance with the content underneath (like iOS bars). */
  adaptive?: boolean;
  bezel?: number;
  depth?: number;
  magnify?: number;
  [key: string]: unknown;
}
export declare const Glass: React.ForwardRefExoticComponent<GlassProps & React.RefAttributes<HTMLElement>>;

export declare function ScrollEdge(props: DivProps & { position?: 'top' | 'bottom' }): React.ReactElement;

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  as?: React.ElementType;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'glass' | 'prominent' | 'clear' | 'bordered' | 'filled' | 'plain';
  /** HIG sizes: mini 28 · small 32 · regular 44 · large 52 · xl 64 */
  size?: 'mini' | 'small' | 'regular' | 'large' | 'xl';
  shape?: 'capsule' | 'circle' | 'rounded';
  icon?: React.ReactNode;
  destructive?: boolean;
  tint?: Tint;
  block?: boolean;
  [key: string]: unknown;
}
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLElement>>;

export interface ToggleButtonProps extends ButtonProps {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}
export declare const ToggleButton: React.ForwardRefExoticComponent<ToggleButtonProps & React.RefAttributes<HTMLElement>>;

export declare const Select: React.ForwardRefExoticComponent<
  React.SelectHTMLAttributes<HTMLSelectElement> & { plain?: boolean } & React.RefAttributes<HTMLSelectElement>
>;
export interface DisclosureProps extends Omit<React.DetailsHTMLAttributes<HTMLDetailsElement>, 'title'> {
  title: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}
export declare function Disclosure(props: DisclosureProps): React.ReactElement;
export declare function Card(props: React.HTMLAttributes<HTMLElement> & { as?: React.ElementType }): React.ReactElement;

export declare function Picker(props: DivProps & { rows?: number }): React.ReactElement;
export interface PickerColumnProps<V = string | number> extends Omit<DivProps, 'defaultValue' | 'onChange'> {
  items: Array<V | { value: V; label: React.ReactNode }>;
  value?: V;
  defaultValue?: V;
  onValueChange?: (value: V) => void;
  /** Accessible name of the column. */
  label?: string;
  /** Take the remaining width. */
  grow?: boolean;
}
export declare function PickerColumn<V = string | number>(props: PickerColumnProps<V>): React.ReactElement;

/** A calendar day as `YYYY-MM-DD`; Date objects are accepted and read as local days. */
export type DateValue = string | Date;
export interface CalendarProps extends Omit<DivProps, 'defaultValue' | 'onChange'> {
  /** Selected day (`YYYY-MM-DD`); `null` or `''` for none. */
  value?: DateValue | null;
  defaultValue?: DateValue;
  /** Called with the picked day as `YYYY-MM-DD`. */
  onValueChange?: (value: string) => void;
  min?: DateValue;
  max?: DateValue;
  /** BCP 47 locale for month and weekday names; defaults to the nearest `lang`. */
  locale?: string;
  /** 0 = Sunday … 6 = Saturday; defaults to the locale's first day of the week. */
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** Adds a hidden input with this name for form submission. */
  name?: string;
}
export declare const Calendar: React.ForwardRefExoticComponent<CalendarProps & React.RefAttributes<HTMLDivElement>>;
export interface DatePickerProps extends CalendarProps {
  /** Text on the capsule while no day is picked. */
  placeholder?: string;
}
export declare const DatePicker: React.ForwardRefExoticComponent<DatePickerProps & React.RefAttributes<HTMLDivElement>>;

export declare const ButtonGroup: React.ForwardRefExoticComponent<DivProps & { height?: number } & React.RefAttributes<HTMLDivElement>>;

type InputBase = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'size' | 'type' | 'checked' | 'defaultChecked'>;

export interface SwitchProps extends InputBase {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: 'regular' | 'small';
  tint?: Tint;
  /** Accessible label (aria-label). */
  label?: string;
}
export declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLInputElement>>;

export interface SliderProps extends InputBase {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  /** Number of tick marks under the track. */
  ticks?: number;
  minIcon?: React.ReactNode;
  maxIcon?: React.ReactNode;
  tint?: Tint;
  label?: string;
}
export declare const Slider: React.ForwardRefExoticComponent<SliderProps & React.RefAttributes<HTMLInputElement>>;

export interface SegmentOption<V> {
  value: V;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  title?: string;
  disabled?: boolean;
  'aria-label'?: string;
}
export interface SegmentedControlProps<V = string> extends Omit<DivProps, 'defaultValue' | 'onChange'> {
  options: Array<SegmentOption<V> | V>;
  value?: V;
  defaultValue?: V;
  onValueChange?: (value: V) => void;
  name?: string;
  size?: 'regular' | 'small';
  block?: boolean;
}
export declare const SegmentedControl: <V = string>(props: SegmentedControlProps<V> & React.RefAttributes<HTMLDivElement>) => React.ReactElement;

export interface StepperProps extends Omit<DivProps, 'defaultValue' | 'onChange'> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  decrementLabel?: string;
  incrementLabel?: string;
}
export declare const Stepper: React.ForwardRefExoticComponent<StepperProps & React.RefAttributes<HTMLDivElement>>;

export declare const TextField: React.ForwardRefExoticComponent<
  (React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement> & { multiline?: boolean }) &
    React.RefAttributes<HTMLInputElement | HTMLTextAreaElement>
>;

export interface SearchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  glass?: boolean;
  size?: 'regular' | 'small';
  trailing?: React.ReactNode;
}
export declare const SearchField: React.ForwardRefExoticComponent<SearchFieldProps & React.RefAttributes<HTMLInputElement>>;

export declare const Checkbox: React.ForwardRefExoticComponent<React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>>;

export interface NavigationBarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title?: React.ReactNode;
  /** Pair with <LargeTitle>: the inline title appears after scrolling past it. */
  large?: boolean;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  /** CSS selector of the scroll container, or "window". Default: nearest scrolling ancestor. */
  scrollTarget?: string;
  threshold?: number;
  /** Always show the scroll edge effect. */
  edge?: boolean;
  /** Switch light/dark appearance with the content underneath. */
  adaptive?: boolean;
}
export declare const NavigationBar: React.ForwardRefExoticComponent<NavigationBarProps & React.RefAttributes<HTMLElement>>;
export declare function LargeTitle(props: React.HTMLAttributes<HTMLHeadingElement> & { as?: React.ElementType }): React.ReactElement;
export declare function Toolbar(props: DivProps & { position?: 'top' | 'bottom' }): React.ReactElement;
export declare function Spacer(): React.ReactElement;

export interface TabItem<V = string> {
  value: V;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  href?: string;
}
export interface TabBarProps<V = string> extends Omit<React.HTMLAttributes<HTMLElement>, 'defaultValue' | 'onChange'> {
  items: TabItem<V>[];
  value?: V;
  defaultValue?: V;
  onValueChange?: (value: V) => void;
  /** `true` shows the default magnifier; pass a node for a custom icon. */
  search?: boolean | React.ReactNode;
  onSearch?: () => void;
  searchLabel?: string;
  /** Extra element between the tabs and the search button (e.g. a mini player). */
  action?: React.ReactNode;
  /** `true` watches the window; a CSS selector watches that scroll container. */
  minimizeOnScroll?: boolean | string;
  position?: 'fixed' | 'absolute' | 'static';
  tint?: Tint;
  /** Switch light/dark appearance with the content underneath. */
  adaptive?: boolean;
}
export declare const TabBar: <V = string>(props: TabBarProps<V> & React.RefAttributes<HTMLElement>) => React.ReactElement;

export declare function Sidebar(props: React.HTMLAttributes<HTMLElement> & { variant?: 'mac' | 'ios' }): React.ReactElement;
export declare function SidebarSection(props: DivProps): React.ReactElement;
export declare function SidebarItem(
  props: React.HTMLAttributes<HTMLElement> & { as?: React.ElementType; href?: string; icon?: React.ReactNode; selected?: boolean; count?: React.ReactNode }
): React.ReactElement;

export interface GlobalNavProps extends DivProps {
  brand?: React.ReactNode;
  links?: Array<{ href: string; label: React.ReactNode; current?: boolean }>;
  actions?: React.ReactNode;
}
export declare function GlobalNav(props: GlobalNavProps): React.ReactElement;

export declare function List(props: React.HTMLAttributes<HTMLUListElement> & { plain?: boolean }): React.ReactElement;
export declare function ListSection(
  props: Omit<React.HTMLAttributes<HTMLElement>, 'title'> & { header?: React.ReactNode; footer?: React.ReactNode; prominentHeader?: boolean }
): React.ReactElement;
export interface ListRowProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  as?: React.ElementType;
  href?: string;
  icon?: React.ReactNode;
  iconColor?: Tint;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  detail?: React.ReactNode;
  chevron?: boolean;
  checked?: boolean;
  accessory?: React.ReactNode;
  destructive?: boolean;
  [key: string]: unknown;
}
export declare function ListRow(props: ListRowProps): React.ReactElement;

export interface SheetProps extends Omit<DivProps, 'title'> {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Heights the sheet rests at: 'medium', 'large', '40%', or px numbers as strings. */
  detents?: string[];
  detent?: string;
  onDetentChange?: (detent: string) => void;
  title?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  grabber?: boolean;
  /** Position inside the nearest positioned ancestor instead of the viewport. */
  contained?: boolean;
}
export declare const Sheet: React.ForwardRefExoticComponent<SheetProps & React.RefAttributes<HTMLDivElement>>;

export interface MenuProps extends DivProps {
  /** A single element that opens the menu on click (e.g. a <Button>). */
  trigger: React.ReactElement;
  placement?: 'top' | 'bottom';
  onOpenChange?: (open: boolean) => void;
}
export declare function Menu(props: MenuProps): React.ReactElement;
export declare function Popover(props: MenuProps): React.ReactElement;
export interface MenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  onSelect?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  destructive?: boolean;
  shortcut?: React.ReactNode;
  detail?: React.ReactNode;
  checked?: boolean;
  keepOpen?: boolean;
}
export declare function MenuItem(props: MenuItemProps): React.ReactElement;
export declare function MenuSeparator(props: { line?: boolean }): React.ReactElement;
export declare function MenuTitle(props: DivProps): React.ReactElement;
export declare function closeMenu(immediate?: boolean): void;

export declare function ProgressBar(
  props: Omit<React.ProgressHTMLAttributes<HTMLProgressElement>, 'value'> & { value?: number; max?: number; indeterminate?: boolean; tint?: Tint }
): React.ReactElement;
export declare function ProgressRing(
  props: React.HTMLAttributes<HTMLSpanElement> & { value?: number; size?: number; stroke?: number; tint?: Tint }
): React.ReactElement;
export declare function Spinner(props: React.HTMLAttributes<HTMLSpanElement> & { size?: 'regular' | 'large'; label?: string }): React.ReactElement;
export declare function PageControl(
  props: Omit<DivProps, 'onChange'> & { count: number; index?: number; defaultIndex?: number; onIndexChange?: (index: number) => void; prominent?: boolean }
): React.ReactElement;
export declare function Badge(props: React.HTMLAttributes<HTMLSpanElement> & { color?: Tint }): React.ReactElement;

export declare function TrafficLights(
  props: DivProps & { onClose?: () => void; onMinimize?: () => void; onZoom?: () => void }
): React.ReactElement;
export interface WindowProps extends Omit<DivProps, 'title'> {
  title?: React.ReactNode;
  toolbar?: React.ReactNode;
  sidebar?: React.ReactNode;
  sidebarWidth?: number;
  trafficLights?: boolean;
}
export declare function Window(props: WindowProps): React.ReactElement;
