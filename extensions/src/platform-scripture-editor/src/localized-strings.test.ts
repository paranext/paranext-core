import { readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

import { CHARACTER_MARKER_MENU_STRING_KEYS } from './character-marker-menu.utils';
import { CHARACTER_MARKER_CONTROL_STRING_KEYS } from './character-marker-control/character-marker-control.const';
import { REMOVE_CHARACTER_MARKER_STRING_KEYS } from './character-marker-bar/use-remove-character-marker.hook';
import { BOOK_NOT_AVAILABLE_VIEW_STRING_KEYS } from './book-not-available-view.const';
import { RESOURCE_CELL_STRING_KEYS } from './scripture-text-grid/resource-cell.const';
import { MODEL_TEXT_PANEL_STRING_KEYS } from './model-text-panel.const';
import { RESOURCE_PANEL_STRING_KEYS } from './resource-text-panel.const';

type LocalizedStringsFile = {
  metadata?: Record<string, { fallbackKey?: string }>;
  localizedStrings: Record<string, Record<string, string>>;
};

function readLocalizedStringsFile(): LocalizedStringsFile {
  const stringsFilePath = path.resolve(__dirname, '../contributions/localizedStrings.json');
  // JSON.parse returns `any`, which assigns to the known shape of localized strings contribution
  // files without a type assertion
  const stringsFile: LocalizedStringsFile = JSON.parse(readFileSync(stringsFilePath, 'utf-8'));
  return stringsFile;
}

const { localizedStrings, metadata } = readLocalizedStringsFile();

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
  // Ships in the core `assets/localization/*.json` beside its `%markerMenu_searchPlaceholder%`,
  // `_insert`, and `_paragraph` siblings, not in this extension's contribution, so it is absent
  // from the file read here. Note that `platform-bible-react`'s `src/localizedStrings.json` also
  // defines it, but that file is Storybook-only and is never loaded by the running app — do not
  // treat a definition there as evidence the string ships.
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

// The one notification string the removal action can show. The commit-message and sync-blocked
// keys in that list are excluded here: `%versionHistoryCommit_*%` is en-only across the whole file
// (its insert-footnote and insert-cross-reference siblings are too), and the sync-blocked key is
// already shipped and paired.
const REMOVE_CHARACTER_MARKER_PARITY_KEYS = REMOVE_CHARACTER_MARKER_STRING_KEYS.filter(
  (key) => key === '%webView_platformScriptureEditor_error_removeCharacterMarkerFailed%',
);

describe('character marker removal notifications', () => {
  REMOVE_CHARACTER_MARKER_PARITY_KEYS.forEach((key) => {
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

// Same guard for the book-not-available zero-state. This one matters more than most: the string family
// it replaced (`%webView_platformScriptureEditor_error_bookNotFoundProject%`) already shipped with a
// Spanish value, so an en-only replacement would have been a REGRESSION for Spanish users rather than
// merely a gap — English title, description, button and tooltips where they previously had a
// localized sentence.
describe.each([...BOOK_NOT_AVAILABLE_VIEW_STRING_KEYS])(
  'book-not-available view label %s',
  (key) => {
    it('has an English label', () => {
      expect(localizedStrings.en[key]).toBeTruthy();
    });

    it('has a Spanish label', () => {
      expect(localizedStrings.es[key]).toBeTruthy();
    });

    it('Spanish label differs from English', () => {
      expect(localizedStrings.es[key]).not.toBe(localizedStrings.en[key]);
    });
  },
);

// The description embeds the button's own localized label through a placeholder rather than repeating
// it in prose, so every locale must keep the slot. Losing it renders the sentence with the action
// unnamed — "You can add it with ." — which reads as a truncation bug.
describe.each(['en', 'es'])('book-not-available description placeholder in %s', (locale) => {
  it('keeps the {buttonLabel} slot', () => {
    const value =
      localizedStrings[locale]['%webView_platformScriptureEditor_bookNotAvailable_description%'];
    expect(value).toBeTruthy();
    expect(value).toContain('{buttonLabel}');
  });
});

// The retired key keeps no value of its own — it told users to "use Paratext 9 to create the book",
// exactly the workflow this view replaces, so leaving that sentence in the file would keep shipping
// obsolete advice. But dropping the key outright would leave any consumer still holding it resolving
// to a raw `%…%` token, so `metadata.fallbackKey` redirects it onto the new Simple-mode sentence:
// the redirect resolves the OLD key to the NEW key's value (`localization.service-host.ts`
// `findLocalizationForFallbackLanguageAndOrKey`), which is the direction the Localization Guide's
// replacement checklist prescribes. `simpleMessage` is the target because it is the only replacement
// that is a self-contained sentence in both locales — `description` carries a `{buttonLabel}`
// placeholder a legacy consumer would have no value to fill.
describe('retired book-not-found-in-project string', () => {
  const retiredKey = '%webView_platformScriptureEditor_error_bookNotFoundProject%';

  it.each(['en', 'es'])('has no value of its own in %s', (locale) => {
    expect(localizedStrings[locale][retiredKey]).toBeUndefined();
  });

  it('redirects to the new Simple-mode message so old consumers still get a sentence', () => {
    expect(metadata?.[retiredKey]?.fallbackKey).toBe(
      '%webView_platformScriptureEditor_bookNotAvailable_simpleMessage%',
    );
  });
});

// The resource panels' strings come in matched `bibleTexts_` / `commentaries_` pairs plus a set
// shared by both tabs, and the model text panel's in a single set. Driven off the exported key
// lists — `RESOURCE_PANEL_STRING_KEYS` folds the typed pairs in, so every key either panel renders
// is covered — so that an en-only addition, or a dropped `es` value, fails here without anyone
// remembering to edit this file.
describe.each([...RESOURCE_PANEL_STRING_KEYS])('resource panel label %s', (key) => {
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

describe.each([...MODEL_TEXT_PANEL_STRING_KEYS])('model text panel label %s', (key) => {
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

// The Scripture Text Grid cell's status and action labels, likewise driven off the component's own
// exported key list.
describe.each([...RESOURCE_CELL_STRING_KEYS])('resource cell label %s', (key) => {
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
