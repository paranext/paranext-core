/**
 * Tracks the state of open BrowserWindows, which one is currently focused, and which ones can be
 * routed to. Other services in the main process use this to route commands and network object calls
 * to the correct renderer window.
 */

import { BrowserWindow } from 'electron';
import { PlatformEventEmitter } from 'platform-bible-utils';

// Keep a global reference of the window objects. If you don't, the windows will
// be closed automatically when the JavaScript objects are garbage collected.
const windows: BrowserWindow[] = [];

/** ID of the Electron BrowserWindow that Electron most recently reported as focused, if any */
let focusedWindowId: number | undefined;

/**
 * IDs of the windows that have held focus, most recently focused first.
 *
 * Routing needs "the window the user was last working in", which a single `focusedWindowId` scalar
 * cannot answer once that window stops being a valid target: a new window takes OS focus the moment
 * it is shown but cannot serve a call for seconds, and falling back to the tracked list would pick
 * whichever window happens to have been created first instead.
 */
const mostRecentlyFocusedWindowIds: number[] = [];

/**
 * Windows whose renderer has registered its window service, so routing to them can succeed.
 *
 * A window is tracked and can take OS focus long before its renderer finishes starting, and routing
 * to it in that gap fails every call.
 *
 * The window service registering is a PROXY for the window being able to serve a call, not proof of
 * it: a renderer starts its window, web view, notification, and dialog services concurrently (see
 * `index.tsx`), so the others may register a moment later. That narrows the unroutable gap from the
 * seconds a renderer takes to start down to the scheduling skew between concurrent registrations,
 * which is what makes it good enough to route on. Callers still have to tolerate a scoped service
 * being momentarily absent.
 */
const readyWindowIds = new Set<number>();

/**
 * Where routed calls currently go: the window ID, plus whether that window is actually serving
 * requests. Readiness is part of the target because a window that goes from unready to ready serves
 * its calls from a brand new set of scoped services — consumers holding a resolved service have to
 * re-resolve even though the window ID did not change.
 */
type RoutingTarget = { windowId: number | undefined; isReady: boolean };

/** The routing target as last announced, so an emit happens exactly when the target changes */
let announcedRoutingTarget: RoutingTarget = { windowId: undefined, isReady: false };

const onDidChangeRoutingTargetEmitter = new PlatformEventEmitter<number | undefined>();

/**
 * Event that fires when the window routed calls go to changes — a different window, or the same
 * window going from unready to serving requests (or back).
 *
 * Routing proxies that forward to "the focused window" need this: it is the moment their answer
 * changes without any window's own state having changed. Every change to the tracked windows, the
 * focused window, and window readiness runs through the same target comparison, so this is the one
 * signal to react to, and it stays quiet when a change leaves the target where it was.
 *
 * The payload is the target window ID for logging. Consumers should re-resolve rather than route on
 * it: readiness moves the target without moving the ID.
 */
export const onDidChangeRoutingTarget = onDidChangeRoutingTargetEmitter.event;

/** Get the tracked windows array (read-only view) */
export function getWindows(): readonly BrowserWindow[] {
  return windows;
}

/** Whether a window's renderer has registered its window service, so routing to it can succeed */
export function isWindowReady(windowId: number): boolean {
  return readyWindowIds.has(windowId);
}

/**
 * IDs of the windows that can currently answer a routed call, in creation order.
 *
 * Fan-outs that ask every window a question use this rather than {@link getWindows}: a window that
 * has not registered its services cannot own a web view or be showing a notification, so asking it
 * can only produce a wait on the network service's registration retry and a warning.
 */
export function getReadyWindowIds(): number[] {
  return windows.filter((window) => readyWindowIds.has(window.id)).map((window) => window.id);
}

/**
 * The window Electron reports as focused, or `undefined` when no window has focus.
 *
 * This is the honest answer about focus, which is not always where calls are routed — see
 * {@link getTargetWindowId} for that. Consumers that mean "the window the user is looking at" (such
 * as the `platform.getFocusedWindowId` command) want this one.
 */
export function getFocusedWindowId(): number | undefined {
  return focusedWindowId;
}

/**
 * Where a routed call should go, and whether that window is serving requests.
 *
 * Prefers the focused window, but only once its renderer is actually serving requests. A window is
 * tracked and takes OS focus as soon as it is shown, well before it has registered anything — so
 * handing it the routing target on focus alone would make every routed call in the app fail for as
 * long as the new window takes to start. While that is true, routing stays with the window the user
 * was most recently working in, falling back to the oldest ready window if the user has not focused
 * any ready window in this session.
 *
 * When no window is ready — ordinary startup — this falls back to the focused or first tracked
 * window, so callers get the honest "the renderer has not started yet" error rather than silence.
 */
function getRoutingTarget(): RoutingTarget {
  if (focusedWindowId !== undefined && readyWindowIds.has(focusedWindowId))
    return { windowId: focusedWindowId, isReady: true };

  const mostRecentlyFocusedReadyWindowId = mostRecentlyFocusedWindowIds.find((windowId) =>
    readyWindowIds.has(windowId),
  );
  if (mostRecentlyFocusedReadyWindowId !== undefined)
    return { windowId: mostRecentlyFocusedReadyWindowId, isReady: true };

  const firstReadyWindow = windows.find((window) => readyWindowIds.has(window.id));
  if (firstReadyWindow) return { windowId: firstReadyWindow.id, isReady: true };

  return { windowId: focusedWindowId ?? windows[0]?.id, isReady: false };
}

/** Get the window ID to target for command/service routing. See {@link getRoutingTarget}. */
export function getTargetWindowId(): number | undefined {
  return getRoutingTarget().windowId;
}

/**
 * Announce that routed calls now go somewhere else, if they do.
 *
 * Every mutation in this module ends here rather than deciding for itself whether its change is
 * worth announcing: the target is a function of all of the tracked windows, focus, and readiness
 * together, so only comparing the computed target can tell an announcement from a no-op.
 */
function announceRoutingTargetIfChanged(): void {
  const routingTarget = getRoutingTarget();
  if (
    routingTarget.windowId === announcedRoutingTarget.windowId &&
    routingTarget.isReady === announcedRoutingTarget.isReady
  )
    return;
  announcedRoutingTarget = routingTarget;
  onDidChangeRoutingTargetEmitter.emit(routingTarget.windowId);
}

/** Add a window to the tracked list */
export function addWindow(window: BrowserWindow): void {
  windows.push(window);
  announceRoutingTargetIfChanged();
}

/**
 * Remove a window from the tracked list, along with everything keyed by its ID.
 *
 * The window is gone, so it is no longer focused and no longer routable, and the routing target
 * moves to a surviving window here rather than in the close handler — a caller that had to notice
 * the target was the closing window and re-point focus itself would be one ordering mistake away
 * from leaving routing pinned to a destroyed window.
 *
 * Reads the window's ID once, at the top: this runs from the `closed` handler, where the
 * BrowserWindow is already destroyed and every property read is a chance to throw.
 */
export function removeWindow(window: BrowserWindow): void {
  const removedWindowId = window.id;
  const trackedIndex = windows.indexOf(window);
  if (trackedIndex >= 0) windows.splice(trackedIndex, 1);
  readyWindowIds.delete(removedWindowId);
  const focusOrderIndex = mostRecentlyFocusedWindowIds.indexOf(removedWindowId);
  if (focusOrderIndex >= 0) mostRecentlyFocusedWindowIds.splice(focusOrderIndex, 1);
  if (focusedWindowId === removedWindowId) focusedWindowId = undefined;
  announceRoutingTargetIfChanged();
}

/** Set the focused window ID (called from BrowserWindow focus events) */
export function setFocusedWindowId(windowId: number | undefined): void {
  focusedWindowId = windowId;
  if (windowId !== undefined) {
    const focusOrderIndex = mostRecentlyFocusedWindowIds.indexOf(windowId);
    if (focusOrderIndex >= 0) mostRecentlyFocusedWindowIds.splice(focusOrderIndex, 1);
    mostRecentlyFocusedWindowIds.unshift(windowId);
  }
  announceRoutingTargetIfChanged();
}

/**
 * Record that a window's renderer has registered its window service, so it can be routed to.
 *
 * Safe to call again for a window that is already ready; it announces only if the routing target
 * moved. A window that went through {@link markWindowNotReady} and came back does move the target,
 * even though the ID is unchanged, because its scoped services are new objects.
 *
 * @param windowId Window whose renderer is now serving requests
 */
export function markWindowReady(windowId: number): void {
  readyWindowIds.add(windowId);
  announceRoutingTargetIfChanged();
}

/**
 * Record that a window's renderer can no longer serve routed calls — it crashed, or it is reloading
 * and its registrations went away with the old page.
 *
 * Routing moves to a window that can answer instead of burning the network service's registration
 * retry against handlers that no longer exist. The window stays tracked: it is still a window, and
 * it becomes routable again through {@link markWindowReady} once its renderer registers.
 *
 * @param windowId Window whose renderer stopped serving requests
 */
export function markWindowNotReady(windowId: number): void {
  readyWindowIds.delete(windowId);
  announceRoutingTargetIfChanged();
}
