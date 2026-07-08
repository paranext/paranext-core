import { readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

const PANEL_TITLE_KEY = '%webView_legacyCommentManager_commentListPanel_title%';
const COMMENTARIES_TAB_TITLE_KEY = '%webView_resourcePanel_commentaries_title%';

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
