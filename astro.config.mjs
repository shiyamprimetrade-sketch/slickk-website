import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://slickk.online',
  output: 'static',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'never' },
  vite: { build: { assetsInlineLimit: 0 } },
});
