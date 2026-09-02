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
  /**
   * Whether a window's renderer has been given up on, so nothing will ever run in it again. Such a
   * window stays open and keeps its entry — and with it the primary role, if that is where the role
   * sat — but it can no longer show the user anything.
   */
  isWindowAbandoned: (windowId: number) => boolean;
  /** Record that a window's close has begun, before anything can route new work to it */
  markWindowClosing: (windowId: number) => void;
  /** Take back a closing mark for a window whose close is not going to happen after all */
  unmarkWindowClosing: (windowId: number) => void;
  /**
   * Take a window off screen. Called the moment it is marked for a mode-switch close, because from
   * then on its chrome shows the mode it is moving to over a dock still holding the mode it is
   * leaving, and anything the user rearranges in it is refused by the layout save.
   */
  hideWindow: (windowId: number) => void;
  /**
   * Put a window back on screen after it was hidden for a close that did not happen.
   *
   * Must not take focus: the switch decides separately which window the user should be looking at,
   * and a window coming back from a close that failed is not it.
   */
  showWindow: (windowId: number) => void;
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
 * Whether a reopen is running right now.
 *
 * A reopen re-reads the preserved set on every pass, so one already running picks up entries freed
 * while it runs. What that cannot cover is an entry freed when no reopen is running — which is what
 * {@link clearModeSwitchClose} starts one for, and why it has to know not to start a second.
 */
let isReopenInFlight = false;

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
 * A snapshot of the switch-generation counter, taken before starting a window restore whose result
 * will later be seeded. Passed back into {@link seedInterfaceMode} so it can tell whether a live
 * switch ran while the restore was in flight.
 */
export function getSwitchGeneration(): number {
  return switchGeneration;
}

/**
 * Record the mode a window restore acted on, without treating it as a change.
 *
 * The restore decides how many windows to build from its own read of the mode, and this is that
 * value. Reacting to it would run a switch against a window set that already matches it.
 *
 * @param mode Mode the restore read, or `undefined` if it could not be read
 * @param sinceGeneration The generation {@link getSwitchGeneration} reported before the restore
 *   started. A real switch that ran in that window already moved the cache to a value this seed
 *   would otherwise stomp with a stale reading, so the seed is skipped when the generation has
 *   moved on. Required rather than optional: a caller that omitted it would silently get the
 *   clobbering this parameter exists to prevent, and a caller with nothing to wait on can pass
 *   {@link getSwitchGeneration}'s reading from the moment before it read the mode.
 */
export function seedInterfaceMode(mode: InterfaceMode | undefined, sinceGeneration: number): void {
  if (sinceGeneration !== switchGeneration) return;
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
 * Also where a switch back to power that overtook these closes is finished. A window lets go of its
 * entry one Electron close AFTER the switch asks it to close, so a switch back arriving in that gap
 * finds nothing preserved and reopens nothing — and the reopen's per-pass re-read cannot help,
 * because with an empty set it never takes a pass. The last close reporting in is the moment those
 * entries exist, so it is the moment to look again.
 *
 * @param windowId Window that has gone away
 */
export function clearModeSwitchClose(windowId: number): void {
  if (!modeSwitchClosingWindowIds.delete(windowId)) return;
  // Only once they have all reported: reopening between two closes would create windows while the
  // switch that closed them is still running
  if (modeSwitchClosingWindowIds.size > 0) return;
  // Only when the mode has moved on. The ordinary end of a switch TO simple runs this same path,
  // and a reopen fired from it would put back the windows the switch had just closed.
  if (cachedInterfaceMode !== 'power') return;
  const deps = dependencies;
  if (!deps || deps.isAppShuttingDown()) return;
  // A reopen already running re-reads the set each pass, so it picks these up on its own
  if (isReopenInFlight) return;
  // Not awaited: this runs from a window's `closed` handler, which is synchronous and has its own
  // teardown to finish. Failures are reported by the reopen itself, one window at a time.
  runReopen(deps, switchGeneration).catch((e: unknown) => {
    logger.warn(
      `Could not reopen the windows a switch back to power outran: ${getErrorMessage(e)}`,
    );
  });
}

/**
 * Take back everything a switch to simple mode did to a window in the expectation that it was about
 * to close, for a window whose close then did not happen.
 *
 * {@link closeSecondaryWindows} records the mark and takes the window off screen BEFORE the close is
 * asked for, let alone decided, so that a layout pushed on the way out is already recognizable as
 * one to drop. That ordering is deliberate, and this is what makes it safe. Two routes end with the
 * close not happening: asking for it throws, or the window's own handler decides to stay open (the
 * user cancels the close-all question, or deciding fails and leaving the window open is the safe
 * outcome). Either way `closed` never fires, and `closed` is the only thing that would otherwise
 * clear the mark — so without this the window is left invisible, still recorded as closing, skipped
 * by every later switch, absent from the window list, and with every layout it pushes dropped, for
 * the life of the process.
 *
 * Scoped to the one window: its siblings are still closing. Does nothing for a window this switch
 * never claimed, so it cannot show a window that was never hidden.
 *
 * @param windowId Window whose close is not going to happen after all
 */
export function undoModeSwitchClose(windowId: number): void {
  const deps = dependencies;
  if (!deps) {
    logger.warn(
      `Cannot put window ${windowId} back after its close did not happen; the window orchestration is not wired`,
    );
    return;
  }
  undoModeSwitchCloseWith(deps, windowId);
}

/**
 * {@link undoModeSwitchClose} for a caller that already holds the collaborators.
 *
 * @param deps Collaborators to act through
 * @param windowId Window whose close is not going to happen after all
 */
function undoModeSwitchCloseWith(deps: ModeSwitchDependencies, windowId: number): void {
  if (!modeSwitchClosingWindowIds.delete(windowId)) return;
  // Each collaborator is tried on its own, and a failure in either is reported rather than thrown.
  // Both callers are recovering from something that already went wrong — a close that threw, or one
  // the window refused — and neither can afford a second throw: from the batch it would abandon
  // every window after this one, and from the close handler it would strand the window it is trying
  // to rescue. Taking the claim off above is what matters most and has already happened.
  try {
    deps.unmarkWindowClosing(windowId);
  } catch (e) {
    logger.warn(`Could not clear the closing mark on window ${windowId}: ${getErrorMessage(e)}`);
  }
  try {
    deps.showWindow(windowId);
  } catch (e) {
    logger.warn(
      `Could not put window ${windowId} back on screen after its close did not happen: ${getErrorMessage(e)}`,
    );
  }
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
 *
 * @returns The window left open, or `undefined` when nothing was closed because there was no window
 *   fit to leave
 */
function closeSecondaryWindows(deps: ModeSwitchDependencies): number | undefined {
  const trackedWindowIds = deps.getTrackedWindowIds();
  // Nothing closes unless a window the user can work in is going to be left. `isPrimaryWindow`
  // answers false for every window when no slot holds the marked entry and every live window is
  // still awaiting content — reachable when the application is resident with no windows and an
  // extension opens one. Closing then would mark every tracked window closing, which is the
  // application shutting down: a mode switch must never be able to end the session.
  //
  // A window whose renderer was given up on is no survivor either, and the role can be exactly
  // where it sits: such a window keeps its entry, so it keeps the flag the role is read from.
  // Closing the others around it would leave the user looking at a dead page with everything they
  // could still work in gone — the same loss as ending the session, one window later.
  const survivorId = trackedWindowIds.find(
    (windowId) => deps.isPrimaryWindow(windowId) && !deps.isWindowAbandoned(windowId),
  );
  if (survivorId === undefined) {
    logger.warn(
      'Not closing any window for the switch to simple mode: no window that could be left open holds the primary role',
    );
    return undefined;
  }

  // Collected rather than thrown from inside the loop: one window failing to close is not a
  // reason to leave the rest of the batch visible, so every window still gets its turn. The
  // failure is rethrown once the loop is done so the caller still rolls the cached mode back —
  // this process could not fully act on the new mode, and a later delivery of the same mode must
  // not be swallowed by the same-value guard.
  const closeFailures: unknown[] = [];
  trackedWindowIds.forEach((windowId) => {
    if (windowId === survivorId) return;
    // A window already on its way out has a close handler mid-flight; telling it to close again
    // reaches the escape hatch that abandons the work that close started. Read BEFORE anything is
    // recorded: a window the user closed with its own ✕ must not end up recorded as closing for
    // the switch, or its entry would be kept and the window they closed would come back on the way
    // to power.
    if (deps.isWindowClosing(windowId)) return;
    try {
      // Marked before it is told to close, so a layout it pushes on its way out is already
      // recognizable as one to ignore, and taken off screen at the same moment: from here its
      // chrome shows the mode it is moving to over a dock still holding the mode it is leaving.
      modeSwitchClosingWindowIds.add(windowId);
      deps.markWindowClosing(windowId);
      deps.hideWindow(windowId);
      if (!deps.closeWindow(windowId)) {
        // Nothing was there to close, so nothing will ever report it closed — and the record would
        // otherwise outlive the window, dropping layouts for an id that no longer names anything
        modeSwitchClosingWindowIds.delete(windowId);
      }
    } catch (e) {
      // Recorded and reported BEFORE the undo below: a throw out of the undo would otherwise escape
      // this catch, taking the rest of the batch with it and losing the failure that started it —
      // which is the isolation this loop exists to give.
      closeFailures.push(e);
      logger.warn(
        `Could not close window ${windowId} for the switch to simple mode: ${getErrorMessage(e)}`,
      );
      // The mark and the hide are already applied, and the close that would have cleared them
      // never happened — so put this window back rather than leaving it invisible and permanently
      // claimed by a switch that could not take it
      undoModeSwitchCloseWith(deps, windowId);
    }
  });
  if (closeFailures.length > 0) {
    throw new Error(
      `Could not close ${closeFailures.length} window(s) for the switch to simple mode`,
    );
  }
  return survivorId;
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
 * {@link reopenPreservedWindows}, with the flag that keeps two of them from running at once.
 *
 * Both callers go through here, so the flag cannot be set by one route and read by another that
 * never sets it.
 *
 * @param deps Collaborators to act through
 * @param generation Switch this reopen belongs to
 */
async function runReopen(deps: ModeSwitchDependencies, generation: number): Promise<void> {
  isReopenInFlight = true;
  try {
    await reopenPreservedWindows(deps, generation);
  } finally {
    isReopenInFlight = false;
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
      const survivorId = closeSecondaryWindows(deps);
      // The window the user was working in may be one of the ones just closed — the mode switcher
      // is reachable from every window — so the survivor is brought forward rather than leaving
      // the user looking at whatever was behind it. Taken from the close rather than looked up
      // again, so the window brought forward is the one the closes were decided around.
      if (survivorId !== undefined) deps.focusWindow(survivorId);
      return;
    }

    await runReopen(deps, generation);
  } catch (e) {
    // Only the reopen is put back. A switch to simple that failed part-way still CLOSED every
    // window whose close succeeded, and the setting on disk already reads simple — so describing
    // the application as being in power mode again would be false, and worse than useless: the
    // user's way out is to switch to power, which would then equal the cache and be swallowed by
    // the same-value guard above, leaving those windows closed with no route back. A failed reopen
    // has no such asymmetry — nothing was closed, so putting the cache back is what lets the user
    // ask for power again and have it retried.
    //
    // Only if no newer switch has started, either: putting the cache back under a switch that
    // superseded this one would describe the application as being in a mode it has already left.
    if (newMode === 'power' && generation === switchGeneration)
      cachedInterfaceMode = modeBeforeSwitch;
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
  isReopenInFlight = false;
  modeSwitchClosingWindowIds.clear();
}
