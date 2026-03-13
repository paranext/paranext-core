/**
 * Overlay service host - renderer-only service that manages overlay lifecycle. Handles context
 * menus, modal dialogs, and popovers rendered outside iframe boundaries.
 *
 * Includes:
 *
 * - Leading-edge debounce with 50ms trailing cooldown per overlay type
 * - WebView visibility checks (context menus/popovers only; modals exempt)
 * - Focus save/restore via postMessage to requesting iframe
 * - Aria-live announcements for cross-iframe screen reader accessibility
 * - Auto-dismiss on scroll, tab change, and window blur (context menus/popovers)
 */

import {
  translateCoordinates,
  clampToViewport,
  isWebViewVisible,
  isPositionInViewport,
  getWebViewIframe,
} from '@renderer/services/overlay-coordinates';
import { convertContributionToContextMenuItems } from '@renderer/services/overlay-menu-converter';
import {
  addOverlay,
  removeOverlay,
  getOverlaysByWebView,
  getOverlayById,
  getOverlays,
  updateOverlayContent,
} from '@renderer/services/overlay-store';
import {
  validateContextMenuRequest,
  validateModalDialogOptions,
  validatePopoverRequest,
} from '@renderer/services/overlay-validation';
import {
  ContextMenuRequest,
  ContextMenuResult,
  IOverlayService,
  ModalDialogOptions,
  ModalDialogResponse,
  ModalDialogType,
  OverlayNotVisibleError,
  OverlayReplacedError,
  PopoverContent,
  PopoverRequest,
} from '@shared/models/overlay.service-model';
import { menuDataService } from '@shared/services/menu-data.service';
import { logger } from '@shared/services/logger.service';
import { newGuid, ReferencedItem } from 'platform-bible-utils';

/** Default webViewId used when no specific webView context is provided */
const DEFAULT_WEB_VIEW_ID = 'renderer';

// ── Debounce ──

/**
 * Debounce cooldown in ms. First request goes through immediately; subsequent within window are
 * dropped.
 */
const DEBOUNCE_COOLDOWN_MS = 50;

/**
 * Grace period after creating an overlay during which auto-dismiss listeners (MutationObserver,
 * window blur) will not dismiss it. This prevents the race condition where right-clicking a webview
 * that doesn't have focus causes rc-dock class changes that immediately dismiss the just-created
 * context menu.
 */
const OVERLAY_CREATION_GRACE_MS = 300;

/** Timestamp of the most recent overlay creation */
let lastOverlayCreatedAt = 0;

/** Tracks the last invocation time per overlay type per webViewId */
const lastInvocationTime = new Map<string, number>();

/**
 * Returns true if the request should proceed (leading-edge). Returns false if still within the
 * cooldown window from the last request of the same type from the same webView.
 */
function debounceCheck(overlayType: string, webViewId: string): boolean {
  const key = `${webViewId}:${overlayType}`;
  const now = Date.now();
  const lastTime = lastInvocationTime.get(key);

  if (lastTime !== undefined && now - lastTime < DEBOUNCE_COOLDOWN_MS) {
    return false;
  }

  lastInvocationTime.set(key, now);
  return true;
}

/** Resets debounce tracking state. Exported for use in tests only. */
export function resetDebounceState(): void {
  lastInvocationTime.clear();
}

// ── Focus Save/Restore ──

/** Saved focus state per overlay ID, received from iframe postMessage response */
const savedFocusState = new Map<string, { webViewId: string }>();

/**
 * Sends an overlay:focusSave message to the requesting iframe. The iframe's PAPI runtime captures
 * the active element and selection state. This is fire-and-forget — the overlay renders
 * immediately.
 */
function requestFocusSave(overlayId: string, webViewId: string): void {
  if (webViewId === DEFAULT_WEB_VIEW_ID) return;

  const iframe = getWebViewIframe(webViewId);
  if (!iframe?.contentWindow) return;

  // Store tracking info so we know which iframe to restore focus to
  savedFocusState.set(overlayId, { webViewId });

  try {
    iframe.contentWindow.postMessage({ type: 'overlay:focusSave', overlayId }, '*');
  } catch {
    // Cross-origin or detached iframe — focus save best-effort
  }
}

/**
 * Sends an overlay:focusRestore message to the iframe that originally had focus. Falls back to
 * focusing the iframe directly if no saved state is available.
 */
function restoreFocus(overlayId: string): void {
  const state = savedFocusState.get(overlayId);
  savedFocusState.delete(overlayId);

  if (!state) return;

  const iframe = getWebViewIframe(state.webViewId);
  if (!iframe) return;

  try {
    if (iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'overlay:focusRestore', overlayId }, '*');
    } else {
      iframe.focus();
    }
  } catch {
    // Best-effort focus restore
    iframe.focus();
  }
}

// ── Aria-Live Announcements ──

let ariaLiveRegion: HTMLDivElement | undefined;

/** Gets or creates the aria-live region element in the parent document */
function getAriaLiveRegion(): HTMLDivElement {
  if (ariaLiveRegion && document.body.contains(ariaLiveRegion)) return ariaLiveRegion;

  ariaLiveRegion = document.createElement('div');
  ariaLiveRegion.setAttribute('aria-live', 'assertive');
  ariaLiveRegion.setAttribute('aria-atomic', 'true');
  ariaLiveRegion.setAttribute('role', 'status');
  ariaLiveRegion.style.position = 'absolute';
  ariaLiveRegion.style.width = '1px';
  ariaLiveRegion.style.height = '1px';
  ariaLiveRegion.style.overflow = 'hidden';
  ariaLiveRegion.style.clip = 'rect(0, 0, 0, 0)';
  ariaLiveRegion.style.whiteSpace = 'nowrap';
  document.body.appendChild(ariaLiveRegion);
  return ariaLiveRegion;
}

/** Announces a message to screen readers via the aria-live region */
function announceToScreenReader(message: string): void {
  const region = getAriaLiveRegion();
  // Clear then set to trigger announcement
  region.textContent = '';
  // Use a microtask to ensure the clear is processed before the new content
  setTimeout(() => {
    region.textContent = message;
  }, 50);
}

// ── Auto-Dismiss Helpers ──

/** Map of overlay ID to its pending promise resolve/reject, used by onPopoverDismissed */
const popoverPromises = new Map<
  string,
  {
    promise: Promise<string | undefined>;
    resolve: (value: string | undefined) => void;
    reject: (error: Error) => void;
  }
>();

/** Dismiss all context menus (called on scroll, tab change, blur) */
function dismissAllContextMenus(): void {
  const allOverlays = getOverlays();
  allOverlays.forEach((overlay) => {
    if (overlay.type === 'contextMenu') {
      overlay.resolve(undefined);
      removeOverlay(overlay.id);
      restoreFocus(overlay.id);
    }
  });
}

/** Dismiss all popovers (called on tab change) */
function dismissAllPopovers(): void {
  const allOverlays = getOverlays();
  allOverlays.forEach((overlay) => {
    if (overlay.type === 'popover') {
      overlay.resolve(undefined);
      removeOverlay(overlay.id);
      restoreFocus(overlay.id);
      // Clean up onPopoverDismissed promises
      const pending = popoverPromises.get(overlay.id);
      if (pending) {
        pending.resolve(undefined);
        popoverPromises.delete(overlay.id);
      }
    }
  });
}

/** Check popovers whose anchors may have scrolled out of view */
function checkPopoverAnchorsInView(): void {
  const allOverlays = getOverlays();
  allOverlays.forEach((overlay) => {
    if (overlay.type === 'popover' && !isPositionInViewport(overlay.position)) {
      overlay.resolve(undefined);
      removeOverlay(overlay.id);
      restoreFocus(overlay.id);
      const pending = popoverPromises.get(overlay.id);
      if (pending) {
        pending.resolve(undefined);
        popoverPromises.delete(overlay.id);
      }
    }
  });
}

// ── Core Service Methods ──

/**
 * Shows a context menu overlay. Validates the request, checks visibility, translates coordinates,
 * and returns the user's selection or undefined if dismissed.
 *
 * @param request The context menu request with items and optional position
 * @param webViewId The webViewId that originated the request
 * @returns The selected menu item result, or undefined if dismissed
 */
async function showContextMenu(
  request: ContextMenuRequest,
  webViewId: string,
): Promise<ContextMenuResult | undefined> {
  validateContextMenuRequest(request);

  // Visibility check (context menus require visible WebView)
  if (!isWebViewVisible(webViewId)) {
    throw new OverlayNotVisibleError();
  }

  // Leading-edge debounce: drop rapid re-triggers within 50ms
  if (!debounceCheck('contextMenu', webViewId)) {
    return undefined;
  }

  // Replace any existing context menu from this webView (only context menus, not other overlay types)
  const existingOverlays = getOverlaysByWebView(webViewId).filter((o) => o.type === 'contextMenu');
  existingOverlays.forEach((existing) => {
    existing.reject(new OverlayReplacedError());
    removeOverlay(existing.id);
    restoreFocus(existing.id);
  });

  const overlayId = newGuid();

  // Save focus state from the requesting iframe (fire-and-forget)
  requestFocusSave(overlayId, webViewId);

  // Translate coordinates from iframe-relative to document-relative
  const rawPosition = request.position ?? { x: 0, y: 0 };
  const translatedPosition = translateCoordinates(webViewId, rawPosition);
  const clampedPosition = clampToViewport(translatedPosition, 4);

  announceToScreenReader('Context menu opened');

  lastOverlayCreatedAt = Date.now();

  return new Promise<ContextMenuResult | undefined>((resolve, reject) => {
    addOverlay({
      type: 'contextMenu',
      id: overlayId,
      webViewId,
      items: request.items,
      position: clampedPosition,
      resolve: (result) => {
        restoreFocus(overlayId);
        resolve(result);
      },
      reject,
    });
  });
}

/**
 * Shows a modal dialog overlay. Validates the options, replaces any existing modal from the same
 * webView, and returns a promise that resolves with the user's response.
 *
 * Modal dialogs are exempt from the visibility check — they dim the entire app.
 *
 * @param dialogType The type of dialog (alert, confirm)
 * @param options The dialog options
 * @param webViewId The webViewId that originated the request
 * @returns The dialog result, or undefined if dismissed
 */
async function showModalDialog<T extends ModalDialogType>(
  dialogType: T,
  options: ModalDialogOptions[T],
  webViewId: string = DEFAULT_WEB_VIEW_ID,
): Promise<ModalDialogResponse[T] | undefined> {
  validateModalDialogOptions(dialogType, options);

  // Leading-edge debounce
  if (!debounceCheck('modalDialog', webViewId)) {
    return undefined;
  }

  // Replace any existing modal dialog from this webView (only modals, not other overlay types)
  const existingOverlays = getOverlaysByWebView(webViewId).filter((o) => o.type === 'modalDialog');
  existingOverlays.forEach((existing) => {
    existing.reject(new OverlayReplacedError());
    removeOverlay(existing.id);
    restoreFocus(existing.id);
  });

  const overlayId = newGuid();

  // Save focus state from the requesting iframe
  requestFocusSave(overlayId, webViewId);

  const title =
    'title' in options && typeof options.title === 'string' ? options.title : dialogType;
  announceToScreenReader(`${title} dialog opened`);

  return new Promise<ModalDialogResponse[T] | undefined>((resolve, reject) => {
    addOverlay({
      type: 'modalDialog',
      id: overlayId,
      webViewId,
      dialogType,
      options,
      // Generic T resolve can't be assigned to unknown resolve without widening
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      resolve: ((result: unknown) => {
        restoreFocus(overlayId);
        // Cast unknown result back to the generic dialog response type
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        resolve(result as ModalDialogResponse[T] | undefined);
      }) as (result: unknown) => void,
      reject,
    });
  });
}

/**
 * Shows a context menu from a menu contribution registered by an extension. Fetches menu data from
 * the menu data service, converts it to ContextMenuItems, and delegates to showContextMenu.
 *
 * @param menuId The webViewType to look up in the menu data service
 * @param context Optional context with position for the menu
 * @returns The selected menu item result, or undefined if dismissed or no context menu defined
 */
async function showContextMenuFromContribution(
  menuId: string,
  webViewId: string,
  context?: { position?: { x: number; y: number } },
): Promise<ContextMenuResult | undefined> {
  // menuId is a plain string from the caller; ReferencedItem is a branded `${string}.${string}` type
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const webViewMenu = await menuDataService.getWebViewMenu(menuId as ReferencedItem);

  if (!webViewMenu.contextMenu) {
    return undefined;
  }

  const items = convertContributionToContextMenuItems(webViewMenu.contextMenu);

  if (items.length === 0) {
    return undefined;
  }

  return showContextMenu(
    {
      items,
      position: context?.position,
    },
    webViewId,
  );
}

/**
 * Shows a popover overlay. Validates the request, checks visibility, translates coordinates, and
 * returns the overlay ID. Use onPopoverDismissed to wait for dismissal.
 *
 * @param request The popover request with anchor, content, and options
 * @param webViewId The webViewId that originated the request
 * @returns The overlay ID string
 */
async function showPopover(request: PopoverRequest, webViewId: string): Promise<string> {
  validatePopoverRequest(request);

  // Visibility check (popovers require visible WebView)
  if (!isWebViewVisible(webViewId)) {
    throw new OverlayNotVisibleError();
  }

  // Leading-edge debounce
  if (!debounceCheck('popover', webViewId)) {
    return '';
  }

  // Replace any existing popover from this webView
  const existingOverlays = getOverlaysByWebView(webViewId).filter((o) => o.type === 'popover');
  existingOverlays.forEach((existing) => {
    existing.reject(new OverlayReplacedError());
    removeOverlay(existing.id);
    restoreFocus(existing.id);
    // Also reject the onPopoverDismissed promise
    const pending = popoverPromises.get(existing.id);
    if (pending) {
      pending.reject(new OverlayReplacedError());
      popoverPromises.delete(existing.id);
    }
  });

  const overlayId = newGuid();

  // Save focus state from the requesting iframe
  requestFocusSave(overlayId, webViewId);

  // Translate coordinates from iframe-relative to document-relative
  const translatedPosition = translateCoordinates(webViewId, request.anchor);
  const clampedPosition = clampToViewport(translatedPosition, 4);

  // Create a deferred promise for onPopoverDismissed
  let resolveDismissed!: (value: string | undefined) => void;
  let rejectDismissed!: (error: Error) => void;
  const dismissedPromise = new Promise<string | undefined>((resolve, reject) => {
    resolveDismissed = resolve;
    rejectDismissed = reject;
  });
  popoverPromises.set(overlayId, {
    promise: dismissedPromise,
    resolve: resolveDismissed,
    reject: rejectDismissed,
  });

  addOverlay({
    type: 'popover',
    id: overlayId,
    webViewId,
    request,
    content: request.content,
    position: clampedPosition,
    resolve: (actionId: string | undefined) => {
      restoreFocus(overlayId);
      const pending = popoverPromises.get(overlayId);
      if (pending) {
        pending.resolve(actionId);
        popoverPromises.delete(overlayId);
      }
    },
    reject: (error: Error) => {
      const pending = popoverPromises.get(overlayId);
      if (pending) {
        pending.reject(error);
        popoverPromises.delete(overlayId);
      }
    },
  });

  announceToScreenReader('Popover opened');

  // Set up auto-dismiss timer if requested
  if (request.dismissAfterMs && request.dismissAfterMs > 0) {
    setTimeout(() => {
      const overlay = getOverlayById(overlayId);
      if (overlay && overlay.type === 'popover') {
        overlay.resolve(undefined);
        removeOverlay(overlayId);
      }
    }, request.dismissAfterMs);
  }

  return overlayId;
}

/**
 * Updates the content of an existing popover.
 *
 * @param overlayId The overlay ID returned by showPopover
 * @param content The new content to display
 * @throws Error if the overlay is not found
 */
async function updatePopover(overlayId: string, content: PopoverContent): Promise<void> {
  const updated = updateOverlayContent(overlayId, content);
  if (!updated) {
    throw new Error(`Popover overlay not found: ${overlayId}`);
  }
}

/**
 * Dismisses a popover overlay, resolving its promise with undefined.
 *
 * @param overlayId The overlay ID to dismiss
 */
async function dismissPopover(overlayId: string): Promise<void> {
  const overlay = getOverlayById(overlayId);
  if (overlay && overlay.type === 'popover') {
    overlay.resolve(undefined);
    removeOverlay(overlayId);
  }
}

/**
 * Returns a promise that resolves when the popover is dismissed. Resolves with the action button ID
 * if an action was clicked, or undefined if dismissed. Resolves immediately with undefined if the
 * overlay is not found.
 *
 * @param overlayId The overlay ID to watch
 * @returns The action ID or undefined
 */
async function onPopoverDismissed(overlayId: string): Promise<string | undefined> {
  const pending = popoverPromises.get(overlayId);
  if (pending) {
    return pending.promise;
  }
  // Already dismissed or not found
  return undefined;
}

/** The overlay service instance exposed on papi */
export const overlayService: IOverlayService = {
  showContextMenu,
  showContextMenuFromContribution,
  showModalDialog,
  showPopover,
  updatePopover,
  dismissPopover,
  onPopoverDismissed,
};

// ── Event Listeners for Auto-Dismiss ──

/** Set up scroll, tab change, and blur listeners */
function registerAutoDismissListeners(): void {
  // Dismiss context menus on scroll (capturing phase to catch iframe scrolls too)
  window.addEventListener(
    'scroll',
    () => {
      dismissAllContextMenus();
      checkPopoverAnchorsInView();
    },
    { capture: true },
  );

  // Dismiss context menus and popovers on window blur
  window.addEventListener('blur', () => {
    // Skip if an overlay was just created — focus shifts from panel activation can trigger blur
    if (Date.now() - lastOverlayCreatedAt < OVERLAY_CREATION_GRACE_MS) return;

    dismissAllContextMenus();
    // Popovers with dismissOnClickOutside: false may persist across blur
    const allOverlays = getOverlays();
    allOverlays.forEach((overlay) => {
      if (overlay.type === 'popover' && overlay.request.dismissOnClickOutside !== false) {
        overlay.resolve(undefined);
        removeOverlay(overlay.id);
        restoreFocus(overlay.id);
        const pending = popoverPromises.get(overlay.id);
        if (pending) {
          pending.resolve(undefined);
          popoverPromises.delete(overlay.id);
        }
      }
    });
  });

  // Listen for tab changes via rc-dock's custom events or MutationObserver on active tab
  // rc-dock doesn't fire a standard event, so observe visibility changes on tab panels
  const observer = new MutationObserver(() => {
    // Skip if an overlay was just created — right-clicking a different panel causes rc-dock
    // class changes that would otherwise immediately dismiss the just-created context menu
    if (Date.now() - lastOverlayCreatedAt < OVERLAY_CREATION_GRACE_MS) return;

    dismissAllContextMenus();
    dismissAllPopovers();
  });

  // Observe the dock layout container for class/attribute changes indicating tab switches
  const dockLayout = document.querySelector('.dock-layout');
  if (dockLayout) {
    observer.observe(dockLayout, {
      attributes: true,
      subtree: true,
      attributeFilter: ['class'],
    });
  }
}

/** Initialize the overlay service. Called during renderer startup. */
export async function startOverlayService(): Promise<void> {
  registerAutoDismissListeners();
  logger.info('Overlay service started');
}
