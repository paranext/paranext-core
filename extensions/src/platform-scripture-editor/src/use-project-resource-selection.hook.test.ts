// @vitest-environment jsdom
import papi, { logger } from '@papi/frontend';
import { useSetting } from '@papi/frontend/react';
import { renderHook } from '@testing-library/react';
import { newPlatformError, type PlatformError } from 'platform-bible-utils';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import {
  RESOURCE_SELECTION_SETTING_KEY,
  type ResourceSelectionsByPanel,
} from './resource-selection-state.utils';
import { useProjectResourceSelection } from './use-project-resource-selection.hook';

vi.mock('@papi/frontend', () => ({
  default: { commands: { sendCommand: vi.fn(() => Promise.resolve()) } },
  logger: { debug: vi.fn(), warn: vi.fn() },
}));

vi.mock('@papi/frontend/react', () => ({ useSetting: vi.fn() }));

const PROJECT = 'project-a';

const SAVED: ResourceSelectionsByPanel = {
  ScriptureResource: {
    [PROJECT]: { selectedResourceId: 'bible-a', userPickedResourceId: 'bible-a' },
  },
  CommentaryResource: { [PROJECT]: { selectedResourceId: 'commentary-a' } },
};

/** Makes the setting read back `value`, loading or loaded. */
function mockSetting(value: ResourceSelectionsByPanel | PlatformError, isLoading = false) {
  vi.mocked(useSetting).mockImplementation((key) => {
    expect(key).toBe(RESOURCE_SELECTION_SETTING_KEY);
    return [value, vi.fn(), vi.fn(), isLoading];
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  mockSetting(SAVED);
});

describe('useProjectResourceSelection', () => {
  test("reads the project's selection for the panel's kind of resource", () => {
    const { result } = renderHook(() => useProjectResourceSelection('CommentaryResource', PROJECT));

    expect(result.current[0]).toEqual({
      selectedResourceId: 'commentary-a',
      userPickedResourceId: undefined,
    });
  });

  test('reads an empty selection for a project with no entry', () => {
    const { result } = renderHook(() =>
      useProjectResourceSelection('ScriptureResource', 'project-b'),
    );

    expect(result.current[0]).toEqual({});
  });

  test('says whether the setting is still loading', () => {
    mockSetting({}, true);

    const { result } = renderHook(() => useProjectResourceSelection('ScriptureResource', PROJECT));

    expect(result.current[2]).toBe(true);
  });

  test('reads an empty selection, and warns, when the setting cannot be read', () => {
    mockSetting(newPlatformError('settings unavailable'));

    const { result } = renderHook(() => useProjectResourceSelection('ScriptureResource', PROJECT));

    expect(result.current[0]).toEqual({});
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('settings unavailable'));
  });

  test("stores a change for the panel's kind of resource and project", () => {
    const { result } = renderHook(() => useProjectResourceSelection('CommentaryResource', PROJECT));

    result.current[1]({ selectedResourceId: 'commentary-b', userPickedResourceId: 'commentary-b' });

    expect(papi.commands.sendCommand).toHaveBeenCalledWith(
      'platformScriptureEditor.updateResourceSelection',
      'CommentaryResource',
      PROJECT,
      { selectedResourceId: 'commentary-b', userPickedResourceId: 'commentary-b' },
    );
  });

  test('stores nothing once rendered for a project other than the one it mounted with', () => {
    const { result, rerender } = renderHook(
      ({ projectId }) => useProjectResourceSelection('ScriptureResource', projectId),
      { initialProps: { projectId: PROJECT } },
    );

    rerender({ projectId: 'project-b' });
    result.current[1]({ selectedResourceId: 'bible-a' });

    expect(papi.commands.sendCommand).not.toHaveBeenCalled();
  });

  test('logs a change that could not be stored instead of throwing', async () => {
    vi.mocked(papi.commands.sendCommand).mockRejectedValueOnce(new Error('host gone'));
    const { result } = renderHook(() => useProjectResourceSelection('ScriptureResource', PROJECT));

    result.current[1]({ selectedResourceId: 'bible-b' });

    await vi.waitFor(() =>
      expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('host gone')),
    );
  });
});
