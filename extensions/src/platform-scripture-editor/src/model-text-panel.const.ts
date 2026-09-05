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
  // Shown with no project open and nothing free to offer, so there is no picker worth showing.
  '%webView_modelTextPanel_noProject%',
  // The no-project entry point, where the panel offers free / openly-licensed resources instead of
  // the project's configured model text. Separate wording because there is no model relationship to
  // name — the user is choosing something to read, not a text to translate against.
  '%webView_modelTextPanel_noProject_emptyState_prompt%',
  '%webView_modelTextPanel_noProject_pick%',
  // Shown when the DBL catalog is unreachable specifically because the registration is missing or
  // invalid. Paired with the register action rather than a retry, which cannot succeed until the
  // registration changes.
  '%webView_modelTextPanel_noProject_registrationRequired%',
  '%webView_modelTextPanel_noProject_register%',
  // No-project variants of the panel's failure wording. The project-scoped originals all name a
  // "model text", which is a relationship that does not exist here — the user is choosing something
  // to read, not a text to translate against.
  '%webView_modelTextPanel_noProject_bookNotAvailable%',
  '%webView_modelTextPanel_noProject_installFailed%',
  '%webView_modelTextPanel_noProject_installFailedOffline%',
  '%webView_modelTextPanel_noProject_settingsUnavailable%',
  '%webView_modelTextPanel_noProject_unknownResource%',
  '%webView_modelTextPanel_pickModelText%',
  '%webView_modelTextPanel_unknownResource%',
  '%webView_modelTextPanel_installFailed%',
  '%webView_modelTextPanel_installFailedOffline%',
  '%webView_modelTextPanel_retry%',
  '%webView_modelTextPanel_emptyState_prompt%',
  // Readiness states: the panel cannot read its setting, the DBL catalog failed, or either is still
  // in flight. See `getResourcePanelReadiness` and `PanelReadinessView`.
  '%webView_modelTextPanel_settingsUnavailable%',
  '%webView_modelTextPanel_catalogUnavailable%',
  '%webView_modelTextPanel_loading%',
  '%webView_modelTextPanel_bookNotAvailable%',
  // Shared with the resource text panel's blank-chapter branch. Distinct from the editable
  // `..._emptyChapter_message%`, which sits beside an "Add chapter number" action this read-only
  // panel must not offer.
  '%webView_platformScriptureEditor_emptyChapter_messageResource%',
  // Shared with the resource text panel's terminal-failure branch. The sentence names neither a
  // panel nor a resource type, because what failed is the read rather than the kind of text.
  '%webView_resourcePanel_textUnavailable%',
  // Shared likewise: shown in the picker whenever it is restricted to free resources, explaining a
  // list the dialog itself cannot account for.
  '%webView_resourcePanel_freeResourcesOnly_notice%',
] as const);

export type ModelTextPanelLocalizedStringKey = (typeof MODEL_TEXT_PANEL_STRING_KEYS)[number];

export type ModelTextPanelLocalizedStrings = {
  [key in ModelTextPanelLocalizedStringKey]?: LocalizedStringValue;
};
