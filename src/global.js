// Script-tag build: exposes `window.LiquidGlass` and starts automatically.
// Opt out with <script src="liquid-glass.js" data-manual></script> and call LiquidGlass.start().
import * as core from './core.js';

const api = { ...core };
window.LiquidGlass = api;

const script = document.currentScript;
const manual = script && script.hasAttribute('data-manual');
if (!manual) core.start(window.LiquidGlassConfig);
