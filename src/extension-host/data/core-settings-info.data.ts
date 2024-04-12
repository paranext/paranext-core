import { AllSettingsValidators, SettingValidator } from '@shared/services/settings.service-model';
import { ScriptureReference, SettingsContribution } from 'platform-bible-utils';

/** Contribution of all settings built into core. Does not contain info for extensions' settings */
export const platformSettings: SettingsContribution = {
  label: '%settings_platform_group1%',
  description: '%settings_platform_group1_description%',
  properties: {
    'platform.verseRef': {
      label: '%settings_platform_verseRef_label%',
      default: { bookNum: 1, chapterNum: 1, verseNum: 1 },
    },
    'platform.interfaceLanguage': {
      label: '%settings_platform_interfaceLanguage_label%',
      default: ['eng'],
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
export const interfaceLanguageValidator: SettingValidator<'platform.interfaceLanguage'> = async (
  newValue: string[],
): Promise<boolean> => {
  return (
    typeof newValue === 'object' &&
    Array.isArray(newValue) &&
    newValue.length > 0 &&
    typeof newValue[0] === 'string'
  );
};

/** Info about all settings built into core. Does not contain info for extensions' settings */
export const coreSettingsValidators: Partial<AllSettingsValidators> = {
  'platform.verseRef': verseRefSettingsValidator,
  'platform.interfaceLanguage': interfaceLanguageValidator,
};
