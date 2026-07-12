import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';
import { useScrollGroupScrRef, useSetting } from '@renderer/hooks/papi-hooks';
import { useNavigationTargetWebView } from '@renderer/hooks/use-navigation-target-web-view.hook';
import { ResolvedWebView } from '@renderer/services/navigation-target.util';
import { updateWebViewDefinitionSync } from '@renderer/services/web-view.service-host';
import { sendCommand } from '@shared/services/command.service';
import { getNetworkEvent } from '@shared/services/network.service';
import { PlatformBibleToolbar } from './platform-bible-toolbar';

// Mock asset
vi.mock('@assets/icon.png', () => ({ default: 'icon.png' }));

vi.mock('@renderer/components/platform-bible-menu.data', () => ({
  provideMenuData: vi.fn(async () => ({ columns: {}, groups: {}, items: [] })),
}));

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

vi.mock('@renderer/services/web-view.service-host', () => ({
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

vi.mock('@renderer/services/theme.service-host', () => ({
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

vi.mock('@renderer/services/scroll-group.service-host', () => ({
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
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn() },
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
    Toolbar: ({
      configAreaChildren,
      children,
    }: {
      configAreaChildren?: React.ReactNode;
      children?: React.ReactNode;
    }) => (
      <div>
        <div data-testid="toolbar-config-area">{configAreaChildren}</div>
        <div data-testid="toolbar-main-area">{children}</div>
      </div>
    ),
    // Mirrors the real BookChapterControl's trigger (aria-label + disabled) so tests can assert on
    // the disabled state that platform-bible-toolbar.tsx wires up, without pulling in the real
    // component's Radix Popover/Command internals.
    BookChapterControl: ({ disabled }: { disabled?: boolean }) => (
      <button
        type="button"
        aria-label="book-chapter-trigger"
        disabled={disabled}
        data-testid="book-chapter-control"
      />
    ),
    ScrollGroupSelector: () => <div data-testid="scroll-group-selector" />,
    Select: ({ children, disabled }: { children?: React.ReactNode; disabled?: boolean }) => (
      <div data-testid="project-picker-select" aria-disabled={disabled}>
        {children}
      </div>
    ),
    SelectTrigger: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
    SelectContent: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
    SelectItem: ({ children, value }: { children?: React.ReactNode; value?: string }) => (
      <div data-value={value}>{children}</div>
    ),
    SelectSeparator: () => <hr />,
    SelectValue: ({ placeholder }: { placeholder?: string }) => <span>{placeholder}</span>,
  };
});

const mockSendCommand = (isSendReceiveAvailable: boolean) => {
  vi.mocked(sendCommand).mockImplementation(
    // sendCommand has a complex generic signature; cast is required for the mock implementation
    // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
    (async (commandName: string) => {
      if (commandName === 'platformGetResources.isSendReceiveAvailable')
        return isSendReceiveAvailable;
      if (commandName === 'platform.getOSPlatform') return 'win32';
      if (commandName === 'platform.isFullScreen') return false;
      return undefined;
      // sendCommand has a complex generic signature; cast is required for the mock implementation
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
    }) as any,
  );
};

describe('PlatformBibleToolbar — Sync button', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('is not rendered when isSendReceiveAvailable returns false', async () => {
    mockSendCommand(false);
    render(<PlatformBibleToolbar />);
    await waitFor(() => {
      // Verify absent from DOM entirely (not just hidden like the loading state)
      expect(
        document.querySelector('button[data-testid="toolbar-sync-button"]'),
      ).not.toBeInTheDocument();
    });
  });

  it('is in the DOM but hidden and non-interactive while isSendReceiveAvailable is loading', async () => {
    vi.mocked(sendCommand).mockImplementation(
      // sendCommand has a complex generic signature; cast is required for the mock implementation
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      (async (commandName: string) => {
        if (commandName === 'platformGetResources.isSendReceiveAvailable')
          return new Promise<never>(() => {}); // Never resolves — keeps component in loading state
        if (commandName === 'platform.getOSPlatform') return 'win32';
        if (commandName === 'platform.isFullScreen') return false;
        return undefined;
        // sendCommand has a complex generic signature; cast is required for the mock implementation
        // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      }) as any,
    );
    render(<PlatformBibleToolbar />);
    // Not reachable via accessibility tree (aria-hidden) or keyboard (tabIndex=-1)
    expect(screen.queryByRole('button', { name: 'Sync' })).not.toBeInTheDocument();
    // But physically present in the DOM, reserving layout space (tw:invisible)
    const loadingBtn = document.querySelector('button[data-testid="toolbar-sync-button"]');
    expect(loadingBtn).toBeInTheDocument();
    expect(loadingBtn).toHaveAttribute('aria-hidden', 'true');
    expect(loadingBtn).toHaveAttribute('tabIndex', '-1');
  });

  it('is rendered with correct text when isSendReceiveAvailable returns true', async () => {
    mockSendCommand(true);
    render(<PlatformBibleToolbar />);
    await waitFor(() => {
      const btn = screen.getByRole('button', { name: 'Sync' });
      expect(btn).toBeInTheDocument();
      expect(btn).toHaveTextContent('Sync');
    });
  });

  it('calls openSyncStatus command when clicked', async () => {
    mockSendCommand(true);
    render(<PlatformBibleToolbar />);
    const btn = await screen.findByRole('button', { name: 'Sync' });
    fireEvent.click(btn);
    await waitFor(() => {
      expect(vi.mocked(sendCommand)).toHaveBeenLastCalledWith(
        'paratextBibleSendReceive.openSyncStatus',
      );
    });
  });

  it('re-checks availability when extensions reload', async () => {
    let capturedReloadCallback: (() => unknown) | undefined;
    // PlatformEvent shape: (callback) => unsubscriber
    const networkEventImpl = vi.fn((cb: () => unknown) => {
      capturedReloadCallback = cb;
      return vi.fn();
    });
    // getNetworkEvent returns PlatformEvent which has a complex generic signature incompatible with vi.fn directly
    // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
    vi.mocked(getNetworkEvent).mockReturnValue(networkEventImpl as any);

    mockSendCommand(true);
    render(<PlatformBibleToolbar />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Sync' })).toBeInTheDocument();
    });

    const callsBefore = vi
      .mocked(sendCommand)
      .mock.calls.filter(([cmd]) => cmd === 'platformGetResources.isSendReceiveAvailable').length;
    expect(callsBefore).toBeGreaterThan(0);
    expect(capturedReloadCallback).toBeDefined();
    if (!capturedReloadCallback) throw new Error('capturedReloadCallback was not set by mock');

    await capturedReloadCallback();

    await waitFor(() => {
      expect(
        vi
          .mocked(sendCommand)
          .mock.calls.filter(([cmd]) => cmd === 'platformGetResources.isSendReceiveAvailable')
          .length,
      ).toBeGreaterThan(callsBefore);
    });
  });

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
      syncStateCallback({ isSyncing: false });
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Test Synced' })).toBeInTheDocument();
    });
  });

  it('keeps button invisible instead of removing it when command throws, and shows button when retry succeeds', async () => {
    vi.useFakeTimers();

    let callCount = 0;
    vi.mocked(sendCommand).mockImplementation(
      // sendCommand has a complex generic signature; cast is required for the mock implementation
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      (async (commandName: string) => {
        if (commandName === 'platformGetResources.isSendReceiveAvailable') {
          callCount += 1;
          if (callCount === 1) throw new Error('Extension host not ready');
          return true;
        }
        if (commandName === 'platform.getOSPlatform') return 'win32';
        if (commandName === 'platform.isFullScreen') return false;
        return undefined;
        // sendCommand has a complex generic signature; cast is required for the mock implementation
        // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      }) as any,
    );

    render(<PlatformBibleToolbar />);

    // Flush microtasks so the async sendCommand throw and catch block have run
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    // Button should stay in DOM as invisible (state remains undefined, not false)
    expect(document.querySelector('button[data-testid="toolbar-sync-button"]')).toBeInTheDocument();

    // Advance past the retry delay and flush the resulting async operations
    act(() => {
      vi.advanceTimersByTime(2001);
    });
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    // After retry returns true, button becomes visible
    expect(screen.getByRole('button', { name: 'Sync' })).toBeInTheDocument();
  });

  it('renders the UserProfilePopover stub', async () => {
    mockSendCommand(true);
    render(<PlatformBibleToolbar />);
    await waitFor(() => {
      expect(screen.getByTestId('user-profile-popover-stub')).toBeInTheDocument();
    });
  });

  it('logs a warning when openSyncStatus command fails', async () => {
    const { logger } = await import('@shared/services/logger.service');
    vi.mocked(sendCommand).mockImplementation(
      // sendCommand has a complex generic signature; cast is required for the mock implementation
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      (async (commandName: string) => {
        if (commandName === 'paratextBibleSendReceive.openSyncStatus')
          throw new Error('Sync failed');
        if (commandName === 'platformGetResources.isSendReceiveAvailable') return true;
        if (commandName === 'platform.getOSPlatform') return 'win32';
        if (commandName === 'platform.isFullScreen') return false;
        return undefined;
        // sendCommand has a complex generic signature; cast is required for the mock implementation
        // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      }) as any,
    );
    render(<PlatformBibleToolbar />);
    const btn = await screen.findByRole('button', { name: 'Sync' });
    fireEvent.click(btn);
    await waitFor(() => {
      expect(vi.mocked(logger.warn)).toHaveBeenCalledWith(
        expect.stringContaining('Toolbar caught an error while trying to open sync status:'),
      );
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
