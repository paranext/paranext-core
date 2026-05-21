import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    globals: true,
    // Each test spins up an ESLint RuleTester whose typescript-eslint parser warm-up costs
    // ~3-4s per "valid" case. Default vitest test/teardown timeouts (5s/10s) get exceeded
    // under CPU contention when run alongside other workspaces (e.g. via
    // `npm test --workspaces`). Bumping these so the runner survives that contention without
    // making the actual test logic any slower.
    testTimeout: 30000,
    hookTimeout: 30000,
    teardownTimeout: 30000,
  },
});
