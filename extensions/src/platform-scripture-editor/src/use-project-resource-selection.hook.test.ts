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
import {
  SELECTION_NOT_STORED_KEY,
  useProjectResourceSelection,
} from './use-project-resource-selection.hook';

vi.mock('@papi/frontend', () => ({
  default: {
    commands: { sendCommand: vi.fn(() => Promise.resolve()) },
    notifications: { send: vi.fn(() => Promise.resolve()) },
  },
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

  test('reads an empty selection, says so, and warns, when the setting cannot be read', () => {
    mockSetting(newPlatformError('settings unavailable'));

    const { result } = renderHook(() => useProjectResourceSelection('ScriptureResource', PROJECT));

    expect(result.current[0]).toEqual({});
    expect(result.current[3]).toBe(true);
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('settings unavailable'));
  });

  test('says the setting was read when it was', () => {
    const { result } = renderHook(() => useProjectResourceSelection('ScriptureResource', PROJECT));

    expect(result.current[3]).toBe(false);
  });

  test("stores a change for the panel's kind of resource and project", async () => {
    const { result } = renderHook(() => useProjectResourceSelection('CommentaryResource', PROJECT));

    expect(
      await result.current[1]({
        selectedResourceId: 'commentary-b',
        userPickedResourceId: 'commentary-b',
      }),
    ).toBe(true);

    expect(papi.commands.sendCommand).toHaveBeenCalledWith(
      'platformScriptureEditor.updateResourceSelection',
      'CommentaryResource',
      PROJECT,
      { selectedResourceId: 'commentary-b', userPickedResourceId: 'commentary-b' },
    );
  });

  test('stores nothing once rendered for a project other than the one it mounted with', async () => {
    const { result, rerender } = renderHook(
      ({ projectId }) => useProjectResourceSelection('ScriptureResource', projectId),
      { initialProps: { projectId: PROJECT } },
    );

    rerender({ projectId: 'project-b' });

    expect(await result.current[1]({ selectedResourceId: 'bible-a' })).toBe(false);
    expect(papi.commands.sendCommand).not.toHaveBeenCalled();
  });

  test('tells the user, rather than throwing, when a change could not be stored', async () => {
    // The panel stays on the old resource, so without a message the click would look ignored.
    vi.mocked(papi.commands.sendCommand).mockRejectedValueOnce(new Error('host gone'));
    const { result } = renderHook(() => useProjectResourceSelection('ScriptureResource', PROJECT));

    expect(await result.current[1]({ selectedResourceId: 'bible-b' })).toBe(false);
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('host gone'));
    expect(papi.notifications.send).toHaveBeenCalledWith({
      message: SELECTION_NOT_STORED_KEY,
      severity: 'error',
    });
  });

  test('logs a failure message that could not be sent instead of throwing', async () => {
    vi.mocked(papi.commands.sendCommand).mockRejectedValueOnce(new Error('host gone'));
    vi.mocked(papi.notifications.send).mockRejectedValueOnce(new Error('no notifications'));
    const { result } = renderHook(() => useProjectResourceSelection('ScriptureResource', PROJECT));

    expect(await result.current[1]({ selectedResourceId: 'bible-b' })).toBe(false);
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('no notifications'));
  });
});
