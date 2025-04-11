import { localizationService } from '@shared/services/localization.service';
import { AllSettingsValidators, SettingValidator } from '@shared/services/settings.service-model';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import { isString, SettingsContribution } from 'platform-bible-utils';

/** Contribution of all settings built into core. Does not contain info for extensions' settings */
export const platformSettings: SettingsContribution = [
  {
    label: '%settings_platform_group1_label_alternative%',
    description: '%settings_platform_group1_description%',
    properties: {
      'platform.verseRef': {
        label: '%settings_platform_verseRef_label%',
        description: '%settings_platform_verseRef_description%',
        default: { book: 'GEN', chapterNum: 1, verseNum: 1 },
        isHidden: true,
      },
      'platform.interfaceLanguage': {
        label: '%settings_platform_interfaceLanguage_label%',
        description: '%settings_platform_interfaceLanguage_description%',
        default: ['en'],
      },
      'platform.ptxUtilsMementoData': {
        label: '%settings_platform_ptxUtilsMementoData_label%',
        default: {},
        isHidden: true,
      },
      'platform.paratextDataLastRegistryDataCachedTimes': {
        label: '%settings_platform_paratextDataLastRegistryDataCachedTimes_label%',
        default: {},
        isHidden: true,
      },
      'platform.commentsEnabled': {
        label: '%settings_platform_comments_enabled_label%',
        description: '%settings_platform_comments_enabled_description%',
        default: false,
        isHidden: true,
      },
      'platform.requestTimeout': {
        label: '%settings_platform_requestTimeout_label%',
        description: '%settings_platform_requestTimeout_description%',
        default: 30,
      },
    },
  },
];

// TODO: Add range checking of BCV numbers given the current versification
export const verseRefSettingsValidator: SettingValidator<'platform.verseRef'> = async (
  newValue: SerializedVerseRef,
): Promise<boolean> => {
  return (
    'book' in newValue &&
    'chapterNum' in newValue &&
    'verseNum' in newValue &&
    typeof newValue.book === 'string' &&
    typeof newValue.chapterNum === 'number' &&
    typeof newValue.verseNum === 'number' &&
    Canon.isBookIdValid(newValue.book) &&
    newValue.chapterNum >= 0 &&
    newValue.verseNum >= 0
  );
};

// TODO: Validate that strings in the array match BCP 47 values once the i18n code is ready. Or maybe
// now that we're validating against actual locales read in by the localization service, that check
// should instead be done as part of reading the localization files.
const interfaceLanguageValidator: SettingValidator<'platform.interfaceLanguage'> = async (
  newValue: string[],
): Promise<boolean> => {
  const validLanguages = await localizationService.getAvailableInterfaceLanguages();
  return (
    typeof newValue === 'object' &&
    Array.isArray(newValue) &&
    newValue.length > 0 &&
    newValue.every((v) => typeof v === 'string' && v in validLanguages)
  );
};

// TODO: validate that the values are xml strings. Maybe move this validator to dotnet?
const serializableStringDictionarySettingValidator: SettingValidator<
  'platform.ptxUtilsMementoData' | 'platform.paratextDataLastRegistryDataCachedTimes'
> = async (newValue) => {
  return typeof newValue === 'object' && Object.values(newValue).every((value) => isString(value));
};

const booleanValidator: SettingValidator<'platform.commentsEnabled'> = async (
  newValue: boolean,
): Promise<boolean> => {
  return typeof newValue === 'boolean';
};

const requestTimeoutValidator: SettingValidator<'platform.requestTimeout'> = async (
  newValue: number,
): Promise<boolean> => {
  return typeof newValue === 'number' && newValue >= 0;
};

/** Info about all settings built into core. Does not contain info for extensions' settings */
export const coreSettingsValidators: Partial<AllSettingsValidators> = {
  'platform.verseRef': verseRefSettingsValidator,
  'platform.interfaceLanguage': interfaceLanguageValidator,
  'platform.ptxUtilsMementoData': serializableStringDictionarySettingValidator,
  'platform.paratextDataLastRegistryDataCachedTimes': serializableStringDictionarySettingValidator,
  'platform.commentsEnabled': booleanValidator,
  'platform.requestTimeout': requestTimeoutValidator,
};
