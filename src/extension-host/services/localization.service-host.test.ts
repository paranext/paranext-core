import { vi } from 'vitest';
import { testingLocalizationService } from '@extension-host/services/localization.service-host';
import { logger } from '@shared/services/logger.service';
import { SettingNames } from 'papi-shared-types';
import { LocalizeKey } from 'platform-bible-utils';

const { getInterfaceLanguageCallback, setInterfaceLanguageCallback } = vi.hoisted(() => {
  let cb: ((v: unknown) => void) | undefined;
  return {
    getInterfaceLanguageCallback: () => cb,
    setInterfaceLanguageCallback: (c: (v: unknown) => void) => {
      cb = c;
    },
  };
});

const MOCK_FILES: { [uri: string]: string } = {
  'resources://assets/localization/en.json': `{
    "%some_localization_key%": "This is the English text for %some_localization_key%.",
    "%general_button_submit%": "Submit",
    "%firstRun_title%": "Set up",
    "%firstRun_button_next%": "Next"
  }`,
  'resources://assets/localization/fr.json': `{
    "%some_localization_key%": "Ceci est le texte en français pour %some_localization_key%.",
    "%general_button_submit%": "Soumettre",
    "%firstRun_title%": "Configurer",
    "%firstRun_button_next%": "Suivant"
  }`,
  'resources://assets/localization/metadata.json': `{
    "%yes%": {
      "notes": "A confirmation word used in many places. For example, this may be used as the label on a button on a dialog.",
      "fallbackKey": "%confirm%"
    },
    "%submit%": {
      "fallbackKey": "%yes%"
    }
  }`,
};

vi.mock('@shared/services/settings.service', () => ({
  __esModule: true,
  settingsService: {
    get<SettingName extends SettingNames>(key: SettingName) {
      if (key === 'platform.interfaceLanguage') return ['en'];
      return undefined;
    },
    subscribe(key: string, cb: (v: unknown) => void) {
      if (key === 'platform.interfaceLanguage') setInterfaceLanguageCallback(cb);
      return Promise.resolve(async () => true);
    },
  },
}));

vi.mock('@node/services/node-file-system.service', () => ({
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

vi.mock('@shared/services/logger.service', () => ({
  __esModule: true,
  default: {
    warn: vi.fn(() => {}),
  },
  logger: {
    warn: vi.fn(() => {}),
  },
}));

vi.mock('@extension-host/services/contribution.service', async () => ({
  ...(await vi.importActual('@extension-host/services/contribution.service')),
  // Don't actually wait because we're not syncing any contributions in these tests
  waitForResyncContributions: async () => {},
}));

let localizationDataProviderEngine: Awaited<
  ReturnType<typeof testingLocalizationService.implementLocalizationDataProviderEngine>
>;
beforeAll(async () => {
  localizationDataProviderEngine =
    await testingLocalizationService.implementLocalizationDataProviderEngine();
});
afterEach(() => {
  vi.restoreAllMocks();
});

test('Correct localized value returned to match single localizeKey', async () => {
  const LOCALIZE_KEY = '%general_button_submit%';
  const response = await localizationDataProviderEngine.getLocalizedString({
    localizeKey: LOCALIZE_KEY,
    locales: ['fr'],
  });
  expect(response).toEqual('Soumettre');
});

test('Correct localized values returned to match array of localizeKeys', async () => {
  const LOCALIZE_KEYS: LocalizeKey[] = ['%general_button_submit%', '%some_localization_key%'];
  const response = await localizationDataProviderEngine.getLocalizedStrings({
    localizeKeys: LOCALIZE_KEYS,
    locales: ['fr'],
  });
  expect(response).toEqual({
    '%general_button_submit%': 'Soumettre',
    '%some_localization_key%': 'Ceci est le texte en français pour %some_localization_key%.',
  });
});

test('Key returned with localizeKey that does not exist', async () => {
  const LOCALIZE_KEY = '%the_wrong_key%';
  expect(
    await localizationDataProviderEngine.getLocalizedString({
      localizeKey: LOCALIZE_KEY,
      locales: ['fr'],
    }),
  ).toEqual('%the_wrong_key%');
  expect(logger.warn).toHaveBeenCalledWith(
    'No localizations found for key or fallback key in any of the given languages for localize key: %the_wrong_key%',
  );
});

test('Keys returned with localizeKeys that do not exist', async () => {
  const LOCALIZE_KEYS: LocalizeKey[] = ['%the_wrong_key%', '%the_other_wrong_key%'];
  expect(
    await localizationDataProviderEngine.getLocalizedStrings({
      localizeKeys: LOCALIZE_KEYS,
      locales: ['fr'],
    }),
  ).toEqual({
    '%the_wrong_key%': '%the_wrong_key%',
    '%the_other_wrong_key%': '%the_other_wrong_key%',
  });
  expect(logger.warn).toHaveBeenCalledWith(
    'No localizations found for key or fallback key in any of the given languages for localize key: %the_wrong_key%',
  );
  expect(logger.warn).toHaveBeenCalledWith(
    'No localizations found for key or fallback key in any of the given languages for localize key: %the_other_wrong_key%',
  );
});

test('Strings and keys returned with localizeKeys where one exists but the other does not', async () => {
  const LOCALIZE_KEYS: LocalizeKey[] = ['%general_button_submit%', '%the_wrong_key%'];
  expect(
    await localizationDataProviderEngine.getLocalizedStrings({
      localizeKeys: LOCALIZE_KEYS,
      locales: ['fr'],
    }),
  ).toEqual({
    '%general_button_submit%': 'Soumettre',
    '%the_wrong_key%': '%the_wrong_key%',
  });
  expect(logger.warn).toHaveBeenCalledWith(
    'No localizations found for key or fallback key in any of the given languages for localize key: %the_wrong_key%',
  );
});

test('Error returned with localizeKey and incorrectly formatted language code', async () => {
  const LOCALIZE_KEY = '%general_button_submit%'; // irrelevant because it will throw for language code before it accesses key/value pairs
  await expect(
    localizationDataProviderEngine.getLocalizedString({
      localizeKey: LOCALIZE_KEY,
      locales: ['IncorrectlyFormattedLang001'],
    }),
  ).rejects.toThrow('Incorrect locale information provided');
  expect(logger.warn).toHaveBeenCalledWith(
    'getCanonicalLocales failed for IncorrectlyFormattedLang001 with error RangeError: Incorrect locale information provided',
  );
});

test('Error returned with localizeKeys and incorrect language code', async () => {
  const LOCALIZE_KEYS: LocalizeKey[] = ['%general_button_submit%', '%some_localization_key%']; // irrelevant because it will throw for language code before it accesses key/value pairs
  await expect(
    localizationDataProviderEngine.getLocalizedStrings({
      localizeKeys: LOCALIZE_KEYS,
      locales: ['Incorrect locale information provided001'],
    }),
  ).rejects.toThrow('Incorrect locale information provided');
  expect(logger.warn).toHaveBeenCalledWith(
    'getCanonicalLocales failed for Incorrect locale information provided001 with error RangeError: Incorrect locale information provided',
  );
});

test('Default language is english when no language provided with localizeKey', async () => {
  const LOCALIZE_KEY = '%general_button_submit%';
  const response = await localizationDataProviderEngine.getLocalizedString({
    localizeKey: LOCALIZE_KEY,
  });
  expect(response).toEqual('Submit');
});

test('Default language is english when no language provided with localizeKeys', async () => {
  const LOCALIZE_KEYS: LocalizeKey[] = ['%general_button_submit%', '%some_localization_key%'];
  const response = await localizationDataProviderEngine.getLocalizedStrings({
    localizeKeys: LOCALIZE_KEYS,
  });
  expect(response).toEqual({
    '%some_localization_key%': 'This is the English text for %some_localization_key%.',
    '%general_button_submit%': 'Submit',
  });
});

test('Good key and missing but valid language code return default English', async () => {
  const LOCALIZE_KEY = '%general_button_submit%';
  globalThis.isPackaged = true;
  const response = await localizationDataProviderEngine.getLocalizedString({
    localizeKey: LOCALIZE_KEY,
    locales: ['qya-Latn'],
  });
  expect(response).toEqual('Submit');
});

test('Good keys and missing but valid language code return default English', async () => {
  const LOCALIZE_KEYS: LocalizeKey[] = ['%general_button_submit%', '%some_localization_key%'];
  const response = await localizationDataProviderEngine.getLocalizedStrings({
    localizeKeys: LOCALIZE_KEYS,
    locales: ['qya-Latn'],
  });
  expect(response).toEqual({
    '%some_localization_key%': 'This is the English text for %some_localization_key%.',
    '%general_button_submit%': 'Submit',
  });
});

test('getSetupDialogLanguages includes English and fully-translated locales', async () => {
  const result = await localizationDataProviderEngine.getSetupDialogLanguages();
  expect(result.en).toBeDefined();
  expect(result.fr).toBeDefined();
});

test('setSetupDialogLanguages always throws', async () => {
  await expect(localizationDataProviderEngine.setSetupDialogLanguages()).rejects.toThrow(
    'setSetupDialogLanguages disabled',
  );
});

test('firstRun key falls back to English when the requested locale lacks it', async () => {
  // %firstRun_button_next% exists in en (and fr here); request a firstRun key only in en via a
  // locale that has no firstRun data → resolves to English (chosen → base → English → raw key).
  const response = await localizationDataProviderEngine.getLocalizedString({
    localizeKey: '%firstRun_title%',
    locales: ['es'], // es.json has no firstRun keys in MOCK_FILES
  });
  expect(response).toEqual('Set up');
});

test('re-emits localized strings when the interface language changes', async () => {
  // The engine subscribes in its constructor via an async IIFE; let that microtask run.
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
  const callback = getInterfaceLanguageCallback();
  if (!callback) throw new Error('Expected interface language callback to be defined');

  const notifySpy = vi.spyOn(localizationDataProviderEngine, 'notifyUpdate');
  callback(['en']); // first emit seeds the baseline — no notify
  expect(notifySpy).not.toHaveBeenCalled();

  callback(['fr']); // real change → notify localized-string data types
  expect(notifySpy).toHaveBeenCalledWith(['LocalizedString', 'LocalizedStrings']);

  callback(['fr']); // unchanged (e.g. an unrelated settings write) → no extra notify
  expect(notifySpy).toHaveBeenCalledTimes(1);
});
