/**
 * Tracks the state of open BrowserWindows and which one is currently focused. Other services in the
 * main process use this to route commands and network object calls to the correct renderer window.
 */

import { BrowserWindow } from 'electron';

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

/** Set the focused window ID (called from BrowserWindow focus events) */
export function setFocusedWindowId(windowId: number | undefined): void {
  focusedWindowId = windowId;
}

/**
 * Get the window ID to target for command/service routing. Returns the focused window ID if
 * available, otherwise falls back to the first window's ID.
 */
export function getTargetWindowId(): number | undefined {
  return focusedWindowId ?? windows[0]?.id;
}
