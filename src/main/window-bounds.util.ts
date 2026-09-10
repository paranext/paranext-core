/**
 * Keeps restored window bounds on a display that still exists. Pure — the caller passes the current
 * display list in — so monitor-gone recovery is unit-testable without Electron.
 */

import type {
  WindowBoundsState,
  WindowRectangle,
} from '@shared/data/window-layout-persistence.model';

/** Width a window falls back to when its saved placement is unusable */
export const DEFAULT_WINDOW_WIDTH = 1024;
/** Height a window falls back to when its saved placement is unusable */
export const DEFAULT_WINDOW_HEIGHT = 728;

/** The one property of an Electron `Display` this module needs, so tests can pass plain objects */
export type DisplayLike = { bounds: WindowRectangle };

/** Whether `bounds` lies fully within `display` — the containment rule for "visible" */
function isContainedIn(bounds: WindowRectangle, display: DisplayLike): boolean {
  return (
    bounds.x >= display.bounds.x &&
    bounds.y >= display.bounds.y &&
    bounds.x + bounds.width <= display.bounds.x + display.bounds.width &&
    bounds.y + bounds.height <= display.bounds.y + display.bounds.height
  );
}

/**
 * Ensure a saved window placement is usable on the displays connected right now.
 *
 * Bounds fully contained in some display are returned unchanged. Anything else — bounds on a
 * display that is gone, bounds partially offscreen or straddling two displays (containment must be
 * within a single display, the same rule the previous window-state keeper used), or a
 * maximized/full-screen state with no normal bounds at all — is re-placed at default size at the
 * primary display's origin. `isMaximized`/`isFullScreen` survive re-placement, so a maximized
 * window whose display departed comes back maximized on the primary display.
 *
 * Never mutates `savedState`.
 *
 * @param savedState Persisted placement to validate
 * @param displays Displays connected right now (`screen.getAllDisplays()`)
 * @param primaryDisplay Display to fall back to (`screen.getPrimaryDisplay()`)
 * @returns A placement guaranteed to be on a connected display
 */
export function ensureBoundsVisibleOnSomeDisplay(
  savedState: WindowBoundsState,
  displays: readonly DisplayLike[],
  primaryDisplay: DisplayLike,
): WindowBoundsState {
  const { bounds } = savedState;
  if (bounds && displays.some((display) => isContainedIn(bounds, display))) return savedState;
  return {
    ...savedState,
    bounds: {
      x: primaryDisplay.bounds.x,
      y: primaryDisplay.bounds.y,
      width: DEFAULT_WINDOW_WIDTH,
      height: DEFAULT_WINDOW_HEIGHT,
    },
    displayBounds: { ...primaryDisplay.bounds },
  };
}
