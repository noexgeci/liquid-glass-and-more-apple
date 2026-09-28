import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'liquid-glass-kit/css';
import { LiquidGlassProvider } from 'liquid-glass-kit/react';
import App from './App.jsx';
import './app.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LiquidGlassProvider>
      <App />
    </LiquidGlassProvider>
  </StrictMode>
);
