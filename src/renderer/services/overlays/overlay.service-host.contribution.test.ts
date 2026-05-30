import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Localized, WebViewMenu } from 'platform-bible-utils';

import { menuDataService } from '@shared/services/menu-data.service';
import { overlayService, resetDebounceState } from './overlay.service-host';
import { getOverlays, clearAllOverlays } from './overlay-store';

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

// Mock command service - sendCommand is a named export, not on commandService object
vi.mock('@shared/services/command.service', () => ({
  sendCommand: vi.fn(() => Promise.resolve()),
}));

// Mock logger
vi.mock('@shared/services/logger.service', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock validation (no-op)
vi.mock('./overlay-validation', () => ({
  validateComboBoxRequest: vi.fn(),
  validateContextMenuItems: vi.fn(),
  validateModalDialogOptions: vi.fn(),
  validatePopoverRequest: vi.fn(),
}));

// Mock platform-bible-utils newGuid
vi.mock('platform-bible-utils', async () => {
  const actual = await vi.importActual('platform-bible-utils');
  let counter = 0;
  return {
    ...actual,
    newGuid: vi.fn(() => {
      counter += 1;
      return `test-guid-${counter}`;
    }),
  };
});

// Mock windowService
vi.mock('@shared/services/window.service', () => ({
  windowService: {
    getFocus: vi.fn(() => Promise.resolve({ focusType: 'webView', id: 'test-webview' })),
    setFocus: vi.fn(() => Promise.resolve()),
    subscribeFocus: vi.fn(() => Promise.resolve(vi.fn())),
  },
}));

const mockGetWebViewMenu = vi.mocked(menuDataService.getWebViewMenu);

describe('showContextMenu contribution integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetDebounceState();
    clearAllOverlays();
  });

  it('should call menuDataService.getWebViewMenu with the provided webViewType', async () => {
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

    const promise = overlayService.showContextMenu(
      'platformScripture.checkingResultsListWebView',
      'test-webview',
    );

    // Flush the getWebViewMenu promise so addOverlay is called
    await Promise.resolve();

    expect(mockGetWebViewMenu).toHaveBeenCalledWith('platformScripture.checkingResultsListWebView');

    // Clean up
    getOverlays()[0].resolve(undefined);
    return promise;
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

  it('should pass converted menu items to addOverlay', async () => {
    const webViewMenu: Localized<WebViewMenu> = {
      includeDefaults: false,
      topMenu: undefined,
      contextMenu: {
        groups: {
          'ext.group1': { order: 1 },
          'ext.group2': { order: 2 },
        },
        items: [
          {
            command: 'ext.doSomething',
            group: 'ext.group1',
            label: 'Do Something',
            order: 1,
            localizeNotes: '',
          },
          {
            command: 'ext.doOther',
            group: 'ext.group2',
            label: 'Do Other',
            order: 1,
            localizeNotes: '',
          },
        ],
      },
    };
    mockGetWebViewMenu.mockResolvedValue(webViewMenu);

    const promise = overlayService.showContextMenu('ext.myWebView', 'convert-webview', {
      position: { x: 100, y: 200 },
    });

    // Flush the getWebViewMenu promise so addOverlay is called
    await Promise.resolve();

    // Verify the overlay was added to the real store with correctly converted items
    const overlays = getOverlays();
    expect(overlays).toHaveLength(1);
    const overlay = overlays[0];
    expect(overlay.type).toBe('contextMenu');

    // TypeScript cannot narrow a discriminated union via expect() assertions; cast needed to access typed fields
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const ctxOverlay = overlay as Extract<typeof overlay, { type: 'contextMenu' }>;

    // Verify items were converted from SingleColumnMenu contribution format to OverlayContextMenuItem[]
    // The converter should produce: item from group1, separator, item from group2
    expect(ctxOverlay.items).toHaveLength(3);
    expect(ctxOverlay.items[0]).toEqual({
      type: 'item',
      id: 'ext.doSomething',
      label: 'Do Something',
    });
    expect(ctxOverlay.items[1]).toEqual({ type: 'separator' });
    expect(ctxOverlay.items[2]).toEqual({
      type: 'item',
      id: 'ext.doOther',
      label: 'Do Other',
    });

    // Clean up
    ctxOverlay.resolve(undefined);
    return promise;
  });

  it('should return undefined when context menu items are empty after conversion', async () => {
    const webViewMenu: Localized<WebViewMenu> = {
      includeDefaults: false,
      topMenu: undefined,
      contextMenu: {
        groups: {},
        items: [],
      },
    };
    mockGetWebViewMenu.mockResolvedValue(webViewMenu);

    const result = await overlayService.showContextMenu('ext.emptyMenu', 'empty-webview');
    expect(result).toBeUndefined();
  });
});
