/**
 * Owns the persisted window-layouts structure: which windows exist, each window's dock layout, and
 * each window's bounds. The structure lives in `window-layouts.json` in the app's user data folder
 * and is read and written ONLY by the main process — renderers get and push their layout through
 * the `windowLayout:get`/`windowLayout:save` request handlers registered here.
 *
 * Identity model: a window's position in the structure's list IS its identity across sessions;
 * Electron window ids are runtime-only and are never persisted. At startup the caller assigns file
 * entries to freshly created windows in order; at save time the live windows are written back out.
 * A file entry that was never assigned to a window (e.g. a power-mode secondary window while the
 * app runs in simple mode, which restores only the main window) is preserved in place, so a session
 * that restores fewer windows than the file holds can never destroy the other windows' entries.
 */

import path from 'path';
import { readFile, rename, writeFile } from 'fs/promises';
import { app } from 'electron';
import {
  GET_WINDOW_LAYOUT_REQUEST_TYPE,
  SAVE_WINDOW_LAYOUT_REQUEST_TYPE,
  WindowBoundsState,
  WindowLayoutEntry,
  WindowLayoutGetResponse,
  WindowLayoutStructure,
  WindowRectangle,
} from '@shared/data/window-layout-persistence.model';
import type { LayoutInfo } from '@shared/models/docking-framework.model';
import { logger } from '@shared/services/logger.service';
import * as networkService from '@shared/services/network.service';
import {
  reconcileSavedLayout,
  savedLayoutHasAnyTabs,
  savedLayoutHasViewableTabs,
} from '@shared/utils/saved-layout-reconciliation.util';
import { getErrorMessage } from 'platform-bible-utils';

/** File holding the persisted structure, in the app's user data folder */
const WINDOW_LAYOUTS_FILE_NAME = 'window-layouts.json';

/**
 * File the previous single-window bounds keeper (electron-window-state) maintained. Read once so an
 * upgrade keeps the user's window placement; never written or deleted by this service.
 */
const LEGACY_WINDOW_STATE_FILE_NAME = 'window-state.json';

/** How long to coalesce updates before writing the structure to disk */
const WRITE_DEBOUNCE_MS = 500;

/**
 * What startup (or macOS re-activation) should create:
 *
 * - `restore`: one window per entry — or only the `mainEntryIndex` entry's window in simple interface
 *   mode, leaving the other entries preserved in the file.
 * - `legacy`: no usable structure exists — one window whose renderer falls back to the
 *   pre-multi-window saved layout, placed at the previous keeper's bounds if it left any.
 */
export type StartupWindowsPlan =
  | { kind: 'restore'; entries: readonly WindowLayoutEntry[]; mainEntryIndex: number }
  | { kind: 'legacy'; boundsState?: WindowBoundsState };

/** A file entry and, once startup assigns it, the runtime window living in it */
type FileSlot = { entry: WindowLayoutEntry; windowId?: number };

/** Live state of one tracked window, written out at save time */
type TrackedWindow = {
  windowId: number;
  layout?: LayoutInfo;
  boundsState: WindowBoundsState;
  /**
   * Whether this window should fall back to the legacy (pre-multi-window) saved layout when it has
   * no layout of its own: the single window of a legacy startup, or the MAIN entry when it has
   * never captured a layout (a structure file created by bounds updates alone — e.g. simple-mode
   * sessions — while the user's power layout still lives only in the renderer's unprefixed
   * localStorage). Never a secondary entry: layout-less there means a deliberately empty window,
   * which must stay empty rather than cloning the legacy layout.
   */
  usesLegacyLayout: boolean;
  /**
   * Whether the window itself is gone while its state is deliberately kept — the app was going
   * down, so the writes still queued must be able to build this window's entry from it.
   *
   * Runtime window ids are reused, so this is what separates "this id is already tracked" from
   * "this id belonged to a window that has departed": a new window taking the id back is tracked
   * afresh instead of inheriting the departed window's layout and bounds.
   */
  hasGoneAway?: boolean;
};

/** File entries in file order; unassigned slots are preserved verbatim at save time */
let fileSlots: FileSlot[] = [];
/** Index into {@link fileSlots} of the main entry, so only that entry may use the legacy fallback */
let mainSlotIndex: number | undefined;
/** Live windows in creation order */
let trackedWindows: TrackedWindow[] = [];
/** Windows created to receive specific content, until their first layout push arrives */
const pendingContentWindowIds = new Set<number>();
/** Window whose entry the save walk marks `isMain` */
let mainWindowId: number | undefined;
/** Bounds the previous keeper saved, seeded into the legacy window so an upgrade keeps placement */
let legacyBoundsState: WindowBoundsState | undefined;
/** Pending debounced write, if any */
let writeTimeout: ReturnType<typeof setTimeout> | undefined;
/** Serializes disk writes so a debounced write and a writeNow can never interleave on the file */
let writeChain: Promise<void> = Promise.resolve();

function getWindowLayoutsFilePath(): string {
  return path.join(app.getPath('userData'), WINDOW_LAYOUTS_FILE_NAME);
}

function isFileNotFound(error: unknown): boolean {
  return !!error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT';
}

/** View parsed JSON as an indexable record if it is object-shaped at all */
function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== 'object') return undefined;
  // Parsed JSON data; crossing from `object` to the indexable shape only adds property reads that
  // are each validated below
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return value as Record<string, unknown>;
}

function parseRectangle(value: unknown): WindowRectangle | undefined {
  const record = asRecord(value);
  if (!record) return undefined;
  const { x, y, width, height } = record;
  if (
    typeof x !== 'number' ||
    typeof y !== 'number' ||
    typeof width !== 'number' ||
    typeof height !== 'number'
  )
    return undefined;
  return { x, y, width, height };
}

/** Read the bounds-state fields off a parsed record. Falsy/absent flags are omitted, not `false` */
function parseBoundsState(
  record: Record<string, unknown>,
  boundsSource: unknown,
): WindowBoundsState {
  return {
    bounds: parseRectangle(boundsSource),
    isMaximized: record.isMaximized === true ? true : undefined,
    isFullScreen: record.isFullScreen === true ? true : undefined,
    displayBounds: parseRectangle(record.displayBounds),
  };
}

/**
 * A parsed file entry plus whether its layout structurally held any tabs BEFORE reconciliation —
 * the discriminator between a legitimately empty window (no tabs as saved: restore it) and junk
 * (tabs saved but none viewable: drop it). See the filter in {@link loadWindowLayouts}.
 */
type ParsedEntry = { entry: WindowLayoutEntry; layoutHadTabs: boolean };

function parseEntry(value: unknown): ParsedEntry | undefined {
  const record = asRecord(value);
  if (!record) return undefined;
  const layout = asRecord(record.layout);
  return {
    entry: {
      ...parseBoundsState(record, record.bounds),
      // Reconcile at load so phantom content in a saved layout never reaches a window
      layout: layout ? reconcileSavedLayout(layout) : undefined,
      isMain: record.isMain === true ? true : undefined,
    },
    layoutHadTabs: layout ? savedLayoutHasAnyTabs(layout) : false,
  };
}

/** Entries from the structure file, or undefined when it is unreadable */
function parseStructure(raw: string): ParsedEntry[] | undefined {
  try {
    const record = asRecord(JSON.parse(raw));
    if (!record || !Array.isArray(record.windows)) return undefined;
    return record.windows
      .map(parseEntry)
      .filter((parsed): parsed is ParsedEntry => parsed !== undefined);
  } catch {
    return undefined;
  }
}

/** Bounds the previous single-window keeper saved, if its file exists and is readable */
async function readLegacyWindowState(): Promise<WindowBoundsState | undefined> {
  try {
    const raw = await readFile(
      path.join(app.getPath('userData'), LEGACY_WINDOW_STATE_FILE_NAME),
      'utf8',
    );
    const record = asRecord(JSON.parse(raw));
    if (!record) return undefined;
    // The keeper stored the window bounds as top-level x/y/width/height
    return parseBoundsState(record, record);
  } catch (error) {
    if (!isFileNotFound(error))
      logger.warn(
        `Could not read legacy ${LEGACY_WINDOW_STATE_FILE_NAME}: ${getErrorMessage(error)}`,
      );
    return undefined;
  }
}

function findTrackedWindow(windowId: number): TrackedWindow | undefined {
  return trackedWindows.find((tracked) => tracked.windowId === windowId);
}

/** Cancel the pending debounced write, if any */
function cancelScheduledWrite(): void {
  if (writeTimeout) {
    clearTimeout(writeTimeout);
    writeTimeout = undefined;
  }
}

/**
 * Read the persisted structure and report what startup should create. Resets all in-memory
 * tracking, so call it only while no windows are open (app startup, or macOS re-activation after
 * the last window closed).
 *
 * Entries whose saved layout HAD tabs but has none viewable after reconciliation are dropped here —
 * such phantom-only junk must not resurrect a window. An entry saved with no tabs at all (or no
 * layout) is different: that is a window that was legitimately open and empty when the structure
 * was written, and it IS restored — quitting with an empty second window open must bring it back.
 * The main entry is always kept, since the app always opens at least one window.
 */
export async function loadWindowLayouts(): Promise<StartupWindowsPlan> {
  cancelScheduledWrite();
  // A flush can still be draining when this runs (macOS: re-activation right after the last
  // window's quit-like close flushed the structure); read only after it lands, or the plan would
  // be built from the previous file contents.
  await writeChain;
  fileSlots = [];
  mainSlotIndex = undefined;
  trackedWindows = [];
  mainWindowId = undefined;
  legacyBoundsState = undefined;
  pendingContentWindowIds.clear();

  let raw: string | undefined;
  try {
    raw = await readFile(getWindowLayoutsFilePath(), 'utf8');
  } catch (error) {
    if (!isFileNotFound(error))
      logger.warn(`Could not read ${WINDOW_LAYOUTS_FILE_NAME}: ${getErrorMessage(error)}`);
  }
  if (raw !== undefined) {
    const parsedEntries = parseStructure(raw);
    if (parsedEntries && parsedEntries.length > 0) {
      const flaggedMainIndex = parsedEntries.findIndex(({ entry }) => entry.isMain === true);
      const mainIndex = flaggedMainIndex >= 0 ? flaggedMainIndex : 0;
      const keptParsedEntries = parsedEntries.filter(
        ({ entry, layoutHadTabs }, index) =>
          index === mainIndex ||
          !layoutHadTabs ||
          (entry.layout !== undefined && savedLayoutHasViewableTabs(entry.layout)),
      );
      const keptEntries = keptParsedEntries.map(({ entry }) => entry);
      mainSlotIndex = keptParsedEntries.indexOf(parsedEntries[mainIndex]);
      fileSlots = keptEntries.map((entry) => ({ entry }));
      return {
        kind: 'restore',
        entries: keptEntries,
        mainEntryIndex: mainSlotIndex,
      };
    }
    logger.warn(
      `${WINDOW_LAYOUTS_FILE_NAME} is unreadable or holds no windows; restoring a single legacy window`,
    );
  }

  legacyBoundsState = await readLegacyWindowState();
  return { kind: 'legacy', boundsState: legacyBoundsState };
}

/** The bounds-state slice of a file entry, seeding a freshly assigned window's live state */
function boundsStateOfEntry(entry: WindowLayoutEntry): WindowBoundsState {
  return {
    bounds: entry.bounds,
    isMaximized: entry.isMaximized,
    isFullScreen: entry.isFullScreen,
    displayBounds: entry.displayBounds,
  };
}

/**
 * Tie a freshly created window to the file entry it restores. The window's live state seeds from
 * the entry, so a session that never updates it writes the entry back out unchanged.
 */
export function assignEntryToWindow(windowId: number, entryIndex: number): void {
  const slot = fileSlots[entryIndex];
  if (!slot || slot.windowId !== undefined || findTrackedWindow(windowId)) {
    logger.warn(
      `Cannot assign window ${windowId} to window-layout entry ${entryIndex}; tracking it as a new window instead`,
    );
    trackNewWindow(windowId);
    return;
  }
  slot.windowId = windowId;
  trackedWindows.push({
    windowId,
    layout: slot.entry.layout,
    boundsState: boundsStateOfEntry(slot.entry),
    // Only the MAIN entry may fall back to the legacy saved layout when it never captured one —
    // see TrackedWindow.usesLegacyLayout. A layout-less secondary entry is an empty window and
    // must stay empty: falling back would clone the pre-multi-window layout into it.
    usesLegacyLayout: slot.entry.layout === undefined && entryIndex === mainSlotIndex,
  });
}

/**
 * Track the single window of a legacy startup (no structure file). Its renderer falls back to the
 * pre-multi-window saved layout, and its bounds seed from the previous keeper's file so an upgrade
 * keeps the user's window placement.
 */
export function trackLegacyWindow(windowId: number): void {
  if (findTrackedWindow(windowId)) return;
  trackedWindows.push({
    windowId,
    boundsState: legacyBoundsState ? { ...legacyBoundsState } : {},
    usesLegacyLayout: true,
  });
}

/** Track a window created mid-session. It has no saved entry, so it starts with an empty layout */
export function trackNewWindow(windowId: number): void {
  const tracked = findTrackedWindow(windowId);
  // A departed window's state is kept for writes still queued behind it, and runtime ids are
  // reused, so an id can be tracked by a window that no longer exists. This window is not that one
  // and must not inherit what it held.
  if (tracked?.hasGoneAway) {
    trackedWindows = trackedWindows.filter((candidate) => candidate !== tracked);
    fileSlots = fileSlots.filter((slot) => slot.windowId !== windowId);
  } else if (tracked) return;
  trackedWindows.push({ windowId, boundsState: {}, usesLegacyLayout: false });
}

/** Record which window's entry the save walk should mark `isMain` */
export function setMainWindowId(windowId: number): void {
  mainWindowId = windowId;
}

/** Merge captured bounds into a window's live state and schedule a write */
export function updateWindowBounds(windowId: number, boundsState: WindowBoundsState): void {
  const tracked = findTrackedWindow(windowId);
  if (!tracked) {
    logger.warn(`Ignoring bounds update for untracked window ${windowId}`);
    return;
  }
  tracked.boundsState = {
    // Bounds are captured only while the window is in its normal state; a maximized/minimized/
    // full-screen capture carries no bounds and must keep the last normal placement
    bounds: boundsState.bounds ?? tracked.boundsState.bounds,
    displayBounds: boundsState.displayBounds ?? tracked.boundsState.displayBounds,
    isMaximized: boundsState.isMaximized ?? tracked.boundsState.isMaximized,
    isFullScreen: boundsState.isFullScreen ?? tracked.boundsState.isFullScreen,
  };
  scheduleWrite();
}

/**
 * What a window going away means for its entry in the persisted structure.
 *
 * - `entry-goes-with-it`: the user closed this window while the app stays up, so it must not come
 *   back next session.
 * - `entry-stays`: the window is going down with the app, so it is not leaving the structure — it has
 *   to be there next session, holding whatever it held when the app went down.
 */
export type RemovedWindowDisposition = 'entry-goes-with-it' | 'entry-stays';

/**
 * Stop tracking a window that is gone. This alone does not write — a caller that wants the smaller
 * structure written (a deliberate close) calls {@link writeNow} itself.
 *
 * `entry-stays` keeps the window's live state exactly where it is rather than clearing it. The
 * state is what a write BUILDS FROM, and writes build when they execute, not when they are enqueued
 * (see {@link enqueueWrite}) — so on a multi-window shutdown each window's flush is still queued
 * behind the ones before it when that window's own `closed` handling runs. Clearing here would take
 * the window out of every flush still waiting its turn, including the last one, which is the write
 * that survives on disk. The state is dropped when the next {@link loadWindowLayouts} resets it, or
 * with the process.
 *
 * @param windowId Window that has gone away
 * @param disposition What that means for the window's entry — see {@link RemovedWindowDisposition}
 */
export function handleWindowRemoved(windowId: number, disposition: RemovedWindowDisposition): void {
  // Unconditional, whatever the disposition and whether or not the id is one being tracked: a write
  // scheduled before the removal fires into a session that is either rewriting the structure itself
  // (a deliberate close) or on its way down, and neither wants a debounce landing behind it.
  cancelScheduledWrite();
  // Whatever the disposition: no write reads this mark — a queued write builds an entry from
  // `layout` and `boundsState` alone — and a window that has gone away is not waiting for content.
  // Left set, it is inherited by whatever window takes this runtime id next.
  pendingContentWindowIds.delete(windowId);
  if (disposition === 'entry-stays') {
    // The state stays for the queued writes to build from, but the window itself is gone. Recording
    // that is what lets a window taking this runtime id back be tracked as the new window it is,
    // rather than being waved through as already tracked and adopting what the departed one held.
    const tracked = findTrackedWindow(windowId);
    if (tracked) tracked.hasGoneAway = true;
    return;
  }
  trackedWindows = trackedWindows.filter((tracked) => tracked.windowId !== windowId);
  fileSlots = fileSlots.filter((slot) => slot.windowId !== windowId);
}

/** A window's live state as a file entry */
function entryForTrackedWindow(tracked: TrackedWindow): WindowLayoutEntry {
  return { layout: tracked.layout, ...tracked.boundsState };
}

/**
 * The structure as it should be written right now: every file slot in file order — a slot's live
 * window state when its window is live, the preserved entry when the slot was never assigned this
 * session, nothing when its window was removed — then every live window that has no slot (opened
 * mid-session), in the given order. Exactly one entry ends up marked `isMain`: the tracked main
 * window's, falling back to the first entry when the main window is gone.
 */
function buildStructure(windowIdsInOrder: readonly number[]): WindowLayoutStructure {
  const liveIds = new Set(windowIdsInOrder);
  const built: { entry: WindowLayoutEntry; windowId?: number }[] = [];
  fileSlots.forEach((slot) => {
    if (slot.windowId === undefined) {
      built.push({ entry: { ...slot.entry } });
      return;
    }
    if (!liveIds.has(slot.windowId)) return;
    const tracked = findTrackedWindow(slot.windowId);
    if (tracked) built.push({ entry: entryForTrackedWindow(tracked), windowId: slot.windowId });
  });
  const slottedWindowIds = new Set(
    fileSlots.map((slot) => slot.windowId).filter((id) => id !== undefined),
  );
  windowIdsInOrder.forEach((windowId) => {
    if (slottedWindowIds.has(windowId)) return;
    const tracked = findTrackedWindow(windowId);
    if (tracked) built.push({ entry: entryForTrackedWindow(tracked), windowId });
  });

  built.forEach(({ entry }) => {
    delete entry.isMain;
  });
  const mainBuilt =
    built.find(({ windowId }) => windowId !== undefined && windowId === mainWindowId) ?? built[0];
  if (mainBuilt) mainBuilt.entry.isMain = true;

  return { windows: built.map(({ entry }) => entry) };
}

/**
 * Write the structure to disk. Throws on failure; {@link enqueueWrite} is the single place that
 * catches, so that one boundary covers building the structure as well as writing it.
 */
async function writeStructureToDisk(structure: WindowLayoutStructure): Promise<void> {
  const filePath = getWindowLayoutsFilePath();
  // Write to a temp file and rename over the real one so a crash mid-write cannot leave a
  // torn (unparseable) structure behind
  const tempPath = `${filePath}.tmp`;
  await writeFile(tempPath, JSON.stringify(structure), 'utf8');
  await rename(tempPath, filePath);
}

/**
 * Queue a write of the structure behind any write already in flight. The structure is built when
 * the write EXECUTES, not when it is enqueued, so state that changes while earlier writes drain —
 * e.g. a layout pushed while a quit-time flush waits its turn — still lands in the write. Only the
 * window list is pinned at enqueue time: which windows a write covers is the caller's decision (see
 * {@link writeNow}), while their state should be the freshest available.
 *
 * The flip side of building late: a pinned window whose state has GONE by then is silently left out
 * of the write, however firmly the caller pinned it. State a queued write still needs has to
 * outlive it — which is what {@link handleWindowRemoved}'s `entry-stays` disposition is for.
 */
function enqueueWrite(windowIdsInOrder: readonly number[]): Promise<void> {
  const windowIds = [...windowIdsInOrder];
  writeChain = writeChain
    .then(() => writeStructureToDisk(buildStructure(windowIds)))
    // The one error boundary for persistence, deliberately placed here rather than inside
    // `writeStructureToDisk` so that it also covers `buildStructure`. It is what keeps a failure
    // from spreading: every later write chains off this promise, so a rejection left here would
    // skip persistence for the rest of the session, and `writeNow`'s callers — the quit path among
    // them — would see a rejection from a service that must never be able to break the app.
    // Catching resolves the chain again, so the next write starts from a clean one.
    .catch((error) => {
      logger.warn(`Failed to write ${WINDOW_LAYOUTS_FILE_NAME}: ${getErrorMessage(error)}`);
    });
  return writeChain;
}

/** Schedule a debounced write of the currently tracked windows */
function scheduleWrite(): void {
  if (writeTimeout) clearTimeout(writeTimeout);
  writeTimeout = setTimeout(() => {
    writeTimeout = undefined;
    enqueueWrite(trackedWindows.map((tracked) => tracked.windowId));
  }, WRITE_DEBOUNCE_MS);
}

/**
 * Write the structure for the given live windows immediately, absorbing any pending debounced
 * write. Callers pass the windows that should survive in the file: all still-tracked windows when
 * the app is going down, or the remaining windows after one was deliberately closed.
 */
export async function writeNow(windowIdsInOrder: readonly number[]): Promise<void> {
  cancelScheduledWrite();
  return enqueueWrite(windowIdsInOrder);
}

/**
 * Told whenever a window's pending-content mark changes. Wired by `main.ts` during startup, before
 * any window exists; until then, nothing listens — see {@link setPendingContentChangeListener}.
 */
let handlePendingContentChanged: () => void = () => {};

/**
 * Wire the listener told when a pending-content mark changes.
 *
 * The mark is one of the routing target's inputs — a window still waiting for its content is passed
 * over for new work — but it lives here rather than with the window tracker, which reads it through
 * an injected predicate so it does not import this service. That leaves the tracker with nothing to
 * notice a window gaining or losing the mark, so the change is announced from this side instead.
 */
export function setPendingContentChangeListener(listener: () => void): void {
  handlePendingContentChanged = listener;
}

/**
 * Mark a window as created-for-content: its layout get answers `pending-content` (start truly
 * empty) until the window pushes its first real layout.
 */
export function markWindowPendingContent(windowId: number): void {
  pendingContentWindowIds.add(windowId);
  handlePendingContentChanged();
}

/**
 * Un-mark a pending-content window: its routed content has arrived (or its creator gave up), so
 * from now on it restores like any other window.
 */
export function clearWindowPendingContent(windowId: number): void {
  pendingContentWindowIds.delete(windowId);
  handlePendingContentChanged();
}

/**
 * Whether a window is currently marked created-for-content — see {@link markWindowPendingContent}.
 *
 * Exists so the main-process last-window-emptiness decision can exclude these windows from its
 * count: a pending-content window starts truly empty and is not yet a real window, and the very
 * operation that created it (a `{ type: 'window' }` open, or a move-to-new-window) can still fail
 * and take it away again. Letting it stand in as "the last window" would leave the app with zero
 * windows the instant that failure path runs.
 */
export function isWindowPendingContent(windowId: number): boolean {
  return pendingContentWindowIds.has(windowId);
}

function handleGetLayoutRequest(windowId: unknown): WindowLayoutGetResponse {
  if (typeof windowId !== 'number') {
    logger.warn(`${GET_WINDOW_LAYOUT_REQUEST_TYPE} called without a window id`);
    return { kind: 'empty' };
  }
  const tracked = findTrackedWindow(windowId);
  if (!tracked) {
    logger.warn(`${GET_WINDOW_LAYOUT_REQUEST_TYPE} called for untracked window ${windowId}`);
    return { kind: 'empty' };
  }
  if (pendingContentWindowIds.has(windowId)) return { kind: 'pending-content' };
  if (tracked.layout) return { kind: 'entry', layout: tracked.layout };
  if (tracked.usesLegacyLayout) return { kind: 'legacy' };
  return { kind: 'empty' };
}

function handleSaveLayoutRequest(windowId: unknown, layout: unknown): void {
  if (typeof windowId !== 'number') {
    logger.warn(`${SAVE_WINDOW_LAYOUT_REQUEST_TYPE} called without a window id`);
    return;
  }
  const layoutRecord = asRecord(layout);
  if (!layoutRecord) {
    logger.warn(`${SAVE_WINDOW_LAYOUT_REQUEST_TYPE} called without a layout (window ${windowId})`);
    return;
  }
  const tracked = findTrackedWindow(windowId);
  if (!tracked) {
    logger.warn(`Ignoring layout push from untracked window ${windowId}`);
    return;
  }
  // Reconcile on arrival so phantom content (duplicate or orphaned tabs, empty panels) cannot
  // enter the persisted structure even when a pusher skipped its own reconciliation
  tracked.layout = reconcileSavedLayout(layoutRecord);
  // This push is the window's real content arriving, so it stops being pending-content — a
  // second get request must be answered with the entry it just saved, not told to wait again.
  // Announced like any other change to the mark: the window becomes one routed work can go to.
  if (pendingContentWindowIds.delete(windowId)) handlePendingContentChanged();
  scheduleWrite();
}

/**
 * Register the `windowLayout:get`/`windowLayout:save` request handlers renderers use to load and
 * push their dock layouts. Must be called during main process startup, before any window is
 * created, so a renderer can never race the registration.
 */
export async function initializeWindowLayoutPersistence(): Promise<void> {
  await Promise.all([
    networkService.registerRequestHandler(
      GET_WINDOW_LAYOUT_REQUEST_TYPE,
      async (...args) => handleGetLayoutRequest(args[0]),
      {
        method: {
          // Internal plumbing between the main process and each renderer, but it is a registered
          // name and appears in the OpenRPC document either way. Experimental: how a window's
          // layout is addressed and what it is told to restore are both still moving.
          'x-experimental': true,
          summary: 'Get the dock layout saved for a window, or what it should start with instead',
          params: [
            {
              name: 'windowId',
              required: true,
              summary: 'Electron BrowserWindow ID of the window asking what to restore',
              schema: { type: 'number' },
            },
          ],
          result: {
            name: 'return value',
            summary:
              "The window's saved layout, the pre-multi-window layout to fall back to, or nothing to restore",
            schema: { type: 'object' },
          },
        },
      },
    ),
    networkService.registerRequestHandler(
      SAVE_WINDOW_LAYOUT_REQUEST_TYPE,
      async (...args) => handleSaveLayoutRequest(args[0], args[1]),
      {
        method: {
          'x-experimental': true,
          summary: "Push a window's current dock layout to the main process to be persisted",
          params: [
            {
              name: 'windowId',
              required: true,
              summary: 'Electron BrowserWindow ID of the window whose layout this is',
              schema: { type: 'number' },
            },
            {
              name: 'layout',
              required: true,
              summary: "The window's serialized dock layout",
              schema: { type: 'object' },
            },
          ],
          result: { name: 'return value', schema: { type: 'null' } },
        },
      },
    ),
  ]);
}
