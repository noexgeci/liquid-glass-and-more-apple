import { createApp } from 'vue';
import 'liquid-glass-kit/css';
import { start } from 'liquid-glass-kit';
import App from './App.vue';

createApp(App).mount('#app');
// Enhances the markup Vue renders, and anything it adds later.
start();
