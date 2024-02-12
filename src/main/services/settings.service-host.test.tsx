import { testingSettingService } from '@main/services/settings.service-host';

const VERSE_REF_DEFAULT = { default: { bookNum: 1, chapterNum: 1, verseNum: 1 } };
const NEW_VERSE_REF = { bookNum: 2, chapterNum: 2, verseNum: 2 };
const settingsProviderEngine = testingSettingService.implementSettingDataProviderEngine();

jest.mock('@node/services/node-file-system.service', () => ({
  readFileText: () => {
    return JSON.stringify(VERSE_REF_DEFAULT);
  },
}));

// TODO: Update tests when edge cases are defined in functions

test('Get verseRef returns default value', async () => {
  const result = await settingsProviderEngine.get('platform.verseRef');
  expect(result).toEqual(VERSE_REF_DEFAULT.default);
});

test('Set verseRef returns true', async () => {
  const result = await settingsProviderEngine.set('platform.verseRef', NEW_VERSE_REF);
  expect(result).toBe(true);
});

test('Reset verseRef returns true', async () => {
  const result = await settingsProviderEngine.reset('platform.verseRef');
  expect(result).toBe(true);
});
