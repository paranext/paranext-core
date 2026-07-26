/**
 * E2E tests for the first-run wizard (PT-4175 / PT-4179).
 *
 * These tests use isolated.fixture (fresh Electron per test) because the first-run
 * wizard is a one-time modal that only shows on a clean profile. preConfigureSettings
 * forces platform.firstRunComplete: false so the wizard always appears even on a dev
 * machine where the developer has already completed first-run.
 *
 * Tests cover the navigable (no live S/R backend required) paths:
 *   - Wizard appears and localisation resolves
 *   - Forward navigation: Language → Identify → Sync consent
 *   - Skip setup on Sync consent closes the wizard
 *   - Sync progress step renders the syncing heading with Finish disabled
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import { preConfigureSettings } from '../../../fixtures/helpers';
import { FirstRunPage } from './first-run.page';

// Override dev-appdata so the wizard always shows, even after a developer has
// run the app locally and persisted platform.firstRunComplete: true.
let restoreSettings: (() => void) | undefined;

test.beforeAll(() => {
  restoreSettings = preConfigureSettings({ 'platform.firstRunComplete': false });
});

test.afterAll(() => {
  restoreSettings?.();
});

test.describe('First-run wizard', () => {
  test('shows wizard dialog on a clean launch', async ({ mainPage }) => {
    const frPage = new FirstRunPage(mainPage);
    await frPage.waitForWizard();
    await expect(frPage.dialog).toBeVisible();
  });

  test('advances forward: Language → Identify → Sync consent', async ({ mainPage }) => {
    const frPage = new FirstRunPage(mainPage);
    await frPage.waitForWizard();

    // Language step: Next is enabled immediately; no Back or Skip setup yet.
    const nextBtn = frPage.dialog.getByRole('button', { name: 'Next' });
    await expect(nextBtn).toBeEnabled();
    await expect(frPage.dialog.getByRole('button', { name: 'Back' })).not.toBeVisible();
    await expect(frPage.dialog.getByRole('button', { name: 'Skip setup' })).not.toBeVisible();
    await frPage.clickNext();

    // Identify step: Back appears.
    await expect(frPage.dialog.getByRole('button', { name: 'Back' })).toBeVisible({
      timeout: 5_000,
    });
    await expect(frPage.dialog.getByRole('button', { name: 'Skip setup' })).not.toBeVisible();
    await frPage.clickNext();

    // Sync consent step: Back and "Skip setup" both visible.
    await expect(frPage.dialog.getByRole('button', { name: 'Skip setup' })).toBeVisible({
      timeout: 5_000,
    });
    await expect(frPage.dialog.getByRole('button', { name: 'Back' })).toBeVisible();
  });

  test('skip setup on Sync consent closes the wizard', async ({ mainPage }) => {
    const frPage = new FirstRunPage(mainPage);
    await frPage.waitForWizard();

    // Navigate to Sync consent.
    await frPage.clickNext(); // Language → Identify
    await frPage.clickNext(); // Identify → Sync consent

    // Skip setup invokes completeFirstRun({ syncSkipped: true }) which marks setup
    // complete and unmounts the overlay.
    await expect(frPage.dialog.getByRole('button', { name: 'Skip setup' })).toBeVisible({
      timeout: 5_000,
    });
    await frPage.clickSkipSetup();
    await frPage.waitForDismissed();
    await expect(frPage.dialog).not.toBeVisible();
  });

  test('Sync progress step shows "Syncing your data" with Finish disabled', async ({
    mainPage,
  }) => {
    const frPage = new FirstRunPage(mainPage);
    await frPage.waitForWizard();

    // Navigate to Sync progress (the step under test for PT-4179).
    await frPage.clickNext(); // Language → Identify
    await frPage.clickNext(); // Identify → Sync consent
    // The Sync consent placeholder calls setCanProceed(true) on mount, so Next is enabled.
    await frPage.clickNext(); // Sync consent → Sync progress

    // The syncing heading confirms the step rendered correctly.
    await expect(frPage.dialog.getByRole('heading', { name: 'Syncing your data' })).toBeVisible({
      timeout: 10_000,
    });

    // Finish is disabled until a full sync cycle completes. No S/R backend is running
    // in e2e, so no sync events arrive — the button stays disabled throughout this test
    // (the 30 s recovery timeout would enable it, but we assert before that window elapses).
    const finishBtn = frPage.dialog.getByRole('button', { name: 'Finish' });
    await expect(finishBtn).toBeVisible({ timeout: 5_000 });
    await expect(finishBtn).toBeDisabled();
  });
});
