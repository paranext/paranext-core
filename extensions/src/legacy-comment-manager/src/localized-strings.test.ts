import { readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

const PANEL_TITLE_KEY = '%webView_legacyCommentManager_commentListPanel_title%';
const COMMENTARIES_TAB_TITLE_KEY = '%webView_resourcePanel_commentaries_title%';

// The strings backing the Send/Receive edit-block surfaces in the comments panel: the slim
// "editing paused" notice and the "your change was not saved" error toast. Both must stay defined in
// every shipped language so a future edit that drops one language fails here.
const SYNC_BLOCKED_KEYS = [
  '%webView_legacyCommentManager_syncEditBlocked_notice%',
  '%webView_legacyCommentManager_error_syncEditBlocked%',
];

// The comment-filter strings: the toolbar's "Filters" trigger, each axis's popover-row/chip name,
// the chip dismiss-label template, and the date/author axes' own aria/option/search strings. Both
// languages must define every key so a future edit that drops one in a single language fails here
// rather than silently falling back or shipping untranslated text.
const COMMENT_FILTER_KEYS = [
  '%comment_filter_aria_assignment%',
  '%comment_filter_aria_author%',
  '%comment_filter_aria_date%',
  '%comment_filter_aria_read%',
  '%comment_filter_aria_resolved%',
  '%comment_filter_aria_scope%',
  '%comment_filter_aria_type%',
  '%comment_filter_assignment_all%',
  '%comment_filter_assignment_me%',
  '%comment_filter_assignment_team%',
  '%comment_filter_assignment_unassigned%',
  '%comment_filter_author_all%',
  '%comment_filter_author_no_results%',
  '%comment_filter_author_search_placeholder%',
  '%comment_filter_axis_assignment%',
  '%comment_filter_axis_author%',
  '%comment_filter_axis_date%',
  '%comment_filter_axis_read%',
  '%comment_filter_axis_resolved%',
  '%comment_filter_axis_scope%',
  '%comment_filter_axis_type%',
  '%comment_filter_button%',
  '%comment_filter_chip_clear%',
  '%comment_filter_date_all%',
  '%comment_filter_date_last_30_days%',
  '%comment_filter_date_last_7_days%',
  '%comment_filter_date_today%',
  '%comment_filter_read_all%',
  '%comment_filter_read_read%',
  '%comment_filter_read_unread%',
  '%comment_filter_resolved_all%',
  '%comment_filter_resolved_resolved%',
  '%comment_filter_resolved_unresolved%',
  '%comment_filter_scope_all_books%',
  '%comment_filter_scope_current_chapter%',
  '%comment_filter_type_all%',
  '%comment_filter_type_comments%',
  '%comment_filter_type_conflicts%',
];

type LocalizedStringsFile = {
  localizedStrings: Record<string, Record<string, string>>;
};

function readLocalizedStrings(
  relativePathFromThisDir: string,
): LocalizedStringsFile['localizedStrings'] {
  const stringsFilePath = path.resolve(__dirname, relativePathFromThisDir);
  // JSON.parse returns `any`; asserting the known shape of localized strings contribution files
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const stringsFile = JSON.parse(readFileSync(stringsFilePath, 'utf-8')) as LocalizedStringsFile;
  return stringsFile.localizedStrings;
}

const localizedStrings = readLocalizedStrings('../contributions/localizedStrings.json');
// The Commentaries tab title is contributed by the platform-scripture-editor extension
const scriptureEditorLocalizedStrings = readLocalizedStrings(
  '../../platform-scripture-editor/contributions/localizedStrings.json',
);

describe('legacyCommentManager comment list panel tab title', () => {
  it('has an English label', () => {
    expect(localizedStrings.en[PANEL_TITLE_KEY]).toBeTruthy();
  });

  it('has a Spanish label', () => {
    expect(localizedStrings.es[PANEL_TITLE_KEY]).toBeTruthy();
  });

  it('Spanish label differs from English', () => {
    expect(localizedStrings.es[PANEL_TITLE_KEY]).not.toBe(localizedStrings.en[PANEL_TITLE_KEY]);
  });

  // In the Spanish UI, we actually want to ensure that the “Commentaries” and “Comments” tabs are
  // not easily confused. In practice, that probably means that they are significantly different
  // (“Commentarios” is probably too similar to “Comentario bíblico”), but that is difficult to
  // test for conclusively.
  it('Spanish label differs from the Spanish Commentaries tab title', () => {
    const commentariesTabTitle = scriptureEditorLocalizedStrings.es[COMMENTARIES_TAB_TITLE_KEY];
    // If the Commentaries title key is renamed or removed, fail loudly rather than letting the
    // comparison below pass vacuously against `undefined`
    expect(commentariesTabTitle).toBeDefined();
    expect(localizedStrings.es[PANEL_TITLE_KEY]).not.toBe(commentariesTabTitle);
  });

  it('Spanish label uses sentence case', () => {
    const es = localizedStrings.es[PANEL_TITLE_KEY];
    expect(es.charAt(0)).toMatch(/[A-ZÁÉÍÓÚÜÑ]/);
    expect(es.slice(1)).toBe(es.slice(1).toLowerCase());
  });
});

describe('legacyCommentManager sync-blocked strings', () => {
  // Enforce en/es parity for the two Send/Receive edit-block strings: both languages must define
  // both keys, so dropping (or renaming) one in a single language fails here rather than silently
  // shipping a missing or untranslated string.
  SYNC_BLOCKED_KEYS.forEach((key) => {
    it(`has an English label for ${key}`, () => {
      expect(localizedStrings.en[key]).toBeTruthy();
    });

    it(`has a Spanish label for ${key}`, () => {
      expect(localizedStrings.es[key]).toBeTruthy();
    });
  });
});

describe('legacyCommentManager comment-filter strings', () => {
  // Enforce en/es parity for every comment-filter string, both directions: a key present in one
  // language but not the other fails here, and Vitest's array diff names the offending key —
  // this single assertion subsumes what a per-key "has an English/Spanish label" test would show.
  it('defines every comment-filter key in both languages (no key present in only one)', () => {
    const englishOnly = COMMENT_FILTER_KEYS.filter(
      (key) => localizedStrings.en[key] && !localizedStrings.es[key],
    );
    const spanishOnly = COMMENT_FILTER_KEYS.filter(
      (key) => localizedStrings.es[key] && !localizedStrings.en[key],
    );
    expect(englishOnly).toEqual([]);
    expect(spanishOnly).toEqual([]);
  });

  // The parity check above treats an empty string as "absent" on both sides, so a key defined as
  // "" in BOTH languages would slip through undetected there. Assert non-empty values directly to
  // close that gap — a guarantee the parity check does not make.
  it('every comment-filter key has a non-empty value in both languages', () => {
    const emptyInEnglish = COMMENT_FILTER_KEYS.filter((key) => !localizedStrings.en[key]);
    const emptyInSpanish = COMMENT_FILTER_KEYS.filter((key) => !localizedStrings.es[key]);
    expect(emptyInEnglish).toEqual([]);
    expect(emptyInSpanish).toEqual([]);
  });
});
