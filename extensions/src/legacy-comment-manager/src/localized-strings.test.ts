import { readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { COMMENT_LIST_PANEL_EXTRA_STRING_KEYS } from './comment-list.component';
import {
  presetToFallbackLabel,
  presetToLabelKey,
  scopeFilterToFallbackLabel,
  scopeFilterToLabelKey,
} from './comment-list-filters.model';

const PANEL_TITLE_KEY = '%webView_legacyCommentManager_commentListPanel_title%';
const COMMENTARIES_TAB_TITLE_KEY = '%webView_resourcePanel_commentaries_title%';

// The strings backing the Send/Receive edit-block surfaces in the comments panel: the slim
// "editing paused" notice and the "your change was not saved" error toast. Both must stay defined in
// every shipped language so a future edit that drops one language fails here.
const SYNC_BLOCKED_KEYS = [
  '%webView_legacyCommentManager_syncEditBlocked_notice_2%',
  '%webView_legacyCommentManager_error_syncEditBlocked_2%',
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
  // The four-axis filter model (resolved/read/type/assignment) was replaced by the preset model, and
  // every key that belonged only to the old axes was deleted with no metadata entry. None of them
  // ever shipped in a release. A `fallbackKey` on a retired key pointing at its successor would run
  // the wrong way: it only fires where the retired key has no value, so a third-party localization
  // still using the old key for its old meaning would silently get the new meaning instead (see
  // "If a String Needs Replacement" in .context/standards/Localization-Guide.md).
  const RETIRED_KEYS = [
    '%comment_filter_aria_resolved%',
    '%comment_filter_aria_read%',
    '%comment_filter_aria_type%',
    '%comment_filter_aria_assignment%',
    '%comment_filter_resolved_all%',
    '%comment_filter_resolved_resolved%',
    '%comment_filter_resolved_unresolved%',
    '%comment_filter_read_all%',
    '%comment_filter_read_read%',
    '%comment_filter_read_unread%',
    '%comment_filter_type_all%',
    '%comment_filter_type_comments%',
    '%comment_filter_type_conflicts%',
    '%comment_filter_assignment_all%',
    '%comment_filter_assignment_me%',
    '%comment_filter_assignment_team%',
    '%comment_filter_assignment_unassigned%',
  ];

  RETIRED_KEYS.forEach((oldKey) => {
    it(`has no metadata entry redirecting ${oldKey}`, () => {
      expect(commentManagerStringsFile.metadata?.[oldKey]).toBeUndefined();
    });
  });
});

describe('comment filter dropdown fallback labels', () => {
  // The dropdown renders through `localizeOrFallback`, because `useLocalizedStrings` seeds every
  // requested key to ITSELF and returns that on error -- so a plain `?? 'fallback'` can never fire
  // and the user sees a raw `%comment_filter_preset_all%` while strings load. The fallback a user
  // briefly sees must therefore be the same English the shipped strings resolve to; the `satisfies
  // Record<...>` on each map catches a MISSING entry at compile time but says nothing about a
  // STALE one, which is what this pins.
  // Both maps are keyed by a closed union, but `Object.entries` widens those keys to `string`, so
  // the parameters here are widened to match rather than asserted back down -- the pairing this
  // checks is between two maps that already share a key type, so nothing is lost by looking both
  // up as plain strings.
  const fallbackCases = (
    kind: string,
    fallbacks: Readonly<Record<string, string>>,
    labelKeys: Readonly<Record<string, string>>,
  ): [label: string, key: string, fallback: string][] =>
    Object.entries(fallbacks).map(([value, fallback]) => [
      `${kind} ${value}`,
      labelKeys[value],
      fallback,
    ]);

  const cases: [label: string, key: string, fallback: string][] = [
    ...fallbackCases('preset', presetToFallbackLabel, presetToLabelKey),
    ...fallbackCases('scope', scopeFilterToFallbackLabel, scopeFilterToLabelKey),
  ];

  it('covers every preset and scope the dropdown can show', () => {
    expect(cases).toHaveLength(
      Object.keys(presetToLabelKey).length + Object.keys(scopeFilterToLabelKey).length,
    );
  });

  cases.forEach(([label, key, fallback]) => {
    it(`${label}'s fallback matches the shipped English string`, () => {
      // Fail loudly rather than comparing against `undefined` if the key is ever renamed.
      expect(localizedStrings.en[key]).toBeDefined();
      expect(fallback).toBe(localizedStrings.en[key]);
    });
  });
});
