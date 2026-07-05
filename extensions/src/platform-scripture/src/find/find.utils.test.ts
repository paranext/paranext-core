import { describe, it, expect } from 'vitest';
import { applyPreserveCase, buildSearchRegex, CharacterCategorizer } from './find.utils';

/** Default character categorizer matching the project-settings defaults used in production */
const DEFAULT_CATEGORIZER: CharacterCategorizer = {
  baseCharacterClassRegex: '\\p{Lu}\\p{Ll}\\p{Lt}\\p{Lo}\\p{Cn}',
  diacriticCharacterClassRegex: '\\p{Mn}\\p{Mc}\\p{Lm}',
  wordMedialCharacterRegex: '',
  wordBreakRegex: '\\s+',
  allowInvisibleCharacters: false,
};

function matchAll(regex: RegExp, text: string): string[] {
  return [...text.matchAll(regex)].map((m) => m[0]);
}

describe('applyPreserveCase', () => {
  it('returns ALL CAPS replacement when matched text is all-caps', () => {
    expect(applyPreserveCase('HELLO', 'world')).toBe('WORLD');
  });

  it('returns Title Case replacement when matched text starts with a capital', () => {
    expect(applyPreserveCase('Hello', 'world')).toBe('World');
  });

  it('returns replacement as-is when matched text is lowercase', () => {
    expect(applyPreserveCase('hello', 'world')).toBe('world');
  });

  it('returns replacement as-is when matched text is mixed case (neither all-caps nor title-case)', () => {
    expect(applyPreserveCase('hEllo', 'world')).toBe('world');
  });

  it('returns replacement unchanged when replacementText is empty', () => {
    expect(applyPreserveCase('HELLO', '')).toBe('');
  });

  it('returns replacement unchanged when matchedText is empty', () => {
    expect(applyPreserveCase('', 'world')).toBe('world');
  });

  it('does not treat a string of digits as all-caps (no case distinction)', () => {
    // "123" toUpperCase === "123" and toLowerCase === "123", so the all-caps branch
    // requires matchedText !== matchedText.toLowerCase() — digits should pass through
    expect(applyPreserveCase('123', 'replacement')).toBe('replacement');
  });

  it('does not treat a punctuation-only match as all-caps', () => {
    expect(applyPreserveCase('!!!', 'world')).toBe('world');
  });

  it('title-cases a multi-word replacement when match starts with a capital', () => {
    expect(applyPreserveCase('Hello', 'foo bar')).toBe('Foo bar');
  });

  it('upper-cases a multi-word replacement when match is all-caps', () => {
    expect(applyPreserveCase('FOO BAR', 'hello world')).toBe('HELLO WORLD');
  });
});

describe('buildSearchRegex – regex mode (useRegex)', () => {
  it('passes special characters through as-is without escaping them', () => {
    const regex = buildSearchRegex(
      { searchString: '[aeiou]+', caseInsensitive: false, wordRestriction: 'none', useRegex: true },
      DEFAULT_CATEGORIZER,
    );
    expect(matchAll(regex, 'hello world')).toEqual(['e', 'o', 'o']);
  });

  it('applies the case-insensitive flag in regex mode when caseInsensitive is true', () => {
    const regex = buildSearchRegex(
      { searchString: 'hello', caseInsensitive: true, wordRestriction: 'none', useRegex: true },
      DEFAULT_CATEGORIZER,
    );
    expect(matchAll(regex, 'Hello HELLO hello')).toEqual(['Hello', 'HELLO', 'hello']);
  });

  it('does not apply ignoreDiacritics when useRegex is true (user pattern used as-is)', () => {
    const regex = buildSearchRegex(
      {
        searchString: 'e',
        caseInsensitive: false,
        wordRestriction: 'none',
        useRegex: true,
        ignoreDiacritics: true,
      },
      DEFAULT_CATEGORIZER,
    );
    // In regex mode, ignoreDiacritics is not applied — only the base 'e' is matched,
    // not the full NFD sequence 'e\u0301'. Use 'abc' as surrounding text to avoid a
    // second 'e' that would inflate the match count.
    expect(matchAll(regex, 'e\u0301 abc')).toEqual(['e']);
  });

  it('supports regex groups and alternation in the search string', () => {
    const regex = buildSearchRegex(
      {
        searchString: 'son (of|the)',
        caseInsensitive: false,
        wordRestriction: 'none',
        useRegex: true,
      },
      DEFAULT_CATEGORIZER,
    );
    expect(matchAll(regex, 'son of David son the father')).toEqual(['son of', 'son the']);
  });
});

describe('buildSearchRegex – ignoreDiacritics', () => {
  it('extends the match to include a combining diacritic after the base character', () => {
    const regex = buildSearchRegex(
      {
        searchString: 'e',
        caseInsensitive: false,
        wordRestriction: 'none',
        ignoreDiacritics: true,
      },
      DEFAULT_CATEGORIZER,
    );
    // 'e\u0301' is the NFD-encoded form of 'é' — the regex should consume the combining mark
    expect(matchAll(regex, 'e\u0301')).toEqual(['e\u0301']);
  });

  it('does not extend the match to a combining diacritic when ignoreDiacritics is false', () => {
    const regex = buildSearchRegex(
      {
        searchString: 'e',
        caseInsensitive: false,
        wordRestriction: 'none',
        ignoreDiacritics: false,
      },
      DEFAULT_CATEGORIZER,
    );
    // Without ignoreDiacritics, the match is exactly 'e' — the combining mark is left over
    expect(matchAll(regex, 'e\u0301')).toEqual(['e']);
  });

  it('skips diacritics in the search string so an accented search term matches plain text', () => {
    // NFC 'é' (U+00E9) decomposes to 'e' + combining acute in NFD; the combining mark is
    // stripped from the search pattern, leaving a pattern that matches bare 'cafe'
    const regex = buildSearchRegex(
      {
        searchString: 'caf\u00e9',
        caseInsensitive: false,
        wordRestriction: 'none',
        ignoreDiacritics: true,
      },
      DEFAULT_CATEGORIZER,
    );
    expect(matchAll(regex, 'cafe')).toEqual(['cafe']);
  });
});

describe('buildSearchRegex – ignoreWhitespaceDifferences', () => {
  it('matches when the search has more spaces than the text', () => {
    const regex = buildSearchRegex(
      {
        searchString: 'hello  world',
        caseInsensitive: false,
        wordRestriction: 'none',
        ignoreWhitespaceDifferences: true,
      },
      DEFAULT_CATEGORIZER,
    );
    expect(matchAll(regex, 'hello world')).toEqual(['hello world']);
  });

  it('matches a non-breaking space in the text when the search term has a regular space', () => {
    const regex = buildSearchRegex(
      {
        searchString: 'hello world',
        caseInsensitive: false,
        wordRestriction: 'none',
        ignoreWhitespaceDifferences: true,
      },
      DEFAULT_CATEGORIZER,
    );
    // \u00a0 is NBSP, which is in the selectable whitespace character class
    expect(matchAll(regex, 'hello\u00a0world')).toEqual(['hello\u00a0world']);
  });

  it('requires an exact space match when ignoreWhitespaceDifferences is false', () => {
    const regex = buildSearchRegex(
      {
        searchString: 'hello world',
        caseInsensitive: false,
        wordRestriction: 'none',
        ignoreWhitespaceDifferences: false,
      },
      DEFAULT_CATEGORIZER,
    );
    // 'hello  world' has two spaces, but the pattern is 'hello world' (one space) — no match
    expect(matchAll(regex, 'hello  world')).toEqual([]);
  });
});

describe('buildSearchRegex – CJK single-character words', () => {
  it('matches a CJK character inside a word even with wholeWord restriction', () => {
    const regex = buildSearchRegex(
      {
        searchString: '\u4e2d', // '中', code point 0x4E2D — in single-char-word range
        caseInsensitive: false,
        wordRestriction: 'wholeWord',
      },
      DEFAULT_CATEGORIZER,
    );
    // Single-character-word scripts bypass word-boundary assertions entirely
    expect(matchAll(regex, 'test\u4e2dtest')).toEqual(['\u4e2d']);
  });

  it('matches a Hiragana character inside a word even with startOfWord restriction', () => {
    const regex = buildSearchRegex(
      {
        searchString: '\u3042', // 'あ', Hiragana — in single-char-word range
        caseInsensitive: false,
        wordRestriction: 'startOfWord',
      },
      DEFAULT_CATEGORIZER,
    );
    expect(matchAll(regex, 'test\u3042test')).toEqual(['\u3042']);
  });
});

describe('buildSearchRegex – word restrictions', () => {
  it('does not match a substring embedded inside a longer word when wholeWord is set', () => {
    const regex = buildSearchRegex(
      { searchString: 'he', caseInsensitive: false, wordRestriction: 'wholeWord' },
      DEFAULT_CATEGORIZER,
    );
    // 'he' inside 'them' (he-m) and inside 'the' (t-he) must not match
    expect(matchAll(regex, 'them the')).toEqual([]);
  });

  it('matches a standalone word when wholeWord is set', () => {
    const regex = buildSearchRegex(
      { searchString: 'he', caseInsensitive: false, wordRestriction: 'wholeWord' },
      DEFAULT_CATEGORIZER,
    );
    expect(matchAll(regex, 'he said he would')).toEqual(['he', 'he']);
  });

  it('matches the term at the start of a word when startOfWord is set', () => {
    const regex = buildSearchRegex(
      { searchString: 'pre', caseInsensitive: false, wordRestriction: 'startOfWord' },
      DEFAULT_CATEGORIZER,
    );
    expect(matchAll(regex, 'preview preview')).toEqual(['pre', 'pre']);
  });

  it('does not match when the term appears only at the end of a word and startOfWord is set', () => {
    const regex = buildSearchRegex(
      { searchString: 'ting', caseInsensitive: false, wordRestriction: 'startOfWord' },
      DEFAULT_CATEGORIZER,
    );
    // 'ting' is at the end of 'testing', not the start
    expect(matchAll(regex, 'testing')).toEqual([]);
  });

  it('matches the term at the end of a word when endOfWord is set', () => {
    const regex = buildSearchRegex(
      { searchString: 'ing', caseInsensitive: false, wordRestriction: 'endOfWord' },
      DEFAULT_CATEGORIZER,
    );
    expect(matchAll(regex, 'testing running')).toEqual(['ing', 'ing']);
  });

  it('does not match when the term appears only at the start of a word and endOfWord is set', () => {
    const regex = buildSearchRegex(
      { searchString: 'pre', caseInsensitive: false, wordRestriction: 'endOfWord' },
      DEFAULT_CATEGORIZER,
    );
    // 'pre' is at the start of 'preview', not the end
    expect(matchAll(regex, 'preview')).toEqual([]);
  });
});

describe('buildSearchRegex – trailing space', () => {
  it('matches a word followed by a space', () => {
    const regex = buildSearchRegex(
      { searchString: 'the ', caseInsensitive: true, wordRestriction: 'none' },
      DEFAULT_CATEGORIZER,
    );
    expect(matchAll(regex, 'the book of the genealogy')).toEqual(['the ', 'the ']);
  });

  it('does not match a word followed by punctuation instead of a space', () => {
    const regex = buildSearchRegex(
      { searchString: 'word ', caseInsensitive: false, wordRestriction: 'none' },
      DEFAULT_CATEGORIZER,
    );
    // "word," has a comma, not a space — must not match
    expect(matchAll(regex, 'This is a word, and another word.')).toEqual([]);
  });

  it('does not match a word at the end of text when trailing space is required', () => {
    const regex = buildSearchRegex(
      { searchString: 'word ', caseInsensitive: false, wordRestriction: 'none' },
      DEFAULT_CATEGORIZER,
    );
    expect(matchAll(regex, 'the last word')).toEqual([]);
  });

  it('matches the word only at positions actually followed by a space', () => {
    const regex = buildSearchRegex(
      { searchString: 'son ', caseInsensitive: false, wordRestriction: 'none' },
      DEFAULT_CATEGORIZER,
    );
    // "son of David" → "son " matches; "son of Abraham." → "son " matches;
    // "son." never appears so only space-followed occurrences should appear
    const matches = matchAll(regex, 'the son of David, the son of Abraham.');
    expect(matches).toEqual(['son ', 'son ']);
  });

  it('does not match a word followed by a comma even when that word also appears with a space elsewhere', () => {
    const regex = buildSearchRegex(
      { searchString: 'father ', caseInsensitive: false, wordRestriction: 'none' },
      DEFAULT_CATEGORIZER,
    );
    // "father," should not be matched; "father of" should be matched
    const text = 'the father of Isaac, and the father, said';
    const matches = matchAll(regex, text);
    expect(matches).toEqual(['father ']);
    expect(matches).not.toContain('father,');
  });

  it('is case-insensitive when requested and still requires the trailing space', () => {
    const regex = buildSearchRegex(
      { searchString: 'The ', caseInsensitive: true, wordRestriction: 'none' },
      DEFAULT_CATEGORIZER,
    );
    const matches = matchAll(regex, 'the book of The genealogy');
    expect(matches.length).toBe(2);
    matches.forEach((m) => expect(m).toMatch(/ $/));
  });

  it('trailing space does not match a trailing period', () => {
    const regex = buildSearchRegex(
      { searchString: 'Abraham ', caseInsensitive: false, wordRestriction: 'none' },
      DEFAULT_CATEGORIZER,
    );
    // "Abraham." ends the sentence — no space follows
    expect(matchAll(regex, 'the son of Abraham.')).toEqual([]);
  });
});
