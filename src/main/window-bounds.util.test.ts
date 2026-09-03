import { describe, expect, test } from 'vitest';
import {
  trackDisplaySettle,
  type DisplaySettleState,
  type IdentifiedDisplayLike,
  type ScaledDisplayLike,
  areCapturedBoundsTrustworthy,
  correctBoundsForDisplayScale,
  DEFAULT_WINDOW_HEIGHT,
  DEFAULT_WINDOW_WIDTH,
  DISPLAY_SETTLE_MS,
  ensureBoundsVisibleOnSomeDisplay,
} from '@main/window-bounds.util';
import type { WindowRectangle } from '@shared/data/window-layout-persistence.model';

const PRIMARY = { bounds: { x: 0, y: 0, width: 1920, height: 1080 } };
const SECONDARY = { bounds: { x: 1920, y: 0, width: 1280, height: 1024 } };

describe('ensureBoundsVisibleOnSomeDisplay', () => {
  test('leaves bounds fully inside a display untouched', () => {
    const savedState = {
      bounds: { x: 100, y: 50, width: 800, height: 600 },
      isMaximized: false,
      isFullScreen: false,
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
  });

  test('keeps a maximized window maximized while re-placing it off a departed display', () => {
    const savedState = {
      bounds: { x: 2000, y: 100, width: 800, height: 600 },
      isMaximized: true,
      isFullScreen: false,
    };

    const result = ensureBoundsVisibleOnSomeDisplay(savedState, [PRIMARY], PRIMARY);

    expect(result.isMaximized).toBe(true);
    expect(result.bounds).toEqual({
      x: PRIMARY.bounds.x,
      y: PRIMARY.bounds.y,
      width: DEFAULT_WINDOW_WIDTH,
      height: DEFAULT_WINDOW_HEIGHT,
    });
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

describe('correctBoundsForDisplayScale', () => {
  test('divides a reading inflated by a scaled display against a 100% primary back to true size', () => {
    // Measured on a secondary display scaled 125% with a 100% primary: getBounds() reported
    // 1283x914 for a window whose own-display size was 1024x728 (1283/1024 ~= 1.253, matching the
    // 1.25 scale ratio within rounding).
    const containingDisplay: ScaledDisplayLike = { bounds: SECONDARY.bounds, scaleFactor: 1.25 };
    const primaryDisplay: ScaledDisplayLike = { bounds: PRIMARY.bounds, scaleFactor: 1.0 };
    const reading = { x: -1442, y: 253, width: 1283, height: 914 };

    const corrected = correctBoundsForDisplayScale(reading, containingDisplay, primaryDisplay);

    expect(corrected).toEqual({ x: -1442, y: 253, width: 1026, height: 731 });
  });

  test('a primary and containing display at the same scale factor is the identity', () => {
    const display: ScaledDisplayLike = { bounds: PRIMARY.bounds, scaleFactor: 1.0 };
    const reading = { x: 100, y: 50, width: 1024, height: 728 };

    expect(correctBoundsForDisplayScale(reading, display, display)).toEqual(reading);
  });

  test('corrects by the ratio between the two scale factors, not the containing display alone', () => {
    // A 150% primary against a 125% secondary: the ratio is 1.5/1.25 = 1.2, not 1/1.25 — a non-100%
    // primary is why the correction has to be the RATIO between the two rather than simply the
    // inverse of the target display's own factor.
    const containingDisplay: ScaledDisplayLike = { bounds: SECONDARY.bounds, scaleFactor: 1.25 };
    const primaryDisplay: ScaledDisplayLike = { bounds: PRIMARY.bounds, scaleFactor: 1.5 };
    const reading = { x: 2000, y: 100, width: 1000, height: 800 };

    const corrected = correctBoundsForDisplayScale(reading, containingDisplay, primaryDisplay);

    expect(corrected).toEqual({ x: 2000, y: 100, width: 1200, height: 960 });
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

  test('the first capture of a session is not trustworthy before it has had time to settle', () => {
    // A window's own creation is a landing too: Win32 and Chromium can disagree about a freshly
    // created window's DPI on a scaled display the same way they can mid-drag, so the very first
    // capture of a session needs the same wait as any other landing rather than being waved through
    // because nothing has been accepted yet.
    const onPrimary = { x: 100, y: 50, width: 800, height: 600 };

    expect(areCapturedBoundsTrustworthy(onPrimary, BOTH_DISPLAYS, undefined, 0)).toBe(false);
  });

  test('the first capture of a session is trustworthy once it has settled', () => {
    const onPrimary = { x: 100, y: 50, width: 800, height: 600 };

    expect(
      areCapturedBoundsTrustworthy(onPrimary, BOTH_DISPLAYS, undefined, DISPLAY_SETTLE_MS),
    ).toBe(true);
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

describe('a scaled display does not compound a window size across quit/reopen cycles', () => {
  /**
   * One session's worth of capture decisions, mirroring the sequence `main.ts` runs: seed the
   * settle clock from the window's own creation bounds, then feed it every `getBounds()` reading
   * the platform reports before the app quits, exactly as `captureWindowBoundsState` and its
   * `resize`/`move` listeners would. Returns whatever ends up persisted — the last trusted reading,
   * or the bounds the session started from if none was ever trusted.
   *
   * `readings` models what Windows/Chromium actually report over time on a scaled display: while
   * they still disagree about the window's DPI, a reading comes back skewed by the scale mismatch
   * even though nothing has been dragged anywhere — landing on the display is enough. A rapid
   * manual quit/reopen cycle can close the window before that disagreement ever resolves, so every
   * reading in a short session can be a skewed one.
   */
  function runSessionCycle(
    startingBounds: WindowRectangle,
    readings: readonly { at: number; bounds: WindowRectangle }[],
    display: IdentifiedDisplayLike,
  ): WindowRectangle {
    let displaySettle: DisplaySettleState = trackDisplaySettle(
      startingBounds,
      [display],
      { displayId: undefined, since: 0 },
      0,
    );
    let lastAcceptedDisplayId: number | undefined;
    let persisted = startingBounds;

    readings.forEach(({ at, bounds }) => {
      displaySettle = trackDisplaySettle(bounds, [display], displaySettle, at);
      if (
        areCapturedBoundsTrustworthy(
          bounds,
          [display],
          lastAcceptedDisplayId,
          at - displaySettle.since,
        )
      ) {
        persisted = bounds;
        lastAcceptedDisplayId = displaySettle.displayId;
      }
    });

    return persisted;
  }

  // A single 150%-scaled display — the window never crosses to another one, which is the case the
  // settle guard used to treat as needing no wait at all.
  const SCALED_DISPLAY = { id: 1, bounds: { x: 0, y: 0, width: 2560, height: 1440 } };
  const REQUESTED = { x: 100, y: 100, width: 1024, height: 768 };
  // What getBounds() reports while Win32 (still on the scale the window is landing FROM) and
  // Chromium (already reporting for the display it is landing ON) disagree — the same ~1.5x
  // distortion a 150% display produces for a live crossing, produced here by landing directly on
  // the display instead.
  const scaledUp = (bounds: WindowRectangle): WindowRectangle => ({
    ...bounds,
    width: Math.round(bounds.width * 1.5),
    height: Math.round(bounds.height * 1.5),
  });

  test('a quit taken before the display settles does not grow the persisted bounds', () => {
    // Every reading in this short session — one right after creation, one at quit — falls inside
    // the settle window, modeling a fast manual open/close cycle.
    const persisted = runSessionCycle(
      REQUESTED,
      [
        { at: 50, bounds: scaledUp(REQUESTED) },
        { at: 100, bounds: scaledUp(REQUESTED) },
      ],
      SCALED_DISPLAY,
    );

    expect(persisted).toEqual(REQUESTED);
  });

  test('two quit/reopen cycles on a scaled display do not compound the window size', () => {
    const cycleReadings = (bounds: WindowRectangle) => [
      { at: 50, bounds: scaledUp(bounds) },
      { at: 100, bounds: scaledUp(bounds) },
    ];

    const afterCycle1 = runSessionCycle(REQUESTED, cycleReadings(REQUESTED), SCALED_DISPLAY);
    const afterCycle2 = runSessionCycle(afterCycle1, cycleReadings(afterCycle1), SCALED_DISPLAY);

    expect(afterCycle1).toEqual(REQUESTED);
    expect(afterCycle2).toEqual(REQUESTED);
  });

  test('a reading taken once the display has settled is trusted, unlike an unsettled one', () => {
    // Positive control: the simulation can accept a reading — DISPLAY_SETTLE_MS is well past what
    // the two "before it settles" tests above wait for, so this is not merely a guard that refuses
    // everything.
    const persisted = runSessionCycle(
      REQUESTED,
      [{ at: DISPLAY_SETTLE_MS, bounds: REQUESTED }],
      SCALED_DISPLAY,
    );

    expect(persisted).toEqual(REQUESTED);
  });
});

describe('correcting captured bounds keeps a window on a scaled display from growing across quit/reopen cycles', () => {
  // Distinct from the settle-race modeled above: this is a STABLE unit mismatch — Electron reports
  // getBounds() in the primary's units for as long as the window lives on a differently-scaled
  // secondary display, not only during a brief landing window — so no amount of waiting for
  // DISPLAY_SETTLE_MS corrects it. Only dividing the reading by the scale ratio at capture does.
  const PRIMARY_SCALE: ScaledDisplayLike = { bounds: PRIMARY.bounds, scaleFactor: 1.0 };
  const SECONDARY_SCALE: ScaledDisplayLike = { bounds: SECONDARY.bounds, scaleFactor: 1.25 };

  /**
   * One quit/reopen cycle: the window is created at `storedSize` (its own display's units),
   * `getBounds()` reports that size distorted into the primary's units — mirroring what Electron
   * measurably does on Windows for a window living on a secondary display scaled against the
   * primary — and capture runs it through `correct` before persisting. `correct` is the seam under
   * test: an identity function reproduces capture with no correction (the pre-fix behavior);
   * {@link correctBoundsForDisplayScale} is the fix.
   */
  function runCreateCaptureCycle(
    storedSize: { width: number; height: number },
    correct: (
      reading: WindowRectangle,
      containing: ScaledDisplayLike,
      primary: ScaledDisplayLike,
    ) => WindowRectangle,
  ): { width: number; height: number } {
    const distortionRatio = SECONDARY_SCALE.scaleFactor / PRIMARY_SCALE.scaleFactor;
    const reported: WindowRectangle = {
      x: 0,
      y: 0,
      width: Math.round(storedSize.width * distortionRatio),
      height: Math.round(storedSize.height * distortionRatio),
    };
    const corrected = correct(reported, SECONDARY_SCALE, PRIMARY_SCALE);
    return { width: corrected.width, height: corrected.height };
  }

  test('without a correction, three cycles compound the size by the scale ratio each time', () => {
    // Positive control: with no correction applied, the same model that converges below instead
    // grows every cycle — proving the growth in the next test comes from the correction, not from
    // the model happening to be static.
    const noCorrection = (reading: WindowRectangle) => reading;
    const start = { width: DEFAULT_WINDOW_WIDTH, height: DEFAULT_WINDOW_HEIGHT };

    const afterCycle1 = runCreateCaptureCycle(start, noCorrection);
    const afterCycle2 = runCreateCaptureCycle(afterCycle1, noCorrection);
    const afterCycle3 = runCreateCaptureCycle(afterCycle2, noCorrection);

    expect(afterCycle1.width).toBeGreaterThan(start.width);
    expect(afterCycle2.width).toBeGreaterThan(afterCycle1.width);
    expect(afterCycle3.width).toBeGreaterThan(afterCycle2.width);
  });

  test('correctBoundsForDisplayScale converges three cycles on the starting size instead of growing', () => {
    const start = { width: DEFAULT_WINDOW_WIDTH, height: DEFAULT_WINDOW_HEIGHT };

    const afterCycle1 = runCreateCaptureCycle(start, correctBoundsForDisplayScale);
    const afterCycle2 = runCreateCaptureCycle(afterCycle1, correctBoundsForDisplayScale);
    const afterCycle3 = runCreateCaptureCycle(afterCycle2, correctBoundsForDisplayScale);

    expect(afterCycle1).toEqual(start);
    expect(afterCycle2).toEqual(start);
    expect(afterCycle3).toEqual(start);
  });
});
