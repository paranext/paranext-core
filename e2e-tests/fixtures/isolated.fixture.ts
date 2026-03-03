import {
  test as base,
  ElectronApplication,
  Page,
  TestInfo,
  ConsoleMessage,
} from '@playwright/test';
import { launchElectronApp, teardownElectronApp } from './helpers';

/** Test-scoped fixtures — each test gets a fresh Electron instance. */
export interface IsolatedFixtures {
  electronApp: ElectronApplication;
  mainPage: Page;
}

export const test = base.extend<IsolatedFixtures>({
  // Test-scoped: a fresh Electron process is launched for every test, then torn
  // down afterward. Use this for tests that mutate state in ways that are hard
  // to clean up (e.g. creating/deleting projects, changing settings).
  // Playwright fixtures require destructured parameter even when no dependencies are needed
  // eslint-disable-next-line no-empty-pattern
  electronApp: async ({}, use) => {
    const ctx = await launchElectronApp();

    await use(ctx.electronApp);

    console.log('[teardown] Test-scoped app teardown starting...');
    await teardownElectronApp(ctx);
    console.log('[teardown] Test-scoped app teardown complete');
  },

  mainPage: async ({ electronApp }, use, testInfo: TestInfo) => {
    const page = await electronApp.firstWindow();

    console.log(`Window URL: ${page.url()}`);
    const onPageError = (err: Error) => console.error(`Page error: ${err.message}`);
    const onConsoleMsg = (msg: ConsoleMessage) => {
      if (msg.type() === 'error') console.error(`Console error: ${msg.text()}`);
    };
    page.on('pageerror', onPageError);
    page.on('console', onConsoleMsg);

    await page.waitForLoadState('domcontentloaded');

    // Wait for React to mount
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

export { expect } from '@playwright/test';
