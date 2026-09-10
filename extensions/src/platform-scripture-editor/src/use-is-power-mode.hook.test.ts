// @vitest-environment jsdom

import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

const mockSetting = { value: 'simple' as unknown, isLoading: false };

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
import { useIsPowerMode } from './use-is-power-mode.hook';

afterEach(() => {
  vi.clearAllMocks();
  mockSetting.value = 'simple';
  mockSetting.isLoading = false;
});

describe('useIsPowerMode', () => {
  it('reports false in simple mode', () => {
    mockSetting.value = 'simple';
    expect(renderHook(() => useIsPowerMode()).result.current).toBe(false);
  });

  it('reports true in power mode', () => {
    mockSetting.value = 'power';
    expect(renderHook(() => useIsPowerMode()).result.current).toBe(true);
  });

  it('reports undefined while the setting is still loading, so callers render nothing', () => {
    // `useSetting` hands back its `defaultState` ('simple') while the read is in flight. Reporting
    // Simple there would flash Simple-only UI into a Power session for a frame.
    mockSetting.isLoading = true;
    mockSetting.value = 'simple';

    expect(renderHook(() => useIsPowerMode()).result.current).toBeUndefined();
  });

  it('reports false and warns when the setting cannot be read', () => {
    // A PlatformError stand-in: the hook only needs `isPlatformError` to recognize it.
    mockSetting.value = { platformErrorVersion: 1, message: 'read failed' };

    expect(renderHook(() => useIsPowerMode()).result.current).toBe(false);
    expect(mockLoggerWarn).toHaveBeenCalledTimes(1);
  });
});
