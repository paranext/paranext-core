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
  };
}

/**
 * How long after a window reaches a different display its placement stays untrusted.
 *
 * Longer than the capture debounce on purpose. The debounce answers "has the user stopped moving
 * the window"; this answers "has the platform finished agreeing with itself about the window's
 * scale", which outlasts the movement. See {@link areCapturedBoundsTrustworthy}.
 */
export const DISPLAY_SETTLE_MS = 500;

/** A display the trustworthiness check can tell apart from its neighbours */
export type IdentifiedDisplayLike = DisplayLike & { id: number };

/**
 * Whether a window's current placement is safe to persist.
 *
 * While a window spans the boundary between two displays with different scale factors, Windows and
 * Chromium report different answers for its DPI — Win32 keeps the scale the window is crossing FROM
 * while the window is already resolved onto the display it is crossing TO — so the window is
 * physically about 25% larger than the layout it holds. The state is harmless to look at and clears
 * itself, but a placement captured during it and restored later brings the window back at the wrong
 * size.
 *
 * Two moments are refused, and the second is the one that actually corrupts anything:
 *
 * - Bounds lying in no single display: the window is straddling. Restoring these would be refused
 *   anyway by {@link ensureBoundsVisibleOnSomeDisplay}, which requires containment in one display —
 *   so this half only avoids replacing a good placement with one already known to be unusable.
 * - Bounds on a display the window has just reached, before {@link DISPLAY_SETTLE_MS} has passed.
 *   These pass containment and would be restored, and they are the ones that come back wrong: the
 *   geometry has landed while the two DPI answers have not yet met.
 *
 * A window moved within one display crosses nothing and is trusted at once, which is what keeps
 * this from quietly freezing every saved placement.
 *
 * @param bounds Placement captured just now
 * @param displays Displays connected right now
 * @param lastAcceptedDisplayId Display the last accepted capture was on, or `undefined` if none has
 *   been accepted this session
 * @param msSinceDisplayChange How long the window has been on the display it is on now
 * @returns Whether the placement can be persisted
 */
/**
 * What a window's capture remembers about which display it is on, and since when.
 *
 * Keyed on the display the bounds lie fully WITHIN — the same question
 * {@link areCapturedBoundsTrustworthy} asks — and `undefined` while they lie in none, which is the
 * straddle. Anything looser starts the settle clock while the window is still crossing.
 */
export type DisplaySettleState = {
  /** Display the bounds lie fully within, or `undefined` while they lie in none */
  displayId: number | undefined;
  /** When the window was first seen in that state */
  since: number;
};

/**
 * Advance a window's settle state for the placement just captured.
 *
 * The clock this returns is what {@link areCapturedBoundsTrustworthy} measures against, so the two
 * have to agree about what "a different display" means. They agree by construction here: both ask
 * which display the bounds lie fully WITHIN. Keyed off the nearest display instead — Electron's
 * `getDisplayMatching`, which flips once the window merely overlaps the new display more than the
 * old — the clock would start around the halfway point of a crossing rather than at its end, and a
 * drag the user rests mid-crossing for longer than {@link DISPLAY_SETTLE_MS} would land with the
 * settle period already spent. The capture taken at that moment is exactly the one the guard exists
 * to refuse.
 *
 * A straddle is a state of its own (`displayId` `undefined`), not a continuation of the display
 * being left, so landing is always a change and always restarts the clock.
 *
 * @param bounds Placement captured just now
 * @param displays Displays connected right now
 * @param previous State the last capture returned
 * @param now Time of this capture
 * @returns `previous` unchanged while the window stays where it was, or a state starting the clock
 *   at `now`
 */
export function trackDisplaySettle(
  bounds: WindowRectangle,
  displays: readonly IdentifiedDisplayLike[],
  previous: DisplaySettleState,
  now: number,
): DisplaySettleState {
  const displayId = displays.find((display) => isContainedIn(bounds, display))?.id;
  return displayId === previous.displayId ? previous : { displayId, since: now };
}

export function areCapturedBoundsTrustworthy(
  bounds: WindowRectangle,
  displays: readonly IdentifiedDisplayLike[],
  lastAcceptedDisplayId: number | undefined,
  msSinceDisplayChange: number,
): boolean {
  const containingDisplay = displays.find((display) => isContainedIn(bounds, display));
  if (!containingDisplay) return false;
  if (lastAcceptedDisplayId === undefined) return true;
  if (containingDisplay.id === lastAcceptedDisplayId) return true;
  return msSinceDisplayChange >= DISPLAY_SETTLE_MS;
}
