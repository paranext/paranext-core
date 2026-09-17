import { describe, expect, test } from 'vitest';
import {
  firstResolvedLocalizedString,
  isResolvedLocalizedValue,
  resolveLocalizedString,
} from './localization.util';

describe('resolveLocalizedString', () => {
  test('keeps real localized text', () => {
    expect(resolveLocalizedString('Capítulo anterior', 'Previous chapter')).toBe(
      'Capítulo anterior',
    );
  });

  test('falls back when the value is missing', () => {
    expect(resolveLocalizedString(undefined, 'Previous chapter')).toBe('Previous chapter');
    expect(resolveLocalizedString('', 'Previous chapter')).toBe('Previous chapter');
  });

  test('falls back when the value is still the raw key', () => {
    // `useLocalizedStrings` hands back `{ [key]: key }` while loading, and permanently when the
    // localization provider errors — so a raw key is what a consumer actually receives, not a
    // hypothetical.
    expect(
      resolveLocalizedString('%webView_bookChapterControl_previousChapter%', 'Previous chapter'),
    ).toBe('Previous chapter');
  });

  test('falls back when the value has no visible text', () => {
    // Whitespace-only is indistinguishable on screen from empty, and leaves the control with no
    // accessible name — a broken-looking control rather than an untranslated one.
    expect(resolveLocalizedString('   ', 'Previous chapter')).toBe('Previous chapter');
    expect(resolveLocalizedString('\t\n', 'Previous chapter')).toBe('Previous chapter');
  });

  test('keeps text that is merely padded with whitespace, verbatim', () => {
    // Blankness is what disqualifies a value; this does not trim the value it accepts.
    expect(resolveLocalizedString('  Padded  ', 'fallback')).toBe('  Padded  ');
  });

  test('keeps text that merely contains a percent sign', () => {
    expect(resolveLocalizedString('50% complete', 'fallback')).toBe('50% complete');
    expect(resolveLocalizedString('%s of %s', 'fallback')).toBe('%s of %s');
    // A key is `%…%` with nothing else around it. Text that opens and closes with a percent but
    // carries one in the middle is real copy, not a key.
    expect(resolveLocalizedString('%s of 50% total%', 'fallback')).toBe('%s of 50% total%');
  });

  test('falls back when the value is a different key than the one requested', () => {
    // Any `%…%`-shaped value is unresolved, whichever key produced it: a strings bag can carry
    // some other key's raw text, and that is no more showable than the requested key's own.
    expect(resolveLocalizedString('%some_other_key%', 'Previous chapter')).toBe('Previous chapter');
  });

  test('falls back on whitespace-only text that an exact-key comparison would accept', () => {
    expect(resolveLocalizedString('   ', 'Previous chapter')).toBe('Previous chapter');
  });
});

describe('isResolvedLocalizedValue', () => {
  test('accepts real text and rejects each unresolved state', () => {
    expect(isResolvedLocalizedValue('Clear all')).toBe(true);
    expect(isResolvedLocalizedValue(undefined)).toBe(false);
    expect(isResolvedLocalizedValue('%projectSelector_clearAll%')).toBe(false);
    expect(isResolvedLocalizedValue('  ')).toBe(false);
  });
});

describe('firstResolvedLocalizedString', () => {
  test('takes the first candidate carrying real text', () => {
    expect(firstResolvedLocalizedString('Primero', 'Second')).toBe('Primero');
  });

  test('skips past unresolved candidates rather than stopping at them', () => {
    // The whole point: `??` would stop at the raw key, because a key is a defined string.
    expect(firstResolvedLocalizedString('%a_key%', undefined, '  ', 'English')).toBe('English');
  });

  test('returns undefined when no candidate can be shown', () => {
    expect(firstResolvedLocalizedString('%a_key%', undefined, '')).toBeUndefined();
  });
});
