import { readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

import { CHARACTER_MARKER_MENU_STRING_KEYS } from './character-marker-menu.utils';

// Duplicated from `CHARACTER_MARKER_CONTROL_STRING_KEYS` in `character-marker-control.component`
// rather than imported: this suite runs in a node environment, and importing that component pulls
// in the editor's DOM-dependent modules, which fail to load without a `document`.
const CHARACTER_MARKER_CONTROL_STRING_KEYS = [
  '%webView_platformScriptureEditor_characterMarkerControl_ariaLabel%',
  '%webView_platformScriptureEditor_characterMarkerControl_mixed%',
  '%webView_platformScriptureEditor_characterMarkerControl_none%',
  '%webView_platformScriptureEditor_characterMarkerControl_noMarkersTooltip%',
  '%webView_platformScriptureEditor_characterMarkerMenu_searchPlaceholder%',
  '%webView_platformScriptureEditor_syncEditBlocked_banner%',
];

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

// Same en/es parity guard for the character-marker control's own strings, driven off its exported
// key list. The sentence-case assertion above deliberately does not apply here: several of these are
// parenthetical status words ("(mixto)", "(ninguno)") that do not open with a capital letter.
describe('character marker control labels', () => {
  CHARACTER_MARKER_CONTROL_STRING_KEYS.forEach((key) => {
    it(`has an English label for ${key}`, () => {
      expect(localizedStrings.en[key]).toBeTruthy();
    });

    it(`has a Spanish label for ${key}`, () => {
      expect(localizedStrings.es[key]).toBeTruthy();
    });

    it(`Spanish label differs from English for ${key}`, () => {
      expect(localizedStrings.es[key]).not.toBe(localizedStrings.en[key]);
    });
  });
});
