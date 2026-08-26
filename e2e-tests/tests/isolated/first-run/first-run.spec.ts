/**
 * E2E tests for the first-run wizard (PT-4175 / PT-4179).
 *
 * These tests use isolated.fixture (fresh Electron per test) because the first-run wizard is a
 * one-time modal that only shows on a clean profile. preConfigureSettings forces
 * platform.firstRunComplete: false so a developer's completed first-run does not suppress the gate,
 * and every test then enters the wizard through demo mode — see startWizardInDemoMode for why the
 * setting alone cannot get there on a registered machine.
 *
 * Tests cover:
 *
 * - Wizard appears and localisation resolves
 * - Forward navigation: Language → Internet Settings → Identify (Next hidden at Identify)
 * - Skip automatic sync on Sync consent closes the wizard (PT-4178)
 * - Sync progress step renders the syncing heading with Finish disabled (PT-4179)
 *
 * Navigation note: IdentifyStep hides the shell's Next button and owns its own "Save and restart"
 * primary action (which triggers a real app restart in production). SyncConsentStep (PT-4178)
 * similarly hides Next and owns its own "Sync" primary action (which calls the S/R backend in
 * production). Tests that need to navigate past either step use demo mode
 * (`platform-bible.firstRunDemoMode` localStorage flag): "Save and restart" calls onNext()
 * directly, and "Sync" resolves immediately without a real backend call.
 */
import type { Page } from '@playwright/test';
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
 * Put the wizard in demo mode before the renderer boots, then reload so the flag is already there
 * when the first-run store computes its initial status and resolves. In demo mode:
 *
 * - The wizard always starts at the language step (bypasses registration + wizardActive checks).
 * - IdentifyStep's "Save and restart" calls onNext() directly instead of restarting the app.
 * - Completion is not persisted, so the wizard re-runs on every launch.
 *
 * Demo mode is what makes this suite runnable anywhere. Outside it the gate asks the machine's
 * Paratext registration (`paratextRegistration.doesUserHaveValidRegistration` reads ParatextData's
 * machine-level RegistrationInfo, not anything the profile owns), and for a registered developer
 * `decideFirstRun` answers `completeThenShowApp`: the wizard is never meant to appear at all. That
 * registration-driven decision is a pure function with its own unit coverage
 * (src/renderer/services/first-run.reducer.test.ts); what only an E2E can cover, and what these
 * tests cover, is the wizard the decision leads to.
 *
 * `addInitScript` + `reload` rather than a bare `evaluate` on the loaded page: the store reads the
 * flag while the renderer is first painting, so a write afterwards is racing it.
 */
async function startWizardInDemoMode(mainPage: Page): Promise<void> {
  await mainPage.addInitScript(() => {
    localStorage.setItem('platform-bible.firstRunDemoMode', 'true');
  });
  await mainPage.reload();
}

test.describe('First-run wizard', () => {
  test('shows the wizard dialog', async ({ mainPage }) => {
    await startWizardInDemoMode(mainPage);
    const frPage = new FirstRunPage(mainPage);
    await frPage.waitForWizard();
    await expect(frPage.dialog).toBeVisible();
  });

  test('advances forward: Language → Internet Settings → Identify (Next hidden)', async ({
    mainPage,
  }) => {
    await startWizardInDemoMode(mainPage);
    const frPage = new FirstRunPage(mainPage);
    await frPage.waitForWizard();

    // Language step: Next is enabled immediately (LanguageStep calls setCanProceed(true) on
    // mount); no Back or Skip automatic sync yet.
    const nextBtn = frPage.dialog.getByRole('button', { name: 'Next' });
    await expect(nextBtn).toBeEnabled();
    await expect(frPage.dialog.getByRole('button', { name: 'Back' })).not.toBeVisible();
    await expect(
      frPage.dialog.getByRole('button', { name: 'Skip automatic sync' }),
    ).not.toBeVisible();
    await frPage.clickNext(); // Language → Internet Settings

    // Internet Settings step: Back appears; Skip automatic sync stays hidden. InternetSettingsStep
    // loads settings asynchronously — clickNext() auto-waits for Next to be enabled.
    await expect(frPage.dialog.getByRole('button', { name: 'Back' })).toBeVisible({
      timeout: 5_000,
    });
    await expect(
      frPage.dialog.getByRole('button', { name: 'Skip automatic sync' }),
    ).not.toBeVisible();
    await frPage.clickNext(); // Internet Settings → Identify

    // Identify step: Next is hidden entirely (setCanProceed(undefined)) — the step owns its own
    // "Save and restart" primary action. Back is still visible.
    await expect(frPage.dialog.getByRole('button', { name: 'Back' })).toBeVisible({
      timeout: 5_000,
    });
    await expect(frPage.dialog.getByRole('button', { name: /^(Next|Finish)$/i })).not.toBeVisible();
    await expect(frPage.dialog.getByRole('button', { name: /save and restart/i })).toBeVisible();
  });

  test('skip automatic sync on Sync consent closes the wizard', async ({ mainPage }) => {
    // Demo mode: "Save and restart" calls onNext() directly without a real backend call.
    await startWizardInDemoMode(mainPage);
    const frPage = new FirstRunPage(mainPage);
    await frPage.waitForWizard();

    // Navigate to Sync consent.
    await frPage.clickNext(); // Language → Internet Settings
    await frPage.clickNext(); // Internet Settings → Identify
    await frPage.fillRegistrationName('First-run e2e');
    await frPage.clickSaveAndRestart(); // Identify → Sync consent (demo: calls onNext())

    // "Skip automatic sync" invokes completeFirstRun({ skippedStep: 'syncConsent' }) which marks
    // setup complete and unmounts the overlay.
    await expect(frPage.dialog.getByRole('button', { name: 'Skip automatic sync' })).toBeVisible({
      timeout: 5_000,
    });
    await frPage.clickSkipAutomaticSync();
    await frPage.waitForDismissed();
    await expect(frPage.dialog).not.toBeVisible();
  });

  test('Sync progress step shows "Syncing your projects" with Finish disabled', async ({
    mainPage,
  }) => {
    // Demo mode: "Save and restart" calls onNext() directly without a real backend call.
    await startWizardInDemoMode(mainPage);
    const frPage = new FirstRunPage(mainPage);
    await frPage.waitForWizard();

    // Navigate to Sync progress (the step under test for PT-4179).
    await frPage.clickNext(); // Language → Internet Settings
    await frPage.clickNext(); // Internet Settings → Identify
    await frPage.fillRegistrationName('First-run e2e');
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
