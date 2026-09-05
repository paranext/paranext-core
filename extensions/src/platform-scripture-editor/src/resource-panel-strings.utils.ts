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
 * Keeping the whole set in one place is what makes the pairing testable — a web view is not, since
 * nothing under `extensions/` tests a `*.web-view.tsx` (the module assigns itself to
 * `globalThis.webViewComponent`) — and makes a half-added pair a visible hole rather than a missing
 * ternary.
 *
 * Only `ScriptureResource` gets the Bible-texts wording; every other `ResourceType` — including
 * `EnhancedResource`, `XmlResource`, and `SourceLanguageResource` — falls to the commentaries
 * wording. Whether an enhanced resource SHOULD read as a commentary is a product question, not a
 * refactor: this preserves the shipped behavior and pins it with a test. See PT-4416.
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
 * The keys the Bible Texts panel renders in the no-project free-resource entry point.
 *
 * Not part of {@link ResourcePanelStringKeys}: that type is resolved per resource type, and giving
 * it these fields would demand commentary-worded twins that nothing can ever render — the
 * commentary catalogue is the UBS handbook/notes set, none of it openly licensed, so a
 * free-resource picker for the Commentaries tab would be empty by construction.
 *
 * They live here anyway, rather than beside their one consumer, because a web view is not testable
 * (see {@link RESOURCE_PANEL_TYPED_STRING_KEYS}) — so keys declared inside one get no en/es parity
 * coverage at all, which is the silent hole this module exists to close.
 */
export const NO_PROJECT_RESOURCE_PANEL_STRING_KEYS = Object.freeze({
  emptyStatePromptKey: '%webView_resourcePanel_bibleTexts_noProject_emptyState_prompt%',
  pickButtonKey: '%webView_resourcePanel_bibleTexts_noProject_pick%',
  registrationRequiredKey: '%webView_resourcePanel_bibleTexts_noProject_registrationRequired%',
  registerKey: '%webView_resourcePanel_bibleTexts_noProject_register%',
  /**
   * Shown above the picker's list whenever it is restricted to free resources. Explains a list that
   * is short — or empty, if the user's catalog carries none of the allowlisted resources — which
   * the dialog itself cannot account for, because it only sees the already-narrowed array.
   */
  freeResourcesOnlyNoticeKey: '%webView_resourcePanel_freeResourcesOnly_notice%',
} satisfies Record<string, LocalizeKey>);

/**
 * Every key the resource panel can render, both resource types together. Exported so the localized
 * strings parity test can drive off it rather than a hand-maintained literal list.
 */
export const RESOURCE_PANEL_TYPED_STRING_KEYS: readonly LocalizeKey[] = Object.freeze([
  ...Object.values(BIBLE_TEXTS_KEYS),
  ...Object.values(COMMENTARIES_KEYS),
  ...Object.values(NO_PROJECT_RESOURCE_PANEL_STRING_KEYS),
]);
