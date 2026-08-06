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
  NETWORK_OBJECT_NAME_SCROLL_GROUP_SERVICE,
  ReferenceHistory,
  ReferenceHistoryUpdateInfo,
  ScrollGroupMap,
  ScrollGroupSnapshot,
  ScrollGroupUpdateInfo,
} from '@shared/services/scroll-group.service-model';
import { createCachedInitializer } from '@shared/utils/cached-initializer';
import { SerializedVerseRef } from '@sillsdev/scripture';
import {
  compareScrRefs,
  deepClone,
  getErrorMessage,
  isPlatformError,
  PlatformEvent,
  PlatformEventEmitter,
  ScrollGroupId,
  serialize,
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
  onDidChangeReferenceHistoryEmitter.emit({ scrollGroupId, history: deepClone(history) });
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
}

/**
 * Send a predicted write on to the host and reconcile with what it says. `didChange` is the host's
 * own answer for the write; `false` means the host did NOT do what was predicted, so this window's
 * copy is wrong and has to be replaced. A failed send is treated the same way — the write may or
 * may not have landed, and the only way to find out is to ask.
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
    await resyncGroupFromHost(scrollGroupId);
  };
  sendAndReconcile().catch((e) => {
    logger.warn(
      `Scroll group ${scrollGroupId} could not be resynced from the scroll group service host, so this window may show a stale reference until the next change it hears about. ${getErrorMessage(e)}`,
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
  if (
    !scrRef ||
    !(typeof scrRef.book === 'string') ||
    !(typeof scrRef.chapterNum === 'number') ||
    !(typeof scrRef.verseNum === 'number')
  )
    throw new Error('Must provide scrRef in proper format!');

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
  )
    return false;

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
    },
  );
  getNetworkEvent<ReferenceHistoryUpdateInfo>(EVENT_NAME_ON_DID_CHANGE_REFERENCE_HISTORY)(
    ({ scrollGroupId, history }) => {
      cachedReferenceHistories.set(scrollGroupId, history);
      onDidChangeReferenceHistoryEmitter.emit({ scrollGroupId, history });
    },
  );
}

/**
 * Seed the cache from the host, and announce what was seeded.
 *
 * The announcement matters because the host does not replay anything: a consumer that mounted
 * before this ran would otherwise sit on the default reference until someone navigated. Announcing
 * only the groups the host actually knows about keeps a fresh profile — where every group is at the
 * default — from emitting a change nothing changed.
 */
async function seedCacheFromHost(): Promise<void> {
  const host = await getScrollGroupHost();
  const snapshot: ScrollGroupSnapshot = await host.getScrollGroupSnapshot();
  Object.entries(snapshot.scrRefSourceProjectIds ?? {}).forEach(
    ([scrollGroupId, sourceProjectId]) => {
      cachedScrRefSourceProjectIds[Number(scrollGroupId)] = sourceProjectId;
    },
  );
  Object.entries(snapshot.referenceHistories ?? {}).forEach(([scrollGroupId, history]) => {
    if (history) cachedReferenceHistories.set(Number(scrollGroupId), history);
  });
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
}

/**
 * Start this window's scroll group service: subscribe to the host's announcements, then seed from
 * the host. Subscribing first so a change made while the seed is in flight is not lost.
 *
 * Call once at renderer startup.
 */
export async function startScrollGroupService(): Promise<void> {
  subscribeToScrollGroupUpdates();
  await seedCacheFromHost();
}

// #endregion
