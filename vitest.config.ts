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
        // `.erb/**`, not `.erb/scripts/**`: the webpack plugin under `.erb/configs` has tests too.
        '.erb/**/*.test.ts',
        // e2e HARNESS logic (fixtures, reporters, and the top-level modules beside them) — never
        // the specs themselves, which are Playwright's and live under e2e-tests/tests/.
        'e2e-tests/*.test.ts',
        'e2e-tests/{fixtures,reporters}/**/*.test.ts',
        // The extensions build library (template merge, folder formatting). Not `extensions/src`:
        // each extension there has its own test setup.
        'extensions/lib/**/*.test.ts',
      ],
    },
  };
});
export default config;
