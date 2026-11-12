import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  // React 16.12 predates react/jsx-runtime (added in 16.14) — use the classic transform
  plugins: [react({ jsxRuntime: 'classic' })],
  // Same-origin /api in development, like production on Vercel
  // (users-to-do-api listens on 3030).
  server: { port: 3001, proxy: { '/api': 'http://localhost:3030' } },
  preview: { port: 3001, proxy: { '/api': 'http://localhost:3030' } },
  build: { outDir: 'dist' },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    css: true,
  },
});
