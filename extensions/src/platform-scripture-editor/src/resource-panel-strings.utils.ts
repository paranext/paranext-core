import type { LocalizeKey, ResourceType } from 'platform-bible-utils';

/** The localized string keys the resource panel renders, resolved for one resource type. */
export type ResourcePanelStringKeys = {
  /** Panel title when no resource is selected. */
  titleKey: LocalizeKey;
  /** Panel title naming the selected resource. */
  titleWithResourceKey: LocalizeKey;
  /** Prompt shown when nothing has been picked yet. */
  emptyStatePromptKey: LocalizeKey;
  /** Message shown when the current book is not in the selected resource. */
  bookNotAvailableKey: LocalizeKey;
  /** Label of the button that opens the resource picker. */
  pickButtonKey: LocalizeKey;
};

const BIBLE_TEXTS_KEYS: ResourcePanelStringKeys = {
  titleKey: '%webView_resourcePanel_bibleTexts_title%',
  titleWithResourceKey: '%webView_resourcePanel_bibleTexts_title_withResource%',
  emptyStatePromptKey: '%webView_resourcePanel_bibleTexts_emptyState_prompt%',
  bookNotAvailableKey: '%webView_resourcePanel_bibleTexts_bookNotAvailable%',
  pickButtonKey: '%webView_resourcePanel_bibleTexts_pick%',
};

const COMMENTARIES_KEYS: ResourcePanelStringKeys = {
  titleKey: '%webView_resourcePanel_commentaries_title%',
  titleWithResourceKey: '%webView_resourcePanel_commentaries_title_withResource%',
  emptyStatePromptKey: '%webView_resourcePanel_commentaries_emptyState_prompt%',
  bookNotAvailableKey: '%webView_resourcePanel_commentaries_bookNotAvailable%',
  pickButtonKey: '%webView_resourcePanel_commentaries_pick%',
};

/**
 * Every localized string key the resource panel needs for one resource type.
 *
 * The panel previously chose each key with its own inline `resourceType === 'ScriptureResource'`
 * ternary — five of them, one per string. Collecting them here makes the pairing testable (a web
 * view is not: nothing under `extensions/` tests a `*.web-view.tsx`, because the module assigns
 * itself to `globalThis.webViewComponent`) and makes a half-added pair a visible hole rather than a
 * ternary someone forgot to write.
 *
 * Only `ScriptureResource` gets the Bible-texts wording; every other `ResourceType` — including
 * `EnhancedResource`, `XmlResource`, and `SourceLanguageResource` — falls to the commentaries
 * wording. That is the behaviour of the five ternaries this replaced (each tested `===
 * 'ScriptureResource'`), preserved deliberately rather than narrowed, since changing which strings
 * an enhanced resource shows is a product decision and not a refactor.
 *
 * @param resourceType Which kind of resource the panel is showing.
 * @returns The keys for that resource type.
 */
export function resolveResourcePanelStringKeys(
  resourceType: ResourceType,
): ResourcePanelStringKeys {
  return resourceType === 'ScriptureResource' ? BIBLE_TEXTS_KEYS : COMMENTARIES_KEYS;
}

/**
 * Every key the resource panel can render, both resource types together. Exported so the localized
 * strings parity test can drive off it rather than a hand-maintained literal list.
 */
export const RESOURCE_PANEL_TYPED_STRING_KEYS: readonly LocalizeKey[] = Object.freeze([
  ...Object.values(BIBLE_TEXTS_KEYS),
  ...Object.values(COMMENTARIES_KEYS),
]);
