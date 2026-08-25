/**
 * E2E tests for the onboarding tour (PT-4261 / PT-4262).
 *
 * The onboarding tour is a one-shot spotlight overlay that shows once in Simple mode after the
 * first-run wizard has been completed (i.e. `firstRunStatus.kind === 'app'`). It persists
 * completion in localStorage (`platform-bible.onboardingTourComplete`) and never shows again.
 *
 * ## Test strategy
 *
 * Each test uses `isolated.fixture` (fresh Electron instance per test) to get a clean localStorage.
 * `preConfigureSettings` seeds:
 *
 * - `platform.interfaceMode: 'simple'` — required for the tour to render (it only shows in Simple
 *   mode).
 * - `platform.firstRunComplete: true` — so `resolveInternal` resolves to `{ kind: 'app' }` without
 *   going through the wizard and without contacting the Paratext registration backend.
 *
 * `waitForAppReady` suppresses the tour by default (it writes the completion flag so no other test
 * races the tour's async open). These tests are the exception — they pass `allowOnboardingTour:
 * true` via the local `waitForAppReadyWithTour` wrapper so the tour is free to show.
 *
 * ## Step count flexibility
 *
 * The tour targets five elements: the project panel, model-text panel, resources panel,
 * toolbar-sync-area, and user-profile-popover-trigger. The first three are rc-dock panel columns
 * with `data-dockid` attributes. Tests that assert a specific step count use `>= 2` as the lower
 * bound to allow for missing dock panels in environments where the dock layout hasn't yet mounted
 * one or more columns, and because zero-size targets (e.g. the empty sync area when send/receive is
 * unavailable) are skipped.
 *
 * ## Tour retrigger
 *
 * The tour only shows when `platform-bible.onboardingTourComplete` is absent from localStorage.
 * Because each test gets a fresh isolated user-data dir, localStorage starts empty — the tour
 * appears without any explicit clearing. Tests that verify the "does not show again" behaviour
 * advance all the way through the tour first to write the flag, then reload.
 */
import type { Page } from '@playwright/test';
import { test, expect } from '../../fixtures/isolated.fixture';
import { preConfigureSettings, waitForAppReady } from '../../fixtures/helpers';
import {
  clearTourDone,
  getTourDialog,
  getTourDoneFlag,
  getTourStepCount,
  getCurrentStepTitle,
  advanceTour,
  advanceToLastStep,
  skipTour,
} from './onboarding-tour.page';

/**
 * These tests need the tour to actually show, so opt out of waitForAppReady's default tour
 * suppression.
 */
async function waitForAppReadyWithTour(page: Page): Promise<void> {
  await waitForAppReady(page, undefined, { allowOnboardingTour: true });
}

// Seed settings before each Electron launch so the wizard gate is bypassed and the tour is free
// to show. Each test gets a fresh isolated Electron instance (isolated.fixture is test-scoped),
// so the before/after pattern from first-run-wizard.spec.ts applies here too.
let restoreSettings: (() => void) | undefined;

test.beforeEach(() => {
  restoreSettings = preConfigureSettings({
    'platform.interfaceMode': 'simple',
    'platform.firstRunComplete': true,
  });
});

test.afterEach(() => {
  restoreSettings?.();
});

test.describe('Onboarding tour', () => {
  test('shows on first launch in Simple mode (fresh localStorage)', async ({ mainPage }) => {
    // The isolated fixture gives us a clean user-data dir with no localStorage, so the tour
    // shows without any manual clearing. waitForAppReady confirms the dock and overlay are settled
    // before we assert tour visibility.
    await waitForAppReadyWithTour(mainPage);

    const dialog = getTourDialog(mainPage);
    await expect(dialog).toBeVisible({ timeout: 15_000 });
  });

  test('has at least 2 steps (flexible: Paratext panels may not be present)', async ({
    mainPage,
  }) => {
    await waitForAppReadyWithTour(mainPage);

    const dialog = getTourDialog(mainPage);
    await expect(dialog).toBeVisible({ timeout: 15_000 });

    // The step counter reads "1 / N" where N >= 2 (panel columns may be absent in headless or
    // partial-layout environments, and zero-size targets are skipped).
    const counterText = await getTourStepCount(mainPage);
    // Extract total from "1 / N"
    const match = /(\d+)\s*\/\s*(\d+)/.exec(counterText);
    expect(match, `Expected "X / Y" counter but got: "${counterText}"`).not.toBeNull();
    // match[1] is current step (1), match[2] is total
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const total = parseInt(match![2], 10);
    expect(total).toBeGreaterThanOrEqual(2);
  });

  test('advances through all steps with Next and shows Done on the last step', async ({
    mainPage,
  }) => {
    await waitForAppReadyWithTour(mainPage);

    const dialog = getTourDialog(mainPage);
    await expect(dialog).toBeVisible({ timeout: 15_000 });

    await advanceToLastStep(mainPage);

    // On the last step the primary button label changes to "Done".
    await expect(dialog.getByRole('button', { name: /^Done$/i })).toBeVisible({ timeout: 5_000 });
    await expect(dialog.getByRole('button', { name: /^Next$/i })).not.toBeVisible();
  });

  test('Skip closes the tour immediately', async ({ mainPage }) => {
    await waitForAppReadyWithTour(mainPage);

    const dialog = getTourDialog(mainPage);
    await expect(dialog).toBeVisible({ timeout: 15_000 });

    await skipTour(mainPage);

    // The tour dialog disappears after skip.
    await expect(dialog).not.toBeVisible({ timeout: 5_000 });
  });

  test('after completing the tour it does not show again after reload', async ({ mainPage }) => {
    await waitForAppReadyWithTour(mainPage);

    const dialog = getTourDialog(mainPage);
    await expect(dialog).toBeVisible({ timeout: 15_000 });

    // Advance through all steps and click Done to write the completion flag.
    await advanceToLastStep(mainPage);
    // Click Done on the last step — this writes 'platform-bible.onboardingTourComplete' to
    // localStorage via writeTourDone().
    await dialog.getByRole('button', { name: /^Done$/i }).click();
    await expect(dialog).not.toBeVisible({ timeout: 5_000 });

    // Confirm the flag was written, then reload the renderer to trigger a fresh component mount.
    expect(await getTourDoneFlag(mainPage)).toBe('true');

    await mainPage.reload();
    await waitForAppReadyWithTour(mainPage);

    // The tour must not appear again because the completion flag is already set.
    await expect(dialog).not.toBeVisible({ timeout: 5_000 });
  });

  test('Escape key closes the tour', async ({ mainPage }) => {
    await waitForAppReadyWithTour(mainPage);

    const dialog = getTourDialog(mainPage);
    await expect(dialog).toBeVisible({ timeout: 15_000 });

    // Advance one step first so we verify Escape works mid-tour, not just on step 1.
    // advanceTour clicks Next (or Done if on the last step).
    await advanceTour(mainPage);

    // The Tour component listens for Escape in the capture phase and calls onSkip.
    await mainPage.keyboard.press('Escape');

    await expect(dialog).not.toBeVisible({ timeout: 5_000 });
  });

  test('clearTourDone helper removes the completion flag so the tour re-appears', async ({
    mainPage,
  }) => {
    await waitForAppReadyWithTour(mainPage);

    // Skip the tour to write the flag.
    const dialog = getTourDialog(mainPage);
    await expect(dialog).toBeVisible({ timeout: 15_000 });
    await skipTour(mainPage);
    await expect(dialog).not.toBeVisible({ timeout: 5_000 });

    // Verify the flag was written.
    expect(await getTourDoneFlag(mainPage)).toBe('true');

    // Clear the flag.
    await clearTourDone(mainPage);
    expect(await getTourDoneFlag(mainPage)).toBeNull();

    // Reload — the tour should appear again.
    await mainPage.reload();
    await waitForAppReadyWithTour(mainPage);
    await expect(dialog).toBeVisible({ timeout: 15_000 });
  });

  test('getCurrentStepTitle returns the title of the active step', async ({ mainPage }) => {
    await waitForAppReadyWithTour(mainPage);

    const dialog = getTourDialog(mainPage);
    await expect(dialog).toBeVisible({ timeout: 15_000 });

    const title = await getCurrentStepTitle(mainPage);
    // The first step title comes from localisation; it should be a non-empty string.
    expect(title.length).toBeGreaterThan(0);
  });
});
