/**
 * E2E tests for the first-run wizard (PT-4175 / PT-4179).
 *
 * These tests use isolated.fixture (fresh Electron per test) because the first-run wizard is a
 * one-time modal that only shows on a clean profile. preConfigureSettings forces
 * platform.firstRunComplete: false so the wizard always appears even on a dev machine where the
 * developer has already completed first-run.
 *
 * Tests cover:
 *
 * - Wizard appears and localisation resolves
 * - Forward navigation: Language → Internet Settings → Identify (Next hidden at Identify)
 * - "Don't sync yet" on Sync consent closes the wizard (PT-4178)
 * - Sync progress step renders the syncing heading with Finish disabled (PT-4179)
 * - Choosing "Unrestricted" on Internet Settings starts no Send/Receive before Sync consent, and each
 *   consent choice leaves the automatic sync gate in the state it promises
 *
 * Navigation note: IdentifyStep hides the shell's Next button and owns its own "Save and restart"
 * primary action (which triggers a real app restart in production). SyncConsentStep (PT-4178)
 * similarly hides Next and owns its own "Sync" primary action (which calls the S/R backend in
 * production). EVERY test here runs in demo mode (`platform-bible.firstRunDemoMode` localStorage
 * flag, set and then applied via a renderer reload — see injectDemoMode): demo starts the wizard at
 * the language step regardless of the machine's registration state, "Save and restart" calls
 * onNext() directly, and "Sync" resolves immediately without a real backend call.
 */
import type { ElectronApplication, Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import { sendPapiRequestOnce } from '../../../fixtures/helpers';
import {
  makeSampleProjectEditable,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
  sendPapiCommandWhenRegistered,
} from '../../../fixtures/scripture-editor-helpers';
import { captureAppOutput } from '../multi-window/multi-window.util';
import { FirstRunPage } from './first-run.page';

// Override dev-appdata so the wizard always shows, even after a developer has run the app
// locally and persisted platform.firstRunComplete: true. Seeded THROUGH the fixture's options,
// never with a local preConfigureSettings hook: hooks run before test-scoped fixture setup, so a
// hand-rolled seed was overridden for shared keys and then leaked back into shared dev-appdata
// by the fixture's later restore. The fixture is test-scoped, so this re-seeds per test — the
// "skip setup" test calls completeFirstRun(), which writes firstRunComplete: true back to the
// file and would otherwise poison every later test in the suite. `interfaceMode: 'simple'` is
// explicit because the wizard is a simple-mode surface: in power mode the first-run resolution
// shows the app immediately and the wizard never appears.
test.use({
  interfaceMode: 'simple',
  seedSettings: { 'platform.firstRunComplete': false },
});

/**
 * Activate demo mode by setting the localStorage flag, then RELOADING the renderer so startup reads
 * it before any resolution begins. In demo mode:
 *
 * - The wizard always starts at the language step (bypasses registration + wizardActive checks).
 * - IdentifyStep's "Save and restart" calls onNext() directly instead of restarting the app.
 * - Completion is not persisted, so the wizard re-runs on every launch.
 *
 * The reload is what makes this deterministic. Setting the flag alone raced the initial
 * `resolveInternal()` (the old comment called it "exploiting the gap"), and on any machine with a
 * VALID Paratext registration the race doesn't even matter: the real resolution path skips the
 * wizard entirely (registered users get no setup wizard, by design — the store's unit tests cover
 * that routing). localStorage survives the reload, so the reloaded renderer computes its initial
 * status with demo mode already on and lands on the wizard's language step every time, on every
 * machine.
 */
async function injectDemoMode(mainPage: import('@playwright/test').Page): Promise<void> {
  // Let the initial boot fully settle BEFORE reloading. Reloading mid-boot intermittently left the
  // reloaded renderer with unresolved LocalizeKeys (`%firstRun_button_next%`) for over a minute —
  // the re-fetch raced the still-starting services. Wait for RESOLVED LOCALIZED TEXT, which proves
  // the localization pipeline is actually serving strings: the first boot terminates either in the
  // app shell (registered machine — localized "Platform" menu) or in an interactive wizard
  // (unregistered machine — localized "Next"). Once either shows, the post-reload boot is warm.
  await mainPage
    .locator('button:has-text("Platform"), [role="dialog"] button:has-text("Next")')
    .first()
    .waitFor({ state: 'visible', timeout: 90_000 });
  await mainPage.evaluate(() => {
    localStorage.setItem('platform-bible.firstRunDemoMode', 'true');
  });
  await mainPage.reload();
}

test.describe('First-run wizard', () => {
  // The demo-reload path is fast, but the sub-waits along the worst path are sized for a COLD
  // start: injectDemoMode waits up to 90 s for the first boot to settle, then waitForWizard
  // allows 90 s for the dialog plus 75 s for the interactive "Next" — the registration probes
  // legitimately take tens of seconds (up to 3 attempts x ~10-15 s plus backoffs; see
  // resolveRegistrationValidity) — and each step advance allows 60 s for its async settings
  // reads. Those budgets cannot all fit the config's 120 s default, which made the per-step
  // timeouts unreachable paper limits; 240 s lets the documented probe worst case actually
  // complete while still failing in bounded time.
  test.describe.configure({ timeout: 240_000 });

  // Every test runs in demo mode, including these first two: on a machine with a valid Paratext
  // registration the REAL resolution path never shows the wizard at all (registered users skip
  // setup by design), so only demo mode makes the wizard reachable machine-independently. The
  // real routing decisions are pinned by first-run-store's unit tests; what e2e adds is the
  // wizard actually mounting, localizing, and navigating inside the running app.
  test('shows wizard dialog on a clean launch', async ({ mainPage }) => {
    await injectDemoMode(mainPage);
    const frPage = new FirstRunPage(mainPage);
    await frPage.waitForWizard();
    await expect(frPage.dialog).toBeVisible();
  });

  test('advances forward: Language → Internet Settings → Identify (Next hidden)', async ({
    mainPage,
  }) => {
    await injectDemoMode(mainPage);
    const frPage = new FirstRunPage(mainPage);
    await frPage.waitForWizard();

    // Language step: Next is enabled immediately (LanguageStep calls setCanProceed(true) on
    // mount); no Back or "Don't sync yet" yet.
    const nextBtn = frPage.dialog.getByRole('button', { name: 'Next' });
    await expect(nextBtn).toBeEnabled();
    await expect(frPage.dialog.getByRole('button', { name: 'Back' })).not.toBeVisible();
    await expect(frPage.dontSyncYetButton).not.toBeVisible();
    await frPage.clickNext(); // Language → Internet Settings

    // Internet Settings step: Back appears; "Don't sync yet" stays hidden. InternetSettingsStep
    // loads settings asynchronously — clickNext() auto-waits for Next to be enabled.
    await expect(frPage.dialog.getByRole('button', { name: 'Back' })).toBeVisible({
      timeout: 5_000,
    });
    await expect(frPage.dontSyncYetButton).not.toBeVisible();
    await frPage.clickNext(); // Internet Settings → Identify

    // Identify step: Next is hidden entirely (setCanProceed(undefined)) — the step owns its own
    // "Save and restart" primary action. Back is still visible.
    await expect(frPage.dialog.getByRole('button', { name: 'Back' })).toBeVisible({
      timeout: 5_000,
    });
    await expect(frPage.dialog.getByRole('button', { name: /^(Next|Finish)$/i })).not.toBeVisible();
    await expect(frPage.dialog.getByRole('button', { name: /save and restart/i })).toBeVisible();
  });

  test('"Don\'t sync yet" on Sync consent closes the wizard', async ({ mainPage }) => {
    // Demo mode: "Save and restart" calls onNext() directly without a real backend call.
    await injectDemoMode(mainPage);
    const frPage = new FirstRunPage(mainPage);
    await frPage.waitForWizard();

    // Navigate to Sync consent.
    await frPage.clickNext(); // Language → Internet Settings
    await frPage.clickNext(); // Internet Settings → Identify
    await frPage.clickSaveAndRestart(); // Identify → Sync consent (demo: calls onNext())

    // "Don't sync yet" invokes completeFirstRun(), which marks setup complete and unmounts the
    // overlay without persisting any sync preference.
    await expect(frPage.dontSyncYetButton).toBeVisible({
      timeout: 5_000,
    });
    await frPage.clickDontSyncYet();
    await frPage.waitForDismissed();
    await expect(frPage.dialog).not.toBeVisible();
  });

  test('Sync progress step shows "Syncing your projects" and its own Finish button', async ({
    mainPage,
  }) => {
    // Demo mode: "Save and restart" calls onNext() directly without a real backend call.
    await injectDemoMode(mainPage);
    const frPage = new FirstRunPage(mainPage);
    await frPage.waitForWizard();

    // Navigate to Sync progress (the step under test for PT-4179).
    await frPage.clickNext(); // Language → Internet Settings
    await frPage.clickNext(); // Internet Settings → Identify
    await frPage.clickSaveAndRestart(); // Identify → Sync consent (demo: calls onNext())
    // SyncConsentStep (PT-4178) hides Next and shows its own "Sync" primary button. In demo mode,
    // clicking "Sync" resolves the defaultSyncFn immediately without a real backend call.
    await frPage.clickSync(); // Sync consent → Sync progress

    // The syncing heading confirms the step rendered correctly.
    await expect(
      frPage.dialog.getByRole('heading', { name: /syncing your projects/i }),
    ).toBeVisible({ timeout: 10_000 });

    // Deliberately NOT asserting Finish's disabled state: it is a mid-flight state racing two
    // clocks this test cannot control — the step's own 30 s no-events recovery timer (which
    // enables Finish as a fallback), and the dev build's placeholder startup sync, whose real
    // isSyncing true→false cycle enables Finish legitimately within seconds. The
    // disabled-until-complete gating is pinned deterministically in
    // sync-progress.component.test.tsx; what e2e adds is the step actually rendering in the
    // running app with its own primary button.
    const finishBtn = frPage.dialog.getByRole('button', { name: 'Finish' });
    await expect(finishBtn).toBeVisible({ timeout: 5_000 });
  });
});

/**
 * Start counting sync notification toasts in the main window, and return a reader for the count.
 *
 * Every Send/Receive that reaches the data provider in a dev build shows one: paranext-core has no
 * Send/Receive implementation, so the `#if DEBUG` placeholder of the
 * `paratextBibleSendReceive.syncProjects` handler sends a "Syncing projects… (dev placeholder)"
 * notification, which the renderer shows as a toast — the sync notification a user sees. The toast
 * is counted from the DOM as it is added, because it auto-closes after a few seconds and a poll
 * could miss it.
 *
 * Install after the demo-mode reload; a reload discards the observer.
 */
async function watchSyncNotifications(mainPage: Page): Promise<() => Promise<number>> {
  await mainPage.evaluate(() => {
    const root = document.documentElement;
    const counted = new WeakSet<Element>();
    root.dataset.e2eSyncNotifications = '0';
    const countNewToasts = () => {
      document.querySelectorAll('[data-sonner-toast]').forEach((toast) => {
        if (counted.has(toast)) return;
        if (!/Syncing projects[\s\S]*\(dev placeholder\)/.test(toast.textContent ?? '')) return;
        counted.add(toast);
        root.dataset.e2eSyncNotifications = String(Number(root.dataset.e2eSyncNotifications) + 1);
      });
    };
    new MutationObserver(countNewToasts).observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    countNewToasts();
  });
  return () =>
    mainPage.evaluate(() => Number(document.documentElement.dataset.e2eSyncNotifications));
}

/** Logged by `syncOnProjectSwitch` when the first-run consent gate withholds its sync. */
function projectSwitchSyncSkippedLog(consent: 'unconfirmed' | 'deferred'): string {
  return `Project-switch sync skipped: first-run sync consent is ${consent}`;
}

const INTERNET_SETTINGS_OBJECT = 'object:paratextRegistration.internetSettingsDataProvider-data';

type InternetSettings = { permittedInternetUse: string } & Record<string, unknown>;

async function getInternetSettings(): Promise<InternetSettings> {
  // One selector argument, which the provider ignores; it serializes as `null`.
  return sendPapiRequestOnce<InternetSettings>(`${INTERNET_SETTINGS_OBJECT}.getInternetSettings`, [
    undefined,
  ]);
}

/**
 * Put the permitted internet use back to what the machine started with. The Internet Settings step
 * writes each selection straight to ParatextData's own internet settings, which are shared with a
 * co-installed Paratext 9 rather than scoped to the test profile. Writes back what the provider
 * just returned with only that one field changed — the same write the step makes, so the masked
 * secrets in the read are kept as they are.
 */
async function restorePermittedInternetUse(original: string): Promise<void> {
  const current = await getInternetSettings();
  if (current.permittedInternetUse === original) return;
  await sendPapiRequestOnce(`${INTERNET_SETTINGS_OBJECT}.setInternetSettings`, [
    undefined,
    { ...current, permittedInternetUse: original },
  ]);
}

type SyncConsentReached = {
  frPage: FirstRunPage;
  /** Sync notification toasts shown since the wizard came up, the positive control's included. */
  syncNotificationCount: () => Promise<number>;
};

/**
 * Drive the wizard to its Sync consent step with "Unrestricted" chosen on Internet Settings, assert
 * that no Send/Receive started on the way, then hand over to `choose` for the consent choice.
 *
 * Two positive controls keep the negative assertion from passing on a corpus that could never have
 * matched:
 *
 * 1. Before the wizard is advanced, the test sends `syncProjects` itself and waits for its sync
 *    notification toast. That proves the whole observation path — the data provider's handler, the
 *    notification router, the renderer's toast behind the wizard overlay — works in this app
 *    instance, before the window the negative assertion covers even starts.
 * 2. With "Unrestricted" selected, the test switches the Simple-mode editor slot to a project, which
 *    is what the default active project picker behind the wizard overlay does once internet use is
 *    permitted. The gate's skip line must then appear inside the asserted window, proving an
 *    automatic sync trigger actually ran there and was turned away.
 *
 * The seeded `platform.firstRunComplete: false` is what the gate reads, and demo mode never
 * persists completion, so the whole wizard runs with consent unconfirmed.
 */
async function reachSyncConsentAfterUnrestricted(
  mainPage: Page,
  electronApp: ElectronApplication,
  choose: (reached: SyncConsentReached) => Promise<void>,
): Promise<void> {
  const capture = captureAppOutput(electronApp);
  await injectDemoMode(mainPage);
  const frPage = new FirstRunPage(mainPage);
  await frPage.waitForWizard();

  const syncNotificationCount = await watchSyncNotifications(mainPage);
  await sendPapiCommandWhenRegistered('paratextBibleSendReceive.syncProjects', []);
  await expect.poll(syncNotificationCount, { timeout: 30_000 }).toBe(1);

  const gateWindowStart = capture.mark();
  await frPage.clickNext(); // Language → Internet Settings
  await expect(frPage.unrestrictedOption).toBeEnabled({ timeout: 60_000 });
  const originalInternetUse = (await getInternetSettings()).permittedInternetUse;
  try {
    await frPage.selectUnrestricted();

    await makeSampleProjectEditable();
    await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    await expect
      .poll(() => capture.textFrom(gateWindowStart), { timeout: 30_000 })
      .toContain(projectSwitchSyncSkippedLog('unconfirmed'));

    await frPage.clickNext(); // Internet Settings → Identify
    await frPage.clickSaveAndRestart(); // Identify → Sync consent (demo: calls onNext())
    await expect(frPage.syncButton).toBeVisible({ timeout: 10_000 });
    // Still only the positive control's toast.
    expect(await syncNotificationCount()).toBe(1);

    await choose({ frPage, syncNotificationCount });
  } finally {
    await restorePermittedInternetUse(originalInternetUse);
  }
}

test.describe('First-run sync consent gate', () => {
  // The isolated project root gives the editor switch a project that exists on every machine.
  // DEV_NOISY=false keeps the Simple layout's own editor slot, which the switch replaces.
  test.use({
    electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
  });
  // The wizard path's cold-start budgets (see 'First-run wizard' above) plus a sample-project
  // install and an editor open, each of which is also budgeted for a cold boot.
  test.describe.configure({ timeout: 360_000 });

  test('"Don\'t sync yet" after Unrestricted: no sync before consent, then deferred for the session', async ({
    mainPage,
    electronApp,
  }) => {
    await reachSyncConsentAfterUnrestricted(
      mainPage,
      electronApp,
      async ({ frPage, syncNotificationCount }) => {
        await frPage.clickDontSyncYet();
        await frPage.waitForDismissed();

        // The main process recorded the deferral, so every automatic trigger answers 'deferred'
        // for the rest of this session. (A second project switch cannot demonstrate it here: the
        // isolated root holds one project, and reopening it only focuses the existing editor.)
        expect(await sendPapiCommandWhenRegistered('platform.getAutomaticSyncConsent')).toBe(
          'deferred',
        );
        expect(await syncNotificationCount()).toBe(1);
      },
    );
  });

  test('"Sync" after Unrestricted: no sync before consent, and choosing Sync does not defer', async ({
    mainPage,
    electronApp,
  }) => {
    await reachSyncConsentAfterUnrestricted(mainPage, electronApp, async ({ frPage }) => {
      await frPage.clickSync(); // Sync consent → Sync progress
      await expect(
        frPage.dialog.getByRole('heading', { name: /syncing your projects/i }),
      ).toBeVisible({ timeout: 10_000 });

      // Demo mode resolves the Sync button without sending the command, so the sync it starts is
      // not observable here. What is: this choice must not record the session deferral that "Don't
      // sync yet" does. Demo mode never persists completion, so a gate that was not deferred still
      // answers 'unconfirmed'.
      expect(await sendPapiCommandWhenRegistered('platform.getAutomaticSyncConsent')).toBe(
        'unconfirmed',
      );
    });
  });
});
