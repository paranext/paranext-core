import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Localized, WebViewMenu } from 'platform-bible-utils';

import { menuDataService } from '@shared/services/menu-data.service';
import { logger } from '@shared/services/logger.service';
import { webViewService } from '@shared/services/web-view.service';
import { overlayService, resetDebounceState } from './overlay.service-host';
import {
  getOverlays,
  getOverlayById,
  clearAllOverlays,
  resolveAndRemoveOverlay,
} from './overlay-store';
import { validateContextMenuItems } from './overlay-validation';

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
  validateCommandPaletteRequest: vi.fn(),
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

// Mock localizationService so the fire-and-forget aria-live announcement in showContextMenu
// (announceLocalizedToScreenReader) resolves immediately instead of reaching the real
// data-provider/network stack, which is unavailable in this test environment and was an
// intermittent source of unhandled rejections surfacing after a test had already completed.
vi.mock('@shared/services/localization.service', () => ({
  localizationService: {
    getLocalizedStrings: vi.fn(() => Promise.resolve({})),
  },
}));

vi.mock('@shared/services/web-view.service', () => ({
  webViewService: {
    getOpenWebViewDefinition: vi.fn(() => Promise.resolve(undefined)),
  },
}));

const { keyValues, keyListeners, unsubscribeKeyListener } = vi.hoisted(() => ({
  keyValues: new Map<string, unknown>(),
  keyListeners: new Set<(event: { key: string; value: unknown }) => void>(),
  unsubscribeKeyListener: vi.fn(),
}));

vi.mock('@shared/services/context-keys.service', () => ({
  contextKeysService: {
    get: vi.fn((key: string) => keyValues.get(key)),
    onDidChange: vi.fn((listener: (event: { key: string; value: unknown }) => void) => {
      keyListeners.add(listener);
      return () => {
        unsubscribeKeyListener();
        keyListeners.delete(listener);
      };
    }),
  },
}));

/** Sets a context key and notifies the listeners, as the real service does */
function emitKey(key: string, value: unknown) {
  keyValues.set(key, value);
  keyListeners.forEach((listener) => listener({ key, value }));
}

const mockGetWebViewMenu = vi.mocked(menuDataService.getWebViewMenu);

describe('showContextMenu contribution integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    keyValues.clear();
    keyListeners.clear();
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

    // Flush getWebViewMenu so addOverlay is called
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

    // Flush getWebViewMenu so addOverlay is called
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
  it("does not look up the web view's project when no item uses {projectId}", async () => {
    mockGetWebViewMenu.mockResolvedValue({
      includeDefaults: false,
      topMenu: undefined,
      contextMenu: {
        groups: { 'ext.group1': { order: 1 } },
        items: [{ command: 'ext.a', group: 'ext.group1', label: 'A', order: 1, localizeNotes: '' }],
      },
    });

    const promise = overlayService.showContextMenu('ext.myWebView', 'no-lookup-webview');

    // Flush getWebViewMenu so addOverlay is called
    await Promise.resolve();

    expect(getOverlays()).toHaveLength(1);
    expect(webViewService.getOpenWebViewDefinition).not.toHaveBeenCalled();

    getOverlays()[0].resolve(undefined);
    return promise;
  });

  it('opens the menu without project-gated items when the project lookup fails', async () => {
    mockGetWebViewMenu.mockResolvedValue({
      includeDefaults: false,
      topMenu: undefined,
      contextMenu: {
        groups: { 'ext.group1': { order: 1 } },
        items: [
          { command: 'ext.a', group: 'ext.group1', label: 'A', order: 1, localizeNotes: '' },
          {
            command: 'ext.b',
            group: 'ext.group1',
            label: 'B',
            order: 2,
            localizeNotes: '',
            when: 'ext.project.{projectId}.flag',
          },
        ],
      },
    });
    vi.mocked(webViewService.getOpenWebViewDefinition).mockRejectedValueOnce(
      new Error('window gone'),
    );

    const promise = overlayService.showContextMenu('ext.myWebView', 'lookup-fails-webview');

    await vi.waitFor(() => expect(getOverlays()).toHaveLength(1));
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const overlay = getOverlays()[0] as Extract<
      ReturnType<typeof getOverlays>[number],
      { type: 'contextMenu' }
    >;
    expect(overlay.items).toEqual([{ type: 'item', id: 'ext.a', label: 'A' }]);
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('{projectId}'));

    overlay.resolve(undefined);
    return promise;
  });

  describe('live updates while open', () => {
    type ContextMenuOverlay = Extract<
      ReturnType<typeof getOverlays>[number],
      { type: 'contextMenu' }
    >;

    type ContextMenu = NonNullable<Localized<WebViewMenu>['contextMenu']>;

    const fixtureMenu: ContextMenu = {
      groups: { 'ext.group1': { order: 1 } },
      items: [
        {
          command: 'ext.cmd',
          group: 'ext.group1',
          label: 'Cmd',
          order: 1,
          localizeNotes: '',
          enabledWhen: 'ext.flag',
        },
        {
          command: 'ext.extra',
          group: 'ext.group1',
          label: '%hidden%',
          order: 2,
          localizeNotes: '',
          when: 'ext.show',
        },
      ],
    };

    async function openMenu(contextMenu: ContextMenu, webViewId = 'live-webview') {
      mockGetWebViewMenu.mockResolvedValue({
        includeDefaults: false,
        topMenu: undefined,
        contextMenu,
      });
      const promise = overlayService.showContextMenu('ext.myWebView', webViewId);
      await vi.waitFor(() => expect(getOverlays()).toHaveLength(1));
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const overlay = getOverlays()[0] as ContextMenuOverlay;
      return { promise, overlay };
    }

    function currentOverlay(id: string): ContextMenuOverlay {
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return getOverlayById(id) as ContextMenuOverlay;
    }

    it('enables an item while open', async () => {
      const { promise, overlay } = await openMenu(fixtureMenu);
      expect(overlay.items[0]).toMatchObject({ id: 'ext.cmd', disabled: true });

      emitKey('ext.flag', true);

      expect(currentOverlay(overlay.id).items[0]).not.toHaveProperty('disabled');
      overlay.resolve(undefined);
      await promise;
    });

    it('shows an item while open', async () => {
      const { promise, overlay } = await openMenu(fixtureMenu);
      expect(overlay.items.some((i) => i.type === 'item' && i.id === 'ext.extra')).toBe(false);

      emitKey('ext.show', true);

      expect(
        currentOverlay(overlay.id).items.some((i) => i.type === 'item' && i.id === 'ext.extra'),
      ).toBe(true);
      overlay.resolve(undefined);
      await promise;
    });

    it('ignores a key the menu did not read', async () => {
      const { promise, overlay } = await openMenu(fixtureMenu);
      const before = getOverlayById(overlay.id);

      emitKey('other.key', 1);

      expect(getOverlayById(overlay.id)).toBe(before);
      overlay.resolve(undefined);
      await promise;
    });

    it('closes when every item becomes hidden', async () => {
      keyValues.set('ext.show', true);
      const { promise } = await openMenu({
        groups: { 'ext.group1': { order: 1 } },
        items: [
          {
            command: 'ext.extra',
            group: 'ext.group1',
            label: 'Extra',
            order: 1,
            localizeNotes: '',
            when: 'ext.show',
          },
        ],
      });

      emitKey('ext.show', false);

      await expect(promise).resolves.toBeUndefined();
      expect(getOverlays()).toEqual([]);
    });

    it('stops following keys once resolved', async () => {
      const { promise, overlay } = await openMenu(fixtureMenu);

      resolveAndRemoveOverlay(overlay.id, 'contextMenu', undefined);
      await promise;

      expect(unsubscribeKeyListener).toHaveBeenCalledTimes(1);
      emitKey('ext.flag', true);
      expect(getOverlays()).toEqual([]);
    });

    it('keeps the menu and logs when re-evaluation throws', async () => {
      vi.mocked(validateContextMenuItems)
        .mockImplementationOnce(() => {})
        .mockImplementationOnce(() => {
          throw new Error('bad');
        });
      const { promise, overlay } = await openMenu(fixtureMenu);

      expect(() => emitKey('ext.flag', true)).not.toThrow();

      expect(getOverlayById(overlay.id)).toBeDefined();
      expect(logger.warn).toHaveBeenCalled();
      overlay.resolve(undefined);
      await promise;
    });

    it('prefetches keys of hidden items', async () => {
      const { promise, overlay } = await openMenu(fixtureMenu);

      expect(overlay.localizeKeys).toContain('%hidden%');
      overlay.resolve(undefined);
      await promise;
    });

    it('re-evaluates with the project it looked up once', async () => {
      vi.mocked(webViewService.getOpenWebViewDefinition).mockResolvedValue(
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        { projectId: 'proj1' } as never,
      );
      const { promise, overlay } = await openMenu({
        groups: { 'ext.group1': { order: 1 } },
        items: [
          {
            command: 'ext.plain',
            group: 'ext.group1',
            label: 'Plain',
            order: 1,
            localizeNotes: '',
          },
          {
            command: 'ext.cmd',
            group: 'ext.group1',
            label: 'Cmd',
            order: 2,
            localizeNotes: '',
            when: 'ext.project.{projectId}.flag',
          },
        ],
      });
      expect(webViewService.getOpenWebViewDefinition).toHaveBeenCalledTimes(1);
      keyValues.set('ext.project.PROJ1.flag', false);

      emitKey('ext.project.PROJ1.flag', true);

      expect(webViewService.getOpenWebViewDefinition).toHaveBeenCalledTimes(1);
      expect(overlay.items).toHaveLength(1);
      expect(currentOverlay(overlay.id).items).toHaveLength(2);
      overlay.resolve(undefined);
      await promise;
    });
  });
});
