import { AllSettingsValidators, SettingValidator } from '@shared/services/settings.service-model';
import { SettingNames, SettingTypes } from 'papi-shared-types';
import { ScriptureReference } from 'platform-bible-utils';

/** Information about one setting */
type SettingInfo<SettingName extends SettingNames> = {
  default: SettingTypes[SettingName];
};

/** Information about all settings. Keys are setting keys, values are information for that setting */
export type AllSettingsInfo = {
  [SettingName in SettingNames]: SettingInfo<SettingName>;
};

/** Info about all settings built into core. Does not contain info for extensions' settings */
export const coreSettingsInfo: Partial<AllSettingsInfo> = {
  'platform.verseRef': { default: { bookNum: 1, chapterNum: 1, verseNum: 1 } },
  'platform.interfaceLanguage': { default: ['eng'] },
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
