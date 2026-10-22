import { defineConfig } from 'vitest/config';

const config = defineConfig(async () => {
  const tsconfigPaths = (await import('vite-tsconfig-paths')).default;

  return {
    plugins: [tsconfigPaths()],
    resolve: {
      // `platform-bible-react`'s `exports` map sends `./experimental` to its BUILT
      // `dist/experimental.js`, so without this a test that renders one of those components is
      // exercising the last committed bundle rather than the source beside it — a regression in
      // the component's own source passes green until someone runs `npm run build:pbr`. Resolve
      // it to source instead, so these tests fail on the change that caused them.
      alias: [
        {
          find: /^platform-bible-react\/experimental$/,
          replacement: new URL('./lib/platform-bible-react/src/experimental.ts', import.meta.url)
            .pathname,
        },
      ],
    },
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
