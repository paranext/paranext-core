// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ComponentType } from 'react';
import { useLocalProjects } from './use-local-projects.hook';

/*
 * Whether Home may claim the list is complete is decided here, not in the component: the web view
 * is what knows whether the send/receive server was reached, never reached, or absent from the
 * build entirely. `home.component.test.tsx` covers what the banner looks like once that decision is
 * made; these cover the decision.
 */

const { mockSendCommand, mockSendNotification, syncActivityEvents, syncQueueEvents } = vi.hoisted(
  () => {
    const createEvents = (): { handlers: ((payload: unknown) => void)[] } => ({
      handlers: [],
    });
    return {
      mockSendCommand: vi.fn(async (): Promise<unknown> => undefined),
      mockSendNotification: vi.fn(),
      // Handlers that subscribed to `onSyncActivityChanged`, so a test can emit the event.
      syncActivityEvents: createEvents(),
      // Handlers that subscribed to `onSyncQueueChanged`, so a test can emit the event.
      syncQueueEvents: createEvents(),
    };
  },
);

/** A subscribe function that records its handlers in `events`, as a network event would. */
function subscribeInto(events: { handlers: ((payload: unknown) => void)[] }) {
  return vi.fn((handler: (payload: unknown) => void) => {
    events.handlers.push(handler);
    return vi.fn(() => {
      events.handlers = events.handlers.filter((h) => h !== handler);
    });
  });
}

vi.mock('@papi/frontend', () => ({
  default: {
    commands: { sendCommand: mockSendCommand },
    notifications: { send: mockSendNotification },
    network: {
      getNetworkEvent: vi.fn((eventName: string) => {
        if (eventName === 'paratextBibleSendReceive.onSyncActivityChanged')
          return subscribeInto(syncActivityEvents);
        if (eventName === 'paratextBibleSendReceive.onSyncQueueChanged')
          return subscribeInto(syncQueueEvents);
        return vi.fn(() => vi.fn());
      }),
    },
  },
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

vi.mock('@papi/frontend/react', () => ({
  // Echo each requested key back as its own value, matching useLocalizedStrings' pre-resolution
  // behavior — every entry is always a string.
  useLocalizedStrings: (keys: string[]) => [
    Object.fromEntries(keys.map((key) => [key, key])),
    false,
  ],
  useDataProvider: vi.fn(() => undefined),
  useSetting: vi.fn((_key: string, defaultValue: unknown) => [defaultValue, vi.fn(), false]),
}));

vi.mock('platform-bible-react', async (importOriginal) => {
  const original = await importOriginal<typeof import('platform-bible-react')>();
  return {
    ...original,
    useEvent: vi.fn(),
    usePromise: vi.fn(() => [undefined, false]),
  };
});

vi.mock('./use-local-projects.hook', () => ({
  useLocalProjects: vi.fn(() => ({ localProjectsInfo: [], isLoadingLocalProjects: false })),
}));

/*
 * Stubbed so these tests assert the web view's decision rather than Home's rendering of it, and so
 * the retry timing below is the only asynchrony in play.
 */
vi.mock('./home.component', async (importOriginal) => {
  const original = await importOriginal<typeof import('./home.component')>();
  const { useState } = await import('react');
  return {
    // The real key list, so the web view still requests what Home actually renders.
    HOME_STRING_KEYS: original.HOME_STRING_KEYS,
    Home: ({
      remoteProjectsState,
      isServerListExpectedAfterSync,
      initialProjectResourceFilter,
      onProjectResourceFilterChange,
      onSendReceiveProject,
      onRemoveFromQueue,
      isSendReceiveInProgress,
      activeSendReceiveProjects,
      waitingProjectIds,
    }: {
      remoteProjectsState?: string;
      isServerListExpectedAfterSync?: boolean;
      initialProjectResourceFilter?: string;
      onProjectResourceFilterChange?: (filter: string) => void;
      onSendReceiveProject?: (projectId: string) => void | Promise<void>;
      onRemoveFromQueue?: (projectId: string) => void | Promise<void>;
      isSendReceiveInProgress?: boolean;
      activeSendReceiveProjects?: string[];
      waitingProjectIds?: readonly string[];
    }) => {
      // The real Home reads its initial filter once, into state, so a value that only arrives after
      // the first render never reaches it. Kept the same way here, or a regression that delivers
      // the preset late would pass.
      const [filterAtMount] = useState(initialProjectResourceFilter);
      // The real Home shows a rejection in its "Sync failed" alert; the stub records it instead.
      const [sendReceiveError, setSendReceiveError] = useState('');
      return (
        <div
          data-testid="home"
          data-remote-state={String(remoteProjectsState)}
          data-server-list-expected={String(!!isServerListExpectedAfterSync)}
          data-initial-filter={String(filterAtMount)}
          data-send-receive-in-progress={String(!!isSendReceiveInProgress)}
          data-active-projects={JSON.stringify(activeSendReceiveProjects ?? [])}
          data-waiting-projects={JSON.stringify(waitingProjectIds ?? [])}
          data-send-receive-error={sendReceiveError}
        >
          <button type="button" onClick={() => onProjectResourceFilterChange?.('resource')}>
            filter to resources
          </button>
          <button
            type="button"
            onClick={() => {
              setSendReceiveError('');
              Promise.resolve(onSendReceiveProject?.('RH2')).catch((e) =>
                setSendReceiveError(e instanceof Error ? e.message : String(e)),
              );
            }}
          >
            send/receive
          </button>
          <button type="button" onClick={() => onRemoveFromQueue?.('RH2')}>
            remove from queue
          </button>
        </div>
      );
    },
  };
});

/*
 * Collapses the real delay so an exhausted retry loop resolves within the test. The retry COUNT is
 * what these tests depend on, not the wall-clock spacing, so the operation still runs the same
 * number of times.
 */
vi.mock('platform-bible-utils', async (importOriginal) => {
  const original = await importOriginal<typeof import('platform-bible-utils')>();
  return {
    ...original,
    retryUntil: vi.fn(
      async (
        operation: (attemptNumber: number) => Promise<unknown>,
        isDone: (result: unknown) => boolean,
        options?: { maxAttempts?: number },
      ) => {
        // Mirrors the real helper's clamp, 1-based attempt number, and return-last-result-on-
        // exhaustion contract, so a change to any of those fails here rather than leaving these
        // tests passing against a contract production no longer has.
        const maxAttempts = Math.max(1, options?.maxAttempts ?? 1);
        let result: unknown;
        for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
          // Attempts are sequential by definition — the next one only happens because the previous
          // one did not settle, so they cannot be awaited in parallel.
          // eslint-disable-next-line no-await-in-loop
          result = await operation(attempt);
          if (isDone(result)) break;
        }
        return result;
      },
    ),
  };
});

// Must follow the vi.mock() calls so the module's assignment to globalThis.webViewComponent runs
// against the mock boundaries above.
// eslint-disable-next-line import/first
import './home.web-view';

/**
 * Stands in for the real `useWebViewState`, which reads the key out of the web view definition's
 * `state` and falls back to the caller's default. `state` is what the provider seeds from the open
 * options, so this is the seam the launch path travels through.
 */
function makeUseWebViewState(
  state: Record<string, unknown>,
  setState: (stateKey: string, value: unknown) => void = () => {},
) {
  return <T,>(stateKey: string, defaultStateValue: T): [T, (value: T) => void, () => void] => [
    // The state bag is untyped by nature — the hook's own signature is what assigns it a type.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    stateKey in state ? (state[stateKey] as T) : defaultStateValue,
    (value: T) => setState(stateKey, value),
    vi.fn(),
  ];
}

function getHomeWebView(): ComponentType<Record<string, unknown>> {
  // globalThis is a special interface; cast to a record to read the property the module added.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (globalThis as Record<string, unknown>).webViewComponent as ComponentType<
    Record<string, unknown>
  >;
}

// Mirrors the retry budget in `home.web-view.tsx`; the exhausted-retries test has to outlast it.
const SEND_RECEIVE_ATTEMPTS = 4;
const SEND_RECEIVE_RETRY_MS = 2000;

const IS_AVAILABLE = 'platformGetResources.isSendReceiveAvailable';
const GET_SHARED_PROJECTS = 'paratextBibleSendReceive.getSharedProjects';

/** Renders the web view and waits for it to settle on any state other than the initial `loading`. */
async function renderAndWaitForRemoteState() {
  const HomeWebView = getHomeWebView();
  render(<HomeWebView useWebViewState={makeUseWebViewState({})} />);

  await waitFor(() => {
    expect(screen.getByTestId('home')).not.toHaveAttribute('data-remote-state', 'loading');
  });

  return screen.getByTestId('home');
}

describe('HomeWebView send/receive availability', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('says the list is local-only when availability never resolves', async () => {
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === IS_AVAILABLE) throw new Error('extension host did not answer');
      return undefined;
    });

    expect(await renderAndWaitForRemoteState()).toHaveAttribute('data-remote-state', 'unknown');
  });

  it('stays silent when send/receive is simply absent from this build', async () => {
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === IS_AVAILABLE) return false;
      return undefined;
    });

    expect(await renderAndWaitForRemoteState()).toHaveAttribute('data-remote-state', 'absent');

    // Positive control on the negative assertion above: a settled `absent` is only meaningful if
    // the question was actually asked, and `absent` is also what an answer that never arrived
    // would have to be distinguished from.
    expect(mockSendCommand).toHaveBeenCalledWith(IS_AVAILABLE);
  });
});

/*
 * The defect this branch exists to prevent lives in the `getSharedProjects` catch, which is only
 * reachable once availability answers `true` — so these are the cases that pin the banner itself
 * rather than the give-up path around it.
 */
describe('HomeWebView shared project fetch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /** Answers availability `true` and hands `getSharedProjects` the given behavior. */
  function mockAvailableServer(getSharedProjects: () => Promise<unknown>) {
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === IS_AVAILABLE) return true;
      if (commandName === GET_SHARED_PROJECTS) return getSharedProjects();
      return undefined;
    });
  }

  it('says the list is local-only when the server never answers', async () => {
    mockAvailableServer(async () => {
      throw new Error('socket hang up');
    });

    // An unclassified failure is retried first, on the chance that send/receive simply has not
    // finished activating — so the settled answer is several real retry delays away.
    vi.useFakeTimers();
    try {
      const HomeWebView = getHomeWebView();
      render(<HomeWebView useWebViewState={makeUseWebViewState({})} />);

      // One delay at a time: each rejection schedules the next retry only after it settles, so a
      // single advance past the whole budget would run out of timers before they existed.
      for (let attempt = 0; attempt <= SEND_RECEIVE_ATTEMPTS; attempt += 1) {
        // Each iteration has to settle before the next timer exists, so these cannot run together.
        // eslint-disable-next-line no-await-in-loop
        await act(async () => {
          await vi.advanceTimersByTimeAsync(SEND_RECEIVE_RETRY_MS);
        });
      }

      expect(screen.getByTestId('home')).toHaveAttribute('data-remote-state', 'unreachable');
      // The retries themselves are the point of the delay this test sits through.
      expect(
        mockSendCommand.mock.calls.filter(([name]) => name === GET_SHARED_PROJECTS),
      ).toHaveLength(SEND_RECEIVE_ATTEMPTS);
    } finally {
      vi.useRealTimers();
    }
  });

  it('distinguishes a server that refused from one that could not be reached', async () => {
    // Verbatim from ParatextProjectSendReceiveService.cs — this exact text is what the shared
    // classifier matches on, and an approximation of it would silently fall to the retry path.
    mockAvailableServer(async () => {
      throw new Error('401 Unauthorized error while getting shared projects.');
    });

    // Not retried: the cause is settled, and a notification already names it alongside this.
    expect(await renderAndWaitForRemoteState()).toHaveAttribute('data-remote-state', 'unavailable');
  });

  it('claims nothing about the server while the fetch is still running', async () => {
    let resolveFetch: (value: unknown) => void = () => {};
    mockAvailableServer(
      async () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        }),
    );

    const HomeWebView = getHomeWebView();
    render(<HomeWebView useWebViewState={makeUseWebViewState({})} />);

    // `loading` is what holds the empty state back. Settling early tells a user whose projects are
    // all on the server that they have none.
    await waitFor(() => {
      expect(screen.getByTestId('home')).toHaveAttribute('data-remote-state', 'loading');
    });

    resolveFetch({});

    await waitFor(() => {
      expect(screen.getByTestId('home')).toHaveAttribute('data-remote-state', 'loaded');
    });
  });
});

/*
 * Every Get and Sync click is handed to the Send/Receive extension's sync queue, which starts it
 * right away or keeps it waiting for the next run. Nothing is refused because another sync runs.
 */
describe('HomeWebView requests through the sync queue', () => {
  const REQUEST_SYNC = 'paratextBibleSendReceive.requestSync';
  const REMOVE_FROM_SYNC_QUEUE = 'paratextBibleSendReceive.removeFromSyncQueue';
  const GET_SYNC_ACTIVITY = 'paratextBibleSendReceive.getSyncActivity';
  const GET_SYNC_QUEUE = 'paratextBibleSendReceive.getSyncQueue';
  const REMOVED_MESSAGE =
    'JSON-RPC Request error (-32000): Removed from the sync queue before it ran (SR_REMOVED)';

  beforeEach(() => {
    vi.clearAllMocks();
    syncActivityEvents.handlers = [];
    syncQueueEvents.handlers = [];
  });

  /** Answers availability `true` and hands each `requestSync` call to the given behavior. */
  function mockAvailableQueue(
    requestSync: () => Promise<unknown>,
    { waitingProjectIds = [] }: { waitingProjectIds?: string[] } = {},
  ) {
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === IS_AVAILABLE) return true;
      if (commandName === GET_SHARED_PROJECTS) return {};
      if (commandName === GET_SYNC_ACTIVITY) return { isSyncing: false, projectIds: [] };
      if (commandName === GET_SYNC_QUEUE) return { waitingProjectIds };
      if (commandName === REQUEST_SYNC) return requestSync();
      return undefined;
    });
  }

  const requestSyncCalls = () =>
    mockSendCommand.mock.calls.filter(([name]) => name === REQUEST_SYNC);

  /** Renders the web view settled and subscribed to both the activity and the queue events. */
  async function renderSubscribed() {
    const home = await renderAndWaitForRemoteState();
    await waitFor(() => {
      expect(syncActivityEvents.handlers.length).toBeGreaterThan(0);
      expect(syncQueueEvents.handlers.length).toBeGreaterThan(0);
    });
    return home;
  }

  async function emit(events: { handlers: ((payload: unknown) => void)[] }, payload: unknown) {
    await act(async () => {
      events.handlers.forEach((handler) => handler(payload));
    });
  }

  it('clicking Sync while another project syncs requests through the queue (no refusal)', async () => {
    mockAvailableQueue(() => new Promise(() => {}));
    await renderSubscribed();
    await emit(syncActivityEvents, { isSyncing: true, projectIds: ['RH3'] });

    fireEvent.click(screen.getByRole('button', { name: 'send/receive' }));

    await waitFor(() => {
      expect(requestSyncCalls()).toEqual([
        [REQUEST_SYNC, ['RH2'], 'home', { includeConnected: false }],
      ]);
    });
    // Nothing reaches the sync service directly any more.
    expect(
      mockSendCommand.mock.calls.filter(
        ([name]) => name === 'paratextBibleSendReceive.sendReceiveProjects',
      ),
    ).toHaveLength(0);
  });

  it('a project in the running run can be clicked again and is requested', async () => {
    const resolvers: ((value: unknown) => void)[] = [];
    mockAvailableQueue(
      () =>
        new Promise((resolve) => {
          resolvers.push(resolve);
        }),
    );
    const home = await renderSubscribed();
    const button = screen.getByRole('button', { name: 'send/receive' });

    fireEvent.click(button);
    await waitFor(() => {
      expect(JSON.parse(home.getAttribute('data-active-projects') ?? '[]')).toEqual(['RH2']);
    });
    await emit(syncActivityEvents, { isSyncing: true, projectIds: ['RH2'] });

    fireEvent.click(button);

    await waitFor(() => expect(requestSyncCalls()).toHaveLength(2));
    await act(async () => {
      resolvers.forEach((resolve) => resolve({}));
    });
    await emit(syncActivityEvents, { isSyncing: false, projectIds: [] });
    await waitFor(() => {
      expect(home).toHaveAttribute('data-active-projects', '[]');
      expect(home).toHaveAttribute('data-send-receive-in-progress', 'false');
    });
  });

  it("passes the queue's waiting projects to Home and follows the queue's changes", async () => {
    mockAvailableQueue(async () => ({}), { waitingProjectIds: ['RH4'] });
    const home = await renderSubscribed();
    await waitFor(() => expect(home).toHaveAttribute('data-waiting-projects', '["RH4"]'));

    await emit(syncQueueEvents, { waitingProjectIds: ['RH4', 'RH5'] });

    expect(home).toHaveAttribute('data-waiting-projects', '["RH4","RH5"]');
  });

  it('clicking a waiting row calls removeFromSyncQueue', async () => {
    mockAvailableQueue(async () => ({}), { waitingProjectIds: ['RH2'] });
    await renderSubscribed();

    fireEvent.click(screen.getByRole('button', { name: 'remove from queue' }));

    await waitFor(() => {
      expect(mockSendCommand).toHaveBeenCalledWith(REMOVE_FROM_SYNC_QUEUE, ['RH2']);
    });
  });

  it('a failed request shows the Home-wide error as before', async () => {
    mockAvailableQueue(async () => {
      throw new Error('Project is locked by another user');
    });
    const home = await renderSubscribed();

    fireEvent.click(screen.getByRole('button', { name: 'send/receive' }));

    await waitFor(() => {
      expect(home).toHaveAttribute('data-send-receive-error', 'Project is locked by another user');
    });
    expect(home).toHaveAttribute('data-active-projects', '[]');
  });

  it('a removed request ends quietly without the Sync failed alert', async () => {
    let rejectRequest: (reason: unknown) => void = () => {};
    mockAvailableQueue(
      () =>
        new Promise((_resolve, reject) => {
          rejectRequest = reject;
        }),
    );
    const home = await renderSubscribed();

    fireEvent.click(screen.getByRole('button', { name: 'send/receive' }));
    await waitFor(() => expect(requestSyncCalls()).toHaveLength(1));
    await waitFor(() => expect(home).toHaveAttribute('data-send-receive-in-progress', 'true'));

    await act(async () => {
      rejectRequest(new Error(REMOVED_MESSAGE));
    });

    await waitFor(() => {
      expect(home).toHaveAttribute('data-send-receive-in-progress', 'false');
    });
    expect(home).toHaveAttribute('data-active-projects', '[]');
    expect(home).toHaveAttribute('data-send-receive-error', '');
    expect(mockSendNotification).not.toHaveBeenCalled();
  });

  it('accepts a new request after the previous one failed', async () => {
    mockAvailableQueue(async () => {
      throw new Error('socket hang up');
    });
    const home = await renderSubscribed();
    const button = screen.getByRole('button', { name: 'send/receive' });

    fireEvent.click(button);
    await waitFor(() => {
      expect(requestSyncCalls()).toHaveLength(1);
      expect(home).toHaveAttribute('data-send-receive-in-progress', 'false');
    });

    fireEvent.click(button);
    await waitFor(() => expect(requestSyncCalls()).toHaveLength(2));
  });
});

describe('HomeWebView server list expected after a sync', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('expects the list only once availability is answered and the fetch is pending', async () => {
    let answerAvailability: (value: boolean) => void = () => {};
    let answerSharedProjects: (value: unknown) => void = () => {};
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === IS_AVAILABLE)
        return new Promise<boolean>((resolve) => {
          answerAvailability = resolve;
        });
      if (commandName === GET_SHARED_PROJECTS)
        return new Promise((resolve) => {
          answerSharedProjects = resolve;
        });
      return undefined;
    });
    const HomeWebView = getHomeWebView();
    render(<HomeWebView useWebViewState={makeUseWebViewState({})} />);
    const home = await screen.findByTestId('home');

    // Loading, but only because Send/Receive has not said whether it is available.
    expect(home).toHaveAttribute('data-remote-state', 'loading');
    expect(home).toHaveAttribute('data-server-list-expected', 'false');

    await act(async () => {
      answerAvailability(true);
    });
    await waitFor(() => {
      expect(home).toHaveAttribute('data-server-list-expected', 'true');
    });

    await act(async () => {
      answerSharedProjects({});
    });
    await waitFor(() => {
      expect(home).toHaveAttribute('data-remote-state', 'loaded');
    });
    expect(home).toHaveAttribute('data-server-list-expected', 'false');
  });
});

/*
 * A sync can be started somewhere other than Home (the Sync dialog, startup). Home learns of it from
 * the backend's sync activity and shows it, but it must not reload its lists for it: only Home's own
 * sync completing does that.
 */
describe('HomeWebView sync started elsewhere', () => {
  const REQUEST_SYNC = 'paratextBibleSendReceive.requestSync';
  const GET_SYNC_ACTIVITY = 'paratextBibleSendReceive.getSyncActivity';

  beforeEach(() => {
    vi.clearAllMocks();
    syncActivityEvents.handlers = [];
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === IS_AVAILABLE) return true;
      if (commandName === GET_SHARED_PROJECTS) return {};
      if (commandName === GET_SYNC_ACTIVITY) return { isSyncing: false, projectIds: [] };
      return undefined;
    });
  });

  const getSharedProjectsCallCount = () =>
    mockSendCommand.mock.calls.filter(([name]) => name === GET_SHARED_PROJECTS).length;

  const activeProjects = (home: HTMLElement): string[] =>
    JSON.parse(home.getAttribute('data-active-projects') ?? '[]');

  /** Emits a sync activity event to every subscriber, as the backend would. */
  async function emitSyncActivity(payload: unknown) {
    await act(async () => {
      syncActivityEvents.handlers.forEach((handler) => handler(payload));
    });
  }

  /** Renders the web view settled and subscribed to the sync activity event. */
  async function renderSubscribed() {
    const home = await renderAndWaitForRemoteState();
    await waitFor(() => {
      expect(syncActivityEvents.handlers.length).toBeGreaterThan(0);
    });
    return home;
  }

  it('reports a sync started elsewhere as in progress', async () => {
    const home = await renderSubscribed();
    expect(home).toHaveAttribute('data-send-receive-in-progress', 'false');

    await emitSyncActivity({ isSyncing: true, projectIds: [] });

    expect(home).toHaveAttribute('data-send-receive-in-progress', 'true');
    expect(activeProjects(home)).toEqual([]);
  });

  it('marks the rows the outside sync names', async () => {
    const home = await renderSubscribed();

    await emitSyncActivity({ isSyncing: true, projectIds: ['RH3'] });

    expect(activeProjects(home)).toContain('RH3');
  });

  it('passes the outside project ids in their normalized form', async () => {
    const home = await renderSubscribed();

    await emitSyncActivity({ isSyncing: true, projectIds: ['rh3'] });

    expect(activeProjects(home)).toEqual(['RH3']);
  });

  it("merges the outside project ids with Home's own, once each", async () => {
    let resolveSync: (value: unknown) => void = () => {};
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === IS_AVAILABLE) return true;
      if (commandName === GET_SHARED_PROJECTS) return {};
      if (commandName === GET_SYNC_ACTIVITY) return { isSyncing: false, projectIds: [] };
      if (commandName === REQUEST_SYNC)
        return new Promise((resolve) => {
          resolveSync = resolve;
        });
      return undefined;
    });
    const home = await renderSubscribed();

    fireEvent.click(screen.getByRole('button', { name: 'send/receive' }));
    await waitFor(() => {
      expect(activeProjects(home)).toEqual(['RH2']);
    });
    await emitSyncActivity({ isSyncing: true, projectIds: ['RH3', 'RH2'] });

    expect([...activeProjects(home)].sort()).toEqual(['RH2', 'RH3']);

    await act(async () => {
      resolveSync(undefined);
    });
  });

  it('holds the shared-projects fetch while an outside sync runs and refetches once when it ends', async () => {
    const home = await renderSubscribed();
    const callsBefore = getSharedProjectsCallCount();
    expect(callsBefore).toBeGreaterThan(0);

    await emitSyncActivity({ isSyncing: true, projectIds: ['RH3'] });
    expect(home).toHaveAttribute('data-send-receive-in-progress', 'true');
    // The request queues behind the sync, so none is made until it ends.
    expect(getSharedProjectsCallCount()).toBe(callsBefore);

    // Only the activity event announces the end: a startup or project-switch sync never emits
    // `onSyncStateChanged`.
    await emitSyncActivity({ isSyncing: false, projectIds: [] });
    expect(home).toHaveAttribute('data-send-receive-in-progress', 'false');
    await waitFor(() => {
      expect(getSharedProjectsCallCount()).toBe(callsBefore + 1);
    });
    // The local list keeps loading: only Home's own sync pauses it.
    expect(vi.mocked(useLocalProjects)).not.toHaveBeenCalledWith(
      expect.objectContaining({ enabled: false }),
    );
  });

  it('does not retry a failing shared-projects fetch into an outside sync', async () => {
    vi.useFakeTimers();
    try {
      mockSendCommand.mockImplementation(async (commandName: string) => {
        if (commandName === IS_AVAILABLE) return true;
        if (commandName === GET_SHARED_PROJECTS) throw new Error('socket hang up');
        if (commandName === GET_SYNC_ACTIVITY) return { isSyncing: false, projectIds: [] };
        return undefined;
      });
      const HomeWebView = getHomeWebView();
      render(<HomeWebView useWebViewState={makeUseWebViewState({})} />);
      await act(async () => {
        await vi.advanceTimersByTimeAsync(0);
      });
      expect(getSharedProjectsCallCount()).toBe(1);

      // A sync starts while the first attempt's retry is pending.
      await emitSyncActivity({ isSyncing: true, projectIds: [] });
      await act(async () => {
        await vi.advanceTimersByTimeAsync(SEND_RECEIVE_RETRY_MS * SEND_RECEIVE_ATTEMPTS);
      });
      expect(getSharedProjectsCallCount()).toBe(1);
      expect(screen.getByTestId('home')).not.toHaveAttribute('data-remote-state', 'unreachable');

      mockSendCommand.mockImplementation(async (commandName: string) => {
        if (commandName === IS_AVAILABLE) return true;
        if (commandName === GET_SHARED_PROJECTS) return {};
        return undefined;
      });
      await emitSyncActivity({ isSyncing: false, projectIds: [] });
      await act(async () => {
        await vi.advanceTimersByTimeAsync(0);
      });
      expect(getSharedProjectsCallCount()).toBe(2);
      expect(screen.getByTestId('home')).toHaveAttribute('data-remote-state', 'loaded');
    } finally {
      vi.useRealTimers();
    }
  });

  it('re-enables when the activity event says idle', async () => {
    const home = await renderSubscribed();
    await emitSyncActivity({ isSyncing: true, projectIds: ['RH3'] });
    expect(home).toHaveAttribute('data-send-receive-in-progress', 'true');

    await emitSyncActivity({ isSyncing: false, projectIds: [] });

    expect(home).toHaveAttribute('data-send-receive-in-progress', 'false');
    expect(activeProjects(home)).toEqual([]);
  });

  it('keeps the list loading through an outside sync that began mid-fetch, then loads it', async () => {
    let resolveFetch: (value: unknown) => void = () => {};
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === IS_AVAILABLE) return true;
      if (commandName === GET_SHARED_PROJECTS)
        return new Promise((resolve) => {
          resolveFetch = resolve;
        });
      if (commandName === GET_SYNC_ACTIVITY) return { isSyncing: false, projectIds: [] };
      return undefined;
    });
    const HomeWebView = getHomeWebView();
    render(<HomeWebView useWebViewState={makeUseWebViewState({})} />);
    const home = screen.getByTestId('home');
    await waitFor(() => {
      expect(home).toHaveAttribute('data-remote-state', 'loading');
      expect(syncActivityEvents.handlers.length).toBeGreaterThan(0);
    });

    await emitSyncActivity({ isSyncing: true, projectIds: [] });

    expect(home).toHaveAttribute('data-remote-state', 'loading');
    expect(home).toHaveAttribute('data-send-receive-in-progress', 'true');

    // The answer of the request that began before the sync is dropped: the list is asked for again
    // once the sync ends.
    await act(async () => {
      resolveFetch({});
    });
    expect(home).toHaveAttribute('data-remote-state', 'loading');

    await emitSyncActivity({ isSyncing: false, projectIds: [] });
    await waitFor(() => {
      expect(getSharedProjectsCallCount()).toBe(2);
    });
    await act(async () => {
      resolveFetch({});
    });
    await waitFor(() => {
      expect(home).toHaveAttribute('data-remote-state', 'loaded');
    });
    expect(home).toHaveAttribute('data-send-receive-in-progress', 'false');
  });
});

/*
 * The title bar's "More projects…" is asking "get me to one of my projects", so Home starts filtered
 * to projects on that path. The filter rides in the web view's `state`, which the provider sets from
 * an opener's preset; these pin that the web view reads it, falls back safely, and writes the user's
 * changes back.
 */
describe('HomeWebView filter preset', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSendCommand.mockImplementation(async () => undefined);
  });

  it('starts Home on the filter its state says it was launched with', async () => {
    const HomeWebView = getHomeWebView();
    render(
      <HomeWebView
        useWebViewState={makeUseWebViewState({ projectResourceFilter: 'paratextProject' })}
      />,
    );

    await waitFor(() => {
      expect(screen.getByTestId('home')).toHaveAttribute('data-initial-filter', 'paratextProject');
    });
  });

  it('starts Home on everything when nothing asked for a preset', async () => {
    const HomeWebView = getHomeWebView();
    render(<HomeWebView useWebViewState={makeUseWebViewState({})} />);

    // Positive control: the web view rendered, so it had every chance to preset the filter.
    await waitFor(() => {
      expect(screen.getByTestId('home')).toBeInTheDocument();
    });
    expect(screen.getByTestId('home')).toHaveAttribute('data-initial-filter', 'all');
  });

  it('starts Home on everything when its state carries a filter this build does not know', async () => {
    const HomeWebView = getHomeWebView();
    render(
      <HomeWebView
        useWebViewState={makeUseWebViewState({ projectResourceFilter: 'dictionary' })}
      />,
    );

    await waitFor(() => {
      expect(screen.getByTestId('home')).toHaveAttribute('data-initial-filter', 'all');
    });
  });

  it("writes the user's filter change back to its state", () => {
    // `openHome` compares the filter in state with the one a later caller asks for, so a change
    // that stayed inside Home would leave "More projects…" raising a widened list unreloaded.
    const setState = vi.fn();
    const HomeWebView = getHomeWebView();
    render(<HomeWebView useWebViewState={makeUseWebViewState({}, setState)} />);

    fireEvent.click(screen.getByRole('button', { name: 'filter to resources' }));

    expect(setState).toHaveBeenCalledWith('projectResourceFilter', 'resource');
  });
});
