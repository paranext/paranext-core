import { LocalizationData } from '@shared/services/localization.service-model';
import { DblResourceData, LocalizeKey } from 'platform-bible-utils';

/**
 * Localization keys for the notices the resource picker dialog adds around `ResourcePickerDialog`'s
 * own strings. The component renders `notice` as plain text, so resolving these is the wrapper's
 * job, not the component's.
 */
export const RESOURCE_PICKER_NOTICE_STRING_KEYS: readonly LocalizeKey[] = Object.freeze([
  '%resourcePicker_notice_allResourcesUnavailable%',
  '%resourcePicker_notice_dblCatalogUnavailable%',
  '%resourcePicker_notice_localResourcesUnavailable%',
]);

/**
 * Outcome of one of the resource picker's two independent resource fetches. A failed fetch and a
 * fetch that legitimately found nothing must stay distinguishable so the dialog can explain a short
 * list instead of presenting it as the whole catalog.
 */
export type ResourceFetchResult =
  | { didFetchSucceed: true; resources: DblResourceData[] }
  | { didFetchSucceed: false };

/**
 * Classifies what a resource fetch resolved with. `platformGetResources.getCachedResources` reports
 * an unreachable Digital Bible Library by resolving `undefined` rather than by rejecting, so a
 * nullish value is a failed fetch, not an empty catalog. The value crosses a JSON-RPC boundary, so
 * only an actual array becomes a successful fetch — keeping the resource list safe to spread.
 */
export function toResourceFetchResult(
  resources: DblResourceData[] | undefined,
): ResourceFetchResult {
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
 * A failed catalog fetch only means "just the local resources are shown" when there are local
 * resources to show. With none, the list is empty however it got that way, so the message has to
 * say nothing loaded rather than point at a list that isn't there.
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
  return hasLocalResources
    ? '%resourcePicker_notice_dblCatalogUnavailable%'
    : '%resourcePicker_notice_allResourcesUnavailable%';
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
