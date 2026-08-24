import type { LocalizedStringValue } from 'platform-bible-utils';

/**
 * Object containing all keys used for localization in the model text panel. Pass these keys into
 * the Platform's localization hook and pass the resulting localized strings into the
 * `localizedStrings` prop.
 *
 * Kept in its own module, following `book-not-available-view.const.ts`, so a consumer can read the
 * key list without importing the component. `localized-strings.test.ts` is the reason that matters:
 * it runs in the node environment, and reaching this list through `model-text-panel.component.tsx`
 * pulled the whole editor component tree in with it and failed on `document is not defined`.
 */
export const MODEL_TEXT_PANEL_STRING_KEYS = Object.freeze([
  // Shown while an auto-installing (not user-picked) resource downloads.
  '%webView_modelTextPanel_installing%',
  // Shown while a user-picked resource is being selected/installed.
  '%webView_modelTextPanel_selecting%',
  '%webView_modelTextPanel_noProject%',
  '%webView_modelTextPanel_pickModelText%',
  '%webView_modelTextPanel_unknownResource%',
  '%webView_modelTextPanel_installFailed%',
  '%webView_modelTextPanel_installFailedOffline%',
  '%webView_modelTextPanel_retry%',
  '%webView_modelTextPanel_emptyState_prompt%',
  '%webView_modelTextPanel_bookNotAvailable%',
  // Shared with the resource text panel's blank-chapter branch. Distinct from the editable
  // `..._emptyChapter_message%`, which sits beside an "Add chapter number" action this read-only
  // panel must not offer.
  '%webView_platformScriptureEditor_emptyChapter_messageResource%',
] as const);

export type ModelTextPanelLocalizedStringKey = (typeof MODEL_TEXT_PANEL_STRING_KEYS)[number];

export type ModelTextPanelLocalizedStrings = {
  [key in ModelTextPanelLocalizedStringKey]?: LocalizedStringValue;
};
