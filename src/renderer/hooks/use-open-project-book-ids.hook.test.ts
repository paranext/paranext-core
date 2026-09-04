import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY } from 'platform-bible-utils/experimental';
import { getAllOpenWebViewDefinitionsSync } from '@renderer/services/web-view.service-shard';
import {
  EVENT_NAME_ON_DID_CLOSE_WEB_VIEW,
  EVENT_NAME_ON_DID_OPEN_WEB_VIEW,
  EVENT_NAME_ON_DID_UPDATE_WEB_VIEW,
} from '@shared/services/web-view.service-model';
import { type SavedWebViewDefinition } from '@shared/models/web-view.model';
import { useOpenProjectBookIds } from './use-open-project-book-ids.hook';

// Hoisted so the vi.mock factories below can close over them — vi.mock is lifted above module init.
// `getProjectDataProvider` is deliberately untyped: an untyped mock accepts doubles narrower than
// the full PDP interface, which is what lets these tests avoid type assertions entirely.
const { getProjectDataProvider, webViewEventHandlers } = vi.hoisted(() => ({
  getProjectDataProvider: vi.fn(),
  webViewEventHandlers: new Map<string, Set<(eventData: unknown) => void>>(),
}));

// Real subscribers rather than inert ones, so a test can emit a web view event and drive the hook's
// re-enumeration of open web views — the trigger for every add/remove path below. Keyed by event
// name so `emitWebViewEvent` can target one of the three.
const { subscribeToWebViewEvent } = vi.hoisted(() => ({
  subscribeToWebViewEvent: (eventName: string) => (handler: (eventData: unknown) => void) => {
    let handlers = webViewEventHandlers.get(eventName);
    if (!handlers) {
      handlers = new Set();
      webViewEventHandlers.set(eventName, handlers);
    }
    handlers.add(handler);
    return () => handlers?.delete(handler);
  },
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

// The hook consumes the ready-made events this module exports rather than building its own, so the
// doubles live here rather than behind a `getNetworkEvent` mock.
vi.mock('@renderer/services/web-view.service-shard', () => ({
  getAllOpenWebViewDefinitionsSync: vi.fn(() => []),
  // The event name is read when the subscriber runs, not when this factory is evaluated: vi.mock is
  // hoisted above the imports, so the constants do not exist yet at factory time.
  onDidOpenWebView: (handler: (eventData: unknown) => void) =>
    subscribeToWebViewEvent(EVENT_NAME_ON_DID_OPEN_WEB_VIEW)(handler),
  onDidUpdateWebView: (handler: (eventData: unknown) => void) =>
    subscribeToWebViewEvent(EVENT_NAME_ON_DID_UPDATE_WEB_VIEW)(handler),
  onDidCloseWebView: (handler: (eventData: unknown) => void) =>
    subscribeToWebViewEvent(EVENT_NAME_ON_DID_CLOSE_WEB_VIEW)(handler),
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

describe('useOpenProjectBookIds', () => {
  describe('referential stability', () => {
    // The returned array feeds consumers that memoize on its identity (the toolbar's
    // `additionalBookIds` -> `fetchAdditionalBookIds` -> BookChapterControl's book list). A project
    // switch fires a burst of web view events that do not change which projects are open, so an
    // identity that tracked event count rather than membership would re-render those consumers on
    // every event in the burst.
    test('keeps the same array identity when a web view event does not change membership', async () => {
      vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
        webViewDefinition('webView1', { projectId: 'resourceProject' }),
      ]);
      getProjectDataProvider.mockResolvedValue(
        pdpWithBooks(booksPresentFlags(66), 'resourceProject'),
      );

      const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));
      await waitFor(() => expect(result.current).toEqual(['REV']));
      const before = result.current;

      // Same open web views: the enumeration returns an equal-but-new array each time.
      await emitWebViewEvent(EVENT_NAME_ON_DID_UPDATE_WEB_VIEW);
      await emitWebViewEvent(EVENT_NAME_ON_DID_UPDATE_WEB_VIEW);
      await emitWebViewEvent(EVENT_NAME_ON_DID_UPDATE_WEB_VIEW);

      expect(result.current).toBe(before);
    });

    // The identity assertion above is necessary but not sufficient: a refresh counter in state
    // re-renders the consumer on every web view event even when the value it produces is unchanged,
    // which is what turns a project switch's event burst into a render storm. Assert the render
    // count does not scale with the number of events.
    test('does not re-render its consumer when a web view event does not change membership', async () => {
      vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
        webViewDefinition('webView1', { projectId: 'resourceProject' }),
      ]);
      getProjectDataProvider.mockResolvedValue(
        pdpWithBooks(booksPresentFlags(66), 'resourceProject'),
      );

      let renderCount = 0;
      const { result } = renderHook(() => {
        renderCount += 1;
        return useOpenProjectBookIds('activeProject');
      });
      await waitFor(() => expect(result.current).toEqual(['REV']));
      const rendersBefore = renderCount;

      const eventCount = 10;
      for (let i = 0; i < eventCount; i += 1) {
        // Each event must be delivered sequentially so React commits any resulting render before
        // the next one arrives; emitting them concurrently would let React batch the whole burst
        // into a single render and the count below would pass even with a per-event counter.
        // eslint-disable-next-line no-await-in-loop
        await emitWebViewEvent(EVENT_NAME_ON_DID_UPDATE_WEB_VIEW);
      }

      // Not zero extra renders: `useState` has to render the component once to discover the value
      // is unchanged before it can bail out. What matters is that the count does not scale with the
      // number of events — a refresh counter would add one render per event.
      expect(renderCount - rendersBefore).toBeLessThanOrEqual(1);
    });

    test('returns a new array identity when membership actually changes', async () => {
      vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
        webViewDefinition('webView1', { projectId: 'resourceProject' }),
      ]);
      getProjectDataProvider.mockResolvedValue(
        pdpWithBooks(booksPresentFlags(66), 'resourceProject'),
      );

      const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));
      await waitFor(() => expect(result.current).toEqual(['REV']));
      const before = result.current;

      vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([]);
      await emitWebViewEvent(EVENT_NAME_ON_DID_CLOSE_WEB_VIEW);

      await waitFor(() => expect(result.current).not.toBe(before));
      expect(result.current).toEqual([]);
    });
  });

  test('returns nothing when no web views are open', async () => {
    const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));

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

    const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));

    await waitFor(() => expect(result.current).toEqual(['REV']));
  });

  test('unions books declared in navigableProjectIds web view state', async () => {
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
      webViewDefinition('grid', {
        state: { [NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY]: ['gridMember'] },
      }),
    ]);
    getProjectDataProvider.mockResolvedValue(pdpWithBooks(booksPresentFlags(66), 'gridMember'));

    const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));

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

    const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));

    await waitFor(() => expect(result.current).toEqual([]));
    expect(getProjectDataProvider).not.toHaveBeenCalled();
  });

  test('never subscribes to the active project', async () => {
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
      webViewDefinition('editor', { projectId: 'activeProject' }),
    ]);

    const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));

    await waitFor(() => expect(result.current).toEqual([]));
    expect(getProjectDataProvider).not.toHaveBeenCalled();
  });

  test('follows a change of active project without waiting for a web view event', async () => {
    // The active project is excluded from the result, so swapping which project is active swaps
    // which one's books are reported. Nothing re-reads the open web views when `activeProjectId`
    // changes - web view events are the only trigger for that - so the exclusion has to be applied
    // during render, and this holds it there through a later refactor. Applied in an effect
    // instead, the hook would report the previous project's set for a commit.
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
      webViewDefinition('editor', { projectId: 'activeProject' }),
      webViewDefinition('resource', { projectId: 'otherProject' }),
    ]);
    getProjectDataProvider.mockImplementation(async (_pdpType: string, projectId: string) =>
      projectId === 'otherProject'
        ? pdpWithBooks(booksPresentFlags(66), 'otherProject')
        : pdpWithBooks(booksPresentFlags(1), 'activeProject'),
    );

    const { result, rerender } = renderHook(
      ({ activeProjectId }: { activeProjectId: string }) => useOpenProjectBookIds(activeProjectId),
      { initialProps: { activeProjectId: 'activeProject' } },
    );

    // 'activeProject' is excluded, so only 'otherProject' (REV) is reported
    await waitFor(() => expect(result.current).toEqual(['REV']));

    rerender({ activeProjectId: 'otherProject' });

    // Asserted WITHOUT waiting: the exclusion has to land in the same commit that renders the new
    // active project. A commit computed with the previous value would offer the newly-active
    // project's own books (REV) as books outside it - the exact set this hook exists to exclude.
    // Its replacement (GEN) cannot appear that fast, since including a project means subscribing to
    // it, so what the same commit guarantees is that the wrong answer is never shown.
    expect(result.current).not.toContain('REV');

    // The exclusion moves with the active project: now 'activeProject' (GEN) is the one reported
    await waitFor(() => expect(result.current).toEqual(['GEN']));
  });

  test('reports the set left open after the closing tab’s event, not the one closing', async () => {
    // rc-dock calls `onLayoutChange` BEFORE it commits the new layout, and the web view service
    // emits the close event as that callback's first statement, synchronously - so a read taken
    // inside the handler still sees the tab that is going away. The membership key would come back
    // unchanged, `useState` would bail out, and the closed project would keep both its books and
    // its `booksPresent` subscription until some unrelated web view event happened along.
    let openDefinitions = [
      webViewDefinition('staysView', { projectId: 'stays' }),
      webViewDefinition('closesView', { projectId: 'closes' }),
    ];
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockImplementation(() => openDefinitions);
    getProjectDataProvider.mockImplementation(async (_projectInterface, projectId) =>
      projectId === 'stays'
        ? pdpWithBooks(booksPresentFlags(1), 'stays')
        : pdpWithBooks(booksPresentFlags(66), 'closes'),
    );

    const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));
    await waitFor(() => expect(result.current).toEqual(['GEN', 'REV']));

    const handlers = webViewEventHandlers.get(EVENT_NAME_ON_DID_CLOSE_WEB_VIEW);
    if (!handlers?.size) throw new Error('The hook is not subscribed to the close event');
    await act(async () => {
      // Fired while the layout still reports the pre-close tabs, exactly as rc-dock fires it...
      handlers.forEach((handler) => handler(undefined));
      // ...and committed only after the handler returned.
      openDefinitions = [webViewDefinition('staysView', { projectId: 'stays' })];
    });

    await waitFor(() => expect(result.current).toEqual(['GEN']));
    // The closed project's subscription goes with its books rather than outliving them.
    await waitFor(() => expect(unsubscriberFor('closes')).toHaveBeenCalled());
  });

  describe('when disabled', () => {
    test('returns nothing and opens no data providers', async () => {
      vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
        webViewDefinition('resource', { projectId: 'resourceProject' }),
      ]);
      getProjectDataProvider.mockResolvedValue(
        pdpWithBooks(booksPresentFlags(66), 'resourceProject'),
      );

      const { result } = renderHook(() => useOpenProjectBookIds('activeProject', false));

      await waitFor(() => expect(result.current).toEqual([]));
      expect(getProjectDataProvider).not.toHaveBeenCalled();
    });

    test('does not subscribe to web view events', async () => {
      const { unmount } = renderHook(() => useOpenProjectBookIds('activeProject', false));

      await waitFor(() =>
        expect(webViewEventHandlers.get(EVENT_NAME_ON_DID_OPEN_WEB_VIEW)?.size ?? 0).toBe(0),
      );
      expect(webViewEventHandlers.get(EVENT_NAME_ON_DID_UPDATE_WEB_VIEW)?.size ?? 0).toBe(0);
      expect(webViewEventHandlers.get(EVENT_NAME_ON_DID_CLOSE_WEB_VIEW)?.size ?? 0).toBe(0);

      unmount();
    });

    test('starts working once it is enabled', async () => {
      vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
        webViewDefinition('resource', { projectId: 'resourceProject' }),
      ]);
      getProjectDataProvider.mockResolvedValue(
        pdpWithBooks(booksPresentFlags(66), 'resourceProject'),
      );

      const { result, rerender } = renderHook(
        ({ isEnabled }: { isEnabled: boolean }) =>
          useOpenProjectBookIds('activeProject', isEnabled),
        { initialProps: { isEnabled: false } },
      );

      await waitFor(() => expect(result.current).toEqual([]));

      rerender({ isEnabled: true });

      await waitFor(() => expect(result.current).toEqual(['REV']));
    });
  });

  test('subscribes once per project id even when two views share it', async () => {
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
      webViewDefinition('a', { projectId: 'resourceProject' }),
      webViewDefinition('b', { projectId: 'resourceProject' }),
    ]);
    getProjectDataProvider.mockResolvedValue(
      pdpWithBooks(booksPresentFlags(66), 'resourceProject'),
    );

    const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));

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

    const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));

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

    const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));

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

    const { result, unmount } = renderHook(() => useOpenProjectBookIds('activeProject'));
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

      const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));
      await waitFor(() => expect(result.current).toEqual(['GEN', 'REV']));

      closeOneResourceProject();
      await emitWebViewEvent(EVENT_NAME_ON_DID_CLOSE_WEB_VIEW);

      await waitFor(() => expect(result.current).toEqual(['GEN']));
    });

    test("adds a newly opened project's books to the result", async () => {
      const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));
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

      const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));
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

      const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));
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
