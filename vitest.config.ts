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
      include: [
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
        'tools/pt9-css-converter/src/**/*.test.ts',
        '.erb/scripts/**/*.test.ts',
        // e2e HARNESS logic (fixtures, reporters) — never the specs themselves, which are
        // Playwright's and live under e2e-tests/tests/.
        'e2e-tests/**/*.test.ts',
      ],
    },
  };
});
export default config;
