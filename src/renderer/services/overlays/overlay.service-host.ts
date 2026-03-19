/**
 * Overlay service host - renderer-only service that manages overlay lifecycle. Handles context
 * menus, modal dialogs, and popovers rendered outside iframe boundaries.
 *
 * Includes:
 *
 * - Leading-edge debounce with 50ms trailing cooldown per overlay type
 * - WebView visibility checks (context menus/popovers only; modals exempt)
 * - Focus save/restore via window service getFocus/setFocus
 * - Aria-live announcements for cross-iframe screen reader accessibility
 * - Auto-dismiss on scroll, tab change, and window blur (context menus/popovers)
 */

import { FocusSubject } from '@shared/services/window.service-model';
import { menuDataService } from '@shared/services/menu-data.service';
import { windowService } from '@shared/services/window.service';
import { logger } from '@shared/services/logger.service';
import { sendCommand } from '@shared/services/command.service';
import {
  isPlatformError,
  newGuid,
  newPlatformError,
  ReferencedItem,
  ABORTED,
  FAILED_PRECONDITION,
  RESOURCE_EXHAUSTED,
} from 'platform-bible-utils';
import type { PlatformError, PlatformErrorCode } from 'platform-bible-utils';
import {
  CommandPaletteRequest,
  IOverlayService,
  ModalDialogOptions,
  ModalDialogResponse,
  ModalDialogType,
  PopoverContent,
  PopoverRequest,
} from './overlay.service-model';
import { convertContributionToContextMenuItems } from './overlay-menu-converter';
import {
  validateCommandPaletteRequest,
  validateContextMenuItems,
  validateModalDialogOptions,
  validatePopoverRequest,
} from './overlay-validation';
import {
  addOverlay,
  resolveAndRemoveOverlay,
  rejectAndRemoveOverlay,
  getOverlaysByWebView,
  getOverlays,
  getOverlayById,
  updateOverlayContent,
} from './overlay-store';
import { translateCoordinates, clampToViewport, isWebViewVisible } from './overlay-coordinates';

/** Creates a PlatformError with the given message and error code */
function newOverlayError(message: string, code: PlatformErrorCode): PlatformError {
  const error = newPlatformError(message);
  error.code = code;
  return error;
}

// ── Debounce ──

/**
 * Debounce cooldown in ms. First request goes through immediately; subsequent within window are
 * dropped.
 */
const DEBOUNCE_COOLDOWN_MS = 50;

/**
 * Grace period after creating an overlay during which auto-dismiss listeners (focus changes, window
 * blur) will not dismiss it. This prevents the race condition where right-clicking a webview that
 * doesn't have focus causes focus changes that immediately dismiss the just-created context menu.
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

/** Saved focus subject per overlay ID, captured via windowService.getFocus() */
const savedFocusState = new Map<string, FocusSubject>();

/**
 * Captures the current window focus subject and stores it for later restoration. Uses the window
 * service's getFocus API instead of postMessage to iframes.
 */
async function saveFocus(overlayId: string): Promise<void> {
  try {
    const focusSubject = await windowService.getFocus();
    // Guard against writing stale entries after the overlay has been dismissed.
    // saveFocus is called without await, so restoreFocus may delete the entry before we get here.
    if (focusSubject && getOverlayById(overlayId)) {
      savedFocusState.set(overlayId, focusSubject);
    }
  } catch {
    // Best-effort focus save
  }
}

/**
 * Restores focus to the subject that was active when the overlay was created. Uses the window
 * service's setFocus API to return focus to the original webView or tab.
 */
function restoreFocus(overlayId: string): void {
  const focusSubject = savedFocusState.get(overlayId);
  savedFocusState.delete(overlayId);

  if (!focusSubject || focusSubject.focusType === 'other') return;

  // setFocus accepts SetFocusSubject (webView or tab with id) — pass only the fields it needs
  const setFocusTarget =
    focusSubject.focusType === 'webView'
      ? focusSubject
      : { focusType: focusSubject.focusType, id: focusSubject.id };
  windowService.setFocus(setFocusTarget).catch(() => {
    // Best-effort focus restore
  });
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

/** Map of overlay ID to its auto-dismiss timer, cleared on manual dismissal */
const popoverTimers = new Map<string, ReturnType<typeof setTimeout>>();

/** Clears and removes the auto-dismiss timer for a popover if one exists */
function clearPopoverTimer(overlayId: string): void {
  const timer = popoverTimers.get(overlayId);
  if (timer) {
    clearTimeout(timer);
    popoverTimers.delete(overlayId);
  }
}

/** Map of overlay ID to its pending promise resolve/reject, used by onPopoverDismissed */
const popoverPromises = new Map<
  string,
  {
    promise: Promise<string | undefined>;
    resolve: (value: string | undefined) => void;
    reject: (error: PlatformError) => void;
  }
>();

/** Dismiss all context menus (called on scroll, tab change, blur) */
function dismissAllContextMenus(): void {
  const allOverlays = getOverlays();
  allOverlays.forEach((overlay) => {
    if (overlay.type === 'contextMenu') {
      resolveAndRemoveOverlay(overlay.id, overlay.type, undefined);
    }
  });
}

/** Dismiss all popovers (called on tab change) */
function dismissAllPopovers(): void {
  const allOverlays = getOverlays();
  allOverlays.forEach((overlay) => {
    if (overlay.type === 'popover') {
      resolveAndRemoveOverlay(overlay.id, overlay.type, undefined);
    }
  });
}

/** Dismiss all command palettes (called on scroll, tab change, blur) */
function dismissAllCommandPalettes(): void {
  const allOverlays = getOverlays();
  allOverlays.forEach((overlay) => {
    if (overlay.type === 'commandPalette') {
      resolveAndRemoveOverlay(overlay.id, overlay.type, undefined);
    }
  });
}

// ── Core Service Methods ──

/**
 * Shows a context menu from menu.json contributions registered for the given webViewType. Fetches
 * menu data, renders the menu, and auto-executes the selected command.
 *
 * @param webViewType The webViewType to look up in the menu data service
 * @param webViewId The webViewId that originated the request
 * @returns The command string that was executed, or undefined if dismissed
 * @throws PlatformError with code RESOURCE_EXHAUSTED if a duplicate request arrives within the
 *   debounce cooldown
 */
async function showContextMenu(
  webViewType: string,
  webViewId: string,
  options?: { position?: { x: number; y: number } },
): Promise<string | undefined> {
  // Fetch menu contributions for this webViewType
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const webViewMenu = await menuDataService.getWebViewMenu(webViewType as ReferencedItem);

  if (!webViewMenu.contextMenu) {
    return undefined;
  }

  const items = convertContributionToContextMenuItems(webViewMenu.contextMenu);

  if (items.length === 0) {
    return undefined;
  }

  validateContextMenuItems(items);

  if (!isWebViewVisible(webViewId)) {
    throw newOverlayError('Requesting WebView is not visible', FAILED_PRECONDITION);
  }

  if (!debounceCheck('contextMenu', webViewId)) {
    throw newOverlayError('Overlay request dropped by debounce cooldown', RESOURCE_EXHAUSTED);
  }

  const existingOverlays = getOverlaysByWebView(webViewId).filter((o) => o.type === 'contextMenu');
  existingOverlays.forEach((existing) => {
    rejectAndRemoveOverlay(
      existing.id,
      newOverlayError('Overlay was replaced by a new request', ABORTED),
    );
    restoreFocus(existing.id);
  });

  const overlayId = newGuid();
  saveFocus(overlayId);

  const rawPosition = options?.position ?? { x: 0, y: 0 };
  const translatedPosition = translateCoordinates(webViewId, rawPosition);
  const clampedPosition = clampToViewport(translatedPosition, 4);

  announceToScreenReader('Context menu opened');
  lastOverlayCreatedAt = Date.now();

  const selectedCommand = await new Promise<string | undefined>((resolve, reject) => {
    addOverlay({
      type: 'contextMenu',
      id: overlayId,
      webViewId,
      items,
      position: clampedPosition,
      resolve: (result) => {
        restoreFocus(overlayId);
        resolve(result);
      },
      reject,
    });
  });

  if (selectedCommand) {
    try {
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      await (sendCommand as (cmd: string) => Promise<unknown>)(selectedCommand);
    } catch (error) {
      logger.warn(`Failed to execute context menu command "${selectedCommand}": ${error}`);
    }
  }

  return selectedCommand;
}

/**
 * Shows a modal dialog overlay. Called internally by the dialog service host. Not exposed on PAPI.
 *
 * @throws PlatformError with code RESOURCE_EXHAUSTED if a duplicate request arrives within the
 *   debounce cooldown
 * @internal
 */
export async function showModalDialogOverlay<T extends ModalDialogType>(
  dialogType: T,
  options: ModalDialogOptions[T],
  webViewId: string = 'dialog-service',
): Promise<ModalDialogResponse[T] | undefined> {
  validateModalDialogOptions(dialogType, options);

  // Leading-edge debounce
  if (!debounceCheck('modalDialog', webViewId)) {
    throw newOverlayError('Overlay request dropped by debounce cooldown', RESOURCE_EXHAUSTED);
  }

  // Replace any existing modal dialog from this webView (only modals, not other overlay types)
  const existingOverlays = getOverlaysByWebView(webViewId).filter((o) => o.type === 'modalDialog');
  existingOverlays.forEach((existing) => {
    rejectAndRemoveOverlay(
      existing.id,
      newOverlayError('Overlay was replaced by a new request', ABORTED),
    );
    restoreFocus(existing.id);
  });

  const overlayId = newGuid();

  // Save current focus state for later restoration
  saveFocus(overlayId);

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
 * Shows a popover overlay. Validates the request, checks visibility, translates coordinates, and
 * returns the overlay ID. Use onPopoverDismissed to wait for dismissal.
 *
 * @param request The popover request with anchor, content, and options
 * @param webViewId The webViewId that originated the request
 * @returns The overlay ID string
 * @throws PlatformError with code RESOURCE_EXHAUSTED if a duplicate request arrives within the
 *   debounce cooldown
 */
async function showPopover(request: PopoverRequest, webViewId: string): Promise<string> {
  validatePopoverRequest(request);

  // Visibility check (popovers require visible WebView)
  if (!isWebViewVisible(webViewId)) {
    throw newOverlayError('Requesting WebView is not visible', FAILED_PRECONDITION);
  }

  // Leading-edge debounce: reject rapid re-triggers within cooldown window
  if (!debounceCheck('popover', webViewId)) {
    throw newOverlayError('Overlay request dropped by debounce cooldown', RESOURCE_EXHAUSTED);
  }

  // Replace any existing popover from this webView
  const existingOverlays = getOverlaysByWebView(webViewId).filter((o) => o.type === 'popover');
  existingOverlays.forEach((existing) => {
    rejectAndRemoveOverlay(
      existing.id,
      newOverlayError('Overlay was replaced by a new request', ABORTED),
    );
    restoreFocus(existing.id);
  });

  const overlayId = newGuid();

  // Save current focus state for later restoration
  saveFocus(overlayId);

  // Translate coordinates from iframe-relative to document-relative
  const translatedPosition = translateCoordinates(webViewId, request.anchor);
  const clampedPosition = clampToViewport(translatedPosition, 4);

  // Create a deferred promise for onPopoverDismissed
  let resolveDismissed!: (value: string | undefined) => void;
  let rejectDismissed!: (error: PlatformError) => void;
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
      clearPopoverTimer(overlayId);
      restoreFocus(overlayId);
      const pending = popoverPromises.get(overlayId);
      if (pending) {
        pending.resolve(actionId);
        popoverPromises.delete(overlayId);
      }
    },
    reject: (error: PlatformError) => {
      clearPopoverTimer(overlayId);
      restoreFocus(overlayId);
      const pending = popoverPromises.get(overlayId);
      if (pending) {
        pending.reject(error);
        popoverPromises.delete(overlayId);
      }
    },
  });

  announceToScreenReader('Popover opened');

  lastOverlayCreatedAt = Date.now();

  // Set up auto-dismiss timer if requested
  if (request.dismissAfterMs && request.dismissAfterMs > 0) {
    const timer = setTimeout(() => {
      popoverTimers.delete(overlayId);
      resolveAndRemoveOverlay(overlayId, 'popover', undefined);
    }, request.dismissAfterMs);
    popoverTimers.set(overlayId, timer);
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
  if (!overlay || overlay.type !== 'popover') return;
  resolveAndRemoveOverlay(overlayId, 'popover', undefined);
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

/**
 * Shows a command palette overlay with searchable/filterable items. Validates the request, checks
 * visibility, translates coordinates, and returns the user's selection or undefined if dismissed.
 *
 * @param request The command palette request with items and optional anchor
 * @param webViewId The webViewId that originated the request
 * @returns The selected item's ID, or undefined if dismissed
 * @throws PlatformError with code RESOURCE_EXHAUSTED if a duplicate request arrives within the
 *   debounce cooldown
 */
async function showCommandPalette(
  request: CommandPaletteRequest,
  webViewId: string,
): Promise<string | undefined> {
  validateCommandPaletteRequest(request);

  // Visibility check (command palettes require visible WebView)
  if (!isWebViewVisible(webViewId)) {
    throw newOverlayError('Requesting WebView is not visible', FAILED_PRECONDITION);
  }

  // Leading-edge debounce: drop rapid re-triggers within 50ms
  if (!debounceCheck('commandPalette', webViewId)) {
    throw newOverlayError('Overlay request dropped by debounce cooldown', RESOURCE_EXHAUSTED);
  }

  // Replace any existing command palette from this webView
  const existingOverlays = getOverlaysByWebView(webViewId).filter(
    (o) => o.type === 'commandPalette',
  );
  existingOverlays.forEach((existing) => {
    rejectAndRemoveOverlay(
      existing.id,
      newOverlayError('Overlay was replaced by a new request', ABORTED),
    );
    restoreFocus(existing.id);
  });

  const overlayId = newGuid();

  // Save current focus state for later restoration
  saveFocus(overlayId);

  // Translate coordinates from iframe-relative to document-relative (if anchored)
  let position: { x: number; y: number } | undefined;
  if (request.anchor) {
    const translatedPosition = translateCoordinates(webViewId, request.anchor);
    position = clampToViewport(translatedPosition, 4);
  }

  announceToScreenReader('Command palette opened');

  lastOverlayCreatedAt = Date.now();

  return new Promise<string | undefined>((resolve, reject) => {
    addOverlay({
      type: 'commandPalette',
      id: overlayId,
      webViewId,
      request,
      items: request.items,
      position,
      resolve: (selectedId) => {
        restoreFocus(overlayId);
        resolve(selectedId);
      },
      reject,
    });
  });
}

/** The overlay service instance exposed on papi */
export const overlayService: IOverlayService = {
  showContextMenu,
  showPopover,
  updatePopover,
  dismissPopover,
  onPopoverDismissed,
  showCommandPalette,
};

// ── Event Listeners for Auto-Dismiss ──

/** Set up scroll, tab change, and blur listeners */
function registerAutoDismissListeners(): void {
  // Dismiss context menus and popovers on scroll (capturing phase to catch scroll events from
  // any element in the parent document's DOM tree). Note: scroll events inside iframes don't
  // propagate to the parent window, so this only catches parent-document scrolls.
  // Popovers are hover-initiated and lose context when the anchor scrolls away; programmatic
  // popovers that need to survive scroll should live within the iframe boundary instead.
  // Command palettes are intentionally NOT dismissed on scroll — they contain a scrollable list.
  window.addEventListener(
    'scroll',
    (e) => {
      // Don't dismiss overlays when scrolling inside overlay content (e.g., popover with overflow)
      if (
        e.target instanceof Element &&
        e.target.closest('[data-overlay-popover], [data-overlay-command-palette]')
      )
        return;

      dismissAllContextMenus();
      dismissAllPopovers();
    },
    { capture: true },
  );

  // Dismiss context menus, command palettes, and popovers on window blur
  window.addEventListener('blur', () => {
    // Skip if an overlay was just created — focus shifts from panel activation can trigger blur
    if (Date.now() - lastOverlayCreatedAt < OVERLAY_CREATION_GRACE_MS) return;

    dismissAllContextMenus();
    dismissAllCommandPalettes();
    // Popovers with dismissOnClickOutside: false may persist across blur
    const allOverlays = getOverlays();
    allOverlays.forEach((overlay) => {
      if (overlay.type === 'popover' && overlay.request.dismissOnClickOutside !== false) {
        resolveAndRemoveOverlay(overlay.id, overlay.type, undefined);
      }
    });
  });

  // Dismiss overlays when the focused tab changes
  let lastFocusId: string | undefined;
  windowService
    .subscribeFocus(undefined, (focusSubject) => {
      if (isPlatformError(focusSubject)) return;

      // Determine the id of the newly focused subject (undefined for 'other')
      const newFocusId = focusSubject.focusType === 'other' ? undefined : focusSubject.id;

      // Only dismiss if focus actually moved to a different tab/webView
      if (newFocusId === lastFocusId) return;
      lastFocusId = newFocusId;

      // Skip if an overlay was just created — right-clicking a different panel causes focus
      // changes that would otherwise immediately dismiss the just-created context menu
      if (Date.now() - lastOverlayCreatedAt < OVERLAY_CREATION_GRACE_MS) return;

      dismissAllContextMenus();
      dismissAllCommandPalettes();
      dismissAllPopovers();
    })
    .catch((err) => logger.warn(`Failed to subscribe to window focus changes: ${err}`));
}

/** Initialize the overlay service. Called during renderer startup. */
export async function startOverlayService(): Promise<void> {
  registerAutoDismissListeners();
  logger.info('Overlay service started');
}
