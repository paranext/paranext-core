import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY } from 'platform-bible-utils/experimental';
import { getAllOpenWebViewDefinitionsSync } from '@renderer/services/web-view.service-host';
import { type SavedWebViewDefinition } from '@shared/models/web-view.model';
import { useOpenResourceBookIds } from './use-open-resource-book-ids.hook';

// Hoisted so the vi.mock factory below can close over it — vi.mock is lifted above module init.
// Deliberately untyped: an untyped mock accepts doubles narrower than the full PDP interface, which
// is what lets these tests avoid type assertions entirely.
const { getProjectDataProvider } = vi.hoisted(() => ({ getProjectDataProvider: vi.fn() }));

vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: vi.fn(() => vi.fn(() => vi.fn())),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

vi.mock('@renderer/services/web-view.service-host', () => ({
  getAllOpenWebViewDefinitionsSync: vi.fn(() => []),
}));

vi.mock('@shared/services/project-data-provider.service', () => ({
  papiFrontendProjectDataProviderService: { get: getProjectDataProvider },
}));

/** `id` and `webViewType` are a saved definition's only required properties. */
function webViewDefinition(
  id: string,
  extra: { projectId?: string; state?: Record<string, unknown> } = {},
): SavedWebViewDefinition {
  return { id, webViewType: 'test.webViewType', ...extra };
}

/** '1' at a book's canonical number marks it present. GEN is 1, REV is 66. */
function booksPresentFlags(...bookNumbers: number[]): string {
  const flags = new Array(123).fill('0');
  bookNumbers.forEach((bookNumber) => {
    flags[bookNumber - 1] = '1';
  });
  return flags.join('');
}

const unsubscribe = vi.fn(async () => true);

/** A base PDP double whose booksPresent subscription immediately reports `flags`. */
function pdpWithBooks(flags: string) {
  return {
    subscribeSetting: vi.fn(async (_key: string, callback: (value: string) => void) => {
      callback(flags);
      return unsubscribe;
    }),
  };
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([]);
});

describe('useOpenResourceBookIds', () => {
  test('returns nothing when no web views are open', async () => {
    const { result } = renderHook(() => useOpenResourceBookIds('activeProject'));

    await waitFor(() => expect(result.current).toEqual([]));
    expect(getProjectDataProvider).not.toHaveBeenCalled();
  });

  test("unions books from another open tab's projectId", async () => {
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
      webViewDefinition('webView1', { projectId: 'resourceProject' }),
    ]);
    getProjectDataProvider.mockResolvedValue(pdpWithBooks(booksPresentFlags(66)));

    const { result } = renderHook(() => useOpenResourceBookIds('activeProject'));

    await waitFor(() => expect(result.current).toEqual(['REV']));
  });

  test('unions books declared in navigableProjectIds web view state', async () => {
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
      webViewDefinition('grid', {
        state: { [NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY]: ['gridMember'] },
      }),
    ]);
    getProjectDataProvider.mockResolvedValue(pdpWithBooks(booksPresentFlags(66)));

    const { result } = renderHook(() => useOpenResourceBookIds('activeProject'));

    await waitFor(() => expect(result.current).toEqual(['REV']));
    expect(getProjectDataProvider).toHaveBeenCalledWith('platform.base', 'gridMember');
  });

  test('ignores malformed navigableProjectIds state without throwing', async () => {
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
      webViewDefinition('a', {
        state: { [NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY]: 'notAnArray' },
      }),
      webViewDefinition('b', { state: { [NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY]: [1, 2] } }),
    ]);

    const { result } = renderHook(() => useOpenResourceBookIds('activeProject'));

    await waitFor(() => expect(result.current).toEqual([]));
    expect(getProjectDataProvider).not.toHaveBeenCalled();
  });

  test('never subscribes to the active project', async () => {
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
      webViewDefinition('editor', { projectId: 'activeProject' }),
    ]);

    const { result } = renderHook(() => useOpenResourceBookIds('activeProject'));

    await waitFor(() => expect(result.current).toEqual([]));
    expect(getProjectDataProvider).not.toHaveBeenCalled();
  });

  test('subscribes once per project id even when two views share it', async () => {
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
      webViewDefinition('a', { projectId: 'resourceProject' }),
      webViewDefinition('b', { projectId: 'resourceProject' }),
    ]);
    getProjectDataProvider.mockResolvedValue(pdpWithBooks(booksPresentFlags(66)));

    const { result } = renderHook(() => useOpenResourceBookIds('activeProject'));

    await waitFor(() => expect(result.current).toEqual(['REV']));
    expect(getProjectDataProvider).toHaveBeenCalledTimes(1);
  });

  test('returns books in canon order across projects', async () => {
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
      webViewDefinition('a', { projectId: 'later' }),
      webViewDefinition('b', { projectId: 'earlier' }),
    ]);
    getProjectDataProvider.mockImplementation(async (_projectInterface, projectId) =>
      projectId === 'later'
        ? pdpWithBooks(booksPresentFlags(66))
        : pdpWithBooks(booksPresentFlags(1)),
    );

    const { result } = renderHook(() => useOpenResourceBookIds('activeProject'));

    await waitFor(() => expect(result.current).toEqual(['GEN', 'REV']));
  });

  test('a project whose provider rejects contributes no books', async () => {
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
      webViewDefinition('a', { projectId: 'brokenResource' }),
      webViewDefinition('b', { projectId: 'workingResource' }),
    ]);
    getProjectDataProvider.mockImplementation(async (_projectInterface, projectId) => {
      if (projectId === 'brokenResource') throw new Error('no such provider');
      return pdpWithBooks(booksPresentFlags(66));
    });

    const { result } = renderHook(() => useOpenResourceBookIds('activeProject'));

    // The working project's book is the signal that both providers have settled — without it the
    // assertion would pass against the initial empty state before the rejection is even handled.
    // The critical assertion is what is NOT here: a failure must not widen the list to the whole
    // canon.
    await waitFor(() => expect(result.current).toEqual(['REV']));
  });

  test('unsubscribes when the hook unmounts', async () => {
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
      webViewDefinition('a', { projectId: 'resourceProject' }),
    ]);
    getProjectDataProvider.mockResolvedValue(pdpWithBooks(booksPresentFlags(66)));

    const { result, unmount } = renderHook(() => useOpenResourceBookIds('activeProject'));
    await waitFor(() => expect(result.current).toEqual(['REV']));

    unmount();

    await waitFor(() => expect(unsubscribe).toHaveBeenCalled());
  });
});
