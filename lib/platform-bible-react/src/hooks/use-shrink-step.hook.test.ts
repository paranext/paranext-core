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

  test('holds the current step when nothing has changed', () => {
    expect(getShrinkStep(600, THRESHOLDS, 0)).toBe(0);
    expect(getShrinkStep(380, THRESHOLDS, 2)).toBe(2);
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

  emitWidth(width: number) {
    // A full ResizeObserverEntry carries ~8 read-only geometry fields the hook never reads;
    // constructing one would test the fake rather than the hook. Asserting just the shape the hook
    // consumes keeps the fake honest about what the contract actually is.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const entry = { contentRect: { width } } as ResizeObserverEntry;
    this.callback([entry], this);
  }
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

  test('updates the step when the observed element resizes', () => {
    const element = document.createElement('div');
    const { result } = renderHook(() => useShrinkStep(element, THRESHOLDS));

    act(() => FakeResizeObserver.instances[0].emitWidth(300));
    expect(result.current).toBe(3);

    act(() => FakeResizeObserver.instances[0].emitWidth(600));
    expect(result.current).toBe(0);
  });

  test('recovers the correct step after the view was hidden (width 0) and shown again', () => {
    const element = document.createElement('div');
    const { result } = renderHook(() => useShrinkStep(element, THRESHOLDS));

    act(() => FakeResizeObserver.instances[0].emitWidth(600));
    expect(result.current).toBe(0);

    // rc-dock hides an inactive tab's web view with display:none, where geometry reads 0.
    act(() => FakeResizeObserver.instances[0].emitWidth(0));
    expect(result.current).toBe(3);

    // Tab activated again: the observer fires with the real width and the step must come back.
    act(() => FakeResizeObserver.instances[0].emitWidth(600));
    expect(result.current).toBe(0);
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
