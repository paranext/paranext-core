import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { logger } from '@shared/services/logger.service';
import { useData } from '@renderer/hooks/papi-hooks/use-data.hook';
import { useSetting } from '@renderer/hooks/papi-hooks/use-setting.hook';

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), debug: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

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

beforeEach(() => {
  vi.mocked(logger.warn).mockClear();
});

describe('useSetting', () => {
  it('delegates to the setter the data hook supplied', async () => {
    const setSetting = vi.fn(async () => true);
    mockUseDataReturning(['a value', setSetting, false]);

    const { result } = renderHook(() => useSetting('platform.interfaceLanguage', ['en']));
    await result.current[1](['fr']);

    expect(setSetting).toHaveBeenCalledExactlyOnceWith(['fr']);
    expect(logger.warn).not.toHaveBeenCalled();
  });

  it('rejects instead of throwing when the data hook has dropped its setter', async () => {
    // `useData` returns `undefined` here while its runaway guard is throttled. The declared tuple
    // type promises a callable setter, so call sites do not null-check it: calling `undefined`
    // would throw `is not a function` synchronously, escaping any `.catch` the caller attached.
    mockUseDataReturning(['a value', undefined, true]);

    const { result } = renderHook(() => useSetting('platform.interfaceLanguage', ['en']));

    expect(typeof result.current[1]).toBe('function');
    await expect(result.current[1](['fr'])).rejects.toThrow(/throttled/);
    expect(logger.warn).toHaveBeenCalledExactlyOnceWith(
      expect.stringContaining('platform.interfaceLanguage'),
    );
  });
});
