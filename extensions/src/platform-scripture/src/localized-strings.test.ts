import { readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

type LocalizedStringsFile = {
  localizedStrings: Record<string, Record<string, string>>;
  metadata: Record<
    string,
    { fallbackKey?: string; deprecationInfo?: { message: string }; notes?: string }
  >;
};

function readLocalizedStringsFile(): LocalizedStringsFile {
  const stringsFilePath = path.resolve(__dirname, '../contributions/localizedStrings.json');
  // JSON.parse returns `any`, which assigns to the known shape of localized strings contribution
  // files without a type assertion
  const stringsFile: LocalizedStringsFile = JSON.parse(readFileSync(stringsFilePath, 'utf-8'));
  return stringsFile;
}

const { localizedStrings, metadata } = readLocalizedStringsFile();

/**
 * The strings Find shows when extra material is withheld — the book-list note, the disabled-scope
 * explanation, and the results-area placeholder.
 *
 * Nothing in the build enforces en/es parity: a key present in `en` and missing from `es` fails no
 * other check, which is how most of this extension's `%webView_find_*` family came to be en-only.
 * Closing that gap for the whole file means supplying the missing translations, which is its own
 * piece of work. These three are guarded now so the set does not grow, and this file is where the
 * rest belongs as they are translated.
 *
 * TODO(PT-4414): This whole family goes away with the exclusion it explains.
 */
const EXTRA_MATERIAL_STRING_KEYS = [
  '%webView_find_extraMaterialNotSearched%',
  '%webView_find_extraMaterialNotSearchedScope%',
  '%webView_find_extraMaterialNotSearchedScopeResults%',
];

/**
 * The notification shown when an edit is rejected because an automatic sync is in progress.
 *
 * This key falls back to the old Send/Receive key, so a dropped `es` value would silently show the
 * old wording instead of failing anywhere. This test is what notices.
 */
const SYNC_EDIT_BLOCKED_STRING_KEYS = ['%webView_platformScripture_error_syncEditBlocked_2%'];

describe.each(SYNC_EDIT_BLOCKED_STRING_KEYS)('sync edit-blocked notification %s', (key) => {
  it('has an English string', () => {
    expect(localizedStrings.en[key]).toBeTruthy();
  });

  it('has a Spanish string', () => {
    expect(localizedStrings.es[key]).toBeTruthy();
  });

  it('Spanish string differs from English', () => {
    expect(localizedStrings.es[key]).not.toBe(localizedStrings.en[key]);
  });
});

describe.each(EXTRA_MATERIAL_STRING_KEYS)('extra-material explanation %s', (key) => {
  it('has an English string', () => {
    expect(localizedStrings.en[key]).toBeTruthy();
  });

  it('has a Spanish string', () => {
    expect(localizedStrings.es[key]).toBeTruthy();
  });

  it('Spanish string differs from English', () => {
    expect(localizedStrings.es[key]).not.toBe(localizedStrings.en[key]);
  });
});

/**
 * `%manageBooks_delete_confirmBodyAllShared_2%` has no Spanish value because the whole delete
 * dialog is English-only, so its English value is what the dialog shows everywhere.
 */
describe('all-shared delete confirmation', () => {
  it('has an English string that says sync', () => {
    const value = localizedStrings.en['%manageBooks_delete_confirmBodyAllShared_2%'];
    expect(value).toBeTruthy();
    expect(value).toContain('sync');
    expect(value).not.toMatch(/send\/receive/i);
  });
});

/**
 * The tooltips on Manage Books entries that are shown but do not work yet. Each key replaces one
 * that said "coming soon", which promised a delivery date nobody has set, and falls back to it — so
 * a dropped value would silently bring that wording back.
 *
 * The sidebar rows' keys are English-only, like the keys they replace; the toolbar stub has `es`.
 */
const NOT_YET_AVAILABLE_KEYS = {
  '%manageBooks_view_disabledStub_notYetAvailable_2%': {
    replaces: '%manageBooks_view_disabledStub_notYetAvailable%',
    locales: ['en', 'es'],
  },
  '%manageBooks_progressTracking_notYetAvailable_2%': {
    replaces: '%manageBooks_progressTracking_notYetAvailable%',
    locales: ['en'],
  },
  '%manageBooks_bookNames_notYetAvailable_2%': {
    replaces: '%manageBooks_bookNames_notYetAvailable%',
    locales: ['en'],
  },
};

describe.each(Object.entries(NOT_YET_AVAILABLE_KEYS))(
  'not-yet-available tooltip %s',
  (key, { replaces, locales }) => {
    it.each(locales)('has a %s string that does not promise a delivery date', (locale) => {
      const value = localizedStrings[locale][key];
      expect(value).toBeTruthy();
      expect(value).not.toMatch(/coming soon|próximamente|pronto/i);
    });

    it('marks the key it replaces as deprecated', () => {
      expect(metadata[replaces]?.deprecationInfo?.message).toContain(key);
    });
  },
);

describe('not-yet-available toolbar tooltip', () => {
  it('Spanish string differs from English', () => {
    const key = '%manageBooks_view_disabledStub_notYetAvailable_2%';
    expect(localizedStrings.es[key]).not.toBe(localizedStrings.en[key]);
  });
});

/**
 * The toasts Find shows when Replace or Replace All leaves results unwritten because their text
 * changed after the search. Their wording depends on counts a translator cannot see from the string
 * alone, so each carries translator notes.
 */
const TEXT_CHANGED_TOAST_KEYS = [
  '%webView_find_replacedNOfMResultsTextChanged%',
  '%webView_find_replacedNOfMResultsTextChangedOrMarker%',
  '%webView_find_replace_textChangedAllResults%',
  '%webView_find_replace_textChangedError%',
  '%webView_find_replace_textChangedOrMarkerAllResults%',
];

describe('skipped match messages', () => {
  it('says where the match is, what it is, and that it is skipped', () => {
    [
      '%webView_find_replace_skippedOneEndedMarker%',
      '%webView_find_replace_skippedChapterMarker%',
      '%webView_find_replace_skippedStructureProtected%',
    ].forEach((key) => {
      expect(localizedStrings.en[key]).toContain('{reference}');
      expect(localizedStrings.en[key]).toContain('{text}');
      expect(localizedStrings.en[key]).toContain('skipped');
    });
  });

  it('names structure protection and its markers as the rest of Find does', () => {
    const skipped = localizedStrings.en['%webView_find_replace_skippedStructureProtected%'];
    expect(localizedStrings.en['%webView_find_replace_structureProtectedNote%']).toContain(
      'Structure is locked',
    );
    expect(skipped).toContain('structure is locked');
    expect(skipped).toContain('a paragraph, verse, or chapter marker');
    expect(localizedStrings.en['%webView_find_replace_structureProtectedMarkerTooltip%']).toContain(
      'a paragraph, verse, or chapter marker',
    );
  });

  it('reads as UX drafted it for a match with only part of a marker', () => {
    expect(localizedStrings.en['%webView_find_replace_skippedOneEndedMarker%']).toBe(
      'The text in {reference} to be replaced ("{text}") includes only part of a marker, so it will be skipped.',
    );
  });
});

/** What Find's Replace asks or tells the user about the markers in a match. */
const MARKER_PROMPT_STRING_KEYS = [
  '%webView_find_replace_markersPrompt_confirm%',
  '%webView_find_replace_markersPrompt_deletedMarker%',
  '%webView_find_replace_markersPrompt_message%',
  '%webView_find_replace_markersPrompt_title%',
  '%webView_find_replace_oneEndedMarkerError%',
  '%webView_find_replace_skippedChapterMarker%',
  '%webView_find_replace_skippedOneEndedMarker%',
  '%webView_find_replace_skippedStructureProtected%',
  '%webView_find_replace_skipped_title%',
];

describe.each(MARKER_PROMPT_STRING_KEYS)('marker prompt %s', (key) => {
  it('has a Spanish string that differs from English', () => {
    expect(localizedStrings.es[key]).toBeTruthy();
    expect(localizedStrings.es[key]).not.toBe(localizedStrings.en[key]);
  });

  it('keeps every placeholder in Spanish', () => {
    const placeholders = localizedStrings.en[key].match(/\{\w+\}/g) ?? [];
    placeholders.forEach((placeholder) => expect(localizedStrings.es[key]).toContain(placeholder));
  });
});

/**
 * The messages saying a Replace would delete a marker. Each replaces a key that listed eight kinds
 * of marker, from before every marker counted, and falls back to it.
 */
const MARKER_DELETION_KEYS = {
  '%webView_find_replace_markerDeletionError_2%': '%webView_find_replace_markerDeletionError%',
  '%webView_find_replace_skippedAllNResults_2%': '%webView_find_replace_skippedAllNResults%',
  '%webView_find_replace_skippedAllOneResult_2%': '%webView_find_replace_skippedAllOneResult%',
};

describe.each(Object.entries(MARKER_DELETION_KEYS))(
  'marker deletion message %s',
  (key, replaces) => {
    it('says "a marker" rather than listing kinds of marker', () => {
      expect(localizedStrings.en[key]).toContain('would delete a marker');
      expect(localizedStrings.en[key]).not.toMatch(/footnote|paragraph/);
    });

    it('has a Spanish string that differs from English and keeps its placeholders', () => {
      expect(localizedStrings.es[key]).toBeTruthy();
      expect(localizedStrings.es[key]).not.toBe(localizedStrings.en[key]);
      const placeholders = localizedStrings.en[key].match(/\{\w+\}/g) ?? [];
      placeholders.forEach((placeholder) =>
        expect(localizedStrings.es[key]).toContain(placeholder),
      );
    });

    it('falls back to the key it replaces, which is marked deprecated', () => {
      expect(metadata[key]?.fallbackKey).toBe(replaces);
      expect(metadata[replaces]?.deprecationInfo?.message).toContain(key);
    });
  },
);

/** The marker prompt's message, which points at the cue that is not color alone. */
describe('marker prompt message', () => {
  const key = '%webView_find_replace_markersPrompt_message%';

  it('says only the crossed-out markers are deleted', () => {
    expect(localizedStrings.en[key]).toContain('will delete the crossed-out markers');
  });

  it('is what the deprecated tooltip points readers to, and is not deprecated itself', () => {
    expect(
      metadata['%webView_find_replace_markerDeletionTooltip%']?.deprecationInfo?.message,
    ).toContain(key);
    expect(metadata[key]?.deprecationInfo).toBeUndefined();
  });

  it('has translator notes, as the label read after each deleted marker does', () => {
    expect(metadata[key]?.notes).toBeTruthy();
    expect(metadata['%webView_find_replace_markersPrompt_deletedMarker%']?.notes).toBeTruthy();
  });
});

describe.each(TEXT_CHANGED_TOAST_KEYS)('text-changed toast %s', (key) => {
  it('has an English string and translator notes', () => {
    expect(localizedStrings.en[key]).toBeTruthy();
    expect(metadata[key]?.notes).toBeTruthy();
  });

  it('notes explain every placeholder the string uses', () => {
    const placeholders = localizedStrings.en[key].match(/\{\w+\}/g) ?? [];
    placeholders.forEach((placeholder) => expect(metadata[key]?.notes).toContain(placeholder));
  });
});
