import papi from '@papi/frontend';
import { useData } from '@papi/frontend/react';
import { isPlatformError, LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { useMemo } from 'react';
import {
  PROJECT_OPEN_BLOCKED_FALLBACK_KEY,
  selectProjectOpenBlockedMessage,
} from '../project-open-blocked.util';

/** Default for the localized strings until the data provider answers. */
const NO_LOCALIZED_STRINGS: LanguageStrings = Object.freeze({});

/**
 * The localized text explaining why a project was refused, for a reason key read from its metadata
 * or from the backend's refusal (see `project-open-blocked.util.ts`).
 *
 * `undefined` when there is no reason, and while the text is still being localized, so a raw key is
 * never shown. Also `undefined` when localization fails, since there is then no text to show.
 *
 * Reads the localization data provider through `useData` rather than `useLocalizedStrings`, which
 * always subscribes: `useData` subscribes only while it is given a data provider, so a view with
 * nothing refused adds no subscription.
 */
export function useProjectOpenBlockedMessage(
  reasonKey: LocalizeKey | undefined,
): string | undefined {
  const selector = useMemo(
    () => ({ localizeKeys: reasonKey ? [reasonKey, PROJECT_OPEN_BLOCKED_FALLBACK_KEY] : [] }),
    [reasonKey],
  );
  const [localizedStrings, , isLoading] = useData(
    reasonKey ? papi.localization.dataProviderName : undefined,
  ).LocalizedStrings(selector, NO_LOCALIZED_STRINGS);
  if (!reasonKey || isLoading || isPlatformError(localizedStrings)) return undefined;
  return selectProjectOpenBlockedMessage(localizedStrings, reasonKey);
}
