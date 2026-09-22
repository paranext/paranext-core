import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY } from 'platform-bible-utils/experimental';
import { getAllOpenWebViewDefinitionsSync } from '@renderer/services/web-view.service-shard';
import {
  EVENT_NAME_ON_DID_CLOSE_WEB_VIEW,
  EVENT_NAME_ON_DID_OPEN_WEB_VIEW,
  EVENT_NAME_ON_DID_UPDATE_WEB_VIEW,
} from '@shared/services/web-view.service-model';
import { type SavedWebViewDefinition } from '@shared/models/web-view.model';
import { logger } from '@shared/services/logger.service';
import {
  FAILED_PROVIDER_LOOKUP_RETRY_MS,
  useOpenProjectBookIds,
} from './use-open-project-book-ids.hook';

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

/** A promise the test settles by hand, to hold a provider or a subscription mid-flight. */
function deferred<T>() {
  let settle!: (value: T) => void;
  let fail!: (reason: unknown) => void;
  const promise = new Promise<T>((resolve, reject) => {
    settle = resolve;
    fail = reject;
  });
  return { promise, resolve: settle, reject: fail };
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

      // The deferred read really did run for every event — otherwise the bound below would hold by
      // deferral alone and would say nothing about the `useState` bailout it is written to pin.
      expect(vi.mocked(getAllOpenWebViewDefinitionsSync).mock.calls.length).toBeGreaterThanOrEqual(
        eventCount,
      );
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

  test("never offers the active project's own books", async () => {
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
      webViewDefinition('editor', { projectId: 'activeProject' }),
    ]);
    getProjectDataProvider.mockResolvedValue(
      pdpWithBooks(booksPresentFlags(1, 66), 'activeProject'),
    );

    const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));

    // The active project may well be subscribed — it is filtered out of the RESULT, not out of the
    // subscribed set, so that changing navigation target cannot churn subscriptions
    await waitFor(() => expect(result.current).toEqual([]));
  });

  test("offers the navigation target's books while the target is briefly undefined", async () => {
    // The documented cost of filtering at read time instead of out of the subscribed set: through a
    // dock rebuild's `undefined` gap nothing matches the filter, so the target's own books are
    // offered for that gap. Pinned deliberately — the alternative (holding the last non-`undefined`
    // target in a ref) would suppress these books when `undefined` is the settled answer instead.
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
      webViewDefinition('editor', { projectId: 'activeProject' }),
      webViewDefinition('panel', { projectId: 'otherProject' }),
    ]);
    getProjectDataProvider.mockImplementation(async (_interface: string, projectId: string) =>
      pdpWithBooks(
        projectId === 'activeProject' ? booksPresentFlags(1) : booksPresentFlags(66),
        projectId,
      ),
    );

    const initialProps: { activeProjectId: string | undefined } = {
      activeProjectId: 'activeProject',
    };
    const { result, rerender } = renderHook(
      ({ activeProjectId }: { activeProjectId: string | undefined }) =>
        useOpenProjectBookIds(activeProjectId),
      { initialProps },
    );
    await waitFor(() => expect(result.current).toEqual(['REV']));

    rerender({ activeProjectId: undefined });

    // GEN is the active project's own book, offered only because nothing equals `undefined`
    await waitFor(() => expect(result.current).toEqual(['GEN', 'REV']));

    rerender({ activeProjectId: 'activeProject' });

    await waitFor(() => expect(result.current).toEqual(['REV']));
  });

  test('changing the navigation target does not tear down and rebuild subscriptions', async () => {
    // The storm this guards against: in simple mode every open panel carries the same project id,
    // so a subscribed set that subtracts the active project swings between "one project" and "none"
    // on every change of resolved navigation target — including the brief `undefined` a dock rebuild
    // produces — re-subscribing everything on each swing
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
      webViewDefinition('editor', { projectId: 'activeProject' }),
      webViewDefinition('panel', { projectId: 'otherProject' }),
    ]);
    getProjectDataProvider.mockImplementation(async (_interface: string, projectId: string) =>
      pdpWithBooks(booksPresentFlags(66), projectId),
    );

    const initialProps: { activeProjectId: string | undefined } = {
      activeProjectId: 'activeProject',
    };
    const { result, rerender } = renderHook(
      ({ activeProjectId }: { activeProjectId: string | undefined }) =>
        useOpenProjectBookIds(activeProjectId),
      { initialProps },
    );
    await waitFor(() => expect(result.current).toEqual(['REV']));
    const callsAfterFirstRender = getProjectDataProvider.mock.calls.length;

    // The toggle a dock rebuild produces, and back again
    rerender({ activeProjectId: undefined });
    rerender({ activeProjectId: 'activeProject' });
    await waitFor(() => expect(result.current).toEqual(['REV']));

    expect(getProjectDataProvider.mock.calls.length).toBe(callsAfterFirstRender);
    expect(unsubscriberFor('otherProject')).not.toHaveBeenCalled();
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

    test('releases every subscription when it is disabled, and reuses the provider when re-enabled', async () => {
      vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
        webViewDefinition('resource', { projectId: 'resourceProject' }),
      ]);
      getProjectDataProvider.mockResolvedValue(
        pdpWithBooks(booksPresentFlags(66), 'resourceProject'),
      );

      const { result, rerender } = renderHook(
        ({ isEnabled }: { isEnabled: boolean }) =>
          useOpenProjectBookIds('activeProject', isEnabled),
        { initialProps: { isEnabled: true } },
      );
      await waitFor(() => expect(result.current).toEqual(['REV']));

      // The membership effect returns no cleanup, so a disabled hook has to release its live
      // subscriptions itself before it stops at the empty set.
      rerender({ isEnabled: false });
      await waitFor(() => expect(unsubscriberFor('resourceProject')).toHaveBeenCalledTimes(1));
      expect(result.current).toEqual([]);

      // Turning back on is a membership change like any other: the cached provider is reused and
      // only the subscription is opened again.
      rerender({ isEnabled: true });
      await waitFor(() => expect(result.current).toEqual(['REV']));
      expect(getProjectDataProvider).toHaveBeenCalledTimes(1);
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

    /** How many times the hook asked for `projectId`'s data provider. */
    function acquisitionsFor(projectId: string) {
      return getProjectDataProvider.mock.calls.filter(([, id]) => id === projectId);
    }

    /** Closes `projectId`'s view and reopens it beside `stays`, as a flapping panel does. */
    async function leaveAndRejoin(viewId: string, projectId: string) {
      closeOneResourceProject();
      await emitWebViewEvent(EVENT_NAME_ON_DID_UPDATE_WEB_VIEW);
      vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
        webViewDefinition('staysView', { projectId: 'stays' }),
        webViewDefinition(viewId, { projectId }),
      ]);
      await emitWebViewEvent(EVENT_NAME_ON_DID_UPDATE_WEB_VIEW);
    }

    /** Every lookup of `projectId` rejects, as for an id no factory ever serves. `stays` serves GEN. */
    function neverServe(projectId: string) {
      getProjectDataProvider.mockImplementation(async (_projectInterface, id) => {
        if (id !== projectId) return pdpWithBooks(booksPresentFlags(1), 'stays');
        throw new Error('still no factory');
      });
    }

    /**
     * `projectId`'s first lookup rejects (a factory that had not registered yet at a slow startup);
     * every later lookup serves REV. `stays` always serves GEN.
     */
    function failFirstLookupThenServe(projectId: string) {
      let lookups = 0;
      getProjectDataProvider.mockImplementation(async (_projectInterface, id) => {
        if (id !== projectId) return pdpWithBooks(booksPresentFlags(1), 'stays');
        lookups += 1;
        if (lookups === 1) throw new Error('wait for PDPF with platform.base threw! Timeout');
        return pdpWithBooks(booksPresentFlags(66), projectId);
      });
    }

    /**
     * `projectId`'s first lookup serves a provider whose network object has since been disposed (an
     * extension host restart), so its subscribe rejects; every later lookup serves REV. Returns the
     * dead provider so a test can count the subscribe attempts against it.
     */
    function serveDeadProviderThenServe(projectId: string) {
      const deadProvider = {
        subscribeSetting: vi.fn(async () => {
          throw new Error('network object has been disposed');
        }),
      };
      let lookups = 0;
      getProjectDataProvider.mockImplementation(async (_projectInterface, id) => {
        if (id !== projectId) return pdpWithBooks(booksPresentFlags(1), 'stays');
        lookups += 1;
        return lookups === 1 ? deadProvider : pdpWithBooks(booksPresentFlags(66), projectId);
      });
      return deadProvider;
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

    test("runs the closed project's own unsubscriber and leaves the survivor's subscription alone", async () => {
      openTwoResourceProjects();

      const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));
      await waitFor(() => expect(result.current).toEqual(['GEN', 'REV']));
      expect(getProjectDataProvider).toHaveBeenCalledTimes(2);

      closeOneResourceProject();
      await emitWebViewEvent(EVENT_NAME_ON_DID_CLOSE_WEB_VIEW);

      // Named per project, so this cannot be satisfied by the surviving project's teardown.
      await waitFor(() => expect(unsubscriberFor('closes')).toHaveBeenCalled());
      await waitFor(() => expect(result.current).toEqual(['GEN']));
      // Only the membership DIFF is acted on: the survivor keeps the subscription it already has.
      // Every data provider lookup fans out a project-metadata query to every PDP factory in every
      // process, so re-acquiring unchanged projects on each change is what turns a flapping
      // membership into a request storm.
      expect(acquisitionsFor('stays')).toHaveLength(1);
      expect(unsubscriberFor('stays')).not.toHaveBeenCalled();
      expect(acquisitionsFor('closes')).toHaveLength(1);
    });

    test('a project that leaves and rejoins is looked up once and only resubscribed', async () => {
      openTwoResourceProjects();
      const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));
      await waitFor(() => expect(result.current).toEqual(['GEN', 'REV']));

      // A web view that alternately declares and withdraws one project — the shape of the loop
      // seen live, where a panel republished its navigable project ids ~15 times a second.
      for (let flip = 0; flip < 5; flip += 1) {
        closeOneResourceProject();
        // Sequential on purpose: each flip must land before the next is emitted, as live events do.
        // eslint-disable-next-line no-await-in-loop
        await emitWebViewEvent(EVENT_NAME_ON_DID_UPDATE_WEB_VIEW);
        openTwoResourceProjects();
        // Same: the rejoin must be observed before the next departure.
        // eslint-disable-next-line no-await-in-loop
        await emitWebViewEvent(EVENT_NAME_ON_DID_UPDATE_WEB_VIEW);
      }

      await waitFor(() => expect(result.current).toEqual(['GEN', 'REV']));
      expect(acquisitionsFor('closes')).toHaveLength(1);
      expect(acquisitionsFor('stays')).toHaveLength(1);
      // Each departure still tears down the subscription for the project that left.
      expect(unsubscriberFor('closes')).toHaveBeenCalledTimes(5);
      expect(unsubscriberFor('stays')).not.toHaveBeenCalled();
    });

    test('a project whose provider lookup failed is not looked up again when it rejoins within the retry delay', async () => {
      vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
        webViewDefinition('staysView', { projectId: 'stays' }),
        webViewDefinition('ghostView', { projectId: 'ghost' }),
      ]);
      getProjectDataProvider.mockImplementation(async (_projectInterface, projectId) => {
        if (projectId === 'ghost') throw new Error('No project found with ID ghost');
        return pdpWithBooks(booksPresentFlags(1), 'stays');
      });

      const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));
      await waitFor(() => expect(result.current).toEqual(['GEN']));
      await waitFor(() => expect(acquisitionsFor('ghost')).toHaveLength(1));

      // Every failed lookup costs a full factory fan-out, and a flapping id (seen live: a resource
      // known under a second spelling of its id) rejoins many times a second, so a failure is not
      // retried until the delay has passed, whatever the reason for it.
      await leaveAndRejoin('ghostView', 'ghost');

      await waitFor(() => expect(result.current).toEqual(['GEN']));
      expect(acquisitionsFor('ghost')).toHaveLength(1);
    });

    test('looks a project up again when it rejoins after the retry delay has passed', async () => {
      vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
        webViewDefinition('staysView', { projectId: 'stays' }),
        webViewDefinition('slowView', { projectId: 'slow' }),
      ]);
      failFirstLookupThenServe('slow');

      const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));
      await waitFor(() => expect(result.current).toEqual(['GEN']));
      await waitFor(() => expect(acquisitionsFor('slow')).toHaveLength(1));

      const nowSpy = vi.spyOn(Date, 'now');
      try {
        nowSpy.mockReturnValue(Date.now() + FAILED_PROVIDER_LOOKUP_RETRY_MS);
        await leaveAndRejoin('slowView', 'slow');

        await waitFor(() => expect(result.current).toEqual(['GEN', 'REV']));
        expect(acquisitionsFor('slow')).toHaveLength(2);
      } finally {
        nowSpy.mockRestore();
      }
    });

    test('looks a project up again after the retry delay when subscribing to its provider failed', async () => {
      vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
        webViewDefinition('staysView', { projectId: 'stays' }),
        webViewDefinition('staleView', { projectId: 'stale' }),
      ]);
      const deadProvider = serveDeadProviderThenServe('stale');

      const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));
      await waitFor(() => expect(result.current).toEqual(['GEN']));
      await waitFor(() => expect(deadProvider.subscribeSetting).toHaveBeenCalled());
      const firstFailureAt = Date.now();

      // Flapping inside the delay reuses the cached provider (one failed subscribe per rejoin, no
      // new fan-out) and must not push the retry further out each time it fails again.
      for (let flap = 0; flap < 3; flap += 1) {
        // Sequential on purpose: each rejoin must settle before the next departure, as live events do.
        // eslint-disable-next-line no-await-in-loop
        await leaveAndRejoin('staleView', 'stale');
      }
      await waitFor(() => expect(deadProvider.subscribeSetting).toHaveBeenCalledTimes(4));
      expect(acquisitionsFor('stale')).toHaveLength(1);

      const nowSpy = vi.spyOn(Date, 'now');
      try {
        nowSpy.mockReturnValue(firstFailureAt + FAILED_PROVIDER_LOOKUP_RETRY_MS);
        await leaveAndRejoin('staleView', 'stale');

        await waitFor(() => expect(result.current).toEqual(['GEN', 'REV']));
        expect(acquisitionsFor('stale')).toHaveLength(2);
      } finally {
        nowSpy.mockRestore();
      }
    });

    test('shares one in-flight lookup with a project that leaves and rejoins before it resolves', async () => {
      const closesProvider = deferred<ReturnType<typeof pdpWithBooks>>();
      vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
        webViewDefinition('staysView', { projectId: 'stays' }),
        webViewDefinition('closesView', { projectId: 'closes' }),
      ]);
      getProjectDataProvider.mockImplementation((_projectInterface, projectId) =>
        projectId === 'stays'
          ? Promise.resolve(pdpWithBooks(booksPresentFlags(1), 'stays'))
          : closesProvider.promise,
      );

      const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));
      await waitFor(() => expect(result.current).toEqual(['GEN']));
      await waitFor(() => expect(acquisitionsFor('closes')).toHaveLength(1));

      await leaveAndRejoin('closesView', 'closes');
      const provider = pdpWithBooks(booksPresentFlags(66), 'closes');
      await act(async () => {
        closesProvider.resolve(provider);
      });

      await waitFor(() => expect(result.current).toEqual(['GEN', 'REV']));
      expect(acquisitionsFor('closes')).toHaveLength(1);
      expect(provider.subscribeSetting).toHaveBeenCalledTimes(1);
    });

    test('does not subscribe when the project leaves before its provider resolves', async () => {
      const closesProvider = deferred<ReturnType<typeof pdpWithBooks>>();
      vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
        webViewDefinition('staysView', { projectId: 'stays' }),
        webViewDefinition('closesView', { projectId: 'closes' }),
      ]);
      getProjectDataProvider.mockImplementation((_projectInterface, projectId) =>
        projectId === 'stays'
          ? Promise.resolve(pdpWithBooks(booksPresentFlags(1), 'stays'))
          : closesProvider.promise,
      );

      const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));
      await waitFor(() => expect(result.current).toEqual(['GEN']));
      await waitFor(() => expect(acquisitionsFor('closes')).toHaveLength(1));

      closeOneResourceProject();
      await emitWebViewEvent(EVENT_NAME_ON_DID_CLOSE_WEB_VIEW);
      const lateProvider = pdpWithBooks(booksPresentFlags(66), 'closes');
      await act(async () => {
        closesProvider.resolve(lateProvider);
      });

      expect(lateProvider.subscribeSetting).not.toHaveBeenCalled();
      expect(result.current).toEqual(['GEN']);
    });

    test('releases a subscription that settles after the project has left', async () => {
      const closesSubscription = deferred<ReturnType<typeof unsubscriberFor>>();
      let closesCallback: ((value: string) => void) | undefined;
      const closesProvider = {
        subscribeSetting: vi.fn((_key: string, callback: (value: string) => void) => {
          closesCallback = callback;
          return closesSubscription.promise;
        }),
      };
      vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
        webViewDefinition('staysView', { projectId: 'stays' }),
        webViewDefinition('closesView', { projectId: 'closes' }),
      ]);
      getProjectDataProvider.mockImplementation(async (_projectInterface, projectId) =>
        projectId === 'stays' ? pdpWithBooks(booksPresentFlags(1), 'stays') : closesProvider,
      );

      const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));
      await waitFor(() => expect(result.current).toEqual(['GEN']));
      await waitFor(() => expect(closesProvider.subscribeSetting).toHaveBeenCalled());

      closeOneResourceProject();
      await emitWebViewEvent(EVENT_NAME_ON_DID_CLOSE_WEB_VIEW);
      await act(async () => {
        closesCallback?.(booksPresentFlags(66));
        closesSubscription.resolve(unsubscriberFor('closes'));
      });

      await waitFor(() => expect(unsubscriberFor('closes')).toHaveBeenCalledTimes(1));
      expect(result.current).toEqual(['GEN']);
    });

    test('logs at debug level instead of throwing when an unsubscriber rejects', async () => {
      openTwoResourceProjects();
      unsubscriberFor('closes').mockRejectedValue(new Error('provider is gone'));

      const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));
      await waitFor(() => expect(result.current).toEqual(['GEN', 'REV']));

      closeOneResourceProject();
      await emitWebViewEvent(EVENT_NAME_ON_DID_CLOSE_WEB_VIEW);

      // A rejection that escaped here would fail the run as an unhandled rejection; the assertion
      // is that it was caught and reported where the other failure paths report.
      await waitFor(() =>
        expect(logger.debug).toHaveBeenCalledWith(expect.stringContaining('provider is gone')),
      );
      await waitFor(() => expect(result.current).toEqual(['GEN']));
    });

    test('logs at debug level when an unsubscriber reports that it did not unsubscribe', async () => {
      openTwoResourceProjects();
      unsubscriberFor('closes').mockResolvedValue(false);

      const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));
      await waitFor(() => expect(result.current).toEqual(['GEN', 'REV']));

      closeOneResourceProject();
      await emitWebViewEvent(EVENT_NAME_ON_DID_CLOSE_WEB_VIEW);

      await waitFor(() =>
        expect(logger.debug).toHaveBeenCalledWith(
          expect.stringMatching(/closes.*did not unsubscribe|did not unsubscribe.*closes/),
        ),
      );
    });

    describe('retrying a project that stays open', () => {
      // These drive the retry timer, so they run under fake timers and advance time explicitly
      // instead of polling with waitFor; every await below flushes the hook's promise chains.
      beforeEach(() => {
        vi.useFakeTimers();
      });
      afterEach(() => {
        vi.useRealTimers();
      });

      /** Lets the hook's in-flight promise chains settle without moving the clock. */
      async function flush() {
        await act(async () => {
          await vi.advanceTimersByTimeAsync(0);
        });
      }

      async function advance(ms: number) {
        await act(async () => {
          await vi.advanceTimersByTimeAsync(ms);
        });
      }

      test('a project whose lookup failed is looked up again after the delay without leaving the set', async () => {
        openTwoResourceProjects();
        failFirstLookupThenServe('closes');

        const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));
        await flush();
        expect(result.current).toEqual(['GEN']);
        expect(acquisitionsFor('closes')).toHaveLength(1);

        // Nothing joins or leaves. Just short of the delay: still no second lookup.
        await advance(FAILED_PROVIDER_LOOKUP_RETRY_MS - 1);
        expect(acquisitionsFor('closes')).toHaveLength(1);

        await advance(1);
        await flush();
        expect(acquisitionsFor('closes')).toHaveLength(2);
        expect(result.current).toEqual(['GEN', 'REV']);
      });

      test('a project whose subscribe failed is looked up again after the delay without leaving the set', async () => {
        openTwoResourceProjects();
        const deadProvider = serveDeadProviderThenServe('closes');

        const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));
        await flush();
        expect(deadProvider.subscribeSetting).toHaveBeenCalledTimes(1);
        expect(result.current).toEqual(['GEN']);

        await advance(FAILED_PROVIDER_LOOKUP_RETRY_MS);
        await flush();
        expect(acquisitionsFor('closes')).toHaveLength(2);
        expect(result.current).toEqual(['GEN', 'REV']);
      });

      test('a retry that fails again is retried after another delay, not sooner', async () => {
        openTwoResourceProjects();
        neverServe('closes');

        renderHook(() => useOpenProjectBookIds('activeProject'));
        await flush();
        expect(acquisitionsFor('closes')).toHaveLength(1);

        await advance(FAILED_PROVIDER_LOOKUP_RETRY_MS);
        await flush();
        expect(acquisitionsFor('closes')).toHaveLength(2);

        await advance(FAILED_PROVIDER_LOOKUP_RETRY_MS - 1);
        expect(acquisitionsFor('closes')).toHaveLength(2);
        await advance(1);
        await flush();
        expect(acquisitionsFor('closes')).toHaveLength(3);
      });

      test('a retry that fails again leaves the result untouched', async () => {
        openTwoResourceProjects();
        neverServe('closes');

        const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));
        await flush();
        expect(result.current).toEqual(['GEN']);
        const beforeRetry = result.current;

        // The project reports the same empty list again. A toolbar that re-derived its book list
        // on every failed retry would do so every delay for as long as the project stays open.
        await advance(FAILED_PROVIDER_LOOKUP_RETRY_MS);
        await flush();
        expect(acquisitionsFor('closes')).toHaveLength(2);
        expect(result.current).toBe(beforeRetry);
      });

      test('leaving the set cancels a pending retry', async () => {
        openTwoResourceProjects();
        neverServe('closes');

        renderHook(() => useOpenProjectBookIds('activeProject'));
        await flush();
        expect(acquisitionsFor('closes')).toHaveLength(1);

        closeOneResourceProject();
        await emitWebViewEvent(EVENT_NAME_ON_DID_CLOSE_WEB_VIEW);
        // The timer itself is released, not merely neutralised by its own guard.
        expect(vi.getTimerCount()).toBe(0);
        await advance(FAILED_PROVIDER_LOOKUP_RETRY_MS * 2);
        await flush();
        expect(acquisitionsFor('closes')).toHaveLength(1);
      });

      test('unmounting cancels a pending retry', async () => {
        openTwoResourceProjects();
        neverServe('closes');

        const { unmount } = renderHook(() => useOpenProjectBookIds('activeProject'));
        await flush();
        expect(acquisitionsFor('closes')).toHaveLength(1);

        unmount();
        expect(vi.getTimerCount()).toBe(0);
        await advance(FAILED_PROVIDER_LOOKUP_RETRY_MS * 2);
        await flush();
        expect(acquisitionsFor('closes')).toHaveLength(1);
      });

      test('an id that flaps inside the delay and then stays costs one fan-out per window', async () => {
        openTwoResourceProjects();
        neverServe('closes');

        renderHook(() => useOpenProjectBookIds('activeProject'));
        await flush();
        expect(acquisitionsFor('closes')).toHaveLength(1);

        // Three departures and rejoins in the first second: each rejoin reuses the failed entry
        // (no fan-out) and re-arms one timer for the remainder of the window.
        for (let flap = 0; flap < 3; flap += 1) {
          // Sequential on purpose: each rejoin must settle before the next departure, as live events do.
          // eslint-disable-next-line no-await-in-loop
          await leaveAndRejoin('closesView', 'closes');
          // Same: the clock has to move between flaps so they land at distinct times inside the window.
          // eslint-disable-next-line no-await-in-loop
          await advance(100);
        }
        expect(acquisitionsFor('closes')).toHaveLength(1);

        // The retry fires once, at the delay from the FIRST failure, not later.
        await advance(FAILED_PROVIDER_LOOKUP_RETRY_MS - 300);
        await flush();
        expect(acquisitionsFor('closes')).toHaveLength(2);
        await advance(1000);
        await flush();
        expect(acquisitionsFor('closes')).toHaveLength(2);
      });

      test('a cached provider that failed once and then subscribed fine is not discarded after the delay', async () => {
        openTwoResourceProjects();
        let subscribeAttempts = 0;
        const flakyProvider = {
          subscribeSetting: vi.fn(async (_key: string, callback: (value: string) => void) => {
            subscribeAttempts += 1;
            if (subscribeAttempts === 1) throw new Error('transient');
            callback(booksPresentFlags(66));
            return unsubscriberFor('closes');
          }),
        };
        getProjectDataProvider.mockImplementation(async (_projectInterface, projectId) =>
          projectId === 'stays' ? pdpWithBooks(booksPresentFlags(1), 'stays') : flakyProvider,
        );

        const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));
        await flush();
        expect(result.current).toEqual(['GEN']);
        expect(acquisitionsFor('closes')).toHaveLength(1);

        // A rejoin INSIDE the delay reuses the stamped entry and its cached provider, and this time
        // the subscribe succeeds. That success must clear the stamp on that same entry.
        await advance(1000);
        await leaveAndRejoin('closesView', 'closes');
        await flush();
        expect(result.current).toEqual(['GEN', 'REV']);
        expect(acquisitionsFor('closes')).toHaveLength(1);

        // Past the original expiry, another rejoin must keep the working provider: a stale stamp
        // would read as expired here and pay a fan-out for a provider that works.
        await advance(FAILED_PROVIDER_LOOKUP_RETRY_MS);
        await leaveAndRejoin('closesView', 'closes');
        await flush();
        expect(acquisitionsFor('closes')).toHaveLength(1);
        expect(result.current).toEqual(['GEN', 'REV']);
      });

      test("a superseded subscription's late failure does not mark the provider its replacement subscribed to", async () => {
        openTwoResourceProjects();
        const firstSubscribe = deferred<never>();
        let subscribeAttempts = 0;
        const provider = {
          subscribeSetting: vi.fn(async (_key: string, callback: (value: string) => void) => {
            subscribeAttempts += 1;
            if (subscribeAttempts === 1) return firstSubscribe.promise;
            callback(booksPresentFlags(66));
            return unsubscriberFor('closes');
          }),
        };
        getProjectDataProvider.mockImplementation(async (_projectInterface, projectId) =>
          projectId === 'stays' ? pdpWithBooks(booksPresentFlags(1), 'stays') : provider,
        );

        const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));
        await flush();
        expect(subscribeAttempts).toBe(1);

        // Leave while the first subscribe is still in flight; rejoin and subscribe fine on the same
        // cached provider; then the first subscribe rejects, late.
        await leaveAndRejoin('closesView', 'closes');
        await flush();
        expect(result.current).toEqual(['GEN', 'REV']);
        firstSubscribe.reject(new Error('network object has been disposed'));
        await flush();

        // Past the delay, a rejoin keeps the working provider: a stamp from the late rejection
        // would have read as expired and paid a fan-out.
        await advance(FAILED_PROVIDER_LOOKUP_RETRY_MS);
        await leaveAndRejoin('closesView', 'closes');
        await flush();
        expect(acquisitionsFor('closes')).toHaveLength(1);
        expect(result.current).toEqual(['GEN', 'REV']);
      });

      test('a project whose provider stops answering on rejoin no longer contributes its old books', async () => {
        openTwoResourceProjects();
        let closesSubscribes = 0;
        const provider = {
          subscribeSetting: vi.fn(async (_key: string, callback: (value: string) => void) => {
            closesSubscribes += 1;
            if (closesSubscribes > 1) throw new Error('network object has been disposed');
            callback(booksPresentFlags(66));
            return unsubscriberFor('closes');
          }),
        };
        getProjectDataProvider.mockImplementation(async (_projectInterface, projectId) =>
          projectId === 'stays' ? pdpWithBooks(booksPresentFlags(1), 'stays') : provider,
        );

        const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));
        await flush();
        expect(result.current).toEqual(['GEN', 'REV']);

        // Leave and rejoin: the cached provider is reused and its subscribe now fails, so the
        // project can no longer report its books and must stop contributing the old list.
        closeOneResourceProject();
        await emitWebViewEvent(EVENT_NAME_ON_DID_CLOSE_WEB_VIEW);
        openTwoResourceProjects();
        await emitWebViewEvent(EVENT_NAME_ON_DID_OPEN_WEB_VIEW);
        await flush();
        expect(result.current).toEqual(['GEN']);
      });
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

  describe('reading the dock layout', () => {
    test('reports no open projects and warns when the enumeration throws', async () => {
      // The read runs in a deferred callback, so an escaping throw is an unhandled error in a
      // scheduled task rather than a rejected promise anything is watching. The whole read is
      // inside the try for that reason, and this pins it: without the guard the hook does not
      // settle to an empty list, it blows up out of band.
      vi.mocked(getAllOpenWebViewDefinitionsSync).mockImplementation(() => {
        throw new Error('dock layout not registered');
      });

      const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));
      await waitFor(() => expect(logger.warn).toHaveBeenCalled());

      expect(result.current).toEqual([]);
      expect(vi.mocked(logger.warn).mock.calls[0][0]).toContain('dock layout not registered');
      expect(getProjectDataProvider).not.toHaveBeenCalled();
    });

    test('recovers on a later event once the enumeration succeeds', async () => {
      // A throw must not wedge the hook: the next web view event requests a fresh read.
      vi.mocked(getAllOpenWebViewDefinitionsSync).mockImplementationOnce(() => {
        throw new Error('dock layout not registered');
      });

      const { result } = renderHook(() => useOpenProjectBookIds('activeProject'));
      await waitFor(() => expect(logger.warn).toHaveBeenCalled());
      expect(result.current).toEqual([]);

      vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
        webViewDefinition('a', { projectId: 'resourceProject' }),
      ]);
      getProjectDataProvider.mockResolvedValue(
        pdpWithBooks(booksPresentFlags(66), 'resourceProject'),
      );
      await emitWebViewEvent(EVENT_NAME_ON_DID_OPEN_WEB_VIEW);

      await waitFor(() => expect(result.current).toEqual(['REV']));
    });

    test('a read requested before the hook is disabled cannot resurrect a closed project', async () => {
      // The deferred read is already queued when `isEnabled` flips to false. The disable path
      // clears the key, and with the subscriptions gone nothing would ever correct a read that
      // landed afterwards — so the disable revokes it. Without that, the key holds the pre-disable
      // membership, and re-enabling subscribes to a project that has since closed before the fresh
      // read replaces it.
      vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
        webViewDefinition('a', { projectId: 'closesWhileDisabled' }),
      ]);
      getProjectDataProvider.mockResolvedValue(
        pdpWithBooks(booksPresentFlags(66), 'closesWhileDisabled'),
      );

      const { result, rerender } = renderHook(
        ({ isEnabled }: { isEnabled: boolean }) =>
          useOpenProjectBookIds('activeProject', isEnabled),
        { initialProps: { isEnabled: true } },
      );
      await waitFor(() => expect(result.current).toEqual(['REV']));
      const acquisitionsWhileEnabled = getProjectDataProvider.mock.calls.length;

      // Request a read, then disable in the same tick — the read is still queued at this point
      const handlers = webViewEventHandlers.get(EVENT_NAME_ON_DID_UPDATE_WEB_VIEW);
      act(() => {
        handlers?.forEach((handler) => handler(undefined));
        rerender({ isEnabled: false });
      });
      await act(async () => {
        await Promise.resolve();
      });

      // The project closes while nothing is listening, then the hook is re-enabled
      vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([]);
      rerender({ isEnabled: true });
      await act(async () => {
        await Promise.resolve();
      });

      expect(result.current).toEqual([]);
      // No fresh acquisition for the project that closed: re-enabling started from no membership,
      // not from the revoked read's stale one
      expect(getProjectDataProvider.mock.calls.length).toBe(acquisitionsWhileEnabled);
    });
  });
});
