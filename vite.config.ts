import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build:
    mode === 'catalog'
      ? { outDir: 'catalog-dist' }
      : {
          emptyOutDir: false,
          lib: {
            entry: {
              kittybank: resolve(import.meta.dirname, 'src/index.ts'),
              tokens: resolve(import.meta.dirname, 'src/tokens.ts'),
            },
            formats: ['es'],
            cssFileName: 'kittybank',
          },
          rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
          },
        },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
  },
}));
