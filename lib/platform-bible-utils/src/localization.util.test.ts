import { describe, expect, test } from 'vitest';
import type { LocalizeKey } from './extension-contributions/menus.model';
import {
  isResolvedLocalizedValue,
  localizedStringOrUndefined,
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
});

describe('isResolvedLocalizedValue', () => {
  test('accepts real text and rejects each unresolved state', () => {
    expect(isResolvedLocalizedValue('Clear all')).toBe(true);
    expect(isResolvedLocalizedValue(undefined)).toBe(false);
    expect(isResolvedLocalizedValue('%projectSelector_clearAll%')).toBe(false);
    expect(isResolvedLocalizedValue('  ')).toBe(false);
  });

  test('treats percent-wrapped copy with no interior percent as a key — the documented trade-off', () => {
    // Pinned because it looks like a bug to the next reader: `LOCALIZATION_KEY_PATTERN`'s TSDoc
    // accepts this cost deliberately. Loosening the pattern to "rescue" these must fail here
    // rather than silently turn that TSDoc into a lie.
    expect(isResolvedLocalizedValue('%100%')).toBe(false);
    expect(isResolvedLocalizedValue('%%')).toBe(false);
  });

  test('rejects a non-string rather than throwing', () => {
    // Reachable from untyped extension JS and from a contribution carrying an explicit `null`,
    // where TypeScript guards nothing. A throw here would blank a view mid-render, so the values
    // are fed in the untyped shape a real caller would hand over: parsed JSON, whose `null` and
    // number arms the declared signature never admits.
    const untypedValues: string[] = JSON.parse('[null, 42, {}, ""]');
    untypedValues.forEach((value) => {
      expect(isResolvedLocalizedValue(value)).toBe(false);
    });
    expect(isResolvedLocalizedValue(undefined)).toBe(false);
  });
});

describe('localizedStringOrUndefined', () => {
  test('reads an entry carrying real text', () => {
    expect(localizedStringOrUndefined({ '%a_key%': 'Clear all' }, '%a_key%')).toBe('Clear all');
  });

  test('returns undefined for each unresolved state, so the absence can be passed onward', () => {
    expect(localizedStringOrUndefined({}, '%a_key%')).toBeUndefined();
    expect(localizedStringOrUndefined({ '%a_key%': '%a_key%' }, '%a_key%')).toBeUndefined();
    expect(localizedStringOrUndefined({ '%a_key%': '%other_key%' }, '%a_key%')).toBeUndefined();
    expect(localizedStringOrUndefined({ '%a_key%': '   ' }, '%a_key%')).toBeUndefined();
  });

  test('returns undefined for an absent map rather than throwing', () => {
    // Reachable from untyped extension JS and from a contribution carrying an explicit `null`. A
    // throw here would blank a view mid-render.
    const untypedMaps: Record<LocalizeKey, unknown>[] = JSON.parse('[null]');
    untypedMaps.forEach((strings) => {
      expect(localizedStringOrUndefined(strings, '%a_key%')).toBeUndefined();
    });
  });

  test('returns undefined for a non-string entry rather than handing it to a caller typed for text', () => {
    // Callers reading a lookup whose values are `unknown` — a grouping-label map, say — rely on
    // this instead of each growing its own `typeof` guard.
    expect(localizedStringOrUndefined({ '%a_key%': 42 }, '%a_key%')).toBeUndefined();
  });
});

/**
 * `eslint-plugin-paranext` cannot depend on this package, so its `LOCALIZATION_KEY_PATTERN` is a
 * deliberate second copy of the one behind {@link isResolvedLocalizedValue}. This is the table both
 * copies must classify alike, restated verbatim in
 * `lib/eslint-plugin-paranext/src/rules/no-nullish-localized-fallback.test.ts`. Each copy is pinned
 * in its own suite, so an unmirrored change to either one fails there.
 */
const sharedResolutionCases: { value: string | undefined; isResolved: boolean }[] = [
  // A localization key is not resolved text.
  { value: '%some_key%', isResolved: false },
  // Real copy that happens to contain a percent sign is text, not a key.
  { value: '%s of 50% total%', isResolved: true },
  { value: '', isResolved: false },
  { value: '   ', isResolved: false },
  { value: 'Select Chapter', isResolved: true },
  { value: undefined, isResolved: false },
];

describe('shared resolution table', () => {
  test.each(sharedResolutionCases)(
    'classifies $value the same way the lint plugin’s copy does',
    ({ value, isResolved }) => {
      expect(isResolvedLocalizedValue(value)).toBe(isResolved);
    },
  );
});
