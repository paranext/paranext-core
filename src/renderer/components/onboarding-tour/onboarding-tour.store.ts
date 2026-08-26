import {
  clearBooleanFlag,
  readBooleanFlag,
  writeBooleanFlag,
} from '@renderer/services/local-storage-flag.util';

/**
 * Persists whether the Simple-mode orientation tour has run. Deliberately separate from the
 * first-run store: the tour is not a first-run signal — it shows to any already-onboarded user who
 * has not yet seen it, not only to someone who just finished the wizard.
 *
 * Kept in sync with `ONBOARDING_TOUR_DONE_KEY` in `e2e-tests/fixtures/helpers.ts`, which needs the
 * same key from the Playwright Node context where renderer source cannot be imported.
 */
export const ONBOARDING_TOUR_DONE_KEY = 'platform-bible.onboardingTourComplete';

/** Returns true if the onboarding tour has been completed or skipped. */
export function readTourDone(): boolean {
  return readBooleanFlag(ONBOARDING_TOUR_DONE_KEY);
}

/** Records that the onboarding tour has been completed or skipped. */
export function writeTourDone(): void {
  writeBooleanFlag(ONBOARDING_TOUR_DONE_KEY, true);
}

/**
 * Clears the completion flag so the tour shows again on the next mount.
 *
 * WARNING: Test-only. @internal
 */
export function resetTourDone(): void {
  clearBooleanFlag(ONBOARDING_TOUR_DONE_KEY);
}
