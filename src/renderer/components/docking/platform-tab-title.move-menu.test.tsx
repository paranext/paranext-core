import '@testing-library/jest-dom';
import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useIsPowerMode } from '@renderer/hooks/use-is-power-mode.hook';
import { floatTab, getOpenTabCountSync } from '@renderer/services/web-view.service-shard';
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
      '%window_label_empty%': 'Empty window',
    },
  ]),
  useData: vi.fn(() => ({
    Focus: () => [undefined, vi.fn()],
    WebViewMenu: () => [
      {
        includeDefaults: true,
        topMenu: undefined,
        contextMenu: undefined,
        tabMenu: {
          groups: { 'platform.tabWindow': { order: 1, isExtensible: true } },
          items: [
            {
              label: 'Float Tab',
              group: 'platform.tabWindow',
              order: 1,
              command: 'platform.floatTab',
            },
            {
              label: 'Move tab to new window',
              group: 'platform.tabWindow',
              order: 2,
              command: 'platform.moveWebViewToNewWindow',
            },
            {
              id: 'platform.moveTabToWindow',
              label: 'Move tab to window',
              group: 'platform.tabWindow',
              order: 3,
            },
            {
              label: 'Look Up Word',
              group: 'platform.tabWindow',
              order: 4,
              command: 'someExtension.lookUpWord',
            },
          ],
        },
      },
      vi.fn(),
      false,
    ],
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
  // Two tabs open, so a tab is never the only one in its window unless a test says otherwise
  getOpenTabCountSync: vi.fn(() => 2),
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
    // Opening is explicit rather than automatic so tests that do not care about the window list
    // behave exactly as they did before the menu started reading it on open
    ContextMenu: ({
      children,
      onOpenChange,
    }: {
      children: React.ReactNode;
      onOpenChange?: (isOpen: boolean) => void;
    }) => (
      <div data-testid="context-menu">
        <button type="button" data-testid="open-menu" onClick={() => onOpenChange?.(true)}>
          open
        </button>
        {children}
      </div>
    ),
    ContextMenuTrigger: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
    ContextMenuContent: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
    ContextMenuSeparator: () => <hr />,
    ContextMenuSub: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
    ContextMenuSubTrigger: ({ children }: { children: React.ReactNode }) => (
      <span data-testid="submenu-trigger">{children}</span>
    ),
    ContextMenuSubContent: ({ children }: { children: React.ReactNode }) => (
      <span data-testid="submenu-content">{children}</span>
    ),
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

describe('PlatformTabTitle other tab-menu item selection', () => {
  afterEach(() => {
    cleanup();
    vi.mocked(floatTab).mockClear();
    vi.mocked(sendCommand).mockReset();
  });

  it('clicking Float Tab floats this tab', async () => {
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" text="Tab" />);

    fireEvent.click(screen.getByText('Float Tab'));

    await waitFor(() => expect(floatTab).toHaveBeenCalledWith('tab-1'));
  });

  it('clicking an extension-contributed item runs it as a menu command', async () => {
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" text="Tab" />);

    fireEvent.click(screen.getByText('Look Up Word'));

    // `handleMenuCommand` falls through to running the item's own command via `sendCommand`, the
    // way every other contributed menu runs an item it does not recognize as one of its own
    await waitFor(() =>
      expect(sendCommand).toHaveBeenCalledWith('someExtension.lookUpWord', 'tab-1'),
    );
  });
});

describe('PlatformTabTitle keyboard access to the tab menu', () => {
  /**
   * The tab title inside a stand-in for the focusable `role="tab"` element rc-tabs wraps it in.
   * Shift+F10 and the Menu key fire `contextmenu` at that element, not at the trigger inside it.
   */
  const renderInTab = () =>
    render(
      <div role="tab" tabIndex={0} data-testid="tab">
        <PlatformTabTitle id="tab-1" webViewId="web-view-1" text="Tab" />
      </div>,
    );

  /**
   * The rendered tab title. Throws rather than returning null so a test that expects no forwarding
   * cannot pass because nothing rendered.
   */
  const tabTitleIn = (container: HTMLElement): Element => {
    const title = container.querySelector('.platform-tab-title');
    if (!title) throw new Error('The tab title did not render');
    return title;
  };

  afterEach(() => {
    cleanup();
    vi.mocked(useIsPowerMode).mockReturnValue(true);
    vi.mocked(sendCommand).mockReset();
  });

  it('forwards a contextmenu raised on the tab into the trigger', () => {
    const { container } = renderInTab();
    const title = tabTitleIn(container);
    const received: Node[] = [];
    title.addEventListener('contextmenu', (event) => {
      if (event.target instanceof Node) received.push(event.target);
    });

    fireEvent.contextMenu(screen.getByTestId('tab'));

    // Exactly one forwarded event, and it arrived inside the trigger where Radix can see it
    expect(received).toHaveLength(1);
    expect(title.contains(received[0])).toBe(true);
  });

  it('leaves a contextmenu raised inside the trigger alone', () => {
    // The positive control for the guard: an ordinary right-click on the title already reaches the
    // trigger by bubbling, so forwarding it would double it
    const { container } = renderInTab();
    const title = tabTitleIn(container);
    let count = 0;
    title.addEventListener('contextmenu', () => {
      count += 1;
    });

    fireEvent.contextMenu(title);

    expect(count).toBe(1);
  });

  it('does not forward in Simple mode, where the tab menu is not offered', () => {
    vi.mocked(useIsPowerMode).mockReturnValue(false);
    const { container } = renderInTab();
    const title = tabTitleIn(container);
    let count = 0;
    title.addEventListener('contextmenu', () => {
      count += 1;
    });

    fireEvent.contextMenu(screen.getByTestId('tab'));

    expect(count).toBe(0);
  });
});

describe('PlatformTabTitle "Move tab to window" submenu', () => {
  const MAIN_WINDOW = { windowId: 1, label: 'MRK — wgPIDGIN', isMain: true };
  const OTHER_WINDOW = { windowId: 2, label: 'Biblical Terms', isMain: false };

  /** Mount a web view tab and open its menu, which is when the window list is read */
  const openMenuOn = async (windows: unknown[]) => {
    vi.mocked(sendCommand).mockImplementation(async (command: string) =>
      command === 'platform.getWindows' ? windows : undefined,
    );
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" text="Tab" />);
    fireEvent.click(screen.getByTestId('open-menu'));
    await waitFor(() => expect(sendCommand).toHaveBeenCalledWith('platform.getWindows'));
  };

  afterEach(() => {
    cleanup();
    vi.mocked(sendCommand).mockReset();
    vi.mocked(logger.warn).mockClear();
    vi.mocked(notificationService.send).mockClear();
    vi.mocked(getOpenTabCountSync).mockReturnValue(2);
    globalThis.windowId = undefined;
  });

  it('offers every window except the one the tab is in', async () => {
    globalThis.windowId = '2';
    await openMenuOn([MAIN_WINDOW, OTHER_WINDOW]);

    const submenu = await screen.findByTestId('submenu-content');
    expect(submenu.textContent).toContain('MRK — wgPIDGIN');
    expect(submenu.textContent).not.toContain('Biblical Terms');
  });

  it('moves the tab into the window that was chosen', async () => {
    globalThis.windowId = '2';
    await openMenuOn([MAIN_WINDOW, OTHER_WINDOW]);

    fireEvent.click(await screen.findByText('MRK — wgPIDGIN'));

    await waitFor(() =>
      expect(sendCommand).toHaveBeenCalledWith('platform.moveWebViewToWindow', 'web-view-1', 1),
    );
  });

  it('says where a failed move left the tab', async () => {
    globalThis.windowId = '2';
    vi.mocked(sendCommand).mockImplementation(async (command: string) => {
      if (command === 'platform.getWindows') return [MAIN_WINDOW, OTHER_WINDOW];
      throw new Error('[webViewMoveFailure:reopened-in-focused-window] nope');
    });
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" text="Tab" />);
    fireEvent.click(screen.getByTestId('open-menu'));

    fireEvent.click(await screen.findByText('MRK — wgPIDGIN'));

    await waitFor(() =>
      expect(notificationService.send).toHaveBeenCalledWith(
        expect.objectContaining({
          message: '%tab_contextMenu_moveTab_failedReopenedElsewhere%',
          severity: 'error',
        }),
      ),
    );
  });

  it('hides the submenu when this is the only window', async () => {
    globalThis.windowId = '1';
    await openMenuOn([MAIN_WINDOW]);

    expect(screen.queryByTestId('submenu-content')).toBeNull();
    // Positive control: the rest of the menu is there, so this is not an empty render
    expect(screen.getByText('Move tab to new window')).toBeInTheDocument();
  });

  it('drops move-to-new-window when this tab is alone in a window that is not the primary one', async () => {
    // The wiring for that guard, not just the predicate: this window is absent from the list's
    // primary entry AND holds only this one tab. `buildTabMenuItems` is unit-tested for the flag,
    // but nothing else exercises the three reads that compute it here
    globalThis.windowId = '2';
    vi.mocked(getOpenTabCountSync).mockReturnValue(1);
    await openMenuOn([MAIN_WINDOW, OTHER_WINDOW]);

    expect(screen.queryByText('Move tab to new window')).not.toBeInTheDocument();
    // Positive control: the rest of the menu is present, so the guard removed one item rather than
    // the menu failing to render
    expect(screen.getByText('Float Tab')).toBeInTheDocument();
    expect(await screen.findByTestId('submenu-content')).toBeInTheDocument();
  });

  it('keeps move-to-new-window when the window also holds a non-web-view tab', async () => {
    // The case a web-view-only count would miss: this tab is the window's only web view, but a
    // dialog (or any other non-web-view tab) is also open there, so moving this tab out would not
    // in fact leave the window empty. Counting every tab, not just web views, is what this pins.
    globalThis.windowId = '2';
    vi.mocked(getOpenTabCountSync).mockReturnValue(2);
    await openMenuOn([MAIN_WINDOW, OTHER_WINDOW]);

    expect(screen.getByText('Move tab to new window')).toBeInTheDocument();
  });

  it('drops move-to-new-window for a lone tab in the primary window while another window stands', async () => {
    // The primary role does not decide this. Main empties a window by counting the windows that
    // could be the last one, which never reads the role, so with another window standing this one
    // closes when its last tab leaves — building an identical window and taking this one down.
    globalThis.windowId = '1';
    vi.mocked(getOpenTabCountSync).mockReturnValue(1);
    await openMenuOn([MAIN_WINDOW, OTHER_WINDOW]);

    expect(screen.queryByText('Move tab to new window')).not.toBeInTheDocument();
    // Positive control: the guard removed one item rather than the menu failing to render
    expect(screen.getByText('Float Tab')).toBeInTheDocument();
  });

  it('keeps move-to-new-window for a lone tab when no other window would remain', async () => {
    // Nothing marks a window primary again after startup, so once the window holding the role goes
    // down no window reports it. This one is the last standing: emptying it docks Home rather than
    // closing it, so the move is not a no-op and the item has to stay.
    globalThis.windowId = '2';
    vi.mocked(getOpenTabCountSync).mockReturnValue(1);
    await openMenuOn([{ ...OTHER_WINDOW }]);

    expect(screen.getByText('Move tab to new window')).toBeInTheDocument();
  });

  it('names a window that is showing nothing titled', async () => {
    globalThis.windowId = '2';
    await openMenuOn([{ windowId: 1, label: '', isMain: true }, OTHER_WINDOW]);

    const submenu = await screen.findByTestId('submenu-content');
    expect(submenu.textContent).toContain('Empty window');
  });

  it('keeps the target list when counting this window`s tabs fails', async () => {
    // The count throws before the dock layout registers, which says nothing about the windows. A
    // shared catch would have thrown away a window list that arrived perfectly well and reported
    // the failure as one the open windows could not be read
    globalThis.windowId = '2';
    vi.mocked(getOpenTabCountSync).mockImplementation(() => {
      throw new Error('dock layout is not registered yet');
    });
    await openMenuOn([MAIN_WINDOW, OTHER_WINDOW]);

    expect(await screen.findByTestId('submenu-content')).toBeInTheDocument();
    // Offering the action is the safe way to be wrong when the count is unknown
    expect(screen.getByText('Move tab to new window')).toBeInTheDocument();
    expect(vi.mocked(logger.warn).mock.calls.flat().join(' ')).toContain('tabs');
  });

  it('leaves the submenu out when the window list cannot be read', async () => {
    globalThis.windowId = '2';
    vi.mocked(sendCommand).mockRejectedValue(new Error('no windows for you'));
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" text="Tab" />);

    fireEvent.click(screen.getByTestId('open-menu'));

    await waitFor(() => expect(logger.warn).toHaveBeenCalled());
    expect(screen.queryByTestId('submenu-content')).toBeNull();
    // An empty target list would read as "there are no other windows", which is a different claim
    expect(screen.getByText('Move tab to new window')).toBeInTheDocument();
  });

  it('discards a stale window list that resolves after a newer request', async () => {
    // Two opens of the same tab's menu in quick succession, the first (now-stale) request's round
    // trip landing after the second (current) one's
    globalThis.windowId = '2';
    const STALE_WINDOW = { windowId: 3, label: 'Stale Window', isMain: true };
    const resolvers: ((windows: unknown[]) => void)[] = [];
    vi.mocked(sendCommand).mockImplementation(
      (command: string) =>
        new Promise((resolve) => {
          if (command !== 'platform.getWindows') {
            resolve(undefined);
            return;
          }
          resolvers.push(resolve);
        }),
    );
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" text="Tab" />);

    fireEvent.click(screen.getByTestId('open-menu'));
    fireEvent.click(screen.getByTestId('open-menu'));
    await waitFor(() => expect(resolvers).toHaveLength(2));

    // The second (current) request resolves first, naming the target this test expects to win
    resolvers[1]([MAIN_WINDOW, OTHER_WINDOW]);
    // The first (stale) request resolves after it, naming a different target — this must not
    // overwrite what the newer request found
    resolvers[0]([STALE_WINDOW, OTHER_WINDOW]);

    const submenu = await screen.findByTestId('submenu-content');
    expect(submenu.textContent).toContain('MRK — wgPIDGIN');
    expect(submenu.textContent).not.toContain('Stale Window');
  });
});
