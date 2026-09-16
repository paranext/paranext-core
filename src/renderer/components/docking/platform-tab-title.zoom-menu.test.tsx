import '@testing-library/jest-dom';
import React from 'react';
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useInterfaceMode } from '@renderer/hooks/use-interface-mode.hook';
import { resolveContentZoomArea } from '@renderer/services/web-view-content-zoom.service';
import { sendCommand } from '@shared/services/command.service';
import { menuDataService } from '@shared/services/menu-data.service';
import { logger } from '@shared/services/logger.service';
import { __resetTabMenuCacheForTesting, PlatformTabTitle } from './platform-tab-title.component';

// #region mocks

const { localizedStrings } = vi.hoisted(() => {
  const strings: Record<string, string> = {
    '%tab_aria_tab%': 'tab',
    '%tab_contextMenu_floatPanel%': 'Float Tab',
    '%tab_contextMenu_moveTabToNewWindow%': 'Move tab to new window',
    '%tab_contextMenu_moveTabToWindow%': 'Move tab to window',
    '%window_label_empty%': 'Empty window',
    '%tab_contextMenu_zoomIn%': 'Zoom in',
    '%tab_contextMenu_zoomOut%': 'Zoom out',
    '%tab_contextMenu_resetZoom%': 'Reset zoom to default',
  };
  return { localizedStrings: strings };
});

vi.mock('@renderer/hooks/papi-hooks', () => ({
  // Answers for the keys it is asked for and nothing else, the way the real hook does. A component
  // that renders a key it never requested therefore renders the raw key, which is what lets a test
  // tell "localized" apart from "happened to be handed the string anyway"
  useLocalizedStrings: vi.fn((keys: string[]) => [
    Object.fromEntries(keys.map((key) => [key, localizedStrings[key] ?? key])),
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

vi.mock('@renderer/hooks/use-is-focused-window.hook', () => ({
  useIsFocusedWindow: vi.fn(() => true),
}));

// Mock heavy transitive deps that run side-effects at module init in jsdom.
vi.mock('@renderer/services/theme.service', () => ({
  __esModule: true,
  localThemeService: {},
}));

// Default to a settled power mode; individual tests override this to exercise Simple mode and the
// not-yet-known case.
vi.mock('@renderer/hooks/use-interface-mode.hook', () => ({
  useInterfaceMode: vi.fn(() => ['power', undefined, true]),
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

// The real module pulls settings/localization services in behind it; only the one synchronous
// resolver this component reads is needed here.
vi.mock('@renderer/services/web-view-content-zoom.service', () => ({
  resolveContentZoomArea: vi.fn(),
}));

vi.mock('@shared/services/menu-data.service', () => ({
  menuDataService: {
    dataProviderName: 'platform.menuDataServiceDataProvider',
    getWebViewMenu: vi.fn(),
  },
}));

// Stub the context-menu primitives so the menu items render as plain, clickable elements without
// depending on Radix's portal/asChild behavior — mirrors the move-menu test's stub, with the
// trigger additionally forwarding `className` so the drag-ignore class on it is assertable.
vi.mock('platform-bible-react', async (importOriginal) => {
  const actual = await importOriginal<object>();
  return {
    ...actual,
    // Opening is explicit rather than automatic, so a test that does not care about the window list
    // never triggers the read the menu does on open
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
    ContextMenuTrigger: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => (
      <span data-testid="menu-trigger" className={className}>
        {children}
      </span>
    ),
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
      disabled,
    }: {
      children: React.ReactNode;
      onClick?: () => void;
      disabled?: boolean;
    }) => (
      // Marked via `data-disabled`, mirroring the real Radix item (a `div`, styled disabled via CSS
      // pointer-events rather than a native `disabled` attribute) rather than a native `<button
      // disabled>`, which would block `fireEvent.click` outright and hide whether the component's
      // own guard is doing the work.
      <button type="button" onClick={onClick} data-disabled={disabled || undefined}>
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

/** The platform's own tab menu, including the zoom group Simple mode narrows down to */
const CONTRIBUTED_TAB_MENU: Awaited<ReturnType<typeof menuDataService.getWebViewMenu>> = {
  includeDefaults: true,
  topMenu: undefined,
  contextMenu: undefined,
  tabMenu: {
    groups: {
      'platform.tabZoom': { order: 50, isExtensible: false },
      'platform.tabWindow': { order: 100, isExtensible: true },
    },
    items: [
      {
        label: 'Zoom in',
        localizeNotes: 'Tab context menu > Zoom in',
        group: 'platform.tabZoom',
        order: 100,
        command: 'platform.webViewContentZoomIn',
      },
      {
        label: 'Zoom out',
        localizeNotes: 'Tab context menu > Zoom out',
        group: 'platform.tabZoom',
        order: 200,
        command: 'platform.webViewContentZoomOut',
      },
      {
        label: 'Reset zoom to default',
        localizeNotes: 'Tab context menu > Reset zoom',
        group: 'platform.tabZoom',
        order: 300,
        command: 'platform.webViewContentZoomReset',
      },
      {
        label: 'Float Tab',
        localizeNotes: 'Tab context menu > Float tab',
        group: 'platform.tabWindow',
        order: 100,
        command: 'platform.floatTab',
      },
      {
        label: 'Move tab to new window',
        localizeNotes: 'Tab context menu > Move tab to new window',
        group: 'platform.tabWindow',
        order: 200,
        command: 'platform.moveWebViewToNewWindow',
      },
      {
        id: 'platform.moveTabToWindow',
        label: 'Move tab to window',
        localizeNotes: 'Tab context menu > Move tab to window',
        group: 'platform.tabWindow',
        order: 300,
      },
    ],
  },
};

beforeEach(() => {
  vi.mocked(menuDataService.getWebViewMenu).mockResolvedValue(CONTRIBUTED_TAB_MENU);
});

/**
 * Let the mount-time read of the contributed menu resolve.
 *
 * Each tab reads its menu once when it mounts, so nothing renders a menu until that has settled.
 */
const flushMenuRead = async () => {
  await act(async () => {});
};

/** The rendered menu's item labels, in DOM order, excluding the stub's own `open` button */
function renderedItemLabels(): string[] {
  const menu = screen.getByTestId('context-menu');
  return within(menu)
    .getAllByRole('button')
    .map((button) => button.textContent ?? '')
    .filter((text) => text !== 'open');
}

describe('PlatformTabTitle zoom group in the tab menu', () => {
  afterEach(() => {
    cleanup();
    vi.mocked(useInterfaceMode).mockReturnValue(['power', undefined, true]);
    vi.mocked(menuDataService.getWebViewMenu).mockReset();
    vi.mocked(logger.warn).mockClear();
    vi.mocked(sendCommand).mockReset();
    vi.mocked(resolveContentZoomArea).mockReset();
    __resetTabMenuCacheForTesting();
  });

  it('power mode: the zoom group precedes the window group', async () => {
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" webViewType="foo.bar" text="Tab" />);
    await flushMenuRead();

    const labels = renderedItemLabels();
    expect(labels.slice(0, 4)).toEqual([
      'Zoom in',
      'Zoom out',
      'Reset zoom to default',
      'Float Tab',
    ]);
  });

  it('simple mode: offers exactly the zoom items', async () => {
    vi.mocked(useInterfaceMode).mockReturnValue(['simple', undefined, true]);
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" webViewType="foo.bar" text="Tab" />);
    await flushMenuRead();

    const labels = renderedItemLabels();
    expect(labels).toEqual(['Zoom in', 'Zoom out', 'Reset zoom to default']);
    expect(screen.queryByText('Float Tab')).not.toBeInTheDocument();
    expect(screen.queryByText('Move tab to new window')).not.toBeInTheDocument();
    expect(screen.queryByText('Move tab to window')).not.toBeInTheDocument();
  });

  it('simple mode: clicking an item sends its command with the tab id', async () => {
    vi.mocked(useInterfaceMode).mockReturnValue(['simple', undefined, true]);
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" webViewType="foo.bar" text="Tab" />);
    await flushMenuRead();

    fireEvent.click(screen.getByText('Zoom in'));
    await waitFor(() =>
      expect(sendCommand).toHaveBeenCalledWith('platform.webViewContentZoomIn', 'tab-1'),
    );

    fireEvent.click(screen.getByText('Reset zoom to default'));
    await waitFor(() =>
      expect(sendCommand).toHaveBeenCalledWith('platform.webViewContentZoomReset', 'tab-1'),
    );
  });

  it('power mode: clicking an item sends the same command with the same id — the two modes share one path', async () => {
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" webViewType="foo.bar" text="Tab" />);
    await flushMenuRead();

    fireEvent.click(screen.getByText('Zoom in'));
    await waitFor(() =>
      expect(sendCommand).toHaveBeenCalledWith('platform.webViewContentZoomIn', 'tab-1'),
    );
  });

  it('simple mode, mode not yet known: renders no menu, so a power user is never shown the simple-only menu before the mode resolves', async () => {
    vi.mocked(useInterfaceMode).mockReturnValue(['simple', undefined, false]);
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" webViewType="foo.bar" text="Tab" />);
    await flushMenuRead();

    expect(screen.queryByTestId('context-menu')).toBeNull();
  });

  it('simple mode reads the contributed menu on mount, same as power mode', async () => {
    vi.mocked(useInterfaceMode).mockReturnValue(['simple', undefined, true]);
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" webViewType="foo.bar" text="Tab" />);

    await waitFor(() => expect(menuDataService.getWebViewMenu).toHaveBeenCalledWith('foo.bar'));
    expect(menuDataService.getWebViewMenu).toHaveBeenCalledTimes(1);
  });

  it('simple mode does not read the open windows: that round trip belongs to the window group it never shows', async () => {
    vi.mocked(useInterfaceMode).mockReturnValue(['simple', undefined, true]);
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" webViewType="foo.bar" text="Tab" />);
    await flushMenuRead();

    fireEvent.click(screen.getByTestId('open-menu'));
    await flushMenuRead();
    expect(sendCommand).not.toHaveBeenCalledWith('platform.getWindows');
  });

  it('power mode control: opening the menu does read the open windows', async () => {
    vi.mocked(sendCommand).mockResolvedValue([]);
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" webViewType="foo.bar" text="Tab" />);
    await flushMenuRead();

    fireEvent.click(screen.getByTestId('open-menu'));
    await waitFor(() => expect(sendCommand).toHaveBeenCalledWith('platform.getWindows'));
  });

  it('a tab hosting no web view in simple mode offers no menu at all', async () => {
    vi.mocked(useInterfaceMode).mockReturnValue(['simple', undefined, true]);
    render(<PlatformTabTitle id="tab-1" webViewType="foo.bar" text="Tab" />);
    await flushMenuRead();

    expect(screen.queryByTestId('context-menu')).toBeNull();
  });

  it('a tab hosting no web view in power mode still shows Float Tab and no zoom items', async () => {
    render(<PlatformTabTitle id="tab-1" webViewType="foo.bar" text="Tab" />);
    await flushMenuRead();

    expect(screen.getByText('Float Tab')).toBeInTheDocument();
    expect(screen.queryByText('Zoom in')).not.toBeInTheDocument();
  });

  it('power mode: greys out the zoom items on a pane with no zoom area, and a click on one sends nothing', async () => {
    vi.mocked(resolveContentZoomArea).mockReturnValue(undefined);
    vi.mocked(sendCommand).mockResolvedValue([]);
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" webViewType="foo.bar" text="Tab" />);
    await flushMenuRead();

    fireEvent.click(screen.getByTestId('open-menu'));
    await waitFor(() =>
      expect(resolveContentZoomArea).toHaveBeenCalledWith('web-view-1', undefined),
    );

    expect(screen.getByText('Zoom in').closest('button')).toHaveAttribute('data-disabled', 'true');

    fireEvent.click(screen.getByText('Zoom in'));
    await flushMenuRead();
    expect(sendCommand).not.toHaveBeenCalledWith('platform.webViewContentZoomIn', 'tab-1');
  });

  it('power mode: leaves the zoom items enabled on a pane with a zoom area — the positive control for the case above', async () => {
    vi.mocked(resolveContentZoomArea).mockReturnValue('main');
    vi.mocked(sendCommand).mockResolvedValue([]);
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" webViewType="foo.bar" text="Tab" />);
    await flushMenuRead();

    fireEvent.click(screen.getByTestId('open-menu'));
    await waitFor(() =>
      expect(resolveContentZoomArea).toHaveBeenCalledWith('web-view-1', undefined),
    );

    expect(screen.getByText('Zoom in').closest('button')).not.toHaveAttribute('data-disabled');

    fireEvent.click(screen.getByText('Zoom in'));
    await waitFor(() =>
      expect(sendCommand).toHaveBeenCalledWith('platform.webViewContentZoomIn', 'tab-1'),
    );
  });

  it('simple mode reads the zoom area too, even though the window-target lists stay unread', async () => {
    vi.mocked(useInterfaceMode).mockReturnValue(['simple', undefined, true]);
    vi.mocked(resolveContentZoomArea).mockReturnValue(undefined);
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" webViewType="foo.bar" text="Tab" />);
    await flushMenuRead();

    fireEvent.click(screen.getByTestId('open-menu'));
    await waitFor(() =>
      expect(resolveContentZoomArea).toHaveBeenCalledWith('web-view-1', undefined),
    );

    expect(screen.getByText('Zoom in').closest('button')).toHaveAttribute('data-disabled', 'true');
    expect(sendCommand).not.toHaveBeenCalledWith('platform.getWindows');
  });

  it('simple mode: drag-ignore is preserved on the tab title and carried onto the menu trigger', async () => {
    vi.mocked(useInterfaceMode).mockReturnValue(['simple', undefined, true]);
    const { container } = render(
      <PlatformTabTitle id="tab-1" webViewId="web-view-1" webViewType="foo.bar" text="Tab" />,
    );
    await flushMenuRead();

    expect(container.querySelector('.platform-tab-title')).toHaveClass('drag-ignore');
    expect(screen.getByTestId('menu-trigger')).toHaveClass('drag-ignore');
  });

  it('simple mode: nothing renders before the read lands', async () => {
    vi.mocked(useInterfaceMode).mockReturnValue(['simple', undefined, true]);
    render(<PlatformTabTitle id="tab-1" webViewId="web-view-1" webViewType="foo.bar" text="Tab" />);

    expect(screen.queryByTestId('context-menu')).toBeNull();
    // Let the deferred read settle inside `act` so its state update doesn't land after the test ends.
    await act(async () => {});
  });

  describe('keyboard access in Simple mode', () => {
    /**
     * The tab title inside the two nested elements the real tab bar wraps it in, mirroring the
     * move-menu test's harness — which of them the forwarding attaches to is the whole question
     * here.
     */
    const renderInTab = () =>
      render(
        <div className="dock-tab">
          <div role="tab" tabIndex={0} className="dock-tab-btn" data-testid="tab">
            <div role="tab">
              <PlatformTabTitle
                id="tab-1"
                webViewId="web-view-1"
                webViewType="foo.bar"
                text="Tab"
              />
            </div>
          </div>
        </div>,
      );

    it('forwards a contextmenu raised on the tab into the trigger', async () => {
      vi.mocked(useInterfaceMode).mockReturnValue(['simple', undefined, true]);
      const { container } = renderInTab();
      await flushMenuRead();
      const title = container.querySelector('.platform-tab-title');
      if (!title) throw new Error('The tab title did not render');
      const received: Node[] = [];
      title.addEventListener('contextmenu', (event) => {
        if (event.target instanceof Node) received.push(event.target);
      });

      fireEvent.contextMenu(screen.getByTestId('tab'));

      expect(received).toHaveLength(1);
      expect(title.contains(received[0])).toBe(true);
    });
  });
});
