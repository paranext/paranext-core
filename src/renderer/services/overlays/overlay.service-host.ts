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
 * - Auto-dismiss on any mouse-down or Escape anywhere in the app window, including inside WebView
 *   iframes, via the main process's app-window input event
 */

import {
  AppWindowInputEvent,
  EVENT_NAME_ON_DID_APP_WINDOW_INPUT,
  FocusSubject,
} from '@shared/services/window.service-model';
import { getNetworkEvent } from '@shared/services/network.service';
import { menuDataService } from '@shared/services/menu-data.service';
import { windowService } from '@shared/services/window.service';
import { localizationService } from '@shared/services/localization.service';
import { logger } from '@shared/services/logger.service';
import { sendCommand } from '@shared/services/command.service';
import {
  formatReplacementString,
  isLocalizeKey,
  isPlatformError,
  LocalizeKey,
  newGuid,
  newPlatformError,
  ReferencedItem,
  ABORTED,
  FAILED_PRECONDITION,
  RESOURCE_EXHAUSTED,
} from 'platform-bible-utils';
import type { LanguageStrings, PlatformError } from 'platform-bible-utils';
import type { ReactElement } from 'react';
import {
  CommandPaletteItem,
  CommandPaletteRequest,
  IOverlayService,
  OverlayEntry,
  PopoverContent,
  PopoverRequest,
} from './overlay.service-model';
import { filterPaletteItems } from './overlay-palette-filter.util';
import { convertContributionToContextMenuItems } from './overlay-menu-converter';
import {
  validateCommandPaletteRequest,
  validateContextMenuItems,
  validatePopoverRequest,
} from './overlay-validation';
import {
  addOverlay,
  resolveAndRemoveOverlay,
  rejectAndRemoveOverlay,
  getOverlaysByWebView,
  getOverlays,
  getOverlayById,
  getTopmostOverlay,
  updateOverlayContent,
  updateCommandPaletteState,
} from './overlay-store';
import { translateCoordinates, clampToViewport, isWebViewVisible } from './overlay-coordinates';

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

/** ID of the most recently created overlay, paired with {@link lastOverlayCreatedAt} */
let lastOverlayCreatedId: string | undefined;

/** Records an overlay creation for the auto-dismiss listeners' grace period */
function noteOverlayCreated(overlayId: string): void {
  lastOverlayCreatedAt = Date.now();
  lastOverlayCreatedId = overlayId;
}

/** Whether an overlay was created too recently for an auto-dismiss listener to act on it */
function isWithinOverlayCreationGrace(): boolean {
  return Date.now() - lastOverlayCreatedAt < OVERLAY_CREATION_GRACE_MS;
}

/**
 * Selector matching every parent-document element that is overlay CONTENT: the overlay host's
 * portal container plus popovers and command palettes, which render through Radix portals directly
 * under `document.body` when they are anchored, outside the host div. Kept in one constant so the
 * focus-change and app-window-input listeners cannot drift apart on what counts as interacting with
 * an overlay rather than clicking away from it.
 *
 * The scroll listener deliberately keeps its own, narrower selector: it asks whether the scroll
 * happened inside content that is itself scrollable (a popover or a command palette list), not
 * whether the event touched an overlay, and widening it to the host container would change which
 * scrolls dismiss a context menu.
 */
const OVERLAY_CONTENT_SELECTOR =
  '[data-overlay-host], [data-overlay-popover], [data-overlay-command-palette], [data-radix-popper-content-wrapper]';

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

/** Resets debounce tracking state. Exported for use in tests only. @internal */
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

/** Resolves a localization key and announces the result to screen readers */
async function announceLocalizedToScreenReader(
  key: LocalizeKey,
  replacers?: Record<string, string>,
): Promise<void> {
  try {
    const strings = await localizationService.getLocalizedStrings({ localizeKeys: [key] });
    const localized = strings[key];
    announceToScreenReader(replacers ? formatReplacementString(localized, replacers) : localized);
  } catch {
    announceToScreenReader(key);
  }
}

/**
 * The two static palette-announcement templates, resolved ONCE per palette open instead of per
 * announcement: `announceCommandPaletteState` runs on nearly every filtering keystroke (its de-dupe
 * guard keys on the highlighted item and the match count, and typing changes the count), and
 * resolving through `localizationService` is a JSON-RPC round trip to the extension host — so
 * without this cache the palette pays one IPC round trip per keystroke, independent of item count.
 * Refreshed at open so a language change is picked up by the next palette; until the resolve lands
 * (or if it yields nothing), announcements fall back to the per-call path.
 */
let paletteAnnounceStrings: { noResults: string; highlightedItem: string } | undefined;

/** Kicks off (fire-and-forget) the per-open resolution backing {@link paletteAnnounceStrings}. */
function refreshPaletteAnnounceStrings(): void {
  paletteAnnounceStrings = undefined;
  localizationService
    .getLocalizedStrings({
      localizeKeys: [
        '%overlay_aria_commandPaletteNoResults%',
        '%overlay_aria_commandPaletteHighlightedItem%',
      ],
    })
    .then((strings) => {
      const noResults = strings['%overlay_aria_commandPaletteNoResults%'];
      const highlightedItem = strings['%overlay_aria_commandPaletteHighlightedItem%'];
      if (noResults !== undefined && highlightedItem !== undefined)
        paletteAnnounceStrings = { noResults, highlightedItem };
      return undefined;
    })
    .catch(() => undefined); // the per-call fallback keeps announcing (raw keys at worst)
}

/**
 * The command palette state most recently announced to screen readers. Compared against on every
 * update so an update that changes neither the highlighted item nor the match count announces
 * nothing — a live region that repeats itself talks over the user's next keystroke.
 *
 * One record covers every palette: only one is open per WebView, and a different palette replaces
 * the record rather than adding to it, so a closed palette leaves nothing behind.
 */
let lastAnnouncedPaletteState:
  | { overlayId: string; highlightedItemId: string | undefined; itemCount: number }
  | undefined;

/**
 * Announces a command palette's highlighted item and match count to screen readers, unless neither
 * changed since the last announcement.
 *
 * This live region is the palette's only accessible channel while it is driven from elsewhere: a
 * passive palette never takes focus (the driving WebView keeps it, which is what lets that
 * WebView's own keydown semantics run), and `aria-activedescendant` speaks only from a focused
 * element — so without this, a screen reader user hears the palette open and then nothing about
 * what it went on to show.
 *
 * @param overlayId The command palette overlay the state belongs to
 * @param filteredItems The items currently matching the palette's filter text
 * @param selectedIndex The highlighted item's index within `filteredItems`
 */
function announceCommandPaletteState(
  overlayId: string,
  filteredItems: CommandPaletteItem[],
  selectedIndex: number,
): void {
  const highlightedItem = filteredItems[selectedIndex];
  const previous = lastAnnouncedPaletteState;
  if (
    previous &&
    previous.overlayId === overlayId &&
    previous.highlightedItemId === highlightedItem?.id &&
    previous.itemCount === filteredItems.length
  )
    return;

  lastAnnouncedPaletteState = {
    overlayId,
    highlightedItemId: highlightedItem?.id,
    itemCount: filteredItems.length,
  };

  if (filteredItems.length === 0) {
    if (paletteAnnounceStrings) announceToScreenReader(paletteAnnounceStrings.noResults);
    else announceLocalizedToScreenReader('%overlay_aria_commandPaletteNoResults%');
    return;
  }
  if (!highlightedItem) return;
  const replacers = {
    label: highlightedItem.label,
    index: `${selectedIndex + 1}`,
    count: `${filteredItems.length}`,
  };
  if (paletteAnnounceStrings)
    announceToScreenReader(
      formatReplacementString(paletteAnnounceStrings.highlightedItem, replacers),
    );
  else announceLocalizedToScreenReader('%overlay_aria_commandPaletteHighlightedItem%', replacers);
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

/** Dismiss all overlays matching any of the given types */
function dismissAll(...types: OverlayEntry['type'][]): void {
  const typeSet = new Set(types);
  getOverlays().forEach((overlay) => {
    if (typeSet.has(overlay.type)) {
      resolveAndRemoveOverlay(overlay.id, overlay.type, undefined);
    }
  });
}

/**
 * Dismiss the overlays that clicking away or pressing Escape closes: context menus, command
 * palettes, and popovers. Modal dialogs are exempt — they are dismissed by their own shell.
 *
 * A popover that opted out with `dismissOnClickOutside: false` survives a click away but not
 * Escape, matching the popover component's own Escape handler, which dismisses regardless of that
 * option (the option governs click-outside, not the key).
 *
 * @param trigger What is dismissing the overlays
 * @param onlyIds When provided, only overlays with these IDs are dismissed. The app-window input
 *   listener uses it to act on exactly the overlays that were open when the input happened — every
 *   one of them for a click away, only the topmost for Escape.
 */
function dismissTransientOverlays(
  trigger: 'clickAway' | 'escape',
  onlyIds?: ReadonlySet<string>,
): void {
  getOverlays().forEach((overlay) => {
    if (onlyIds && !onlyIds.has(overlay.id)) return;
    if (overlay.type === 'contextMenu' || overlay.type === 'commandPalette') {
      resolveAndRemoveOverlay(overlay.id, overlay.type, undefined);
      return;
    }
    if (
      overlay.type === 'popover' &&
      (trigger === 'escape' || overlay.request.dismissOnClickOutside !== false)
    ) {
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
  if (!isWebViewVisible(webViewId)) {
    throw newPlatformError('Requesting WebView is not visible', FAILED_PRECONDITION);
  }

  if (!debounceCheck('contextMenu', webViewId)) {
    throw newPlatformError('Overlay request dropped by debounce cooldown', RESOURCE_EXHAUSTED);
  }

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

  const existingOverlays = getOverlaysByWebView(webViewId).filter((o) => o.type === 'contextMenu');
  existingOverlays.forEach((existing) => {
    rejectAndRemoveOverlay(
      existing.id,
      newPlatformError('Overlay was replaced by a new request', ABORTED),
    );
    restoreFocus(existing.id);
  });

  const overlayId = newGuid();
  saveFocus(overlayId);

  const rawPosition = options?.position ?? { x: 0, y: 0 };
  const translatedPosition = translateCoordinates(webViewId, rawPosition);
  const clampedPosition = clampToViewport(translatedPosition, 4);

  announceLocalizedToScreenReader('%overlay_aria_contextMenuOpened%');
  noteOverlayCreated(overlayId);

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
      reject: (reason?: unknown) => {
        restoreFocus(overlayId);
        reject(reason);
      },
    });
  });

  if (selectedCommand) {
    try {
      // The command string comes from menu contributions at runtime so it can't be statically typed
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      await (sendCommand as (cmd: string) => Promise<unknown>)(selectedCommand);
    } catch (error) {
      logger.warn(`Failed to execute context menu command "${selectedCommand}": ${error}`);
    }
  }

  return selectedCommand;
}

/**
 * Shows a modal dialog overlay with any dialog component. Called internally by the dialog service
 * host. Not exposed on PAPI.
 *
 * @param Component The dialog React component to render inside the modal shell
 * @param props Pre-built props for the component (DialogProps + options, already localized)
 * @param webViewId The WebView that initiated the request. Defaults to 'dialog-service'.
 * @returns The dialog result, or undefined if dismissed
 * @throws PlatformError with code RESOURCE_EXHAUSTED if a duplicate request arrives within the
 *   debounce cooldown
 * @internal
 */
export async function showModalDialogOverlay<TReturn>(
  Component: (props: Record<string, unknown>) => ReactElement,
  props: Record<string, unknown>,
  onOverlayCreated?: (overlayId: string) => void,
  webViewId: string = 'dialog-service',
): Promise<TReturn | undefined> {
  // Leading-edge debounce
  if (!debounceCheck('modalDialog', webViewId)) {
    throw newPlatformError('Overlay request dropped by debounce cooldown', RESOURCE_EXHAUSTED);
  }

  // Replace any existing modal dialog from this webView (only modals, not other overlay types)
  const existingOverlays = getOverlaysByWebView(webViewId).filter((o) => o.type === 'modalDialog');
  existingOverlays.forEach((existing) => {
    rejectAndRemoveOverlay(
      existing.id,
      newPlatformError('Overlay was replaced by a new request', ABORTED),
    );
    restoreFocus(existing.id);
  });

  const overlayId = newGuid();

  // Save current focus state for later restoration
  saveFocus(overlayId);

  const title = typeof props.title === 'string' ? props.title : 'Dialog';
  announceLocalizedToScreenReader('%overlay_aria_dialogOpened%', { title });

  // Notify the caller of the overlay ID so they can wire up dismiss callbacks
  onOverlayCreated?.(overlayId);

  return new Promise<TReturn | undefined>((resolve, reject) => {
    addOverlay({
      type: 'modalDialog',
      id: overlayId,
      webViewId,
      Component,
      props,
      // Generic T resolve can't be assigned to unknown resolve without widening
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      resolve: ((result: unknown) => {
        restoreFocus(overlayId);
        // Cast unknown result back to the generic dialog response type
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        resolve(result as TReturn | undefined);
      }) as (result: unknown) => void,
      reject: (reason?: unknown) => {
        restoreFocus(overlayId);
        reject(reason);
      },
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
    throw newPlatformError('Requesting WebView is not visible', FAILED_PRECONDITION);
  }

  // Leading-edge debounce: reject rapid re-triggers within cooldown window
  if (!debounceCheck('popover', webViewId)) {
    throw newPlatformError('Overlay request dropped by debounce cooldown', RESOURCE_EXHAUSTED);
  }

  // Replace any existing popover from this webView
  const existingOverlays = getOverlaysByWebView(webViewId).filter((o) => o.type === 'popover');
  existingOverlays.forEach((existing) => {
    rejectAndRemoveOverlay(
      existing.id,
      newPlatformError('Overlay was replaced by a new request', ABORTED),
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
  // Suppress unhandled rejection if onPopoverDismissed is never called or the popover is
  // replaced before the consumer attaches handlers. Callers that care about the rejection
  // will observe it via onPopoverDismissed().
  dismissedPromise.catch(() => {});
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

  announceLocalizedToScreenReader('%overlay_aria_popoverOpened%');

  noteOverlayCreated(overlayId);

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
 * Collects the `LocalizeKey` values found in command palette items' `label`, `description`, and
 * `badge` fields. Empty when every field is a plain string.
 */
function collectPaletteItemLocalizeKeys(items: CommandPaletteItem[]): LocalizeKey[] {
  const keys: LocalizeKey[] = [];
  items.forEach((item) => {
    [item.label, item.description, item.badge].forEach((value) => {
      if (value !== undefined && isLocalizeKey(value)) keys.push(value);
    });
  });
  return keys;
}

/**
 * Resolves `LocalizeKey` values in command palette items' `label`/`description`/`badge` fields to
 * localized strings via the localization service; plain-string fields pass through unchanged. A key
 * the service does not know (or a failed lookup) keeps its raw key text — the same fallback the
 * command palette component applies when rendering — so the resolved items are exactly what the
 * palette displays.
 */
async function localizePaletteItems(
  items: CommandPaletteItem[],
  localizeKeys: LocalizeKey[],
): Promise<CommandPaletteItem[]> {
  let localizedStrings: LanguageStrings = {};
  try {
    localizedStrings = await localizationService.getLocalizedStrings({ localizeKeys });
  } catch {
    // Leave the map empty — every key falls back to its raw text below
  }
  const resolve = (value: string | LocalizeKey): string =>
    isLocalizeKey(value) ? (localizedStrings[value] ?? value) : value;
  return items.map((item) => ({
    ...item,
    label: resolve(item.label),
    description: item.description ? resolve(item.description) : undefined,
    badge: item.badge ? resolve(item.badge) : undefined,
  }));
}

/**
 * Rejects (ABORTED) and removes every command palette this WebView already has open, restoring the
 * focus each saved — a new request replaces its predecessors rather than stacking on them, which is
 * what keeps the one-palette-per-WebView invariant true in the store.
 */
function replaceExistingCommandPalettes(webViewId: string): void {
  getOverlaysByWebView(webViewId)
    .filter((o) => o.type === 'commandPalette')
    .forEach((existing) => {
      rejectAndRemoveOverlay(
        existing.id,
        newPlatformError('Overlay was replaced by a new request', ABORTED),
      );
      restoreFocus(existing.id);
    });
}

/**
 * Shows a command palette overlay with searchable/filterable items. Validates the request, checks
 * visibility, translates coordinates, and returns the user's selection or undefined if dismissed.
 *
 * `LocalizeKey` item text (`label`/`description`/`badge`) is resolved to localized strings here,
 * before the overlay entry is stored, so host-side filtering and commit resolution operate on the
 * same strings the palette renders.
 *
 * @param request The command palette request with items and optional anchor
 * @param webViewId The webViewId that originated the request
 * @returns The selected item's ID, or undefined if dismissed
 * @throws PlatformError with code RESOURCE_EXHAUSTED if a duplicate request arrives within the
 *   debounce cooldown while this WebView has no palette open
 */
async function showCommandPalette(
  request: CommandPaletteRequest,
  webViewId: string,
): Promise<string | undefined> {
  validateCommandPaletteRequest(request);

  // Visibility check (command palettes require visible WebView)
  if (!isWebViewVisible(webViewId)) {
    throw newPlatformError('Requesting WebView is not visible', FAILED_PRECONDITION);
  }

  // Leading-edge debounce: drop rapid re-triggers within 50ms — but only when this WebView has NO
  // palette open. A show that REPLACES an open palette is a legitimate rapid second request (the
  // `\` commit key reopens the palette back-to-back), and rejecting it here left the OLD palette
  // mounted while the owner's rejection cleanup cleared its session — keystrokes then fell through
  // to the document under a visible palette. The debounce exists to absorb accidental
  // double-opens, not replaces.
  const hasExistingPalette = getOverlaysByWebView(webViewId).some(
    (o) => o.type === 'commandPalette',
  );
  if (!hasExistingPalette && !debounceCheck('commandPalette', webViewId)) {
    throw newPlatformError('Overlay request dropped by debounce cooldown', RESOURCE_EXHAUSTED);
  }

  // Replace any existing command palette from this webView BEFORE the localization await below —
  // with the replace only on the far side of the await, a second request could start while the
  // first was still resolving localization and BOTH ended up added.
  replaceExistingCommandPalettes(webViewId);

  // Resolve LocalizeKey item text ONCE, up front, so the stored entry only ever holds the same
  // resolved strings the palette renders — host-side filtering and commit can then never disagree
  // with the on-screen list. Skipped entirely (no await) when every item field is a plain string,
  // preserving synchronous overlay creation for those callers.
  const itemLocalizeKeys = collectPaletteItemLocalizeKeys(request.items);
  let { items } = request;
  if (itemLocalizeKeys.length > 0) {
    items = await localizePaletteItems(request.items, itemLocalizeKeys);
    // The await reopened the window the pre-await sweep closed: another request could have added a
    // palette while localization resolved. Sweep again so anything that landed during the await is
    // replaced exactly like a pre-existing palette, keeping the one-palette-per-WebView invariant
    // true in the store before this one is added.
    replaceExistingCommandPalettes(webViewId);
  }

  const overlayId = newGuid();

  // Save current focus state for later restoration
  saveFocus(overlayId);

  // Translate coordinates from iframe-relative to document-relative (if anchored)
  let position: { x: number; y: number } | undefined;
  if (request.anchor) {
    const translatedPosition = translateCoordinates(webViewId, request.anchor);
    position = clampToViewport(translatedPosition, 4);
  }

  announceLocalizedToScreenReader('%overlay_aria_commandPaletteOpened%');
  // Pre-resolve the per-update announcement templates so the filtering keystrokes that follow
  // format locally instead of paying a localization round trip each (see the cache's doc).
  refreshPaletteAnnounceStrings();
  // Baseline for the highlight/match-count announcements: what the palette shows the moment it
  // opens, unfiltered and highlighting its first item. The first update then announces only if it
  // actually changes one of them.
  lastAnnouncedPaletteState = {
    overlayId,
    highlightedItemId: items[0]?.id,
    itemCount: items.length,
  };

  noteOverlayCreated(overlayId);

  return new Promise<string | undefined>((resolve, reject) => {
    addOverlay({
      type: 'commandPalette',
      id: overlayId,
      webViewId,
      request,
      items,
      selectedIndex: 0,
      position,
      resolve: (selectedId) => {
        restoreFocus(overlayId);
        resolve(selectedId);
      },
      reject: (reason?: unknown) => {
        restoreFocus(overlayId);
        reject(reason);
      },
    });
  });
}

/**
 * A command palette overlay entry, narrowed from the {@link OverlayEntry} union. Alias for the
 * command palette drivers below, which all operate on this variant.
 */
type CommandPaletteEntry = Extract<OverlayEntry, { type: 'commandPalette' }>;

/**
 * Finds the active command palette overlay for the given WebView, if any. The service enforces one
 * command palette per WebView at a time, so a WebView ID alone is a sufficient handle for the
 * `updateCommandPalette`/`commitCommandPaletteSelection`/`dismissCommandPalette` drivers below —
 * unlike the popover family, which is keyed by the overlay ID returned from `showPopover`.
 *
 * @param webViewId The WebView to look up
 * @returns The active command palette overlay entry, or undefined if none is active
 */
function getActiveCommandPalette(webViewId: string): CommandPaletteEntry | undefined {
  // Topmost rather than first-created: the show path keeps one palette per WebView (sweeping both
  // before and after its localization await), but if two ever momentarily coexist, the newest is
  // the one on screen — so it is the one the drivers must drive.
  const entry = getTopmostOverlay((o) => o.type === 'commandPalette' && o.webViewId === webViewId);
  return entry?.type === 'commandPalette' ? entry : undefined;
}

/**
 * Updates the filter text and/or moves the highlighted selection of the active command palette for
 * the given WebView. No-op if no command palette is active for that WebView.
 *
 * @param webViewId The WebView whose command palette should be updated
 * @param update `filterText` and/or `moveSelection` (clamped to the filtered list's bounds).
 *   `filterText` drives passive palettes' list directly and, for ACTIVE palettes, the (controlled)
 *   search input — the extension forwards keystrokes this way when the cross-frame focus handoff
 *   loses and the user's typing lands in the editor instead of the palette.
 */
async function updateCommandPalette(
  webViewId: string,
  update: { filterText?: string; moveSelection?: number },
): Promise<void> {
  const entry = getActiveCommandPalette(webViewId);
  if (!entry) {
    // LOUD: a dropped update means the palette's filter/selection silently diverges from what the
    // user typed (observed live as `\f` + Space committing nothing and stranding the literal).
    logger.warn(
      `updateCommandPalette: no active command palette for WebView ${webViewId} — update dropped ` +
        `(filterText=${JSON.stringify(update.filterText)}, moveSelection=${update.moveSelection})`,
    );
    return;
  }

  let nextFilterText = entry.filterText;
  if (update.filterText !== undefined) {
    // Match the store's own normalization ('' is never stored) so an empty string arriving over a
    // stored `undefined` does not read as a change.
    nextFilterText = update.filterText || undefined;
  } else if (update.moveSelection === undefined) {
    // Nothing to update
    return;
  }

  // A new filter produces a NEWLY RANKED list, so the old highlight index means nothing in it —
  // carrying it forward (the store only clamps) would leave the highlight on whatever now happens
  // to sit at that position and commit that item on Enter, rather than the best match the
  // re-ranked list puts first. Only when the filter actually changed, and never on an arrow-key
  // move, which is the one case that legitimately carries the index.
  const didFilterTextChange = nextFilterText !== entry.filterText;
  const resetSelection = didFilterTextChange && update.moveSelection === undefined;

  const filteredItems = filterPaletteItems(
    entry.items,
    nextFilterText,
    entry.request.passive ? 'passive' : 'active',
    entry.request.searchFields,
  );
  updateCommandPaletteState(entry.id, {
    // The RAW value, not the normalized one: the store reads `undefined` as "leave unchanged" and
    // does its own '' normalization, so passing the normalized form would drop a filter CLEAR.
    filterText: update.filterText,
    selectedIndex: resetSelection ? 0 : undefined,
    selectedIndexDelta: update.moveSelection,
    itemCount: filteredItems.length,
  });

  // Re-read the entry for the index the store clamped, rather than clamping a second time here.
  const updatedEntry = getActiveCommandPalette(webViewId);
  if (updatedEntry)
    announceCommandPaletteState(updatedEntry.id, filteredItems, updatedEntry.selectedIndex);
}

/**
 * Commits the currently highlighted item of the active command palette for the given WebView,
 * resolving its promise with that item's `id`. Skips `disabled` items, moving forward to the next
 * enabled item in the filtered list; no-ops if none are enabled. No-op if no command palette is
 * active for that WebView.
 *
 * @param webViewId The WebView whose command palette selection should be committed
 */
async function commitCommandPaletteSelection(webViewId: string): Promise<void> {
  const entry = getActiveCommandPalette(webViewId);
  if (!entry) {
    // LOUD: a silent commit no-op strands the requesting flow — the palette promise never
    // resolves, so e.g. the standard-view `\f` + Space/Enter apply never runs and the typed
    // literal stays in the document looking like the commit "did nothing".
    logger.warn(
      `commitCommandPaletteSelection: no active command palette for WebView ${webViewId} — ` +
        `commit dropped`,
    );
    return;
  }

  const filtered = filterPaletteItems(
    entry.items,
    entry.filterText,
    entry.request.passive ? 'passive' : 'active',
    entry.request.searchFields,
  );
  if (filtered.length === 0) {
    logger.warn(
      `commitCommandPaletteSelection: filter ${JSON.stringify(entry.filterText)} matches 0 of ` +
        `${entry.items.length} items — commit dropped, palette left open`,
    );
    return;
  }

  const startIndex = Math.min(Math.max(entry.selectedIndex, 0), filtered.length - 1);
  let item = filtered[startIndex];
  for (let step = 1; item?.disabled && step < filtered.length; step += 1) {
    item = filtered[(startIndex + step) % filtered.length];
  }
  if (!item || item.disabled) {
    logger.warn(
      `commitCommandPaletteSelection: every filtered item is disabled — commit dropped, ` +
        `palette left open`,
    );
    return;
  }

  resolveAndRemoveOverlay(entry.id, 'commandPalette', item.id);
}

/**
 * Dismisses the active command palette for the given WebView, resolving its promise with
 * `undefined`. Works for both active and passive palettes. No-op if no command palette is active
 * for that WebView.
 *
 * @param webViewId The WebView whose command palette should be dismissed
 */
async function dismissCommandPalette(webViewId: string): Promise<void> {
  const entry = getActiveCommandPalette(webViewId);
  if (!entry) return;
  resolveAndRemoveOverlay(entry.id, 'commandPalette', undefined);
}

/** The overlay service instance exposed on papi */
export const overlayService: IOverlayService = {
  showContextMenu,
  showPopover,
  updatePopover,
  dismissPopover,
  onPopoverDismissed,
  showCommandPalette,
  updateCommandPalette,
  commitCommandPaletteSelection,
  dismissCommandPalette,
};

// ── Event Listeners for Auto-Dismiss ──

/**
 * How long the dismissal decision for an app-window mouse-down signal waits before it is made. The
 * main process's `before-mouse-event` hook fires BEFORE any frame processes the click, so its
 * network event can arrive ahead of the parent document's own pointerdown listener. The wait lets
 * that pointerdown be recorded first, so a click on overlay content is recognized as one, and is
 * short enough to stay imperceptible.
 */
const APP_WINDOW_INPUT_DEFER_MS = 30;

/**
 * How recent a parent-document pointerdown must be to count as the same gesture as an app-window
 * mouse-down signal. Wide enough to absorb network-event delivery jitter and a busy renderer; short
 * enough that the PREVIOUS click's record is not mistaken for this one when the user clicks the
 * parent document and then a WebView iframe in quick succession.
 */
const PARENT_POINTER_DOWN_CORRELATION_MS = 150;

/**
 * The most recent pointerdown seen in the parent document, where overlays render. Clicks inside a
 * WebView iframe never reach the parent document, so their absence here is what identifies an
 * app-window mouse-down signal as having landed inside a WebView.
 */
let lastParentPointerDown: { time: number; insideOverlay: boolean } | undefined;

/**
 * Resets the parent-document pointerdown record. Exported for use in tests only, so one test's
 * recorded click cannot correlate with the next test's input signal. @internal
 */
export function resetAppWindowInputState(): void {
  lastParentPointerDown = undefined;
}

/**
 * The overlays an app-window input signal is allowed to dismiss: everything open when the signal
 * arrives, minus an overlay created inside the creation grace window.
 *
 * Capturing the IDs up front is what keeps a click from closing an overlay it opened itself: an
 * overlay created after the signal (the usual order — the main process's hook runs before any frame
 * processes the click) is simply not in the set. The grace exclusion covers the reverse race, where
 * a busy renderer processes the click and creates the overlay before the signal is delivered. Old
 * overlays stay dismissable either way, which a blanket grace check would prevent.
 */
function getDismissableOverlayIds(): Set<string> {
  const ids = new Set(getOverlays().map((overlay) => overlay.id));
  if (lastOverlayCreatedId && isWithinOverlayCreationGrace()) ids.delete(lastOverlayCreatedId);
  return ids;
}

/**
 * Dismiss transient overlays on a mouse-down or Escape anywhere in the app window, as announced by
 * the main process. Its input hooks see every frame, including WebView iframes whose events never
 * reach the parent document, so this is what closes an overlay when the user clicks or presses
 * Escape inside a WebView.
 *
 * Dismissing is idempotent (an overlay resolves once), so overlapping with the handling a frame
 * does for itself — Radix's outside-click dismissal, a WebView's own Escape handling — is safe.
 */
function handleAppWindowInput(event: AppWindowInputEvent): void {
  // Every mouse-down in the app arrives here, so nothing dismissable is the common path
  const dismissableOverlayIds = getDismissableOverlayIds();
  if (dismissableOverlayIds.size === 0) return;

  if (event.kind === 'escape') {
    // Escape closes the topmost surface only, so a stack of overlays unwinds one press at a time
    // (Dismissal Patterns → Accessibility in the platform-bible-react guidelines). The topmost
    // overlay is found WITHOUT filtering any type out: when it is a modal dialog, this press
    // belongs to the modal's own shell, and dismissing anything BENEATH it would unwind two
    // surfaces on one press (the shell answers for the modal while this branch answered for the
    // overlay under it). The same one-surface rule covers an overlay still inside its creation
    // grace: it is the topmost surface, so nothing under it is dismissed either.
    const topmost = getTopmostOverlay(() => true);
    if (!topmost || topmost.type === 'modalDialog') return;
    if (!dismissableOverlayIds.has(topmost.id)) return;
    dismissTransientOverlays('escape', new Set([topmost.id]));
    return;
  }

  setTimeout(() => {
    const recentParentPointerDown =
      lastParentPointerDown &&
      Date.now() - lastParentPointerDown.time < PARENT_POINTER_DOWN_CORRELATION_MS
        ? lastParentPointerDown
        : undefined;
    // Consume-once: this record correlates ONE app-window signal with ONE parent pointerdown.
    // Left in place, an already-consumed value could satisfy a LATER signal still inside the
    // correlation window — a follow-up click inside a WebView would inherit the previous
    // click's "inside overlay" verdict and skip a dismissal it should have performed.
    lastParentPointerDown = undefined;
    // Clicking overlay content (a palette item, a popover's body) is interacting with the overlay,
    // not clicking away from it. Everything else dismisses, including a click with no recent
    // parent-document pointerdown — that one landed inside a WebView iframe, which is always
    // outside the overlay.
    if (recentParentPointerDown?.insideOverlay) return;

    dismissTransientOverlays('clickAway', dismissableOverlayIds);
  }, APP_WINDOW_INPUT_DEFER_MS);
}

/** Set up scroll, tab change, blur, and app-window input listeners */
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

      dismissAll('contextMenu', 'popover');
    },
    { capture: true },
  );

  // Dismiss context menus, command palettes, and popovers (except those with
  // dismissOnClickOutside: false) on window blur
  window.addEventListener('blur', () => {
    // Skip if an overlay was just created — focus shifts from panel activation can trigger blur
    if (isWithinOverlayCreationGrace()) return;

    dismissTransientOverlays('clickAway');
  });

  // Record every parent-document pointerdown, and whether it landed on overlay content, so an
  // app-window mouse-down signal can tell a click in the parent document from one inside a WebView
  // iframe. Capture phase so a handler that stops propagation cannot hide the click.
  document.addEventListener(
    'pointerdown',
    (e) => {
      lastParentPointerDown = {
        time: Date.now(),
        insideOverlay: e.target instanceof Element && !!e.target.closest(OVERLAY_CONTENT_SELECTOR),
      };
    },
    { capture: true },
  );

  // Dismiss overlays on a mouse-down or Escape anywhere in the app window, including inside
  // WebView iframes
  getNetworkEvent(EVENT_NAME_ON_DID_APP_WINDOW_INPUT)(handleAppWindowInput);

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
      if (isWithinOverlayCreationGrace()) return;

      // Focus moving INTO an overlay is interacting with it, not leaving it — clicking a palette's
      // own search input must not close that palette. Overlays live in the parent document, so
      // detectFocus classifies focusing one as leaving the webview; check whether the newly active
      // element actually sits inside overlay content before dismissing. OVERLAY_CONTENT_SELECTOR is
      // shared with the app-window input listener so both spare the same content, anchored or not.
      const active = document.activeElement;
      if (active?.closest(OVERLAY_CONTENT_SELECTOR)) return;

      dismissAll('contextMenu', 'commandPalette', 'popover');
    })
    .catch((err) => logger.warn(`Failed to subscribe to window focus changes: ${err}`));
}

/** Initialize the overlay service. Called during renderer startup. */
export async function startOverlayService(): Promise<void> {
  registerAutoDismissListeners();
  logger.info('Overlay service started');
}
