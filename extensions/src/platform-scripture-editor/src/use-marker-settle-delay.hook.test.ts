// @vitest-environment jsdom

import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

const mockSetting = { value: undefined as unknown, isLoading: false };

vi.mock('@papi/frontend/react', () => ({
  useSetting: () => [mockSetting.value, vi.fn(), vi.fn(), mockSetting.isLoading],
}));

const mockLoggerWarn = vi.fn();
vi.mock('@papi/frontend', () => ({
  default: {},
  logger: { warn: (...args: unknown[]) => mockLoggerWarn(...args) },
}));

// Imported after the mocks so the hook picks up the mocked `useSetting` and `logger`.
// eslint-disable-next-line import/first
import { useMarkerSettleDelay } from './use-marker-settle-delay.hook';

afterEach(() => {
  vi.clearAllMocks();
  mockSetting.value = undefined;
  mockSetting.isLoading = false;
});

describe('useMarkerSettleDelay', () => {
  it('reports undefined for the unset default (papi deserializes the stored JSON null to undefined)', () => {
    mockSetting.value = undefined;
    expect(renderHook(() => useMarkerSettleDelay()).result.current).toBeUndefined();
  });

  it('still reports undefined if a raw null leaks through the serialization boundary', () => {
    // The JSON contribution's default IS null; papi maps it to undefined on read, but the editor
    // option is `number | undefined` and must never see a null even if that mapping is bypassed.
    // eslint-disable-next-line no-null/no-null
    mockSetting.value = null;
    expect(renderHook(() => useMarkerSettleDelay()).result.current).toBeUndefined();
  });

  it('reports a configured delay so it reaches EditorOptions.markerSettleDelayMs', () => {
    mockSetting.value = 250;
    expect(renderHook(() => useMarkerSettleDelay()).result.current).toBe(250);
  });

  it('passes the 0 (settle immediately) and -1 (idle clock off) sentinels through untouched', () => {
    mockSetting.value = 0;
    expect(renderHook(() => useMarkerSettleDelay()).result.current).toBe(0);

    mockSetting.value = -1;
    expect(renderHook(() => useMarkerSettleDelay()).result.current).toBe(-1);
  });

  it('reports undefined while the setting is still loading', () => {
    // `useSetting` hands back its `defaultState` (undefined) while the read is in flight; either
    // way the editor keeps its own default delay until the real value resolves.
    mockSetting.isLoading = true;
    mockSetting.value = 250;

    expect(renderHook(() => useMarkerSettleDelay()).result.current).toBeUndefined();
  });

  it('reports undefined and warns when the setting cannot be read', () => {
    // A PlatformError stand-in: the hook only needs `isPlatformError` to recognize it.
    mockSetting.value = { platformErrorVersion: 1, message: 'read failed' };

    expect(renderHook(() => useMarkerSettleDelay()).result.current).toBeUndefined();
    expect(mockLoggerWarn).toHaveBeenCalledTimes(1);
  });
});
