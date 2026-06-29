import { describe, expect, it } from 'vitest';
import type { HyphenationEntry } from 'platform-scripture';
import { filterEntries, isValidHyphenation, isValidNewWord } from './hyphenation.utils';

describe('isValidHyphenation', () => {
  // PT9 behavior: hyphenation with "=" removed must match the word, case-insensitively
  // (PT9/Paratext/WordList/WordListForm.cs:2698)
  it('accepts hyphenation whose letters match the word', () => {
    expect(isValidHyphenation('abafari', 'a=ba=fa=ri')).toBe(true);
    expect(isValidHyphenation('abafari', 'aba=fari')).toBe(true);
  });

  it('accepts hyphenation with no hyphen points (PT9 proper-name no-hyphen entries)', () => {
    expect(isValidHyphenation('jerusalem', 'jerusalem')).toBe(true);
  });

  it('accepts case-insensitive matches (PT9 uses OrdinalIgnoreCase)', () => {
    expect(isValidHyphenation('Hello', 'hel=lo')).toBe(true);
    expect(isValidHyphenation('hello', 'Hel=lo')).toBe(true);
  });

  it('rejects hyphenation whose letters do not match the word', () => {
    expect(isValidHyphenation('abafari', 'a=ba=fx=ri')).toBe(false);
    expect(isValidHyphenation('abafari', 'aba=fari=s')).toBe(false);
  });

  it('rejects empty hyphenation for a non-empty word', () => {
    expect(isValidHyphenation('abafari', '')).toBe(false);
  });

  it('rejects hyphenation that uses a character other than "=" for hyphens', () => {
    // PT9: "Hyphenation must be done with '=' character"
    expect(isValidHyphenation('abafari', 'a-ba-fa-ri')).toBe(false);
  });

  it('rejects an empty word', () => {
    expect(isValidHyphenation('', '')).toBe(false);
  });
});

describe('isValidNewWord', () => {
  it('accepts a simple word', () => {
    expect(isValidNewWord('hello')).toBe(true);
  });

  it('accepts words with internal hard hyphens (PT9 words may contain "-")', () => {
    expect(isValidNewWord('mother-in-law')).toBe(true);
  });

  it('rejects empty words', () => {
    expect(isValidNewWord('')).toBe(false);
  });

  it('rejects words containing whitespace (entries are whole lines in hyphenatedWords.txt)', () => {
    expect(isValidNewWord('two words')).toBe(false);
    expect(isValidNewWord('tab\tword')).toBe(false);
  });

  it('rejects words containing "=" (reserved as the hyphen marker)', () => {
    expect(isValidNewWord('a=b')).toBe(false);
  });

  it('rejects words starting with "*" (approved-entry marker) or "#" (comment marker)', () => {
    expect(isValidNewWord('*word')).toBe(false);
    expect(isValidNewWord('#word')).toBe(false);
  });
});

describe('filterEntries', () => {
  const entries: HyphenationEntry[] = [
    { word: 'apple', hyphenation: 'ap=ple', isApproved: true },
    { word: 'banana', hyphenation: 'ba=na=na', isApproved: false },
    { word: 'pineapple', hyphenation: 'pine=ap=ple', isApproved: false },
  ];

  it('returns the same array instance for empty search text', () => {
    expect(filterEntries(entries, '')).toBe(entries);
    expect(filterEntries(entries, '   ')).toBe(entries);
  });

  it('filters by case-insensitive substring of the word', () => {
    expect(filterEntries(entries, 'APPLE').map((e) => e.word)).toEqual(['apple', 'pineapple']);
    expect(filterEntries(entries, 'ban').map((e) => e.word)).toEqual(['banana']);
  });

  it('returns empty array when nothing matches', () => {
    expect(filterEntries(entries, 'zebra')).toEqual([]);
  });
});
