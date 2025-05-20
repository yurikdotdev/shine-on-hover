// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import vue from '@astrojs/vue';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  base: '/shine-on-hover/',
  integrations: [react(), vue(), icon()],
  vite: {
    plugins: [tailwindcss()]
  }
});