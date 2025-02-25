import { useData, useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { DataProviderUpdateInstructions } from '@shared/models/data-provider.model';
import localizationDataService from '@shared/services/localization.service';
import logger from '@shared/services/logger.service';
import { SettingDataTypes } from '@shared/services/settings.service-model';
import {
  ProjectSettingNames,
  ProjectSettingTypes,
  SettingNames,
  SettingTypes,
} from 'papi-shared-types';
import { Input, Label, LanguageInfo, Switch, UiLanguageSelector } from 'platform-bible-react';
import { debounce, getErrorMessage, LocalizeKey } from 'platform-bible-utils';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import './settings.component.scss';

/** Props shared between the user and project setting components */
type BaseSettingProps<TSettingKey, TSettingValue> = {
  /** Key of the setting */
  settingKey: TSettingKey;
  /** Setting label */
  label: string;
  /** Setting description */
  description?: string;
  /** Default value of the setting */
  defaultSetting: TSettingValue;
  /** Additional css classes to help with unique styling of the Settings component */
  className?: string;
};

/**
 * Combines properties and controls with optional validation functions for both project and user
 * settings
 */
type SettingProps<TProps, TControls, TValidateProject, TValidateOther> = TProps &
  TControls & {
    validateProjectSetting?: TValidateProject;
    validateOtherSetting?: TValidateOther;
  };

/** Values of ProjectSettingTypes */
export type ProjectSettingValues = ProjectSettingTypes[keyof ProjectSettingTypes];

/** Props for the ProjectSetting component */
export type ProjectSettingProps = BaseSettingProps<ProjectSettingNames, ProjectSettingValues> & {
  projectId: string;
};

/** Values from the useProjectSetting hook to manage the setting */
type ProjectSettingsControls = {
  setting: ProjectSettingValues;
  // Necessary for flexibility in handleChangeSetting, ProjectSettingValues and
  // UserSettingValues are not the same so it couldn't assign
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSetting: ((newSetting: any) => void) | undefined;
  isLoading: boolean;
};

/** Values of SettingTypes */
export type OtherSettingValues = SettingTypes[keyof SettingTypes];

/** Props for the UserSetting component */
export type OtherSettingProps = BaseSettingProps<SettingNames, OtherSettingValues>;

/** Values from the useSetting hook to manage the setting */
type OtherSettingsControls = {
  setting: OtherSettingValues;
  // Necessary for flexibility in handleChangeSetting, ProjectSettingValues and
  // UserSettingValues are not the same so it couldn't assign
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSetting: (newSetting: any) => Promise<DataProviderUpdateInstructions<SettingDataTypes>>;
  isLoading: boolean;
};

/**
 * Represents either project or user settings, includes properties, controls, and validation
 * function
 */
type CombinedSettingProps =
  | SettingProps<
      Omit<ProjectSettingProps, 'defaultSetting' | 'projectId'>,
      ProjectSettingsControls,
      // Necessary for flexibility in handleChangeSetting, couldn't use unknown
      // and keep types in ProjectSetting component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (settingKey: any, newValue: any, currentValue: any) => Promise<boolean>,
      never
    >
  | SettingProps<
      Omit<OtherSettingProps, 'defaultSetting'>,
      OtherSettingsControls,
      never,
      // Necessary for flexibility in handleChangeSetting, couldn't use unknown
      // and keep types in ProjectSetting component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (settingKey: any, newValue: any, currentValue: any) => Promise<boolean>
    >;

const LOCALIZE_SETTING_KEYS: LocalizeKey[] = [
  '%settings_defaultMessage_loadingOneSetting%',
  '%settings_defaultMessage_noSettingComponent%',
  '%settings_errorMessages_invalidNumber%',
  '%settings_errorMessages_invalidJSON%',
  '%settings_errorMessages_invalidValue%',
  '%settings_uiLanguageSelector_selectFallbackLanguages%',
];

/**
 * Renders a setting component based on the type of setting (string, number, boolean, or object) and
 * includes validating the setting and displaying errors
 */
export default function Setting({
  settingKey,
  setting,
  setSetting,
  isLoading,
  validateOtherSetting,
  validateProjectSetting,
  label,
  className,
}: CombinedSettingProps) {
  const validateSetting = validateOtherSetting || validateProjectSetting;

  // Although the full set of languages is likely to load more-or-less instantaneously, if there is
  // a delay, we want to be sure to include at least any language(s) currently selected, so the user
  // can't get into the weird state of dropping down the list and not seeing the current selection
  // in the list.
  const defaultLanguages = useMemo(() => {
    const languages: Record<string, LanguageInfo> = {
      en: { autonym: 'English', uiNames: { es: 'inglés' } },
    };

    if (Array.isArray(setting) && settingKey === 'platform.interfaceLanguage') {
      // Add hardcoded languages
      languages.es = { autonym: 'Español', uiNames: { en: 'Spanish', fr: 'espagnol' } };
      languages.fr = { autonym: 'Français', uiNames: { en: 'French', es: 'francés' } };

      // Add dynamic languages from setting
      setting.forEach((lang) => {
        if (!languages[lang]) {
          languages[lang] = { autonym: lang }; // Autonym is required, but we don't know it.
        }
      });
    }

    return languages;
  }, [setting, settingKey]);

  const [languages] = useData(localizationDataService.dataProviderName).AvailableInterfaceLanguages(
    undefined,
    defaultLanguages,
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZE_SETTING_KEYS, []));

  /**
   * Validate and change a setting
   *
   * @param event `ChangeEvent<HTMLInputElement>` is for `Input`; `boolean | 'indeterminate'` is for
   *   `Switch`
   */
  const handleChangeSetting = async (
    event: ChangeEvent<HTMLInputElement> | string[] | boolean | 'indeterminate',
  ) => {
    let newValue: unknown;

    if (typeof event === 'string')
      // This event came from a `Switch` component. It should not be indeterminate
      logger.warn(`Setting checkbox attempted to set to 'indeterminate' for some reason`);
    else if (typeof event === 'boolean') {
      // This event came from a `Switch` component
      newValue = event;
    } else if (Array.isArray(event)) {
      // This event came from a `UiLanguageSelector` component
      newValue = event;
    } else {
      // This event came from an `Input` component
      const { value } = event.target;
      if (typeof setting === 'number') {
        const numericValue = parseInt(value, 10);
        if (Number.isNaN(numericValue)) {
          setErrorMessage(localizedStrings['%settings_errorMessages_invalidNumber%']);
          return;
        }
        newValue = numericValue;
      } else if (typeof setting === 'boolean' || typeof setting === 'string') {
        newValue = value;
      } else if (typeof setting === 'object') {
        try {
          newValue = JSON.parse(value);
        } catch {
          setErrorMessage(localizedStrings['%settings_errorMessages_invalidJSON%']);
          return;
        }
      } else {
        newValue = value;
      }
    }

    try {
      if (validateSetting && (await validateSetting(settingKey, newValue, setting))) {
        setErrorMessage(undefined);
        if (setSetting) setSetting(newValue);
      } else {
        setErrorMessage(localizedStrings['%settings_errorMessages_invalidValue%']);
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  const debouncedHandleChange = debounce(handleChangeSetting, 500);

  const generateComponent = useCallback(() => {
    let component = <p>{localizedStrings['%settings_defaultMessage_noSettingComponent%']}</p>;

    if (typeof setting === 'string' || typeof setting === 'number')
      component = (
        <Input key={settingKey} onChange={debouncedHandleChange} defaultValue={setting} />
      );
    else if (typeof setting === 'boolean')
      component = (
        <Switch key={settingKey} onCheckedChange={debouncedHandleChange} defaultChecked={setting} />
      );
    else if (typeof setting === 'object')
      if (Array.isArray(setting) && settingKey === 'platform.interfaceLanguage') {
        component = (
          <UiLanguageSelector
            className="language-selector"
            key={settingKey}
            knownUiLanguages={languages}
            primaryLanguage={setting[0]}
            fallbackLanguages={setting.slice(1)}
            onLanguagesChange={debouncedHandleChange}
            localizedStrings={localizedStrings}
          />
        );
      } else {
        component = (
          <Input
            key={settingKey}
            onChange={debouncedHandleChange}
            defaultValue={JSON.stringify(setting, undefined, 2)}
          />
        );
      }

    return (
      <div className="setting-container">
        {component}
        {errorMessage && <Label className="error-label">{errorMessage}</Label>}
      </div>
    );
  }, [setting, settingKey, debouncedHandleChange, errorMessage, languages, localizedStrings]);

  return (
    <div className={className}>
      {isLoading ? (
        <Label className="loading-label">
          {localizedStrings['%settings_defaultMessage_loadingOneSetting%']}
        </Label>
      ) : (
        <div className="setting-label-container">
          <Label htmlFor={settingKey} className="setting-label">
            {label}
          </Label>
          {generateComponent()}
        </div>
      )}
    </div>
  );
}
