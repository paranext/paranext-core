import { DEFAULT_THEME, THEMES } from '@renderer/theme';
import { AllSettingsValidators, SettingValidator } from '@shared/services/settings.service-model';
import { isString, ScriptureReference, SettingsContribution } from 'platform-bible-utils';

/** Contribution of all settings built into core. Does not contain info for extensions' settings */
export const platformSettings: SettingsContribution = {
  label: '%settings_platform_group1_label%',
  description: '%settings_platform_group1_description%',
  properties: {
    'platform.verseRef': {
      label: '%settings_platform_verseRef_label%',
      description: '%settings_platform_verseRef_description%',
      default: { bookNum: 1, chapterNum: 1, verseNum: 1 },
    },
    'platform.interfaceLanguage': {
      label: '%settings_platform_interfaceLanguage_label%',
      description: '%settings_platform_interfaceLanguage_description%',
      default: ['eng'],
    },
    'platform.theme': {
      label: '%settings_platform_theme_label%',
      description: '%settings_platform_theme_description%',
      default: DEFAULT_THEME,
    },
    'platform.ptxUtilsMementoData': {
      label: '%settings_platform_ptxUtilsMementoData_label%',
      default: {},
    },
    'platform.paratextDataLastRegistryDataCachedTimes': {
      label: '%settings_platform_paratextDataLastRegistryDataCachedTimes_label%',
      default: {},
    },
  },
};

// TODO: Add range checking of BCV numbers given the current versification
export const verseRefSettingsValidator: SettingValidator<'platform.verseRef'> = async (
  newValue: ScriptureReference,
): Promise<boolean> => {
  return (
    'bookNum' in newValue &&
    'chapterNum' in newValue &&
    'verseNum' in newValue &&
    typeof newValue.bookNum === 'number' &&
    typeof newValue.chapterNum === 'number' &&
    typeof newValue.verseNum === 'number' &&
    newValue.bookNum >= 0 &&
    newValue.chapterNum >= 0 &&
    newValue.verseNum >= 0
  );
};

// TODO: Validate that strings in the array to match BCP 47 values once the i18n code is ready
const interfaceLanguageValidator: SettingValidator<'platform.interfaceLanguage'> = async (
  newValue: string[],
): Promise<boolean> => {
  return (
    typeof newValue === 'object' &&
    Array.isArray(newValue) &&
    newValue.length > 0 &&
    typeof newValue[0] === 'string'
  );
};

const themeValidator: SettingValidator<'platform.theme'> = async (
  newValue: string,
): Promise<boolean> => {
  if (typeof newValue === 'string' && THEMES.includes(newValue)) return true;
  throw Error('Valid themes: <empty string>, dark, paratext-light, paratext-dark, system');
};

// TODO: validate that the values are xml strings. Maybe move this validator to dotnet?
const serializableStringDictionarySettingValidator: SettingValidator<
  'platform.ptxUtilsMementoData' | 'platform.paratextDataLastRegistryDataCachedTimes'
> = async (newValue) => {
  return typeof newValue === 'object' && Object.values(newValue).every((value) => isString(value));
};

/** Info about all settings built into core. Does not contain info for extensions' settings */
export const coreSettingsValidators: Partial<AllSettingsValidators> = {
  'platform.verseRef': verseRefSettingsValidator,
  'platform.interfaceLanguage': interfaceLanguageValidator,
  'platform.theme': themeValidator,
  'platform.ptxUtilsMementoData': serializableStringDictionarySettingValidator,
  'platform.paratextDataLastRegistryDataCachedTimes': serializableStringDictionarySettingValidator,
};
