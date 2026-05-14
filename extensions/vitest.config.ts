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
      '@papi/backend': path.resolve(__dirname, '__test-mocks__/@papi/backend.ts'),
      // Mock @papi/frontend/react for tests
      '@papi/frontend/react': path.resolve(__dirname, '__test-mocks__/@papi/frontend-react.ts'),
    },
  },
});

export default config;
