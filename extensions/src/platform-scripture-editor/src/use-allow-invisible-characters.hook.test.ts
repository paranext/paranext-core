// @vitest-environment jsdom

import { renderHook } from '@testing-library/react';
import { newPlatformError } from 'platform-bible-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

const mockSetting: { value: unknown; isLoading: boolean } = { value: false, isLoading: false };

vi.mock('@papi/frontend/react', () => ({
  useProjectSetting: () => [mockSetting.value, vi.fn(), vi.fn(), mockSetting.isLoading],
}));

const mockLoggerWarn = vi.fn();
vi.mock('@papi/frontend', () => ({
  default: {},
  logger: { warn: (...args: unknown[]) => mockLoggerWarn(...args) },
}));

// Imported after the mocks so the hook picks up the mocked `useProjectSetting` and `logger`.
// eslint-disable-next-line import/first
import {
  AllowInvisibleCharactersSetting,
  getChapterForEditor,
  useAllowInvisibleCharacters,
  useReloadOnceAllowInvisibleCharactersIsRead,
} from './use-allow-invisible-characters.hook';

afterEach(() => {
  vi.clearAllMocks();
  mockSetting.value = false;
  mockSetting.isLoading = false;
});

const chapter = { type: 'USJ', version: '3.1', content: ['text'] };

describe('useAllowInvisibleCharacters', () => {
  it('reports no value while the setting is still loading, then the value once it arrives', () => {
    // The hook's default (`false`) is what `useProjectSetting` hands back while loading, so a
    // pending read must not be mistaken for a project that has the setting off.
    mockSetting.isLoading = true;
    const { result, rerender } = renderHook(() => useAllowInvisibleCharacters('project-1'));
    expect(result.current).toEqual({ value: undefined, isLoading: true, isUnreadable: false });
    expect(getChapterForEditor(chapter, result.current)).toBeUndefined();

    mockSetting.value = true;
    mockSetting.isLoading = false;
    rerender();
    expect(result.current).toEqual({ value: true, isLoading: false, isUnreadable: false });
    expect(getChapterForEditor(chapter, result.current)).toBe(chapter);
    expect(mockLoggerWarn).not.toHaveBeenCalled();
  });

  it('passes a resolved `false` through as known', () => {
    const { result } = renderHook(() => useAllowInvisibleCharacters('project-1'));
    expect(result.current).toEqual({ value: false, isLoading: false, isUnreadable: false });
    expect(getChapterForEditor(chapter, result.current)).toBe(chapter);
  });

  it('reports a read error as unreadable, with no guessed value, and warns', () => {
    mockSetting.value = newPlatformError('project unavailable');
    const { result } = renderHook(() => useAllowInvisibleCharacters('project-1'));
    expect(result.current).toEqual({ value: undefined, isLoading: false, isUnreadable: true });
    expect(mockLoggerWarn).toHaveBeenCalledExactlyOnceWith(
      'Error getting whether the project allows invisible characters: project unavailable',
    );
    // The chapter still loads, so the text can be read; the web view makes the editor read-only.
    expect(getChapterForEditor(chapter, result.current)).toBe(chapter);
  });
});

describe('useReloadOnceAllowInvisibleCharactersIsRead', () => {
  const unreadable: AllowInvisibleCharactersSetting = {
    value: undefined,
    isLoading: false,
    isUnreadable: true,
  };
  const loading: AllowInvisibleCharactersSetting = {
    value: undefined,
    isLoading: true,
    isUnreadable: false,
  };
  const known = (value: boolean): AllowInvisibleCharactersSetting => ({
    value,
    isLoading: false,
    isUnreadable: false,
  });

  it('reloads once, and holds the editor until then, when an unreadable setting is read', () => {
    // The editor showed the chapter under a stand-in value while the setting was unreadable, and
    // a view-option change rebuilds it from its own export under that stand-in, not from the
    // project's text, so the project's text has to be loaded again before anything is saved.
    const reload = vi.fn();
    const { result, rerender } = renderHook(
      ({ setting }) => useReloadOnceAllowInvisibleCharactersIsRead(setting, reload),
      { initialProps: { setting: unreadable } },
    );
    expect(result.current).toBe(true);
    expect(reload).not.toHaveBeenCalled();

    rerender({ setting: known(true) });
    expect(reload).toHaveBeenCalledOnce();
    expect(result.current).toBe(false);

    rerender({ setting: known(true) });
    rerender({ setting: known(false) });
    expect(reload).toHaveBeenCalledOnce();
  });

  it('holds the editor for as long as the setting stays unreadable', () => {
    const reload = vi.fn();
    const { result, rerender } = renderHook(
      ({ setting }) => useReloadOnceAllowInvisibleCharactersIsRead(setting, reload),
      { initialProps: { setting: unreadable } },
    );
    rerender({ setting: unreadable });
    expect(result.current).toBe(true);
    expect(reload).not.toHaveBeenCalled();
  });

  it('leaves a reload to the editor that mounts when the setting goes back to loading', () => {
    const reload = vi.fn();
    const { result, rerender } = renderHook(
      ({ setting }) => useReloadOnceAllowInvisibleCharactersIsRead(setting, reload),
      { initialProps: { setting: unreadable } },
    );
    rerender({ setting: loading });
    expect(result.current).toBe(false);
    rerender({ setting: known(true) });
    expect(reload).not.toHaveBeenCalled();
  });

  it('never reloads a setting that was read the first time', () => {
    // A pending read holds the chapter back from the editor, so nothing was shown under a guess.
    const reload = vi.fn();
    const { result, rerender } = renderHook(
      ({ setting }) => useReloadOnceAllowInvisibleCharactersIsRead(setting, reload),
      { initialProps: { setting: loading } },
    );
    expect(result.current).toBe(false);
    rerender({ setting: known(true) });
    rerender({ setting: known(false) });
    expect(result.current).toBe(false);
    expect(reload).not.toHaveBeenCalled();
  });
});
