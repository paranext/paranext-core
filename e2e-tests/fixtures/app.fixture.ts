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

/**
 * WORKAROUND for an app-level race, not a fix for it. Click past the first-run gate (PT-4175) if it
 * is still showing despite `platform.firstRunComplete` being pinned before launch.
 *
 * The pin is a file write that lands before Electron starts, but the renderer's own read of it at
 * boot — `src/renderer/services/first-run-store.ts`'s `resolveInternal()` — is a separate, later
 * async round-trip, and on a slow/cold CI runner (observed on Windows, occasionally macOS) that
 * round-trip can resolve to `undefined` rather than `true` if it lands before the settings service
 * has finished loading the file. When that happens, the app falls back to treating first-run as
 * incomplete, probes local registration validity (which reads as invalid on a CI machine with no
 * real Paratext registration), and renders the gate — a full-screen modal that aria-hides the rest
 * of the app and intercepts pointer events. A test proceeding past it then fails on whatever it
 * clicks next with a generic timeout that gives no hint the gate is why: the locator it clicked can
 * even resolve to a real, visible, enabled element (the app underneath is still there) while
 * Playwright's actionability check keeps failing because the gate's overlay is covering the click
 * point.
 *
 * This races the gate's own "continue without finishing setup" button — which the app itself
 * reveals once its startup probe runs long (`REGISTRATION_SLOW_REVEAL_MS` in
 * `first-run-overlay.component.tsx`) — against the normal dock-layout attaching, and clicks it if
 * the gate wins. That is the app's own intended remedy for a slow/stuck resolve, so using it here
 * is low-risk — but it treats the SYMPTOM. The real fix is closing the read race in
 * `resolveInternal()` itself, which is app onboarding code used by real users on slow machines, not
 * just CI, and belongs in its own reviewed change, not a tooling branch. If the warning below
 * starts firing often, that is the signal to do that work.
 *
 * Deliberately loud when it fires, with a stable, greppable tag: this smoke/find/replace path is
 * about POST-first-run behaviour, never first-run itself (that is `first-run-wizard.spec.ts`, which
 * uses a different fixture and documents why it cannot call `waitForAppReady`), so recovering
 * silently would hide a real, if rare, product-level race behind a passing test. If dock-layout
 * wins the race (the overwhelmingly common case), this whole function is a no-op.
 */
async function dismissStuckFirstRunGate(page: Page): Promise<void> {
  const escapeHatch = page.getByRole('button', {
    name: /continue without (finishing setup|registration)/i,
  });
  const gateStuck = await Promise.race([
    page
      .locator('div[class*="dock-layout"]')
      .waitFor({ state: 'attached', timeout: PROCESS_READY_TIMEOUT })
      .then(() => false),
    escapeHatch.waitFor({ state: 'visible', timeout: PROCESS_READY_TIMEOUT }).then(() => true),
  ]);
  if (!gateStuck) return;

  // Stable "[e2e-first-run-gate-race]" tag: grep CI logs for it to count how often this actually
  // fires, independent of which test happened to hit it.
  console.warn(
    '[e2e-first-run-gate-race] The first-run gate was still showing despite ' +
      'platform.firstRunComplete being pinned before launch — clicking its "continue without ' +
      'finishing setup" escape hatch. This is a workaround for a slow-CI read race in ' +
      'first-run-store.ts, expected to be rare; if it recurs often, that race needs its own fix.',
  );
  await escapeHatch.click();
  await page.getByTestId('first-run-dialog').waitFor({ state: 'hidden', timeout: 10_000 });
}

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

    await dismissStuckFirstRunGate(page);

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
