// React test app for tests/react-smoke.mjs (bundled with esbuild, StrictMode on).
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { LiquidGlassProvider, Glass, Menu, MenuItem, PickerColumn, Picker, Icon, registerIcons, Sheet, Button, SegmentedControl } from '../dist/react.mjs';

registerIcons({ 'star.fill': '<svg viewBox="0 0 10 10"><path d="M0 0h10v10z"/></svg>' });

function App() {
  const [tag, setTag] = React.useState('div');
  const [showMenu, setShowMenu] = React.useState(true);
  const [pv, setPv] = React.useState('b');
  const [open, setOpen] = React.useState(false);
  window.__open = open;
  const [seg, setSeg] = React.useState('a');
  const glassRef = React.useRef(null);
  window.__glassRef = glassRef;
  window.__set = { setTag, setShowMenu, setPv, setOpen, setSeg };
  return (
    <LiquidGlassProvider refraction={false}>
      <Glass as={tag} ref={glassRef} id="g" style={{ width: 100, height: 40 }}>glass</Glass>
      {showMenu && (
        <Menu trigger={<Button id="mt">Menu</Button>}>
          <MenuItem>One</MenuItem>
        </Menu>
      )}
      <Menu trigger={<Button id="mt2">Menu2</Button>}>
        <MenuItem>Two</MenuItem>
      </Menu>
      <Picker><PickerColumn id="pc" items={['a', 'b', 'c', 'd']} value={pv} onValueChange={setPv} label="L" /></Picker>
      <span id="ic"><Icon name="star.fill" /></span>
      <span id="ic2"><Icon name="house" /></span>
      <SegmentedControl id="seg" options={['a', 'b', 'c']} value={seg} onValueChange={setSeg} aria-label="S" />
      <Sheet open={open} onOpenChange={setOpen} title="S" id="sh"><p>hi</p></Sheet>
    </LiquidGlassProvider>
  );
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
