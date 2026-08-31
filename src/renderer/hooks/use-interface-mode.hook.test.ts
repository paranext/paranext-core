import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { INTERFACE_MODE_CACHE_KEY, useInterfaceMode } from './use-interface-mode.hook';
import { useIsSimpleMode } from './use-is-simple-mode.hook';

// Holds what the mocked useSetting reports; hoisted so the vi.mock factory can read it. `value` is
// typed `unknown` so a PlatformError shape is assignable without a type assertion.
const settingState = vi.hoisted((): { value: unknown; isLoading: boolean } => ({
  value: 'simple',
  isLoading: false,
}));

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useSetting: () => [settingState.value, () => {}, () => {}, settingState.isLoading],
}));

const PLATFORM_ERROR = { platformErrorVersion: 1, message: 'setting unavailable' };

beforeEach(() => {
  localStorage.clear();
  settingState.value = 'simple';
  settingState.isLoading = false;
});

describe('useInterfaceMode', () => {
  it("reports 'simple' but not known while the setting is loading with an empty cache", () => {
    settingState.isLoading = true;
    const { result } = renderHook(() => useInterfaceMode());
    const [mode, , isModeKnown] = result.current;
    expect(mode).toBe('simple');
    expect(isModeKnown).toBe(false);
  });

  it('does not cache the mode while it is still a placeholder', () => {
    settingState.isLoading = true;
    renderHook(() => useInterfaceMode());
    expect(localStorage.getItem(INTERFACE_MODE_CACHE_KEY)).toBeNull();
  });

  it('treats a cached mode as known before the setting resolves', () => {
    localStorage.setItem(INTERFACE_MODE_CACHE_KEY, 'power');
    settingState.isLoading = true;
    settingState.value = 'power';
    const { result } = renderHook(() => useInterfaceMode());
    expect(result.current[2]).toBe(true);
  });

  it('caches the mode once the setting resolves', () => {
    settingState.value = 'power';
    renderHook(() => useInterfaceMode());
    expect(localStorage.getItem(INTERFACE_MODE_CACHE_KEY)).toBe('power');
  });

  it('falls back to the cached mode when reading the setting fails', () => {
    localStorage.setItem(INTERFACE_MODE_CACHE_KEY, 'power');
    settingState.value = PLATFORM_ERROR;
    const { result } = renderHook(() => useInterfaceMode());
    expect(result.current[0]).toBe('power');
    expect(localStorage.getItem(INTERFACE_MODE_CACHE_KEY)).toBe('power');
  });

  it("reports 'simple' but not known when the read fails with an empty cache", () => {
    settingState.value = PLATFORM_ERROR;
    const { result } = renderHook(() => useInterfaceMode());
    expect(result.current[0]).toBe('simple');
    expect(result.current[2]).toBe(false);
    expect(localStorage.getItem(INTERFACE_MODE_CACHE_KEY)).toBeNull();
  });
});

describe('useIsSimpleMode', () => {
  it('is false while the mode is still unknown', () => {
    settingState.isLoading = true;
    const { result } = renderHook(() => useIsSimpleMode());
    expect(result.current).toBe(false);
  });

  it('is true once the mode is known to be simple', () => {
    const { result } = renderHook(() => useIsSimpleMode());
    expect(result.current).toBe(true);
  });

  it('is false in power mode', () => {
    settingState.value = 'power';
    const { result } = renderHook(() => useIsSimpleMode());
    expect(result.current).toBe(false);
  });
});
