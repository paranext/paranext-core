import { readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

import { CHARACTER_MARKER_MENU_STRING_KEYS } from './character-marker-menu.utils';
import { CHARACTER_MARKER_CONTROL_STRING_KEYS } from './character-marker-control/character-marker-control.const';

type LocalizedStringsFile = {
  localizedStrings: Record<string, Record<string, string>>;
};

function readLocalizedStrings(): LocalizedStringsFile['localizedStrings'] {
  const stringsFilePath = path.resolve(__dirname, '../contributions/localizedStrings.json');
  // JSON.parse returns `any`, which assigns to the known shape of localized strings contribution
  // files without a type assertion
  const stringsFile: LocalizedStringsFile = JSON.parse(readFileSync(stringsFilePath, 'utf-8'));
  return stringsFile.localizedStrings;
}

const localizedStrings = readLocalizedStrings();

// Every label the character-marker menu asks for must stay defined in every shipped language.
// Nothing in the build enforces en/es parity — a key present in `en` and missing from `es` fails no
// other check — so this is the guard against a future edit dropping one language. Driven off the
// exported key list rather than literals so that a key added to the menu is covered here without
// anyone remembering to update this file.
describe('character marker menu labels', () => {
  CHARACTER_MARKER_MENU_STRING_KEYS.forEach((key) => {
    it(`has an English label for ${key}`, () => {
      expect(localizedStrings.en[key]).toBeTruthy();
    });

    it(`has a Spanish label for ${key}`, () => {
      expect(localizedStrings.es[key]).toBeTruthy();
    });

    it(`Spanish label differs from English for ${key}`, () => {
      expect(localizedStrings.es[key]).not.toBe(localizedStrings.en[key]);
    });

    it(`Spanish label uses sentence case for ${key}`, () => {
      const es = localizedStrings.es[key];
      // A missing string is already reported by the parity test above; fail cleanly here rather
      // than throwing a TypeError off `undefined`
      expect(typeof es).toBe('string');
      // Spanish may open a phrase with ¿ or ¡ ahead of the first letter
      expect(es).toMatch(/^[¿¡]?[A-ZÁÉÍÓÚÜÑ]/);
      // Sentence case here means "not Title Case": no capitalized word after the first. All-caps
      // tokens are allowed so an acronym (USFM, RTL) doesn't fail a correct translation. A
      // translation that legitimately contains a capitalized proper noun will need an explicit
      // exception added here.
      const titleCasedWords = es
        .split(/\s+/)
        .slice(1)
        .filter(
          (word) => /^[¿¡"'(«]*[A-ZÁÉÍÓÚÜÑ]/.test(word) && word !== word.toLocaleUpperCase('es'),
        );
      expect(titleCasedWords).toEqual([]);
    });
  });
});

// Keys the control asks for that this file cannot assert on, each for its own reason. Anything not
// listed here is checked, so a key added to the control is covered without anyone editing this file.
const CHARACTER_MARKER_CONTROL_KEYS_CHECKED_ELSEWHERE: readonly string[] = [
  // Format strings: asserted by the placeholder block below instead, which drops the
  // differs-from-English assertion that does not apply to them.
  '%webView_platformScriptureEditor_characterMarkerControl_ariaLabel_format%',
  '%webView_platformScriptureEditor_characterMarkerControl_label_format%',
  // Ships in the platform shell's locale assets (assets/localization/en.json, es.json) beside its
  // `_insert` and `_paragraph` siblings, not in this extension's contribution, so it is absent from
  // the file read here. Asserted instead by src/shared/data/localization-assets.test.ts. The
  // previous wording claimed it shipped in `platform-bible-react`'s own localized strings; that was
  // false — it was only ever in that package's Storybook pseudo-localization fixture, which is why
  // the key reached main resolving to nothing in the real app.
  '%markerMenu_searchPlaceholder_character%',
];

const CHARACTER_MARKER_CONTROL_KEYS = CHARACTER_MARKER_CONTROL_STRING_KEYS.filter(
  (key) => !CHARACTER_MARKER_CONTROL_KEYS_CHECKED_ELSEWHERE.includes(key),
);

// Same guard as above, for the control's own strings: nothing in the build enforces en/es parity.
// Driven off the exported key list, minus the documented exclusions, so a key added to the control
// is covered here automatically.
describe.each(CHARACTER_MARKER_CONTROL_KEYS)('character marker control label %s', (key) => {
  it('has an English label', () => {
    expect(localizedStrings.en[key]).toBeTruthy();
  });

  it('has a Spanish label', () => {
    expect(localizedStrings.es[key]).toBeTruthy();
  });

  it('Spanish label differs from English', () => {
    expect(localizedStrings.es[key]).not.toBe(localizedStrings.en[key]);
  });
});

// The format strings are checked separately because the differs-from-English assertion above does
// not apply to them: a format string is punctuation and placeholders, so es and en legitimately
// match until a locale needs different ordering or separators. What must hold is that both locales
// carry every placeholder the code substitutes — a dropped one silently renders an empty slot.
const CHARACTER_MARKER_CONTROL_FORMAT_KEYS: [key: string, placeholders: string[]][] = [
  ['%webView_platformScriptureEditor_characterMarkerControl_ariaLabel_format%', ['name', 'value']],
  [
    '%webView_platformScriptureEditor_characterMarkerControl_label_format%',
    ['marker', 'description'],
  ],
];

describe.each(CHARACTER_MARKER_CONTROL_FORMAT_KEYS)(
  'character marker control format string %s',
  (key, placeholders) => {
    it.each(['en', 'es'])('has every placeholder in %s', (locale) => {
      const value = localizedStrings[locale][key];
      expect(value).toBeTruthy();
      placeholders.forEach((placeholder) => expect(value).toContain(`{${placeholder}}`));
    });
  },
);
