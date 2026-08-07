import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';
import { useData, useScrollGroupScrRef, useSetting } from '@renderer/hooks/papi-hooks';
import { useNavigationTargetWebView } from '@renderer/hooks/use-navigation-target-web-view.hook';
import { useWindowControlsOverlay } from '@renderer/hooks/use-window-controls-overlay.hook';
import { ResolvedWebView } from '@renderer/services/navigation-target.util';
import { updateWebViewDefinitionSync } from '@renderer/services/web-view.service-shard';
import { sendCommand } from '@shared/services/command.service';
import { getNetworkEvent } from '@shared/services/network.service';
import { menuDataService } from '@shared/services/menu-data.service';
import {
  SEND_RECEIVE_UNKNOWN_GRACE_MS,
  useSendReceiveAvailability,
} from '@renderer/hooks/use-send-receive-availability.hook';
import { PlatformBibleToolbar } from './platform-bible-toolbar';

// Mock asset
vi.mock('@assets/icon.png', () => ({ default: 'icon.png' }));

vi.mock('@renderer/components/user-profile-popover/user-profile-popover.component', () => ({
  UserProfilePopover: () => <div data-testid="user-profile-popover-stub" />,
}));

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%toolbar_sync%': 'Sync',
      '%toolbar_sync_open_status%': 'Test Sync status',
      '%toolbar_sync_status_synced%': 'Test Synced',
      '%toolbar_sync_status_syncing%': 'Test Syncing',
      '%mainMenu_openHome%': 'Home',
    },
  ]),
  useScrollGroupScrRef: vi.fn(() => [
    { book: 1, chapter: 1, verse: 1 },
    vi.fn(),
    0,
    vi.fn(),
    undefined,
  ]),
  useRecentScriptureRefs: vi.fn(() => ({
    recentScriptureRefs: [],
    addRecentScriptureRef: vi.fn(),
  })),
  useData: vi.fn(() => ({
    CurrentTheme: vi.fn(() => [
      { type: 'light', id: 'light', themeFamilyId: 'light', label: 'Light', cssVariables: {} },
      vi.fn(),
    ]),
    MainMenu: vi.fn(() => [{ columns: {}, groups: {}, items: [] }, vi.fn(), false]),
  })),
  useDataProvider: vi.fn(() => undefined),
  useDialogCallback: vi.fn(() => vi.fn()),
  useSetting: vi.fn(() => ['simple', vi.fn(), vi.fn(), false]),
  useProjectSetting: vi.fn(() => ['', vi.fn(), vi.fn(), false]),
}));

vi.mock('@renderer/hooks/use-navigation-target-web-view.hook', () => ({
  // Typed so tests can mockReturnValue a resolved target (the factory's inferred return type
  // would otherwise be plain `undefined`)
  useNavigationTargetWebView: vi.fn((): ResolvedWebView | undefined => undefined),
}));

// The availability check's timing behavior (re-checks, window, reload handling) is covered by
// use-send-receive-availability.hook.test.ts; here it is mocked so these tests state the rendering
// rule for each of the three answers directly.
vi.mock('@renderer/hooks/use-send-receive-availability.hook', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@renderer/hooks/use-send-receive-availability.hook')>();
  return { ...actual, useSendReceiveAvailability: vi.fn((): boolean | undefined => true) };
});

vi.mock('@renderer/hooks/use-window-controls-overlay.hook', () => ({
  useWindowControlsOverlay: vi.fn((): DOMRect | undefined => undefined),
}));

vi.mock('@renderer/services/web-view.service-shard', () => ({
  updateWebViewDefinitionSync: vi.fn(() => true),
}));

vi.mock('@renderer/services/book-chapter-control.registry', () => ({
  registerBookChapterControlHandle: vi.fn(() => vi.fn()),
  TOP_TOOLBAR_BOOK_CHAPTER_CONTROL_OWNER_ID: 'top-toolbar',
}));

vi.mock('@renderer/services/papi-frontend.service', () => ({
  app: {
    getMarketingInfo: vi.fn(async () => ({
      marketingVersion: '1.0.0',
      marketingVersionMoniker: undefined,
    })),
  },
  dataProviders: {
    get: vi.fn(async () => undefined),
  },
}));

vi.mock('@renderer/services/theme.service', () => ({
  localThemeService: {
    getCurrentThemeSync: vi.fn(() => ({
      type: 'light',
      id: 'light',
      themeFamilyId: 'light',
      label: 'Light',
      cssVariables: {},
    })),
  },
}));

vi.mock('@renderer/services/scroll-group.service', () => ({
  availableScrollGroupIds: [1, 2, 3, 4, 5],
  getReferenceHistorySync: vi.fn(() => ({ current: undefined, back: [], forward: [] })),
  navigateReferenceHistorySync: vi.fn(() => false),
  onDidChangeReferenceHistory: vi.fn(() => vi.fn()),
}));

vi.mock('@shared/data/platform-bible-menu.commands', () => ({
  handleMenuCommand: vi.fn(),
}));

vi.mock('@shared/services/command.service', () => ({
  sendCommand: vi.fn(),
}));

vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: vi.fn(() => vi.fn(() => vi.fn())),
  // network-object.service subscribes to this at module load so a process that leaves during
  // startup is still announced, and this test reaches that module on its import path.
  onDidDisconnectClient: vi.fn(() => vi.fn()),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

vi.mock('@shared/services/notification.service', () => ({
  notificationService: { send: vi.fn(async () => 'notification-id') },
}));

vi.mock('@renderer/hooks/use-project-picker-data.hook', () => ({
  useProjectPickerData: vi.fn(() => ({
    currentProject: { id: 'proj-1', fullName: 'Test Project', shortName: 'TP' },
    recentProjects: [{ id: 'proj-1', fullName: 'Test Project', shortName: 'TP' }],
    allProjects: [],
    isLoading: false,
  })),
}));

vi.mock('platform-bible-react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('platform-bible-react')>();
  return {
    ...actual,
    // `className` is captured on a testid'd wrapper so tests can assert whether the static
    // OS-reserved-space class is applied, without depending on the real Toolbar's DOM structure.
    Toolbar: ({
      className,
      configAreaChildren,
      children,
    }: {
      className?: string;
      configAreaChildren?: React.ReactNode;
      children?: React.ReactNode;
    }) => (
      <div data-testid="toolbar-root" className={className}>
        <div data-testid="toolbar-config-area">{configAreaChildren}</div>
        <div data-testid="toolbar-main-area">{children}</div>
      </div>
    ),
    // Mirrors the real BookChapterControl's trigger (aria-label + disabled) so tests can assert on
    // the disabled state that platform-bible-toolbar.tsx wires up, without pulling in the real
    // component's Radix Popover/Command internals.
    BookChapterControl: ({
      disabled,
      className,
      triggerVariant,
      showTriggerChevron,
    }: {
      disabled?: boolean;
      className?: string;
      triggerVariant?: string;
      showTriggerChevron?: boolean;
    }) => (
      <button
        type="button"
        aria-label="book-chapter-trigger"
        disabled={disabled}
        data-testid="book-chapter-control"
        data-classname={className}
        data-trigger-variant={triggerVariant}
        data-show-chevron={showTriggerChevron}
      />
    ),
    ScrollGroupSelector: () => <div data-testid="scroll-group-selector" />,
    Select: ({ children, disabled }: { children?: React.ReactNode; disabled?: boolean }) => (
      <div data-testid="project-picker-select" aria-disabled={disabled}>
        {children}
      </div>
    ),
    SelectTrigger: ({
      children,
      className,
    }: {
      children?: React.ReactNode;
      className?: string;
    }) => <div data-select-trigger-classname={className}>{children}</div>,
    SelectContent: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
    SelectItem: ({ children, value }: { children?: React.ReactNode; value?: string }) => (
      <div data-value={value}>{children}</div>
    ),
    SelectSeparator: () => <hr />,
    SelectValue: ({ placeholder }: { placeholder?: string }) => <span>{placeholder}</span>,
  };
});

// `clearAllMocks()` does not reset `mockReturnValue`, so without a file-wide default the value the
// Sync-button block last set would leak into every describe that follows.
beforeEach(() => {
  vi.mocked(useSendReceiveAvailability).mockReturnValue(true);
});

const mockSendCommand = (
  isSendReceiveAvailable: boolean,
  /**
   * What `getSyncState` answers. The sync status refuses to report success without evidence of it,
   * so a test driving a sync to completion has to supply the results that say it succeeded.
   */
  syncState?: unknown,
) => {
  vi.mocked(sendCommand).mockImplementation(
    // sendCommand has a complex generic signature; cast is required for the mock implementation
    // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
    (async (commandName: string) => {
      if (commandName === 'platformGetResources.isSendReceiveAvailable')
        return isSendReceiveAvailable;
      if (commandName === 'platform.getOSPlatform') return 'win32';
      if (commandName === 'platform.isFullScreen') return false;
      if (commandName === 'paratextBibleSendReceive.getSyncState') return syncState;
      return undefined;
      // sendCommand has a complex generic signature; cast is required for the mock implementation
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
    }) as any,
  );
};

describe('PlatformBibleToolbar — Sync button', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // `clearAllMocks()` clears call history but does not reset `mockReturnValue`, so restore the
    // defaults explicitly to prevent a per-test `mockReturnValue` from leaking (see the "Scroll
    // group selector visibility" describe block below for precedent). The Sync button is
    // simple-mode-only and shown when send/receive is available, so tests state only their
    // deviation from that.
    vi.mocked(useSetting).mockReturnValue(['simple', vi.fn(), vi.fn(), false]);
    vi.mocked(useSendReceiveAvailability).mockReturnValue(true);
  });

  it('is not rendered when send/receive is unavailable', async () => {
    vi.mocked(useSendReceiveAvailability).mockReturnValue(false);
    mockSendCommand(false);
    render(<PlatformBibleToolbar />);

    await waitFor(() => {
      // Verify absent from DOM entirely (not just hidden like the loading state)
      expect(
        document.querySelector('button[data-testid="toolbar-sync-button"]'),
      ).not.toBeInTheDocument();
    });
  });

  it('is visible and interactive while send/receive availability is unknown (fail-open)', async () => {
    // Availability is unknown while the extension host is busy or send/receive is still activating.
    // The button must stay visible through that — only a settled `false` hides it.
    vi.mocked(useSendReceiveAvailability).mockReturnValue(undefined);
    mockSendCommand(true);
    render(<PlatformBibleToolbar />);

    // Reachable via the accessibility tree and keyboard, and shows the idle label
    const btn = screen.getByRole('button', { name: 'Sync' });
    expect(btn).toBeInTheDocument();
    expect(btn).not.toHaveAttribute('aria-hidden');
    expect(btn).not.toHaveAttribute('tabIndex');
  });

  it('appears once the real availability hook resolves, not just when its value is stubbed', async () => {
    // The tests above stub the hook to state each rendering rule directly. This one runs the real
    // hook against a mocked `sendCommand` so the hook-to-render seam is covered too — a change to
    // what the hook returns would otherwise leave every test in this block green.
    vi.useFakeTimers();
    // Swap the stub for the real implementation just for this test
    const { useSendReceiveAvailability: actualHook } = await vi.importActual<
      typeof import('@renderer/hooks/use-send-receive-availability.hook')
    >('@renderer/hooks/use-send-receive-availability.hook');
    vi.mocked(useSendReceiveAvailability).mockImplementation(actualHook);
    let callCount = 0;
    const answerAvailabilityOnSecondCall = async (commandName: string) => {
      if (commandName === 'platformGetResources.isSendReceiveAvailable') {
        callCount += 1;
        return callCount > 1;
      }
      if (commandName === 'platform.getOSPlatform') return 'win32';
      if (commandName === 'platform.isFullScreen') return false;
      return undefined;
    };
    // sendCommand's return type is resolved from the command name, so no single implementation
    // satisfies its generic signature.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const implementation = answerAvailabilityOnSecondCall as unknown as typeof sendCommand;
    vi.mocked(sendCommand).mockImplementation(implementation);

    render(<PlatformBibleToolbar />);

    // Visible through the first `false` (fail open), and still visible once it resolves available
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(screen.getByRole('button', { name: 'Sync' })).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(SEND_RECEIVE_UNKNOWN_GRACE_MS);
    });
    expect(screen.getByRole('button', { name: 'Sync' })).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('does not check availability at all in power mode', async () => {
    // Power mode has no Sync button to gate, so the check would be pure network traffic on the
    // startup path. Uses the real hook, since the stub used elsewhere never calls anything.
    vi.useFakeTimers();
    const { useSendReceiveAvailability: actualHook } = await vi.importActual<
      typeof import('@renderer/hooks/use-send-receive-availability.hook')
    >('@renderer/hooks/use-send-receive-availability.hook');
    vi.mocked(useSendReceiveAvailability).mockImplementation(actualHook);
    vi.mocked(useSetting).mockReturnValue(['power', vi.fn(), vi.fn(), false]);
    mockSendCommand(true);

    render(<PlatformBibleToolbar />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(SEND_RECEIVE_UNKNOWN_GRACE_MS);
    });

    expect(
      vi
        .mocked(sendCommand)
        .mock.calls.filter(([cmd]) => cmd === 'platformGetResources.isSendReceiveAvailable'),
    ).toHaveLength(0);
    vi.useRealTimers();
  });

  it('is not rendered in power mode even when send/receive is available', async () => {
    // Sync belongs to simple mode; power users send/receive per project from the Home view
    vi.mocked(useSetting).mockReturnValue(['power', vi.fn(), vi.fn(), false]);
    mockSendCommand(true);
    render(<PlatformBibleToolbar />);

    await waitFor(() => {
      expect(screen.getByTestId('scroll-group-selector')).toBeInTheDocument();
    });
    expect(
      document.querySelector('button[data-testid="toolbar-sync-button"]'),
    ).not.toBeInTheDocument();
  });

  it('is rendered with the idle label when send/receive is available', async () => {
    mockSendCommand(true);
    render(<PlatformBibleToolbar />);
    await waitFor(() => {
      const btn = screen.getByRole('button', { name: 'Sync' });
      expect(btn).toBeInTheDocument();
      expect(btn).toHaveTextContent('Sync');
    });
  });

  // The button's own behavior — the popover, Cancel, project names, failure reporting — is covered
  // by sync-status-button.component.test.tsx, which drives the real component. What stays here is
  // the toolbar's question: whether the button appears at all, and whether the status the toolbar
  // renders it with tracks the sync-state event, since the toolbar is what mounts it (and mounts it
  // before send/receive availability has settled).

  it('shows Syncing label when onSyncStateChanged fires with isSyncing: true', async () => {
    let capturedSyncStateCallback: ((arg: { isSyncing: boolean }) => void) | undefined;
    vi.mocked(getNetworkEvent).mockImplementation(
      // getNetworkEvent has a complex generic signature; cast is required for the mock implementation
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      ((eventName: string) => {
        if (eventName === 'paratextBibleSendReceive.onSyncStateChanged')
          return vi.fn((cb: (arg: { isSyncing: boolean }) => void) => {
            capturedSyncStateCallback = cb;
            return vi.fn();
          });
        return vi.fn(() => vi.fn());
        // getNetworkEvent has a complex generic signature; cast is required for the mock implementation
        // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      }) as any,
    );

    mockSendCommand(true);
    render(<PlatformBibleToolbar />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Sync' })).toBeInTheDocument();
    });

    expect(capturedSyncStateCallback).toBeDefined();
    if (!capturedSyncStateCallback)
      throw new Error('capturedSyncStateCallback was not set by mock');

    const syncStateCallback = capturedSyncStateCallback;
    act(() => {
      syncStateCallback({ isSyncing: true });
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Syncing' })).toBeInTheDocument();
    });
  });

  it('shows Synced label when onSyncStateChanged fires with isSyncing: false', async () => {
    let capturedSyncStateCallback: ((arg: { isSyncing: boolean }) => void) | undefined;
    vi.mocked(getNetworkEvent).mockImplementation(
      // getNetworkEvent has a complex generic signature; cast is required for the mock implementation
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      ((eventName: string) => {
        if (eventName === 'paratextBibleSendReceive.onSyncStateChanged')
          return vi.fn((cb: (arg: { isSyncing: boolean }) => void) => {
            capturedSyncStateCallback = cb;
            return vi.fn();
          });
        return vi.fn(() => vi.fn());
        // getNetworkEvent has a complex generic signature; cast is required for the mock implementation
        // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      }) as any,
    );

    // Seeded MID-SYNC, so the label has to change for this to pass: a seed that already said
    // "Synced" would render the asserted label whether or not the event was ever delivered.
    // `syncingProjectIds` absent on purpose: a build predating that field still reports a running
    // sync, and the bare "Syncing" label it produces is all this test needs to change.
    let syncState: unknown = { isSyncing: true, lastRequestedProjectIds: [] };
    mockSendCommand(true, undefined);
    vi.mocked(sendCommand).mockImplementation(
      // sendCommand has a complex generic signature; cast is required for the mock implementation
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      (async (commandName: string) => {
        if (commandName === 'platformGetResources.isSendReceiveAvailable') return true;
        if (commandName === 'platform.getOSPlatform') return 'win32';
        if (commandName === 'platform.isFullScreen') return false;
        if (commandName === 'paratextBibleSendReceive.getSyncState') return syncState;
        return undefined;
        // sendCommand has a complex generic signature; cast is required for the mock implementation
        // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      }) as any,
    );
    render(<PlatformBibleToolbar />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Syncing' })).toBeInTheDocument();
    });

    expect(capturedSyncStateCallback).toBeDefined();
    if (!capturedSyncStateCallback)
      throw new Error('capturedSyncStateCallback was not set by mock');

    // A sync that ENDED is only "Synced" if it succeeded, which the results are what establish. The
    // event carries no outcome, so the follow-up read is what has to supply it.
    syncState = {
      isSyncing: false,
      lastRequestedProjectIds: ['proj1'],
      syncingProjectIds: [],
      lastResults: {
        sendReceiveDate: '2026-08-19T00:00:00Z',
        resultsInfo: { proj1: { id: 'proj1', resultStatus: 'succeeded' } },
      },
    };
    const syncStateCallback = capturedSyncStateCallback;
    act(() => {
      syncStateCallback({ isSyncing: false });
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Synced' })).toBeInTheDocument();
    });
  });

  it('renders the UserProfilePopover stub', async () => {
    mockSendCommand(true);
    render(<PlatformBibleToolbar />);
    await waitFor(() => {
      expect(screen.getByTestId('user-profile-popover-stub')).toBeInTheDocument();
    });
  });
});

describe('PlatformBibleToolbar — Scroll group selector visibility by interface mode', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // `clearAllMocks()` clears call history but does not reset `mockReturnValue`, so restore the
    // default `useSetting` value explicitly to prevent a per-test `mockReturnValue` from leaking.
    vi.mocked(useSetting).mockReturnValue(['simple', vi.fn(), vi.fn(), false]);
    mockSendCommand(true);
  });

  it('hides ScrollGroupSelector when platform.interfaceMode is "simple"', async () => {
    vi.mocked(useSetting).mockReturnValue(['simple', vi.fn(), vi.fn(), false]);
    render(<PlatformBibleToolbar />);
    await waitFor(() => {
      expect(screen.queryByTestId('scroll-group-selector')).not.toBeInTheDocument();
    });
  });

  it('renders ScrollGroupSelector when platform.interfaceMode is "power"', async () => {
    vi.mocked(useSetting).mockReturnValue(['power', vi.fn(), vi.fn(), false]);
    render(<PlatformBibleToolbar />);
    await waitFor(() => {
      expect(screen.getByTestId('scroll-group-selector')).toBeInTheDocument();
    });
  });
});

describe('PlatformBibleToolbar — project picker Select visibility by interface mode', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useSetting).mockReturnValue(['simple', vi.fn(), vi.fn(), false]);
    mockSendCommand(true);
  });

  it('renders project picker Select when platform.interfaceMode is "simple"', async () => {
    render(<PlatformBibleToolbar />);
    await waitFor(() => {
      expect(screen.getByTestId('project-picker-select')).toBeInTheDocument();
    });
  });

  it('hides project picker Select when platform.interfaceMode is "power"', async () => {
    vi.mocked(useSetting).mockReturnValue(['power', vi.fn(), vi.fn(), false]);
    render(<PlatformBibleToolbar />);
    await waitFor(() => {
      expect(screen.queryByTestId('project-picker-select')).not.toBeInTheDocument();
    });
  });
});

describe('PlatformBibleToolbar — top BookChapterControl mirrors the resolved navigation target', () => {
  const getTrigger = () => screen.getByRole('button', { name: 'book-chapter-trigger' });

  beforeEach(() => {
    vi.clearAllMocks();
    // `clearAllMocks()` clears call history but does not reset `mockReturnValue`, so restore the
    // defaults explicitly to prevent a per-test `mockReturnValue` from leaking (see the
    // "Scroll group selector visibility" describe block above for precedent).
    vi.mocked(useSetting).mockReturnValue(['simple', vi.fn(), vi.fn(), false]);
    vi.mocked(useNavigationTargetWebView).mockReturnValue(undefined);
    vi.mocked(updateWebViewDefinitionSync).mockReturnValue(true);
    mockSendCommand(true);
  });

  it('disables the trigger when there is no navigation target, in power mode', async () => {
    vi.mocked(useSetting).mockReturnValue(['power', vi.fn(), vi.fn(), false]);

    render(<PlatformBibleToolbar />);

    await waitFor(() => {
      expect(getTrigger()).toBeDisabled();
    });
  });

  it('disables the trigger when there is no navigation target, in simple mode', async () => {
    // The resolved target (and therefore disabled state) does not depend on interface mode — the
    // control is disabled only when there is no target, in either mode.
    vi.mocked(useSetting).mockReturnValue(['simple', vi.fn(), vi.fn(), false]);

    render(<PlatformBibleToolbar />);

    await waitFor(() => {
      expect(getTrigger()).toBeDisabled();
    });
  });

  it('enables the trigger when the resolved target is the tracked web view', async () => {
    vi.mocked(useSetting).mockReturnValue(['power', vi.fn(), vi.fn(), false]);
    vi.mocked(useNavigationTargetWebView).mockReturnValue({
      id: 'wv1',
      definition: {
        id: 'wv1',
        webViewType: 'testWebViewType',
        scrollGroupScrRef: 2,
        projectId: 'proj1',
      },
    });

    render(<PlatformBibleToolbar />);

    await waitFor(() => {
      expect(getTrigger()).toBeEnabled();
    });
  });

  it('enables the trigger and mirrors the main editor when it is the resolved target', async () => {
    vi.mocked(useSetting).mockReturnValue(['simple', vi.fn(), vi.fn(), false]);
    vi.mocked(useNavigationTargetWebView).mockReturnValue({
      id: 'editor-1',
      definition: {
        id: 'editor-1',
        webViewType: 'platformScriptureEditor.react',
        projectId: 'proj1',
        scrollGroupScrRef: 2,
      },
    });

    render(<PlatformBibleToolbar />);

    await waitFor(() => {
      expect(getTrigger()).toBeEnabled();
    });
  });
});

describe('PlatformBibleToolbar — scroll group write-back to the resolved target', () => {
  // The toolbar hands `setScrollGroupScrRefTarget` to `useScrollGroupScrRef` as its second
  // argument. `useScrollGroupScrRef` is mocked in this file (see the papi-hooks mock above), so the
  // real hook's internal wiring from ScrollGroupSelector -> setScrollGroupId -> setScrollGroupScrRef
  // isn't exercised here. Instead, capture that second argument directly and invoke it — this is
  // `setScrollGroupScrRefTarget` itself, the function under test, without needing to drive the
  // (also mocked) ScrollGroupSelector's Radix Select through jsdom.
  const getLatestScrollGroupScrRefSetter = () => {
    const { calls } = vi.mocked(useScrollGroupScrRef).mock;
    const lastCall = calls.at(-1);
    if (!lastCall) throw new Error('useScrollGroupScrRef was not called');
    const [, setScrollGroupScrRefTarget] = lastCall;
    return setScrollGroupScrRefTarget;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useSetting).mockReturnValue(['power', vi.fn(), vi.fn(), false]);
    // No navigation target by default — individual tests arrange the resolved target they need
    vi.mocked(useNavigationTargetWebView).mockReturnValue(undefined);
    vi.mocked(updateWebViewDefinitionSync).mockReturnValue(true);
    mockSendCommand(true);
  });

  it('writes the new scroll group to the tracked web view definition', async () => {
    vi.mocked(useNavigationTargetWebView).mockReturnValue({
      id: 'wv1',
      definition: {
        id: 'wv1',
        webViewType: 'testWebViewType',
        scrollGroupScrRef: 2,
        projectId: 'proj1',
      },
    });

    render(<PlatformBibleToolbar />);

    await waitFor(() => {
      expect(screen.getByTestId('scroll-group-selector')).toBeInTheDocument();
    });

    const setScrollGroupScrRefTarget = getLatestScrollGroupScrRefSetter();
    let result: boolean | undefined;
    act(() => {
      result = setScrollGroupScrRefTarget(3);
    });

    expect(result).toBe(true);
    expect(vi.mocked(updateWebViewDefinitionSync)).toHaveBeenCalledWith('wv1', {
      scrollGroupScrRef: 3,
    });
  });

  it('writes the new scroll group to the main editor definition when it is the resolved target', async () => {
    vi.mocked(useSetting).mockReturnValue(['simple', vi.fn(), vi.fn(), false]);
    vi.mocked(useNavigationTargetWebView).mockReturnValue({
      id: 'editor-1',
      definition: {
        id: 'editor-1',
        webViewType: 'platformScriptureEditor.react',
        projectId: 'proj1',
        scrollGroupScrRef: 2,
      },
    });

    render(<PlatformBibleToolbar />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'book-chapter-trigger' })).toBeEnabled();
    });

    const setScrollGroupScrRefTarget = getLatestScrollGroupScrRefSetter();
    let result: boolean | undefined;
    act(() => {
      result = setScrollGroupScrRefTarget(3);
    });

    expect(result).toBe(true);
    expect(vi.mocked(updateWebViewDefinitionSync)).toHaveBeenCalledWith('editor-1', {
      scrollGroupScrRef: 3,
    });
  });

  it('does not write and returns false when there is no navigation target', async () => {
    vi.mocked(useNavigationTargetWebView).mockReturnValue(undefined);

    render(<PlatformBibleToolbar />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'book-chapter-trigger' })).toBeDisabled();
    });

    const setScrollGroupScrRefTarget = getLatestScrollGroupScrRefSetter();
    let result: boolean | undefined;
    act(() => {
      result = setScrollGroupScrRefTarget(3);
    });

    expect(result).toBe(false);
    expect(vi.mocked(updateWebViewDefinitionSync)).not.toHaveBeenCalled();
  });
});

describe('PlatformBibleToolbar — Home button visibility by interface mode', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useSetting).mockReturnValue(['simple', vi.fn(), vi.fn(), false]);
    mockSendCommand(true);
  });

  it('hides the Home button when platform.interfaceMode is "simple"', async () => {
    render(<PlatformBibleToolbar />);
    await waitFor(() => {
      expect(screen.queryByTestId('toolbar-home-button')).not.toBeInTheDocument();
    });
  });

  it('shows the Home button when platform.interfaceMode is "power"', async () => {
    vi.mocked(useSetting).mockReturnValue(['power', vi.fn(), vi.fn(), false]);
    render(<PlatformBibleToolbar />);
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-home-button')).toBeInTheDocument();
    });
  });
});

describe('PlatformBibleToolbar — top BCV and project selector styling by interface mode', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSendCommand(true);
  });

  it('uses ghost variant, chevron, and fit-content width for the top BCV in simple mode', async () => {
    vi.mocked(useSetting).mockReturnValue(['simple', vi.fn(), vi.fn(), false]);
    render(<PlatformBibleToolbar />);
    const control = await screen.findByTestId('book-chapter-control');
    expect(control).toHaveAttribute('data-trigger-variant', 'ghost');
    expect(control).toHaveAttribute('data-show-chevron', 'true');
    expect(control.getAttribute('data-classname')).toContain('tw:w-fit');
  });

  it('uses outline variant, no chevron, and the fixed width for the top BCV in power mode', async () => {
    vi.mocked(useSetting).mockReturnValue(['power', vi.fn(), vi.fn(), false]);
    render(<PlatformBibleToolbar />);
    const control = await screen.findByTestId('book-chapter-control');
    expect(control.getAttribute('data-trigger-variant')).not.toBe('ghost');
    expect(control).toHaveAttribute('data-show-chevron', 'false');
    expect(control.getAttribute('data-classname')).toContain('tw:w-96');
  });

  it('applies ghost styling to the project picker Select in simple mode', async () => {
    vi.mocked(useSetting).mockReturnValue(['simple', vi.fn(), vi.fn(), false]);
    render(<PlatformBibleToolbar />);
    await waitFor(() => {
      expect(screen.getByTestId('project-picker-select')).toBeInTheDocument();
    });
    expect(
      document
        .querySelector('[data-select-trigger-classname]')
        ?.getAttribute('data-select-trigger-classname'),
    ).toContain('tw:border-0');
  });
});

describe('PlatformBibleToolbar — main menu data stays live', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSendCommand(true);
  });

  it('subscribes to MainMenu via useData instead of a one-shot fetch, so interface-mode and localization updates reach it without reopening the menu', async () => {
    render(<PlatformBibleToolbar />);
    await waitFor(() => {
      expect(useData).toHaveBeenCalledWith(menuDataService.dataProviderName);
    });
    const dataProviderHooks = vi.mocked(useData).mock.results.at(-1)?.value;
    expect(dataProviderHooks.MainMenu).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({ columns: {}, groups: {}, items: [] }),
    );
  });
});

describe('PlatformBibleToolbar — title bar reserved space', () => {
  const mockSendCommandForOS = (osPlatform: string) => {
    vi.mocked(sendCommand).mockImplementation(
      // sendCommand has a complex generic signature; cast is required for the mock implementation
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      (async (commandName: string) => {
        if (commandName === 'platformGetResources.isSendReceiveAvailable') return true;
        if (commandName === 'platform.getOSPlatform') return osPlatform;
        if (commandName === 'platform.isFullScreen') return false;
        return undefined;
        // sendCommand has a complex generic signature; cast is required for the mock implementation
        // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      }) as any,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // clearAllMocks() does not reset a prior test's mockReturnValue (see precedent above), so
    // restore the default explicitly
    vi.mocked(useWindowControlsOverlay).mockReturnValue(undefined);
  });

  it('reserves the live-measured overlay width plus breathing room on Windows, and does not also apply the static class', async () => {
    vi.mocked(useWindowControlsOverlay).mockReturnValue(
      new DOMRect(0, 0, window.innerWidth - 150, 32),
    );
    mockSendCommandForOS('win32');

    render(<PlatformBibleToolbar />);

    await waitFor(() => {
      // OS controls area width 150px + 4px breathing room (RESERVED_SPACE_BREATHING_ROOM_PX)
      expect(screen.getByTestId('toolbar-reserved-space-wrapper')).toHaveStyle({
        paddingRight: '154px',
      });
    });
    expect(screen.getByTestId('toolbar-root')).not.toHaveClass('tw:pe-[calc(138px+1rem)]');
    // Toolbar's own container has an unconditional border and tw:px-4 (16px end padding); when the
    // wrapper above reserves the trailing space, Toolbar's own border must be dropped entirely (not
    // just the end side) and its own end-side padding suppressed, or the border stops short at
    // Toolbar's narrower edge instead of enclosing the reserved strip, and the wrapper's live
    // measurement stacks on top of the 16px, over-reserving space.
    expect(screen.getByTestId('toolbar-root')).toHaveClass('tw:border-0');
    expect(screen.getByTestId('toolbar-root')).toHaveClass('tw:pe-0');
    // The wrapper carries an equivalent border itself (as a layout-neutral box-shadow, not an
    // actual border — see the toolbarReservedSpaceStyle comment in the component), so the outline
    // encloses the full toolbar-plus-reserved-space region on every side instead of stopping short
    // at Toolbar's narrower edge.
    expect(screen.getByTestId('toolbar-reserved-space-wrapper')).toHaveStyle({
      boxShadow: 'inset 0 0 0 1px var(--border)',
    });
  });

  it('reserves space on the left when the live-measured gap is on the left (e.g., RTL locales)', async () => {
    // left = 150, right = window.innerWidth: the gap sits on the left instead of the right.
    vi.mocked(useWindowControlsOverlay).mockReturnValue(
      new DOMRect(150, 0, window.innerWidth - 150, 32),
    );
    mockSendCommandForOS('win32');

    render(<PlatformBibleToolbar />);

    await waitFor(() => {
      // 150px measured gap + 4px breathing room (RESERVED_SPACE_BREATHING_ROOM_PX)
      expect(screen.getByTestId('toolbar-reserved-space-wrapper')).toHaveStyle({
        paddingLeft: '154px',
      });
    });
  });

  it('applies no inline override while the overlay geometry is not yet known, falling back to the static class', async () => {
    mockSendCommandForOS('win32');

    render(<PlatformBibleToolbar />);

    await waitFor(() => {
      expect(screen.getByTestId('user-profile-popover-stub')).toBeInTheDocument();
    });
    expect(screen.getByTestId('toolbar-reserved-space-wrapper')).not.toHaveAttribute('style');
    expect(screen.getByTestId('toolbar-root')).toHaveClass('tw:pe-[calc(138px+1rem)]');
    expect(screen.getByTestId('toolbar-root')).not.toHaveClass('tw:border-0');
    expect(screen.getByTestId('toolbar-root')).not.toHaveClass('tw:pe-0');
  });

  it('does not reserve space on macOS regardless of overlay geometry, keeping the static traffic-lights class', async () => {
    vi.mocked(useWindowControlsOverlay).mockReturnValue(new DOMRect(0, 0, 700, 32));
    mockSendCommandForOS('darwin');

    render(<PlatformBibleToolbar />);

    await waitFor(() => {
      expect(screen.getByTestId('user-profile-popover-stub')).toBeInTheDocument();
    });
    expect(screen.getByTestId('toolbar-reserved-space-wrapper')).not.toHaveAttribute('style');
    expect(screen.getByTestId('toolbar-root')).toHaveClass('tw:ps-[85px]');
    expect(screen.getByTestId('toolbar-root')).not.toHaveClass('tw:border-0');
    expect(screen.getByTestId('toolbar-root')).not.toHaveClass('tw:pe-0');
  });
});
