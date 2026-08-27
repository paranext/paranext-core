/**
 * Playwright fixture for comment-related isolated E2E tests.
 *
 * Uses a **worker-scoped** Electron app so all tests in a describe block share a single Electron
 * instance. This avoids a known issue where the second Electron instance launched against the
 * webpack renderer dev server fails to render new dock tabs (`openResourceViewer` returns an ID but
 * the editor iframe never appears in the DOM).
 *
 * Worker-scoped means worker, not file: with `workers: 1` one worker runs every spec, so without
 * {@link CommentWorkerFixtures.commentAppOwner} a second spec would inherit the first spec's app —
 * and with it whatever that spec did to the simple layout. `openScriptureEditor` in Simple mode
 * replaces the Column 2 scripture-editor slot with a fresh id and nothing re-applies the layout
 * in-session, so an inherited app hands the next spec a layout its `waitForSimpleLayout` will wait
 * out in full. Every spec using this fixture must declare its own owner.
 *
 * `mainPage` remains test-scoped: each test gets a fresh reference to the first window, with its
 * own error/console listeners and failure-screenshot capture.
 *
 * Launches with `DEV_NOISY=false` so test-only extensions (helloRock3, helloSomeone, etc.) are NOT
 * loaded. Comment tests only need platform-scripture-editor and legacy-comment-manager.
 */
import {
  test as base,
  ElectronApplication,
  Page,
  TestInfo,
  ConsoleMessage,
} from '@playwright/test';
import {
  launchElectronApp,
  ElectronAppContext,
  teardownElectronApp,
  preConfigureSettings,
  DEFAULT_WINDOW_SIZE,
  WindowSize,
} from './helpers';

export { expect } from '@playwright/test';

/** Worker-scoped fixtures — one Electron app shared across all tests in the worker. */
interface CommentWorkerFixtures {
  /**
   * Which spec owns this worker's Electron app; set with `test.use({ commentAppOwner: '<spec>' })`.
   *
   * Playwright starts a fresh worker — and so a fresh app — whenever a test needs a different
   * worker-option value, so giving each spec its own name is what keeps one spec's layout changes
   * out of the next spec. The value itself is only an identity; any string unique to the spec
   * does.
   */
  commentAppOwner: string;
  commentElectronApp: ElectronApplication;
  /** Stored so teardown can clean up the user-data dir. */
  commentAppContext: ElectronAppContext;
}

/** Test-scoped fixtures — each test gets its own page reference and listeners. */
interface CommentTestFixtures {
  /**
   * Window size this suite's layout is written against; set with `test.use({ windowSize: { width,
   * height } })`. Defaults to {@link DEFAULT_WINDOW_SIZE}.
   */
  windowSize: WindowSize;
  mainPage: Page;
}

export const test = base.extend<CommentTestFixtures, CommentWorkerFixtures>({
  commentAppOwner: ['', { scope: 'worker', option: true }],

  // Worker-scoped: one Electron process per owning spec (see commentAppOwner).
  commentAppContext: [
    async ({ commentAppOwner }, use) => {
      console.log(`[setup] Launching comment app for "${commentAppOwner}"`);
      // Pin what these suites depend on before launching, rather than inheriting it. Anything left
      // unpinned comes from the shared, gitignored dev-appdata settings file — see "State that leaks
      // between runs" in e2e-tests/CLAUDE.md — so an unpinned key is whatever the last run on this
      // checkout happened to leave.
      const restoreSettings = preConfigureSettings({
        // Every text-based selector in these suites is English. Pinned before launch rather than
        // switched afterwards, which would take the mid-session locale-reload path and sequentially
        // reload every open WebView (5+ minutes).
        'platform.interfaceLanguage': ['en'],
        // These suites are written against Simple mode's Column 3 layout.
        'platform.interfaceMode': 'simple',
        // Required BECAUSE simple mode is pinned above: simple is the one mode that shows the
        // first-run wizard, and power bypasses it. The wizard is a modal that cannot be dismissed
        // (its Radix handlers all preventDefault) and aria-hides the rest of the app.
        'platform.firstRunComplete': true,
      });
      const ctx = await launchElectronApp({ envOverrides: { DEV_NOISY: 'false' } });
      await use(ctx);

      console.log('[teardown] Comment worker-scoped app teardown starting...');
      await teardownElectronApp(ctx);
      // Restore the developer's settings file only after the app has fully closed so the app's
      // own shutdown writes cannot clobber the restored contents.
      restoreSettings();
      console.log('[teardown] Comment worker-scoped app teardown complete');
    },
    { scope: 'worker' },
  ],

  commentElectronApp: [
    async ({ commentAppContext }, use) => {
      await use(commentAppContext.electronApp);
    },
    { scope: 'worker' },
  ],

  // Test-scoped: each test gets the first window with its own listeners.
  windowSize: [DEFAULT_WINDOW_SIZE, { option: true }],
  mainPage: async ({ commentElectronApp, windowSize }, use, testInfo: TestInfo) => {
    const page = await commentElectronApp.firstWindow({ timeout: 90_000 });

    // Ensure the window is large enough for WebView content to be visible.
    await commentElectronApp.evaluate(({ BrowserWindow }, size) => {
      const win = BrowserWindow.getAllWindows()[0];
      if (win) {
        if (win.isMaximized()) win.unmaximize();
        win.setSize(size.width, size.height);
      }
    }, windowSize);

    console.log(`Window URL: ${page.url()}`);
    const onPageError = (err: Error) => console.error(`Page error: ${err.message}`);
    const onConsoleMsg = (msg: ConsoleMessage) => {
      if (msg.type() === 'error') console.error(`Console error: ${msg.text()}`);
    };
    page.on('pageerror', onPageError);
    page.on('console', onConsoleMsg);

    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('#root', { state: 'attached', timeout: 30_000 });

    await use(page);

    // Remove listeners for clean teardown
    page.off('pageerror', onPageError);
    page.off('console', onConsoleMsg);

    // Capture a screenshot on failure and attach it to the test report
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshotPath = testInfo.outputPath('failure.png');
      try {
        await page.screenshot({ path: screenshotPath, fullPage: true });
        await testInfo.attach('failure-screenshot', {
          path: screenshotPath,
          contentType: 'image/png',
        });
        console.log(`Failure screenshot saved to ${screenshotPath}`);
      } catch {
        console.warn('Could not capture failure screenshot (window may already be closed)');
      }
    }
  },
});
