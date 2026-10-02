import type { LocalizedStringValue } from 'platform-bible-utils';
import type { InstallFailureMessageKeys } from './install-failure-message.utils';

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
  '%webView_modelTextPanel_installedButUnavailable%',
  '%webView_modelTextPanel_retry%',
  // `{summary}` is filled from the summary key, which the Team layout dialog also shows on its own.
  '%webView_modelTextPanel_emptyState_baseOrModel_prompt%',
  '%webView_modelTextPanel_emptyState_baseOrModel_summary%',
  // The empty state's "More info" disclosure, which explains what Base and Model texts are, who
  // chooses one, and that some copyright holders forbid the use. Rendered through
  // `PanelReadinessView`'s `moreInfo` slot. The Team layout dialog requests these same keys (see
  // `BASE_OR_MODEL_TEXT_EXPLANATION_STRING_KEYS`), so rewording one rewords it there too.
  '%webView_modelTextPanel_emptyState_moreInfo%',
  '%webView_modelTextPanel_emptyState_lessInfo%',
  // The empty state's pick button. Generic ("a text") because the column holds a Base or a Model
  // text; the not-found state keeps `%webView_modelTextPanel_pickModelText%` beside its own message.
  '%webView_modelTextPanel_emptyState_pickText%',
  '%webView_modelTextPanel_emptyState_baseOrModel_intro%',
  // Each `...Term` is the bold lead-in to the definition or note that follows it.
  '%webView_modelTextPanel_emptyState_baseOrModel_baseTerm%',
  '%webView_modelTextPanel_emptyState_baseOrModel_baseDefinition%',
  '%webView_modelTextPanel_emptyState_baseOrModel_modelTerm%',
  '%webView_modelTextPanel_emptyState_baseOrModel_modelDefinition%',
  '%webView_modelTextPanel_emptyState_baseOrModel_admin%',
  '%webView_modelTextPanel_emptyState_baseOrModel_copyrightTerm%',
  '%webView_modelTextPanel_emptyState_baseOrModel_copyrightNote%',
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
] as const);

export type ModelTextPanelLocalizedStringKey = (typeof MODEL_TEXT_PANEL_STRING_KEYS)[number];

export type ModelTextPanelLocalizedStrings = {
  [key in ModelTextPanelLocalizedStringKey]?: LocalizedStringValue;
};

/** The Model Text panel's install-failed messages, for `getInstallFailureMessageKey`. */
export const MODEL_TEXT_PANEL_INSTALL_FAILURE_KEYS: InstallFailureMessageKeys<ModelTextPanelLocalizedStringKey> =
  {
    failed: '%webView_modelTextPanel_installFailed%',
    failedOffline: '%webView_modelTextPanel_installFailedOffline%',
    installedButUnavailable: '%webView_modelTextPanel_installedButUnavailable%',
  };
