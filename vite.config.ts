import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';

export default defineConfig({
  plugins: [sveltekit(), purgeCss()],
  ssr: {
    noExternal: ['@googlemaps/js-api-loader'],
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
  preview: {
    port: 5173,
  },
});
