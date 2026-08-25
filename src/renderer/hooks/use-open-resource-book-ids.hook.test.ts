import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY } from 'platform-bible-utils/experimental';
import { getAllOpenWebViewDefinitionsSync } from '@renderer/services/web-view.service-host';
import {
  EVENT_NAME_ON_DID_CLOSE_WEB_VIEW,
  EVENT_NAME_ON_DID_OPEN_WEB_VIEW,
  EVENT_NAME_ON_DID_UPDATE_WEB_VIEW,
} from '@shared/services/web-view.service-model';
import { type SavedWebViewDefinition } from '@shared/models/web-view.model';
import { useOpenResourceBookIds } from './use-open-resource-book-ids.hook';

// Hoisted so the vi.mock factories below can close over them — vi.mock is lifted above module init.
// `getProjectDataProvider` is deliberately untyped: an untyped mock accepts doubles narrower than
// the full PDP interface, which is what lets these tests avoid type assertions entirely.
const { getProjectDataProvider, webViewEventHandlers } = vi.hoisted(() => ({
  getProjectDataProvider: vi.fn(),
  webViewEventHandlers: new Map<string, Set<(eventData: unknown) => void>>(),
}));

// A real subscriber rather than an inert one, so a test can emit a web view event and drive the
// hook's re-enumeration of open web views — the trigger for every add/remove path below.
vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: vi.fn((eventName: string) => (handler: (eventData: unknown) => void) => {
    let handlers = webViewEventHandlers.get(eventName);
    if (!handlers) {
      handlers = new Set();
      webViewEventHandlers.set(eventName, handlers);
    }
    handlers.add(handler);
    return () => handlers?.delete(handler);
  }),
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

const unsubscribersByProjectId = new Map<string, ReturnType<typeof vi.fn>>();

/**
 * The unsubscriber a given project's booksPresent subscription resolves to. One mock per project,
 * so an assertion can name WHICH project's subscription was torn down rather than only proving that
 * some teardown ran.
 */
function unsubscriberFor(projectId: string) {
  const existing = unsubscribersByProjectId.get(projectId);
  if (existing) return existing;
  const created = vi.fn(async () => true);
  unsubscribersByProjectId.set(projectId, created);
  return created;
}

/** A base PDP double whose booksPresent subscription immediately reports `flags`. */
function pdpWithBooks(flags: string, projectId: string) {
  return {
    subscribeSetting: vi.fn(async (_key: string, callback: (value: string) => void) => {
      callback(flags);
      return unsubscriberFor(projectId);
    }),
  };
}

/**
 * Emits one of the web view events the hook subscribes to, so it re-enumerates open web views.
 * Throws when nothing is subscribed, so a hook that stops listening fails loudly here instead of
 * turning every event-driven test below into a silent no-op.
 */
async function emitWebViewEvent(eventName: string) {
  const handlers = webViewEventHandlers.get(eventName);
  if (!handlers || handlers.size === 0)
    throw new Error(`Nothing is subscribed to ${eventName}, so the hook cannot be woken`);
  await act(async () => {
    handlers.forEach((handler) => handler(undefined));
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  webViewEventHandlers.clear();
  unsubscribersByProjectId.clear();
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
    getProjectDataProvider.mockResolvedValue(
      pdpWithBooks(booksPresentFlags(66), 'resourceProject'),
    );

    const { result } = renderHook(() => useOpenResourceBookIds('activeProject'));

    await waitFor(() => expect(result.current).toEqual(['REV']));
  });

  test('unions books declared in navigableProjectIds web view state', async () => {
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
      webViewDefinition('grid', {
        state: { [NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY]: ['gridMember'] },
      }),
    ]);
    getProjectDataProvider.mockResolvedValue(pdpWithBooks(booksPresentFlags(66), 'gridMember'));

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
    getProjectDataProvider.mockResolvedValue(
      pdpWithBooks(booksPresentFlags(66), 'resourceProject'),
    );

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
        ? pdpWithBooks(booksPresentFlags(66), 'later')
        : pdpWithBooks(booksPresentFlags(1), 'earlier'),
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
      return pdpWithBooks(booksPresentFlags(66), 'workingResource');
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
    getProjectDataProvider.mockResolvedValue(
      pdpWithBooks(booksPresentFlags(66), 'resourceProject'),
    );

    const { result, unmount } = renderHook(() => useOpenResourceBookIds('activeProject'));
    await waitFor(() => expect(result.current).toEqual(['REV']));

    unmount();

    await waitFor(() => expect(unsubscriberFor('resourceProject')).toHaveBeenCalled());
  });

  describe('when the set of open web views changes', () => {
    /** Both projects contribute one book each, so either one's departure is visible in the result. */
    function openTwoResourceProjects() {
      vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
        webViewDefinition('staysView', { projectId: 'stays' }),
        webViewDefinition('closesView', { projectId: 'closes' }),
      ]);
      getProjectDataProvider.mockImplementation(async (_projectInterface, projectId) =>
        projectId === 'stays'
          ? pdpWithBooks(booksPresentFlags(1), 'stays')
          : pdpWithBooks(booksPresentFlags(66), 'closes'),
      );
    }

    /** Leaves only the `stays` project open. */
    function closeOneResourceProject() {
      vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
        webViewDefinition('staysView', { projectId: 'stays' }),
      ]);
    }

    test("drops a closed project's books from the result", async () => {
      openTwoResourceProjects();

      const { result } = renderHook(() => useOpenResourceBookIds('activeProject'));
      await waitFor(() => expect(result.current).toEqual(['GEN', 'REV']));

      closeOneResourceProject();
      await emitWebViewEvent(EVENT_NAME_ON_DID_CLOSE_WEB_VIEW);

      await waitFor(() => expect(result.current).toEqual(['GEN']));
    });

    test("adds a newly opened project's books to the result", async () => {
      const { result } = renderHook(() => useOpenResourceBookIds('activeProject'));
      await waitFor(() => expect(result.current).toEqual([]));

      vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
        webViewDefinition('openedView', { projectId: 'opened' }),
      ]);
      getProjectDataProvider.mockResolvedValue(pdpWithBooks(booksPresentFlags(66), 'opened'));
      await emitWebViewEvent(EVENT_NAME_ON_DID_OPEN_WEB_VIEW);

      await waitFor(() => expect(result.current).toEqual(['REV']));
    });

    test("runs the closed project's own unsubscriber and resubscribes the survivor", async () => {
      openTwoResourceProjects();

      const { result } = renderHook(() => useOpenResourceBookIds('activeProject'));
      await waitFor(() => expect(result.current).toEqual(['GEN', 'REV']));
      expect(getProjectDataProvider).toHaveBeenCalledTimes(2);

      closeOneResourceProject();
      await emitWebViewEvent(EVENT_NAME_ON_DID_CLOSE_WEB_VIEW);

      // Named per project, so this cannot be satisfied by the surviving project's teardown.
      await waitFor(() => expect(unsubscriberFor('closes')).toHaveBeenCalled());
      // The changed project set rebuilds every subscription, so the survivor is subscribed afresh
      // rather than left without one — while the closed project is not subscribed a second time.
      const acquisitionsFor = (projectId: string) =>
        getProjectDataProvider.mock.calls.filter(([, id]) => id === projectId);
      await waitFor(() => expect(acquisitionsFor('stays')).toHaveLength(2));
      expect(acquisitionsFor('closes')).toHaveLength(1);
    });

    test('an event that leaves the project set unchanged does not rebuild subscriptions', async () => {
      vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
        webViewDefinition('a', { projectId: 'resourceProject' }),
      ]);
      getProjectDataProvider.mockResolvedValue(
        pdpWithBooks(booksPresentFlags(66), 'resourceProject'),
      );

      const { result } = renderHook(() => useOpenResourceBookIds('activeProject'));
      await waitFor(() => expect(result.current).toEqual(['REV']));
      expect(getProjectDataProvider).toHaveBeenCalledTimes(1);

      // A fresh array of fresh definitions with the same project membership — what an unrelated web
      // view update produces. The membership fingerprint is what keeps this from tearing down and
      // rebuilding the subscription.
      vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
        webViewDefinition('a', { projectId: 'resourceProject' }),
      ]);
      await emitWebViewEvent(EVENT_NAME_ON_DID_UPDATE_WEB_VIEW);

      expect(getProjectDataProvider).toHaveBeenCalledTimes(1);
      expect(unsubscriberFor('resourceProject')).not.toHaveBeenCalled();
      expect(result.current).toEqual(['REV']);
    });
  });
});
