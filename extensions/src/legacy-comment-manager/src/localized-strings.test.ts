import { readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { COMMENT_LIST_PANEL_EXTRA_STRING_KEYS } from './comment-list.component';

const PANEL_TITLE_KEY = '%webView_legacyCommentManager_commentListPanel_title%';
const COMMENTARIES_TAB_TITLE_KEY = '%webView_resourcePanel_commentaries_title%';

// The strings backing the Send/Receive edit-block surfaces in the comments panel: the slim
// "editing paused" notice and the "your change was not saved" error toast. Both must stay defined in
// every shipped language so a future edit that drops one language fails here.
const SYNC_BLOCKED_KEYS = [
  '%webView_legacyCommentManager_syncEditBlocked_notice%',
  '%webView_legacyCommentManager_error_syncEditBlocked%',
];

// The comment-filter strings the panel actually requests, derived from the panel's own key list
// rather than hand-copied, so a key added to (or removed from) the panel and forgotten here cannot
// pass unnoticed.
const COMMENT_FILTER_KEYS = COMMENT_LIST_PANEL_EXTRA_STRING_KEYS.filter((key) =>
  key.startsWith('%comment_filter_'),
);

type LocalizedStringsFile = {
  metadata?: Record<string, { fallbackKey: string }>;
  localizedStrings: Record<string, Record<string, string>>;
};

function readLocalizedStringsFile(relativePathFromThisDir: string): LocalizedStringsFile {
  const stringsFilePath = path.resolve(__dirname, relativePathFromThisDir);
  // JSON.parse returns `any`; asserting the known shape of localized strings contribution files
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return JSON.parse(readFileSync(stringsFilePath, 'utf-8')) as LocalizedStringsFile;
}

function readLocalizedStrings(
  relativePathFromThisDir: string,
): LocalizedStringsFile['localizedStrings'] {
  return readLocalizedStringsFile(relativePathFromThisDir).localizedStrings;
}

const commentManagerStringsFile = readLocalizedStringsFile(
  '../contributions/localizedStrings.json',
);
const { localizedStrings } = commentManagerStringsFile;
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
  // A key with a non-empty value in both languages is necessarily present in both, so this single
  // assertion also enforces en/es parity — no separate presence check is needed.
  it('every comment-filter key has a non-empty value in both languages', () => {
    const emptyInEnglish = COMMENT_FILTER_KEYS.filter((key) => !localizedStrings.en[key]);
    const emptyInSpanish = COMMENT_FILTER_KEYS.filter((key) => !localizedStrings.es[key]);
    expect(emptyInEnglish).toEqual([]);
    expect(emptyInSpanish).toEqual([]);
  });
});

describe('legacyCommentManager retired four-axis filter keys', () => {
  // The four-axis filter model (resolved/read/type/assignment) was replaced by the preset model,
  // and every key that belonged only to the old axes was deleted outright with no `fallbackKey`.
  // Per Localization-Guide.md, deleting a key that a downstream consumer (an out-of-repo caller,
  // a stale cache) may still reference is a replacement, not a removal, and needs a `fallbackKey`
  // redirect wherever a successor genuinely carries the same meaning.
  //
  // Only these four have a genuine successor:
  // - `_resolved_unresolved%`/`_resolved_resolved%`/`_read_unread%` carry an EXACT-VALUE successor
  //   (same displayed text in both shipped languages) among the new preset keys.
  // - `_type_conflicts%` -> `_preset_conflict%` is a MEANING match, not a byte-exact one: the old
  //   value is the plural option label "Conflicts" ("Conflictos"/"Conflictos" in es), the new
  //   preset's singular name is "Conflict" ("Conflicto"). Both select the identical underlying
  //   query (`selector.type = 'Conflict'` in comment-list-filters.model.ts's
  //   `buildCommentThreadSelector`), so the fallback still redirects to a control that means the
  //   same thing, just phrased as a preset name rather than a list option.
  //
  // Every other retired key either names an aria label for a per-axis control that no longer
  // exists (the four axes collapsed into ONE preset dropdown, so there is no single-axis
  // "resolved status"/"read status"/"note type"/"assignment" control left to label), or names an
  // "all"/axis-neutral option whose meaning ("don't filter on THIS axis, others still apply") does
  // not match the "all" preset's meaning ("no filtering on ANY axis") -- or, for the whole
  // `assignment_team%`/`assignment_unassigned%` pair and the standalone "read" (not "unread")
  // filter, the capability itself was dropped from the new model entirely (see
  // `presetFromLegacyAxes`'s doc in comment-list-filters.model.ts). None of those have a fallback,
  // deliberately -- a wrong redirect would be worse than the bare key.
  const EXPECTED_FALLBACKS: Record<string, string> = {
    '%comment_filter_resolved_unresolved%': '%comment_filter_preset_unresolved%',
    '%comment_filter_resolved_resolved%': '%comment_filter_preset_resolved%',
    '%comment_filter_read_unread%': '%comment_filter_preset_unread%',
    '%comment_filter_type_conflicts%': '%comment_filter_preset_conflict%',
  };

  Object.entries(EXPECTED_FALLBACKS).forEach(([oldKey, newKey]) => {
    it(`redirects ${oldKey} to ${newKey} via a fallbackKey`, () => {
      expect(commentManagerStringsFile.metadata?.[oldKey]?.fallbackKey).toBe(newKey);
    });

    it(`${newKey} (the fallback target for ${oldKey}) is itself defined in both languages`, () => {
      // Catches a typo'd or renamed target: a fallbackKey pointing at a key that doesn't exist
      // would silently fall through to the bare-key safety net instead of showing real text.
      expect(localizedStrings.en[newKey]).toBeTruthy();
      expect(localizedStrings.es[newKey]).toBeTruthy();
    });
  });

  // Explicitly pins that the remaining 13 retired keys were a deliberate "no genuine successor"
  // decision, not an oversight -- so a future cleanup pass doesn't need to re-derive the same
  // analysis, and a reviewer can see at a glance which keys were considered and rejected.
  const RETIRED_WITHOUT_A_FALLBACK = [
    '%comment_filter_aria_resolved%',
    '%comment_filter_aria_read%',
    '%comment_filter_aria_type%',
    '%comment_filter_aria_assignment%',
    '%comment_filter_resolved_all%',
    '%comment_filter_read_all%',
    '%comment_filter_read_read%',
    '%comment_filter_type_all%',
    '%comment_filter_type_comments%',
    '%comment_filter_assignment_all%',
    '%comment_filter_assignment_me%',
    '%comment_filter_assignment_team%',
    '%comment_filter_assignment_unassigned%',
  ];

  it('has exactly 4 fallbacks and 13 deliberately-unmapped keys among the 17 retired keys', () => {
    expect(Object.keys(EXPECTED_FALLBACKS)).toHaveLength(4);
    expect(RETIRED_WITHOUT_A_FALLBACK).toHaveLength(13);
  });

  RETIRED_WITHOUT_A_FALLBACK.forEach((oldKey) => {
    it(`does not invent a fallback for ${oldKey}`, () => {
      expect(commentManagerStringsFile.metadata?.[oldKey]).toBeUndefined();
    });
  });
});
