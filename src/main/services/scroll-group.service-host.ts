/**
 * Service host for the app-global scroll group service.
 *
 * A scroll group is app-global — group 1 is on the same reference in every window — so its state
 * has exactly one home, and that home is the process that outlives every window. Main owns the
 * groups' Scripture references and source projects (persisted), their reference histories (session
 * only), and the network object and events every process reads them through. Each renderer keeps a
 * cache of this state in `scroll-group.service.ts` for the synchronous readers its UI needs.
 *
 * See the service host / service pattern in `.context/standards/Architecture.md` § "Service Host vs
 * Service".
 */

import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { networkObjectService } from '@shared/services/network-object.service';
import { createBufferedNetworkEventEmitter } from '@shared/services/network.service';
import {
  createEmptyReferenceHistory,
  navigateHistory,
  recordNavigation,
} from '@shared/services/reference-history.util';
import {
  EVENT_NAME_ON_DID_CHANGE_REFERENCE_HISTORY,
  EVENT_NAME_ON_DID_UPDATE_SCR_REF,
  IScrollGroupHostService,
  NETWORK_OBJECT_NAME_SCROLL_GROUP_SERVICE,
  PersistedScrollGroupState,
  ReferenceHistory,
  SCR_REF_SOURCE_PROJECT_IDS_STORAGE_KEY,
  SCR_REFS_STORAGE_KEY,
  ScrollGroupMap,
  ScrollGroupSnapshot,
} from '@shared/services/scroll-group.service-model';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import {
  compareScrRefs,
  deepClone,
  deserialize,
  getErrorMessage,
  ScrollGroupId,
  serialize,
} from 'platform-bible-utils';

/**
 * Buffered emitter for changing the Scripture reference on a scroll group. Buffered (and created at
 * module load, before the stored-state normalization below which can write refs) so a change made
 * before central registration completes is kept — the latest per scroll group — and flushed once
 * registration finishes, rather than throwing after the state was already mutated and persisted.
 */
const onDidUpdateScrRefBufferedEmitter = createBufferedNetworkEventEmitter(
  EVENT_NAME_ON_DID_UPDATE_SCR_REF,
  {
    notification: {
      summary:
        'Emitted when the Scripture reference for a scroll group changes. Also fires on a ' +
        'source-only change — a same-numbered reference set by a different-versification project — ' +
        'so it does NOT fire only when the verse numbers change.',
      params: [
        {
          name: 'update',
          required: true,
          summary: 'The scroll group and its new Scripture reference.',
          schema: { type: 'object' },
        },
      ],
    },
  },
  { bufferStrategy: { latestByKey: (update) => String(update.scrollGroupId) } },
);

/**
 * Buffered emitter for changes to a scroll group's reference history. Buffered latest-per-group
 * like {@link onDidUpdateScrRefBufferedEmitter}; consumers only need the latest state.
 */
const onDidChangeReferenceHistoryBufferedEmitter = createBufferedNetworkEventEmitter(
  EVENT_NAME_ON_DID_CHANGE_REFERENCE_HISTORY,
  {
    notification: {
      // Experimental to match the `@experimental` TSDoc on `onDidChangeReferenceHistory` in
      // papi-shared-types; surfaces `x-experimental` in the live OpenRPC document.
      'x-experimental': true,
      summary: "Emitted when a scroll group's reference history changes.",
      params: [
        {
          name: 'update',
          required: true,
          summary: 'The scroll group and its new reference history.',
          schema: { type: 'object' },
        },
      ],
    },
  },
  { bufferStrategy: { latestByKey: (update) => String(update.scrollGroupId) } },
);

const DEFAULT_SCR_REF: SerializedVerseRef = Object.freeze({
  book: 'GEN',
  chapterNum: 1,
  verseNum: 1,
});

/**
 * Read one persisted map out of the store.
 *
 * A store this process cannot make sense of degrades to "no stored state" instead of throwing. This
 * runs while `main.ts`'s import graph is being evaluated — before any window, any error dialog, or
 * anything the user could act on — so a truncated or hand-edited file would otherwise stop the app
 * from starting at all, with nothing to tell the user which file to remove. Losing one Scripture
 * reference beats that. The next write replaces the unreadable file.
 */
function loadStoredMap<T>(storageKey: string): ScrollGroupMap<T> {
  try {
    const serialized = localStorage.getItem(storageKey);
    return serialized ? (deserialize(serialized) ?? {}) : {};
  } catch (e) {
    logger.error(
      `Scroll group service host could not read its stored ${storageKey}; starting without it. ${getErrorMessage(e)}`,
    );
    return {};
  }
}

/** Object that maps scroll group ids to the scripture reference at each of those scroll group ids */
const scrRefs: ScrollGroupMap<SerializedVerseRef> = loadStoredMap(SCR_REFS_STORAGE_KEY);

/**
 * Source project id per scroll group — which project's versification the stored `scrRef` is
 * expressed in. Persisted alongside `scrRefs` (see {@link saveScrRefs}) so the versification frame
 * survives a restart. `undefined` for a group means the source is unknown / canonical English.
 */
const scrRefSourceProjectIds: ScrollGroupMap<string> = loadStoredMap(
  SCR_REF_SOURCE_PROJECT_IDS_STORAGE_KEY,
);

/**
 * Reference history per scroll group. Session-only BY DESIGN (in-memory; resets on app restart —
 * matches Paratext 9): do NOT persist to localStorage or settings.
 *
 * APP-GLOBAL, ONE AUTHORITY. There is exactly one history per scroll group for the whole app, not
 * one per window. Windows sharing a group are on the same reference by definition, so per-window
 * trails could only ever diverge through a mirroring race or state a window had before it joined —
 * both of which are clobber mechanisms rather than features. Keeping the single copy here removes
 * them outright. Ordering guarantees for concurrent navigation from several windows are
 * TODO(PT-4270)'s to define.
 */
const referenceHistories = new Map<ScrollGroupId, ReferenceHistory>();

/**
 * Get (lazily creating and seeding) the LIVE history object for a scroll group. The lazy seed with
 * the group's current ref makes the first navigation immediately back-able (mirrors Paratext 9
 * seeding history on layout restore). Internal only — external callers get copies via
 * {@link getReferenceHistory}.
 */
function getOrCreateReferenceHistory(scrollGroupId: ScrollGroupId = 0): ReferenceHistory {
  let history = referenceHistories.get(scrollGroupId);
  if (!history) {
    history = createEmptyReferenceHistory();
    recordNavigation(history, {
      // deepClone so the seed entry never aliases the live stored ref that `getScrRefSync` returns
      // by reference
      scrRef: deepClone(getScrRefSync(scrollGroupId)),
      sourceProjectId: getScrRefSourceProjectIdSync(scrollGroupId),
    });
    referenceHistories.set(scrollGroupId, history);
  }
  return history;
}

/**
 * Bring stored references forward from a Scripture reference type that carried a `bookNum` instead
 * of a book id. Rewrites in place rather than going through {@link setScrRefSync}: this runs before
 * anything can be listening, so recording history and broadcasting a change for it would describe a
 * navigation that never happened.
 *
 * @returns Whether anything was rewritten
 */
function normalizeStoredScrRefs(refs: ScrollGroupMap<SerializedVerseRef>): boolean {
  let didNormalize = false;
  Object.values(refs).forEach((value) => {
    if (!value || value.book) return;
    // The whole point of this function is to handle a stored value that is NOT the type it is
    // declared as, so there is no type-safe way to look at its old shape.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const valuePossibleScrRef = value as unknown as {
      bookNum?: number;
      chapterNum: number;
      verseNum: number;
    };
    if (!valuePossibleScrRef.bookNum) return;
    value.book = Canon.bookNumberToId(valuePossibleScrRef.bookNum);
    delete valuePossibleScrRef.bookNum;
    didNormalize = true;
  });
  return didNormalize;
}

/**
 * Whether this process holds scroll group state of its own, as opposed to only ever having had the
 * default. Read from memory rather than from the store because writes reach the store lazily (see
 * {@link schedulePersist}), so the file's absence proves nothing about what has been navigated.
 * {@link migrateStoredScrollGroupState} refuses an offer once this is true.
 */
let hasOwnScrollGroupState = Object.keys(scrRefs).length > 0;

/**
 * Write the scroll-group state to the store, now. Throws whatever the store throws.
 *
 * `localStorage` here is main's file-backed polyfill (`polyfillLocalStorage()` in
 * `global-this.model.ts`), NOT a renderer's Chromium store, so this is one store for the whole app
 * rather than one per window. Each `setItem` is a synchronous write-and-fsync of one file, which is
 * why callers go through {@link schedulePersist} rather than calling this per navigation.
 *
 * `sourceProjectIdsChanged` controls whether the (separately-keyed) source-project-id map is also
 * rewritten; pass `false` to skip that second serialize + write when only the ref changed — the
 * common same-project navigation case, where the source id is unchanged. Defaults to `true` so
 * callers that can't tell stay correct.
 *
 * The key backing {@link hasOwnScrollGroupState} is written LAST, and that order is load-bearing
 * rather than incidental. There is no atomicity across two keys, so a failure between them strands
 * one of the pair — and whichever key the gate reads decides which way that half-written state is
 * read at the next start. Written last, a stranded write leaves the gate closed and the whole write
 * is simply retried. Written first, it leaves the gate open over state that was never finished, and
 * a migration retry is then refused rather than repeated. The theme host's marker key is last for
 * the same reason.
 */
function persistScrRefsNow(sourceProjectIdsChanged = true) {
  if (sourceProjectIdsChanged)
    localStorage.setItem(SCR_REF_SOURCE_PROJECT_IDS_STORAGE_KEY, serialize(scrRefSourceProjectIds));
  localStorage.setItem(SCR_REFS_STORAGE_KEY, serialize(scrRefs));
}

/**
 * How long a reference change waits before it is written to disk. Long enough that holding a
 * next-verse key down writes once at the end of the run rather than once per verse, short enough
 * that it is over before a user who navigated and then quit gets to the menu.
 */
const PERSIST_DEBOUNCE_MS = 500;

let pendingPersistTimeout: ReturnType<typeof setTimeout> | undefined;
let pendingPersistIncludesSourceProjectIds = false;

/**
 * Claim the coalesced write, cancelling the timer that would have run it.
 *
 * @returns Whether the write it claimed also covers the source-project-id map, or `undefined` when
 *   there was nothing pending
 */
function takePendingPersist(): boolean | undefined {
  if (pendingPersistTimeout === undefined) return undefined;
  clearTimeout(pendingPersistTimeout);
  pendingPersistTimeout = undefined;
  const includeSourceProjectIds = pendingPersistIncludesSourceProjectIds;
  pendingPersistIncludesSourceProjectIds = false;
  return includeSourceProjectIds;
}

/**
 * Persist the scroll-group state soon.
 *
 * Memory is authoritative and the store is a lagging record of it, so the write is coalesced: each
 * `localStorage.setItem` is an open-write-fsync-rename executed synchronously ON MAIN'S EVENT LOOP,
 * which is also the JSON-RPC server every other process talks through. Writing per navigation puts
 * that latency between every window and the platform while someone holds a next-verse key down.
 *
 * The cost of coalescing is a loss window: a crash (not a quit — see
 * {@link flushPersistedScrollGroupState}) loses at most {@link PERSIST_DEBOUNCE_MS} of scroll
 * position, which is one navigation's worth of a value the user can see and re-enter. That is the
 * trade being made deliberately.
 */
function schedulePersist(sourceProjectIdsChanged = true) {
  pendingPersistIncludesSourceProjectIds =
    pendingPersistIncludesSourceProjectIds || sourceProjectIdsChanged;
  if (pendingPersistTimeout !== undefined) return;
  pendingPersistTimeout = setTimeout(() => {
    const includeSourceProjectIds = takePendingPersist();
    if (includeSourceProjectIds === undefined) return;
    try {
      persistScrRefsNow(includeSourceProjectIds);
    } catch (e) {
      // Said once and loudly, then the session carries on: the state consumers read is in memory and
      // was already broadcast, so a store that cannot be written costs the next restart its starting
      // reference, not this session its correctness.
      logger.error(
        `Scroll group service host could not persist its state; this session is unaffected but a restart will not remember where the user was. ${getErrorMessage(e)}`,
      );
    }
  }, PERSIST_DEBOUNCE_MS);
}

/**
 * Write any coalesced scroll-group state to the store immediately.
 *
 * Call this on the way down. {@link schedulePersist} deliberately lets the store lag memory, so
 * without a flush at shutdown a quit within {@link PERSIST_DEBOUNCE_MS} of the last navigation would
 * lose it — the one loss the debounce must not cause, because quitting right after navigating is
 * something users do on purpose.
 */
export function flushPersistedScrollGroupState(): void {
  const includeSourceProjectIds = takePendingPersist();
  if (includeSourceProjectIds === undefined) return;
  try {
    persistScrRefsNow(includeSourceProjectIds);
  } catch (e) {
    logger.error(
      `Scroll group service host could not persist its state while shutting down; the next start will show the last reference it managed to write. ${getErrorMessage(e)}`,
    );
  }
}

if (normalizeStoredScrRefs(scrRefs)) schedulePersist(false);

function emitReferenceHistoryChange(scrollGroupId: ScrollGroupId, history: ReferenceHistory) {
  onDidChangeReferenceHistoryBufferedEmitter.emit({ scrollGroupId, history: deepClone(history) });
}

function getScrRefSync(scrollGroupId: ScrollGroupId = 0): SerializedVerseRef {
  return scrRefs[scrollGroupId] ?? DEFAULT_SCR_REF;
}

function getScrRefSourceProjectIdSync(scrollGroupId: ScrollGroupId = 0): string | undefined {
  return scrRefSourceProjectIds[scrollGroupId];
}

type MapVerseRefBetweenProjectsCommand = (
  command: 'platformScripture.mapVerseRefBetweenProjects',
  verseRef: SerializedVerseRef,
  sourceProjectId: string | undefined,
  targetProjectId: string,
) => Promise<SerializedVerseRef>;
// 'platformScripture.mapVerseRefBetweenProjects' is typed in an extension's .d.ts, which core's
// tsconfig excludes from typeRoots, so sendCommand isn't typed for it here. This is the single
// boundary point where this module invokes the command.
// eslint-disable-next-line no-type-assertion/no-type-assertion
const mapVerseRefBetweenProjects = sendCommand as unknown as MapVerseRefBetweenProjectsCommand;

/**
 * Get the scroll group's Scripture reference converted into the versification of `projectId`.
 *
 * The group stores its reference in the versification of whichever project last set it (see
 * {@link ScrollGroupUpdateInfo.sourceProjectId}); this resolves that frame and converts to
 * `projectId`'s versification via the `platformScripture.mapVerseRefBetweenProjects` command, so a
 * consumer in any process gets a reference it can use directly. Returns the raw stored reference
 * unchanged when no conversion is needed: the source frame is unknown, or already matches
 * `projectId`. On any conversion failure it falls back to the raw reference (and does not
 * permanently suppress the project — the failure may be transient).
 *
 * DELIBERATELY UNCACHED, unlike the renderer service's local conversions. A conversion cache is
 * only correct if something invalidates it when a project's versification changes mid-session,
 * which means subscribing to `platformScripture.versification` for every project involved —
 * bookkeeping the renderer service already carries for the UI that converts on every navigation.
 * Conversions asked for over the network are occasional by comparison, so one round trip each is
 * cheaper than a second copy of that bookkeeping in a second process, and it cannot go stale.
 *
 * See {@link IScrollGroupRemoteService.getScrRefForProject}
 */
export async function getScrRefForProject(
  scrollGroupId: ScrollGroupId | undefined,
  projectId: string,
): Promise<SerializedVerseRef> {
  const scrollGroupIdDefaulted = scrollGroupId ?? 0;
  const scrRef = getScrRefSync(scrollGroupIdDefaulted);
  const sourceProjectId = getScrRefSourceProjectIdSync(scrollGroupIdDefaulted);

  // Unknown source frame (`undefined`) is NOT assumed English: converting a reference whose
  // versification we don't know would mis-frame it, so pass it through. Also skip when the frame
  // already matches `projectId`.
  //
  // NOTE: we intentionally do NOT also skip when the two projects report the same
  // `platformScripture.versification` value — that setting is only the base `ScrVersType` and does
  // not capture `custom.vrs`, so two projects can report the same base type yet convert differently.
  // The C# command decides with the real `ScrVers`.
  if (sourceProjectId === undefined || sourceProjectId === projectId) return scrRef;

  try {
    return await mapVerseRefBetweenProjects(
      'platformScripture.mapVerseRefBetweenProjects',
      scrRef,
      sourceProjectId,
      projectId,
    );
  } catch (e) {
    // Best-effort display conversion: fall back to the raw reference. The command rejects (rather
    // than passing the reference through) precisely so a caller can tell a failed conversion from a
    // successful identity one.
    logger.warn(
      `Scroll group could not convert its reference into project ${projectId}'s versification; using the reference unconverted. ${getErrorMessage(e)}`,
    );
    return scrRef;
  }
}

/** See {@link IScrollGroupRemoteService.getScrRef} */
export async function getScrRef(scrollGroupId: ScrollGroupId = 0): Promise<SerializedVerseRef> {
  return getScrRefSync(scrollGroupId);
}

/**
 * Low-level ref write: store `scrRef` (+ its source project) for the scroll group, persist, and
 * broadcast `onDidUpdateScrRef`. NO versification no-op guard and NO history recording — a caller
 * that wants those wraps this (see {@link setScrRefSync}). Reference-history navigation writes
 * through here directly: the stacks already reflect the move, so the destination must always be
 * applied — including a multi-step jump onto a same-numbers entry whose source frame differs.
 *
 * @param scrRef Reference to store. Deep-cloned before storing so it never aliases the caller's
 *   object (nor, for history navigation, the stored history entry).
 */
function writeScrRef(
  scrollGroupId: ScrollGroupId,
  scrRef: SerializedVerseRef,
  sourceProjectId: string | undefined,
): void {
  const scrRefClone = deepClone(scrRef);
  const sourceProjectIdChanged = scrRefSourceProjectIds[scrollGroupId] !== sourceProjectId;
  scrRefs[scrollGroupId] = scrRefClone;
  // A numbers-changed write with no source project (`sourceProjectId === undefined`) intentionally
  // CLEARS the stored source frame. This is by design: a driver with no associated project (e.g. a
  // data model that does not track versification) has an unknown versification, so consumers must
  // take the raw reference rather than mis-frame it under the previous source. This is not a
  // lost-frame bug — an unknown frame is honestly unknown.
  scrRefSourceProjectIds[scrollGroupId] = sourceProjectId;
  hasOwnScrollGroupState = true;
  // Scheduled, not written, so a store that is slow or failing can neither delay nor prevent the
  // broadcast below. The broadcast is the correctness-critical half — it is what stops the other
  // windows from silently showing a different verse than this one — while the file only decides
  // what the NEXT start opens on.
  schedulePersist(sourceProjectIdChanged);
  // The buffered emitter is usable immediately; if it hasn't finished registering yet, the latest
  // update per scroll group is buffered and flushed.
  onDidUpdateScrRefBufferedEmitter.emit({ scrollGroupId, scrRef: scrRefClone, sourceProjectId });
}

/**
 * The user-facing setter: writes the ref (via {@link writeScrRef}) AND records the change in the
 * scroll group's reference history. Reference-history navigation itself does NOT go through here —
 * it calls {@link writeScrRef} directly, since its stacks already reflect the move.
 */
function setScrRefSync(
  scrollGroupId: ScrollGroupId | undefined,
  scrRef: SerializedVerseRef,
  sourceProjectId?: string,
): boolean {
  if (
    !scrRef ||
    !(typeof scrRef.book === 'string') ||
    !(typeof scrRef.chapterNum === 'number') ||
    !(typeof scrRef.verseNum === 'number')
  )
    throw new Error('Must provide scrRef in proper format!');

  const scrollGroupIdDefaulted = scrollGroupId ?? 0;

  // compareScrRefs is versification-blind (book/chapter/verse only), so a same-numbered ref set by a
  // different source project still changes the versification frame and must NOT be treated as a
  // no-op. Skip only when the numbers are unchanged AND the write carries no new source info — a
  // same-numbered write with no source (`undefined`) must not clobber a known source.
  const scrRefUnchanged =
    compareScrRefs(scrRefs[scrollGroupIdDefaulted] ?? DEFAULT_SCR_REF, scrRef) === 0;
  if (
    scrRefUnchanged &&
    (sourceProjectId === undefined ||
      sourceProjectId === scrRefSourceProjectIds[scrollGroupIdDefaulted])
  )
    return false;

  // Capture (lazily seeding) the history BEFORE writing the stored ref so a first-touch seed records
  // the location being navigated AWAY from, not the destination.
  const referenceHistory = getOrCreateReferenceHistory(scrollGroupIdDefaulted);

  writeScrRef(scrollGroupIdDefaulted, scrRef, sourceProjectId);

  // deepClone the ref into history so the recorded entry never aliases the object stored in
  // `scrRefs`.
  recordNavigation(referenceHistory, { scrRef: deepClone(scrRef), sourceProjectId });
  // Always emit, even for a verse-only move that changed only `current` and not the back/forward
  // stacks: `current` is part of the published history and a consumer may render it. We could skip
  // the emit (and its clone + broadcast) on a verse-only change to save work on the verse-scroll hot
  // path, but that would assume no consumer needs the updated current ref — not worth the risk until
  // a real performance problem shows up.
  emitReferenceHistoryChange(scrollGroupIdDefaulted, referenceHistory);

  return true;
}

/** See {@link IScrollGroupRemoteService.setScrRef} */
export async function setScrRef(
  scrollGroupId: ScrollGroupId | undefined,
  scrRef: SerializedVerseRef,
  sourceProjectId?: string,
): Promise<boolean> {
  return setScrRefSync(scrollGroupId, scrRef, sourceProjectId);
}

/**
 * Monotonic per-scroll-group counter, bumped at the START of every
 * {@link claimScrollGroupSourceProject} call — including ones that immediately no-op. This is what
 * lets a slow, now-superseded claim detect it lost even when the claim that superseded it never
 * wrote anything: A→B→A in quick succession, where claim(B)'s conversion is slow and claim(A)
 * starts and finds the source is ALREADY `projA` (so it no-ops with no write of its own), still
 * must not let claim(B)'s slow conversion resolve afterward and leave the group on `projB` — the
 * user's last action was switching to A. Checking only "did the stored source change" (as the
 * write-collision guard below also does) misses this shape, because claim(A) changed nothing.
 */
const claimGenerations: ScrollGroupMap<number> = {};

/**
 * Atomically re-stamp the scroll group's source project as `projectId`, converting the current
 * reference into that project's versification, WITHOUT recording reference history (unlike
 * {@link setScrRef}) and without the read-then-write gap a caller combining
 * {@link getScrRefForProject} and {@link setScrRef} across two round trips would have to race against
 * — prefer this over that combination for exactly that reason.
 *
 * Skips the write (returns `false`) rather than persisting a guess when any of:
 *
 * - The group's source project is already `projectId` — nothing to claim.
 * - The group's source project is unknown (`undefined`) — converting from an unknown frame would
 *   mis-frame the reference with false confidence. The honest "unknown" state that
 *   {@link writeScrRef} already treats as a first-class outcome is left alone, so it can self-heal
 *   on the user's next real navigation instead of being papered over with a guess.
 * - The versification conversion to `projectId` fails — unlike {@link getScrRefForProject}, this does
 *   NOT fall back to the raw reference tagged with `projectId` as if it were a success; that would
 *   persist a confidently wrong claim in place of an honestly unknown one.
 * - A later call to this function started while this one's conversion was still in flight (see
 *   {@link claimGenerations}) — including one that itself no-oped — or the group's source project
 *   changed some other way (a real navigation) while the conversion was in flight. Either way, some
 *   other write — or the intent behind one — won the race, and a claim computed against the
 *   reference from before it must not clobber it.
 *
 * @param scrollGroupId Scroll group to claim. If `undefined`, defaults to 0
 * @param projectId Project to claim the group's source as
 * @returns `true` if the claim was written; `false` if skipped for any of the reasons above
 * @experimental
 */
export async function claimScrollGroupSourceProject(
  scrollGroupId: ScrollGroupId | undefined,
  projectId: string,
): Promise<boolean> {
  const scrollGroupIdDefaulted = scrollGroupId ?? 0;
  const myGeneration = (claimGenerations[scrollGroupIdDefaulted] ?? 0) + 1;
  claimGenerations[scrollGroupIdDefaulted] = myGeneration;

  const currentSourceProjectId = getScrRefSourceProjectIdSync(scrollGroupIdDefaulted);
  if (currentSourceProjectId === undefined || currentSourceProjectId === projectId) return false;

  const scrRef = getScrRefSync(scrollGroupIdDefaulted);
  let convertedScrRef: SerializedVerseRef;
  try {
    convertedScrRef = await mapVerseRefBetweenProjects(
      'platformScripture.mapVerseRefBetweenProjects',
      scrRef,
      currentSourceProjectId,
      projectId,
    );
  } catch (e) {
    logger.warn(
      `Scroll group could not claim project ${projectId} as its source: conversion failed, leaving the existing source in place. ${getErrorMessage(e)}`,
    );
    return false;
  }

  // The conversion command above was the only await in this function, so it is the only window
  // where a newer claim (tracked by generation) or another kind of write (tracked by comparing the
  // source directly) could have landed. Abandon rather than clobbering either.
  if (
    claimGenerations[scrollGroupIdDefaulted] !== myGeneration ||
    getScrRefSourceProjectIdSync(scrollGroupIdDefaulted) !== currentSourceProjectId
  )
    return false;

  writeScrRef(scrollGroupIdDefaulted, convertedScrRef, projectId);
  return true;
}

/** See {@link IScrollGroupRemoteService.getReferenceHistory} */
export async function getReferenceHistory(
  scrollGroupId: ScrollGroupId = 0,
): Promise<ReferenceHistory> {
  return deepClone(getOrCreateReferenceHistory(scrollGroupId));
}

/** See {@link IScrollGroupRemoteService.navigateReferenceHistory} */
export async function navigateReferenceHistory(
  scrollGroupId: ScrollGroupId | undefined,
  offset: number,
): Promise<boolean> {
  // Default undefined -> 0, matching getScrRef / setScrRef, so an undefined id navigates group 0
  // rather than a phantom history keyed under `undefined`.
  const groupId = scrollGroupId ?? 0;
  const history = getOrCreateReferenceHistory(groupId);
  const destination = navigateHistory(history, offset);
  if (!destination) return false;
  // The stacks already reflect the navigation, so write the destination directly via `writeScrRef`
  // rather than `setScrRefSync`: no re-recording (which would double-push), and no versification
  // no-op guard — a multi-step jump onto a same-numbers entry still applies the destination's source
  // frame instead of silently keeping the previous one.
  writeScrRef(groupId, destination.scrRef, destination.sourceProjectId);
  emitReferenceHistoryChange(groupId, history);
  return true;
}

/** See {@link IScrollGroupInternalService.getScrollGroupSnapshot} */
export async function getScrollGroupSnapshot(): Promise<ScrollGroupSnapshot> {
  const snapshotHistories: ScrollGroupMap<ReferenceHistory> = {};
  referenceHistories.forEach((history, scrollGroupId) => {
    snapshotHistories[scrollGroupId] = deepClone(history);
  });
  return {
    scrRefs: deepClone(scrRefs),
    scrRefSourceProjectIds: deepClone(scrRefSourceProjectIds),
    referenceHistories: snapshotHistories,
  };
}

/**
 * Whether stored state from somewhere this process cannot read has already been adopted. Persisted
 * rather than kept in memory: what makes the adoption a one-time event is that it happened at all,
 * not that it happened this session.
 */
const MIGRATED_STORED_STATE_KEY = 'scroll-group.service-host.didMigrateStoredState';

/** Whether a value read out of a foreign store is shaped like a Scripture reference */
function isScrRefShaped(value: SerializedVerseRef | undefined): value is SerializedVerseRef {
  return (
    !!value &&
    typeof value.book === 'string' &&
    typeof value.chapterNum === 'number' &&
    typeof value.verseNum === 'number'
  );
}

/** See {@link IScrollGroupInternalService.migrateStoredScrollGroupState} */
export async function migrateStoredScrollGroupState(
  state: PersistedScrollGroupState,
): Promise<boolean> {
  // First one wins. Deliberately no locking: this whole function body is `await`-free, so two
  // windows offering in the same tick cannot interleave. The offers all describe the same app's
  // state from before it had one store, so taking the first and ignoring the rest cannot lose
  // anything the others would have added, and a mixture of two of them is the only outcome worth
  // ruling out.
  //
  // State this process holds also refuses an offer, even if the flag was never set: that means an
  // earlier offer failed to arrive but the app has been used since, and the reference the user last
  // navigated to has to beat the one they left behind before any of this.
  if (localStorage.getItem(MIGRATED_STORED_STATE_KEY) || hasOwnScrollGroupState) return false;

  const offeredScrRefs = state?.scrRefs ?? {};
  const offeredSourceProjectIds = state?.scrRefSourceProjectIds ?? {};
  normalizeStoredScrRefs(offeredScrRefs);
  // Adopted straight into the state rather than through `setScrRef`, and NOT broadcast: this is the
  // state the app already had, so recording it as navigation history or announcing it as a change
  // would describe moves the user never made. Consumers read it with their next snapshot.
  //
  // Shape-checked on the way in, the same way `setScrRefSync` checks a write: this arrives over the
  // network from another process's store and is about to become this store's contents for the life
  // of the profile, so a garbage entry must not survive the trip.
  Object.entries(offeredScrRefs).forEach(([scrollGroupId, scrRef]) => {
    if (isScrRefShaped(scrRef)) scrRefs[Number(scrollGroupId)] = scrRef;
  });
  Object.entries(offeredSourceProjectIds).forEach(([scrollGroupId, sourceProjectId]) => {
    if (typeof sourceProjectId === 'string')
      scrRefSourceProjectIds[Number(scrollGroupId)] = sourceProjectId;
  });

  // Persist what was adopted BEFORE recording that the migration ran, and write both keys before
  // either flag. The store is one file per key with no atomicity across them, so an order that
  // records "already migrated" first can leave a profile permanently flagged as done with nothing
  // migrated — the user's last reference gone with no way to ask for it again. This order fails the
  // other way: an interrupted migration is simply retried at the next start, which is idempotent
  // because `hasOwnScrollGroupState` only becomes true once something actually landed. That last
  // part is only true while `persistScrRefsNow` writes the key that flag is read from last — see
  // its docblock before changing the order in there.
  try {
    takePendingPersist();
    persistScrRefsNow();
    localStorage.setItem(MIGRATED_STORED_STATE_KEY, 'true');
  } catch (e) {
    // Rejected rather than reported as refused: a caller told "refused" discards its copy, and this
    // is the one outcome where its copy is still the only durable one.
    logger.error(
      `Scroll group service host could not store the scroll group state it was offered; it will ask for it again. ${getErrorMessage(e)}`,
    );
    throw e;
  }
  // Set only now that the store holds it. Set before the write, a failed write would leave this
  // process claiming state of its own that it never persisted, and the guard at the top of this
  // function would answer the NEXT window's offer with "refused" — which deletes it, because a
  // window told "refused" discards its copy. The rejection above is only worth anything while the
  // offer it rejected can still be made again.
  hasOwnScrollGroupState = true;
  logger.info('Scroll group service host adopted previously stored scroll group state');
  return true;
}

/**
 * The scroll group state to hand a window being created, so its synchronous readers are right on
 * its first render rather than showing the default until it has asked. Travels as a query parameter
 * on the window's URL (see `SCROLL_GROUP_STATE_QUERY_PARAMETER`), which is the same channel the
 * window id arrives on.
 *
 * Read from memory, not from the store, because persistence lags memory (see
 * {@link schedulePersist}) — a window created moments after a navigation must still be told about
 * it.
 *
 * @returns The state, or `undefined` when this process has none to give: a fresh profile, or one
 *   whose state is still in a renderer's own store awaiting its one-time handover. The window falls
 *   back to what it can read for itself in that case.
 */
export function getScrollGroupStateForNewWindow(): PersistedScrollGroupState | undefined {
  if (!hasOwnScrollGroupState) return undefined;
  return {
    scrRefs: deepClone(scrRefs),
    scrRefSourceProjectIds: deepClone(scrRefSourceProjectIds),
  };
}

const scrollGroupService: IScrollGroupHostService = {
  getScrRef,
  setScrRef,
  getScrRefForProject,
  getReferenceHistory,
  navigateReferenceHistory,
  claimScrollGroupSourceProject,
  getScrollGroupSnapshot,
  migrateStoredScrollGroupState,
};

/**
 * Register the network object that backs the scroll group service. Must be called during main
 * process startup, before createWindow().
 *
 * The reference-history navigation commands are registered by `scroll-group-navigation.commands.ts`
 * in this process, not here: they resolve the active toolbar scroll group and the layout direction
 * by asking the window the user is working in, so they belong with the other commands that do that
 * rather than with the state they happen to write. Programmatic offset navigation is exposed
 * through this network object's `navigateReferenceHistory` method rather than a duplicate command.
 */
export async function startScrollGroupServiceHost(): Promise<void> {
  // Mark ONLY the experimental methods on the (otherwise stable) scroll group network object, via
  // per-method `x-experimental` in documentation.methods[] — NOT the whole-object 5th-param fanout,
  // which would wrongly mark the stable getScrRef/setScrRef methods too. Mirrors the
  // `@experimental` TSDoc on these methods in the scroll group service model.
  await networkObjectService.set<IScrollGroupHostService>(
    NETWORK_OBJECT_NAME_SCROLL_GROUP_SERVICE,
    scrollGroupService,
    'object',
    undefined,
    {
      methods: [
        {
          name: 'getReferenceHistory',
          'x-experimental': true,
          summary: 'Get a copy of the reference history for the provided scroll group',
          params: [
            {
              name: 'scrollGroupId',
              required: true,
              summary: 'Scroll group whose history to get',
              schema: { type: 'number' },
            },
          ],
          result: { name: 'referenceHistory', schema: { type: 'object' } },
        },
        {
          name: 'navigateReferenceHistory',
          'x-experimental': true,
          summary:
            'Navigate within the reference history of the provided scroll group ' +
            '(negative offset = back, positive = forward)',
          params: [
            {
              name: 'scrollGroupId',
              required: true,
              summary: 'Scroll group whose history to navigate',
              schema: { type: 'number' },
            },
            {
              name: 'offset',
              required: true,
              summary: 'Signed number of steps: negative = back, positive = forward',
              schema: { type: 'number' },
            },
          ],
          result: { name: 'didNavigate', schema: { type: 'boolean' } },
        },
        {
          name: 'claimScrollGroupSourceProject',
          'x-experimental': true,
          summary:
            "Atomically re-stamp the scroll group's source project, converting the current " +
            'reference, without recording reference history',
          params: [
            {
              name: 'scrollGroupId',
              required: true,
              summary: 'Scroll group to claim',
              schema: { type: 'number' },
            },
            {
              name: 'projectId',
              required: true,
              summary: "Project to claim the group's source as",
              schema: { type: 'string' },
            },
          ],
          result: { name: 'didClaim', schema: { type: 'boolean' } },
        },
        {
          name: 'getScrollGroupSnapshot',
          'x-experimental': true,
          summary:
            "Get every scroll group's reference, source project, and reference history at once",
          params: [],
          result: { name: 'snapshot', schema: { type: 'object' } },
        },
        {
          name: 'migrateStoredScrollGroupState',
          'x-experimental': true,
          summary:
            'Hand over previously persisted scroll group state for the host to adopt (first offer adopted wins)',
          params: [
            {
              name: 'state',
              required: true,
              summary: 'Previously persisted scroll group references and source project ids',
              schema: { type: 'object' },
            },
          ],
          result: { name: 'didAdopt', schema: { type: 'boolean' } },
        },
      ],
    },
  );
  logger.info('Scroll group service host registered');
}
