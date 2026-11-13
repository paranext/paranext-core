import { renderHook } from '@testing-library/react';
import { newPlatformError } from 'platform-bible-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useLocalizedProjectTitle } from '@renderer/hooks/papi-hooks/use-localized-project-title.hook';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks/use-localized-strings-hook';
import { useProjectDataProviderState } from '@renderer/hooks/papi-hooks/use-project-data-provider.hook';
import { useProjectSetting } from '@renderer/hooks/papi-hooks/use-project-setting.hook';

vi.mock('@renderer/hooks/papi-hooks/use-localized-strings-hook', () => ({
  useLocalizedStrings: vi.fn(),
}));
vi.mock('@renderer/hooks/papi-hooks/use-project-data-provider.hook', () => ({
  useProjectDataProviderState: vi.fn(),
}));
vi.mock('@renderer/hooks/papi-hooks/use-project-setting.hook', () => ({
  useProjectSetting: vi.fn(),
}));

const TITLE_KEY = '%webView_characterInventory_title%';
const pdp = {};

function mockProjectName(projectName: unknown, isLoading = false) {
  // The setting tuple's value type is irrelevant to the hook, which passes it straight through
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const setting = projectName as string;
  vi.mocked(useProjectSetting).mockReturnValue([setting, undefined, undefined, isLoading]);
}

function mockTitleFormat(titleFormat: string, isLoading = false) {
  vi.mocked(useLocalizedStrings).mockReturnValue([{ [TITLE_KEY]: titleFormat }, isLoading]);
}

beforeEach(() => {
  // The hook only hands the provider to `useProjectSetting`, which is mocked
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  vi.mocked(useProjectDataProviderState).mockReturnValue({
    status: 'ready',
    networkObject: pdp,
  } as never);
  mockProjectName('WEB');
  mockTitleFormat('Character Inventory: {projectName}');
});

describe('useLocalizedProjectTitle', () => {
  it("formats the localized title with the project's short name", () => {
    const { result } = renderHook(() => useLocalizedProjectTitle('abc123', TITLE_KEY));
    expect(result.current).toBe('Character Inventory: WEB');
    expect(useProjectDataProviderState).toHaveBeenCalledWith('platform.base', 'abc123');
    expect(useProjectSetting).toHaveBeenCalledWith(pdp, 'platform.name', '');
  });

  it('fills extra replacements', () => {
    mockTitleFormat('Results ({resultsCount}): {projectName}');
    const { result } = renderHook(() =>
      useLocalizedProjectTitle('abc123', TITLE_KEY, { resultsCount: 3 }),
    );
    expect(result.current).toBe('Results (3): WEB');
  });

  it.each([
    ['empty', ''],
    ['whitespace-only', '   '],
    ['an error', newPlatformError('Setting failed')],
  ])('shows the project id when the short name is %s', (_description, projectName) => {
    mockProjectName(projectName);
    const { result } = renderHook(() => useLocalizedProjectTitle('abc123', TITLE_KEY));
    expect(result.current).toBe('Character Inventory: abc123');
  });

  it('returns undefined while the short name is loading', () => {
    mockProjectName('', true);
    const { result } = renderHook(() => useLocalizedProjectTitle('abc123', TITLE_KEY));
    expect(result.current).toBeUndefined();
  });

  it("returns undefined while the project's data provider is loading", () => {
    // `useProjectSetting` still reports the previous project's name, as it does after a switch
    vi.mocked(useProjectDataProviderState).mockReturnValue({ status: 'loading' });
    const { result } = renderHook(() => useLocalizedProjectTitle('abc123', TITLE_KEY));
    expect(result.current).toBeUndefined();
  });

  it("shows the project id when the project's data provider is unavailable", () => {
    vi.mocked(useProjectDataProviderState).mockReturnValue({ status: 'unavailable' });
    mockProjectName('', true);
    const { result } = renderHook(() => useLocalizedProjectTitle('abc123', TITLE_KEY));
    expect(result.current).toBe('Character Inventory: abc123');
  });

  it('returns undefined while the format is loading', () => {
    mockTitleFormat(TITLE_KEY, true);
    const { result } = renderHook(() => useLocalizedProjectTitle('abc123', TITLE_KEY));
    expect(result.current).toBeUndefined();
  });

  it('returns undefined when the loaded strings do not yet include the key', () => {
    vi.mocked(useLocalizedStrings).mockReturnValue([{}, false]);
    const { result } = renderHook(() => useLocalizedProjectTitle('abc123', TITLE_KEY));
    expect(result.current).toBeUndefined();
  });

  it('shows the key once loaded when the key has no localization', () => {
    mockTitleFormat(TITLE_KEY);
    const { result } = renderHook(() => useLocalizedProjectTitle('abc123', TITLE_KEY));
    expect(result.current).toBe(TITLE_KEY);
  });

  it('returns undefined with no project', () => {
    const { result } = renderHook(() => useLocalizedProjectTitle(undefined, TITLE_KEY));
    expect(result.current).toBeUndefined();
  });
});
