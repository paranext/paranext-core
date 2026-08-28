import {
  test as base,
  ElectronApplication,
  Page,
  TestInfo,
  ConsoleMessage,
} from '@playwright/test';
import {
  launchElectronApp,
  teardownElectronApp,
  preConfigureSettings,
  ElectronAppContext,
  PROCESS_READY_TIMEOUT,
} from './helpers';

export { expect } from '@playwright/test';

/** Worker-scoped fixtures — one instance shared across all tests in a worker. */
export interface WorkerAppFixtures {
  electronApp: ElectronApplication;
}

/** Test-scoped fixtures — re-created for every test. */
export interface TestAppFixtures {
  mainPage: Page;
}

/** Union of all app fixtures (kept for downstream compatibility). */
export type AppFixtures = WorkerAppFixtures & TestAppFixtures;

export const test = base.extend<TestAppFixtures, WorkerAppFixtures>({
  // Worker-scoped: the Electron process is launched once per worker and shared
  // across all tests, avoiding the process startup/teardown cost per test.
  electronApp: [
    // Playwright fixtures require destructured parameter even when no dependencies are needed
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
      // Seed platform.firstRunComplete before launch so the first-run wizard overlay (PT-4175) does
      // not gate the app on a fresh CI profile. The wizard is a full-screen modal Dialog that
      // aria-hides the rest of the app (breaking getByRole menu queries) and intercepts pointer
      // events (breaking clicks); smoke tests drive the menubar/toolbar/profile popover and are not
      // about first-run, so they must start past it. Restored after the app closes in teardown.
      const restoreSettings = preConfigureSettings({ 'platform.firstRunComplete': true });
      const ctx: ElectronAppContext = await launchElectronApp();

      await use(ctx.electronApp);

      console.log('[teardown] Worker-scoped app teardown starting...');
      await teardownElectronApp(ctx);
      // Restore only after the app has fully closed so its shutdown writes cannot clobber the
      // restored contents.
      restoreSettings();
      console.log('[teardown] Worker-scoped app teardown complete — worker will exit now');
    },
    { scope: 'worker' },
  ],

  mainPage: async ({ electronApp }, use, testInfo: TestInfo) => {
    const page = await electronApp.firstWindow({ timeout: PROCESS_READY_TIMEOUT });

    // The Page object is shared within a worker. Use named functions so listeners
    // can be removed after the test, preventing accumulation. Tests should NOT
    // attach their own page.on(...) handlers — use this fixture for all event
    // subscriptions so cleanup is centralized.
    console.log(`Window URL: ${page.url()}`);
    const onPageError = (err: Error) => console.error(`Page error: ${err.message}`);
    const onConsoleMsg = (msg: ConsoleMessage) => {
      if (msg.type() === 'error') console.error(`Console error: ${msg.text()}`);
    };
    page.on('pageerror', onPageError);
    page.on('console', onConsoleMsg);

    await page.waitForLoadState('domcontentloaded');

    // Wait for React to mount
    await page.waitForSelector('#root', { state: 'attached', timeout: PROCESS_READY_TIMEOUT });

    await use(page);

    // Remove listeners so they don't fire during subsequent tests or worker teardown
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
