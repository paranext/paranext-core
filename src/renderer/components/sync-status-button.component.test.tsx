import { readFileSync } from 'fs';
import path from 'path';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { sendCommand } from '@shared/services/command.service';
import { getNetworkEvent } from '@shared/services/network.service';
import { notificationService } from '@shared/services/notification.service';
import { projectLookupService } from '@shared/services/project-lookup.service';
import type { ResultInfo, ResultStatus, SyncState } from 'paratext-bible-send-receive';
import {
  SyncStatusButton,
  LOCALIZED_STRING_KEYS,
  SYNC_CANCEL_UNAVAILABLE_MESSAGE_KEY,
  SYNC_UNAVAILABLE_MESSAGE_KEY,
} from './sync-status-button.component';
import { SYNC_STATE_SEED_RETRY_INTERVAL_MS } from '../hooks/use-sync-status.hook';

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%toolbar_sync%': 'Sync',
      '%toolbar_sync_cancel%': 'Test Cancel sync',
      '%toolbar_sync_cancelling%': 'Test Cancelling',
      '%toolbar_sync_open_status%': 'Test Sync status',
      '%toolbar_sync_popover_failed%': 'Test last sync did not finish',
      '%toolbar_sync_popover_idle%': 'Test no sync running',
      '%toolbar_sync_popover_synced%': 'Test last sync finished',
      '%toolbar_sync_popover_unknown%': 'Test status unavailable',
      '%toolbar_sync_status_failed%': 'Test Sync failed',
      '%toolbar_sync_status_synced%': 'Test Synced',
      '%toolbar_sync_status_syncing%': 'Test Syncing',
      '%toolbar_sync_status_syncing_project%': 'Test Syncing {projectName}',
      '%toolbar_sync_status_syncing_projects%': 'Test Syncing {count} projects',
      '%toolbar_sync_status_unknown%': 'Test Sync status unavailable',
      '%toolbar_sync_view_details%': 'Test View sync details',
    },
  ]),
}));

vi.mock('@shared/services/command.service', () => ({ sendCommand: vi.fn() }));

vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: vi.fn(() => vi.fn(() => vi.fn())),
  // network-object.service subscribes to this at module load to clean up a departed window's
  // registrations, and this component's import graph reaches it
  onDidDisconnectClient: vi.fn(() => vi.fn()),
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

/** How many times the component has read the snapshot so far. */
const countSyncStateReads = () =>
  vi
    .mocked(sendCommand)
    .mock.calls.filter(([commandName]) => commandName === 'paratextBibleSendReceive.getSyncState')
    .length;

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
      // Matched case-insensitively, and answered with the id as `namesById` spells it — the real
      // service filters with `areProjectIdsEqual` and returns whichever casing the reporting factory
      // used, which is not necessarily the casing that was asked for.
      const entry = Object.entries(namesById).find(
        ([id]) => id.toUpperCase() === projectId.toUpperCase(),
      );
      if (!entry) return;
      const [metadataId, name] = entry;
      // Only `name` is read by the hook; the rest is the minimum ProjectMetadata requires, supplied
      // so the entry satisfies the real type rather than being asserted into it.
      metadata.push({ id: metadataId, name, projectInterfaces: [], pdpFactoryInfo: {} });
    });
    return metadata;
  });
};

/**
 * Reset every mock's implementation, not just its recorded calls, before each test.
 * `vi.clearAllMocks()` alone leaves the last test's implementation installed, so a suite that never
 * sets one up inherits whatever ran before it — and passes or fails for reasons it never states.
 */
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

  // Before the seed answers, nothing here knows whether a sync is running. "No sync is running" is
  // a positive claim, and the read has not earned it — during a cold start with a scheduled sync
  // already under way it is simply false.
  it('does not claim nothing is running before the startup read has answered', async () => {
    const seed = deferredSyncState();
    mockSyncStateSequence([seed.promise]);

    render(<SyncStatusButton />);
    fireEvent.click(await screen.findByRole('button', { name: 'Sync' }));

    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-popover-status')).toHaveTextContent(
        'Test status unavailable',
      );
    });
    expect(screen.getByTestId('toolbar-sync-popover-status')).not.toHaveTextContent(
      'Test no sync running',
    );

    // Once the read answers "nothing has synced", the honest idle claim is available.
    await act(async () => {
      seed.resolve(IDLE_STATE);
      await seed.promise;
    });
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-popover-status')).toHaveTextContent(
        'Test no sync running',
      );
    });
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
      await vi.advanceTimersByTimeAsync(SYNC_STATE_SEED_RETRY_INTERVAL_MS * 3);
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

    fireEvent.click(await screen.findByRole('button', { name: 'Sync' }));

    // "No sync is running" would be a positive claim resting on a read that never answered.
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-popover-status')).toHaveTextContent(
        'Test status unavailable',
      );
    });
  });

  // The retry window runs during startup, when the wall clock can be stepped (NTP). A wall-clock
  // deadline would look spent on the first failed read and skip the entire retry apparatus in the
  // one case it exists for.
  it('keeps retrying across a wall-clock jump past the retry window', async () => {
    const realDateNow = Date.now;
    // The FIRST reading is the one the hook would compute its deadline from; every reading after it
    // is stepped ten minutes ahead, which is the shape of an NTP correction landing mid-startup.
    let hasReadWallClock = false;
    vi.spyOn(Date, 'now').mockImplementation(() => {
      if (!hasReadWallClock) {
        hasReadWallClock = true;
        return realDateNow();
      }
      return realDateNow() + 10 * 60 * 1000;
    });
    mockSyncStateSequence([
      new Error('send/receive has not registered its commands yet'),
      { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['proj-hnf'] },
    ]);
    mockProjectNames({ 'proj-hnf': 'HNF' });

    render(<SyncStatusButton />);
    await screen.findByRole('button', { name: 'Sync' });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_STATE_SEED_RETRY_INTERVAL_MS * 2);
    });

    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-button')).toHaveTextContent('HNF');
    });
  });

  it('stops retrying once an event has told it what is happening', async () => {
    const fireSyncStateChanged = captureSyncStateEvent();
    mockSyncStateSequence([new Error('not registered yet')]);
    render(<SyncStatusButton />);
    await screen.findByRole('button', { name: 'Sync' });
    const callsBeforeEvent = vi.mocked(sendCommand).mock.calls.length;

    fireSyncStateChanged(true);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Syncing' })).toBeInTheDocument();
    });
    const callsAfterEvent = vi.mocked(sendCommand).mock.calls.length;

    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_STATE_SEED_RETRY_INTERVAL_MS * 5);
    });

    // The live event stream has taken over, so the seed has nothing left to retry for.
    expect(vi.mocked(sendCommand).mock.calls.length).toBe(callsAfterEvent);
    expect(callsAfterEvent).toBeGreaterThan(callsBeforeEvent);
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

  // The green check rests entirely on every entry's `resultStatus`, and "not a failure" is how a
  // MISSING one reads. A snapshot we cannot read reports `unknown`, never success.
  it('reports unknown rather than synced when a result entry has no resultStatus', async () => {
    const fireSyncStateChanged = captureSyncStateEvent();
    mockSyncStateSequence([
      { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['proj1'] },
      {
        isSyncing: false,
        lastRequestedProjectIds: ['proj1'],
        syncingProjectIds: [],
        lastResults: {
          sendReceiveDate: '2026-08-23T00:00:00Z',
          // A result entry that arrived without `resultStatus`. The declaration says it is always
          // there; this is wire data from another process, so the hook cannot take that on trust.
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          resultsInfo: { proj1: { id: 'proj1' } as ResultInfo },
        },
      },
    ]);
    render(<SyncStatusButton />);
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-button')).toHaveTextContent('Test Syncing');
    });

    fireSyncStateChanged(false);

    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-button')).toHaveTextContent('Sync');
    });
    expect(screen.queryByRole('button', { name: 'Test Synced' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('toolbar-sync-button'));
    expect(await screen.findByText('Test status unavailable')).toBeInTheDocument();
  });

  // Same seam, the other way in: `resultStatus` is present and a string, but outside the union. The
  // failure check is a membership test over three values, so an unrecognised seventh status would
  // fall through as a success and earn a green check on data this build cannot interpret.
  it('reports unknown rather than synced when a result entry has an unrecognised resultStatus', async () => {
    const fireSyncStateChanged = captureSyncStateEvent();
    mockSyncStateSequence([
      { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['proj1'] },
      {
        isSyncing: false,
        lastRequestedProjectIds: ['proj1'],
        syncingProjectIds: [],
        lastResults: {
          sendReceiveDate: '2026-08-24T00:00:00Z',
          resultsInfo: {
            // A status a later send/receive added and this build has never heard of, so it is not
            // in `ResultStatus` and can only come in through `unknown` — exactly the shape the wire
            // can carry and the type cannot.
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            proj1: { id: 'proj1', resultStatus: 'quicheLorraine' } as unknown as ResultInfo,
          },
        },
      },
    ]);
    render(<SyncStatusButton />);
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-button')).toHaveTextContent('Test Syncing');
    });

    fireSyncStateChanged(false);

    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-button')).toHaveTextContent('Sync');
    });
    expect(screen.queryByRole('button', { name: 'Test Synced' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('toolbar-sync-button'));
    expect(await screen.findByText('Test status unavailable')).toBeInTheDocument();
  });

  // A sync aborted or cancelled before its first project reported leaves no result entries at all.
  // `every` on an empty collection is vacuously true, so this is the shape that earns a green check
  // for a sync that finished nothing.
  it('reports unknown rather than synced when the completed sync produced no results', async () => {
    mockSyncState({
      isSyncing: false,
      lastRequestedProjectIds: ['proj1'],
      syncingProjectIds: [],
      lastResults: { sendReceiveDate: '2026-08-19T00:00:00Z', resultsInfo: {} },
    });

    render(<SyncStatusButton />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Sync failed' })).toBeInTheDocument();
    });
    expect(screen.queryByRole('button', { name: 'Test Synced' })).not.toBeInTheDocument();
  });

  it('reports a failure when only one project of several did not succeed', async () => {
    mockSyncState(completedState({ ok1: 'succeeded', ok2: 'initialSend', bad: 'notUpgraded' }));

    render(<SyncStatusButton />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Sync failed' })).toBeInTheDocument();
    });
  });

  it('still reports success when every project succeeded in any of the success forms', async () => {
    mockSyncState(completedState({ a: 'succeeded', b: 'initialSend', c: 'initialReceive' }));

    render(<SyncStatusButton />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Synced' })).toBeInTheDocument();
    });
  });

  // The event says a sync ended; only the snapshot says whether it worked. Claiming `synced` off the
  // event alone is what put a green check on a cancelled sync.
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
      expect(screen.getByRole('button', { name: 'Sync' })).toBeInTheDocument();
    });
    expect(screen.queryByRole('button', { name: 'Test Synced' })).not.toBeInTheDocument();
  });

  it('points at the sync status view for the detail behind a failure', async () => {
    mockCommands({
      'paratextBibleSendReceive.getSyncState': () => completedState({ proj1: 'failed' }),
      // The command answers with the id of the web view it opened.
      'paratextBibleSendReceive.openSyncStatus': () => 'sync-status-web-view',
    });
    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByRole('button', { name: 'Test Sync failed' }));
    fireEvent.click(await screen.findByTestId('toolbar-sync-view-details-button'));

    // Per-project conflicts, failureMessage, warnings and errors exist nowhere else in the product.
    await waitFor(() => {
      expect(vi.mocked(sendCommand)).toHaveBeenCalledWith(
        'paratextBibleSendReceive.openSyncStatus',
      );
    });
    expect(vi.mocked(notificationService.send)).not.toHaveBeenCalled();
  });

  // Unlike the rest of the popover this click leaves the renderer, so it can fail — and it is the
  // only route to the detail behind a failure. The popover has already closed by then, so failing
  // silently would show the user nothing at all.
  it('tells the user when the sync status view cannot be opened', async () => {
    mockCommands({
      'paratextBibleSendReceive.getSyncState': () => completedState({ proj1: 'failed' }),
      'paratextBibleSendReceive.openSyncStatus': () => {
        throw new Error('send/receive is not available');
      },
    });
    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByRole('button', { name: 'Test Sync failed' }));
    fireEvent.click(await screen.findByTestId('toolbar-sync-view-details-button'));

    await waitFor(() => {
      expect(vi.mocked(notificationService.send)).toHaveBeenCalledWith({
        message: SYNC_UNAVAILABLE_MESSAGE_KEY,
        severity: 'warning',
        // A shared id per message, so clicking again during a cold start replaces the toast
        // rather than stacking another identical copy.
        notificationId: 'toolbar-sync-unavailable',
      });
    });
  });

  // The command's declared `undefined` means it did not create the web view — a resolved promise,
  // but not a success, and just as invisible to the user as a rejection.
  it('tells the user when the sync status view reports it was not created', async () => {
    mockCommands({
      'paratextBibleSendReceive.getSyncState': () => completedState({ proj1: 'failed' }),
      'paratextBibleSendReceive.openSyncStatus': () => undefined,
    });
    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByRole('button', { name: 'Test Sync failed' }));
    fireEvent.click(await screen.findByTestId('toolbar-sync-view-details-button'));

    await waitFor(() => {
      expect(vi.mocked(notificationService.send)).toHaveBeenCalledWith({
        message: SYNC_UNAVAILABLE_MESSAGE_KEY,
        severity: 'warning',
        // A shared id per message, so clicking again during a cold start replaces the toast
        // rather than stacking another identical copy.
        notificationId: 'toolbar-sync-unavailable',
      });
    });
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

  // Sorting by name is what stops an open popover reshuffling; two projects sharing a name would
  // otherwise be left in the claim order the contract says carries no meaning.
  // Project ids are case-insensitive: `ProjectMetadata.id` keeps the casing of whichever factory
  // reported the project first, while the ids in a sync state come from C#, which canonicalizes to
  // upper case. Matching raw would miss silently and label the button with a raw id.
  it('names the project even when its metadata id differs only in case', async () => {
    mockSyncState({
      isSyncing: true,
      lastRequestedProjectIds: [],
      syncingProjectIds: ['ABC123'],
    });
    mockProjectNames({ abc123: 'HNF' });

    render(<SyncStatusButton />);

    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-button')).toHaveTextContent('HNF');
    });
    expect(screen.getByTestId('toolbar-sync-button')).not.toHaveTextContent('ABC123');
  });

  it('breaks name ties on project id so the order is fully determined', async () => {
    mockSyncState({
      isSyncing: true,
      lastRequestedProjectIds: [],
      syncingProjectIds: ['zeta', 'alpha'],
    });
    mockProjectNames({ zeta: 'Shared Name', alpha: 'Shared Name' });

    render(<SyncStatusButton />);
    fireEvent.click(await screen.findByTestId('toolbar-sync-button'));

    const items = within(await screen.findByTestId('toolbar-sync-popover-projects')).getAllByRole(
      'listitem',
    );
    // Same display name, so only the id decides: 'alpha' before 'zeta', not the claim order given.
    expect(items.map((item) => item.getAttribute('data-project-id'))).toEqual(['alpha', 'zeta']);
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
        notificationId: 'toolbar-sync-cancel-unavailable',
      });
    });
    expect(screen.getByTestId('toolbar-sync-cancel-button')).toHaveAttribute(
      'aria-disabled',
      'false',
    );
  });

  // A rejection does not prove the sync is still running: a sync that ended between render and click
  // rejects too. Saying "couldn't cancel" beside "the last sync finished" is the confusing pair.
  it('does not warn about a failed cancel when the sync has already finished', async () => {
    const fireSyncStateChanged = captureSyncStateEvent();
    let getSyncStateCalls = 0;
    mockCommands({
      'paratextBibleSendReceive.getSyncState': () => {
        getSyncStateCalls += 1;
        if (getSyncStateCalls === 1)
          return { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a'] };
        return completedState({ a: 'succeeded' });
      },
      'paratextBibleSendReceive.cancelSync': () => {
        throw new Error('there is no sync to cancel');
      },
    });
    mockProjectNames({ a: 'AAA' });
    render(<SyncStatusButton />);
    fireEvent.click(await screen.findByTestId('toolbar-sync-button'));
    await screen.findByTestId('toolbar-sync-cancel-button');

    // The sync finishes, then the (now pointless) cancel click is delivered.
    fireSyncStateChanged(false);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Synced' })).toBeInTheDocument();
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

  // Send/Receive derives `syncingProjectIds` from live, ref-counted per-project claims, and one
  // continuous `isSyncing: true` window spans however many overlapping claims the sync paths take
  // out — so a project can release and re-claim without a new sync starting. An id the cancel did
  // not cover therefore proves nothing, and re-arming on one would hand the user a live "Cancel
  // sync" while the cancel it already sent is still in flight.
  it('keeps Cancel pending when the claimed project set changes while still syncing', async () => {
    const fireSyncStateChanged = captureSyncStateEvent();
    mockSyncStateSequence([
      { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a'] },
      // Still syncing, now naming a project the cancel never covered. Not proof of a new sync.
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
      expect(screen.getByTestId('toolbar-sync-button')).toHaveTextContent('BBB');
    });
    const cancel = screen.getByTestId('toolbar-sync-cancel-button');
    expect(cancel).toHaveTextContent('Test Cancelling');
    expect(cancel).toHaveAttribute('aria-disabled', 'true');
  });

  // The one signal that genuinely settles a pending cancel: the sync it was aimed at is over.
  it('re-arms Cancel once the status leaves syncing', async () => {
    const fireSyncStateChanged = captureSyncStateEvent();
    mockSyncStateSequence([
      { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a'] },
      completedState({ a: 'succeeded' }),
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

    fireSyncStateChanged(false);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Test Synced/ })).toBeInTheDocument();
    });

    // A later sync starting finds Cancel armed again rather than stuck on the finished one.
    fireSyncStateChanged(true);
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-cancel-button')).toHaveAttribute(
        'aria-disabled',
        'false',
      );
    });
    expect(screen.getByTestId('toolbar-sync-cancel-button')).toHaveTextContent('Test Cancel sync');
  });

  // `useSyncStatus` blanks the ids before every follow-up read, so a single event walks the set
  // through ['a','b','c'] -> [] -> ['a','b']. None of that is a new sync, and re-arming on it would
  // hand the user an enabled "Cancel sync" for a cancel that is still in flight.
  it('keeps Cancel pending when a project drops out of the sync it was aimed at', async () => {
    const fireSyncStateChanged = captureSyncStateEvent();
    mockSyncStateSequence([
      { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a', 'b', 'c'] },
      // One project finished; the other two are still going. Same sync, smaller set.
      { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a', 'b'] },
    ]);
    mockProjectNames({ a: 'AAA', b: 'BBB', c: 'CCC' });
    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByTestId('toolbar-sync-button'));
    fireEvent.click(await screen.findByTestId('toolbar-sync-cancel-button'));
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-cancel-button')).toHaveTextContent('Test Cancelling');
    });

    fireSyncStateChanged(true);
    await waitFor(() => {
      expect(
        within(screen.getByTestId('toolbar-sync-popover-projects')).getAllByRole('listitem'),
      ).toHaveLength(2);
    });

    const cancel = screen.getByTestId('toolbar-sync-cancel-button');
    expect(cancel).toHaveTextContent('Test Cancelling');
    expect(cancel).toHaveAttribute('aria-disabled', 'true');
  });

  // The same sync simply re-reporting itself is the other half of the same trap: the blank between
  // the clear and the read is a set change, but it is not a different sync.
  it('keeps Cancel pending when the same sync re-reports itself', async () => {
    const fireSyncStateChanged = captureSyncStateEvent();
    mockSyncState({ isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a'] });
    mockProjectNames({ a: 'AAA' });
    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByTestId('toolbar-sync-button'));
    fireEvent.click(await screen.findByTestId('toolbar-sync-cancel-button'));
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-cancel-button')).toHaveTextContent('Test Cancelling');
    });

    const readsBefore = countSyncStateReads();
    fireSyncStateChanged(true);
    await waitFor(() => {
      expect(countSyncStateReads()).toBeGreaterThan(readsBefore);
    });
    // Let the re-read's state updates land before asserting nothing changed.
    await act(async () => {});

    const cancel = screen.getByTestId('toolbar-sync-cancel-button');
    expect(cancel).toHaveTextContent('Test Cancelling');
    expect(cancel).toHaveAttribute('aria-disabled', 'true');
  });

  // The blank window the two tests above dodge is also clickable: while the follow-up read is in
  // flight the popover shows the bare "Syncing" with a live Cancel. A cancel latched there names
  // nothing, so every id in the next read looks new — and the same sync would re-arm it.
  it('keeps Cancel pending when it was clicked while the id set was blank', async () => {
    const fireSyncStateChanged = captureSyncStateEvent();
    const heldRead = deferredSyncState();
    const syncingOfA: SyncState = {
      isSyncing: true,
      lastRequestedProjectIds: [],
      syncingProjectIds: ['a'],
    };
    // The seed answers, then the event's follow-up read is held open — that is the blank window.
    mockSyncStateSequence([syncingOfA, heldRead.promise, syncingOfA]);
    mockProjectNames({ a: 'AAA' });
    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByTestId('toolbar-sync-button'));
    await waitFor(() => {
      expect(
        within(screen.getByTestId('toolbar-sync-popover-projects')).getAllByRole('listitem'),
      ).toHaveLength(1);
    });

    fireSyncStateChanged(true);
    // No named project any more, but still syncing and still cancellable.
    await waitFor(() => {
      expect(screen.queryByTestId('toolbar-sync-popover-projects')).not.toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId('toolbar-sync-cancel-button'));
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-cancel-button')).toHaveTextContent('Test Cancelling');
    });

    // The held read answers with the sync that was already running — not a new one.
    await act(async () => {
      heldRead.resolve(syncingOfA);
    });

    const cancel = screen.getByTestId('toolbar-sync-cancel-button');
    expect(cancel).toHaveTextContent('Test Cancelling');
    expect(cancel).toHaveAttribute('aria-disabled', 'true');
  });

  // The label carries a project name of any length, so the button has to be allowed to shrink and
  // truncate: a toolbar item that grows without bound pushes its neighbours off the bar.
  it('lets the label truncate instead of growing the toolbar item', async () => {
    mockSyncState({ isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a'] });
    mockProjectNames({ a: 'A project with a very long name indeed' });
    render(<SyncStatusButton />);

    const button = await screen.findByTestId('toolbar-sync-button');

    // The button variants set `shrink-0` by default; this must override it, keep no width floor, and
    // cap how wide a long project name can push it. (`[&_svg]:shrink-0` stays — that guards the
    // icons, not the button.)
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

describe('SyncStatusButton — accessibility', () => {
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

  // A listener already told a sync started is left waiting forever if the sync ends unreadably and
  // the region says nothing. `unknown` is the outcome there, so it has to be announced.
  it('announces that the outcome is unavailable when a sync it reported ends unreadably', async () => {
    const fireSyncStateChanged = captureSyncStateEvent();
    mockSyncStateSequence([
      { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a'] },
      new Error('send/receive stopped answering'),
    ]);
    render(<SyncStatusButton />);
    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent('Test Syncing');
    });

    fireSyncStateChanged(false);

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent('Test Sync status unavailable');
    });
  });

  // The same `unknown` at startup is nobody's pending question — the control simply hasn't been
  // able to read anything yet, and announcing it would interrupt for no news.
  it('stays silent when the status is unavailable from the start', async () => {
    mockSyncState(new Error('send/receive is not available'));
    render(<SyncStatusButton />);

    await screen.findByRole('button', { name: 'Sync' });
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
    expect(readStrings('en.json')).toHaveProperty(SYNC_UNAVAILABLE_MESSAGE_KEY);
    expect(readStrings('es.json')).toHaveProperty(SYNC_CANCEL_UNAVAILABLE_MESSAGE_KEY);
    expect(readStrings('es.json')).toHaveProperty(SYNC_UNAVAILABLE_MESSAGE_KEY);
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
