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

// `as const satisfies` rather than a `: ResourcePanelStringKeys` annotation: the annotation widens
// every value to `LocalizeKey`, which absorbs any `%...%` string, so `RESOURCE_PANEL_STRING_KEYS`
// and the `ResourcePanelLocalizedStrings` it keys would accept keys the panel never renders. The
// `satisfies` clause keeps the shape checked against the documented type.
const BIBLE_TEXTS_KEYS = {
  titleKey: '%webView_resourcePanel_bibleTexts_title%',
  titleWithResourceKey: '%webView_resourcePanel_bibleTexts_title_withResource%',
  emptyStatePromptKey: '%webView_resourcePanel_bibleTexts_emptyState_prompt%',
  bookNotAvailableKey: '%webView_resourcePanel_bibleTexts_bookNotAvailable%',
  pickButtonKey: '%webView_resourcePanel_bibleTexts_pick%',
} as const satisfies ResourcePanelStringKeys;

const COMMENTARIES_KEYS = {
  titleKey: '%webView_resourcePanel_commentaries_title%',
  titleWithResourceKey: '%webView_resourcePanel_commentaries_title_withResource%',
  emptyStatePromptKey: '%webView_resourcePanel_commentaries_emptyState_prompt%',
  bookNotAvailableKey: '%webView_resourcePanel_commentaries_bookNotAvailable%',
  pickButtonKey: '%webView_resourcePanel_commentaries_pick%',
} as const satisfies ResourcePanelStringKeys;

/** The keys for one resource type, each narrowed to the exact key that ships for it. */
export type ResolvedResourcePanelStringKeys = typeof BIBLE_TEXTS_KEYS | typeof COMMENTARIES_KEYS;

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
): ResolvedResourcePanelStringKeys {
  return resourceType === 'ScriptureResource' ? BIBLE_TEXTS_KEYS : COMMENTARIES_KEYS;
}

/**
 * Every key the resource panel can render, both resource types together. Exported so the localized
 * strings parity test can drive off it rather than a hand-maintained literal list, and so
 * `RESOURCE_PANEL_STRING_KEYS` can fold these in without restating them.
 */
export const RESOURCE_PANEL_TYPED_STRING_KEYS = Object.freeze([
  ...Object.values(BIBLE_TEXTS_KEYS),
  ...Object.values(COMMENTARIES_KEYS),
]);
