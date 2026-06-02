import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  isPlatformError,
  ABORTED,
  RESOURCE_EXHAUSTED,
  FAILED_PRECONDITION,
} from 'platform-bible-utils';
import { sendCommand } from '@shared/services/command.service';
import { menuDataService } from '@shared/services/menu-data.service';
import { CommandPaletteRequest, PopoverContent, PopoverRequest } from './overlay.service-model';
import { getOverlays, getOverlayById, clearAllOverlays } from './overlay-store';
import { isWebViewVisible } from './overlay-coordinates';

/** Must match DEBOUNCE_COOLDOWN_MS in overlay.service-host.ts */
const DEBOUNCE_COOLDOWN_MS = 50;

// Mock dependencies
vi.mock('./overlay-validation', () => ({
  validateCommandPaletteRequest: vi.fn(),
  validateContextMenuItems: vi.fn(),
  validatePopoverRequest: vi.fn(),
}));

vi.mock('@shared/services/command.service', () => ({
  sendCommand: vi.fn(() => Promise.resolve()),
}));

vi.mock('./overlay-coordinates', () => ({
  translateCoordinates: vi.fn((_, pos) => pos),
  clampToViewport: vi.fn((pos) => pos),
  isWebViewVisible: vi.fn(() => true),
  getWebViewIframe: vi.fn(() => undefined),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('platform-bible-utils', async () => {
  const actual = await vi.importActual('platform-bible-utils');
  let counter = 0;
  return {
    ...actual,
    newGuid: vi.fn(() => {
      counter += 1;
      return `mock-guid-${counter}`;
    }),
  };
});

vi.mock('@shared/services/menu-data.service', () => ({
  menuDataService: {
    getWebViewMenu: vi.fn(),
  },
}));

vi.mock('@shared/services/window.service', () => ({
  windowService: {
    getFocus: vi.fn(() => Promise.resolve({ focusType: 'webView', id: 'test-webview' })),
    setFocus: vi.fn(() => Promise.resolve()),
    subscribeFocus: vi.fn(() => Promise.resolve(vi.fn())),
  },
}));

vi.mock('@shared/services/localization.service', () => ({
  localizationService: {
    getLocalizedStrings: vi.fn(() => Promise.resolve({})),
  },
}));

// Import the service after mocks are set up
// eslint-disable-next-line import/first
import { overlayService, resetDebounceState, showModalDialogOverlay } from './overlay.service-host';

/** A minimal WebViewMenu with one context menu item, used across context menu tests */
const DEFAULT_WEB_VIEW_MENU = {
  includeDefaults: false,
  topMenu: undefined,
  contextMenu: {
    groups: { 'ext.group1': { order: 1 } },
    items: [
      {
        command: 'ext.cut',
        group: 'ext.group1',
        label: 'Cut',
        order: 1,
        localizeNotes: '',
      },
    ],
  },
};

/** Assert that showPopover returned a defined overlay ID (non-debounced). Narrows the type. */
function expectPopoverId(id: string | undefined): asserts id is string {
  expect(id).toBeDefined();
  expect(typeof id).toBe('string');
}

describe('overlay.service-host', () => {
  beforeEach(() => {
    // Reset debounce state so consecutive tests don't hit the cooldown window
    resetDebounceState();
    // Clean up all overlays before each test
    clearAllOverlays();
  });

  afterEach(() => {
    // Guarantee real timers are restored even if a test threw between
    // `vi.useFakeTimers()` and an inline `vi.useRealTimers()`. Without this, a single
    // assertion failure inside a fake-timer block can leave fake timers active for
    // every subsequent test, making real `setTimeout` calls hang until the default
    // testTimeout — producing cascading, non-deterministic timeouts in unrelated tests.
    vi.useRealTimers();
  });

  describe('context menus', () => {
    beforeEach(() => {
      vi.mocked(menuDataService.getWebViewMenu).mockResolvedValue(DEFAULT_WEB_VIEW_MENU);
    });

    it('should create an overlay entry of type contextMenu', async () => {
      const promise = overlayService.showContextMenu('ext.testWebView', 'test-webview');

      // Flush the getWebViewMenu promise so addOverlay is called
      await Promise.resolve();

      const overlays = getOverlays();
      expect(overlays).toHaveLength(1);
      const overlay = overlays[0];
      expect(overlay.type).toBe('contextMenu');

      // Clean up
      overlay.resolve(undefined);
      return promise;
    });

    it('should resolve with the selected command string', async () => {
      const promise = overlayService.showContextMenu('ext.testWebView', 'test-webview');

      // Flush the getWebViewMenu promise so addOverlay is called
      await Promise.resolve();

      const overlays = getOverlays();
      // Only contextMenu overlays exist in this test
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const menuOverlay = overlays[0] as Extract<(typeof overlays)[0], { type: 'contextMenu' }>;
      menuOverlay.resolve('ext.cut');

      const result = await promise;
      expect(result).toBe('ext.cut');
    });

    it('should resolve with undefined when dismissed', async () => {
      const promise = overlayService.showContextMenu('ext.testWebView', 'test-webview');

      // Flush the getWebViewMenu promise so addOverlay is called
      await Promise.resolve();

      const overlays = getOverlays();
      // TypeScript cannot narrow a discriminated union after getOverlays(); cast needed to access typed fields
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const menuOverlay = overlays[0] as Extract<(typeof overlays)[0], { type: 'contextMenu' }>;
      menuOverlay.resolve(undefined);

      const result = await promise;
      expect(result).toBeUndefined();
    });

    it('should replace existing context menu from same webView', async () => {
      vi.useFakeTimers();

      const promise1 = overlayService.showContextMenu('ext.testWebView', 'test-webview');

      // Flush the getWebViewMenu promise for the first call
      await Promise.resolve();

      vi.advanceTimersByTime(DEBOUNCE_COOLDOWN_MS);

      const promise2 = overlayService.showContextMenu('ext.testWebView', 'test-webview', {
        position: { x: 60, y: 110 },
      });

      // Flush the getWebViewMenu promise for the second call
      await Promise.resolve();

      await expect(promise1).rejects.toSatisfy(
        (error: unknown) => isPlatformError(error) && error.code === ABORTED,
      );

      const overlays = getOverlays();
      const menus = overlays.filter((o) => o.type === 'contextMenu');
      expect(menus).toHaveLength(1);

      // Clean up
      menus[0].resolve(undefined);
      vi.useRealTimers();
      return promise2;
    });

    it('should reject with RESOURCE_EXHAUSTED within debounce cooldown', async () => {
      const promise1 = overlayService.showContextMenu('ext.testWebView', 'test-webview');

      // Flush the getWebViewMenu promise for the first call so the overlay is registered
      await Promise.resolve();

      // Second call within 50ms should throw (debounce check happens after menu fetch)
      await expect(
        overlayService.showContextMenu('ext.testWebView', 'test-webview'),
      ).rejects.toSatisfy(
        (error: unknown) => isPlatformError(error) && error.code === RESOURCE_EXHAUSTED,
      );
      expect(getOverlays()).toHaveLength(1);

      // Clean up
      getOverlays()[0].resolve(undefined);
      return promise1;
    });
  });

  describe('modal dialogs', () => {
    const MockDialogComponent = vi.fn(
      // vi.fn mock must satisfy React component return type; `any` cast is the standard test pattern
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      () => undefined as any,
    );

    it('should create an overlay entry of type modalDialog', () => {
      const props = { prompt: 'Something happened', isDialog: true };

      // Start the promise but don't await yet (it waits for user interaction)
      const promise = showModalDialogOverlay(MockDialogComponent, props, undefined, 'test-webview');

      // Verify an overlay entry was created in the store
      const overlays = getOverlays();
      expect(overlays).toHaveLength(1);
      const overlay = overlays[0];
      expect(overlay.type).toBe('modalDialog');
      // Type is verified by the assertion above
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const modalOverlay = overlay as Extract<typeof overlay, { type: 'modalDialog' }>;
      expect(modalOverlay.Component).toBe(MockDialogComponent);
      expect(modalOverlay.props).toEqual(props);

      // Clean up: resolve the promise so the test doesn't hang
      modalOverlay.resolve(true);
      return promise;
    });

    it('should create an overlay entry with confirm props', () => {
      const props = { prompt: 'Are you sure?', isDialog: true };

      const promise = showModalDialogOverlay(MockDialogComponent, props, undefined, 'test-webview');

      const overlays = getOverlays();
      expect(overlays).toHaveLength(1);
      const overlay = overlays[0];
      expect(overlay.type).toBe('modalDialog');
      // Type is verified by the assertion above; TS can't narrow OverlayEntry union from .type check
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const modalOverlay = overlay as Extract<typeof overlay, { type: 'modalDialog' }>;
      expect(modalOverlay.Component).toBe(MockDialogComponent);
      expect(modalOverlay.props).toEqual(props);

      // Clean up
      modalOverlay.resolve(false);
      return promise;
    });

    it('should replace existing modal from same webView', async () => {
      vi.useFakeTimers();

      const props1 = { prompt: 'First dialog', isDialog: true };
      const props2 = { prompt: 'Second dialog', isDialog: true };

      // Show first modal - it will be rejected when second replaces it
      const promise1 = showModalDialogOverlay(
        MockDialogComponent,
        props1,
        undefined,
        'test-webview',
      );

      // Advance past debounce cooldown so the second call is accepted
      vi.advanceTimersByTime(DEBOUNCE_COOLDOWN_MS);

      // Show second modal from same webView
      const promise2 = showModalDialogOverlay(
        MockDialogComponent,
        props2,
        undefined,
        'test-webview',
      );

      // First should be rejected with ABORTED
      await expect(promise1).rejects.toSatisfy(
        (error: unknown) => isPlatformError(error) && error.code === ABORTED,
      );

      // Only the second modal should remain
      const overlays = getOverlays();
      const modalOverlays = overlays.filter((o) => o.type === 'modalDialog');
      expect(modalOverlays).toHaveLength(1);
      const remaining = modalOverlays[0];
      expect(remaining.props).toEqual(props2);

      // Clean up
      remaining.resolve(false);
      vi.useRealTimers();
      return promise2;
    });

    it('should resolve when dialog is resolved', async () => {
      const props = { prompt: 'Confirm?', isDialog: true };

      const promise = showModalDialogOverlay(MockDialogComponent, props, undefined, 'test-webview');

      const overlays = getOverlays();
      expect(overlays).toHaveLength(1);

      // Simulate dialog resolution - only modalDialog overlays exist in this test
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const modalOverlay = overlays[0] as Extract<(typeof overlays)[0], { type: 'modalDialog' }>;
      modalOverlay.resolve(true);

      const result = await promise;
      expect(result).toBe(true);
    });

    it('should resolve with true when dialog is acknowledged', async () => {
      const props = { prompt: 'Info', isDialog: true };

      const promise = showModalDialogOverlay(MockDialogComponent, props, undefined, 'test-webview');

      const overlays = getOverlays();
      // Only modalDialog overlays exist in this test; TS can't narrow the union
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const alertOverlay = overlays[0] as Extract<(typeof overlays)[0], { type: 'modalDialog' }>;
      alertOverlay.resolve(true);

      const result = await promise;
      expect(result).toBe(true);
    });

    it('should resolve with undefined when dialog is dismissed without response', async () => {
      const props = { prompt: 'Info', isDialog: true };

      const promise = showModalDialogOverlay(MockDialogComponent, props, undefined, 'test-webview');

      const overlays = getOverlays();
      // TypeScript cannot narrow a discriminated union after getOverlays(); cast needed to access typed fields
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const alertOverlay = overlays[0] as Extract<(typeof overlays)[0], { type: 'modalDialog' }>;
      alertOverlay.resolve(undefined);

      const result = await promise;
      expect(result).toBeUndefined();
    });
  });

  describe('popovers', () => {
    const validRequest: PopoverRequest = {
      anchor: { x: 100, y: 200 },
      content: { type: 'text', body: 'Hello world' },
    };

    it('should create a popover overlay entry and return an ID string', async () => {
      const overlayId = await overlayService.showPopover(validRequest, 'test-webview');
      expectPopoverId(overlayId);

      // Verify an overlay entry was created in the store
      const overlays = getOverlays();
      const popovers = overlays.filter((o) => o.type === 'popover');
      expect(popovers).toHaveLength(1);
      expect(popovers[0].type).toBe('popover');
      const popover = popovers[0];
      expect(popover.id).toBe(overlayId);
      expect(popover.content).toEqual(validRequest.content);

      // Clean up
      await overlayService.dismissPopover(overlayId);
    });

    it('should replace existing popover from same webView', async () => {
      vi.useFakeTimers();

      const request1: PopoverRequest = {
        anchor: { x: 10, y: 20 },
        content: { type: 'text', body: 'First popover' },
      };
      const request2: PopoverRequest = {
        anchor: { x: 30, y: 40 },
        content: { type: 'text', body: 'Second popover' },
      };

      const id1 = await overlayService.showPopover(request1, 'test-webview');
      expectPopoverId(id1);
      const dismissPromise1 = overlayService.onPopoverDismissed(id1);

      // Advance past debounce cooldown so the second call is accepted
      vi.advanceTimersByTime(DEBOUNCE_COOLDOWN_MS);

      const id2 = await overlayService.showPopover(request2, 'test-webview');
      expectPopoverId(id2);

      // First should have been rejected with ABORTED
      await expect(dismissPromise1).rejects.toSatisfy(
        (error: unknown) => isPlatformError(error) && error.code === ABORTED,
      );

      // Only the second popover should remain
      const overlays = getOverlays();
      const popovers = overlays.filter((o) => o.type === 'popover');
      expect(popovers).toHaveLength(1);
      const remaining = popovers[0];
      expect(remaining.id).toBe(id2);

      // Clean up
      await overlayService.dismissPopover(id2);
      vi.useRealTimers();
    });

    it('should update popover content in store', async () => {
      const overlayId = await overlayService.showPopover(validRequest, 'test-webview');
      expectPopoverId(overlayId);

      const newContent: PopoverContent = { type: 'text', body: 'Updated content' };
      await overlayService.updatePopover(overlayId, newContent);

      const overlay = getOverlayById(overlayId);
      expect(overlay).toBeDefined();
      // getOverlayById returns the full OverlayEntry union; we know it's a popover from setup
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const popoverOverlay = overlay as Extract<NonNullable<typeof overlay>, { type: 'popover' }>;
      expect(popoverOverlay.content).toEqual(newContent);

      // Clean up
      await overlayService.dismissPopover(overlayId);
    });

    it('should throw when updating popover with unknown ID', async () => {
      const newContent: PopoverContent = { type: 'text', body: 'Updated' };
      await expect(overlayService.updatePopover('unknown-id', newContent)).rejects.toThrow();
    });

    it('should dismiss popover and resolve with undefined', async () => {
      const overlayId = await overlayService.showPopover(validRequest, 'test-webview');
      expectPopoverId(overlayId);
      const dismissPromise = overlayService.onPopoverDismissed(overlayId);

      await overlayService.dismissPopover(overlayId);

      const result = await dismissPromise;
      expect(result).toBeUndefined();

      // Overlay should be removed from store
      const overlay = getOverlayById(overlayId);
      expect(overlay).toBeUndefined();
    });

    it('should not throw when dismissing unknown popover ID', async () => {
      await expect(overlayService.dismissPopover('unknown-id')).resolves.not.toThrow();
    });

    it('should resolve onPopoverDismissed immediately for unknown ID', async () => {
      const result = await overlayService.onPopoverDismissed('nonexistent-id');
      expect(result).toBeUndefined();
    });

    it('should reject with RESOURCE_EXHAUSTED when debounce cooldown is active', async () => {
      const overlayId1 = await overlayService.showPopover(validRequest, 'test-webview');
      expectPopoverId(overlayId1);
      // Second call within 50ms should throw
      await expect(overlayService.showPopover(validRequest, 'test-webview')).rejects.toSatisfy(
        (error: unknown) => isPlatformError(error) && error.code === RESOURCE_EXHAUSTED,
      );

      // Only one popover should exist in the store
      const popovers = getOverlays().filter((o) => o.type === 'popover');
      expect(popovers).toHaveLength(1);

      // Clean up
      await overlayService.dismissPopover(overlayId1);
    });

    it('should auto-dismiss after dismissAfterMs', async () => {
      vi.useFakeTimers();
      resetDebounceState();

      const request: PopoverRequest = {
        anchor: { x: 100, y: 200 },
        content: { type: 'text', body: 'Auto dismiss' },
        dismissAfterMs: 5000,
      };

      const overlayId = await overlayService.showPopover(request, 'test-webview');
      expectPopoverId(overlayId);
      const dismissPromise = overlayService.onPopoverDismissed(overlayId);

      // Popover should still exist before timeout
      expect(getOverlayById(overlayId)).toBeDefined();

      // Advance timers past the dismissAfterMs
      vi.advanceTimersByTime(5000);

      const result = await dismissPromise;
      expect(result).toBeUndefined();

      // Overlay should be removed
      expect(getOverlayById(overlayId)).toBeUndefined();

      vi.useRealTimers();
    });
  });

  describe('command palettes', () => {
    const validRequest: CommandPaletteRequest = {
      items: [
        { id: 'ft', label: 'Footnote' },
        { id: 'xt', label: 'Cross Reference' },
      ],
      anchor: { x: 100, y: 200 },
    };

    it('should create an overlay entry of type commandPalette', () => {
      const promise = overlayService.showCommandPalette(validRequest, 'test-webview');

      const overlays = getOverlays();
      expect(overlays).toHaveLength(1);
      expect(overlays[0].type).toBe('commandPalette');

      // Clean up
      overlays[0].resolve(undefined);
      return promise;
    });

    it('should resolve with selected item ID', async () => {
      const promise = overlayService.showCommandPalette(validRequest, 'test-webview');

      const overlays = getOverlays();
      // Only commandPalette overlays exist in this test
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const overlay = overlays[0] as Extract<(typeof overlays)[0], { type: 'commandPalette' }>;
      overlay.resolve('ft');

      const result = await promise;
      expect(result).toBe('ft');
    });

    it('should resolve with undefined when dismissed', async () => {
      const promise = overlayService.showCommandPalette(validRequest, 'test-webview');

      const overlays = getOverlays();
      // TypeScript cannot narrow a discriminated union after getOverlays(); cast needed to access typed fields
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const overlay = overlays[0] as Extract<(typeof overlays)[0], { type: 'commandPalette' }>;
      overlay.resolve(undefined);

      const result = await promise;
      expect(result).toBeUndefined();
    });

    it('should replace existing command palette from same webView', async () => {
      vi.useFakeTimers();

      const promise1 = overlayService.showCommandPalette(validRequest, 'test-webview');

      vi.advanceTimersByTime(DEBOUNCE_COOLDOWN_MS);

      const request2: CommandPaletteRequest = {
        items: [{ id: 'p', label: 'Paragraph' }],
        anchor: { x: 60, y: 110 },
      };
      const promise2 = overlayService.showCommandPalette(request2, 'test-webview');

      await expect(promise1).rejects.toSatisfy(
        (error: unknown) => isPlatformError(error) && error.code === ABORTED,
      );

      const overlays = getOverlays();
      const palettes = overlays.filter((o) => o.type === 'commandPalette');
      expect(palettes).toHaveLength(1);

      palettes[0].resolve(undefined);
      vi.useRealTimers();
      return promise2;
    });

    it('should reject with RESOURCE_EXHAUSTED within debounce cooldown', async () => {
      const promise1 = overlayService.showCommandPalette(validRequest, 'test-webview');
      // Second call within 50ms should throw
      await expect(
        overlayService.showCommandPalette(validRequest, 'test-webview'),
      ).rejects.toSatisfy(
        (error: unknown) => isPlatformError(error) && error.code === RESOURCE_EXHAUSTED,
      );
      expect(getOverlays()).toHaveLength(1);

      getOverlays()[0].resolve(undefined);
      return promise1;
    });

    it('should handle centered mode (no anchor)', () => {
      const request: CommandPaletteRequest = {
        items: [{ id: 'ft', label: 'Footnote' }],
        // no anchor — centered mode
      };
      const promise = overlayService.showCommandPalette(request, 'test-webview');

      const overlays = getOverlays();
      expect(overlays).toHaveLength(1);
      // TypeScript cannot narrow a discriminated union after getOverlays(); cast needed to access typed fields
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const overlay = overlays[0] as Extract<(typeof overlays)[0], { type: 'commandPalette' }>;
      expect(overlay.position).toBeUndefined();

      overlay.resolve(undefined);
      return promise;
    });
  });

  describe('isWebViewVisible rejection', () => {
    it('should reject context menu with FAILED_PRECONDITION when webView is not visible', async () => {
      vi.mocked(menuDataService.getWebViewMenu).mockResolvedValue(DEFAULT_WEB_VIEW_MENU);
      vi.mocked(isWebViewVisible).mockReturnValue(false);

      await expect(
        overlayService.showContextMenu('ext.testWebView', 'hidden-webview'),
      ).rejects.toSatisfy(
        (error: unknown) => isPlatformError(error) && error.code === FAILED_PRECONDITION,
      );

      vi.mocked(isWebViewVisible).mockReturnValue(true);
    });

    it('should reject popover with FAILED_PRECONDITION when webView is not visible', async () => {
      vi.mocked(isWebViewVisible).mockReturnValue(false);

      const request: PopoverRequest = {
        anchor: { x: 10, y: 20 },
        content: { type: 'text', body: 'Test' },
      };

      await expect(overlayService.showPopover(request, 'hidden-webview')).rejects.toSatisfy(
        (error: unknown) => isPlatformError(error) && error.code === FAILED_PRECONDITION,
      );

      vi.mocked(isWebViewVisible).mockReturnValue(true);
    });

    it('should reject command palette with FAILED_PRECONDITION when webView is not visible', async () => {
      vi.mocked(isWebViewVisible).mockReturnValue(false);

      const request: CommandPaletteRequest = {
        items: [{ id: 'ft', label: 'Footnote' }],
      };

      await expect(overlayService.showCommandPalette(request, 'hidden-webview')).rejects.toSatisfy(
        (error: unknown) => isPlatformError(error) && error.code === FAILED_PRECONDITION,
      );

      vi.mocked(isWebViewVisible).mockReturnValue(true);
    });
  });

  describe('sendCommand after context menu selection', () => {
    beforeEach(() => {
      vi.mocked(menuDataService.getWebViewMenu).mockResolvedValue(DEFAULT_WEB_VIEW_MENU);
    });

    it('should call sendCommand when a context menu item is selected', async () => {
      const promise = overlayService.showContextMenu('ext.testWebView', 'test-webview');

      await Promise.resolve();

      const overlays = getOverlays();
      // TypeScript cannot narrow a discriminated union after getOverlays(); cast needed to access typed fields
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const menuOverlay = overlays[0] as Extract<(typeof overlays)[0], { type: 'contextMenu' }>;
      menuOverlay.resolve('ext.cut');

      await promise;
      expect(sendCommand).toHaveBeenCalledWith('ext.cut');
    });

    it('should not call sendCommand when context menu is dismissed', async () => {
      vi.mocked(sendCommand).mockClear();
      const promise = overlayService.showContextMenu('ext.testWebView', 'cmd-webview');

      await Promise.resolve();

      const overlays = getOverlays();
      // TypeScript cannot narrow a discriminated union after getOverlays(); cast needed to access typed fields
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const menuOverlay = overlays[0] as Extract<(typeof overlays)[0], { type: 'contextMenu' }>;
      menuOverlay.resolve(undefined);

      await promise;
      expect(sendCommand).not.toHaveBeenCalled();
    });
  });

  describe('announceToScreenReader / aria-live', () => {
    afterEach(() => {
      // Clean up aria-live region if created
      const region = document.querySelector('[aria-live="assertive"]');
      if (region) region.remove();
    });

    it('should create an aria-live region when showing a context menu', async () => {
      vi.mocked(menuDataService.getWebViewMenu).mockResolvedValue(DEFAULT_WEB_VIEW_MENU);
      const promise = overlayService.showContextMenu('ext.testWebView', 'aria-webview');

      // Flush getWebViewMenu promise, then announceLocalizedToScreenReader's getLocalizedStrings
      await Promise.resolve();
      await Promise.resolve();

      const region = document.querySelector('[aria-live="assertive"]');
      expect(region).not.toBeNull();
      expect(region?.getAttribute('role')).toBe('status');

      // Clean up
      getOverlays()[0].resolve(undefined);
      return promise;
    });
  });

  describe('auto-dismiss listeners', () => {
    it('should call registerAutoDismissListeners when startOverlayService is called', async () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

      // Import and call startOverlayService
      const { startOverlayService } = await import('./overlay.service-host');
      await startOverlayService();

      // Should register scroll and blur listeners
      const scrollCall = addEventListenerSpy.mock.calls.find((call) => call[0] === 'scroll');
      const blurCall = addEventListenerSpy.mock.calls.find((call) => call[0] === 'blur');
      expect(scrollCall).toBeDefined();
      expect(blurCall).toBeDefined();

      addEventListenerSpy.mockRestore();
    });

    it('should dismiss context menus on scroll', async () => {
      vi.mocked(menuDataService.getWebViewMenu).mockResolvedValue(DEFAULT_WEB_VIEW_MENU);

      const promise = overlayService.showContextMenu('ext.testWebView', 'scroll-webview');
      await Promise.resolve();

      expect(getOverlays().filter((o) => o.type === 'contextMenu')).toHaveLength(1);

      // Simulate scroll event
      window.dispatchEvent(new Event('scroll'));

      // The overlay should have been resolved with undefined (dismissed)
      const result = await promise;
      expect(result).toBeUndefined();
    });

    it('should dismiss context menus on window blur outside creation grace period', async () => {
      vi.useFakeTimers();
      resetDebounceState();
      vi.mocked(menuDataService.getWebViewMenu).mockResolvedValue(DEFAULT_WEB_VIEW_MENU);

      const promise = overlayService.showContextMenu('ext.testWebView', 'blur-webview');
      await Promise.resolve();

      expect(getOverlays().filter((o) => o.type === 'contextMenu')).toHaveLength(1);

      // Advance past OVERLAY_CREATION_GRACE_MS (300ms)
      vi.advanceTimersByTime(350);

      // Simulate blur event
      window.dispatchEvent(new Event('blur'));

      const result = await promise;
      expect(result).toBeUndefined();

      vi.useRealTimers();
    });
  });

  describe('focus save/restore', () => {
    it('should save and restore focus when showing and resolving a modal dialog', async () => {
      // windowService.getFocus and setFocus are mocked at the top
      const { windowService } = await import('@shared/services/window.service');

      const MockFocusComponent = vi.fn(
        // vi.fn mock must satisfy React component return type; `any` cast is the standard test pattern
        // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
        () => undefined as any,
      );
      const props = { prompt: 'Focus test', isDialog: true };
      const promise = showModalDialogOverlay(MockFocusComponent, props, undefined, 'focus-webview');

      // saveFocus should have been called (getFocus is async, allow it to resolve)
      await Promise.resolve();
      expect(windowService.getFocus).toHaveBeenCalled();

      // Resolve the dialog to trigger restoreFocus
      const overlays = getOverlays();
      // TypeScript cannot narrow a discriminated union after getOverlays(); cast needed to access typed fields
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const modalOverlay = overlays[0] as Extract<(typeof overlays)[0], { type: 'modalDialog' }>;
      modalOverlay.resolve(true);

      await promise;
      // setFocus should have been called to restore
      expect(windowService.setFocus).toHaveBeenCalled();
    });
  });
});
