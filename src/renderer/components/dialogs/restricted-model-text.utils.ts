import { DblResourceData, LanguageStrings, LocalizeKey } from 'platform-bible-utils';

/**
 * Tooltip explaining why a text cannot be picked as a model or base text. The string lives in
 * platform-scripture, next to the copyright notice strings it belongs with.
 */
export const RESTRICTED_MODEL_TEXT_TOOLTIP_KEY: LocalizeKey =
  '%platformScripture_copyrightNotice_restrictedModelText_tooltip%';

/**
 * Why a resource cannot be picked as a model or base text, or `undefined` when it can. Only
 * traditionally licensed Biblica texts are restricted today; their licence prohibits using them as
 * the basis of a new translation. Pass as a resource picker's `getDisabledReason`.
 */
export function getRestrictedModelTextReason(
  resource: DblResourceData,
  localizedStrings: LanguageStrings,
): string | undefined {
  return resource.isRestrictedAsModelText
    ? localizedStrings[RESTRICTED_MODEL_TEXT_TOOLTIP_KEY]
    : undefined;
}
