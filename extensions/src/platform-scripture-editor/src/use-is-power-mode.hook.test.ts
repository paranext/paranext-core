// @vitest-environment jsdom

import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

const mockSetting = { value: 'simple' as unknown };

vi.mock('@papi/frontend/react', () => ({
  useSetting: () => [mockSetting.value, vi.fn(), vi.fn()],
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

  it('reports false and warns when the setting cannot be read', () => {
    // A PlatformError stand-in: the hook only needs `isPlatformError` to recognize it.
    mockSetting.value = { platformErrorVersion: 1, message: 'read failed' };

    expect(renderHook(() => useIsPowerMode()).result.current).toBe(false);
    expect(mockLoggerWarn).toHaveBeenCalledTimes(1);
  });
});
