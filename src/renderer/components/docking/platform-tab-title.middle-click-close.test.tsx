import '@testing-library/jest-dom';
import React from 'react';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { closeTab } from '@renderer/services/web-view.service-shard';
import { logger } from '@shared/services/logger.service';
import { PlatformTabTitle } from './platform-tab-title.component';

// #region mocks

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%tab_aria_tab%': 'tab',
      '%tab_contextMenu_floatTab%': 'Float Tab',
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

vi.mock('@renderer/hooks/use-is-power-mode.hook', () => ({
  useIsPowerMode: vi.fn(() => true),
}));

vi.mock('@renderer/services/web-view.service-shard', () => ({
  closeTab: vi.fn(),
  floatTab: vi.fn(),
  updateTabPartialSync: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

vi.mock('@shared/services/window.service', () => ({
  windowService: { dataProviderName: 'platform.windowServiceDataProvider' },
}));

// Stub the context-menu/tooltip primitives so the tab header renders without depending on Radix's
// portal/asChild behavior, matching the pre-existing component test's stub.
vi.mock('platform-bible-react', async (importOriginal) => {
  const actual = await importOriginal<object>();
  return {
    ...actual,
    ContextMenu: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="context-menu">{children}</div>
    ),
    ContextMenuTrigger: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
    ContextMenuContent: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
    ContextMenuItem: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
    Tooltip: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
    TooltipProvider: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
    TooltipTrigger: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
    TooltipContent: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
  };
});

// #endregion

/** Finds the tab header root the middle-click handlers are attached to. */
function getTabHeader(container: HTMLElement) {
  const header = container.querySelector('.platform-tab-title');
  if (!header) throw new Error('getTabHeader: .platform-tab-title not found');
  return header;
}

/**
 * Dispatches a native `auxclick` event with the given button. `@testing-library`'s `fireEvent` has
 * no built-in `auxClick` helper (unlike `mouseDown`/`click`), so this builds the event directly;
 * React 19 maps the native `auxclick` event to the `onAuxClick` prop.
 */
function fireAuxClick(target: Element, button: number) {
  return fireEvent(target, new MouseEvent('auxclick', { bubbles: true, cancelable: true, button }));
}

describe('PlatformTabTitle middle-click-to-close', () => {
  afterEach(() => {
    cleanup();
    vi.mocked(closeTab).mockReset();
    vi.mocked(logger.error).mockClear();
  });

  it('middle click on a closable tab closes it exactly once', () => {
    vi.mocked(closeTab).mockResolvedValue(true);
    const { container } = render(<PlatformTabTitle id="tab-1" text="Tab" isClosable />);

    fireAuxClick(getTabHeader(container), 1);

    expect(closeTab).toHaveBeenCalledTimes(1);
    expect(closeTab).toHaveBeenCalledWith('tab-1');
  });

  it('middle click on a non-closable tab does nothing', () => {
    const { container } = render(<PlatformTabTitle id="tab-1" text="Tab" isClosable={false} />);

    fireAuxClick(getTabHeader(container), 1);

    expect(closeTab).not.toHaveBeenCalled();
  });

  it('left click does not close the tab', () => {
    const { container } = render(<PlatformTabTitle id="tab-1" text="Tab" isClosable />);

    fireAuxClick(getTabHeader(container), 0);

    expect(closeTab).not.toHaveBeenCalled();
  });

  it('right click does not close the tab', () => {
    const { container } = render(<PlatformTabTitle id="tab-1" text="Tab" isClosable />);

    fireAuxClick(getTabHeader(container), 2);

    expect(closeTab).not.toHaveBeenCalled();
  });

  it('logs a rejected close rather than throwing into React', async () => {
    vi.mocked(closeTab).mockRejectedValue(new Error('tab already gone'));
    const { container } = render(<PlatformTabTitle id="tab-1" text="Tab" isClosable />);

    fireAuxClick(getTabHeader(container), 1);

    await waitFor(() =>
      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('Failed to close tab tab-1'),
      ),
    );
  });
});
