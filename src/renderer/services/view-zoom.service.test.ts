import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createViewZoomService } from './view-zoom.service';

vi.mock('@shared/services/settings.service', () => ({
  settingsService: {
    get: vi.fn(async () => ({})),
    set: vi.fn(async () => {}),
    subscribe: vi.fn(async () => async () => {}),
  },
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: {
    warn: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
  },
}));

function makeSettingsStub(initial: Record<string, number> = {}) {
  let value = { ...initial };
  const listeners: Array<(v: Record<string, number>) => void> = [];
  return {
    get: vi.fn(async () => value),
    set: vi.fn(async (_key: 'platform.viewZooms', v: Record<string, number>) => {
      value = { ...v };
      listeners.forEach((l) => l(value));
    }),
    subscribe: vi.fn(
      async (_key: 'platform.viewZooms', cb: (v: Record<string, number>) => void) => {
        listeners.push(cb);
        return async () => {
          const i = listeners.indexOf(cb);
          if (i >= 0) listeners.splice(i, 1);
        };
      },
    ),
    peekValue: () => value,
  };
}

describe('view-zoom.service', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns 1.0 for unknown keys', async () => {
    const settings = makeSettingsStub();
    const svc = createViewZoomService(settings, { persistDebounceMs: 10 });
    await svc.ready;
    expect(svc.getZoom('unknown')).toBe(1.0);
  });

  it('setZoom clamps to [MIN, MAX] and notifies subscribers', async () => {
    const settings = makeSettingsStub();
    const svc = createViewZoomService(settings, { persistDebounceMs: 10 });
    await svc.ready;

    const calls: number[] = [];
    svc.subscribe('settings-tab', (v) => calls.push(v));

    svc.setZoom('settings-tab', 5); // above MAX (3.0)
    svc.setZoom('settings-tab', 0.1); // below MIN (0.5)

    expect(svc.getZoom('settings-tab')).toBe(0.5);
    expect(calls).toEqual([3.0, 0.5]);
  });

  it('adjustZoom steps by ±0.1 per step', async () => {
    const settings = makeSettingsStub();
    const svc = createViewZoomService(settings, { persistDebounceMs: 10 });
    await svc.ready;

    svc.adjustZoom('a', +1);
    expect(svc.getZoom('a')).toBeCloseTo(1.1, 5);
    svc.adjustZoom('a', -2);
    expect(svc.getZoom('a')).toBeCloseTo(0.9, 5);
  });

  it('resetZoom deletes the entry', async () => {
    const settings = makeSettingsStub();
    const svc = createViewZoomService(settings, { persistDebounceMs: 10 });
    await svc.ready;
    svc.setZoom('x', 1.5);
    svc.resetZoom('x');
    expect(svc.getZoom('x')).toBe(1.0);
  });

  it('debounces persistence', async () => {
    const settings = makeSettingsStub();
    const svc = createViewZoomService(settings, { persistDebounceMs: 100 });
    await svc.ready;

    svc.setZoom('a', 1.2);
    svc.setZoom('a', 1.3);
    svc.setZoom('a', 1.4);

    expect(settings.set).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(100);

    expect(settings.set).toHaveBeenCalledTimes(1);
    expect(settings.peekValue()).toEqual({ a: 1.4 });
  });

  it('subscribe unsubscribe stops notifications', async () => {
    const settings = makeSettingsStub();
    const svc = createViewZoomService(settings, { persistDebounceMs: 10 });
    await svc.ready;

    const calls: number[] = [];
    const unsub = svc.subscribe('a', (v) => calls.push(v));
    svc.setZoom('a', 1.2);
    unsub();
    svc.setZoom('a', 1.5);

    expect(calls).toEqual([1.2]);
  });

  it('per-instance fallback reads __default when instance key is missing', async () => {
    const settings = makeSettingsStub({
      'platformScriptureEditor.editor:__default': 1.4,
    });
    const svc = createViewZoomService(settings, {
      persistDebounceMs: 10,
      perInstanceTypes: new Set(['platformScriptureEditor.editor']),
    });
    await svc.ready;

    expect(svc.getZoom('platformScriptureEditor.editor:newTab')).toBeCloseTo(1.4, 5);
  });

  it('setZoom on per-instance key also updates __default', async () => {
    const settings = makeSettingsStub();
    const svc = createViewZoomService(settings, {
      persistDebounceMs: 10,
      perInstanceTypes: new Set(['platformScriptureEditor.editor']),
    });
    await svc.ready;

    svc.setZoom('platformScriptureEditor.editor:tab1', 1.3);
    await vi.advanceTimersByTimeAsync(10);

    expect(settings.peekValue()).toEqual({
      'platformScriptureEditor.editor:tab1': 1.3,
      'platformScriptureEditor.editor:__default': 1.3,
    });
  });

  it('resetZoom on a per-instance key leaves the per-type __default in place', async () => {
    const settings = makeSettingsStub();
    const svc = createViewZoomService(settings, {
      persistDebounceMs: 10,
      perInstanceTypes: new Set(['platformScriptureEditor.editor']),
    });
    await svc.ready;

    svc.setZoom('platformScriptureEditor.editor:tab1', 1.4);
    svc.resetZoom('platformScriptureEditor.editor:tab1');
    await vi.advanceTimersByTimeAsync(10);

    // The instance's own zoom is reset...
    expect(svc.getZoom('platformScriptureEditor.editor:tab1')).toBeCloseTo(1.4, 5);
    // ...but the value that it returns now comes from the per-type __default fallback.
    expect(settings.peekValue()).toEqual({
      'platformScriptureEditor.editor:__default': 1.4,
    });
  });

  it('a new per-instance key reads the mirrored __default after a sibling instance was set', async () => {
    const settings = makeSettingsStub();
    const svc = createViewZoomService(settings, {
      persistDebounceMs: 10,
      perInstanceTypes: new Set(['platformScriptureEditor.editor']),
    });
    await svc.ready;

    // Instance A sets a value; the mirror writes to __default.
    svc.setZoom('platformScriptureEditor.editor:tabA', 1.6);
    // Instance B (never explicitly set) inherits the mirrored default.
    expect(svc.getZoom('platformScriptureEditor.editor:tabB')).toBeCloseTo(1.6, 5);
  });

  it('writing directly to a __default key does not recurse / mirror to itself', async () => {
    const settings = makeSettingsStub();
    const svc = createViewZoomService(settings, {
      persistDebounceMs: 10,
      perInstanceTypes: new Set(['platformScriptureEditor.editor']),
    });
    await svc.ready;

    svc.setZoom('platformScriptureEditor.editor:__default', 1.2);
    await vi.advanceTimersByTimeAsync(10);

    expect(settings.peekValue()).toEqual({
      'platformScriptureEditor.editor:__default': 1.2,
    });
  });

  it('prune notifies subscribers of dropped per-instance keys with the default factor', async () => {
    const settings = makeSettingsStub({
      'platformScriptureEditor.editor:dead': 1.3,
    });
    const svc = createViewZoomService(settings, {
      persistDebounceMs: 10,
      perInstanceTypes: new Set(['platformScriptureEditor.editor']),
    });
    await svc.ready;

    const calls: number[] = [];
    svc.subscribe('platformScriptureEditor.editor:dead', (v) => calls.push(v));

    svc.prune(new Set([]));
    await vi.advanceTimersByTimeAsync(10);

    expect(calls).toEqual([1.0]);
  });

  it('flush writes pending state synchronously and clears the timer', async () => {
    const settings = makeSettingsStub();
    const svc = createViewZoomService(settings, { persistDebounceMs: 1000 });
    await svc.ready;

    svc.setZoom('a', 1.7);
    expect(settings.set).not.toHaveBeenCalled();

    await svc.flush();

    expect(settings.set).toHaveBeenCalledTimes(1);
    expect(settings.peekValue()).toEqual({ a: 1.7 });

    // No additional persist after flush (timer already cleared).
    await vi.advanceTimersByTimeAsync(1000);
    expect(settings.set).toHaveBeenCalledTimes(1);
  });

  it('prune removes per-instance keys whose id is not in the live-id set', async () => {
    const settings = makeSettingsStub({
      'platformScriptureEditor.editor:alive': 1.2,
      'platformScriptureEditor.editor:dead': 1.3,
      'platformScriptureEditor.editor:__default': 1.1,
      'settings-tab': 1.4,
    });
    const svc = createViewZoomService(settings, {
      persistDebounceMs: 10,
      perInstanceTypes: new Set(['platformScriptureEditor.editor']),
    });
    await svc.ready;

    svc.prune(new Set(['alive']));
    await vi.advanceTimersByTimeAsync(10);

    expect(settings.peekValue()).toEqual({
      'platformScriptureEditor.editor:alive': 1.2,
      'platformScriptureEditor.editor:__default': 1.1,
      'settings-tab': 1.4,
    });
  });
});
