import { describe, expect, test } from 'vitest';
import { resolveLocalizedString } from './localization.util';

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

  test('keeps text that merely contains a percent sign', () => {
    expect(resolveLocalizedString('50% complete', 'fallback')).toBe('50% complete');
    expect(resolveLocalizedString('%s of %s', 'fallback')).toBe('%s of %s');
  });
});
