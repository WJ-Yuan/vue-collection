import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { URL, fileURLToPath } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@vue-collection/components': fileURLToPath(
        new URL('./packages/components', import.meta.url),
      ),
      '@vue-collection/composables': fileURLToPath(
        new URL('./packages/composables', import.meta.url),
      ),
      '@vue-collection/directives': fileURLToPath(
        new URL('./packages/directives', import.meta.url),
      ),
    },
  },
});
