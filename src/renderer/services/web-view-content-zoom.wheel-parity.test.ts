import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createContentZoomWheelReader } from 'platform-bible-utils';
import { install } from './web-view-content-zoom.bootstrap-script.test-utils';

/** A marked main area for the bootstrap to target, and a place to dispatch wheel events at. */
const AREA_HTML = '<div id="area" data-platform-content-zoom-root=""><p>text</p></div>';

/** One frame of a wheel gesture, as both sides receive it. */
type Frame = { deltaY: number; wheelDeltaY?: number; deltaMode?: number };

/**
 * Something other than a wheel frame that both sides hear from the same window: a physical modifier
 * key going down or up, a pointer event reporting the modifier state, the window losing focus, or
 * the monotonic clock moving on.
 */
type Signal =
  | { key: 'keydown' | 'keyup'; physicalKey: 'Control' | 'Meta' }
  | { pointer: { ctrlKey: boolean; metaKey: boolean } }
  | { blur: true }
  | { advanceMs: number };

/** One step of a sequence: a wheel frame, or a signal both sides hear. */
type Step = Frame | Signal;

const isFrame = (step: Step): step is Frame => 'deltaY' in step;

/** Dispatches a signal once on the window, where both sides listen for it. */
function dispatchSignal(signal: Signal): void {
  if ('key' in signal)
    window.dispatchEvent(
      new KeyboardEvent(signal.key, {
        key: signal.physicalKey,
        ctrlKey: signal.physicalKey === 'Control' && signal.key === 'keydown',
        metaKey: signal.physicalKey === 'Meta' && signal.key === 'keydown',
      }),
    );
  // jsdom has no PointerEvent constructor; both sides read only the modifier flags, which a
  // MouseEvent of the same type carries identically.
  else if ('pointer' in signal)
    window.dispatchEvent(new MouseEvent('pointermove', { ...signal.pointer }));
  else if ('blur' in signal) window.dispatchEvent(new Event('blur'));
  else vi.advanceTimersByTime(signal.advanceMs);
}

/**
 * Three frames small enough to be read as a pinch by size alone but carrying a whole notch of
 * `wheelDeltaY` each, as a macOS mouse notch does. Read as notches they are 3 steps; read as pinch
 * travel (12 px against a ~9.53 px step) they are 1. Which of the two a side reads them as is what
 * its physical-modifier tracking decides, so every modifier sequence below ends with these.
 */
const SMALL_NOTCHES: Frame[] = Array.from({ length: 3 }, () => ({ deltaY: -4, wheelDeltaY: 120 }));

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
 * own, a fallback with no `wheelDeltaY`, a line-mode wheel each way, a notch just outside the pinch
 * window, the physical-modifier tracking that tells a notch from a pinch (a held Control or Meta, a
 * pointer event reporting Ctrl, that reading going stale, a keyup or a later pointer event
 * overruling it, the window losing focus), and a slow Ctrl+scroll whose `wheelDeltaY` rounds to 0.
 * Every sequence's expected total is non-zero and direction-specific — never an equal-and-opposite
 * pair — so a side that mishandles it cannot land on the right total by cancellation.
 */
const SEQUENCES: { name: string; frames: Step[] }[] = [
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
  // A single frame just outside the size window that opens a pinch (`exp(0.06) - 1` ≈ 0.062 against
  // 0.05) carrying a whole notch, so a side whose window were wider would read it as 6 px of pinch
  // travel — no step at all — instead of the notch's one.
  { name: 'a notch just outside the pinch window', frames: [{ deltaY: -6, wheelDeltaY: 120 }] },
  // Physical-modifier tracking: which frames are notches and which are a pinch. Each sequence below
  // ends in SMALL_NOTCHES, which total 3 as notches and 1 as a pinch, so a side that tracks a
  // modifier differently lands on the other total.
  {
    name: 'small notches with Control physically held',
    frames: [{ key: 'keydown', physicalKey: 'Control' }, ...SMALL_NOTCHES],
  },
  {
    name: 'small notches with Meta physically held',
    frames: [{ key: 'keydown', physicalKey: 'Meta' }, ...SMALL_NOTCHES],
  },
  {
    name: 'small notches after a pointer event reporting Ctrl',
    frames: [{ pointer: { ctrlKey: true, metaKey: false } }, ...SMALL_NOTCHES],
  },
  {
    name: 'a pinch once a pointer reading of Ctrl has gone stale',
    frames: [
      { pointer: { ctrlKey: true, metaKey: false } },
      // Past the 2 s a pointer reading is trusted for.
      { advanceMs: 2500 },
      ...SMALL_NOTCHES,
    ],
  },
  {
    name: 'a pinch after a keyup overrules a pointer reading of Ctrl',
    frames: [
      { pointer: { ctrlKey: true, metaKey: false } },
      { key: 'keyup', physicalKey: 'Control' },
      ...SMALL_NOTCHES,
    ],
  },
  {
    name: 'a pinch after a pointer event reports a held Control released',
    frames: [
      { key: 'keydown', physicalKey: 'Control' },
      { pointer: { ctrlKey: false, metaKey: false } },
      ...SMALL_NOTCHES,
    ],
  },
  {
    name: 'a pinch after the window loses focus with Control held',
    frames: [{ key: 'keydown', physicalKey: 'Control' }, { blur: true }, ...SMALL_NOTCHES],
  },
  {
    // A slow two-finger scroll with Ctrl held: Chromium's integer `wheelDeltaY` rounds each frame's
    // sub-pixel `deltaY` to 0, so the travel has to be read from the pixel delta instead. 200
    // frames of 0.3 px is 60 px, past the half tick that rounds to one step.
    name: 'a slow Ctrl+scroll whose wheelDeltaY rounds to 0',
    frames: [
      { key: 'keydown', physicalKey: 'Control' },
      ...Array.from({ length: 200 }, () => ({ deltaY: -0.3, wheelDeltaY: 0 })),
    ],
  },
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
    // Only the monotonic clock both sides time pinch latches and pointer readings with, so a
    // sequence decides how much time passes between its steps.
    vi.useFakeTimers({ toFake: ['performance'] });
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
    vi.useRealTimers();
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
      // Both sides are live at once, so a signal dispatched on the window reaches both of them at
      // the same moment and each wheel frame is handed to both before the next step runs.
      const reader = createContentZoomWheelReader();
      let readerSteps = 0;
      try {
        frames.forEach((step) => {
          if (!isFrame(step)) {
            dispatchSignal(step);
            return;
          }
          area.dispatchEvent(wheelEvent(step));
          readerSteps += reader.read(wheelEvent(step), 'main');
        });
      } finally {
        reader.dispose();
      }
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
      expect(readerSteps).toBe(bootstrapSteps);
    });
  });
});
