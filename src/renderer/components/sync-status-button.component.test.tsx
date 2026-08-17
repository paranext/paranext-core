import { readFileSync } from 'fs';
import path from 'path';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { sendCommand } from '@shared/services/command.service';
import { getNetworkEvent } from '@shared/services/network.service';
import { notificationService } from '@shared/services/notification.service';
import { projectLookupService } from '@shared/services/project-lookup.service';
import type { SyncState } from 'paratext-bible-send-receive';
import { SyncStatusButton, SYNC_UNAVAILABLE_MESSAGE_KEY } from './sync-status-button.component';

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%general_cancel%': 'Test Cancel',
      '%toolbar_sync%': 'Sync',
      '%toolbar_sync_open_status%': 'Test Sync status',
      '%toolbar_sync_popover_idle%': 'Test no sync running',
      '%toolbar_sync_popover_synced%': 'Test last sync finished',
      '%toolbar_sync_status_synced%': 'Test Synced',
      '%toolbar_sync_status_syncing%': 'Test Syncing',
      '%toolbar_sync_status_syncing_project%': 'Test Syncing {projectName}',
      '%toolbar_sync_status_syncing_projects%': 'Test Syncing {count} projects',
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
  projectLookupService: { getMetadataForProject: vi.fn() },
}));

/** Sync state the extension reports when nothing has happened yet this session. */
const IDLE_STATE: SyncState = {
  isSyncing: false,
  lastRequestedProjectIds: [],
  syncingProjectIds: [],
};

/**
 * Answers `getSyncState` with `state` (or rejects when given an Error) and lets every other command
 * resolve undefined, matching the real `sendCommand`'s per-command return typing loosely enough for
 * a mock.
 */
const mockSyncState = (state: SyncState | Error | undefined) => {
  vi.mocked(sendCommand).mockImplementation(
    // sendCommand has a complex generic signature; cast is required for the mock implementation
    // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
    (async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.getSyncState') {
        if (state instanceof Error) throw state;
        return state;
      }
      return undefined;
      // sendCommand has a complex generic signature; cast is required for the mock implementation
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
    }) as any,
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
    // getNetworkEvent has a complex generic signature; cast is required for the mock implementation
    // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
    ((eventName: string) => {
      if (eventName === 'paratextBibleSendReceive.onSyncStateChanged')
        return vi.fn((cb: (event: { isSyncing: boolean }) => void) => {
          handler = cb;
          return vi.fn();
        });
      return vi.fn(() => vi.fn());
      // getNetworkEvent has a complex generic signature; cast is required for the mock implementation
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

const mockProjectNames = (namesById: Record<string, string>) => {
  vi.mocked(projectLookupService.getMetadataForProject).mockImplementation(async (projectId) => {
    const name = namesById[projectId];
    if (!name) throw new Error(`no metadata for ${projectId}`);
    // Only the display fields matter here; ProjectMetadata carries many more.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return { id: projectId, name } as Awaited<
      ReturnType<typeof projectLookupService.getMetadataForProject>
    >;
  });
};

describe('SyncStatusButton — startup state', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getNetworkEvent).mockImplementation(
      // getNetworkEvent has a complex generic signature; cast is required for the mock implementation
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      (() => vi.fn(() => vi.fn())) as any,
    );
  });

  // The bug this seeding exists for: onSyncStateChanged fires on transitions only, so a sync that
  // started before this mounted would leave the button reading "Sync" until that sync ENDED.
  it('shows Syncing on mount when a sync is already running', async () => {
    mockSyncState({ isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: [] });

    render(<SyncStatusButton />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Syncing' })).toBeInTheDocument();
    });
  });

  it('shows Synced on mount when a sync completed earlier this session', async () => {
    mockSyncState({
      isSyncing: false,
      // Only the presence of lastResults is read, never its contents, so an empty object is enough.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      lastResults: {} as SyncState['lastResults'],
      lastRequestedProjectIds: ['proj1'],
      syncingProjectIds: [],
    });

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

  it('stays idle when the state read fails rather than claiming a status it does not know', async () => {
    mockSyncState(new Error('send/receive not registered yet'));

    render(<SyncStatusButton />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Sync' })).toBeInTheDocument();
    });
  });

  // The seed is a snapshot of an earlier moment than any event that beats it back. Applying it
  // afterwards would revert the button to a state the sync has already left.
  it('does not let a slow startup read overwrite an event that already arrived', async () => {
    const fireSyncStateChanged = captureSyncStateEvent();
    let resolveSeed: (state: SyncState) => void = () => {};
    const seedPromise = new Promise<SyncState>((resolve) => {
      resolveSeed = resolve;
    });
    vi.mocked(sendCommand).mockImplementation(
      // sendCommand has a complex generic signature; cast is required for the mock implementation
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      (async (commandName: string) => {
        if (commandName === 'paratextBibleSendReceive.getSyncState') return seedPromise;
        return undefined;
        // sendCommand has a complex generic signature; cast is required for the mock implementation
        // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      }) as any,
    );

    render(<SyncStatusButton />);
    // The sync that was running when this mounted finishes before the seed read comes back.
    fireSyncStateChanged(false);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Synced' })).toBeInTheDocument();
    });

    await act(async () => {
      resolveSeed({ isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['proj1'] });
      await seedPromise;
    });

    // Still Synced — the stale snapshot must not resurrect the finished sync.
    expect(screen.getByRole('button', { name: 'Test Synced' })).toBeInTheDocument();
  });
});

describe('SyncStatusButton — project names', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('names the single project being synced', async () => {
    mockSyncState({
      isSyncing: true,
      lastRequestedProjectIds: [],
      syncingProjectIds: ['proj-hnf'],
    });
    mockProjectNames({ 'proj-hnf': 'HNF' });

    render(<SyncStatusButton />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Syncing HNF' })).toBeInTheDocument();
    });
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

  it('falls back to the project id when its name cannot be resolved, keeping the project count right', async () => {
    mockSyncState({
      isSyncing: true,
      lastRequestedProjectIds: [],
      syncingProjectIds: ['known', 'unknown'],
    });
    mockProjectNames({ known: 'KNOWN' });

    render(<SyncStatusButton />);

    // Two projects are syncing, so the count label stands even though one name is unresolvable.
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Syncing 2 projects' })).toBeInTheDocument();
    });
  });
});

describe('SyncStatusButton — popover and cancel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('opens a popover in place instead of sending a command', async () => {
    mockSyncState(IDLE_STATE);
    render(<SyncStatusButton />);
    const button = await screen.findByRole('button', { name: 'Sync' });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByTestId('toolbar-sync-popover-status')).toHaveTextContent(
        'Test no sync running',
      );
    });
    // The old button opened a separate sync status web view; a second sync surface is exactly what
    // a single truthful indicator cannot have.
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

  it('disables Cancel after one click so a second click cannot queue another request', async () => {
    mockSyncState({ isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a'] });
    mockProjectNames({ a: 'AAA' });
    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByRole('button', { name: 'Test Syncing AAA' }));
    const cancel = await screen.findByTestId('toolbar-sync-cancel-button');
    fireEvent.click(cancel);

    await waitFor(() => {
      expect(cancel).toBeDisabled();
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

  // A rejected cancel means the sync is still running, so the user has to be able to try again —
  // and has to be told the click did nothing.
  it('re-enables Cancel and tells the user when the cancel request is rejected', async () => {
    vi.mocked(sendCommand).mockImplementation(
      // sendCommand has a complex generic signature; cast is required for the mock implementation
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      (async (commandName: string) => {
        if (commandName === 'paratextBibleSendReceive.getSyncState')
          return { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: ['a'] };
        if (commandName === 'paratextBibleSendReceive.cancelSync')
          throw new Error('send/receive is not answering');
        return undefined;
        // sendCommand has a complex generic signature; cast is required for the mock implementation
        // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      }) as any,
    );
    mockProjectNames({ a: 'AAA' });
    render(<SyncStatusButton />);

    fireEvent.click(await screen.findByRole('button', { name: 'Test Syncing AAA' }));
    fireEvent.click(await screen.findByTestId('toolbar-sync-cancel-button'));

    await waitFor(() => {
      expect(vi.mocked(notificationService.send)).toHaveBeenCalledWith({
        message: SYNC_UNAVAILABLE_MESSAGE_KEY,
        severity: 'warning',
      });
    });
    expect(screen.getByTestId('toolbar-sync-cancel-button')).toBeEnabled();
  });

  it('uses a message key that actually exists in the localization file', () => {
    // `PlatformNotification.message` is typed `string | LocalizeKey`, so a typo or a key later
    // renamed in en.json type-checks fine and reaches the user as literal `%key%` text in a toast.
    const englishStrings: Record<string, string> = JSON.parse(
      readFileSync(path.join(__dirname, '../../../assets/localization/en.json'), 'utf8'),
    );

    expect(englishStrings).toHaveProperty(SYNC_UNAVAILABLE_MESSAGE_KEY);
  });

  it('declares every localized string it renders in en.json', () => {
    // The component reads its strings from a key list; a key that exists in the list but not in
    // en.json renders as blank text with no build-time signal.
    const englishStrings: Record<string, string> = JSON.parse(
      readFileSync(path.join(__dirname, '../../../assets/localization/en.json'), 'utf8'),
    );

    [
      '%general_cancel%',
      '%toolbar_sync%',
      '%toolbar_sync_open_status%',
      '%toolbar_sync_popover_idle%',
      '%toolbar_sync_popover_synced%',
      '%toolbar_sync_status_synced%',
      '%toolbar_sync_status_syncing%',
      '%toolbar_sync_status_syncing_project%',
      '%toolbar_sync_status_syncing_projects%',
    ].forEach((key) => {
      expect(englishStrings).toHaveProperty(key);
    });
  });
});
