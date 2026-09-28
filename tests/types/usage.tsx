// Compile-only test: every public API used the way the README documents it.
import { useRef, useState } from 'react';
import {
  start,
  stop,
  init,
  enhance,
  destroy,
  refresh,
  select,
  alert,
  actionSheet,
  toast,
  menu,
  sheet,
  openPopover,
  closePopover,
  refract,
  unrefract,
  supportsRefraction,
  setTheme,
  configure,
  icon,
  registerIcons,
  hasIcon,
  version,
  type IconName,
} from 'liquid-glass-kit';
import {
  LiquidGlassProvider,
  useLiquidGlass,
  Glass,
  Button,
  ToggleButton,
  ButtonGroup,
  Switch,
  Slider,
  SegmentedControl,
  Stepper,
  TextField,
  SearchField,
  Select,
  Checkbox,
  NavigationBar,
  LargeTitle,
  Toolbar,
  Spacer,
  TabBar,
  Sidebar,
  SidebarSection,
  SidebarItem,
  GlobalNav,
  List,
  ListSection,
  ListRow,
  Disclosure,
  Card,
  Sheet,
  Menu,
  Popover,
  MenuItem,
  MenuSeparator,
  MenuTitle,
  ProgressBar,
  ProgressRing,
  Spinner,
  PageControl,
  Badge,
  Window,
  TrafficLights,
  ScrollEdge,
  Icon,
  Picker,
  PickerColumn,
} from 'liquid-glass-kit/react';

async function vanilla() {
  const off: () => void = start({ refraction: 'auto', dynamicLight: true });
  stop();
  off();
  init(document);
  const cleanup = enhance('#el');
  cleanup();
  destroy(document.body);
  refresh('.lg-segmented');
  select('.lg-tabbar', 1);
  const choice = await alert({ title: 'T', actions: [{ label: 'OK', prominent: true }, { label: 'Cancel', role: 'cancel' }] });
  const picked = await actionSheet({ actions: [{ label: 'Delete', role: 'destructive' }] });
  const t = toast({ title: 'Hi', icon: icon('magnifyingglass'), duration: 0 });
  t.close();
  const m: string | null = await menu({ x: 10, y: 10 }, [{ label: 'Copy', value: 'copy' }, '-', { title: 'Section' }]);
  const s = sheet('#sheet');
  s?.open('medium').setDetent('large').close();
  openPopover('#pop', null, { x: 1, y: 2 });
  closePopover();
  refract(document.body, { bezel: 12, depth: 0.4, magnify: 1.2 });
  unrefract(document.body);
  const ok: boolean = supportsRefraction() && hasIcon('chevron.left');
  setTheme('dark');
  configure({ refraction: false });
  registerIcons({ magnifyingglass: '<svg viewBox="0 0 20 20"></svg>' });
  const n: IconName = 'house';
  return [choice, picked, m, ok, n, version];
}

function App() {
  const [on, setOn] = useState(false);
  const [v, setV] = useState(40);
  const [seg, setSeg] = useState<'a' | 'b'>('a');
  const [tab, setTab] = useState('home');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useLiquidGlass(ref);
  return (
    <LiquidGlassProvider theme="auto" refraction="auto">
      <GlobalNav brand="Brand" links={[{ href: '#', label: 'Home', current: true }]} actions={<Button size="small">Buy</Button>} />
      <NavigationBar large title="Title" leading={<Button shape="circle" icon={<Icon name="chevron.left" />} aria-label="Back" />} trailing={<Button variant="prominent">Done</Button>} />
      <LargeTitle>Title</LargeTitle>
      <div ref={ref}>
        <Glass variant="clear" shape="capsule" tint="indigo" interactive bezel={20} magnify={1.2} style={{ padding: 12 }}>
          <Button variant="glass" size="large" tint="orange" destructive block onClick={() => setOn(!on)}>
            Go
          </Button>
          <ToggleButton pressed={on} onPressedChange={setOn} icon={<Icon name="heart.fill" size={18} />}>
            Favorite
          </ToggleButton>
          <ButtonGroup height={36}>
            <Button shape="circle" icon={<Icon name="square.and.arrow.up" />} aria-label="Share" />
          </ButtonGroup>
        </Glass>
      </div>
      <Switch checked={on} onCheckedChange={setOn} label="Wi-Fi" tint="green" size="small" />
      <Slider value={v} onValueChange={setV} min={0} max={100} ticks={5} minIcon={<Icon name="speaker.slash" />} label="Volume" />
      <SegmentedControl<'a' | 'b'> value={seg} onValueChange={setSeg} options={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]} block />
      <Stepper value={v} onValueChange={setV} min={0} max={10} />
      <TextField placeholder="Name" />
      <TextField multiline rows={3} />
      <SearchField placeholder="Search" trailing={<Icon name="mic" />} />
      <Select defaultValue="a">
        <option value="a">A</option>
      </Select>
      <Checkbox defaultChecked />
      <ListSection header="Header" footer="Footer">
        <ListRow icon={<Icon name="wifi" />} iconColor="blue" title="Wi-Fi" detail="Home" onClick={() => setOpen(true)} />
        <ListRow title="Plain" accessory={<Switch label="x" />} />
        <ListRow title="Checked" checked />
      </ListSection>
      <List plain>
        <ListRow title="Row" href="#" />
      </List>
      <Disclosure title="More" defaultOpen onOpenChange={(o) => o}>
        Content
      </Disclosure>
      <Card as="section">Card</Card>
      <Picker rows={5} aria-label="Time">
        <PickerColumn<number> items={[1, 2, 3]} value={v} onValueChange={setV} label="Hours" />
        <PickerColumn items={[{ value: 'am', label: 'AM' }]} defaultValue="am" grow />
      </Picker>
      <Sheet open={open} onOpenChange={setOpen} detents={['medium', 'large']} title="Sheet" trailing={<Button variant="prominent">Done</Button>}>
        Body
      </Sheet>
      <Menu trigger={<Button>Menu</Button>} placement="bottom" onOpenChange={(o) => o}>
        <MenuTitle>Title</MenuTitle>
        <MenuItem icon={<Icon name="doc.text" />} shortcut="⌘C" onSelect={() => undefined}>
          Copy
        </MenuItem>
        <MenuSeparator line />
        <MenuItem destructive checked={false} keepOpen>
          Delete
        </MenuItem>
      </Menu>
      <Popover trigger={<Button>Popover</Button>}>Anything</Popover>
      <ProgressBar value={0.5} tint="green" />
      <ProgressBar indeterminate />
      <ProgressRing value={0.3} size={32} stroke={4} />
      <Spinner size="large" />
      <PageControl count={5} index={1} onIndexChange={() => undefined} prominent />
      <Badge color="blue">3</Badge>
      <Toolbar>
        <Spacer />
      </Toolbar>
      <ScrollEdge position="bottom" />
      <Sidebar variant="ios">
        <SidebarSection>Library</SidebarSection>
        <SidebarItem icon={<Icon name="photo" />} selected count={3}>
          Photos
        </SidebarItem>
      </Sidebar>
      <Window title="App" sidebar={<SidebarItem>Item</SidebarItem>} toolbar={<Button>Tool</Button>} sidebarWidth={220}>
        <TrafficLights onClose={() => undefined} />
      </Window>
      <TabBar
        value={tab}
        onValueChange={setTab}
        items={[{ value: 'home', label: 'Home', icon: <Icon name="house" size={26} />, badge: 2 }]}
        search
        minimizeOnScroll="#scroller"
        position="absolute"
      />
    </LiquidGlassProvider>
  );
}

export { vanilla, App };
