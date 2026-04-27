import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock asset
vi.mock('@assets/icon.png', () => ({ default: 'icon.png' }));

vi.mock('@renderer/components/platform-bible-menu.data', () => ({
  provideMenuData: vi.fn(async () => ({ columns: {}, groups: {}, items: [] })),
}));

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%toolbar_sync%': 'Sync',
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

import { PlatformBibleToolbar } from './platform-bible-toolbar';
import { sendCommand } from '@shared/services/command.service';

const mockSendCommand = (isSendReceiveAvailable: boolean | undefined) => {
  vi.mocked(sendCommand).mockImplementation(
    // sendCommand has a complex generic signature; cast is required for the mock implementation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (async (commandName: string) => {
      if (commandName === 'platformGetResources.isSendReceiveAvailable')
        return isSendReceiveAvailable;
      if (commandName === 'platform.getOSPlatform') return 'win32';
      if (commandName === 'platform.isFullScreen') return false;
      return undefined;
    }) as any,
  );
};

describe('PlatformBibleToolbar — Sync button', () => {
  it('is not rendered when isSendReceiveAvailable returns false', async () => {
    mockSendCommand(false);
    render(<PlatformBibleToolbar />);
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: 'Sync' })).not.toBeInTheDocument();
    });
  });

  it('is not rendered when isSendReceiveAvailable returns undefined', async () => {
    mockSendCommand(undefined);
    render(<PlatformBibleToolbar />);
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: 'Sync' })).not.toBeInTheDocument();
    });
  });

  it('is rendered with correct text and aria-label when isSendReceiveAvailable returns true', async () => {
    mockSendCommand(true);
    render(<PlatformBibleToolbar />);
    await waitFor(() => {
      const btn = screen.getByRole('button', { name: 'Sync' });
      expect(btn).toBeInTheDocument();
      expect(btn).toHaveTextContent('Sync');
      expect(btn).toHaveAttribute('aria-label', 'Sync');
    });
  });
});
