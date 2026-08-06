import {
  createEmptyReferenceHistory,
  navigateHistory,
  recordNavigation,
} from '@shared/services/reference-history.util';
import { isNameTakenError } from '@renderer/services/name-taken-error.util';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { networkObjectService } from '@shared/services/network-object.service';
import { papiFrontendProjectDataProviderService } from '@shared/services/project-data-provider.service';
import {
  createBufferedNetworkEventEmitter,
  getNetworkEvent,
} from '@shared/services/network.service';
import {
  EVENT_NAME_ON_DID_CHANGE_REFERENCE_HISTORY,
  EVENT_NAME_ON_DID_CHANGE_VERSIFICATION,
  EVENT_NAME_ON_DID_UPDATE_SCR_REF,
  IScrollGroupRemoteService,
  NETWORK_OBJECT_NAME_SCROLL_GROUP_SERVICE,
  ReferenceHistory,
  ReferenceHistoryUpdateInfo,
  ScrollGroupUpdateInfo,
} from '@shared/services/scroll-group.service-model';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import {
  compareScrRefs,
  deepClone,
  deserialize,
  getErrorMessage,
  isPlatformError,
  type PlatformEvent,
  type PlatformEventEmitter,
  ScrollGroupId,
  serialize,
} from 'platform-bible-utils';
import { resolveReferenceHistoryDirection } from 'platform-bible-utils/experimental';
import { readDirection } from 'platform-bible-react/experimental';
import type { NetworkEventTypes } from 'papi-shared-types';

/**
 * Buffered emitter for changing the Scripture reference on a scroll group. Buffered (and created at
 * module load, before the scrRefs migration below which can call `setScrRefSync`) so a verse-ref
 * change from a UI handler that fires before central registration completes is kept — the latest
 * per scroll group — and flushed once registration finishes, rather than throwing after the local
 * state was already mutated and persisted.
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

/**
 * Buffered emitter for a genuine mid-session change to a tracked project's versification (see
 * {@link ensureVersificationSubscribed}). Consumers use this as a blunt global signal to re-convert
 * once, rather than subscribing per-project themselves.
 *
 * This event is intentionally NOT declared in the public `NetworkEvents` type — it is a
 * host↔hook-internal signal, not part of the `@papi/*` surface — so `EventType extends
 * NetworkEventTypes` rejects the literal name. Cast the name past that constraint and recover the
 * payload type on the result, the same escape hatch used for per-instance data provider update
 * events in `data-provider.service.ts`.
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

const DEFAULT_SCR_REF: SerializedVerseRef = Object.freeze({
  book: 'GEN',
  chapterNum: 1,
  verseNum: 1,
});

const SCR_REFS_STORAGE_KEY = 'scroll-group.service-host.scrRefs';
const SCR_REF_SOURCE_PROJECT_IDS_STORAGE_KEY = 'scroll-group.service-host.scrRefSourceProjectIds';

/** FOR LOADING ONLY! DO NOT USE */
const scrRefsSerialized = localStorage.getItem(SCR_REFS_STORAGE_KEY);
/** Object that maps scroll group ids to the scripture reference at each of those scroll group ids */
const scrRefs: { [scrollGroupId: ScrollGroupId]: SerializedVerseRef | undefined } =
  scrRefsSerialized ? (deserialize(scrRefsSerialized) ?? {}) : {};

/** FOR LOADING ONLY! DO NOT USE */
const scrRefSourceProjectIdsSerialized = localStorage.getItem(
  SCR_REF_SOURCE_PROJECT_IDS_STORAGE_KEY,
);
/**
 * Source project id per scroll group — which project's versification the stored scrRef is expressed
 * in. Persisted alongside `scrRefs` (see {@link saveScrRefs}) so the versification frame survives
 * reload. `undefined` for a group means the source is unknown / canonical English.
 */
const scrRefSourceProjectIds: { [scrollGroupId: ScrollGroupId]: string | undefined } =
  scrRefSourceProjectIdsSerialized ? (deserialize(scrRefSourceProjectIdsSerialized) ?? {}) : {};

/**
 * Reference history per scroll group. Session-only BY DESIGN (in-memory; resets on app restart —
 * matches Paratext 9): do NOT persist to localStorage or settings.
 *
 * Declared ABOVE the scrRefs migration block below, which calls `setScrRefSync` during module
 * evaluation — a migration write that passes the no-op guard reaches
 * {@link getOrCreateReferenceHistory}, which must not hit this `const` in its temporal dead zone.
 */
const referenceHistories = new Map<ScrollGroupId, ReferenceHistory>();

/**
 * Get (lazily creating and seeding) the LIVE history object for a scroll group. The lazy seed with
 * the group's current ref makes the first navigation immediately back-able (mirrors Paratext 9
 * seeding history on layout restore). Internal only — external callers get copies via
 * {@link getReferenceHistorySync}.
 */
function getOrCreateReferenceHistory(scrollGroupId: ScrollGroupId = 0): ReferenceHistory {
  let history = referenceHistories.get(scrollGroupId);
  if (!history) {
    history = createEmptyReferenceHistory();
    recordNavigation(history, {
      // deepClone so the seed entry never aliases the live stored ref that getScrRefSync returns by
      // reference (callers such as the module-load migration mutate stored refs in place)
      scrRef: deepClone(getScrRefSync(scrollGroupId)),
      sourceProjectId: getScrRefSourceProjectIdSync(scrollGroupId),
    });
    referenceHistories.set(scrollGroupId, history);
  }
  return history;
}

// The scrRefs object might contain old values that are of older types that are no longer supported.
// We need to check if this is the case, and convert them to `SerializedVerseRef`.
Object.entries(scrRefs).forEach(([key, value]) => {
  if (!value) return;
  if (value.book) return;
  // We are likely dealing with a scripture reference type that has a bookNum instead of a book id
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const valuePossibleScrRef = value as unknown as {
    bookNum?: number;
    chapterNum: number;
    verseNum: number;
  };
  if (valuePossibleScrRef.bookNum) {
    value.book = Canon.bookNumberToId(valuePossibleScrRef.bookNum);
    delete valuePossibleScrRef.bookNum;
    setScrRefSync(parseInt(key, 10), value);
  }
});

/**
 * Persist the scroll-group state to localStorage. `sourceProjectIdsChanged` controls whether the
 * (separately-keyed) source-project-id map is also rewritten; pass `false` to skip that second
 * serialize + synchronous write when only the ref changed — the common same-project navigation
 * case, where the source id is unchanged. Defaults to `true` so callers that can't tell stay
 * correct.
 */
function saveScrRefs(sourceProjectIdsChanged = true) {
  localStorage.setItem(SCR_REFS_STORAGE_KEY, serialize(scrRefs));
  if (sourceProjectIdsChanged)
    localStorage.setItem(SCR_REF_SOURCE_PROJECT_IDS_STORAGE_KEY, serialize(scrRefSourceProjectIds));
}

/**
 * All Scroll Group IDs that are intended to be shown in scroll group selectors. This is a
 * placeholder and will be refactored significantly in
 * https://github.com/paranext/paranext-core/issues/788
 */
export const availableScrollGroupIds = [undefined, ...Array(5).keys()];

/**
 * Event that emits with information about a changed Scripture Reference for a scroll group. Note it
 * also fires on a source-only change — a same-numbered reference set by a different-versification
 * project (the `sourceProjectId` changes while the verse numbers do not) — so consumers must not
 * assume it fires only when the verse numbers change; use the payload's `sourceProjectId` to tell a
 * frame change from a verse change.
 */
export const onDidUpdateScrRef: PlatformEvent<ScrollGroupUpdateInfo> = getNetworkEvent(
  EVENT_NAME_ON_DID_UPDATE_SCR_REF,
);

/**
 * Event that emits when a tracked project's versification changes mid-session (see
 * {@link ensureVersificationSubscribed}). Does NOT emit for the initial subscription load — only for
 * a genuine change.
 */
export const onDidChangeVersification: PlatformEvent<{ projectId: string }> = getNetworkEvent(
  EVENT_NAME_ON_DID_CHANGE_VERSIFICATION,
);

/** Event that emits when a scroll group's reference history changes */
export const onDidChangeReferenceHistory: PlatformEvent<ReferenceHistoryUpdateInfo> =
  getNetworkEvent(EVENT_NAME_ON_DID_CHANGE_REFERENCE_HISTORY);

function emitReferenceHistoryChange(scrollGroupId: ScrollGroupId, history: ReferenceHistory) {
  onDidChangeReferenceHistoryBufferedEmitter.emit({ scrollGroupId, history: deepClone(history) });
}

/** See {@link IScrollGroupRemoteService.getReferenceHistory} */
export function getReferenceHistorySync(scrollGroupId: ScrollGroupId = 0): ReferenceHistory {
  return deepClone(getOrCreateReferenceHistory(scrollGroupId));
}

/** See {@link IScrollGroupRemoteService.navigateReferenceHistory} */
export function navigateReferenceHistorySync(
  scrollGroupId: ScrollGroupId | undefined,
  offset: number,
): boolean {
  // Default undefined -> 0, matching getScrRefSync / setScrRefSync, so an undefined id navigates
  // group 0 rather than a phantom history keyed under `undefined`.
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

/**
 * Navigate a scroll group's reference history in a PHYSICAL direction (`'left'` / `'right'`),
 * resolving it to a logical back/forward for the current UI layout direction (RTL swaps the pair,
 * via {@link resolveReferenceHistoryDirection}). Backs the `navigateLeft/RightInReferenceHistory`
 * commands so the main-process keyboard handler can dispatch the physical key directly and stay
 * direction-agnostic.
 */
export function navigateReferenceHistoryPhysicalSync(
  scrollGroupId: ScrollGroupId | undefined,
  physicalDirection: 'left' | 'right',
): boolean {
  const logicalDirection = resolveReferenceHistoryDirection(physicalDirection, readDirection());
  return navigateReferenceHistorySync(scrollGroupId, logicalDirection === 'back' ? -1 : 1);
}

/** See {@link IScrollGroupRemoteService.getScrRef} */
export function getScrRefSync(scrollGroupId: ScrollGroupId = 0): SerializedVerseRef {
  return scrRefs[scrollGroupId] ?? DEFAULT_SCR_REF;
}

/**
 * Get the id of the project whose versification the scroll group's stored `scrRef` is expressed in.
 *
 * @param scrollGroupId Scroll group whose source project id to read. If `undefined`, defaults to 0
 * @returns The source project id, or `undefined` when the source frame is unknown — e.g. the group
 *   was never set with a source, or its ref came from an external writer whose versification is not
 *   known
 */
export function getScrRefSourceProjectIdSync(scrollGroupId: ScrollGroupId = 0): string | undefined {
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
 * never disposed — this host is a session-lifetime singleton and the set of projects is small.
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
 * versification via the `platformScripture.mapVerseRefBetweenProjects` command, so every consumer —
 * in any process — gets a reference it can use directly. Returns the raw stored reference unchanged
 * when no conversion is needed: the source frame is unknown, or already matches `projectId`. On any
 * conversion failure it falls back to the raw reference (and does not permanently suppress the
 * project — the failure may be transient).
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

  // Unknown source frame (`undefined`) is NOT assumed English: converting a reference whose
  // versification we don't know would mis-frame it, so pass it through. Also skip when the frame
  // already matches `projectId`. Checked up front to avoid subscribing when there is nothing to do.
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

async function getScrRef(scrollGroupScrRef: ScrollGroupId = 0): Promise<SerializedVerseRef> {
  return getScrRefSync(scrollGroupScrRef);
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
  // Update the scr ref and send out an event. The buffered emitter is usable immediately; if it
  // hasn't finished registering yet, the latest update per scroll group is buffered and flushed.
  const sourceProjectIdChanged = scrRefSourceProjectIds[scrollGroupId] !== sourceProjectId;
  scrRefs[scrollGroupId] = scrRefClone;
  // A numbers-changed write with no source project (`sourceProjectId === undefined`) intentionally
  // CLEARS the stored source frame. This is by design: a driver with no associated project (e.g. a
  // data model that does not track versification) has an unknown versification, so followers must
  // take the raw reference rather than mis-frame it under the previous source. This is not a
  // lost-frame bug — an unknown frame is honestly unknown.
  scrRefSourceProjectIds[scrollGroupId] = sourceProjectId;
  saveScrRefs(sourceProjectIdChanged);
  onDidUpdateScrRefBufferedEmitter.emit({ scrollGroupId, scrRef: scrRefClone, sourceProjectId });
}

/**
 * See {@link IScrollGroupRemoteService.setScrRef}
 *
 * The user-facing setter: writes the ref (via {@link writeScrRef}) AND records the change in the
 * scroll group's reference history. Reference-history navigation itself does NOT go through here —
 * it calls {@link writeScrRef} directly, since its stacks already reflect the move.
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

  // deepClone the ref into history so the recorded entry never aliases the object stored in `scrRefs`
  // (which the module-load migration mutates in place — an in-place edit must not silently reach
  // through into history).
  recordNavigation(referenceHistory, { scrRef: deepClone(scrRef), sourceProjectId });
  // Always emit, even for a verse-only move that changed only `current` and not the back/forward
  // stacks: `current` is part of the published history and a consumer may render it. We could skip
  // the emit (and its clone + broadcast) on a verse-only change to save work on the verse-scroll hot
  // path, but that would assume no consumer needs the updated current ref — not worth the risk until
  // a real performance problem shows up.
  emitReferenceHistoryChange(scrollGroupIdDefaulted, referenceHistory);

  return true;
}

async function setScrRef(
  scrollGroupId: ScrollGroupId | undefined,
  scrRef: SerializedVerseRef,
  sourceProjectId?: string,
): Promise<boolean> {
  return setScrRefSync(scrollGroupId, scrRef, sourceProjectId);
}

async function getReferenceHistory(scrollGroupId: ScrollGroupId): Promise<ReferenceHistory> {
  return getReferenceHistorySync(scrollGroupId);
}

async function navigateReferenceHistory(
  scrollGroupId: ScrollGroupId,
  offset: number,
): Promise<boolean> {
  return navigateReferenceHistorySync(scrollGroupId, offset);
}

const scrollGroupService: IScrollGroupRemoteService = {
  getScrRef,
  setScrRef,
  getScrRefForProject,
  getReferenceHistory,
  navigateReferenceHistory,
};

/**
 * Keep this window's in-memory scroll-group state current when another window writes to it.
 *
 * A scroll group is app-global — group 1 is on the same reference in every window — but the local
 * `*Sync` readers above serve each renderer from its own module state, and `writeScrRef` only
 * broadcasts. Without this, a navigation in one window would never reach the other. Applied
 * straight into the state rather than through `writeScrRef` so a remote update is not re-broadcast,
 * and without persisting: the writing window already saved these exact values under the same
 * (deliberately unscoped, app-global) storage keys.
 *
 * The emitting window receives its own events too, and that re-apply is harmless: the emitter hands
 * an event to this process's own subscribers synchronously as part of the emit, so it arrives
 * carrying exactly the values `writeScrRef` just stored, and the main process fans an announcement
 * out to every connection except the one it came from, so no delayed copy of it ever comes back.
 *
 * HIDDEN VIEWS — this sync is data-driven, and deliberately does nothing about visibility. It only
 * writes module state that the `*Sync` readers above serve, and reads no geometry: nothing here
 * measures, scrolls, or focuses anything, so it behaves identically in a minimized or occluded
 * window and in a window whose scripture tab is an inactive (display-none) pane. There is no
 * catch-up to defer either — a hidden view re-renders from this already-current state when it is
 * shown. Any layout-dependent reaction to a reference change belongs in the consumer that owns the
 * layout, where it can see its own visibility.
 *
 * KNOWN DIVERGENCE — app-global here, per-window in the multi-monitor design. The secondary-window
 * design calls for each window to have its own top-level scroll group so it can follow a different
 * reference from the main window. This code deliberately does the opposite for now, because the
 * cross-window coupling is older than multi-window support: `onDidUpdateScrRef` is a NETWORK event,
 * so one window's navigation has always reached every other window's `useScrollGroupScrRef`
 * subscribers. Single-source emitters meant only the first window to start could emit, so that sync
 * ran one way while the other windows' `*Sync` readers went stale; letting every window emit makes
 * the existing coupling coherent rather than introducing it. Going per-window is a change in the
 * other direction, and needs all three of:
 *
 * - Scoping the `scrollGroup:*` events per window (or carrying a window id and filtering)
 * - Scoping the `ScrollGroupService` network object, with a main-process service router like
 *   `web-view.service-router.ts`
 * - Moving `SCR_REFS_STORAGE_KEY` / `SCR_REF_SOURCE_PROJECT_IDS_STORAGE_KEY` onto
 *   `localWindowStorage`
 *
 * Removing only this mirroring would not get there — it would leave each window's UI still syncing
 * from the network event while its `*Sync` readers disagreed.
 */
function subscribeToRemoteScrollGroupUpdates(): void {
  // Both payloads are already private to this process: deserialized per event when they arrive over
  // the network, and — for the emitting window's own synchronous delivery — freshly cloned by the
  // code that published them. Nothing on the other side of the event holds a reference to mutate, so
  // they are stored as they arrive; cloning again would only add work to the navigation hot path,
  // once per event per window.
  onDidUpdateScrRef(({ scrollGroupId, scrRef, sourceProjectId }) => {
    scrRefs[scrollGroupId] = scrRef;
    scrRefSourceProjectIds[scrollGroupId] = sourceProjectId;
  });
  onDidChangeReferenceHistory(({ scrollGroupId, history }) => {
    referenceHistories.set(scrollGroupId, history);
  });
}

/**
 * Register the network object that backs the scroll group service.
 *
 * The reference-history navigation commands are NOT registered here: the physical left/right
 * keyboard commands (`platform.navigateLeft/RightInReferenceHistory`) live in
 * `scroll-group-navigation.commands.ts` (they resolve the active toolbar scroll group, which needs
 * the window service this state module deliberately does not import). Programmatic offset
 * navigation is exposed through this network object's `navigateReferenceHistory` method below
 * rather than a duplicate command.
 */
export async function startScrollGroupService(): Promise<void> {
  // Every window mirrors every other window's navigation, whether or not it hosts the network
  // object below
  subscribeToRemoteScrollGroupUpdates();

  await hostOrAttachToScrollGroupService();
}

/** Whether this window is the one currently publishing the scroll group network object */
let isPublishingScrollGroupService = false;

/**
 * The scroll group network object another window published and this window stepped aside for, while
 * it is still there. `undefined` while this window publishes the object itself, and again once the
 * object it stepped aside for goes away — which is what tells
 * {@link retryHostOrAttachToScrollGroupService} that the window publishing it took the object this
 * window was using with it.
 */
let attachedScrollGroupService: IScrollGroupRemoteService | undefined;

/**
 * Takeover run that has not settled yet, if any. A takeover can be triggered again while one is
 * already in flight: the run steps aside for a new publisher partway through, and that publisher
 * can go away in the same instant. Two concurrent runs would race each other for the object name,
 * with the loser noisily failing against a registry that rejects even the same registrant.
 * Concurrent triggers share this pending run instead; cleared when it settles so a later disposal
 * can take over again.
 */
let pendingTakeoverPromise: Promise<void> | undefined;

/**
 * Whether a takeover was triggered while {@link pendingTakeoverPromise} was in flight and still
 * needs a run of its own. That trigger is about a publisher the in-flight run started too early to
 * have seen go away, so sharing that run would leave this window with nothing published and nothing
 * else scheduled. Several such triggers collapse into the one re-run, since running once after the
 * last of them answers them all.
 */
let isTakeoverQueuedAfterPendingRun = false;

/**
 * How long to wait before racing again after a run that came out of it with nothing — neither
 * publishing the object nor finding the window that did. Every surviving window is in the same
 * state, so the wait is what keeps them from retrying in lockstep forever; short enough that
 * `papi.scrollGroups` is unanswerable for a moment rather than for the session.
 */
const RACE_AGAIN_AFTER_EMPTY_HANDED_RUN_DELAY_MS = 1000;

/**
 * How many times in a row to race again after coming out of a run empty-handed. Bounded so a window
 * whose registrations are failing for some reason other than the name being taken does not retry
 * for the life of the session; reset the moment a run ends with this window publishing or
 * attached.
 */
const MAX_CONSECUTIVE_EMPTY_HANDED_RUNS = 5;

/** How many runs in a row have ended with this window neither publishing nor attached */
let consecutiveEmptyHandedRuns = 0;

/**
 * Publish the scroll group network object from this window once the object it stepped aside for
 * goes away.
 *
 * Every surviving window reacts; the one that wins the re-registration publishes and the rest go
 * back to stepping aside, which is the same race that decided the original publisher.
 *
 * Skipped in the window that is already publishing: something else went away, and re-entering the
 * race there would drop the object it is serving to everyone else. Skipped too while this window
 * still has an object to talk to, since racing for a name that is still taken could only fail.
 */
async function retryHostOrAttachToScrollGroupService(): Promise<void> {
  if (isPublishingScrollGroupService) return;
  if (pendingTakeoverPromise) {
    isTakeoverQueuedAfterPendingRun = true;
    const runInFlight = pendingTakeoverPromise;
    await runInFlight;
    // The run just awaited started before the publisher this call is about went away, so its
    // finishing says nothing about this one. What covers it is the re-run the flag above asked for,
    // which the `finally` below has already started by the time this resumes — waiting for that is
    // the difference between reporting a takeover that happened and one that is still to come.
    if (pendingTakeoverPromise && pendingTakeoverPromise !== runInFlight)
      await pendingTakeoverPromise;
    return;
  }
  pendingTakeoverPromise = (async () => {
    if (isPublishingScrollGroupService || attachedScrollGroupService) return;
    await hostOrAttachToScrollGroupService();
  })().finally(() => {
    pendingTakeoverPromise = undefined;
    if (!isTakeoverQueuedAfterPendingRun) return;
    isTakeoverQueuedAfterPendingRun = false;
    // A publisher that went away during that run left this window with nothing again, so race once
    // more — unless this window came out of the run publishing, in which case there is nothing left
    // to take over.
    if (isPublishingScrollGroupService) return;
    retryHostOrAttachToScrollGroupService().catch((e) => {
      logger.error(
        `Failed to publish the scroll group service after the window publishing it went away: ${getErrorMessage(e)}`,
      );
    });
  });
  await pendingTakeoverPromise;
}

/**
 * Publish the scroll group network object from this window, or step aside for the window already
 * publishing it and take over when that window closes.
 *
 * Scroll groups are app-global, so exactly one renderer publishes the object no matter how many
 * windows are open. Losing the race is expected rather than an error — every window stays in step
 * through the events in {@link subscribeToRemoteScrollGroupUpdates} regardless, so a remote caller
 * reaching the hosting window still moves them all.
 *
 * The takeover matters because that mirroring hides the failure: if the window publishing it went
 * away and nothing re-published, every window would keep navigating correctly on screen while
 * remote `papi.scrollGroups` calls silently died for the rest of the session. See
 * {@link retryHostOrAttachToScrollGroupService} for what drives that takeover.
 */
async function hostOrAttachToScrollGroupService(): Promise<void> {
  try {
    // Mark ONLY the two experimental methods on the (otherwise stable) scroll group network object,
    // via per-method `x-experimental` in documentation.methods[] — NOT the whole-object 5th-param
    // fanout, which would wrongly mark the stable getScrRef/setScrRef methods too. Mirrors the
    // `@experimental` TSDoc on these methods in IScrollGroupRemoteService.
    const publishedObject = await networkObjectService.set(
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
        ],
      },
    );
    isPublishingScrollGroupService = true;
    attachedScrollGroupService = undefined;
    consecutiveEmptyHandedRuns = 0;
    publishedObject.onDidDispose(() => {
      isPublishingScrollGroupService = false;
    });
    return;
  } catch (e) {
    // Losing the name is the expected outcome in every window but one, and the only thing this
    // `try` is written to survive. Anything else — a request that timed out, a registration rolled
    // back because one of the object's methods collided, a network service that has shut down —
    // reaches here too and looks identical from the code's point of view, so say which one it was
    // rather than reporting a bug as the routine outcome at a severity nothing reads.
    const errorMessage = getErrorMessage(e);
    if (isNameTakenError(errorMessage))
      logger.debug(
        `Another window is already publishing the scroll group service. ${errorMessage}`,
      );
    else
      logger.warn(
        `Window ${globalThis.windowId} failed to publish the scroll group service for a reason other than the name being taken; attaching to whatever holds it instead. ${errorMessage}`,
      );
  }

  // Step aside, but hold on to what this window stepped aside for. A window that closes will not
  // dispose what it published on the way out — a closing renderer drops its RPC connection without
  // disposing anything — so the disposal this waits for is the one the process owning the
  // connections announces once that window's registrations are gone. That cannot arrive before the
  // object is genuinely unreachable, which is what makes the handover reliable.
  const publishedElsewhere = await networkObjectService.get<IScrollGroupRemoteService>(
    NETWORK_OBJECT_NAME_SCROLL_GROUP_SERVICE,
  );
  if (!publishedElsewhere) {
    // The name was taken when this window tried for it and nothing answers to it now, so the window
    // that had it died in between. There is no object to watch and nothing else re-enters the race:
    // a takeover is driven by the disposal of an object this window is holding, and it is holding
    // none. Every surviving window can land here at once — that is what an interleaved re-race
    // looks like — which would leave the app with no scroll group service at all while every screen
    // kept navigating correctly off the mirrored events, so this has to schedule its own re-entry.
    consecutiveEmptyHandedRuns += 1;
    if (consecutiveEmptyHandedRuns > MAX_CONSECUTIVE_EMPTY_HANDED_RUNS) {
      logger.error(
        `Window ${globalThis.windowId} gave up racing for the scroll group service after ${MAX_CONSECUTIVE_EMPTY_HANDED_RUNS} attempts that neither published it nor found the window that did; remote papi.scrollGroups calls will fail until a window publishes it`,
      );
      return;
    }
    logger.error(
      `Window ${globalThis.windowId} neither published the scroll group service nor could resolve the window that did; racing again in ${RACE_AGAIN_AFTER_EMPTY_HANDED_RUN_DELAY_MS}ms (attempt ${consecutiveEmptyHandedRuns} of ${MAX_CONSECUTIVE_EMPTY_HANDED_RUNS})`,
    );
    setTimeout(() => {
      retryHostOrAttachToScrollGroupService().catch((e) => {
        logger.error(
          `Failed to publish the scroll group service while racing for it again: ${getErrorMessage(e)}`,
        );
      });
    }, RACE_AGAIN_AFTER_EMPTY_HANDED_RUN_DELAY_MS);
    return;
  }
  attachedScrollGroupService = publishedElsewhere;
  consecutiveEmptyHandedRuns = 0;
  publishedElsewhere.onDidDispose(() => {
    attachedScrollGroupService = undefined;
    retryHostOrAttachToScrollGroupService().catch((e) => {
      logger.error(
        `Failed to publish the scroll group service after the window publishing it went away: ${getErrorMessage(e)}`,
      );
    });
  });
}
