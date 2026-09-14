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

function escapeForRegExp(label: string): string {
  return label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Exact, whole-name match for an accessible name (case-insensitive, no substring matches), so "Skip
 * tour" cannot also match a hypothetical "Skip tour and hide" and "Next" cannot match a "Next
 * chapter" button elsewhere in the dialog.
 */
function exactName(...labels: string[]): RegExp {
  return new RegExp(`^(?:${labels.map(escapeForRegExp).join('|')})$`, 'i');
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

/** The tour's Skip button, named from `%onboardingTour_button_skip%`. */
export function getTourSkipButton(page: Page): Locator {
  return getTourDialog(page).getByRole('button', {
    name: exactName(englishLabel('%onboardingTour_button_skip%')),
  });
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
  await getTourDialog(page)
    .getByRole('button', {
      name: exactName(
        englishLabel('%firstRun_button_next%'),
        englishLabel('%onboardingTour_button_done%'),
      ),
    })
    .click();
}

/** Clicks the Back button to return to the previous step. */
export async function goBackTour(page: Page): Promise<void> {
  await getTourDialog(page)
    .getByRole('button', { name: exactName(englishLabel('%firstRun_button_back%')) })
    .click();
}

/**
 * Clicks Next until the last step is reached — i.e. until the primary button reads Done instead of
 * Next. Does NOT click Done, so callers can assert last-step state or finish explicitly. Bounded
 * well above the tour's real step count so a regression cannot loop forever; if Next is still
 * visible after the bound, the caller's next assertion fails with a clear error.
 */
export async function advanceToLastStep(page: Page): Promise<void> {
  const nextButton = getTourDialog(page).getByRole('button', {
    name: exactName(englishLabel('%firstRun_button_next%')),
  });
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
 * is dismissed through its own Skip button.
 *
 * Skip is clicked rather than Escape pressed because the tour listens for Escape on the main
 * document, and `page.keyboard` delivers to whatever has focus — which, once a scripture editor is
 * open, is the editor's iframe. A click lands on the dialog regardless of focus.
 *
 * `waitForAppReady` calls this by default. A spec that skips `waitForAppReady` (the
 * scripture-editor specs, which gate on the editor iframe instead) must call it itself before its
 * first click in the main frame.
 */
export async function suppressOnboardingTour(page: Page): Promise<void> {
  await page.evaluate((key) => {
    localStorage.setItem(key, 'true');
  }, ONBOARDING_TOUR_DONE_KEY);
  const tourDialog = getTourDialog(page);
  if (await tourDialog.isVisible()) {
    await skipTour(page);
    await expect(tourDialog).not.toBeVisible({ timeout: 5000 });
  }
}
