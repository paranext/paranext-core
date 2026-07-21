// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import type { ProjectMetadata } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useSetting } from '@papi/frontend/react';
import type { PlatformError } from 'platform-bible-utils';
import { metadataToLocalProjectInfo } from './home.component';
import { useLocalProjects } from './use-local-projects.hook';

vi.mock('@papi/frontend', () => ({
  default: {
    projectLookup: { getMetadataForAllProjects: vi.fn() },
    network: { getNetworkEvent: vi.fn(() => 'onDidChangeProjects-token') },
  },
  logger: { warn: vi.fn() },
}));

vi.mock('@papi/frontend/react', () => ({
  // `useSetting(key, default)` returns a tuple whose first element is the value (or a PlatformError);
  // the hook reads only index 0. Default to no excluded factory ids.
  useSetting: vi.fn(() => [[]]),
}));

// The hook subscribes to `platform.onDidChangeProjects` through `useEvent`. Capture the handler it
// registers so a test can fire the event and drive the refetch.
let capturedProjectsChangedHandler: (() => void) | undefined;
vi.mock('platform-bible-react', () => ({
  useEvent: vi.fn((_event, handler) => {
    capturedProjectsChangedHandler = handler;
  }),
}));

const mockGetMetadataForAllProjects = vi.mocked(papi.projectLookup.getMetadataForAllProjects);
const mockLoggerWarn = vi.mocked(logger.warn);
const mockUseSetting = vi.mocked(useSetting);

// #region fixtures

/**
 * A `useSetting` return value carrying only what the hook reads — index 0, the resolved setting
 * value (a `string[]`) or a `PlatformError`. The setter/reset/loading slots are unused here, so a
 * single-element tuple stands in; the cast bridges it to the full 4-element `useSetting` return
 * type.
 */
function settingReturn(value: string[] | PlatformError): ReturnType<typeof useSetting> {
  // Partial tuple stands in for the full useSetting return; the hook reads only index 0.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return [value] as unknown as ReturnType<typeof useSetting>;
}

/** A minimal value that satisfies the runtime `isPlatformError` check (via `platformErrorVersion`). */
function makePlatformError(): PlatformError {
  return { platformErrorVersion: 1, message: 'setting failed' };
}

/**
 * Builds a {@link ProjectMetadata} with the required structural fields defaulted, so a test only has
 * to specify the display fields ({@link useLocalProjects} / {@link metadataToLocalProjectInfo} read
 * `id`, `name`, `fullName`, `language`, and `isPublished`).
 */
function makeMetadata(overrides: Partial<ProjectMetadata> & { id: string }): ProjectMetadata {
  return {
    projectInterfaces: [],
    pdpFactoryInfo: {},
    ...overrides,
  };
}

// #endregion

describe('useLocalProjects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    capturedProjectsChangedHandler = undefined;
    // Default: a fetch that resolves with no projects. Individual tests override as needed.
    mockGetMetadataForAllProjects.mockResolvedValue([]);
    // Default: the exclude setting resolves to no excluded factory ids.
    mockUseSetting.mockReturnValue(settingReturn([]));
  });

  it('starts in the loading state with an empty list before the fetch resolves', async () => {
    const { result } = renderHook(() => useLocalProjects({ logLabel: 'Home' }));

    // Assert the synchronous initial render, before the in-flight fetch has a chance to resolve.
    expect(result.current.isLoadingLocalProjects).toBe(true);
    expect(result.current.localProjectsInfo).toEqual([]);

    // Flush the pending default fetch so its resolution's setState is wrapped in act (no warning).
    await act(async () => {
      await Promise.resolve();
    });
  });

  it('clears loading and maps the fetched metadata through metadataToLocalProjectInfo', async () => {
    const metadata = [
      makeMetadata({ id: 'p1', name: 'FirstShort', fullName: 'First Full', language: 'en' }),
      makeMetadata({ id: 'p2', name: 'SecondShort', fullName: 'Second Full', language: 'fr' }),
    ];
    mockGetMetadataForAllProjects.mockResolvedValue(metadata);

    const { result } = renderHook(() => useLocalProjects({ logLabel: 'Home' }));

    await waitFor(() => expect(result.current.isLoadingLocalProjects).toBe(false));
    expect(result.current.localProjectsInfo).toEqual(metadata.map(metadataToLocalProjectInfo));
  });

  it('still clears loading and warns (with the logLabel) when the fetch rejects', async () => {
    mockGetMetadataForAllProjects.mockRejectedValue(new Error('boom'));

    const { result } = renderHook(() => useLocalProjects({ logLabel: 'New Tab' }));

    await waitFor(() => expect(result.current.isLoadingLocalProjects).toBe(false));
    expect(result.current.localProjectsInfo).toEqual([]);
    expect(mockLoggerWarn).toHaveBeenCalledTimes(1);
    expect(mockLoggerWarn.mock.calls[0][0]).toContain('New Tab');
    expect(mockLoggerWarn.mock.calls[0][0]).toContain('boom');
  });

  it('refetches and applies updated results when platform.onDidChangeProjects fires', async () => {
    const first = [makeMetadata({ id: 'p1', name: 'One' })];
    const second = [
      makeMetadata({ id: 'p1', name: 'One' }),
      makeMetadata({ id: 'p2', name: 'Two' }),
    ];
    mockGetMetadataForAllProjects.mockResolvedValueOnce(first).mockResolvedValueOnce(second);

    const { result } = renderHook(() => useLocalProjects({ logLabel: 'Home' }));

    await waitFor(() =>
      expect(result.current.localProjectsInfo).toEqual(first.map(metadataToLocalProjectInfo)),
    );
    expect(mockGetMetadataForAllProjects).toHaveBeenCalledTimes(1);

    // Fire the network event the hook subscribed to; it should bump its internal counter and refetch.
    act(() => capturedProjectsChangedHandler?.());

    await waitFor(() => expect(mockGetMetadataForAllProjects).toHaveBeenCalledTimes(2));
    await waitFor(() =>
      expect(result.current.localProjectsInfo).toEqual(second.map(metadataToLocalProjectInfo)),
    );
  });

  it('skips the fetch entirely and leaves loading untouched when enabled is false', async () => {
    const { result } = renderHook(() => useLocalProjects({ logLabel: 'Home', enabled: false }));

    // Give any (unexpected) async effect a chance to run before asserting it did not.
    await act(async () => {
      await Promise.resolve();
    });

    expect(mockGetMetadataForAllProjects).not.toHaveBeenCalled();
    expect(result.current.isLoadingLocalProjects).toBe(true);
    expect(result.current.localProjectsInfo).toEqual([]);
  });

  it('re-runs the fetch when a refetchTriggers entry changes', async () => {
    const { rerender } = renderHook(
      ({ trigger }) => useLocalProjects({ logLabel: 'Home', refetchTriggers: [trigger] }),
      { initialProps: { trigger: 'a' } },
    );

    await waitFor(() => expect(mockGetMetadataForAllProjects).toHaveBeenCalledTimes(1));

    rerender({ trigger: 'b' });

    await waitFor(() => expect(mockGetMetadataForAllProjects).toHaveBeenCalledTimes(2));

    // A rerender with the SAME trigger must not refetch.
    rerender({ trigger: 'b' });
    await act(async () => {
      await Promise.resolve();
    });
    expect(mockGetMetadataForAllProjects).toHaveBeenCalledTimes(2);
  });

  it('does not update state or throw when the fetch resolves after unmount', async () => {
    let resolveFetch: (value: ProjectMetadata[]) => void = () => {};
    mockGetMetadataForAllProjects.mockReturnValue(
      new Promise<ProjectMetadata[]>((resolve) => {
        resolveFetch = resolve;
      }),
    );

    const { result, unmount } = renderHook(() => useLocalProjects({ logLabel: 'Home' }));

    // Unmount before the in-flight fetch resolves.
    unmount();

    // Resolving now must be a no-op for state (the stale-promise + isMounted guards): no throw, no
    // warn, and the last committed snapshot is unchanged (still loading, empty list).
    await act(async () => {
      resolveFetch([makeMetadata({ id: 'p1', name: 'Late' })]);
      await Promise.resolve();
    });

    expect(mockLoggerWarn).not.toHaveBeenCalled();
    expect(result.current.isLoadingLocalProjects).toBe(true);
    expect(result.current.localProjectsInfo).toEqual([]);
  });

  it('fetches with the USJ_Chapter interface filter and the exclude setting value', async () => {
    const excludePdpFactoryIds = ['factory-a', 'factory-b'];
    mockUseSetting.mockReturnValue(settingReturn(excludePdpFactoryIds));

    const { result } = renderHook(() => useLocalProjects({ logLabel: 'Home' }));

    await waitFor(() => expect(result.current.isLoadingLocalProjects).toBe(false));

    expect(mockGetMetadataForAllProjects).toHaveBeenCalledWith({
      includeProjectInterfaces: ['platformScripture.USJ_Chapter'],
      excludePdpFactoryIds,
    });
  });

  it('falls back to no excludes and warns when the exclude setting is a PlatformError', async () => {
    const settingError = makePlatformError();
    mockUseSetting.mockReturnValue(settingReturn(settingError));

    const { result } = renderHook(() => useLocalProjects({ logLabel: 'Home' }));

    await waitFor(() => expect(result.current.isLoadingLocalProjects).toBe(false));

    // The guard swaps the error for an empty exclude list before fetching.
    expect(mockGetMetadataForAllProjects).toHaveBeenCalledWith({
      includeProjectInterfaces: ['platformScripture.USJ_Chapter'],
      excludePdpFactoryIds: [],
    });
    expect(mockLoggerWarn).toHaveBeenCalledWith(
      'Failed to load setting: platformGetResources.excludePdpFactoryIdsInHome',
      settingError,
    );
  });
});

describe('metadataToLocalProjectInfo', () => {
  it('maps every field straight through when all are present', () => {
    expect(
      metadataToLocalProjectInfo(
        makeMetadata({
          id: 'p1',
          name: 'Short',
          fullName: 'Full Name',
          language: 'en',
          isPublished: true,
        }),
      ),
    ).toEqual({
      projectId: 'p1',
      name: 'Short',
      fullName: 'Full Name',
      language: 'en',
      isPublished: true,
    });
  });

  it('falls back to the id for name and fullName when both are absent', () => {
    expect(metadataToLocalProjectInfo(makeMetadata({ id: 'proj-id-only' }))).toEqual({
      projectId: 'proj-id-only',
      name: 'proj-id-only',
      fullName: 'proj-id-only',
      language: '',
      isPublished: false,
    });
  });

  it('falls back fullName to name when fullName is absent but name is present', () => {
    const result = metadataToLocalProjectInfo(makeMetadata({ id: 'p1', name: 'ShortOnly' }));
    expect(result.name).toBe('ShortOnly');
    expect(result.fullName).toBe('ShortOnly');
  });

  it('defaults isPublished to false and language to the empty string when absent', () => {
    const result = metadataToLocalProjectInfo(makeMetadata({ id: 'p1', name: 'Short' }));
    expect(result.isPublished).toBe(false);
    expect(result.language).toBe('');
  });

  it('preserves an explicit isPublished false and an explicit language', () => {
    const result = metadataToLocalProjectInfo(
      makeMetadata({ id: 'p1', name: 'Short', language: 'de', isPublished: false }),
    );
    expect(result.isPublished).toBe(false);
    expect(result.language).toBe('de');
  });
});
