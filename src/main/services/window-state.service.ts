/**
 * Tracks the state of open BrowserWindows and which one is currently focused. Other services in the
 * main process use this to route commands and network object calls to the correct renderer window.
 */

import { BrowserWindow } from 'electron';
import { PlatformEventEmitter } from 'platform-bible-utils';

// Keep a global reference of the window objects. If you don't, the windows will
// be closed automatically when the JavaScript objects are garbage collected.
const windows: BrowserWindow[] = [];

/**
 * ID of the Electron BrowserWindow that most recently received focus. Used to route commands and
 * network object calls to the correct renderer window in a multi-window setup.
 */
let focusedWindowId: number | undefined;

/** Get the tracked windows array (read-only view) */
export function getWindows(): readonly BrowserWindow[] {
  return windows;
}

/** Add a window to the tracked list */
export function addWindow(window: BrowserWindow): void {
  windows.push(window);
}

/**
 * Windows whose renderer has registered its scoped services, so routing to them can succeed.
 *
 * A window is tracked and can take OS focus long before its renderer finishes starting, and routing
 * to it in that gap fails every call.
 */
const readyWindowIds = new Set<number>();

/** Remove a window from the tracked list */
export function removeWindow(window: BrowserWindow): void {
  const idx = windows.indexOf(window);
  if (idx >= 0) windows.splice(idx, 1);
  readyWindowIds.delete(window.id);
}

const onDidChangeFocusedWindowIdEmitter = new PlatformEventEmitter<number | undefined>();

/**
 * Event that fires when focus moves from one window to another.
 *
 * Routing proxies that forward to "the focused window" need this: it is the moment their answer
 * changes without any window's own state having changed. Fires only on an actual change, so a
 * repeated `setFocusedWindowId` with the same ID is quiet.
 *
 * Tracks `focusedWindowId` specifically, NOT the routing target. `getTargetWindowId()` is the
 * authority on where calls go, and it falls back to the first tracked window when nothing is
 * focused — so while that fallback is in play, adding or removing a window changes the routing
 * target without firing this event. Consumers should treat the payload as informational and read
 * `getTargetWindowId()` for the value they actually route on.
 */
export const onDidChangeFocusedWindowId = onDidChangeFocusedWindowIdEmitter.event;

/** Set the focused window ID (called from BrowserWindow focus events) */
export function setFocusedWindowId(windowId: number | undefined): void {
  if (focusedWindowId === windowId) return;
  focusedWindowId = windowId;
  onDidChangeFocusedWindowIdEmitter.emit(windowId);
}

/**
 * Record that a window's renderer has registered its scoped services, so it can be routed to.
 *
 * Announces a target change when this is the focused window, because until now routing was
 * deliberately answering with a different window and every consumer holding that answer needs to
 * re-resolve.
 *
 * @param windowId Window whose renderer is now serving requests
 */
export function markWindowReady(windowId: number): void {
  if (readyWindowIds.has(windowId)) return;
  readyWindowIds.add(windowId);
  if (focusedWindowId === windowId) onDidChangeFocusedWindowIdEmitter.emit(windowId);
}

/**
 * Get the window ID to target for command/service routing.
 *
 * Prefers the focused window, but only once its renderer is actually serving requests. A window is
 * tracked and takes OS focus as soon as it is shown, well before it has registered anything — so
 * handing it the routing target on focus alone would make every routed call in the app fail for as
 * long as the new window takes to start. While that is true, routing stays with a window that can
 * answer.
 *
 * Before any window is ready — ordinary startup — this falls back to the focused or first tracked
 * window, so callers get the honest "the renderer has not started yet" error rather than silence.
 */
export function getTargetWindowId(): number | undefined {
  if (focusedWindowId !== undefined && readyWindowIds.has(focusedWindowId)) return focusedWindowId;
  const readyWindow = windows.find((window) => readyWindowIds.has(window.id));
  return readyWindow?.id ?? focusedWindowId ?? windows[0]?.id;
}
