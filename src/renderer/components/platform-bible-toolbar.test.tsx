import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';
import { sendCommand } from '@shared/services/command.service';
import { getNetworkEvent } from '@shared/services/network.service';
import { PlatformBibleToolbar } from './platform-bible-toolbar';

// Mock asset
vi.mock('@assets/icon.png', () => ({ default: 'icon.png' }));

vi.mock('@renderer/components/platform-bible-menu.data', () => ({
  provideMenuData: vi.fn(async () => ({ columns: {}, groups: {}, items: [] })),
}));

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%toolbar_sync%': 'Sync',
      '%toolbar_sync_tooltip%': 'Syncs open projects and their linked projects and resources',
      '%mainMenu_openHome%': 'Home',
      '%mainMenu_openParatextRegistration%': 'Registration',
      '%mainMenu_openInternetSettings%': 'Internet Settings',
      '%toolbar_theme_change_to_light%': 'Change to light',
      '%toolbar_theme_change_to_dark%': 'Change to dark',
      '%toolbar_theme_loading%': 'Loading theme',
      '%toolbar_theme_loading_error%': 'Theme error',
    },
  ]),
  useScrollGroupScrRef: vi.fn(() => [{ book: 1, chapter: 1, verse: 1 }, vi.fn(), 0, vi.fn()]),
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
}));

vi.mock('@renderer/services/papi-frontend.service', () => ({
  app: {
    getMarketingInfo: vi.fn(async () => ({
      marketingVersion: '1.0.0',
      marketingVersionMoniker: undefined,
    })),
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
    BookChapterControl: () => <div data-testid="book-chapter-control" />,
    ScrollGroupSelector: () => <div data-testid="scroll-group-selector" />,
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
    // But physically present in the DOM, reserving layout space (tw-invisible)
    expect(
      document.querySelector('button[data-testid="toolbar-sync-button"][aria-hidden="true"]'),
    ).toBeInTheDocument();
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

  it('calls syncOpenProjects command when clicked', async () => {
    mockSendCommand(true);
    render(<PlatformBibleToolbar />);
    const btn = await screen.findByRole('button', { name: 'Sync' });
    fireEvent.click(btn);
    await waitFor(() => {
      expect(vi.mocked(sendCommand)).toHaveBeenLastCalledWith(
        'paratextBibleSendReceive.syncOpenProjects',
      );
    });
  });

  it('re-checks availability when extensions reload', async () => {
    let capturedReloadCallback: (() => unknown) | undefined;
    vi.mocked(getNetworkEvent).mockReturnValue(
      // PlatformEvent shape: (callback) => unsubscriber
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      vi.fn((cb: () => unknown) => {
        capturedReloadCallback = cb;
        return vi.fn();
      }) as any,
    );

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

    await capturedReloadCallback!();

    await waitFor(() => {
      expect(
        vi
          .mocked(sendCommand)
          .mock.calls.filter(([cmd]) => cmd === 'platformGetResources.isSendReceiveAvailable')
          .length,
      ).toBeGreaterThan(callsBefore);
    });
  });

  it('logs a warning when syncOpenProjects command fails', async () => {
    const { logger } = await import('@shared/services/logger.service');
    vi.mocked(sendCommand).mockImplementation(
      // sendCommand has a complex generic signature; cast is required for the mock implementation
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      (async (commandName: string) => {
        if (commandName === 'paratextBibleSendReceive.syncOpenProjects')
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
        expect.stringContaining('sync open projects'),
      );
    });
  });
});
