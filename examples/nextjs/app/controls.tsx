'use client';

import { useState } from 'react';
import {
  Glass,
  Button,
  Switch,
  Slider,
  SegmentedControl,
  Stepper,
  TabBar,
  Sheet,
  Menu,
  MenuItem,
  MenuSeparator,
  ListSection,
  ListRow,
  Icon,
  alert,
  toast,
} from 'liquid-glass-kit/react';

export default function Controls() {
  const [wifi, setWifi] = useState(true);
  const [volume, setVolume] = useState(60);
  const [view, setView] = useState('day');
  const [count, setCount] = useState(2);
  const [tab, setTab] = useState('home');
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <Glass className="panel">
        <div className="row">
          <span>Wi-Fi</span>
          <Switch checked={wifi} onCheckedChange={setWifi} label="Wi-Fi" />
        </div>
        <Slider
          value={volume}
          onValueChange={setVolume}
          label="Volume"
          minIcon={<Icon name="speaker-slash" size={20} />}
          maxIcon={<Icon name="speaker" size={20} />}
        />
        <SegmentedControl
          block
          aria-label="Period"
          value={view}
          onValueChange={setView}
          options={[
            { value: 'day', label: 'Day' },
            { value: 'week', label: 'Week' },
            { value: 'month', label: 'Month' },
          ]}
        />
        <div className="row">
          <span>Copies: {count}</span>
          <Stepper value={count} onValueChange={setCount} min={0} max={9} />
        </div>
        <div className="row">
          <Button onClick={() => setSheetOpen(true)}>Open sheet</Button>
          <Menu trigger={<Button icon={<Icon name="ellipsis" />} aria-label="More" />}>
            <MenuItem icon={<Icon name="doc" />} shortcut="⌘C" onSelect={() => toast({ title: 'Copied' })}>
              Copy
            </MenuItem>
            <MenuItem icon={<Icon name="pencil" />}>Rename</MenuItem>
            <MenuSeparator />
            <MenuItem icon={<Icon name="trash" />} destructive>
              Delete
            </MenuItem>
          </Menu>
          <Button
            variant="prominent"
            destructive
            onClick={async () => {
              const choice = await alert({
                title: 'Delete photo?',
                message: 'This photo will be deleted from all your devices.',
                actions: [
                  { label: 'Cancel', role: 'cancel' },
                  { label: 'Delete', role: 'destructive', prominent: true },
                ],
              });
              if (choice === 'Delete') toast({ title: 'Photos', message: 'Photo deleted', time: 'now' });
            }}
          >
            Delete
          </Button>
        </div>
      </Glass>

      <ListSection header="Settings" footer="Rows can hold any control.">
        <ListRow icon={<Icon name="airplane" />} iconColor="orange" title="Airplane Mode" accessory={<Switch label="Airplane Mode" />} />
        <ListRow icon={<Icon name="wifi" />} iconColor="blue" title="Wi-Fi" detail={wifi ? 'Home' : 'Off'} onClick={() => setSheetOpen(true)} />
        <ListRow icon={<Icon name="bell" />} iconColor="red" title="Notifications" href="#" />
      </ListSection>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen} title="Wi-Fi" leading={<Button icon={<Icon name="xmark" />} aria-label="Close" data-lg-dismiss />}>
        <ListSection>
          <ListRow title="Wi-Fi" accessory={<Switch checked={wifi} onCheckedChange={setWifi} label="Wi-Fi" />} />
          <ListRow title="Home" checked />
        </ListSection>
      </Sheet>

      <TabBar
        value={tab}
        onValueChange={setTab}
        minimizeOnScroll
        search
        items={[
          { value: 'home', label: 'Home', icon: <Icon name="house" size={26} /> },
          { value: 'browse', label: 'Browse', icon: <Icon name="grid" size={26} /> },
          { value: 'library', label: 'Library', icon: <Icon name="books" size={26} />, badge: 3 },
        ]}
      />
    </>
  );
}
