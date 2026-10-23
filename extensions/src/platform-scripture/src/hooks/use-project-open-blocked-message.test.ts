// @vitest-environment jsdom

import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  newPlatformError,
  PROJECT_OPEN_BLOCKED_FALLBACK_KEY,
  PROJECT_OPEN_BLOCKED_FALLBACK_MESSAGE,
  type LocalizeKey,
} from 'platform-bible-utils';
import { useProjectOpenBlockedMessage } from './use-project-open-blocked-message';

const LOCALIZATION_DATA_PROVIDER_NAME = 'platform.localizationDataServiceDataProvider';
const REASON_KEY = '%project_unsupported_studyBibleAdditions%';
const REASON_TEXT = "Study Bible Additions projects aren't supported yet.";
const FALLBACK_TEXT = "This project can't be opened.";

const { mockUseData, mockLocalizedStrings } = vi.hoisted(() => ({
  mockUseData: vi.fn(),
  mockLocalizedStrings: vi.fn(),
}));

vi.mock('@papi/frontend', () => ({
  default: { localization: { dataProviderName: 'platform.localizationDataServiceDataProvider' } },
}));

vi.mock('@papi/frontend/react', () => ({
  useData: (dataProviderName: string | undefined) => {
    mockUseData(dataProviderName);
    return { LocalizedStrings: mockLocalizedStrings };
  },
}));

/** Answers the localization data type through `translations`, echoing any other key. */
function localizeWith(translations: Record<string, string>, isLoading = false) {
  mockLocalizedStrings.mockImplementation(({ localizeKeys }: { localizeKeys: string[] }) => [
    Object.fromEntries(localizeKeys.map((key) => [key, translations[key] ?? key])),
    vi.fn(),
    isLoading,
  ]);
}

beforeEach(() => {
  mockUseData.mockClear();
  mockLocalizedStrings.mockReset();
  localizeWith({ [REASON_KEY]: REASON_TEXT, [PROJECT_OPEN_BLOCKED_FALLBACK_KEY]: FALLBACK_TEXT });
});

describe('useProjectOpenBlockedMessage', () => {
  it('subscribes to nothing when no project is refused', () => {
    const { result } = renderHook(() => useProjectOpenBlockedMessage(undefined));

    expect(result.current).toBeUndefined();
    expect(mockUseData).toHaveBeenCalled();
    mockUseData.mock.calls.forEach(([dataProviderName]) =>
      expect(dataProviderName).toBeUndefined(),
    );
  });

  it('localizes the reason when a project is refused', () => {
    const { result } = renderHook(() => useProjectOpenBlockedMessage(REASON_KEY));

    expect(result.current).toBe(REASON_TEXT);
    expect(mockUseData).toHaveBeenLastCalledWith(LOCALIZATION_DATA_PROVIDER_NAME);
    expect(mockLocalizedStrings.mock.lastCall?.[0]).toEqual({
      localizeKeys: [REASON_KEY, PROJECT_OPEN_BLOCKED_FALLBACK_KEY],
    });
  });

  it('shows nothing while the reason is being localized', () => {
    localizeWith({}, true);

    const { result } = renderHook(() => useProjectOpenBlockedMessage(REASON_KEY));

    expect(result.current).toBeUndefined();
  });

  it('falls back to the generic reason when the reason has no translation', () => {
    localizeWith({ [PROJECT_OPEN_BLOCKED_FALLBACK_KEY]: FALLBACK_TEXT });

    const { result } = renderHook(() => useProjectOpenBlockedMessage(REASON_KEY));

    expect(result.current).toBe(FALLBACK_TEXT);
  });

  it('keeps the same selector across renders for the same reason', () => {
    const { rerender } = renderHook(() => useProjectOpenBlockedMessage(REASON_KEY));
    const firstSelector = mockLocalizedStrings.mock.calls[0][0];

    rerender();

    expect(mockLocalizedStrings.mock.lastCall?.[0]).toBe(firstSelector);
  });

  it('stays subscribed while the error clears, so the next refusal shows its reason at once', () => {
    const { result, rerender } = renderHook(
      ({ reasonKey }: { reasonKey: LocalizeKey | undefined }) =>
        useProjectOpenBlockedMessage(reasonKey),
      { initialProps: { reasonKey: REASON_KEY } },
    );
    const firstSelector = mockLocalizedStrings.mock.calls[0][0];

    // A reload clears the error before the backend refuses again.
    rerender({ reasonKey: undefined });
    expect(result.current).toBeUndefined();
    expect(mockUseData).toHaveBeenLastCalledWith(LOCALIZATION_DATA_PROVIDER_NAME);
    expect(mockLocalizedStrings.mock.lastCall?.[0]).toBe(firstSelector);

    rerender({ reasonKey: REASON_KEY });
    expect(result.current).toBe(REASON_TEXT);
    expect(mockLocalizedStrings.mock.lastCall?.[0]).toBe(firstSelector);
  });

  it('follows a new reason', () => {
    const OTHER_KEY = '%project_unsupported_other%';
    localizeWith({
      [REASON_KEY]: REASON_TEXT,
      [OTHER_KEY]: 'Other reason.',
      [PROJECT_OPEN_BLOCKED_FALLBACK_KEY]: FALLBACK_TEXT,
    });
    const { result, rerender } = renderHook(
      ({ reasonKey }: { reasonKey: LocalizeKey | undefined }) =>
        useProjectOpenBlockedMessage(reasonKey),
      { initialProps: { reasonKey: REASON_KEY } },
    );

    rerender({ reasonKey: OTHER_KEY });

    expect(result.current).toBe('Other reason.');
    expect(mockLocalizedStrings.mock.lastCall?.[0]).toEqual({
      localizeKeys: [OTHER_KEY, PROJECT_OPEN_BLOCKED_FALLBACK_KEY],
    });
  });

  it('shows the built-in generic text when localization fails', () => {
    mockLocalizedStrings.mockImplementation(() => [
      newPlatformError('localization unavailable'),
      vi.fn(),
      false,
    ]);

    const { result } = renderHook(() => useProjectOpenBlockedMessage(REASON_KEY));

    expect(result.current).toBe(PROJECT_OPEN_BLOCKED_FALLBACK_MESSAGE);
  });

  it('shows the built-in generic text when neither the reason nor the generic reason resolves', () => {
    localizeWith({});

    const { result } = renderHook(() => useProjectOpenBlockedMessage(REASON_KEY));

    expect(result.current).toBe(PROJECT_OPEN_BLOCKED_FALLBACK_MESSAGE);
  });
});
