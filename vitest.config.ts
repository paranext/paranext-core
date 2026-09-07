import { defineConfig } from 'vitest/config';

const config = defineConfig(async () => {
  const tsconfigPaths = (await import('vite-tsconfig-paths')).default;

  return {
    plugins: [tsconfigPaths()],
    test: {
      globals: true,
      environment: 'jsdom',
      // Warms the lazy one-time ICU init behind Intl.* so it never lands inside a test's timeout
      // window on a slow CI worker. See vitest.setup.ts for the full rationale.
      setupFiles: ['./vitest.setup.ts'],
      // vitest.setup.ts raises testing-library's asyncUtilTimeout to 5 s so a `waitFor` slowed by
      // CI contention gives up on its own before the test's overall budget, rather than sharing
      // vitest's own testTimeout and losing the race to it. That budget must stay comfortably
      // below this one for testing-library's richer failure to ever be reachable.
      testTimeout: 15000,
      include: [
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
        'tools/pt9-css-converter/src/**/*.test.ts',
        '.erb/scripts/**/*.test.ts',
      ],
    },
  };
});
export default config;
