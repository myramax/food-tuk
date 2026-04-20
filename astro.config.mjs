// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const tailwindPlugin = /** @type {any} */ (tailwindcss());

export default defineConfig({
  site: 'https://food-tuk.nl',
  vite: {
    plugins: [tailwindPlugin],
  },
  integrations: [
    sitemap(),
  ],
});
