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

/**
 * Ask which of the given window ids no longer have an entry in the persisted structure. Takes the
 * window ids a renderer holds stored state for; returns the subset that is dead.
 *
 * Asked rather than worked out in the renderer because only the main process holds the structure,
 * and because a renderer filtering against a snapshot it fetched would race a window created while
 * that snapshot was in flight. The main process answers from the structure as it stands at that
 * moment, and a window id is never reissued, so an id it calls dead cannot come back.
 */
export const FILTER_DEAD_WINDOW_IDS_REQUEST_TYPE = serializeRequestType(
  CATEGORY_WINDOW_LAYOUT,
  'filterDeadWindowIds',
);

/**
 * Report that a window's dock became empty (or that it started that way) and learn what it should
 * do about it. Takes the reporting window's id and a {@link WindowEmptiedReason}; returns a
 * {@link WindowEmptiedResponse}.
 */
export const WINDOW_EMPTIED_REQUEST_TYPE = serializeRequestType(CATEGORY_WINDOW_LAYOUT, 'emptied');

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
 * window's identity across sessions; a window id is not persisted here. At most one entry carries
 * `isMain` (the window with the top-level menu and close-quits behavior). The flag belongs to the
 * entry, so a structure written after the main entry left with its window carries none at all;
 * loading resolves that back to exactly one by taking the first entry.
 */
export type WindowLayoutEntry = WindowBoundsState & {
  /**
   * The window's durable platform id: minted when the entry is first created and never changed
   * afterwards, even across restarts. This is what per-window renderer state (web view state) is
   * keyed by, so a restored window finds what it saved last time. Carried to the restoring window
   * via the ordinary `WINDOW_ID` query parameter — `main.ts` hands this same value to `addWindow`
   * as the id to reuse, rather than minting a fresh one, so the id a restored window is given
   * always matches the one its entry carries.
   *
   * Deliberately NOT the entry's position in the list: entries are dropped when their window leaves
   * the structure, so a position can silently come to mean a neighbouring entry's state.
   *
   * @experimental This field is unstable and may change or disappear without notice
   */
  windowId: string;
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
 * - `pending-content`: like `empty`, but also skip the default-layout supplement — the window was
 *   created to receive one specific web view, routed separately, and must start with nothing else.
 *
 * The window's own id — what its renderer keys per-window storage by — is not part of this answer:
 * it is settled when the window is tracked, before its first load, and travels on the window's URL
 * (`WINDOW_ID`), so storage works before this request is ever made.
 *
 * An entry whose saved layout held only phantom tabs produces none of these: it is dropped while
 * the structure loads, so no window is ever created to ask. The one exception is the main entry,
 * which is always restored — its window is told `entry`, carrying whatever reconciliation left of
 * the layout.
 */
export type WindowLayoutGetResponse =
  | { kind: 'entry'; layout: LayoutInfo }
  | { kind: 'legacy' }
  | { kind: 'empty' }
  /**
   * This window was created to receive specific content that the main process is about to route to
   * it: start truly empty (no default tabs, no supplement) and wait
   */
  | { kind: 'pending-content' };

/**
 * Why a window is reporting itself empty:
 *
 * - `emptied-by-removal`: it held tabs and the last one was just removed.
 * - `born-empty`: it started with nothing to restore (a {@link WindowLayoutGetResponse} of `empty`)
 *   and stayed that way. A `pending-content` window never reports this: its load returns before the
 *   born-empty check, because the content it is waiting for is routed to it separately.
 */
export type WindowEmptiedReason = 'emptied-by-removal' | 'born-empty';

/**
 * What a window that reported itself empty should do, per the main process:
 *
 * - `open-home`: dock Home instead of staying empty. A window that started empty always gets this; an
 *   emptied one gets it too when closing it would exit the application — because it is the last
 *   window standing, or because it is the primary, whose only door out is its own ✕ or the Quit
 *   menu.
 * - `closing`: the main process is closing this window. Windows are equal siblings; one with nothing
 *   in it has nothing to be.
 * - `stay`: do nothing at all — see below.
 */
export type WindowEmptiedResponse =
  | { action: 'open-home' }
  | { action: 'closing' }
  /**
   * Content reached this window after it sent its report, so it is not empty any more and neither
   * other answer applies: docking Home would add a tab nobody asked for, and closing would take the
   * content that just arrived with it. The window keeps what it has and reports again if it empties
   * again.
   *
   * @experimental
   */
  | { action: 'stay' };
