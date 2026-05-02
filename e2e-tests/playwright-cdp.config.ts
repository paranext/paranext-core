import { defineConfig } from '@playwright/test';

/**
 * Playwright configuration for running E2E tests against an already-running Platform.Bible instance
 * with CDP enabled (port 9223).
 *
 * Prerequisites: Platform.Bible running with --remote-debugging-port=9223 Use: npx playwright test
 * --config=e2e-tests/playwright-cdp.config.ts
 */
const config = defineConfig({
  testDir: './tests',
  // Smoke tests use app.fixture/papi.fixture (launch their own Electron instance).
  // CDP tests connect to an already-running app. They cannot mix.
  // _example/ contains reference templates, not runnable tests.
  testIgnore: ['**/smoke/**', '**/_example/**'],
  fullyParallel: false,
  workers: 1,
  reporter: [['html', { outputFolder: 'playwright-report' }], ['list']],
  timeout: 120_000,
  expect: { timeout: 10_000 },
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // Default viewport for screenshots — matches the visual-verification skill's pw-server.mjs and
    // is enforced by cdp.fixture.ts. Anything smaller produces reviews-by-vibes (a tiny screenshot
    // can pass `toBeVisible` checks but hides most of the UI). See cdp.fixture.ts module docblock.
    viewport: { width: 1920, height: 1080 },
  },
  outputDir: './test-results',
  // NO globalSetup/globalTeardown — app is already running
});

export default config;
