import {
  test as base,
  ElectronApplication,
  Page,
  TestInfo,
  ConsoleMessage,
} from '@playwright/test';
import {
  launchElectronApp,
  LaunchElectronAppOptions,
  preConfigureSettings,
  teardownElectronApp,
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
   * The `platform.interfaceMode` value seeded into the shared dev-appdata settings file before the
   * app launches (restored after teardown); set with `test.use({ interfaceMode: 'simple' })`.
   *
   * Defaults to `'power'`: the isolated suite's specs are written against the power-mode layout —
   * simple mode always loads the static `simpleLayout` (simple-layout.data.ts), which has NO Home
   * tab, so power-layout patterns like `waitForHomeTab` and "close all non-Home tabs" sweeps can
   * never succeed there. Before this option existed, these specs silently inherited whatever mode
   * the developer's dev-appdata happened to hold (the app's own no-settings default is 'simple',
   * under which they cannot pass); seeding makes the requirement explicit and deterministic.
   *
   * The mode also changes editor DOM that specs assert on: in power mode the scripture editor
   * defaults to Standard view (inline, editable markers — PT-4190), while simple mode keeps the
   * 'formatted' view.
   */
  interfaceMode: 'simple' | 'power';
  electronApp: ElectronApplication;
  mainPage: Page;
}

export const test = base.extend<IsolatedFixtures>({
  // Option fixture: suites override via test.use(); default launches with no special options.
  electronLaunchOptions: [{}, { option: true }],

  // Option fixture: see the IsolatedFixtures doc for why the default is 'power'.
  interfaceMode: ['power', { option: true }],

  // Test-scoped fixture: Playwright launches one Electron instance per test() block.
  electronApp: async ({ electronLaunchOptions, interfaceMode }, use) => {
    // Seed the interface mode BEFORE launch (the app reads dev-appdata settings at startup).
    // workers=1 (playwright.config.ts) means no other test can race this shared file.
    const restoreSettings = preConfigureSettings({ 'platform.interfaceMode': interfaceMode });
    const ctx = await launchElectronApp(electronLaunchOptions);

    await use(ctx.electronApp);

    console.log('[teardown] Test-scoped app teardown starting...');
    await teardownElectronApp(ctx);
    // Restore the developer's settings file only after the app has fully closed so the app's own
    // shutdown writes cannot clobber the restored contents (same ordering as comment.fixture.ts).
    restoreSettings();
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
