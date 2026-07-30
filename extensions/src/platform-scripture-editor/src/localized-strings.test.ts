import { readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

const REMOVE_CHARACTER_MARKER_KEY =
  '%webView_platformScriptureEditor_characterMarkerMenu_removeMarker%';

type LocalizedStringsFile = {
  localizedStrings: Record<string, Record<string, string>>;
};

function readLocalizedStrings(): LocalizedStringsFile['localizedStrings'] {
  const stringsFilePath = path.resolve(__dirname, '../contributions/localizedStrings.json');
  // JSON.parse returns `any`; asserting the known shape of localized strings contribution files
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const stringsFile = JSON.parse(readFileSync(stringsFilePath, 'utf-8')) as LocalizedStringsFile;
  return stringsFile.localizedStrings;
}

const localizedStrings = readLocalizedStrings();

// The remove row's label must stay defined in every shipped language. Nothing in the build enforces
// en/es parity — a key present in `en` and missing from `es` fails no other check — so this is the
// guard against a future edit dropping one language.
describe('character marker menu remove row label', () => {
  it('has an English label', () => {
    expect(localizedStrings.en[REMOVE_CHARACTER_MARKER_KEY]).toBeTruthy();
  });

  it('has a Spanish label', () => {
    expect(localizedStrings.es[REMOVE_CHARACTER_MARKER_KEY]).toBeTruthy();
  });

  it('Spanish label differs from English', () => {
    expect(localizedStrings.es[REMOVE_CHARACTER_MARKER_KEY]).not.toBe(
      localizedStrings.en[REMOVE_CHARACTER_MARKER_KEY],
    );
  });
});
