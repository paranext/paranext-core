import type { Locator, Page } from '@playwright/test';
import { ONBOARDING_TOUR_DONE_KEY } from '../../fixtures/helpers';

/**
 * Page-object helpers for the onboarding tour overlay.
 *
 * The tour is a `role="dialog"` overlay rendered by `OnboardingTour` (which delegates to `Tour`).
 * It only appears in Simple mode when `firstRunStatus.kind === 'app'` and the user has not yet
 * completed or skipped it (`platform-bible.onboardingTourComplete` absent from localStorage).
 *
 * All locator helpers scope queries inside the tour dialog element so they cannot accidentally
 * match other content in the app.
 *
 * Button labels (from `assets/localization/en.json`):
 *
 * - Next: `%firstRun_button_next%` → "Next"
 * - Back: `%firstRun_button_back%` → "Back"
 * - Done: `%onboardingTour_button_done%` → "Done"
 * - Skip: `%onboardingTour_button_skip%` → "Skip tour"
 */

/** Clears the onboarding-tour completion flag from localStorage. */
export async function clearTourDone(page: Page): Promise<void> {
  await page.evaluate((key) => {
    localStorage.removeItem(key);
  }, ONBOARDING_TOUR_DONE_KEY);
}

/**
 * Returns a Locator for the tour dialog element. The Tour component renders its outermost div with
 * `data-testid="tour-dialog"` — a tour-specific hook, so this can never match another modal
 * dialog.
 */
export function getTourDialog(page: Page): Locator {
  return page.getByTestId('tour-dialog');
}

/** Returns the step-counter display text (e.g. `"1 of 5"`). */
export async function getTourStepCount(page: Page): Promise<string> {
  const counter = getTourDialog(page).getByTestId('tour-step-counter');
  return counter.textContent().then((t) => t?.trim() ?? '');
}

/**
 * Returns the total number of stops the tour resolved, parsed from the step counter. Throws if the
 * counter does not read as "current of total", so a malformed counter fails loudly rather than
 * silently reporting zero stops.
 */
export async function getTourTotalSteps(page: Page): Promise<number> {
  const counterText = await getTourStepCount(page);
  const match = /(\d+)\D+(\d+)/.exec(counterText);
  if (!match) throw new Error(`Expected a "current of total" counter but got: "${counterText}"`);
  return parseInt(match[2], 10);
}

/** Returns the current step card's title text. */
export async function getCurrentStepTitle(page: Page): Promise<string> {
  const title = getTourDialog(page).getByTestId('tour-step-title');
  return title.textContent().then((t) => t?.trim() ?? '');
}

/**
 * Clicks the primary action button (Next on intermediate steps, Done on the last step). Uses a
 * regex so it matches whichever label the localization provides.
 */
export async function advanceTour(page: Page): Promise<void> {
  const dialog = getTourDialog(page);
  await dialog.getByRole('button', { name: /^(Next|Done)$/i }).click();
}

/** Clicks the Back button to return to the previous step. */
export async function goBackTour(page: Page): Promise<void> {
  const dialog = getTourDialog(page);
  await dialog.getByRole('button', { name: /^Back$/i }).click();
}

/**
 * Clicks Next until the last step is reached — i.e. until the primary button reads Done instead of
 * Next. Does NOT click Done, so callers can assert last-step state or finish explicitly. Bounded
 * well above the tour's real step count so a regression cannot loop forever; if Next is still
 * visible after the bound, the caller's next assertion fails with a clear error.
 */
export async function advanceToLastStep(page: Page): Promise<void> {
  const dialog = getTourDialog(page);
  const nextButton = dialog.getByRole('button', { name: /^Next$/i });
  for (let i = 0; i < 10; i += 1) {
    // Steps are inherently sequential — must observe the current step before advancing.
    // eslint-disable-next-line no-await-in-loop
    if (!(await nextButton.isVisible())) return;
    // Sequential: the click must complete (revealing the next step) before the next iteration.
    // eslint-disable-next-line no-await-in-loop
    await nextButton.click();
  }
}

/**
 * Clicks the Skip button to dismiss the tour early. The Skip button label is "Skip tour" from the
 * English localization file. Both skip and done persist the localStorage flag.
 */
export async function skipTour(page: Page): Promise<void> {
  const dialog = getTourDialog(page);
  await dialog.getByRole('button', { name: /skip/i }).click();
}
