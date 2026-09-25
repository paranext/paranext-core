import type { LanguageInfo } from 'platform-bible-react';
import { languageDetails } from '@shared/data/language-details.data';

/**
 * Interface languages listed in the language pickers and used for the first-run OS-locale default,
 * in the order they are listed. Other locale files still ship and render when
 * `platform.interfaceLanguage` names them. Offering another language is a change to this list
 * only.
 *
 * PT-4457 is expected to replace this with a rule based on app-wide translation coverage; the
 * `%firstRun_` keys alone are not enough, since a locale can have all of them and little else.
 */
export const OFFERED_INTERFACE_LANGUAGES: readonly string[] = ['en', 'es'];

/** Whether `tag` is one of the {@link OFFERED_INTERFACE_LANGUAGES}, compared exactly. */
export function isOfferedInterfaceLanguage(tag: string): boolean {
  return OFFERED_INTERFACE_LANGUAGES.includes(tag);
}

/**
 * Returns a new record holding only the offered languages found in `locales`, in
 * {@link OFFERED_INTERFACE_LANGUAGES} order.
 */
export function filterToOffered(
  locales: Record<string, LanguageInfo>,
): Record<string, LanguageInfo> {
  return Object.fromEntries(
    OFFERED_INTERFACE_LANGUAGES.filter((tag) => Object.hasOwn(locales, tag)).map((tag) => [
      tag,
      locales[tag],
    ]),
  );
}

/**
 * Display info for the offered languages, for a picker to show while the offered list loads or when
 * it fails to load.
 */
export function getOfferedLanguageDefaults(): Record<string, LanguageInfo> {
  return Object.fromEntries(
    OFFERED_INTERFACE_LANGUAGES.map((tag) => [tag, languageDetails[tag] ?? { autonym: tag }]),
  );
}
