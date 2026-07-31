import type { Locator, Page } from '@playwright/test';

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

// Mirrors ONBOARDING_TOUR_DONE_KEY in src/renderer/services/first-run-store.ts — keep in sync.
const TOUR_DONE_KEY = 'platform-bible.onboardingTourComplete';

/** Clears the onboarding-tour completion flag from localStorage. */
export async function clearTourDone(page: Page): Promise<void> {
  await page.evaluate((key) => {
    localStorage.removeItem(key);
  }, TOUR_DONE_KEY);
}

/**
 * Returns a Locator for the tour dialog element. The Tour component renders a `role="dialog"`
 * `aria-modal="true"` div when open; this is `null` when the tour is closed.
 */
export function getTourDialog(page: Page): Locator {
  return page.locator('[role="dialog"][aria-modal="true"]');
}

/**
 * Returns whether the tour overlay is currently present in the DOM and visible. Checks for
 * `role="dialog"` `aria-modal="true"` (the Tour component's outermost element).
 */
export async function isTourVisible(page: Page): Promise<boolean> {
  return getTourDialog(page).isVisible();
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
 * Clicks the Skip button to dismiss the tour early. The Skip button label is "Skip tour" from the
 * English localization file. Both skip and done persist the localStorage flag.
 */
export async function skipTour(page: Page): Promise<void> {
  const dialog = getTourDialog(page);
  await dialog.getByRole('button', { name: /skip/i }).click();
}
