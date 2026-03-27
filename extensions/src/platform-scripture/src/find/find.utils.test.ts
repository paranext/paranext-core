import { describe, it, expect } from 'vitest';
import { buildSearchRegex, CharacterCategorizer } from './find.utils';

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
