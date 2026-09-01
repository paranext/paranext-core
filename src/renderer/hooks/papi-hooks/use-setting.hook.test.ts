import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useData } from '@renderer/hooks/papi-hooks/use-data.hook';
import { useSetting } from '@renderer/hooks/papi-hooks/use-setting.hook';

vi.mock('@shared/services/settings.service', () => ({
  settingsService: { reset: vi.fn() },
}));

vi.mock('@renderer/hooks/papi-hooks/use-data.hook', () => ({ useData: vi.fn() }));

/**
 * `useData` is reached as `useData(settingsService)[''](key, defaultValue, options)` — the empty
 * string is the settings data provider's single data type. This stands in for that call, returning
 * the tuple the real hook would.
 */
function mockUseDataReturning(tuple: [unknown, unknown, boolean]) {
  // The proxy's typed surface is irrelevant to what this hook does with the tuple, so a loose
  // stand-in avoids rebuilding the whole generated-hook type here.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  vi.mocked(useData).mockReturnValue({ '': () => tuple } as unknown as ReturnType<typeof useData>);
}

describe('useSetting', () => {
  it('delegates to the setter the data hook supplied', async () => {
    const setSetting = vi.fn(async () => true);
    mockUseDataReturning(['a value', setSetting, false]);

    const { result } = renderHook(() => useSetting('platform.interfaceLanguage', ['en']));
    await result.current[1]?.(['fr']);

    expect(setSetting).toHaveBeenCalledExactlyOnceWith(['fr']);
  });

  it('passes the dropped setter through as undefined so call sites can see it', () => {
    // `useData` returns `undefined` here while its runaway guard is throttled. Substituting a
    // callable stand-in would hide that state from the type, so consumers must call the setter
    // optionally — the same contract `useProjectSetting` and `useData` itself declare.
    mockUseDataReturning(['a value', undefined, true]);

    const { result } = renderHook(() => useSetting('platform.interfaceLanguage', ['en']));

    expect(result.current[1]).toBeUndefined();
    expect(result.current[3]).toBe(true);
  });
});
