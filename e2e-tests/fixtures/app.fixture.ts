import {
  test as base,
  ElectronApplication,
  Page,
  TestInfo,
  ConsoleMessage,
} from '@playwright/test';
import {
  assertInterfaceMode,
  launchElectronApp,
  teardownElectronApp,
  preConfigureSettings,
  ElectronAppContext,
  PROCESS_READY_TIMEOUT,
  RequiredInterfaceMode,
} from './helpers';

export { expect } from '@playwright/test';

/** Worker-scoped fixtures — one instance shared across all tests in a worker. */
export interface WorkerAppFixtures {
  /**
   * The `platform.interfaceMode` value seeded into the shared dev-appdata settings file before the
   * app launches (restored after teardown); set with `test.use({ interfaceMode: 'power' })`.
   *
   * Defaults to `'simple'` — the app's own no-pin fallback (`use-interface-mode.hook.ts`) — so a
   * consumer that does not care about mode keeps the behavior this fixture always produced, now
   * pinned and asserted rather than merely inherited from whatever the checkout happens to hold.
   */
  interfaceMode: RequiredInterfaceMode;
  electronApp: ElectronApplication;
}

/** Test-scoped fixtures — re-created for every test. */
export interface TestAppFixtures {
  mainPage: Page;
}

/** Union of all app fixtures (kept for downstream compatibility). */
export type AppFixtures = WorkerAppFixtures & TestAppFixtures;

export const test = base.extend<TestAppFixtures, WorkerAppFixtures>({
  // Option fixture: see the WorkerAppFixtures doc for why the default is 'simple'.
  interfaceMode: ['simple', { option: true, scope: 'worker' }],

  // Worker-scoped: the Electron process is launched once per worker and shared
  // across all tests, avoiding the process startup/teardown cost per test.
  electronApp: [
    async ({ interfaceMode }, use) => {
      // Seed platform.firstRunComplete before launch so the first-run wizard overlay (PT-4175) does
      // not gate the app on a fresh CI profile. The wizard is a full-screen modal Dialog that
      // aria-hides the rest of the app (breaking getByRole menu queries) and intercepts pointer
      // events (breaking clicks); smoke tests drive the menubar/toolbar/profile popover and are not
      // about first-run, so they must start past it. interfaceMode and interfaceLanguage are pinned
      // alongside it so mode-dependent UI and text-based selectors are deterministic regardless of
      // the developer's saved settings — pinned before launch rather than switched afterwards, which
      // would take the mid-session locale-reload path and sequentially reload every open WebView.
      const restoreSettings = preConfigureSettings({
        'platform.firstRunComplete': true,
        'platform.interfaceMode': interfaceMode,
        'platform.interfaceLanguage': ['en'],
      });
      // Nested try/finally: restoreSettings runs in the outer finally so it fires even if launch,
      // `use`, or teardown itself throws; on the success path it also runs only after
      // teardownElectronApp has resolved, so the app's own shutdown writes cannot clobber it there.
      // A launch that throws gives Playwright nothing to call its own teardown on, so without this
      // outer finally the pins above would leak into the developer's local dev-appdata settings
      // file. A graceful run's own global-teardown safety net (restoreLeakedSettings) would
      // eventually undo a leak like that, but only a run that reaches it — a hard kill (Ctrl+C, a
      // crashed worker) reaches neither that safety net nor this finally.
      try {
        const ctx: ElectronAppContext = await launchElectronApp();
        try {
          await use(ctx.electronApp);
        } finally {
          console.log('[teardown] Worker-scoped app teardown starting...');
          await teardownElectronApp(ctx);
          console.log('[teardown] Worker-scoped app teardown complete — worker will exit now');
        }
      } finally {
        restoreSettings();
      }
    },
    { scope: 'worker' },
  ],

  mainPage: async ({ electronApp, interfaceMode }, use, testInfo: TestInfo) => {
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

    // Verify the mode this fixture just seeded actually took effect, before any test runs against a
    // layout it was not written for. The seed merges into a shared settings file and can fail
    // quietly; when it does, a suite runs in the other mode's layout and fails much later on an
    // element that mode never renders, which reads as a timeout rather than a setup problem.
    await assertInterfaceMode(
      interfaceMode,
      `This fixture seeded '${interfaceMode}' before launch and the app did not come up in it. ` +
        `A suite selects its mode with test.use({ interfaceMode }).`,
    );

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
