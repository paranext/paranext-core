import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { INTERFACE_MODE_CACHE_KEY, useInterfaceMode } from './use-interface-mode.hook';

// Holds what the mocked useSetting reports; hoisted so the vi.mock factory can read it. `value` is
// typed `unknown` so a PlatformError shape is assignable without a type assertion.
const settingState = vi.hoisted((): { value: unknown; isLoading: boolean } => ({
  value: 'simple',
  isLoading: false,
}));

// Records the arguments so the cache-seeding path — the reason this hook exists — can be asserted;
// the mock itself ignores `defaultState` and reports `settingState` directly.
const useSettingSpy = vi.hoisted(() => vi.fn());

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useSetting: (...args: unknown[]) => {
    useSettingSpy(...args);
    return [settingState.value, () => {}, () => {}, settingState.isLoading];
  },
}));

const PLATFORM_ERROR = { platformErrorVersion: 1, message: 'setting unavailable' };

beforeEach(() => {
  localStorage.clear();
  useSettingSpy.mockClear();
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

  it('seeds the setting with the cached mode so the first render matches the real mode', () => {
    localStorage.setItem(INTERFACE_MODE_CACHE_KEY, 'power');
    settingState.isLoading = true;
    settingState.value = 'power';
    const { rerender } = renderHook(() => useInterfaceMode());
    expect(useSettingSpy).toHaveBeenCalledWith('platform.interfaceMode', 'power');

    // The cache is read once per mount, so a later re-render keeps seeding from the same value
    // React actually started with rather than re-reading localStorage.
    localStorage.setItem(INTERFACE_MODE_CACHE_KEY, 'simple');
    rerender();
    expect(useSettingSpy).toHaveBeenLastCalledWith('platform.interfaceMode', 'power');
  });

  it("seeds 'simple' when nothing is cached", () => {
    renderHook(() => useInterfaceMode());
    expect(useSettingSpy).toHaveBeenCalledWith('platform.interfaceMode', 'simple');
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

  it("assumes 'simple' and counts it as known when the read fails with an empty cache", () => {
    settingState.value = PLATFORM_ERROR;
    const { result } = renderHook(() => useInterfaceMode());
    expect(result.current[0]).toBe('simple');
    // Fail open: a settled failure is as good an answer as we will get, and treating it as unknown
    // would hide simple-only UI for this session and every session after it.
    expect(result.current[2]).toBe(true);
  });

  it('does not cache the mode assumed after a failed read', () => {
    settingState.value = PLATFORM_ERROR;
    renderHook(() => useInterfaceMode());
    expect(localStorage.getItem(INTERFACE_MODE_CACHE_KEY)).toBeNull();
  });

  it('falls back to the mode this session resolved, not the one cached at mount', () => {
    // The user can switch modes without remounting this hook, so the mount-time cache goes stale
    // the moment they do. Falling back to it after that answers with the mode they left — which is
    // how simple-only UI ends up in the power toolbar.
    settingState.value = 'power';
    const { result, rerender } = renderHook(() => useInterfaceMode());
    expect(result.current[0]).toBe('power');

    settingState.value = PLATFORM_ERROR;
    rerender();
    expect(result.current[0]).toBe('power');
  });

  it('stays known once the mode has resolved, even if the read goes back to loading', () => {
    settingState.value = 'power';
    const { result, rerender } = renderHook(() => useInterfaceMode());
    expect(result.current[2]).toBe(true);

    // `useData`'s runaway guard reports an error alongside `isLoading: true` for its whole cooldown.
    // Dropping back to unknown there would unmount and remount every mode-gated control.
    settingState.value = PLATFORM_ERROR;
    settingState.isLoading = true;
    rerender();
    expect(result.current[2]).toBe(true);
    expect(result.current[0]).toBe('power');
  });
});

// The rule simple-only UI must follow — `isModeKnown && mode === 'simple'`, never `mode !== 'power'`
// — expressed exactly as the toolbar applies it to its simple-only controls.
describe('gating simple-only UI on isModeKnown', () => {
  const isSimpleMode = () => {
    const { result } = renderHook(() => useInterfaceMode());
    const [mode, , isModeKnown] = result.current;
    return isModeKnown && mode === 'simple';
  };

  it('is false while the mode is still unknown', () => {
    settingState.isLoading = true;
    expect(isSimpleMode()).toBe(false);
  });

  it('is true once the mode is known to be simple', () => {
    expect(isSimpleMode()).toBe(true);
  });

  it('is true when the read fails with an empty cache, so simple users keep their UI', () => {
    settingState.value = PLATFORM_ERROR;
    expect(isSimpleMode()).toBe(true);
  });

  it('is false in power mode', () => {
    settingState.value = 'power';
    expect(isSimpleMode()).toBe(false);
  });
});
