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
  // Smoke and isolated tests use launch fixtures (app/papi/comment/isolated) that spawn their own
  // Electron instance; CDP tests connect to an already-running app. They cannot mix, so exclude
  // both here — run the isolated suite (which includes the find tests under isolated/find) via
  // `npm run test:e2e:isolated`.
  // _example/ contains reference templates, not runnable tests.
  // manage-books is excluded because a bare `npm run test:e2e-cdp` would otherwise run it against
  // whatever app is live, and two of its specs mutate real projects with no restore:
  // manage-books-journey.spec.ts bulk-selects every visible book and clicks "Replace entire books"
  // (:507, :530) against a rotation pool of real local projects — zzz7, wgPIDGIN, MP1, RH2, ROT
  // (:161) — and manage-books-functional-WP-001.spec.ts:394 deletes GEN. Those projects exist on
  // developer machines under ~/.platform.bible/projects, so this is data loss, not test noise.
  // Re-enable per-spec once the suite owns a throwaway project root (isolatedProjectRoot), the way
  // find.fixture does.
  testIgnore: ['**/smoke/**', '**/isolated/**', '**/_example/**', '**/manage-books/**'],
  fullyParallel: false,
  workers: 1,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
    // Fails the run when a test is reported skipped that nobody asked to skip — i.e. it never
    // ran. See the reporter for why that distinction matters.
    ['./reporters/no-silent-skips.reporter.ts'],
  ],
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
