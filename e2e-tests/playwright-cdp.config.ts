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
  // Smoke tests launch their own Electron — incompatible with CDP-connected tests.
  // Find tests were migrated to use app.fixture and run via playwright.config.ts instead.
  testIgnore: ['**/smoke/**', '**/_example/**', '**/find/**'],
  fullyParallel: false,
  workers: 1,
  reporter: [['html', { outputFolder: 'playwright-report' }], ['list']],
  timeout: 120_000,
  expect: { timeout: 10_000 },
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // NOTE: a `viewport: { width: 1920, height: 1080 }` setting was previously here. Playwright's
    // `use.viewport` is applied to pages CREATED by the test framework inside a browser context.
    // For pages obtained via `connectOverCDP` (already-running Electron renderer), the config
    // viewport is NOT retroactively applied — Playwright never gets to call `setViewportSize`
    // during page creation because the page already exists. Viewport enforcement therefore happens
    // exclusively in `cdp.fixture.ts` via an explicit `setViewportSize` + an `evaluate()`
    // verification that reads the renderer's actual `window.innerWidth` / `innerHeight`. See
    // `cdp.fixture.ts` module docblock for the full enforcement chain.
  },
  outputDir: './test-results',
  // NO globalSetup/globalTeardown — app is already running
});

export default config;
