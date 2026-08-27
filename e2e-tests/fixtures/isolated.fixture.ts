import {
  test as base,
  ElectronApplication,
  Page,
  TestInfo,
  ConsoleMessage,
} from '@playwright/test';
import {
  assertInterfaceMode,
  DEFAULT_WINDOW_SIZE,
  launchElectronApp,
  LaunchElectronAppOptions,
  RequiredInterfaceMode,
  teardownElectronApp,
  WindowSize,
} from './helpers';

export { expect } from '@playwright/test';

/**
 * Isolated test fixtures — each **test** gets its own Electron instance.
 *
 * ## One instance per test
 *
 * Every `test()` block launches and tears down its own Electron process. This gives full isolation
 * between tests at the cost of startup time (30+ seconds per test).
 *
 * Use these fixtures when tests mutate application state in ways that would affect subsequent
 * tests, or when you need a guaranteed clean slate. For tests that can tolerate shared state,
 * consider a worker-scoped fixture instead — in that case all tests assigned to the same Playwright
 * worker share one Electron instance. By default Playwright assigns one worker per spec file, so
 * tests within a single file typically share an instance, but this is a side effect of Playwright's
 * default parallelism settings, not a guarantee of the fixture itself.
 *
 * The renderer connects to a shared webpack dev server (`localhost:1212`), and ES module state
 * (initialization guards, dock layout singletons, etc.) persists across navigations within the same
 * renderer process. A second Electron instance launched against the same dev-server renderer will
 * inherit stale module state, which prevents dock tabs from rendering correctly.
 */
export interface IsolatedFixtures {
  /**
   * Per-suite launch options; set with `test.use({ electronLaunchOptions: { ... } })`. Named
   * `electronLaunchOptions` (not `launchOptions`) because Playwright's base `test` already
   * registers a worker-scoped `launchOptions` option fixture (browser launch options); reusing that
   * name throws "Fixture ... has already been registered as a { scope: 'worker' } fixture".
   */
  electronLaunchOptions: LaunchElectronAppOptions;
  /**
   * Window size this suite's layout is written against; set with `test.use({ windowSize: { width,
   * height } })`. Defaults to {@link DEFAULT_WINDOW_SIZE}.
   */
  windowSize: WindowSize;
  /**
   * Interface mode this suite's layout is written against; set with `test.use({
   * requiredInterfaceMode: 'power' })` alongside the `preConfigureSettings` pin that establishes
   * it. Leave unset when the suite genuinely works in either mode.
   *
   * This VERIFIES the pin rather than applying it. `preConfigureSettings` writes the shared
   * `dev-appdata/settings.json` before launch and merges into whatever is already there, so a pin
   * can fail to take effect without saying so. When it does, the suite runs in the other mode's
   * layout and fails much later on an element that mode never renders — which reads as a timeout,
   * not as a setup problem. Declaring the mode turns that into an immediate, readable error.
   */
  requiredInterfaceMode: RequiredInterfaceMode | undefined;
  electronApp: ElectronApplication;
  mainPage: Page;
}

export const test = base.extend<IsolatedFixtures>({
  // Option fixture: suites override via test.use(); default launches with no special options.
  electronLaunchOptions: [{}, { option: true }],
  windowSize: [DEFAULT_WINDOW_SIZE, { option: true }],
  requiredInterfaceMode: [undefined, { option: true }],

  // Test-scoped fixture: Playwright launches one Electron instance per test() block.
  electronApp: async ({ electronLaunchOptions }, use) => {
    const ctx = await launchElectronApp(electronLaunchOptions);

    await use(ctx.electronApp);

    console.log('[teardown] Test-scoped app teardown starting...');
    await teardownElectronApp(ctx);
    console.log('[teardown] Test-scoped app teardown complete');
  },

  mainPage: async ({ electronApp, windowSize, requiredInterfaceMode }, use, testInfo: TestInfo) => {
    const page = await electronApp.firstWindow({ timeout: 90_000 });

    // Ensure the window is large enough for WebView content to be visible.
    // On headless Linux (xvfb) or WSL2 the default window can be very small,
    // causing elements inside WebView iframes to be clipped or hidden.
    await electronApp.evaluate(({ BrowserWindow }, size) => {
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

    // Wait for React to mount
    await page.waitForSelector('#root', { state: 'attached', timeout: 30_000 });

    // Verify the mode the suite pinned actually took effect, before any test runs against a layout
    // it was not written for. Only checked when the suite declared one.
    if (requiredInterfaceMode)
      await assertInterfaceMode(
        page,
        requiredInterfaceMode,
        `This suite launched its own app, so the mode it asked for did not take: check that its ` +
          `preConfigureSettings pin sets 'platform.interfaceMode' to '${requiredInterfaceMode}' ` +
          `and that the pin runs before the app launches (a beforeAll, not a beforeEach).`,
      );

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
