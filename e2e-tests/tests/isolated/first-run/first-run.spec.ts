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
 * - Skip setup on Sync consent closes the wizard
 * - Sync progress step renders the syncing heading with Finish disabled
 *
 * Navigation note: IdentifyStep hides the shell's Next button and owns its own "Save and restart"
 * primary action (which triggers a real app restart in production). Tests that need to navigate
 * past Identify use demo mode (`platform-bible.firstRunDemoMode` localStorage flag), which makes
 * "Save and restart" call onNext() directly without a backend round-trip or restart.
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
    // mount); no Back or Skip setup yet.
    const nextBtn = frPage.dialog.getByRole('button', { name: 'Next' });
    await expect(nextBtn).toBeEnabled();
    await expect(frPage.dialog.getByRole('button', { name: 'Back' })).not.toBeVisible();
    await expect(frPage.dialog.getByRole('button', { name: 'Skip setup' })).not.toBeVisible();
    await frPage.clickNext(); // Language → Internet Settings

    // Internet Settings step: Back appears; Skip setup stays hidden. InternetSettingsStep loads
    // settings asynchronously — clickNext() auto-waits for Next to be enabled.
    await expect(frPage.dialog.getByRole('button', { name: 'Back' })).toBeVisible({
      timeout: 5_000,
    });
    await expect(frPage.dialog.getByRole('button', { name: 'Skip setup' })).not.toBeVisible();
    await frPage.clickNext(); // Internet Settings → Identify

    // Identify step: Next is hidden entirely (setCanProceed(undefined)) — the step owns its own
    // "Save and restart" primary action. Back is still visible.
    await expect(frPage.dialog.getByRole('button', { name: 'Back' })).toBeVisible({
      timeout: 5_000,
    });
    await expect(frPage.dialog.getByRole('button', { name: /^(Next|Finish)$/i })).not.toBeVisible();
    await expect(frPage.dialog.getByRole('button', { name: /save and restart/i })).toBeVisible();
  });

  test('skip setup on Sync consent closes the wizard', async ({ mainPage }) => {
    // Demo mode: "Save and restart" calls onNext() directly without a real backend call.
    await injectDemoMode(mainPage);
    const frPage = new FirstRunPage(mainPage);
    await frPage.waitForWizard();

    // Navigate to Sync consent.
    await frPage.clickNext(); // Language → Internet Settings
    await frPage.clickNext(); // Internet Settings → Identify
    await frPage.clickSaveAndRestart(); // Identify → Sync consent (demo: calls onNext())

    // Skip setup invokes completeFirstRun({ syncSkipped: true }) which marks setup
    // complete and unmounts the overlay.
    await expect(frPage.dialog.getByRole('button', { name: 'Skip setup' })).toBeVisible({
      timeout: 5_000,
    });
    await frPage.clickSkipSetup();
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
    // The Sync consent placeholder calls setCanProceed(true) on mount, so Next is enabled.
    await frPage.clickNext(); // Sync consent → Sync progress

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
