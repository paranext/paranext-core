import { languageDetails } from '@shared/data/language-details.data';
import type { LanguageInfo } from 'platform-bible-react';

/**
 * Returns a copy of `languages` that also contains every tag in `currentTags`, so a language the
 * user already has selected always appears (and can show as selected) in a language picker — even
 * when it is not one of the offered languages, or the offered list is still loading. Added tags are
 * labeled from the shared language details, falling back to the raw tag.
 *
 * @param languages The languages the picker offers, keyed by raw locale tag
 * @param currentTags The user's current interface languages (primary first)
 * @returns A new record; `languages` is not modified
 */
export function includeCurrentLanguages(
  languages: Record<string, LanguageInfo>,
  currentTags: readonly string[],
): Record<string, LanguageInfo> {
  const result = { ...languages };
  currentTags.forEach((tag) => {
    if (!result[tag]) result[tag] = languageDetails[tag] ?? { autonym: tag };
  });
  return result;
}

export default includeCurrentLanguages;
