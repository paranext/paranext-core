import { describe, expect, test } from 'vitest';
import {
  trackDisplaySettle,
  type DisplaySettleState,
  areCapturedBoundsTrustworthy,
  DEFAULT_WINDOW_HEIGHT,
  DEFAULT_WINDOW_WIDTH,
  ensureBoundsVisibleOnSomeDisplay,
} from '@main/window-bounds.util';

const PRIMARY = { bounds: { x: 0, y: 0, width: 1920, height: 1080 } };
const SECONDARY = { bounds: { x: 1920, y: 0, width: 1280, height: 1024 } };

describe('ensureBoundsVisibleOnSomeDisplay', () => {
  test('leaves bounds fully inside a display untouched', () => {
    const savedState = {
      bounds: { x: 100, y: 50, width: 800, height: 600 },
      isMaximized: false,
      isFullScreen: false,
      displayBounds: { ...PRIMARY.bounds },
    };

    expect(ensureBoundsVisibleOnSomeDisplay(savedState, [PRIMARY, SECONDARY], PRIMARY)).toEqual(
      savedState,
    );
  });

  test('leaves bounds fully inside a secondary display untouched', () => {
    const savedState = { bounds: { x: 2000, y: 100, width: 800, height: 600 } };

    expect(ensureBoundsVisibleOnSomeDisplay(savedState, [PRIMARY, SECONDARY], PRIMARY)).toEqual(
      savedState,
    );
  });

  test('re-places bounds from a departed display onto the primary display at default size', () => {
    // The window was on SECONDARY, which is no longer connected
    const savedState = { bounds: { x: 2000, y: 100, width: 800, height: 600 } };

    const result = ensureBoundsVisibleOnSomeDisplay(savedState, [PRIMARY], PRIMARY);

    expect(result.bounds).toEqual({
      x: PRIMARY.bounds.x,
      y: PRIMARY.bounds.y,
      width: DEFAULT_WINDOW_WIDTH,
      height: DEFAULT_WINDOW_HEIGHT,
    });
    expect(result.displayBounds).toEqual(PRIMARY.bounds);
  });

  test('keeps a maximized window maximized while re-placing it off a departed display', () => {
    const savedState = {
      bounds: { x: 2000, y: 100, width: 800, height: 600 },
      isMaximized: true,
      isFullScreen: false,
      displayBounds: { ...SECONDARY.bounds },
    };

    const result = ensureBoundsVisibleOnSomeDisplay(savedState, [PRIMARY], PRIMARY);

    expect(result.isMaximized).toBe(true);
    expect(result.bounds).toEqual({
      x: PRIMARY.bounds.x,
      y: PRIMARY.bounds.y,
      width: DEFAULT_WINDOW_WIDTH,
      height: DEFAULT_WINDOW_HEIGHT,
    });
    expect(result.displayBounds).toEqual(PRIMARY.bounds);
  });

  test('re-places a partially offscreen window (containment must be within a single display)', () => {
    // Hangs off the bottom-right of the primary display; also straddling two displays counts as
    // not contained. Same containment rule as the previous window-state keeper.
    const savedState = { bounds: { x: 1500, y: 800, width: 800, height: 600 } };

    const result = ensureBoundsVisibleOnSomeDisplay(savedState, [PRIMARY, SECONDARY], PRIMARY);

    expect(result.bounds).toEqual({
      x: PRIMARY.bounds.x,
      y: PRIMARY.bounds.y,
      width: DEFAULT_WINDOW_WIDTH,
      height: DEFAULT_WINDOW_HEIGHT,
    });
  });

  test('gives a maximized state with no normal bounds a default placement, still maximized', () => {
    const savedState = { isMaximized: true };

    const result = ensureBoundsVisibleOnSomeDisplay(savedState, [PRIMARY, SECONDARY], PRIMARY);

    expect(result.isMaximized).toBe(true);
    expect(result.bounds).toEqual({
      x: PRIMARY.bounds.x,
      y: PRIMARY.bounds.y,
      width: DEFAULT_WINDOW_WIDTH,
      height: DEFAULT_WINDOW_HEIGHT,
    });
  });

  test('does not mutate the saved state it is given', () => {
    const savedState = { bounds: { x: 9999, y: 9999, width: 800, height: 600 } };
    const original = JSON.parse(JSON.stringify(savedState));

    ensureBoundsVisibleOnSomeDisplay(savedState, [PRIMARY], PRIMARY);

    expect(savedState).toEqual(original);
  });
});

/** The displays above, with the ids the trustworthiness check needs to tell them apart */
const PRIMARY_WITH_ID = { id: 1, bounds: PRIMARY.bounds };
const SECONDARY_WITH_ID = { id: 2, bounds: SECONDARY.bounds };
const BOTH_DISPLAYS = [PRIMARY_WITH_ID, SECONDARY_WITH_ID];

describe('areCapturedBoundsTrustworthy', () => {
  test('bounds straddling two displays are not trustworthy', () => {
    // While a window spans a boundary between displays of different scale factors, Windows and
    // Chromium briefly disagree about its DPI and the captured size comes out around 25% too large
    const straddling = { x: 1800, y: 100, width: 400, height: 600 };

    expect(
      areCapturedBoundsTrustworthy(straddling, BOTH_DISPLAYS, PRIMARY_WITH_ID.id, 10_000),
    ).toBe(false);
  });

  test('bounds on a display the window has only just reached are not trustworthy yet', () => {
    // The damaging snapshot is the one taken just AFTER the window lands: the geometry is already
    // on one display, so a containment check alone accepts it, while the two DPI answers have not
    // yet agreed
    const onSecondary = { x: 2000, y: 100, width: 800, height: 600 };

    expect(areCapturedBoundsTrustworthy(onSecondary, BOTH_DISPLAYS, PRIMARY_WITH_ID.id, 50)).toBe(
      false,
    );
  });

  test('bounds on a display the window has settled on are trustworthy', () => {
    const onSecondary = { x: 2000, y: 100, width: 800, height: 600 };

    expect(
      areCapturedBoundsTrustworthy(onSecondary, BOTH_DISPLAYS, PRIMARY_WITH_ID.id, 10_000),
    ).toBe(true);
  });

  test('bounds moved within the same display are trustworthy at once', () => {
    // The control that keeps the guard from degrading into "never persist": a window moved inside
    // one display has crossed no boundary, so nothing is owed a settle and its placement must be
    // saved immediately. Without this, a guard that always refused would pass every test above.
    const movedWithinPrimary = { x: 300, y: 200, width: 800, height: 600 };

    expect(
      areCapturedBoundsTrustworthy(movedWithinPrimary, BOTH_DISPLAYS, PRIMARY_WITH_ID.id, 0),
    ).toBe(true);
  });

  test('the first capture of a session is trustworthy once it is on a display', () => {
    // Nothing has been accepted yet, so there is no transition to settle after
    const onPrimary = { x: 100, y: 50, width: 800, height: 600 };

    expect(areCapturedBoundsTrustworthy(onPrimary, BOTH_DISPLAYS, undefined, 0)).toBe(true);
  });
});

describe('trackDisplaySettle', () => {
  test('a pause mid-drag does not spend the settle period the landing is meant to start', () => {
    // The clock has to key off the display the bounds lie fully WITHIN, not the one they merely
    // overlap most. Keyed off the nearest display it starts at roughly the halfway point of the
    // crossing, so a user who rests the window mid-drag for longer than the settle period lands
    // with that period already spent — and the capture is accepted at exactly the moment the two
    // DPI answers have not yet met, which is the moment this guard exists to refuse.
    const onPrimary = { x: 100, y: 100, width: 800, height: 600 };
    const straddling = { x: 1800, y: 100, width: 400, height: 600 };
    const landed = { x: 2000, y: 100, width: 800, height: 600 };

    let state: DisplaySettleState = { displayId: PRIMARY_WITH_ID.id, since: 0 };
    state = trackDisplaySettle(onPrimary, BOTH_DISPLAYS, state, 0);
    // Far enough across that the nearest display is already the secondary, but not yet contained
    state = trackDisplaySettle(straddling, BOTH_DISPLAYS, state, 100);
    // The user rests the window there, well past the settle period
    state = trackDisplaySettle(straddling, BOTH_DISPLAYS, state, 5_000);
    // ...and then completes the crossing
    state = trackDisplaySettle(landed, BOTH_DISPLAYS, state, 5_100);

    expect(
      areCapturedBoundsTrustworthy(landed, BOTH_DISPLAYS, PRIMARY_WITH_ID.id, 5_100 - state.since),
    ).toBe(false);
  });

  test('a window moved within one display keeps the clock it already had', () => {
    // Crossing nothing must not restart the settle period, or an ordinary drag inside one display
    // would spend its life untrusted and the saved placement would freeze.
    const onPrimary = { x: 100, y: 100, width: 800, height: 600 };
    const alsoOnPrimary = { x: 300, y: 200, width: 800, height: 600 };

    const state = trackDisplaySettle(
      alsoOnPrimary,
      BOTH_DISPLAYS,
      trackDisplaySettle(onPrimary, BOTH_DISPLAYS, { displayId: undefined, since: 0 }, 1_000),
      9_000,
    );

    expect(state).toEqual({ displayId: PRIMARY_WITH_ID.id, since: 1_000 });
  });
});
