/**
 * Request types and data shapes for persisting window layouts and bounds.
 *
 * INTERNAL PLUMBING between the main process (which owns the persisted structure on disk) and the
 * renderer's web view service shard (which loads and pushes this window's dock layout). This module
 * must only be imported by those two places — nothing here is part of the public `@papi/*` surface,
 * and importing it from anything that feeds `papi.d.ts` would leak it there.
 */

import type { LayoutInfo } from '@shared/models/docking-framework.model';
import { serializeRequestType } from '@shared/utils/util';

/** Prefix on requests related to window layout persistence */
const CATEGORY_WINDOW_LAYOUT = 'windowLayout';

/**
 * Request a window's saved dock layout from the main process. Takes the requesting window's id;
 * returns a {@link WindowLayoutGetResponse}.
 */
export const GET_WINDOW_LAYOUT_REQUEST_TYPE = serializeRequestType(CATEGORY_WINDOW_LAYOUT, 'get');

/**
 * Push a window's current dock layout to the main process for persistence. Takes the pushing
 * window's id and its serialized layout.
 */
export const SAVE_WINDOW_LAYOUT_REQUEST_TYPE = serializeRequestType(CATEGORY_WINDOW_LAYOUT, 'save');

/** Position and size of a window or display, in screen coordinates */
export type WindowRectangle = { x: number; y: number; width: number; height: number };

/**
 * Sizing and position state persisted for one window. `bounds` is the window's normal (unmaximized)
 * placement; `displayBounds` records the display those bounds were on, so a restore can tell when
 * that display is gone.
 */
export type WindowBoundsState = {
  bounds?: WindowRectangle;
  isMaximized?: boolean;
  isFullScreen?: boolean;
  displayBounds?: WindowRectangle;
};

/**
 * One window's saved state in the persisted structure. Position in the structure's list is the
 * window's identity across sessions — window ids stay runtime-only. Exactly one entry carries
 * `isMain` (the window with the top-level menu and close-quits behavior).
 */
export type WindowLayoutEntry = WindowBoundsState & {
  layout?: LayoutInfo;
  isMain?: boolean;
};

/** The whole persisted structure: every window's saved state, in creation order */
export type WindowLayoutStructure = { windows: WindowLayoutEntry[] };

/**
 * What a window should restore, per the main process:
 *
 * - `entry`: the layout saved for this window. A saved layout that reconciled down to nothing still
 *   comes back this way — an emptied `dockbox` is an entry, not `empty`.
 * - `legacy`: fall back to the pre-multi-window layout under the unprefixed localStorage key. Only
 *   two windows are ever told this: the single window of a legacy startup (no structure file at
 *   all), and the MAIN entry's window when that entry has never captured a layout (a structure
 *   written by bounds updates alone, while the user's power layout still lives only in the
 *   renderer's localStorage). A SECONDARY entry that never captured a layout gets `empty` instead;
 *   falling back there would clone the legacy layout into it.
 * - `empty`: start with an empty dock layout — a window opened mid-session (no saved entry), or a
 *   restored secondary entry with no usable `layout` (the key is absent, meaning a bounds-only
 *   entry for a deliberately empty window, or its stored value is not object-shaped). It is also
 *   the defensive answer to a request that carries no window id or names a window that is not
 *   tracked.
 *
 * An entry whose saved layout held only phantom tabs produces none of these: it is dropped while
 * the structure loads, so no window is ever created to ask. The one exception is the main entry,
 * which is always restored — its window is told `entry`, carrying whatever reconciliation left of
 * the layout.
 */
export type WindowLayoutGetResponse =
  | { kind: 'entry'; layout: LayoutInfo }
  | { kind: 'legacy' }
  | { kind: 'empty' };
