import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { useIsPowerMode } from '@renderer/hooks/use-is-power-mode.hook';
import { PlatformTabTitle } from './platform-tab-title.component';

// Mock heavy transitive deps that run side-effects at module init in jsdom.
vi.mock('../../../shared/services/logger.service');
vi.mock('@renderer/services/theme.service-host', () => ({
  __esModule: true,
  localThemeService: {},
}));

vi.mock('@renderer/hooks/use-is-power-mode.hook', () => ({
  useIsPowerMode: vi.fn(() => true),
}));

// PlatformTabTitle subscribes to the window-focus data provider and renders localized strings.
// Stub those out so the test stays focused on the context-menu gate.
vi.mock('@renderer/hooks/papi-hooks', () => ({
  useData: vi.fn(() => ({ Focus: vi.fn(() => [undefined, vi.fn()]) })),
  useDataProvider: vi.fn(() => undefined),
  useLocalizedStrings: vi.fn(() => [{}]),
}));

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

describe('PlatformTabTitle context-menu gating', () => {
  it('power mode: wraps the title in a ContextMenu', () => {
    vi.mocked(useIsPowerMode).mockReturnValue(true);
    render(<PlatformTabTitle text="Tab" id="tab-1" />);
    expect(screen.queryByTestId('context-menu')).toBeInTheDocument();
  });

  it('simple mode: does not wrap the title in a ContextMenu', () => {
    vi.mocked(useIsPowerMode).mockReturnValue(false);
    render(<PlatformTabTitle text="Tab" id="tab-1" />);
    expect(screen.queryByTestId('context-menu')).not.toBeInTheDocument();
  });
});
