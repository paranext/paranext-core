/**
 * Tracks the state of open BrowserWindows, which one is currently focused, and which ones can be
 * routed to. Other services in the main process use this to route commands and network object calls
 * to the correct renderer window.
 */

import { BrowserWindow } from 'electron';
import { getErrorMessage, PlatformEventEmitter } from 'platform-bible-utils';
import { logger } from '@shared/services/logger.service';

/** A tracked window, paired with the id it was created with */
type TrackedWindow = {
  /**
   * The window's id, captured while the window was still alive.
   *
   * Every reader below answers from this rather than from `window.id`. Electron destroys a window
   * before the `closed` handler removes it from this list, and a property read on a destroyed
   * BrowserWindow throws — inside the routing lookup that runs on every routed call, and inside the
   * mutations a closing window's own teardown is waiting on, where a throw abandons the rest of the
   * close. See {@link removeWindow}, which has always taken the id for the same reason.
   */
  windowId: number;
  window: BrowserWindow;
};

// Keep a global reference of the window objects. If you don't, the windows will
// be closed automatically when the JavaScript objects are garbage collected.
const trackedWindows: TrackedWindow[] = [];

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
 * IDs of the windows whose renderer has registered its window service at least once since the
 * window was created. Deliberately NOT cleared when a window stops being ready — see
 * {@link markWindowNotReady}.
 *
 * "Has not started yet" and "was serving requests and stopped" are the same absence from
 * {@link readyWindowIds}, and consumers have to tell them apart: the first is the state every window
 * spends its first seconds in, where treating it as a window that could not be asked fails
 * everything the user does for the whole of a startup; the second is a window that may be holding
 * the very web view a call just named. Nothing else in this module separates them.
 */
const everReadyWindowIds = new Set<number>();

/**
 * IDs of the windows nothing will ever run in again: their renderer died and the reload path that
 * brings a crashed window back ran out of attempts, so no page will register from them for the rest
 * of the session.
 *
 * The terminal end of {@link everReadyWindowIds}'s story, and the reason that story needs an end. A
 * window that stopped serving is transient — main is holding its dock layout, the reload is
 * actively trying to bring it back, and its tabs really do return — so every fan-out refuses to
 * answer while one exists rather than reporting the window's contents as absent. Once the reloads
 * are spent none of that is true any more: nothing is coming back, and leaving the window in the
 * transient bucket makes every routed search in the app throw for the whole session over a window
 * that will never hold anything again.
 *
 * Kept apart from {@link everReadyWindowIds} rather than clearing that flag, because the two facts
 * have different consumers: the shutdown sync reports its coverage as partial precisely because a
 * given-up window's projects genuinely never synced, and a window that quietly stopped being
 * ever-ready would let the last log line of that session claim clean coverage.
 *
 * Also holds windows whose renderer died before it ever registered anything. Those were never
 * ever-ready, so they were never unreachable either — marking them changes no fan-out — but it is
 * the same fact about the same window, and one flag recorded unconditionally is what keeps the
 * give-up path from needing a second mechanism for the never-ready case.
 */
const abandonedWindowIds = new Set<number>();

/**
 * IDs of the windows whose close has begun but which are still tracked.
 *
 * A window stays tracked until Electron reports it as actually gone, which is long after every
 * window's close handler has run. Telling "the last window is closing" from "two of several windows
 * are closing at the same moment" is impossible from the tracked list alone: each of the two closes
 * sees the other window still there, decides the app is staying up, and leaves the shutdown work to
 * the other one — so neither does it.
 */
const closingWindowIds = new Set<number>();

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
 * Service routers that forward to "the focused window" need this: it is the moment their answer
 * changes without any window's own state having changed. Every change to the tracked windows, the
 * focused window, and window readiness runs through the same target comparison, so this is the one
 * signal to react to, and it stays quiet when a change leaves the target where it was.
 *
 * The payload is the target window ID for logging. Consumers should re-resolve rather than route on
 * it: readiness moves the target without moving the ID.
 */
export const onDidChangeRoutingTarget = onDidChangeRoutingTargetEmitter.event;

/**
 * The tracked windows that still exist, in creation order.
 *
 * Destroyed windows are filtered out here rather than at each call site because callers hold the
 * BrowserWindow and go on to act on it — restore it, focus it, count it as a reason not to open
 * another one — and every one of those acts throws on a window Electron has already destroyed. A
 * window stays tracked until its `closed` handler runs, so a destroyed window can be in the list.
 *
 * Answers the tracked set at the moment it is called; it is not a live array.
 */
export function getWindows(): BrowserWindow[] {
  return trackedWindows.filter(({ window }) => !window.isDestroyed()).map(({ window }) => window);
}

/** Whether a window's renderer has registered its window service, so routing to it can succeed */
export function isWindowReady(windowId: number): boolean {
  return readyWindowIds.has(windowId);
}

/**
 * Whether a navigation replaces the page a window's renderer registered its scoped services from,
 * so everything that window registered is gone until the new page registers again.
 *
 * Only a main-frame navigation to a new document does that. Every web view in the app is an in-page
 * `<iframe srcdoc>` inside the renderer's own page, so subframe navigations happen constantly for
 * as long as a window is open and touch nothing the renderer registered; treating one as the page
 * going away would take a fully working window out of the routable set with nothing to put it back.
 * Same-document navigations (fragment changes, `pushState`/`replaceState`, same-page history) keep
 * the document and every script in it alive, so they leave the registrations alone too.
 *
 * @param navigation Navigation details from Electron's `did-start-navigation`
 */
export function doesNavigationReplaceRendererRegistrations(navigation: {
  isMainFrame: boolean;
  isSameDocument: boolean;
}): boolean {
  return navigation.isMainFrame && !navigation.isSameDocument;
}

/**
 * IDs of the windows that can currently answer a routed call, in creation order.
 *
 * Fan-outs that ask every window a question use this rather than {@link getWindows}: a window that
 * has not registered its services cannot own a web view or be showing a notification, so asking it
 * can only produce a wait on the network service's registration retry and a warning.
 *
 * A window that has begun closing is still listed, unlike in {@link getRoutingTarget}. This answers
 * "who can be asked", not "where should new work go": a window is the only thing that knows what it
 * has open, and it can answer for as long as it is there. The shutdown sync of a whole quit selects
 * the projects it sends this way, and by the time it runs every window is marked closing — so
 * dropping them here would make a quit select nothing and send nothing.
 */
export function getReadyWindowIds(): number[] {
  return trackedWindows
    .map(({ windowId }) => windowId)
    .filter((windowId) => readyWindowIds.has(windowId));
}

/**
 * IDs of the windows that were answering routed calls and are not any more, in creation order.
 *
 * The half of {@link getReadyWindowIds}'s complement that a fan-out has to say something about, and
 * only that half. Skipping one of these leaves it out of the answer entirely, so a window that is
 * alive with work open in it comes back indistinguishable from a window that does not exist — a
 * fan-out reports them as windows it could not ask rather than as windows with nothing to say.
 *
 * A window whose renderer has never registered anything is NOT in here, even though it is just as
 * unaskable. It has never had a web view, a notification, or a dialog in it, so leaving it out of
 * an answer loses nothing that was ever there — and every window is in that state for the seconds
 * its renderer takes to start, so counting it would make every routed search in the app refuse to
 * answer for the whole of every window's startup.
 *
 * A window the reload path has given up on is NOT in here either, however much it was serving
 * before. This list is what makes a fan-out refuse to answer, which is only worth doing while the
 * window's contents are coming back; once nothing is coming back, that refusal is permanent, and
 * every routed search in the app fails for the rest of the session. What was lost with it is
 * reported through {@link getAbandonedWindowIds} instead, which callers weigh for themselves.
 *
 * @returns Tracked windows that are not currently ready, have been ready at some point since they
 *   were created, and have not been given up on — see {@link everReadyWindowIds},
 *   {@link markWindowNotReady} and {@link markWindowAbandoned}
 */
export function getUnreachableWindowIds(): number[] {
  return trackedWindows
    .map(({ windowId }) => windowId)
    .filter(
      (windowId) =>
        !readyWindowIds.has(windowId) &&
        everReadyWindowIds.has(windowId) &&
        !abandonedWindowIds.has(windowId),
    );
}

/**
 * IDs of the tracked windows nothing will ever run in again, in creation order.
 *
 * Separate from {@link getUnreachableWindowIds} on purpose, and neither list is a superset of the
 * other. Unreachable means "could not be asked, and its answer is still coming" — a fan-out that
 * would be wrong without it refuses to answer at all. Abandoned means "there is no answer, ever" —
 * a fan-out has to go on working, and the honest thing is to say what it could not cover rather
 * than to fail forever or to pretend the window had nothing in it.
 *
 * Callers that report coverage — the shutdown sync, which gets one shot at the app's open editors —
 * should count these alongside the unreachable ones: a given-up window's projects really did go
 * unsynced.
 *
 * @returns Tracked windows whose renderer died and will not be reloaded again — see
 *   {@link markWindowAbandoned}
 */
export function getAbandonedWindowIds(): number[] {
  return trackedWindows
    .map(({ windowId }) => windowId)
    .filter((windowId) => abandonedWindowIds.has(windowId));
}

/**
 * Whether a window has been given up on, so nothing will ever run in it again.
 *
 * @param windowId Window to ask about
 */
export function isWindowAbandoned(windowId: number): boolean {
  return abandonedWindowIds.has(windowId);
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
 * A window that has begun closing is passed over, however ready and however focused it still is. A
 * close runs that window's shutdown work first, which is bounded by the shutdown sync rather than
 * by anything quick, and the window keeps focus and keeps serving throughout — so without this,
 * every notification, dialog, and newly opened web view for the whole of that wait lands in the
 * window the user is watching disappear.
 *
 * Once every window is closing there is no window that is not closing left to prefer, so the
 * readiness preference comes back: a closing window still serves calls until its own teardown
 * finishes, and a quit reports its progress and asks its questions through this target. The one
 * that can answer beats the one that happens to hold focus — which on a quit is often a window the
 * user opened moments earlier whose renderer never finished starting.
 *
 * When no window can answer at all — ordinary startup, or the end of a quit — this falls back to
 * the focused or first tracked window, so callers get the honest "the renderer has not started yet"
 * error rather than silence.
 */
function getRoutingTarget(): RoutingTarget {
  const canTakeNewWork = (windowId: number) =>
    readyWindowIds.has(windowId) && !closingWindowIds.has(windowId);

  if (focusedWindowId !== undefined && canTakeNewWork(focusedWindowId))
    return { windowId: focusedWindowId, isReady: true };

  const mostRecentlyFocusedReadyWindowId = mostRecentlyFocusedWindowIds.find(canTakeNewWork);
  if (mostRecentlyFocusedReadyWindowId !== undefined)
    return { windowId: mostRecentlyFocusedReadyWindowId, isReady: true };

  const firstReadyWindowId = trackedWindows.find(({ windowId }) =>
    canTakeNewWork(windowId),
  )?.windowId;
  if (firstReadyWindowId !== undefined) return { windowId: firstReadyWindowId, isReady: true };

  // Gated on every window closing rather than applied whenever the rungs above miss: while any
  // window is staying, routing deliberately leaves a closing window even for one that cannot answer
  // yet, because that one is where the user's next work goes. Once nothing is staying, there is no
  // next work — only the quit's own calls, which need a window that can serve them.
  if (areAllWindowsClosing()) {
    const firstReadyClosingWindowId = trackedWindows.find(({ windowId }) =>
      readyWindowIds.has(windowId),
    )?.windowId;
    if (firstReadyClosingWindowId !== undefined)
      return { windowId: firstReadyClosingWindowId, isReady: true };
  }

  return { windowId: focusedWindowId ?? trackedWindows[0]?.windowId, isReady: false };
}

/** Get the window ID to target for command/service routing. See {@link getRoutingTarget}. */
export function getTargetWindowId(): number | undefined {
  return getRoutingTarget().windowId;
}

/**
 * Bring a window to the front of the OS window stack, restoring it first if it is minimized.
 *
 * Lives here rather than at the call sites because this module is the only thing that holds a
 * window id long enough to still have it after the window is gone: a routed call resolves its
 * target window and then does a cross-process round trip, and the window can close during it.
 * Looking the window up through the tracked list makes that a no-op instead of a throw on a
 * destroyed BrowserWindow.
 *
 * Restoring before focusing because a minimized window that is merely focused stays minimized, so
 * the raise the caller asked for would silently not happen.
 *
 * @param windowId Window to raise. Doing nothing is the right answer for a window that has closed.
 */
export function focusWindow(windowId: number): void {
  const trackedWindow = trackedWindows.find((tracked) => tracked.windowId === windowId);
  if (!trackedWindow || trackedWindow.window.isDestroyed()) return;

  try {
    if (trackedWindow.window.isMinimized()) trackedWindow.window.restore();
    // Windows can refuse a client-initiated activation. `focus()` itself says nothing about which
    // happened, but `isFocused()` read immediately after does — so the flash goes up first and comes
    // straight back down when the activation actually landed, leaving it only where it is the whole
    // signal the user gets. Hand-tested on native Windows: flashing after a successful `focus()`
    // flashes the taskbar ~5 times on the ordinary raise, and merely flashing before it does too —
    // Windows does not cancel a flash on activation — while cancelling on `isFocused()` produces no
    // flash at all. Started BEFORE focusing on purpose: a flash begun after a successful activation
    // could not then be cancelled. A false negative here only flashes on a raise that worked, which
    // is what this did on every raise before.
    trackedWindow.window.flashFrame(true);
    trackedWindow.window.focus();
    if (trackedWindow.window.isFocused()) trackedWindow.window.flashFrame(false);
  } catch (e) {
    // A window can be destroyed between the check above and any of these calls. Raising a window is
    // feedback about where something already happened, so failing to raise must not fail the
    // operation that asked for it.
    logger.warn(`Could not raise window ${windowId}: ${getErrorMessage(e)}`);
  }
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
  // Every mutation in this module runs on a path a window's own teardown is waiting on — the top of
  // a `close` handler, above where it suppresses Electron's default close, and the `closed` sweep
  // that tells the rest of the app the window is gone. A subscriber that throws must therefore not
  // escape into that caller and abandon the rest of the close with nothing reporting why. It must
  // also not cost the subscribers after it the announcement: this emit is the only time they are
  // told routing moved, and it is not repeated for that change.
  onDidChangeRoutingTargetEmitter.emitIsolated(routingTarget.windowId, (e, subscriberIndex) => {
    logger.error(
      `Subscriber ${subscriberIndex} threw while being told routed calls now go to window ${routingTarget.windowId}: ${getErrorMessage(e)}`,
    );
  });
}

/**
 * Add a window to the tracked list.
 *
 * Its id is read once, here, while the window is certain to be alive, and every reader answers from
 * that copy afterwards — see {@link TrackedWindow}.
 */
export function addWindow(window: BrowserWindow): void {
  trackedWindows.push({ windowId: window.id, window });
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
 * @param window Window to stop tracking. Matched by identity, never read from: this runs from the
 *   `closed` handler, where the BrowserWindow is already destroyed and every property read is a
 *   chance to throw — which here would abandon the rest of the closing window's teardown.
 * @param windowId The window's ID, captured while it was still alive.
 */
export function removeWindow(window: BrowserWindow, windowId: number): void {
  const trackedIndex = trackedWindows.findIndex((tracked) => tracked.window === window);
  if (trackedIndex >= 0) trackedWindows.splice(trackedIndex, 1);
  readyWindowIds.delete(windowId);
  // Electron reuses window IDs, so leaving any of these behind would speak for a window that no
  // longer exists: the closing flag would tell a future window's close it is already on its way out,
  // the ever-ready flag would make the next window to take this ID look, for the whole of its
  // startup, like one that had been serving requests and died, and the abandoned flag would write
  // that window off before it had loaded anything.
  closingWindowIds.delete(windowId);
  everReadyWindowIds.delete(windowId);
  abandonedWindowIds.delete(windowId);
  const focusOrderIndex = mostRecentlyFocusedWindowIds.indexOf(windowId);
  if (focusOrderIndex >= 0) mostRecentlyFocusedWindowIds.splice(focusOrderIndex, 1);
  if (focusedWindowId === windowId) focusedWindowId = undefined;
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
  everReadyWindowIds.add(windowId);
  // A page registering is proof that "nothing will ever run in this window again" was wrong,
  // whatever route it came back by. Left behind, the mark would keep a live window out of the
  // unreachable list the next time its renderer died — the one list that makes a fan-out refuse to
  // answer for a window that really is holding the user's tabs.
  abandonedWindowIds.delete(windowId);
  announceRoutingTargetIfChanged();
}

/**
 * Record that a window has begun closing. Call this at the top of a window's close handling, before
 * anything reads {@link areAllWindowsClosing}.
 *
 * A window on its way out stops being where new work goes, so this announces like every other
 * mutation here — routing proxies hold a resolved service for the target window and have nothing
 * else to tell them it moved.
 *
 * @param windowId Window that is on its way out
 */
export function markWindowClosing(windowId: number): void {
  closingWindowIds.add(windowId);
  announceRoutingTargetIfChanged();
}

/**
 * Whether a window's close has begun, so nothing should try to put it back to work.
 *
 * Answered from what the window's own close handler recorded rather than from the BrowserWindow,
 * which is not destroyed until long after the close started — see {@link markWindowClosing}.
 *
 * @param windowId Window to ask about
 */
export function isWindowClosing(windowId: number): boolean {
  return closingWindowIds.has(windowId);
}

/**
 * Whether every tracked window is on its way out, so the app is going down rather than one window
 * going away.
 *
 * Answered from what every window's close handler has recorded rather than from the tracked list
 * alone, which nothing trims until a window is actually gone. See {@link markWindowClosing}.
 *
 * No windows at all is not the app going down: `every` answers `true` for an empty list, but that
 * state is the app coming UP — process start, and the moment a macOS dock reactivation runs before
 * its window exists — where nothing is closing and refusing to create a window would be fatal.
 */
export function areAllWindowsClosing(): boolean {
  return (
    trackedWindows.length > 0 &&
    trackedWindows.every(({ windowId }) => closingWindowIds.has(windowId))
  );
}

/**
 * Record that a window's renderer can no longer serve routed calls — it crashed, or it is reloading
 * and its registrations went away with the old page.
 *
 * Routing moves to a window that can answer instead of burning the network service's registration
 * retry against handlers that no longer exist. The window stays tracked: it is still a window, and
 * it becomes routable again through {@link markWindowReady} once its renderer registers.
 *
 * {@link everReadyWindowIds} deliberately keeps this window, which is what makes it come back from
 * here as a window that could not be asked rather than as one that never had anything to say. Only
 * the window going away clears that.
 *
 * @param windowId Window whose renderer stopped serving requests
 */
export function markWindowNotReady(windowId: number): void {
  readyWindowIds.delete(windowId);
  announceRoutingTargetIfChanged();
}

/**
 * Record that a window will never serve a routed call again — its renderer died and the reload that
 * brings a crashed window back has run out of attempts.
 *
 * This is the terminal counterpart of {@link markWindowNotReady}, and the distinction is the whole
 * point of having it. A window that merely stopped serving is one the app is still working on: its
 * layout is held here, a reload is in flight, and the tabs the user is looking at do come back — so
 * a fan-out that cannot ask it refuses to answer rather than reporting its contents as absent. A
 * window that has been given up on is not coming back, and leaving it in that state makes every
 * routed search in the app throw for the rest of the session over a window that will never hold
 * anything again.
 *
 * Safe to call for a window whose renderer never registered anything, and meant to be: the caller
 * cannot usefully tell the two apart at the moment it gives up, and the never-ready case wants the
 * same record made for the same reason.
 *
 * The window stays tracked and is deliberately not closed. It is still on screen, and closing it
 * would rewrite the persisted window layout without it — taking away the one recovery the user has
 * left, which is to quit and relaunch.
 *
 * @param windowId Window nothing will ever run in again
 */
export function markWindowAbandoned(windowId: number): void {
  abandonedWindowIds.add(windowId);
  // Cannot move the routing target — the target only ever considers windows that can serve a call,
  // and this window stopped being one when its renderer died. Announced anyway, like every other
  // mutation here, so the comparison stays the single place that decides what is worth telling
  // consumers; it stays quiet when nothing moved.
  announceRoutingTargetIfChanged();
}

/**
 * Drop all tracked window state. This function is only exported for testing purposes and should not
 * be used in production code — the app removes windows one at a time, as each one goes away.
 */
export function resetForTesting(): void {
  trackedWindows.length = 0;
  readyWindowIds.clear();
  everReadyWindowIds.clear();
  abandonedWindowIds.clear();
  closingWindowIds.clear();
  mostRecentlyFocusedWindowIds.length = 0;
  focusedWindowId = undefined;
  announcedRoutingTarget = { windowId: undefined, isReady: false };
}
