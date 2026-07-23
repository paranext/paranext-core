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
