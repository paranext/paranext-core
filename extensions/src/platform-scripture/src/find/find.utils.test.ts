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
