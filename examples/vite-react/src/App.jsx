import { useState } from 'react';
import {
  Glass,
  Button,
  Switch,
  Slider,
  SegmentedControl,
  NavigationBar,
  TabBar,
  ProgressRing,
  Icon,
  alert,
  toast,
  setTheme,
} from 'liquid-glass-kit/react';

export default function App() {
  const [focus, setFocus] = useState(false);
  const [brightness, setBrightness] = useState(70);
  const [mode, setMode] = useState('auto');
  const [tab, setTab] = useState('today');

  return (
    <>
      <NavigationBar
        edge
        title="Vite + React"
        leading={<Button icon={<Icon name="chevron-left" />} aria-label="Back" />}
        trailing={
          <Button variant="prominent" icon={<Icon name="checkmark" />} aria-label="Done" onClick={() => toast({ title: 'Saved', time: 'now' })} />
        }
      />
      <main className="app">
        <Glass className="card">
          <div className="between">
            <strong>Focus</strong>
            <Switch checked={focus} onCheckedChange={setFocus} label="Focus" tint="indigo" />
          </div>
          <Slider
            value={brightness}
            onValueChange={setBrightness}
            ticks={5}
            label="Brightness"
            minIcon={<Icon name="moon" size={20} />}
            maxIcon={<Icon name="sun" size={20} />}
          />
          <SegmentedControl
            block
            aria-label="Appearance"
            value={mode}
            onValueChange={(m) => {
              setMode(m);
              setTheme(m);
            }}
            options={[
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
              { value: 'auto', label: 'Auto' },
            ]}
          />
          <div className="between">
            <ProgressRing value={brightness / 100} size={36} stroke={5} tint="orange" />
            <Button
              onClick={() =>
                alert({
                  title: 'Reset settings?',
                  message: 'Brightness and Focus return to their defaults.',
                  actions: [
                    { label: 'Cancel', role: 'cancel' },
                    { label: 'Reset', prominent: true },
                  ],
                }).then((choice) => {
                  if (choice === 'Reset') {
                    setBrightness(70);
                    setFocus(false);
                  }
                })
              }
            >
              Reset
            </Button>
          </div>
        </Glass>
      </main>
      <TabBar
        value={tab}
        onValueChange={setTab}
        search
        items={[
          { value: 'today', label: 'Today', icon: <Icon name="doc" size={26} /> },
          { value: 'games', label: 'Games', icon: <Icon name="sparkles" size={26} /> },
          { value: 'apps', label: 'Apps', icon: <Icon name="grid" size={26} /> },
        ]}
      />
    </>
  );
}
