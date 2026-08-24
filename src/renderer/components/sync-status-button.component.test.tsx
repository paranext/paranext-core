import { readFileSync } from 'fs';
import path from 'path';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { getNetworkEvent } from '@shared/services/network.service';
import { notificationService } from '@shared/services/notification.service';
import { projectLookupService } from '@shared/services/project-lookup.service';
import type {
  ResultInfo,
  ResultStatus,
  SyncActivitySnapshot,
  SyncState,
} from 'paratext-bible-send-receive';
import {
  SyncStatusButton,
  LOCALIZED_STRING_KEYS,
  SYNC_CANCEL_UNAVAILABLE_MESSAGE_KEY,
  SYNC_VIEW_DETAILS_UNAVAILABLE_MESSAGE_KEY,
} from './sync-status-button.component';
import {
  SYNC_SEED_RETRY_INTERVAL_MS,
  SYNC_SEED_RETRY_WINDOW_MS,
} from '../hooks/use-sync-status.hook';

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%toolbar_sync%': 'Sync',
      '%toolbar_sync_cancel%': 'Test Cancel sync',
      '%toolbar_sync_cancelling%': 'Test Cancelling',
      '%toolbar_sync_open_status%': 'Test Sync status',
      '%toolbar_sync_popover_cancelled%': 'Test The last sync was cancelled.',
      '%toolbar_sync_popover_failed%': 'Test last sync did not finish',
      '%toolbar_sync_popover_idle%': 'Test no sync running',
      '%toolbar_sync_popover_synced%': 'Test last sync finished',
      '%toolbar_sync_popover_unknown%': 'Test status unavailable',
      '%toolbar_sync_status_cancelled%': 'Test Sync cancelled',
      '%toolbar_sync_status_failed%': 'Test Sync failed',
      '%toolbar_sync_status_unknown%': 'Test Sync status unavailable',
      '%toolbar_sync_status_synced%': 'Test Synced',
      '%toolbar_sync_status_syncing%': 'Test Syncing',
      '%toolbar_sync_status_syncing_project%': 'Test Syncing {projectName}',
      '%toolbar_sync_status_syncing_projects%': 'Test Syncing {count} projects',
      '%toolbar_sync_view_details%': 'Test View sync details',
      '%toolbar_sync_view_details_unavailable%': 'Test sync details unavailable',
    },
  ]),
}));

vi.mock('@shared/services/command.service', () => ({ sendCommand: vi.fn() }));

vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: vi.fn(() => vi.fn(() => vi.fn())),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

vi.mock('@shared/services/notification.service', () => ({
  notificationService: { send: vi.fn(async () => 'notification-id') },
}));

vi.mock('@shared/services/project-lookup.service', () => ({
  projectLookupService: { getMetadataForAllProjects: vi.fn(async () => []) },
}));

/**
 * Installs a `sendCommand` implementation from a per-command map.
 *
 * `sendCommand`'s per-command generic signature can't be satisfied by a single mock body, so the
 * cast lives here once rather than at every call site.
 */
const mockCommands = (handlers: Record<string, (() => unknown) | undefined>) => {
  vi.mocked(sendCommand).mockImplementation(
    // `sendCommand` resolves a different return type per command name, which no single mock body can
    // satisfy; typing it faithfully would mean reproducing the whole command map in the test.
    // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
    (async (commandName: string) => handlers[commandName]?.()) as any,
  );
};

/** Sync state the extension reports when nothing has happened yet this session. */
const IDLE_STATE: SyncState = {
  isSyncing: false,
  lastRequestedProjectIds: [],
  syncingProjectIds: [],
};

/** A completed sync's results in which every project has `resultStatus`. */
const resultsFor = (statusByProjectId: Record<string, ResultStatus>): SyncState['lastResults'] => ({
  sendReceiveDate: '2026-08-19T00:00:00Z',
  resultsInfo: Object.fromEntries(
    Object.entries(statusByProjectId).map(([projectId, resultStatus]) => [
      projectId,
      // Only `resultStatus` is read; ResultInfo carries many more fields the hook never touches.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      { id: projectId, resultStatus } as ResultInfo,
    ]),
  ),
});

/**
 * A completed sync in which some project reports a `resultStatus` this build does not recognize — a
 * status send/receive added after this build shipped, which `ResultStatus` cannot express by
 * definition. Kept as its own helper so the widening lives in one place and the well-formed
 * {@link completedState} stays fully typed.
 */
const completedStateWithUnknownStatus = (statusByProjectId: Record<string, string>): SyncState => ({
  isSyncing: false,
  lastResults: {
    sendReceiveDate: '2026-08-19T00:00:00Z',
    resultsInfo: Object.fromEntries(
      Object.entries(statusByProjectId).map(([projectId, resultStatus]) => [
        projectId,
        // These tests exist to cover statuses outside `ResultStatus`, so the entry cannot be built
        // to satisfy it; only `resultStatus` is read.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        { id: projectId, resultStatus } as unknown as ResultInfo,
      ]),
    ),
  },
  lastRequestedProjectIds: Object.keys(statusByProjectId),
  syncingProjectIds: [],
});

/** A snapshot of a session whose last sync completed with the given per-project outcomes. */
const completedState = (statusByProjectId: Record<string, ResultStatus>): SyncState => ({
  isSyncing: false,
  lastResults: resultsFor(statusByProjectId),
  lastRequestedProjectIds: Object.keys(statusByProjectId),
  syncingProjectIds: [],
});

/** Answers `getSyncState` with `state`, or rejects when given an Error. */
const mockSyncState = (state: SyncState | Error | undefined) => {
  mockCommands({
    'paratextBibleSendReceive.getSyncState': () => {
      if (state instanceof Error) throw state;
      return state;
    },
  });
};

/**
 * Answers `getSyncState` with `state` and `getSyncActivity` with `activity`, for the tests that
 * drive the activity signal rather than the claim. The two are seeded together because the derived
 * status is a union of both, so a test that pins one and leaves the other unmocked is really
 * asserting against `undefined`.
 */
const mockSyncStateAndActivity = (state: SyncState, activity: SyncActivitySnapshot) => {
  mockCommands({
    'paratextBibleSendReceive.getSyncState': () => state,
    'paratextBibleSendReceive.getSyncActivity': () => activity,
  });
};

/**
 * Captures the `onSyncActivityChanged` handler the component subscribes with, so a test can drive
 * the activity-only path — the Simple-mode startup sync, which has no claim behind it. Returns a
 * fire function; calling it before render throws rather than silently asserting nothing.
 */
const captureSyncActivityEvent = () => {
  let handler: ((activity: SyncActivitySnapshot) => void) | undefined;
  vi.mocked(getNetworkEvent).mockImplementation(
    // `getNetworkEvent` is generic over the event payload, so a mock returning different subscribe
    // functions per event name cannot be expressed in its signature.
    // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
    ((eventName: string) => {
      if (eventName === 'paratextBibleSendReceive.onSyncActivityChanged')
        return vi.fn((cb: (activity: SyncActivitySnapshot) => void) => {
          handler = cb;
          return vi.fn();
        });
      return vi.fn(() => vi.fn());
      // The assertion applies to the whole mock body above, so the directive has to sit here.
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
    }) as any,
  );
  return (activity: SyncActivitySnapshot) => {
    if (!handler) throw new Error('The component never subscribed to onSyncActivityChanged');
    const fire = handler;
    act(() => {
      fire(activity);
    });
  };
};

/**
 * Answers successive `getSyncState` calls from `states` in order, so a test can drive a sync whose
 * project set changes between reads. Passing a promise holds that read open until the test resolves
 * it; passing an Error rejects that one read. The final entry answers every call after it.
 */
const mockSyncStateSequence = (states: (SyncState | Promise<SyncState> | Error)[]) => {
  let callCount = 0;
  mockCommands({
    'paratextBibleSendReceive.getSyncState': () => {
      const state = states[Math.min(callCount, states.length - 1)];
      callCount += 1;
      if (state instanceof Error) throw state;
      return state;
    },
  });
};

/** A promise the test resolves by hand, for holding a `getSyncState` read open across an event. */
const deferredSyncState = () => {
  let resolveState: (state: SyncState) => void = () => {};
  const promise = new Promise<SyncState>((resolve) => {
    resolveState = resolve;
  });
  return { promise, resolve: (state: SyncState) => resolveState(state) };
};

/** Subscribes nothing, for the tests that never fire a sync-state event. */
const mockNoSyncStateEvents = () => {
  vi.mocked(getNetworkEvent).mockImplementation(
    // getNetworkEvent has a complex generic signature; one cast covers every use in this file.
    // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
    (() => vi.fn(() => vi.fn())) as any,
  );
};

/**
 * Captures the `onSyncStateChanged` handler the component subscribes with, so a test can drive a
 * sync transition. Returns a fire function; calling it before render throws rather than silently
 * asserting nothing.
 */
const captureSyncStateEvent = () => {
  let handler: ((event: { isSyncing: boolean }) => void) | undefined;
  vi.mocked(getNetworkEvent).mockImplementation(
    // `getNetworkEvent` is generic over the event payload, so a mock returning different subscribe
    // functions per event name cannot be expressed in its signature.
    // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
    ((eventName: string) => {
      if (eventName === 'paratextBibleSendReceive.onSyncStateChanged')
        return vi.fn((cb: (event: { isSyncing: boolean }) => void) => {
          handler = cb;
          return vi.fn();
        });
      return vi.fn(() => vi.fn());
      // The assertion applies to the whole mock body above, so the directive has to sit here.
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
    }) as any,
  );
  return (isSyncing: boolean) => {
    if (!handler) throw new Error('The component never subscribed to onSyncStateChanged');
    const fire = handler;
    act(() => {
      fire({ isSyncing });
    });
  };
};

type ProjectMetadataList = Awaited<
  ReturnType<typeof projectLookupService.getMetadataForAllProjects>
>;

const mockProjectNames = (namesById: Record<string, string>) => {
  vi.mocked(projectLookupService.getMetadataForAllProjects).mockImplementation(async (options) => {
    // `includeProjectIds` accepts a single id as well as a list.
    const requested = options?.includeProjectIds ?? [];
    const projectIds = typeof requested === 'string' ? [requested] : requested;
    const metadata: ProjectMetadataList = [];
    projectIds.forEach((projectId) => {
      const name = namesById[projectId];
      // Only `name` is read by the hook; the rest is the minimum ProjectMetadata requires, supplied
      // so the entry satisfies the real type rather than being asserted into it.
      if (name) metadata.push({ id: projectId, name, projectInterfaces: [], pdpFactoryInfo: {} });
    });
    return metadata;
  });
};

/**
 * Reset every mock's implementation, not just its recorded calls, before each test.
 * `vi.clearAllMocks()` alone leaves the last test's implementation installed, so a suite that never
 * sets one up inherits whatever ran before it — and passes or fails for reasons it never states.
 */
// Radix Tooltip uses ResizeObserver internally; jsdom doesn't provide it, so we stub a no-op
// implementation. The methods intentionally don't use `this` since they're empty stubs.
beforeAll(() => {
  global.ResizeObserver = class {
    // jsdom stub: empty no-op intentionally has no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    observe() {}
    // jsdom stub: empty no-op intentionally has no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    unobserve() {}
    // jsdom stub: empty no-op intentionally has no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    disconnect() {}
  };
});

beforeEach(() => {
  vi.resetAllMocks();
  mockNoSyncStateEvents();
  vi.mocked(notificationService.send).mockResolvedValue('notification-id');
  vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue([]);
});

describe('SyncStatusButton — startup state', () => {
  // The bug this seeding exists for: onSyncStateChanged fires on transitions only, so a sync that
  // started before this mounted would leave the button reading "Sync" until that sync ENDED.
  it('shows Syncing on mount when a sync is already running', async () => {
    mockSyncState({ isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: [] });

    render(<SyncStatusButton />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Syncing' })).toBeInTheDocument();
    });
  });

  it('shows Synced on mount when a sync completed successfully earlier this session', async () => {
    mockSyncState(completedState({ proj1: 'succeeded' }));

    render(<SyncStatusButton />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Synced' })).toBeInTheDocument();
    });
  });

  // A snapshot's `isSyncing: false` means "not running", which is also true before anything has
  // synced — so an untouched session must read Sync, not Synced.
  it('stays idle on mount when nothing has synced yet', async () => {
    mockSyncState(IDLE_STATE);

    render(<SyncStatusButton />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Sync' })).toBeInTheDocument();
    });
    expect(screen.queryByRole('button', { name: 'Test Synced' })).not.toBeInTheDocument();
  });

  // The seed is a snapshot of an earlier moment than any event that beats it back. Applying it
  // afterwards would revert the button to a state the sync has already left.
  it('does not let a slow startup read overwrite an event that already arrived', async () => {
    const fireSyncStateChanged = captureSyncStateEvent();
    const seed = deferredSyncState();
    mockSyncStateSequence([seed.promise, completedState({ proj1: 'succeeded' })]);

    render(<SyncStatusButton />);
    // The sync that was running when this mounted finishes before the seed read comes back.
    fireSyncStateChanged(false);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Synced' })).toBeInTheDocument();
    });

    await act(async () => {
      seed.resolve({ isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['proj1'] });
      await seed.promise;
    });

    // Still Synced — the stale snapshot must not resurrect the finished sync.
    expect(screen.getByRole('button', { name: 'Test Synced' })).toBeInTheDocument();
  });
});

// A cold start is the case the seed exists for, and it is also the case where the first read cannot
// succeed: send/receive may not have registered its commands yet. Giving up after one attempt would
// leave the status wrong for the whole session in exactly that scenario.
describe('SyncStatusButton — startup read retries', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('retries the startup read and applies the state once send/receive answers', async () => {
    mockSyncStateSequence([
      new Error('send/receive has not registered its commands yet'),
      new Error('send/receive has not registered its commands yet'),
      { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['proj-hnf'] },
    ]);
    mockProjectNames({ 'proj-hnf': 'HNF' });

    render(<SyncStatusButton />);

    // Nothing is known yet, so the button must not claim a status.
    await screen.findByRole('button', { name: 'Sync' });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_SEED_RETRY_INTERVAL_MS * 3);
    });

    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-button')).toHaveTextContent('HNF');
    });
  });

  it('reports the status as unavailable rather than idle once the retry window is spent', async () => {
    mockSyncState(new Error('send/receive is not in this build'));

    render(<SyncStatusButton />);

    await act(async () => {
      // Well past the retry window, so every attempt has been made and failed.
      await vi.advanceTimersByTimeAsync(70_000);
    });

    // Named for the unreadable status, not "Sync": the accessible name is what distinguishes this
    // state from `idle`, whose icon is the only other difference and is `aria-hidden`.
    fireEvent.click(await screen.findByRole('button', { name: 'Test Sync status unavailable' }));

    // "No sync is running" would be a positive claim resting on a read that never answered.
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-popover-status')).toHaveTextContent(
        'Test status unavailable',
      );
    });
  });

  it('stops retrying once an event has told it what is happening', async () => {
    // Counts only `getSyncState` calls, not every `sendCommand` call: the hook also runs a second,
    // independent seed for `getSyncActivity` (see `use-sync-status.hook.ts`) that keeps retrying on
    // its own schedule regardless of the claim's `onSyncStateChanged` event, so this assertion must
    // not count its calls or it would fail on that unrelated retry activity.
    const countSyncStateCalls = () =>
      vi
        .mocked(sendCommand)
        .mock.calls.filter((call) => call[0] === 'paratextBibleSendReceive.getSyncState').length;

    const fireSyncStateChanged = captureSyncStateEvent();
    mockSyncStateSequence([new Error('not registered yet')]);
    render(<SyncStatusButton />);
    await screen.findByRole('button', { name: 'Sync' });
    const callsBeforeEvent = countSyncStateCalls();

    fireSyncStateChanged(true);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Syncing' })).toBeInTheDocument();
    });
    const callsAfterEvent = countSyncStateCalls();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_SEED_RETRY_INTERVAL_MS * 5);
    });

    // The live event stream has taken over, so the claim seed has nothing left to retry for.
    expect(countSyncStateCalls()).toBe(callsAfterEvent);
    expect(callsAfterEvent).toBeGreaterThan(callsBeforeEvent);
  });

  // `idle` and `unknown` share one visible label, and both icons are `aria-hidden`, so without a
  // distinct accessible name a screen-reader user hears "Sync, button" for both — collapsing the one
  // distinction `unknown` exists to draw.
  it('distinguishes an unreadable status from idle in the accessible name', async () => {
    mockSyncStateSequence([new Error('send/receive is not answering')]);
    render(<SyncStatusButton />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_SEED_RETRY_WINDOW_MS + SYNC_SEED_RETRY_INTERVAL_MS);
    });

    expect(
      screen.getByRole('button', { name: 'Test Sync status unavailable' }),
    ).toBeInTheDocument();
  });
});

// The sharpest case: a user clicks Cancel and is told "Synced" with a green check. Claiming success
// requires evidence of success, which is what the per-project result statuses carry.
describe('SyncStatusButton — failed and cancelled syncs', () => {
  it('reports a failed sync as failed rather than synced', async () => {
    mockSyncState(completedState({ proj1: 'failed' }));

    render(<SyncStatusButton />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Sync failed' })).toBeInTheDocument();
    });
    expect(screen.queryByRole('button', { name: 'Test Synced' })).not.toBeInTheDocument();
  });

  // Send/receive reports a cancelled sync as a non-success result rather than as an outcome of its
  // own, so a user who clicked Cancel is otherwise answered with "Sync failed" in red — their own
  // request reported back to them as an error.
  it('reports a sync the user cancelled as cancelled rather than failed', async () => {
    const fireSyncStateChanged = captureSyncStateEvent();
    mockSyncStateSequence([
      { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a'] },
      completedState({ a: 'failed' }),
    ]);
    mockProjectNames({ a: 'AAA' });
    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByTestId('toolbar-sync-button'));
    fireEvent.click(await screen.findByTestId('toolbar-sync-cancel-button'));
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-cancel-button')).toHaveTextContent('Test Cancelling');
    });

    // The cancel takes effect: send/receive reports the project it did not finish as `failed`.
    fireSyncStateChanged(false);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Sync cancelled' })).toBeInTheDocument();
    });
    expect(screen.queryByRole('button', { name: 'Test Sync failed' })).not.toBeInTheDocument();
    expect(screen.getByTestId('toolbar-sync-popover-status')).toHaveTextContent(
      'Test The last sync was cancelled.',
    );
  });

  // The other half: a failure nobody asked for is still reported as a failure.
  it('still reports a failure the user did not ask for as failed', async () => {
    const fireSyncStateChanged = captureSyncStateEvent();
    mockSyncStateSequence([
      { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a'] },
      completedState({ a: 'failed' }),
    ]);
    mockProjectNames({ a: 'AAA' });
    render(<SyncStatusButton />);
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-button')).toHaveTextContent('AAA');
    });

    fireSyncStateChanged(false);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Sync failed' })).toBeInTheDocument();
    });
  });

  it('reports a failure when only one project of several did not succeed', async () => {
    mockSyncState(completedState({ ok1: 'succeeded', ok2: 'initialSend', bad: 'notUpgraded' }));

    render(<SyncStatusButton />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Sync failed' })).toBeInTheDocument();
    });
  });

  // `failed` is defined as "at least one project did not succeed", so one project reporting a
  // recognized failure is evidence enough on its own. A sibling carrying a status this build cannot
  // classify says nothing about that project, and must not blank out what the failure does say —
  // "Sync status unavailable" hides the View-details path the user actually needs here.
  it('reports a failure even when a sibling project carries an unrecognized status', async () => {
    mockSyncState(completedStateWithUnknownStatus({ a: 'failed', b: 'someFutureStatus' }));

    render(<SyncStatusButton />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Sync failed' })).toBeInTheDocument();
    });
  });

  // The reverse does not hold: `synced` needs every project evidenced, so one unclassifiable status
  // is enough to withhold the green check.
  it('does not claim success when one project carries an unrecognized status', async () => {
    mockSyncState(completedStateWithUnknownStatus({ a: 'succeeded', b: 'someFutureStatus' }));

    render(<SyncStatusButton />);

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Test Sync status unavailable' }),
      ).toBeInTheDocument();
    });
    expect(screen.queryByRole('button', { name: 'Test Synced' })).not.toBeInTheDocument();
  });

  it('still reports success when every project succeeded in any of the success forms', async () => {
    mockSyncState(completedState({ a: 'succeeded', b: 'initialSend', c: 'initialReceive' }));

    render(<SyncStatusButton />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Synced' })).toBeInTheDocument();
    });
  });

  // The event says a sync ended; only the snapshot says whether it worked. Claiming `synced` off the
  // event alone would put a green check on a cancelled or failed sync.
  it('does not claim success from the end-of-sync event before reading the outcome', async () => {
    const fireSyncStateChanged = captureSyncStateEvent();
    mockSyncStateSequence([
      { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a'] },
      completedState({ a: 'failed' }),
    ]);
    mockProjectNames({ a: 'AAA' });
    render(<SyncStatusButton />);
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-button')).toHaveTextContent('AAA');
    });

    fireSyncStateChanged(false);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Sync failed' })).toBeInTheDocument();
    });
    expect(screen.queryByRole('button', { name: 'Test Synced' })).not.toBeInTheDocument();
  });

  it('reports the outcome as unavailable when the end-of-sync read fails', async () => {
    const fireSyncStateChanged = captureSyncStateEvent();
    mockSyncStateSequence([
      { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a'] },
      new Error('send/receive stopped answering'),
    ]);
    mockProjectNames({ a: 'AAA' });
    render(<SyncStatusButton />);
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-button')).toHaveTextContent('AAA');
    });

    fireSyncStateChanged(false);

    // Not "Synced": nothing came back to justify a success claim.
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Test Sync status unavailable' }),
      ).toBeInTheDocument();
    });
    expect(screen.queryByRole('button', { name: 'Test Synced' })).not.toBeInTheDocument();
  });

  it('points at the sync status view for the detail behind a failure', async () => {
    mockSyncState(completedState({ proj1: 'failed' }));
    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByRole('button', { name: 'Test Sync failed' }));
    fireEvent.click(await screen.findByTestId('toolbar-sync-view-details-button'));

    // Per-project conflicts, failureMessage, warnings and errors exist nowhere else in the product.
    await waitFor(() => {
      expect(vi.mocked(sendCommand)).toHaveBeenCalledWith(
        'paratextBibleSendReceive.openSyncStatus',
      );
    });
  });

  // The popover is shown whenever send/receive is part of the build, which is true before its
  // commands finish registering — so a click can land while nothing is listening. Without a toast
  // the link just appears to do nothing.
  it('tells the user when the sync status view cannot be opened', async () => {
    mockCommands({
      'paratextBibleSendReceive.getSyncState': () => completedState({ proj1: 'failed' }),
      'paratextBibleSendReceive.openSyncStatus': () => {
        throw new Error('send/receive has not registered its commands yet');
      },
    });
    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByRole('button', { name: 'Test Sync failed' }));
    fireEvent.click(await screen.findByTestId('toolbar-sync-view-details-button'));

    await waitFor(() => {
      expect(vi.mocked(notificationService.send)).toHaveBeenCalledWith(
        expect.objectContaining({
          message: SYNC_VIEW_DETAILS_UNAVAILABLE_MESSAGE_KEY,
          severity: 'warning',
        }),
      );
    });
  });

  // Repeat clicks must replace the toast rather than stack copies of it, which is what the shared
  // notification id is for.
  it('replaces the unavailable toast rather than stacking one per click', async () => {
    mockCommands({
      'paratextBibleSendReceive.getSyncState': () => completedState({ proj1: 'failed' }),
      'paratextBibleSendReceive.openSyncStatus': () => {
        throw new Error('send/receive has not registered its commands yet');
      },
    });
    render(<SyncStatusButton />);

    const trigger = await screen.findByRole('button', { name: 'Test Sync failed' });
    fireEvent.click(trigger);
    fireEvent.click(await screen.findByTestId('toolbar-sync-view-details-button'));
    await waitFor(() => {
      expect(vi.mocked(notificationService.send)).toHaveBeenCalledTimes(1);
    });

    // The click closes the popover, so it has to be reopened to click through a second time.
    fireEvent.click(trigger);
    fireEvent.click(await screen.findByTestId('toolbar-sync-view-details-button'));

    await waitFor(() => {
      expect(vi.mocked(notificationService.send)).toHaveBeenCalledTimes(2);
    });
    const [[first], [second]] = vi.mocked(notificationService.send).mock.calls;
    expect(first.notificationId).toBeDefined();
    expect(second.notificationId).toBe(first.notificationId);
  });
});

describe('SyncStatusButton — project names', () => {
  it('names the single project being synced', async () => {
    mockSyncState({
      isSyncing: true,
      lastRequestedProjectIds: [],
      syncingProjectIds: ['proj-hnf'],
    });
    mockProjectNames({ 'proj-hnf': 'HNF' });

    render(<SyncStatusButton />);

    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-button')).toHaveTextContent('Test Syncing');
    });
    // The name is wrapped in bidi isolates, so match on the text rather than the exact string: an
    // RTL project name interpolated bare would reorder the sentence around it.
    expect(screen.getByTestId('toolbar-sync-button')).toHaveTextContent('HNF');
  });

  it('isolates the project name so an RTL name cannot reorder the label around it', async () => {
    mockSyncState({ isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['rtl'] });
    mockProjectNames({ rtl: 'مشروع' });

    render(<SyncStatusButton />);

    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-button')).toHaveTextContent('مشروع');
    });
    // U+2068 FIRST STRONG ISOLATE … U+2069 POP DIRECTIONAL ISOLATE around the interpolated name.
    expect(screen.getByTestId('toolbar-sync-button').textContent).toContain('⁨مشروع⁩');
  });

  it('counts the projects being synced when there is more than one', async () => {
    mockSyncState({
      isSyncing: true,
      lastRequestedProjectIds: [],
      syncingProjectIds: ['a', 'b', 'c'],
    });
    mockProjectNames({ a: 'AAA', b: 'BBB', c: 'CCC' });

    render(<SyncStatusButton />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Syncing 3 projects' })).toBeInTheDocument();
    });
  });

  // A Send/Receive build predating `syncingProjectIds` answers without it. Naming no project is
  // correct then; naming the wrong one (e.g. from lastRequestedProjectIds) is the bug this avoids.
  it('falls back to a bare Syncing label when the ids are absent', async () => {
    mockSyncState({
      isSyncing: true,
      // The previous sync's projects — must never be used to label this one.
      lastRequestedProjectIds: ['some-old-project'],
      syncingProjectIds: undefined,
    });

    render(<SyncStatusButton />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Syncing' })).toBeInTheDocument();
    });
  });

  it('falls back to the project id when its name cannot be resolved', async () => {
    mockSyncState({
      isSyncing: true,
      lastRequestedProjectIds: [],
      syncingProjectIds: ['known', 'unresolvable'],
    });
    mockProjectNames({ known: 'KNOWN' });

    render(<SyncStatusButton />);

    // Two projects are syncing, so the count label stands even though one name is unresolvable.
    fireEvent.click(await screen.findByRole('button', { name: 'Test Syncing 2 projects' }));

    // Asserting on the rendered list, not just the count: a fallback that produced an empty string
    // would keep the count right and still show the user a blank row.
    const list = await screen.findByTestId('toolbar-sync-popover-projects');
    expect(list).toHaveTextContent('KNOWN');
    expect(list).toHaveTextContent('unresolvable');
  });

  it('keeps every project named when the metadata lookup fails outright', async () => {
    mockSyncState({ isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a', 'b'] });
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockRejectedValue(
      new Error('no project data provider factories registered yet'),
    );

    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByRole('button', { name: 'Test Syncing 2 projects' }));

    const list = await screen.findByTestId('toolbar-sync-popover-projects');
    expect(list).toHaveTextContent('a');
    expect(list).toHaveTextContent('b');
  });

  // Claim order carries no meaning and can differ between reads of the SAME set, so an unsorted list
  // reshuffles under the user while the popover is open.
  it('sorts the project list so it stays stable across reads', async () => {
    mockSyncState({ isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['c', 'a'] });
    mockProjectNames({ a: 'Alpha', c: 'Charlie' });

    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByRole('button', { name: 'Test Syncing 2 projects' }));

    const items = within(await screen.findByTestId('toolbar-sync-popover-projects')).getAllByRole(
      'listitem',
    );
    expect(items.map((item) => item.textContent)).toEqual(['Alpha', 'Charlie']);
  });

  // Two projects can share a display name, and an unresolvable name falls back to the id — so the
  // name is not a safe React key.
  it('keys the project list on the id so two projects sharing a name both render', async () => {
    mockSyncState({
      isSyncing: true,
      lastRequestedProjectIds: [],
      syncingProjectIds: ['p1', 'p2'],
    });
    mockProjectNames({ p1: 'Shared Name', p2: 'Shared Name' });

    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByRole('button', { name: 'Test Syncing 2 projects' }));

    const items = within(await screen.findByTestId('toolbar-sync-popover-projects')).getAllByRole(
      'listitem',
    );
    expect(items).toHaveLength(2);
  });

  // The syncing set is deliberately cleared before each follow-up read (a project that has stopped
  // must not stay named while the read is in flight), so a re-read of the SAME set does re-resolve
  // names. What must not happen is the reverse: the set being treated as changed when it is not.
  it('treats a re-read of the same projects in a different claim order as unchanged', async () => {
    const fireSyncStateChanged = captureSyncStateEvent();
    mockSyncStateSequence([
      { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a', 'b'] },
      // Same set, fresh array, different claim order — exactly what the contract warns about.
      { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['b', 'a'] },
    ]);
    mockProjectNames({ a: 'AAA', b: 'BBB' });
    render(<SyncStatusButton />);
    await screen.findByRole('button', { name: 'Test Syncing 2 projects' });

    fireSyncStateChanged(true);

    // The label and the sorted list are identical before and after, so the reorder is invisible.
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Syncing 2 projects' })).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId('toolbar-sync-button'));
    const items = within(await screen.findByTestId('toolbar-sync-popover-projects')).getAllByRole(
      'listitem',
    );
    expect(items.map((item) => item.textContent)).toEqual(['AAA', 'BBB']);
  });
});

describe('SyncStatusButton — sync state events', () => {
  // The live path when a sync starts while the toolbar is already mounted: the event carries no
  // ids, so the names come from a follow-up read.
  it('names the projects of a sync that starts after it mounted', async () => {
    const fireSyncStateChanged = captureSyncStateEvent();
    mockSyncStateSequence([
      IDLE_STATE,
      { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['proj-hnf'] },
    ]);
    mockProjectNames({ 'proj-hnf': 'HNF' });
    render(<SyncStatusButton />);
    await screen.findByRole('button', { name: 'Sync' });

    fireSyncStateChanged(true);

    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-button')).toHaveTextContent('HNF');
    });
  });

  it('stops naming any project once the sync ends', async () => {
    const fireSyncStateChanged = captureSyncStateEvent();
    mockSyncStateSequence([
      { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['proj-hnf'] },
      completedState({ 'proj-hnf': 'succeeded' }),
    ]);
    mockProjectNames({ 'proj-hnf': 'HNF' });
    render(<SyncStatusButton />);
    await screen.findByTestId('toolbar-sync-popover-projects').catch(() => undefined);
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-button')).toHaveTextContent('HNF');
    });

    fireSyncStateChanged(false);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Synced' })).toBeInTheDocument();
    });
  });

  // A claim releasing while another still holds reports `isSyncing: true`, so the syncing set can
  // shrink without ever passing through "not syncing". Naming the project that just STOPPED is the
  // untruthfulness this indicator exists to remove.
  it('stops counting a project that drops out of a still-running sync', async () => {
    const fireSyncStateChanged = captureSyncStateEvent();
    const afterRelease = deferredSyncState();
    mockSyncStateSequence([
      { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a', 'b'] },
      afterRelease.promise,
    ]);
    mockProjectNames({ a: 'AAA', b: 'BBB' });
    render(<SyncStatusButton />);
    await screen.findByRole('button', { name: 'Test Syncing 2 projects' });

    // Project A's sync finishes while B's keeps running.
    fireSyncStateChanged(true);

    // While the read naming the new set is in flight, the button must not still count A.
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Syncing' })).toBeInTheDocument();
    });

    await act(async () => {
      afterRelease.resolve({
        isSyncing: true,
        lastRequestedProjectIds: [],
        syncingProjectIds: ['b'],
      });
      await afterRelease.promise;
    });

    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-button')).toHaveTextContent('BBB');
    });
  });

  // Guards the cross-sync leak: a read issued for one sync must never name a LATER sync's projects,
  // however late it resolves. Commands and events share one ordered connection today, so a read can
  // only carry a since-finished sync's ids if it was sent before the event that ended that sync —
  // making this unreachable in production. Pinned anyway so the hook does not silently depend on
  // that transport guarantee.
  it('never labels a new sync with the projects of the one before it', async () => {
    const fireSyncStateChanged = captureSyncStateEvent();
    const firstSyncRead = deferredSyncState();
    const endOfSyncRead = deferredSyncState();
    const secondSyncRead = deferredSyncState();
    mockSyncStateSequence([
      IDLE_STATE,
      firstSyncRead.promise,
      endOfSyncRead.promise,
      secondSyncRead.promise,
    ]);
    mockProjectNames({ old: 'OLDPROJ', fresh: 'FRESH' });
    render(<SyncStatusButton />);
    await screen.findByRole('button', { name: 'Sync' });

    // A sync of OLDPROJ starts and finishes, then a different sync starts — all while the read that
    // would have named OLDPROJ is still in flight.
    fireSyncStateChanged(true);
    fireSyncStateChanged(false);
    fireSyncStateChanged(true);

    // The superseded read lands now, after the event for the sync that replaced it.
    await act(async () => {
      firstSyncRead.resolve({
        isSyncing: true,
        lastRequestedProjectIds: [],
        syncingProjectIds: ['old'],
      });
      await firstSyncRead.promise;
    });
    expect(screen.getByTestId('toolbar-sync-button')).not.toHaveTextContent('OLDPROJ');

    await act(async () => {
      secondSyncRead.resolve({
        isSyncing: true,
        lastRequestedProjectIds: ['old'],
        syncingProjectIds: ['fresh'],
      });
      await secondSyncRead.promise;
    });

    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-button')).toHaveTextContent('FRESH');
    });
  });

  it('keeps the syncing status when the follow-up read fails, losing only the names', async () => {
    const fireSyncStateChanged = captureSyncStateEvent();
    mockSyncStateSequence([IDLE_STATE, new Error('send/receive stopped answering')]);
    render(<SyncStatusButton />);
    await screen.findByRole('button', { name: 'Sync' });

    fireSyncStateChanged(true);

    // The event alone already proves a sync is running, so the status stands without the names.
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Syncing' })).toBeInTheDocument();
    });
  });
});

describe('SyncStatusButton — popover and cancel', () => {
  it('opens a popover in place instead of navigating away', async () => {
    mockSyncState(IDLE_STATE);
    render(<SyncStatusButton />);
    const button = await screen.findByRole('button', { name: 'Sync' });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-popover-status')).toHaveTextContent(
        'Test no sync running',
      );
    });
    // The status itself is shown in place; the web view is reachable but not opened by the click.
    expect(vi.mocked(sendCommand)).not.toHaveBeenCalledWith(
      'paratextBibleSendReceive.openSyncStatus',
    );
  });

  it('lists the syncing projects and cancels the sync in one click', async () => {
    mockSyncState({
      isSyncing: true,
      lastRequestedProjectIds: [],
      syncingProjectIds: ['a', 'b'],
    });
    mockProjectNames({ a: 'AAA', b: 'BBB' });
    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByRole('button', { name: 'Test Syncing 2 projects' }));

    const list = await screen.findByTestId('toolbar-sync-popover-projects');
    expect(list).toHaveTextContent('AAA');
    expect(list).toHaveTextContent('BBB');

    fireEvent.click(screen.getByTestId('toolbar-sync-cancel-button'));

    await waitFor(() => {
      expect(vi.mocked(sendCommand)).toHaveBeenCalledWith('paratextBibleSendReceive.cancelSync');
    });
  });

  // `aria-disabled` rather than `disabled`: a real `disabled` on the button the user just activated
  // drops focus to <body>, and this popover is non-modal so nothing recaptures it.
  it('marks Cancel as disabled without removing it from the tab order', async () => {
    mockSyncState({ isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a'] });
    mockProjectNames({ a: 'AAA' });
    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByTestId('toolbar-sync-button'));
    const cancel = await screen.findByTestId('toolbar-sync-cancel-button');
    fireEvent.click(cancel);

    await waitFor(() => {
      expect(cancel).toHaveAttribute('aria-disabled', 'true');
    });
    expect(cancel).not.toBeDisabled();
  });

  it('does not send a second cancel while one is already in flight', async () => {
    mockSyncState({ isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a'] });
    mockProjectNames({ a: 'AAA' });
    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByTestId('toolbar-sync-button'));
    const cancel = await screen.findByTestId('toolbar-sync-cancel-button');
    fireEvent.click(cancel);
    await waitFor(() => {
      expect(cancel).toHaveAttribute('aria-disabled', 'true');
    });
    const cancelCallCount = vi
      .mocked(sendCommand)
      .mock.calls.filter(([name]) => name === 'paratextBibleSendReceive.cancelSync').length;

    fireEvent.click(cancel);

    expect(
      vi
        .mocked(sendCommand)
        .mock.calls.filter(([name]) => name === 'paratextBibleSendReceive.cancelSync'),
    ).toHaveLength(cancelCallCount);
  });

  // A rejected cancel while the sync is still running means the user has to be able to try again —
  // and has to be told the click did nothing.
  it('re-enables Cancel and tells the user when the cancel request is rejected', async () => {
    mockCommands({
      'paratextBibleSendReceive.getSyncState': () => ({
        isSyncing: true,
        lastRequestedProjectIds: [],
        syncingProjectIds: ['a'],
      }),
      'paratextBibleSendReceive.cancelSync': () => {
        throw new Error('send/receive is not answering');
      },
    });
    mockProjectNames({ a: 'AAA' });
    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByTestId('toolbar-sync-button'));
    fireEvent.click(await screen.findByTestId('toolbar-sync-cancel-button'));

    await waitFor(() => {
      expect(vi.mocked(notificationService.send)).toHaveBeenCalledWith({
        message: SYNC_CANCEL_UNAVAILABLE_MESSAGE_KEY,
        severity: 'warning',
        // A shared id, so repeat clicks against an unresponsive send/receive replace the toast
        // rather than stacking one per click.
        notificationId: expect.any(String),
      });
    });
    expect(screen.getByTestId('toolbar-sync-cancel-button')).toHaveAttribute(
      'aria-disabled',
      'false',
    );
  });

  // The re-enabled button above is what makes this reachable: without a shared id, a user clicking
  // Cancel repeatedly against an unresponsive send/receive collects one toast per click.
  it('reuses one notification id for repeated rejected cancels', async () => {
    mockCommands({
      'paratextBibleSendReceive.getSyncState': () => ({
        isSyncing: true,
        lastRequestedProjectIds: [],
        syncingProjectIds: ['a'],
      }),
      'paratextBibleSendReceive.cancelSync': () => {
        throw new Error('send/receive is not answering');
      },
    });
    mockProjectNames({ a: 'AAA' });
    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByTestId('toolbar-sync-button'));
    fireEvent.click(await screen.findByTestId('toolbar-sync-cancel-button'));
    await waitFor(() => {
      expect(vi.mocked(notificationService.send)).toHaveBeenCalledTimes(1);
    });
    fireEvent.click(screen.getByTestId('toolbar-sync-cancel-button'));
    await waitFor(() => {
      expect(vi.mocked(notificationService.send)).toHaveBeenCalledTimes(2);
    });

    const [[first], [second]] = vi.mocked(notificationService.send).mock.calls;
    expect(first.notificationId).toBeDefined();
    expect(second.notificationId).toBe(first.notificationId);
  });

  // A rejection does not prove the sync is still running: a sync that ended between render and click
  // rejects too. Saying "couldn't cancel" beside "the last sync finished" is the confusing pair.
  it('does not warn about a failed cancel when the sync has already finished', async () => {
    const fireSyncStateChanged = captureSyncStateEvent();
    let getSyncStateCalls = 0;
    // Held open so the sync can finish BETWEEN the click and the rejection, which is the whole
    // scenario: a cancel that rejects because there is no longer anything to cancel.
    let rejectCancel: ((reason: Error) => void) | undefined;
    mockCommands({
      'paratextBibleSendReceive.getSyncState': () => {
        getSyncStateCalls += 1;
        if (getSyncStateCalls === 1)
          return { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a'] };
        return completedState({ a: 'succeeded' });
      },
      'paratextBibleSendReceive.cancelSync': () =>
        new Promise((_resolve, reject) => {
          rejectCancel = reject;
        }),
    });
    mockProjectNames({ a: 'AAA' });
    render(<SyncStatusButton />);
    fireEvent.click(await screen.findByTestId('toolbar-sync-button'));

    // The cancel is really requested — the guard under test only runs on the rejection path.
    fireEvent.click(await screen.findByTestId('toolbar-sync-cancel-button'));
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-cancel-button')).toHaveTextContent('Test Cancelling');
    });

    // The sync finishes on its own, and only then does the cancel request come back rejected.
    fireSyncStateChanged(false);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Synced' })).toBeInTheDocument();
    });
    if (!rejectCancel) throw new Error('cancelSync was never called');
    rejectCancel(new Error('there is no sync to cancel'));

    await waitFor(() => {
      expect(vi.mocked(logger.warn)).toHaveBeenCalledWith(
        expect.stringContaining('could not cancel'),
      );
    });
    expect(vi.mocked(notificationService.send)).not.toHaveBeenCalled();
  });

  // A greyed-out button reads as "unavailable", not "your click was taken". The sync keeps reporting
  // `syncing` until send/receive reaches a stopping point, so the label has to say so meanwhile.
  it('says Cancelling after the cancel request is accepted', async () => {
    mockSyncState({ isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a'] });
    mockProjectNames({ a: 'AAA' });
    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByTestId('toolbar-sync-button'));
    fireEvent.click(await screen.findByTestId('toolbar-sync-cancel-button'));

    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-cancel-button')).toHaveTextContent('Test Cancelling');
    });
  });

  it('names the outcome rather than offering a bare Cancel', async () => {
    mockSyncState({ isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a'] });
    mockProjectNames({ a: 'AAA' });
    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByTestId('toolbar-sync-button'));

    // Inside a dismissible popover a bare "Cancel" reads as dismissing the popover.
    expect(await screen.findByTestId('toolbar-sync-cancel-button')).toHaveTextContent(
      'Test Cancel sync',
    );
  });

  // Reopening restores a Cancel abandoned after a rejection — but must not restore one that is still
  // pending, or the user gets an enabled button reading "Cancelling…" that fires a second request.
  it('does not re-arm Cancel on reopen while a cancel is still pending', async () => {
    mockSyncState({ isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a'] });
    mockProjectNames({ a: 'AAA' });
    render(<SyncStatusButton />);
    const trigger = await screen.findByTestId('toolbar-sync-button');

    fireEvent.click(trigger);
    fireEvent.click(await screen.findByTestId('toolbar-sync-cancel-button'));
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-cancel-button')).toHaveTextContent('Test Cancelling');
    });

    // Close and reopen while the sync is still running and the cancel is still pending.
    fireEvent.click(trigger);
    fireEvent.click(trigger);

    const cancel = await screen.findByTestId('toolbar-sync-cancel-button');
    expect(cancel).toHaveTextContent('Test Cancelling');
    expect(cancel).toHaveAttribute('aria-disabled', 'true');
  });

  // Overlapping syncs union, so `isSyncing: true` fires again for a NEW sync without the status ever
  // leaving 'syncing'. A Cancel spent on the previous sync would otherwise stay dead and mislabelled.
  it('re-arms Cancel when an overlapping sync takes over without the status leaving syncing', async () => {
    const fireSyncStateChanged = captureSyncStateEvent();
    mockSyncStateSequence([
      { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a'] },
      // Still syncing — but of a different project. The set changed without passing through idle.
      { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['b'] },
    ]);
    mockProjectNames({ a: 'AAA', b: 'BBB' });
    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByTestId('toolbar-sync-button'));
    fireEvent.click(await screen.findByTestId('toolbar-sync-cancel-button'));
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-cancel-button')).toHaveAttribute(
        'aria-disabled',
        'true',
      );
    });

    fireSyncStateChanged(true);

    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-cancel-button')).toHaveAttribute(
        'aria-disabled',
        'false',
      );
    });
    expect(screen.getByTestId('toolbar-sync-cancel-button')).toHaveTextContent('Test Cancel sync');
  });

  // The same sync re-reads its project set on every sync-state event, and `useSyncStatus` clears the
  // set before each read — so `[a,b] → [] → [a,b]` is what one unchanged sync looks like from here.
  // Re-arming on that would flip a pending "Cancelling…" back to an enabled "Cancel sync" while the
  // original request is still in flight.
  it('keeps Cancel pending when the same sync re-reads its own project set', async () => {
    const fireSyncStateChanged = captureSyncStateEvent();
    mockSyncStateSequence([
      { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a', 'b'] },
      // The same sync, re-read after the event: the set is cleared and then re-applied unchanged.
      { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a', 'b'] },
      // A genuinely different sync has taken over, without the status ever leaving `syncing`.
      { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['c'] },
    ]);
    mockProjectNames({ a: 'AAA', b: 'BBB', c: 'CCC' });
    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByTestId('toolbar-sync-button'));
    fireEvent.click(await screen.findByTestId('toolbar-sync-cancel-button'));
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-cancel-button')).toHaveTextContent('Test Cancelling');
    });

    fireSyncStateChanged(true);

    // The clear-then-reread has been through both transitions by the time the names are back.
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-button')).toHaveTextContent(
        'Test Syncing 2 projects',
      );
    });
    const cancel = screen.getByTestId('toolbar-sync-cancel-button');
    expect(cancel).toHaveTextContent('Test Cancelling');
    expect(cancel).toHaveAttribute('aria-disabled', 'true');

    // But a set that really did change is a different sync, and its Cancel has to be live.
    fireSyncStateChanged(true);

    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-cancel-button')).toHaveTextContent(
        'Test Cancel sync',
      );
    });
    expect(screen.getByTestId('toolbar-sync-cancel-button')).toHaveAttribute(
      'aria-disabled',
      'false',
    );
  });

  // `isSyncing: true` fires again as the syncing set SHRINKS, so one project of a multi-project sync
  // finishing before the others is not a new sync — it is the same one, still running. Re-arming
  // there flips a pending "Cancelling…" back to an armed "Cancel sync" mid-request, and a second
  // click fires a second `cancelSync`.
  it('keeps Cancel pending when a multi-project sync loses one of its projects', async () => {
    const fireSyncStateChanged = captureSyncStateEvent();
    mockSyncStateSequence([
      { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a', 'b'] },
      // Project A finished; B is still going. The same sync, with a smaller set.
      { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['b'] },
    ]);
    mockProjectNames({ a: 'AAA', b: 'BBB' });
    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByTestId('toolbar-sync-button'));
    fireEvent.click(await screen.findByTestId('toolbar-sync-cancel-button'));
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-cancel-button')).toHaveTextContent('Test Cancelling');
    });

    fireSyncStateChanged(true);

    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-button')).toHaveTextContent('BBB');
    });
    const cancel = screen.getByTestId('toolbar-sync-cancel-button');
    expect(cancel).toHaveTextContent('Test Cancelling');
    expect(cancel).toHaveAttribute('aria-disabled', 'true');
  });

  // The two signals `useSyncStatus` unions can report the same project in different casing, so a
  // casing flip is not a set change — and must not be read as a different sync taking over.
  it('keeps Cancel pending when the same project is re-reported in another casing', async () => {
    const fireSyncStateChanged = captureSyncStateEvent();
    mockSyncStateSequence([
      { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['proj1'] },
      { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['PROJ1'] },
    ]);
    mockProjectNames({ proj1: 'AAA', PROJ1: 'AAA' });
    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByTestId('toolbar-sync-button'));
    fireEvent.click(await screen.findByTestId('toolbar-sync-cancel-button'));
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-cancel-button')).toHaveTextContent('Test Cancelling');
    });

    fireSyncStateChanged(true);

    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-button')).toHaveTextContent('AAA');
    });
    expect(screen.getByTestId('toolbar-sync-cancel-button')).toHaveTextContent('Test Cancelling');
  });

  // The activity signal reports a sync as running before the backend has resolved which projects it
  // will touch, so `[] → ['proj1']` is one sync becoming knowable rather than a second sync taking
  // over. This is the Simple-mode startup sync — the path with no claim behind it — and re-arming
  // there would flip a pending "Cancelling…" back to an armed "Cancel sync" mid-request.
  it('keeps Cancel pending when the activity signal resolves its merge set mid-sync', async () => {
    const fireSyncActivityChanged = captureSyncActivityEvent();
    mockSyncStateAndActivity(IDLE_STATE, { isSyncing: true, projectIds: [] });
    mockProjectNames({ proj1: 'AAA' });
    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByTestId('toolbar-sync-button'));
    fireEvent.click(await screen.findByTestId('toolbar-sync-cancel-button'));
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-cancel-button')).toHaveTextContent('Test Cancelling');
    });

    // The same sync, now naming the projects it resolved.
    fireSyncActivityChanged({ isSyncing: true, projectIds: ['proj1'] });

    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-button')).toHaveTextContent('AAA');
    });
    const cancel = screen.getByTestId('toolbar-sync-cancel-button');
    expect(cancel).toHaveTextContent('Test Cancelling');
    expect(cancel).toHaveAttribute('aria-disabled', 'true');
  });

  // The counterpart to the test above: once a set IS known, a project appearing is still the
  // evidence that a different sync took over, and its Cancel has to go live again.
  it('re-arms Cancel when a new project joins an already-named activity sync', async () => {
    const fireSyncActivityChanged = captureSyncActivityEvent();
    mockSyncStateAndActivity(IDLE_STATE, { isSyncing: true, projectIds: ['proj1'] });
    mockProjectNames({ proj1: 'AAA', proj2: 'BBB' });
    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByTestId('toolbar-sync-button'));
    fireEvent.click(await screen.findByTestId('toolbar-sync-cancel-button'));
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-cancel-button')).toHaveTextContent('Test Cancelling');
    });

    fireSyncActivityChanged({ isSyncing: true, projectIds: ['proj2'] });

    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-cancel-button')).toHaveTextContent(
        'Test Cancel sync',
      );
    });
    expect(screen.getByTestId('toolbar-sync-cancel-button')).toHaveAttribute(
      'aria-disabled',
      'false',
    );
  });

  // `useTruncationTooltip` opens the tooltip only when the label really is clipped, which jsdom
  // never reports on its own — every element measures 0 wide. Stubbing the two measurements the hook
  // reads is what lets the truncation path be exercised at all.
  const stubLabelAsTruncated = (label: HTMLElement) => {
    Object.defineProperty(label, 'scrollWidth', { configurable: true, value: 400 });
    Object.defineProperty(label, 'clientWidth', { configurable: true, value: 100 });
  };

  // The tooltip is fully controlled, so Radix's own Escape handling never runs — without this the
  // tooltip cannot be dismissed at all while the pointer rests on the label (WCAG 1.4.13).
  it('closes the truncation tooltip on Escape and offers it again on a fresh hover', async () => {
    mockSyncState({ isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a'] });
    mockProjectNames({ a: 'A project with a very long name indeed' });
    render(<SyncStatusButton />);

    const button = await screen.findByTestId('toolbar-sync-button');
    await waitFor(() => {
      expect(button).toHaveTextContent('A project with a very long name indeed');
    });
    // The label span rather than the button: it is the node `useTruncationTooltip` measures, and its
    // text carries bidi isolation marks that make a text matcher the wrong way to reach it.
    const label = button.querySelector<HTMLElement>('span[class~="tw:truncate"]');
    if (!label) throw new Error('The sync button rendered no truncating label span');
    stubLabelAsTruncated(label);

    fireEvent.pointerEnter(button);
    await waitFor(() => {
      expect(screen.getAllByRole('tooltip').length).toBeGreaterThan(0);
    });

    fireEvent.keyDown(window, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    // Leaving and re-entering re-arms it, so Escape dismisses this reveal rather than the feature.
    fireEvent.pointerLeave(button);
    fireEvent.pointerEnter(button);

    await waitFor(() => {
      expect(screen.getAllByRole('tooltip').length).toBeGreaterThan(0);
    });
  });

  // The label carries a project name of any length, so the button has to be allowed to shrink and
  // truncate: a toolbar item that grows without bound pushes its neighbours off the bar.
  it('lets the label truncate instead of growing the toolbar item', async () => {
    mockSyncState({ isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a'] });
    mockProjectNames({ a: 'A project with a very long name indeed' });
    render(<SyncStatusButton />);

    const button = await screen.findByTestId('toolbar-sync-button');

    // The button variants set `shrink-0` by default; this must override it, keep no width floor, and
    // cap how wide a long project name can push it. (`[&_svg]:shrink-0` is a separate concern — it
    // guards the icons, not the button.)
    expect(button.classList.contains('tw:shrink-0')).toBe(false);
    expect(button.classList.contains('tw:shrink')).toBe(true);
    expect(button.classList.contains('tw:min-w-0')).toBe(true);
    expect(button.classList.contains('tw:max-w-[180px]')).toBe(true);
    await waitFor(() => {
      expect(within(button).getByText(/A project with a very long name indeed/)).toHaveClass(
        'tw:truncate',
      );
    });
  });
});

// A cross-origin sandboxed WebView swallows the pointerdown, so Radix's outside-press detection
// never fires and the popover would stay open over a view the user has already moved into. See the
// `Guidelines/Dismissal Patterns` Storybook page.
describe('SyncStatusButton — dismissal across a WebView boundary', () => {
  /**
   * Reports the two document-level signals the dismissal reads — whether this window still holds
   * focus, and which element holds it — without moving real focus.
   *
   * Real focus is deliberately NOT moved. Doing so also drives Radix's own focus-outside machinery,
   * and that machinery is exactly what a cross-origin sandboxed WebView defeats in the app: jsdom
   * has no such boundary, so a focus call there produces parent-document focus events that a real
   * WebView never delivers, and the popover would close for a reason the supplement had no part in.
   * Stubbing the two signals keeps the test about the supplement.
   */
  const mockFocus = ({ hasFocus, focusedEl }: { hasFocus: boolean; focusedEl: Element }) => {
    vi.spyOn(document, 'hasFocus').mockReturnValue(hasFocus);
    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(focusedEl);
  };

  /**
   * Stands in for a scripture-editor WebView: the frame element focus lands on, outside the
   * popover.
   */
  const addForeignWebView = () => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    return iframe;
  };

  afterEach(() => {
    // Spies here replace real document accessors, so they must be put back rather than just cleared.
    vi.restoreAllMocks();
    document.querySelectorAll('iframe').forEach((iframe) => iframe.remove());
  });

  it('dismisses the popover when focus moves into a WebView', async () => {
    mockSyncState(IDLE_STATE);
    render(<SyncStatusButton />);
    fireEvent.click(await screen.findByRole('button', { name: 'Sync' }));
    await screen.findByTestId('toolbar-sync-popover-status');

    mockFocus({ hasFocus: true, focusedEl: addForeignWebView() });
    // The only signal the parent document gets: its own window blurs while the page keeps focus.
    fireEvent.blur(window);

    await waitFor(() => {
      expect(screen.queryByTestId('toolbar-sync-popover-status')).not.toBeInTheDocument();
    });
  });

  // A plain window switch is not a move into a WebView, and dismissing on it would close the popover
  // every time the user glanced at another app or opened DevTools.
  it('stays open when the whole window loses focus', async () => {
    mockSyncState(IDLE_STATE);
    render(<SyncStatusButton />);
    fireEvent.click(await screen.findByRole('button', { name: 'Sync' }));
    await screen.findByTestId('toolbar-sync-popover-status');

    mockFocus({ hasFocus: false, focusedEl: addForeignWebView() });
    fireEvent.blur(window);

    expect(screen.getByTestId('toolbar-sync-popover-status')).toBeInTheDocument();
  });

  // Radix portals the content to document.body, so containment has to be measured against the
  // content node: measuring against the trigger would read the popover's own content as "outside"
  // and dismiss the popover the moment the user interacted with it.
  it('stays open when focus is inside its own portaled content', async () => {
    mockSyncState(IDLE_STATE);
    render(<SyncStatusButton />);
    fireEvent.click(await screen.findByRole('button', { name: 'Sync' }));
    const viewDetails = await screen.findByTestId('toolbar-sync-view-details-button');

    mockFocus({ hasFocus: true, focusedEl: viewDetails });
    fireEvent.blur(window);

    expect(screen.getByTestId('toolbar-sync-popover-status')).toBeInTheDocument();
  });
});

describe('SyncStatusButton — accessibility', () => {
  // The popover holds a live Cancel button, and `PopoverTitle` renders a plain `<div>` with no `id`
  // for `PopoverContent` to point `aria-labelledby` at — so without a label of its own a screen
  // reader announces "dialog" and nothing else (WCAG 4.1.2).
  it('gives the popover an accessible name', async () => {
    mockSyncState(IDLE_STATE);
    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByTestId('toolbar-sync-button'));

    expect(await screen.findByRole('dialog', { name: 'Test Sync status' })).toBeInTheDocument();
  });

  it('leaves the idle button named for the control rather than for a status', async () => {
    mockSyncState(IDLE_STATE);
    render(<SyncStatusButton />);

    expect(await screen.findByRole('button', { name: 'Sync' })).toBeInTheDocument();
  });

  // The status changes on its own, so without a live region a screen reader user learns nothing
  // unless they happen to focus the button.
  it('announces the status through a live region', async () => {
    mockSyncState({ isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a'] });
    mockProjectNames({ a: 'AAA' });
    render(<SyncStatusButton />);

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent('Test Syncing');
    });
  });

  // Announcing the button's own label would make a screen reader read "Syncing AAA" and then
  // "Syncing AAA, button" for one change, and would re-announce as each project name resolves.
  it('announces the status only, not the button label with its project names', async () => {
    mockSyncState({ isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a'] });
    mockProjectNames({ a: 'AAA' });
    render(<SyncStatusButton />);
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-button')).toHaveTextContent('AAA');
    });

    expect(screen.getByRole('status')).not.toHaveTextContent('AAA');
  });

  it('says nothing at all while nothing has happened', async () => {
    mockSyncState(IDLE_STATE);
    render(<SyncStatusButton />);

    await screen.findByRole('button', { name: 'Sync' });
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  // `useLocalizedStrings` seeds each value with its own key, so a region reading the label before
  // the strings load would speak a literal `%toolbar_sync_status_syncing%` aloud.
  it('stays silent until the localized strings have loaded', async () => {
    const { useLocalizedStrings } = await import('@renderer/hooks/papi-hooks');
    // Every value is its own key, which is exactly what the real hook seeds before strings load.
    const unloadedStrings = Object.fromEntries(LOCALIZED_STRING_KEYS.map((key) => [key, key]));
    vi.mocked(useLocalizedStrings).mockReturnValue([unloadedStrings, true]);
    mockSyncState({ isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: [] });

    render(<SyncStatusButton />);

    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-button')).toHaveTextContent(
        '%toolbar_sync_status_syncing%',
      );
    });
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  // Tailwind's reset strips list semantics in Safari, so VoiceOver stops announcing the list.
  it('keeps list semantics on the syncing-project list', async () => {
    mockSyncState({ isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a'] });
    mockProjectNames({ a: 'AAA' });
    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByTestId('toolbar-sync-button'));

    expect(await screen.findByTestId('toolbar-sync-popover-projects')).toHaveAttribute(
      'role',
      'list',
    );
  });
});

describe('SyncStatusButton — localization', () => {
  const readStrings = (file: string): Record<string, string> =>
    JSON.parse(readFileSync(path.join(__dirname, `../../../assets/localization/${file}`), 'utf8'));

  it('uses a message key that actually exists in the localization file', () => {
    // `PlatformNotification.message` is typed `string | LocalizeKey`, so a typo or a key later
    // renamed in en.json type-checks fine and reaches the user as literal `%key%` text in a toast.
    expect(readStrings('en.json')).toHaveProperty(SYNC_CANCEL_UNAVAILABLE_MESSAGE_KEY);
  });

  // Imported from the component rather than hand-copied: a duplicated list stops covering the
  // component the moment a key is added on one side only, which is the failure this test exists for.
  it('declares every localized string it renders in en.json', () => {
    const englishStrings = readStrings('en.json');

    LOCALIZED_STRING_KEYS.forEach((key) => {
      expect(englishStrings).toHaveProperty(key);
    });
  });

  it('declares every localized string it renders in es.json', () => {
    const spanishStrings = readStrings('es.json');

    LOCALIZED_STRING_KEYS.forEach((key) => {
      expect(spanishStrings).toHaveProperty(key);
    });
  });
});
