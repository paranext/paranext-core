import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

const config = defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node',
    // Warm the lazy one-time ICU init behind Intl.* so it never lands inside a test's timeout
    // window on a slow CI worker. Shares the repo-root setup file. See vitest.setup.ts for rationale.
    setupFiles: [
      path.resolve(__dirname, '../vitest.setup.ts'),
      path.resolve(__dirname, '../vitest.setup.node.ts'),
    ],
    // The shared vitest.setup.ts raises testing-library's asyncUtilTimeout to 5 s so a `waitFor`
    // slowed by CI contention gives up on its own before the test's overall budget, rather than
    // sharing vitest's own testTimeout and losing the race to it. That budget must stay
    // comfortably below this one for testing-library's richer failure to ever be reachable.
    testTimeout: 15000,
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'lib/**/*.test.ts', 'lib/**/*.test.tsx'],
  },
  resolve: {
    alias: {
      // Mock @papi/backend for tests
      '@papi/backend': path.resolve(__dirname, '__test-mocks__/@papi/backend.ts'),
      // Mock @papi/frontend/react for tests
      '@papi/frontend/react': path.resolve(__dirname, '__test-mocks__/@papi/frontend-react.ts'),
      // Mock @papi/frontend for tests
      '@papi/frontend': path.resolve(__dirname, '__test-mocks__/@papi/frontend.ts'),
    },
  },
});

export default config;
