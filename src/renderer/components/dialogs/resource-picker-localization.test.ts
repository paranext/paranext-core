import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Resolved from this file's location rather than `process.cwd()` so the test is not sensitive to
// the directory `vitest` happens to be invoked from.
function readJson(relativePath: string) {
  return JSON.parse(readFileSync(resolve(__dirname, relativePath), 'utf8'));
}

const coreStrings: { [locale: string]: { [key: string]: string } } = {
  en: readJson('../../../../assets/localization/en.json'),
  es: readJson('../../../../assets/localization/es.json'),
};

/**
 * The Bible texts dropdown and the Text Collection's View options live in the
 * `platform-scripture-editor` extension, which `src/renderer` cannot import, so its strings file is
 * parsed directly, as `team-layout-localization.test.ts` does.
 */
const extensionStrings: { [locale: string]: { [key: string]: string } } = readJson(
  '../../../../extensions/src/platform-scripture-editor/contributions/localizedStrings.json',
).localizedStrings;

/**
 * The resource picker's split of the selected resources repeats wording the extension shows for the
 * same groups: View options' headings and lock, which the Bible texts dropdown also reads, and the
 * dropdown's team caption. The surfaces keep their own keys, since they may need to say it
 * differently one day; until then a user should read the same words in all of them, and nothing at
 * runtime links the copies, so this test is what turns a silent drift into a failing build.
 */
describe('Resource picker team and user strings', () => {
  it.each([
    [
      'the team heading',
      '%resourcePicker_section_team%',
      ['%webView_scriptureTextGrid_viewOptions_teamResourcesHeader%'],
    ],
    [
      'the team caption',
      '%resourcePicker_section_team_caption%',
      ['%webView_resourcePanel_teamResourcesCaption%'],
    ],
    [
      'the team lock',
      '%resourcePicker_teamLock%',
      ['%webView_scriptureTextGrid_viewOptions_teamSharedLock%'],
    ],
    [
      'the user heading',
      '%resourcePicker_section_user%',
      ['%webView_scriptureTextGrid_viewOptions_userResourcesHeader%'],
    ],
  ])('words %s the same in the picker and the extension', (_, pickerKey, extensionKeys) => {
    (['en', 'es'] as const).forEach((locale) => {
      const pickerText = coreStrings[locale][pickerKey];
      // Positive control: an absent key on both sides would otherwise compare equal.
      expect(pickerText).toMatch(/\S/);
      // Keyed by locale and key, so a failure names the copy that drifted.
      extensionKeys.forEach((extensionKey) =>
        expect({ [`${locale} ${extensionKey}`]: extensionStrings[locale][extensionKey] }).toEqual({
          [`${locale} ${extensionKey}`]: pickerText,
        }),
      );
    });
  });
});
