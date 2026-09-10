import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { ONBOARDING_TOUR_DONE_KEY } from '../../fixtures/helpers';

/**
 * Page-object helpers for the onboarding tour overlay.
 *
 * The tour is a `role="dialog"` overlay rendered by `OnboardingTour` (which delegates to `Tour`).
 * It appears on its own only in Simple mode, when `firstRunStatus.kind === 'app'` and the user has
 * not yet completed or skipped it (`platform-bible.onboardingTourComplete` absent from
 * localStorage). A Help-menu replay reopens it regardless of that flag, and in either interface
 * mode — in Power it reduces to the stops whose anchors exist there.
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

/** Returns a Locator for the tour dialog's step-counter element (e.g. text `"1 of 5"`). */
function getStepCounter(page: Page): Locator {
  return getTourDialog(page).getByTestId('tour-step-counter');
}

/** Returns the step-counter display text (e.g. `"1 of 5"`). */
export async function getTourStepCount(page: Page): Promise<string> {
  const counter = getStepCounter(page);
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
 * Waits for the tour's step-counter text to differ from `previousText` — or for the tour dialog to
 * close, which is what a Done click does. Either outcome is proof that the triggering click's
 * transition actually rendered, not just that the click resolved: the tour re-measures its target
 * on every step change and has no Escape listener (and, once Done closes it, no dialog) for a frame
 * while it does that.
 *
 * Polled by hand rather than `expect(stepCounter).not.toHaveText(...)`: that assertion keeps
 * polling while the element is missing (only the `toBeHidden`/`not.toBeVisible` family passes on a
 * missing element), so it would time out on the very Done click it is meant to cover. A counter
 * that is momentarily absent while the dialog is still open is the mid-transition frame, and reads
 * as "not changed yet".
 *
 * Compares trimmed text on both sides: `textContent()` can carry incidental leading/trailing
 * whitespace from the surrounding markup that has nothing to do with the step actually changing, so
 * comparing the raw strings can either report a change that is not real or paper over a stale
 * read.
 */
async function waitForStepCounterChange(page: Page, previousText: string | null): Promise<void> {
  const dialog = getTourDialog(page);
  const stepCounter = getStepCounter(page);
  const previousTrimmed = previousText?.trim() ?? previousText;
  await expect
    .poll(
      async () => {
        const [dialogVisible, counterCount] = await Promise.all([
          dialog.isVisible(),
          stepCounter.count(),
        ]);
        if (!dialogVisible) return 'closed';
        if (counterCount === 0) return previousTrimmed;
        const text = await stepCounter.textContent();
        return text?.trim() ?? text;
      },
      { timeout: 5_000 },
    )
    .not.toBe(previousTrimmed);
}

/**
 * Clicks the primary action button (Next on intermediate steps, Done on the last step) and waits
 * for the step counter to actually change — or the tour to close — before returning, so callers
 * always see a settled state rather than a mid-transition frame. Uses a regex so it matches
 * whichever label the localization provides.
 */
export async function advanceTour(page: Page): Promise<void> {
  const dialog = getTourDialog(page);
  const stepCounter = getStepCounter(page);
  const stepBeforeClick = await stepCounter.textContent();
  await dialog.getByRole('button', { name: /^(Next|Done)$/i }).click();
  await waitForStepCounterChange(page, stepBeforeClick);
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
  const stepCounter = getStepCounter(page);
  for (let i = 0; i < 10; i += 1) {
    // Steps are inherently sequential — must observe the current step before advancing.
    // eslint-disable-next-line no-await-in-loop
    if (!(await nextButton.isVisible())) return;
    // Must be read before the click below fires, so there is nothing to parallelize.
    // eslint-disable-next-line no-await-in-loop
    const stepBeforeClick = await stepCounter.textContent();
    // Sequential: the click must complete (revealing the next step) before the next iteration.
    // eslint-disable-next-line no-await-in-loop
    await nextButton.click();
    // Wait for the step-transition re-render to actually land before deciding whether to keep
    // going: a bare isVisible() right after the click can still observe the outgoing step's Next
    // button mid-transition and return early, silently skipping a step.
    // eslint-disable-next-line no-await-in-loop
    await waitForStepCounterChange(page, stepBeforeClick);
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
