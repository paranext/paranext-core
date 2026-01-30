import { defineConfig } from 'vitest/config';

const config = defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    setupFiles: ['./vitest.setup.ts'],
  },
});

export default config;
