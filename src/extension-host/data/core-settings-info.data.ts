import { localization } from '@extension-host/services/papi-backend.service';
import { DEFAULT_ZOOM_FACTOR, MAX_ZOOM_FACTOR, MIN_ZOOM_FACTOR } from '@shared/data/platform.data';
import { localizationService } from '@shared/services/localization.service';
import { AllSettingsValidators, SettingValidator } from '@shared/services/settings.service-model';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import { formatReplacementString, isString, SettingsContribution } from 'platform-bible-utils';

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
      'platform.requestTimeout': {
        label: '%settings_platform_requestTimeout_label%',
        description: '%settings_platform_requestTimeout_description%',
        default: 30,
      },
      'platform.zoomFactor': {
        label: '%settings_platform_zoomFactor_label%',
        description: '%settings_platform_zoomFactor_description%',
        default: DEFAULT_ZOOM_FACTOR,
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
  // The request timeout is in seconds. Keep it between 0 (disabled) and 1 day
  return typeof newValue === 'number' && newValue >= 0 && newValue <= 60 * 60 * 24;
};

/** Info about all settings built into core. Does not contain info for extensions' settings */
const zoomFactorValidator: SettingValidator<'platform.zoomFactor'> = async (
  newValue: number,
): Promise<boolean> => {
  const errorMessage = formatReplacementString(
    await localization.getLocalizedString({
      localizeKey: '%settings_platform_zoomFactor_errorMessage%',
    }),
    {
      lowerLimit: MIN_ZOOM_FACTOR,
      upperLimit: MAX_ZOOM_FACTOR,
    },
  );

  if (typeof newValue !== 'number') return false;
  if (newValue < MIN_ZOOM_FACTOR || newValue > MAX_ZOOM_FACTOR) {
    throw new Error(errorMessage);
  }
  return true;
};

export const coreSettingsValidators: Partial<AllSettingsValidators> = {
  'platform.verseRef': verseRefSettingsValidator,
  'platform.interfaceLanguage': interfaceLanguageValidator,
  'platform.ptxUtilsMementoData': serializableStringDictionarySettingValidator,
  'platform.paratextDataLastRegistryDataCachedTimes': serializableStringDictionarySettingValidator,
  'platform.commentsEnabled': booleanValidator,
  'platform.requestTimeout': requestTimeoutValidator,
  'platform.zoomFactor': zoomFactorValidator,
};
