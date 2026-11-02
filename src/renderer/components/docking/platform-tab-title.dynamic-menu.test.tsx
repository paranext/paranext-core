import '@testing-library/jest-dom';
import React from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { sendCommand } from '@shared/services/command.service';
import { menuDataService } from '@shared/services/menu-data.service';
import { __resetTabMenuCacheForTesting, PlatformTabTitle } from './platform-tab-title.component';

// #region mocks

const { localizedStrings } = vi.hoisted(() => {
  const strings: Record<string, string> = {
    '%tab_aria_tab%': 'tab',
    '%window_label_empty%': 'Empty window',
    '%test_item%': 'Test item',
    '%test_always%': 'Always shown',
  };
  return { localizedStrings: strings };
});

const { contextKeyValues, contextKeyListeners, changeSequence } = vi.hoisted(() => ({
  contextKeyValues: new Map<string, unknown>(),
  contextKeyListeners: new Set<(event: { key: string }) => void>(),
  changeSequence: { value: 0 },
}));

vi.mock('@shared/services/context-keys.service', () => ({
  contextKeysService: {
    get: (key: string) => contextKeyValues.get(key),
    onDidChange: (listener: (event: { key: string }) => void) => {
      contextKeyListeners.add(listener);
      return () => contextKeyListeners.delete(listener);
    },
    getChangeSequence: () => changeSequence.value,
  },
}));

vi.mock('@renderer/hooks/papi-hooks', () => ({
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

vi.mock('@renderer/services/theme.service', () => ({
  __esModule: true,
  localThemeService: {},
}));

vi.mock('@renderer/hooks/use-interface-mode.hook', () => ({
  useInterfaceMode: vi.fn(() => ['power', undefined, true]),
}));

vi.mock('@renderer/services/web-view.service-shard', () => ({
  floatTab: vi.fn(),
  updateTabPartialSync: vi.fn(),
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

vi.mock('@renderer/services/web-view-content-zoom.service', () => ({
  isContentZoomable: () => true,
  onDidChangeContentZoomable: () => () => {},
}));

vi.mock('@shared/services/menu-data.service', () => ({
  menuDataService: {
    dataProviderName: 'platform.menuDataServiceDataProvider',
    getWebViewMenu: vi.fn(),
  },
}));

// Context-menu primitives as plain elements, with explicit open and close buttons and the disabled
// state exposed as `data-disabled`, as the real Radix item does
vi.mock('platform-bible-react', async (importOriginal) => {
  const actual = await importOriginal<object>();
  return {
    ...actual,
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
        <button type="button" data-testid="close-menu" onClick={() => onOpenChange?.(false)}>
          close
        </button>
        {children}
      </div>
    ),
    ContextMenuTrigger: ({ children }: { children: React.ReactNode }) => (
      <span data-testid="menu-trigger">{children}</span>
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

const FLAG_KEY = 'test.webView.wv-1.flag';

/** A tab menu with one item gated by the per-tab flag key through the given condition property */
function menuGatedBy(conditionProperty: 'when' | 'enabledWhen') {
  const menu: Awaited<ReturnType<typeof menuDataService.getWebViewMenu>> = {
    includeDefaults: false,
    topMenu: undefined,
    contextMenu: undefined,
    tabMenu: {
      groups: { 'test.group': { order: 1 } },
      // An ungated item keeps the menu itself present while the gated one comes and goes
      items: [
        {
          label: '%test_always%',
          localizeNotes: 'Always shown',
          group: 'test.group',
          order: 0,
          command: 'test.always',
        },
        {
          label: '%test_item%',
          localizeNotes: 'Test item',
          group: 'test.group',
          order: 1,
          command: 'test.cmd',
          [conditionProperty]: 'test.webView.{webViewId}.flag',
        },
      ],
    },
  };
  return menu;
}

/** Sets or clears a key and announces it, as the context keys service does */
function setKey(key: string, value: unknown): void {
  if (value === undefined) contextKeyValues.delete(key);
  else contextKeyValues.set(key, value);
  changeSequence.value += 1;
  act(() => {
    contextKeyListeners.forEach((listener) => listener({ key }));
  });
}

const renderTab = async () => {
  render(<PlatformTabTitle id="tab-1" text="Tab" webViewId="wv-1" webViewType="test.webView" />);
  await act(async () => {});
};

describe('PlatformTabTitle tab menu follows context keys', () => {
  beforeEach(() => {
    vi.mocked(menuDataService.getWebViewMenu).mockResolvedValue(menuGatedBy('when'));
    vi.mocked(sendCommand).mockResolvedValue([]);
  });

  afterEach(() => {
    cleanup();
    vi.mocked(menuDataService.getWebViewMenu).mockReset();
    vi.mocked(useLocalizedStrings).mockClear();
    contextKeyValues.clear();
    contextKeyListeners.clear();
    changeSequence.value = 0;
    __resetTabMenuCacheForTesting();
  });

  it('shows an item whose key is set after mount when the menu opens', async () => {
    await renderTab();
    setKey(FLAG_KEY, true);
    fireEvent.click(screen.getByTestId('open-menu'));

    expect(await screen.findByText('Test item')).toBeInTheDocument();
  });

  it('adds and removes an item while the menu is open', async () => {
    await renderTab();
    setKey(FLAG_KEY, true);
    fireEvent.click(screen.getByTestId('open-menu'));
    expect(await screen.findByText('Test item')).toBeInTheDocument();

    setKey(FLAG_KEY, undefined);
    expect(screen.queryByText('Test item')).toBeNull();

    setKey(FLAG_KEY, true);
    expect(screen.getByText('Test item')).toBeInTheDocument();
  });

  it('disables an item while open', async () => {
    vi.mocked(menuDataService.getWebViewMenu).mockResolvedValue(menuGatedBy('enabledWhen'));
    contextKeyValues.set(FLAG_KEY, true);
    await renderTab();
    fireEvent.click(screen.getByTestId('open-menu'));

    expect(screen.getByText('Test item').closest('button')).not.toHaveAttribute('data-disabled');

    setKey(FLAG_KEY, false);
    expect(screen.getByText('Test item').closest('button')).toHaveAttribute('data-disabled');
  });

  it('requests the label of an item hidden at open', async () => {
    await renderTab();

    expect(
      vi.mocked(useLocalizedStrings).mock.calls.some(([keys]) => keys.includes('%test_item%')),
    ).toBe(true);
  });
});
