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
    // The chapter still loads, so the text can be read; the web view makes the editor read-only.
    expect(getChapterForEditor(chapter, result.current)).toBe(chapter);
  });
});
