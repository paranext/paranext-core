/**
 * Unit tests for the selector that tells the first-run gate's error screen from its wizard.
 *
 * The gate has three branches and only one of them is unrecoverable, so the recovery has to tell
 * them apart from the DOM alone. Both the error screen and a wizard step can put a `role="alert"`
 * on screen — the difference is WHERE. Getting that wrong makes a stuck wizard read as merely slow,
 * which is the failure the recovery exists to name, so the discriminator is pinned here against the
 * two real shapes rather than left to a comment.
 */
import { describe, expect, it } from 'vitest';
import { ESCAPE_HATCH_NAME_PATTERN, TOP_LEVEL_ERROR_SELECTOR } from './helpers';

/** The gate's error screen: `role="alert"` on the container, WRAPPING the heading. */
const ERROR_SCREEN = `
  <div data-testid="first-run-dialog">
    <div role="alert"><h1>Something went wrong</h1><p>The provider is starting up.</p></div>
  </div>`;

/** A wizard step reporting its own problem: `role="alert"` BESIDE the shell's heading. */
const WIZARD_WITH_INLINE_ERROR = `
  <div data-testid="first-run-dialog">
    <div>
      <h1>Set up Paratext</h1>
      <p role="alert">That registration code was not accepted.</p>
    </div>
  </div>`;

describe('telling the first-run error screen from the wizard', () => {
  it('matches the error screen, where the alert wraps the heading', () => {
    document.body.innerHTML = ERROR_SCREEN;

    expect(document.querySelectorAll(TOP_LEVEL_ERROR_SELECTOR).length).toBe(1);
  });

  it('does not match a wizard step whose alert merely sits beside the heading', () => {
    document.body.innerHTML = WIZARD_WITH_INLINE_ERROR;

    // The distinction that matters: an alert IS present, so any check keying on its mere presence
    // would call this the error screen and let a stuck wizard pass as inconclusive.
    expect(document.querySelectorAll('[role="alert"]').length).toBe(1);
    expect(document.querySelectorAll(TOP_LEVEL_ERROR_SELECTOR).length).toBe(0);
  });

  it('does not match the loading branch, which has no heading at all', () => {
    document.body.innerHTML = `
      <div data-testid="first-run-dialog">
        <div role="status"><p>Checking your registration…</p></div>
      </div>`;

    expect(document.querySelectorAll(TOP_LEVEL_ERROR_SELECTOR).length).toBe(0);
  });
});

describe('matching the escape-hatch button before its label localizes', () => {
  // A freshly mounted step's useLocalizedStrings returns the raw %key% placeholder until its own
  // PAPI round trip resolves; the button is already interactable at that point, so a check that
  // lands in that window must still recognize it.
  it.each([
    ['%firstRun_button_continueWithoutRegistration%', 'identify-step.component.tsx'],
    ['%firstRun_button_continueWithoutFinishingSetup%', 'first-run-overlay.component.tsx'],
  ])('matches the raw key %s, rendered by %s, before it localizes', (rawKey) => {
    expect(ESCAPE_HATCH_NAME_PATTERN.test(rawKey)).toBe(true);
  });

  it.each(['Continue without registration', 'Continue without finishing setup'])(
    'still matches the localized English text %s once it resolves',
    (localizedText) => {
      expect(ESCAPE_HATCH_NAME_PATTERN.test(localizedText)).toBe(true);
    },
  );

  it('does not match unrelated button labels', () => {
    expect(ESCAPE_HATCH_NAME_PATTERN.test('Continue')).toBe(false);
    expect(ESCAPE_HATCH_NAME_PATTERN.test('%firstRun_button_back%')).toBe(false);
  });
});
