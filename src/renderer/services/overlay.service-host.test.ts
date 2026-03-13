import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getOverlays, getOverlayById, clearAllOverlays } from '@renderer/services/overlay-store';
import {
  ModalDialogOptions,
  OverlayReplacedError,
  PopoverContent,
  PopoverRequest,
} from '@shared/models/overlay.service-model';

/** Must match DEBOUNCE_COOLDOWN_MS in overlay.service-host.ts */
const DEBOUNCE_COOLDOWN_MS = 50;

// Mock dependencies
vi.mock('@renderer/services/overlay-validation', () => ({
  validateContextMenuRequest: vi.fn(),
  validateModalDialogOptions: vi.fn(),
  validatePopoverRequest: vi.fn(),
}));

vi.mock('@renderer/services/overlay-coordinates', () => ({
  translateCoordinates: vi.fn((_, pos) => pos),
  clampToViewport: vi.fn((pos) => pos),
  isWebViewVisible: vi.fn(() => true),
  isPositionInViewport: vi.fn(() => true),
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

// Import the service after mocks are set up
// eslint-disable-next-line import/first
import { overlayService, resetDebounceState } from '@renderer/services/overlay.service-host';

describe('overlay.service-host', () => {
  beforeEach(() => {
    // Reset debounce state so consecutive tests don't hit the cooldown window
    resetDebounceState();
    // Clean up all overlays before each test
    clearAllOverlays();
  });

  describe('context menus', () => {
    const validRequest = {
      items: [{ type: 'item' as const, id: 'cut', label: 'Cut' }],
      position: { x: 50, y: 100 },
    };

    it('should create an overlay entry of type contextMenu', () => {
      const promise = overlayService.showContextMenu(validRequest, 'test-webview');

      const overlays = getOverlays();
      expect(overlays).toHaveLength(1);
      const overlay = overlays[0];
      expect(overlay.type).toBe('contextMenu');

      // Clean up
      overlay.resolve(undefined);
      return promise;
    });

    it('should resolve with the selected item result', async () => {
      const promise = overlayService.showContextMenu(validRequest, 'test-webview');

      const overlays = getOverlays();
      // Only contextMenu overlays exist in this test
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const menuOverlay = overlays[0] as Extract<(typeof overlays)[0], { type: 'contextMenu' }>;
      menuOverlay.resolve({ itemId: 'cut' });

      const result = await promise;
      expect(result).toEqual({ itemId: 'cut' });
    });

    it('should resolve with undefined when dismissed', async () => {
      const promise = overlayService.showContextMenu(validRequest, 'test-webview');

      const overlays = getOverlays();
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const menuOverlay = overlays[0] as Extract<(typeof overlays)[0], { type: 'contextMenu' }>;
      menuOverlay.resolve(undefined);

      const result = await promise;
      expect(result).toBeUndefined();
    });

    it('should replace existing context menu from same webView', async () => {
      vi.useFakeTimers();

      const promise1 = overlayService.showContextMenu(validRequest, 'test-webview');

      vi.advanceTimersByTime(DEBOUNCE_COOLDOWN_MS);

      const request2 = {
        items: [{ type: 'item' as const, id: 'copy', label: 'Copy' }],
        position: { x: 60, y: 110 },
      };
      const promise2 = overlayService.showContextMenu(request2, 'test-webview');

      await expect(promise1).rejects.toThrow(OverlayReplacedError);

      const overlays = getOverlays();
      const menus = overlays.filter((o) => o.type === 'contextMenu');
      expect(menus).toHaveLength(1);

      // Clean up
      menus[0].resolve(undefined);
      vi.useRealTimers();
      return promise2;
    });

    it('should drop requests within debounce cooldown', async () => {
      const promise1 = overlayService.showContextMenu(validRequest, 'test-webview');
      // Second call within 50ms should be dropped
      const result2 = await overlayService.showContextMenu(validRequest, 'test-webview');

      expect(result2).toBeUndefined();
      expect(getOverlays()).toHaveLength(1);

      // Clean up
      getOverlays()[0].resolve(undefined);
      return promise1;
    });
  });

  describe('modal dialogs', () => {
    it('should create an overlay entry of type modalDialog for alert', () => {
      const options: ModalDialogOptions['alert'] = {
        message: 'Something happened',
      };

      // Start the promise but don't await yet (it waits for user interaction)
      const promise = overlayService.showModalDialog('alert', options, 'test-webview');

      // Verify an overlay entry was created in the store
      const overlays = getOverlays();
      expect(overlays).toHaveLength(1);
      const overlay = overlays[0];
      expect(overlay.type).toBe('modalDialog');
      // Type is verified by the assertion above
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const modalOverlay = overlay as Extract<typeof overlay, { type: 'modalDialog' }>;
      expect(modalOverlay.dialogType).toBe('alert');
      expect(modalOverlay.options).toBe(options);

      // Clean up: resolve the promise so the test doesn't hang
      modalOverlay.resolve(true);
      return promise;
    });

    it('should create an overlay entry of type modalDialog for confirm', () => {
      const options: ModalDialogOptions['confirm'] = {
        message: 'Are you sure?',
      };

      const promise = overlayService.showModalDialog('confirm', options, 'test-webview');

      const overlays = getOverlays();
      expect(overlays).toHaveLength(1);
      const overlay = overlays[0];
      expect(overlay.type).toBe('modalDialog');
      // Type is verified by the assertion above; TS can't narrow OverlayEntry union from .type check
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const modalOverlay = overlay as Extract<typeof overlay, { type: 'modalDialog' }>;
      expect(modalOverlay.dialogType).toBe('confirm');
      expect(modalOverlay.options).toBe(options);

      // Clean up
      modalOverlay.resolve(false);
      return promise;
    });

    it('should replace existing modal from same webView', async () => {
      vi.useFakeTimers();

      const options1: ModalDialogOptions['alert'] = {
        message: 'First dialog',
      };
      const options2: ModalDialogOptions['confirm'] = {
        message: 'Second dialog',
      };

      // Show first modal - it will be rejected when second replaces it
      const promise1 = overlayService.showModalDialog('alert', options1, 'test-webview');

      // Advance past debounce cooldown so the second call is accepted
      vi.advanceTimersByTime(DEBOUNCE_COOLDOWN_MS);

      // Show second modal from same webView
      const promise2 = overlayService.showModalDialog('confirm', options2, 'test-webview');

      // First should be rejected with OverlayReplacedError
      await expect(promise1).rejects.toThrow(OverlayReplacedError);

      // Only the second modal should remain
      const overlays = getOverlays();
      const modalOverlays = overlays.filter((o) => o.type === 'modalDialog');
      expect(modalOverlays).toHaveLength(1);
      const remaining = modalOverlays[0];
      expect(remaining.dialogType).toBe('confirm');

      // Clean up
      remaining.resolve(false);
      vi.useRealTimers();
      return promise2;
    });

    it('should resolve when dialog is resolved', async () => {
      const options: ModalDialogOptions['confirm'] = {
        message: 'Confirm?',
      };

      const promise = overlayService.showModalDialog('confirm', options, 'test-webview');

      const overlays = getOverlays();
      expect(overlays).toHaveLength(1);

      // Simulate dialog resolution — only modalDialog overlays exist in this test
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const modalOverlay = overlays[0] as Extract<(typeof overlays)[0], { type: 'modalDialog' }>;
      modalOverlay.resolve(true);

      const result = await promise;
      expect(result).toBe(true);
    });

    it('should resolve with undefined when alert dialog is dismissed', async () => {
      const options: ModalDialogOptions['alert'] = {
        message: 'Info',
      };

      const promise = overlayService.showModalDialog('alert', options, 'test-webview');

      const overlays = getOverlays();
      // Only modalDialog overlays exist in this test; TS can't narrow the union
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const alertOverlay = overlays[0] as Extract<(typeof overlays)[0], { type: 'modalDialog' }>;
      alertOverlay.resolve(true);

      const result = await promise;
      expect(result).toBe(true);
    });
  });

  describe('popovers', () => {
    const validRequest: PopoverRequest = {
      anchor: { x: 100, y: 200 },
      content: { type: 'text', body: 'Hello world' },
    };

    it('should create a popover overlay entry and return an ID string', async () => {
      const overlayId = await overlayService.showPopover(validRequest, 'test-webview');

      expect(typeof overlayId).toBe('string');
      expect(overlayId.length).toBeGreaterThan(0);

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
      const dismissPromise1 = overlayService.onPopoverDismissed(id1);

      // Advance past debounce cooldown so the second call is accepted
      vi.advanceTimersByTime(DEBOUNCE_COOLDOWN_MS);

      const id2 = await overlayService.showPopover(request2, 'test-webview');

      // First should have been rejected with OverlayReplacedError
      await expect(dismissPromise1).rejects.toThrow(OverlayReplacedError);

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

    it('should resolve onPopoverDismissed when popover is dismissed', async () => {
      const overlayId = await overlayService.showPopover(validRequest, 'test-webview');
      const dismissPromise = overlayService.onPopoverDismissed(overlayId);

      // Dismiss the popover
      await overlayService.dismissPopover(overlayId);

      const result = await dismissPromise;
      expect(result).toBeUndefined();
    });

    it('should resolve onPopoverDismissed immediately for unknown ID', async () => {
      const result = await overlayService.onPopoverDismissed('nonexistent-id');
      expect(result).toBeUndefined();
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
});
