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

  it('derives the default max steps from the effective zoom step', () => {
    reader = createContentZoomWheelReader({ zoomStep: 0.05 });
    const huge = new WheelEvent('wheel', {
      ctrlKey: true,
      deltaY: -100000,
      deltaX: 0,
      deltaMode: 0,
    });
    Object.defineProperty(huge, 'wheelDeltaY', { value: 120000 });
    // The 0.5–3.0 range in 0.05 steps is 50 steps, not the 25 a hardcoded 0.1 would give.
    expect(reader.read(huge, 'a')).toBe(50);
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
    reader.read(pinchFrame(-2), 'a');
    // Stays on the pinch path only because the gesture is still latched — this frame would fail the
    // size test on its own.
    reader.read(pinchFrame(-6), 'a');
    // 2 + 6 + 2 = 10 px, past the ~9.53 px a step costs.
    expect(reader.read(pinchFrame(-2), 'a')).toBe(1);
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

  it('ignores a zero-delta ctrl+wheel event entirely', () => {
    reader = createContentZoomWheelReader();
    reader.read(pinchFrame(-4), 'a');
    reader.read(pinchFrame(-4), 'a'); // 8 px banked, just under the ~9.53 px a step costs
    const zeroDelta = new WheelEvent('wheel', {
      ctrlKey: true,
      deltaY: 0,
      deltaX: 0,
      deltaMode: 0,
    });
    // A zero-delta ctrl+wheel event is a complete no-op: it neither resets the banked pinch travel
    // nor consumes a step of its own.
    expect(reader.read(zeroDelta, 'a')).toBe(0);
    expect(reader.read(pinchFrame(-4), 'a')).toBe(1);
  });

  it('reads a line- or page-mode wheel event as exactly one step, ignoring its magnitude', () => {
    reader = createContentZoomWheelReader();
    const line = new WheelEvent('wheel', { ctrlKey: true, deltaY: -3, deltaX: 0, deltaMode: 1 });
    const page = new WheelEvent('wheel', { ctrlKey: true, deltaY: 2000, deltaX: 0, deltaMode: 2 });
    expect(reader.read(line, 'a')).toBe(1);
    expect(reader.read(page, 'a')).toBe(-1);
  });

  it('falls back to the pixel delta when wheelDeltaY is absent', () => {
    reader = createContentZoomWheelReader();
    const inNoWheelDeltaY = new WheelEvent('wheel', {
      ctrlKey: true,
      deltaY: -100,
      deltaX: 0,
      deltaMode: 0,
    });
    const outNoWheelDeltaY = new WheelEvent('wheel', {
      ctrlKey: true,
      deltaY: 100,
      deltaX: 0,
      deltaMode: 0,
    });
    expect(reader.read(inNoWheelDeltaY, 'a')).toBe(1);
    expect(reader.read(outNoWheelDeltaY, 'a')).toBe(-1);
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
