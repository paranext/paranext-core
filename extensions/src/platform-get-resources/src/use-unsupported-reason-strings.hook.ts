import { useLocalizedStrings } from '@papi/frontend/react';
import { isLocalizeKey, type LanguageStrings, type LocalizeKey } from 'platform-bible-utils';
import type { SharedProjectsInfo } from 'platform-scripture';
import { useMemo } from 'react';
import type { LocalProjectInfo } from './home.component';

/** Stable empty result while localization is loading. See {@link useUnsupportedReasonStrings}. */
const EMPTY_REASON_STRINGS: LanguageStrings = Object.freeze({});

/** Stable key list for the common case of no unsupported project. */
const NO_REASON_KEYS: LocalizeKey[] = [];

/** Joins localize keys into one comparable value; no key contains a line break. */
const REASON_KEY_SEPARATOR = '\n';

/**
 * Localized text for every `unsupportedReason` key in the listed projects. Keys are chosen by each
 * project's factory (and by the S/R service), so the set is data rather than a fixed list. Empty
 * while loading: the loading seed maps a key to itself, which would show as tooltip text.
 */
export function useUnsupportedReasonStrings(
  localProjectsInfo: LocalProjectInfo[],
  sharedProjectsInfo?: SharedProjectsInfo,
): LanguageStrings {
  // Every refresh brings new lists, so the key list is memoized on the set of keys rather than on
  // the lists: a new key list resubscribes to localization.
  const joinedReasonKeys = [
    ...new Set([
      ...localProjectsInfo.map((project) => project.unsupportedReason),
      ...Object.values(sharedProjectsInfo ?? {}).map((project) => project.unsupportedReason),
    ]),
  ]
    .filter((reason): reason is LocalizeKey => !!reason && isLocalizeKey(reason))
    .sort()
    .join(REASON_KEY_SEPARATOR);
  const keys = useMemo(
    () =>
      joinedReasonKeys
        ? joinedReasonKeys.split(REASON_KEY_SEPARATOR).filter(isLocalizeKey)
        : NO_REASON_KEYS,
    [joinedReasonKeys],
  );
  const [strings, isLoading] = useLocalizedStrings(keys);
  return isLoading ? EMPTY_REASON_STRINGS : strings;
}
