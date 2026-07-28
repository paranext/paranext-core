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

/** Remove a window from the tracked list */
export function removeWindow(window: BrowserWindow): void {
  const idx = windows.indexOf(window);
  if (idx >= 0) windows.splice(idx, 1);
}

const onDidChangeFocusedWindowIdEmitter = new PlatformEventEmitter<number | undefined>();

/**
 * Event that fires when focus moves from one window to another.
 *
 * Routing proxies that forward to "the focused window" need this: it is the moment their answer
 * changes without any window's own state having changed. Fires only on an actual change, so a
 * repeated `setFocusedWindowId` with the same ID is quiet.
 */
export const onDidChangeFocusedWindowId = onDidChangeFocusedWindowIdEmitter.event;

/** Set the focused window ID (called from BrowserWindow focus events) */
export function setFocusedWindowId(windowId: number | undefined): void {
  if (focusedWindowId === windowId) return;
  focusedWindowId = windowId;
  onDidChangeFocusedWindowIdEmitter.emit(windowId);
}

/**
 * Get the window ID to target for command/service routing. Returns the focused window ID if
 * available, otherwise falls back to the first window's ID.
 */
export function getTargetWindowId(): number | undefined {
  return focusedWindowId ?? windows[0]?.id;
}
