// Electron main process: a frameless window with native glass behind the page.
const { app, BrowserWindow, nativeTheme } = require('electron');
const path = require('node:path');

function createWindow() {
  const isMac = process.platform === 'darwin';
  const win = new BrowserWindow({
    width: 1100,
    height: 720,
    minWidth: 720,
    minHeight: 480,
    show: false,
    // macOS: traffic lights float over the content, like Liquid Glass apps
    titleBarStyle: isMac ? 'hiddenInset' : 'hidden',
    trafficLightPosition: { x: 22, y: 22 },
    // Native material behind the page (macOS vibrancy / Windows 11 acrylic)
    vibrancy: isMac ? 'under-window' : undefined,
    visualEffectState: 'active',
    backgroundMaterial: process.platform === 'win32' ? 'acrylic' : undefined,
    backgroundColor: '#00000000',
    // Windows/Linux: keep native caption buttons over the hidden title bar
    titleBarOverlay: isMac ? undefined : { color: '#00000000', symbolColor: nativeTheme.shouldUseDarkColors ? '#fff' : '#000', height: 52 },
    webPreferences: {
      contextIsolation: true,
      sandbox: true,
    },
  });
  win.loadFile(path.join(__dirname, 'index.html'));
  win.once('ready-to-show', () => win.show());
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
