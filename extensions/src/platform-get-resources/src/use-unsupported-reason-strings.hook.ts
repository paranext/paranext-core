import { useLocalizedStrings } from '@papi/frontend/react';
import {
  isLocalizeKey,
  type LanguageStrings,
  type LocalizeKey,
  PROJECT_OPEN_BLOCKED_FALLBACK_KEY,
  PROJECT_OPEN_BLOCKED_FALLBACK_MESSAGE,
} from 'platform-bible-utils';
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
 * Localized text for every `unsupportedReason` key in the listed projects, plus
 * {@link PROJECT_OPEN_BLOCKED_FALLBACK_KEY} whenever any project has a reason, so a reason that
 * cannot be shown itself still has an explanation. Keys are chosen by each project's factory (and
 * by the S/R service), so the set is data rather than a fixed list. Empty while loading: the
 * loading seed maps a key to itself, which would show as tooltip text. Once loaded, the generic
 * reason is always showable text, falling back to English if it has no translation.
 */
export function useUnsupportedReasonStrings(
  localProjectsInfo: LocalProjectInfo[],
  sharedProjectsInfo?: SharedProjectsInfo,
): LanguageStrings {
  const reasons = [
    ...localProjectsInfo.map((project) => project.unsupportedReason),
    ...Object.values(sharedProjectsInfo ?? {}).map((project) => project.unsupportedReason),
  ];
  // Every refresh brings new lists, so the key list is memoized on the set of keys rather than on
  // the lists: a new key list resubscribes to localization.
  const joinedReasonKeys = reasons.some((reason) => !!reason)
    ? [...new Set([...reasons, PROJECT_OPEN_BLOCKED_FALLBACK_KEY])]
        .filter((reason): reason is LocalizeKey => !!reason && isLocalizeKey(reason))
        .sort()
        .join(REASON_KEY_SEPARATOR)
    : '';
  const keys = useMemo(
    () =>
      joinedReasonKeys
        ? joinedReasonKeys.split(REASON_KEY_SEPARATOR).filter(isLocalizeKey)
        : NO_REASON_KEYS,
    [joinedReasonKeys],
  );
  const [strings, isLoading] = useLocalizedStrings(keys);
  return useMemo(() => {
    if (isLoading) return EMPTY_REASON_STRINGS;
    if (!keys.includes(PROJECT_OPEN_BLOCKED_FALLBACK_KEY)) return strings;
    const generic = strings[PROJECT_OPEN_BLOCKED_FALLBACK_KEY];
    if (generic && !isLocalizeKey(generic)) return strings;
    return {
      ...strings,
      [PROJECT_OPEN_BLOCKED_FALLBACK_KEY]: PROJECT_OPEN_BLOCKED_FALLBACK_MESSAGE,
    };
  }, [isLoading, keys, strings]);
}
