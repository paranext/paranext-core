import { testingLocalizationService } from '@main/services/localization.service-host';

const MOCK_FILES: { [uri: string]: string } = {
  'resources://assets/localization/eng.json': `{
    "some_localization_key": "This is the English text for %some_localization_key%.",
    "submitButton": "Submit"
  }`,
  'resources://assets/localization/fre.json': `{
    "some_localization_key": "Ceci est le texte en français pour %some_localization_key%.",
    "submitButton": "Soumettre"
  }`,
};
jest.mock('@node/services/node-file-system.service', () => ({
  readDir: () => {
    const entries: Readonly<{
      file: string[];
      directory: string[];
      unknown: string[];
    }> = {
      file: Object.keys(MOCK_FILES),
      directory: [],
      unknown: [],
    };
    return Promise.resolve(entries);
  },
  readFileText: (uri: string) => {
    const stringContentsOfFile: string = MOCK_FILES[uri];
    return Promise.resolve(stringContentsOfFile);
  },
}));

test('Correct localized value returned to match single localizeKey', () => {
  const LOCALIZE_KEY: string = 'submitButton';
  (async () => {
    const response = await testingLocalizationService.localizationService.getLocalizedString(
      LOCALIZE_KEY,
      'fre',
    );
    expect(response).toEqual('Soumettre');
  })();
});

test('Correct localized values returned to match array of localizeKeys', () => {
  const LOCALIZE_KEYS: string[] = ['submitButton', 'some_localization_key'];
  (async () => {
    const response = await testingLocalizationService.localizationService.getLocalizedStrings(
      LOCALIZE_KEYS,
      'fre',
    );
    expect(response).toEqual({
      submitButton: 'Soumettre',
      some_localization_key: 'Ceci est le texte en français pour %some_localization_key%.',
    });
  })();
});

test('Error returned with localizeKey that does not exist', () => {
  const LOCALIZE_KEY = 'the_wrong_key';
  (async () => {
    await expect(
      testingLocalizationService.localizationService.getLocalizedString(LOCALIZE_KEY, 'fre'),
    ).rejects.toThrow('Missing/invalid localization data');
  })();
});

test('Error returned with localizeKeys that do not exist', () => {
  const LOCALIZE_KEYS = ['the_wrong_key', 'the_other_wrong_key'];
  (async () => {
    await expect(
      testingLocalizationService.localizationService.getLocalizedStrings(LOCALIZE_KEYS, 'fre'),
    ).rejects.toThrow('Missing/invalid localization data');
  })();
});

test('Error returned with localizeKeys where one exists but the other does not', () => {
  const LOCALIZE_KEYS = ['submitButton', 'the_wrong_key'];
  (async () => {
    await expect(
      testingLocalizationService.localizationService.getLocalizedStrings(LOCALIZE_KEYS, 'fre'),
    ).rejects.toThrow('Missing/invalid localization data');
  })();
});

test('Error returned with localizeKey and incorrect language code', async () => {
  const LOCALIZE_KEY = 'submitButton'; // irrelevant because it will throw for language code before it accesses key/value pairs
  (async () => {
    await expect(
      testingLocalizationService.localizationService.getLocalizedString(LOCALIZE_KEY, 'XXX'),
    ).rejects.toThrow('Missing/invalid localization data');
  })();
});

test('Error returned with localizeKeys and incorrect language code', async () => {
  const LOCALIZE_KEYS = ['submitButton', 'some_localization_key']; // irrelevant because it will throw for language code before it accesses key/value pairs
  (async () => {
    await expect(
      testingLocalizationService.localizationService.getLocalizedStrings(LOCALIZE_KEYS, 'XXX'),
    ).rejects.toThrow('Missing/invalid localization data');
  })();
});

test('Default language is english when no language provided with localizeKey', async () => {
  const LOCALIZE_KEY = 'submitButton';
  (async () => {
    const response = await testingLocalizationService.localizationService.getLocalizedString(
      LOCALIZE_KEY,
    );
    await expect(response).toEqual('Submit');
  })();
});

test('Default language is english when no language provided with localizeKeys', async () => {
  const LOCALIZE_KEYS = ['submitButton', 'some_localization_key'];
  (async () => {
    const response = await testingLocalizationService.localizationService.getLocalizedStrings(
      LOCALIZE_KEYS,
    );
    expect(response).toEqual({
      some_localization_key: 'This is the English text for %some_localization_key%.',
      submitButton: 'Submit',
    });
  })();
});
