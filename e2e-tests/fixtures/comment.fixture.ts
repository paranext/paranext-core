/**
 * Playwright fixture for comment-related isolated E2E tests.
 *
 * Uses a **worker-scoped** Electron app so all tests in a describe block share a single Electron
 * instance. This avoids a known issue where the second Electron instance launched against the
 * webpack renderer dev server fails to render new dock tabs (`openResourceViewer` returns an ID but
 * the editor iframe never appears in the DOM).
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
} from './helpers';

export { expect } from '@playwright/test';

/** Worker-scoped fixtures — one Electron app shared across all tests in the worker. */
interface CommentWorkerFixtures {
  commentElectronApp: ElectronApplication;
  /** Stored so teardown can clean up the user-data dir. */
  commentAppContext: ElectronAppContext;
}

/** Test-scoped fixtures — each test gets its own page reference and listeners. */
interface CommentTestFixtures {
  mainPage: Page;
}

export const test = base.extend<CommentTestFixtures, CommentWorkerFixtures>({
  // Worker-scoped: one Electron process for the entire worker (all tests in a file).
  commentAppContext: [
    // Playwright worker-scoped fixtures use empty destructuring when they have no fixture dependencies
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
      // Pre-configure English locale and simple mode in the settings file before launching so
      // the app starts in the expected state. This avoids the mid-session locale-reload path
      // (which sequentially reloads every open WebView and can take 5+ minutes).
      const restoreSettings = preConfigureSettings({
        'platform.interfaceLanguage': ['en'],
        'platform.interfaceMode': 'simple',
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
  mainPage: async ({ commentElectronApp }, use, testInfo: TestInfo) => {
    const page = await commentElectronApp.firstWindow({ timeout: 90_000 });

    // Ensure the window is large enough for WebView content to be visible.
    await commentElectronApp.evaluate(({ BrowserWindow }) => {
      const win = BrowserWindow.getAllWindows()[0];
      if (win) {
        if (win.isMaximized()) win.unmaximize();
        win.setSize(1280, 800);
      }
    });

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
