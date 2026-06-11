import type { HyphenationEntry } from 'platform-scripture';

/**
 * Localization keys used by the Hyphenation tool. Import this constant, pass it to the platform's
 * `useLocalizedStrings` hook in the web-view wiring layer, and forward the result to the component.
 * Storybook stories may pass English fallbacks directly.
 */
export const HYPHENATION_STRING_KEYS = Object.freeze([
  '%webView_hyphenation_addWord%',
  '%webView_hyphenation_addWordTitle%',
  '%webView_hyphenation_approvedLabel%',
  '%webView_hyphenation_cancel%',
  '%webView_hyphenation_delete%',
  '%webView_hyphenation_edit%',
  '%webView_hyphenation_enterHyphenation%',
  '%webView_hyphenation_hyphenationHelp%',
  '%webView_hyphenation_hyphenationLabel%',
  '%webView_hyphenation_invalidWordError%',
  '%webView_hyphenation_noEntries%',
  '%webView_hyphenation_redundancyNotice%',
  '%webView_hyphenation_save%',
  '%webView_hyphenation_searchPlaceholder%',
  '%webView_hyphenation_toggleApproved%',
  '%webView_hyphenation_uppercaseNotice%',
  '%webView_hyphenation_wordLabel%',
  '%platformScripture_hyphenation_invalidHyphenationError%',
] as const);

export type HyphenationLocalizedStringKey = (typeof HYPHENATION_STRING_KEYS)[number];

/**
 * Map of localization keys to resolved strings. Keys are optional because the platform's
 * localization hook returns partial results while loading.
 */
export type HyphenationLocalizedStrings = {
  [key in HyphenationLocalizedStringKey]?: string;
};

/**
 * === PORTED FROM PT9 === Source: PT9/Paratext/WordList/WordListForm.cs:2698 (EditHyphenation
 * validation), PT9/Paratext/Linguistics/HyphenationEngine.cs:252 (RecordHyphenationInternal)
 * Method: WordListForm.EditHyphenation() Maps to:
 * research/paratext-9-features/05_Spelling_Wordlist.md §5.6
 *
 * Checks that a hyphenation string is valid for a word: with all "=" hyphen markers removed, it
 * must equal the word, case-insensitively. This is a client-side convenience check for instant
 * feedback; the C# backend (HyphenationDataProvider) performs the authoritative validation with the
 * same rule.
 */
export function isValidHyphenation(word: string, hyphenation: string): boolean {
  if (!word) return false;
  return hyphenation.replaceAll('=', '').toLowerCase() === word.toLowerCase();
}

/**
 * === NEW IN PT10 === Reason: PT9's Wordlist supplies words from project text, so free-form word
 * entry never occurs there. PT10's Hyphenation tool lets users add words directly (the Wordlist
 * tool is not yet ported), so manually entered words must not break the hyphenatedWords.txt
 * line-based format. Maps to: Infrastructure
 *
 * Checks that a manually entered word is storable in hyphenatedWords.txt: non-empty, no whitespace
 * (entries are whole-line), no "=" (the hyphen marker), and must not start with "*" (approved-entry
 * marker) or "#" (comment marker).
 */
export function isValidNewWord(word: string): boolean {
  if (!word) return false;
  if (/\s/.test(word)) return false;
  if (word.includes('=')) return false;
  if (word.startsWith('*') || word.startsWith('#')) return false;
  return true;
}

/**
 * === NEW IN PT10 === Reason: Client-side filtering for the Hyphenation tool's search box (PT9's
 * Wordlist has its own filtering UI that is not part of this port). Maps to: Infrastructure
 *
 * Filters hyphenation entries to those whose word contains the search text (case-insensitive).
 * Returns the same array instance when the search text is empty so referential equality is
 * preserved for memoization.
 */
export function filterEntries(entries: HyphenationEntry[], searchText: string): HyphenationEntry[] {
  const search = searchText.trim().toLowerCase();
  if (!search) return entries;
  return entries.filter((entry) => entry.word.toLowerCase().includes(search));
}
