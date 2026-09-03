// @vitest-environment jsdom

import { renderHook } from '@testing-library/react';
import { newPlatformError } from 'platform-bible-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

const mockSetting = { value: undefined as unknown };

vi.mock('@papi/frontend/react', () => ({
  useProjectSetting: () => [mockSetting.value, vi.fn(), vi.fn(), false],
}));

const mockLoggerWarn = vi.fn();
vi.mock('@papi/frontend', () => ({
  default: {},
  logger: { warn: (...args: unknown[]) => mockLoggerWarn(...args) },
}));

// Imported after the mocks so the hook picks up the mocked `useProjectSetting` and `logger`.
// eslint-disable-next-line import/first
import { useGuardedProjectSetting } from './use-guarded-project-setting.hook';

afterEach(() => {
  vi.clearAllMocks();
  mockSetting.value = undefined;
});

function renderGuarded(fallback = '.') {
  return renderHook(() =>
    useGuardedProjectSetting(
      'project-1',
      'platformScripture.chapterVerseSeparator',
      fallback,
      'chapter/verse separator',
    ),
  ).result.current;
}

describe('useGuardedProjectSetting', () => {
  it('passes a real value through untouched, without warning', () => {
    mockSetting.value = ':';
    expect(renderGuarded()).toBe(':');
    expect(mockLoggerWarn).not.toHaveBeenCalled();
  });

  it('reports the fallback for an EMPTY value (verbatim ParametersDictionary reads)', () => {
    // An empty `<ChapterVerseSeparator/>` in Settings.xml reaches the hook as '' and must not
    // reach consumers, which would render `Mt 13` instead of `Mt 1.3`.
    mockSetting.value = '';
    expect(renderGuarded()).toBe('.');
    expect(mockLoggerWarn).not.toHaveBeenCalled();
  });

  it('reports the fallback and warns with the standard message shape on a read error', () => {
    mockSetting.value = newPlatformError('project unavailable');
    expect(renderGuarded()).toBe('.');
    expect(mockLoggerWarn).toHaveBeenCalledExactlyOnceWith(
      'Error getting chapter/verse separator: project unavailable',
    );
  });

  it("keeps '' meaningful when the fallback IS '' (the caller-sequence usage)", () => {
    mockSetting.value = '';
    expect(renderGuarded('')).toBe('');
  });
});
