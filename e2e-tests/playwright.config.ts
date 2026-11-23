import { defineConfig } from '@playwright/test';

/**
 * Playwright configuration for paranext-core E2E tests.
 *
 * - `smoke` (default): tests share a single Electron instance per worker — fast, for CI. The
 *   bare-Electron checks there launch their own (see `tests/smoke/README.md`).
 * - `isolated`: each suite gets its own Electron, but how varies by fixture —
 *   `fixtures/isolated.fixture.ts` launches one per test, `comment.fixture`/`find.fixture` one per
 *   worker. Every spec in this project launches its own app; specs that attach to one you started
 *   live in `tests/attached/` instead.
 */
const config = defineConfig({
  testDir: './tests',
  testIgnore: ['**/_example/**'], // _example/ contains reference templates, not runnable tests
  fullyParallel: false, // Electron tests need serial execution
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1, // Retry once locally to handle flaky DataProvider timeouts
  workers: 1, // Single worker for Electron to avoid port conflicts
  reporter: [
    // FIRST on purpose. Fails the run when a test is reported skipped that nobody asked to skip —
    // i.e. it never ran. The multiplexer applies a reporter's status override only after its
    // `onEnd` returns, so listing this after `html`/`list` would let them write a green report for
    // a run this one then fails. See the reporter for why that distinction matters.
    ['./reporters/no-silent-skips.reporter.ts'],
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
    // CI's isolated e2e jobs set this and read the report to warn about tests that passed only on
    // their retry (`.github/workflows/e2e-isolated.yml`).
    ...(process.env.E2E_JSON_REPORT
      ? [['json', { outputFile: process.env.E2E_JSON_REPORT }] as const]
      : []),
  ],
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
  // Convention: directories under `tests/` whose specs launch their own Electron should be
  // reachable from at least one project entry below. Most feature-specific e2e tests can be added
  // under `isolated`. If you add a new test directory of that kind, register it here AND wire it
  // into CI (`test:e2e:smoke` in the build jobs, or the isolated-spec workflow, see "What CI runs"
  // in `e2e-tests/CLAUDE.md`) or a local-only npm script (`test:e2e:<name>`).
  //
  // See the README in each directory for more information about the nature of the tests.
  //
  // Exceptions:
  // `_example/` — reference template for new tests, not a runnable test suite.
  // `attached/` and `enhanced-resources/` — their specs attach to an app you started, which this
  // config's globalSetup rejects, so they have no project here; `playwright-cdp.config.ts` collects
  // them (minus the parked Enhanced Resources specs, see `parked-enhanced-resources.ts`). Give
  // `enhanced-resources/` a project only once its specs launch their own app;
  // `parked-enhanced-resources.test.ts` fails on one before that.
  // Parked suites (`manage-books/`, `markers-checklist/`; see "Local-only directories" in
  // `e2e-tests/CLAUDE.md`) have no project here and are testIgnored by `playwright-cdp.config.ts`
  // too, so no config collects them.
  // Nothing else is excluded here: `navigation-history/` is an isolated subset like any other,
  // and `playwright-cdp.config.ts` cannot collect it at all (`testIgnore: ['**/isolated/**']`).
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
      // Every spec here launches its own Electron, which is what lets `... all` run as one
      // command. Attach-based specs are deliberately NOT in this tree: this config's globalSetup
      // aborts when port 8876 is bound, which is exactly the state an attach spec needs, so one
      // living here could never run alongside its neighbours. They live in `tests/attached/`.
      //
      // `tests/attached/` and `tests/enhanced-resources/` are deliberately NOT projects in this
      // config for that same reason: its globalSetup would refuse the running app those specs exist
      // to attach to. Both are collected by `playwright-cdp.config.ts`, which has no globalSetup,
      // and run against an app started by ./.erb/scripts/refresh.sh — `tests/attached/` with
      // `npm run test:e2e:attached`.
      name: 'isolated',
      testDir: './tests/isolated',
    },
  ],
});

export default config;
