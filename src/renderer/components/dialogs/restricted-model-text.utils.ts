import { DblResourceData, LanguageStrings, LocalizeKey } from 'platform-bible-utils';

/**
 * Disabled reason explaining why a text cannot be picked as a model or base text. A core string, so
 * it lives in core's `assets/localization`; extensions that disable the same texts in their own
 * pickers reuse this key.
 */
export const RESTRICTED_MODEL_OR_BASE_TEXT_DISABLED_REASON_KEY: LocalizeKey =
  '%restrictedModelOrBaseText_disabledReason%';

/**
 * Why a resource cannot be picked as a model or base text, or `undefined` when it can. Only
 * traditionally licensed Biblica texts are restricted today; their license prohibits using them as
 * the basis of a new translation. Pass as a resource picker's `getDisabledReason`.
 */
export function getRestrictedModelTextReason(
  resource: DblResourceData,
  localizedStrings: LanguageStrings,
): string | undefined {
  // Falls back to the key because pickers disable a row only when it has a reason: a missing string
  // must not make a restricted text selectable.
  return resource.isRestrictedAsModelText
    ? localizedStrings[RESTRICTED_MODEL_OR_BASE_TEXT_DISABLED_REASON_KEY] ||
        RESTRICTED_MODEL_OR_BASE_TEXT_DISABLED_REASON_KEY
    : undefined;
}
