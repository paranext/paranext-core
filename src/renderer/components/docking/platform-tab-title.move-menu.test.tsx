import '@testing-library/jest-dom';
import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useIsPowerMode } from '@renderer/hooks/use-is-power-mode.hook';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { notificationService } from '@shared/services/notification.service';
import { describeWebViewMoveFailure } from '@shared/models/web-view-move.model';
import { PlatformTabTitle } from './platform-tab-title.component';

// #region mocks

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%tab_aria_tab%': 'tab',
      '%tab_contextMenu_floatPanel%': 'Float Tab',
      '%tab_contextMenu_moveTabToNewWindow%': 'Move tab to new window',
    },
  ]),
  useData: vi.fn(() => ({
    Focus: () => [undefined, vi.fn()],
  })),
  useDataProvider: vi.fn(() => undefined),
}));

vi.mock('@renderer/hooks/use-last-selected-scripture-navigable-web-view-id.hook', () => ({
  useLastSelectedScriptureNavigableWebViewId: vi.fn(() => undefined),
}));

vi.mock('@renderer/hooks/use-last-focused-tab-id.hook', () => ({
  useLastFocusedTabId: vi.fn(() => undefined),
}));

// Mock heavy transitive deps that run side-effects at module init in jsdom.
vi.mock('@renderer/services/theme.service', () => ({
  __esModule: true,
  localThemeService: {},
}));

// Default to power mode; the "outside power mode" test overrides this to false.
vi.mock('@renderer/hooks/use-is-power-mode.hook', () => ({
  useIsPowerMode: vi.fn(() => true),
}));

vi.mock('@renderer/services/web-view.service-shard', () => ({
  floatTab: vi.fn(),
  updateTabPartialSync: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

vi.mock('@shared/services/window.service', () => ({
  windowService: { dataProviderName: 'platform.windowServiceDataProvider' },
}));

vi.mock('@shared/services/notification.service', () => ({
  notificationService: { send: vi.fn(async () => 'notification-1') },
}));

vi.mock('@shared/services/command.service', () => ({
  sendCommand: vi.fn(),
}));

// Stub the context-menu primitives so the menu items render as plain, clickable elements without
// depending on Radix's portal/asChild behavior — mirrors the pre-existing component test's stub,
// but keeps `onClick` wired through (that file's stub drops it) since these tests click the item.
vi.mock('platform-bible-react', async (importOriginal) => {
  const actual = await importOriginal<object>();
  return {
    ...actual,
    ContextMenu: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="context-menu">{children}</div>
    ),
    ContextMenuTrigger: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
    ContextMenuContent: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
    ContextMenuItem: ({
      children,
      onClick,
    }: {
      children: React.ReactNode;
      onClick?: () => void;
    }) => (
      <button type="button" onClick={onClick}>
        {children}
      </button>
    ),
    Tooltip: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
    TooltipProvider: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
    TooltipTrigger: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
    TooltipContent: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
  };
});

// #endregion

describe('PlatformTabTitle "Move tab to new window" context-menu item', () => {
  afterEach(() => {
    cleanup();
    vi.mocked(useIsPowerMode).mockReturnValue(true);
    vi.mocked(sendCommand).mockReset();
    vi.mocked(logger.error).mockClear();
    // Every notification assertion below asks whether the message was sent at all, so calls left
    // over from an earlier test would let one of them pass on another test's notification
    vi.mocked(notificationService.send).mockClear();
  });

  it('a web view tab in power mode offers "Move tab to new window"', () => {
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" text="Tab" />);

    expect(screen.getByText('Move tab to new window')).toBeInTheDocument();
  });

  it('clicking it sends platform.moveWebViewToNewWindow with the web view id', async () => {
    vi.mocked(sendCommand).mockResolvedValue('web-view-1');
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" text="Tab" />);

    fireEvent.click(screen.getByText('Move tab to new window'));

    await waitFor(() =>
      expect(sendCommand).toHaveBeenCalledWith('platform.moveWebViewToNewWindow', 'web-view-1'),
    );
  });

  it('outside power mode the item is absent', () => {
    vi.mocked(useIsPowerMode).mockReturnValue(false);
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" text="Tab" />);

    expect(screen.queryByText('Move tab to new window')).not.toBeInTheDocument();
  });

  it('a tab that is not a web view does not offer it', () => {
    render(<PlatformTabTitle id="tab-1" text="Tab" />);

    expect(screen.getByText('Float Tab')).toBeInTheDocument();
    expect(screen.queryByText('Move tab to new window')).not.toBeInTheDocument();
  });

  it('a rejected move is logged, not thrown into React', async () => {
    vi.mocked(sendCommand).mockRejectedValue(new Error('window creation failed'));
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" text="Tab" />);

    fireEvent.click(screen.getByText('Move tab to new window'));

    await waitFor(() =>
      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('Failed to move web view web-view-1 to a new window'),
      ),
    );
  });

  it('a rejected move is surfaced to the user as an error notification', async () => {
    // The move rejects with the tab somewhere the user did not ask for; a log line alone leaves
    // them staring at a menu item that silently did nothing
    vi.mocked(sendCommand).mockRejectedValue(new Error('window creation failed'));
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" text="Tab" />);

    fireEvent.click(screen.getByText('Move tab to new window'));

    await waitFor(() =>
      expect(notificationService.send).toHaveBeenCalledWith(
        expect.objectContaining({
          message: '%tab_contextMenu_moveTab_failed%',
          severity: 'error',
        }),
      ),
    );
  });

  it('a move whose tab went back where it came from says nothing moved', async () => {
    vi.mocked(sendCommand).mockRejectedValue(
      new Error(
        describeWebViewMoveFailure(
          'reopened-in-source-window',
          'Could not move webview web-view-1 to a new window; it was reopened in window 2, where it came from.',
        ),
      ),
    );
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" text="Tab" />);

    fireEvent.click(screen.getByText('Move tab to new window'));

    await waitFor(() =>
      expect(notificationService.send).toHaveBeenCalledWith(
        expect.objectContaining({
          message: '%tab_contextMenu_moveTab_failed%',
          severity: 'error',
        }),
      ),
    );
  });

  it('a move whose tab landed in another window says so rather than that nothing happened', async () => {
    // The tab DID move, just not to the window the user asked for. Telling them the move failed
    // sends them looking for it where it no longer is.
    vi.mocked(sendCommand).mockRejectedValue(
      new Error(
        describeWebViewMoveFailure(
          'reopened-in-focused-window',
          'Could not move webview web-view-1 to a new window; it was reopened in the focused window.',
        ),
      ),
    );
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" text="Tab" />);

    fireEvent.click(screen.getByText('Move tab to new window'));

    await waitFor(() =>
      expect(notificationService.send).toHaveBeenCalledWith(
        expect.objectContaining({
          message: '%tab_contextMenu_moveTab_failedReopenedElsewhere%',
          severity: 'error',
        }),
      ),
    );
  });

  it('a move that could reopen the tab nowhere says the tab is gone', async () => {
    // The worst of the three and the one the generic message serves worst: the tab is open in no
    // window at all, and the user is the only one who can decide to open it again
    vi.mocked(sendCommand).mockRejectedValue(
      new Error(
        describeWebViewMoveFailure(
          'not-reopened',
          'Could not move webview web-view-1 to a new window, and could not reopen it anywhere afterwards. Its captured definition is in the log.',
        ),
      ),
    );
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" text="Tab" />);

    fireEvent.click(screen.getByText('Move tab to new window'));

    await waitFor(() =>
      expect(notificationService.send).toHaveBeenCalledWith(
        expect.objectContaining({
          message: '%tab_contextMenu_moveTab_failedNotReopened%',
          severity: 'error',
        }),
      ),
    );
  });

  it('a move that may have taken the tab with it says so rather than that nothing happened', async () => {
    // The move failed at the step that takes the tab out of its window, so nobody knows whether the
    // tab is still there. "Could not move it" reads as "nothing changed", which sends a user whose
    // tab did vanish looking at the window it was in instead of at the log
    vi.mocked(sendCommand).mockRejectedValue(
      new Error(
        describeWebViewMoveFailure(
          'possibly-closed',
          'Could not move webview web-view-1 to a new window: capturing it failed (round trip lost). Window 2 may or may not still have it. Its definition from before the move is in the log.',
        ),
      ),
    );
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" text="Tab" />);

    fireEvent.click(screen.getByText('Move tab to new window'));

    await waitFor(() =>
      expect(notificationService.send).toHaveBeenCalledWith(
        expect.objectContaining({
          message: '%tab_contextMenu_moveTab_failedMayHaveClosed%',
          severity: 'error',
        }),
      ),
    );
  });

  it('a disposition that survived the network round trip is still read', async () => {
    // What the renderer actually receives: the request plumbing wraps a handler's rejection in its
    // own message, so a disposition only reaches here if it is read out of the whole text rather
    // than off the front of it
    vi.mocked(sendCommand).mockRejectedValue(
      new Error(
        `JSON-RPC Request error (-32603): ${describeWebViewMoveFailure(
          'not-reopened',
          'Could not move webview web-view-1 to a new window, and could not reopen it anywhere afterwards. Its captured definition is in the log.',
        )}`,
      ),
    );
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" text="Tab" />);

    fireEvent.click(screen.getByText('Move tab to new window'));

    await waitFor(() =>
      expect(notificationService.send).toHaveBeenCalledWith(
        expect.objectContaining({
          message: '%tab_contextMenu_moveTab_failedNotReopened%',
          severity: 'error',
        }),
      ),
    );
  });

  it('a successful move shows no notification', async () => {
    vi.mocked(notificationService.send).mockClear();
    vi.mocked(sendCommand).mockResolvedValue('web-view-1');
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" text="Tab" />);

    fireEvent.click(screen.getByText('Move tab to new window'));

    await waitFor(() =>
      expect(sendCommand).toHaveBeenCalledWith('platform.moveWebViewToNewWindow', 'web-view-1'),
    );
    expect(notificationService.send).not.toHaveBeenCalled();
  });
});
