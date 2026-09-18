// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import {
  createContentZoomWheelReader,
  type ContentZoomWheelReader,
} from './content-zoom-wheel.util';

let reader: ContentZoomWheelReader | undefined;

afterEach(() => {
  reader?.dispose();
  reader = undefined;
});

/** A mouse notch: `wheelDeltaY` of ∓120, the value Chromium reports on every platform. */
function notch(direction: 'in' | 'out'): WheelEvent {
  const wheelDeltaY = direction === 'in' ? 120 : -120;
  const event = new WheelEvent('wheel', {
    ctrlKey: true,
    deltaY: direction === 'in' ? -100 : 100,
    deltaX: 0,
    deltaMode: 0,
  });
  Object.defineProperty(event, 'wheelDeltaY', { value: wheelDeltaY });
  return event;
}

/**
 * One frame of Chromium's synthesized trackpad pinch: ctrl+wheel, no physical modifier, tiny
 * deltaY.
 */
function pinchFrame(deltaY: number): WheelEvent {
  const event = new WheelEvent('wheel', { ctrlKey: true, deltaY, deltaX: 0, deltaMode: 0 });
  Object.defineProperty(event, 'wheelDeltaY', { value: -deltaY });
  return event;
}

describe('createContentZoomWheelReader', () => {
  it('reads one mouse notch as exactly one step, in each direction', () => {
    reader = createContentZoomWheelReader();
    expect(reader.read(notch('in'), 'a')).toBe(1);
    expect(reader.read(notch('out'), 'a')).toBe(-1);
  });

  it('carries the remainder of a partial notch instead of dropping it', () => {
    reader = createContentZoomWheelReader();
    const half = () => {
      const event = new WheelEvent('wheel', {
        ctrlKey: true,
        deltaY: -50,
        deltaX: 0,
        deltaMode: 0,
      });
      Object.defineProperty(event, 'wheelDeltaY', { value: 60 });
      return event;
    };
    // Two half notches make one whole step; neither half is lost and neither alone steps twice.
    const first = reader.read(half(), 'a');
    const second = reader.read(half(), 'a');
    expect(first + second).toBe(1);
  });

  it('does not let one enormous event exceed the zoom range', () => {
    reader = createContentZoomWheelReader({ maxSteps: 25 });
    const huge = new WheelEvent('wheel', {
      ctrlKey: true,
      deltaY: -100000,
      deltaX: 0,
      deltaMode: 0,
    });
    Object.defineProperty(huge, 'wheelDeltaY', { value: 120000 });
    expect(reader.read(huge, 'a')).toBe(25);
  });

  it('reads a pinch as travel through the scale, not a step per frame', () => {
    reader = createContentZoomWheelReader();
    const activeReader = reader;
    // Eight frames of a slow pinch, each far too small to be a notch. A step is ln(1.1)*100 ≈ 9.53
    // px of travel, so eight 2-px frames (16 px) cross exactly one boundary.
    const steps = [0, 0, 0, 0, 0, 0, 0, 0].map(() => activeReader.read(pinchFrame(-2), 'a'));
    expect(steps.reduce((sum, step) => sum + step, 0)).toBe(1);
  });

  it('keeps a running pinch on the pinch path even once its frames grow large', () => {
    reader = createContentZoomWheelReader();
    reader.read(pinchFrame(-2), 'a'); // opens the gesture on its size
    // A brisk frame that would clear the size window on its own stays a pinch because the gesture
    // is still latched — otherwise the faster the gesture, the coarser it would respond.
    expect(reader.read(pinchFrame(-6), 'a')).toBeLessThanOrEqual(1);
  });

  it('starts a fresh gesture when the scope changes', () => {
    reader = createContentZoomWheelReader();
    // Two frames of a pinch in one scope bank 8 px of travel — just under the ~9.53 px a step
    // costs, so neither frame steps on its own.
    expect(reader.read(pinchFrame(-4), 'a')).toBe(0);
    expect(reader.read(pinchFrame(-4), 'a')).toBe(0);
    // A third identical frame in a DIFFERENT scope starts its own travel at 4 px and still does not
    // step. Were the banked travel to carry across scopes it would total 12 px and step once, so
    // this assertion fails the moment the reset is removed.
    expect(reader.read(pinchFrame(-4), 'b')).toBe(0);
  });

  it('treats ctrl+wheel as a mouse notch while Ctrl is physically down', () => {
    reader = createContentZoomWheelReader();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Control' }));
    // Small enough to look like a pinch by size alone; the held key is what tells them apart.
    const small = new WheelEvent('wheel', { ctrlKey: true, deltaY: -4, deltaX: 0, deltaMode: 0 });
    Object.defineProperty(small, 'wheelDeltaY', { value: 120 });
    expect(reader.read(small, 'a')).toBe(1);
    window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Control' }));
  });

  it('stops listening after dispose', () => {
    reader = createContentZoomWheelReader();
    reader.dispose();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Control' }));
    const small = new WheelEvent('wheel', { ctrlKey: true, deltaY: -4, deltaX: 0, deltaMode: 0 });
    Object.defineProperty(small, 'wheelDeltaY', { value: 120 });
    // With the listeners gone the held key is invisible, so the small event reads as a pinch frame.
    expect(reader.read(small, 'a')).toBe(0);
    reader = undefined;
  });
});
