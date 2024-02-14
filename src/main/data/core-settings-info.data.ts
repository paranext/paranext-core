import { SettingNames, SettingTypes } from 'papi-shared-types';

/** Information about one setting */
type SettingInfo<SettingName extends SettingNames> = {
  default: SettingTypes[SettingName];
};

/** Information about all settings. Keys are setting keys, values are information for that setting */
export type AllSettingsInfo = {
  [SettingName in SettingNames]: SettingInfo<SettingName>;
};

/** Info about all settings built into core. Does not contain info for extensions' settings */
const coreSettingsInfo: Partial<AllSettingsInfo> = {
  'platform.verseRef': { default: { bookNum: 1, chapterNum: 1, verseNum: 1 } },
  'platform.interfaceLanguage': { default: ['eng'] },
};

export default coreSettingsInfo;
