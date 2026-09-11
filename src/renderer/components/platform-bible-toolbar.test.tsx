import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';
import {
  useData,
  useProjectSetting,
  useScrollGroupScrRef,
  useSetting,
} from '@renderer/hooks/papi-hooks';
import { useNavigationTargetWebView } from '@renderer/hooks/use-navigation-target-web-view.hook';
import { useOpenProjectBookIds } from '@renderer/hooks/use-open-project-book-ids.hook';
import { useWindowControlsOverlay } from '@renderer/hooks/use-window-controls-overlay.hook';
import { ResolvedWebView } from '@renderer/services/navigation-target.util';
import { updateWebViewDefinitionSync } from '@renderer/services/web-view.service-shard';
import { resetSyncActivity, setSyncActivity } from '@renderer/services/sync-activity-store';
import { sendCommand } from '@shared/services/command.service';
import { getNetworkEvent } from '@shared/services/network.service';
import { menuDataService } from '@shared/services/menu-data.service';
import {
  SEND_RECEIVE_UNKNOWN_GRACE_MS,
  useSendReceiveAvailability,
} from '@renderer/hooks/use-send-receive-availability.hook';
import { SHRINK_STEP, ShrinkStepContext } from 'platform-bible-react';
import type { ProjectSelectorProps } from 'platform-bible-react/experimental';
import type { ProjectPickerData } from '@renderer/hooks/use-project-picker-data.hook';
import { PlatformBibleToolbar } from './platform-bible-toolbar';

// Mock asset
vi.mock('@assets/icon.png', () => ({ default: 'icon.png' }));

vi.mock('@renderer/components/user-profile-popover/user-profile-popover.component', () => ({
  UserProfilePopover: () => <div data-testid="user-profile-popover-stub" />,
}));

/**
 * The resolution callbacks `useDialogCallback` has been handed, newest last. The toolbar hands it a
 * fresh callback on every render, so this is a per-render log rather than a count of dialogs
 * opened; a test that resolves the project-picker dialog reaches for the most recent entry.
 */
const capturedDialogResolvers: ((response: string | undefined) => void)[] = [];

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%toolbar_sync%': 'Sync',
      '%toolbar_sync_open_status%': 'Test Sync status',
      '%toolbar_sync_status_synced%': 'Test Synced',
      '%toolbar_sync_status_syncing%': 'Test Syncing',
      '%toolbar_sync_status_unknown%': 'Test Sync status unavailable',
      '%mainMenu_openHome%': 'Home',
      '%projectPicker_no_results%': 'Test no projects found',
      '%projectPicker_readOnly_label%': 'Test read-only',
      '%projectPicker_search_placeholder%': 'Test search projects',
      '%projectPicker_section_projects_localOnly%': 'Test your projects on this computer',
      '%projectPicker_section_recent%': 'Test recent',
      '%projectPicker_toolbar_more_projects%': 'Test more projects',
      '%projectPicker_toolbar_no_projects%': 'Test no projects',
      '%projectPicker_toolbar_select_project%': 'Test select a project',
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
  useDialogCallback: vi.fn(
    (
      _dialogType: unknown,
      _options: unknown,
      resolveCallback: (response: string | undefined) => void,
    ) => {
      capturedDialogResolvers.push(resolveCallback);
      return vi.fn();
    },
  ),
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

vi.mock('@renderer/hooks/use-open-project-book-ids.hook', () => ({
  useOpenProjectBookIds: vi.fn(() => ['REV']),
}));

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
    currentSimpleProject: { id: 'proj-1', fullName: 'Test Project', shortName: 'TP' },
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
      menuData,
    }: {
      className?: string;
      configAreaChildren?: React.ReactNode;
      children?: React.ReactNode;
      menuData?: unknown;
    }) => (
      <div data-testid="toolbar-root" className={className}>
        {/* The real Toolbar renders its menubar only when `menuData` is truthy; this marker mirrors
            that so tests can assert which windows get a menu without the real Radix internals. */}
        {menuData ? <div data-testid="toolbar-menubar" /> : undefined}
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
      getAdditionalBookIds,
    }: {
      disabled?: boolean;
      className?: string;
      triggerVariant?: string;
      showTriggerChevron?: boolean;
      getAdditionalBookIds?: () => string[];
    }) => (
      <button
        type="button"
        aria-label="book-chapter-trigger"
        disabled={disabled}
        data-testid="book-chapter-control"
        data-classname={className}
        data-trigger-variant={triggerVariant}
        data-show-chevron={showTriggerChevron}
        data-additional-books={getAdditionalBookIds ? getAdditionalBookIds().join(',') : undefined}
      />
    ),
    ScrollGroupSelector: () => <div data-testid="scroll-group-selector" />,
  };
});

/**
 * Props from the most recent `ProjectSelector` render, so wiring assertions can inspect exactly
 * what the toolbar handed the selector. The list behavior those props drive is asserted against the
 * real component in
 * `lib/platform-bible-react/src/components/advanced/project-selector/project-selector.component.test.tsx`
 * and its partitioning in `project-selector.rows.test.ts`; here the section descriptors' own
 * `match`/`compare` functions are called directly, so the sectioning assertion still exercises the
 * toolbar's production logic rather than this stub.
 */
const capturedProjectSelectorProps: { current: ProjectSelectorProps | undefined } = {
  current: undefined,
};

/** The captured props, or a stated failure when the selector never rendered. */
function requireCapturedProjectSelectorProps(): ProjectSelectorProps {
  const props = capturedProjectSelectorProps.current;
  if (!props) throw new Error('ProjectSelector was never rendered');
  return props;
}

/**
 * `renderTriggerLabel` exists only on the `project` mode of the props union, so reading it needs a
 * narrowing step — kept out of the stub component below, where destructuring is the house style.
 */
function getRenderTriggerLabel(props: ProjectSelectorProps) {
  return props.mode === 'project' ? props.renderTriggerLabel : undefined;
}

/** `selection` and `onChangeSelection` likewise live only on the `project` mode of the props union. */
function getSelection(props: ProjectSelectorProps) {
  return props.mode === 'project' ? props.selection : undefined;
}

function getOnChangeSelection(props: ProjectSelectorProps) {
  return props.mode === 'project' ? props.onChangeSelection : undefined;
}

/** The project the stub considers selected, matched the way the real trigger matches it. */
function getSelectedProject(props: ProjectSelectorProps) {
  if (props.mode !== 'project') return undefined;
  const { projectId } = props.selection;
  return props.projects.find((project) => project.id === projectId);
}

// `ProjectSelector` comes from a separate module specifier, which the `platform-bible-react` mock
// above does not intercept.
vi.mock('platform-bible-react/experimental', async (importOriginal) => {
  const actual = await importOriginal<typeof import('platform-bible-react/experimental')>();
  return {
    ...actual,
    ProjectSelector: (props: ProjectSelectorProps) => {
      capturedProjectSelectorProps.current = props;
      const { buttonClassName, buttonPlaceholder, isDisabled } = props;
      const selected = getSelectedProject(props);
      const renderTriggerLabel = getRenderTriggerLabel(props);
      // Mirrors the real trigger: a caller-supplied `renderTriggerLabel` owns the whole label,
      // including the nothing-selected case, and the derived short name/placeholder is only used
      // when there is none. Dropping that distinction would make every label assertion vacuous.
      const label = renderTriggerLabel
        ? renderTriggerLabel(selected)
        : (selected?.shortName ?? buttonPlaceholder);
      return (
        <div
          data-testid="toolbar-project-selector"
          data-trigger-classname={buttonClassName}
          aria-disabled={isDisabled}
        >
          <span data-testid="project-picker-value">{label}</span>
        </div>
      );
    },
  };
});

/** Shared no-op body for the ResizeObserver stub's methods, none of which observe anything. */
const doNothing = () => {};

// Radix Tooltip uses ResizeObserver internally; jsdom doesn't provide it, so we stub a no-op
// implementation.
beforeAll(() => {
  global.ResizeObserver = class {
    observe = doNothing;

    unobserve = doNothing;

    disconnect = doNothing;
  };
});

// `clearAllMocks()` does not reset `mockReturnValue`, so without a file-wide default the value the
// Sync-button block last set would leak into every describe that follows.
beforeEach(() => {
  capturedProjectSelectorProps.current = undefined;
  capturedDialogResolvers.length = 0;
  vi.mocked(useSendReceiveAvailability).mockReturnValue(true);
  // vitest has no URL search params for the renderer to read this from, so without a file-wide
  // default it is `undefined` (a secondary window) in every describe that doesn't say otherwise —
  // the opposite of what a main-window user actually sees. Describes that care about the secondary
  // case still set `false` explicitly as a deliberate override.
  globalThis.isMainWindow = true;
  vi.mocked(useOpenProjectBookIds).mockReturnValue(['REV']);
  // The real `useInterfaceMode` runs in these tests and caches the resolved mode, so without this
  // a test that renders while the setting is still loading would inherit the previous test's mode
  // and treat it as known.
  localStorage.clear();
});

const mockSendCommandWithSyncStates = (
  isSendReceiveAvailable: boolean,
  /**
   * What successive `getSyncState` calls answer, in order; the final entry answers every call after
   * it. A test that drives a sync from one state to another needs this, because the read that
   * follows a sync-state event has to describe the state the sync has just moved TO — answering
   * every call with the mount-time state would silently undo the transition under test.
   */
  syncStates: unknown[],
) => {
  let syncStateCallCount = 0;
  vi.mocked(sendCommand).mockImplementation(
    // sendCommand has a complex generic signature; cast is required for the mock implementation
    // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
    (async (commandName: string) => {
      if (commandName === 'platformGetResources.isSendReceiveAvailable')
        return isSendReceiveAvailable;
      if (commandName === 'platform.getOSPlatform') return 'win32';
      if (commandName === 'platform.isFullScreen') return false;
      if (commandName === 'paratextBibleSendReceive.getSyncState') {
        const syncState = syncStates[Math.min(syncStateCallCount, syncStates.length - 1)];
        syncStateCallCount += 1;
        return syncState;
      }
      return undefined;
      // sendCommand has a complex generic signature; cast is required for the mock implementation
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
    }) as any,
  );
};

const mockSendCommand = (
  isSendReceiveAvailable: boolean,
  /**
   * What `getSyncState` answers, for every call. The sync status refuses to report success without
   * evidence of it, so a test driving a sync to completion has to supply the results that say it
   * succeeded.
   */
  syncState?: unknown,
) => {
  mockSendCommandWithSyncStates(isSendReceiveAvailable, [syncState]);
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
    // The backend sync-activity signal is a module-level store, so it outlives a test unless reset.
    resetSyncActivity();
  });

  it('sync button is not rendered, but the toolbar-sync-area wrapper is, when send/receive is unavailable', async () => {
    vi.mocked(useSendReceiveAvailability).mockReturnValue(false);
    mockSendCommand(false);
    render(<PlatformBibleToolbar />);

    await waitFor(() => {
      // Verify button is absent from DOM entirely (not just hidden like the loading state)
      expect(
        document.querySelector('button[data-testid="toolbar-sync-button"]'),
      ).not.toBeInTheDocument();
      // Wrapper must always be present so the onboarding tour has a stable anchor to spotlight.
      expect(screen.getByTestId('toolbar-sync-area')).toBeInTheDocument();
    });
  });

  it('is rendered despite unavailable send/receive once the backend reports a sync', async () => {
    // Syncs also start from paths that never touch the send/receive extension — `startup-tasks.ts`
    // calls the dotnet `syncProjects` command directly. In Simple mode the persistent toast is
    // suppressed in favour of this indicator, so hiding it on a settled `false` would leave a real,
    // multi-minute sync with no surface and no way to cancel.
    vi.mocked(useSendReceiveAvailability).mockReturnValue(false);
    mockSendCommand(false);
    render(<PlatformBibleToolbar />);

    // Hidden to begin with — nothing has said a sync is running yet
    await waitFor(() => {
      expect(
        document.querySelector('button[data-testid="toolbar-sync-button"]'),
      ).not.toBeInTheDocument();
    });

    act(() => setSyncActivity({ isSyncing: true, projectIds: [] }));

    await waitFor(() => {
      expect(
        document.querySelector('button[data-testid="toolbar-sync-button"]'),
      ).toBeInTheDocument();
    });
  });

  it('keeps the indicator mounted after the sync finishes', async () => {
    // The gate is sticky, not live. Driving it from "is syncing right now" unmounts the control in
    // the same commit the closing snapshot arrives, so the outcome the user was waiting for is never
    // painted, the live region never announces it, and the status hook's seed loop is torn down
    // mid-flight.
    vi.mocked(useSendReceiveAvailability).mockReturnValue(false);
    mockSendCommand(false);
    render(<PlatformBibleToolbar />);

    act(() => setSyncActivity({ isSyncing: true, projectIds: [] }));
    await waitFor(() => {
      expect(
        document.querySelector('button[data-testid="toolbar-sync-button"]'),
      ).toBeInTheDocument();
    });

    act(() => setSyncActivity({ isSyncing: false, projectIds: [] }));

    expect(document.querySelector('button[data-testid="toolbar-sync-button"]')).toBeInTheDocument();
  });
  it('is visible and interactive while send/receive availability is unknown (fail-open)', async () => {
    // Availability is unknown while the extension host is busy or send/receive is still activating.
    // The button must stay visible through that — only a settled `false` hides it.
    vi.mocked(useSendReceiveAvailability).mockReturnValue(undefined);
    mockSendCommand(true);
    render(<PlatformBibleToolbar />);

    // Reachable via the accessibility tree and keyboard, and shows the idle label
    const btn = screen.getByRole('button', { name: /Sync/ });
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
    expect(screen.getByRole('button', { name: /Sync/ })).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(SEND_RECEIVE_UNKNOWN_GRACE_MS);
    });
    expect(screen.getByRole('button', { name: /Sync/ })).toBeInTheDocument();
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
    // Power mode deliberately has no toolbar Sync: send/receive already surfaces itself there (a
    // notification while syncing, progress in the send/receive dialog, and progress in an open
    // editor window), and power users start one per project from the Home view.
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

  it('is not rendered at startup while the interface mode is not yet known', async () => {
    // A power user's first start has no cached mode, so the setting reports its 'simple' default
    // until it resolves. Sync has to wait for the real mode rather than render on that placeholder,
    // or it appears in the power toolbar and then vanishes.
    vi.mocked(useSetting).mockReturnValue(['simple', vi.fn(), vi.fn(), true]);
    mockSendCommand(true);
    render(<PlatformBibleToolbar />);

    // The marketing version arrives from an async command, so finding it proves the toolbar has
    // rendered past its async work and the absence below is a real absence, not an early read.
    await screen.findByText('1.0.0');
    expect(
      document.querySelector('button[data-testid="toolbar-sync-button"]'),
    ).not.toBeInTheDocument();
  });

  it('appears once the interface mode resolves to simple', async () => {
    // The positive control for the test above: same setup, same assertions, only the mode settling
    // differs — so the absence there is caused by the unknown mode and nothing else.
    vi.mocked(useSetting).mockReturnValue(['simple', vi.fn(), vi.fn(), true]);
    mockSendCommand(true);
    const { rerender } = render(<PlatformBibleToolbar />);
    await screen.findByText('1.0.0');
    expect(
      document.querySelector('button[data-testid="toolbar-sync-button"]'),
    ).not.toBeInTheDocument();

    vi.mocked(useSetting).mockReturnValue(['simple', vi.fn(), vi.fn(), false]);
    rerender(<PlatformBibleToolbar />);

    await waitFor(() => {
      expect(
        document.querySelector('button[data-testid="toolbar-sync-button"]'),
      ).toBeInTheDocument();
    });
  });

  it('is rendered with the idle label when send/receive is available', async () => {
    mockSendCommand(true);
    render(<PlatformBibleToolbar />);
    await waitFor(() => {
      const btn = screen.getByRole('button', { name: /Sync/ });
      expect(btn).toBeInTheDocument();
      expect(btn).toHaveTextContent('Sync');
    });
  });

  // Scope of this block: the toolbar's own questions — whether the sync button appears at all, and
  // whether the status it renders with tracks the sync-state event. The toolbar is what mounts the
  // button, and it mounts it before send/receive availability has settled. The button's own
  // behavior — popover, Cancel, project names, failure reporting — is covered by
  // sync-status-button.component.test.tsx, which drives the real component.

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
      expect(screen.getByRole('button', { name: /Sync/ })).toBeInTheDocument();
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

    // Seeded mid-sync, NOT already synced: the event has to be what drives the transition, or this
    // test would pass with the component's event handling deleted.
    mockSendCommandWithSyncStates(true, [
      { isSyncing: true, lastRequestedProjectIds: [], syncingProjectIds: [] },
      // A sync that ENDED is only "Synced" if it succeeded, which the results are what establish —
      // and only the read that follows the event carries them.
      {
        isSyncing: false,
        lastRequestedProjectIds: ['proj1'],
        syncingProjectIds: [],
        lastResults: {
          sendReceiveDate: '2026-08-19T00:00:00Z',
          resultsInfo: { proj1: { id: 'proj1', resultStatus: 'succeeded' } },
        },
      },
    ]);
    render(<PlatformBibleToolbar />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Syncing' })).toBeInTheDocument();
    });
    expect(screen.queryByRole('button', { name: 'Test Synced' })).not.toBeInTheDocument();

    expect(capturedSyncStateCallback).toBeDefined();
    if (!capturedSyncStateCallback)
      throw new Error('capturedSyncStateCallback was not set by mock');

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

describe('PlatformBibleToolbar — project selector visibility by interface mode', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useSetting).mockReturnValue(['simple', vi.fn(), vi.fn(), false]);
    mockSendCommand(true);
  });

  it('renders the project selector when platform.interfaceMode is "simple"', async () => {
    render(<PlatformBibleToolbar />);
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-project-selector')).toBeInTheDocument();
    });
  });

  it('hides the project selector when platform.interfaceMode is "power"', async () => {
    vi.mocked(useSetting).mockReturnValue(['power', vi.fn(), vi.fn(), false]);
    render(<PlatformBibleToolbar />);
    await waitFor(() => {
      expect(screen.queryByTestId('toolbar-project-selector')).not.toBeInTheDocument();
    });
  });

  it('hides the project selector while the interface mode is not yet known', async () => {
    // Same startup window the Sync button waits out: with no cached mode the setting reports its
    // 'simple' default, and a picker that power mode replaces with the Home button must not render
    // on that placeholder.
    vi.mocked(useSetting).mockReturnValue(['simple', vi.fn(), vi.fn(), true]);
    const { rerender } = render(<PlatformBibleToolbar />);
    await screen.findByText('1.0.0');
    expect(screen.queryByTestId('toolbar-project-selector')).not.toBeInTheDocument();

    // Positive control: the same render shows the picker as soon as the mode settles.
    vi.mocked(useSetting).mockReturnValue(['simple', vi.fn(), vi.fn(), false]);
    rerender(<PlatformBibleToolbar />);
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-project-selector')).toBeInTheDocument();
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

  it('applies ghost styling to the project selector in simple mode', async () => {
    vi.mocked(useSetting).mockReturnValue(['simple', vi.fn(), vi.fn(), false]);
    render(<PlatformBibleToolbar />);
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-project-selector')).toBeInTheDocument();
    });
    expect(
      document.querySelector('[data-trigger-classname]')?.getAttribute('data-trigger-classname'),
    ).toContain('tw:border-0');
  });
});

describe('PlatformBibleToolbar — books beyond the active project', () => {
  /** `platformScripture.booksPresent` bit string with only Genesis (canon book 1) set. */
  const GENESIS_ONLY_BOOKS_PRESENT = '1';

  const mockCurrentBook = (book: string) => {
    vi.mocked(useScrollGroupScrRef).mockReturnValue([
      { book, chapterNum: 1, verseNum: 1 },
      vi.fn(),
      0,
      vi.fn(),
      undefined,
    ]);
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockSendCommand(true);
    // clearAllMocks() does not reset a prior test's mockReturnValue (see precedent above), so state
    // the whole starting position: simple mode, an active project holding only Genesis, the
    // reference sitting in Genesis, and Revelation open as a resource.
    vi.mocked(useSetting).mockReturnValue(['simple', vi.fn(), vi.fn(), false]);
    vi.mocked(useProjectSetting).mockReturnValue([
      GENESIS_ONLY_BOOKS_PRESENT,
      vi.fn(),
      vi.fn(),
      false,
    ]);
    mockCurrentBook('GEN');
    vi.mocked(useOpenProjectBookIds).mockReturnValue(['REV']);
  });

  it('offers books from open resources to the book chapter control', async () => {
    render(<PlatformBibleToolbar />);
    const control = await screen.findByTestId('book-chapter-control');
    expect(control).toHaveAttribute('data-additional-books', 'REV');
  });

  it('offers nothing beyond the active project in power mode', async () => {
    // Power mode's book/chapter/verse controls are out of scope for this widening, so the toolbar
    // must not hand them additional books even when open resources have some.
    vi.mocked(useSetting).mockReturnValue(['power', vi.fn(), vi.fn(), false]);
    render(<PlatformBibleToolbar />);
    const control = await screen.findByTestId('book-chapter-control');
    expect(control).not.toHaveAttribute('data-additional-books');
  });

  it('offers nothing beyond the active project while the interface mode is not yet known', async () => {
    // Same startup window Sync and the project picker wait out. The widened list is simple mode's
    // content, so a power user must not be shown it — nor the "show more books" affordance that
    // comes with it — on the 'simple' placeholder that stands in for an unresolved read.
    vi.mocked(useSetting).mockReturnValue(['simple', vi.fn(), vi.fn(), true]);
    const { rerender } = render(<PlatformBibleToolbar />);
    const control = await screen.findByTestId('book-chapter-control');
    expect(control).not.toHaveAttribute('data-additional-books');

    // Positive control: the same render offers the open resource's books once the mode settles.
    vi.mocked(useSetting).mockReturnValue(['simple', vi.fn(), vi.fn(), false]);
    rerender(<PlatformBibleToolbar />);
    await waitFor(() => {
      expect(screen.getByTestId('book-chapter-control')).toHaveAttribute(
        'data-additional-books',
        'REV',
      );
    });
  });

  it('offers the current book when the active project does not have it', async () => {
    // BookChapterControl renders exactly the book list it is given, so a reference on a book the
    // active project lacks is only in its own picker because the toolbar adds it.
    vi.mocked(useOpenProjectBookIds).mockReturnValue([]);
    mockCurrentBook('JHN');
    render(<PlatformBibleToolbar />);
    const control = await screen.findByTestId('book-chapter-control');
    expect(control).toHaveAttribute('data-additional-books', 'JHN');
  });

  it('passes no additional books callback when there are none', async () => {
    vi.mocked(useOpenProjectBookIds).mockReturnValue([]);
    render(<PlatformBibleToolbar />);
    const control = await screen.findByTestId('book-chapter-control');
    expect(control).not.toHaveAttribute('data-additional-books');
  });

  it('does not repeat the current book when an open resource already offers it', async () => {
    mockCurrentBook('REV');
    render(<PlatformBibleToolbar />);
    const control = await screen.findByTestId('book-chapter-control');
    expect(control).toHaveAttribute('data-additional-books', 'REV');
  });
});

describe('PlatformBibleToolbar — main menu data stays live', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSendCommand(true);
    // Already the file-wide default; stated explicitly because these tests are about the MAIN
    // window specifically, and `vi.clearAllMocks()` above doesn't touch globals.
    globalThis.isMainWindow = true;
  });

  afterEach(() => {
    globalThis.isMainWindow = undefined;
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

describe('PlatformBibleToolbar — the menu belongs to the main window only', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSendCommand(true);
  });

  afterEach(() => {
    globalThis.isMainWindow = undefined;
  });

  it('gives the Toolbar menu data in the main window', async () => {
    globalThis.isMainWindow = true;
    render(<PlatformBibleToolbar />);
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-menubar')).toBeInTheDocument();
    });
  });

  it('withholds menu data in a secondary window, and does not subscribe to the provider at all', async () => {
    globalThis.isMainWindow = false;
    render(<PlatformBibleToolbar />);
    await waitFor(() => {
      expect(screen.getByTestId('toolbar-root')).toBeInTheDocument();
    });
    expect(screen.queryByTestId('toolbar-menubar')).not.toBeInTheDocument();
    // The gate is upstream of the subscription, not just of the prop: passing `undefined` as the
    // source is what keeps every secondary window from paying for a merged, localized menu it
    // then discards.
    expect(useData).not.toHaveBeenCalledWith(menuDataService.dataProviderName);
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

  it('reserves the live-measured overlay width on Linux, the same as Windows', async () => {
    // Linux takes the frameless path with its own caption buttons, so the toolbar has to leave room
    // for them. Without the reservation the account icon draws on top of the maximize glyph.
    vi.mocked(useWindowControlsOverlay).mockReturnValue(
      new DOMRect(0, 0, window.innerWidth - 150, 32),
    );
    mockSendCommandForOS('linux');

    render(<PlatformBibleToolbar />);

    await waitFor(() => {
      expect(screen.getByTestId('toolbar-reserved-space-wrapper')).toHaveStyle({
        paddingRight: '154px',
      });
    });
    expect(screen.getByTestId('toolbar-root')).toHaveClass('tw:border-0');
    expect(screen.getByTestId('toolbar-root')).toHaveClass('tw:pe-0');
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

describe('PlatformBibleToolbar project selector label', () => {
  // `clearAllMocks()` clears call history but does not reset `mockReturnValue`, so restore the
  // module factory's default picker data explicitly to prevent a per-test `mockReturnValue` from
  // leaking. A per-test `mockReturnValueOnce` still takes priority over this.
  beforeEach(async () => {
    const { useProjectPickerData } = await import('@renderer/hooks/use-project-picker-data.hook');
    vi.mocked(useProjectPickerData).mockReturnValue({
      currentSimpleProject: { id: 'proj-1', fullName: 'Test Project', shortName: 'TP' },
      recentProjects: [{ id: 'proj-1', fullName: 'Test Project', shortName: 'TP' }],
      allProjects: [],
      currentSimpleProjectError: undefined,
      isLoading: false,
    });
  });

  /** Renders the toolbar with the project selector's shrink step forced, since jsdom cannot measure. */
  function renderAtStep(shrinkStep: number) {
    return render(
      <ShrinkStepContext.Provider value={shrinkStep}>
        <PlatformBibleToolbar />
      </ShrinkStepContext.Provider>,
    );
  }

  it('shows the full project name and short name when there is room', () => {
    renderAtStep(SHRINK_STEP.WIDE);

    const trigger = screen.getByTestId('project-picker-value');
    expect(trigger).toHaveTextContent('Test Project');
    expect(trigger).toHaveTextContent('TP');
  });

  it('drops the full name at the narrowest step, keeping the identifying short name', () => {
    renderAtStep(SHRINK_STEP.MINIMUM);

    const trigger = screen.getByTestId('project-picker-value');
    expect(trigger).toHaveTextContent('TP');
    expect(trigger).not.toHaveTextContent('Test Project');
  });

  it('keeps the project name and short name readable as one string', () => {
    // Split across two spans, so without a real separator this reads "Test Project(TP)".
    renderAtStep(SHRINK_STEP.WIDE);

    expect(screen.getByTestId('project-picker-value')).toHaveTextContent('Test Project (TP)');
  });

  it('shows an error in place of the label, not alongside it', async () => {
    const { useProjectPickerData } = await import('@renderer/hooks/use-project-picker-data.hook');
    vi.mocked(useProjectPickerData).mockReturnValueOnce({
      currentSimpleProject: { id: 'proj-1', fullName: 'Test Project', shortName: 'TP' },
      recentProjects: [],
      allProjects: [],
      currentSimpleProjectError: 'Project failed to load',
      isLoading: false,
    });

    renderAtStep(SHRINK_STEP.WIDE);

    const trigger = screen.getByTestId('project-picker-value');
    expect(trigger).toHaveTextContent('Project failed to load');
    expect(trigger).not.toHaveTextContent('Test Project');
  });

  it('lowers the trigger width floor at the narrowest step, so dropping the full name actually frees space', () => {
    // Without this the label just gets shorter inside a box still reserving 192px, and the room the
    // abbreviation was supposed to buy comes out of the reference control instead.
    const { unmount } = renderAtStep(SHRINK_STEP.WIDE);
    const wideTrigger = document
      .querySelector('[data-trigger-classname]')
      ?.getAttribute('data-trigger-classname');
    unmount();

    renderAtStep(SHRINK_STEP.MINIMUM);
    const narrowTrigger = document
      .querySelector('[data-trigger-classname]')
      ?.getAttribute('data-trigger-classname');

    expect(wideTrigger).toMatch(/(?:^|\s)tw:min-w-48(?:\s|$)/);
    expect(narrowTrigger).toMatch(/(?:^|\s)tw:min-w-24(?:\s|$)/);
    expect(narrowTrigger).not.toMatch(/(?:^|\s)tw:min-w-48(?:\s|$)/);
  });

  it('shows the placeholder when nothing is selected, rather than an empty trigger', async () => {
    const { useProjectPickerData } = await import('@renderer/hooks/use-project-picker-data.hook');
    vi.mocked(useProjectPickerData).mockReturnValue({
      currentSimpleProject: undefined,
      recentProjects: [],
      allProjects: [{ id: 'p1', fullName: 'Project One', shortName: 'P1' }],
      currentSimpleProjectError: undefined,
      isLoading: false,
    });

    renderAtStep(SHRINK_STEP.WIDE);

    expect(screen.getByTestId('project-picker-value')).toHaveTextContent('Test select a project');
  });

  it('names the open project even when it is missing from both picker lists', async () => {
    // `useProjectPickerData` resolves the active editor's project by a direct metadata lookup when
    // the shared snapshot does not carry it, so the current project can legitimately be absent from
    // `recentProjects` and `allProjects`. Falling through to the placeholder there would tell the
    // user nothing is open while their project is on screen.
    const { useProjectPickerData } = await import('@renderer/hooks/use-project-picker-data.hook');
    vi.mocked(useProjectPickerData).mockReturnValue({
      currentSimpleProject: { id: 'proj-1', fullName: 'Test Project', shortName: 'TP' },
      recentProjects: [],
      allProjects: [],
      currentSimpleProjectError: undefined,
      isLoading: false,
    });

    renderAtStep(SHRINK_STEP.WIDE);

    const trigger = screen.getByTestId('project-picker-value');
    expect(trigger).toHaveTextContent('Test Project (TP)');
    expect(trigger).not.toHaveTextContent('Test select a project');
  });

  it('offers the whole error message on hover once the visible text is clipped', async () => {
    const { useProjectPickerData } = await import('@renderer/hooks/use-project-picker-data.hook');
    vi.mocked(useProjectPickerData).mockReturnValue({
      currentSimpleProject: { id: 'proj-1', fullName: 'Test Project', shortName: 'TP' },
      recentProjects: [],
      allProjects: [],
      currentSimpleProjectError: 'Project failed to load',
      isLoading: false,
    });

    renderAtStep(SHRINK_STEP.WIDE);

    const errorLabel = screen.getByText('Project failed to load');
    // jsdom lays nothing out, so the clipped state the truncation tooltip keys off has to be stated.
    Object.defineProperty(errorLabel, 'scrollWidth', { configurable: true, value: 400 });
    Object.defineProperty(errorLabel, 'clientWidth', { configurable: true, value: 100 });
    fireEvent.pointerEnter(errorLabel);

    await waitFor(() => {
      expect(screen.getAllByText('Project failed to load').length).toBeGreaterThan(1);
    });
  });

  it('keeps an error visible at the narrowest step, where the project name would be dropped', async () => {
    // Routing the error through the label's droppable field would leave the user with a red short
    // name and no statement of what went wrong.
    const { useProjectPickerData } = await import('@renderer/hooks/use-project-picker-data.hook');
    vi.mocked(useProjectPickerData).mockReturnValue({
      currentSimpleProject: { id: 'proj-1', fullName: 'Test Project', shortName: 'TP' },
      recentProjects: [],
      allProjects: [],
      currentSimpleProjectError: 'Project failed to load',
      isLoading: false,
    });

    renderAtStep(SHRINK_STEP.MINIMUM);

    expect(screen.getByTestId('project-picker-value')).toHaveTextContent('Project failed to load');
  });
});

// The simple-mode setup the project-selector describe blocks use (see 'project selector
// visibility by interface mode'), plus the picker data each block varies.
async function renderSimpleToolbarWith(data: Partial<ProjectPickerData>) {
  const { useProjectPickerData } = await import('@renderer/hooks/use-project-picker-data.hook');
  vi.mocked(useProjectPickerData).mockReturnValue({
    currentSimpleProject: undefined,
    recentProjects: [],
    allProjects: [],
    currentSimpleProjectError: undefined,
    isLoading: false,
    ...data,
  });
  const renderResult = render(<PlatformBibleToolbar />);
  await waitFor(() => {
    expect(screen.getByTestId('toolbar-project-selector')).toBeInTheDocument();
  });
  return renderResult;
}

describe('PlatformBibleToolbar — project selector wiring', () => {
  const NINE_PROJECTS = Array.from({ length: 9 }, (_, i) => ({
    id: `p${(i + 1).toString()}`,
    shortName: `P${(i + 1).toString()}`,
    fullName: `Project ${(i + 1).toString()}`,
    isEditable: i < 5,
  }));

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useSetting).mockReturnValue(['simple', vi.fn(), vi.fn(), false]);
    mockSendCommand(true);
  });

  it('accounts for every project across the two sections, recent first', async () => {
    await renderSimpleToolbarWith({
      recentProjects: [NINE_PROJECTS[2], NINE_PROJECTS[0]],
      allProjects: NINE_PROJECTS.filter((p) => p.id !== 'p3' && p.id !== 'p1'),
    });

    const { projects, customSections } = requireCapturedProjectSelectorProps();
    const sections = customSections ?? [];

    expect(sections.map((s) => s.id)).toEqual(['recent', 'yours']);
    // Every project must land in some section — a project matching none would vanish from the list.
    expect(projects.every((p) => sections.some((s) => s.match(p)))).toBe(true);
    expect(projects).toHaveLength(9);

    // First-match-wins: exactly the recent ids match the 'recent' descriptor.
    expect(
      projects
        .filter((p) => sections[0].match(p))
        .map((p) => p.id)
        .sort(),
    ).toEqual(['p1', 'p3']);
    // ...and its compare orders them by recency, not alphabetically.
    expect(
      projects
        .filter((p) => sections[0].match(p))
        .sort(sections[0].compare)
        .map((p) => p.id),
    ).toEqual(['p3', 'p1']);
  });

  it('offers the footer action and stays enabled with zero local projects', async () => {
    await renderSimpleToolbarWith({ recentProjects: [], allProjects: [] });

    const { footerAction, isDisabled } = requireCapturedProjectSelectorProps();
    expect(footerAction).toBeDefined();
    expect(isDisabled).toBeFalsy();
  });

  it('marks a read-only project and leaves an editable one unmarked', async () => {
    await renderSimpleToolbarWith({
      allProjects: [
        { id: 'ed', shortName: 'ED', fullName: 'Editable', isEditable: true },
        { id: 'ro', shortName: 'RO', fullName: 'Readonly', isEditable: false },
      ],
    });

    const { renderProjectIndicator } = requireCapturedProjectSelectorProps();
    expect(renderProjectIndicator).toBeDefined();
    expect(
      renderProjectIndicator?.({ id: 'ro', shortName: 'RO', fullName: 'Readonly' }),
    ).not.toBeUndefined();
    expect(
      renderProjectIndicator?.({ id: 'ed', shortName: 'ED', fullName: 'Editable' }),
    ).toBeUndefined();
  });

  it('leaves a project whose editability is unstated unmarked', async () => {
    // Absent metadata means editable — the registered default for `platform.isEditable` is true —
    // so a falsy check here would put a lock on every project a factory left unstated.
    await renderSimpleToolbarWith({
      allProjects: [{ id: 'un', shortName: 'UN', fullName: 'Unstated' }],
    });

    const { renderProjectIndicator } = requireCapturedProjectSelectorProps();
    expect(renderProjectIndicator).toBeDefined();
    expect(
      renderProjectIndicator?.({ id: 'un', shortName: 'UN', fullName: 'Unstated' }),
    ).toBeUndefined();
  });

  it('passes a localized search placeholder rather than falling back to English defaults', async () => {
    await renderSimpleToolbarWith({ allProjects: [] });

    const { localizedStrings } = requireCapturedProjectSelectorProps();
    expect(localizedStrings?.searchPlaceholder).toBe('Test search projects');
  });
});

describe('PlatformBibleToolbar — pending project display', () => {
  const NEW_PROJECT = { id: 'new', shortName: 'NEW', fullName: 'New Project', isEditable: true };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useSetting).mockReturnValue(['simple', vi.fn(), vi.fn(), false]);
    mockSendCommand(true);
  });

  /** Picks a project from the popover, the way the real selector reports a selection. */
  function selectProjectFromPopover(projectId: string) {
    const onChangeSelection = getOnChangeSelection(requireCapturedProjectSelectorProps());
    act(() => {
      onChangeSelection?.({ projectId });
    });
  }

  /** Resolves the "More projects…" dialog with the id a real dialog response carries. */
  function resolveProjectPickerDialogWith(projectId: string | undefined) {
    const resolveDialog = capturedDialogResolvers.at(-1);
    act(() => {
      resolveDialog?.(projectId);
    });
  }

  it('names a pending project chosen from the dialog, without adding a row for it', async () => {
    await renderSimpleToolbarWith({ allProjects: [] });

    const { footerAction } = requireCapturedProjectSelectorProps();
    act(() => {
      footerAction?.onSelect();
    });
    // The dialog is the slower of the two paths, and it can return a project the short list never
    // contained.
    resolveProjectPickerDialogWith('far');

    const props = requireCapturedProjectSelectorProps();
    expect(getSelection(props)?.projectId).toBe('far');
    // Named by the trigger's own fallback, so no phantom row is injected into the visible list.
    expect(props.projects.some((project) => project.id === 'far')).toBe(false);
    const trigger = screen.getByTestId('project-picker-value');
    expect(trigger).toHaveTextContent('far');
    expect(trigger).not.toHaveTextContent('Test no projects');
  });

  it('names the newly picked project instead of a stale error for the project that failed to resolve', async () => {
    // The current project failed to resolve (currentSimpleProjectError is set), and the user then
    // picks a different one from the popover. The trigger must name their new pick at once rather
    // than continuing to show the error, which would otherwise persist until the hook's promise
    // re-runs on the editor opening.
    await renderSimpleToolbarWith({
      currentSimpleProject: undefined,
      currentSimpleProjectError: 'Project failed to load',
      allProjects: [NEW_PROJECT],
    });
    expect(screen.getByTestId('project-picker-value')).toHaveTextContent('Project failed to load');

    selectProjectFromPopover('new');

    const trigger = screen.getByTestId('project-picker-value');
    expect(trigger).toHaveTextContent('NEW');
    expect(trigger).not.toHaveTextContent('Project failed to load');
  });
});
