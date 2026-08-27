import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  isPlatformError,
  ABORTED,
  RESOURCE_EXHAUSTED,
  FAILED_PRECONDITION,
  LanguageStrings,
} from 'platform-bible-utils';
import { sendCommand } from '@shared/services/command.service';
import { localizationService } from '@shared/services/localization.service';
import { logger } from '@shared/services/logger.service';
import { menuDataService } from '@shared/services/menu-data.service';
import { windowService } from '@shared/services/window.service';
import { CommandPaletteRequest, PopoverContent, PopoverRequest } from './overlay.service-model';
import { getOverlays, getOverlayById, clearAllOverlays, subscribe } from './overlay-store';
import { isWebViewVisible } from './overlay-coordinates';

/** Must match DEBOUNCE_COOLDOWN_MS in overlay.service-host.ts */
const DEBOUNCE_COOLDOWN_MS = 50;

/** Payload of the app-window input network event the main process emits */
type AppWindowInputEvent = { kind: 'mouseDown' | 'escape' };

/**
 * Callbacks the service registered on the app-window input network event. Hoisted so the
 * `@shared/services/network.service` mock factory (hoisted above the imports) can push into it.
 */
const { appWindowInputSubscribers } = vi.hoisted(() => {
  const subscribers: ((event: AppWindowInputEvent) => void)[] = [];
  return { appWindowInputSubscribers: subscribers };
});

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

// Capture the app-window input subscription instead of connecting to the real network
vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: vi.fn(() => (callback: (event: AppWindowInputEvent) => void) => {
    appWindowInputSubscribers.push(callback);
    return () => {};
  }),
}));

// Import the service after mocks are set up
// eslint-disable-next-line import/first
import {
  overlayService,
  resetAppWindowInputState,
  resetDebounceState,
  showModalDialogOverlay,
  startOverlayService,
} from './overlay.service-host';

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

    it('should reject with RESOURCE_EXHAUSTED within debounce cooldown when no palette is open', async () => {
      const promise1 = overlayService.showCommandPalette(validRequest, 'test-webview');
      // Dismiss the first palette so the second show has nothing to replace — the debounce
      // guards exactly this shape (an accidental rapid double-open with no palette on screen)
      await overlayService.dismissCommandPalette('test-webview');
      await promise1;

      await expect(
        overlayService.showCommandPalette(validRequest, 'test-webview'),
      ).rejects.toSatisfy(
        (error: unknown) => isPlatformError(error) && error.code === RESOURCE_EXHAUSTED,
      );
      expect(getOverlays()).toHaveLength(0);
    });

    it('should bypass the debounce and replace when this webView already has a palette open', async () => {
      // A second show inside the cooldown is a legitimate REPLACE when a palette is open (the `\`
      // commit key reopens the palette back-to-back). Rejecting it left the old palette mounted
      // while the owner's rejection cleanup cleared its session — keystrokes then fell through to
      // the document under a visible palette.
      const promise1 = overlayService.showCommandPalette(validRequest, 'test-webview');

      const request2: CommandPaletteRequest = {
        items: [{ id: 'p', label: 'Paragraph' }],
        anchor: { x: 60, y: 110 },
      };
      // Immediately (well inside the 50ms cooldown): the second show must succeed and replace
      const promise2 = overlayService.showCommandPalette(request2, 'test-webview');

      await expect(promise1).rejects.toSatisfy(
        (error: unknown) => isPlatformError(error) && error.code === ABORTED,
      );
      const palettes = getOverlays().filter((o) => o.type === 'commandPalette');
      expect(palettes).toHaveLength(1);
      const palette = palettes[0];
      expect(palette.items).toBe(request2.items);

      palette.resolve(undefined);
      return promise2;
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

  describe('passive command palettes', () => {
    const passiveRequest: CommandPaletteRequest = {
      items: [
        { id: 'ft', label: 'Footnote' },
        { id: 'xt', label: 'Cross Reference' },
        { id: 'fig', label: 'Figure' },
      ],
      passive: true,
    };

    it('should show passive, narrow via updateFilter, clamp via moveSelection, and commit the highlighted id', async () => {
      const promise = overlayService.showCommandPalette(passiveRequest, 'test-webview');

      // filterText narrows to items whose label starts with "F": Footnote, Figure
      await overlayService.updateCommandPalette('test-webview', { filterText: 'F' });

      let overlay = getOverlayById(getOverlays()[0].id);
      // TypeScript cannot narrow a discriminated union after getOverlayById(); cast needed to access typed fields
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      let palette = overlay as Extract<NonNullable<typeof overlay>, { type: 'commandPalette' }>;
      expect(palette.filterText).toBe('F');
      expect(palette.selectedIndex).toBe(0);

      // moveSelection past the end of the filtered (2-item) list clamps to the last index
      await overlayService.updateCommandPalette('test-webview', { moveSelection: 5 });

      overlay = getOverlayById(palette.id);
      // TypeScript cannot narrow a discriminated union after getOverlayById(); cast needed to access typed fields
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      palette = overlay as Extract<NonNullable<typeof overlay>, { type: 'commandPalette' }>;
      expect(palette.selectedIndex).toBe(1);

      await overlayService.commitCommandPaletteSelection('test-webview');

      // Highlighted item at filtered index 1 (of [Footnote, Figure]) is Figure
      const result = await promise;
      expect(result).toBe('fig');
    });

    it('commits the exact marker for a bare-marker palette filtered to "f" (the `\\f` Space/Enter flow)', async () => {
      // The standard-view marker palette maps items with label = the bare marker (id = marker).
      // The context-ordered offer puts prefix-mates BEFORE the exact match (measured: note
      // content offers [fk, fq, fr, ft, ..., f], and before ranking `\f` + Space committed
      // `fk`) — the exact-first ranking must resolve `f` itself regardless of context order.
      const request: CommandPaletteRequest = {
        items: [
          { id: 'fk', label: 'fk' },
          { id: 'fq', label: 'fq' },
          { id: 'fr', label: 'fr' },
          { id: 'ft', label: 'ft' },
          { id: 'nd', label: 'nd' },
          { id: 'f', label: 'f' },
        ],
        passive: true,
      };
      const promise = overlayService.showCommandPalette(request, 'test-webview');
      await overlayService.updateCommandPalette('test-webview', { filterText: 'f' });
      await overlayService.commitCommandPaletteSelection('test-webview');
      expect(await promise).toBe('f');
    });

    it('commits the typed marker, not a context-first neighbor, for filter "nd" (the `\\nd` report)', async () => {
      // The owner's report: typing `\nd` + Space inserted `\fq` — the palette resolved the
      // FIRST item of an unfiltered/unranked context list instead of the typed marker. With the
      // filter routed and ranked, the commit resolves exactly what was typed.
      const request: CommandPaletteRequest = {
        items: [
          { id: 'fq', label: 'fq' },
          { id: 'xt', label: 'xt' },
          { id: 'addpn', label: 'addpn' },
          { id: 'nd', label: 'nd' },
          { id: 'ndx', label: 'ndx' },
        ],
        passive: true,
      };
      const promise = overlayService.showCommandPalette(request, 'test-webview');
      await overlayService.updateCommandPalette('test-webview', { filterText: 'n' });
      await overlayService.updateCommandPalette('test-webview', { filterText: 'nd' });
      await overlayService.commitCommandPaletteSelection('test-webview');
      expect(await promise).toBe('nd');
    });

    it('should narrow passive palettes by case-insensitive prefix (lowercase filter finds capitalized labels)', async () => {
      const promise = overlayService.showCommandPalette(passiveRequest, 'test-webview');

      // 'fi' must match 'Figure' (and only it) even though the label is capitalized
      await overlayService.updateCommandPalette('test-webview', { filterText: 'fi' });
      await overlayService.commitCommandPaletteSelection('test-webview');

      // Commit resolved the palette rather than dropping on a 0-match filter
      expect(getOverlays()).toHaveLength(0);
      expect(await promise).toBe('fig');
    });

    it('should commit an ACTIVE palette via case-insensitive LABEL containment, ranked ahead of description hits', async () => {
      const activeRequest: CommandPaletteRequest = {
        items: [
          { id: 'm', label: 'Margin (m)', description: 'Flush-left paragraph' },
          { id: 'p', label: 'Paragraph (p)', description: 'Normal paragraph' },
        ],
      };
      const promise = overlayService.showCommandPalette(activeRequest, 'test-webview');

      // Label containment, different case — matches 'Paragraph (p)' only.
      await overlayService.updateCommandPalette('test-webview', { filterText: 'paragraph (p' });
      await overlayService.commitCommandPaletteSelection('test-webview');

      expect(getOverlays()).toHaveLength(0);
      expect(await promise).toBe('p');
    });

    it('should commit a description match by default (general command palettes search all visible text)', async () => {
      const activeRequest: CommandPaletteRequest = {
        items: [
          { id: 'm', label: 'Margin (m)', description: 'Flush-left paragraph' },
          { id: 'p', label: 'Paragraph (p)', description: 'Normal paragraph' },
        ],
      };
      const promise = overlayService.showCommandPalette(activeRequest, 'test-webview');

      // 'normal' appears only in a DESCRIPTION — with no searchFields declared, the default field
      // union (label + description + badge) finds it, so the commit resolves.
      await overlayService.updateCommandPalette('test-webview', { filterText: 'normal' });
      await overlayService.commitCommandPaletteSelection('test-webview');

      expect(getOverlays()).toHaveLength(0);
      expect(await promise).toBe('p');
    });

    it("should drop the commit and keep a searchFields: ['label'] palette open when the filter only matches descriptions", async () => {
      const activeRequest: CommandPaletteRequest = {
        items: [
          { id: 'm', label: 'Margin (m)', description: 'Flush-left paragraph' },
          { id: 'p', label: 'Paragraph (p)', description: 'Normal paragraph' },
        ],
        // The marker-palette opt-in: the label IS the identity, so description hits must not
        // resolve a commit.
        searchFields: ['label'],
      };
      overlayService.showCommandPalette(activeRequest, 'test-webview');

      // 'normal' appears only in a DESCRIPTION — label-only matching sees zero matches, and a
      // zero-match commit is dropped with the palette left open (PT9 zero-match semantics).
      await overlayService.updateCommandPalette('test-webview', { filterText: 'normal' });
      await overlayService.commitCommandPaletteSelection('test-webview');

      expect(getOverlays()).toHaveLength(1);
      await overlayService.dismissCommandPalette('test-webview');
    });

    it('should skip disabled items when committing, selecting the next enabled item', async () => {
      const request: CommandPaletteRequest = {
        items: [
          { id: 'a', label: 'Alpha' },
          { id: 'b', label: 'Bravo', disabled: true },
          { id: 'c', label: 'Charlie' },
        ],
        passive: true,
      };
      const promise = overlayService.showCommandPalette(request, 'test-webview');

      await overlayService.updateCommandPalette('test-webview', { moveSelection: 1 });
      await overlayService.commitCommandPaletteSelection('test-webview');

      const result = await promise;
      expect(result).toBe('c');
    });

    // A new filter re-ranks the list, so an index left over from arrow-key movement points at an
    // unrelated item. Carrying it forward (clamping only) commits that item on Enter instead of the
    // best match the new filter puts first — a silent wrong-marker insert.
    it('should reset the highlight to the top match when the filter text changes', async () => {
      const promise = overlayService.showCommandPalette(passiveRequest, 'test-webview');

      // Arrow down to the last item (Figure) in the unfiltered list...
      await overlayService.updateCommandPalette('test-webview', { moveSelection: 2 });
      // ...then type a filter, which narrows to Footnote, Figure.
      await overlayService.updateCommandPalette('test-webview', { filterText: 'F' });

      const overlay = getOverlayById(getOverlays()[0].id);
      // TypeScript cannot narrow a discriminated union after getOverlayById(); cast needed to access typed fields
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const palette = overlay as Extract<NonNullable<typeof overlay>, { type: 'commandPalette' }>;
      expect(palette.selectedIndex).toBe(0);

      await overlayService.commitCommandPaletteSelection('test-webview');
      expect(await promise).toBe('ft');
    });

    // The counterpart: an arrow-key move must still carry the index it moved to.
    it('should keep the highlight when only the selection moves', async () => {
      const promise = overlayService.showCommandPalette(passiveRequest, 'test-webview');

      await overlayService.updateCommandPalette('test-webview', { filterText: 'F' });
      await overlayService.updateCommandPalette('test-webview', { moveSelection: 1 });

      await overlayService.commitCommandPaletteSelection('test-webview');
      expect(await promise).toBe('fig');
    });

    it('should no-op when committing and every item is disabled', async () => {
      const request: CommandPaletteRequest = {
        items: [
          { id: 'a', label: 'Alpha', disabled: true },
          { id: 'b', label: 'Bravo', disabled: true },
        ],
        passive: true,
      };
      const promise = overlayService.showCommandPalette(request, 'test-webview');

      await overlayService.commitCommandPaletteSelection('test-webview');

      // Overlay should still be present — commit was a no-op
      expect(getOverlays()).toHaveLength(1);

      getOverlays()[0].resolve(undefined);
      await promise;
    });

    it('should leave the palette open with its promise pending when committing a filter that matches nothing', async () => {
      vi.mocked(logger.warn).mockClear();
      const promise = overlayService.showCommandPalette(passiveRequest, 'test-webview');

      await overlayService.updateCommandPalette('test-webview', { filterText: 'zzz' });
      await overlayService.commitCommandPaletteSelection('test-webview');

      // The palette must stay open so the user can correct the filter; committing nothing must not
      // settle the requesting flow
      expect(getOverlays()).toHaveLength(1);
      expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('matches 0 of'));

      let settled = false;
      const settledProbe = promise.finally(() => {
        settled = true;
      });
      await Promise.resolve();
      await Promise.resolve();
      await Promise.resolve();
      expect(settled).toBe(false);

      getOverlays()[0].resolve(undefined);
      await settledProbe;
    });

    it('should clear the stored filter when the driven filter text goes back to empty', async () => {
      // Backspacing the last filter character sends filterText: ''. Leaving the previous filter
      // stored keeps the rendered list narrowed and makes the next commit resolve from that stale
      // filter instead of the full list.
      const promise = overlayService.showCommandPalette(passiveRequest, 'test-webview');

      await overlayService.updateCommandPalette('test-webview', { filterText: 'F' });
      await overlayService.updateCommandPalette('test-webview', { filterText: '' });

      const overlay = getOverlayById(getOverlays()[0].id);
      // TypeScript cannot narrow a discriminated union after getOverlayById(); cast needed to access typed fields
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const palette = overlay as Extract<NonNullable<typeof overlay>, { type: 'commandPalette' }>;
      expect(palette.filterText).toBeUndefined();

      // The commit resolves from the FULL list, so index 0 is its first item
      await overlayService.commitCommandPaletteSelection('test-webview');
      await expect(promise).resolves.toBe('ft');
    });

    it('should leave the store untouched when an update carries neither filterText nor moveSelection', async () => {
      const promise = overlayService.showCommandPalette(passiveRequest, 'test-webview');

      const listener = vi.fn();
      const unsubscribe = subscribe(listener);
      await overlayService.updateCommandPalette('test-webview', {});
      unsubscribe();

      // An empty update must not notify store subscribers or disturb the palette's state
      expect(listener).not.toHaveBeenCalled();
      const overlays = getOverlays();
      // Only commandPalette overlays exist in this test
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const palette = overlays[0] as Extract<(typeof overlays)[0], { type: 'commandPalette' }>;
      expect(palette.filterText).toBeUndefined();
      expect(palette.selectedIndex).toBe(0);

      palette.resolve(undefined);
      await promise;
    });

    it('should apply filterText updates to a non-passive (active) palette (forwarded driving)', async () => {
      // The extension forwards keystrokes via updateCommandPalette when the
      // cross-frame focus handoff loses; the active palette's controlled search input consumes
      // the driven filterText, so the update must be stored for active palettes too.
      const activeRequest: CommandPaletteRequest = {
        items: [{ id: 'ft', label: 'Footnote' }],
      };
      const promise = overlayService.showCommandPalette(activeRequest, 'test-webview');

      await overlayService.updateCommandPalette('test-webview', { filterText: 'f' });

      const overlay = getOverlayById(getOverlays()[0].id);
      // TypeScript cannot narrow a discriminated union after getOverlayById(); cast needed to access typed fields
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const palette = overlay as Extract<NonNullable<typeof overlay>, { type: 'commandPalette' }>;
      expect(palette.filterText).toBe('f');

      getOverlays()[0].resolve(undefined);
      await promise;
    });

    it('should no-op updateCommandPalette/commitCommandPaletteSelection/dismissCommandPalette when no palette is active', async () => {
      await expect(
        overlayService.updateCommandPalette('no-such-webview', { filterText: 'x' }),
      ).resolves.toBeUndefined();
      await expect(
        overlayService.commitCommandPaletteSelection('no-such-webview'),
      ).resolves.toBeUndefined();
      await expect(
        overlayService.dismissCommandPalette('no-such-webview'),
      ).resolves.toBeUndefined();
      expect(getOverlays()).toHaveLength(0);
    });

    it('should dismiss and resolve with undefined for a passive palette', async () => {
      const promise = overlayService.showCommandPalette(passiveRequest, 'test-webview');

      await overlayService.dismissCommandPalette('test-webview');

      const result = await promise;
      expect(result).toBeUndefined();
      expect(getOverlays()).toHaveLength(0);
    });

    it('should dismiss and resolve with undefined for an active palette', async () => {
      const activeRequest: CommandPaletteRequest = {
        items: [{ id: 'ft', label: 'Footnote' }],
      };
      const promise = overlayService.showCommandPalette(activeRequest, 'test-webview');

      await overlayService.dismissCommandPalette('test-webview');

      const result = await promise;
      expect(result).toBeUndefined();
      expect(getOverlays()).toHaveLength(0);
    });

    it('should still ABORT the replaced palette when a new request replaces a passive one', async () => {
      vi.useFakeTimers();

      const promise1 = overlayService.showCommandPalette(passiveRequest, 'test-webview');

      vi.advanceTimersByTime(DEBOUNCE_COOLDOWN_MS);

      const request2: CommandPaletteRequest = {
        items: [{ id: 'p', label: 'Paragraph' }],
        passive: true,
      };
      const promise2 = overlayService.showCommandPalette(request2, 'test-webview');

      await expect(promise1).rejects.toSatisfy(
        (error: unknown) => isPlatformError(error) && error.code === ABORTED,
      );

      const palettes = getOverlays().filter((o) => o.type === 'commandPalette');
      expect(palettes).toHaveLength(1);

      getOverlays()[0].resolve(undefined);
      vi.useRealTimers();
      return promise2;
    });
  });

  describe('command palette item localization', () => {
    /** Localized strings the mock localization service knows about */
    const LOCALIZED_STRINGS: LanguageStrings = {
      '%marker_ft_label%': 'Footnote',
      '%marker_fig_label%': 'Figure',
      '%marker_ft_description%': 'Footnote text',
      '%marker_ft_badge%': 'Deprecated',
    };

    beforeEach(() => {
      vi.mocked(localizationService.getLocalizedStrings).mockImplementation(
        async ({ localizeKeys }) => {
          const strings: LanguageStrings = {};
          localizeKeys.forEach((key) => {
            if (LOCALIZED_STRINGS[key] !== undefined) strings[key] = LOCALIZED_STRINGS[key];
          });
          return strings;
        },
      );
    });

    afterEach(() => {
      // Restore the file-level default so later tests see an empty localization map again
      vi.mocked(localizationService.getLocalizedStrings).mockImplementation(async () => ({}));
    });

    it('should let the NEWEST of two requests overlapping in the localization await win — never the older palette', async () => {
      // Overlapped awaits resolve in localization-COMPLETION order, not arrival order. Hold the
      // FIRST request's localization open so the second request lands mid-await and the first
      // resolves LAST: without the request-sequence guard, the first request's post-await sweep
      // would reject the newer palette and mount its own — the user would see the OLDER palette.
      let releaseFirstLocalization: (strings: LanguageStrings) => void = () => {};
      vi.mocked(localizationService.getLocalizedStrings).mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            releaseFirstLocalization = resolve;
          }),
      );

      const request1: CommandPaletteRequest = {
        items: [{ id: 'ft', label: '%marker_ft_label%' }],
      };
      const promise1 = overlayService.showCommandPalette(request1, 'test-webview');
      // Capture the settlement NOW (handler attached before the abort can fire)
      const firstOutcome = promise1.then(
        () => 'resolved',
        (error: unknown) => error,
      );

      // Clear the cooldown so the second request is not a debounce duplicate — this test is about
      // the localization-await window, not the debounce (request 1 has no palette mounted yet, so
      // the replace bypass does not apply).
      resetDebounceState();
      const request2: CommandPaletteRequest = {
        items: [{ id: 'fig', label: '%marker_fig_label%' }],
      };
      const promise2 = overlayService.showCommandPalette(request2, 'test-webview');
      await vi.waitFor(() => expect(getOverlays()).toHaveLength(1));

      releaseFirstLocalization({ '%marker_ft_label%': 'Footnote' });
      const firstError = await firstOutcome;
      expect(isPlatformError(firstError) && firstError.code === ABORTED).toBe(true);

      const palettes = getOverlays().filter((o) => o.type === 'commandPalette');
      expect(palettes).toHaveLength(1);
      // The survivor is the NEWER request's palette
      const survivor = palettes[0];
      expect(survivor.items[0].id).toBe('fig');

      survivor.resolve(undefined);
      return promise2;
    });

    it('should narrow and commit an ACTIVE palette by its LOCALIZED label when items use LocalizeKeys', async () => {
      const request: CommandPaletteRequest = {
        items: [
          { id: 'ft', label: '%marker_ft_label%' },
          { id: 'fig', label: '%marker_fig_label%' },
        ],
      };
      const promise = overlayService.showCommandPalette(request, 'test-webview');

      // Item localization resolves before the entry is stored — wait for the overlay to appear
      await vi.waitFor(() => expect(getOverlays()).toHaveLength(1));

      // The user sees "Footnote" on screen, so forwarded keystrokes spell the localized text
      await overlayService.updateCommandPalette('test-webview', { filterText: 'foot' });
      await overlayService.commitCommandPaletteSelection('test-webview');

      // Commit resolved the palette instead of dropping on a 0-match raw-key filter
      expect(getOverlays()).toHaveLength(0);
      expect(await promise).toBe('ft');
    });

    it('should prefix-match a PASSIVE palette against localized labels', async () => {
      const request: CommandPaletteRequest = {
        items: [
          { id: 'ft', label: '%marker_ft_label%' }, // "Footnote"
          { id: 'fig', label: '%marker_fig_label%' }, // "Figure"
        ],
        passive: true,
      };
      const promise = overlayService.showCommandPalette(request, 'test-webview');
      await vi.waitFor(() => expect(getOverlays()).toHaveLength(1));

      await overlayService.updateCommandPalette('test-webview', { filterText: 'fi' });
      await overlayService.commitCommandPaletteSelection('test-webview');

      expect(getOverlays()).toHaveLength(0);
      expect(await promise).toBe('fig');
    });

    it('should store items with label, description, and badge resolved at show time', async () => {
      const request: CommandPaletteRequest = {
        items: [
          {
            id: 'ft',
            label: '%marker_ft_label%',
            description: '%marker_ft_description%',
            badge: '%marker_ft_badge%',
          },
          { id: 'zz', label: '%marker_unknown_label%' },
        ],
      };
      const promise = overlayService.showCommandPalette(request, 'test-webview');
      await vi.waitFor(() => expect(getOverlays()).toHaveLength(1));

      const overlays = getOverlays();
      // Only commandPalette overlays exist in this test
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const palette = overlays[0] as Extract<(typeof overlays)[0], { type: 'commandPalette' }>;
      expect(palette.items[0]).toMatchObject({
        label: 'Footnote',
        description: 'Footnote text',
        badge: 'Deprecated',
      });
      // A key the localization service does not know keeps its raw key text, matching the
      // component's display fallback
      expect(palette.items[1].label).toBe('%marker_unknown_label%');

      palette.resolve(undefined);
      await promise;
    });

    it('should still open the palette with raw key text when localization fails at show time', async () => {
      vi.mocked(localizationService.getLocalizedStrings).mockRejectedValue(
        new Error('localization backend unavailable'),
      );

      const request: CommandPaletteRequest = {
        items: [
          { id: 'ft', label: '%marker_ft_label%' },
          { id: 'fig', label: '%marker_fig_label%' },
        ],
      };
      const promise = overlayService.showCommandPalette(request, 'test-webview');

      // A localization outage must degrade to raw key text, not block the palette from opening
      await vi.waitFor(() => expect(getOverlays()).toHaveLength(1));

      const overlays = getOverlays();
      // Only commandPalette overlays exist in this test
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const palette = overlays[0] as Extract<(typeof overlays)[0], { type: 'commandPalette' }>;
      expect(palette.items[0].label).toBe('%marker_ft_label%');
      expect(palette.items[1].label).toBe('%marker_fig_label%');

      palette.resolve(undefined);
      await promise;
    });

    it('should keep only the NEWER palette when two localized requests overlap the localization await', async () => {
      // Both requests carry LocalizeKey items, so both take the localization await — the window in
      // which the pre-await replace sweep cannot see the other request. The request-sequence guard
      // makes the SUPERSEDED request abort itself the moment its await resolves (its palette is
      // never mounted at all), leaving one palette that is also the one the WebView-keyed drivers
      // drive.
      const pendingItemLookups: (() => void)[] = [];
      vi.mocked(localizationService.getLocalizedStrings).mockImplementation(
        async ({ localizeKeys }) => {
          const strings: LanguageStrings = {};
          localizeKeys.forEach((localizeKey) => {
            if (LOCALIZED_STRINGS[localizeKey] !== undefined)
              strings[localizeKey] = LOCALIZED_STRINGS[localizeKey];
          });
          // Screen-reader announcement lookups resolve immediately; only ITEM localization (marker
          // keys) is held open so both shows sit in the await together
          if (!localizeKeys.some((localizeKey) => localizeKey.startsWith('%marker_')))
            return strings;
          return new Promise((resolve) => {
            pendingItemLookups.push(() => resolve(strings));
          });
        },
      );
      const flushMicrotasks = async () => {
        await Promise.resolve();
        await Promise.resolve();
        await Promise.resolve();
      };

      const requestA: CommandPaletteRequest = {
        items: [{ id: 'ft', label: '%marker_ft_label%' }],
      };
      const requestB: CommandPaletteRequest = {
        items: [
          { id: 'ft', label: '%marker_ft_label%' },
          { id: 'fig', label: '%marker_fig_label%' },
        ],
      };

      const promiseA = overlayService.showCommandPalette(requestA, 'test-webview');
      // The two requests are >50ms apart in production; collapse the cooldown for the test
      resetDebounceState();
      const promiseB = overlayService.showCommandPalette(requestB, 'test-webview');
      // Handled promptly, so the ABORTED rejection is never momentarily unhandled when B's sweep
      // rejects A mid-flush; the outcome is asserted once it lands
      const promiseAOutcome = promiseA.then(
        () => 'resolved unexpectedly',
        (error: unknown) => error,
      );
      await flushMicrotasks();
      expect(pendingItemLookups).toHaveLength(2);

      // A's localization resolves first, but B has already superseded it — A aborts itself
      // without ever mounting its palette (previously it mounted briefly and B's sweep removed it)
      pendingItemLookups[0]();
      await flushMicrotasks();
      const abortError = await promiseAOutcome;
      expect(isPlatformError(abortError) && abortError.code === ABORTED).toBe(true);
      expect(getOverlays()).toHaveLength(0);

      // B's localization resolves: still the newest, so its palette mounts
      pendingItemLookups[1]();
      await flushMicrotasks();
      const palettes = getOverlays().filter((o) => o.type === 'commandPalette');
      expect(palettes).toHaveLength(1);

      // The surviving palette is the one the WebView-keyed drivers drive
      await overlayService.updateCommandPalette('test-webview', { filterText: 'fi' });
      await overlayService.commitCommandPaletteSelection('test-webview');
      expect(await promiseB).toBe('fig');
      expect(getOverlays()).toHaveLength(0);
    });

    it('should pass plain-string items through untouched and create the overlay synchronously', () => {
      vi.mocked(localizationService.getLocalizedStrings).mockClear();
      const request: CommandPaletteRequest = {
        items: [
          { id: 'ft', label: 'Footnote' },
          { id: 'xt', label: 'Cross Reference' },
        ],
      };
      const promise = overlayService.showCommandPalette(request, 'test-webview');

      // No LocalizeKeys → no localization await: the overlay must exist synchronously so the
      // palette is immediately drivable (forwarded keystrokes can arrive right after show)
      const overlays = getOverlays();
      expect(overlays).toHaveLength(1);
      // A fully-resolved request never consults the localization service for ITEM text — the
      // await that would introduce is the window where keystrokes typed right after show were
      // dropped. (The fire-and-forget screen-reader lookups are the only legitimate ones on this
      // path — the opened announcement plus the per-open hoist of the two update-announcement
      // templates — and neither gates overlay creation.)
      const legitimateAnnouncementLookups = [
        ['%overlay_aria_commandPaletteOpened%'],
        ['%overlay_aria_commandPaletteNoResults%', '%overlay_aria_commandPaletteHighlightedItem%'],
      ];
      vi.mocked(localizationService.getLocalizedStrings).mock.calls.forEach(
        ([{ localizeKeys }]) => {
          expect(legitimateAnnouncementLookups).toContainEqual(localizeKeys);
        },
      );
      // Only commandPalette overlays exist in this test
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const palette = overlays[0] as Extract<(typeof overlays)[0], { type: 'commandPalette' }>;
      expect(palette.items).toBe(request.items);

      palette.resolve(undefined);
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

  describe('command palette screen-reader announcements', () => {
    const markerPaletteRequest: CommandPaletteRequest = {
      passive: true,
      items: [
        { id: 'f', label: 'f' },
        { id: 'fe', label: 'fe' },
        { id: 'fig', label: 'fig' },
      ],
    };

    /** Announcement templates the mock localization service resolves */
    const ANNOUNCEMENT_STRINGS: LanguageStrings = {
      '%overlay_aria_commandPaletteOpened%': 'Command palette opened',
      '%overlay_aria_commandPaletteHighlightedItem%': '{label}, {index} of {count}',
      '%overlay_aria_commandPaletteNoResults%': 'No results',
    };

    /** Text currently in the overlay service's aria-live region */
    function ariaLiveText(): string {
      return document.querySelector('[aria-live="assertive"]')?.textContent ?? '';
    }

    /**
     * Runs out every announcement in flight: each one resolves its localized string and then waits
     * out the delay that separates clearing the live region from filling it again.
     */
    async function flushAnnouncements(): Promise<void> {
      await vi.advanceTimersByTimeAsync(100);
    }

    beforeEach(() => {
      vi.useFakeTimers();
      vi.mocked(localizationService.getLocalizedStrings).mockImplementation(
        async ({ localizeKeys }) => {
          const strings: LanguageStrings = {};
          localizeKeys.forEach((key) => {
            if (ANNOUNCEMENT_STRINGS[key] !== undefined) strings[key] = ANNOUNCEMENT_STRINGS[key];
          });
          return strings;
        },
      );
    });

    afterEach(() => {
      // Restore the file-level default so later tests see an empty localization map again
      vi.mocked(localizationService.getLocalizedStrings).mockImplementation(async () => ({}));
      document.querySelector('[aria-live="assertive"]')?.remove();
    });

    /**
     * Opens a palette and settles its "opened" announcement. The still-pending `showCommandPalette`
     * promise is handed back wrapped, because an async function that returned it directly would
     * adopt it and never settle.
     */
    async function showAnnouncingPalette(
      webViewId: string,
    ): Promise<{ palette: Promise<string | undefined> }> {
      const palette = overlayService.showCommandPalette(markerPaletteRequest, webViewId);
      await flushAnnouncements();
      expect(ariaLiveText()).toBe('Command palette opened');
      return { palette };
    }

    /** Dismisses whatever the test opened so its showCommandPalette promise settles */
    async function dismissAndAwait(palette: Promise<string | undefined>): Promise<void> {
      getOverlays().forEach((overlay) => overlay.resolve(undefined));
      await expect(palette).resolves.toBeUndefined();
    }

    it('should announce the highlighted item and match count when the filter narrows the list', async () => {
      const { palette } = await showAnnouncingPalette('sr-filter');

      await overlayService.updateCommandPalette('sr-filter', { filterText: 'fe' });
      await flushAnnouncements();

      expect(ariaLiveText()).toBe('fe, 1 of 1');

      await dismissAndAwait(palette);
    });

    it('resolves the announcement templates once at open — filtering keystrokes cost no further localization round trips', async () => {
      // The per-update announcement runs on nearly every filtering keystroke (its de-dupe keys on
      // highlight + match count), and each localization resolve is a JSON-RPC round trip to the
      // extension host — so the templates are hoisted to palette open. Both static keys resolve
      // there; every later keystroke formats locally.
      const { palette } = await showAnnouncingPalette('sr-hoist');
      vi.mocked(localizationService.getLocalizedStrings).mockClear();

      await overlayService.updateCommandPalette('sr-hoist', { filterText: 'f' });
      await flushAnnouncements();
      await overlayService.updateCommandPalette('sr-hoist', { filterText: 'fe' });
      await flushAnnouncements();
      await overlayService.updateCommandPalette('sr-hoist', { filterText: 'zz' });
      await flushAnnouncements();

      // The announcements themselves happened, from the hoisted templates...
      expect(ariaLiveText()).toBe('No results');
      // ...and no per-keystroke localization lookups were paid for them.
      expect(localizationService.getLocalizedStrings).not.toHaveBeenCalled();

      await dismissAndAwait(palette);
    });

    it('still announces per-call while the hoisted templates have not resolved yet', async () => {
      // First keystroke racing the open-time resolve: the fallback path awaits localization per
      // announcement, so nothing goes silent — it just pays the round trip the hoist normally
      // saves. The hang is scoped to the TEMPLATE resolve; the per-call announcement path (and the
      // opened announcement) keep resolving.
      const hangs: Promise<never> = new Promise(() => {});
      vi.mocked(localizationService.getLocalizedStrings).mockImplementation(
        async ({ localizeKeys }) => {
          if (localizeKeys.length === 2) return hangs; // the hoist's two-key template resolve
          const strings: LanguageStrings = {};
          localizeKeys.forEach((key) => {
            if (ANNOUNCEMENT_STRINGS[key] !== undefined) strings[key] = ANNOUNCEMENT_STRINGS[key];
          });
          return strings;
        },
      );
      const { palette } = await showAnnouncingPalette('sr-hoist-race');

      await overlayService.updateCommandPalette('sr-hoist-race', { filterText: 'fe' });
      await flushAnnouncements();

      expect(ariaLiveText()).toBe('fe, 1 of 1');

      await dismissAndAwait(palette);
    });

    it('should announce the newly highlighted item when the selection moves', async () => {
      const { palette } = await showAnnouncingPalette('sr-move');

      await overlayService.updateCommandPalette('sr-move', { moveSelection: 1 });
      await flushAnnouncements();

      expect(ariaLiveText()).toBe('fe, 2 of 3');

      await dismissAndAwait(palette);
    });

    it('should announce that nothing matches when the filter empties the list', async () => {
      const { palette } = await showAnnouncingPalette('sr-empty');

      await overlayService.updateCommandPalette('sr-empty', { filterText: 'zz' });
      await flushAnnouncements();

      expect(ariaLiveText()).toBe('No results');

      await dismissAndAwait(palette);
    });

    it('should say nothing when an update changes neither the highlight nor the match count', async () => {
      const { palette } = await showAnnouncingPalette('sr-repeat');

      await overlayService.updateCommandPalette('sr-repeat', { filterText: 'fe' });
      await flushAnnouncements();
      expect(ariaLiveText()).toBe('fe, 1 of 1');

      // Re-sending the same filter text leaves the palette showing exactly what was announced
      const region = document.querySelector('[aria-live="assertive"]');
      if (region) region.textContent = 'not re-announced';
      await overlayService.updateCommandPalette('sr-repeat', { filterText: 'fe' });
      await flushAnnouncements();

      expect(ariaLiveText()).toBe('not re-announced');

      await dismissAndAwait(palette);
    });

    it('should say nothing when an update leaves the palette exactly as it opened', async () => {
      const { palette } = await showAnnouncingPalette('sr-noop');

      await overlayService.updateCommandPalette('sr-noop', { moveSelection: 0 });
      await flushAnnouncements();

      expect(ariaLiveText()).toBe('Command palette opened');

      await dismissAndAwait(palette);
    });
  });

  describe('auto-dismiss listeners', () => {
    it('should call registerAutoDismissListeners when startOverlayService is called', async () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

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

    /**
     * Registers the auto-dismiss listeners and captures the focus-change callback the host handed
     * to windowService.subscribeFocus, so tests can simulate focus moving between tabs/WebViews.
     */
    async function captureFocusChangeCallback() {
      vi.mocked(windowService.subscribeFocus).mockClear();
      await startOverlayService();
      const subscribeCall = vi.mocked(windowService.subscribeFocus).mock.calls.at(-1);
      expect(subscribeCall).toBeDefined();
      return subscribeCall?.[1];
    }

    it('should not dismiss overlays when focus lands inside the overlay host or a Radix popper portal', async () => {
      vi.useFakeTimers();
      resetDebounceState();
      const onFocusChange = await captureFocusChangeCallback();

      const promise = overlayService.showCommandPalette(
        { items: [{ id: 'ft', label: 'Footnote' }] },
        'focus-guard-webview',
      );
      expect(getOverlays()).toHaveLength(1);

      // Advance past the creation grace period so only the focus-location guard can keep it open
      vi.advanceTimersByTime(350);

      // Overlays render in the parent document, so focusing one is classified as leaving the
      // WebView — the guard must recognize the active element sits inside the overlay host
      // (e.g. clicking the palette's own search input) and not dismiss
      const host = document.createElement('div');
      host.setAttribute('data-overlay-host', '');
      const hostButton = document.createElement('button');
      host.appendChild(hostButton);
      document.body.appendChild(host);
      hostButton.focus();

      onFocusChange?.({ focusType: 'webView', id: 'other-webview' });
      expect(getOverlays()).toHaveLength(1);

      // Anchored palettes render through a Radix popover portal directly under document.body,
      // outside the overlay host div — focus inside that portal must not dismiss either
      const popperPortal = document.createElement('div');
      popperPortal.setAttribute('data-radix-popper-content-wrapper', '');
      const popperButton = document.createElement('button');
      popperPortal.appendChild(popperButton);
      document.body.appendChild(popperPortal);
      popperButton.focus();

      onFocusChange?.({ focusType: 'webView', id: 'third-webview' });
      expect(getOverlays()).toHaveLength(1);

      host.remove();
      popperPortal.remove();
      getOverlays()[0].resolve(undefined);
      vi.useRealTimers();
      return promise;
    });

    it('should dismiss overlays when focus moves to another tab/webView outside any overlay', async () => {
      vi.useFakeTimers();
      resetDebounceState();
      const onFocusChange = await captureFocusChangeCallback();

      const promise = overlayService.showCommandPalette(
        { items: [{ id: 'ft', label: 'Footnote' }] },
        'focus-dismiss-webview',
      );
      expect(getOverlays()).toHaveLength(1);

      vi.advanceTimersByTime(350);

      // document.activeElement is the body here — outside the overlay host and any Radix portal —
      // so a focus change to a different WebView means the user really left the overlay
      onFocusChange?.({ focusType: 'webView', id: 'unrelated-webview' });

      expect(getOverlays()).toHaveLength(0);
      await expect(promise).resolves.toBeUndefined();

      vi.useRealTimers();
    });
  });

  describe('app-window input dismissal', () => {
    const paletteRequest: CommandPaletteRequest = { items: [{ id: 'ft', label: 'Footnote' }] };
    const popoverRequest: PopoverRequest = {
      anchor: { x: 5, y: 5 },
      content: { type: 'text', body: 'Popover body' },
    };

    /** Time to advance past OVERLAY_CREATION_GRACE_MS (300ms) so overlays become dismissable */
    const PAST_GRACE_MS = 400;

    /** Time to advance past the deferred mouseDown decision (APP_WINDOW_INPUT_DEFER_MS is 30ms) */
    const PAST_INPUT_DEFER_MS = 50;

    beforeEach(async () => {
      vi.mocked(menuDataService.getWebViewMenu).mockResolvedValue(DEFAULT_WEB_VIEW_MENU);
      // Only track the subscription this test's startOverlayService call registers
      appWindowInputSubscribers.length = 0;
      // Drop any pointerdown an earlier test recorded so it cannot correlate with this test's signal
      resetAppWindowInputState();
      await startOverlayService();
    });

    /** Deliver an app-window input signal the way the main process's network event would */
    function emitAppWindowInput(kind: AppWindowInputEvent['kind']): void {
      expect(appWindowInputSubscribers.length).toBeGreaterThan(0);
      appWindowInputSubscribers.forEach((subscriber) => subscriber({ kind }));
    }

    /**
     * Dispatch a pointerdown in the PARENT document (what a click outside every WebView iframe
     * produces), either on overlay content or on an unrelated element.
     */
    function dispatchParentDocumentPointerDown(location: 'insideOverlay' | 'outsideOverlay'): void {
      const target = document.createElement('div');
      if (location === 'insideOverlay') target.setAttribute('data-overlay-command-palette', '');
      document.body.appendChild(target);
      target.dispatchEvent(new Event('pointerdown', { bubbles: true }));
      target.remove();
    }

    it('should dismiss overlays on a mouseDown with no parent-document pointerdown (click inside a WebView iframe)', async () => {
      vi.useFakeTimers();

      const contextMenuPromise = overlayService.showContextMenu('ext.testWebView', 'iframe-click');
      await Promise.resolve();
      const palettePromise = overlayService.showCommandPalette(paletteRequest, 'iframe-click');
      const popoverId = await overlayService.showPopover(popoverRequest, 'iframe-click');
      expectPopoverId(popoverId);
      const popoverDismissed = overlayService.onPopoverDismissed(popoverId);
      expect(getOverlays()).toHaveLength(3);

      vi.advanceTimersByTime(PAST_GRACE_MS);
      emitAppWindowInput('mouseDown');
      vi.advanceTimersByTime(PAST_INPUT_DEFER_MS);

      await expect(contextMenuPromise).resolves.toBeUndefined();
      await expect(palettePromise).resolves.toBeUndefined();
      await expect(popoverDismissed).resolves.toBeUndefined();
      expect(getOverlays()).toHaveLength(0);
    });

    it('should not dismiss overlays when the mouseDown correlates with a parent-document pointerdown on overlay content', async () => {
      vi.useFakeTimers();

      const palettePromise = overlayService.showCommandPalette(paletteRequest, 'palette-click');

      vi.advanceTimersByTime(PAST_GRACE_MS);
      dispatchParentDocumentPointerDown('insideOverlay');
      emitAppWindowInput('mouseDown');
      vi.advanceTimersByTime(PAST_INPUT_DEFER_MS);

      expect(getOverlays().filter((o) => o.type === 'commandPalette')).toHaveLength(1);

      // Clean up
      getOverlays().forEach((overlay) => overlay.resolve(undefined));
      await expect(palettePromise).resolves.toBeUndefined();
    });

    it('should dismiss overlays when the mouseDown correlates with a parent-document pointerdown outside overlay content', async () => {
      vi.useFakeTimers();

      const palettePromise = overlayService.showCommandPalette(paletteRequest, 'outside-click');

      vi.advanceTimersByTime(PAST_GRACE_MS);
      dispatchParentDocumentPointerDown('outsideOverlay');
      emitAppWindowInput('mouseDown');
      vi.advanceTimersByTime(PAST_INPUT_DEFER_MS);

      await expect(palettePromise).resolves.toBeUndefined();
      expect(getOverlays()).toHaveLength(0);
    });

    it('should dismiss only the topmost overlay on an escape signal, unwinding one press at a time', async () => {
      vi.useFakeTimers();

      const contextMenuPromise = overlayService.showContextMenu('ext.testWebView', 'escape-signal');
      await Promise.resolve();
      const palettePromise = overlayService.showCommandPalette(paletteRequest, 'escape-signal');
      const popoverId = await overlayService.showPopover(popoverRequest, 'escape-signal');
      expectPopoverId(popoverId);
      const popoverDismissed = overlayService.onPopoverDismissed(popoverId);
      expect(getOverlays()).toHaveLength(3);

      vi.advanceTimersByTime(PAST_GRACE_MS);

      // The popover was created last, so it is the surface Escape closes
      emitAppWindowInput('escape');
      await expect(popoverDismissed).resolves.toBeUndefined();
      expect(getOverlays().map((overlay) => overlay.type)).toEqual([
        'contextMenu',
        'commandPalette',
      ]);

      emitAppWindowInput('escape');
      await expect(palettePromise).resolves.toBeUndefined();
      expect(getOverlays().map((overlay) => overlay.type)).toEqual(['contextMenu']);

      emitAppWindowInput('escape');
      await expect(contextMenuPromise).resolves.toBeUndefined();
      expect(getOverlays()).toHaveLength(0);
    });

    it('should close the newer of two command palettes on escape, and the older on the next escape', async () => {
      vi.useFakeTimers();

      const olderPalettePromise = overlayService.showCommandPalette(
        paletteRequest,
        'older-webview',
      );
      const newerPalettePromise = overlayService.showCommandPalette(
        paletteRequest,
        'newer-webview',
      );
      expect(getOverlays()).toHaveLength(2);

      vi.advanceTimersByTime(PAST_GRACE_MS);

      emitAppWindowInput('escape');
      await expect(newerPalettePromise).resolves.toBeUndefined();
      expect(getOverlays()).toHaveLength(1);

      emitAppWindowInput('escape');
      await expect(olderPalettePromise).resolves.toBeUndefined();
      expect(getOverlays()).toHaveLength(0);
    });

    it('should leave a popover under a modal alone on escape — the topmost surface owns the key', async () => {
      vi.useFakeTimers();

      const popoverId = await overlayService.showPopover(popoverRequest, 'modal-over-popover');
      expectPopoverId(popoverId);
      const popoverDismissed = overlayService.onPopoverDismissed(popoverId);
      const MockDialogComponent = vi.fn(
        // vi.fn mock must satisfy React component return type; `any` cast is the standard pattern
        // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
        () => undefined as any,
      );
      // The modal is created after the popover, so it is the topmost overlay
      const modalPromise = showModalDialogOverlay(
        MockDialogComponent,
        { prompt: 'Confirm something', isDialog: true },
        undefined,
        'modal-over-popover',
      );
      vi.advanceTimersByTime(PAST_GRACE_MS);

      emitAppWindowInput('escape');

      // Escape unwinds ONE surface per press, and that surface is the modal — whose own shell
      // answers the key. Nothing may be dismissed through this path, least of all the popover
      // underneath — an escape that skipped modals would close it alongside the modal.
      expect(getOverlays().map((overlay) => overlay.type)).toEqual(['popover', 'modalDialog']);

      // Clean up
      getOverlays().forEach((overlay) => overlay.resolve(undefined));
      await expect(popoverDismissed).resolves.toBeUndefined();
      await modalPromise;
    });

    it('should keep a dismissOnClickOutside: false popover open on mouseDown but close it on escape', async () => {
      vi.useFakeTimers();

      const stickyRequest: PopoverRequest = { ...popoverRequest, dismissOnClickOutside: false };
      const popoverId = await overlayService.showPopover(stickyRequest, 'sticky-popover');
      expectPopoverId(popoverId);
      const popoverDismissed = overlayService.onPopoverDismissed(popoverId);
      const palettePromise = overlayService.showCommandPalette(paletteRequest, 'sticky-popover');

      vi.advanceTimersByTime(PAST_GRACE_MS);
      emitAppWindowInput('mouseDown');
      vi.advanceTimersByTime(PAST_INPUT_DEFER_MS);

      // The palette goes; the popover that opted out of click-outside dismissal stays
      await expect(palettePromise).resolves.toBeUndefined();
      expect(getOverlays().filter((o) => o.type === 'popover')).toHaveLength(1);

      // Escape closes it, matching the popover component's own Escape handler, which dismisses
      // regardless of dismissOnClickOutside
      emitAppWindowInput('escape');

      await expect(popoverDismissed).resolves.toBeUndefined();
      expect(getOverlays()).toHaveLength(0);
    });

    it('should not dismiss an overlay created within the creation grace period', async () => {
      vi.useFakeTimers();

      const palettePromise = overlayService.showCommandPalette(paletteRequest, 'grace-webview');

      // Still inside OVERLAY_CREATION_GRACE_MS (300ms) — the click that opened the overlay must
      // not close it again
      vi.advanceTimersByTime(100);
      emitAppWindowInput('mouseDown');
      vi.advanceTimersByTime(PAST_INPUT_DEFER_MS);
      emitAppWindowInput('escape');

      expect(getOverlays().filter((o) => o.type === 'commandPalette')).toHaveLength(1);

      // Clean up
      getOverlays().forEach((overlay) => overlay.resolve(undefined));
      await expect(palettePromise).resolves.toBeUndefined();
    });

    it('should do no work on an input signal while no overlays are open', () => {
      vi.useFakeTimers();

      expect(getOverlays()).toHaveLength(0);
      emitAppWindowInput('mouseDown');
      emitAppWindowInput('escape');

      // The deferred mouseDown decision is never scheduled
      expect(vi.getTimerCount()).toBe(0);
    });

    it('should wait for the parent document to report its pointerdown when the signal arrives first', async () => {
      vi.useFakeTimers();

      const palettePromise = overlayService.showCommandPalette(paletteRequest, 'defer-webview');
      vi.advanceTimersByTime(PAST_GRACE_MS);

      // The main process's hook runs before any frame processes the click, so the signal can beat
      // the parent document's own pointerdown — the decision has to wait for it
      emitAppWindowInput('mouseDown');
      vi.advanceTimersByTime(10);
      dispatchParentDocumentPointerDown('insideOverlay');
      vi.advanceTimersByTime(PAST_INPUT_DEFER_MS);

      expect(getOverlays().filter((o) => o.type === 'commandPalette')).toHaveLength(1);

      // Clean up
      getOverlays().forEach((overlay) => overlay.resolve(undefined));
      await expect(palettePromise).resolves.toBeUndefined();
    });

    it('should dismiss the overlay open at signal time while sparing one the same click opens', async () => {
      vi.useFakeTimers();

      const palettePromise = overlayService.showCommandPalette(paletteRequest, 'snapshot-webview');
      vi.advanceTimersByTime(PAST_GRACE_MS);

      // Click inside a WebView whose handler opens a popover before the deferred decision runs
      emitAppWindowInput('mouseDown');
      vi.advanceTimersByTime(10);
      const popoverId = await overlayService.showPopover(popoverRequest, 'snapshot-webview');
      expectPopoverId(popoverId);
      const popoverDismissed = overlayService.onPopoverDismissed(popoverId);

      vi.advanceTimersByTime(PAST_INPUT_DEFER_MS);

      // The palette that was open when the click happened goes; the popover the click created stays
      await expect(palettePromise).resolves.toBeUndefined();
      expect(getOverlays().filter((o) => o.type === 'popover')).toHaveLength(1);

      // Clean up
      getOverlays().forEach((overlay) => overlay.resolve(undefined));
      await expect(popoverDismissed).resolves.toBeUndefined();
    });
  });

  describe('focus save/restore', () => {
    it('should save and restore focus when showing and resolving a modal dialog', async () => {
      // windowService.getFocus and setFocus are mocked at the top
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
