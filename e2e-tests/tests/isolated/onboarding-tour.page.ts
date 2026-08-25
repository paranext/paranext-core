import type { Locator, Page } from '@playwright/test';
import { ONBOARDING_TOUR_DONE_KEY } from '../../fixtures/helpers';

/**
 * Page-object helpers for the onboarding tour overlay.
 *
 * The tour is a `role="dialog"` overlay rendered by `OnboardingTour` (which delegates to `Tour` in
 * `platform-bible-react`). It only appears in Simple mode when `firstRunStatus.kind === 'app'` and
 * the user has not yet completed or skipped it (`platform-bible.onboardingTourComplete` absent from
 * localStorage).
 *
 * All locator helpers scope queries inside the tour dialog element so they cannot accidentally
 * match other content in the app.
 *
 * Button labels (from `assets/localization/en.json`):
 *
 * - Next: `%onboardingTour_button_next%` → "Next"
 * - Done: `%onboardingTour_button_done%` → "Done"
 * - Skip: `%onboardingTour_button_skip%` → "Skip tour"
 * - Back: `%onboardingTour_button_back%` → "Back"
 */

/** Clears the onboarding-tour completion flag from localStorage. */
export async function clearTourDone(page: Page): Promise<void> {
  await page.evaluate((key) => {
    localStorage.removeItem(key);
  }, ONBOARDING_TOUR_DONE_KEY);
}

/** Reads the raw onboarding-tour completion flag from localStorage (`'true'` or null). */
export async function getTourDoneFlag(page: Page): Promise<string | null> {
  return page.evaluate((key) => localStorage.getItem(key), ONBOARDING_TOUR_DONE_KEY);
}

/**
 * Returns a Locator for the tour dialog element. The Tour component renders its outermost div with
 * `data-testid="tour-dialog"` — a tour-specific hook, so this can never match another modal
 * dialog.
 */
export function getTourDialog(page: Page): Locator {
  return page.getByTestId('tour-dialog');
}

/**
 * Returns the step-counter display text (e.g. `"1 / 5"`). Reads the first `<p>` inside the tour
 * card, which renders the `stepCounter` output.
 */
export async function getTourStepCount(page: Page): Promise<string> {
  const dialog = getTourDialog(page);
  // The step counter is the first <p> inside the card div (muted-foreground text).
  const counter = dialog.locator('p.tw\\:text-muted-foreground').first();
  return counter.textContent().then((t) => t?.trim() ?? '');
}

/**
 * Returns the current step card's title text. The Tour component renders the step title in an
 * `<h3>` inside the card.
 */
export async function getCurrentStepTitle(page: Page): Promise<string> {
  const dialog = getTourDialog(page);
  const title = dialog.locator('h3');
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
