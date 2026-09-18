import { localizedStringOrUndefined, LocalizeKey } from 'platform-bible-utils';

/**
 * The shape `useLocalizedStrings` returns. Declared structurally rather than imported as
 * `LanguageStrings` so the helper also accepts a plain literal in tests: `LanguageStrings` keys its
 * index signature by `LocalizeKey`, which a `{ [key: string]: string }` literal cannot satisfy.
 */
type LocalizedStrings = { [key: LocalizeKey]: string };

/** Explains, inside the resource picker, what picking a resource can and cannot do right now */
export const PICKER_NO_PROJECT_NOTICE_KEY: LocalizeKey =
  '%webView_scriptureTextGrid_viewOptions_pickerNoProjectNotice%';

/** Confirms a download that finished with no text collection to add it to */
export const DOWNLOADED_NO_PROJECT_KEY: LocalizeKey =
  '%webView_scriptureTextGrid_viewOptions_downloadedNoProject%';

/** Keys the View Options notices need in every shipped language */
export const VIEW_OPTIONS_NOTICE_STRING_KEYS: LocalizeKey[] = [
  PICKER_NO_PROJECT_NOTICE_KEY,
  DOWNLOADED_NO_PROJECT_KEY,
];

/**
 * The notice shown above the resource picker's list, or `undefined` when there is nothing to say.
 *
 * With a text collection bound there is no limitation to explain. Without one, a pick can still
 * install a resource but cannot add it anywhere, which the user should know before committing to a
 * download.
 */
export function resolvePickerNotice(
  localizedStrings: LocalizedStrings,
  hasTextConnection: boolean,
): string | undefined {
  return hasTextConnection
    ? undefined
    : localizedStringOrUndefined(localizedStrings, PICKER_NO_PROJECT_NOTICE_KEY);
}
