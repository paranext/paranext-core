import {
  test as base,
  ElectronApplication,
  Page,
  TestInfo,
  ConsoleMessage,
} from '@playwright/test';
import { launchElectronApp, teardownElectronApp } from './helpers';

export { expect } from '@playwright/test';

/**
 * Isolated test fixtures — each **test file** gets its own Electron instance.
 *
 * ## One instance per file, not per test
 *
 * All `test()` blocks within a single spec file share the same Electron process. This is
 * intentional: spinning up a fresh Electron instance takes 30+ seconds, so launching one per
 * `test()` block would make suites painfully slow.
 *
 * - **Tests that can share state** → put them in the same file. Use `test.step()` inside a single
 *   `test()` if you want granular reporting without the overhead of a separate Electron instance.
 * - **Tests that need a truly fresh Electron instance** → put them in separate `.spec.ts` files.
 *   Playwright treats each file as an independent worker, so each file launches and tears down its
 *   own Electron process.
 *
 * The renderer connects to a shared webpack dev server (`localhost:1212`), and ES module state
 * (initialization guards, dock layout singletons, etc.) persists across navigations within the same
 * renderer process. A second Electron instance launched against the same dev-server renderer will
 * inherit stale module state, which prevents dock tabs from rendering correctly. Separate files
 * avoid this because each file's Electron process gets its own renderer.
 */
export interface IsolatedFixtures {
  electronApp: ElectronApplication;
  mainPage: Page;
}

export const test = base.extend<IsolatedFixtures>({
  // Test-scoped fixture: Playwright creates one instance per test() block, but
  // since all test() blocks in a file run in the same worker, they share this
  // Electron process. See the IsolatedFixtures JSDoc for why this is intentional.
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
    const page = await electronApp.firstWindow({ timeout: 90_000 });

    // Ensure the window is large enough for WebView content to be visible.
    // On headless Linux (xvfb) or WSL2 the default window can be very small,
    // causing elements inside WebView iframes to be clipped or hidden.
    await electronApp.evaluate(({ BrowserWindow }) => {
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
