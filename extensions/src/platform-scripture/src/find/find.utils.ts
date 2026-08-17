import { Scope } from 'platform-bible-react';
import {
  escapeStringRegexp,
  isPlatformError,
  isSelectableInvisibleCharOrWhiteSpace,
  PlatformError,
  SELECTABLE_INVISIBLE_CHAR_OR_WHITESPACE_CLASS,
} from 'platform-bible-utils';
import { FindOptions } from 'platform-scripture';

/** Maps invisible/whitespace code points to visible stand-in symbols */
const INVISIBLE_CHAR_SYMBOLS: Record<string, string> = {
  '\u0020': '·', // regular space → middle dot
  '\u00a0': '[Nbsp]', // non-breaking space — distinguished from regular space
  '\u200b': '‹ZW›', // zero-width space
  '\u200c': '‹ZWN›', // zero-width non-joiner
  '\u200d': '‹ZWJ›', // zero-width joiner
  '\u200e': '‹LRM›', // left-to-right mark
  '\u200f': '‹RLM›', // right-to-left mark
  '\u2060': '‹WJ›', // word joiner
  '\u202f': '·', // narrow no-break space
  '\u2009': '·', // thin space
  '\u200a': '·', // hair space
  '\u2002': '·', // en space
  '\u2003': '·', // em space
  '\u3000': '·', // ideographic space
  // ~ is intentionally omitted here; it is added dynamically when allowInvisibleCharacters is false,
  // because in that mode ~ represents NBSP in USFM and should render as [Nbsp]. When
  // allowInvisibleCharacters is true, ~ is a literal tilde in the text and must not be substituted.
};

// The regex intentionally mixes regular spaces and Unicode zero-width/whitespace code points in one
// character class. ESLint flags this as "misleading" because some of these code points (e.g.
// \u200d ZERO WIDTH JOINER) are normally combiners that modify adjacent characters rather than
// standing alone, so grouping them with ordinary characters in `[...]` can look unintentional.
// Here it is intentional: we want a single pass that catches every invisible/whitespace variant.
/* eslint-disable no-misleading-character-class */
/** Matches all handled invisible/whitespace chars, including the USFM tilde NBSP escape. */
const INVISIBLE_CHAR_REGEX_WITH_TILDE =
  /[ \u00a0\u200b\u200c\u200d\u200e\u200f\u2060\u202f\u2009\u200a\u2002\u2003\u3000~]/g;
/** Matches all handled invisible/whitespace chars, excluding tilde (for AllowInvisibleChars=true). */
const INVISIBLE_CHAR_REGEX_WITHOUT_TILDE =
  /[ \u00a0\u200b\u200c\u200d\u200e\u200f\u2060\u202f\u2009\u200a\u2002\u2003\u3000]/g;
/* eslint-enable no-misleading-character-class */

/**
 * Replaces invisible/whitespace characters with visible stand-in symbols. Regular visible
 * characters pass through unchanged.
 *
 * @param text The text to process
 * @param allowInvisibleCharacters Whether the project has AllowInvisibleChars enabled. When `false`
 *   (the default), the USFM tilde `~` is treated as a NBSP escape and rendered as `[Nbsp]`. When
 *   `true`, `~` is a literal tilde in the project's USFM and is left unchanged.
 */
export function renderWithInvisibleChars(
  text: string,
  allowInvisibleCharacters: boolean = false,
): string {
  if (allowInvisibleCharacters) {
    return text.replace(
      INVISIBLE_CHAR_REGEX_WITHOUT_TILDE,
      (ch) => INVISIBLE_CHAR_SYMBOLS[ch] ?? ch,
    );
  }
  // In legacy mode ~ represents NBSP — render it the same as U+00A0
  return text.replace(INVISIBLE_CHAR_REGEX_WITH_TILDE, (ch) =>
    ch === '~' ? '[Nbsp]' : (INVISIBLE_CHAR_SYMBOLS[ch] ?? ch),
  );
}

/**
 * Replaces trailing spaces with non-breaking spaces so they receive background-color and
 * text-decoration styling inside the highlighted find span. Since `\u00a0` is in
 * {@link INVISIBLE_CHAR_SYMBOLS}, `renderWithInvisibleChars` will render it as `[Nbsp]` when
 * `showInvisible` is enabled. Note: trailing spaces that were originally U+0020 will appear as
 * `[Nbsp]` rather than `·` due to this substitution, which is acceptable since the key information
 * (the match ends in whitespace) is still conveyed.
 */
export function preserveTrailingSpaces(text: string): string {
  return text.replace(/ +$/, (spaces) => '\u00a0'.repeat(spaces.length));
}

/**
 * Applies preserve-case transformation to the replacement text based on the casing of the matched
 * text:
 *
 * - ALL CAPS match → ALL CAPS replacement
 * - Title Case match (first letter capital) → Title Case replacement
 * - Otherwise → replacement as-is
 */
export function applyPreserveCase(matchedText: string, replacementText: string): string {
  if (!replacementText || !matchedText) return replacementText;
  if (matchedText === matchedText.toUpperCase() && matchedText !== matchedText.toLowerCase()) {
    return replacementText.toUpperCase();
  }
  const firstChar = matchedText[0];
  if (firstChar === firstChar.toUpperCase() && firstChar !== firstChar.toLowerCase()) {
    return replacementText[0].toUpperCase() + replacementText.slice(1);
  }
  return replacementText;
}

/**
 * How many consecutive find-job poll misses (the PDP/connection blipping and returning no update)
 * to tolerate before giving up on a running search.
 */
export const MAX_CONSECUTIVE_POLL_MISSES = 10;

/**
 * Decides whether the find-job poll loop should keep retrying after a poll comes back with no
 * update, given how many consecutive misses have already happened. A single miss is treated as a
 * transient blip and retried; only a sustained run of misses is treated as a real failure.
 *
 * @param consecutiveMisses The number of consecutive misses before this one.
 * @returns The updated miss count, and whether it has now reached
 *   {@link MAX_CONSECUTIVE_POLL_MISSES}.
 */
export function nextPollMissState(consecutiveMisses: number): {
  consecutiveMisses: number;
  hasExceededRetryLimit: boolean;
} {
  const nextConsecutiveMisses = consecutiveMisses + 1;
  return {
    consecutiveMisses: nextConsecutiveMisses,
    hasExceededRetryLimit: nextConsecutiveMisses >= MAX_CONSECUTIVE_POLL_MISSES,
  };
}

/**
 * Whether the current search term + scope/filters combination would actually run a search: false
 * for an empty term, and false for the `selectedBooks` scope with no books selected. Shared between
 * `find.web-view.tsx` (the source of truth) and `find.stories.tsx`'s harness so the two can't
 * silently diverge — they previously each hand-rolled this rule, and the harness's copy dropped the
 * empty-term check.
 */
export function isFindQueryValid(params: {
  searchTerm: string;
  scope: Scope;
  selectedBookIds: string[];
}): boolean {
  if (params.searchTerm.trim() === '') return false;
  if (params.scope === 'selectedBooks' && params.selectedBookIds.length === 0) return false;
  return true;
}

/** The decision {@link gateStartSearch} makes for a given attempt to start a search. */
export type StartSearchGate =
  | { action: 'run' }
  | { action: 'skip'; shouldRetryWhenPdpReady: boolean };

/**
 * Decides whether an attempt to start a find-job search should actually run, and — if not — whether
 * it is worth automatically retrying once the data provider becomes available. Only a missing data
 * provider is retryable: it is a temporary condition (mount-time race, or the provider dropping
 * during a long idle period) that resolves on its own once the provider reconnects. An invalid
 * query or a search already in flight are not retryable — retrying them would either loop forever
 * (the query stays invalid until the user changes it) or duplicate work.
 */
export function gateStartSearch(params: {
  isSearchQueryValid: boolean;
  hasPdp: boolean;
  isAlreadyStarting: boolean;
}): StartSearchGate {
  if (!params.isSearchQueryValid || params.isAlreadyStarting) {
    return { action: 'skip', shouldRetryWhenPdpReady: false };
  }
  if (!params.hasPdp) {
    return { action: 'skip', shouldRetryWhenPdpReady: true };
  }
  return { action: 'run' };
}

/**
 * Whether the Find panel should treat the given `platform.interfaceMode` value as "simple" — i.e.
 * hide the find/replace toggle and stay in find mode. Replace is a power-mode-only capability, so
 * this returns `false` ONLY when the mode is definitively `'power'`; a {@link PlatformError} (the
 * setting is still loading or failed to read) or any non-`'power'` value fails safe to simple.
 *
 * @param interfaceMode The `platform.interfaceMode` value (or a PlatformError) from `useSetting`.
 * @returns `true` when the replace toggle should be hidden (simple mode), `false` when it should be
 *   shown (power mode).
 */
export function isSimpleInterfaceMode(interfaceMode: 'simple' | 'power' | PlatformError): boolean {
  return isPlatformError(interfaceMode) || interfaceMode !== 'power';
}

/**
 * Character categorizer settings fetched from the project's `platformScripture.*` settings, used to
 * build project-specific find/replace regex patterns.
 */
export type CharacterCategorizer = {
  /** Content of the character class matching word-forming base characters */
  baseCharacterClassRegex: string;
  /** Content of the character class matching diacritic/combining characters */
  diacriticCharacterClassRegex: string;
  /**
   * Full regex alternation pattern for word-medial characters (characters that can appear inside a
   * word but not at a boundary). May be an empty string.
   */
  wordMedialCharacterRegex: string;
  /**
   * Full regex pattern matching one or more word-break characters, derived from Paratext 9's
   * `CharacterCategorizer.WordBreakRegex`. Defaults to `\s+`. For projects with custom word-break
   * characters the pattern is `(\s|char1|char2|...)+`. Used in surrogate-path word boundaries.
   */
  wordBreakRegex: string;
  /**
   * Whether the project preserves invisible characters (e.g. NBSP, U+00A0) literally in USFM. When
   * `false` (the Paratext default), NBSP is stored as `~` in USFM, so `~` represents a non-breaking
   * space and is treated as whitespace during find. When `true`, invisible characters are literal
   * in USFM, so `~` is just a tilde.
   */
  allowInvisibleCharacters: boolean;
};

/**
 * Code-point ranges from Paratext 9's `CharacterCategorizer.singleCharacterWords`. Characters in
 * these ranges form a word all by themselves (CJK ideographs, Hiragana, Katakana, etc.) and do not
 * rely on inter word spacing, so standard word-boundary assertions do not apply to them.
 *
 * Stored as `[start, end]` inclusive pairs.
 */
const SINGLE_CHARACTER_WORD_RANGES: readonly [number, number][] = [
  [0x2e80, 0x2fd0],
  [0x3004, 0x3006],
  [0x3012, 0x3013],
  [0x3020, 0x302f],
  [0x3031, 0x303e],
  [0x3040, 0x30ff], // Hiragana and Katakana (syllabics without inter word space)
  [0x3200, 0x9ff0],
  [0xf900, 0xfaf0],
  [0xfe30, 0xfe40],
];

/**
 * Returns true if the given Unicode code point falls within one of the single-character-word ranges
 * as defined in Paratext 9's `CharacterCategorizer.IsSingleCharacterWord`.
 */
function isSingleCharacterWord(codePoint: number): boolean {
  return SINGLE_CHARACTER_WORD_RANGES.some(
    ([start, end]) => codePoint >= start && codePoint <= end,
  );
}

/**
 * Builds a JavaScript RegExp that mirrors Paratext 9's find/replace search logic in
 * `ScrLanguage.CreateSearchRegex`
 *
 * The Unicode category classes from `CharacterCategorizer` are fetched from project settings (with
 * defaults defined in `projectSettings.json`). The following simplifications apply vs. the full P9
 * implementation:
 *
 * - `DiacriticsFollowBaseCharacters` is assumed true (standard Unicode encoding order). P9 supports
 *   false for legacy hacked fonts where diacritics precede the base character, but that encoding is
 *   outside the scope of this implementation. We don't believe there is any case where
 *   DiacriticsFollowBaseCharacters is false anymore as it is essentially hard-coded in P9.
 * - Case-insensitive search uses the JS regex `i` flag rather than P9's per-character
 *   `(?:Upper|lower)` alternations built from project-specific case mappings
 *   (`CharacterCategorizer.CreateCaseInsensitiveRegex`). Custom case mappings only exist for legacy
 *   hacked fonts, which are outside the scope of this implementation.
 *
 * This does not currently implement ignoreUsfmMarkers set to false because this search string is
 * applied over content strings in USJ generated by UsjReaderWriter and therefore doesn't have
 * markers in it.
 *
 * @param options The find options controlling search behavior
 * @param characterCategorizer The character categorizer settings for the project, used to build
 *   character classes in the regex
 * @returns A compiled RegExp ready for use in UsjReaderWriter.search
 */
export function buildSearchRegex(
  options: FindOptions,
  characterCategorizer: CharacterCategorizer,
): RegExp {
  const {
    searchString,
    useRegex,
    caseInsensitive,
    wordRestriction,
    ignoreDiacritics,
    ignoreWhitespaceDifferences: ignoreWhitespace,
  } = options;

  const {
    baseCharacterClassRegex: baseClass,
    diacriticCharacterClassRegex: diacriticClass,
    wordMedialCharacterRegex: wordMedial,
    wordBreakRegex,
    allowInvisibleCharacters,
  } = characterCategorizer;

  // Detect if the search string contains supplementary-plane characters (code points > U+FFFF). In
  // UTF-16 these are encoded as surrogate pairs, so a high surrogate in the string is the
  // reliable indicator. Mirrors P9's `isSurrogatePairSearch = searchFor.Any(char.IsHighSurrogate)`
  // in `ScrLanguage.CreateSearchRegex`. When true, word boundaries use the positive-lookaround
  // surrogate path rather than the negative-lookaround non-surrogate path: surrogate code units
  // are not word characters, so the standard negative-lookahead/lookbehind boundary logic would
  // misfire on them; the positive path avoids this by anchoring to whitespace/punctuation instead.
  const isSurrogatePairSearch = /[\uD800-\uDBFF]/.test(searchString);

  // Build the word-forming character class used in non-surrogate-path boundaries.
  const wordFormingClass = `[${baseClass}${diacriticClass}]`;

  // Punctuation/symbol class mirroring P9's `punctRegex` in `ScrLanguage.CreateSearchRegex`.
  // Uses the same explicit category list: all Punctuation (Pc Pd Ps Pe Pi Pf Po) and Symbol
  // (Sm Sc Sk So) general categories, with + to match runs — identical to P9's regex literal.
  const punctuationRegex = `[\\p{Pc}\\p{Pd}\\p{Ps}\\p{Pe}\\p{Pi}\\p{Pf}\\p{Po}\\p{Sm}\\p{Sc}\\p{Sk}\\p{So}]+`;

  // Surrogate-path word boundaries mirror P9's regex.AppendFormat calls inside isSurrogatePairSearch:
  //   start: (?<=^|WordBreakRegex|punctuationRegex)
  //   end:   (?=$|WordBreakRegex|punctuationRegex)
  const surrogateWordLookbehind = `(?<=^|${wordBreakRegex}|${punctuationRegex})`;
  const surrogateWordLookahead = `(?=$|${wordBreakRegex}|${punctuationRegex})`;

  // Non-surrogate-path word boundaries: negative lookbehind/lookahead asserting the adjacent
  // character is not a word-forming character (or word-medial if applicable).
  const wordBoundaryNegLookbehind = wordMedial
    ? `(?<!${wordFormingClass}|${wordMedial})`
    : `(?<!${wordFormingClass})`;
  const wordBoundaryNegLookahead = wordMedial
    ? `(?!${wordFormingClass}|${wordMedial})`
    : `(?!${wordFormingClass})`;

  // Build a RegExp to test individual code points for diacritics (used in ignoreDiacritics loop).
  const isDiacritic = new RegExp(`^[${diacriticClass}]$`, 'u');

  // If any code point in the search string is a single-character-word character (CJK ideograph,
  // Hiragana, Katakana, etc.), word-boundary assertions are skipped. These scripts do not delimit
  // words with spaces, so the standard non-word-char lookaround logic does not apply.
  // Similar to Paratext 9's `IsSingleCharacterWord` check in `CreateSearchRegex`.
  const containsSingleCharacterWord = [...searchString].some((char) => {
    const cp = char.codePointAt(0);
    return cp !== undefined && isSingleCharacterWord(cp);
  });

  let regexStr = '';

  // MatchAtBeginningOfWord: use positive lookaround (surrogate path) or negative lookbehind
  // (non-surrogate path) to assert we are at a word boundary.
  if (
    !containsSingleCharacterWord &&
    (wordRestriction === 'wholeWord' || wordRestriction === 'startOfWord')
  ) {
    regexStr += isSurrogatePairSearch ? surrogateWordLookbehind : wordBoundaryNegLookbehind;
  }

  regexStr += '(';

  if (useRegex) {
    // When using the search string as a regex pattern, it is assumed the user who created the regex
    // accounted for ignoreDiacritics and ignoreWhitespaceDifferences in the pattern they provided,
    // so ignoreDiacritics and ignoreWhitespaceDifferences options are not applied and the pattern
    // is used as-is
    regexStr += searchString;
  } else {
    // Normalize to NFD so accented characters (e.g. é → e + combining accent) decompose into
    // base + combining mark, enabling per-character diacritic filtering. Matches C#'s searchFor.Normalize(FormD).
    const normSearch = ignoreDiacritics ? searchString.normalize('NFD') : searchString;

    // Spread to iterate over Unicode code points (handles surrogate pairs correctly in JS,
    // equivalent to C#'s UString / UCodepoint iteration).
    const chars = [...normSearch];
    let prevWasWhiteSpace = false;

    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];

      // Skip combining marks in the search string when ignoreDiacritics is set.
      if (!ignoreDiacritics || !isDiacritic.test(char)) {
        // Determine whether this code point is whitespace / invisible.
        // When AllowInvisibleChars is false (the default), NBSP is stored as ~ in USFM, so ~ is
        // treated as whitespace. When true, ~ is a literal tilde, not a whitespace substitute.
        const isTildeWhitespace = !allowInvisibleCharacters;
        const isWhiteSpace =
          isSelectableInvisibleCharOrWhiteSpace(char) || (isTildeWhitespace && char === '~');

        // Skip consecutive whitespace code points when ignoreWhitespaceDifferences is set.
        if (!(ignoreWhitespace && prevWasWhiteSpace && isWhiteSpace)) {
          let charPattern: string;
          if (ignoreWhitespace && isWhiteSpace) {
            // Collapse any whitespace run to a single lazy multi-whitespace pattern (including ~
            // when it represents NBSP, i.e., when AllowInvisibleChars is false).
            charPattern = isTildeWhitespace
              ? `([${SELECTABLE_INVISIBLE_CHAR_OR_WHITESPACE_CLASS}]|~)+?`
              : `[${SELECTABLE_INVISIBLE_CHAR_OR_WHITESPACE_CLASS}]+?`;
          } else {
            charPattern = escapeStringRegexp(char);
          }

          regexStr += charPattern;

          // Allow diacritics after each base character when ignoreDiacritics is set.
          // C# assumes DiacriticsFollowBaseCharacters=true (standard Unicode), so no leading [M]*
          // is emitted — only a trailing [M]* after each processed code point.
          if (ignoreDiacritics) {
            regexStr += `[${diacriticClass}]*`;
          }

          prevWasWhiteSpace = isWhiteSpace;
        }
      }
    }
  }

  regexStr += ')';

  // MatchAtEndOfWord: use positive lookahead (surrogate path) or negative lookahead (non-surrogate
  // path) to assert the match does not continue into a word.
  if (
    !containsSingleCharacterWord &&
    (wordRestriction === 'wholeWord' || wordRestriction === 'endOfWord')
  ) {
    regexStr += isSurrogatePairSearch ? surrogateWordLookahead : wordBoundaryNegLookahead;
  }

  // The `u` flag enables \p{} Unicode property escapes, which are used in word-boundary patterns
  // (for letter/diacritic classes like \p{Lu}, \p{Mn}) and diacritic-ignore suffixes. It is NOT
  // needed for the whitespace class (SELECTABLE_INVISIBLE_CHAR_OR_WHITESPACE_CLASS), since that is
  // just a literal list of BMP characters with no \p{} escapes. Skipped in the useRegex path to
  // avoid silently breaking user-supplied patterns that may not be u-mode compatible.
  const needsUnicodeFlag =
    (!containsSingleCharacterWord && !!(wordRestriction && wordRestriction !== 'none')) ||
    (!!ignoreDiacritics && !useRegex);
  const flags = `${caseInsensitive ? 'i' : ''}g${needsUnicodeFlag ? 'u' : ''}`;

  return new RegExp(regexStr, flags);
}
