import papi from '@papi/frontend';
import { useData } from '@papi/frontend/react';
import {
  isPlatformError,
  LanguageStrings,
  LocalizeKey,
  PROJECT_OPEN_BLOCKED_FALLBACK_KEY,
  PROJECT_OPEN_BLOCKED_FALLBACK_MESSAGE,
} from 'platform-bible-utils';
import { useMemo, useState } from 'react';
import { selectProjectOpenBlockedMessage } from '../project-open-blocked.util';

/** Default for the localized strings until the data provider answers. */
const NO_LOCALIZED_STRINGS: LanguageStrings = Object.freeze({});

/**
 * The localized text explaining why a project was refused, for a reason key read from its metadata
 * or from the backend's refusal (see `project-open-blocked.util.ts`).
 *
 * `undefined` when there is no reason, and while the text is first being localized, so a raw key is
 * never shown. When localization fails, or neither the reason nor the generic reason resolves, it
 * is {@link PROJECT_OPEN_BLOCKED_FALLBACK_MESSAGE}.
 *
 * Reads the localization data provider through `useData` rather than `useLocalizedStrings`, which
 * always subscribes: `useData` subscribes only while it is given a data provider, so a view that
 * has never been refused adds no subscription. Once a reason has been seen the subscription is kept
 * for it while `reasonKey` is `undefined`, because views clear their error at the start of every
 * reload: dropping it there would make each refused reload wait a localization round trip before
 * its reason could show again.
 */
export function useProjectOpenBlockedMessage(
  reasonKey: LocalizeKey | undefined,
): string | undefined {
  const [subscribedReasonKey, setSubscribedReasonKey] = useState(reasonKey);
  if (reasonKey && reasonKey !== subscribedReasonKey) setSubscribedReasonKey(reasonKey);

  const selector = useMemo(
    () => ({
      localizeKeys: subscribedReasonKey
        ? [subscribedReasonKey, PROJECT_OPEN_BLOCKED_FALLBACK_KEY]
        : [],
    }),
    [subscribedReasonKey],
  );
  const [localizedStrings, , isLoading] = useData(
    subscribedReasonKey ? papi.localization.dataProviderName : undefined,
  ).LocalizedStrings(selector, NO_LOCALIZED_STRINGS);
  if (!reasonKey || isLoading) return undefined;
  if (isPlatformError(localizedStrings)) return PROJECT_OPEN_BLOCKED_FALLBACK_MESSAGE;
  return (
    selectProjectOpenBlockedMessage(localizedStrings, reasonKey) ??
    PROJECT_OPEN_BLOCKED_FALLBACK_MESSAGE
  );
}
