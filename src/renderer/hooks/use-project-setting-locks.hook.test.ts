import { renderHook } from '@testing-library/react';
import { useProjectSetting } from '@renderer/hooks/papi-hooks/use-project-setting.hook';
import { newPlatformError } from 'platform-bible-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useProjectSettingLocks } from './use-project-setting-locks.hook';

vi.mock('@renderer/hooks/papi-hooks/use-project-setting.hook', () => ({
  useProjectSetting: vi.fn(),
}));

type SettingState = { value: unknown; isLoading?: boolean };

/** Answers each setting the hook reads with the given value and loading state */
function mockSettings(settings: Record<string, SettingState>) {
  vi.mocked(useProjectSetting).mockImplementation((_projectId, key) => {
    const { value, isLoading = false } = settings[key];
    // The mock answers several keys of different value types through one signature
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return [value as never, vi.fn(), vi.fn(), isLoading];
  });
}

const READ_ERROR = newPlatformError('could not read');

describe('useProjectSettingLocks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("reports the project's locks once all three settings have loaded", () => {
    mockSettings({
      'platform.isPublished': { value: false },
      'platform.isShared': { value: true },
      'platform.isCurrentUserAdministrator': { value: false },
    });

    const { result } = renderHook(() => useProjectSettingLocks('projA'));

    expect(result.current).toEqual({
      isPublished: false,
      isShared: true,
      isCurrentUserAdministrator: false,
    });
  });

  it('reports nothing while any of the settings is still loading', () => {
    mockSettings({
      'platform.isPublished': { value: false },
      'platform.isShared': { value: false, isLoading: true },
      'platform.isCurrentUserAdministrator': { value: true },
    });

    const { result } = renderHook(() => useProjectSettingLocks('projA'));

    expect(result.current).toBeUndefined();
  });

  it('reports nothing without a project', () => {
    mockSettings({
      'platform.isPublished': { value: false },
      'platform.isShared': { value: false },
      'platform.isCurrentUserAdministrator': { value: true },
    });

    const { result } = renderHook(() => useProjectSettingLocks(undefined));

    expect(result.current).toBeUndefined();
  });

  it('locks the names and the language when their settings cannot be read, but not the whole project', () => {
    mockSettings({
      'platform.isPublished': { value: READ_ERROR },
      'platform.isShared': { value: READ_ERROR },
      'platform.isCurrentUserAdministrator': { value: READ_ERROR },
    });

    const { result } = renderHook(() => useProjectSettingLocks('projA'));

    expect(result.current).toEqual({
      isPublished: false,
      isShared: true,
      isCurrentUserAdministrator: false,
    });
  });
});
