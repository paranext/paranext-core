import { logger } from '@shared/services/logger.service';

function logPerf(message: string): void {
  logger.info(`[perf:simple-switch] ${message}`);
}

/**
 * Store tracking whether the workspace is currently switching projects.
 *
 * Uses a reference counter so concurrent switches don't prematurely hide the overlay: the visible
 * state (isUpdating) only flips to false once every in-flight switch has finished.
 *
 * A 30-second safety timer resets on every new switch and auto-clears the state if a switch never
 * resolves (e.g. the extension deactivates mid-switch and the did-finish event is never emitted).
 *
 * Also tracks the latest known project name so the overlay can show "Loading layout for {name}".
 * The name is replaced (not stacked) on every new switch — concurrent switches are rare, and the
 * most recent switch is the one the user just initiated, so its name is the most useful to
 * display.
 */

/**
 * Heuristic upper bound; if a switch never resolves (e.g. extension deactivates mid-switch),
 * auto-clear after this long.
 */
const SWITCH_SAFETY_TIMEOUT_MS = 30_000;

let switchCount = 0;
let safetyTimer: ReturnType<typeof setTimeout> | undefined;
let currentProjectName: string | undefined;

const listeners = new Set<() => void>();

function notifyListeners(): void {
  listeners.forEach((listener) => listener());
}

export function setWorkspaceUpdating(value: boolean, projectName?: string): void {
  const wasUpdating = switchCount > 0;
  const previousProjectName = currentProjectName;
  logPerf(
    `setWorkspaceUpdating(${value}, ${JSON.stringify(projectName)}) — switchCount ${switchCount} → ${value ? switchCount + 1 : Math.max(0, switchCount - 1)}`,
  );
  if (value) {
    switchCount += 1;
    // Replace the project name on every new switch — see module comment.
    if (projectName !== undefined) currentProjectName = projectName;
    // Reset the safety timer on each new switch, giving 30 s from the latest start.
    clearTimeout(safetyTimer);
    safetyTimer = setTimeout(() => {
      logPerf(
        `SAFETY TIMER FIRED after ${SWITCH_SAFETY_TIMEOUT_MS} ms — force-clearing overlay (switchCount was ${switchCount})`,
      );
      switchCount = 0;
      currentProjectName = undefined;
      safetyTimer = undefined;
      notifyListeners();
    }, SWITCH_SAFETY_TIMEOUT_MS);
  } else {
    switchCount = Math.max(0, switchCount - 1);
    if (switchCount === 0) {
      clearTimeout(safetyTimer);
      safetyTimer = undefined;
      currentProjectName = undefined;
    }
  }
  const isNowUpdating = switchCount > 0;
  if (wasUpdating !== isNowUpdating || previousProjectName !== currentProjectName) {
    if (wasUpdating !== isNowUpdating)
      logPerf(`overlay visibility → ${isNowUpdating ? 'SHOWN' : 'HIDDEN'}`);
    notifyListeners();
  }
}

export function getWorkspaceUpdating(): boolean {
  return switchCount > 0;
}

export function getWorkspaceUpdatingProjectName(): string | undefined {
  return currentProjectName;
}

/** Subscribe to state changes. Returns an unsubscribe function. */
export function subscribeToWorkspaceUpdating(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Resets the store to its initial state.
 *
 * WARNING: Test-only. @internal
 */
export function resetWorkspaceUpdating(): void {
  switchCount = 0;
  clearTimeout(safetyTimer);
  safetyTimer = undefined;
  currentProjectName = undefined;
  listeners.clear();
}
