import { LocalizedStringDataContribution } from 'platform-bible-utils';
import LocalizedStringsDocumentCombiner from './localized-strings-document-combiner';

const platformLocalizedStrings: LocalizedStringDataContribution = {
  localizedStrings: {
    en: {
      '%no%': 'no',
      '%confirm%': 'yes',
      '%yes%': 'yes',
      '%back%': 'back',
      '%slices_of_fried_potato%': 'fries',
    },
    spa: {
      '%no%': 'no',
    },
  },
  metadata: {
    '%yes%': {
      notes:
        'A confirmation word used in many places. For example, this may be used as the label on a button on a dialog.',
    },
  },
};
const test1ExtensionName = 'test1';
const test1ExtensionContribution: LocalizedStringDataContribution = {
  localizedStrings: {
    es: {
      '%confirm%': 'sí',
    },
  },
  metadata: {
    '%yes%': {
      fallbackKey: '%confirm%',
    },
  },
};
const test2ExtensionName = 'test2';
const test2ExtensionContribution: LocalizedStringDataContribution = {
  localizedStrings: {
    en: {
      '%no%': "Ye olde 'no'. This should be overridden by platform's no",
    },
    'en-GB': {
      '%slices_of_fried_potato%': 'chips',
      '%test2_extension_string%': 'test 2 extension string',
    },
  },
};
const expectedOutput: LocalizedStringDataContribution = {
  localizedStrings: {
    en: {
      '%no%': 'no',
      '%confirm%': 'yes',
      '%yes%': 'yes',
      '%back%': 'back',
      '%slices_of_fried_potato%': 'fries',
    },
    es: {
      '%no%': 'no',
      '%confirm%': 'sí',
    },
    'en-GB': {
      '%slices_of_fried_potato%': 'chips',
      '%test2_extension_string%': 'test 2 extension string',
    },
  },
  metadata: {
    '%yes%': {
      notes:
        'A confirmation word used in many places. For example, this may be used as the label on a button on a dialog.',
      fallbackKey: '%confirm%',
    },
  },
};

test('Sample documents all validate', async () => {
  const localizedStringsCombiner = new LocalizedStringsDocumentCombiner(platformLocalizedStrings);
  localizedStringsCombiner.addOrUpdateContribution(test1ExtensionName, test1ExtensionContribution);
  localizedStringsCombiner.addOrUpdateContribution(test2ExtensionName, test2ExtensionContribution);
  expect(localizedStringsCombiner.getLocalizedStringData()).toEqual(expectedOutput);
});

// TODO: Add more tests
