import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Localized, WebViewMenu } from 'platform-bible-utils';

import { menuDataService } from '@shared/services/menu-data.service';
import { overlayService, resetDebounceState } from './overlay.service-host';

// Mock the menu data service
vi.mock('@shared/services/menu-data.service', () => ({
  menuDataService: {
    getWebViewMenu: vi.fn(),
  },
}));

// Mock overlay-coordinates to avoid DOM dependencies
vi.mock('./overlay-coordinates', () => ({
  translateCoordinates: vi.fn((_wvId: string, pos: { x: number; y: number }) => pos),
  clampToViewport: vi.fn((pos: { x: number; y: number }) => pos),
  isWebViewVisible: vi.fn(() => true),
  getWebViewIframe: vi.fn(() => undefined),
}));

// Mock command service
vi.mock('@shared/services/command.service', () => ({
  commandService: {
    sendCommand: vi.fn(),
  },
}));

// Mock overlay-store
vi.mock('./overlay-store', () => ({
  addOverlay: vi.fn((entry: { resolve: (v: unknown) => void }) => {
    // Auto-resolve to simulate user selecting the first item
    entry.resolve('ext.doSomething');
  }),
  resolveAndRemoveOverlay: vi.fn(() => true),
  rejectAndRemoveOverlay: vi.fn(() => true),
  removeOverlaysByWebView: vi.fn(),
  getOverlaysByWebView: vi.fn(() => []),
  getOverlays: vi.fn(() => []),
  getOverlayById: vi.fn(() => undefined),
  updateOverlayContent: vi.fn(() => true),
}));

// Mock logger
vi.mock('@shared/services/logger.service', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock platform-bible-utils newGuid
vi.mock('platform-bible-utils', async () => {
  const actual = await vi.importActual('platform-bible-utils');
  return {
    ...actual,
    newGuid: vi.fn(() => 'test-guid-123'),
  };
});

const mockGetWebViewMenu = vi.mocked(menuDataService.getWebViewMenu);

describe('showContextMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetDebounceState();
  });

  it('should call menuDataService.getWebViewMenu with the provided menuId', async () => {
    const webViewMenu: Localized<WebViewMenu> = {
      includeDefaults: true,
      topMenu: undefined,
      contextMenu: {
        groups: {
          'ext.group1': { order: 1 },
        },
        items: [
          {
            command: 'ext.doSomething',
            group: 'ext.group1',
            label: 'Do Something',
            order: 1,
            localizeNotes: '',
          },
        ],
      },
    };
    mockGetWebViewMenu.mockResolvedValue(webViewMenu);

    await overlayService.showContextMenu(
      'platformScripture.checkingResultsListWebView',
      'test-webview',
    );

    expect(mockGetWebViewMenu).toHaveBeenCalledWith('platformScripture.checkingResultsListWebView');
  });

  it('should return undefined when no context menu is defined', async () => {
    const webViewMenu: Localized<WebViewMenu> = {
      includeDefaults: true,
      topMenu: undefined,
      contextMenu: undefined,
    };
    mockGetWebViewMenu.mockResolvedValue(webViewMenu);

    const result = await overlayService.showContextMenu('ext.someWebView', 'test-webview');

    expect(result).toBeUndefined();
  });

  it('should convert menu contributions and show the context menu', async () => {
    const webViewMenu: Localized<WebViewMenu> = {
      includeDefaults: false,
      topMenu: undefined,
      contextMenu: {
        groups: {
          'ext.group1': { order: 1 },
        },
        items: [
          {
            command: 'ext.doSomething',
            group: 'ext.group1',
            label: 'Do Something',
            order: 1,
            localizeNotes: '',
          },
        ],
      },
    };
    mockGetWebViewMenu.mockResolvedValue(webViewMenu);

    const result = await overlayService.showContextMenu('ext.myWebView', 'test-webview', {
      position: { x: 100, y: 200 },
    });

    // The mock auto-resolves with 'ext.doSomething'
    expect(result).toBe('ext.doSomething');
  });
});
