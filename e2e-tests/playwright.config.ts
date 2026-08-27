import { defineConfig } from '@playwright/test';

/**
 * Playwright configuration for paranext-core E2E tests.
 *
 * - `smoke` (default): tests share a single Electron instance per worker — fast, for CI.
 * - `isolated`: each suite gets its own Electron, but how varies by fixture —
 *   `fixtures/isolated.fixture.ts` launches one per test, `comment.fixture`/`find.fixture` one per
 *   worker, and the `title-bar/` subset launches nothing at all: it uses `fixtures/cdp.fixture.ts`
 *   and attaches to an app started separately. See the note on that project below.
 */
const config = defineConfig({
  testDir: './tests',
  testIgnore: ['**/_example/**'], // _example/ contains reference templates, not runnable tests
  fullyParallel: false, // Electron tests need serial execution
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1, // Retry once locally to handle flaky DataProvider timeouts
  workers: 1, // Single worker for Electron to avoid port conflicts
  reporter: [['html', { outputFolder: 'playwright-report' }], ['list']],
  timeout: 120_000, // 2 minutes per test (app initialization can be slow)
  expect: {
    timeout: 10_000,
  },
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',
  outputDir: './test-results',
  // Convention: directories under `tests/` should generally be reachable from at least one project
  // entry below. Most feature-specific e2e tests can be added under `isolated`. If you add a new
  // test directory, register it here AND wire it into either CI (`test:e2e:smoke`) or a local-only
  // npm script (`test:e2e:<name>`).
  //
  // See the README in each directory for more information about the nature of the tests.
  //
  // Exceptions:
  // `_example/` — reference template for new tests, not a runnable test suite.
  // Experimental tests that should not be wired into any standard test run. (e.g.,
  // `manage-books/` and `markers-checklist/`)
  // `navigation-history/` (top-level, NOT an isolated subset) — needs the CDP fixture (it
  // attaches to an already-running app), which this config's launch strategy cannot provide. It
  // runs through `playwright-cdp.config.ts` (`npm run test:e2e-cdp`) instead.
  projects: [
    {
      name: 'smoke',
      testDir: './tests/smoke',
    },
    {
      // The common set of locally-runnable tests, organized in subdirectories by feature.
      // `npm run test:e2e:isolated` (via e2e-tests/run-isolated.mjs) lists the subsets;
      // `npm run test:e2e:isolated <subset>` runs one; `... all` runs every subset.
      //
      // `... all` cannot currently pass. The `title-bar/` subset uses fixtures/cdp.fixture.ts,
      // which attaches to an already-running app, but this config's globalSetup aborts when port
      // 8876 is bound — so there is no state in which both it and its launch-based neighbours
      // run. playwright-cdp.config.ts cannot run it either; it testIgnores **/isolated/**. Run
      // the other subsets individually until it moves out of this project or globalSetup grows
      // an opt-out.
      name: 'isolated',
      testDir: './tests/isolated',
    },
    {
      // Local-only - NOT wired into CI's `test:e2e:smoke`. The ER tests need real
      // Marble resources (e.g., ESV16UK+) which are not available in CI. There is no dedicated
      // npm script. These specs use fixtures/cdp.fixture.ts, so run them through the CDP config,
      // which has no globalSetup; running them through THIS config fails, because its globalSetup
      // rejects the very app they need to attach to:
      //   ./.erb/scripts/refresh.sh
      //   npx playwright test --config e2e-tests/playwright-cdp.config.ts tests/enhanced-resources/
      // The entry below therefore only registers the directory with this config; its practical
      // effect is that `test:e2e:all` (this config, no --project) cannot pass either.
      name: 'enhanced-resources',
      testDir: './tests/enhanced-resources',
    },
  ],
});

export default config;
