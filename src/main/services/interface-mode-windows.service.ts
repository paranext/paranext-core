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
import { getErrorMessage } from 'platform-bible-utils';

/** The two interface modes, as the setting spells them */
export type InterfaceMode = 'simple' | 'power';

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
  /** Close a window, running its ordinary close handling */
  closeWindow: (windowId: number) => void;
  /** Bring a window to the front */
  focusWindow: (windowId: number) => void;
  /** Whether the application is on its way down, by either route it can take */
  isAppShuttingDown: () => boolean;
  /** Persisted entries with no live window — the windows a switch back to power reopens */
  getPreservedEntryIndexes: () => number[];
  /** Create a window restoring the persisted entry at this index */
  createWindowForEntry: (entryIndex: number) => Promise<void>;
};

let dependencies: ModeSwitchDependencies | undefined;

/**
 * The mode as this process last saw it.
 *
 * Seeded from the read the window restore already performs, so the first notification to arrive is
 * compared against a real value rather than treated as a change.
 */
let cachedInterfaceMode: InterfaceMode = 'simple';

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
 * Read in two places for two reasons: a window in this set keeps its persisted entry, because it is
 * meant to come back on the way to power; and a layout push arriving from it is dropped, because
 * anything it sends after the mode changed describes the mode it is leaving.
 */
const modeSwitchClosingWindowIds = new Set<number>();

/**
 * Wire the collaborators and seed the mode. Called once during startup, after the window restore
 * has read the mode, so the seed is the value the restore acted on.
 *
 * @param deps Collaborators from the rest of the main process
 * @param initialMode Mode the window restore read
 */
export function initializeModeSwitchOrchestration(
  deps: ModeSwitchDependencies,
  initialMode: InterfaceMode,
): void {
  dependencies = deps;
  cachedInterfaceMode = initialMode;
}

/** The mode as this process last saw it */
export function getCachedInterfaceMode(): InterfaceMode {
  return cachedInterfaceMode;
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
 * @param mode Mode the application is in
 * @param liveWindowCount How many windows are already open
 */
export function isAdditionalWindowRefusedInSimpleMode(
  mode: InterfaceMode,
  liveWindowCount: number,
): boolean {
  return mode === 'simple' && liveWindowCount > 0;
}

/** Close every window but the primary, keeping each one's entry for the way back */
function closeSecondaryWindows(deps: ModeSwitchDependencies, generation: number): void {
  deps.getTrackedWindowIds().forEach((windowId) => {
    if (generation !== switchGeneration) return;
    if (deps.isPrimaryWindow(windowId)) return;
    // A window already on its way out has a close handler mid-flight; telling it to close again
    // reaches the escape hatch that abandons the work that close started
    if (deps.isWindowClosing(windowId)) return;
    // Marked before it is told to close, so a layout it pushes on its way out is already
    // recognizable as one to ignore
    modeSwitchClosingWindowIds.add(windowId);
    deps.markWindowClosing(windowId);
    deps.closeWindow(windowId);
  });
}

/** Bring back one window per entry a previous power session left behind */
async function reopenPreservedWindows(
  deps: ModeSwitchDependencies,
  generation: number,
): Promise<void> {
  const entryIndexes = deps.getPreservedEntryIndexes();
  for (let index = 0; index < entryIndexes.length; index += 1) {
    if (generation !== switchGeneration) return;
    try {
      // Sequential on purpose: creating windows one at a time keeps the tracked window order, and
      // with it the focus fallback and the order entries are written back in, deterministic
      // eslint-disable-next-line no-await-in-loop
      await deps.createWindowForEntry(entryIndexes[index]);
    } catch (e) {
      // One window failing to come back is not a reason to abandon the others: each is a separate
      // entry, and the ones that can be restored are worth more to the user than consistency about
      // failing together
      logger.warn(
        `Could not reopen the window for entry ${entryIndexes[index]}: ${getErrorMessage(e)}`,
      );
    }
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
  // work each one is already doing, and creating any is refused outright
  if (deps.isAppShuttingDown()) {
    cachedInterfaceMode = newMode;
    return;
  }

  // Moved before the window work, not after: the single-window guard reads this, so a mode still
  // reading simple here would make the reopen below refuse the very windows it is creating
  cachedInterfaceMode = newMode;
  switchGeneration += 1;
  const generation = switchGeneration;

  if (newMode === 'simple') {
    closeSecondaryWindows(deps, generation);
    // The window the user was working in may be one of the ones just closed — the mode switcher is
    // reachable from every window — so the survivor is brought forward rather than leaving the user
    // looking at whatever was behind it
    const primaryWindowId = deps
      .getTrackedWindowIds()
      .find((windowId) => deps.isPrimaryWindow(windowId));
    if (primaryWindowId !== undefined) deps.focusWindow(primaryWindowId);
    return;
  }

  await reopenPreservedWindows(deps, generation);
}

/**
 * Drop all orchestration state. Exported for testing only; the application wires this once and
 * keeps it for the life of the process.
 */
export function resetForTesting(): void {
  dependencies = undefined;
  cachedInterfaceMode = 'simple';
  switchGeneration = 0;
  modeSwitchClosingWindowIds.clear();
}
