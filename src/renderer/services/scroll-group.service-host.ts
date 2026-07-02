import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { networkObjectService } from '@shared/services/network-object.service';
import { papiFrontendProjectDataProviderService } from '@shared/services/project-data-provider.service';
import {
  createBufferedNetworkEventEmitter,
  getNetworkEvent,
} from '@shared/services/network.service';
import {
  EVENT_NAME_ON_DID_UPDATE_SCR_REF,
  IScrollGroupRemoteService,
  NETWORK_OBJECT_NAME_SCROLL_GROUP_SERVICE,
  ScrollGroupUpdateInfo,
} from '@shared/services/scroll-group.service-model';
import { settingsService } from '@shared/services/settings.service';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import {
  compareScrRefs,
  deepClone,
  deserialize,
  isPlatformError,
  type PlatformEvent,
  ScrollGroupId,
  serialize,
} from 'platform-bible-utils';

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
      summary: 'Emitted when the Scripture reference for a scroll group changes.',
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

/** Event that emits with information about a changed Scripture Reference for a scroll group */
export const onDidUpdateScrRef: PlatformEvent<ScrollGroupUpdateInfo> = getNetworkEvent(
  EVENT_NAME_ON_DID_UPDATE_SCR_REF,
);

/** See {@link IScrollGroupRemoteService.getScrRef} */
export function getScrRefSync(scrollGroupId: ScrollGroupId = 0): SerializedVerseRef {
  return scrRefs[scrollGroupId] ?? DEFAULT_SCR_REF;
}

/**
 * Get the id of the project whose versification the scroll group's stored `scrRef` is expressed in.
 *
 * @param scrollGroupId Scroll group whose source project id to read. If `undefined`, defaults to 0
 * @returns The source project id, or `undefined` when the source frame is unknown — e.g. the group
 *   was never set with a source, or its ref came from the `platform.verseRef` setting / an external
 *   writer whose versification is not known
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
          projectVersifications.set(
            projectId,
            isPlatformError(value) || value === undefined ? undefined : String(value),
          );
          // This keeps the conversion-cache key fresh, but it intentionally does NOT re-emit
          // onDidUpdateScrRef, so a reference already on screen is not re-converted until the next
          // navigation. Re-converting on a mid-session versification change is out of scope: a
          // project's versification is chosen at creation and effectively never changes during a
          // session, so the added event/re-render churn is not worth it.
        },
        { retrieveDataImmediately: true },
      );
    } catch (e) {
      // Couldn't resolve a versification for this project (e.g. not a scripture project, or it is
      // still loading). Allow a later retry rather than latching it off for the session.
      versificationSubscriptions.delete(projectId);
      logger.warn(`Scroll group could not track versification for project ${projectId}. ${e}`);
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
      // Best-effort display conversion: fall back to the raw reference. Do NOT permanently suppress
      // this project — the failure may be transient (command not registered yet, project still
      // loading), and the command itself passes through when a project has no versification.
      logger.warn(
        `Scroll group could not convert its reference into project ${projectId}'s versification; using the reference unconverted. ${e}`,
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
 * See {@link IScrollGroupRemoteService.setScrRef}
 *
 * @param sourceProjectId Project whose versification `scrRef` is expressed in. `undefined` =
 *   unknown / canonical English.
 * @param shouldSetVerseRefSetting If `true`: if scroll group 0's reference changes, update the
 *   `platform.verseRef` setting to keep it in sync for backwards compatibility. Defaults to `true`.
 *   Only set to `false` when running this from subscription to updates to the setting
 */
export function setScrRefSync(
  scrollGroupId: ScrollGroupId | undefined,
  scrRef: SerializedVerseRef,
  sourceProjectId?: string,
  shouldSetVerseRefSetting = true,
): boolean {
  if (
    !scrRef ||
    !(typeof scrRef.book === 'string') ||
    !(typeof scrRef.chapterNum === 'number') ||
    !(typeof scrRef.verseNum === 'number')
  )
    throw new Error('Must provide scrRef in proper format!');

  const scrollGroupIdDefaulted = scrollGroupId ?? 0;
  const scrRefClone = deepClone(scrRef);

  // compareScrRefs is versification-blind (book/chapter/verse only), so a same-numbered ref set by a
  // different source project still changes the versification frame and must NOT be treated as a
  // no-op. Skip only when the numbers are unchanged AND the write carries no new source info — the
  // `undefined`-source clause also covers the platform.verseRef echo (the setting-sync subscription
  // re-sets the same ref with no source), which must not clobber a known source.
  const scrRefUnchanged =
    compareScrRefs(scrRefs[scrollGroupIdDefaulted] ?? DEFAULT_SCR_REF, scrRefClone) === 0;
  if (
    scrRefUnchanged &&
    (sourceProjectId === undefined ||
      sourceProjectId === scrRefSourceProjectIds[scrollGroupIdDefaulted])
  )
    return false;

  // Update the scr ref and send out an event. The buffered emitter is usable immediately; if it
  // hasn't finished registering yet, the latest update per scroll group is buffered and flushed.
  const sourceProjectIdChanged = scrRefSourceProjectIds[scrollGroupIdDefaulted] !== sourceProjectId;
  scrRefs[scrollGroupIdDefaulted] = scrRefClone;
  scrRefSourceProjectIds[scrollGroupIdDefaulted] = sourceProjectId;
  saveScrRefs(sourceProjectIdChanged);
  onDidUpdateScrRefBufferedEmitter.emit({
    scrollGroupId: scrollGroupIdDefaulted,
    scrRef: scrRefClone,
    sourceProjectId,
  });

  // Only mirror into the backwards-compat platform.verseRef setting when the verse numbers actually
  // changed. A source-only change (same numbers, different source project) still emits the scroll
  // event above so followers re-convert, but must NOT rewrite the setting: platform.verseRef tracks
  // the verse, not the frame, and settingsService.set fans out to every settings subscriber — an
  // identical-value write would be a needless app-wide notification.
  if (shouldSetVerseRefSetting && scrollGroupIdDefaulted === 0 && !scrRefUnchanged)
    (async () => {
      try {
        settingsService.set('platform.verseRef', scrRefClone);
      } catch (e) {
        logger.warn(
          `Failed to update platform.verseRef to ${serialize(scrRefClone)} to keep in sync with scroll group 0! ${e}`,
        );
      }
    })();

  return true;
}

async function setScrRef(
  scrollGroupId: ScrollGroupId | undefined,
  scrRef: SerializedVerseRef,
  sourceProjectId?: string,
): Promise<boolean> {
  return setScrRefSync(scrollGroupId, scrRef, sourceProjectId);
}

const scrollGroupService: IScrollGroupRemoteService = {
  getScrRef,
  setScrRef,
  getScrRefForProject,
};

/** Register the network object that backs the scroll group service */
export async function startScrollGroupService(): Promise<void> {
  await networkObjectService.set(NETWORK_OBJECT_NAME_SCROLL_GROUP_SERVICE, scrollGroupService);

  // Keep scroll group 0 in sync with the verse ref setting for backwards compatibility
  await settingsService.subscribe('platform.verseRef', (newScrRef) => {
    if (isPlatformError(newScrRef)) {
      logger.warn(
        `Scroll group service failed to get platform.verseRef setting to keep in sync! ${newScrRef}`,
      );
      return;
    }
    // Pass `undefined` for the source: the setting carries no source-project frame, so a restored /
    // external platform.verseRef value has an unknown versification and must NOT be assumed to be in
    // the previous source project's frame. When the numbers match the stored ref this is a harmless
    // no-op (the no-op guard in setScrRefSync preserves any known source); when they differ it is a
    // genuine external change whose frame we honestly don't know, so the followers pass it through
    // unconverted rather than mis-framing it.
    setScrRefSync(0, newScrRef, undefined, false);
  });
}
