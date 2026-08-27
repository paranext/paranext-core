/**
 * Owns the persisted window-layouts structure: which windows exist, each window's dock layout, and
 * each window's bounds. The structure lives in `window-layouts.json` in the app's user data folder
 * and is read and written ONLY by the main process — renderers get and push their layout through
 * the `windowLayout:get`/`windowLayout:save` request handlers registered here.
 *
 * Identity model: a window's position in the structure's list IS its identity across sessions —
 * position decides which saved layout and bounds a restored window gets — while the entry's
 * `slotId` names the same slot for the renderer state stored outside this file, because a position
 * shifts when an entry before it is dropped and stored state must not follow it to a neighbour.
 * Window ids are not what ties a slot to a window across a restart — an id is never handed out
 * twice, so a persisted one would name a window that no longer exists rather than the wrong one,
 * but the slot is what a restored window binds to. Every window has a slot in that list from the
 * moment it is created — a restored window binds to the slot it restores, a window opened
 * mid-session appends one — and the slot is the only place that window's layout and bounds live. A
 * slot with no window in it is a preserved entry: one this session never restored (a power-mode
 * secondary window while the app runs in simple mode, which restores only the main window), or one
 * whose window has gone down with the app. Either way it is written back out untouched, so a
 * session that holds fewer windows than the file holds entries can never destroy the others.
 *
 * A write is that list, in order. Nothing has to be joined to anything, and there is no second
 * account of which windows exist that a departure could leave stale.
 */

import path from 'path';
import { readFile, rename, writeFile } from 'fs/promises';
import { app } from 'electron';
import {
  FILTER_DEAD_WINDOW_SLOTS_REQUEST_TYPE,
  GET_WINDOW_LAYOUT_REQUEST_TYPE,
  SAVE_WINDOW_LAYOUT_REQUEST_TYPE,
  WindowBoundsState,
  WindowLayoutEntry,
  WindowLayoutGetResponse,
  WindowLayoutStructure,
  WindowRectangle,
} from '@shared/data/window-layout-persistence.model';
import { logger } from '@shared/services/logger.service';
import * as networkService from '@shared/services/network.service';
import {
  reconcileSavedLayout,
  savedLayoutHasAnyTabs,
  savedLayoutHasViewableTabs,
} from '@shared/utils/saved-layout-reconciliation.util';
import { getErrorMessage, newGuid } from 'platform-bible-utils';

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

/**
 * One window's entry in the persisted list, and the runtime window living in it. The entry holds
 * everything that gets written — layout, bounds, `isMain` — so a live window's state and a
 * preserved entry are the same thing, and updating one IS updating the other.
 *
 * `windowId` is absent for a preserved entry: a slot this session never restored, or one whose
 * window has gone away while its entry stays (see {@link handleWindowRemoved}).
 */
type FileSlot = {
  entry: WindowLayoutEntry;
  windowId?: string;
  /**
   * Whether this window should fall back to the legacy (pre-multi-window) saved layout when it has
   * no layout of its own: the single window of a legacy startup, or the MAIN entry when it has
   * never captured a layout (a structure file created by bounds updates alone — e.g. simple-mode
   * sessions — while the user's power layout still lives only in the renderer's unprefixed
   * localStorage). Never a secondary entry: layout-less there means a deliberately empty window,
   * which must stay empty rather than cloning the legacy layout.
   */
  usesLegacyLayout?: boolean;
};

/** Every window's entry in file order — the whole of what a write puts on disk */
let fileSlots: FileSlot[] = [];
/** Windows created to receive specific content, until their first layout push arrives */
const pendingContentWindowIds = new Set<string>();
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
type ParsedEntry = {
  entry: WindowLayoutEntry;
  layoutHadTabs: boolean;
  /**
   * Whether the entry had no slot id on disk and was given one here, which the file must catch up
   * with
   */
  wasSlotIdMinted: boolean;
};

function parseEntry(value: unknown): ParsedEntry | undefined {
  const record = asRecord(value);
  if (!record) return undefined;
  const layout = asRecord(record.layout);
  const slotIdOnDisk =
    typeof record.slotId === 'string' && record.slotId !== '' ? record.slotId : undefined;
  return {
    entry: {
      ...parseBoundsState(record, record.bounds),
      // An entry written before slots carried an identity gets one now. It is minted rather than
      // derived from the entry's position so it never changes once the file is rewritten.
      slotId: slotIdOnDisk ?? newGuid(),
      // Reconcile at load so phantom content in a saved layout never reaches a window
      layout: layout ? reconcileSavedLayout(layout) : undefined,
      isMain: record.isMain === true ? true : undefined,
    },
    layoutHadTabs: layout ? savedLayoutHasAnyTabs(layout) : false,
    wasSlotIdMinted: slotIdOnDisk === undefined,
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

/** The slot the given runtime window is living in, if this service knows the window at all */
function findSlotByWindowId(windowId: string): FileSlot | undefined {
  return fileSlots.find((slot) => slot.windowId === windowId);
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
      const mainEntryIndex = keptParsedEntries.indexOf(parsedEntries[mainIndex]);
      // Main-ness lives in the entry, here as much as on disk. A file whose entries carry no flag
      // at all — or more than one — is resolved to the single chosen entry right here, so this is
      // the only place the choice is ever made and everything after it just reads the flag.
      keptEntries.forEach((entry, index) => {
        if (index === mainEntryIndex) entry.isMain = true;
        else delete entry.isMain;
      });
      fileSlots = keptEntries.map((entry) => ({ entry }));
      // A slot id minted just now exists only here until the file carries it. Nothing else is
      // certain to write before the session ends — a bounds change, a layout push and a clean quit
      // all do, but a session that ends without any of them would mint again next launch and orphan
      // every blob the renderer stored under this one.
      if (keptParsedEntries.some(({ wasSlotIdMinted }) => wasSlotIdMinted)) scheduleWrite();
      return { kind: 'restore', entries: keptEntries, mainEntryIndex };
    }
    logger.warn(
      `${WINDOW_LAYOUTS_FILE_NAME} is unreadable or holds no windows; restoring a single legacy window`,
    );
  }

  legacyBoundsState = await readLegacyWindowState();
  return { kind: 'legacy', boundsState: legacyBoundsState };
}

/**
 * Tie a freshly created window to the file entry it restores. The entry is where that window's
 * layout and bounds live from here on, so a session that never updates it writes the entry back out
 * unchanged.
 */
export function assignEntryToWindow(windowId: string, entryIndex: number): void {
  const slot = fileSlots[entryIndex];
  if (!slot || slot.windowId !== undefined || findSlotByWindowId(windowId)) {
    logger.warn(
      `Cannot assign window ${windowId} to window-layout entry ${entryIndex}; tracking it as a new window instead`,
    );
    trackNewWindow(windowId);
    return;
  }
  slot.windowId = windowId;
  // Only the MAIN entry may fall back to the legacy saved layout when it never captured one — see
  // FileSlot.usesLegacyLayout. A layout-less secondary entry is an empty window and must stay
  // empty: falling back would clone the pre-multi-window layout into it.
  slot.usesLegacyLayout = slot.entry.layout === undefined && slot.entry.isMain === true;
}

/**
 * Give the single window of a legacy startup (no structure file) the first slot of a structure that
 * does not exist yet. Its renderer falls back to the pre-multi-window saved layout, and its bounds
 * seed from the previous keeper's file so an upgrade keeps the user's window placement.
 */
export function trackLegacyWindow(windowId: string): void {
  if (findSlotByWindowId(windowId)) return;
  fileSlots.push({
    entry: { ...legacyBoundsState, slotId: newGuid() },
    windowId,
    usesLegacyLayout: true,
  });
  // The slot id this just minted is what the window keys its state by, so the file has to carry it
  // before the session ends — see the same write after a load mints
  scheduleWrite();
}

/** Give a window created mid-session a slot. It has no saved entry, so it starts with an empty one */
export function trackNewWindow(windowId: string): void {
  if (findSlotByWindowId(windowId)) return;
  fileSlots.push({ entry: { slotId: newGuid() }, windowId });
  // As in `trackLegacyWindow`: a minted slot id is not real until the file carries it
  scheduleWrite();
}

/**
 * Get the id of the slot a window occupies — what its renderer keys per-window storage by. Every
 * window is tracked as it is created, ahead of its first load, so this is answerable for every
 * window that exists; asking about one that is not tracked is a programming error, not a state.
 *
 * @param windowId Platform id of a tracked window
 * @returns The stable slot id of that window's entry in the structure
 * @throws If no tracked window has that id
 */
export function getSlotIdOf(windowId: string): string {
  const slot = findSlotByWindowId(windowId);
  if (!slot) throw new Error(`Window ${windowId} is not tracked, so it has no layout slot`);
  return slot.entry.slotId;
}

/**
 * Record which window's entry is the main one — the entry simple mode restores next session, and
 * the only one allowed the legacy layout fallback.
 *
 * Main-ness is a property of the ENTRY, which is how it is persisted and how it is held here. It
 * therefore stays with that entry for the rest of the session however the window itself ends, and
 * leaves the structure only when the entry does.
 */
export function setMainWindowId(windowId: string): void {
  const mainSlot = findSlotByWindowId(windowId);
  if (!mainSlot) {
    logger.warn(`Ignoring the main-window mark for untracked window ${windowId}`);
    return;
  }
  fileSlots.forEach((slot) => {
    if (slot !== mainSlot) delete slot.entry.isMain;
  });
  mainSlot.entry.isMain = true;
}

/**
 * Which live window currently holds the main role, or `undefined` if none does.
 *
 * Undefined is a real answer, not only an error case: main-ness belongs to the entry rather than to
 * a window, so it outlives the window that held it and the role can sit on an entry with no window
 * living in it.
 */
export function getMainWindowId(): string | undefined {
  return fileSlots.find((slot) => slot.entry.isMain === true)?.windowId;
}

/**
 * Whether a window holds the primary role — the one whose ✕ decides whether the app quits.
 *
 * Answered from the persisted `isMain` slot rather than a second live pointer. The slot lets go of
 * its runtime id in {@link handleWindowRemoved}, which runs from a window's `closed` handler, one
 * event AFTER the `close` handler where the close path asks this — so the answer is still there
 * every time it is needed. And the primary never goes away while the app runs: an emptied primary
 * docks Home rather than closing, so only its own ✕ or a quit takes it down, and both of those
 * bring the whole app with them.
 *
 * @param windowId Window to check
 */
export function isPrimaryWindow(windowId: string): boolean {
  const mainWindowId = getMainWindowId();
  if (mainWindowId !== undefined) return mainWindowId === windowId;
  // No live window holds the marked entry. The startup restore always leaves one that does, so
  // reaching here means every window it created has gone and something else opened one — on macOS
  // the app stays resident with no windows, and an extension can call `platform.createWindow` into
  // that gap. Some live window has to answer for the app's lifetime, or nothing would ask before
  // closing and an emptied window would close itself; the oldest one does, matching the role the
  // restore would have given the window it created first.
  //
  // The flag itself deliberately does NOT move. It names the entry simple mode restores and the
  // only entry allowed the legacy layout fallback, so handing it to a window created into the gap
  // would cost the user that layout on the next launch.
  return fileSlots.find((slot) => slot.windowId !== undefined)?.windowId === windowId;
}

/** Merge captured bounds into a window's entry and schedule a write */
export function updateWindowBounds(windowId: string, boundsState: WindowBoundsState): void {
  const slot = findSlotByWindowId(windowId);
  if (!slot) {
    logger.warn(`Ignoring bounds update for untracked window ${windowId}`);
    return;
  }
  // Bounds are captured only while the window is in its normal state; a maximized/minimized/
  // full-screen capture carries no bounds and must keep the last normal placement
  slot.entry.bounds = boundsState.bounds ?? slot.entry.bounds;
  slot.entry.displayBounds = boundsState.displayBounds ?? slot.entry.displayBounds;
  slot.entry.isMaximized = boundsState.isMaximized ?? slot.entry.isMaximized;
  slot.entry.isFullScreen = boundsState.isFullScreen ?? slot.entry.isFullScreen;
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
 * Record that a window is gone. This alone does not write — a caller that wants the smaller
 * structure written (a deliberate close) calls {@link writeNow} itself.
 *
 * `entry-stays` only lets go of the runtime id, leaving the entry in place as a preserved one: the
 * same shape as an entry this session never restored, which every write already carries out
 * untouched. That is what a multi-window shutdown needs — writes build when they execute, not when
 * they are enqueued (see {@link enqueueWrite}), so each window's flush is still queued behind the
 * ones before it when that window's own `closed` handling runs, and the last flush is the one that
 * survives on disk.
 *
 * @param windowId Window that has gone away
 * @param disposition What that means for the window's entry — see {@link RemovedWindowDisposition}
 */
export function handleWindowRemoved(windowId: string, disposition: RemovedWindowDisposition): void {
  // Unconditional, whatever the disposition and whether or not the id is one this service knows: a
  // write scheduled before the removal fires into a session that is either rewriting the structure
  // itself (a deliberate close) or on its way down, and neither wants a debounce landing behind it.
  cancelScheduledWrite();
  // Whatever the disposition: no write reads this mark, a window that has gone away is not waiting
  // for content, and nothing else takes the mark off once its window is gone.
  pendingContentWindowIds.delete(windowId);
  const slotIndex = fileSlots.findIndex((slot) => slot.windowId === windowId);
  if (slotIndex < 0) return;
  if (disposition === 'entry-stays') fileSlots[slotIndex].windowId = undefined;
  else fileSlots.splice(slotIndex, 1);
}

/**
 * The structure as it should be written right now: every slot's entry, in file order — the entry a
 * live window has been keeping up to date, or a preserved one where no window is living.
 *
 * Which entry carries `isMain` is not decided here: the flag is held on the entries themselves,
 * stamped by {@link loadWindowLayouts} and moved by {@link setMainWindowId}, and it leaves only when
 * its entry does.
 */
function buildStructure(): WindowLayoutStructure {
  return { windows: fileSlots.map((slot) => ({ ...slot.entry })) };
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
 * e.g. a layout pushed while a quit-time flush waits its turn — still lands in the write.
 *
 * Nothing is pinned at enqueue time. A write is whatever the slot list holds when it reaches the
 * front of the queue, so which windows a write covers is decided by when a slot leaves the list —
 * which is {@link handleWindowRemoved}'s disposition, not the caller of the write.
 */
function enqueueWrite(): Promise<void> {
  writeChain = writeChain
    .then(() => writeStructureToDisk(buildStructure()))
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

/** Schedule a debounced write of the structure */
function scheduleWrite(): void {
  if (writeTimeout) clearTimeout(writeTimeout);
  writeTimeout = setTimeout(() => {
    writeTimeout = undefined;
    enqueueWrite();
  }, WRITE_DEBOUNCE_MS);
}

/**
 * Write the structure immediately, absorbing any pending debounced write. Called when the app is
 * going down, and after a window was deliberately closed — both are moments the file has to catch
 * up with rather than wait out a debounce for.
 */
export async function writeNow(): Promise<void> {
  cancelScheduledWrite();
  return enqueueWrite();
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
export function markWindowPendingContent(windowId: string): void {
  pendingContentWindowIds.add(windowId);
  handlePendingContentChanged();
}

/**
 * Un-mark a pending-content window: its routed content has arrived (or its creator gave up), so
 * from now on it restores like any other window.
 */
export function clearWindowPendingContent(windowId: string): void {
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
export function isWindowPendingContent(windowId: string): boolean {
  return pendingContentWindowIds.has(windowId);
}

function handleGetLayoutRequest(windowId: unknown): WindowLayoutGetResponse {
  if (typeof windowId !== 'string') {
    logger.warn(`${GET_WINDOW_LAYOUT_REQUEST_TYPE} called without a window id`);
    return { kind: 'empty' };
  }
  const slot = findSlotByWindowId(windowId);
  if (!slot) {
    logger.warn(`${GET_WINDOW_LAYOUT_REQUEST_TYPE} called for untracked window ${windowId}`);
    return { kind: 'empty' };
  }
  if (pendingContentWindowIds.has(windowId)) return { kind: 'pending-content' };
  if (slot.entry.layout) return { kind: 'entry', layout: slot.entry.layout };
  if (slot.usesLegacyLayout) return { kind: 'legacy' };
  return { kind: 'empty' };
}

function handleFilterDeadSlotsRequest(candidateSlotIds: unknown): string[] {
  if (
    !Array.isArray(candidateSlotIds) ||
    candidateSlotIds.some((slotId) => typeof slotId !== 'string')
  ) {
    logger.warn(`${FILTER_DEAD_WINDOW_SLOTS_REQUEST_TYPE} called without a list of slot ids`);
    return [];
  }
  // Nothing can be called dead while this process does not know what is alive. No slots at all
  // means the structure has not been loaded, and answering "all of them" would tell a renderer to
  // delete the state of every window in the profile.
  if (fileSlots.length === 0) {
    logger.warn(`${FILTER_DEAD_WINDOW_SLOTS_REQUEST_TYPE} called before any slot exists`);
    return [];
  }
  const liveSlotIds = new Set(fileSlots.map((slot) => slot.entry.slotId));
  return candidateSlotIds.filter((slotId) => !liveSlotIds.has(slotId));
}

function handleSaveLayoutRequest(windowId: unknown, layout: unknown): void {
  if (typeof windowId !== 'string') {
    logger.warn(`${SAVE_WINDOW_LAYOUT_REQUEST_TYPE} called without a window id`);
    return;
  }
  const layoutRecord = asRecord(layout);
  if (!layoutRecord) {
    logger.warn(`${SAVE_WINDOW_LAYOUT_REQUEST_TYPE} called without a layout (window ${windowId})`);
    return;
  }
  const slot = findSlotByWindowId(windowId);
  if (!slot) {
    logger.warn(`Ignoring layout push from untracked window ${windowId}`);
    return;
  }
  // Reconcile on arrival so phantom content (duplicate or orphaned tabs, empty panels) cannot
  // enter the persisted structure even when a pusher skipped its own reconciliation
  slot.entry.layout = reconcileSavedLayout(layoutRecord);
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
              summary: 'Id of the window asking what to restore',
              schema: { type: 'string' },
            },
          ],
          result: {
            name: 'return value',
            summary:
              "The window's saved layout, the pre-multi-window layout to fall back to, or nothing to restore",
            schema: {
              type: 'object',
              properties: {
                kind: {
                  type: 'string',
                  enum: ['entry', 'legacy', 'empty', 'pending-content'],
                },
                layout: { type: 'object' },
              },
              required: ['kind'],
            },
          },
        },
      },
    ),
    networkService.registerRequestHandler(
      FILTER_DEAD_WINDOW_SLOTS_REQUEST_TYPE,
      async (...args) => handleFilterDeadSlotsRequest(args[0]),
      {
        method: {
          'x-experimental': true,
          summary:
            'Report which of the given window-layout slots no longer exist, so a renderer can drop the state it is still holding for them',
          params: [
            {
              name: 'candidateSlotIds',
              required: true,
              summary: 'Slot ids the caller holds stored state for',
              schema: { type: 'array', items: { type: 'string' } },
            },
          ],
          result: {
            name: 'return value',
            summary:
              'The subset with no entry in the persisted structure. Empty when the structure is not loaded, so a caller can never be told to delete everything',
            schema: { type: 'array', items: { type: 'string' } },
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
              summary: 'Id of the window whose layout this is',
              schema: { type: 'string' },
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
