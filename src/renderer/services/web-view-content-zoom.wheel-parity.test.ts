import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createContentZoomWheelReader } from 'platform-bible-utils';
import { MAX_ZOOM_FACTOR, MIN_ZOOM_FACTOR, ZOOM_STEP } from '@shared/models/content-zoom.model';
import { install } from './web-view-content-zoom.bootstrap-script.test-utils';

/** A marked main area for the bootstrap to target, and a place to dispatch wheel events at. */
const AREA_HTML = '<div id="area" data-platform-content-zoom-root=""><p>text</p></div>';

/** One frame of a wheel gesture, as both sides receive it. */
type Frame = { deltaY: number; wheelDeltaY?: number; deltaMode?: number };

/** Builds one wheel event; `wheelDeltaY` is Chromium's own and is what the notch path reads. */
function wheelEvent({ deltaY, wheelDeltaY, deltaMode = 0 }: Frame): WheelEvent {
  const event = new WheelEvent('wheel', {
    ctrlKey: true,
    deltaY,
    deltaX: 0,
    deltaMode,
    bubbles: true,
    cancelable: true,
  });
  if (wheelDeltaY !== undefined)
    Object.defineProperty(event, 'wheelDeltaY', { value: wheelDeltaY });
  return event;
}

/**
 * The sequences both sides must agree on: a single notch each way, a burst of notches, a burst that
 * reverses direction mid-gesture, a burst of fractional ticks whose remainder carries across a
 * rounding boundary, a slow pinch, a brisk pinch whose frames would clear the size window on their
 * own, a fallback with no `wheelDeltaY`, and a line-mode wheel each way. Every sequence's expected
 * total is non-zero and direction-specific — never an equal-and-opposite pair — so a side that
 * mishandles it cannot land on the right total by cancellation.
 */
const SEQUENCES: { name: string; frames: Frame[] }[] = [
  { name: 'one notch in', frames: [{ deltaY: -100, wheelDeltaY: 120 }] },
  { name: 'one notch out', frames: [{ deltaY: 100, wheelDeltaY: -120 }] },
  {
    name: 'a burst of three notches',
    frames: [
      { deltaY: -100, wheelDeltaY: 120 },
      { deltaY: -100, wheelDeltaY: 120 },
      { deltaY: -100, wheelDeltaY: 120 },
    ],
  },
  {
    // Pins the sign convention and correct signed netting across an asymmetric reversal: three
    // whole ticks in then one whole tick out must net to +2, not silently drop the reversed notch
    // or misapply its sign. Asymmetric on purpose, so the expected total is non-zero and
    // direction-specific rather than an equal-and-opposite pair that would sum to zero regardless
    // of which side is wrong. Every frame here is exactly one whole tick, so the remainder is 0
    // entering each one, including the reversal — the sub-tick carry has its own row below ("a
    // burst of fractional ticks"); this one does not exercise it.
    //
    // Does not pin the bootstrap's reversal flush itself (`requestZoomSteps`'s `reverses` branch,
    // which applies whatever is pending before folding in the opposite-direction notch) as distinct
    // from netting the whole burst and applying it once — the two give the same result everywhere
    // except at the ends of the zoom range, which is exactly the per-event-vs-coalesced-frame clamp
    // split documented below this array as outside what this test pins. A burst large enough to
    // reach that boundary would fail for the clamp-split reason, not the reversal-flush one, so no
    // sequence here can isolate that branch.
    name: 'a burst that reverses direction',
    frames: [
      { deltaY: -100, wheelDeltaY: 120 },
      { deltaY: -100, wheelDeltaY: 120 },
      { deltaY: -100, wheelDeltaY: 120 },
      { deltaY: 100, wheelDeltaY: -120 },
    ],
  },
  {
    // Pins the sub-tick remainder carrying across events in the same direction. Each frame is
    // exactly half a tick (`wheelDeltaY: 60` → 60/120), which sits exactly on `wholeTicks`'s
    // round-half-away-from-zero boundary: the first frame's accumulated -0.5 already rounds away
    // to a whole step, leaving a +0.5 residue; the second frame's -0.5 cancels that residue back to
    // 0, taking no step of its own; the third repeats the first. The total (2) depends on that
    // residue surviving between calls — discard the carry every event and each of the three
    // independently rounds -0.5 away from zero, giving 3 instead. Same direction throughout, so the
    // total is never built from cancellation.
    name: 'a burst of fractional ticks',
    frames: [
      { deltaY: -50, wheelDeltaY: 60 },
      { deltaY: -50, wheelDeltaY: 60 },
      { deltaY: -50, wheelDeltaY: 60 },
    ],
  },
  {
    name: 'a slow pinch',
    frames: Array.from({ length: 12 }, () => ({ deltaY: -2, wheelDeltaY: 2 })),
  },
  {
    name: 'a brisk pinch',
    frames: [
      { deltaY: -2, wheelDeltaY: 2 },
      { deltaY: -6, wheelDeltaY: 6 },
      { deltaY: -6, wheelDeltaY: 6 },
    ],
  },
  // A pixel delta with no `wheelDeltaY` at all, which is the shape the Text Collection grid's own
  // existing tests produce, so the fallback path has to agree too.
  { name: 'a notch with no wheelDeltaY', frames: [{ deltaY: -100 }] },
  // Line- and page-mode wheels take a branch of their own on both sides — one step in the event's
  // direction, leaving the tick accumulator alone. Each direction is its own sequence: an in-then-
  // out pair sums to zero on both sides by cancellation regardless of whether either side
  // implements the branch at all, so it could never catch a regression here.
  { name: 'a line-mode wheel in', frames: [{ deltaY: -3, deltaMode: 1 }] },
  { name: 'a line-mode wheel out', frames: [{ deltaY: 3, deltaMode: 1 }] },
];

// Outside what this test pins: the reader clamps the step count PER EVENT (`clampSteps` inside
// `stepWheel`), while the bootstrap clamps the COALESCED frame it applies (`applyZoomSteps`'s
// `Math.min(Math.abs(steps), WHEEL_MAX_STEPS)`). A single frame carrying enough notches to exceed
// the clamp would total differently on each side. That is structural, not a bug: the reader's
// consumer applies every event's return value as it arrives, so the reader has nothing to
// coalesce and clamps what it hands back per call; the bootstrap coalesces a burst before
// applying it, so it clamps the coalesced total instead. Both enforce the same invariant — one
// gesture can never ask for more than the platform's whole zoom range — and the area's own factor
// clamp absorbs whichever total actually lands, so no sequence here reaches this divergence.

describe('content-zoom wheel reading: bootstrap and platform-bible-utils agree', () => {
  let frameQueue: FrameRequestCallback[] = [];

  beforeEach(() => {
    frameQueue = [];
    // The bootstrap coalesces the notch path onto an animation frame; queue callbacks instead of
    // running them inline (a same-tick invocation would re-enter `requestZoomSteps` and clobber
    // its own `zoomFrame` assignment before it lands) and flush the queue once every frame in the
    // sequence has been dispatched, so the assertions see every step the sequence produced.
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      frameQueue.push(callback);
      return frameQueue.length;
    });
  });

  afterEach(() => {
    // Mirrors the chord-parity test's teardown for the same reason: without it the bootstrap's
    // mutation observer and window listeners outlive the test and leak into the next row's install.
    // eslint-disable-next-line no-underscore-dangle
    window.__platformContentZoom?.destroy();
    vi.unstubAllGlobals();
  });

  const flushFrames = () => {
    while (frameQueue.length > 0) {
      const callbacks = frameQueue;
      frameQueue = [];
      callbacks.forEach((callback) => callback(0));
    }
  };

  SEQUENCES.forEach(({ name, frames }) => {
    it(`agrees on ${name}`, () => {
      const { bound } = install('web-view-1', AREA_HTML);
      const area = document.getElementById('area');
      if (!area) throw new Error('the marked area is missing from the fixture');
      frames.forEach((frame) => {
        area.dispatchEvent(wheelEvent(frame));
      });
      flushFrames();
      // `act()` hands the bound helper a positive count to zoom in and a negative one to zoom
      // out, which is the reader's own convention, so the two sides are summed the same way.
      const bootstrapSteps = bound.adjustContentZoomById.mock.calls.reduce(
        (total: number, call: unknown[]) => total + Number(call[1]),
        0,
      );
      // Makes the header's "every sequence's expected total is non-zero" claim checkable: dropping
      // `ctrlKey` from `wheelEvent()` would make every sequence resolve to 0 on both sides, and the
      // equality check below would still pass at 0 === 0.
      expect(bootstrapSteps).not.toBe(0);

      const reader = createContentZoomWheelReader();
      try {
        const readerSteps = frames.reduce(
          (total, frame) => total + reader.read(wheelEvent(frame), 'main'),
          0,
        );
        expect(readerSteps).toBe(bootstrapSteps);
      } finally {
        reader.dispose();
      }
    });
  });

  it('pins the zoom range and step platform-bible-utils hardcodes to the platform constants they mirror', () => {
    // `content-zoom-wheel.util.ts` cannot import `@shared` (this package has no dependency on the
    // app), so its pinch calibration hardcodes the range width (3.0 - 0.5) and the default zoom step
    // (0.1) by value rather than importing them. Restated here so a change to
    // MIN_ZOOM_FACTOR/MAX_ZOOM_FACTOR/ZOOM_STEP alone fails this assertion instead of silently
    // desynchronising the two.
    expect(MAX_ZOOM_FACTOR - MIN_ZOOM_FACTOR).toBe(2.5);
    expect(ZOOM_STEP).toBe(0.1);
  });
});
