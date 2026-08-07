/**
 * This window's local representation of the app-global scroll group service, whose authority is
 * `scroll-group.service-host.ts` in main.
 *
 * It is a cache with a synchronous façade. The UI reads a scroll group's reference during render
 * and during a keystroke handler, where there is no room to await a round trip, so this module
 * keeps a copy of the host's state — seeded once at startup and kept current by the host's events —
 * and serves the `*Sync` readers from it. A `*Sync` writer mutates the copy, returns what it
 * predicts the host will do, and sends the write on; the host's answer and its events are what the
 * copy ultimately agrees with.
 *
 * Versification conversion stays here rather than in main: it is a pure function of (reference,
 * source project, target project), and the consumer that converts on every navigation is in this
 * process, so converting here keeps the round trips it costs to the one command call and lets the
 * results be cached against the versification subscriptions that invalidate them.
 *
 * ONE ANSWER PER WINDOW. This module is what `papi.scrollGroups` resolves to in the renderer (see
 * {@link rendererScrollGroupService}), not just what the renderer's own hooks read, so a web view
 * cannot get one answer from the hook and a different one from `papi`. `shared/services
 * /scroll-group.service.ts` — the plain proxy to the host — is what the other processes get, where
 * there is no window-local prediction to be consistent with.
 */

import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { networkObjectService } from '@shared/services/network-object.service';
import { networkObjectStatusService } from '@shared/services/network-object-status.service';
import { papiFrontendProjectDataProviderService } from '@shared/services/project-data-provider.service';
import {
  createBufferedNetworkEventEmitter,
  getNetworkEvent,
} from '@shared/services/network.service';
import {
  navigateHistory,
  recordNavigation,
  createEmptyReferenceHistory,
} from '@shared/services/reference-history.util';
import {
  EVENT_NAME_ON_DID_CHANGE_REFERENCE_HISTORY,
  EVENT_NAME_ON_DID_CHANGE_VERSIFICATION,
  EVENT_NAME_ON_DID_UPDATE_SCR_REF,
  IScrollGroupHostService,
  IScrollGroupService,
  NETWORK_OBJECT_NAME_SCROLL_GROUP_SERVICE,
  PersistedScrollGroupState,
  ReferenceHistory,
  ReferenceHistoryUpdateInfo,
  SCR_REF_SOURCE_PROJECT_IDS_STORAGE_KEY,
  SCR_REFS_STORAGE_KEY,
  ScrollGroupMap,
  ScrollGroupSnapshot,
  ScrollGroupUpdateInfo,
} from '@shared/services/scroll-group.service-model';
import { SCROLL_GROUP_STATE_QUERY_PARAMETER } from '@shared/data/platform.data';
import { createCachedInitializer } from '@shared/utils/cached-initializer';
import { SerializedVerseRef } from '@sillsdev/scripture';
import {
  compareScrRefs,
  deepClone,
  deserialize,
  getErrorMessage,
  isPlatformError,
  PlatformEvent,
  PlatformEventEmitter,
  ScrollGroupId,
  serialize,
  wait,
} from 'platform-bible-utils';
import { resolveReferenceHistoryDirection } from 'platform-bible-utils/experimental';
import { readDirection } from 'platform-bible-react/experimental';
import type { NetworkEventTypes } from 'papi-shared-types';

const DEFAULT_SCR_REF: SerializedVerseRef = Object.freeze({
  book: 'GEN',
  chapterNum: 1,
  verseNum: 1,
});

/**
 * All Scroll Group IDs that are intended to be shown in scroll group selectors. This is a
 * placeholder and will be refactored significantly in
 * https://github.com/paranext/paranext-core/issues/788
 */
export const availableScrollGroupIds = [undefined, ...Array(5).keys()];

// #region the host

/**
 * The scroll group service host's network object. Main registers it before any window is created
 * and keeps it for the life of the app, so there is nothing to re-arm here: resolving it once is
 * enough, and a failure to resolve it is a startup problem rather than a handover to wait out.
 */
const getScrollGroupHost = createCachedInitializer<IScrollGroupHostService>(async () => {
  await networkObjectStatusService.waitForNetworkObject(
    { id: NETWORK_OBJECT_NAME_SCROLL_GROUP_SERVICE },
    // Wait 30 seconds for the scroll group service to appear
    30000,
  );
  const host = await networkObjectService.get<IScrollGroupHostService>(
    NETWORK_OBJECT_NAME_SCROLL_GROUP_SERVICE,
  );
  if (!host)
    throw new Error(
      `${NETWORK_OBJECT_NAME_SCROLL_GROUP_SERVICE} is not available as a network object`,
    );
  return host;
});

// #endregion

// #region the cache

/** This window's copy of each scroll group's Scripture reference */
const cachedScrRefs: ScrollGroupMap<SerializedVerseRef> = {};

/**
 * This window's copy of the project whose versification each group's cached `scrRef` is expressed
 * in. `undefined` for a group means the source is unknown / canonical English.
 */
const cachedScrRefSourceProjectIds: ScrollGroupMap<string> = {};

/**
 * Whether this window has caught up with the host at least once. Until it has, "the cache says
 * nothing changed" is not evidence about the host — the cache may only hold what could be read
 * before the network was up — so {@link setScrRefSync} does not act on it (see the guard there).
 */
let hasSeededFromHost = false;

/** Whether a value is shaped like a Scripture reference this module can serve to the UI */
function isScrRefShaped(scrRef: SerializedVerseRef | undefined): scrRef is SerializedVerseRef {
  return (
    !!scrRef &&
    typeof scrRef.book === 'string' &&
    typeof scrRef.chapterNum === 'number' &&
    typeof scrRef.verseNum === 'number'
  );
}

/**
 * The scroll group state main handed this window on its URL when it created it, if any.
 *
 * This is how the cache is right on the FIRST render. React renders before the network is even up,
 * and every `*Sync` reader is called during that render, so a cache that could only be filled by a
 * round trip would serve the default reference to the toolbar, to the keyboard navigation commands,
 * and to every scroll-group-following web view — which then jump when the real reference arrives, a
 * jump that costs a restored Scripture editor a whole extra chapter load.
 *
 * Absent on a profile main has no state for yet, and unreadable input is treated the same as
 * absent: this runs while the module is being evaluated, where a throw takes the window down with
 * it.
 */
function readWindowCreationScrollGroupState(): PersistedScrollGroupState | undefined {
  try {
    const serialized = new URLSearchParams(globalThis.location?.search ?? '').get(
      SCROLL_GROUP_STATE_QUERY_PARAMETER,
    );
    return serialized ? deserialize(serialized) : undefined;
  } catch (e) {
    logger.warn(
      `Could not read the scroll group state this window was created with. ${getErrorMessage(e)}`,
    );
    return undefined;
  }
}

/**
 * Where the scroll group state used to be persisted, back when a renderer held it: this window's
 * own `localStorage`, under the keys the host now uses for its own store. The host cannot read it —
 * main's `localStorage` polyfill is a different store in a different place — so a profile that
 * predates the host has to hand it over, and until it has, this is the only thing in this process
 * that knows where the user left off.
 *
 * This module never treats these keys as its own state: they are read to seed the first render on
 * the one start where main has nothing yet, and to be offered once (see
 * {@link handOverPreviouslyStoredState}). Both this and the offer stop being reachable once every
 * profile that could be carrying them has started the app.
 */
function readPreviouslyStoredScrollGroupState(): PersistedScrollGroupState | undefined {
  try {
    const storedScrRefs = localStorage.getItem(SCR_REFS_STORAGE_KEY);
    const storedSourceProjectIds = localStorage.getItem(SCR_REF_SOURCE_PROJECT_IDS_STORAGE_KEY);
    if (!storedScrRefs && !storedSourceProjectIds) return undefined;
    return {
      scrRefs: storedScrRefs ? (deserialize(storedScrRefs) ?? {}) : {},
      scrRefSourceProjectIds: storedSourceProjectIds
        ? (deserialize(storedSourceProjectIds) ?? {})
        : {},
    };
  } catch (e) {
    logger.warn(
      `Could not read the scroll group state stored in this window before the scroll group service host existed. ${getErrorMessage(e)}`,
    );
    return undefined;
  }
}

/**
 * Fill the cache with everything that can be known without asking anyone, synchronously, while this
 * module is being evaluated — which is before React renders.
 *
 * What main handed over wins: it is the app's live state, and it is the only one of the two that
 * moves while the app runs. This window's own leftover store is the fallback for the single start
 * after an upgrade, where main has nothing until the handover in {@link startScrollGroupService}
 * completes. Neither is announced: nothing has subscribed yet, and this is the state consumers read
 * on their first render rather than a change to it.
 */
function seedCacheBeforeFirstRender(): void {
  const state = readWindowCreationScrollGroupState() ?? readPreviouslyStoredScrollGroupState();
  if (!state) return;
  Object.entries(state.scrRefSourceProjectIds ?? {}).forEach(([scrollGroupId, sourceProjectId]) => {
    cachedScrRefSourceProjectIds[Number(scrollGroupId)] = sourceProjectId;
  });
  // Shape-checked because this window's own leftover store can predate the reference type carrying a
  // book id. The host brings those forward when it adopts them; here, skipping one costs the default
  // reference for a moment and beats handing the UI something it cannot render.
  Object.entries(state.scrRefs ?? {}).forEach(([scrollGroupId, scrRef]) => {
    if (isScrRefShaped(scrRef)) cachedScrRefs[Number(scrollGroupId)] = scrRef;
  });
}

seedCacheBeforeFirstRender();

/**
 * This window's copy of each scroll group's reference history. The history is app-global and
 * authoritative in main — a group is on one reference in every window, so there is one trail
 * through it — and this copy exists only so the toolbar's back/forward buttons can be rendered and
 * driven without awaiting.
 */
const cachedReferenceHistories = new Map<ScrollGroupId, ReferenceHistory>();

/**
 * Fires when a scroll group's Scripture reference changes, whether the change came from the host or
 * was predicted locally by {@link setScrRefSync} / {@link navigateReferenceHistorySync}. Consumers
 * subscribe here rather than to the raw network event so a change this window made is on screen
 * immediately instead of one round trip later.
 */
const onDidUpdateScrRefEmitter = new PlatformEventEmitter<ScrollGroupUpdateInfo>();
/**
 * Event that emits with information about a changed Scripture Reference for a scroll group. Note it
 * also fires on a source-only change — a same-numbered reference set by a different-versification
 * project (the `sourceProjectId` changes while the verse numbers do not) — so consumers must not
 * assume it fires only when the verse numbers change; use the payload's `sourceProjectId` to tell a
 * frame change from a verse change.
 */
export const onDidUpdateScrRef: PlatformEvent<ScrollGroupUpdateInfo> =
  onDidUpdateScrRefEmitter.event;

const onDidChangeReferenceHistoryEmitter = new PlatformEventEmitter<ReferenceHistoryUpdateInfo>();
/** Event that emits when a scroll group's reference history changes */
export const onDidChangeReferenceHistory: PlatformEvent<ReferenceHistoryUpdateInfo> =
  onDidChangeReferenceHistoryEmitter.event;

/** See {@link IScrollGroupRemoteService.getScrRef} */
export function getScrRefSync(scrollGroupId: ScrollGroupId = 0): SerializedVerseRef {
  return cachedScrRefs[scrollGroupId] ?? DEFAULT_SCR_REF;
}

/**
 * Get the id of the project whose versification the scroll group's `scrRef` is expressed in.
 *
 * @param scrollGroupId Scroll group whose source project id to read. If `undefined`, defaults to 0
 * @returns The source project id, or `undefined` when the source frame is unknown — e.g. the group
 *   was never set with a source, or its ref came from an external writer whose versification is not
 *   known
 */
export function getScrRefSourceProjectIdSync(scrollGroupId: ScrollGroupId = 0): string | undefined {
  return cachedScrRefSourceProjectIds[scrollGroupId];
}

/**
 * Get (lazily creating and seeding) the LIVE cached history object for a scroll group. The lazy
 * seed with the group's current ref mirrors what the host does for a group it has not seen
 * navigated yet, so a prediction made before the host has ever announced a history matches what the
 * host will answer. Internal only — external callers get copies via
 * {@link getReferenceHistorySync}.
 */
function getOrCreateCachedReferenceHistory(scrollGroupId: ScrollGroupId = 0): ReferenceHistory {
  let history = cachedReferenceHistories.get(scrollGroupId);
  if (!history) {
    history = createEmptyReferenceHistory();
    recordNavigation(history, {
      scrRef: deepClone(getScrRefSync(scrollGroupId)),
      sourceProjectId: getScrRefSourceProjectIdSync(scrollGroupId),
    });
    cachedReferenceHistories.set(scrollGroupId, history);
  }
  return history;
}

/** See {@link IScrollGroupRemoteService.getReferenceHistory} */
export function getReferenceHistorySync(scrollGroupId: ScrollGroupId = 0): ReferenceHistory {
  return deepClone(getOrCreateCachedReferenceHistory(scrollGroupId));
}

/**
 * Put a reference into the cache and announce it. Announces unconditionally rather than comparing
 * first, because a same-numbered reference from a different source project is a real change to the
 * versification frame that consumers must see.
 */
function applyScrRefToCache(
  scrollGroupId: ScrollGroupId,
  scrRef: SerializedVerseRef,
  sourceProjectId: string | undefined,
): void {
  const scrRefClone = deepClone(scrRef);
  cachedScrRefs[scrollGroupId] = scrRefClone;
  cachedScrRefSourceProjectIds[scrollGroupId] = sourceProjectId;
  onDidUpdateScrRefEmitter.emit({ scrollGroupId, scrRef: scrRefClone, sourceProjectId });
}

function applyReferenceHistoryToCache(
  scrollGroupId: ScrollGroupId,
  history: ReferenceHistory,
): void {
  cachedReferenceHistories.set(scrollGroupId, history);
  // Announced as a copy because the cached object is mutated in place by the predicting writers,
  // while a consumer that holds what it was handed (the toolbar buttons keep it in React state and
  // memoize on its identity) would otherwise see its own value change underneath it mid-render.
  onDidChangeReferenceHistoryEmitter.emit({ scrollGroupId, history: deepClone(history) });
}

/**
 * Drop this window's copy of a scroll group's history because the host has none for it.
 *
 * "The host has no history for this group" is itself authoritative: it means nothing has been
 * navigated there, so a trail this window recorded optimistically describes a move the host never
 * made and would offer a back button the host will refuse. Deleting rather than emptying lets the
 * next read lazily re-seed from the group's (just-corrected) reference, exactly as the host would.
 */
function resetCachedReferenceHistory(scrollGroupId: ScrollGroupId): void {
  cachedReferenceHistories.delete(scrollGroupId);
  onDidChangeReferenceHistoryEmitter.emit({
    scrollGroupId,
    history: deepClone(getOrCreateCachedReferenceHistory(scrollGroupId)),
  });
}

// #endregion

// #region reconciling with the host

/**
 * Replace this window's copy of one scroll group with the host's, for when a prediction turned out
 * to be wrong. Whatever the host reports is taken as-is: a prediction that missed is not evidence
 * about anything else, and the host is the only place the real state exists.
 *
 * A host event that arrives while the snapshot is in flight describes a later state than the
 * snapshot does, so this can briefly put back a value that was just superseded; the next event for
 * the group corrects it. Ordering the two against each other would need a sequence number on every
 * event to buy consistency for a window this narrow, on a path that only runs after a mispredict.
 */
async function resyncGroupFromHost(scrollGroupId: ScrollGroupId): Promise<void> {
  const host = await getScrollGroupHost();
  const snapshot = await host.getScrollGroupSnapshot();
  applyScrRefToCache(
    scrollGroupId,
    snapshot.scrRefs[scrollGroupId] ?? DEFAULT_SCR_REF,
    snapshot.scrRefSourceProjectIds[scrollGroupId],
  );
  const history = snapshot.referenceHistories[scrollGroupId];
  if (history) applyReferenceHistoryToCache(scrollGroupId, history);
  else resetCachedReferenceHistory(scrollGroupId);
}

/** How long to wait before each retry of a resync that failed, in order */
const RESYNC_RETRY_DELAYS_MS = [250, 1000];

/**
 * Groups whose resync gave up, waiting for a sign the host is reachable again. Drained by
 * {@link drainGroupsAwaitingResync} on the next thing the host says, which is the cheapest proof
 * available that asking is worth trying again.
 */
const groupsAwaitingResync = new Set<ScrollGroupId>();

/** Resync a group, retrying a bounded number of times before parking it for the next host event. */
async function resyncGroupFromHostWithRetry(
  scrollGroupId: ScrollGroupId,
  remainingRetryDelaysMs: readonly number[] = RESYNC_RETRY_DELAYS_MS,
): Promise<void> {
  groupsAwaitingResync.delete(scrollGroupId);
  try {
    await resyncGroupFromHost(scrollGroupId);
  } catch (e) {
    const [delayMs, ...laterDelaysMs] = remainingRetryDelaysMs;
    if (delayMs === undefined) {
      // Parked rather than abandoned: without this the window shows a reference the host rejected
      // for the rest of the session, and every later write in this group starts from that wrong
      // base, with nothing that would ever correct it.
      groupsAwaitingResync.add(scrollGroupId);
      logger.error(
        `Scroll group ${scrollGroupId} could not be resynced from the scroll group service host, so this window may show a stale reference until the host is heard from again. ${getErrorMessage(e)}`,
      );
      return;
    }
    await wait(delayMs);
    await resyncGroupFromHostWithRetry(scrollGroupId, laterDelaysMs);
  }
}

/** Retry the resyncs that gave up, now that the host has been heard from. */
function drainGroupsAwaitingResync(): void {
  if (groupsAwaitingResync.size === 0) return;
  [...groupsAwaitingResync].forEach((scrollGroupId) => {
    resyncGroupFromHostWithRetry(scrollGroupId).catch(() => {
      // resyncGroupFromHostWithRetry reports its own failure and re-parks the group; nothing here
      // could add to that.
    });
  });
}

/**
 * Send a predicted write on to the host and reconcile with what it says. `didChange` is the host's
 * own answer for the write; `false` means the host did NOT do what was predicted, so this window's
 * copy is wrong and has to be replaced. A failed send is treated the same way — the write may or
 * may not have landed, and the only way to find out is to ask.
 *
 * ORDERING: writes are sent independently, with no per-group sequencing, so the convergence
 * argument for rapid navigation rests on requests and notifications sharing one ordered connection
 * and the host handling them in arrival order. That holds today — the host's handlers are
 * `await`-free, so each completes atomically — and it is load-bearing: under out-of-order delivery
 * two writes can both be answered `true` while the host ends up on the earlier one, and nothing
 * would reconcile. A transport that stops guaranteeing order needs a per-group queue here.
 */
function sendPredictedWriteToHost(
  scrollGroupId: ScrollGroupId,
  write: (host: IScrollGroupHostService) => Promise<boolean>,
): void {
  const sendAndReconcile = async () => {
    let didChange = false;
    try {
      didChange = await write(await getScrollGroupHost());
    } catch (e) {
      logger.warn(
        `Scroll group ${scrollGroupId} write did not reach the scroll group service host; resyncing. ${getErrorMessage(e)}`,
      );
    }
    if (didChange) return;
    await resyncGroupFromHostWithRetry(scrollGroupId);
  };
  sendAndReconcile().catch((e) => {
    logger.warn(
      `Scroll group ${scrollGroupId} write could not be reconciled with the scroll group service host. ${getErrorMessage(e)}`,
    );
  });
}

// #endregion

// #region writes

/**
 * See {@link IScrollGroupRemoteService.setScrRef}
 *
 * Predicts the host's answer from this window's copy and returns it immediately, so a caller that
 * branches on "did it change" (e.g. `use-scroll-group-scr-ref.hook.ts`) does not have to await. The
 * prediction can only be wrong while a change from another window is still in flight — the same
 * instant-race the single host has always resolved by arrival order — and the loser converges on
 * the host's next event either way.
 *
 * @param sourceProjectId Project whose versification `scrRef` is expressed in. `undefined` =
 *   unknown / canonical English.
 */
export function setScrRefSync(
  scrollGroupId: ScrollGroupId | undefined,
  scrRef: SerializedVerseRef,
  sourceProjectId?: string,
): boolean {
  if (!isScrRefShaped(scrRef)) throw new Error('Must provide scrRef in proper format!');

  const scrollGroupIdDefaulted = scrollGroupId ?? 0;

  // Mirrors the host's no-op guard so the prediction matches its answer. compareScrRefs is
  // versification-blind (book/chapter/verse only), so a same-numbered ref set by a different source
  // project still changes the versification frame and must NOT be treated as a no-op. Skip only when
  // the numbers are unchanged AND the write carries no new source info — a same-numbered write with
  // no source (`undefined`) must not clobber a known source.
  const scrRefUnchanged =
    compareScrRefs(cachedScrRefs[scrollGroupIdDefaulted] ?? DEFAULT_SCR_REF, scrRef) === 0;
  if (
    scrRefUnchanged &&
    (sourceProjectId === undefined ||
      sourceProjectId === cachedScrRefSourceProjectIds[scrollGroupIdDefaulted])
  ) {
    // Before this window has caught up with the host, "nothing changed" is only a statement about
    // what could be read locally, and acting on it discards the user's navigation with nothing left
    // to correct it: the reconcile only ever runs on a write that was sent. So the write goes out
    // anyway. The host runs the same guard, and whichever way it answers this window converges — on
    // its `onDidUpdateScrRef` if it did move, on the resync a `false` triggers if it did not.
    if (!hasSeededFromHost)
      sendPredictedWriteToHost(scrollGroupIdDefaulted, (host) =>
        host.setScrRef(scrollGroupIdDefaulted, scrRef, sourceProjectId),
      );
    return false;
  }

  // Capture (lazily seeding) the history BEFORE writing the cached ref so a first-touch seed records
  // the location being navigated AWAY from, not the destination — matching the host.
  const referenceHistory = getOrCreateCachedReferenceHistory(scrollGroupIdDefaulted);
  applyScrRefToCache(scrollGroupIdDefaulted, scrRef, sourceProjectId);
  recordNavigation(referenceHistory, { scrRef: deepClone(scrRef), sourceProjectId });
  applyReferenceHistoryToCache(scrollGroupIdDefaulted, referenceHistory);

  sendPredictedWriteToHost(scrollGroupIdDefaulted, (host) =>
    host.setScrRef(scrollGroupIdDefaulted, scrRef, sourceProjectId),
  );

  return true;
}

/**
 * See {@link IScrollGroupRemoteService.navigateReferenceHistory}
 *
 * Predicted from this window's copy of the history the same way {@link setScrRefSync} predicts a
 * reference change, so the back/forward buttons move the moment they are clicked. The host runs the
 * same navigation against the authoritative history and announces the result; if it declines the
 * move — its history is not where this window thought it was — the group is resynced from it.
 */
export function navigateReferenceHistorySync(
  scrollGroupId: ScrollGroupId | undefined,
  offset: number,
): boolean {
  // Default undefined -> 0, matching getScrRefSync / setScrRefSync, so an undefined id navigates
  // group 0 rather than a phantom history keyed under `undefined`.
  const groupId = scrollGroupId ?? 0;
  const history = getOrCreateCachedReferenceHistory(groupId);
  const destination = navigateHistory(history, offset);
  if (!destination) return false;

  // The stacks already reflect the navigation, so the destination is applied directly rather than
  // through `setScrRefSync`: no re-recording (which would double-push), and no versification no-op
  // guard — a multi-step jump onto a same-numbers entry still applies the destination's source frame
  // instead of silently keeping the previous one.
  applyScrRefToCache(groupId, destination.scrRef, destination.sourceProjectId);
  applyReferenceHistoryToCache(groupId, history);

  sendPredictedWriteToHost(groupId, (host) => host.navigateReferenceHistory(groupId, offset));

  return true;
}

/**
 * Navigate a scroll group's reference history in a PHYSICAL direction (`'left'` / `'right'`),
 * resolving it to a logical back/forward for the current UI layout direction (RTL swaps the pair,
 * via {@link resolveReferenceHistoryDirection}). Backs the `navigateLeft/RightInReferenceHistory`
 * commands so the main-process keyboard handler can dispatch the physical key directly and stay
 * direction-agnostic.
 *
 * The mapping lives in the renderer because layout direction is renderer state: `readDirection`
 * reads the document, which only this process has. The host exposes logical back/forward only.
 */
export function navigateReferenceHistoryPhysicalSync(
  scrollGroupId: ScrollGroupId | undefined,
  physicalDirection: 'left' | 'right',
): boolean {
  const logicalDirection = resolveReferenceHistoryDirection(physicalDirection, readDirection());
  return navigateReferenceHistorySync(scrollGroupId, logicalDirection === 'back' ? -1 : 1);
}

// #endregion

// #region versification conversion

/**
 * Buffered emitter for a genuine mid-session change to a tracked project's versification (see
 * {@link ensureVersificationSubscribed}). Consumers use this as a blunt global signal to re-convert
 * once, rather than subscribing per-project themselves.
 *
 * This event is intentionally NOT declared in the public `NetworkEvents` type — it is an internal
 * signal between this module and its consumers, not part of the `@papi/*` surface — so `EventType
 * extends NetworkEventTypes` rejects the literal name. Cast the name past that constraint and
 * recover the payload type on the result, the same escape hatch used for per-instance data provider
 * update events in `data-provider.service.ts`.
 */
/* eslint-disable no-type-assertion/no-type-assertion */
const onDidChangeVersificationBufferedEmitter = createBufferedNetworkEventEmitter(
  EVENT_NAME_ON_DID_CHANGE_VERSIFICATION as NetworkEventTypes,
  {
    notification: {
      summary: 'Emitted when a tracked project’s versification changes mid-session.',
      params: [
        {
          name: 'update',
          required: true,
          summary: 'The project whose versification changed.',
          schema: { type: 'object' },
        },
      ],
    },
  },
) as unknown as {
  emit: (event: { projectId: string }) => void;
  registeredEmitter: Promise<PlatformEventEmitter<{ projectId: string }>>;
  dispose: () => void;
};
/* eslint-enable no-type-assertion/no-type-assertion */

/**
 * Event that emits when a tracked project's versification changes mid-session (see
 * {@link ensureVersificationSubscribed}). Does NOT emit for the initial subscription load — only for
 * a genuine change.
 */
export const onDidChangeVersification: PlatformEvent<{ projectId: string }> = getNetworkEvent(
  EVENT_NAME_ON_DID_CHANGE_VERSIFICATION,
);

type MapVerseRefBetweenProjectsCommand = (
  command: 'platformScripture.mapVerseRefBetweenProjects',
  verseRef: SerializedVerseRef,
  sourceProjectId: string | undefined,
  targetProjectId: string,
) => Promise<SerializedVerseRef>;
// 'platformScripture.mapVerseRefBetweenProjects' is typed in an extension's .d.ts, which core's
// tsconfig excludes from typeRoots, so sendCommand isn't typed for it here. This is the single
// boundary point where core invokes the command.
// eslint-disable-next-line no-type-assertion/no-type-assertion
const mapVerseRefBetweenProjects = sendCommand as unknown as MapVerseRefBetweenProjectsCommand;

/**
 * Current versification identifier per project, read from the `platformScripture.versification`
 * project setting and kept fresh via a subscription (see {@link ensureVersificationSubscribed}).
 * Used to key the conversion cache so a mid-session versification change yields a fresh key (and
 * therefore a fresh conversion) rather than a stale hit. `undefined` = not yet known or not
 * resolvable.
 */
const projectVersifications = new Map<string, string | undefined>();
/**
 * The one-time subscription-setup promise per project, so concurrent callers await the same setup
 * (rather than each subscribing and racing to a possibly-inconsistent value). Kept after resolving
 * because the subscription persists for the session; on failure the entry is removed to allow
 * retry.
 */
const versificationSubscriptions = new Map<string, Promise<void>>();

/** Minimal shape of the base PDP we use to watch the versification project setting. */
type VersificationSettingSubscriber = {
  subscribeSetting: (
    key: 'platformScripture.versification',
    callback: (value: unknown) => void,
    options: { retrieveDataImmediately: boolean },
  ) => Promise<unknown>;
};

/**
 * Set up (once) a subscription to `projectId`'s versification setting that keeps
 * {@link projectVersifications} current. Deduped per project so concurrent callers share one setup.
 * Best-effort: on any failure (e.g. the project is not a scripture project) the versification stays
 * `undefined` and the entry is removed so a later call can retry. The subscription is intentionally
 * never disposed — this module is a session-lifetime singleton and the set of projects is small.
 */
function ensureVersificationSubscribed(projectId: string): Promise<void> {
  const existing = versificationSubscriptions.get(projectId);
  if (existing) return existing;
  const subscriptionPromise = (async () => {
    try {
      const pdp = await papiFrontendProjectDataProviderService.get('platform.base', projectId);
      // 'platformScripture.versification' is an extension-contributed project setting that core's
      // tsconfig excludes from typeRoots, so the base PDP isn't typed for it here. This is the single
      // boundary point where core reads it.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const versificationPdp = pdp as unknown as VersificationSettingSubscriber;
      await versificationPdp.subscribeSetting(
        'platformScripture.versification',
        (value) => {
          const next = isPlatformError(value) || value === undefined ? undefined : String(value);
          const hadValue = projectVersifications.has(projectId);
          const changed = hadValue && projectVersifications.get(projectId) !== next;
          projectVersifications.set(projectId, next);
          // Re-key the cache-key identifiers. On a GENUINE mid-session change (not the initial
          // retrieveDataImmediately load) emit a global signal so every scroll-group consumer
          // re-converts once. Versification changes are rare and deliberate, so the broad re-convert
          // is acceptable and avoids per-consumer versification subscriptions.
          if (changed) onDidChangeVersificationBufferedEmitter.emit({ projectId });
        },
        { retrieveDataImmediately: true },
      );
    } catch (e) {
      // Couldn't resolve a versification for this project (e.g. not a scripture project, or it is
      // still loading). Allow a later retry rather than latching it off for the session.
      versificationSubscriptions.delete(projectId);
      logger.warn(
        `Scroll group could not track versification for project ${projectId}. ${getErrorMessage(e)}`,
      );
    }
  })();
  versificationSubscriptions.set(projectId, subscriptionPromise);
  return subscriptionPromise;
}

/**
 * Ensure `projectId`'s versification is being tracked and return its CURRENT identifier. Reads from
 * {@link projectVersifications} after the subscription is set up, so a mid-session versification
 * change is reflected (keeping the conversion-cache key correct) rather than returning a stale
 * subscription-time value.
 *
 * Note: a versification change updates the cache key so the NEXT conversion is fresh; an
 * already-displayed reference is re-converted the next time the hook re-runs (e.g. on navigation).
 */
async function getTrackedVersification(projectId: string): Promise<string | undefined> {
  await ensureVersificationSubscribed(projectId);
  return projectVersifications.get(projectId);
}

/**
 * Session cache of versification conversions. The key includes each project's current versification
 * identifier (see {@link projectVersifications}) so a mid-session versification change produces a
 * new key — and therefore a fresh conversion — instead of a stale hit. Bounded by
 * {@link CONVERSION_CACHE_MAX_SIZE} to avoid unbounded growth over a long session.
 */
const conversionCache = new Map<string, SerializedVerseRef>();
const CONVERSION_CACHE_MAX_SIZE = 1000;
/**
 * In-flight conversions keyed identically to {@link conversionCache}. Lets concurrent identical
 * requests (e.g. several followers reacting to one update broadcast) share a single round-trip.
 */
const inFlightConversions = new Map<string, Promise<SerializedVerseRef>>();

function conversionCacheKey(
  sourceProjectId: string,
  sourceVersification: string | undefined,
  targetProjectId: string,
  targetVersification: string | undefined,
  scrRef: SerializedVerseRef,
): string {
  return `${sourceProjectId}|${sourceVersification ?? ''}->${targetProjectId}|${targetVersification ?? ''}:${serialize(scrRef)}`;
}

function cacheConversion(key: string, converted: SerializedVerseRef) {
  conversionCache.set(key, converted);
  // Bound memory: drop the oldest entry (Map preserves insertion order) once over the cap.
  if (conversionCache.size > CONVERSION_CACHE_MAX_SIZE) {
    const oldestKey = conversionCache.keys().next().value;
    if (oldestKey !== undefined) conversionCache.delete(oldestKey);
  }
}

/**
 * Shared no-conversion gating + cache-key construction for {@link getScrRefForProject} and its
 * synchronous companion {@link getScrRefForProjectSync}, so the two can never drift (a divergent
 * gate or key shape would make the sync seed miss the async-written cache and reintroduce a flash).
 * Given the source and target versification identifiers — read synchronously from
 * {@link projectVersifications} by the sync path, awaited via {@link getTrackedVersification} by the
 * async path — decides whether a conversion is actually needed and, if so, the cache key to use.
 */
function planConversion(
  scrRef: SerializedVerseRef,
  sourceProjectId: string | undefined,
  projectId: string,
  sourceVersification: string | undefined,
  targetVersification: string | undefined,
): { needsConversion: false } | { needsConversion: true; cacheKey: string } {
  // Unknown source frame (`undefined`) is NOT assumed English: converting a reference whose
  // versification we don't know would mis-frame it. Also skip when the frame already matches
  // `projectId`. NOTE: we intentionally do NOT skip when the two projects report the same
  // `platformScripture.versification` value — that setting is only the base `ScrVersType` and does
  // not capture `custom.vrs`, so two projects can report the same base type yet convert differently.
  // The C# command decides with the real `ScrVers`; a genuinely-identical versification is a cached
  // no-op round-trip.
  if (sourceProjectId === undefined || sourceProjectId === projectId)
    return { needsConversion: false };
  return {
    needsConversion: true,
    cacheKey: conversionCacheKey(
      sourceProjectId,
      sourceVersification,
      projectId,
      targetVersification,
      scrRef,
    ),
  };
}

/**
 * Synchronous, best-effort companion to {@link getScrRefForProject}: returns the already-computed
 * conversion into `projectId`'s versification if one is cached, otherwise the raw stored reference.
 * Never fires a round-trip. Used for the initial displayed value and when detaching a web view so
 * callers never block on the async conversion. Returns the raw reference when no conversion is
 * needed (source frame unknown or already `projectId`) or when a conversion has not been computed
 * yet.
 *
 * @param scrollGroupId Scroll group whose reference to read. If `undefined`, defaults to 0
 * @param projectId Project into whose versification the reference should be converted
 * @returns The cached converted reference, or the raw reference when none is available
 */
export function getScrRefForProjectSync(
  scrollGroupId: ScrollGroupId | undefined,
  projectId: string,
): SerializedVerseRef {
  const scrollGroupIdDefaulted = scrollGroupId ?? 0;
  const scrRef = getScrRefSync(scrollGroupIdDefaulted);
  const sourceProjectId = getScrRefSourceProjectIdSync(scrollGroupIdDefaulted);
  const plan = planConversion(
    scrRef,
    sourceProjectId,
    projectId,
    sourceProjectId === undefined ? undefined : projectVersifications.get(sourceProjectId),
    projectVersifications.get(projectId),
  );
  if (!plan.needsConversion) return scrRef;
  return conversionCache.get(plan.cacheKey) ?? scrRef;
}

/**
 * Get the scroll group's Scripture reference converted into the versification of `projectId`.
 *
 * The group stores its reference in the versification of whichever project last set it (see
 * {@link getScrRefSourceProjectIdSync}); this resolves that frame and converts to `projectId`'s
 * versification via the `platformScripture.mapVerseRefBetweenProjects` command, so every consumer
 * gets a reference it can use directly. Returns the raw reference unchanged when no conversion is
 * needed: the source frame is unknown, or already matches `projectId`. On any conversion failure it
 * falls back to the raw reference (and does not permanently suppress the project — the failure may
 * be transient).
 *
 * Converts the reference this window currently holds, so a conversion started right after a
 * predicted navigation describes the verse actually on screen rather than one the host has not
 * caught up to yet.
 *
 * @param scrollGroupId Scroll group whose reference to convert. If `undefined`, defaults to 0
 * @param projectId Project into whose versification to convert the reference
 * @returns The reference in `projectId`'s versification
 */
export async function getScrRefForProject(
  scrollGroupId: ScrollGroupId | undefined,
  projectId: string,
): Promise<SerializedVerseRef> {
  const scrollGroupIdDefaulted = scrollGroupId ?? 0;
  const scrRef = getScrRefSync(scrollGroupIdDefaulted);
  const sourceProjectId = getScrRefSourceProjectIdSync(scrollGroupIdDefaulted);

  // Checked up front to avoid subscribing when there is nothing to do; `planConversion` applies the
  // same gate again once the versifications are resolved.
  if (sourceProjectId === undefined || sourceProjectId === projectId) return scrRef;

  // Resolve versifications (subscribing if needed) so the conversion-cache key is correct, then plan
  // the conversion with the SAME gating/key logic the sync path uses.
  const [sourceVersification, targetVersification] = await Promise.all([
    getTrackedVersification(sourceProjectId),
    getTrackedVersification(projectId),
  ]);
  const plan = planConversion(
    scrRef,
    sourceProjectId,
    projectId,
    sourceVersification,
    targetVersification,
  );
  if (!plan.needsConversion) return scrRef;

  const { cacheKey } = plan;
  const cached = conversionCache.get(cacheKey);
  if (cached) return cached;
  // Coalesce concurrent identical conversions into a single round-trip.
  const inFlight = inFlightConversions.get(cacheKey);
  if (inFlight) return inFlight;

  const conversionPromise = mapVerseRefBetweenProjects(
    'platformScripture.mapVerseRefBetweenProjects',
    scrRef,
    sourceProjectId,
    projectId,
  )
    .then((converted) => {
      cacheConversion(cacheKey, converted);
      return converted;
    })
    .catch((e) => {
      // Best-effort display conversion: fall back to the raw reference and do NOT cache it, so a
      // transient failure (command not registered yet, project still loading, versification not yet
      // resolvable) is retried on the next navigation rather than latched for the session. The
      // command rejects on such failures (rather than passing through) precisely so this branch —
      // which does not write the cache — runs instead of caching an identity result.
      logger.warn(
        `Scroll group could not convert its reference into project ${projectId}'s versification; using the reference unconverted. ${getErrorMessage(e)}`,
      );
      return scrRef;
    })
    .finally(() => {
      inFlightConversions.delete(cacheKey);
    });
  inFlightConversions.set(cacheKey, conversionPromise);
  return conversionPromise;
}

// #endregion

// #region startup

/**
 * Keep this window's copy current as the host announces changes, whoever caused them.
 *
 * Applied straight into the cache rather than through the predicting writers so an announcement is
 * not sent back to the host as a new write. Both payloads are already private to this process —
 * deserialized per event when they arrive over the network — so nothing on the other side of the
 * event holds a reference to mutate and they are stored as they arrive; cloning again would only
 * add work to the navigation hot path.
 *
 * An announcement for a change this window predicted arrives carrying the same values it already
 * applied, so re-applying it is a no-op that consumers filter out by comparing.
 *
 * HIDDEN VIEWS — this sync is data-driven and deliberately does nothing about visibility. It writes
 * cache entries that the `*Sync` readers serve and reads no geometry: nothing here measures,
 * scrolls, or focuses anything, so it behaves identically in a minimized or occluded window and in
 * a window whose scripture tab is an inactive (display-none) pane. There is no catch-up to defer
 * either — a hidden view re-renders from this already-current cache when it is shown. Any
 * layout-dependent reaction to a reference change belongs in the consumer that owns the layout,
 * where it can see its own visibility.
 */
function subscribeToScrollGroupUpdates(): void {
  getNetworkEvent<ScrollGroupUpdateInfo>(EVENT_NAME_ON_DID_UPDATE_SCR_REF)(
    ({ scrollGroupId, scrRef, sourceProjectId }) => {
      cachedScrRefs[scrollGroupId] = scrRef;
      cachedScrRefSourceProjectIds[scrollGroupId] = sourceProjectId;
      onDidUpdateScrRefEmitter.emit({ scrollGroupId, scrRef, sourceProjectId });
      drainGroupsAwaitingResync();
    },
  );
  getNetworkEvent<ReferenceHistoryUpdateInfo>(EVENT_NAME_ON_DID_CHANGE_REFERENCE_HISTORY)(
    ({ scrollGroupId, history }) => {
      // Through the cache writer rather than straight into the map: it hands consumers a copy, and
      // the object stored here is later mutated in place by the predicting writers.
      applyReferenceHistoryToCache(scrollGroupId, history);
      drainGroupsAwaitingResync();
    },
  );
}

/**
 * Seed the cache from the host, and announce what was seeded.
 *
 * The announcement matters because the host does not replay anything: a consumer that mounted
 * before this ran would otherwise sit on whatever it first rendered until someone navigated.
 * Announcing only the groups the host actually knows about keeps a fresh profile — where every
 * group is at the default — from emitting a change nothing changed.
 *
 * Reference histories are announced the same way, and for the same reason: the toolbar's back and
 * forward buttons read the history once when they mount, which in a window opened mid-session is
 * before this runs, so without the announcement they would show an empty trail while another window
 * plainly shows a full one.
 */
async function seedCacheFromHost(): Promise<void> {
  const host = await getScrollGroupHost();
  const snapshot: ScrollGroupSnapshot = await host.getScrollGroupSnapshot();
  Object.entries(snapshot.scrRefSourceProjectIds ?? {}).forEach(
    ([scrollGroupId, sourceProjectId]) => {
      cachedScrRefSourceProjectIds[Number(scrollGroupId)] = sourceProjectId;
    },
  );
  Object.entries(snapshot.scrRefs ?? {}).forEach(([scrollGroupId, scrRef]) => {
    if (!scrRef) return;
    const groupId = Number(scrollGroupId);
    cachedScrRefs[groupId] = scrRef;
    onDidUpdateScrRefEmitter.emit({
      scrollGroupId: groupId,
      scrRef,
      sourceProjectId: cachedScrRefSourceProjectIds[groupId],
    });
  });
  // After the references, so a consumer reacting to a history change reads the reference it belongs
  // to rather than the one this window came up with.
  Object.entries(snapshot.referenceHistories ?? {}).forEach(([scrollGroupId, history]) => {
    if (history) applyReferenceHistoryToCache(Number(scrollGroupId), history);
  });
  hasSeededFromHost = true;
}

/**
 * Offer this window's previously stored scroll group state (see
 * {@link readPreviouslyStoredScrollGroupState}) to the host, which adopts it only if it has none of
 * its own. Every window offers, and the host takes the first — they are all offering the same
 * state, since these keys were app-global even while a renderer held them.
 *
 * The offer is terminal in both directions. Adopted means the host now owns it; refused means the
 * host has state that beats it. Either way this window's copy is finished, so the keys are removed:
 * left in place they would be re-offered by every window on every start forever, and — worse — a
 * profile whose main-process store is ever cleared would silently resurrect a reference from before
 * the host existed. Only a rejection (the host was unreachable, or could not store what it adopted)
 * keeps them, because that is the one case where this copy is still the only one.
 *
 * Best-effort: a failed offer costs the user their last reference for this session, which
 * navigating fixes, and it leaves the host with nothing adopted so a later start can offer again.
 * Failing startup over it would cost far more.
 */
async function handOverPreviouslyStoredState(): Promise<void> {
  const previouslyStoredState = readPreviouslyStoredScrollGroupState();
  if (!previouslyStoredState) return;
  try {
    const host = await getScrollGroupHost();
    await host.migrateStoredScrollGroupState(previouslyStoredState);
    localStorage.removeItem(SCR_REFS_STORAGE_KEY);
    localStorage.removeItem(SCR_REF_SOURCE_PROJECT_IDS_STORAGE_KEY);
  } catch (e) {
    logger.warn(
      `Could not hand this window's previously stored scroll group state to the scroll group service host; it will be offered again. ${getErrorMessage(e)}`,
    );
  }
}

/**
 * Start this window's scroll group service: subscribe to the host's announcements, hand over any
 * state stored before the host existed, then seed from the host.
 *
 * Subscribing first so a change made while the rest is in flight is not lost, and handing over
 * before seeding so the first seed after an upgrade carries the reference the user left off at.
 *
 * Nothing here is allowed to fail this window's startup. The cache is already usable — it was
 * filled from what came with the window before React rendered, and the subscription above keeps it
 * current — so a host that is slow or missing costs freshness, not correctness, and must not take
 * down the unrelated services that start alongside this one. Until the seed succeeds every write is
 * sent to the host regardless of what the cache predicts (see {@link setScrRefSync}), which is what
 * keeps a never-seeded window honest.
 *
 * Call once at renderer startup.
 */
export async function startScrollGroupService(): Promise<void> {
  subscribeToScrollGroupUpdates();
  await handOverPreviouslyStoredState();
  try {
    await seedCacheFromHost();
  } catch (e) {
    logger.error(
      `Could not seed this window's scroll group state from the scroll group service host; it will catch up on the first change it hears about. ${getErrorMessage(e)}`,
    );
  }
}

// #endregion

// #region the service this window's consumers see

/**
 * This window's scroll group service — what `papi.scrollGroups` resolves to in the renderer.
 *
 * Deliberately NOT the shared network proxy: inside one window there is one answer about where a
 * scroll group is, and it is this module's. A web view holds both this and the hooks (`window.papi`
 * comes from the window that hosts it), so serving the two from different places would let
 * `papi.scrollGroups.getScrRef` report a verse the same web view's own UI has already moved away
 * from, for as long as a predicted write is in flight. Other processes read the host directly,
 * which is the authority both of these agree with.
 *
 * @experimental
 */
export const rendererScrollGroupService: IScrollGroupService = {
  getScrRef: async (scrollGroupId) => getScrRefSync(scrollGroupId),
  setScrRef: async (scrollGroupId, scrRef, sourceProjectId) =>
    setScrRefSync(scrollGroupId, scrRef, sourceProjectId),
  getScrRefForProject,
  getReferenceHistory: async (scrollGroupId) => getReferenceHistorySync(scrollGroupId),
  navigateReferenceHistory: async (scrollGroupId, offset) =>
    navigateReferenceHistorySync(scrollGroupId, offset),
  onDidUpdateScrRef,
  onDidChangeReferenceHistory,
};

// #endregion
