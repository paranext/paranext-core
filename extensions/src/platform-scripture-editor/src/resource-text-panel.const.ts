import type { LocalizedStringValue } from 'platform-bible-utils';
import { RESOURCE_PANEL_TYPED_STRING_KEYS } from './resource-panel-strings.utils';

/**
 * Object containing all keys used for localization in the resource text panel. Pass these keys into
 * the Platform's localization hook (in the app) or `getLocalizedStrings` (in Storybook) and pass
 * the resulting localized strings into the `localizedStrings` prop.
 *
 * The per-resource-type keys come from `RESOURCE_PANEL_TYPED_STRING_KEYS` rather than being listed
 * again here. `useLocalizedStrings` seeds key-to-key defaults only for the keys in the array it is
 * given, so a hand-maintained second list is a silent hole: add a field to
 * `ResourcePanelStringKeys`, forget the array, and the render site reads `undefined` and announces
 * an empty message.
 *
 * Kept in its own module, following `model-text-panel.const.ts`, so a consumer can read the key
 * list without importing the panel. `resource-text-panel.component.tsx` imports `Editorial` at
 * module scope, so reaching this list through it drags the whole editor component tree along:
 * `localized-strings.test.ts` runs in the node environment, where that fails on `document is not
 * defined`, and the Storybook stories would load an editor just to obtain a string array.
 */
export const RESOURCE_PANEL_STRING_KEYS = Object.freeze([
  // Shared with the model text panel's blank-chapter branch. Distinct from the editable
  // `..._emptyChapter_message%`, which sits beside an "Add chapter number" action these read-only
  // panels must not offer. The missing-book wording is per resource type and comes from
  // `RESOURCE_PANEL_TYPED_STRING_KEYS` below; a blank chapter reads the same either way.
  '%webView_platformScriptureEditor_emptyChapter_messageResource%',
  '%webView_resourcePanel_noProject%',
  '%webView_resourcePanel_installing%',
  '%webView_resourcePanel_selecting%',
  '%webView_resourcePanel_installFailed%',
  '%webView_resourcePanel_installFailedOffline%',
  '%webView_resourcePanel_retry%',
  '%webView_resourcePanel_settingsUnavailable%',
  '%webView_resourcePanel_loading%',
  '%webView_resourcePanel_catalogUnavailable%',
  '%webView_resourcePanel_downloadResources%',
  '%webView_resourcePanel_textUnavailable%',
  ...RESOURCE_PANEL_TYPED_STRING_KEYS,
] as const);

export type ResourcePanelLocalizedStringKey = (typeof RESOURCE_PANEL_STRING_KEYS)[number];

export type ResourcePanelLocalizedStrings = {
  [key in ResourcePanelLocalizedStringKey]?: LocalizedStringValue;
};
