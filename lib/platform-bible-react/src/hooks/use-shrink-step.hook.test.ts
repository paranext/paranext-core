import { act, renderHook } from '@testing-library/react';
import { getShrinkStep, useShrinkStep, SHRINK_STEP_HYSTERESIS_PX } from './use-shrink-step.hook';

const THRESHOLDS = [520, 420, 340] as const;

describe('getShrinkStep', () => {
  test('returns a wider step for a wider container', () => {
    expect(getShrinkStep(600, THRESHOLDS, 0)).toBe(0);
    expect(getShrinkStep(450, THRESHOLDS, 0)).toBe(1);
    expect(getShrinkStep(380, THRESHOLDS, 0)).toBe(2);
    expect(getShrinkStep(300, THRESHOLDS, 0)).toBe(3);
  });

  test('treats a width exactly on a threshold as the wider step', () => {
    expect(getShrinkStep(520, THRESHOLDS, 0)).toBe(0);
    expect(getShrinkStep(519, THRESHOLDS, 0)).toBe(1);
  });

  test('narrows immediately, with no hysteresis delay', () => {
    // Shrinking must never lag: a late narrow step means visibly clipped text.
    expect(getShrinkStep(519, THRESHOLDS, 0)).toBe(1);
    expect(getShrinkStep(300, THRESHOLDS, 1)).toBe(3);
  });

  test('requires the hysteresis band to be cleared before widening again', () => {
    // Sitting just above the threshold after having narrowed: stay narrow.
    expect(getShrinkStep(520, THRESHOLDS, 1)).toBe(1);
    expect(getShrinkStep(520 + SHRINK_STEP_HYSTERESIS_PX - 1, THRESHOLDS, 1)).toBe(1);
    // Clear of the band: widen.
    expect(getShrinkStep(520 + SHRINK_STEP_HYSTERESIS_PX, THRESHOLDS, 1)).toBe(0);
  });

  test('relaxes to the widest step actually cleared, not just the next one, so a narrow start cannot get stuck', () => {
    // 525 is inside step 0's band (520 + 8) but well clear of step 1's (420 + 8). Coming from the
    // narrowest step — where every hidden tab starts, since `display: none` reports width 0 —
    // holding 3 would leave the toolbar at its shortest form indefinitely.
    expect(getShrinkStep(525, THRESHOLDS, 3)).toBe(1);
    // Inside every band: nothing to relax to, so hold.
    expect(getShrinkStep(345, THRESHOLDS, 3)).toBe(3);
  });

  test('holds the current step when nothing has changed', () => {
    expect(getShrinkStep(600, THRESHOLDS, 0)).toBe(0);
    expect(getShrinkStep(380, THRESHOLDS, 2)).toBe(2);
  });

  test('takes the width at face value when there is no previous step, since hysteresis only damps a drag', () => {
    // 425 sits inside step 1's hysteresis band (420 + 8). With a previous step it would be held
    // back; with none there is no drag to damp, so the honest answer is the band the width is in.
    expect(getShrinkStep(425, THRESHOLDS, undefined)).toBe(1);
    expect(getShrinkStep(425, THRESHOLDS)).toBe(1);
  });
});

/**
 * Jsdom ships no `ResizeObserver`. This fake records every instance so a test can drive the
 * callback by hand, which is the only way to simulate a resize without a layout engine.
 */
class FakeResizeObserver implements ResizeObserver {
  static instances: FakeResizeObserver[] = [];

  observed = new Set<Element>();

  isDisconnected = false;

  private readonly callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
    FakeResizeObserver.instances.push(this);
  }

  observe(target: Element) {
    this.observed.add(target);
  }

  unobserve(target: Element) {
    this.observed.delete(target);
  }

  disconnect() {
    this.observed.clear();
    this.isDisconnected = true;
  }

  /**
   * The hook re-measures the element rather than reading the observer entry, so a resize is
   * simulated by changing what the element reports and then firing the callback with no entries.
   */
  emitResize() {
    this.callback([], this);
  }
}

/**
 * Jsdom gives every element a zero bounding box, so widths have to be stated. Returns a full
 * `DOMRect` rather than asserting a partial one — the hook reads `width`, but a real rect has every
 * edge, and a stub that lies about its shape would hide a future read of `right` or `x`.
 */
function setWidth(element: HTMLElement, width: number) {
  element.getBoundingClientRect = () => ({
    width,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: width,
    x: 0,
    y: 0,
    toJSON: () => '',
  });
}

describe('useShrinkStep', () => {
  const originalResizeObserver = globalThis.ResizeObserver;

  beforeEach(() => {
    FakeResizeObserver.instances = [];
    globalThis.ResizeObserver = FakeResizeObserver;
  });

  afterEach(() => {
    globalThis.ResizeObserver = originalResizeObserver;
  });

  test('reports the widest step before any element is attached', () => {
    const { result } = renderHook(() => useShrinkStep(undefined, THRESHOLDS));

    expect(result.current).toBe(0);
    expect(FakeResizeObserver.instances).toHaveLength(0);
  });

  test('measures the element on mount, before anything resizes', () => {
    // A layout effect, so the first paint already carries the right step — a passive effect would
    // paint the widest form first and snap.
    const element = document.createElement('div');
    setWidth(element, 300);

    const { result } = renderHook(() => useShrinkStep(element, THRESHOLDS));

    expect(result.current).toBe(3);
  });

  test('updates the step when the observed element resizes', () => {
    const element = document.createElement('div');
    setWidth(element, 300);
    const { result } = renderHook(() => useShrinkStep(element, THRESHOLDS));

    setWidth(element, 600);
    act(() => FakeResizeObserver.instances[0].emitResize());
    expect(result.current).toBe(0);
  });

  test('recovers the correct step after the view was hidden (width 0) and shown again', () => {
    const element = document.createElement('div');
    setWidth(element, 600);
    const { result } = renderHook(() => useShrinkStep(element, THRESHOLDS));
    expect(result.current).toBe(0);

    // rc-dock hides an inactive tab's web view with display:none, where geometry reads 0.
    setWidth(element, 0);
    act(() => FakeResizeObserver.instances[0].emitResize());
    expect(result.current).toBe(3);

    // Shown again at 425. Being revealed is not a drag, so the step taken while the width read 0
    // is not treated as something to be sticky about: 425 clears 420, so step 1 — not step 2, which
    // is what holding the hidden step and relaxing one band at a time would give.
    setWidth(element, 425);
    act(() => FakeResizeObserver.instances[0].emitResize());
    expect(result.current).toBe(1);
  });

  test('does not strand a single-threshold consumer at its narrowest form after it was hidden', () => {
    // A consumer with one threshold has no other band to relax into, so holding the hidden step
    // would leave it collapsed at any width inside that band. 385 clears 384 but not 384 + 8.
    const SINGLE_THRESHOLD = [384] as const;
    const element = document.createElement('div');
    setWidth(element, 500);
    const { result } = renderHook(() => useShrinkStep(element, SINGLE_THRESHOLD));
    expect(result.current).toBe(0);

    setWidth(element, 0);
    act(() => FakeResizeObserver.instances[0].emitResize());
    expect(result.current).toBe(1);

    setWidth(element, 385);
    act(() => FakeResizeObserver.instances[0].emitResize());
    expect(result.current).toBe(0);
  });

  test('still applies hysteresis to a genuine widening drag, so a label cannot flutter on a threshold', () => {
    const element = document.createElement('div');
    setWidth(element, 450);
    const { result } = renderHook(() => useShrinkStep(element, THRESHOLDS));
    expect(result.current).toBe(1);

    // Narrowing past 420 applies at once...
    setWidth(element, 419);
    act(() => FakeResizeObserver.instances[0].emitResize());
    expect(result.current).toBe(2);

    // ...but coming back to 421 does not, because it has not cleared 420 + 8.
    setWidth(element, 421);
    act(() => FakeResizeObserver.instances[0].emitResize());
    expect(result.current).toBe(2);

    setWidth(element, 428);
    act(() => FakeResizeObserver.instances[0].emitResize());
    expect(result.current).toBe(1);
  });

  test('observes the element it was given', () => {
    const element = document.createElement('div');
    renderHook(() => useShrinkStep(element, THRESHOLDS));

    expect(FakeResizeObserver.instances[0].observed.has(element)).toBe(true);
  });

  test('disconnects the observer on unmount', () => {
    const element = document.createElement('div');
    const { unmount } = renderHook(() => useShrinkStep(element, THRESHOLDS));

    expect(FakeResizeObserver.instances[0].isDisconnected).toBe(false);
    unmount();
    expect(FakeResizeObserver.instances[0].isDisconnected).toBe(true);
  });
});
