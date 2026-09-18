import { expect, type Locator, type Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

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
 * match other content in the app. Button names are resolved from the English localization file
 * through {@link englishLabel}, so a relabel in `en.json` moves these helpers with it.
 *
 * This lives under `fixtures/` rather than beside the tour spec because `waitForAppReady` in
 * `helpers.ts` suppresses the tour for every other spec and needs the same locators; `helpers.ts`
 * imports from here, so this module must not import from `helpers.ts`.
 */

/**
 * LocalStorage key persisting onboarding-tour completion. Mirrors ONBOARDING_TOUR_DONE_KEY in
 * src/renderer/components/onboarding-tour/onboarding-tour.store.ts — keep in sync (renderer source
 * cannot be imported into the Playwright Node context).
 */
export const ONBOARDING_TOUR_DONE_KEY = 'platform-bible.onboardingTourComplete';

const ENGLISH_LOCALIZATION_PATH = path.resolve(__dirname, '../../assets/localization/en.json');

let englishStrings: Record<string, string> | undefined;

/**
 * Resolves a `%localize_key%` to its English label from `assets/localization/en.json`, so a locator
 * can be written against the key the component uses rather than a copy of its current wording.
 * Throws on an unknown key: a silently-empty name would match nothing and read as a UI regression.
 */
export function englishLabel(localizeKey: string): string {
  englishStrings ??= JSON.parse(fs.readFileSync(ENGLISH_LOCALIZATION_PATH, 'utf-8'));
  const label = englishStrings?.[localizeKey];
  if (label === undefined)
    throw new Error(`No English localization for ${localizeKey} in ${ENGLISH_LOCALIZATION_PATH}`);
  return label;
}

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

/**
 * A tour button by its localization key, matched on the whole accessible name so "Next" cannot also
 * match a hypothetical "Next chapter" button elsewhere in the dialog.
 */
function getTourButton(page: Page, localizeKey: string): Locator {
  return getTourDialog(page).getByRole('button', { name: englishLabel(localizeKey), exact: true });
}

/** The tour's Skip button, named from `%onboardingTour_button_skip%`. */
export function getTourSkipButton(page: Page): Locator {
  return getTourButton(page, '%onboardingTour_button_skip%');
}

/** The tour's Next button (intermediate steps), named from `%firstRun_button_next%`. */
export function getTourNextButton(page: Page): Locator {
  return getTourButton(page, '%firstRun_button_next%');
}

/** The tour's Back button (every step but the first), named from `%firstRun_button_back%`. */
export function getTourBackButton(page: Page): Locator {
  return getTourButton(page, '%firstRun_button_back%');
}

/** The tour's Done button (last step only), named from `%onboardingTour_button_done%`. */
export function getTourDoneButton(page: Page): Locator {
  return getTourButton(page, '%onboardingTour_button_done%');
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
 * Clicks the primary action button (Next on intermediate steps, Done on the last step). Matches
 * either label so a caller need not know which step it is on.
 */
export async function advanceTour(page: Page): Promise<void> {
  await getTourNextButton(page).or(getTourDoneButton(page)).click();
}

/** Clicks the Back button to return to the previous step. */
export async function goBackTour(page: Page): Promise<void> {
  await getTourBackButton(page).click();
}

/**
 * Clicks Next until the last step is reached — i.e. until the primary button reads Done instead of
 * Next. Does NOT click Done, so callers can assert last-step state or finish explicitly. Bounded
 * well above the tour's real step count so a regression cannot loop forever; if Next is still
 * visible after the bound, the caller's next assertion fails with a clear error.
 */
export async function advanceToLastStep(page: Page): Promise<void> {
  const nextButton = getTourNextButton(page);
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
 * Clicks the Skip button to dismiss the tour early. Both skip and done persist the localStorage
 * flag.
 */
export async function skipTour(page: Page): Promise<void> {
  await getTourSkipButton(page).click();
}

/**
 * Keeps the onboarding tour from covering the UI. In Simple mode with a fresh profile the tour
 * opens automatically (and asynchronously — it waits for the dock layout and localized strings),
 * and its full-screen overlay blocks all pointer events. Writing the done flag makes
 * `OnboardingTour` (which re-reads it each render) refuse to open from that point on, closing the
 * race a visibility check alone would leave; an instance that already opened before the flag landed
 * is dismissed with Escape.
 *
 * A typed Escape (`page.keyboard`) goes to whatever has DOM focus. With host focus intact it
 * reaches the tour's `window` listener like a user's key would, and that is tried first so the
 * common path keeps exercising the real handler. Once a scripture editor is open, its iframe holds
 * focus and the key never leaves it, so if the dialog is still up and focus is in an iframe a
 * synthetic `keydown` is dispatched on the host `window`, which the capture-phase listener receives
 * regardless of focus. If the typed key fails with focus anywhere else, this throws: that is a
 * broken Escape handler, and falling back would hide it. Retried briefly because the listener is
 * attached only once the step card has rendered. TODO(PT-4627): once the tour handles Escape from
 * inside a web view, drop the synthetic dispatch.
 *
 * `waitForAppReady` calls this by default. A Simple-mode spec that skips `waitForAppReady` (the
 * scripture-editor specs gate on the editor iframe instead) must call it itself before its first
 * click in the main frame. TODO(PT-4639): suppress the tour at the fixture level
 * (isolated.fixture.ts, with an opt-out for onboarding-tour.spec.ts) so no Simple-mode spec has to
 * remember this call.
 */
export async function suppressOnboardingTour(page: Page): Promise<void> {
  await page.evaluate((key) => {
    localStorage.setItem(key, 'true');
  }, ONBOARDING_TOUR_DONE_KEY);
  const tourDialog = getTourDialog(page);
  if (!(await tourDialog.isVisible())) return;
  await expect(async () => {
    await page.keyboard.press('Escape');
    if (await tourDialog.isVisible()) {
      // The fallback is only legitimate when the typed key went into an iframe. With host focus a
      // typed Escape is what a user would press, so its failing is the regression, not a quirk.
      const focusIsInIframe = await page.evaluate(
        () => document.activeElement?.tagName === 'IFRAME',
      );
      if (!focusIsInIframe)
        throw new Error('A typed Escape did not dismiss the tour although the host had focus');
      await page.evaluate(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      });
    }
    await expect(tourDialog).not.toBeVisible({ timeout: 500 });
  }).toPass({ timeout: 5000 });
}
