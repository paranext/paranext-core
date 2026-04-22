import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createAppZoomService } from './app-zoom.service';
import { createViewZoomService } from './view-zoom.service';

vi.mock('@shared/services/settings.service', () => ({
  settingsService: {
    get: vi.fn(async () => undefined),
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

function makeAppSettingsStub(initial: number = 1.0) {
  let value = initial;
  return {
    get: vi.fn(async () => value),
    set: vi.fn(async (_key: 'platform.appZoom', v: number) => {
      value = v;
    }),
    subscribe: vi.fn(async () => async () => {}),
  };
}

function makeViewSettingsStub(initial: Record<string, number> = {}) {
  let value = { ...initial };
  return {
    get: vi.fn(async () => value),
    set: vi.fn(async (_key: 'platform.viewZooms', v: Record<string, number>) => {
      value = { ...v };
    }),
    subscribe: vi.fn(async () => async () => {}),
    peekValue: () => value,
  };
}

describe('app zoom + view zoom integration', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.body.style.zoom = '';
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.style.zoom = '';
  });

  it('global zoom change resets all view zooms; individual adjustments work on top', async () => {
    const viewSettings = makeViewSettingsStub({ a: 1.2, b: 1.4 });
    const viewSvc = createViewZoomService(viewSettings, { persistDebounceMs: 10 });
    await viewSvc.ready;

    const appSettings = makeAppSettingsStub(1.0);
    const appSvc = createAppZoomService(appSettings, async () => viewSvc.resetAll(), {
      persistDebounceMs: 10,
    });
    await appSvc.ready;

    // Step 1: change global zoom to 1.5
    appSvc.set(1.5);

    // body zoom applied
    expect(document.body.style.zoom).toBe('1.5');

    // all view zooms reset to 1.0
    expect(viewSvc.getZoom('a')).toBe(1.0);
    expect(viewSvc.getZoom('b')).toBe(1.0);

    // Step 2: adjust view A individually (simulates Ctrl+= on view A)
    viewSvc.adjustZoom('a', +1);
    expect(viewSvc.getZoom('a')).toBeCloseTo(1.1, 5);

    // view B is untouched
    expect(viewSvc.getZoom('b')).toBe(1.0);

    // body zoom unchanged
    expect(document.body.style.zoom).toBe('1.5');

    // Step 3: verify stored CSS zoom values
    // Effective visual zoom for A = body(1.5) × view(1.1) = 1.65 — CSS handles the multiplication
    // We verify the stored values directly since CSS multiplication is browser behavior
    expect(appSvc.get()).toBe(1.5);
    expect(viewSvc.getZoom('a')).toBeCloseTo(1.1, 5);
    expect(viewSvc.getZoom('b')).toBe(1.0);
  });
});
