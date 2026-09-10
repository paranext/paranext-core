import { LocalizationData } from '@shared/services/localization.service-model';
import type { DblResourceCatalog } from 'platform-get-resources';
import { DblResourceData, LocalizeKey } from 'platform-bible-utils';

/**
 * Localization keys for the notices the resource picker dialog adds around `ResourcePickerDialog`'s
 * own strings. The component renders `notice` as plain text, so resolving these is the wrapper's
 * job, not the component's.
 */
export const RESOURCE_PICKER_NOTICE_STRING_KEYS: readonly LocalizeKey[] = Object.freeze([
  '%resourcePicker_notice_dblCatalogUnavailable%',
  '%resourcePicker_notice_downloadsUnavailable%',
  '%resourcePicker_notice_localResourcesUnavailable%',
]);

/**
 * Outcome of one of the resource picker's two independent resource fetches. A failed fetch and a
 * fetch that legitimately found nothing must stay distinguishable so the dialog can explain a short
 * list instead of presenting it as the whole catalog.
 *
 * `isPermanent` separates the two ways a fetch can come back empty-handed. An installation with no
 * DBL credentials will never have a catalog, so it earns a different sentence and no retry; every
 * other failure might succeed on the next attempt.
 */
export type ResourceFetchResult =
  | { didFetchSucceed: true; resources: DblResourceData[] }
  | { didFetchSucceed: false; isPermanent?: boolean };

/**
 * Classifies what the DBL catalog command answered with.
 *
 * The command distinguishes its own three outcomes (see `DblResourceCatalog`), so this is a
 * translation and not a guess: `notConfigured` is a permanent answer, `notReady` is transient, and
 * a genuine failure rejects and never reaches here.
 *
 * @param catalog What `platformGetResources.getCachedResources` resolved with.
 * @returns The fetch outcome in the shape the notice builder reads.
 */
export function toDblFetchResult(catalog: DblResourceCatalog): ResourceFetchResult {
  if (catalog.status === 'available')
    return { didFetchSucceed: true, resources: catalog.resources };
  return { didFetchSucceed: false, isPermanent: catalog.reason === 'notConfigured' };
}

/**
 * Classifies what the locally-installed non-DBL resource command answered with. It resolves an
 * array or rejects, so only an actual array is a successful fetch — which also keeps the resource
 * list safe to spread after it crosses a JSON-RPC boundary.
 *
 * @param resources What `platformGetResources.getLocalNonDblResources` resolved with.
 * @returns The fetch outcome in the shape the notice builder reads.
 */
export function toLocalFetchResult(resources: DblResourceData[] | undefined): ResourceFetchResult {
  return Array.isArray(resources)
    ? { didFetchSucceed: true, resources }
    : { didFetchSucceed: false };
}

/** Combines the resources of whichever fetches succeeded into the list the dialog displays */
export function collectFetchedResources(
  dblCatalogFetch: ResourceFetchResult | undefined,
  localResourceFetch: ResourceFetchResult | undefined,
): DblResourceData[] {
  return [dblCatalogFetch, localResourceFetch].flatMap((fetchResult) =>
    fetchResult?.didFetchSucceed ? fetchResult.resources : [],
  );
}

/**
 * Reads a localized string, or `undefined` when there is nothing usable to show. The localization
 * service echoes the key back when it has no translation for it, so a missing translation has to be
 * recognized by value as well as by absence — otherwise a notice renders as literal `%key%` text.
 */
function localizeString(strings: LocalizationData, key: LocalizeKey): string | undefined {
  const value = strings[key];
  return value === undefined || value === key ? undefined : value;
}

/**
 * Picks the key describing what is limiting the resource list, or `undefined` when nothing is.
 *
 * Only ever describes a list that is INCOMPLETE but still worth reading. When a failure left
 * nothing at all to show, the picker's own body state says so and offers the retry, and a notice
 * above it would be a second voice explaining the same emptiness.
 */
function resolveFetchNoticeKey(
  dblCatalogFetch: ResourceFetchResult,
  localResourceFetch: ResourceFetchResult,
): LocalizeKey | undefined {
  if (dblCatalogFetch.didFetchSucceed)
    return localResourceFetch.didFetchSucceed
      ? undefined
      : '%resourcePicker_notice_localResourcesUnavailable%';

  const hasLocalResources =
    localResourceFetch.didFetchSucceed && localResourceFetch.resources.length > 0;
  if (!hasLocalResources) return undefined;

  // An installation with no DBL credentials is not having a bad day — saying "right now" would
  // promise a recovery that is never coming.
  return dblCatalogFetch.isPermanent
    ? '%resourcePicker_notice_downloadsUnavailable%'
    : '%resourcePicker_notice_dblCatalogUnavailable%';
}

/**
 * Builds the sentence shown above the resource list explaining what is limiting it, or `undefined`
 * when nothing is.
 *
 * @param dblCatalogFetch Outcome of the Digital Bible Library catalog fetch, or `undefined` while
 *   it is still in flight
 * @param localResourceFetch Outcome of the locally-installed non-DBL resource fetch, or `undefined`
 *   while it is still in flight
 * @param localizedStrings Strings for {@link RESOURCE_PICKER_NOTICE_STRING_KEYS}
 * @param callerNotice Already-localized explanation from the panel that opened the dialog, shown
 *   ahead of any fetch-failure explanation
 */
export function buildResourcePickerNotice(
  dblCatalogFetch: ResourceFetchResult | undefined,
  localResourceFetch: ResourceFetchResult | undefined,
  localizedStrings: LocalizationData,
  callerNotice?: string,
): string | undefined {
  // Both fetches have to land before a fetch notice can be accurate — one still in flight could
  // change which message is true — and until then the list's own loading state covers the wait.
  const fetchNoticeKey =
    dblCatalogFetch && localResourceFetch
      ? resolveFetchNoticeKey(dblCatalogFetch, localResourceFetch)
      : undefined;

  const fetchNotice = fetchNoticeKey ? localizeString(localizedStrings, fetchNoticeKey) : undefined;
  return [callerNotice, fetchNotice].filter((part) => !!part).join(' ') || undefined;
}
