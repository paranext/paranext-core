import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    globals: true,
    // The first type-aware RuleTester case in a file pays the TypeScript Program's cold start inside
    // its own budget — about 4 s on a Windows CI runner, close enough to vitest's 5 s default that
    // it times out under load.
    testTimeout: 15000,
  },
});
