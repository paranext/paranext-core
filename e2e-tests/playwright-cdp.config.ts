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
  // whatever app is live, and three of its four specs mutate real projects with no restore.
  // Cited by symbol rather than line, per .claude/rules/docs-durability.md:
  // - manage-books-journey.spec.ts bulk-selects every visible book and clicks "Replace entire
  //   books" in its "Journey 4: Copy from source project" test, against the rotation pool in
  //   `switchToProjectMissingBook` — zzz7, wgPIDGIN, zzz6, MP1, RH2, ROT.
  // - manage-books-functional-WP-001.spec.ts deletes GEN in its "should fire onDeleteBooks when
  //   destructive-confirm Delete is accepted" test.
  // - manage-books-functional-WP-002.spec.ts creates books through `manageBooks.createBooks`,
  //   writing USFM stubs that survive a restart; see `ROTATION_FIXTURES_REQUIRING_MISSING_BOOK`
  //   for the manual cleanup it requires.
  // Those projects exist on developer machines under ~/.platform.bible/projects, so this is data
  // loss, not test noise. The fourth spec, manage-books-commands.spec.ts, drives the same commands
  // but only down paths that cannot mutate.
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
    // No `viewport` setting here. Playwright's `use.viewport` applies to pages it CREATES inside a
    // browser context; a page obtained through `connectOverCDP` already exists, so it is never
    // applied. The fixture does not call `setViewportSize` either — on a CDP-attached page that
    // applies an emulation override, which changes `innerWidth` while the real window stays whatever
    // size it was, so it reports a success it cannot deliver. Window size is instead ASSERTED rather
    // than applied: `assertDeclaredWindowSize` reads `outerWidth`/`outerHeight` against the size the
    // spec declared with `test.use({ windowSize })`, and the app must be started at that size. See
    // the `cdp.fixture.ts` module docblock.
  },
  outputDir: './test-results',
  // NO globalSetup/globalTeardown — app is already running
});

export default config;
