import {
  test as base,
  ElectronApplication,
  Page,
  TestInfo,
  ConsoleMessage,
} from '@playwright/test';
import {
  applyDeclaredWindowSize,
  assertInterfaceMode,
  DEFAULT_WINDOW_SIZE,
  isolatedFixtureBaseSettings,
  launchElectronApp,
  LaunchElectronAppOptions,
  preConfigureSettings,
  teardownElectronApp,
  WindowSize,
} from './helpers';
import { suppressOnboardingTour } from './onboarding-tour.page';

export { expect } from '@playwright/test';

/**
 * Isolated test fixtures — each **test** gets its own Electron instance.
 *
 * ## One instance per test
 *
 * Every `test()` block launches and tears down its own Electron process. This gives full isolation
 * between tests at the cost of startup time (several seconds per test, plus teardown).
 *
 * Use these fixtures when tests mutate application state in ways that would affect subsequent
 * tests, or when you need a guaranteed clean slate. For tests that can tolerate shared state,
 * consider a worker-scoped fixture instead — in that case all tests assigned to the same Playwright
 * worker share one Electron instance. By default Playwright assigns one worker per spec file, so
 * tests within a single file typically share an instance, but this is a side effect of Playwright's
 * default parallelism settings, not a guarantee of the fixture itself.
 *
 * Because the fixture is test-scoped, every `test()` pays its own app start and teardown. Write
 * checks that can share one launch state as `test.step`s of a single test; give a check that needs
 * a fresh app or different launch settings its own `test()`, in the same file when it covers the
 * same behaviour.
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
   * never succeed there. Seeding the value is what makes that requirement explicit: without it a
   * run inherits whatever mode the developer's dev-appdata happens to hold, and the app's own
   * no-settings default is 'simple', under which these specs cannot pass.
   *
   * The mode also changes editor DOM that specs assert on: in power mode the scripture editor
   * defaults to Standard view (inline, editable markers), while simple mode keeps the 'formatted'
   * view.
   */
  interfaceMode: 'simple' | 'power';
  /**
   * Extra dev-appdata settings seeded alongside `interfaceMode` and the interface language, in the
   * SAME `preConfigureSettings` call; set with `test.use({ seedSettings: {...} })`.
   *
   * Specs must seed through this option, never with their own `preConfigureSettings` in
   * `beforeAll`/`beforeEach`: hooks run BEFORE test-scoped fixture setup, so a spec's own seed was
   * (a) overridden by this fixture's seed for any shared key (the wizard spec's deliberately-seeded
   * `'simple'` lost to the `'power'` default), and (b) captured by the fixture as the "original"
   * contents — the fixture's restore, which runs AFTER the spec's own `afterEach`/`afterAll`
   * restore, then wrote the spec's test-only values back into the shared dev-appdata file, the very
   * leak both restores exist to prevent.
   */
  seedSettings: Record<string, unknown>;
  /**
   * Window size this suite's layout is written against; set with `test.use({ windowSize: { width,
   * height } })`. Defaults to {@link DEFAULT_WINDOW_SIZE}.
   */
  windowSize: WindowSize;
  /**
   * Set `test.use({ allowOnboardingTour: true })` only in a suite that is ABOUT the onboarding tour
   * and needs it to show. By default `mainPage` writes the tour's completion flag as soon as the
   * window loads, so a Simple-mode spec never has its first click intercepted by the tour's
   * full-screen overlay. A suite that opts in must also pass `allowOnboardingTour` to
   * `waitForAppReady`, which suppresses the tour by default too.
   */
  allowOnboardingTour: boolean;
  electronApp: ElectronApplication;
  mainPage: Page;
}

export const test = base.extend<IsolatedFixtures>({
  // Option fixture: suites override via test.use(); default launches with no special options.
  electronLaunchOptions: [{}, { option: true }],
  windowSize: [DEFAULT_WINDOW_SIZE, { option: true }],

  // Option fixture: see the IsolatedFixtures doc for why the default is 'power'.
  interfaceMode: ['power', { option: true }],

  // Option fixture: extra settings seeded in the same pre-launch write (see IsolatedFixtures doc
  // for why specs must not run their own preConfigureSettings).
  seedSettings: [{}, { option: true }],

  // Option fixture: see the IsolatedFixtures doc; the tour is suppressed unless a suite opts in.
  allowOnboardingTour: [false, { option: true }],

  // Test-scoped fixture: Playwright launches one Electron instance per test() block.
  electronApp: async ({ electronLaunchOptions, interfaceMode, seedSettings }, use) => {
    // Seed settings BEFORE launch (the app reads dev-appdata settings at startup). Pin the
    // interface mode (see the IsolatedFixtures doc) AND the interface language to English so specs
    // that match English UI text — `waitForHomeTab`'s 'Home' tab (localized via %home_dialog_title%)
    // and `navigateToolbarBcv`'s English book names (no app code passes `localizedBookNames`, so
    // `BookChapterControl` renders `formatScrRef`'s explicit 'English' fallback) — are
    // deterministic regardless of the developer's saved locale. Same both-settings seeding as
    // comment.fixture.ts. workers=1 (playwright.config.ts) means no other test can race this shared
    // file. `isolatedFixtureBaseSettings` also suppresses the background registration reminder (see
    // its doc in helpers.ts), so a spec that seeds `firstRunComplete: true` through `seedSettings`
    // cannot be pulled onto the first-run wizard mid-test.
    const restoreSettings = preConfigureSettings({
      ...isolatedFixtureBaseSettings(interfaceMode),
      ...seedSettings,
    });
    try {
      const setupStart = Date.now();
      const ctx = await launchElectronApp(electronLaunchOptions);
      console.log(`[setup +${Date.now() - setupStart}ms] Electron app launch complete`);
      try {
        await use(ctx.electronApp);
      } finally {
        const teardownStart = Date.now();
        console.log('[teardown +0ms] Test-scoped app teardown starting...');
        await teardownElectronApp(ctx);
        console.log(
          `[teardown +${Date.now() - teardownStart}ms] Test-scoped app teardown complete`,
        );
      }
    } finally {
      // Restore the developer's settings file only after the app has fully closed so the app's own
      // shutdown writes cannot clobber the restored contents (same ordering as comment.fixture.ts).
      // In a `finally` so a launch/teardown failure cannot leak the seeded test settings into the
      // developer's real dev-appdata — a stuck value would otherwise be captured as the "original"
      // by the next test's preConfigureSettings and corrupt every later run.
      restoreSettings();
    }
  },

  mainPage: async (
    { electronApp, windowSize, interfaceMode, allowOnboardingTour },
    use,
    testInfo: TestInfo,
  ) => {
    const pageSetupStart = Date.now();
    const stamp = () => `[setup +${Date.now() - pageSetupStart}ms]`;
    const page = await electronApp.firstWindow({ timeout: 90_000 });
    console.log(`${stamp()} First window available`);

    // Ensure the window is large enough for WebView content to be visible.
    // On headless Linux (xvfb) or WSL2 the default window can be very small,
    // causing elements inside WebView iframes to be clipped or hidden. Retried: `setSize` returns
    // before the renderer's `outerWidth`/`outerHeight` reflect the new size, so a single read can
    // race the resize.
    await applyDeclaredWindowSize(
      electronApp,
      page,
      windowSize,
      'This fixture sets this size at launch; check that the window manager is not overriding it.',
    );

    console.log(`${stamp()} Window size applied`);
    console.log(`Window URL: ${page.url()}`);
    const onPageError = (err: Error) => console.error(`Page error: ${err.message}`);
    const onConsoleMsg = (msg: ConsoleMessage) => {
      if (msg.type() === 'error') console.error(`Console error: ${msg.text()}`);
    };
    page.on('pageerror', onPageError);
    page.on('console', onConsoleMsg);

    await page.waitForLoadState('domcontentloaded');

    // The tour opens on its own, asynchronously, in Simple mode with a fresh profile, and its
    // overlay intercepts every pointer event. The renderer re-reads the completion flag on each
    // render, so writing it now, before the dock layout renders, keeps the tour from ever opening.
    if (!allowOnboardingTour) await suppressOnboardingTour(page);

    // Wait for React to mount
    await page.waitForSelector('#root', { state: 'attached', timeout: 30_000 });
    console.log(`${stamp()} React root mounted`);

    // Verify the mode this fixture just seeded actually took effect, before any test runs against a
    // layout it was not written for. Always checked, not opt-in: the fixture knows what it seeded,
    // so there is nothing for a suite to declare and nothing for one to forget. The seed merges
    // into a shared settings file and can fail quietly; when it does, the suite runs in the other
    // mode's layout and fails much later on an element that mode never renders, which reads as a
    // timeout rather than a setup problem.
    await assertInterfaceMode(
      interfaceMode,
      `This fixture seeded '${interfaceMode}' before launch and the app did not come up in it. ` +
        `A suite selects its mode with test.use({ interfaceMode }), never with its own ` +
        `preConfigureSettings call — see the IsolatedFixtures doc for why a spec-level seed is ` +
        `both overridden and leaked back into the developer's settings.`,
    );

    console.log(`${stamp()} Interface mode confirmed`);

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
