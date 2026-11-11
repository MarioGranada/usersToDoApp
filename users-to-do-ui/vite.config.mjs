import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  // React 16.12 predates react/jsx-runtime (added in 16.14) — use the classic transform
  plugins: [react({ jsxRuntime: 'classic' })],
  // users-to-do-api listens on 3000 (open CORS), so the UI uses 3001
  server: { port: 3001 },
  preview: { port: 3001 },
  build: { outDir: 'dist' },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    css: true,
  },
});
