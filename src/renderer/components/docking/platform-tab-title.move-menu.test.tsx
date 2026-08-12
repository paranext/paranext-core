import '@testing-library/jest-dom';
import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useIsPowerMode } from '@renderer/hooks/use-is-power-mode.hook';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { PlatformTabTitle } from './platform-tab-title.component';

// #region mocks

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%tab_aria_tab%': 'tab',
      '%tab_contextMenu_floatTab%': 'Float Tab',
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
});
