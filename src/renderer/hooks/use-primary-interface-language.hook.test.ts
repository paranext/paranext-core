import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePrimaryInterfaceLanguage } from './use-primary-interface-language.hook';

// Holds the value the mocked useSetting returns; hoisted so the vi.mock factory can read it.
// Typed `unknown` (via the factory's return annotation) so a PlatformError shape is assignable
// without a type assertion.
const settingState = vi.hoisted((): { value: unknown } => ({ value: ['en'] }));

// The hook reads only the value (tuple index 0); the setter/resetter/isLoading are stubbed.
vi.mock('@renderer/hooks/papi-hooks', () => ({
  useSetting: () => [settingState.value, () => {}, () => {}, false],
}));

describe('usePrimaryInterfaceLanguage', () => {
  beforeEach(() => {
    settingState.value = ['en'];
  });

  it('returns the first tag of the interface-language setting', () => {
    settingState.value = ['fr', 'en'];
    const { result } = renderHook(() => usePrimaryInterfaceLanguage());
    expect(result.current).toBe('fr');
  });

  it("falls back to 'en' when the first tag is an empty string (guards Intl.NumberFormat(''))", () => {
    settingState.value = [''];
    const { result } = renderHook(() => usePrimaryInterfaceLanguage());
    expect(result.current).toBe('en');
  });

  it("falls back to 'en' when the setting is a PlatformError", () => {
    settingState.value = { platformErrorVersion: 1, message: 'setting unavailable' };
    const { result } = renderHook(() => usePrimaryInterfaceLanguage());
    expect(result.current).toBe('en');
  });
});
