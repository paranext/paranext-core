import { DblResourceData, LanguageStrings, LocalizeKey } from 'platform-bible-utils';

/**
 * Disabled reason explaining why a text cannot be picked as a model or base text. A core string, so
 * it lives in core's `assets/localization`; extensions that disable the same texts in their own
 * pickers reuse this key.
 */
export const RESTRICTED_MODEL_OR_BASE_TEXT_DISABLED_REASON_KEY: LocalizeKey =
  '%restrictedModelOrBaseText_disabledReason%';

/** Disabled reason for a text whose licensing terms are not known yet */
export const RESTRICTED_MODEL_OR_BASE_TEXT_PENDING_REASON_KEY: LocalizeKey =
  '%restrictedModelOrBaseText_pendingReason%';

/** Localization keys {@link getRestrictedModelTextReason} reads */
export const RESTRICTED_MODEL_TEXT_STRING_KEYS: readonly LocalizeKey[] = Object.freeze([
  RESTRICTED_MODEL_OR_BASE_TEXT_DISABLED_REASON_KEY,
  RESTRICTED_MODEL_OR_BASE_TEXT_PENDING_REASON_KEY,
]);

/** Whether the backend has not yet said whether this resource is restricted as a model text */
export function isModelTextRestrictionPending(resource: DblResourceData): boolean {
  return resource.isRestrictedAsModelText === undefined;
}

/**
 * Why a resource cannot be picked as a model or base text, or `undefined` when it can. Only
 * traditionally licensed Biblica texts are restricted today; their license prohibits using them as
 * the basis of a new translation. A resource the backend has not answered for yet is disabled too,
 * so a picker opened before the answer never offers a restricted text. Pass as a resource picker's
 * `getDisabledReason`.
 */
export function getRestrictedModelTextReason(
  resource: DblResourceData,
  localizedStrings: LanguageStrings,
): string | undefined {
  let key: LocalizeKey;
  if (isModelTextRestrictionPending(resource))
    key = RESTRICTED_MODEL_OR_BASE_TEXT_PENDING_REASON_KEY;
  else if (resource.isRestrictedAsModelText)
    key = RESTRICTED_MODEL_OR_BASE_TEXT_DISABLED_REASON_KEY;
  else return undefined;
  // Falls back to the key because pickers disable a row only when it has a reason: a missing string
  // must not make a restricted text selectable.
  return localizedStrings[key] || key;
}
