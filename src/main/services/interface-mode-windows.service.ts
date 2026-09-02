/**
 * What a live interface-mode change means for the set of open windows.
 *
 * Simple mode is single-window and power mode is not, so the mode decides how many windows the
 * application has: switching to simple closes every window but the primary, and switching back to
 * power brings the closed ones back. The layouts themselves need no new home — a window closing for
 * a switch keeps its persisted entry, and that entry is what a later reopen creates a window from,
 * so the persisted entry list already describes the set of windows a power session had open.
 *
 * Kept out of `main.ts` and given its collaborators rather than importing them, so the whole
 * decision can be exercised without an Electron window.
 *
 * Hidden windows need no special handling here, and that is a decision rather than an oversight:
 * everything below acts on whole OS windows and reads no layout geometry, so a minimized or
 * occluded window closes and reopens exactly as a visible one does. The one geometry-dependent step
 * in a close — capturing the window's final bounds — already keeps the last normal placement when a
 * capture carries none, so a minimized window does not persist a degenerate one.
 */

import { logger } from '@shared/services/logger.service';
import { getErrorMessage, type InterfaceMode } from 'platform-bible-utils';

export type { InterfaceMode };

/** Everything the orchestration needs from the rest of the main process */
export type ModeSwitchDependencies = {
  /** Every window the application is tracking right now */
  getTrackedWindowIds: () => number[];
  /** Whether a window holds the primary role — the one window a switch to simple keeps */
  isPrimaryWindow: (windowId: number) => boolean;
  /** Whether a window's close has already begun by some other route */
  isWindowClosing: (windowId: number) => boolean;
  /** Record that a window's close has begun, before anything can route new work to it */
  markWindowClosing: (windowId: number) => void;
  /**
   * Take a window off screen. Called the moment it is marked for a mode-switch close, because from
   * then on its chrome shows the mode it is moving to over a dock still holding the mode it is
   * leaving, and anything the user rearranges in it is refused by the layout save.
   */
  hideWindow: (windowId: number) => void;
  /**
   * Close a window, running its ordinary close handling.
   *
   * @returns Whether there was a live window to ask; `false` means nothing was asked to close
   */
  closeWindow: (windowId: number) => boolean;
  /** Bring a window to the front */
  focusWindow: (windowId: number) => void;
  /** Whether the application is on its way down, by either route it can take */
  isAppShuttingDown: () => boolean;
  /** Persisted entries with no live window — the windows a switch back to power reopens */
  getPreservedEntrySlotIds: () => number[];
  /** Create a window restoring the persisted entry this slot id names */
  createWindowForEntry: (slotId: number) => Promise<void>;
};

let dependencies: ModeSwitchDependencies | undefined;

/**
 * The mode as this process last saw it, or `undefined` before the mode has been read at all.
 *
 * Undefined is a real state rather than a placeholder: the window restore deliberately creates its
 * first window BEFORE reading the mode, because that read can block on the extension host early in
 * startup. Until the read lands, nothing here may claim the application is in simple mode — see
 * {@link isAdditionalWindowRefusedInSimpleMode}, which would otherwise refuse the very windows the
 * restore is creating.
 */
let cachedInterfaceMode: InterfaceMode | undefined;

/**
 * Bumped once per switch, so a switch superseded by the user changing their mind stops rather than
 * carrying on against a set of windows that no longer matches the mode.
 *
 * Separate from the renderer's own switch generation, which guards one window's dock contents. This
 * one guards the window set, and neither can stand in for the other.
 */
let switchGeneration = 0;

/**
 * Windows being closed because the mode changed, rather than because the user closed them or the
 * application is going down.
 *
 * Read in three places. A window in this set keeps its persisted entry, because it is meant to come
 * back on the way to power; a layout push arriving from it is dropped, because anything it sends
 * after the mode changed describes the mode it is leaving; and its placement is captured as it
 * goes, which no other close on that path does.
 */
const modeSwitchClosingWindowIds = new Set<number>();

/**
 * Wire the collaborators and seed the mode. Called once during startup, after the window restore
 * has read the mode, so the seed is the value the restore acted on.
 *
 * @param deps Collaborators from the rest of the main process
 * @param initialMode Mode the startup read found, or `undefined` when it could not be read — in
 *   which case the mode stays unknown until the first change arrives, and nothing is refused
 *   meanwhile
 */
export function initializeModeSwitchOrchestration(
  deps: ModeSwitchDependencies,
  initialMode: InterfaceMode | undefined,
): void {
  dependencies = deps;
  cachedInterfaceMode = initialMode;
}

/** The mode as this process last saw it, or `undefined` if it has never been read */
export function getCachedInterfaceMode(): InterfaceMode | undefined {
  return cachedInterfaceMode;
}

/**
 * Record the mode a window restore acted on, without treating it as a change.
 *
 * The restore decides how many windows to build from its own read of the mode, and this is that
 * value. Reacting to it would run a switch against a window set that already matches it.
 *
 * @param mode Mode the restore read, or `undefined` if it could not be read
 */
export function seedInterfaceMode(mode: InterfaceMode | undefined): void {
  cachedInterfaceMode = mode;
}

/**
 * Whether a window is closing because the mode changed. Its entry stays in the persisted structure,
 * and any layout it pushes from here on is ignored.
 *
 * @param windowId Window to ask about
 */
export function isClosingForModeSwitch(windowId: number): boolean {
  return modeSwitchClosingWindowIds.has(windowId);
}

/**
 * Forget that a window was closing for a mode switch. Called once the window has actually gone, so
 * the set never outlives the windows in it.
 *
 * @param windowId Window that has gone away
 */
export function clearModeSwitchClose(windowId: number): void {
  modeSwitchClosingWindowIds.delete(windowId);
}

/**
 * Whether a request for another window should be refused because simple mode is single-window.
 *
 * Scoped to windows beyond the first, which is what keeps a launch working: startup and macOS
 * re-activation both create their first window with none tracked, and refusing there would leave
 * the application with no window at all. A switch back to power is likewise never refused, because
 * it moves the cached mode before it creates anything.
 *
 * A mode that is not yet known refuses nothing. The startup restore creates windows before the mode
 * read it depends on can land, so treating an unread mode as simple would refuse a power session
 * its own secondary windows — the one failure here that costs the user something.
 *
 * @param mode Mode the application is in, or `undefined` if it has not been read yet
 * @param liveWindowCount How many windows are already open
 */
export function isAdditionalWindowRefusedInSimpleMode(
  mode: InterfaceMode | undefined,
  liveWindowCount: number,
): boolean {
  return mode === 'simple' && liveWindowCount > 0;
}

/**
 * Close every window but the primary, keeping each one's entry for the way back.
 *
 * Synchronous throughout, so no switch can start while it runs and it needs no generation check of
 * its own — unlike the reopen, which awaits a window at a time and can be overtaken.
 */
function closeSecondaryWindows(deps: ModeSwitchDependencies): void {
  const trackedWindowIds = deps.getTrackedWindowIds();
  // Nothing closes unless a window is going to be left. `isPrimaryWindow` answers false for every
  // window when no slot holds the marked entry and every live window is still awaiting content —
  // reachable when the application is resident with no windows and an extension opens one. Closing
  // then would mark every tracked window closing, which is the application shutting down: a mode
  // switch must never be able to end the session.
  const survivorId = trackedWindowIds.find((windowId) => deps.isPrimaryWindow(windowId));
  if (survivorId === undefined) {
    logger.warn(
      'Not closing any window for the switch to simple mode: no window holds the primary role, and one has to be left open',
    );
    return;
  }

  trackedWindowIds.forEach((windowId) => {
    if (windowId === survivorId) return;
    // A window already on its way out has a close handler mid-flight; telling it to close again
    // reaches the escape hatch that abandons the work that close started. Read BEFORE anything is
    // recorded: a window the user closed with its own ✕ must not end up recorded as closing for
    // the switch, or its entry would be kept and the window they closed would come back on the way
    // to power.
    if (deps.isWindowClosing(windowId)) return;
    // Marked before it is told to close, so a layout it pushes on its way out is already
    // recognizable as one to ignore, and taken off screen at the same moment: from here its chrome
    // shows the mode it is moving to over a dock still holding the mode it is leaving.
    modeSwitchClosingWindowIds.add(windowId);
    deps.markWindowClosing(windowId);
    deps.hideWindow(windowId);
    if (!deps.closeWindow(windowId)) {
      // Nothing was there to close, so nothing will ever report it closed — and the record would
      // otherwise outlive the window, dropping layouts for an id that no longer names anything
      modeSwitchClosingWindowIds.delete(windowId);
    }
  });
}

/**
 * Bring back one window per entry a previous power session left behind.
 *
 * Entries are named by slot id, never by position: creating a window takes a full renderer start,
 * and a window the user closes during one splices its slot out of the list, shifting every later
 * position down. An index captured before that await would name a different entry afterwards.
 *
 * The set is re-read on every pass rather than captured once, so entries freed while this runs — by
 * a close from the switch that preceded it finishing late — are picked up instead of being missed
 * until the next switch.
 */
async function reopenPreservedWindows(
  deps: ModeSwitchDependencies,
  generation: number,
): Promise<void> {
  const reopenedSlotIds = new Set<number>();
  let remaining = deps.getPreservedEntrySlotIds().filter((slotId) => !reopenedSlotIds.has(slotId));
  while (remaining.length > 0) {
    if (generation !== switchGeneration) return;
    const slotId = remaining[0];
    reopenedSlotIds.add(slotId);
    try {
      // Sequential on purpose: creating windows one at a time keeps the tracked window order, and
      // with it the focus fallback and the order entries are written back in, deterministic
      // eslint-disable-next-line no-await-in-loop
      await deps.createWindowForEntry(slotId);
    } catch (e) {
      // One window failing to come back is not a reason to abandon the others: each is a separate
      // entry, and the ones that can be restored are worth more to the user than consistency about
      // failing together
      logger.warn(`Could not reopen the window for entry ${slotId}: ${getErrorMessage(e)}`);
    }
    remaining = deps
      .getPreservedEntrySlotIds()
      .filter((candidate) => !reopenedSlotIds.has(candidate));
  }
}

/**
 * React to the interface mode changing.
 *
 * @param newMode Mode the application has changed to
 */
export async function handleInterfaceModeChanged(newMode: InterfaceMode): Promise<void> {
  const deps = dependencies;
  if (!deps) {
    logger.warn('Ignoring an interface-mode change before the window orchestration was wired');
    return;
  }
  // Every setting shares one data provider data type, so this is woken by ANY settings write in the
  // application. Without this the user's windows would close and reopen whenever some unrelated
  // setting was written.
  if (newMode === cachedInterfaceMode) return;
  // The windows belong to the shutdown once it has started: closing more of them would race the
  // work each one is already doing, and creating any is refused outright. The cache deliberately
  // does NOT advance here — recording a mode whose window work never ran would make the guard above
  // swallow every later delivery of it, so an application that somehow carried on would never act.
  if (deps.isAppShuttingDown()) return;

  // Moved before the window work, not after: the single-window guard reads this, so a mode still
  // reading simple here would make the reopen below refuse the very windows it is creating. It is
  // put back if that work throws, so a mode this process never managed to act on is not left
  // recorded as the current one — the same-value guard above would otherwise swallow every later
  // delivery of it and the user would be stuck until they toggled away and back.
  const modeBeforeSwitch = cachedInterfaceMode;
  cachedInterfaceMode = newMode;
  switchGeneration += 1;
  const generation = switchGeneration;

  try {
    if (newMode === 'simple') {
      closeSecondaryWindows(deps);
      // The window the user was working in may be one of the ones just closed — the mode switcher
      // is reachable from every window — so the survivor is brought forward rather than leaving
      // the user looking at whatever was behind it
      const primaryWindowId = deps
        .getTrackedWindowIds()
        .find((windowId) => deps.isPrimaryWindow(windowId));
      if (primaryWindowId !== undefined) deps.focusWindow(primaryWindowId);
      return;
    }

    await reopenPreservedWindows(deps, generation);
  } catch (e) {
    // Only if no newer switch has started: putting the cache back under a switch that superseded
    // this one would describe the application as being in a mode it has already left
    if (generation === switchGeneration) cachedInterfaceMode = modeBeforeSwitch;
    logger.warn(`Could not finish switching the windows to ${newMode} mode: ${getErrorMessage(e)}`);
  }
}

/**
 * Drop all orchestration state. Exported for testing only; the application wires this once and
 * keeps it for the life of the process.
 */
export function resetForTesting(): void {
  dependencies = undefined;
  cachedInterfaceMode = undefined;
  switchGeneration = 0;
  modeSwitchClosingWindowIds.clear();
}
