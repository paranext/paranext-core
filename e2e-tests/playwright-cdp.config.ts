import { defineConfig } from '@playwright/test';
import { PARKED_ENHANCED_RESOURCES_SPECS } from './parked-enhanced-resources';

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
  // manage-books is parked and excluded: a bare `npm run test:e2e-cdp` would otherwise run it
  // against whatever app is live, and its journey and functional specs (and the second `describe`
  // of `manage-books-commands.spec.ts`) change real projects with no restore. Those projects live
  // on developer machines under ~/.platform.bible/projects, so that is data loss, not test noise.
  // Re-enable per spec once the suite owns a throwaway project root (the `isolatedProjectRoot`
  // launch option, or a temp projects folder as `find.fixture` makes); see
  // `tests/manage-books/README.md`.
  // The parked Enhanced Resources specs are excluded too (`PARKED_ENHANCED_RESOURCES_SPECS`); the
  // local-only specs in that directory are collected. See `parked-enhanced-resources.ts`.
  testIgnore: [
    '**/smoke/**',
    '**/isolated/**',
    '**/_example/**',
    '**/manage-books/**',
    ...PARKED_ENHANCED_RESOURCES_SPECS,
  ],
  fullyParallel: false,
  workers: 1,
  reporter: [
    // FIRST on purpose. Fails the run when a test is reported skipped that nobody asked to skip —
    // i.e. it never ran. The multiplexer applies a reporter's status override only after its
    // `onEnd` returns, so listing this after `html`/`list` would let them write a green report for
    // a run this one then fails. See the reporter for why that distinction matters.
    ['./reporters/no-silent-skips.reporter.ts'],
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
  ],
  timeout: 120_000,
  expect: { timeout: 10_000 },
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // No `viewport` setting here. Playwright's `use.viewport` applies to pages it CREATES inside a
    // browser context; a page obtained through `connectOverCDP` already exists, so it is never
    // applied. The fixture does not call `setViewportSize` either; window size is ASSERTED rather
    // than applied, against the size the spec declared with `test.use({ requiredWindowSize })`, and
    // the app must be started at that size. See `assertDeclaredWindowSize` in `fixtures/helpers.ts`.
  },
  outputDir: './test-results',
  // NO globalSetup/globalTeardown — app is already running
});

export default config;
