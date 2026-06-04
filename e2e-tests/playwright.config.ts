import { defineConfig } from '@playwright/test';

/**
 * Playwright configuration for paranext-core E2E tests.
 *
 * - `smoke` (default): tests share a single Electron instance per worker — fast, for CI.
 * - `isolated`: each test gets a fresh Electron restart — for state-mutating tests.
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
  // Invariant: every directory under `tests/` (except `_example/`) MUST be reachable
  // from at least one project entry below. If you add a new test directory, register it
  // here AND wire it into either CI (`test:e2e:smoke`) or a local-only npm script.
  projects: [
    {
      name: 'smoke',
      testDir: './tests/smoke',
    },
    {
      name: 'isolated',
      testDir: './tests/isolated',
    },
    {
      // Local-only - NOT wired into CI's `test:e2e:smoke`. The ER tests need real
      // Marble resources (e.g., ESV16UK+) which are not available in CI. Run locally:
      //   ./.erb/scripts/refresh.sh    # boot the app once with CDP enabled
      //   npm run test:e2e:enhanced-resources
      name: 'enhanced-resources',
      testDir: './tests/enhanced-resources',
    },
  ],
});

export default config;
