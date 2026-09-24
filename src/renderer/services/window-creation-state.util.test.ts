import { afterEach, describe, expect, test, vi } from 'vitest';
import { logger } from '@shared/services/logger.service';
import { refreshWindowCreationState } from '@renderer/services/window-creation-state.util';

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe('refreshWindowCreationState', () => {
  test('warns when the URL did not take the value it was asked to record', () => {
    const search = '?windowId=1';
    // `replaceState` is stubbed to silently drop the write, the way Blink's navigation rate
    // limiter does: `location.search` never changes.
    vi.stubGlobal('location', {
      get search() {
        return search;
      },
    });
    vi.stubGlobal('history', { replaceState: vi.fn() });

    refreshWindowCreationState('themeState', { name: 'dark' });

    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('rate-limited'));
  });

  test('stays silent when the URL took the value', () => {
    let search = '?windowId=1';
    vi.stubGlobal('location', {
      get search() {
        return search;
      },
    });
    // This stub actually applies the write, the way a non-rate-limited `replaceState` does.
    vi.stubGlobal('history', {
      replaceState: vi.fn((_state: unknown, _title: string, url: string) => {
        search = url;
      }),
    });

    refreshWindowCreationState('themeState', { name: 'dark' });

    expect(logger.warn).not.toHaveBeenCalled();
  });
});
