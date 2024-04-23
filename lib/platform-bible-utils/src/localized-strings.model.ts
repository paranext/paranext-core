//----------------------------------------------------------------------------------------------
// NOTE: If you change any of the types, make sure the JSON schema at the end of this file gets
// changed so they align.
//----------------------------------------------------------------------------------------------

import { LocalizeKey } from 'menus.model';
import { removeJsonToTypeScriptTypesStuff } from './settings.model';

/** Localized string value associated with this key */
export type LocalizedStringValue = string;

/** The data an extension provides to inform Platform.Bible of the localized strings it provides. */
export interface LocalizedStringDataContribution {
  [k: string]: unknown;
  metadata?: StringsMetadata;
  localizedStrings?: {
    [k: string]: LanguageStrings;
  };
}
/**
 * Map whose keys are localized string keys and whose values provide additional non-locale-specific
 * information about the localized string key
 */
export interface StringsMetadata {
  [k: LocalizeKey]: StringMetadata;
}
/** Additional non-locale-specific information about a localized string key */
export interface StringMetadata {
  [k: string]: unknown;
  /**
   * Localized string key from which to get this value if one does not exist in the specified
   * language. If a new key/value pair needs to be made to replace an existing one, this could help
   * smooth over the transition if the meanings are close enough
   */
  fallbackKey?: LocalizeKey;
  /**
   * Additional information provided by developers in English to help the translator to know how to
   * translate this localized string accurately
   */
  notes?: string;
}
/**
 * Map whose keys are localized string keys and whose values provide information about how to
 * localize strings for the localized string key
 */
export interface LanguageStrings {
  [k: LocalizeKey]: LocalizedStringValue;
}

//----------------------------------------------------------------------------------------------
// NOTE: If you change the schema below, make sure the TS types above get changed so they align.
//----------------------------------------------------------------------------------------------

const localizedStringsDefs = {
  languageStrings: {
    description:
      'Map whose keys are localized string keys and whose values provide information about how to localize strings for the localized string key',
    type: 'object',
    patternProperties: {
      '^%[\\w\\-\\.]+%$': {
        $ref: '#/$defs/localizedStringValue',
      },
    },
    additionalProperties: false,
  },
  localizedStringValue: {
    description: 'Localized string value associated with this key',
    type: 'string',
  },
  stringsMetadata: {
    description:
      'Map whose keys are localized string keys and whose values provide additional non-locale-specific information about the localized string key',
    type: 'object',
    patternProperties: {
      '^%[\\w\\-\\.]+%$': {
        $ref: '#/$defs/stringMetadata',
      },
    },
    additionalProperties: false,
  },
  stringMetadata: {
    description: 'Additional non-locale-specific information about a localized string key',
    type: 'object',
    properties: {
      fallbackKey: {
        description:
          'Localized string key from which to get this value if one does not exist in the specified language. If a new key/value pair needs to be made to replace an existing one, this could help smooth over the transition if the meanings are close enough',
        $ref: '#/$defs/localizeKey',
      },
      notes: {
        description:
          'Additional information provided by developers in English to help the translator to know how to translate this localized string accurately',
        type: 'string',
      },
    },
  },
  localizeKey: {
    description: "Identifier for a string that will be localized based on the user's UI language",
    type: 'string',
    pattern: '^%[\\w\\-\\.]+%$',
    tsType: 'LocalizeKey',
  },
};

removeJsonToTypeScriptTypesStuff(localizedStringsDefs);

/** JSON schema object that aligns with the LocalizedStringDataContribution type */
export const localizedStringsDocumentSchema = {
  $schema: 'https://json-schema.org/draft-07/schema',
  title: 'Localized String Data Contribution',
  description:
    'The data an extension provides to inform Platform.Bible of the localized strings it provides.',
  type: 'object',
  properties: {
    metadata: {
      $ref: '#/$defs/stringsMetadata',
    },
    localizedStrings: {
      type: 'object',
      additionalProperties: {
        $ref: '#/$defs/languageStrings',
      },
    },
  },
  $defs: localizedStringsDefs,
};

Object.freeze(localizedStringsDocumentSchema);
