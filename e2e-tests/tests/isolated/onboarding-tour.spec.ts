/**
 * E2E tests for the onboarding tour.
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
 * ## Expected stops
 *
 * Four stops always resolve here: the project, model-text and resources dock columns, and the user
 * profile trigger. The Send/Receive stop is conditional — its anchor (`toolbar-sync-area`) is an
 * empty, zero-size wrapper unless the send/receive extension supplies the sync button, and Tour
 * skips zero-size targets. paranext-core does not bundle that extension, so the stop is normally
 * absent; it can still appear if the tour opens before the availability probe settles. Hence the
 * assertions below: the four unconditional stops must ALL be present and in order, and the sync
 * stop is the only permitted variation.
 *
 * ## Tour retrigger
 *
 * The tour only shows _on its own_ when `platform-bible.onboardingTourComplete` is absent from
 * localStorage. Because each test gets a fresh isolated user-data dir, localStorage starts empty —
 * the tour appears without any explicit clearing. Tests that verify the "does not show again"
 * behaviour advance all the way through the tour first to write the flag, then reload. Help > Show
 * the tour again (`platform.showOnboardingTour`) is the one path that reopens it regardless of the
 * flag.
 */
import type { Page } from '@playwright/test';
import { test, expect } from '../../fixtures/isolated.fixture';
import { preConfigureSettings, waitForAppReady } from '../../fixtures/helpers';
import {
  clearTourDone,
  getTourDialog,
  getTourTotalSteps,
  getCurrentStepTitle,
  advanceTour,
  advanceToLastStep,
  goBackTour,
  skipTour,
} from './onboarding-tour.page';

/** Titles (from `assets/localization/en.json`) of the stops that always resolve in this build. */
const REQUIRED_STEP_TITLES = [
  'Your project',
  'Your model text',
  'Your resources and tools',
  'Profile',
];
/** Title of the stop that is present only when the send/receive extension supplies the sync button. */
const CONDITIONAL_STEP_TITLE = 'Sync';

/**
 * These tests need the tour to actually show, so opt out of waitForAppReady's default tour
 * suppression.
 */
async function waitForAppReadyWithTour(page: Page): Promise<void> {
  await waitForAppReady(page, { allowOnboardingTour: true });
}

/** Walks the tour from its current step to the last one, collecting each step's title in order. */
async function collectStepTitles(page: Page): Promise<string[]> {
  const titles: string[] = [];
  const dialog = getTourDialog(page);
  const nextButton = dialog.getByRole('button', { name: /^Next$/i });
  // Bounded well above the real stop count so a regression cannot loop forever.
  for (let i = 0; i < 10; i += 1) {
    // Walking the tour is sequential by definition — each step must be read, then clicked past,
    // before the next one exists to read. There is nothing here to parallelize.
    // eslint-disable-next-line no-await-in-loop
    titles.push(await getCurrentStepTitle(page));
    // Same reason: the button's visibility is only meaningful for the step just recorded.
    // eslint-disable-next-line no-await-in-loop
    if (!(await nextButton.isVisible())) break;
    // Same reason: the click must land before the loop reads the step it reveals.
    // eslint-disable-next-line no-await-in-loop
    await nextButton.click();
  }
  return titles;
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

  test('spotlights every unconditional stop, in order', async ({ mainPage }) => {
    await waitForAppReadyWithTour(mainPage);

    const dialog = getTourDialog(mainPage);
    await expect(dialog).toBeVisible({ timeout: 15_000 });

    const total = await getTourTotalSteps(mainPage);
    const titles = await collectStepTitles(mainPage);

    expect(titles).toHaveLength(total);
    // The four unconditional stops must all be there, in this order — the sync stop may or may not
    // sit between resources and profile, so filtering it out is what makes the check stable
    // without weakening it to a bare count.
    expect(titles.filter((t) => t !== CONDITIONAL_STEP_TITLE)).toEqual(REQUIRED_STEP_TITLES);
    expect(total).toBe(
      REQUIRED_STEP_TITLES.length + (titles.includes(CONDITIONAL_STEP_TITLE) ? 1 : 0),
    );
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

  test('Back returns to the previous step', async ({ mainPage }) => {
    await waitForAppReadyWithTour(mainPage);

    const dialog = getTourDialog(mainPage);
    await expect(dialog).toBeVisible({ timeout: 15_000 });

    // Back is deliberately absent on the first step, so it only appears once we have advanced.
    await expect(dialog.getByRole('button', { name: /^Back$/i })).not.toBeVisible();
    expect(await getCurrentStepTitle(mainPage)).toBe(REQUIRED_STEP_TITLES[0]);

    await advanceTour(mainPage);
    const secondTitle = await getCurrentStepTitle(mainPage);
    expect(secondTitle).not.toBe(REQUIRED_STEP_TITLES[0]);

    await goBackTour(mainPage);
    expect(await getCurrentStepTitle(mainPage)).toBe(REQUIRED_STEP_TITLES[0]);
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

    // Advance through all steps and click Done, which is what records completion.
    await advanceToLastStep(mainPage);
    await dialog.getByRole('button', { name: /^Done$/i }).click();
    await expect(dialog).not.toBeVisible({ timeout: 5_000 });

    await mainPage.reload();
    await waitForAppReadyWithTour(mainPage);

    // The tour must not appear again because completion is already recorded.
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

  test('shows again once the completion record is cleared', async ({ mainPage }) => {
    await waitForAppReadyWithTour(mainPage);

    const dialog = getTourDialog(mainPage);
    await expect(dialog).toBeVisible({ timeout: 15_000 });

    // Skipping records completion, so a reload alone would not bring the tour back.
    await skipTour(mainPage);
    await expect(dialog).not.toBeVisible({ timeout: 5_000 });
    await mainPage.reload();
    await waitForAppReadyWithTour(mainPage);
    await expect(dialog).not.toBeVisible({ timeout: 5_000 });

    await clearTourDone(mainPage);
    await mainPage.reload();
    await waitForAppReadyWithTour(mainPage);
    await expect(dialog).toBeVisible({ timeout: 15_000 });
  });

  test('Help > Show the tour again reopens the completed tour at its first stop', async ({
    mainPage,
  }) => {
    await waitForAppReadyWithTour(mainPage);

    const dialog = getTourDialog(mainPage);
    await expect(dialog).toBeVisible({ timeout: 15_000 });

    // Skipping records completion, so nothing but the menu item can bring the tour back.
    await skipTour(mainPage);
    await expect(dialog).not.toBeVisible({ timeout: 5_000 });

    await mainPage.getByRole('menuitem', { name: /^Help$/i }).click();
    await mainPage.getByRole('menuitem', { name: /Show the tour again/i }).click();

    await expect(dialog).toBeVisible({ timeout: 15_000 });
    expect(await getCurrentStepTitle(mainPage)).toBe(REQUIRED_STEP_TITLES[0]);
  });
});
