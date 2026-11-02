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
  getChapterForEditor,
  useAllowInvisibleCharacters,
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
    // The chapter is held back, not shown under a stand-in: the editor mounts once it is read.
    expect(getChapterForEditor(chapter, result.current)).toBeUndefined();
  });

  it('keeps the last value read for a project when a later read fails, and still warns', () => {
    mockSetting.value = true;
    const { result, rerender } = renderHook(() => useAllowInvisibleCharacters('project-1'));
    expect(result.current).toEqual({ value: true, isLoading: false, isUnreadable: false });

    mockSetting.value = newPlatformError('project unavailable');
    rerender();
    // A failed read does not mean the setting changed, and the editor already built from it.
    expect(result.current).toEqual({ value: true, isLoading: false, isUnreadable: false });
    expect(getChapterForEditor(chapter, result.current)).toBe(chapter);
    expect(mockLoggerWarn).toHaveBeenCalledExactlyOnceWith(
      'Error getting whether the project allows invisible characters: project unavailable',
    );

    mockSetting.value = false;
    rerender();
    expect(result.current).toEqual({ value: false, isLoading: false, isUnreadable: false });
  });

  it("does not carry a project's value over to another project whose read fails", () => {
    mockSetting.value = true;
    const { result, rerender } = renderHook(({ id }) => useAllowInvisibleCharacters(id), {
      initialProps: { id: 'project-1' },
    });
    expect(result.current.value).toBe(true);

    mockSetting.value = newPlatformError('project unavailable');
    rerender({ id: 'project-2' });
    expect(result.current).toEqual({ value: undefined, isLoading: false, isUnreadable: true });
    expect(getChapterForEditor(chapter, result.current)).toBeUndefined();
  });
});
