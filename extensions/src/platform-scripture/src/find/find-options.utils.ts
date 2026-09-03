import { FindOptions, FindScope, WordRestriction } from 'platform-scripture';
import { SearchTextType } from './find-types';

/**
 * The Find UI state that determines how a search is performed. Field names mirror the Find web
 * view's own state rather than the {@link FindOptions} fields they map to.
 */
export type FindUiState = {
  /** The text or regex pattern the user typed */
  searchTerm: string;
  /** The books and chapters to search, in order */
  findScope: FindScope[];
  /** Whether the user asked for a case-sensitive search */
  shouldMatchCase: boolean;
  /** Whether the user enabled regex mode */
  isRegexAllowed: boolean;
  /** Which text the user chose to search — all text, or verse text only */
  searchTextType: SearchTextType;
  /** Whether matches are restricted to word boundaries */
  wordRestriction: WordRestriction;
  /** Whether a run of whitespace in the query may match any run of whitespace in the text */
  ignoreWhitespaceDifferences: boolean;
  /** Whether base characters in the query may match their accented counterparts in the text */
  ignoreDiacritics: boolean;
};

/**
 * Translates the Find UI's state into the {@link FindOptions} sent to the find PDP.
 *
 * The search term is passed through byte-identical. The text Find searches is USJ, whose adjacent
 * text nodes are concatenated with no separator, so it genuinely can contain runs of consecutive
 * whitespace; rewriting the query here would make those runs unsearchable. Whitespace and diacritic
 * tolerance are therefore expressed as options the engine applies to the _matching_, never by
 * editing what the user typed.
 *
 * `ignoreWhitespaceDifferences` and `ignoreDiacritics` are user-togglable, mirroring PT9's
 * `FindReplaceOptions`. Both default to off, so an exact search — including for a specific
 * invisible character such as NBSP or ZWSP — is what the user gets unless they opt out of it.
 * `buildSearchRegex` ignores both flags in regex mode, where the pattern must mean exactly what the
 * user wrote, so no carve-out is needed here.
 *
 * @param input The current Find UI state
 * @returns The options describing the search to run
 */
export function buildFindOptions(input: FindUiState): FindOptions {
  return {
    scope: input.findScope,
    searchString: input.searchTerm,
    caseInsensitive: !input.shouldMatchCase,
    useRegex: input.isRegexAllowed,
    verseTextOnly: input.searchTextType === 'verseOnly',
    wordRestriction: input.wordRestriction,
    ignoreWhitespaceDifferences: input.ignoreWhitespaceDifferences,
    ignoreDiacritics: input.ignoreDiacritics,
  };
}
