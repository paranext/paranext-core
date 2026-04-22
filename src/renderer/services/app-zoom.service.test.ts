import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createAppZoomService } from './app-zoom.service';

vi.mock('@shared/services/settings.service', () => ({
  settingsService: {
    get: vi.fn(async () => 1.0),
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

function makeSettingsStub(initial: number = 1.0) {
  let value = initial;
  return {
    get: vi.fn(async () => value),
    set: vi.fn(async (_key: 'platform.appZoom', v: number) => {
      value = v;
    }),
    subscribe: vi.fn(async () => async () => {}),
    peekValue: () => value,
  };
}

describe('app-zoom.service', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.body.style.zoom = '';
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.style.zoom = '';
  });

  it('returns 1.0 before any change', async () => {
    const settings = makeSettingsStub();
    const svc = createAppZoomService(
      settings,
      vi.fn(async () => {}),
      { persistDebounceMs: 10 },
    );
    await svc.ready;
    expect(svc.get()).toBe(1.0);
  });

  it('loads persisted value on ready and applies to document.body', async () => {
    const settings = makeSettingsStub(1.5);
    const svc = createAppZoomService(
      settings,
      vi.fn(async () => {}),
      { persistDebounceMs: 10 },
    );
    await svc.ready;
    expect(svc.get()).toBe(1.5);
    expect(document.body.style.zoom).toBe('1.5');
  });

  it('ready does NOT call resetAll', async () => {
    const settings = makeSettingsStub(1.5);
    const resetAll = vi.fn(async () => {});
    const svc = createAppZoomService(settings, resetAll, { persistDebounceMs: 10 });
    await svc.ready;
    expect(resetAll).not.toHaveBeenCalled();
  });

  it('set() clamps to [0.5, 3.0]', async () => {
    const settings = makeSettingsStub();
    const svc = createAppZoomService(
      settings,
      vi.fn(async () => {}),
      { persistDebounceMs: 10 },
    );
    await svc.ready;

    svc.set(5.0);
    expect(svc.get()).toBe(3.0);

    svc.set(0.1);
    expect(svc.get()).toBe(0.5);
  });

  it('set() applies zoom to document.body', async () => {
    const settings = makeSettingsStub();
    const svc = createAppZoomService(
      settings,
      vi.fn(async () => {}),
      { persistDebounceMs: 10 },
    );
    await svc.ready;

    svc.set(1.3);
    expect(document.body.style.zoom).toBe('1.3');
  });

  it('set() calls resetAll', async () => {
    const settings = makeSettingsStub();
    const resetAll = vi.fn(async () => {});
    const svc = createAppZoomService(settings, resetAll, { persistDebounceMs: 10 });
    await svc.ready;

    svc.set(1.5);
    expect(resetAll).toHaveBeenCalledTimes(1);
  });

  it('set() with the same value is a no-op', async () => {
    const settings = makeSettingsStub(1.3);
    const resetAll = vi.fn(async () => {});
    const svc = createAppZoomService(settings, resetAll, { persistDebounceMs: 10 });
    await svc.ready;

    svc.set(1.3);
    expect(resetAll).not.toHaveBeenCalled();
  });

  it('adjust() increments by the given delta', async () => {
    const settings = makeSettingsStub();
    const svc = createAppZoomService(
      settings,
      vi.fn(async () => {}),
      { persistDebounceMs: 10 },
    );
    await svc.ready;

    svc.adjust(+0.1);
    expect(svc.get()).toBeCloseTo(1.1, 5);
    svc.adjust(-0.2);
    expect(svc.get()).toBeCloseTo(0.9, 5);
  });

  it('reset() returns to 1.0 and updates document.body', async () => {
    const settings = makeSettingsStub(1.5);
    const svc = createAppZoomService(
      settings,
      vi.fn(async () => {}),
      { persistDebounceMs: 10 },
    );
    await svc.ready;

    svc.reset();
    expect(svc.get()).toBe(1.0);
    expect(document.body.style.zoom).toBe('1');
  });

  it('subscribers are notified on set()', async () => {
    const settings = makeSettingsStub();
    const svc = createAppZoomService(
      settings,
      vi.fn(async () => {}),
      { persistDebounceMs: 10 },
    );
    await svc.ready;

    const calls: number[] = [];
    svc.subscribe((v) => calls.push(v));
    svc.set(1.2);
    svc.set(1.4);
    expect(calls).toEqual([1.2, 1.4]);
  });

  it('unsubscribe stops notifications', async () => {
    const settings = makeSettingsStub();
    const svc = createAppZoomService(
      settings,
      vi.fn(async () => {}),
      { persistDebounceMs: 10 },
    );
    await svc.ready;

    const calls: number[] = [];
    const unsub = svc.subscribe((v) => calls.push(v));
    svc.set(1.2);
    unsub();
    svc.set(1.5);
    expect(calls).toEqual([1.2]);
  });

  it('debounces persistence', async () => {
    const settings = makeSettingsStub();
    const svc = createAppZoomService(
      settings,
      vi.fn(async () => {}),
      { persistDebounceMs: 100 },
    );
    await svc.ready;

    svc.set(1.2);
    svc.set(1.3);
    svc.set(1.4);
    expect(settings.set).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(100);
    expect(settings.set).toHaveBeenCalledTimes(1);
    expect(settings.peekValue()).toBe(1.4);
  });

  it('flush() writes immediately and clears the timer', async () => {
    const settings = makeSettingsStub();
    const svc = createAppZoomService(
      settings,
      vi.fn(async () => {}),
      { persistDebounceMs: 1000 },
    );
    await svc.ready;

    svc.set(1.7);
    expect(settings.set).not.toHaveBeenCalled();

    await svc.flush();
    expect(settings.set).toHaveBeenCalledTimes(1);
    expect(settings.peekValue()).toBe(1.7);

    await vi.advanceTimersByTimeAsync(1000);
    expect(settings.set).toHaveBeenCalledTimes(1);
  });
});
