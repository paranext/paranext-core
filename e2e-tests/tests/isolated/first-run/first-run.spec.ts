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
 * - "Don't sync yet" on Sync consent closes the wizard (PT-4178, PT-4369)
 * - Sync progress step renders the syncing heading with Finish disabled (PT-4179)
 *
 * Navigation note: IdentifyStep hides the shell's Next button and owns its own "Save and restart"
 * primary action (which triggers a real app restart in production). SyncConsentStep (PT-4178)
 * similarly hides Next and owns its own "Sync" primary action (which calls the S/R backend in
 * production). Tests that need to navigate past either step use demo mode
 * (`platform-bible.firstRunDemoMode` localStorage flag): "Save and restart" calls onNext()
 * directly, and "Sync" resolves immediately without a real backend call.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import { preConfigureSettings } from '../../../fixtures/helpers';
import { FirstRunPage } from './first-run.page';

// Override dev-appdata so the wizard always shows, even after a developer has
// run the app locally and persisted platform.firstRunComplete: true.
// Per-test (beforeEach/afterEach) rather than per-suite: the "skip setup" test calls
// completeFirstRun() which writes firstRunComplete:true back to the file, poisoning any
// subsequent test that runs against the same settings.json within the same suite.
let restoreSettings: (() => void) | undefined;

test.beforeEach(() => {
  restoreSettings = preConfigureSettings({ 'platform.firstRunComplete': false });
});

test.afterEach(() => {
  restoreSettings?.();
});

/**
 * Activate demo mode by injecting the localStorage flag before resolveInternal() reads it. In demo
 * mode:
 *
 * - The wizard always starts at the language step (bypasses registration + wizardActive checks).
 * - IdentifyStep's "Save and restart" calls onNext() directly instead of restarting the app.
 * - Completion is not persisted, so the wizard re-runs on every launch.
 *
 * ResolveInternal() is async (involves a network call to check registration validity). Injecting
 * immediately after the page is obtained exploits the gap before that async call reads the flag.
 */
async function injectDemoMode(mainPage: import('@playwright/test').Page): Promise<void> {
  await mainPage.evaluate(() => {
    localStorage.setItem('platform-bible.firstRunDemoMode', 'true');
  });
}

test.describe('First-run wizard', () => {
  test('shows wizard dialog on a clean launch', async ({ mainPage }) => {
    const frPage = new FirstRunPage(mainPage);
    await frPage.waitForWizard();
    await expect(frPage.dialog).toBeVisible();
  });

  test('advances forward: Language → Internet Settings → Identify (Next hidden)', async ({
    mainPage,
  }) => {
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

  test('Sync progress step shows "Syncing your projects" with Finish disabled', async ({
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

    // Finish is disabled until a full sync cycle completes. No S/R backend is running
    // in e2e, so no sync events arrive — the button stays disabled throughout this test
    // (the 30 s recovery timeout would enable it, but we assert before that window elapses).
    const finishBtn = frPage.dialog.getByRole('button', { name: 'Finish' });
    await expect(finishBtn).toBeVisible({ timeout: 5_000 });
    await expect(finishBtn).toBeDisabled();
  });
});
