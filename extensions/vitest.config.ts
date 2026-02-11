import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

const config = defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
  },
  resolve: {
    alias: {
      // Mock @papi/backend for tests
      '@papi/backend': path.resolve(__dirname, 'src/__mocks__/@papi/backend.ts'),
    },
  },
});

export default config;
