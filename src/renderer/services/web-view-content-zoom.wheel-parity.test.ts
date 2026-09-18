import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createContentZoomWheelReader } from 'platform-bible-utils';
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
 * The sequences both sides must agree on: a single notch each way, a burst of notches, a slow
 * pinch, and a brisk pinch whose frames would clear the size window on their own.
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
];

/**
 * Line- and page-mode wheels take a branch of their own on both sides — one step in the event's
 * direction, leaving the tick accumulator alone — so they need a sequence whose events carry a
 * `deltaMode`, which the shared builder above always sets to 0.
 */
const LINE_MODE_FRAMES = [
  { deltaY: -3, deltaMode: 1 },
  { deltaY: 3, deltaMode: 1 },
];

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
  });

  const flushFrames = () => {
    while (frameQueue.length > 0) {
      const callbacks = frameQueue;
      frameQueue = [];
      callbacks.forEach((callback) => callback(0));
    }
  };

  [...SEQUENCES, { name: 'a line-mode wheel each way', frames: LINE_MODE_FRAMES }].forEach(
    ({ name, frames }) => {
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
    },
  );
});
